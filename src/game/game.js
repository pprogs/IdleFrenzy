import { Resources } from "./resource.js";

const game = () => {
  this.resources = Resources;
  this.managers = [];

  this.achivments = [];
  this.upgrades = [];

  this.money = 0;
  this.reincarnations = 0;

  this.statistics = undefined;

  this.advance = function(delta) {};
  this.init = function() {};
};

export default game;
