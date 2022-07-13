<template>
  <div class="modal fade text-start show" v-if="dialogVisible" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display: block;">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header border-0 bg-gray-100">
          <h3 class="h5 text-uppercase modal-title" id="exampleModalLabel">{{operation | operationFilter}}</h3>
          <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" @click="cancel()"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label>标题</label>
              <input v-model="blogObjectCopy.title" class="form-control">
            </div>
            <div class="mb-3">       
              <label>关键词</label>
              <input v-model="blogObjectCopy.keyWord" class="form-control">
            </div>
            <div class="mb-3">       
              <label>摘要</label>
              <textarea v-model="blogObjectCopy.digest" rows="4" class="form-control"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer border-0 bg-gray-100">
          <button class="btn btn-secondary" type="button" data-bs-dismiss="modal" @click="cancel()">取消</button>
          <button class="btn btn-dark" type="button" @click="save()">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/request/commonRequest'
import utils from '@/utils/commonUtils'
import {saveBlog} from '@/api/blog.js'

const operationMap = {
  add: '新增文章',
  modify: '修改文章'
}
export default {  
  name: 'BlogModificationDialog',
  components: {
  },
  props:{
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    blogObject: {
      type: Object,
      default: function(){
        return {
          title: '',
          keyWord: '',
          digest: '',
          id: '',
        }       
      }        
    }
  },
  filters: {
    operationFilter(value){
      return operationMap[value]
    }
  },
  data(){
    return {
      operation: '',  // 当前dialog执行的操作是新增还是修改
      blogObjectCopy: {}  // 传入的blog对象的副本，避免组件内部直接改变原对象
    }
  },
  watch: {
    dialogVisible(value) {
      if(value) this.init()
    }
  },
  methods: {
    save(){
      switch (this.operation) {
        case 'add':
          this.add()
          break;
        case 'modify':
          this.modify()
          break;
        default:
          break;
      }
      
    },
    add() {
      let requestData = JSON.parse(JSON.stringify(this.blogObjectCopy))
      requestData.user = 'xuecl'
      request(new saveBlog(requestData)).then((data) => {
        this.$toast.success('添加成功！')
        this.$router.push({name: 'BlogEdit', params: {blogid: data.id.toString()}})
      })
    },
    modify() {
      let requestData = JSON.parse(JSON.stringify(this.blogObjectCopy))
      requestData.user = 'xuecl'
      request(new saveBlog(requestData)).then(() => {
        this.$toast.success('修改成功')
        this.$emit('refresh')
        this.cancel()
      })
    },
    cancel() {
      // this.dialogVisible = false
      this.$emit('update:dialogVisible', false)
    },
    init(){
      console.log(this.blogObject)
      this.blogObjectCopy = JSON.parse(JSON.stringify(this.blogObject))
      if(utils.isBlank(this.blogObjectCopy.id)){
        this.operation = 'add'
      }else {
        this.operation = 'modify'
      }
    },
  },
}
</script>

<style scoped>
  .query-params-card {
    margin-bottom: 5vh;
  }
  .data-picker-input {
    width: 180px !important;
  }
  .article-list-card {
    height: 70vh;
  }
</style>
