//
//
//
import { Resources } from "@/game/resource";
import { Managers } from "@/game/manager";

import myNumber from "@/game/myNumber";

//
//
//
const Game = function() {
  //data
  Game.Version = "0.000002";

  this.resources = Resources;
  this.managers = Managers;

  this.achivments = [];
  this.upgrades = [];

  this.statistics = undefined;

  //properties
  this.money = new myNumber(100, 0);

  this.canBuyAnyManager = false;
  this.canBuyAnyResource = false;

  //methods
  this.addMoney = function(moneyToAdd) {
    this.money = myNumber.add(this.money, moneyToAdd);
  };
  this.getMoney = function(moneyToGet) {
    let rem = myNumber.dec(this.money, moneyToGet);
    //TODO: make a minus check!!
    this.money = rem;
    this.refreshNumbers(true);

    return true;
  };
  this.setMoney = function(moneyToSet) {
    this.money = new myNumber(moneyToSet);
    this.refreshNumbers(true);
  };
  //
  //
  //
  this.advance = function(delta) {
    let money = this.money.clone();

    this.resources.forEach(res => res.advance(delta));

    this.refreshNumbers(money.cmp(this.money) !== 0);
  };
  //
  //
  //
  this.refreshNumbers = function(moneyChanged) {
    if (moneyChanged) {
      this.resources.forEach(res => {
        res.howMuchCanBuy = res.canBuyFor(this.money);
      });
    }

    let r = this.resources.find(res => res.howMuchCanBuy.az());
    this.canBuyAnyResource = r !== undefined;

    let m = this.managers.find(man => man.canBuy(this.money));
    this.canBuyAnyManager = m !== undefined;
  };
  //
  //
  //
  this.save = function() {
    let save = [];

    save.push({
      version: Game.Version,
      resources: this.resources.length,
      managers: this.managers.length,
      money: this.money,
      mult: this.$vue.$store.state.buyMultiplier
    });

    save.push({
      managers: this.managers.map(man => man.save()),
      resources: this.resources.map(res => res.save())
    });

    this.$storage.setItem("IdleFrenzy", JSON.stringify(save));
  };
  //
  //
  //
  this.load = function() {
    let data = this.$storage.getItem("IdleFrenzy");
    if (!data) return;

    let save = JSON.parse(data);

    let opts = save[0];
    let d = save[1];
    let v = opts.version || 0;

    if (v !== Game.Version) return;

    this.money = myNumber.fromObj(opts.money);

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

    this.refreshNumbers(true);
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

    this.refreshNumbers(true);
  };
};

import MainLoop from "mainloop.js";
MainLoop.setSimulationTimestep(1000 / 30);

Game.install = function(Vue) {
  Vue.prototype.$game = new Game();
  Vue.prototype.$mainLoop = MainLoop;

  //не самое лучшее решение, но рабочее )
  Vue.mixin({
    created() {
      //this.$store добавлен, т.к. в дев создается еще один инстанс
      if (!this.$parent && this._isVue && this.$store) {
        console.log("created");
        this.$game.init(this);
        this.$game.load();
        this.$mainLoop.start();
      }
    }
  });
};

export default Game;
