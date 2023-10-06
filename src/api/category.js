import request  from "@/utils/request.js"

export function queryAllCategories() {
  return request('category/query-all')
}

export function addCategory(category) {
  return request('category/add', { category })
}

export function deleteCategory(id) {
  return request('category/delete', { id })
}

export function updateCategory(category) {
  return request('category/update', { category })
}