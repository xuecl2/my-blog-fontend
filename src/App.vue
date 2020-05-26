<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">xuecl</router-link> |
      <router-link to="/">返回主页</router-link> |   
      <router-link to="/manage">查询页面</router-link> |
      <router-link to="/edit">edit</router-link>   
    </div>
    <hr/>
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding-top: 15px;
  padding-left: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
