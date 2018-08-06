<template>
  <managers-list :managers="managers"></managers-list>
</template>

<script>
import ManagersList from "@/components/ManagerListView";

export default {
  data: function() {
    return {
      managers: this.$store.state.managers
    };
  },

  components: {
    ManagersList
  }
};
</script>
