<template>  
  <div id="app">
    <header class="p-2 bg-dark bg-gradient text-white shadow position-fixed top-0 w-100">
      <div class="container">
        <div class="row w-100 flex-wrap align-items-center justify-content-center position-relative">
          <div class="menu position-absolute left-0 d-lg-none" @click="sideNav = true">
            <i class="bi bi-list fs-3"></i>
          </div>
          <div class="col-auto col-lg-3 ps-4">
            <div class="logo">
              <!-- <img class="mb-1" src="./assets/home-logo.png" alt="load failed"> -->
              <div class="ms-2 fs-4 fw-bold">XueclLab</div>
            </div>
          </div>
          <ul class="nav col-6 justify-content-center fs-6 m-auto d-none d-lg-flex">
            <router-link class="nav-link px-3 text-white" to="/blog">Home</router-link>
            <router-link class="nav-link px-3 text-white" to="/about">About</router-link>
            <router-link v-if="user" class="nav-link px-3 text-white" to="/blog">Category</router-link>
          </ul>
          <div class="col-3 d-none d-lg-block text-end">
            <a v-if="user.name" href="#" class="nav-link px-2 text-white">{{user.name}}</a>
          </div>
        </div>
      </div>
    </header>
    <div class="mask bg-dark bg-opacity-50 bg-gradient position-fixed top-0 w-100 h-100" :class="{'visible': sideNav, 'invisible': !sideNav}">
      <div class="side-nav bg-dark bg-gradient text-white shadow position-absolute w-75 h-100 p-3" :class="{'start-0': sideNav}">
        <div class="logo d-flex align-items-center mb-5">
          <span class="ps-1 fs-4 me-auto">XueclLab</span>
          <!-- <button type="button" class="btn-close btn-close-white" aria-label="Close" @click="sideNav = false"></button> -->
          <i class="close-button bi bi-x me-2 fs-1" @click="sideNav = false"></i>
        </div>
        <ul class="nav fs-5" @click="sideNav = false">
          <router-link class="nav-link px-4 text-white mb-3 w-100" to="/blog">Article</router-link>
          <router-link class="nav-link px-4 text-white mb-3 w-100" to="/blog">Category</router-link>
          <router-link class="nav-link px-4 text-white mb-3 w-100" to="/blog">Demo</router-link>
          <router-link class="nav-link px-4 text-white mb-3 w-100" to="/blog"></router-link>
          <router-link class="nav-link px-4 text-white mb-3 w-100" to="/about">About</router-link>
          <router-link v-if="user.name" class="nav-link px-4 text-white mb-3 w-100" to="/blog">k</router-link>
        </ul>
      </div>
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
  padding-top: calc(3rem + 3vw);
}

header {
  font-size: 1.2em;
  z-index: 10;
}

.menu {
  cursor: pointer;
}

.mask {
  z-index: 20;
}

.side-nav {
  left: -100%;
  transition: all 0.2s ease;
}

.close-button {
  cursor: pointer;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: calc(2rem + 0.5vw);
}
</style>
