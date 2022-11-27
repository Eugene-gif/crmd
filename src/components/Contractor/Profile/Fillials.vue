<template>
  <q-expansion-item
    expand-separator
    default-opened
    class="q-expansion-my"
  >
    <template v-slot:header>
      <div class="title">
        Филиалы
      </div>
    </template>

    <div
      class="item"
      v-for="item in fillials"
      :key="item"
    >
      <div class="item-sec">
        <div class="title">
          {{item.title}}
        </div>
        <div class="txt-content">
          <span v-html="item.timework"></span>
        </div>
      </div>
      <div class="btn-sec">
        <q-btn
          unelevated 
          no-caps
          flat
          class="my-btn my-effect h-opacity btn-add"
          padding="0"
        >
          <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="16px" class="q-mr-sm" />
          <span class="block text-grey-5">Редактировать</span>
        </q-btn>
        <q-btn
          unelevated 
          no-caps
          flat
          class="my-btn my-effect h-opacity btn-add"
          padding="0"
        >
          <q-icon name="svguse:icons/btnIcons.svg#delete" color="grey-8" size="16px" class="q-mr-sm" />
          <span class="block text-grey-5">Удалить</span>
        </q-btn>
      </div>
    </div>
    <q-btn
      unelevated 
      no-caps
      class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
      padding="8.5px 25.5px"
    >
      <span class="block text-grey-5">Добавить филиал</span>
      <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" color="black" style="margin-left: auto;" />
    </q-btn>
  </q-expansion-item>

  <q-expansion-item
    expand-separator
    default-opened
    class="q-expansion-my"
  >
    <template v-slot:header>
      <div class="title">
        Менеджеры
      </div>
    </template>

    <div
      class="item"
      v-for="item in managers"
      :key="item"
    >
      <div class="item-sec">
        <div class="title">
          {{item.title}}
        </div>
        <div class="txt-content">
          Должность: {{item.jobtitle}}<br>
          Email: {{item.email}}<br>
          Тел: {{item.phone}}
        </div>
      </div>
      <div class="btn-sec">
        <q-btn
          unelevated 
          no-caps
          flat
          class="my-btn my-effect h-opacity btn-add"
          padding="0"
        >
          <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="16px" class="q-mr-sm" />
          <span class="block text-grey-5">Редактировать</span>
        </q-btn>
        <q-btn
          unelevated 
          no-caps
          flat
          class="my-btn my-effect h-opacity btn-add"
          padding="0"
        >
          <q-icon name="svguse:icons/btnIcons.svg#delete" color="grey-8" size="16px" class="q-mr-sm" />
          <span class="block text-grey-5">Удалить</span>
        </q-btn>
      </div>
    </div>
    <q-btn
      unelevated 
      no-caps
      class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
      padding="8.5px 25.5px"
    >
      <span class="block text-grey-5">Добавить менеджера</span>
      <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" color="black" style="margin-left: auto;" />
    </q-btn>
  </q-expansion-item>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ProfileFillials',
  setup() {
    
    const fillials = ref([
      {
        title: 'г. Краснодар, ул. Красных Партизан, д. 232, оф 307',
        timework: 'ПН — ПТ: с 9:00 до 20:00, <br>СБ: с 10:00 до 17:00, ВС: Выходной'
      },
      {
        title: 'г. Краснодар, ул. Красных Партизан, д. 232, оф 307',
        timework: 'ПН — ПТ: с 9:00 до 20:00, <br>СБ: с 10:00 до 17:00, ВС: Выходной'
      },
    ])
    const managers = ref([
      {
        title: 'Акеева Полина Андреевна',
        jobtitle: 'Операционный директор',
        email: 'krasotka92@mail.ru',
        phone: '+7 (918) 455-55-55',
      },
    ])

    return {
      fillials,
      managers
    }
  },
}
</script>