<template>
  <q-page class="page-finance">
    <div class="row justify-between items-center">
      <div class="text-h2">Финансы</div>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="12px 27px"
        class="bg-grey-3 text-gre-2"
        label="Выбрать"
      />
    </div>
    <div class="row items-center header-btns">
      <q-btn
        rounded
        unelevated
        no-caps
        padding="12px 27.5px"
        class="bg-positive text-white"
        label="Добавить операцию"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        padding="12px 27px"
        class="bg-positive text-white q-ml-xs"
        label="Выставить счёт"
      />
    </div>
    <div class="row justify-between cards">
      <Card />
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue';
import Card from 'pages/Finance/card.vue'

export default defineComponent({
  name: 'PageFinance',

  components: {
    Card
  },
})
</script>
