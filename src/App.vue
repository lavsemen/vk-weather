<template>
  <div class="app" v-if="showContent">
    <app-navbar />
    <router-view />
  </div>
</template>
<script>
import AppNavbar from "./components/App/AppNavbar.vue"
import { onMounted, ref } from 'vue'
import { axios } from 'axios'
import store from '@/store'
export default {
  name: "App",
  components: { AppNavbar },
  setup() {
    const showContent = ref(false)
    onMounted(async () => {
      await store.dispatch('userIsAuth')
      showContent.value = true
    })
    return {
      showContent
    }
  }
};
</script>
