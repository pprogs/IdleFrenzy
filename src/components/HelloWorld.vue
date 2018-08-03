<template>
  <div>
    <h3>Total money : {{totalMoneyFormated}}</h3>
    <div>
      <button @click="setMult(1)">Купить 1</button>
      <button @click="setMult(10)">Купить 10</button>
      <button @click="setMult(100)">Купить 100</button>
    </div>
    <resource-list :resources="resources"/>
  </div>
</template>

<script>
import Resources from "../game/resource";
import ResourceList from "@/components/ResourceListView";

export default {
  components: {
    ResourceList
  },
  data: function() {
    return {
      resources: [Resources.Palatka, Resources.Magazin]
    };
  },
  methods: {
    setMult(multiplier) {
      this.$store.commit("setMultiplier", multiplier);
    }
  },
  computed: {
    totalMoneyFormated() {
      return this.$store.state.Money;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
