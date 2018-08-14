import myNumber from "@/game/myNumber";

const Resource = function(config) {
  Object.assign(this, config);

  //
  this.reset = reset;
  this.reset();

  //functions
  this.startWork = startWork;
  this.costToBuy = costToBuy;
  this.buy = buy;
  this.canBuyFor = canBuyFor;

  this.advance = advance;
  this.finishWork = finishWork;
  this.save = save;
  this.load = load;

  //private
  let ticks = 0;
  let fr = 1000.0 / 30;

  function reset() {
    this.hasManager = false;
    this.hidden = true;
    this.working = false;
    this.workValue = 0;

    this.quantity = new myNumber(); //купленное кол-во
    this.cost = new myNumber(this.baseCost); //текущая стоимость
    this.income = new myNumber(); //текущий доход в секунду ips
    this.howMuchCanBuy = new myNumber(); //сколько доступно к покупке
  }
  
  function canBuyFor(money) {
    if (money.lez()) return new myNumber();
    let qty = new myNumber();
    let cost = this.cost.clone();
    let total = new myNumber();

    for (;;) {
      total.add(cost);
      if (total.cmp(money) > 0) return qty;
      qty.add(1);
      cost.mul(this.baseCostMult);
    }
  }

  function costToBuy(qtyToBuy) {
    if (qtyToBuy.lez()) return new myNumber();
    let qty = qtyToBuy.clone();
    let cost = this.cost.clone();
    let total = new myNumber();

    for (;;) {
      total.add(cost);
      qty.dec(1);
      if (qty.lez()) return total;
      cost.mul(this.baseCostMult);
    }
  }

  function buy(qtyToBuy) {
    if (qtyToBuy.lez()) return new myNumber();
    let qty = qtyToBuy.clone();
    let cost = this.cost.clone();
    let total = new myNumber();

    for (;;) {
      total.add(cost);
      qty.dec(1);
      cost.mul(this.baseCostMult);
      if (qty.lez()) break;
    }

    if (!this.$game.getMoney(total)) return false;

    this.cost = cost;
    this.quantity = myNumber.add(this.quantity, qtyToBuy);

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
      cost: this.cost,
      working: this.working,
      workValue: this.workValue,

      ticks,
      fr
    };
  }

  function load(data) {
    Object.assign(this, data);

    this.quantity = myNumber.fromObj(this.quantity);
    this.cost = myNumber.fromObj(this.cost);

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
