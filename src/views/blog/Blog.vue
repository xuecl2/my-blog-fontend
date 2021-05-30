<template>  
  <div class="ignore">
    <header class="p-3 bg-dark bg-gradient text-white shadow position-fixed top-0 w-100">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul class="nav col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <router-link class="nav-link px-2 text-white" to="/blog/list">webLog</router-link>
            <router-link class="nav-link px-2 text-white" to="/blog">checkList</router-link>
            <router-link class="nav-link px-2 text-white" to="/blog">diary</router-link>
          </ul>
          <div class="text-end">
            <a v-if="user.logon" href="#" class="nav-link px-2 text-white">{{user.name}}</a>
            <button v-else type="button" class="btn btn-outline-light me-2" @click="loginFormShow = true">Login</button>
          </div>
        </div>
        <div v-if="loginFormShow" class="login-container position-fixed top-50 start-50 translate-middle">
          <button type="button" class="btn-close me-1 fs-6 float-end" @click="loginFormShow = false"></button>
          <form action="#">
            <div class="title">Login</div>
            <div class="input-box underline">
              <input type="text" placeholder="请输入账号" v-model="name" required>
              <div class="underline"></div>
            </div>
            <div class="input-box">
              <input type="password" placeholder="请输入密码" v-model="passwd" required>
              <div class="underline"></div>
            </div>
            <div class="input-box button" @click="login()">
              <input type="submit" name="" value="Continue">
            </div>
          </form>
        </div>
      </div>
    </header>
    <article>
      <router-view/>
    </article> 
  </div>
</template>

<script>
import {user} from '@/global/globalVariable.js'
export default {
  name: 'Blog', 
  data() {
    return {
      user,
      loginFormShow: false,
      name: '',
      passwd: '',
    }
  },
  methods: {
    login(){
      if(this.name === 'xuecl' && this.passwd === 'xueclling') {
        this.$toast.success('登录成功！')
        this.loginFormShow = false
        this.user.logon = true
        this.user.name = 'xuecl'
        sessionStorage.setItem('user', JSON.stringify(this.user))
      }else{
        this.$toast.warning('用户名或密码错误')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ignore {
  padding-top: 100px;
}
header {
  font-size: 1.2em;
  z-index: 10;
}


// login-form的样式
::selection{
  background: #ff80bf;

}
.login-container{
  background: #fff;
  max-width: 350px;
  width: 100%;
  padding: 25px 30px;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.15);
  color: #000;
}
.login-container form .title{
  font-size: 30px;
  font-weight: 600;
  margin: 20px 0 10px 0;
  position: relative;
}
.login-container form .title:before{
  content: '';
  position: absolute;
  height: 4px;
  width: 33px;
  left: 0px;
  bottom: 3px;
  border-radius: 5px;
  background: linear-gradient(to right, #99004d 0%, #ff0080 100%);
}
.login-container form .input-box{
  width: 100%;
  height: 45px;
  margin-top: 25px;
  position: relative;
}
.login-container form .input-box input{
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 16px;
  border: none;
}
.login-container form .underline::before{
  content: '';
  position: absolute;
  height: 2px;
  width: 100%;
  background: #ccc;
  left: 0;
  bottom: 0;
}
.login-container form .underline::after{
  content: '';
  position: absolute;
  height: 2px;
  width: 100%;
  background: linear-gradient(to right, #99004d 0%, #ff0080 100%);
  left: 0;
  bottom: 0;
  transform: scaleX(0);
  transform-origin: left;
  transition: all 0.3s ease;
}
.login-container form .input-box input:focus ~ .underline::after,
.login-container form .input-box input:valid ~ .underline::after{
  transform: scaleX(1);
  transform-origin: left;
}
.login-container form .button{
  margin: 40px 0 20px 0;
}
.login-container .input-box input[type="submit"]{
  background: linear-gradient(to right, #99004d 0%, #ff0080 100%);
  font-size: 17px;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.login-container .input-box input[type="submit"]:hover{
  letter-spacing: 1px;
  background: linear-gradient(to left, #99004d 0%, #ff0080 100%);
}
.login-container .option{
  font-size: 14px;
  text-align: center;
}
.login-container .facebook a,
.login-container .twitter a{
  display: block;
  height: 45px;
  width: 100%;
  font-size: 15px;
  text-decoration: none;
  padding-left: 20px;
  line-height: 45px;
  color: #fff;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.login-container .facebook i,
.login-container .twitter i{
  padding-right: 12px;
  font-size: 20px;
}
.login-container .twitter a{
  background: linear-gradient(to right,  #00acee 0%, #1abeff 100%);
  margin: 20px 0 15px 0;
}
.login-container .twitter a:hover{
  background: linear-gradient(to left,  #00acee 0%, #1abeff 100%);
  margin: 20px 0 15px 0;
}
.login-container .facebook a{
  background: linear-gradient( to right,  #3b5998 0%, #476bb8 100%);
  margin: 20px 0 50px 0;
}
.login-container .facebook a:hover{
  background: linear-gradient( to left,  #3b5998 0%, #476bb8 100%);
  margin: 20px 0 50px 0;
}

</style>
