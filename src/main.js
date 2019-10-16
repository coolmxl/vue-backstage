import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import qs from 'qs'
import VeeValidate from 'vee-validate';
Vue.prototype.$qs = qs;
// import myCharts from './comm/js/myCharts.js'
// Vue.use(myCharts)
Vue.use(VeeValidate);
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
