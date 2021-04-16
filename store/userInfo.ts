export default {
  state: () => ({
    loginInfo: {
      id: "",
      age: "",
      avatar: "",
      mobile: "",
      nickname: "",
      sex: "",
    },
  }),
  mutations: {
    update(state: any, loginInfo: object) {
      state.loginInfo = loginInfo
      console.log('状态更新', state.loginInfo)
    },
    remove(state: any) {
      state.loginInfo = {}
      console.log('状态清空')
    },
  }
}