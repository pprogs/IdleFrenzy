import { Resources } from "@/game/resource";
import { Managers } from "@/game/manager";

const Game = function() {
  this.resources = Resources;
  this.managers = Managers;

  this.achivments = [];
  this.upgrades = [];

  this.money = 0;
  this.reincarnations = 0;

  this.statistics = undefined;

  this.advance = function(delta) {
    this.resources.forEach(res => res.advance(delta));
  };

  this.save = function() {
    let save = [];

    save.push({
      resources: this.resources.length,
      managers: this.managers.length,
      money: this.$vue.$store.state.money,
      mult: this.$vue.$store.state.buyMultiplier
    });

    save.push({
      managers: this.managers.map(man => man.save()),
      resources: this.resources.map(res => res.save())
    });

    this.$storage.setItem("IdleFrenzy", JSON.stringify(save));
  };

  this.load = function() {
    let data = this.$storage.getItem("IdleFrenzy");
    if (!data) return;

    let save = JSON.parse(data);

    let opts = save[0];
    let d = save[1];

    this.$vue.$store.commit("setMoney", opts.money);
    this.$vue.$store.commit("setMultiplier", opts.mult);

    d.resources.forEach(res => {
      let r = this.resources.find(r => r.id === res.id);
      if (!r) return;
      r.load(res);
    });

    d.managers.forEach(man => {
      let m = this.managers.find(m => m.id === man.id);
      if (!m) return;
      m.load(man);
    });
  };

  this.init = function(vm) {
    this.resources.forEach(res => {
      res.$store = vm.$store;
      res.$game = vm.$game;
    });

    this.$vue = vm;
    this.$storage = window.localStorage;

    vm.$mainLoop.setUpdate(delta => {
      this.advance(delta);
    });

    vm.$on("unload", () => {
      this.save();
    });

    this.load();
  };
};

import MainLoop from "mainloop.js";
MainLoop.setSimulationTimestep(1000 / 30);

Game.install = function(Vue) {
  Vue.prototype.$game = new Game();
  Vue.prototype.$mainLoop = MainLoop;

  Vue.mixin({
    created() {
      if (!this.$parent && this._isVue) {
        this.$game.init(this);
        this.$mainLoop.start();
      }
    }
  });
};

export default Game;
