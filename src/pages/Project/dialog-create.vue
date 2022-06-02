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
              <div class="info">
                {{el.text}}
                <q-icon size="10px" name="svguse:icons/allIcons.svg#select-arrow" class="q-ml-xs">
                  <q-tooltip
                    max-width="429px"
                    anchor="bottom middle"
                    self="top middle"
                    class="tooltip-project"
                  >
                    Только просмотр, цены скрыты<br>
                    Только просмотр, видит нашу цену<br>
                    Может указать свою цену<br>
                    Видит нашу цену, может указать свою<br>
                    Может редактировать ячейки сметы<br>
                    Может редактировать и создавать ячейки
                  </q-tooltip>
                </q-icon>
              </div>
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
              <div class="info">
                {{el.text}}
                <q-icon size="10px" name="svguse:icons/allIcons.svg#select-arrow" class="q-ml-xs">
                  <q-tooltip
                    max-width="429px"
                    anchor="bottom middle"
                    self="top middle"
                    class="tooltip-project"
                  >
                    Только просмотр, цены скрыты<br>
                    Только просмотр, видит нашу цену<br>
                    Может указать свою цену<br>
                    Видит нашу цену, может указать свою<br>
                    Может редактировать ячейки сметы<br>
                    Может редактировать и создавать ячейки
                  </q-tooltip>
                </q-icon>
              </div>
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
              <div class="info">
                {{el.text}}
                <q-icon size="10px" name="svguse:icons/allIcons.svg#select-arrow" class="q-ml-xs">
                  <q-tooltip
                    max-width="429px"
                    anchor="bottom middle"
                    self="top middle"
                    class="tooltip-project"
                  >
                    Только просмотр, цены скрыты<br>
                    Только просмотр, видит нашу цену<br>
                    Может указать свою цену<br>
                    Видит нашу цену, может указать свою<br>
                    Может редактировать ячейки сметы<br>
                    Может редактировать и создавать ячейки
                  </q-tooltip>
                </q-icon>
              </div>
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
              <div class="info">
                {{el.text}}
                <q-icon size="10px" name="svguse:icons/allIcons.svg#select-arrow" class="q-ml-xs">
                  <q-tooltip
                    max-width="429px"
                    anchor="bottom middle"
                    self="top middle"
                    class="tooltip-project"
                  >
                    Только просмотр, цены скрыты<br>
                    Только просмотр, видит нашу цену<br>
                    Может указать свою цену<br>
                    Видит нашу цену, может указать свою<br>
                    Может редактировать ячейки сметы<br>
                    Может редактировать и создавать ячейки
                  </q-tooltip>
                </q-icon>
              </div>
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

      data: ref([
        {
          title: 'Адрес, общая площадь',
          text: 'Только просмотр',
          value: true
        },
        {
          title: 'Заказчик',
          text: 'Только просмотр',
          value: false
        },
        {
          title: 'Экспликация помещений',
          text: 'Просмотр и редактирование',
          value: true
        },
      ]),
      smeta: ref([
        {
          title: 'Напольные покрытия',
          text: 'Только просмотр, цены скрыты',
          value: true
        },
        {
          title: 'Стеновые покрытия',
          text: 'Только просмотрт, видит нашу цену',
          value: true
        },
        {
          title: 'Потолок',
          text: 'Видит нашу цену, может указать свою',
          value: true
        },
        {
          title: 'Двери, окна, перегородки',
          text: 'Видит нашу цену, может указать свою',
          value: true
        },
        {
          title: 'Мебель',
          text: 'Может редактировать ячейки сметы',
          value: true
        },
        {
          title: 'Кухня',
          text: 'Может редактировать и создавать ячейки',
          value: true
        },
        {
          title: 'Заказные изделия',
          text: 'Видит нашу цену, может указать свою',
          value: true
        },
        {
          title: 'Интерьерная лепнина',
          text: 'Видит нашу цену, может указать свою',
          value: true
        },
        {
          title: 'Отопительные приборы',
          text: 'Видит нашу цену, может указать свою',
          value: true
        },
        {
          title: 'Освещение',
          text: 'Видит нашу цену, может указать свою',
          value: true
        },
        {
          title: 'Электрофурнитура',
          text: 'Видит нашу цену, может указать свою',
          value: true
        },
        {
          title: 'Ванная и сауна',
          text: 'Видит нашу цену, может указать свою',
          value: true
        },
        {
          title: 'Оборудование',
          text: 'Видит нашу цену, может указать свою',
          value: true
        },
        {
          title: 'Декор',
          text: 'Видит нашу цену, может указать свою',
          value: true
        },
        {
          title: 'Благоустройство территории',
          text: 'Видит нашу цену, может указать свою',
          value: true
        },
        {
          title: 'Работы и услуги',
          text: 'Видит нашу цену, может указать свою',
          value: true
        },
      ]),
      visual: ref([
        {
          title: 'Планы, чертежи, схемы',
          text: 'Только просмотр',
          value: true
        },
        {
          title: 'Фото помещения',
          text: 'Только просмотр',
          value: true
        },
        {
          title: 'Визуализации',
          text: 'Только просмотр',
          value: true
        },
        {
          title: 'Текущий прогресс',
          text: 'Можно смотреть, загружать и удалять',
          value: true
        },
      ]),
      files: ref([
        {
          title: 'Название файла',
          text: 'Только просмотр',
          value: true
        },
        {
          title: 'Название файла',
          text: 'Просмотр и редактирование',
          value: true
        },
        {
          title: 'Название файла',
          text: 'Просмотр и редактирование',
          value: true
        },
      ]),
      value: ref(true),
    }
  }
})
</script>
