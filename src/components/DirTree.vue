<template>
  <ul class="dir-container p-0 mb-1 fs-5">
    <li v-for="(dir, index) in dirList" :key="dir.name">
      <div class="dir-wrapper d-flex align-items-center p-1" @click="toggleSubDirShown(index)">
        <i class="bi bi-folder me-1" @click.stop="gotoCategory(dir.name)"></i>
        <a class="dir-name fs-6 text-dark me-auto" href="#" @click.stop.prevent="gotoCategory(dir.name)">{{dir.name}}</a>
        <span class="articles me-2">{{ dir.aritcles }}</span>
        <i v-show="dir.subList.length > 0" class="bi bi-chevron-down arrow me-3" :class="{'active': subListShown[index]}"></i>
        <slot :dir="dir" :index="index"></slot>
      </div>
      <dir-tree class="ms-2" v-show="subListShown[index]" :dir-list="dir.subList">
        <slot :dir="dir" :index="index"></slot>
      </dir-tree>
    </li>
  </ul>
</template>

<script>
import DirTree from '@/components/DirTree'

export default {
  name: 'DirTree',

  components: { DirTree },

  props: {
    dirList: {
      type: Array,
      default: () => [ { name: 'default', subList: []} ]
    },
  },

  data() {
    return {
      subListShown: this.dirList.map(() => false)
    }
  },

  methods: {
    toggleSubDirShown(index) {
      this.subListShown.splice(index, 1, !this.subListShown[index])
    },

    gotoCategory(name) {
      this.$emit('search-category', name)
    },
  }
}
</script>

<style scoped>
.dir-container {
  max-width: 760px;
}

.dir-container li {
  list-style: none;
}

.dir-wrapper {
  cursor: pointer;
}

.dir-wrapper:hover {
  background-color: #eee;
}

.dir-name {
  text-decoration: none;
}

.dir-name:hover {
  color: #0d6efd !important;
  text-decoration: underline;
}

.arrow {
  cursor: pointer;
  transition: all 0.3s ease;
}

.arrow.active {
  transform: rotate(-90deg);
}
</style>