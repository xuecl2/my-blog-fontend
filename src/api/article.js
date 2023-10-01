import request  from "@/utils/request.js"

export function addArticle(article) {
  return request('article/add', { article })
}

export function queryArticleList(startPage, pageSize, queryParams) {
  return request('article/query', { startPage, pageSize, queryParams })
}

export function getArticleDetail(id) {
  return request('article/detail', { id })
}

export function updateArticle(article) {
  return request('article/update', { article })
}

export function deleteArticle(id) {
  return request('article/delete', { id })
}