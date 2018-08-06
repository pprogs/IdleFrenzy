const Resource = function(config) {
  Object.assign(this, config);

  this.hasManager = false;
  this.hidden = true;
  this.quantity = 0;

  this.working = false;
  this.workValue = 0;

  this.startWork = startWork;
  this.update = update;
  this.howMuchCanBuy = howMuchCanBuy;
  this.costToBuy = costToBuy;

  let timer = 0;
  let ticks = 0;
  const fr = 1000.0 / 60;

  function howMuchCanBuy(money) {
    return parseInt(Math.floor(money / this.baseCost).toFixed(0));
  }

  function costToBuy(qty) {
    return qty * this.baseCost;
  }

  function startWork() {
    if (this.working || this.quantity === 0) return;

    this.working = true;

    ticks = Math.floor(this.baseTime / fr) + 1;
    timer = setInterval(update, fr, this);
  }

  function finishWork() {
    if (!this.working) return;

    const income = this.quantity * this.baseIncome;
    if (income > 0) {
      this.$store.commit("addMoney", income);
    }

    this.working = false;
    this.workValue = 0;

    if (this.hasManager) this.startWork();
  }

  function update(self) {
    ticks--;

    if (ticks >= 0) {
      self.workValue = (100 * (self.baseTime - ticks * fr)) / self.baseTime;
    } else {
      clearInterval(timer);
      finishWork.call(self);
    }
  }
};

import resourceData from "./resources.json";

let Resources = [];

resourceData.forEach(element => {
  Resources.push(new Resource(element));
});

console.log(Resources);

export { Resources, Resource };
