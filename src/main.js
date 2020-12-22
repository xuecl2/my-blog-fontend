import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/components/globalComponent'
import 'font-awesome/css/font-awesome.css'
import globalParams from '@/global/globalParams.js'
import '@/css/commonStyle.css'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// app启动操作
if(window.innerWidth < globalParams.baseWidth) {
  globalParams.screenSizeType = 'MOBILE'
}else {
  globalParams.screenSizeType = 'PC'
}
