import Vue from 'vue';
import { message, Empty, notification } from 'ant-design-vue';
message.config({
  top: `100px`,
  maxCount: 3,
});
Vue.config.productionTip = false;
Vue.prototype.$message = message;
Vue.use(Empty)
Vue.use(notification)