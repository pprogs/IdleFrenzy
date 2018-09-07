<template>
  <ach-list :achievements="achievements"/>
</template>

<script>
import AchList from "./AchievementListView";

export default {
  data: function() {
    return {
      achievements: this.$game.achievements.all
    };
  },

  components: {
    AchList
  }
};
</script>
