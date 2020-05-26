<template>
  <div>
    <el-tooltip :content="filename" :disabled = "!filename" placement="top-start">
      <div class="name-box">{{filenameForDisplay}}</div>
    </el-tooltip>
    <div v-if="!this.url" class="upload-box before-selecte-file" @click="selectFile()">
      <i class="el-icon-plus avatar-uploader-icon"></i>
      <input ref="fileInput" v-show="false" type="file" @change="fileChangeHandler"/>
    </div>
    <div v-else class="upload-box after-selecte-file">
      <label v-if= "downloadUrl" class="success-label">
        <i class="el-icon-check"></i>
      </label>
      <div class="mask"></div>
      <i class="el-icon-plus avatar-uploader-icon"></i>
      <img :src='url' alert="图片加载失败"/>
      <div class = "icon-row">
        <i class="el-icon-zoom-in" @click="showDialog()"></i>
        <i class="el-icon-delete" @click="deleteFile()"></i>
      </div>
      <input ref="fileInput" v-show="false" type="file" @change="fileChangeHandler"/>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="500px" :close-on-click-modal = "false">
      <template #title>
        <span v-if= "downloadUrl" style = "font-size: 20px; font-weight: bold">上传成功  <i class = "fa fa-check-circle" style = "color: green"></i></span>  
        <span v-else style = "font-size: 20px; font-weight: bold">未上传  <i class = "fa fa-times-circle" style = "color: red"></i></span>      
      </template>
      <el-form :inline = "true" > 
        <el-form-item label = "图片名" style = "margin-bottom: 5px">
          <el-input placeholder="请输入要上传的图片名" size = "mini" v-model="filename"></el-input>
        </el-form-item>        
        <el-button size = "mini" type = "primary" style = "vertical-align: -10px" @click="upload()">上传</el-button>
      </el-form>      
      <span v-if= "downloadUrl">{{downloadUrl}}</span>
      <img width="100%" :src="url" alt="图片加载失败" style = "margin-top: 10px">
    </el-dialog>
  </div>
</template>

<script>
// 自定义的图片上传组件
// @ is an alias to /src

export default {
  name: 'MyUploader',
  data(){
    return{
      file: null,
      url: this.downloadUrl?this.downloadUrl:'',
      filename: this.initName?this.initName:'',
      dialogVisible: false,
    }
  },
  props:{
    downloadUrl: {type:String, default: ''},
    initName: {type:String, default: ''},
    index: {type: Number, default: 0}
  },
  computed: {
    filenameForDisplay(){
      if(!this.filename) return ''
      let array = this.filename.split('.')
      if(array.length > 1) {
        return this.filename.slice(0,this.filename.length - array[array.length - 1].length - 1)
      }else {
        return this.filename
      }
    }
  },
  mounted(){
  },
  methods:{
    selectFile(){
      this.$refs.fileInput.click()
    },
    fileChangeHandler(e){
      this.file = e.target.files[0]
      this.url = URL.createObjectURL(this.file)
      this.filename = this.file.name
      this.$emit('change',this.file)
    },
    upload(){
      this.$emit('upload',{
        filename: this.filename, 
        file: this.file,
        url: this.url,
        index: this.index
      })
    },
    showDialog(){
      this.dialogVisible = true
    },
    deleteFile(){
      this.$emit('delete-file', {
        filename: this.filename, 
        downloadUrl: this.downloadUrl,
        index: this.index
      })
    }
  },
}
</script>

<style lang="less" scoped>
  .name-box {
    width: 100px;
    height: 15px;
    font-size: 13px;
    font-weight: bold;
    overflow: hidden;
  }
  .upload-box {
    width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    text-align: center;
    line-height: 100px;
    position: relative;
    .avatar-uploader-icon {
      font-size: 20x;
      color: #8c939d;
    }
  }
  .before-selecte-file:hover {
    border-color: #409EFF;
  }
  .upload-box:hover .icon-row{
    visibility: visible;
  }
  .before-selecte-file {
    cursor: pointer;
  }
  .after-selecte-file {
    overflow: hidden;
    .success-label{
      position: absolute;
      right: -15px;
      top: -6px;
      width: 40px;
      height: 24px;
      background: #13ce66;
      text-align: center;
      transform: rotate(45deg);
      box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);
      z-index: 4;
      i {
        font-size: 12px;
        margin-top: 11px;
        transform: rotate(-45deg);
        position: relative;
        top: -35px;
        color: white;
      }
    }
    .mask {
      width: 100px;
      height: 100px;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 2;
    }
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    .icon-row{
      width: 80px;
      height: 40px;
      margin-top: 30px;
      margin-bottom: 30px;
      position: absolute;
      top:0;
      left: 0;
      z-index: 3;
      display: flex;
      justify-content: space-around;
      align-items: center;
      visibility: hidden;
      padding-left: 10px;
      padding-right: 10px;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .after-selecte-file:hover {
    .mask {
      opacity: 1;
      background: rgba(0,0,0,.5);
    }
  }
  /deep/ .el-dialog__body {
    padding-top: 10px
  }
</style>>

