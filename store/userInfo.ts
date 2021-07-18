export default {
  namespaced: true,
  state: {
    peference: { theme: "system" }
  },
  mutations: {
    setPeference(state: any, peference: object) {
      state.peference = peference
      console.log('状态更新', state.peference)
    },
    remove(state: any) {
      state.peference = {}
      console.log('状态清空')
    },
  }
}