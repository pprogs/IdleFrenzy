import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { Resources } from "@/game/resource";
import { Managers } from "@/game/manager";

const store = new Vuex.Store({
  state: {
    buyMultiplier: 1,
    money: 100,
    resources: Resources,
    managers: Managers,
  },

  mutations: {
    setMultiplier: function(state, multiplier) {
      state.buyMultiplier = multiplier;
    },
    addMoney: function(state, moneyToAdd) {
      state.money += moneyToAdd;
    },
    removeMoney: function(state, moneyToRemove) {
      state.money -= moneyToRemove;
    }
  },
  actions: {}
});

Resources.forEach(element => {
  element.$store = store;
});

export default store;
