import db from '@/utils/localStorage'
export default {
  namespaced: true,
  state: {
    peference: { theme: "system" },
    exam: db.get('EXAM') || {}
  },
  mutations: {
    setPeference(state: any, peference: object) {
      state.peference = peference
      console.log('状态更新', state.peference)
    },
    removePeference(state: any) {
      state.peference = {}
      console.log('状态清空')
    },
    setExam(state: any, exam: { id: string, endDate: string, answerMap: any }) {
      state.exam = exam;
      db.save('EXAM', exam)
    },
    removeExam(state: any) {
      state.exam = { id: "", endDate: "", answerMap: {} }
      db.remove('EXAM')
    }
  }
}