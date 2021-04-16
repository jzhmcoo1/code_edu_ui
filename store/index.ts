import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from '@/store/userInfo'
Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    userInfo
  }
})

export default store