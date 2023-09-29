<template>  
  <div class="container">
    <dir-tree :dir-list="dirList">
      <template #default = "{ dir }">
        <tooltip @state-change="tooltipStateChangeHandler(dir, $event)" @click.native.stop>
          <template #reference>
            <i 
              v-show="user.name" 
              class="bi bi-three-dots menu-btn" 
              :class="{'selected': selectedDir && selectedDir.id === dir.id && tooltipVisble}" 
            ></i>
          </template>
          <template #tooltip>
            <ul class="menu-box p-0 m-0 ignore">
              <li class="menu p-3" @click="edit()">
                <i class="bi bi-pencil-square me-2"></i>
                <span>编辑</span>
              </li>
              <li class="menu p-3" @click="remove()">
                <i class="bi bi-trash me-2"></i>
                <span>删除</span>
              </li>
              <li class="menu p-3" @click="remove()">
                <i class="bi bi-eye-fill me-2"></i>
                <span>查看</span>
              </li>
            </ul>
          </template>
        </tooltip>
      </template>
    </dir-tree>
    <category-edit-dialog :dialogVisible.sync="dialogVisible" :operation="operation" :categoryObj="selectedDir" @refresh="refreshCategoryList()"></category-edit-dialog>
    <a v-if="user.name" class="quick-add-btn ignore" href="#" @click="add()">
      <i class="bi bi-plus fs-1"></i>
    </a>
  </div>
</template>

<script>
import DirTree from '@/components/DirTree'
import Tooltip from '@/components/Tooltip'
import CategoryEditDialog from '@/views/category/category-list/component/CategoryEditDialog'
import request from '@/request/commonRequest'
import { queryAllCategoryReq } from '@/api/category'

export default {
  name: 'CategoryList', 

  components: { 
    DirTree,
    Tooltip,
    CategoryEditDialog,
  },

  data() {
    return {
      user: sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')):{},
      selectedDir: null,
      tooltipVisble: false,
      dialogVisible: false,
      operation: '',
      dirList: [
        {
          id: 0,
          name: 'defalut', 
          subList: [],
        },
        {
          id: 1,
          name: 'list',
          subList: [
            {
              id: 2,
              name: 'list1',
              subList: [
                {
                  id: 3,
                  name: 'list2',
                  subList: [],
                }
              ]
            }
          ] 
        }
      ]
    }
  },

  mounted() {
    this.refreshCategoryList()
  },

  methods: {
    refreshCategoryList() {
      request(new queryAllCategoryReq()).then(rsp => console.log(rsp))
    },

    tooltipStateChangeHandler(dir, state) {
      if(state.isTooltipShow) {
        this.selectedDir = dir
        this.tooltipVisble = true
      }
      if(!state.isTooltipShow) this.tooltipVisble = false
    },

    edit() {
      this.dialogVisible = true
      this.operation = 'modify'
    },

    add() {
      this.operation = 'add'
      this.selectedDir = {}
      this.dialogVisible = true
    },

    remove() {
      this.$message('确认删除此分类？', { buttonClose: true }).then(() => console.log('confirm')).catch(() => console.log('cancel'))
    },
  }
}
</script>

<style scoped>
.container {
  max-width: 1024px;
}

.menu-btn::before {
  transition: all 0.3s ease;
}

.menu-btn.selected::before {
  transform: rotate(90deg);
}

.menu-box.ignore {
  min-width: 90px;
}

.menu {
  user-select: none;
}

.menu:hover {
  background: rgba(255, 255, 255, 0.1);
}

.quick-add-btn:hover {
  color: var(--bg-primary);
  background: var(--nav-color);
}

.quick-add-btn {
  position: fixed;
  display: block;
  right: 100px;
  bottom: 30px;
  border-radius: 100%;
  background-color: var(--brand-primary);
  color: var(--bg-primary);
  text-align: center;
  font-size: 0;
  box-shadow: 0 3px 15px -2px rgb(37 45 51 / 40%);
  transition: all .15s ease-in;
  text-decoration: none;
} 

.quick-add-btn.ignore {
  height: 52px;
  width: 52px;
  line-height: 52px;
}
</style>

