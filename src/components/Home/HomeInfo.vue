<template>
  <div class="home__info">
    <div class="home__city">{{ city }}, {{ country }}</div>
    <div class="home__date">{{ date }}</div>
    <div class="home__temperature">{{ temp }}&#176;С</div>
    <div class="home__type">{{ type }}</div>
    <div class="home__chart ct-chart ct-perfect-fourth"></div>
  </div>
</template>

<script>
import Chartist from "chartist";
import { onMounted } from "vue";
export default {
  setup() {
    onMounted(() => {
      const  data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        series: [[5, 2, 4, 2, 0]],
      };
      new Chartist.Line(".ct-chart", data);
    });
  },
  name: "HomeInfo",
  props: {
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    temp: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
</style>