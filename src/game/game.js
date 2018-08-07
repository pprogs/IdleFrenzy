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

  this.init = function(vm) {
    this.resources.forEach(res => {
      res.$store = vm.$store;
      res.$game = vm.$game;
    });

    vm.$mainLoop.setUpdate(delta => {
      this.advance(delta);
    });
  };
};

import MainLoop from "mainloop.js";
MainLoop.setSimulationTimestep(1000 / 30);

Game.install = function(Vue) {
  Vue.prototype.$game = new Game();
  Vue.prototype.$mainLoop = MainLoop;
};

export default Game;
