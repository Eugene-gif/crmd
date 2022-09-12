<template>
  <div class="contractor-single-finance">
    <SortedMobile
      :columns="columns"
      :pagination="pagination"
      @updateRows="onUpdateRows"
    />
    <q-table
      flat
      :columns="columns"
      :rows="rows"
      row-key="id"
      hide-pagination
      class="my-table finance-table"
      v-model:pagination="pagination"
      binary-state-sort
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
      <template v-slot:header-cell-checkStatus="props">
        <q-th :props="props" class="q-th__checkStatus" v-show="false"></q-th>
      </template>
      <template #body="props">
        <q-tr
          :props="props"
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
            class="q-td-date"
          >
          <div class="q-td__date">
            {{props.row.date}}
          </div>
          </q-td>
          <q-td
            key="project"
            :props="props"
            class="q-td-project"
          >
          <div class="q-td__project">
            {{props.row.project}}
          </div>
          </q-td>
          
          <q-td
            key="action"
            :props="props"
            :class="`q-td-action`"
          >
            <ActionBtn 
              :propsEl="props.row.id"
              :offsetYX="[55, -258]"
            />
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
            <div class="q-td__status"></div>
          </q-td>
          <q-td
            key="sum"
            :props="props"
            class="q-td-sum"
          >
            <div class="q-td__sum">
              {{props.row.transfer}} <span class="lg-visible">руб.</span> {{props.row.type}}
            </div>
          </q-td>
          <q-td></q-td>
          <q-td
            key="checkStatus"
            :props="props"
            class="q-td-checkStatus"
          >
            <div class="q-td__check">
              Подтверждено
              <q-icon size="19px" name="svguse:icons/financeTable.svg#check" />
            </div>
          </q-td>
          <q-td></q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="sec-btn">
      <q-btn
        unelevated
        no-caps
        class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite btn-big"
      >
        <div class="block">Указать перевод</div>
        <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" />
      </q-btn>
    </div>
    
  </div>
</template>

<script>
import { ref } from 'vue'
import ActionBtn from 'components/Table/ActionBtn.vue'
import SortedMobile from 'components/Table/SortedMobile.vue'

export default {
  components: {
    ActionBtn,
    SortedMobile
  },
  setup() {
    const pagination = ref({
      sortBy: '',
      rowsPerPage: 0,
      descending: false
    })
    const columns = [
      { name: 'status', label: '', field: 'status', align: 'left', sortable: true },
      { name: 'sum', label: 'Сумма', field: 'sum', align: 'left', type: Number, sortable: true },
      { name: 'date', label: 'Дата', field: 'date', align: 'left', sortable: true },
      { name: 'project', label: 'Проект', field: 'project', align: 'left', sortable: true },
      { name: 'checkStatus', label: '', field: 'checkStatus', align: 'left', sortable: true },
      { name: 'action', label: '', field: 'action', align: 'right' }
    ]
    const rows = ref([
      {
        id: 1,
        status: 1,
        sum: '40 000',
        date: '17.04.2020',
        project: 'Квартира на Ленина',
      },
      {
        id: 2,
        status: 2,
        sum: '10 000',
        date: '17.03.2020',
        project: 'Квартира на Ленина',
      },
      {
        id: 3,
        status: 4,
        sum: '5 000',
        date: '17.04.2021',
        project: 'Квартира на Ленина',
      },
      {
        id: 4,
        status: 5,
        sum: '5 000',
        date: '17.04.2021',
        project: 'Квартира на Ленина',
        transfer: '240 000',
        checkStatus: true,
        type: 'агентские'
      },
      {
        id: 5,
        status: 3,
        sum: '5 000',
        date: '17.04.2021',
        project: 'Квартира на Ленина',
      }
    ])
    async function onUpdateRows(name, descending) {
      pagination.value.sortBy = name
      pagination.value.descending = descending
    }
    
    return {
      columns,
      rows,
      pagination,
      onUpdateRows
    }
  },
}
</script>