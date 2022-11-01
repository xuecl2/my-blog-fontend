<template>  
  <div class="container">
    <dir-tree :dir-list="dirList">
      <template #default = "{ dir }">
        <tooltip>
          <template #reference>
            <i v-show="user.name" class="bi bi-three-dots menu-btn" :class="{'selected': showCategoryMenu}" @click="showMenu(dir)"></i>
          </template>
          <template #tooltip>
            <ul class="menu-box p-0 m-0 ignore">
              <li class="menu p-3">
                <i class="bi bi-pencil-square me-1"></i>
                <span>编辑</span>
              </li>
              <li class="menu p-3">
                <i class="bi bi-trash me-1"></i>
                <span>删除</span>
              </li>
              <li class="menu p-3">
                <i class="bi bi-eye-fill me-1"></i>
                <span>查看</span>
              </li>
            </ul>
          </template>
        </tooltip>
      </template>
    </dir-tree>
  </div>
</template>

<script>
import DirTree from '@/components/DirTree'
import Tooltip from '@/components/Tooltip'

export default {
  name: 'CategoryList', 

  components: { 
    DirTree,
    Tooltip
  },

  data() {
    return {
      user: sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')):{},
      showCategoryMenu: false,
      dirList: [
        {
          name: 'defalut', 
          subList: [],
        },
        {
          name: 'list',
          subList: [
            {
              name: 'list1',
              subList: [
                {
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

  methods: {
    showMenu(dir) {
      this.showCategoryMenu = true
      console.log(dir)
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1024px;
}

.menu-btn.selected {
  transform: rotate(90deg);
}

.menu-box.ignore {
  min-width: 90px;
}
</style>

