<template>
  <div ref="pandiv">   
    <ui-tabs ref="tabs" type="text">
      <ui-tab :alert-icon="canBuyAnyResource" :title="$t('ui_resources')">
        <resources-view></resources-view>        
      </ui-tab>

      <ui-tab :alert-icon="canBuyAnyManager" :title="$t('ui_managers')">
        <managers-view></managers-view>
      </ui-tab>

      <ui-tab :alert-icon="canBuyAnyUpdate" :title="$t('ui_upgrades')">
        <updates-view></updates-view>
      </ui-tab>

      <ui-tab :alert-icon="achiveAlert" :title="$t('ui_ahcivments')">
        <numbers-test></numbers-test>
      </ui-tab>

      <ui-tab :title="$t('ui_statistics')">
        Статистика
      </ui-tab>
    </ui-tabs>

  </div>
</template>

<script>
import ResourcesView from "@/components/ResourcesView";
import ManagersView from "@/components/ManagersView";
import UpdatesView from "@/components/UpdatesView";
import NumbersTest from "@/components/NumbersTest";

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
  components: {
    ResourcesView,
    ManagersView,
    NumbersTest,
    UpdatesView
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
  }
};
</script>
