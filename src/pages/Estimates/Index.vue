<template>  
  <q-dialog
    v-model="dialogPosition"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog estimates-dialog"
  >
    <DialogPosition @modalFalse="modalFalse" />
  </q-dialog>
  <q-dialog
    v-model="dialogSecurity"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog estimates-dialog-security"
  >
    <DialogSecurity @modalFalse="modalFalse" />
  </q-dialog>
  <q-dialog
    v-model="dialogExport"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog estimates-dialog-export"
  >
    <DialogExport @modalFalse="modalFalse" />
  </q-dialog>
  <q-dialog
    v-model="dialogSettings"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog estimates-dialog-export estimates-dialog-settings"
  >
    <DialogSettings @modalFalse="modalFalse" />
  </q-dialog>
  <q-page class="page-estimates page-estimates-all">
    <div class="row justify-between items-center">
      <div class="text-h2">Общая смета</div>
      <q-icon size="18px" class="mb-visible" name="svguse:icons/allIcons.svg#back" />
      <div class="lg-visible">
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
      <q-item to="/" class="action q-item-none">Перенести в другой проект</q-item>
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
        <div class="circle bg-grey-7"></div>
        <div class="desc">На согласовании</div>
      </div>
    </q-item>

    <div class="estimates-table-container">
      <q-expansion-item
        switch-toggle-side
        expand-separator
        default-opened
        label="Wifi settings"
        class="estimates-expansion"
      >
      <template v-slot:header>
        <div class="item">
          <div class="title">
            Название сметы, например, освещение
          </div>
          <q-checkbox
            v-model="val"
            checked-icon="svguse:icons/allIcons.svg#check"
            class="my-checkbox flat"
            color="black"
            label="Вкл"
          />
          <ActionBtn
            propsEl="1"
            :offsetYX="[55, -258]"
          />
        </div>
        <div class="item">
          <q-btn
            rounded
            unelevated
            no-caps
            padding="7px 18px"
            class="bg-negative my-btn my-btn-14 no-cursor q-ml-xs"
          >
            <span class="block text-white">2 700 руб.</span>
          </q-btn>
        </div>
      </template>
      </q-expansion-item>
      <EstimateTable
        :columns="columnsTable"
        :rows="rowTable"
      />
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
        <div class="circle bg-grey-7"></div>
        <div class="desc">На согласовании</div>
      </div>
    </q-item>

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
import { ref } from 'vue'
import EstimateTable from 'components/Table/EstimateTable.vue'
import DialogPosition from 'pages/Estimates/dialog-position.vue'
import DialogSecurity from 'pages/Estimates/dialog-security.vue'
import DialogExport from 'pages/Estimates/dialog-export.vue'
import DialogSettings from 'pages/Estimates/dialog-settings.vue'
import ActionBtn from 'components/Table/ActionBtn.vue'

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
    name: {
      title: 'Керамогранит',
      imageUrl: '/smeta.jpg'
    },
    room: 'Спальня',
    desc: 'KERAMA MARAZZI',
    metrics: 20,
    price: '1 200',
    total: 24000,
    deadline: 2,
    status: {
      id: 1,
      name: 'Оплачено',
      user: 'Иван',
      imageUrl: '/icons/stroipro.jpg'
    },
    procent: 15
  },
  {
    id: 2,
    imageUrl: '/smeta.jpg',
    name: {
      title: 'Ламинат',
      imageUrl: ''
    },
    room: 'Спальня',
    desc: '1200*200 мм ',
    metrics: 15,
    price: '1 200',
    total: 18000,
    deadline: 5,
    status: {
      id: 2,
      name: 'Не оплачено',
      user: '',
      imageUrl: ''
    },
    procent: 15
  },
  {
    id: 3,
    imageUrl: '/smeta.jpg',
    name: {
      title: 'Ламинат',
      imageUrl: ''
    },
    room: 'Спальня',
    desc: '1200*200 мм ',
    metrics: 15,
    price: '1 200',
    total: 18000,
    deadline: 5,
    status: {
      id: 3,
      name: 'Не согласовано',
      user: '',
      imageUrl: ''
    },
    procent: 15
  },
])

export default {
  name: 'PageEstimates',
  components: {
    EstimateTable,
    DialogPosition,
    DialogSecurity,
    DialogExport,
    DialogSettings,
    ActionBtn
  },
  setup () {
    const dialogPosition = ref(false)
    const dialogSecurity = ref(false)
    const dialogExport = ref(false)
    const dialogSettings = ref(false)
    return {
      dialogPosition,
      dialogSecurity,
      dialogExport,
      columnsTable,
      dialogSettings,
      rowTable,
      val: ref(true),
      cutTitle,
      modalFalse() {
        dialogPosition.value = false
        dialogSecurity.value = false
        dialogExport.value = false
        dialogSettings.value = false
      }
    }
  }
}
</script>
