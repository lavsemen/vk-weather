<template>
  <div class="app">
    <app-navbar />
    <router-view />
  </div>
</template>
<script>
import AppNavbar from "./components/App/AppNavbar.vue"
import { onMounted } from 'vue'
import { axios } from 'axios'
import store from '@/store'
export default {
  name: "App",
  components: { AppNavbar },
  setup() {
    onMounted(() => {
      store.dispatch('userIsAuth');
    })
  }
};
</script>