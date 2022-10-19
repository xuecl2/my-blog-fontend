export class queryBlogListRequest {
  constructor(params) {
    this.config = {
      url: 'article',
      requestMethod: 'post'
    }
    this.data = {
      tradeCode: 'articleHandler',
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
      url: 'article',
      requestMethod: 'post'
    }
    this.data = {
      tradeCode: 'articleHandler',
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
      url: 'article',
      requestMethod: 'post'
    }
    this.data = {
      tradeCode: 'articleHandler',
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
      url: 'article',
      requestMethod: 'post'
    }
    this.data = {
      tradeCode: 'articleHandler',
      data: {
        operation: 'delete',
        id: params.id,
      }
    }
  }
}