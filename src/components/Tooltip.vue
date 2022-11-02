<template>
  <div class="tooltip-box">
    <div class="reference" ref="reference">
      <slot name="reference"></slot>
    </div>
    <div class="tooltip" ref="tooltip" v-show="isTooltipShow">
      <slot name="tooltip"></slot>
      <div class="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core';

export default {
  props: {
    triggerMethod: {
      type: String,
      default: 'click',
    },

    placement: {
      type: String,
      default: 'bottom',
    },
  },

  data() {
    return {
      popperInstance: null,
      isTooltipShow: false,
      stateChangeLock: false,
    }
  }, 

  mounted() {
    // const tooltip = this.$refs.tooltip
    const reference = this.$refs.reference
    if(this.triggerMethod === 'click') {
      reference.addEventListener('click', this.showTooltip)
    }

    this.popperInstance = createPopper(reference, this.$refs.tooltip, {
      placement: this.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: ({ popper }) => {
              return [popper.width * 1/2 - 10, 8]
            }
          }
        }
      ]
    }) 
  }, 

  beforeDestroy() {
    document.removeEventListener('click', this.hideTooltip, true)
  },

  methods: {
    toggleTooltipShow() {
      if(!this.isTooltipShow) {
        this.showTooltip()
      }else {
        this.hideTooltip()
      }
    },

    addStateChangeLock(interval = 100) {
      this.stateChangeLock = true
      setTimeout(() => {
        this.stateChangeLock = false 
      }, interval)
    },

    showTooltip() {
      if(this.stateChangeLock) return
      this.isTooltipShow = true
      // Enable the event listeners
      this.popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: true },
        ],
      }))
      this.popperInstance.update()
      this.$emit('state-change', { isTooltipShow: this.isTooltipShow })
      document.addEventListener('click', this.hideTooltip, true)
      this.$refs.reference.removeEventListener('click', this.showTooltip)
      this.addStateChangeLock()
    },

    hideTooltip() {
      if(this.stateChangeLock) return
      this.isTooltipShow = false
      // Disable the event listeners
      this.popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: false },
        ],
      }))
      this.$emit('state-change', { isTooltipShow: this.isTooltipShow })
      document.removeEventListener('click', this.hideTooltip, true)
      this.$refs.reference.addEventListener('click', this.showTooltip)
      this.addStateChangeLock()
    },
  },
}
</script>

<style scoped>
.tooltip-box {
  width: fit-content;
  position: relative;
}

.tooltip {
  background: #333;
  color: white;
  font-weight: bold;
  padding: 4px 8px;
  font-size: 13px;
  border-radius: 4px;
  opacity: 1;
}

.arrow,
.arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

.arrow {
  visibility: hidden;
}

.arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}

.tooltip[data-popper-placement^='top'] > .arrow {
  bottom: -4px;
}

.tooltip[data-popper-placement^='bottom'] > .arrow {
  top: -4px;
}

.tooltip[data-popper-placement^='left'] > .arrow {
  right: -4px;
}

.tooltip[data-popper-placement^='right'] > .arrow {
  left: -4px;
}
</style>