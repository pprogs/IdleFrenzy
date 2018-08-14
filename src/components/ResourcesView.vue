<template>
  <div style="display:flex; flex-direction: column;justify-content: center;width:100%">
    <h3>{{$t("ui_totalmoneylabel")}} : {{totalMoneyFormated}}</h3>
    
    <div class="container">
      <ui-radio-group
        class="item"
        name="buyGroupValue"
        :options="buyGroupData"
        :value="buyGroupValue"
        @change="multChanged"
      ></ui-radio-group>

      <resource-list class="item" :resources="resources"/>
    </div>
  </div>
</template>

<script>
import ResourceList from "@/components/ResourceListView";
import buyGroup from "@/game/buyGroups";

export default {
  components: {
    ResourceList
  },
  data: function() {
    return {
      resources: this.$game.resources,
      buyGroupData: buyGroup
    };
  },
  methods: {
    multChanged(value) {
      const mult = value === -1 ? 0 : value;
      this.$store.commit("setMultiplier", mult);
    }
  },
  computed: {
    totalMoneyFormated() {
      return this.$game.money.format();
    },
    buyGroupValue() {
      let m = this.$store.state.buyMultiplier;
      return m === 0 ? -1 : m;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.some {
  margin: 0px 5px;
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  align-self: center;
}

.item {
  align-self: stretch;
}
</style>
