<template>
  <div class="app-navbar">
    <ul class="app-navbar__list">
      <router-link 
      :to="item.link"
      custom
      v-slot="{ navigate, href }"
      v-for="(item, idx) in links" :key="item + idx">
        <li class="app-navbar__list-item">
          <a :href="href" @click="navigate">{{ item.name }}</a>
        </li>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      links: [
        {
          name: 'Главная',
          link: '/',
        },
        {
          name: 'Викторина',
          link: '/game'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
  .app-navbar {
    display: flex;
    padding-top: 20px;
    justify-content: center;
    &__list {
      display: flex;
      align-items: center;
      justify-content: center;
      widows: 100%;
      &-item {
        a {
          color: #fff;
          text-decoration: none;
          &:hover {
            border-bottom: 1px solid #fff;
            color: #fff;
          }
        }
        & + * {
          margin-left: 40px;
        }
      }
    }
  }
</style>
