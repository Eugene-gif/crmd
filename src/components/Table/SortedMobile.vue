<template>
  <div class="sorted">
    <div class="sorted-section mb-visible">
      <div class="title">Сортировка: </div>
      <q-select
        borderless
        v-model="model"
        :options="options"
        behavior="menu"
        popup-content-class="select-menu-mobile"
        @update:model-value="onUpdateRows(null)"
      />
    </div>

    <div class="sorted-btns mb-visible" style="margin-right: 0;">
      <q-icon
        size="7px"
        name="svguse:icons/allIcons.svg#tableArrowDown"
        @click="onUpdateRows(true)"
        :class="{active: askDesc}"
      />
      <q-icon
        size="7px"
        name="svguse:icons/allIcons.svg#tableArrowUp"
        @click="onUpdateRows(false)"
        :class="{active: !askDesc}"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  props: {
    columns: Array,
    pagination: Object
  },
  setup(props, {emit}) {
    const options = ref([])
    const model = ref({label: 'Выбрать', value: ''})
    const askDesc = ref()

    function start() {
      let arr = []
      props.columns.filter((item) => {
        if (item.sortable) {
          if(item.label === '') {
            item.label = 'Статус'
          }
          arr.push(item)
        }        
      })
      options.value = arr

      askDesc.value = props.pagination.descending
      console.log(askDesc.value)
    }

    function onUpdateRows(bool) {
      if (bool != null) {
        askDesc.value = bool
      }
      emit('updateRows', model.value.field, askDesc.value)
    }

    onMounted(() => {
      start()
    })
    return {
      options,
      model,
      start,
      onUpdateRows,
      askDesc
    }
  },
})
</script>

