<template>
  <div
    :class="{
      'animate__animated scale-out-center animate__delay-4s': true,
      loader: true,
      'loader-hidden': !loading,
    }"
  >
    <div class="tile neon start-rotation" id="neon">
      <ul class="animated-squares">
        <li class="square square-one"></li>
        <li class="square square-two"></li>
        <li class="square square-three"></li>
        <li class="square square-four"></li>
        <li class="square square-five"></li>
        <li class="square square-six"></li>
        <li class="square square-seven"></li>
        <li class="square square-eight"></li>
        <li class="square square-nine"></li>
        <li class="square square-ten"></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: ["loading"],
  data() {
    return {};
  },
};
</script>
