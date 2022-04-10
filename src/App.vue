<template>  
  <div id="app">
    <header class="p-3 bg-dark bg-gradient text-white shadow position-fixed top-0 w-100">
      <div class="container">
        <div class="row w-100 flex-wrap align-items-center justify-content-center position-relative">
          <div class="menu position-absolute left-0 d-lg-none" @click="sideNav = true">
            <i class="bi bi-list"></i>
          </div>
          <div class="col-auto col-lg-3 ps-4">
            <div class="logo">Xuecl's WebLog</div>
          </div>
          <ul class="nav col-6 justify-content-center m-auto d-none d-lg-flex">
            <router-link class="nav-link px-4 text-white" to="/blog">Home</router-link>
            <router-link class="nav-link px-4 text-white" to="/about">About</router-link>
            <router-link v-if="user" class="nav-link px-4 text-white" to="/blog">Diary</router-link>
          </ul>
          <div class="col-3 d-none d-lg-block text-end">
            <a v-if="user.name" href="#" class="nav-link px-2 text-white">{{user.name}}</a>
          </div>
        </div>
      </div>
    </header>
    <div v-if="sideNav" class="side-nav bg-dark bg-gradient text-white shadow position-fixed top-0 w-50 h-100 p-3">
      <div class="logo position-relative fs-2 mb-5">
        <span class="ps-1">Xuecl's WebLog</span>
        <i class="close-button bi bi-x position-absolute fs-4 end-0 me-2" @click="sideNav = false"></i>
      </div>
      <ul class="nav" @click="sideNav = false">
        <router-link class="nav-link px-4 text-white mb-3 w-100" to="/blog">Home</router-link>
        <router-link class="nav-link px-4 text-white mb-3 w-100" to="/about">About</router-link>
        <router-link v-if="user.name" class="nav-link px-4 text-white mb-3 w-100" to="/blog">Diary</router-link>
      </ul>

    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',  
  
  data() {
    return {
      user: sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')):{},
      sideNav: false,
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 100px;
}

header {
  font-size: 1.2em;
  z-index: 10;
}

.menu {
  cursor: pointer;
}

.side-nav {
  z-index: 20;
}

.close-button {
  cursor: pointer;
}
</style>
