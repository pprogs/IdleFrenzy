let MainLoopPlugin = {};

MainLoopPlugin.install = function(Vue) {
  Vue.prototype.$mainLoop = function() {};
};

export default MainLoopPlugin;
