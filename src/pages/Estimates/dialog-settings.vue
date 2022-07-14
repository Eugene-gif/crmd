<template>
  <q-card>
    <div class="q-card-background" @click="$emit('modalFalse')"></div>
    <div class="dialog-section">
      <q-card-section class="row items-center justify-between head">
        <div class="title">Редактировать</div>
        <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
      </q-card-section>

      <q-card-section class="form-section">
        <label class="lable-title">Название</label>
        <q-input v-model="text2" class="my-input bg-grey-3" placeholder="Кровельные работы" />
      </q-card-section>

      <q-card-actions>
        <div class="text-subtitle1">Какие столбцы выводим:</div>
        <q-list class="q-list-options">
          <q-item
            v-for="el in data"
            :key="el"
          >
            <q-checkbox
              v-model="el.status"
              checked-icon="svguse:icons/allIcons.svg#check"
              class="my-checkbox flat bg-grey-3"
              color="black"
            />
            <label class="name-field">{{el.name}}</label>
          </q-item>
        </q-list>
        <q-btn
          unelevated
          no-caps
          padding="20px 10px"
          class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
          label="Сохранить"
        />
      </q-card-actions>
    </div>
  </q-card>

</template>

<script>
import { ref } from 'vue'

export default ({
  name: 'DialogSettings',
  emits: ['modalFalse'],
  setup () {
    const data = ref([
      {
        name: 'Нумерация',
        status: true
      },
      {
        name: 'Фотография',
        status: true
      },
      {
        name: 'Название',
        status: true
      },
      {
        name: 'Ссылка',
        status: true
      },
      {
        name: 'Помещение',
        status: true
      },
      {
        name: 'Площадь',
        status: true
      },
      {
        name: 'Описание',
        status: true
      },
      {
        name: 'Артикул',
        status: true
      },
      {
        name: 'Количество (м2/шт.)',
        status: false
      },
      {
        name: 'Прогноз цены',
        status: true
      },
      {
        name: 'Цена подрядчика',
        status: true
      },
      {
        name: 'Подрядчик',
        status: true
      },
      {
        name: 'Итого',
        status: false
      },
      {
        name: 'Ставка агентских',
        status: false
      },
      {
        name: 'Сумма агентских',
        status: true
      },
      {
        name: 'Скидка для заказчика',
        status: true
      },
      {
        name: 'Производитель',
        status: true
      },
      {
        name: 'Сроки',
        status: true
      },
      {
        name: '2D/3D файл',
        status: true
      },
      {
        name: 'Цвет',
        status: true
      },
      {
        name: 'Счет или КП',
        status: false
      },
    ])
    return {
      data,
      text2: ref()
    }
  }
})
</script>
