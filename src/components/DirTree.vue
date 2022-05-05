<template>
  <ul>
    <li v-for="dir in dirList" :key="dir.name">
      <span>{{dir.name}}</span>
      <dir-tree :dir-list="dir.subList"></dir-tree>
    </li>
  </ul>
</template>

<script>
import DirTree from '@/components/DirTree'

export default {
  name: 'DirTree',

  components: [ DirTree ],

  props: {
    dirList: {
      type: Array,
      default: () => [ { name: 'default', subList: []} ]
    },
  },

  data() {
    return {
    }
  },

  methods: {
  }
}
</script>

<style>
</style>