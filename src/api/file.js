export class uploadFile {
  constructor(params) {
    this.config = {
      url: 'file/imgUpload' + params.id,
    }
    this.data = new FormData()
    this.data.append('file',params.file)
    this.data.append('name',params.filename)
  }
}