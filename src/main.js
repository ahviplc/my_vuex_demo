import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入并使用
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// 引入axios 自已又加工处理的那个【src/utils/axios.js】
import axios from './utils/axios'
// 绑定到全局变量
Vue.prototype.$axios = axios

// 阻止启动生产消息
Vue.config.productionTip = false
// 使用Antd
Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
