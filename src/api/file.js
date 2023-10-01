import request  from "@/utils/request.js"

export function uploadFile(filename, file) {
  const data = new FormData()
  data.filename = filename
  data.file = file
  return request('file/upload', data)
}