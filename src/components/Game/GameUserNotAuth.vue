<template>
  <div class="game-info">
    <h2 class="game-info__title">
      Угадай погоду!
    </h2>
    <p class="game-info__desc">
    Угадай погоду - это игра где тебе предстоит угадать, какая сейчас погода в городе. На выбор тебе будет предложено 3 варианта ответа, за каждый правильный ответ, тебе будет начислятся 1 очко. Для того чтобы начать игру, необходимо зарегистрироваться.
    </p>
    <div class="game-info__buttons">
      <router-link class="btn btn-success" to="/register?page=game">Зарегистрироваться</router-link>
      <router-link class="btn btn-outline-success" to="/login?page=game">Войти</router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>