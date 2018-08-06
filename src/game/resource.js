const Resource = function(config) {
  this.Id = config.id;
  this.Name = config.name;
  this.Icon = config.icon;
  this.Hidden = true;

  this.Quantity = 0;
  this.BaseIncome = config.income;
  this.BaseWorkTime = config.workTime;
  this.Cost = config.cost;

  this.Working = false;
  this.WorkProgress = 0;
  this.WorkValue = 0;

  this.StartWork = startWork;
  this.Update = update;

  let timer = 0;
  let callb = undefined;
  let ticks = 0;
  const fr = 1000.0 / 60;

  function startWork(cb) {
    if (this.Working || this.Quantity === 0) return;

    this.Working = true;

    callb = cb;
    ticks = Math.floor(this.BaseWorkTime / fr) + 1;
    timer = setInterval(update, fr, this);
  }

  function update(self) {
    ticks--;

    if (ticks >= 0) {
      self.WorkValue =
        (100 * (self.BaseWorkTime - ticks * fr)) / self.BaseWorkTime;
    } else {
      clearInterval(timer);
      self.Working = false;
      self.WorkValue = 0;
      if (callb) callb();
    }
  }
};

const Palatka = new Resource({
  name: "r_palatka",
  icon: "palatka.jpg",
  income: 5,
  cost: 100,
  workTime: 1000
});

const Magazin = new Resource({
  name: "r_magazin",
  icon: "magaz.jpg",
  income: 25,
  cost: 2000,
  workTime: 5000
});

const Zapravka = new Resource({
  name: "r_gaz",
  icon: "zap.jpg",
  income: 50,
  cost: 5000,
  workTime: 10000
});

export default { Palatka, Magazin, Zapravka };
