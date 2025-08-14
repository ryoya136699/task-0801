import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PurchaseView from '../views/PurchaseView.vue'; // 購入ページの読み込み
import OrderedView from '../views/OrderedView.vue'; // 購入履歴ページの読み込み

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  
  // 購入ページのルートを追加
  {
    path: '/purchase',
    name: 'purchase',
    component: PurchaseView
  },

  // 購入履歴ページのルートを追加
  {
    path: '/ordered',
    name: 'ordered',
    component: OrderedView
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router