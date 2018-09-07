<template>
  <div ref="pandiv">   
    <ui-tabs ref="tabs" type="text">
      <transition name="fade" mode="out-in">
        <ui-tab :alert-icon="canBuyAnyResource" :title="$t('ui_resources')">
          <resources-view></resources-view>
        </ui-tab>
      </transition>

      <transition name="fade" mode="out-in">
        <ui-tab :alert-icon="canBuyAnyManager" :title="$t('ui_managers')">
          <managers-view></managers-view>
        </ui-tab>
      </transition>

      <ui-tab :alert-icon="canBuyAnyUpdate" :title="$t('ui_upgrades')">
        <updates-view></updates-view>
      </ui-tab>

      <ui-tab :alert-icon="achiveAlert" :title="$t('ui_ahcivments')">
        <achievements-view></achievements-view>
        <numbers-test></numbers-test>
      </ui-tab>

      <ui-tab :title="$t('ui_statistics')">
        <statistics-view></statistics-view>
      </ui-tab>

    </ui-tabs>
    
    <ui-snackbar-container
      ref="snackbarContainer"
      position="center"
      transition="slide"
      allowHtml.boolean=true
      queue-snackbars.boolean=true
    ></ui-snackbar-container>
  </div>
</template>

<script>
import ResourcesView from "@/components/resources/ResourcesView";
import ManagersView from "@/components/managers/ManagersView";
import UpdatesView from "@/components/upgrades/UpdatesView";
import AchievementsView from "@/components/achievements/AchievementsView";

import NumbersTest from "@/components/NumbersTest";
import StatisticsView from "@/components/StatisticsView";

import Hammer from "hammerjs";

export default {
  data: function() {
    return {
      game: this.$game
    };
  },

  computed: {
    canBuyAnyResource: function() {
      return this.game.canBuyAnyResource;
    },
    canBuyAnyManager: function() {
      return this.game.canBuyAnyManager;
    },
    canBuyAnyUpdate: function() {
      return this.game.canBuyAnyUpdate;
    },
    achiveAlert: function() {
      return false;
    }
  },

  methods: {
    showAchievementSnackbar(ev, ach) {
      console.log("test");

      this.$refs.snackbarContainer.createSnackbar({
        message: `You've got an achievement!<br>${ach.name}`,
        duration: 3000
      });
    }
  },

  components: {
    ResourcesView,
    ManagersView,
    NumbersTest,
    UpdatesView,
    StatisticsView,
    AchievementsView
  },

  mounted() {
    const h = new Hammer.Manager(this.$refs.pandiv, {
      recognizers: [[Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]]
    });

    h.on("swipe", ev => {
      if (ev.direction === Hammer.DIRECTION_LEFT) {
        this.$refs.tabs.selectNextTab();
      }
      if (ev.direction === Hammer.DIRECTION_RIGHT) {
        this.$refs.tabs.selectPreviousTab();
      }
    });

    this.game.$on("getAchievement", this.showAchievementSnackbar, this);
  },

  beforeDestroy() {
    this.game.$clear("getAchievement", this.showAchievementSnackbar);
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
