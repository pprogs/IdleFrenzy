<template>
  <div class="_achievement_list">
    <template v-for="achievement in achievements">
      <ach-item :achievement="achievement" :key="achievement.id"/>     
    </template>  
  </div>
</template>

<script>
import AchItem from "./AchievementItemView";

export default {
  props: {
    achievements: Array
  },
  components: {
    AchItem
  }
};
</script>

<style>
._achievement_list {
  display: flex;
  flex-direction: row;
}
</style>
