
<template>
  <div class="item">
    <img class="icon" :src="require(`@/assets/${manager.icon}`)"/>
    <span>{{$t(manager.id)}}</span>
    <span>
      <ui-button 
        size="small"
        :color="canBuy?'green':'red'"
        :disabled="!canBuy"
        @click="buy">{{manager.bought ? 'Куплено' : $format(manager.cost)}}</ui-button>   
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
      return this.manager.canBuy(this.$store.state.money);
    }
  },

  methods: {
    buy: function() {
      if (!this.manager.canBuy(this.$store.state.money)) return;
      this.manager.bought = true;
      this.$store.commit("removeMoney", this.manager.cost);
      let res = this.$game.resources.find(r => r.id === this.manager.rid);
      if (res) {
        res.hasManager = true;
        res.startWork();
      }
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
