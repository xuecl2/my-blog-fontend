import axios from 'axios'
import toast from '@/components/bs-toast'
import message from '@/components/bs-message'
import * as errorCode from '@/global/error-code.js'
import router from '@/router'

const defaultConfig = {
  baseURL: window.SERVER_BASE_URL,
  timeout: 30000,
  method: 'post',
  headers: {'Content-Type': 'application/json'},
}

const request = (url, data, config) => {
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()
  // more axios config instruction in http://axios-js.com/docs/index.html#Request-Config    
  let axiosRequest = axios(Object.assign({}, defaultConfig, {cancelToken: source.token, data, url}, config)).then(rsp => {
    if(!rsp?.data?.code) throw new Error('服务端异常，请稍后再试！')
    if(rsp?.data?.code !== errorCode.SUCCESS_CODE) {
      const err = new Error(rsp?.data?.message)
      err.code = rsp?.data?.code
      throw err
    }
    return rsp?.data?.data
  }).catch(config?.errorHandler || commonRequestErrorHandler)
  axiosRequest.source = source
  return axiosRequest
}

export default request

// 默认异常处理的通常方法
function commonRequestErrorHandler(error) {
  if (axios.isCancel(error)) {
    console.log('Request canceled', error.message)
    throw error
  }

  if(error.code.slice(-3) === errorCode.USER_NOT_LOGIN) {
    message('用户未登录或登录超时，请重新登录！').then(() => router.push('/login'))
    throw error
  }

  toast.error(error.message)
  throw error
}