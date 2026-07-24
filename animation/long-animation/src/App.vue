<template>
  <div class="home"></div>
</template>

<script>
import Index from "./app";

export default {
  name: "App",
  components: {},
  methods: {
    init() {
      new Index({
        container: this.$el, // DOM容器
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>

.home {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
