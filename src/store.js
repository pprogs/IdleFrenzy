import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    buyMultiplier: 1,
    money: 10000000
  },

  mutations: {
    setMultiplier: function(state, multiplier) {
      state.buyMultiplier = multiplier;
    },
    setMoney: function(state, moneyToSet) {
      state.money = moneyToSet;
    },
    addMoney: function(state, moneyToAdd) {
      state.money += moneyToAdd;
    },
    removeMoney: function(state, moneyToRemove) {
      state.money -= moneyToRemove;
    }
  }
});

export default store;
