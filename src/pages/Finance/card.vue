<template>
  <q-card class="finance-card" flat bordered>
    <q-card-section class="finance-card-section" horizontal>
      <q-card-section>
        <div class="text-h5">Получен гонорар</div>
        <q-tabs
          v-model="tab"
          class="text-dark finance-tabs my-tabs"
          no-caps
        >
          <q-tab name="1" label="Всего" />
          <q-tab name="2" label="За год" />
          <q-tab name="3" label="За месяц" />
        </q-tabs>
        <div class="row flex items-center">
          <div class="finance-card__number">4 500 000 руб.</div>
          <div class="finance-card__procent">40%</div>
        </div>
      </q-card-section>

      <q-card-section class="flex toolbar">
        <div class="toolbar-procent" :style="{height: 40 + '%', width: 50 + '%'}"></div>
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions class="row justify-between">
      <div class="text-subtitle1">
        Ожидается еще: <span>3 450 000</span> руб. 
        <div 
          class="circle-warning-26 circle-warning-26-icon-white mb-19-grey mb-visible"
        >
          <q-icon name="svguse:icons/financeTable.svg#warning" size="26px" />
          <q-menu
            :offset="[10, 10]"
            anchor="top middle" self="bottom middle"
            class="circle-warning-tooltip"
            ref="menu"
            width="300px"
          >
            Тултип шириной 300 px, где мы расскажем о том, что в работе три проекта и по ним ожидается еще суммарно 3 450 000 руб.
          </q-menu>
          <q-tooltip max-width="300px" anchor="top middle" self="bottom middle" class="lg-visible">
            Тултип шириной 300 px, где мы расскажем о том, что в работе три проекта и по ним ожидается еще суммарно 3 450 000 руб.
          </q-tooltip>
        </div>
      </div>
      <div 
        class="circle-warning-26 circle-warning-26-icon-white mb-19-grey lg-sibile"
      >
        <q-icon name="svguse:icons/financeTable.svg#warning" size="26px" />
        <q-menu
          :offset="[10, 10]"
          anchor="top middle" self="bottom middle"
          class="circle-warning-tooltip"
          ref="menu"
          width="300px"
        >
          Тултип шириной 300 px, где мы расскажем о том, что в работе три проекта и по ним ожидается еще суммарно 3 450 000 руб.
        </q-menu>
        <q-tooltip max-width="300px" anchor="top middle" self="bottom middle" class="lg-visible">
          Тултип шириной 300 px, где мы расскажем о том, что в работе три проекта и по ним ожидается еще суммарно 3 450 000 руб.
        </q-tooltip>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'FinanceCard',
  // props: {
  //   title: {
  //     type: String,
  //     required: true
  //   }
  // },
  setup () {
    const tooltip = ref()
    return {
      tab: ref('1'),
      splitterModel: ref(20)
    }
  }
})
</script>
