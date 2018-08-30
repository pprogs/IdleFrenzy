const Achievement = function(config) {
  Object.assign(this, config);
  //"id": 1,
  //"resType": "manager",
  //"checkType": "quantity",
  //"checkOp": "ab",
  //"checkNumber": 0,
  //"Name": "First manager"
};

const checkNumber = function(checkOp, resNumber, checkNumber) {
  switch (checkOp) {
    case "ab":
      break;
    case "eq":
      break;
  }
};

//
Achievement.prototype.checkManager = function(game) {
  const bought = game.managers.reduce((q, m) => {
    if (m.bought) {
      q += 1;
    }
  });
  return checkNumber(this.checkOp, bought, this.checkNumber);
};

//
Achievement.prototype.checkMoney = function(game) {

};

//
Achievement.prototype.check = function(game) {
  switch (this.resType) {
    case "manager":
      return this.checkManager(game);
    case "money":
      return this.checkMoney(game);
  }
};

export default Achievement;
