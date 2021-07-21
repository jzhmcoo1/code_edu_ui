import { message } from 'ant-design-vue'
export default function ({ redirect, store, route }) {
  const exam = store.state.userInfo.exam
  const currentId = route.params.id
  console.log("执行了")
  if (!exam.id) {
    message.warning("请从考试页面进入")
    return redirect('/exam');
  }
  if (currentId !== exam.id) {
    message.warning("请先完成上一场考试")
    return redirect('/exam' + exam.id);
  }
}