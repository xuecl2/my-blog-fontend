<template>
<div class="container position-fixed top-50 start-50 translate-middle">
  <form @submit.prevent class="form-container ignore rounded-4 p-3" :class="{ 'mode-login': mode === 'login', 'mode-signup': mode === 'signup' }">
    <div class="title login fs-3 fw-bold mb-3">Login</div>
    <div class="title signup fs-3 fw-bold mb-3">Sign Up</div>
    <div class="input-box mt-3 ms-1 username">
      <input placeholder="Enter your username" v-model="user" :autocomplete="mode === 'login'?'username':'new-username'" maxlength="50">
      <i class="bi bi-person"></i>
    </div>
    <div class="input-box mt-3 ms-1 password">
      <input type="password" placeholder="Enter your password" v-model="password" :autocomplete="mode === 'login'?'current-password':'new-password'">
      <i class="bi bi-lock"></i>
      <i class="bi bi-eye-slash password-eye"></i>
    </div>
    <div class="input-box mt-3 ms-1 confirm-password signup">
      <input type="password" placeholder="Confirm your password" v-model="confirmePassword" autocomplete="new-password">
      <i class="bi bi-lock"></i>
      <i class="bi bi-eye-slash password-eye"></i>
    </div>
    <div class="input-box mt-3 ms-1 email signup">
      <input type="email" placeholder="Enter your email" v-model="email">
      <i class="bi bi-envelope"></i>
    </div>
    <div class="input-box mt-3 ms-1 verifycode signup">
      <input type="tel" placeholder="Enter your verifycode" class="input-verifycode" v-model="activeCode">
      <countdown-button 
        ref="countdownButton"
        class="btn-send-verifycode" 
        :initText="'Send Code'" 
        @click="sendActiveCode"
      ></countdown-button>
      <i class="bi bi-shield"></i>
    </div>
    <div class="option-line login mt-1">
      <div class="option-box">
        <input id="remember-me" type="checkbox" v-model="rememberMe">
        <label for="remember-me">Remember me</label>
      </div>
      <a href="#" class="forget-password" @click="toResetPassword">Forget password</a>
    </div>
    <div class="btn-box mt-3">
      <button type="submit" class="submit fs-6" @click="submit">Submit</button>
    </div>
    <div class="hint-box mt-1">
      <div class="hint login">
        <span>Don't have an account? </span>
        <a href="#" class="to-signup" @click="toSignup">Signup</a>
      </div>
      <div class="hint signup">
        <span>Already have an account? </span>
        <a href="#" class="to-login" @click="toLogin">Login</a>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import * as userApi from '@/api/user'
import countdownButton from '@/components/countdown-button.vue'

export default {
  name: 'LoginAndRegister',

  components: {
    countdownButton
  },

  data: function() {
    return {
      mode: 'login',
      user: '',
      password: '',
      confirmePassword: '',
      email: '',
      activeCode: '',
      rememberMe: true,
    }
  },

  mounted() {
    this.passwordEyesClickHandler = e => {
      const input = e.target.parentElement.querySelector('input')
      const type = input.getAttribute('type')

      if(type === 'text') {
        e.target.classList.remove('bi-eye')
        e.target.classList.add('bi-eye-slash')
        input.setAttribute('type', 'password')
      }

      if(type === 'password') {
        e.target.classList.remove('bi-eye-slash')
        e.target.classList.add('bi-eye')
        input.setAttribute('type', 'text')
      }
    }
    document.querySelectorAll('.password-eye').forEach(eye => {
      eye.addEventListener('click', this.passwordEyesClickHandler)
    })
  },

  beforeDestroy() {
    document.querySelector('.password-eye').removeEventListener('click', this.passwordEyesClickHandler)
  },

  methods: {
    toResetPassword() {
      this.$router.push('/user/reset-password')
    },

    toLogin() {
      // clear input
      this.user = ''
      this.password = ''
      this.mode = 'login'
    },

    toSignup() {
      // clear input data
      this.user = ''
      this.password = ''
      this.confirmePassword = ''
      this.email = ''
      this.activeCode = ''
      this.mode = 'signup'
    },  

    submit() {
      if(this.mode === 'login') {
        this.login()
      }else if(this.mode === 'signup') {
        this.signup()
      }
    },

    login() {
      if(!this.user || !this.password) return this.$toast.error('用户名和密码不能为空！')

      this.$loading.show('登录中...')
      userApi.login(this.user, this.password, this.rememberMe)
        .then(user => {
          sessionStorage.setItem('user', JSON.stringify(user))
          if(this.mode === 'login') {
            this.$toast.success('登录成功，即将跳转到主页！')
          }else if(this.mode === 'signup'){
            this.$toast.success('注册成功，即将跳转到主页！')
          }
          setTimeout(() => {
            this.$router.push('/')
          }, 1500);
        })
        .catch(() => {
          this.$loading.hide()
        })
    },

    sendActiveCode() {
      if(!this.email) return this.$toast.error('邮箱不能为空！')
      if(!this.email.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) return this.$toast.error('邮箱格式不正确, 请确认后重新输入！')
      this.$refs.countdownButton.startCountdown()
      userApi.sendActiveCode(this.email)
        .then(() => {
          this.$toast.success('验证码已成功发送，请注意查收！')
        })
        .catch(() => {
          this.$refs.countdownButton.stopCountdown()
        })
    },

    signup() {
      // username and password check
      if(this.user.length < 1 || this.user.length > 50) return this.$toast.error('用户名长度必须要在1-50之间！')
      if(this.password.length < 6) return this.$toast.error('密码长度不能小于6！')
      if(this.password !== this.confirmePassword) return this.$toast.error('两次密码不一致！')
      if(!this.email.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) return this.$toast.error('邮箱格式不正确, 请确认后重新输入！')
      if(!this.activeCode) return this.$toast.error('验证码不能为空！')

      this.$loading.show()
      userApi.register({
        user: this.user,
        password: this.password,
        email: this.email,
        activeCode: this.activeCode, 
      })
        .then(() => {
          this.login()
        })
        .catch(() => {
          this.$loading.hide()
        })
    }
  }
}
</script>

<style scoped>
a {
  color: #7d2ae8;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.form-container.ignore {
  width: 55%; 
  max-width: 400px;
  margin: 0 auto;
  padding: 20px 20px;
  opacity: 1;
  background-color: #fff;
  box-shadow: #000 0 0px 3px 0px;
  transition: all 0.4s ease-out;
}

.form-container.hide {
  transform: scale(1.2);
  opacity: 0;
}

.mode-signup .login {
  display: none;
}

.mode-login .signup {
  display: none;
}

.title {
  text-align: center;
}

.input-box {
  position: relative;
  height: calc(.5rem + 30px);
  padding: 0 10px;
  font-size: calc(0.5rem + 0.6vw);
}

.input-box input {
  width: 100%;
  padding: 0 calc(1rem + 15px);
  flex-grow: 1;
  border: none;
  outline: none;
  height: 100%;
  border-bottom: 1px solid #000;
  transition: width 0.2s ease, height 0.2s ease;
}

.input-box input.input-verifycode {
  padding: 0 calc(3rem + 3.5vw) 0 calc(1rem + 15px);
}

.input-box input:focus {
  border-bottom: 2px solid #7d2ae8;
}

.input-box input:focus +i {
  color: #7d2ae8;
}

.input-box i {
  position: absolute;
  left: 10px;
  margin-right: 10px;
  font-size: calc(0.5rem + 1vw);
}

.input-box .password-eye {
  left: auto;
  right: 10px;
  cursor: pointer;
}

.btn-send-verifycode {
  position: absolute;
  top: calc(-.4rem + .5vw);
  left: auto;
  right: 10px;
  padding: 2px 10px;
  font-size: calc(.4rem + .6vw);
}

.option-line {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 15px;
  font-size: calc(0.5rem + .5vw);
}

.option-box {
  display: flex;
  align-items: center;
  margin-right: auto;
}

.option-box input {
  vertical-align: middle;
  cursor: pointer;
}

.option-box label {
  padding: 3px;
  color: #0b0217;
  vertical-align: middle;
  cursor: pointer;
}

.btn-box {
  text-align: center;
}

.btn-box button {
  width: 90%;
  height: calc(1rem + 30px);
  border: none;
  outline: none;
  font-weight: bold;
  border-radius: 7px;
  color: #fff;
  background: #7d2ae8;
  cursor: pointer;
}

.btn-box button:active {
  transform: scale(0.98);
}

.hint-box {
  text-align: center;
  font-size: calc(0.5rem + .5vw);
}
</style>