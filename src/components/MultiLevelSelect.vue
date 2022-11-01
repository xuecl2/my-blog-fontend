<template>
  <div class="select-menu" :class="{ 'active': showOptions }">
    <div class="select-btn py-1 px-3 mb-3" @click="toggleOptionsShow()">
      <span>{{ (selectedOption && selectedOption.value) || '请选择'}}</span>
      <i class="bi bi-chevron-right me-2"></i>
    </div>
    <div class="options-box">
      <ul v-for="(currentOptions, index) in currentOptionsList" :key="index" class="options px-0">
        <li 
          v-for="option in currentOptions" 
          :key="option.key" 
          @mouseenter="getOptionHoverHandler(index + 1, option, $event)()" 
          @click="optionClickHandler(option)" 
          class="option px-4 py-1"
        >
          <span>{{option.value}}</span>
          <i class="bi bi-chevron-right mx-1" v-show="option.children && option.children.length > 0"></i>
        </li>
      </ul>   
    </div>
  </div> 
</template>

<script>
export default {
  name: "MultiLevelSelect",  

  props: {
    options: {
      type: Array,
      default: () => [],
    }
  },

  data() {
    return {
      selectedOption: null,
      currentOptionsList: [],
      showOptions: false,
    }
  },

  methods: {
    getOptionHoverHandler(depth, option, evt) {
      return () => {
        let lock = false
        const li = evt.currentTarget
        const blurHandler = () => {
          lock = true
          li.removeEventListener('mouseleave', blurHandler)
        }
        li.addEventListener('mouseleave', blurHandler)

        setTimeout(() => {
          if(lock) return
          if(depth < this.currentOptionsList.length) {
            const length = this.currentOptionsList.length
            for(let i = 0; i < length - depth; i++) this.currentOptionsList.pop()
          }
          this.currentOptionsList.push(option.children)
        }, 500)
      }
    },

    toggleOptionsShow() {
      if(this.showOptions) {
        this.showOptions = false
      }else {
        this.currentOptionsList = [this.options]
        this.showOptions = true
      }
    },

    optionClickHandler(option) {
      this.selectedOption = option
      this.showOptions = false
    },
  } 
}
</script>

<style>
.select-menu .select-btn {
  position: relative;
  min-width: 200px;
  width: 400px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,.1);
  cursor: pointer;
}

.select-btn i {
  position: absolute;
  right: 0;
  transition: all ease-in .3s;
}

.select-menu.active .select-btn i { 
  transform: rotate(90deg); 
}

.options-box {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(-10px);
  transition: all ease-in .3s;
}

.options {
  position: relative;
  max-height: 300px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(150, 200, 210, .4);
  overflow: auto;
  flex-shrink: 0;
  cursor: pointer;
}

.options .option {
  list-style: none;
}

.option i {
  position: absolute;
  right: 0;
}

.options .option:hover {
  background: rgba(0, 0, 0, 0.1);
}

.select-menu.active .options-box {
  opacity: 1;
  transform: translateY(0);
}
</style>