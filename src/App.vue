<template>  
  <div id="app">
    <div class="card">
      <div class="card-body">
        <header class="header-pc">
          <div class="col-20">
            <router-link class="tab" to="/blog">webLog</router-link>
            <router-link class="tab" to="/blog">checkList</router-link>
          </div>            
          <div class="logo">xuecl</div>
        </header>    
      </div>
    </div>
    <article>
      <router-view/>
    </article>    
  </div>
</template>

<script>

export default {
  name: 'App',  
  data(){
    return {
    }
  },
  created() {
    window.onresize = () => this.$store.commit('setClinetScreenSizeType', window.innerWidth)
  },
  methods: {
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
header.header-pc {
  display: flex;
  height: 60px;
  line-height: 60px;
  font-size: 24px;
  color: #FFF;  
  background: linear-gradient(#5E5E5E,#bbb);
}
.header-pc div:first-child {
  padding-left: 40px;
}
.tab {
  margin:0 20px;
  color: #FFF; 
  text-decoration: none;
}
.logo {
  margin-right: 20px;
  text-align: right;
  flex-grow: 1;
}
.article {
  width: 1024px;
  margin: 0 auto;
}
</style>
