<template>
  <div class="home__info">
        <div class="home__city">
          {{ city }}, {{ country }}
        </div>
        <div class="home__date">{{date}}</div>
        <div class="home__temperature">{{temp}}&#176;С</div>
        <div class="home__type">{{type}}</div>
      </div>
</template>

<script>
export default {
  name: 'HomeInfo',
  props: {
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    temp: {
      type: Number,
      required: true
    },
     type: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>