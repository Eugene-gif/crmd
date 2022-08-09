<template>
  <q-select
    filled
    v-model="select1"
    :options="type"
    stack-label
    placeholder="Выбрать"
    dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
    class="my-select"
    behavior="menu"
    ref="selectDropbox"
    @popup-hide="focusSelect"
    @update:model-value="onGetData"
    popup-content-class="my-select-menu"
    :label="select1 ? undefined : 'Выбрать'"
  />
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent ({
  setup(props, { emit }) {
    const select1 = ref({
      label: 'Квартира',
      value: 1
    })
    const type = ref([
      {
        label: 'Квартира',
        value: 1
      },
      {
        label: "Дом",
        value: 2
      },
      {
        label: "Офис",
        value: 3
      },
      {
        label: "Коммерция",
        value: 4
      },
      {
        label: "Прочее",
        value: 5
      }
    ])

    function onGetData() {
      emit('getData', select1.value)
    }

    return {
      select1,
      type,
      onGetData,

      focusSelect() {
        function func() {
          selectDropbox.value.blur()
        }
        setTimeout(func, 100);
      }
    }
  },
})
</script>