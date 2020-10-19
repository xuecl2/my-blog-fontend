class blogHandleApi {
    constructor(operation,data) {
        this.tradeCode = 'blogHandle'
        if(data == null || data == '') data = {}
        this.data = data
        this.data.operation = operation        
    }
}

class dataSyncApi {
    constructor() {
        this.tradeCode = 'dataSync'
        
    }
}

export {blogHandleApi,dataSyncApi}