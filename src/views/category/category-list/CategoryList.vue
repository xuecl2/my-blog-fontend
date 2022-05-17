<template>  
  <div class="container">
    <dir-tree :dir-list="dirList" #default="{ dir }">
      <i v-show="user.name" class="bi bi-three-dots arrow" @click.stop="showMenu(dir)"></i>
    </dir-tree>
  </div>
</template>

<script>
import DirTree from '@/components/DirTree'

export default {
  name: 'CategoryList', 

  components: { DirTree },

  data() {
    return {
      user: sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')):{},
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
      console.log(dir)
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1024px;
}
</style>

