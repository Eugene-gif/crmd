<template>
  <q-page class="page-finance">
    <div class="row justify-between items-center">
      <div class="text-h2">Финансы</div>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="12px 27px"
        class="bg-grey-3 text-grey-5 my-btn"
        label="Выбрать"
      />
    </div>
    <div class="row items-center header-btns">
      <q-btn
        rounded
        unelevated
        no-caps
        padding="12px 27.5px"
        class="bg-positive text-white my-btn"
        label="Добавить операцию"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        padding="12px 27px"
        class="bg-positive text-white q-ml-xs my-btn"
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
          class="bg-white text-grey-5 my-btn btn-effect"
          label="Выбрать"
          icon="svguse:icons/allIcons.svg#filter-icon"
        />
      </div>
      <q-table
        flat
        :rows="rows"
        :columns="columns"
        row-key="name"
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
          <q-tr :props="props">
            <q-td
              key="status"
              :props="props"
            >
              <div class="q-td__status">
                <q-icon :name="`svguse:icons/financeTable.svg#status${props.row.status}`" />
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
              <img :src="props.row.from.image" alt="">
              <div class="title">{{props.row.from.name}}</div>
            </div>
            </q-td>
            <q-td
              key="type"
              :props="props"
            >
            <div class="q-td__type">
              {{props.row.type.name}}
            </div>
            </q-td>
            <q-td
              key="action"
              :props="props"
            >
            <div class="q-td__action">
              <q-icon size="26px" name="svguse:icons/financeTable.svg#action" />
            </div>
            </q-td>
          </q-tr>
          <q-tr :props="props" v-if="props.row.type.status === 3">
            <q-td
              key="status"
              :props="props"
            >
              <div class="q-td__status">
                                
              </div>
            </q-td>
            <q-td
              key="status"
              :props="props"
            >
              <div class="q-td__status">
                операция
              </div>
            </q-td>
            <q-td></q-td>
            <q-td></q-td>
            <q-td
              key="from"
              :props="props"
            >
              <div class="q-td__from">
                <img :src="props.row.to.image" alt="">
                <div class="title">{{props.row.to.name}}</div>
              </div>
            </q-td>
            <q-td></q-td>
            <q-td></q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import Card from 'pages/Finance/card.vue'
import { ref } from 'vue'

const columns = [
  { name: 'status', label: '', field: 'status', align: 'left', sortable: true },
  { name: 'sum', label: 'Сумма', field: 'sum', align: 'left', sortable: true },
  { name: 'date', label: 'Дата', field: 'date', align: 'left', sortable: true },
  { name: 'project', label: 'Проект', field: 'project', align: 'left', sortable: true },
  { name: 'from', label: 'От кого', field: 'from', align: 'left', sortable: true },
  { name: 'type', label: 'Тип', field: 'type', align: 'left' },
  { name: 'action', label: '', field: 'action', align: 'right' }
]
const rows = [
  {
    id: 1,
    status: 1,
    sum: 40000,
    date: '17.04.2021',
    project: 'Квартира на Ленина',
    from: {
      image: '/icons/anton.jpg',
      name: 'Антон Глуханько'
    },
    type: {
      name: 'Гонорар',
      status: 1
    }
  },
  {
    id: 2,
    status: 1,
    sum: 10000,
    date: '17.04.2021',
    project: 'Квартира на Ленина',
    from: {
      image: '/icons/stroipro.jpg',
      name: 'СтройПро'
    },
    type: {
      name: 'Агентские',
      status: 2
    }
  },
  {
    id: 3,
    status: 2,
    sum: 5000,
    date: '17.04.2021',
    project: 'Квартира на Ленина',
    from: {
      image: '/icons/anton.jpg',
      name: 'Антон Глуханько'
    },
    to: {
      image: '/icons/stroipro.jpg',
      name: 'СтройПро'
    },
    type: {
      name: 'Возврат',
      status: 3
    }
  },
  {
    id: 4,
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
      name: 'СтройПро'
    },
    type: {
      name: 'Трансфер',
      status: 3
    },

  },
]

export default {
  name: 'PageFinance',
  components: {
    Card
  },
  setup () {
    
    return {
      tab: ref('1'),
      columns,
      rows
    }
  }
}
</script>
