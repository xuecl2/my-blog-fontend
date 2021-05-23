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
          <button class="btn btn-secondary" type="button" data-bs-dismiss="modal" @click="cancel()">Close</button>
          <button class="btn btn-primary" type="button" @click="save()">Save changes</button>
        </div>
      </div>
    </div>
  </div>
 <!-- <el-dialog :visible.sync="dialogVisible" :close-on-click-modal = "false" :close-on-press-escape = "false" @open = "init()">
    <template #title>{{operation | operationFilter}}</template>
    <div class="card">
      <div class="card-body">
        <el-form :model="blogObjectCopy" label-width="60px">
          <el-row :gutter="60">
            <el-col :span = "12">
              <el-form-item label = "标题" prop="title" >
                <el-input size = "small" v-model="blogObjectCopy.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span = "12">
              <el-form-item label = "关键词" prop="keyWord">
                <el-input size = "small" v-model="blogObjectCopy.keyWord"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span = "24">
              <el-form-item label = "摘要" prop="digest">
                <el-input size = "small" type = "textarea" :rows="4"  v-model="blogObjectCopy.digest"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type = "flex" justify="end">
            <el-col :span ="6">
              <button class="btn btn-primary" @click="save()">确定</button>
              <button class="btn btn-primary" @click="cancel()">取消</button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </el-dialog> -->
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
  created() {
    this.init()
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
        this.$router.push({name: 'BlogEdit', params: {id: data.id}})
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
      this.$emit('close-dialog')
    },
    init(){
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
