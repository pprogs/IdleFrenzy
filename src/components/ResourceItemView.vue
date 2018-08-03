<template>    
  <table class="item">
    <tr>
      <td class="tdicon" rowspan="2">
        <img ref="image" 
             class="icon" 
             @click="iconClick" 
             :src="require(`@/assets/${resource.Icon}`)"/>                          
      </td>
      <td>{{resource.Name}} ({{$format(resource.Quantity)}})</td>
      <td class="w64">{{$format(cost)}}</td>
    </tr>
    <tr>
      <td>
        <progress 
          class="progress" 
          max=100 
          :value="resource.WorkProgress">50%</progress>
      </td>   
      <td class="w64">
        <ui-button 
          size="small"
          :color="canBuy?'green':'red'"
          :disabled="!canBuy"
          @click="buy">
          {{buyLabel}}</ui-button>         
      </td>         
    </tr>
  </table>
</template>

<script>
export default {
  props: ["resource"],
  data: function() {
    return {};
  },
  methods: {
    iconClick() {
      const income = this.resource.Quantity * this.resource.BaseIncome;
      if (income > 0) {
        this.$store.commit("addMoney", income);
      }
    },

    buy() {
      if (this.canBuy) {
        const cost = this.cost;
        const qty = this.wantToBuy;

        console.log(typeof qty);
        console.log(cost + " " + qty);

        this.resource.Quantity += qty;
        this.$store.commit("removeMoney", cost);
      }
    }
  },
  computed: {
    cost: function() {
      return this.wantToBuy * this.resource.Cost;
    },
    buyLabel: function() {
      return "Взять " + this.$format(this.wantToBuy);
    },
    canBuy: function() {
      return this.cost > 0 && this.$store.state.Money >= this.cost;
    },
    howMuchCanBuy: function() {
      return parseInt(
        Math.floor(this.$store.state.Money / this.resource.Cost).toFixed(0)
      );
    },
    wantToBuy: function() {
      return this.$store.state.buyMultiplier === 0
        ? this.howMuchCanBuy
        : this.$store.state.buyMultiplier;
    }
  }
};
</script>

<style scoped>
.item {
  width: 100%;
  height: 64px;
}

.button {
  padding: 5px;
}
.buttonRed {
  background-color: rgba(255, 0, 0, 0.24);
}

.buttonGreen {
  background-color: rgba(0, 128, 0, 0.555);
}

.progress {
  width: 100%;
  height: 80%;
  border: 1px solid black;
}

.w64 {
  width: 64px;
}

.tdicon {
  width: 64px;
  height: 64px;
}

.icon {
  width: 64px;
  height: 64px;
  border-radius: 10px;
  border: 1px solid black;
}
</style>
