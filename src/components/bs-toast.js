import {Toast as bsToast} from 'bootstrap/dist/js/bootstrap.esm'

let toastCount = 0
document.body.appendChild(new DOMParser().parseFromString(`<div class="toast-container position-absolute pt-5 top-0 translate-middle-x start-50"></div>`, 'text/html').querySelector('.toast-container'))

function toast(text, config) {
    const toastContainer = document.querySelector('.toast-container')
    if (!config) config = {}
    const { delay = 3000, closeable = true, title, type } = config
    const template = `
    <div id="bs-toast-${++toastCount}" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="${delay}">
        <div class="toast-header ${title ? 'd-block' : 'd-none'}">
            <strong class="me-auto">${title}</strong>
        </div>
        <div class="toast-body d-flex fz-6 align-items-center">
            <span class="me-auto">
            <i class="bi bi-check-circle-fill text-success fs-5 me-2 ${type === 'success' ? 'd-inline' : 'd-none'}"></i>
            <i class="bi bi-exclamation-triangle-fill text-success fs-5 me-2 ${type === 'warn' ? 'd-inline' : 'd-none'}"></i>
            <i class="bi bi-x-circle-fill text-warning fs-5 me-2 ${type === 'error' ? 'd-inline' : 'd-none'}"></i>
            ${text}</span>
            <button type="button" class="btn-close me-1 ${closeable ? 'visible' : 'invisible'}" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
    `
    const dom = new DOMParser().parseFromString(template, 'text/html').querySelector(`#bs-toast-${toastCount}`)
    toastContainer.prepend(dom)
    dom.addEventListener('hidden.bs.toast', () => {
        toastContainer.removeChild(dom)
    })
    const toast = new bsToast(`#bs-toast-${toastCount}`)
    toast.show()
}

function success(text, config) {
    config = Object.assign({ type: 'success' }, config)
    toast(text, config)
}

function alert(text, config) {
    config = Object.assign({ type: 'alert' }, config)
    toast(text, config)
}

function warning(text, config) {
    config = Object.assign({ type: 'warn' }, config)
    toast(text, config)
}

export default {
    toast: toast,
    success: success,
    error: alert,
    warning: warning,
}



