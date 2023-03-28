<template>
  <div class="info-2 info-2-">
    <div class="container">
      <div class="item">
        <div class="title">
          Проектов
          <div class="circle-plus bg-positive">
            <q-icon size="12px" name="svguse:icons/allIcons.svg#plus" color="white" />
          </div>
        </div>
        <div class="number">
          6
        </div>
      </div>

      <div class="item">
        <div class="title">
          Получено от заказчиков
          <div class="circle-plus bg-positive">
            <q-icon size="12px" name="svguse:icons/allIcons.svg#plus" color="white" />
          </div>
        </div>
        <div class="number">
          15 500 000 руб.
        </div>
      </div>

      <div class="item">
        <div class="title">
          Получено агентских
          <div class="circle-plus bg-positive">
            <q-icon size="12px" name="svguse:icons/allIcons.svg#plus" color="white" />
          </div>
        </div>
        <div class="number">
          250 000 руб.
        </div>
      </div>

      <div class="item">
        <div class="title" style="display: block;">
          Ожидается агентских
        </div>
        <div class="number">
          50 000 руб.
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'DesignerInfo2',
  setup() {
    const tab = ref()
    return {
      tab
    }
  },
}
</script>