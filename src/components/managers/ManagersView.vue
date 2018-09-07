<template>
  <managers-list :managers="managers"></managers-list>
</template>

<script>
import ManagersList from "./ManagerListView";

export default {
  data: function() {
    return {
      managers: this.$game.managers
    };
  },

  components: {
    ManagersList
  }
};
</script>
