import { errCode } from '@/global/globalConsts.js'
import axios from 'axios'
import toast from '../components/bs-toast';

const utils = {
  isBlank(value) {
    if (value === undefined || value === null || value === '') {
      return true
    }
    return false
  },

  debounce(func, interval) {
    if (interval === undefined) interval = 2000 // default interval
    let lock = false
    return function () {
      if (lock) return
      lock = true
      func.apply(this, arguments)
      setTimeout(() => {
        lock = false
      }, interval)
    }
  },

  // 异常处理的通常方法
  commonErrorHandler(error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    toast.error(error.message)
    let err = new Error('request failed')
    err.errType = errCode.reqFailed
    throw err
  },

  /**
   * 根据图片url生成markdown格式的文本
   * @param {String} url 图片url 
   * @param {String} description 图片描述
   * @returns 生成的markdown格式的文本
   */
  getImgMarkdownString(url, description) {
    return `![${description}](${url})`
  },

  /**
   * 针对多行文本溢出的结尾处添加省略号的需求，计算省略后的文本 
   * @param {Element} element 用于放置文本的容器
   * @param {int} rows 行数
   * @param {String} rawText 文本
   * @returns 处理后的文本
   */
  getMultipleLinesEclipseText(element, rows, rawText) {
    let actualRows = utils.getTotalRows(element, rawText)
    if(actualRows <= rows) return rawText

    let text = rawText.slice(0, Math.floor((rows / actualRows) * rawText.length))
    actualRows = utils.getTotalRows(element, text)
    for(;;) {
      if(actualRows <= rows) {
        text += rawText.slice(text.length, text.length + 1)
        actualRows = utils.getTotalRows(element, text)
        if(actualRows === rows + 1) break
      }

      if(actualRows > rows) {
        text = text.slice(0, -1)
        actualRows = utils.getTotalRows(element, text)
        if(actualRows === rows) break
      }
    }

    const postFix = '...'
    for(;;) {
      text = text.slice(0, -1)
      actualRows = utils.getTotalRows(element, text + postFix)
      if(actualRows <= rows) break
    }
    return text + postFix
  },

  /**
   * 
   * @param {Element} element 文本容器元素 
   * @param {String} text 文本
   * @returns 行数 
   */
  getTotalRows(element, text) {
    element.innerText = text
    const style = getComputedStyle(element)
    const lineHeight = parseFloat(style.lineHeight.slice(0, -2))
    const height = parseFloat(style.height.slice(0, -2))
    return Math.ceil(height/lineHeight)
  }
}
export default utils