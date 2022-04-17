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
      <div class="text-h2">Финансы</div>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="12px 27px"
        class="bg-grey-3 text-grey-5 my-btn my-effect h-dark"
        label="Выбрать"
      />
    </div>
    <div class="row items-center header-btns">
      <q-btn
        rounded
        unelevated
        no-caps
        padding="12px 27.5px"
        class="bg-positive text-white my-btn my-effect h-dark"
        label="Добавить операцию"
        @click="dialog = true"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        padding="12px 27px"
        class="bg-positive text-white q-ml-xs my-btn my-effect h-dark"
        label="Выставить счёт"
      />
    </div>
    <div class="row justify-between cards">
      <Card />
      <Card />
    </div>
    <div class="operations">
      <div class="row justify-between items-center">
        <q-tabs
          v-model="tab"
          class="text-dark my-tabs operations-tabs"
          no-caps
        >
          <q-tab name="1" label="История операций" />
          <q-tab name="2" label="Отклоненные" />
        </q-tabs>
        <q-btn
          rounded
          unelevated
          outline
          no-caps
          padding="12px 27px"
          class="bg-white text-grey-5 my-btn btn-effect my-effect h-dark"
          label="Фильтр"
          icon="svguse:icons/allIcons.svg#filter-icon"
        />
      </div>

      <q-table
        flat
        :rows="rows"
        :columns="columns"
        row-key="id"
        hide-pagination
        class="my-table finance-table"
      >
        <template v-slot:header-cell-status="props">
          <q-th :props="props" class="q-th__smaile">
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
            :class="{ 'bg-grey q-tr__borderlr': props.row.status === 3 }"
          >
            <q-td
              key="status"
              :props="props"
            >
              <div class="q-td__status">
                <q-icon size="26px" :name="`svguse:icons/financeTable.svg#status${props.row.status}`" />
              </div>
            </q-td>
            <q-td
              key="sum"
              :props="props"
            >
            <div class="q-td__sum">
              {{props.row.sum}} руб.
            </div>
            </q-td>
            <q-td
              key="date"
              :props="props"
            >
            <div class="q-td__date">
              {{props.row.date}}
            </div>
            </q-td>
            <q-td
              key="project"
              :props="props"
            >
            <div class="q-td__project">
              {{props.row.project}}
            </div>
            </q-td>
            <q-td
              key="from"
              :props="props"
            >
            <div class="q-td__from">
              <div class="q-td__form__img">
                <q-icon size="19px" name="svguse:icons/financeTable.svg#check" v-if="props.row.status === 2" />
                <img :src="props.row.from.image" alt="">
              </div>
              <div class="title">{{props.row.from.name}}</div>
            </div>
            </q-td>
            <q-td
              key="type"
              :props="props"
            >
            <div class="q-td__type">
              {{props.row.type}}
            </div>
            </q-td>
            <q-td
              key="action"
              :props="props"
            >
            <div class="q-td__action">
              <q-btn-dropdown
                unelevated
                no-caps
                icon="svguse:icons/financeTable.svg#action"
                class="my-effect"
                content-class="q-td__action__list"
              >
                <q-list>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>Изменить</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>Дублировать</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>Удалить</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            </q-td>
          </q-tr>
          <q-tr
            :props="props"
            v-if="props.row.status === 5"
            class="q-tr__transfer"
          >
            <q-td
              key="status"
              :props="props"
            >
              <div class="q-td__status">
                                
              </div>
            </q-td>
            <q-td
              key="sum"
              :props="props"
            >
              <div class="q-td__sum">
                {{props.row.transfer}} руб. {{props.row.comment}}
              </div>
            </q-td>
            <q-td></q-td>
            <q-td></q-td>
            <q-td
              key="from"
              :props="props"
            >
              <div class="q-td__from">
                <q-icon size="36px" name="svguse:icons/financeTable.svg#arrow" class="q-td__from__arrow" />
                <div class="q-td__form__img">
                  <q-icon size="19px" name="svguse:icons/financeTable.svg#check" />
                  <img :src="props.row.to.image" alt="">
                </div>
                <div class="title">{{props.row.to.name}}</div>
              </div>
            </q-td>
            <q-td></q-td>
            <q-td></q-td>
          </q-tr>
          <q-tr
            :props="props"
            v-if="props.row.status === 3 && props.row.to.visible === true"
            class="q-tr__agency q-tr__borderlr"
            :class="{ 'bg-grey': props.row.status === 3 }"
          >
            <q-td
              key="status"
              :props="props"
            >
              <div class="q-td__status">
                <q-icon name="svguse:icons/financeTable.svg#warning" color="white" size="26px"/>        
              </div>
            </q-td>
            <q-td
              key="sum"
              :props="props"
            >
              <div class="q-td__sum">
                Не участвует в расчетах, пока не подтвеждено вами.
              </div>
            </q-td>
            <q-td></q-td>
            <q-td></q-td>
            <q-td
              key="from"
              :props="props"
            >
              <div class="q-td__from">
                <q-btn
                  rounded
                  unelevated
                  no-caps
                  padding="7px 18px"
                  class="bg-positive text-white my-btn my-btn-14 my-effect h-dark"
                  label="подтвердить"
                />
                <q-btn
                  rounded
                  unelevated
                  no-caps
                  padding="7px 18px"
                  class="bg-negative text-white my-btn my-btn-14 q-ml-xs my-effect h-dark"
                  label="отклонить"
                />
              </div>
            </q-td>
            <q-td></q-td>
            <q-td
              key="action"
              :props="props"
            >
              <div class="q-td__action">
                <q-icon
                  size="14px"
                  class="rotate"
                  name="svguse:icons/financeTable.svg#close"
                  @click="props.row.to.visible = false"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import Card from 'pages/Finance/card.vue'
import Dialog from 'pages/Finance/dialog.vue'
import { ref } from 'vue'

const columns = [
  { name: 'status', label: '', field: 'status', align: 'left', sortable: true },
  { name: 'sum', label: 'Сумма', field: 'sum', align: 'left', sortable: true },
  { name: 'date', label: 'Дата', field: 'date', align: 'left', sortable: true },
  { name: 'project', label: 'Проект', field: 'project', align: 'left', sortable: true },
  { name: 'from', label: 'От кого', field: 'from', align: 'left'},
  { name: 'type', label: 'Тип', field: 'type', align: 'left' },
  { name: 'action', label: '', field: 'action', align: 'right' }
]
const rows = ref([
  {
    id: 1,
    status: 1,
    sum: 40000,
    date: '17.04.2020',
    project: 'Квартира на Ленина',
    from: {
      image: '/icons/anton.jpg',
      name: 'Антон Глуханько'
    },
    type: 'Гонорар'
  },
  {
    id: 2,
    status: 2,
    sum: 10000,
    date: '17.03.2020',
    project: 'Квартира на Ленина',
    from: {
      image: '/icons/stroipro.jpg',
      name: 'СтройПро'
    },
    type: 'Агентские'
  },
  {
    id: 3,
    status: 4,
    sum: 5000,
    date: '17.04.2021',
    project: 'Квартира на Ленина',
    from: {
      image: '/icons/anton.jpg',
      name: 'Антон Глуханько'
    },
    type: 'Возврат',
  },
  {
    id: 4,
    status: 5,
    sum: 5000,
    date: '17.04.2021',
    project: 'Квартира на Ленина',
    from: {
      image: '/icons/anton.jpg',
      name: 'Антон Глуханько'
    },
    to: {
      image: '/icons/stroipro.jpg',
      name: 'СтройПро',
      visible: true
    },
    type: 'Трансфер',
    transfer: 240000,
    comment: 'агентские'
  },
  {
    id: 5,
    status: 3,
    sum: 5000,
    date: '17.04.2021',
    project: 'Квартира на Ленина',
    from: {
      image: '/icons/anton.jpg',
      name: 'Антон Глуханько'
    },
    to: {
      image: '/icons/stroipro.jpg',
      name: 'СтройПро',
      visible: true
    },
    type: 'Агентские'
  },
])

export default {
  name: 'PageFinance',
  components: {
    Card,
    Dialog
  },
  setup () {
    const dialog = ref(false)
    return {
      tab: ref('1'),
      columns,
      rows,
      dialog,
      maximizedToggle: ref(true),
      modalFalse() {
        dialog.value = false
      }
    }
  }
}
</script>
