import Vue from 'vue';
import { message } from 'ant-design-vue';
message.config({
  top: `100px`,
  duration: 2,
  maxCount: 3,
});
Vue.config.productionTip = false;
Vue.prototype.$message = message;