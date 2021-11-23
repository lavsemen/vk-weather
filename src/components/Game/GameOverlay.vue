<template>
  <div class="game-overlay">
    <div class="game-overlay__score">
      <div class="game-overlay__score-wrapper">
         <span>Счет:</span> {{ $store.getters.getScore }}
      </div>
    </div>
    <div class="game-overlay__body">
        <h2 class="game-overlay__title">
          Угадай погоду в Тюмени
        </h2>
        <div class="game-overlay__list">
          <div class="btn btn-outline-primary game__overlay__item">
            +1&#176;С
          </div>
          <div class="btn btn-outline-primary game__overlay__item">
            +10&#176;С
          </div>
          <div class="btn btn-outline-primary game__overlay__item">
            -16&#176;С
          </div>
          <div class="btn btn-outline-primary game__overlay__item">
            -16&#176;С
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {

  }
}
</script>

<style>

</style>