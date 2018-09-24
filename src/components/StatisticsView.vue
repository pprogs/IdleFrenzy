<template>
  <div>
    <div>{{$t("stat_total_earned")}}: {{stat.totalMoneyEarned.toString()}}</div>
    <div>{{$t("stat_total_spent")}}: {{stat.totalMoneySpent.toString()}}</div>
    <div></div>
    <div>{{$t("stat_earned")}}: {{stat.moneyEarned.toString()}}</div>
    <div>{{$t("stat_spent")}}: {{stat.moneySpent.toString()}}</div>
    <div></div>
    <div>{{$t("stat_res")}}: {{stat.totalResourcesBought.toString()}}</div>
    <div>{{$t("stat_man")}}: {{stat.managersBought}}</div>
    <div>{{$t("stat_upgrades")}}: {{stat.upgradesBought}}</div>
    <div>{{$t("stat_achievements")}}: {{stat.achievementsGot}}</div>
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
