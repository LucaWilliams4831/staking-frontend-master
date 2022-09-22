import {
  computed,
  ComputedRef,
  onBeforeMount,
  onUnmounted,
  Ref,
  ref,
  watch
} from 'vue'
import { Store } from 'vuex'
import { EventEmitter } from 'events'
import { SigningCosmWasmClient, CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

import { Amount, DenomTrace } from '../utils/interfaces'
import { useAddress, useDenom } from '.'

type Response = {
  balances: Ref<{ isLoading: boolean; assets: AssetForUI[] }>
  balancesRaw: ComputedRef<any[]>
  normalize: (balance: object) => Promise<boolean>
}
export type AssetForUI = {
  amount: Amount
  path?: string | string[]
}

type Params = {
  $s: Store<any>
  opts?: {
    extractChannels: boolean
  }
}

export default function ({ $s, opts }: Params): Response {
  // state
  let balances = ref({
    isLoading: true,
    assets: []
  })

  // composables
  let { address } = useAddress({ $s })
  let { getDenomTrace } = useDenom({ $s })
  // computed
  let spClient = computed<EventEmitter>(() => $s.getters['common/env/client'])
  let cosmwasmSigningClient = computed<SigningCosmWasmClient>(
    () => (spClient.value as any)?.cosmwasmSigningClient as SigningCosmWasmClient
  )

  // actions
  let queryAllBalances = (opts: any) => {
    if (!cosmwasmSigningClient.value) 
      return new Promise<any>([] as any)

    return cosmwasmSigningClient.value.queryContractSmart("mun1zwv6feuzhy6a9wekh96cd57lsarmqlwxdypdsplw6zhfncqw6ftqzwk9ar",
    {
        balance:{
            address:"mun1dfjns5lk748pzrd79z4zp9k22mrchm2a7ym0yh"
        }
    })
  }
    // $s.dispatch('cosmos.bank.v1beta1/QueryAllBalances', opts)

  // lh
  onBeforeMount(async () => {
    if (address.value) {
      queryAllBalances({
        params: { address: address.value },
        options: { subscribe: true }
      }).finally(() => {
        balances.value.isLoading = false
      })
    }
  })

  // computed
  let balancesRaw = computed<any[]>(() => {
    // return (
    //   $s.getters['cosmos.bank.v1beta1/getAllBalances']({
    //     params: { address: address.value }
    //   })?.balances ?? []
    // )
    if (!cosmwasmSigningClient.value) 
      return []

    const balance = cosmwasmSigningClient.value.queryContractSmart("mun1zwv6feuzhy6a9wekh96cd57lsarmqlwxdypdsplw6zhfncqw6ftqzwk9ar",
    {
        balance:{
            address:"mun1dfjns5lk748pzrd79z4zp9k22mrchm2a7ym0yh"
        }
    })

    return [balance]
  })

  // methods
  let normalize = async (balance: any): Promise<boolean> => {
    balance.then((b) => {
      
      
      let normalized: AssetForUI = {
        amount: {
          amount: '',
          denom: ''
        }
      }
     
      normalized.amount.amount = "" + (+b.balance/1e6)
      normalized.amount.denom = "DGM"
  
      balances.value.assets = [normalized] as any
    })
    
    return true
  }

  //watch
  watch(
    () => [address.value, balancesRaw.value],
    async ([newAddress], [oldAddress]) => {
      if (newAddress !== oldAddress) {
        queryAllBalances({
          params: { address: newAddress },
          options: { subscribe: true }
        }).finally(() => {
          balances.value.isLoading = false
        })
      }

      
      let arr: Promise<boolean>[] = balancesRaw.value.map(normalize)

      Promise.all(arr).then((b) => {
      })
    }
  )

  return { balancesRaw, normalize, balances }
}
