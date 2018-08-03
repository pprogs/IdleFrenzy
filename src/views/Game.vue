<template>
  <div>
    <ui-tabs type="text">
      <ui-tab title="Ресурсы">
        <resources-view></resources-view>
      </ui-tab>

      <ui-tab title="Менеджеры">
        Манагеры
      </ui-tab>

      <ui-tab title="Ачивки">
        Ачивки
      </ui-tab>

      <ui-tab title="Ачивки">
        Статистика
      </ui-tab>
    </ui-tabs>
  </div>
</template>

<script>
import ResourcesView from "@/components/ResourcesView";

export default {
  components: {
    ResourcesView
  }
};
</script>
