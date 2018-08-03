<template>
  <div>
    <div v-for="resource in resources" :key="resource.Id">
      <resource-item :resource="resource"/>
    </div>
    
  </div>    
</template>

<script>
import ResourceItem from "@/components/ResourceItemView";

export default {
  props: ["resources"],
  components: {
    ResourceItem
  }
};
</script>


<style scoped>
</style>
