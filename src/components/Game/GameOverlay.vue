<template>
  <div class="game-overlay">
    <div class="game-overlay__score">
      <div class="game-overlay__score-wrapper">
        <span>Счет:</span> {{ $store.getters.getScore }}
      </div>
    </div>
    <div class="game-overlay__body">
      <h2 class="game-overlay__title">Угадай погоду в {{ city }}</h2>
      <div class="game-overlay__list" v-if="randomTemp.length === 4">
        <div class="btn  game__overlay__item"
          :class="nextQuestion && idx == isRightVariant? 'btn-success': 'btn-outline-primary'"
          @click="chooseHandler(temp, idx)"
          v-for="(temp, idx) in randomTemp"
          :key="temp + idx"
        >{{temp}}&#176;С</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_KEY } from "@/API/WeatherApi";
import { onMounted, reactive, ref } from "vue";
import store from  '@/store'
export default {
  setup() {
    const city = ref("");
    const nextQuestion = ref(false);
    const isRightVariant = ref(null)
    const cityWeather = reactive({
      value: "",
      postion: Math.round(Math.random() * 3),
    });
    const randomInteger = (min, max) => {
      const rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }
    const randomTemp = reactive(new Array(4)
      .fill(1)
      .map((item) => randomInteger(-30, 30)))

    const getWeatherInCity = async () => {
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${API_KEY}`;
      const res = await axios.get(API_URL);
      cityWeather.value = Math.round(res.data.main.temp);
      cityWeather.postion = Math.round(Math.random() * 3)
      randomTemp.map((item) => randomInteger(-30, 30))
      randomTemp[cityWeather.postion] = cityWeather.value
      console.log(randomTemp)
    };
    const getCity = async () => {
      const res = await axios.get("city.list.json");
      const ids = Array.from(res.data);
      city.value = ids[Math.floor(Math.random() * ids.length)];
      getWeatherInCity();
    };
    const chooseHandler = (temp, idx) => {
      if (temp === cityWeather.value) {
        store.commit('incrementScore')
        nextQuestion.value = true
        isRightVariant.value = idx
        setTimeout(() => {
          nextQuestion.value = false;
          getCity()
        }, 400)
        
      }
    }
    onMounted(() => {
      getCity();
    });

    return {
      city,
      cityWeather,
      randomTemp,
      chooseHandler,
      isRightVariant,
      nextQuestion
    };
  },
};
</script>

<style>
</style>