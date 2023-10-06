import request  from "@/utils/request.js"

export function login(user, password) {
  return request('user/login', { user, password })
}

export function register(user) {
  return request('user/register', user)
}

export function resendActiveEmail(user) {
  return request('user/sendActiveEmail', user)
}

