import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './config/http.js'
import './plugins/view-design.js'
import './components/Library/index'
import echarts from 'echarts'
import moment from 'moment'
Vue.prototype.$moment = moment
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  // 解决登录后，token没有更新
  // Vue.prototype.$http.defaults.headers.token = store.getters.getUserInfo
  next();
});

router.afterEach(function(to) {});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
