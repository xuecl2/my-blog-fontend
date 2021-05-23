import errorCodeUtils from '@/utils/errorCodeUtils'
import axios from 'axios'
import toast from '../components/bs-toast';

export function axiosRequestErrorHandler(error) {
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
}

export function commonRequestErrorHandler(error) {    
    let err = axiosRequestErrorHandler(error)
    console.log(err)
    toast.error(error.message)
    throw err
}
