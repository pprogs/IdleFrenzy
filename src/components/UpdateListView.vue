<template>
  <div>
    <template v-for="update in updates">
      <update-item :update="update" :key="update.id"/>
    </template>   
  </div>
</template>

<script>
import UpdateItem from "@/components/UpdateItemView";

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
