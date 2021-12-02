<template>
  <div class="game-overlay">
    <div class="game-overlay__score">
      <div class="game-overlay__score-wrapper">
        <span>Счет:</span> {{ $store.getters.getScore }}
      </div>
    </div>
    <div class="game-overlay__body" v-if="!isLoading">
      <h2 class="game-overlay__title">Угадай погоду в {{ russianCityName }}</h2>
      <div class="game-overlay__list" v-if="randomTemp.length === 4">
        <div
          class="btn game__overlay__item btn-primary"
          :class="{
            'btn-success': idx == isRightVariant,
            'btn-danger': idx == isFalseVariant,
          }"
          @click="chooseHandler(temp, idx)"
          v-for="(temp, idx) in randomTemp"
          :key="temp + idx"
        >
          {{ temp }}&#176;С
        </div>
      </div>
    </div>
    <app-loader v-else/>
  </div>

</template>

<script>
import axios from "axios";
import { API_KEY } from "@/API/WeatherApi";
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import store from "@/store";
import { translateWord } from "@/utils/translate";
import {saveScoreResult} from '@/utils/game'
import AppLoader from '../App/AppLoader.vue';


export default {
  components: { AppLoader },
  setup() {
    const city = ref("");
    const nextQuestion = ref(false);
    const isRightVariant = ref(null);
    const isFalseVariant = ref(null);
    const russianCityName = ref("");
    const isLoading = ref(false);
    const cityWeather = reactive({
      value: "",
      postion: Math.round(Math.random() * 3),
    });
    const randomInteger = (min, max) => {
      const rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    };
    const randomTemp = reactive(
      new Array(4).fill(1).map((item) => randomInteger(-30, 30))
    );

    const getWeatherInCity = async () => {
      try {
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${API_KEY}`;
        const res = await axios.get(API_URL);
        cityWeather.value = Math.round(res.data.main.temp);
        cityWeather.postion = Math.round(Math.random() * 3);
        const newTemps = randomTemp.map((item) => randomInteger(-30, 30));
        newTemps.forEach((temp, index) => (randomTemp[index] = temp));
        randomTemp[cityWeather.postion] = cityWeather.value;
        console.log(cityWeather.value);
      } catch (err) {
        console.log(err);
      }
    };
    const getCity = async () => {
      try {
        isLoading.value = true;
        const res = await axios.get("city.list.json");
        const ids = Array.from(res.data);
        city.value = ids[Math.floor(Math.random() * ids.length)];

        if (city.value) {
          russianCityName.value = await translateWord(city.value, "ru");
        }

        getWeatherInCity();
        isLoading.value = false;
      } catch (err) {}
    };
    const chooseHandler = (temp, idx) => {
      if (temp === cityWeather.value) {
        store.commit("incrementScore");
        nextQuestion.value = true;
        isRightVariant.value = idx;
        setTimeout(() => {
          nextQuestion.value = false;
          isRightVariant.value = null;
          getCity();
        }, 200);
      } else {
        store.commit("dicrementScore");
        nextQuestion.value = true;
        isFalseVariant.value = idx;
        setTimeout(() => {
          nextQuestion.value = false;
          isFalseVariant.value = null;
          getCity();
        }, 200);
      }
    };

    onMounted(() => {
      getCity();
    });
    onBeforeUnmount(() => {
      saveScoreResult()
    })

    return {
      city,
      cityWeather,
      randomTemp,
      chooseHandler,
      isRightVariant,
      isFalseVariant,
      nextQuestion,
      isLoading,
      russianCityName,
    };
  },
};
</script>

<style>
</style>