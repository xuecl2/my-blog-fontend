import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/components/global-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'font-awesome/css/font-awesome.css'
import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
import 'highlight.js/styles/github.css'; // HighLight.js' Dependency Style
import 'tocbot/dist/styles.css'
import 'tocbot/dist/tocbot.css'
import '@/css/bs-theme.css'
import '@/style/global.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

