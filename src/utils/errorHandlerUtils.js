import errorCodeUtils from '@/utils/errorCodeUtils'
import {Message} from 'element-ui'
import axios from 'axios'

const utils = {
    axiosRequestErrorHandler(error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message)
            return errorCodeUtils.getClientRequestError(error)
        } else if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            return error
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            return errorCodeUtils.getClientRequestError(error)
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            return error
        }
    },
    commonRequestErrorHandler(error) {
        let err = this.axiosRequestErrorHandler(error)
        Message.error(error.message)
        throw err
    },
}

export default utils