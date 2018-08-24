<template>
  <div class="progressBar">
    <span v-if="label" class="progressBarLabel">{{label}}</span>
    <span class="progressBarValue" :style="styles"></span>
  </div>    
</template>

<script>
export default {
  props: {
    value: Number,
    label: [Number, String],
    animSpeed: {
      type: Number,
      default: 0
    }
  },

  computed: {
    styles: function() {
      return {
        width: `${this.value}%`,
        animation:
          this.animSpeed === 0
            ? ""
            : `barberpole ${this.animSpeed}s linear infinite`
      };
    }
  }
};
</script>

<style scoped>
.progressBar {
  position: relative;
  display: block;
  border: 1px solid black;
  height: 32px;
  width: 100%;
  border-radius: 3px;
}

.progressBarLabel {
  position: absolute;
  display: block;
  width: 100%;
  z-index: 1;
  color: black;
  font-weight: bold;
}

.progressBarValue {
  position: absolute;
  display: block;
  height: 100%;
  background-color: lightgreen;
  width: 50%;
  border-radius: 3px;

  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 1rem,
    rgb(158, 199, 154) 1rem,
    rgb(65, 105, 63) 2rem
  );
  background-size: 200% 200%;
  background-attachment: fixed;
}

@keyframes barberpole {
  100% {
    background-position: 100% 100%;
  }
}
</style>
