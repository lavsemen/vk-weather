<template>
  <div class="loader">
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.loader {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    &:first-child {
      width: 70px;
      height: 70px;
      border-radius: 50px;
      display: flex;
      align-items: center; 
      justify-content: center;
      border: 2px dashed #fff;
      animation: loader-animation 2s linear 0s infinite;
    }
    &:nth-child(2) {
      width: 50px;
      height: 50px;
      position: absolute;
      border-radius: 50px;
      background: #fff;
      animation: flip-animation 0.4s linear 0s infinite;
    }
  }
}

@keyframes loader-animation {
  form {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg );
  }
}
@keyframes flip-animation {
  form {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
</style>