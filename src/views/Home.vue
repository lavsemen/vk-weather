<template>
  <div class="home">
    <div class="home__content">
      <div class="home__search">
        <input
          type="text"
          placeholder="Search..."
          v-model.trim="searchInput"
          @keyup.enter="fetchWeather"
        />
      </div>
      <div class="home__info" v-if="cityValid">
        <div class="home__city">
          {{ cityInfo.name }}, {{ cityInfo.country }}
        </div>
        <div class="home__date">{{date}}</div>
        <div class="home__temperature">{{cityInfo.temp}}&#176;С</div>
        <div class="home__type">{{cityInfo.type}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, computed } from "vue";
import { API_KEY } from "@/API/WeatherApi";
import axios from "axios";

export default {
  name: "Home",
  setup(props, context) {
    const searchInput = ref("");
    const cityInfo = reactive({});
    const cityValid = ref(false);
    const date = (new Date).toLocaleDateString()

    const fetchWeather = async () => {
      try {
        if (searchInput.value.length > 0) {
          const city = searchInput.value;
          const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
          const res = await axios.get(API_URL);

          if (Object.keys(res.data).length === 0) {
            cityNotValid.value = false;
            return;
          }
          console.log(res.data);
          cityInfo.name = res.data.name
          cityInfo.country = res.data.sys.country
          cityInfo.temp = Math.round(res.data.main.temp)
          cityInfo.type = res.data.weather[0].main
          cityValid.value = true
        }
      } catch (err) {
        cityValid.value = false;
      }
    };

    return {
      searchInput,
      cityInfo,
      cityValid,
      date,
      fetchWeather,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  background: url("../assets/home-bg.gif");
  height: 100vh;
  position: relative;
  z-index: 0;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(#000, 0.3);
    z-index: 0;
  }
  &__content {
    padding-top: 50px;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
  &__search {
    width: 100%;
    display: flex;
    justify-content: center;
    input {
      background: rgba(#fff, 0.7);
      border-radius: 8px 0 8px 0;
      width: calc(100% - 20px);
      max-width: 500px;
      height: 40px;
      padding-left: 10px;
      font-size: 19px;
      border: 0;
      color: #000;
      cursor: pointer;
    }
  }
  &__city {
    font-weight: 600;
    font-size: 48px;
    margin-top: 20px;
    text-shadow: 7px 7px 9px rgba(0, 0, 0, 0.44);
  }
  &__date {
    font-size: 24px;
    margin-top: 8px;
    font-style: italic;
    font-weight: 300;
  }
  &__info {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  &__temperature {
    padding: 20px;
    background: rgba(rgb(181, 185, 189), 0.6);
    border-radius: 8px;
    box-shadow: 7px 7px 40px rgba(0, 0, 0, 0.32);
    margin-top: 24px;
    font-weight: 700;
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.44);
    font-size: 72px;
  }
  &__type {
    margin-top: 20px;
    font-style: italic;
    font-weight: 700;
    font-size: 42px;
  }
}
</style>
