<template>
  <q-card class="my-card" flat bordered>
    <q-card-section class="my-card-section" horizontal>
      <q-card-section>
        <div class="text-h5">Получен гонорар</div>
        <q-tabs
          v-model="tab"
          class="text-dark-2 my-tabs"
        >
          <q-tab name="1" label="Всего" />
          <q-tab name="2" label="За год" />
          <q-tab name="3" label="За месяц" />
        </q-tabs>
      </q-card-section>

      <q-card-section class="col-12 col-lg-1 flex flex-center">
        <q-img
          class="rounded-borders"
          src="https://cdn.quasar.dev/img/parallax2.jpg"
        />
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions class="row justify-between">
      <div class="text-subtitle1">Ожидается еще: 3 450 000 руб.</div>
      <div class="circle-warning">
        <q-icon name="svguse:icons/allIcons.svg#tooltip" color="grey-4" size="12px"/>
        <q-tooltip max-width="300px" anchor="top middle" self="bottom middle">
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
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    return {
      tab: ref('1'),
      splitterModel: ref(20)
    }
  }
})
</script>
