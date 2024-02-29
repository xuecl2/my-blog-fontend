<template>
  <button type="button" class="btn btn-primary" @click="clickhandler">{{displayText}}</button>
</template>

<script>
export default {
  props: {
    countdownSeconds: {
      type: Number,
      default: 60,
    },

    initText: {
      type: String,
      default: '',
    },

    // disabled: {
    //   type: Boolean,
    //   default: false,
    // },
  },

  data() {
    return {
      remainSeconds: this.countdownSeconds,
      timer: null,
      state: 'init', // init, counting
    }
  },

  computed: {
    displayText() {
      if(this.state === 'counting') return this.remainSeconds + 's'
      return this.initText
    },
  },

  methods: {
    clickhandler() {
      if(this.state === 'counting') return
      this.$emit('click')
      // this.startCountdown()
    },

    startCountdown() {
      this.timer = setInterval(() => {
        if(this.remainSeconds <= 0) {
          this.stopCountdown()
          return
        }
        this.remainSeconds--
      }, 1000)
      this.state = 'counting'
    },

    stopCountdown() {
      clearInterval(this.timer)
      this.timer = null
      this.remainSeconds = this.countdownSeconds
      this.state = 'init'
    },
  },
}
</script>

<style>

</style>