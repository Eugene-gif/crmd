<template>
  <q-select
    filled
    v-model="select2"
    :options="options"
    stack-label
    use-input
    @filter="filterFn"
    dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
    class="my-select"
    ref="selectDropbox"
    @popup-hide="focusSelect"
    popup-content-class="my-dopbox-menu"
    :label="select2 ? undefined : 'Введите имя или e-mail'"
  >
    <template v-slot:prepend>
      <q-icon size="18px" name="svguse:icons/allIcons.svg#field-search" @click.stop class="search-input" />
    </template>
    <template v-slot:append>
      <q-icon name="svguse:icons/allIcons.svg#clear-field" @click.stop="select2.value = ''" class="cursor-pointer clear-input rotate" />
    </template>
    <template v-slot:option="scope">
      <q-item v-if="!scope.opt.group"
        v-bind="scope.itemProps"
      >              
        <q-item-section avatar>
          <img :src="scope.opt.icon" alt="">
        </q-item-section>
        <q-item-section>
          <q-item-label v-html="scope.opt.label" ></q-item-label>
          <q-item-label caption>{{ scope.opt.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:no-option>
      <q-item class="no-result">
        <q-item-section class="text-dark">
          Нет результатов
        </q-item-section>
      </q-item>
    </template>
  </q-select>
  
</template>
<script>
import { ref } from 'vue'

const stringOptions = [
  {
    label: 'Антон Глуханько',
    value: 'Антон Глуханько',
    icon: '/icons/anton.jpg'
  },
  {
    label: 'Довольно длинное название объекта, которое нуфывфывыф...',
    value: 'СтройПро',
    icon: '/icons/stroipro.jpg'
  },
  {
    label: 'Антон Глуханько',
    value: 'Антон Глуханько',
    icon: '/icons/anton.jpg'
  },
  {
    label: 'СтройПро',
    value: 'СтройПро',
    icon: '/icons/stroipro.jpg'
  },
]

export default ({
  name: 'DropBox',

  setup () {
    const options = ref(stringOptions)
    const selectDropbox = ref();

    return {
      select2: ref(
        {
          label: 'Выбрать',
          value: null
        },
      ),

      stringOptions,
      options,
      selectDropbox,
      
      filterFn (val, update) {
        if (val === '') {
          update(() => {
            options.value = stringOptions
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          options.value = stringOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      },

      focusSelect() {
        function func() {
          selectDropbox.value.blur()
        }
        setTimeout(func, 100);
      }
    }
  }
})
</script>