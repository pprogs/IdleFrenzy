
<template>
  <div class="item">
    <img class="icon" :src="require(`@/assets/${manager.icon}`)"/>
    <span>{{$t(manager.id)}}</span>
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
  props: {
    manager: Object
  },

  computed: {
    canBuy: function() {
      return this.manager.canBuy(this.$game.money);
    },
    label: function() {
      return this.manager.bought ? "Куплено" : this.manager.cost.format();
    }
  },

  methods: {
    buy: function() {
      this.manager.buy();
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
