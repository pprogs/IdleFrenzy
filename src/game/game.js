//
import { Resources } from "@/game/resource";
import { Managers } from "@/game/manager";
import { Updates } from "@/game/upgrade";

import myNumber from "@/game/myNumber";
import Statistics from "@/game/statistics";

//
const Game = function() {
  Game.Version = "0.000007";

  this.resources = Resources;
  this.managers = Managers;
  this.updates = Updates;

  this.$events = [];
  this.$handlers = Object.create(null);

  //statistics first! achievements after,
  //`cos game events should run in this order
  this.statistics = new Statistics(this);
  this.achievements = new Achievements(this);

  //properties
  this.money = new myNumber();

  this.canBuyAnyManager = false;
  this.canBuyAnyResource = false;
  this.canBuyAnyUpdate = false;

  //methods
  this.addMoney = function(moneyToAdd) {
    this.money = myNumber.add(this.money, moneyToAdd);
    this.refreshNumbers(true);

    this.$emit("addMoney", moneyToAdd.clone());
  };
  //
  this.getMoney = function(moneyToGet) {
    let rem = myNumber.dec(this.money, moneyToGet);

    if (rem.bz()) return false;

    this.money = rem;
    this.refreshNumbers(true);

    this.$emit("getMoney", moneyToGet.clone());

    return true;
  };
  //
  this.setMoney = function(moneyToSet) {
    this.money = new myNumber(moneyToSet);
    this.refreshNumbers(true);
  };
  //
  this.advance = function(delta) {
    let money = this.money.clone();
    this.resources.forEach(res => res.advance(delta));
    this.refreshNumbers(money.cmp(this.money) !== 0);

    this.callEvents();
  };
  //
  this.refreshNumbers = function(moneyChanged) {
    if (moneyChanged) {
      this.resources.forEach(res => {
        res.howMuchCanBuy = res.canBuyFor(this.money);
      });

      let r = this.resources.find(res => res.howMuchCanBuy.az());
      this.canBuyAnyResource = r !== undefined;

      let m = this.managers.find(man => man.canBuy(this.money));
      this.canBuyAnyManager = m !== undefined;

      let u = this.updates.find(upd => upd.canBuy(this.money));
      this.canBuyAnyUpdate = u !== undefined;
    }
  };
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
      resources: this.resources.map(res => res.save()),
      upgrades: this.updates.map(upg => upg.save()),
      stats: this.statistics.save()
    });

    this.$storage.setItem("IdleFrenzy", JSON.stringify(save));
  };
  //
  this.load = function() {
    let data = this.$storage.getItem("IdleFrenzy");
    if (!data) return false;

    let save = JSON.parse(data);

    let opts = save[0];
    let d = save[1];
    let v = opts.version || 0;

    if (v !== Game.Version) {
      return false;
    }

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

    d.upgrades.forEach(upg => {
      let u = this.updates.find(u => u.id === upg.id);
      if (!u) return;
      u.load(upg);
    });

    this.statistics.load(d.stats);

    this.refreshNumbers(true);

    return true;
  };
  //
  this.visibility = function(vis) {
    if (vis === "hidden") {
      this.$mainLoop.stop();
      this.save();
      return;
    }
    if (vis === "visible") {
      this.$mainLoop.start();
      return;
    }
  };
  //
  this.init = function(vm) {
    this.resources.forEach(res => {
      res.$store = vm.$store;
      res.$game = vm.$game;
    });
    this.managers.forEach(man => {
      man.$game = vm.$game;
    });
    this.updates.forEach(upd => {
      upd.$game = vm.$game;
    });

    this.$vue = vm;
    this.$storage = window.localStorage;
    this.$mainLoop = vm.$mainLoop;

    vm.$mainLoop.setUpdate(delta => {
      this.advance(delta);
    });

    vm.$on("unload", () => {
      this.save();
    });

    vm.$on("visibility", vis => {
      this.visibility(vis);
    });

    this.refreshNumbers(true);
  };
  //
  this.reset = function(all) {
    this.money = new myNumber();

    this.resources.forEach(res => res.reset());
    this.managers.forEach(man => man.reset());
    this.updates.forEach(upd => upd.reset());

    this.statistics.reset(all);

    this.addMoney(new myNumber(100));
    this.refreshNumbers(true);
  };
};

Game.prototype.callEvents = function() {
  const events = this.$events;
  this.$events = [];

  events.forEach(ev => {
    const event = ev.event;
    if (this.$handlers[event] && this.$handlers[event].length > 0) {
      this.$handlers[event].forEach(h => {
        h.cb.call(h.self, event, ev.payload, h.tag);
      });
    }
  });
};

Game.prototype.$emit = function(event, payload) {
  if (!this.$handlers[event]) return;
  this.$events.push({ event, payload });
};

Game.prototype.$on = function(event, cb, self, tag) {
  if (!this.$handlers[event]) {
    this.$handlers[event] = [];
  }
  this.$handlers[event].push({ cb, self, tag });
};

Game.prototype.$clear = function(event, cb) {
  if (!this.$handlers[event]) return;
  const idx = this.$handlers[event].findIndex(h => h.cb === cb);
  if (idx !== -1) this.$handlers[event].splice(idx, 1);
};

//some strange actions
import MainLoop from "mainloop.js";
import Achievements from "./achievements";

MainLoop.setSimulationTimestep(1000 / 30);

Game.install = function(Vue) {
  Vue.prototype.$game = new Game();
  Vue.prototype.$mainLoop = MainLoop;

  //не самое лучшее решение, но рабочее )
  Vue.mixin({
    created() {
      //this.$store добавлен, т.к. в дев создается еще один инстанс
      if (!this.$parent && this._isVue && this.$store) {
        this.$game.init(this);

        if (!this.$game.load()) this.$game.reset(true);

        this.$mainLoop.start();
      }
    }
  });
};

export default Game;
