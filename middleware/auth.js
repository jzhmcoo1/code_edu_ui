import { message } from 'ant-design-vue'
export default function ({ redirect, store }) {
  console.log(store.state.account)
  if (store.state.account.user === undefined || store.state.account.user.userId === undefined || store.state.account.user.userId === "") {
    message.warning("请先登录")
    return redirect('/login');
  }
}