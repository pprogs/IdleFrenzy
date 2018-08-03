<template>    
  <div>
    <table class="item">
      <tr>
        <td class="tdicon" rowspan="2">
          <img class="icon" @click="iconClick" :src="require(`@/assets/${resource.Icon}`)" />
        </td>
        <td>{{resource.Name}} ({{resource.Quantity}})</td>
        <td style="width=64px">{{cost}}</td>
      </tr>
      <tr>
        <td><progress class="progress" max=100 value=50>50%</progress></td>   
        <td style="width=64px">
          <button :class="buttonClass" :disabled="!canBuy" @click="buy">{{buyLabel}}</button>
        </td>         
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["resource"],
  data: function() {
    return {
      someData: null
    };
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
        const qty = this.$store.state.buyMultiplier;

        this.resource.Quantity += qty;
        this.$store.commit("removeMoney", cost);
      }
    }
  },
  computed: {
    cost: function() {
      return this.$store.state.buyMultiplier * this.resource.Cost;
    },
    buyLabel: function() {
      return "Buy " + this.$store.state.buyMultiplier;
    },
    canBuy: function() {
      return this.$store.state.Money >= this.cost;
    },
    buttonClass: function() {
      return "button button" + (this.canBuy ? "Green" : "Red");
    }
  }
};
</script>

<style>
.item {
  width: 300px;
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
  height: 100%;
  border: 1px solid black;
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
