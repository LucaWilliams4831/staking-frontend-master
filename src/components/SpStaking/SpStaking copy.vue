<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col card-item">
            <p>Available</p>
            <div class="border-text">{{ balance }} TMUN</div>
            <button @click="() => sendMsgTx(1)">Stake</button>
          </div>
          <div class="col card-item">
            <p>Staked</p>
            <div class="border-text">16.012 TMUN</div>
            <div class="row">
              <div class="col-md-6">
                <button class="border" @click="() => sendMsgTx(2)">
                  Undelegate
                </button>
              </div>
              <div class="col-md-6">
                <button class="border col-md-6" @click="() => sendMsgTx(3)">
                  Redelegate
                </button>
              </div>
            </div>
          </div>
          <div class="col card-item">
            <p>Unbonding</p>
            <div class="border-text">4 TMUN</div>
            <div class="transparent">Unbonding period: 14 days</div>
          </div>
          <div class="col card-item">
            <p>Staking APR</p>
            <div class="border-text">86.87%</div>
          </div>
        </div>
      </div>
      <div>dsgdsa{{ validators ? "fdsa" : "432743" }}</div>
      <div class="col-md-12 validators-box">
        <div class="table-badge">
          <div>All Validators (154)</div>
          <div>
            <button>Active</button>
            <button class="border">Inactive</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <td width="50%"><a>NAME</a></td>
              <td class="text-center"><a>VOTING POWER</a></td>
              <td class="text-center"><a>COMMISSION</a></td>
              <td class="text-center">ACTIONS</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span class="avatar-name">earth-run-sun</span>
              </td>
              <td class="text-center">500001.012 TMUN</td>
              <td class="text-center">5%</td>
              <td class="text-center">
                <a>Manage →</a>
              </td>
            </tr>
            <tr>
              <td>
                <span class="avatar-name">door-man-moon</span>
              </td>
              <td class="text-center">500011 TMUN</td>
              <td class="text-center">5%</td>
              <td class="text-center">
                <a>Manage →</a>
              </td>
            </tr>
            <tr>
              <td>
                <span class="avatar-name">beta-mars-rover</span>
              </td>
              <td class="text-center">500000 TMUN</td>
              <td class="text-center">5%</td>
              <td class="text-center">
                <a>Manage →</a>
              </td>
            </tr>
            <tr>
              <td>
                <span class="avatar-name">alpha-moon-phase</span>
              </td>
              <td class="text-center">500000 TMUN</td>
              <td class="text-center">5%</td>
              <td class="text-center">
                <a>Manage →</a>
              </td>
            </tr>
            <tr>
              <td>
                <span class="avatar-name">car-moon-cat</span>
              </td>
              <td class="text-center">500000 TMUN</td>
              <td class="text-center">5%</td>
              <td class="text-center">
                <a>Manage →</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  ref,
  reactive,
  watch,
  onBeforeMount,
} from "vue";
import { useStore } from "vuex";
import { AssetForUI } from "../composables/useAssets";
import { Amount } from "../utils/interfaces";
import { useAddress, useAssets, useValidators } from "../../composables";
import SpDenom from "../SpDenom";

export interface DelegateTxData {
  receiver: string;
  amount: AssetForUI;
  memo: string;
  fees: Array<AssetForUI>;
}

export enum UI_STATE {
  "FRESH" = 1,

  "BOOTSTRAPED" = 2,

  "WALLET_LOCKED" = 3,

  "SEND" = 100,
  "SEND_ADD_TOKEN" = 101,

  "TX_SIGNING" = 300,
  "TX_SUCCESS" = 301,
  "TX_ERROR" = 302,

  "RECEIVE" = 400,
}
export interface State {
  tx: DelegateTxData;
  currentUIState: UI_STATE;
  advancedOpen: boolean;
}
export let initialState: State = {
  tx: {
    receiver: "",
    amount: [],
    memo: "",
    fees: [],
  },
  currentUIState: UI_STATE.SEND,
  advancedOpen: false,
};

export default defineComponent({
  name: "SpStaking",

  components: { SpDenom },

  async setup() {
    // store
    let $s = useStore();
    let state: State = reactive(initialState);

    // composables
    let { address } = useAddress({ $s });
    let { balances } = useAssets({ $s, opts: { extractChannels: true } });

    let queryValidators = async (opts: any) =>
    await $s.dispatch("cosmos.staking.v1beta1/QueryValidators", opts);

    let queryDelegatorValidators = async (opts: any) =>
    await $s.dispatch("cosmos.staking.v1beta1/QueryDelegations", opts);

    let validators_loading = false;

    console.log(address.value);

    const res = await queryValidators({
      params: { status: "true" },
      options: { subscribe: true },
    });

    console.log("res", res)

    let validators = res.validators;

    let amount: Amount = { denom: "utmun", amount: "10000000" };

    let validator_address = "munvaloper1npgc0e9ys7pxdfamua00u9cedhcp0ewklgppx7";
    let revalidator_address =
      "munvaloper1npgc0e9ys7pxdfamua00u9cedhcp0ewklgppx7";

    let sendMsgDelegate = async (opts: any) =>
      await $s.dispatch("cosmos.staking.v1beta1/sendMsgDelegate", opts);

    let sendMsgUndelegate = async (opts: any) =>
      await $s.dispatch("cosmos.staking.v1beta1/sendMsgUndelegate", opts);

    let sendMsgRedelegate = async (opts: any) =>
      await $s.dispatch("cosmos.staking.v1beta1/sendMsgBeginRedelegate", opts);

    let sendMsgTx = async (index: number): Promise<void> => {
      state.currentUIState = UI_STATE.TX_SIGNING;

      let fee: Array<Amount> = state.tx.fees.map((x: AssetForUI) => ({
        denom: "u" + x.amount.denom,
        amount: x.amount.amount == "" ? "0" : "" + x.amount.amount * 1e6,
      }));

      let memo = state.tx.memo;
      let send;
      let payload: any = {
        amount,
        delegator_address: address.value,
        validator_address: validator_address,
      };
      let repayload: any = {
        amount,
        validator_src_address: validator_address,
        validator_dst_address: revalidator_address,
        delegator_address: address.value,
      };

      try {
        switch (index) {
          case 1:
            send = () =>
              sendMsgDelegate({
                value: payload,
                fee,
                memo,
              });
            break;
          case 2:
            send = () =>
              sendMsgUndelegate({
                value: payload,
                fee,
                memo,
              });
            break;
          case 3:
            send = () =>
              sendMsgRedelegate({
                value: repayload,
                fee,
                memo,
              });
        }
        const txResult = await send();

        if (txResult.code) {
          throw new Error();
        }
        console.log("sucess");
        state.currentUIState = UI_STATE.TX_SUCCESS;
      } catch (e) {
        console.error(e);
        console.log("faild");
        state.currentUIState = UI_STATE.TX_ERROR;
      }
    };

    let balance = computed(() => {
      let a = JSON.parse(JSON.stringify(balances.value.assets.slice(0, 3)));
      let balance = 0;
      if (a[0]?.amount?.amount) balance = a[0]?.amount?.amount;
      return "" + balance;
    });

    console.log("validators:  ", validators);

    return {
      address,
      balances,
      balance,
      validators,
      validators_loading,
      sendMsgTx,
    };
    // console.log(validators);
    /////////////////////////   get validators for delegator /////////////////////////////////////////
    // await queryDelegatorValidators({
    //   params: { delegator_addr: address.value },
    //   options: { subscribe: true }
    // })
    // .then((res) => {
    //   console.log(res)
    // } )
    // .finally(() => {
    //   validators_loading = false
    // })
    // console.log(validators)

    // console.log(validators);
  },
});
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}

.col {
  flex-grow: 1;
  padding: 20px;
}

.card-item {
  padding: 8px;
}

.card-item p {
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}

.card-item .border-text {
  border: 1px solid #ddd;
  border-radius: 1rem;
  font-size: 20px;
  font-weight: 800;
  padding: 12px 0;
  text-align: center;
}

.card-item button {
  background: #db2777;
  border: none;
  border-radius: 1rem;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  padding: 12px 0;
  width: 100%;
  text-align: center;
}

.card-item button:hover {
  opacity: 0.8;
}

.card-item button.border {
  border: 1px solid #db2777;
  background: transparent;
  color: #db2777;
  padding: 10px 0;
}

.card-item button.border:hover {
  background: #db2777;
  color: white;
  opacity: 1;
}

.card-item .transparent {
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
  padding: 12px 0;
  text-align: center;
}

.validators-box {
}

.validators-box table {
  width: 100%;
}

.text-center {
  text-align: center;
}

.table-badge {
  align-items: center;
  border: 1px solid #ddd;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  margin-top: 30px;
  padding: 16px;
}

.table-badge button {
  font-size: 14px;
  background: #db2777;
  border-radius: 1rem;
  border: 1px solid #db2777;
  color: white;
  cursor: pointer;
  font-weight: 800;
  padding: 10px 20px;
  margin-left: 16px;
}

.table-badge button:hover {
  opacity: 0.8;
}

.table-badge button.border {
  background: transparent;
  color: #db2777;
}

.table-badge button.border:hover {
  background: #db2777;
  color: white;
  font-weight: 800;
  opacity: 1;
}

table {
  font-size: 14px;
  font-weight: 500;
  border-spacing: 0px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

table td {
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ddd;
}

table tbody td {
  padding: 16px 10px;
}

table a {
  color: #db2777;
  font-weight: 700;
  cursor: pointer;
}

table a:hover {
  opacity: 0.8;
}
</style>
