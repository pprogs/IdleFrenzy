import myNumber from "@/game/myNumber";

const Resource = function(config) {
  Object.assign(this, config);

  //
  this.hasManager = false;
  this.hidden = true;
  this.working = false;
  this.workValue = 0;

  //
  this.quantity = new myNumber();
  this.cost = new myNumber(this.baseCost); //текущая стоимость
  this.income = new myNumber(); //текущий доход в секунду ips

  //functions
  this.startWork = startWork;
  this.howMuchCanBuy = howMuchCanBuy;
  this.costToBuy = costToBuy;
  this.buy = buy;

  this.advance = advance;
  this.finishWork = finishWork;
  this.save = save;
  this.load = load;

  //private
  let ticks = 0;
  let fr = 1000.0 / 30;

  function howMuchCanBuy(money) {
    let cost = this.cost;
    let total = new myNumber();
    let qty = new myNumber();

    for (;;) {
      total.add(cost);
      if (total.cmp(money) >= 0) return qty;
      qty.add(1);
      cost.mul(this.baseCostMult);
    }
  }

  function costToBuy(qty) {
    return myNumber.mul(qty, this.baseCost);
  }

  function buy(qty) {
    let cost = this.costToBuy(qty);
    if (!this.$game.getMoney(cost)) return false;
    this.quantity.add(qty);
    return true;
  }

  function startWork() {
    if (this.working || this.quantity.eqz()) return;

    this.working = true;

    ticks = Math.floor((this.baseTime * 1000) / fr) + 1;
  }

  function finishWork() {
    if (!this.working) return;

    const income = myNumber.mul(this.quantity, this.baseIncome);
    if (income.az()) {
      this.$game.addMoney(income);
    }

    this.working = false;
    this.workValue = 0;

    if (this.hasManager) this.startWork();
  }

  function advance(delta) {
    if (!this.working) return;
    ticks--;

    if (ticks >= 0) {
      this.workValue =
        (100 * (this.baseTime * 1000 - ticks * fr)) / (this.baseTime * 1000);
    } else {
      this.finishWork();
    }
  }

  function save() {
    return {
      id: this.id,
      hasManager: this.hasManager,
      hidden: this.hidden,
      quantity: this.quantity,
      working: this.working,
      workValue: this.workValue,

      ticks,
      fr
    };
  }

  function load(data) {
    Object.assign(this, data);
    this.quantity = myNumber.fromObj(this.quantity);

    ticks = data.ticks;
    fr = data.fr;
  }
};

import resourceData from "./resources.json";

let Resources = [];

resourceData.forEach(element => {
  Resources.push(new Resource(element));
});

console.log(Resources);

export { Resources, Resource };
