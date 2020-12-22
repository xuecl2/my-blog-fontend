const CLIENT_FLAG = 'C'
const SERVER_FLAG = 'S'
const TEC_ERR_FLAG = 'T'
const BUSI_ERR_FLAG = 'B'
// const SUCCESS_FLAG = 'S'
const SUCCESS_CODE = '000000'
const UNDEFINED_ERR = {
    code: '999999',
    desc: '未定义错误'
}
const REQUEST_ERROR = {
    code: '001001',
    desc: '网络请求错误'
}


// code说明: 系统编码(1位) + 信息类型(1位) + 模块(3位) + 序号(3位)

const errorCodeUtils = {
    isClientError(code) {
        if(code.slice(0,1) === CLIENT_FLAG) return true
        return false
    },
    isServerError(code) {
        if(code.slice(0,1) === SERVER_FLAG) return true
        return false
    },
    isTecError(code) {
        if(code.slice(0,2) === TEC_ERR_FLAG) return true
        return false
    },
    isBusiError(code) {
        if(code.slice(0,2) === BUSI_ERR_FLAG) return true
        return false
    },
    isSucessCode(code) {
        if(code.slice(2,8) === SUCCESS_CODE) return true
        return false
    },
    isUndefinedErrorCode(code) {
        if(code.slice(2,8) === UNDEFINED_ERR.code) return true
        return false
    },
    getClientUndefinedError (error) {
        if(typeof error === undefined) {
            let error = new Error(UNDEFINED_ERR.desc)
            error.errorCode = CLIENT_FLAG + TEC_ERR_FLAG + UNDEFINED_ERR.code
        }else {
            error.errorCode = CLIENT_FLAG + TEC_ERR_FLAG + UNDEFINED_ERR.code
        }
        return error
    },
    getServeRspError(code, message, data) {
        let error = new Error(message)
        error.errorCode = SERVER_FLAG + code
        error.rspData = data
    },
    getClientRequestError(error) {
        if(typeof error === undefined) {
            let error = new Error(REQUEST_ERROR.desc)
            error.errorCode = CLIENT_FLAG + TEC_ERR_FLAG + REQUEST_ERROR.code
        }else {
            error.errorCode = CLIENT_FLAG + TEC_ERR_FLAG + REQUEST_ERROR.code
        }
        return error
    }
}
export default errorCodeUtils