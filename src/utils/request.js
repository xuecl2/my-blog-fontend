import axios from 'axios'
import toast from '../components/bs-toast'

const SUCCESS_CODE = '000000'

const defaultConfig = {
  baseURL: window.API_URL,
  timeout: 30000,
  method: 'post',
  headers: {'Content-Type': 'application/json'},
}

const request = (url, data, config) => {
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()
  // more axios config instruction in http://axios-js.com/docs/index.html#Request-Config    
  let axiosRequest = axios(Object.assign({}, defaultConfig, {cancelToken: source.token, data, url}, config)).then(rsp => {
    if(!rsp?.code) throw new Error('服务端异常，请稍后再试！')
    if(rsp.code !== SUCCESS_CODE) {
      const err = new Error(rsp.message)
      err.code = rsp.code
      throw err
    }
    return rsp.data
  }).catch(config?.errorHandler || commonRequestErrorHandler)
  axiosRequest.source = source
  return axiosRequest
}

export default request

// 默认异常处理的通常方法
commonErrorHandler(error) {
  if (axios.isCancel(error)) {
    console.log('Request canceled', error.message)
    throw error
  }
  toast.error(error.message)
  throw error
}