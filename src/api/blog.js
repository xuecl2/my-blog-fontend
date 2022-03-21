export class queryBlogListRequest {
  constructor(params) {
    this.config = {
      requsetPath: '',
      requestMethod: 'post'
    }
    this.data = {
      tradeCode: 'blogHandle',
      data: {
        operation: 'query',
        title: params.title,
        keyWord: params.keyWord,
        startModifyDate: params.startModifyDate,
        endModifyDate: params.endModifyDate,
        queryCondition: params.queryCondition,
        pageNo: params.pageNo,
        rowsPerPage: params.rowsPerPage,
      }
    }
  }
}

export class queryDetailBlogInfo {
  constructor(params) {
    this.config = {
      requsetPath: '',
      requestMethod: 'post'
    }
    this.data = {
      tradeCode: 'blogHandle',
      data: {
        operation: 'queryById',
        id: params.id,
      }
    }
  }
}

export class saveBlog {
  constructor(params) {
    this.config = {
      requsetPath: '',
      requestMethod: 'post'
    }
    this.data = {
      tradeCode: 'blogHandle',
      data: {
        operation: 'save',
        id: params.id,
        title: params.title,
        keyWord: params.keyWord,
        content: params.content,
        digest: params.digest,
        user: params.user,
      }
    }
  }
}

export class deleteBlog {
  constructor(params) {
    this.config = {
      requsetPath: '',
      requestMethod: 'post'
    }
    this.data = {
      tradeCode: 'blogHandle',
      data: {
        operation: 'delete',
        id: params.id,
      }
    }
  }
}
/* eslint-disable */
export class uploadFile {
  constructor(params) {
    this.config = {
      requsetPath: '',
      requestMethod: 'post',
      baseURL: envConfig.fileUploadUrl,
      url: params.id.toString(),
    }
    this.data = new FormData()
    this.data.append('file',params.file)
    this.data.append('name',params.filename)
  }
}

export class deleteFile {
  constructor(params) {
    this.config = {
      requsetPath: '',
      requestMethod: 'post',
      baseURL: envConfig.fileDeleteUrl,
    }
    this.data = {
      filename: params.filename,
      id: params.id
    }
  }
}
/* eslint-enable */