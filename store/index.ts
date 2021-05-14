import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from '@/store/userInfo'
import account from '@/store/account'
Vue.use(Vuex)

const store: any = () => new Vuex.Store({
  modules: {
    userInfo, account
  }
})

export default store