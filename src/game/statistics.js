import myNumber from "./myNumber";

const Statistics = function(game) {
  this.reset(true);

  game.$on("getMoney", this.getMoney, this);
  game.$on("addMoney", this.addMoney, this);
  game.$on("getResource", this.getResource, this);
  game.$on("getManager", this.getManager, this);
  game.$on("getUpgrade", this.getUpgrade, this);
  game.$on("getAchievement", this.getAchievement, this);
};

Statistics.prototype.getAchievement = function(ev, achievement) {
  this.achievementsGot += 1;
}

Statistics.prototype.getManager = function(ev, manager) {
  this.managersBought += 1;
};

Statistics.prototype.getUpgrade = function(ev, upgrade) {
  this.upgradesBought += 1;
};

Statistics.prototype.getResource = function(ev, data) {
  this.totalResourcesBought = myNumber.add(this.totalResourcesBought, data.qty);
};

Statistics.prototype.addMoney = function(ev, money) {
  this.moneyEarned = myNumber.add(this.moneyEarned, money);
  this.totalMoneyEarned = myNumber.add(this.totalMoneyEarned, money);
};

Statistics.prototype.getMoney = function(ev, money) {
  this.moneySpent = myNumber.add(this.moneySpent, money);
  this.totalMoneySpent = myNumber.add(this.totalMoneySpent, money);
};

Statistics.prototype.reset = function(all) {
  if (all) {
    //between resets
    this.totalMoneyEarned = new myNumber();
    this.totalMoneySpent = new myNumber();
  }

  //this session
  this.moneyEarned = new myNumber();
  this.moneySpent = new myNumber();

  this.totalResourcesBought = new myNumber();

  this.managersBought = 0;
  this.upgradesBought = 0;
  this.achievementsGot = 0;
};

Statistics.prototype.save = function() {
  return this;
};

Statistics.prototype.load = function(data) {
  this.totalMoneyEarned = myNumber.fromObj(data.totalMoneyEarned);
  this.totalMoneySpent = myNumber.fromObj(data.totalMoneySpent);

  this.moneyEarned = myNumber.fromObj(data.moneyEarned);
  this.moneySpent = myNumber.fromObj(data.moneySpent);

  this.totalResourcesBought = myNumber.fromObj(data.totalResourcesBought);

  this.managersBought = data.managersBought;
  this.upgradesBought = data.upgradesBought;
  this.achievementsGot = data.achievementsGot;
};

export default Statistics;
