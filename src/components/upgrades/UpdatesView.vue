<template>
  <update-list :updates="updates" :showAll="true"></update-list>
</template>

<script>
import UpdateList from "./UpdateListView";

export default {
  components: { UpdateList },
  data: function() {
    return {
      updates: this.$game.updates
    };
  }
};
</script>
