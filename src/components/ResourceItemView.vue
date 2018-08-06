<template>    
  <table class="item">
    <th class="w64"></th>
    <th></th>
    <th class="w64"></th>
    <tr>
      <td class="tdicon" rowspan="2">
        <div class="divs" @click.prevent="iconClick">
          <img class="icon" :src="require(`@/assets/${resource.icon}`)"/> 
          <span class="iconLabel">{{$format(resource.quantity)}}</span>
        </div>                   
        
      </td>
      <td>{{$t(resource.id)}} ({{$format(resource.quantity)}})</td>
      <td>{{$format(cost)}}</td>
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
        const cost = this.cost;
        const qty = this.wantToBuy;

        this.resource.quantity += qty;
        this.$store.commit("removeMoney", cost);
      }
    }
  },
  computed: {
    cost: function() {
      let wtb = this.wantToBuy;
      return this.resource.costToBuy(wtb);
    },
    buyLabel: function() {
      return `${this.$t("get")} ${this.$format(this.wantToBuy)}`;
    },
    canBuy: function() {
      return this.cost > 0 && this.$store.state.money >= this.cost;
    },
    wantToBuy: function() {
      return this.$store.state.buyMultiplier === 0
        ? this.resource.howMuchCanBuy(this.$store.state.money)
        : this.$store.state.buyMultiplier;
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
