//
//TODO:
//переделать работу с отрицательными значениями
//
let myNumber = function(n, k) {
  this.number = Number(n || 0);
  this.k = Number(k || 0);
};

myNumber.precision = 999999;
myNumber.dropAfter = 4;
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
myNumber.fromObj = function(obj) {
  return new myNumber(obj.number || obj.n, obj.k);
};

myNumber.prototype.add = addFunction(addNumbers);
myNumber.prototype.dec = addFunction(decNumbers);
myNumber.prototype.div = addFunction(divNumbers);
myNumber.prototype.mul = addFunction(mulNumbers);

myNumber.prototype.cmp = function(b) {
  if (typeof b === "object") return compareNumbers(this, b);
  if (typeof b === "number") return compareNumbers(this, new myNumber(b, 0));
  throw new Error("Expected Number or Object. Got " + typeof b);
};
myNumber.prototype.toString = function() {
  return this.format();
};
myNumber.prototype.num = function() {
  return this.k === 0 ? this.number : Math.pow(1000, this.k) * this.number;
};
myNumber.prototype.format = function() {
  let n = this.number;
  let k = this.k;

  while (n >= 1000) {
    n /= 1000;
    k += 1;
  }

  let prefix = myNumber.prefixes[k];
  n = +n.toFixed(1);

  let ret = `${n} ${prefix}`;

  if (ret === "NaNK") console.error("format error");
  return ret;
};
myNumber.prototype.clone = function() {
  return new myNumber(this.number, this.k);
};
//compare numbers
//above zero
myNumber.prototype.az = function() {
  return this.number > 0 || this.k > 0;
};
//below zero
myNumber.prototype.bz = function() {
  return this.number < 0 && this.k === 0;
};
//equal zero
myNumber.prototype.eqz = function() {
  return this.number === 0 && this.k === 0;
};
//less zero
myNumber.prototype.lez = function() {
  return this.number <= 0 && this.k === 0;
};

myNumber.add = addFunctionS(addNumbers);
myNumber.dec = addFunctionS(decNumbers);
myNumber.div = addFunctionS(divNumbers);
myNumber.mul = addFunctionS(mulNumbers);
myNumber.cmp = function(a, b) {
  let aa = a instanceof myNumber ? a : new myNumber(a);
  let bb = b instanceof myNumber ? b : new myNumber(b);
  return compareNumbers(aa, bb);
};

function addFunctionS(func) {
  return function(a, b) {
    if (typeof a === "number") a = new myNumber(a);
    if (typeof b === "number") b = new myNumber(b);
    return myNumber.fromObj(func(a, b));
  };
}
function addFunction(func) {
  return function(b) {
    let res;
    if (b instanceof myNumber) res = func(this, b);
    else if (typeof b === "number") res = func(this, new myNumber(b, 0));
    else throw new Error("Expected Number or object. Got " + typeof b);

    this.number = res.n | 0;
    this.k = res.k | 0;

    return this;
  };
}
function divNumbers(a, b) {
  let n = a.number / b.number;
  let k = a.k - b.k;

  while (k < 0) {
    n /= 1000;
    k += 1;
  }

  while (n < 1 && k > 0) {
    n *= 1000;
    k -= 1;
  }

  return reduce(n, k);
}
function mulNumbers(a, b) {
  let n = a.number * b.number;
  let k = a.k + b.k;

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
  if (a.number > b.number && a.k >= b.k) return 1;
  if (a.number < b.number && a.k <= b.k) return -1;
  let mink = Math.min(a.k, b.k);
  let samek = a.k === b.k;
  let numa = samek ? a.number : Math.pow(1000, a.k - mink) * a.number;
  let numb = samek ? b.number : Math.pow(1000, b.k - mink) * b.number;
  if (numa === numb) return 0;
  return numa > numb ? 1 : -1;
}
function reduce(n, k) {
  while (n > myNumber.precision) {
    n /= 1000;
    k += 1;
  }

  n = +n.toFixed(1);
  return { n, k };
}

export default myNumber;
