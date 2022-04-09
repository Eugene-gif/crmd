<template>
  <q-page class="page-finance">
    <div class="row justify-between items-center">
      <div class="text-h2">Финансы</div>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="12px 27px"
        class="bg-grey-3 text-grey-5 my-btn"
        label="Выбрать"
      />
    </div>
    <div class="row items-center header-btns">
      <q-btn
        rounded
        unelevated
        no-caps
        padding="12px 27.5px"
        class="bg-positive text-white my-btn"
        label="Добавить операцию"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        padding="12px 27px"
        class="bg-positive text-white q-ml-xs my-btn"
        label="Выставить счёт"
      />
    </div>
    <div class="row justify-between cards">
      <Card />
      <Card />
    </div>
    <div class="operations">
      <div class="row justify-between items-center">
        <q-tabs
          v-model="tab"
          class="text-dark my-tabs operations-tabs"
          no-caps
        >
          <q-tab name="1" label="История операций" />
          <q-tab name="2" label="Отклоненные" />
        </q-tabs>
        <q-btn
          rounded
          unelevated
          outline
          no-caps
          padding="12px 27px"
          class="bg-white text-grey-5 my-btn btn-effect"
          label="Выбрать"
          icon="svguse:icons/allIcons.svg#filter-icon"
        />
      </div>
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
  setup () {
    return {
      tab: ref('1'),
    }
  }
})
</script>
