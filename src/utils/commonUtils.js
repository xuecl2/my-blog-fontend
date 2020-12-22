import {errCode} from '@/global/globalConsts.js'
import {Message} from 'element-ui'
import axios from 'axios'

const utils = {
    isBlank(value){
        if(value === undefined || value === null || value === ''){
            return true
        }
        return false
    },
    debounce(func, interval){
        if(interval === undefined) interval = 2000 // default interval
        let lock = false
        return function(){
            if(lock) return
            lock = true
            func.apply(this,arguments)
            setTimeout(() => {
                lock = false
            }, interval)          
        }
    },
    // 异常处理的通常方法
    commonErrorHandler(error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        Message.error(error.message)
        let err = new Error('request failed')
        err.errType = errCode.reqFailed
        throw err
    }
}
export default utils