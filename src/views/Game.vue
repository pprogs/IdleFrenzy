<template>
  <div>   
    <ui-tabs type="text">
      <ui-tab :alert-icon="resAlert" title="Ресурсы">
        <resources-view></resources-view>   
        <div slot="icon">blabla</div>     
      </ui-tab>

      <ui-tab :alert-icon="manAlert" title="Менеджеры">
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
  computed: {
    resAlert: function() {
      return false;
    },
    manAlert: function() {
      return true;
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
