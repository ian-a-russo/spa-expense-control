<template>
  <div
    style="
      height: 100%;
      width: 100%;
      background-color: rgb(var(--v-theme-on-surface));
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.17;
    "
    class="d-flex justify-center align-center"
  ></div>
  <div
    style="height: 100%; width: 100%; position: absolute; top: -20px; left: 0"
    class="d-flex justify-center align-center"
  >
    <div class="point-1 point" />
    <div class="point-2 point" />
    <div class="point-3 point" />
    <div class="point-4 point" />
    <div class="point-5 point" />
    <div class="point-6 point" />
  </div>
</template>

<style scoped>
@keyframes movement {
  0% {
    transform: rotate(360deg) translateX(25px) rotate(-360deg);
    background-color: rgba(var(--v-theme-primary));
  }
  20% {
    transform: rotate(315deg) translateX(25px) rotate(-315deg);
  }
  40% {
    transform: rotate(270deg) translateX(25px) rotate(-270deg);
    background-color: rgba(var(--v-theme-primary-lighten-1));
  }
  50% {
    transform: rotate(225deg) translateX(25px) rotate(-225deg);
  }
  60% {
    transform: rotate(180deg) translateX(25px) rotate(-180deg);
    background-color: rgba(var(--v-theme-primary-lighten-1));
  }
  70% {
    transform: rotate(135deg) translateX(25px) rotate(-135deg);
  }
  80% {
    transform: rotate(90deg) translateX(25px) rotate(-90deg);
    background-color: rgba(var(--v-theme-primary-lighten-1));
  }
  90% {
    transform: rotate(45deg) translateX(25px) rotate(-45deg);
  }
  100% {
    transform: rotate(0deg) translateX(25px) rotate(0deg);
    background-color: rgba(var(--v-theme-primary));
  }
}

.point {
  border-radius: 100%;
  margin-top: 40px;
  margin-left: 4px;
  padding-right: 0px;
  position: absolute;
}

.point-1 {
  animation: 2s linear 1s infinite movement !important;
  width: 10px !important;
  height: 10px !important;
}

.point-2 {
  animation: 2s linear 1.25s infinite movement !important;
  width: 9px !important;
  height: 9px !important;
}

.point-3 {
  animation: 2s linear 1.5s infinite movement !important;
  width: 8px !important;
  height: 8px !important;
}

.point-4 {
  animation: 2s linear 1.75s infinite movement !important;
  width: 7px !important;
  height: 7px !important;
}

.point-5 {
  animation: 2s linear 1.95s infinite movement !important;
  width: 6px !important;
  height: 6px !important;
}

.point-6 {
  animation: 2s linear 2.13s infinite movement !important;
  width: 5px !important;
  height: 5px !important;
}

.point-7 {
  animation: 2s linear infinite cometa !important;
  width: 10px !important;
  height: 10px !important;
  z-index: -1005;
  background-color: black;
}
</style>
