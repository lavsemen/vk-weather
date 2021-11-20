<template>
  <div class="app">
    <div class="container">
        <app-navbar/>
        <router-view/>
    </div>
  </div>
</template>
<script>
import AppNavbar from './components/App/AppNavbar.vue'
export default {
  name: 'App',
  components: { AppNavbar }
}
</script>