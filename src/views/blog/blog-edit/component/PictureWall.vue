<template>
  <div class = "pic-wall-box">
    <uploader v-for="(pic, index) in fileList" :key = "pic.id" class="uploader"
      :initName="pic.uploadName" :downloadUrl="pic.downloadUrl" @upload="uploadHandler"
      :index="index" @change="changeHandler" @delete-file="deleteFile"></uploader>
  </div>
</template>

<script>
// @ is an alias to /src
import request from '@/request/commonRequest.js'
import uploader from '@/components/MyUploader.vue'
import {Pic} from '@/global/globalConsts.js'
import {uploadFile} from '@/api/blog'
import {deleteFile} from '@/api/blog'

export default {
  name: 'PictureWall',
  components: {
    uploader
  },
  props:{
    id: {type: Number},
    serverPicList: {type: Array, default: () => []}
  },
  data() {
    return {
      fileList: [new Pic()],
    }
  },
  computed: {
  },  
  watch: {
    serverPicList(list){
      this.fileList = this.fileList.filter(item => {
        return !item.downloadUrl
      })
      // debugger
      list.forEach(item => {
        this.fileList.unshift(item)
      })
    }
  },
  methods: {
    uploadHandler(fileObject){
      let index = fileObject.index
      /* eslint-disable */
      request(new uploadFile({...fileObject,id: this.id})).then(data => {
        this.$message.success('上传成功')
        this.fileList[index].uploadName = fileObject.name
        this.fileList[index].downloadUrl = envConfig.baseUrl + data.url
      })
    },
    deleteFile(fileObject){
      let index = fileObject.index
      if(!fileObject.downloadUrl) return this.removeUploader(index) 
      request(new deleteFile({filename: fileObject.filename, id: this.id})).then(() => {
        this.$message.success('文件删除成功！')
        this.removeUploader(index)
      })
    },
    /* eslint-enable */
    removeUploader(index){
      this.fileList = [...this.fileList.slice(0,index),...this.fileList.slice(index + 1,this.fileList.length)]
    },
    changeHandler(){
      this.fileList.push(new Pic())
    },
    
  },
  
  
}
</script>

<style lang="less" scoped>
  .pic-wall-box {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    .uploader {
      margin:5px 10px;
    }
  }
</style>
