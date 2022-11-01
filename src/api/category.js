export class addCategoryReq {
  constructor(categoryName, parentCategory) {
    this.config = {
      url: 'category',
    }
    this.data = {
      tradeCode: 'add',
      data: {
        categoryName,
        parentCategory,
      }
    }
  }
}

export class deleteCategoryReq {
  constructor(id) {
    this.config = {
      url: 'category',
    }
    this.data = {
      tradeCode: 'delete',
      data: {
        id,
      }
    }
  }
}

export class updateCategoryReq {
  constructor(id, categoryName, parentCategory) {
    this.config = {
      url: 'category',
    }
    this.data = {
      tradeCode: 'update',
      data: {
        id,
        categoryName,
        parentCategory,
      }
    }
  }
}

export class queryAllCategoryReq {
  constructor() {
    this.config = {
      url: 'category',
    }
    this.data = {
      tradeCode: 'queryAll',
      data: {
      }
    }
  }
}