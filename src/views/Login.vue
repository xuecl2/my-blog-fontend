<template>
  <div class="login-container position-fixed top-50 start-50 translate-middle">
    <!-- <button type="button" class="btn-close me-1 fs-6 float-end" @click="loginFormShow = false"></button> -->
    <form @submit.prevent="login">
      <div class="title">Login</div>
      <div class="input-box underline">
        <input type="text" placeholder="请输入账号" v-model="name" required readonly>
        <div class="underline"></div>
      </div>
      <div class="input-box">
        <input type="password" placeholder="请输入密码" v-model="passwd" required>
        <div class="underline"></div>
      </div>
      <div class="input-box button">
        <input type="submit" value="Continue">
      </div>
    </form>
  </div>
</template>

<script>
import * as userApi from '@/api/user'

export default {
  name: 'login',

  data: function() {
    return {
      name: '',
      passwd: '',
    }
  },

  methods: {
    login() {
      userApi.login(this.name, this.passwd)
        .then(user => {
          sessionStorage.setItem('user', JSON.stringify(user))
          this.$toast.success('登录成功,即将跳转到主页！')
          setTimeout(() => {
            this.$router.push('/')
          }, 2000);
        })
    },

    register() {
      userApi.register({
        user: this.name,
        password: this.passwd,
        email: this.email,
      }).then(() => {
        this.$toast.success('注册成功，请至邮箱激活！')
      })
    }
  }
}
</script>

<style scoped>
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
</style>