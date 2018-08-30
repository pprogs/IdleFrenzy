<template>
  <div class="item-container">
    
    <div class="item">{{$t(update.rid)}} {{update.name}}</div>
    <div class="item">
      <ui-button 
        size="small"
        :color="canBuy?'green':'red'"
        :disabled="!canBuy"
        @click="buy">{{label}}</ui-button>   
    </div>
  </div>
</template>

<script>
export default {
  props: ["update"],
  data: function() {
    return {};
  },
  computed: {
    canBuy: function() {
      return this.update.canBuy(this.$game.money);
    },
    label: function() {
      return this.update.bought
        ? this.$t("ui_bought")
        : this.update.cost.format();
    }
  },
  methods: {
    buy() {
      this.update.buy();
    }
  }
};
</script>

<style scoped>
.item-container {
  display: flex;
  flex-direction: row;
}

.item {
  width: 50%;
}
</style>
