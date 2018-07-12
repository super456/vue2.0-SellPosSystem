import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';//引入element-ui文件，因为是npm安装的，路径不需要添加./
import 'element-ui/lib/theme-chalk/index.css';//引入默认的样式



Vue.config.productionTip = false;
Vue.use(ElementUI);//声明全局使用

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
