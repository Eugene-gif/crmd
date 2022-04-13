<template>
  <q-card>
    <q-card-section class="row items-center justify-between head">
      <div class="title">Указать перевод</div>
      <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
    </q-card-section>
    <!-- 
      <template v-slot:option="scope">
          <q-item v-if="!scope.opt.group"
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >              
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon" ></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.label" ></q-item-label>
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
     -->

    <q-card-section class="form-section">
      <label>Тип</label>
      <q-select
        filled
        v-model="select1.value"
        :options="type"
        stack-label
        placeholder="Выбрать"
        dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
        class="my-select"
        popup-content-class="my-select-menu"
      />
    </q-card-section>

    <q-card-section class="form-section">
      <label>Проект</label>
      <q-select
        filled
        v-model="select2.value"
        :options="options"
        stack-label
        use-input
        @filter="filterFn"
        aria-placeholder="Выбрать"
        dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
        class="my-select"
        popup-content-class="my-dopbox-menu"
        :label="select2.value ? undefined : 'Введите имя или e-mail'"
      >
        <template v-slot:prepend>
          <q-icon size="18px" name="svguse:icons/allIcons.svg#field-search" @click.stop class="search-input" />
        </template>
        <template v-slot:append>
          <q-icon name="svguse:icons/allIcons.svg#clear-field" @click.stop="select2 = ''" class="cursor-pointer clear-input" />
        </template>
        <template v-slot:option="scope">
          <q-item v-if="!scope.opt.group"
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
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
          <q-item>
            <q-item-section class="text-dark">
              Нет результатов
            </q-item-section>
          </q-item>
        </template>
      </q-select>

    </q-card-section>

    <q-card-section class="form-section">
      <label>От кого</label>
      <q-input v-model="text" class="my-input bg-grey-3" placeholder="Введите сумму" />
    </q-card-section>

    <q-card-section class="form-section">
      <label>Сумма, руб.</label>
      <q-input v-model="text" class="my-input bg-grey-3" placeholder="Введите сумму" />
    </q-card-section>

    <q-card-section class="form-section">
      <label>Дата</label>
      <q-input v-model="text" class="my-input bg-grey-3" placeholder="Введите сумму" />
    </q-card-section>

    <q-card-actions align="center">
      <q-btn
        unelevated
        no-caps
        padding="21px 10px"
        class="full-width bg-positive text-white my-btn my-effect h-dark"
        label="Добавить перевод"
      />
    </q-card-actions>
  </q-card>
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
    label: 'СтройПро',
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
// const stringOptions = [
//   'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
// ]

export default ({
  name: 'FinanceDialog',
  setup () {
    const options = ref(stringOptions)

    return {
      select1: ref(
        {
          label: 'Выбрать тип',
          value: null
        },
      ),
      select2: ref(
        {
          label: 'Выбрать',
          value: null
        },
      ),
      type: [
        'Гонорар', 'Агентсткие', 'Трансфер', 'Возврат'
      ],
      
      model: ref(null),
      stringOptions,
      options,
      
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
      }

    }
  }
})
</script>
