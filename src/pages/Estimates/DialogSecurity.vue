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

      <q-card
        class="column q-card-content"
      >
        <q-card-section
          v-for="el in data"
          :key="el"
          class="q-card-section-security avatarka" 
        >
          <div class="image">
            <img :src="el.imageUrl" alt="">
          </div>
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

      <q-card-section
        class="q-card-section-security q-card-section-link" 
      >
        <div class="desc" :class="{'desc-disactive': !security.value}">
          <div class="title">{{security.title}}</div>
          <q-select
            borderless
            v-model="security.status"
            :options="options"
            popup-content-class="tooltip-project"
            dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
            behavior="menu"
            :disable="!security.value"
          />
        </div>
        <q-toggle
          v-model="security.value"
          color="primary"
          class="toggle-mini"
          :label="security.value === true ? 'Вкл': 'Выкл'" 
        />
      </q-card-section>

      <q-card-section class="form-section">
        <div class="form-col">
          <q-input v-model="text2" class="my-input bg-grey-3">
            <template v-slot:append>
              <q-icon name="svguse:icons/btnIcons.svg#copy" size="15px" />
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-section class="section-btn">
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
import DropBox from 'components/DropBox'

export default ({
  name: 'DialogSecurity',
  emits: ['modalFalse'],
  components: {
    DropBox
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
          label: 'Может редактировать все ячейки сметы',
          value: 5,
        },
      ]),
      data: ref([
        {
          imageUrl: '/icons/anton.jpg',
          title: 'Антон Глуханько',
          text: 'Только просмотр',
          value: true,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
        {
          imageUrl: '/icons/stroipro.jpg',
          title: 'СторойПро',
          text: 'Только просмотр',
          value: true,
          status: { "label": "Может указать свою цену", "value": 3 }
        },
        {
          imageUrl: '/icons/anton.jpg',
          title: 'Название Название',
          text: 'Просмотр и редактирование',
          value: false,
          status: { "label": "Только просмотр, цены скрыты", "value": 1 }
        },
      ]),
      security: ref(
        {
          title: 'Доступ по ссылке',
          text: 'Только просмотр',
          value: true,
          status: { "label": "Видит нашу цену, может указать свою", "value": 4 }
        }
      ),
      value: ref(true),
      text2: ref('https://crmd.ru/JKaeFkana/SdjIFzxf'),
      model: ref(),
    }
  }
})
</script>
