const Manager = function(config) {
  Object.assign(this, config);
  this.bought = false;

  this.canBuy = function(money) {
    return !this.bought && money >= this.cost;
  };
};

import ManagersData from "./managers.json";

let Managers = [];

ManagersData.forEach(element => {
  Managers.push(new Manager(element));
});

console.log(Managers);

export { Managers, Manager };
