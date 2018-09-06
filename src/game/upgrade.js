//
const Update = function(config) {
  Object.assign(this, config);

  this.cost = new myNumber(this.cost);
  this.bought = false;
};

//check if we can buy this upgrade for given money
Update.prototype.canBuy = function(money) {
  return !this.bought && money.cmp(this.cost) >= 0;
};

//reset state
Update.prototype.reset = function() {
  this.bought = false;
};

//buy this upgrade and apply bonuses to resource
Update.prototype.buy = function() {
  if (!this.$game.getMoney(this.cost)) return false;
  this.bought = true;
  this.$game.$emit("getUpgrade", this);
  this.applyMultipliers();
};

//apply multipliers to binded resource
Update.prototype.applyMultipliers = function() {
  let res = this.$game.resources.find(r => r.id === this.rid);
  if (res) {
    res.addMultipliers(this.incomeMult, this.speedMult);
  }
};

//return object that is saved to json
Update.prototype.save = function() {
  return {
    id: this.id,
    bought: this.bought
  };
};

//load from json object and reapply multipliers if bought
Update.prototype.load = function(data) {
  this.bought = data.bought;
  if (this.bought) {
    this.applyMultipliers();
  }
};

//some strange activity
import upgradesData from "./upgrades.json";
import myNumber from "./myNumber";

const Updates = [];

for (let r in upgradesData) {
  upgradesData[r].forEach(upd => {
    let u = new Update(upd);
    u.rid = r;
    Updates.push(u);
  });
}

Updates.sort((a, b) => a.cost.cmp(b.cost));

export { Updates, Update };
