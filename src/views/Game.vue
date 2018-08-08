<template>
  <div>   
    <ui-tabs type="icon-and-text">
      <ui-tab icon="folder_open" title="Ресурсы">
        <resources-view></resources-view>        
      </ui-tab>

      <ui-tab icon="priority_high" title="Менеджеры">
        <managers-view></managers-view>
      </ui-tab>

      <ui-tab title="Ачивки">
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
  components: {
    ResourcesView,
    ManagersView,
    NumbersTest
  }
};
</script>
