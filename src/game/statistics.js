import myNumber from "./myNumber";

const Statistics = function() {
  //between resets
  this.totalMoneyEarned = new myNumber();
  this.totalMoneySpent = new myNumber();

  //this session
  this.moneyEarned = new myNumber();
  this.moneySpent = new myNumber();

  this.managersBought = 0;
  this.upgradesBought = 0;
};

Statistics.prototype.reset = function() {};

Statistics.prototype.save = function() {
  return {};
};

Statistics.prototype.load = function(data) {};

export default Statistics;
