import {Modal as bsMessageBox} from 'bootstrap/dist/js/bootstrap.esm'

function message(text, config) {
  return new Promise((resolve, reject) => {
    if (!config) config = {}
    const {  title, buttonConfirmText, buttonClose } = config
    

    const template = `
    <div id="bs-message-box" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${title ?? '提示'}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>${text}</p>
        </div>
        <div class="modal-footer">
          <button id="confirm-button" type="button" class="btn btn-primary" data-bs-dismiss="modal">${buttonConfirmText ?? '确定'}</button>
          <button id="close-button" type="button" class="btn btn-secondary ${buttonClose?'':'d-none'}" data-bs-dismiss="modal">取消</button>
        </div>
        </div>
      </div>
    </div>
    `
    const dom = new DOMParser().parseFromString(template, 'text/html').querySelector(`#bs-message-box`)
    document.body.appendChild(dom)
    document.querySelector('#confirm-button').addEventListener('click', resolve)
    document.querySelector('#close-button').addEventListener('click', reject)
    const messageBox = new bsMessageBox(document.querySelector(`#bs-message-box`))
    messageBox.show()
    dom.addEventListener('hidden.bs.modal', () => {
      document.body.removeChild(dom)
    })
  })
}
export default message

