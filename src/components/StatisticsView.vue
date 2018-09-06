<template>
  <div>
    <div>Total Earned: {{stat.totalMoneyEarned.toString()}}</div>
    <div>Total Spent: {{stat.totalMoneySpent.toString()}}</div>
    <div></div>
    <div>Earned: {{stat.moneyEarned.toString()}}</div>
    <div>Spent: {{stat.moneySpent.toString()}}</div>
    <div></div>
    <div>Resources: {{stat.totalResourcesBought.toString()}}</div>
    <div>Managers: {{stat.managersBought}}</div>
    <div>Upgrades: {{stat.upgradesBought}}</div>
    <div>Achievements: {{stat.achievementsGot}}</div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      stat: this.$game.statistics
    };
  }
};
</script>

<style>
</style>
