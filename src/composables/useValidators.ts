import {
  computed,
  ComputedRef,
  onBeforeMount,
  Ref,
  ref,
  watch
} from 'vue'
import { Store } from 'vuex'

import { Amount, DenomTrace ,Validator} from '../utils/interfaces'

import { useAddress, useDenom } from '.'

type Response = {
  validators: Ref<{ isLoading: boolean; assets: AssetForUI[] }>
  validatorsRaw: ComputedRef<any[]>
  normalize: (validator: object) => Promise<AssetForUI>
}
export type AssetForUI = {
  validator: Validator
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
  let validators = ref({
    isLoading: true,
    assets: []
  })

  // composables
  let { address } = useAddress({ $s })
  

  // actions
  let queryValidators = (opts: any) =>
    $s.dispatch('cosmos.staking.v1beta1/QueryValidators', opts)

  // lh
  onBeforeMount(async () => {
    
    let arr = queryValidators({
        params: { staus: "true" },
        options: { subscribe: true }
      }).finally(() => {
        validators.value.isLoading = false
      })

      console.log("before mounted value = ", arr)
    
  })

  // computed
  let validatorsRaw = computed<any[]>(() => {
    console.log("start ts script")
    console.log($s.getters['cosmos.staking.v1beta1/getValidators']({
      params: { status: address.value }
    })?.validators ?? [])
    console.log("end ts script")
    return (
      $s.getters['cosmos.staking.v1beta1/getValidators']({
        params: { status: address.value }
      })?.validators ?? []
    )
  })

  // methods
  let normalize = async (balance: any): Promise<AssetForUI> => {
    

    let normalized: AssetForUI = {
      validator: {
        operator_address: '',
        /** consensus_pubkey is the consensus public key of the validator, as a Protobuf Any. */
        consensus_pubkey: undefined,
        /** jailed defined whether the validator has been jailed from bonded status or not. */
        jailed: false,
        /** status is the validator status (bonded/unbonding/unbonded). */
        status: 0,
        /** tokens define the delegated tokens (incl. self-delegation). */
        tokens: '',
        /** delegator_shares defines total shares issued to a validator's delegators. */
        delegator_shares: '',
        /** description defines the description terms for the validator. */
        description: undefined,
        /** unbonding_height defines, if unbonding, the height at which this validator has begun unbonding. */
        unbonding_height: 0,
        /** unbonding_time defines, if unbonding, the min time for the validator to complete unbonding. */
        unbonding_time:  undefined,
        /** commission defines the commission parameters. */
        commission: undefined,
        /** min_self_delegation is the validator's self declared minimum self delegation. */
        min_self_delegation: ''
      }
    }

     return normalized
  }

  //watch
  watch(
    
    () => [address.value, validatorsRaw.value],
    async ([newAddress], [oldAddress]) => {

      console.log("watch")
        console.log(queryValidators({
          params: { status: "true" },
          options: { subscribe: true }
        }).finally(() => {
          validators.value.isLoading = false
        }))
        console.log("watch end")
      

      let arr: Promise<AssetForUI>[] = validatorsRaw.value.map(normalize)
      console.log("arr = ")
      console.log(arr)
      console.log("arr = end")

      Promise.all(arr).then((normalized) => {
        validators.value.assets = normalized as any
      })
    }
  )

  return { validatorsRaw, normalize, validators}
}
