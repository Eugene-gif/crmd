<template>
  <div class="info-2">
    <div class="container">
      <div class="item">
        <div class="title">
          Сделок
        </div>
        <div class="number">
          24
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
          Агентских к выплате
          <div class="circle-plus bg-positive">
            <q-icon size="12px" name="svguse:icons/allIcons.svg#plus" color="white" />
          </div>
        </div>
        <div class="number">
          250 000 руб.
        </div>
      </div>
      <div class="item">
        <div class="title">
          Рейтинг
        </div>
        <q-tabs
          v-model="tab"
          class="q-tabs-reviews q-tabs-null"
        >
          <q-tab name="0" icon="svguse:icons/allIcons.svg#like" label="25" />
          <q-tab name="0" icon="svguse:icons/allIcons.svg#dislike" label="2" />
        </q-tabs>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ProfileInfo2',
  setup() {
    const tab = ref()
    return {
      tab
    }
  },
}
</script>