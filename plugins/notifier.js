export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage({ content = '', color = '', icon = '' }) {
      store.commit('snackbar/showMessage', { content, color, icon })
    }
  })
}