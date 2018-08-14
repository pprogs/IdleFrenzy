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
};

import ManagersData from "./managers.json";
import myNumber from "./myNumber";

let Managers = [];

ManagersData.forEach(element => {
  Managers.push(new Manager(element));
});

export { Managers, Manager };
