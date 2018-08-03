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

  this.StartWork = startWork;
  this.WorkValue = 0;

  let timer = 0;

  function startWork() {
    if (timer != 0) {
      return;
    }
  }
};

const Palatka = new Resource({
  name: "Палатка",
  icon: "palatka.jpg",
  income: 5,
  cost: 100,
  workTime: 1000
});

const Magazin = new Resource({
  name: "Магазин",
  icon: "magaz.jpg",
  income: 25,
  cost: 2000,
  workTime: 5000
});

const Zapravka = new Resource({
  name: "Заправка",
  icon: "zap.jpg",
  income: 50,
  cost: 5000,
  workTime: 10000
});

export default { Palatka, Magazin, Zapravka };
