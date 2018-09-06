const Manager = function(config) {
  Object.assign(this, config);

  this.cost = new myNumber(this.cost);
  this.bought = false;

  this.canBuy = function(money) {
    return !this.bought && money.cmp(this.cost) >= 0;
  };

  this.save = function() {
    return {
      id: this.id,
      bought: this.bought
    };
  };

  this.load = function(data) {
    Object.assign(this, data);
  };

  this.reset = function() {
    this.bought = false;
  };

  this.buy = function() {
    if (!this.$game.getMoney(this.cost)) return false;
    this.bought = true;
    this.$game.$emit("getManager", this);
    let res = this.$game.resources.find(r => r.id === this.rid);
    if (res) {
      res.hasManager = true;
      res.startWork();
    }
  };
};

import ManagersData from "./managers.json";
import myNumber from "./myNumber";

let Managers = [];

ManagersData.forEach(element => {
  Managers.push(new Manager(element));
});

export { Managers, Manager };
