<template>
  <div>
    <template v-for="resource in resources">
      <resource-item :resource="resource" :key="resource.Id"/>
    </template>   
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
