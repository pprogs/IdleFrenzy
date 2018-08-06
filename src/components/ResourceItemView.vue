<template>    
  <table class="item">
    <th class="w64"></th>
    <th></th>
    <th class="w64"></th>
    <tr>
      <td class="tdicon" rowspan="2">
        <img ref="image" 
             class="icon" 
             @click.prevent="iconClick" 
             :src="require(`@/assets/${resource.Icon}`)"/>                          
      </td>
      <td>{{$t(resource.Name)}} ({{$format(resource.Quantity)}})</td>
      <td>{{$format(cost)}}</td>
    </tr>
    <tr>
      <td>       
        <progress-bar :value="resource.WorkValue"></progress-bar>
      </td>   
      <td>
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
import ProgressBar from "@/components/ProgressBar";

export default {
  props: ["resource"],

  components: {
    ProgressBar
  },

  data: function() {
    return {};
  },
  methods: {
    iconClick() {
      this.resource.StartWork(() => {
        const income = this.resource.Quantity * this.resource.BaseIncome;
        if (income > 0) {
          this.$store.commit("addMoney", income);
        }
      });
    },

    buy() {
      if (this.canBuy) {
        const cost = this.cost;
        const qty = this.wantToBuy;

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
      return `${this.$t("get")} ${this.$format(this.wantToBuy)}`;
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
