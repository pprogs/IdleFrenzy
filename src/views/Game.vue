<template>
  <div>   
    <ui-tabs type="text">
      <ui-tab :alert-icon="canBuyAnyResource" title="Ресурсы">
        <resources-view></resources-view>        
      </ui-tab>

      <ui-tab :alert-icon="canBuyAnyManager" title="Менеджеры">
        <managers-view></managers-view>
      </ui-tab>

      <ui-tab :alert-icon="achiveAlert" title="Ачивки">
        <numbers-test></numbers-test>
      </ui-tab>

      <ui-tab title="Статистика">
        Статистика
      </ui-tab>
    </ui-tabs>

  </div>
</template>

<script>
import ResourcesView from "@/components/ResourcesView";
import ManagersView from "@/components/ManagersView";
import NumbersTest from "@/components/NumbersTest";

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
    achiveAlert: function() {
      return false;
    }
  },
  components: {
    ResourcesView,
    ManagersView,
    NumbersTest
  }
};
</script>
