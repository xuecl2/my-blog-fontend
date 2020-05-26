<template>
  <div class = "pic-wall-box">
    <el-upload action="1" list-type="picture-card" :auto-upload="false" :file-list="fileList"
    :on-preview="handlePictureCardPreview" :drag="true"  ref="upload">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" width="500px">
      <template #title>
        <span v-if= "currentFile.status === 'success'" style = "font-size: 20px; font-weight: bold">上传成功  <i class = "fa fa-check-circle" style = "color: green"></i></span>  
        <span v-if= "!(currentFile.status === 'success')" style = "font-size: 20px; font-weight: bold">未上传  <i class = "fa fa-times-circle" style = "color: red"></i></span>      
      </template>
      <el-form :inline = "true" > 
        <el-form-item label = "图片名" style = "margin-bottom: 5px">
          <el-input placeholder="请输入要上传的图片名" size = "mini" v-model="currentFile.name"></el-input>
        </el-form-item>        
        <el-button size = "mini" type = "primary" style = "vertical-align: -10px" @click="upload()">上传</el-button>
      </el-form>      
      <span v-if= "currentFile.status === 'success'">url: {{currentFile.url}}</span>
      <img width="100%" :src="dialogImageUrl" alt="图片加载失败" style = "margin-top: 10px">
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import request from '@/request/commonRequest.js'
// import utils from '@/global/utils/utils'

export default {
  name: 'PictureWall',
  components: {
  },
  data(){
    return {
      dialogVisible: false,
      picList: [],
      dialogImageUrl: '',
      currentFile: {
        name: '',
        url: '',
        status: '',
      },
      fileList: [{name:'adf',url:'localhost:8080/57/test.jpg'}],
    }
  },
  watch: {
    'currentFile.status' (value, oldValue){
      console.log('value: ' + value)
      console.log('oldValue: ' + oldValue)
    }
  },
  props:{
    id: {type: Number}
  },
  created(){
  },
  methods:{
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url
      Object.assign(this.currentFile,file)
      this.dialogVisible = true
    },
    upload(){
      let data = new FormData()
      data.append('file',this.currentFile.raw)
      data.append('name',this.currentFile.name)
      /* eslint-disable */
      request(data,{url: evnConfig.uploadFileUrl + '/' + this.id}).then(() => {
        this.$message.success('上传成功')
        // this.dialogVisible = false
        // this.currentFile.name = this.currentImgName
        this.currentFile.status = 'success'
        this.fileList.push({
          name: this.currentFile.name,
          url: this.currentFile.url,
        })
      })
      /* eslint-enable */
    },
    fileChangeHandler(file, fileList){
      console.log('bbb')
      console.log(file)
      console.log(fileList)
      console.log(this.$refs.upload.uploadFiles)
    }
  },
}
</script>

<style lang="less" scoped>
  /deep/ .el-upload-dragger{
    width: 100px !important;
    height: 100px !important;
  }
  /deep/ .el-upload--picture-card {
    width: 100px !important;
    height: 100px !important;
    line-height: 100px !important;
  }
  /deep/ .el-icon-plus {
    line-height: 100px !important;
  }
  /deep/ .el-upload-list__item {
    width: 100px !important;
    height: 100px !important;
  }
  /deep/ .el-dialog__body {
    padding-top: 10px;
  }
  .pic-wall-box {
    margin-top: 20px;
  }
</style>
