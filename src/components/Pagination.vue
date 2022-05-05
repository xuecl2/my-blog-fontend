<template>
  <nav aria-label="Page navigation example" v-show="totalPages > 0">
    <ul class="pagination justify-content-center">
      <li class="page-item mx-mb-1" @click="preview()">
        <span class="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </span>
      </li>
      <li class="page-item mx-mb-1" :class="{active: index == currentPage, ellipsis: index === 0}" v-for="index in pages" :key="index" @click="jump(index)"><span class="page-link">{{index||'...'}}</span></li>
      <li class="page-item mx-mb-1" @click="next()">
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

    halfPagesLength: {
      type: Number,
      default: 5,
    }
  },

  data() {
    return {
    }
  },

  computed: {
    pages() {
      const list = []
      if(this.halfPagesLength * 2 - 1 >= this.totalPages) {
        for(let i = 1; i <= this.totalPages; i++) {
          list.push(i)
        }
      }else {
        let middleValue = this.currentPage
        if(this.currentPage < this.halfPagesLength) middleValue = this.halfPagesLength
        if(this.currentPage + this.halfPagesLength - 1 > this.totalPages) middleValue = this.totalPages - this.halfPagesLength + 1
        if(middleValue > this.halfPagesLength) {
          list.push(1)
          list.push(0)
          for(let i = middleValue - this.halfPagesLength + 3; i <= middleValue; i++) {
            list.push(i)
          }
        }else {
          for(let i = 1; i <= middleValue; i++) {
            list.push(i)
          }
        }
        if(middleValue < this.totalPages - this.halfPagesLength + 1) {
          for(let i = middleValue + 1; i <= middleValue + this.halfPagesLength - 3; i++) {
            list.push(i)
          }
          list.push(0)
          list.push(this.totalPages)
        }else {
          for(let i = middleValue + 1; i<= this.totalPages; i++) {
            list.push(i)
          }
        }
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
      if(pageNo === 0) return
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

  .ellipsis {
    cursor: none;
  }
</style>