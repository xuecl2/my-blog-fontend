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
              <label>分类名</label>
              <input v-model="categoryObjCopy.name" class="form-control">
            </div>
            <div class="mb-3">       
              <label>描述</label>
              <input v-model="categoryObjCopy.desc" class="form-control">
            </div>
            <div class="mb-3">       
              <label>父级分类</label>
              <multi-level-select class="w-100" :options="categoryTree"></multi-level-select>
              <!-- <textarea v-model="categoryObjCopy.parent" rows="4" class="form-control"></textarea> -->
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
// import request from '@/request/commonRequest'
// import utils from '@/utils/commonUtils'
import MultiLevelSelect from '@/components/MultiLevelSelect'

export default {  
  name: 'CategoryEditDialog',

  components: {
    MultiLevelSelect,
  },

  props:{
    dialogVisible: {
      type: Boolean,
      default: false,
    },

    categoryObj: {
      type: Object,
    },

    operation: {
      type: String,
      default: '',
    }
  },

  data() {
    return {
      categoryTree: [
        { key: '01', value: 'lorem' },
        {
          key: '02',
          value: '水果',
          children: [
            { key: '03', value: '橘子' },
            { key: '04', value: '苹果' },
            { key: '05', value: '菠萝' },
          ],
        },
        {
          key: '06',
          value: '生物',
          children: [
            {
              key: '07',
              value: '动物',
            },
            { key: '08', value: '植物' },
            {
              key: '09',
              value: '微生物的剑法健康减肥两点上课时间分厘卡立法局',
              children: [
                { key: '10', value: '细菌附近的垃圾分类就离开房间了' },
                { key: '11', value: '病毒' },
                { key: '12', value: '真菌' },
              ]
            },
          ],
        },
      ]
    }
  },

  filters: {
    operationFilter(value){
      const operationMap = {
        add: '新增分类',
        modify: '修改分类',
      }
      return operationMap[value]
    }
  },

  computed: {
    categoryObjCopy() {
      return JSON.parse(JSON.stringify(this.categoryObj))
    }
  },

  methods: {
    add() {
      let requestData = JSON.parse(JSON.stringify(this.blogObjectCopy))
      requestData.user = 'xuecl'
      // request(new saveBlog(requestData)).then((data) => {
      //   this.$toast.success('添加成功！')
      //   this.$router.push({name: 'BlogEdit', params: {blogid: data.id.toString()}})
      // })
    },

    modify() {
      let requestData = JSON.parse(JSON.stringify(this.blogObjectCopy))
      requestData.user = 'xuecl'
      // request(new saveBlog(requestData)).then(() => {
      //   this.$toast.success('修改成功')
      //   this.$emit('refresh')
      //   this.cancel()
      // })
    },

    cancel() {
      this.$emit('update:dialogVisible', false)
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
