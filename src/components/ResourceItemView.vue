<template>    
  <table class="item">
    <th class="w64"></th>
    <th></th>
    <th class="w64"></th>
    <tr>
      <td class="tdicon" rowspan="2">
        <div class="divs" @click.prevent="iconClick">
          <img class="icon" :src="require(`@/assets/${resource.icon}`)"/> 
          <span class="iconLabel">{{qtyLabel}}</span>
        </div>                   
        
      </td>
      <td>{{$t(resource.id)}}</td>
      <td>{{cost.format()}}</td>
    </tr>
    <tr>
      <td>       
        <progress-bar 
          :value="resource.workValue" 
          :label="$formatInt(resource.workValue)">
        </progress-bar>
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
import myNumber from "@/game/myNumber";

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
      this.resource.startWork();
    },

    buy() {
      if (this.canBuy) {
        const qty = this.wantToBuy();
        this.resource.buy(qty);
      }
    },

    wantToBuy() {
      return this.$store.state.buyMultiplier === 0
        ? this.resource.howMuchCanBuy.clone()
        : new myNumber(this.$store.state.buyMultiplier);
    }
  },
  computed: {
    cost: function() {
      let wtb = this.wantToBuy();
      return this.resource.costToBuy(wtb);
    },
    buyLabel: function() {
      let wtb = this.wantToBuy();
      return `${this.$t("get")} ${wtb.format()}`;
    },
    qtyLabel: function() {
      return this.resource.quantity.format();
    },
    canBuy: function() {
      let wtb = this.wantToBuy();
      return (
        this.resource.howMuchCanBuy.az() &&
        this.resource.howMuchCanBuy.cmp(wtb) >= 0
      );
    }
  }
};
</script>

<style scoped>
.iconLabel {
  position: relative;
  display: block;
  background-color: rgba(192, 192, 192, 0.774);
  text-align: center;
  border-radius: 10px;
  z-index: 1;
}

.icon {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 1;

  border-radius: 10px;
  border: 1px solid black;
}

.item {
  width: 100%;
  height: 64px;
}

.divs {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
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
</style>
