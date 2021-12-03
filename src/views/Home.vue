<template>
  <div class="home">
    <div class="container">
      <div class="home__content">
        <home-search
          @action="updateWather"
          @voiceAction="voiceUpdate"
          :search-input="searchInput"
          :voice-active="voiceActive"
        />
        <home-info
          v-if="showInfo"
          :type="cityInfo.type"
          :temp="cityInfo.temp"
          :city="cityInfo.name"
          :date="date"
          :country="cityInfo.country"
        />
        <h1 class="home__title" v-if="showTitle">
          Хочешь узнать погоду? <br />
          Просто напиши название города.
        </h1>
        <h1 class="home__title" v-if="showError">Город не найден</h1>
        <app-loader style="margin-top: 20px" v-if="isLoading"></app-loader>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, computed, onMounted } from "vue";
import { API_KEY } from "@/API/WeatherApi";
import axios from "axios";
import HomeInfo from "@/components/Home/HomeInfo.vue";
import HomeSearch from "@/components/Home/HomeSearch.vue";
import AppLoader from "@/components/App/AppLoader";
export default {
  components: { HomeInfo, HomeSearch, AppLoader },
  name: "Home",
  setup(props, context) {
    const searchInput = ref("");
    const cityInfo = reactive({});
    const cityValid = ref(false);
    const date = new Date().toLocaleDateString();
    const voiceActive = ref(false);
    const isLoading = ref(false);
    const showErrorMessage = ref(false)
    const fetchWeather = async () => {
      try {
        if (searchInput.value.length > 0) {
          isLoading.value = true;
          const city = searchInput.value;
          const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
          const res = await axios.get(API_URL);
          if (Object.keys(res.data).length === 0) {
            cityNotValid.value = false;
            return;
          }
          cityInfo.name = res.data.name;
          cityInfo.country = res.data.sys.country;
          cityInfo.temp = Math.round(res.data.main.temp);
          cityInfo.type = res.data.weather[0].main;
          cityValid.value = true;
          isLoading.value = false;
        }
      } catch (err) {
        cityValid.value = false;
        showErrorMessage.value = true
        isLoading.value = false;
      }
    };
    const voiceUpdate = (params) => {
      voiceActive.value = params.voiceActive;
      searchInput.value = params.searchInput;
      fetchWeather();
    };
    const updateWather = (value) => {
      searchInput.value = value;
      fetchWeather();
    };

    const showError = computed(() => showErrorMessage.value && !isLoading.value)
    const showTitle  = computed(() => !cityValid.value && !isLoading.value && !showErrorMessage.value)
    const showInfo  = computed(() => cityValid.value && !isLoading.value)

    return {
      isLoading,
      updateWather,
      searchInput,
      showErrorMessage,
      voiceUpdate,
      cityInfo,
      cityValid,
      date,
      fetchWeather,
      voiceActive,
      showError,
      showTitle,
      showInfo
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/home.scss";
</style>
