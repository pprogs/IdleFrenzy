//some strange actidvity
import achievementsData from "./achievements.json";
import myNumber from "./myNumber";
import achievement from "./achievement";
import { removeFromArray } from "./utils";

const Achievements = function(game) {
  this.all = [];
  this.done = [];
  this.notDone = Object.create(null);

  this.$game = game;
  this.$stats = game.statistics;

  // load data
  achievementsData.forEach(data => {
    let a = new achievement(data);
    this.all.push(a);
  });

  this.reset();

  this.checks = {
    manager: checkManagerRule,
    money: checkMoneyRule,
    resource: checkResourceRule,
    upgrade: checkUpgradeRule,
    achievement: checkAchievementRule
  };

  //bind to events
  game.$on("getMoney", this.check, this, "money");
  game.$on("addMoney", this.check, this, "money");
  game.$on("getResource", this.check, this, "resource");
  game.$on("getManager", this.check, this, "manager");
  game.$on("getUpgrade", this.check, this, "upgrade");
  game.$on("getAchievement", this.check, this, "achievement");
};
//
Achievements.prototype.check = function(ev, payload, typ) {
  const achieved = [];
  const achs = this.notDone[typ];
  if (achs === undefined) return;

  achs.forEach(ach => {
    const achieve = ach.rules.reduce((a, r) => {
      return a && this.checks[r.resType].call(this, r);
    }, true);
    if (achieve) achieved.push(ach);
  });

  achieved.forEach(ach => {
    this.moveToDone(ach);
    ach.achieved = true;
    ach.acquireDate = Date.now();
    this.$game.$emit("getAchievement", ach);
  });
};
//
Achievements.prototype.moveToDone = function(achievement) {
  if (!this.done.includes(achievement)) {
    achievement.rules.forEach(r => {
      removeFromArray(this.notDone[r.resType], achievement);
    });
    this.done.push(achievement);
  }
};
//
Achievements.prototype.reset = function() {
  this.notDone = Object.create(null);
  this.done = [];

  this.all.forEach(a => {
    a.reset();
    a.rules.forEach(rule => {
      if (!this.notDone[rule.resType]) this.notDone[rule.resType] = [];
      this.notDone[rule.resType].push(a);
    });
  });
};
//
Achievements.prototype.save = function() {
  const data = this.all.filter(ach => ach.achieved).map(ach => {
    return { id: ach.id, achieved: ach.achieved, date: ach.acquireDate };
  });
  return data;
};
//
Achievements.prototype.load = function(data) {
  data.forEach(d => {
    const ach = this.all.find(a => a.id === d.id);
    if (ach) {
      this.moveToDone(ach);
      ach.achieved = d.achieved;
      ach.acquireDate = d.acquireDate;
    }
  });
};
//
const checkMoneyRule = function(rule) {
  let money;
  switch (rule.checkType) {
    case "erned":
      money = this.$stats.moneyEarned;
      break;
    case "onhand":
      money = this.$game.money;
      break;
    case "spent":
      money = this.$stats.moneySpent;
  }
  return checkNumber(rule.checkOp, money, rule.checkNumber);
};
//
const checkManagerRule = function(rule) {
  console.log(`manager check`);
  const bought = this.$stats.managersBought;
  return checkNumber(rule.checkOp, bought, rule.checkNumber);
};
//
const checkResourceRule = function(rule) {
  const bought = this.$stats.totalResourcesBought;
  return checkNumber(rule.checkOp, bought, rule.checkNumber);
};
//
const checkUpgradeRule = function(rule) {
  const bought = this.$stats.upgradesBought;
  return checkNumber(rule.checkOp, bought, rule.checkNumber);
};
//
const checkAchievementRule = function(rule) {
  const got = this.$stats.achievementsGot;
  return checkNumber(rule.checkOp, got, rule.checkNumber);
};
//
const checkNumber = function(checkOp, left, right) {
  const a = left instanceof myNumber ? left : new myNumber(left);
  const b = right instanceof myNumber ? right : new myNumber(right);

  switch (checkOp) {
    case "ab":
      return myNumber.cmp(a, b) > 0;
    case "eq":
      return myNumber.cmp(a, b) === 0;
    case "abe": //above or equal
      return myNumber.cmp(a, b) >= 0;
  }
};

export default Achievements;
