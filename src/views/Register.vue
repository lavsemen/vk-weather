<template>
  <div class="auth">
    <div class="container">
      <form @submit.prevent="submitHandler" class="auth__content">
        <h2 class="auth__title">Регистрация</h2>
        <div class="auth__field" v-if="isUserExist">
          <div class="auth__error">Пользователь существует</div>
        </div>
        <div class="auth__field">
          <input
            type="text"
            v-model="username"
            class="auth__username"
            placeholder="Как вас зовут?"
            required
          />
          <span class="auth__error" v-if="!isValid.username"
            >Некорректное имя</span
          >
        </div>
        <div class="auth__field">
          <input
            type="text"
            v-model="login"
            class="auth__login"
            placeholder="Логин"
            required
          />
          <span class="auth__error" v-if="!isValid.login"
            >Некорректный логин</span
          >
        </div>
        <div class="auth__field">
          <input
            type="password"
            v-model="password"
            class="auth__password"
            placeholder="Пароль"
            required
          />
          <span class="auth__error" v-if="!isValid.password"
            >Некорректный пароль</span
          >
        </div>
        <div class="auth__field">
          <input type="checkbox" required v-model="agree" class="auth__agree" />
          <span class="auth__policy">
            Я согласен на обработку персональных данных
          </span>
          <span class="auth__error" v-if="!isValid.agree"
            >Необходимо согласится на обработку персональных данных</span
          >
        </div>
        <div class="auth__field">
          <button type="submit" class="btn btn-primary">
            Зарегистрироваться
          </button>
        </div>
        <div class="auth__field">
          <div class="auth__info">
            У вас уже есть аккаунт? <router-link to="/login">Войти</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import axios from "axios";
import store from "@/store";
import { useRouter, useRoute } from "vue-router";
import { URL_USERS, GET_USER } from "@/API/firebaseApi";
export default {
  setup(props, context) {
    const router = useRouter();
    const route = useRoute();
    const username = ref("");
    const login = ref("");
    const password = ref("");
    const agree = ref(false);
    const isUserExist = ref(false);
    const isValid = reactive({
      username: true,
      login: true,
      password: true,
      agree: true,
    });

    const validateForm = () => {
      if (username.value.length < 3) {
        isValid.username = false;
      }
      if (password.value.length < 3) {
        isValid.password = false;
      }
      if (login.value.length < 3) {
        isValid.login = false;
      }
      if (!agree.value) {
        isValid.agree = false;
      }

      return true;
    };

    const checkUserInDataBase = async () => {
      try {
        const getUser = await axios.get(GET_USER + login.value + ".json");
        if (getUser.data) {
          isUserExist.value = true;
        } else {
          isUserExist.value = false;
        }
      } catch (err) {
        isUserExist.value = true;
      }
    };

    const submitHandler = async (e) => {
      if (validateForm()) {
        const formData = {
          username: username.value,
          login: login.value,
          password: password.value,
        };

        await checkUserInDataBase();

        if (!isUserExist.value) {
          try {
            const sendData = await axios.patch(URL_USERS, {
              [login.value]: formData,
            });
            store.commit("setUser", formData);
            if (route.query.page) {
              router.push(`/${route.query.page}`);
            } else {
              router.push("/");
            }
          } catch (err) {}
        }
      }
    };

    return {
      username,
      submitHandler,
      isValid,
      login,
      password,
      isUserExist,
      agree,
    };
  },
};
</script>

<style lang="scss">
@import "../assets/scss/auth.scss";
</style>