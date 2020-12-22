<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span = "12">
        <h3 style="margin-left: 30px">{{blogObject.title}}</h3>
      </el-col>
      <el-col :span = "3" style="line-height: 63px">
        <el-button v-show = "mode=='edit'" type = "primary" size = "mini" icon = "fa fa-floppy-o" @click.native = "save()"> 保存</el-button>
        <el-button v-show="mode=='view'" type ="primary" size = "mini" icon = "fa fa-ban" @click.native = "toggleViewerToEditor()"> 编辑</el-button>
        <el-button v-show="mode=='edit'" type ="primary" size = "mini" icon = "fa fa-ban" @click.native = "toggleViewerToEditor()"> 返回</el-button>
        <!-- <el-button type = "primary" size = "mini" icon = "fa fa-ban" @click.native = "refresh()"> 刷新</el-button> -->
      </el-col>
    </el-row>
    <component ref="editor" :is="TuiEditorMode" :foucsHandler="tuiFocusHandler" :blurHandler="tuiBlurHandler"></component>
    <picture-wall v-if="mode=='edit'" ref="picWall" :id=blogObject.id :serverPicList="fileList"></picture-wall>
  </div>
</template>

<script>
// @ is an alias to /src
import TuiEditor from '@/components/TuiEditor.vue'
import TuiViewer from '@/components/TuiViewer.vue'
import request from '@/request/commonRequest.js'
import utils from '@/utils/commonUtils'
import pictureWall from './component/PictureWall'
import {Pic} from '@/global/globalConsts.js'
import {blogHandleApi} from '@/api/apis.js'


export default {
  name: 'EditBlog',
  components: {
    TuiEditor,pictureWall,TuiViewer
  },
  data(){
    return {
      blogObject: {},
      fileList: [],
      TuiEditorMode: TuiViewer,
    }
  },
  props:{
    id: {type: Number},
  },
  computed:{
    mode(){
      return this.TuiEditorMode == TuiEditor?'edit':'view'
    }
  },
  created(){
    if(utils.isBlank(this.id)) {
      this.$message.error('id为空，请重新发起请求')
      return
    }
    this.refresh()
  },
  beforeRouteLeave (to, from, next){
    let leaveFlag = this.submitCompletedCheck()
    if(!leaveFlag) {
      this.$msgbox.confirm("有更改内容或图片未提交，确认离开此页面?").then(()=> next())
      return
    }    
    next()
  },
  beforeDestroy(){
    this.tuiBlurHandler()
  },
  methods:{
    toggleViewerToEditor(){
      if(this.mode == 'edit') {
        let leaveFlag = this.submitCompletedCheck()
        if(leaveFlag) {
          this.TuiEditorMode = TuiViewer
        }else{
          this.$msgbox.confirm("有更改内容或图片未提交，确认离开?").then(()=>{
            this.TuiEditorMode = TuiViewer
            this.refresh()
          })
          return
        }
      }else {
        this.TuiEditorMode = TuiEditor
      }
      this.refresh()
    },
    save(){
      this.blogObject.content = this.$refs.editor.getMarkdown()
      let requestData = JSON.parse(JSON.stringify(this.blogObject))
      requestData.user = 'xuecl'
      request(new blogHandleApi('save',requestData)).then(() => {
        this.$message.success('保存成功！')
      })
    },
    refresh(){
      request(new blogHandleApi('queryById', {id: this.id})).then(({blogObject}) => {
        this.blogObject = {
          id: blogObject.id,
          title: blogObject.blogTitle,
          keyWord: blogObject.blogKeyWord,
          content: blogObject.blogContent,
          digest: blogObject.blogDigest,
        }
        this.$refs.editor.setMarkdown(this.blogObject.content)
       /* eslint-disable */
       this.fileList = []
        blogObject.fileList.forEach(element => {
          let arrayTmp = element.split('=')
          let filename = decodeURIComponent(arrayTmp[arrayTmp.length - 1])
          let pic = new Pic()
          pic.downloadUrl = evnConfig.baseUrl + element
          pic.uploadName = filename
          pic.id = pic.id + filename
          this.fileList.push(pic)
        })
        /* eslint-enable */
      })
    },
    tuiSaveShortcutsReplace(event){
      if(event.ctrlKey && event.keyCode == 83){
        this.save()
        event.preventDefault()
        event.stopImmediatePropagation()
      }
    },
    tuiFocusHandler(){
      window.addEventListener('keydown',this.tuiSaveShortcutsReplace,true)
    },
    tuiBlurHandler(){
      window.removeEventListener('keydown',this.tuiSaveShortcutsReplace,true)
    },
    submitCompletedCheck(){
      let flag = true
      if(this.mode == 'view') return flag
      const fileList = this.$refs.picWall.fileList.slice(0,-1)
      for(let i = 0; i<fileList.length; i++){
        if(!fileList[i].downloadUrl){
          flag = false
          break
        }
      }
      const blogContent = this.$refs.editor.getMarkdown()
      if(blogContent !== this.blogObject.content){
        flag = false
      }
      return flag
    }
  },
  
}
</script>

<style lang="less" scoped>
  .el-button--mini{
    padding-left: 7px;
    padding-right: 7px;
  }

</style>
