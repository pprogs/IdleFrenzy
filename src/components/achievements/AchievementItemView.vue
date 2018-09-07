<template>
  <div class="_achievement_icon" :class="classes" ref="image" :style="{ 'background-image': 'url(' + require(`@/assets/${achievement.icon}`) + ')' }">
    <ui-tooltip openOn="hover" trigger="image" position="bottom center">{{ achievement.name }}</ui-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    achievement: Object
  },
  computed: {
    classes() {
      return [`_achievement_icon-${this.achievement.achieved}`];
    }
  }
};
</script>

<style>
._achievement_icon {
  width: 64px;
  height: 64px;
}
._achievement_icon-true {
  background-color: #eee;
  background-position: 50%;
  background-size: cover;
  margin-bottom: rem-calc(16px);
  margin-right: rem-calc(16px);
  position: relative;
}

._achievement_icon-false {
  background-color: #eee;
  background-position: 50%;
  background-size: cover;
  margin-bottom: rem-calc(16px);
  margin-right: rem-calc(16px);
  position: relative;
  opacity: 0.33;
}
</style>
