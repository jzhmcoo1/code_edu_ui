import { message } from 'ant-design-vue'
export default function ({ redirect, store, route }) {
  console.log(store.state.userInfo.exam.endDate)
  if (store.state.userInfo.exam === undefined || store.state.userInfo.exam.id === "" || store.state.userInfo.exam.endDate === "") {
    message.warning("请从考试界面进入")
    return redirect('/exam');
  }
  if (route.params.id && store.state.userInfo.exam.id && route.params.id !== store.state.userInfo.exam.id) {
    message.warning("请先完成上一场考试")
    return redirect('/exam/' + store.state.userInfo.exam.id)
  }
}