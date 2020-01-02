
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// 导入自己的初始化样式
import './style/base.css'


Vue.use(ElementUi)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
