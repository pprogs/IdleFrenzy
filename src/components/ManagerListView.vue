<template>
  <div>
    <template v-for="manager in managers">
      <manager-item :manager="manager" :key="manager.id"/>     
    </template>  
  </div>
</template>

<script>
import ManagerItem from "@/components/ManagerItemView";

export default {
  props: {
    managers: Array
  },
  components: {
    ManagerItem
  }
};
</script>
