<template>
  
    <div class="item item-position">
      <div class="title">
        Позиция
        <q-btn flat class="circle-warning-15">
          <q-icon name="svguse:icons/allIcons.svg#tooltip" color="grey-4" size="7px"/>
          <q-menu
            :offset="[10, 10]"
            anchor="top middle" self="bottom middle"
            class="circle-warning-tooltip mb-visible"
            ref="menu"
            width="300px"
          >
            Статус позиции не требует согласования второй стороной, вы можете выбрать любой. «Отмена» и «Куплено заказчиком» ставят запрет подрядчикам на подачу новых предложений.
          </q-menu>
          <q-tooltip max-width="300px" anchor="bottom middle" self="top middle" class="my-tooltip-bottom lg-visible">
            Статус позиции не требует согласования второй стороной, вы можете выбрать любой. «Отмена» и «Куплено заказчиком» ставят запрет подрядчикам на подачу новых предложений.
          </q-tooltip>
        </q-btn>
      </div>
      <q-tabs v-model="tab" no-caps class="q-tabs-null">
        <q-tab
          v-for="tab in options"
          :key="tab"
          :name="tab" 
          :label="tab"
        />
      </q-tabs>
    </div>
    <div class="item item-deal">
      <div class="title">
        Сделка
        <q-btn flat class="circle-warning-15">
          <q-icon name="svguse:icons/allIcons.svg#tooltip" color="grey-4" size="7px"/>
          <q-menu
            :offset="[10, 10]"
            anchor="top middle" self="bottom middle"
            class="circle-warning-tooltip mb-visible"
            ref="menu"
            width="300px"
          >
            Заключение сделки это фиксация договоренностей дизайнера и подрядчика по данной позиции сметы. Переход в статус «Оплачено» будет считать сумму агентских как долг подрядчика перед дизайнером.
          </q-menu>
          <q-tooltip max-width="300px" anchor="bottom middle" self="top middle" class="my-tooltip-bottom lg-visible">
            Заключение сделки это фиксация договоренностей дизайнера и подрядчика по данной позиции сметы. Переход в статус «Оплачено» будет считать сумму агентских как долг подрядчика перед дизайнером.
          </q-tooltip>
        </q-btn>
        <q-btn
          flat
          class="text-grey-5 btn-flat btn-remove"
          padding="0"
          no-caps
          label="отменить сделку"
          v-if="tab !== ''"
          @click="tab = ''"
        />
        <img src="~assets/stroipro.jpg" alt="" class="estimate-status__img">
      </div>
      <q-tabs
        v-model="tab2"
        no-caps
        class="q-tabs-null"
      >
        <q-tab
          v-for="el in optionstab"
          :key="el"
          :name="el"
          :label="el"
          :disable="!el"
          :class="[
            {'q-tab--subactive': el === subTab},
            {'q-tab--active': el === tab2}
          ]"
        >
          <q-btn
            rounded
            unelevated
            no-caps
            padding="4px 18px"
            class="bg-positive my-btn my-btn-14 no-cursor q-ml-xs btn-flat"
            @click.stop="selectTab(el)"
          >
            <span class="block text-white">подтвердить</span>
          </q-btn>
        </q-tab>
      </q-tabs>
    </div>
  
</template>

<script setup>
import { ref, watch } from 'vue'
import { estimatesApi } from 'src/api/estimates'

const props =  defineProps({
  options: Array,
  estimate_item_id: String,
  status: String
})

const emit = defineEmits(['updateStatus'])

const tab = ref(props.status)
const tab2 = ref('')
const subTab = ref()
const optionstab = ref(['Согласовано','Оплачено','Готово к выдаче','Выполнено',])
const selectTab = (value) => {
  // subTab.value = ''
  // tab.value = value
}

watch(() => tab.value, async (newValue, oldValue) => {
  try {
    const resp = await estimatesApi.setStatus(props.estimate_item_id, newValue)
    emit('updateStatus', newValue)
  } catch (e) {
    console.log(e)
    tab.value = oldValue
  }
})

</script>