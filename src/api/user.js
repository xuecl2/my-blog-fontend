import request  from "@/utils/request.js"

export function login(user, password, rememberMe) {
  return request('/user/login', { user, password, rememberMe })
}

export function register(user) {
  return request('/user/register', user)
}

export function sendActiveCode(email) {
  return request('/user/send-active-code', { email })
}

export function modifyPasswd(password, newPassword) {
  return request('/user/modify-passwd', { password, newPassword })
}

export function logout() {
  return request('/user/logout')
}

export function sendResetPasswordEmail(username) {
  return request('/user/send-reset-password-email', { username })
}

export function resetPassword(id, code) {
  return request('/user/reset-password', { id, code }, { method: 'get' })
}

