<template>
  <div class="container">
    <template v-for="update in updates">
      <update-item :update="update" :key="update.id"/>
    </template>   
  </div>
</template>

<script>
import UpdateItem from "./UpdateItemView";

export default {
  props: {
    updates: Array,
    showAll: Boolean
  },
  components: { UpdateItem },
  data: function() {
    return {};
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
