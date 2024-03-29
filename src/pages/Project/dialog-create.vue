<template>
  <q-card>
    <div class="q-card-background" @click="$emit('modalFalse')"></div>
    <div class="dialog-section">
      <q-card-section class="row items-center justify-between head">
        <div class="title">Настройки доступа</div>
        <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
      </q-card-section>

      <q-card-section class="form-section">
        <div class="form-col">
          <label class="lable-title">Проект</label>
          <DropBox />
        </div>
      </q-card-section>
      <q-card-section class="form-section">
        <div class="form-col">
          <label class="lable-title">Подрядчик</label>
          <DropBox />
        </div>
      </q-card-section>

      <q-expansion-item
        expand-separator
        default-opened
        class="form-section-dropdown form-section-dropdown-1"
        label="Данные объекта"
      >
        <q-card>
          <q-card-section
            v-for="el in data"
            :key="el"
          >
            <div class="desc" :class="{'desc-disactive': !el.value}">
              <div class="title">{{el.title}}</div>
              <q-select
                borderless
                v-model="el.status"
                :options="options"
                popup-content-class="tooltip-project"
                dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
                behavior="menu"
                :disable="!el.value"
              />
            </div>
            <q-toggle
              v-model="el.value"
              color="primary"
              class="toggle-mini"
              :label="el.value === true ? 'Вкл': 'Выкл'" 
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        default-opened
        class="form-section-dropdown"
        label="Сметы"
      >
        <q-card>
          <q-card-section
            v-for="el in smeta"
            :key="el"
          >
            <div class="desc" :class="{'desc-disactive': !el.value}">
              <div class="title">{{el.title}}</div>
              <q-select
                borderless
                v-model="el.status"
                :options="options"
                popup-content-class="tooltip-project"
                dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
                behavior="menu"
                :disable="!el.value"
              />
            </div>
            <q-toggle
              v-model="el.value"
              color="primary"
              class="toggle-mini"
              :label="el.value === true ? 'Вкл': 'Выкл'" 
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        default-opened
        class="form-section-dropdown"
        label="Визуал"
      >
        <q-card>
         <q-card-section
            v-for="el in visual"
            :key="el"
          >
            <div class="desc" :class="{'desc-disactive': !el.value}">
              <div class="title">{{el.title}}</div>
              <q-select
                borderless
                v-model="el.status"
                :options="options"
                popup-content-class="tooltip-project"
                dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
                behavior="menu"
                :disable="!el.value"
              />
            </div>
            <q-toggle
              v-model="el.value"
              color="primary"
              class="toggle-mini"
              :label="el.value === true ? 'Вкл': 'Выкл'" 
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        default-opened
        class="form-section-dropdown"
        label="Приложенные файлы"
      >
        <q-card>
          <q-card-section
            v-for="el in files"
            :key="el"
          >
            <div class="desc" :class="{'desc-disactive': !el.value}">
              <div class="title">{{el.title}}</div>
              <q-select
                borderless
                v-model="el.status"
                :options="options"
                popup-content-class="tooltip-project"
                dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
                behavior="menu"
                :disable="!el.value"
              />
            </div>
            <q-toggle
              v-model="el.value"
              color="primary"
              class="toggle-mini"
              :label="el.value === true ? 'Вкл': 'Выкл'" 
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-card-section class="form-section form-section-btn">
        <q-btn
          unelevated
          no-caps
          class="bg-positive text-white q-mr-xs my-btn my-effect h-dark"
          label="Готово"
        />
      </q-card-section>

    </div>
  </q-card>
  
</template>

<script>
import { ref } from 'vue'
import BtnDate from 'components/BtnDate'
import DropBox from 'components/DropBox'
import UploadFile from 'components/UploadFile'
import Emoji from 'components/Emoji'

export default ({
  name: 'FinanceDialog',
  emits: ['modalFalse'],
  components: {
    BtnDate,
    DropBox,
    UploadFile,
    Emoji
  }, 
  setup () {
    return {
      options: ref([
        {
          label: 'Только просмотр, цены скрыты',
          value: 1,
        },
        {
          label: 'Только просмотр, видит нашу цену',
          value: 2,
        },
        {
          label: 'Может указать свою цену',
          value: 3,
        },
        {
          label: 'Видит нашу цену, может указать свою',
          value: 4,
        },
        {
          label: 'Может редактировать ячейки сметы',
          value: 5,
        },
        {
          label: 'Может редактировать и создавать ячейки',
          value: 6,
        },
      ]),
      data: ref([
        {
          title: 'Адрес, общая площадь',
          text: 'Только просмотр',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Заказчик',
          text: 'Только просмотр',
          value: false,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Экспликация помещений',
          text: 'Просмотр и редактирование',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
      ]),
      smeta: ref([
        {
          title: 'Напольные покрытия',
          text: 'Только просмотр, цены скрыты',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Стеновые покрытия',
          text: 'Только просмотрт, видит нашу цену',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Потолок',
          text: 'Видит нашу цену, может указать свою',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Двери, окна, перегородки',
          text: 'Видит нашу цену, может указать свою',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Мебель',
          text: 'Может редактировать ячейки сметы',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Кухня',
          text: 'Может редактировать и создавать ячейки',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Заказные изделия',
          text: 'Видит нашу цену, может указать свою',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Интерьерная лепнина',
          text: 'Видит нашу цену, может указать свою',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Отопительные приборы',
          text: 'Видит нашу цену, может указать свою',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Освещение',
          text: 'Видит нашу цену, может указать свою',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Электрофурнитура',
          text: 'Видит нашу цену, может указать свою',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Ванная и сауна',
          text: 'Видит нашу цену, может указать свою',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Оборудование',
          text: 'Видит нашу цену, может указать свою',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Декор',
          text: 'Видит нашу цену, может указать свою',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Благоустройство территории',
          text: 'Видит нашу цену, может указать свою',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Работы и услуги',
          text: 'Видит нашу цену, может указать свою',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
      ]),
      visual: ref([
        {
          title: 'Планы, чертежи, схемы',
          text: 'Только просмотр',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Фото помещения',
          text: 'Только просмотр',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Визуализации',
          text: 'Только просмотр',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Текущий прогресс',
          text: 'Можно смотреть, загружать и удалять',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
      ]),
      files: ref([
        {
          title: 'Название файла',
          text: 'Только просмотр',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Название файла',
          text: 'Просмотр и редактирование',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          title: 'Название файла',
          text: 'Просмотр и редактирование',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
      ]),
      value: ref(true),
      model: ref(),
    }
  }
})
</script>
