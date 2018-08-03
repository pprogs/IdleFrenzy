<template>
  <div style="display:flex; flex-direction: column;justify-content: center;">
    <h3>Всего денег : {{totalMoneyFormated}}</h3>

    <div class="container">
      <ui-radio-group
        class="item"
        name="buyGroupValue"
        :options="buyGroupData"
        :value="buyGroupValue"
        @change="multChanged"
      >Сколько хочу взять</ui-radio-group>

      <resource-list class="item" :resources="resources"/>
    </div>
  </div>
</template>

<script>
import Resources from "../game/resource";
import ResourceList from "@/components/ResourceListView";

const buyGroup = [
  {
    label: "x1",
    value: 1
  },
  {
    label: "x10",
    value: 10
  },
  {
    label: "x100",
    value: 100
  },
  {
    label: "ВСЕ!",
    value: -1
  }
];

export default {
  components: {
    ResourceList
  },
  data: function() {
    return {
      resources: [Resources.Palatka, Resources.Magazin, Resources.Zapravka],
      buyGroupValue: this.$store.state.buyMultiplier,
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
      return this.$format(this.$store.state.Money);
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
  width: 500px;
  align-self: center;
}

.item {
  align-self: stretch;
}
</style>
