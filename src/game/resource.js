const Resource = function(config) {
  this.Id = config.id;
  this.Name = config.name;
  this.Icon = config.icon;
  this.Hidden = true;

  this.Quantity = 0;
  this.BaseIncome = config.income;
  this.BaseWorkTime = config.workTime;
  this.Cost = config.cost;
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

export default { Palatka, Magazin };
