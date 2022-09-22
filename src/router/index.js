import { createRouter, createWebHistory } from 'vue-router'

import TokenData from '../views/TokenData.vue'
import CoinData from '../views/CoinData.vue'
import AirdropData from '../views/AirdropData.vue'
import Staking from '../views/Staking.vue'
import Validators from '../views/Validators.vue'

const routerHistory = createWebHistory()
const routes = [
  { path: '/', component: Validators },
  { path: '/airdrop', component: AirdropData },
  { path: '/coin', component: CoinData },
  { path: '/token', component: TokenData },
  { path: '/staking', component: Validators },
  //{ path: '/staking', component: Staking }
]

const router = createRouter({
  history: routerHistory,
  routes
})

export default router
