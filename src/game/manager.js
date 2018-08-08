const Manager = function(config) {
  Object.assign(this, config);
  this.bought = false;

  this.canBuy = function(money) {
    return !this.bought && money >= this.cost;
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

let Managers = [];

ManagersData.forEach(element => {
  Managers.push(new Manager(element));
});

export { Managers, Manager };
