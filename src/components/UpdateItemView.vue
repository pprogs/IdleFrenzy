<template>
  <div class="item">
    
    <span>{{$t(update.rid)}} {{update.name}}</span>
    <span>
      <ui-button 
        size="small"
        :color="canBuy?'green':'red'"
        :disabled="!canBuy"
        @click="buy">{{label}}</ui-button>   
    </span>
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
.icon {
  width: 64px;
  height: 64px;
}

.item {
  vertical-align: middle;
}
</style>
