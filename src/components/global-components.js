import Vue from 'vue'
import toast from './bs-toast';
import loading from './bs-loading'
import message from './bs-message'

Vue.prototype.$toast = toast
Vue.prototype.$loading = loading
Vue.prototype.$message = message
