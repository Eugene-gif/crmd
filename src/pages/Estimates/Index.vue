<template>  
  <q-page class="page-estimates">
    <div class="row justify-between items-center">
      <div class="text-h2">Название сметы</div>
      <q-icon size="18px" class="mb-visible" name="svguse:icons/allIcons.svg#back" />
      <div class="">
        <q-btn
          rounded
          no-caps
          outline
          color="grey-3"
          class="my-btn my-effect q-mr-xs my-btn--outline"
        >
          <div class="block text-grey-5">Выбрать</div>
        </q-btn>
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite q-ml-xs"
          label="Назад"
        />
      </div>
    </div> 
    <div class="info row justify-between">
      <p class="desc"><b>Проект</b>: г. Краснодар, ул. Ленина, д. 15 тест длинного адреса</p>
      <div class="action">Перенести в другой проект</div>
    </div>
    <div class="sectiobn-btns">
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white q-mr-xs my-btn my-effect h-dark"
        padding="12px 24px 12px 20px"
      >
        <q-icon size="13px" name="svguse:icons/allIcons.svg#miniplus" class="q-mr-sm" />
        <span class="block q-ml-xs">Добавить позицию</span>
      </q-btn>
      <q-btn
        rounded
        no-caps
        outline
        color="grey-3"
        class="q-mr-xs my-btn my-effect my-btn--outline q-btn-info"
      >
        <q-icon name="svguse:icons/btnIcons.svg#user" color="grey-8" size="16px" class="q-mr-md">
          <sup>
            3
          </sup>
        </q-icon>
        <q-icon name="svguse:icons/btnIcons.svg#link" color="grey-8" size="18px" class="q-mr-md link-icon">
          <div class="circle"></div>
        </q-icon>
        <div class="block text-grey-5">Настройки доступа</div>
      </q-btn>
      <q-btn
        rounded
        no-caps
        outline
        color="grey-3"
        class="my-btn my-effect q-mr-xs my-btn--outline"
      >
        <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="17px" class="q-mr-md" />
        <div class="block text-grey-5">Редактировать</div>
      </q-btn>
      <q-btn
        rounded
        no-caps
        outline
        color="grey-3"
        class="my-btn my-effect q-mr-xs my-btn--outline"
      >
        <q-icon name="svguse:icons/btnIcons.svg#copy" color="grey-8" size="15px" class="q-mr-md" />
        <div class="block text-grey-5">Дублировать смету</div>
      </q-btn>
      <q-btn
        rounded
        no-caps
        outline
        color="grey-3"
        class="my-btn my-effect q-mr-xs my-btn--outline"
      >
        <q-icon name="svguse:icons/btnIcons.svg#export" color="grey-8" size="13px" class="q-mr-md" />
        <div class="block text-grey-5">Экспорт</div>
      </q-btn>
      <q-btn
        rounded
        no-caps
        outline
        color="grey-3"
        class="my-btn my-effect q-mr-xs my-btn--outline"
      >
        <q-icon name="svguse:icons/btnIcons.svg#delete" color="grey-8" size="16px" class="q-mr-md" />
        <div class="block text-grey-5">Удалить смету</div>
      </q-btn>
    </div>
    <q-item class="smeta-section">
      <div class="title">Сумма: 90 000 руб.</div>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-positive my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-white">42 000 руб.</span>
      </q-btn>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-negative my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-white">18 000 руб.</span>
      </q-btn>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-grey-3 my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-grey-5">30 000 руб.</span>
      </q-btn>
    </q-item>

    <q-item class="smeta-section">
      <div class="title">Агентские: 18 000 руб.</div>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-positive my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-white">6 300 руб.</span>
      </q-btn>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-negative my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-white">2 700 руб.</span>
      </q-btn>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-grey-3 my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-grey-5">9 000 руб.</span>
      </q-btn>
    </q-item>
    <q-item class="smeta-section no-border">
      <div class="subtitle">Обозначения:</div>
      <div class="status">
        <div class="circle bg-positive"></div>
        <div class="desc">Оплачено</div>
      </div>
      <div class="status">
        <div class="circle bg-negative"></div>
        <div class="desc">Ожидается</div>
      </div>
      <div class="status">
        <div class="circle bg-grey-3"></div>
        <div class="desc">На согласовании</div>
      </div>
    </q-item>

    <div class="estimates-info row items-center">
      <div class="title">Прогноз цены</div>
      <q-toggle
        v-model="toggle"
        color="primary"
        class="toggle-small"
      />
      <div class="title">Цена подрядчика:</div>
      <q-tabs
        v-model="tab"
        class="q-tabs-null q-tabs-estimates"
      >
        <q-tab
          v-for="tab in tabs"
          :key="tab"
          :name="tab.name"
        >
          <div class="img-null" v-show="!tab.imageUrl">
            <div class="text">
              {{cutTitle(tab.name)}}
            </div>
          </div>
          <img v-show="tab.imageUrl" :src="tab.imageUrl" alt="">
        </q-tab>
      </q-tabs>
    </div>
    <div class="estimates-table-container">
      <EstimateTable
        :columns="columnsTable"
        :rows="rowTable"
      />
    </div>

    <div class="prev-list">
      <q-btn
        unelevated
        no-caps
        outline
        class="bg-white text-grey-3 my-btn my-effect с"
        style="border-radius: 10px;width: 100%;"
        padding="24px 24px 24px 19px"
      >
        <div class="block text-grey-5">Назад к списку смет</div>
        <q-icon size="18px" name="svguse:icons/allIcons.svg#back" style="margin-left: auto;" />
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import EstimateTable from 'components/Table/EstimateTable.vue'

const toggle = ref(true)
const tabs = ref([
  {
    name: '1',
    imageUrl: '/icons/stroipro.jpg' 
  },
  {
    name: '2',
    imageUrl: '/icons/anton.jpg' 
  },
  {
    name: '3',
    imageUrl: '' 
  },
])
const tab = ref()
const cutTitle = function(title) {
  return String(title.substring(0,2))
}

const columnsTable = ref([
  { name: 'id', label: '№', sortable: true },
  { name: 'name', label: 'Название', sortable: false },
  { name: 'room', label: 'Помещение', sortable: false },
  { name: 'desc', label: 'Описание', sortable: false },
  { name: 'metrics', label: 'м2/шт', sortable: false },
  { name: 'price', label: 'Цена', sortable: false },
  { name: 'total', label: 'Итого', sortable: false },
  { name: 'dedline', label: 'Сроки', sortable: false },
  { name: 'status', label: 'Статус', sortable: false },
  { name: 'procent', label: 'Ставка', sortable: false }
])
const rowTable = ref([
  {
    id: 1,
    imageUrl: '/smeta.jpg',
    name: 'Керамогранит',
    room: 'Спальня',
    desc: 'KERAMA MARAZZI',
    metrics: 20,
    price: '1 200',
    total: 24000,
    deadline: 2,
    status: {
      id: 1,
      name: 'Оплачено',
      user: '',
      imageUrl: ''
    },
    procent: 15
  },
  {
    id: 2,
    imageUrl: '/smeta.jpg',
    name: 'Ламинат',
    room: 'Спальня',
    desc: '1200*200 мм ',
    metrics: 15,
    price: '1 200',
    total: 18000,
    deadline: 5,
    status: {
      id: 1,
      name: 'Оплачено',
      user: '',
      imageUrl: ''
    },
    procent: 15
  },
])

export default {
  name: 'PageEstimates',
  components: {
    EstimateTable
  },
  setup () {
    onMounted(() => {
         
    })
    return {
      toggle,
      tabs,
      tab,
      columnsTable,
      rowTable,
      cutTitle
    }
  }
}
</script>
