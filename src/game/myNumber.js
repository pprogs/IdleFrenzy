let myNumber = function(n, k) {
  this.number = Number(n || 0);
  this.k = Number(k || 0);
};

myNumber.precision = 999999;
myNumber.dropAfter = 3;
myNumber.prefixes = [
  "",
  "K",
  "M",
  "B",
  "T",
  "Quad",
  "Quint",
  "Sext",
  "Sept",
  "Oct",
  "Non",
  "Dec",
  "Undec",
  "Duo",
  "Tred",
  "Quat",
  "Quind",
  "Sexd",
  "Sepd",
  "Octd",
  "Nov",
  "Vig",
  "Unvig",
  "Duovig",
  "Trev",
  "Quatv",
  "Quinv",
  "Sexv",
  "Sepv",
  "Octv",
  "Novv",
  "Trig",
  "Untrig",
  "Duotrig"
];

myNumber.prototype.add = addFunction(addNumbers);
myNumber.prototype.dec = addFunction(decNumbers);
myNumber.prototype.div = addFunction(divNumbers);
myNumber.prototype.mul = addFunction(mulNumbers);
myNumber.prototype.cmp = addFunction(compareNumbers);

myNumber.prototype.num = function() {
  return this.k === 0 ? this.number : Math.pow(1000, this.k) * this.number;
};

function addFunction(func) {
  return function(b) {
    if (typeof b === "object") return func(this, b);
    if (typeof b === Number) return func(this, new myNumber(b, 0));
    throw new Error("Expected Number or object");
  };
}

function divNumbers(a, b) {
  let mink = Math.min(a.k, b.k);
  let samek = a.k === b.k;

  let numa = samek ? a.number : Math.pow(1000, a.k - mink) * a.number;
  let numb = samek ? b.number : Math.pow(1000, b.k - mink) * b.number;

  let n = Math.floor(numa / numb);
  let k = 0;

  return reduce(n, k);
}

function mulNumbers(a, b) {
  let mink = Math.min(a.k, b.k);
  let samek = a.k === b.k;

  let numa = samek ? a.number : Math.pow(1000, a.k - mink) * a.number;
  let numb = samek ? b.number : Math.pow(1000, b.k - mink) * b.number;

  let n = numa * numb;
  let k = mink + mink;

  n = a.number * b.number;
  k = a.k + b.k;

  return reduce(n, k);
}

function decNumbers(a, b) {
  let mink = Math.min(a.k, b.k);
  let samek = a.k === b.k;

  if (a.k - mink > myNumber.dropAfter) return a;
  if (b.k - mink > myNumber.dropAfter) return new myNumber();

  let numa = samek ? a.number : Math.pow(1000, a.k - mink) * a.number;
  let numb = samek ? b.number : Math.pow(1000, b.k - mink) * b.number;

  let n = numa - numb;
  let k = mink;

  return reduce(n, k);
}

function addNumbers(a, b) {
  let mink = Math.min(a.k, b.k);
  let samek = a.k === b.k;

  if (a.k - mink > myNumber.dropAfter) return a;
  if (b.k - mink > myNumber.dropAfter) return b;

  let numa = samek ? a.number : Math.pow(1000, a.k - mink) * a.number;
  let numb = samek ? b.number : Math.pow(1000, b.k - mink) * b.number;

  let n = numa + numb;
  let k = mink;

  return reduce(n, k);
}

function compareNumbers(a, b) {
  let mink = Math.min(a.k, b.k);
  let samek = a.k === b.k;
  let numa = samek ? a.number : Math.pow(1000, a.k - mink) * a.number;
  let numb = samek ? b.number : Math.pow(1000, b.k - mink) * b.number;
  if (numa === numb) return 0;
  return numa > numb ? 1 : -1;
}

myNumber.prototype.format = function() {
  let n = this.number;
  let k = this.k;

  while (n >= 1000) {
    n /= 1000;
    k += 1;
  }

  let prefix = myNumber.prefixes[k];
  n = +n.toFixed(1);

  return `${n} ${prefix}`;
};

function reduce(n, k) {
  while (n > myNumber.precision) {
    n /= 1000;
    k++;
  }
  return new myNumber(+n.toFixed(1), k);
}

export default myNumber;
