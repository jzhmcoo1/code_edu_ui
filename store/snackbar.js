// ~/store/snackbar.js

export const state = () => ({
  content: '',
  color: '',
  icon: ''
})

export const mutations = {
  showMessage(state, payload) {
    state.content = payload.content
    state.color = payload.color
    state.icon = payload.icon
  }
}