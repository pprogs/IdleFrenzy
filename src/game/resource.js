const Resource = function(config) {
  Object.assign(this, config);

  this.hasManager = false;
  this.hidden = true;
  this.quantity = 0;
  this.working = false;
  this.workValue = 0;

  //functions
  this.startWork = startWork;
  this.howMuchCanBuy = howMuchCanBuy;
  this.costToBuy = costToBuy;
  this.advance = advance;
  this.finishWork = finishWork;
  this.save = save;
  this.load = load;

  //private
  let ticks = 0;
  let fr = 1000.0 / 30;

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

  function advance(delta) {
    if (!this.working) return;
    ticks--;

    if (ticks >= 0) {
      this.workValue = (100 * (this.baseTime - ticks * fr)) / this.baseTime;
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
