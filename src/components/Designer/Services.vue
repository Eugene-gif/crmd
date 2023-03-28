<template>
  <q-dialog
    v-model="dialog"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog designer-dialog-share"
  >
    <Dialog
      @modalFalse="modalFalse"
      :updateActivated="updateActive"
      :data="rowData"
    />
  </q-dialog>
  <q-expansion-item
    expand-separator
    default-opened
    class="q-expansion-my activity-categories"
  >
    <template v-slot:header>
      <div class="title">
        Мои услуги
      </div>
    </template>

    <q-table
      flat
      :rows="rows"
      :columns="columns"
      row-key="id"
      hide-pagination
      class="my-table project-table table-castom-head designer-prifle-table"
    >
      <template v-slot:header-cell-id="props">
        <q-th :props="props" class="q-th__id">
        </q-th>
      </template>
      <template v-slot:header-cell-action="props">
        <q-th :props="props">
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
        >
          <q-td
            key="name"
            :props="props"
            class="q-td-name"
          >
            <div class="content flex">
              <span class="q-mr-sm">{{props.row.name}}</span>
              <div 
                class="circle-warning-26 circle-warning-26-icon-white mb-19-grey mb-visible" 
              >
                <q-icon name="svguse:icons/financeTable.svg#warning" size="26px" />
                <q-menu
                  :offset="[10, 10]"
                  anchor="top middle" self="bottom middle"
                  class="circle-warning-tooltip"
                  ref="menu"
                  width="300px"
                >
                  Тултип шириной 300 px, где мы расскажем о том, что в работе три проекта и по ним ожидается еще суммарно 3 450 000 руб.
                </q-menu>
              </div>
            </div>
          </q-td>
          <q-td
            key="price"
            :props="props"
          >
            <div class="content">{{props.row.price}}</div>
          </q-td>
          <q-td
            key="deadline"
            :props="props"
          >
            <div class="content">{{props.row.deadline}}</div>
          </q-td>
          <q-td
            key="pricename"
            :props="props"
          >
            <div class="content">{{props.row.pricename}}</div>
          </q-td>
          <q-td
            key="action"
            :props="props"
            class="q-td-action"
          >
            <div class="btn-sec ">
              <q-btn
                unelevated 
                no-caps
                flat
                class="my-btn my-effect h-opacity q-mr-md"
                padding="0"
                @click="openDialog(props.row)"
              >
                <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="16px" class="q-mr-sm" />
                <span class="block text-grey-5 mb-visible">Редактировать</span>
              </q-btn>
              <q-btn
                unelevated 
                no-caps
                flat
                class="my-btn my-effect h-opacity "
                padding="0"
              >
                <q-icon name="svguse:icons/btnIcons.svg#delete" color="grey-8" size="16px" class="q-mr-sm" />
                <span class="block text-grey-5 mb-visible">Удалить</span>
              </q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
      <template #bottom>
        <q-tr
          :props="props"
        >
          <q-btn
            unelevated
            no-caps
            class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite mb-visible"
          >
            <div class="block">Новый документ из шаблонов</div>
            <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" />
          </q-btn>
        </q-tr>
      </template>
    </q-table>

    <q-btn
      unelevated 
      no-caps
      class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
      padding="5px 25px"
      @click="dialog = true"
    >
      <span class="block text-grey-5">Добавить</span>
      <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" style="margin-left: auto;" />
    </q-btn>
    
  </q-expansion-item>
</template>

<script>
import { ref } from 'vue'
import ActionBtn from 'components/Table/ActionBtn.vue'
import Dialog from 'pages/Designer/Dialog.vue'

export default {
  components: {
    ActionBtn,
    Dialog,
  },
  setup() {
    const pagination = ref({
      sortBy: '',
      rowsPerPage: 0,
      descending: false
    })
    const dialog = ref(false)
    const updateActive = ref(false)
    const rowData = ref({})

    const columns = ref([
      { name: 'id', label: '', field: 'id', align: 'left' },
      { name: 'name', label: 'Наименование услуги', field: 'name', align: 'left', sortable: true },
      { name: 'price', label: 'Стоимость', field: 'price', align: 'left', sortable: true },
      { name: 'deadline', label: 'Срок', field: 'deadline', align: 'left', sortable: true },
      { name: 'pricename', label: '', field: 'pricename', align: 'left', sortable: true },
      { name: 'action', label: '', field: 'action', align: 'right', sortable: true },
    ])
    const rows = ref([
      {
        id: 1,
        name: 'Планировочное решение',
        price: '200 руб.',
        deadline: '12 дн.',
        pricename: 'за кв. м.',
      },
      {
        id: 2,
        name: '3D-визуализация',
        price: '1000 руб.',
        deadline: '35 дн.',
        pricename: 'за кв. м.',
      },
      {
        id: 3,
        name: 'Рабочая документация',
        price: '600 руб.',
        deadline: '25 дн.',
        pricename: 'за кв. м.',
      },
      {
        id: 4,
        name: 'Авторское сопровождение',
        price: '15000 руб.',
        deadline: '30 дн.',
        pricename: 'за услугу',
      },
      {
        id: 5,
        name: 'Комплектация объекта',
        price: '25000 руб.',
        deadline: '30 дн.',
        pricename: 'за услугу',
      },
    ])
    
    function openDialog(data) {
      updateActive.value = true
      rowData.value = data
      dialog.value = true
    }

    return {
      columns,
      rows,
      pagination,
      updateActive,
      rowData,
      dialog,
      openDialog,
      modalFalse() {
        dialog.value = false
        updateActive.value = false
        rowData.value = {}
      },
    }
  },
}
</script>