import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    buyMultiplier: 1,
    Money: 100
  },
  mutations: {
    setMultiplier: function(state, multiplier) {
      state.buyMultiplier = multiplier;
    },
    addMoney: function(state, moneyToAdd) {
      state.Money += moneyToAdd;
    },
    removeMoney: function(state, moneyToRemove) {
      state.Money -= moneyToRemove;
    }
  },
  actions: {}
});
