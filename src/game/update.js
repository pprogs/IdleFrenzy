const Update = function(config) {
  Object.assign(this, config);

  this.cost = new myNumber(this.cost);
  this.bought = false;

  this.canBuy = function(money) {
    return !this.bought && money.cmp(this.cost) >= 0;
  };
  this.reset = function() {
    this.bought = false;
  };
  this.buy = function() {
    if (!this.$game.getMoney(this.cost)) return false;
    this.bought = true;
    let res = this.$game.resources.find(r => r.id === this.rid);
    if (res) {
      if (this.speedMult !== 0) {
        res.addSpeedMult(this.speedMult);
      }
      if (this.incomeMult !== 0) {
        res.addIncomeMult(this.incomeMult);
      }
    }
  };
};

import updatesData from "./updates.json";
import myNumber from "./myNumber";

const Updates = [];

for (let r in updatesData) {
  updatesData[r].forEach(upd => {
    let u = new Update(upd);
    u.rid = r;
    Updates.push(u);
  });
}

Updates.sort((a, b) => a.cost.cmp(b.cost));

export { Updates, Update };
