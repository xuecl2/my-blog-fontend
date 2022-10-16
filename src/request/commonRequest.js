import axios from 'axios'
import {commonRequestErrorHandler as errorHandlerUtils} from '@/utils/errorHandlerUtils'
import errorCodeUtils from '@/utils/errorCodeUtils'

const defaultAxiosConfig = {
  baseURL: window.envConfig.baseUrl,
  timeout: 30000,
  method: 'post',
}

const request = (params) => {
  let data = params.data
  let config = params.config
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()
  defaultAxiosConfig.cancelToken = source.token
  defaultAxiosConfig.data = data
  // more axios config instruction please see http://axios-js.com/docs/index.html#Request-Config    
  let request = axios(Object.assign({}, defaultAxiosConfig, config)).then(rsp => {
    let {data} = rsp
    if(data.responseCode !== '000000') throw errorCodeUtils.getServeRspError(data.responseCode, data.responseMessage, rsp)
    return data.body
  }).catch(config.errorHandler?config.errorHandler:errorHandlerUtils)
  request.source = source
  return request
}

export default request