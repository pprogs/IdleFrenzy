let VueFormatNumberPlugin = {};

VueFormatNumberPlugin.install = function(Vue) {
  Vue.prototype.$formatInt = function(number) {
    return parseInt(number.toFixed(0));
  };

  Vue.prototype.$format = function(number) {
    if (number < 1000) {
      return "" + number;
    }

    let i = -1;
    do {
      i++;
      number = number / 1000;
    } while (number > 1000);

    const suf = ["K", "M", "T"];

    if (number > 100) {
      number |= 0;
    } else {
      //number = Math.round((number + 0.00001) * 100) / 100
      number = Number(number.toFixed(2));
    }
    return number + suf[i];
  };
};

export default VueFormatNumberPlugin;
