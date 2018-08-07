<template>
  <div>
    <ui-tabs type="text">
      <ui-tab title="Ресурсы">
        <!--<resources-view></resources-view>-->
        <numbers-test></numbers-test>
      </ui-tab>

      <ui-tab title="Менеджеры">
        <managers-view></managers-view>
      </ui-tab>

      <ui-tab title="Ачивки">
        Ачивки
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
