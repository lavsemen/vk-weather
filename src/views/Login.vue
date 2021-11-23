<template>
    <div class="auth">
    <div class="container">
      <form @submit.prevent="submitHandler" class="auth__content">
        <h2 class="auth__title">Войти</h2>
         <div class="auth__field" v-if="!isValid">
           <div class="auth__error">
              Данные введены некорректно!
           </div>
        </div>
        <div class="auth__field">
          <input type="text" v-model="login" class="auth__login" placeholder="Логин" />
        </div>
        <div class="auth__field">
          <input type="password" v-model="password" class="auth__password" placeholder="Пароль"/>
        </div>
         <div class="auth__field">
          <button type="submit" class="btn btn-primary">Войти</button>
        </div>
         <div class="auth__field">
          <div class="auth__info">
             У вас еще нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link>
          </div>
         </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import {GET_USER} from '@/API/firebaseApi'
import axios from 'axios'
import store from "@/store";
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const login = ref('')
    const password = ref('')
    const isValid = ref(true)
    const router = useRouter()
    const route = useRoute()
    
    

    const validateForm = () => {
      if (password.value.length < 3) {
        isValid.value = false;
      }
      if (login.value.length < 3) {
        isValid.value = false;
      }

      return true;
    };
    
    const submitHandler = async() => {
      if (validateForm()) {
        try {
          const user  = await axios.get(GET_USER + login.value + '.json');
          
          if (user.data.login === login.value && user.data.password === password.value) {
            store.commit("setUser", user.data.username);
            if (route.query.page) {
              router.push(`/${route.query.page}`)
            } else {
              router.push('/')
            }

          } else {
            isValid = false
          }
        } catch (err) {
          isValid.value = false
        }
      }
    }


    return {
      login,
      password,
      isValid,
      submitHandler
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/auth.scss';
</style>