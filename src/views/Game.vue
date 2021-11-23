<template>
  <div class="game">
    <div class="container">
      <game-user-not-auth v-if="userIsNotAuth"/>
      <game-overlay v-else/>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import store from '@/store'
import GameUserNotAuth from '@/components/Game/GameUserNotAuth.vue'
import GameOverlay from '../components/Game/GameOverlay.vue'
export default {
  components: {GameUserNotAuth, GameOverlay},
  setup() {

    const userIsNotAuth = computed(() => {
        return !store.getters.getAuth
    })

    return {
      userIsNotAuth
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/game.scss';
</style>