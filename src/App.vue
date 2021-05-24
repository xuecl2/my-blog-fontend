<template>  
  <div id="app">
    <header class="p-3 bg-dark bg-gradient text-white shadow position-fixed top-0 w-100">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <router-link class="nav-link px-2 text-white" to="/blog">webLog</router-link>
            <router-link class="nav-link px-2 text-white" to="/blog">checkList</router-link>
            <router-link class="nav-link px-2 text-white" to="/blog">diary</router-link>
          </ul>
          <div class="text-end">
            <button type="button" class="btn btn-outline-light me-2">Login</button>
          </div>
        </div>
      </div>
    </header>
    <article>
      <router-view/>
    </article> 
  </div>
</template>

<script>

export default {
  name: 'App',  
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
</style>
