<template>
  <nav aria-label="Page navigation example" v-show="totalPages > 0">
    <ul class="pagination justify-content-center">
      <li class="page-item" @click="preview()">
        <span class="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </span>
      </li>
      <li class="page-item" :class="{active: index == currentPage}" v-for="index in pages" :key="index" @click="jump(index)"><span class="page-link">{{index}}</span></li>
      <li class="page-item" @click="next()">
        <span class="page-link" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    totalPages: {
      type: Number,
      default: 0
    },

    currentPage: {
      type: Number,
      default: 1
    },
  },

  data() {
    return {
    }
  },

  computed: {
    pages() {
      const list = []
      for(let i = 1; i <= this.totalPages; i++) {
        list.push(i)
      }
      return list
    }
  },

  methods: {
    preview() {
      if(this.currentPage - 1 < 1) return
      this.$emit("click", this.currentPage - 1)
    },

    jump(pageNo) {
      this.$emit("click", pageNo)
    },

    next() {
      if(this.currentPage + 1 > this.totalPages) return
      this.$emit("click", this.currentPage + 1)
    },
  },
}
</script>

<style>
  .page-link {
    cursor: pointer;
  }
</style>