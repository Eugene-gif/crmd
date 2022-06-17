<template>
  <q-dialog
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog finance-dialog"
  >
    <Dialog @modalFalse="modalFalse" />
  </q-dialog>
  
  <q-page class="page-finance">
    <div class="row justify-between items-center">
      <div class="text-h2">Подрядчики</div>
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite lg-visible"
        label="Выбрать"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white q-mr-xs my-btn my-effect h-dark"
        label="Добавить операцию"
        @click="dialog = true"
      />
      <q-icon size="18px" class="mb-visible" name="svguse:icons/allIcons.svg#back" />
    </div>
    
  </q-page>
</template>

<script>
import Card from 'pages/Finance/card.vue'
import Dialog from 'pages/Finance/dialog.vue'
import ActionBtn from 'components/Table/ActionBtn.vue'
import { ref } from 'vue'

const columns = [
  { name: 'status', label: '', field: 'status', align: 'left', sortable: true },
  { name: 'sum', label: 'Сумма', field: 'sum', align: 'left', type: Number, sortable: true },
  { name: 'date', label: 'Дата', field: 'date', align: 'left', sortable: true },
  { name: 'project', label: 'Проект', field: 'project', align: 'left', sortable: true },
  { name: 'from', label: 'От кого', field: 'from', align: 'left', sortable: true},
  { name: 'type', label: 'Тип', field: 'type', align: 'left', sortable: true },
  { name: 'action', label: '', field: 'action', align: 'right' }
]
const rows = ref([
  {
    id: 1,
    status: 1,
    sum: '40 000',
    date: '17.04.2020',
    project: 'Квартира на Ленина',
    fromName : 'Антон Глуханько ',
    fromImage: '/icons/anton.jpg',
    type: 'Гонорар'
  },
  {
    id: 2,
    status: 2,
    sum: '10 000',
    date: '17.03.2020',
    project: 'Квартира на Ленина',
    fromName : 'СтройПро',
    fromImage: '/icons/stroipro.jpg',
    type: 'Агентские'
  },
  {
    id: 3,
    status: 4,
    sum: '5 000',
    date: '17.04.2021',
    project: 'Квартира на Ленина',
    fromName : ' Антон Глуханько ',
    fromImage: '/icons/anton.jpg',
    type: 'Возврат',
  },
  {
    id: 4,
    status: 5,
    sum: '5 000',
    date: '17.04.2021',
    project: 'Квартира на Ленина',
    fromName : 'Антон Глуханько ',
    fromImage: '/icons/anton.jpg',
    to: {
      image: '/icons/stroipro.jpg',
      name: 'СтройПро',
      visible: true
    },
    type: 'Трансфер',
    transfer: '240 000',
    comment: 'агентские'
  },
  {
    id: 5,
    status: 3,
    sum: '5 000',
    date: '17.04.2021',
    project: 'Квартира на Ленина',
    fromName : 'Антон Глуханько ',
    fromImage: '/icons/anton.jpg',
    to: {
      image: '/icons/stroipro.jpg',
      name: 'СтройПро',
      visible: true
    },
    type: 'Агентские'
  }
])

export default {
  name: 'PageFinance',
  components: {
    Card,
    Dialog,
    ActionBtn
  },
  setup () {
    const dialog = ref(false)
    const pagination = ref({
      sortBy: 'id',
      rowsPerPage: 0
    })
    return {
      model: ref('id'),
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      options2: [
        'id', 'Статус', 'Сумма', 'Дата', 'Проект', 'От кого', 'Тип'
      ],
      tab: ref('1'),
      columns,
      rows,
      pagination,
      dialog,
      maximizedToggle: ref(true),
      modalFalse() {
        dialog.value = false
      }
    }
  }
}
</script>
