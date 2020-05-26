import axios from 'axios'
import {errCode} from '@/assets/globalConsts.js'
import {Message} from 'element-ui'
/* eslint-disable */
const axiosConfig = {
    url: evnConfig.baseUrl,
    timeout: 30000,
    method: 'post',
    // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
}
/* eslint-enable */
// 有默认错误处理方式的request
const request = (data,config) => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    axiosConfig.cancelToken = source.token
    axiosConfig.data = data
    // more axios config instruction please see http://axios-js.com/docs/index.html#Request-Config    
    let request = axios(Object.assign({},axiosConfig,config)).then(rsp => {
        let data = rsp.data
        if(data.responseCode !== '000000'){throw new Error(`${data.responseMessage}`)} 
        // data.cancelTokenSource = source
        return data.body
    }).catch(error => {
        Message.error(error.message)
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
        let err = new Error('request failed')
        err.errType = errCode.reqFailed
        throw err
    })
    request.source = source
    return request
}
// 没有默认错误处理方式的request
const customizeRequst = (data,config) => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    axiosConfig.cancelToken = source.token
    axiosConfig.data = data
    let request = axios(Object.assign(axiosConfig,config)).catch(thrown => {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        } else {
            // handle error
            throw thrown 
        }
    })
    request.source = source
    return request
}
export {customizeRequst} 
export default request