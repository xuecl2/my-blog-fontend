const loadingTemplate = `
<div class="modal-backdrop show text-center d-none" style="line-height: 100vh">
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden"></span>
  </div>
</div>
`
const maskDom = new DOMParser().parseFromString(loadingTemplate, 'text/html').querySelector('.modal-backdrop')
document.body.appendChild(maskDom)

function show(text) {
  maskDom.querySelector('.visually-hidden').innerText = text
  maskDom.classList.remove('d-none')
  maskDom.classList.add('d-block')
}

function hide() {
  maskDom.querySelector('.visually-hidden').innerText = ''
  maskDom.classList.remove('d-block')
  maskDom.classList.add('d-none')
}

export default {
  show: show,
  hide: hide,
}

