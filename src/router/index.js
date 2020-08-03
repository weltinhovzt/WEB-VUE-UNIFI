import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/guest/s/default/', name: 'home', component: Home },
  { path: "*", component: Home }
]

const router = new VueRouter({
  mode: 'history',
  hash: false,
  routes
})

export default router
