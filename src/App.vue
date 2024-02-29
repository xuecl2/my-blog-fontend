<template>  
  <div id="app">
    <header class="p-3 bg-dark bg-gradient text-white shadow position-fixed top-0 w-100">
      <div class="container ignore">
        <div class="row w-100 flex-wrap align-items-center justify-content-center position-relative g-0">
          <div class="menu position-absolute left-0 d-lg-none" @click="sideNav = true">
            <i class="bi bi-list fs-3"></i>
          </div>
          <div class="col-auto col-lg-3">
            <div class="logo">
              <!-- <img class="mb-1" src="./assets/home-logo.png" alt="load failed"> -->
              <div class="fs-4 fw-bold">XueclLab</div>
            </div>
          </div>
          <ul class="nav col-6 justify-content-center fs-6 m-auto d-none d-lg-flex">
            <router-link class="nav-link px-3 text-white" to="/article">Home</router-link>
            <router-link v-if="user" class="nav-link px-3 text-white" to="/category">Category</router-link>
            <router-link v-if="user" class="nav-link px-3 text-white" to="/css-demo">Demo</router-link>
            <router-link class="nav-link px-3 text-white" to="/about">About</router-link>
          </ul>
          <div class="col-3 d-none d-lg-block text-end">
            <a v-if="user.name" href="#" class="text-decoration-none px-2 text-white">{{user.name}}</a>
            <router-link v-else to="/user/login" class="text-decoration-none px-2 text-white border rounded-1 px-3 py-1" @click="toLogin()">login</router-link>
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
          <router-link class="nav-link px-4 text-white mb-3 w-100" to="/article">Article</router-link>
          <router-link class="nav-link px-4 text-white mb-3 w-100" to="/category">Category</router-link>
          <router-link class="nav-link px-4 text-white mb-3 w-100" to="/css-demo">Demo</router-link>
          <router-link class="nav-link px-4 text-white mb-3 w-100" to="/about">About</router-link>
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

header .container.ignore {
  max-width: 1024px;
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

.nav-link {
  position: relative;
}

.nav-link::before {content: '';
  position: absolute;
  left: 50%;
  bottom: 5px;
  width: 0;
  height: 2px;
  background-color: #fff;
  border-radius: 1.5px;
  transform: translateX(-50%);
  transition: all 0.5s ease;
}

.nav-link:hover::before {
  width: calc(100% - 2rem);
}
</style>
