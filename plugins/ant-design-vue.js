import Vue from 'vue';
import { message, Empty, notification } from 'ant-design-vue';
message.config({
  top: `100px`,
  maxCount: 3,
});
notification.config({
  duration: 3
})
Vue.config.productionTip = false;
Vue.prototype.$message = message;
Vue.prototype.$notification = notification
Vue.use(Empty)
Vue.use(notification)