// 错误的错误状态码
const errCode = {
    'reqFailed': '000',  // 请求失败
}
class Pic { // 图片的类
  constructor() {
    this.uploadName = ''
    this.downloadUrl = ''
    this.id = new Date().getTime().toString()
  }
}
export {errCode, Pic}


