<template>
  <div class="container">
    <div class="app-navbar">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="navbar-brand">{{$store.getters.getUser}}</div>
        <button
          class="navbar-toggler"
          type="button"
          @click="toggleBurger"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" :class="burgerIsActive? 'show': ''" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link
              :to="item.link"
              v-for="(item, idx) in links"
              :key="item + idx"
              class="nav-link nav-item"
            >
              {{ item.name }}
            </router-link>
          </div>
          <router-link to="/login" class="btn btn-info" v-if="!$store.getters.getAuth">Войти</router-link>
          <router-link @click="logout" to="/" class="btn btn-danger" v-if="$store.getters.getAuth">Выйти</router-link>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      burgerIsActive: false,
      links: [
        {
          name: "Главная",
          link: "/",
        },
        {
          name: "Викторина",
          link: "/game",
        },
      ],
    };
  },
  methods: {
    toggleBurger() {
      this.burgerIsActive = !this.burgerIsActive
    },
    logout() {
      this.$store.commit('logout')
    }
  }
};
</script>
<style lang="scss">
.app-navbar {
  padding-top: 40px;
  .navbar {
    width: 100%;
    justify-content: space-between;
    .nav-link {
      font-size: 1.1rem;
    }
    .btn {
      margin-left: auto;
      box-shadow: 7px 7px 40px rgba(255, 255, 255, 0.32);
      color: #fff
    }
  }
}
</style>
