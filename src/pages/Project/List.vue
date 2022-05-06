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
  
  <q-page class="page-projects">
    <div class="row justify-between items-center">
      <div class="text-h2">Проекты</div>
      <div class="head-btns">
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
          class="bg-positive text-white q-mr-xs my-btn my-effect h-dark q-ml-xs"
          label="Добавить проект"
          @click="dialog = true"
        />
      </div>
      <q-icon size="18px" class="mb-visible" name="svguse:icons/allIcons.svg#back" />
    </div>

    <div class="projects">
      <!-- :sort-method="customSort" -->
      <q-table
        flat
        :rows="rows"
        :columns="columns"
        row-key="id"
        hide-pagination
        class="my-table projects-table"
        :pagination="pagination"
        binary-state-sort
      >
        <template v-slot:header-cell-status="props">
          <q-th :props="props" class="q-th__smaile">
            Сортировать:
            <i
              class="notranslate material-icons q-icon q-table__sort-icon q-table__sort-icon--left"
              aria-hidden="true"
              role="presentation"
            >
              <q-icon size="16px" color="grey-5" name="svguse:icons/financeTable.svg#smaile" />
              <q-icon size="16px" color="grey-5" name="svguse:icons/financeTable.svg#smaile-active" />
            </i>
          </q-th>
        </template>
        <template v-slot:header-cell-image="props">
          <q-th :props="props" class="q-th__image">
          </q-th>
        </template>
        <template v-slot:header-cell-action="props">
          <q-th :props="props" class="q-th__action">
          </q-th>
        </template>
        <template v-slot:header-cell-view="props">
          <q-th :props="props" class="q-th__view">
            <q-tabs v-model="tab" class="q-tabs-null">
              <q-tab name="tiles" icon="svguse:icons/financeTable.svg#tile1" />
              <q-tab name="cubes" icon="svguse:icons/financeTable.svg#tile2" />
              <q-tab name="stripes" icon="svguse:icons/financeTable.svg#tile3" />
            </q-tabs>
          </q-th>
        </template>
        <template v-slot:header-cell="props">
          <q-th :props="props">
            <span class="q-th__title">
              {{ props.col.label }}
            </span>
            <i
              class="notranslate material-icons q-icon q-table__sort-icon q-table__sort-icon--left"
              aria-hidden="true"
              role="presentation"
            >
              <q-icon size="7px" color="grey-5" name="svguse:icons/financeTable.svg#tableArrrow" />
            </i>
          </q-th>
        </template>
        <template #body="props">
          <q-tr
            :props="props"
            class="q-tr-tiles"
          >
            <q-td
              key="image"
              :props="props"
              class="q-td-image"
            >
              <img v-show="props.row.image" :src="props.row.image" alt="">
            </q-td>
            <q-td
              key="name"
              :props="props"
              class="q-td-name"
            >
              <div class="text-h3">
                {{props.row.name}}
              </div>
            </q-td>
            <q-td
              key="action"
              :props="props"
              class="q-td-action"
            >
              <ActionBtn 
                :propsEl="props"
              />
            </q-td>
            <q-td
              key="square"
              :props="props"
              class="q-td-square"
            >
              
            </q-td>
            <q-td
              key="changed"
              :props="props"
              class="q-td-changed"
            >
              
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import Dialog from 'pages/Project/dialog.vue'
import ActionBtn from 'components/Table/ActionBtn.vue'
import { ref } from 'vue'

const columns = [
  { name: 'image', label: '', field: 'image', align: 'left' },
  { name: 'status', label: '', field: 'status', align: 'left', sortable: true },
  { name: 'name', label: 'Имя', field: 'name', align: 'left', sortable: true },
  { name: 'type', label: 'Тип', field: 'type', align: 'left', sortable: true },
  { name: 'square', label: 'Площадь', field: 'square', align: 'left', sortable: true },
  { name: 'customer', label: 'Заказчик', field: 'customer', align: 'left', sortable: true },
  { name: 'changed', label: 'Изменен', field: 'changed', align: 'left', sortable: true },
  { name: 'created', label: 'Создан', field: 'created', align: 'left', sortable: true },
  { name: 'timing', label: 'Сроки', field: 'timing', align: 'left', sortable: true },
  { name: 'payment', label: 'Оплата', field: 'payment', align: 'left', sortable: true },
  { name: 'readiness', label: 'Готовность', field: 'readiness', align: 'left', sortable: true },
  { name: 'view', label: '', field: 'view', align: 'right' },
  { name: 'action', label: '', field: 'action', align: 'left' }
]

const rows = ref([
  {
    id: 1,
    status: 1,
    image: '/project-1.jpg',
    name: '🏰 Название проекта, заданное пользователем',
    type: 1,
    typeName: 'Квартира',
    address: 'г. Краснодар, ул. Ставропольская, д. 250',
    square: 90,
    customer: 'Андикаловский А.А.',
    changed: '10:35',
    created: 'позавчера',
    timing: '50 дней',
    payment: 80,
    readiness: 40    
  },
  {
    id: 2,
    status: 1,
    image: '',
    name: '🏰 Название проекта, заданное пользователем',
    type: 1,
    typeName: 'Квартира',
    address: 'г. Краснодар, ул. Ставропольская, д. 250',
    square: 90,
    customer: 'Андикаловский А.А.',
    changed: '10:35',
    created: 'позавчера',
    timing: '50 дней',
    payment: 80,
    readiness: 40    
  },
])

export default {
  name: 'PageFinance',
  components: {
    Dialog,
    ActionBtn
  },
  setup () {
    const dialog = ref(false)
    const pagination = ref({
      sortBy: 'id'
    })
    return {
      model: ref('id'),
      tab: ref('tiles'),
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
