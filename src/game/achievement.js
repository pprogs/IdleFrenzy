const Achievement = function(config) {
  Object.assign(this, config);

  this.reset();
};

Achievement.prototype.reset = function() {
  this.achieved = false;
  this.acquireDate = undefined;
};

export default Achievement;
