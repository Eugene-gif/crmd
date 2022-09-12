<template>
  <div class="contractor-single-projects">
    <SortedMobile
      :columns="columns"
      :pagination="pagination"
      @updateRows="onUpdateRows"
    />
    
    <q-table
      flat
      :rows="rows"
      :columns="columns"
      row-key="id"
      hide-pagination
      class="my-table project-table contractor-single-project-table"
      v-model:pagination="pagination"
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
      <template v-slot:header-cell-id="props">
        <q-th :props="props" class="q-th__id">
        </q-th>
      </template>
      <template v-slot:header-cell-emoji="props">
        <q-th :props="props" class="q-th__emoji">
        </q-th>
      </template>
      <template v-slot:header-cell-documents="props">
        <q-th :props="props" class="q-th__documents">
        </q-th>
      </template>
      <template v-slot:header-cell-action="props">
        <q-th :props="props" class="q-th__action">
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
            key="emoji"
            :props="props"
            class="q-td-emoji"
          >
            <div class="content">{{props.row.emoji}}</div>
          </q-td>
          <q-td
            key="adress"
            :props="props"
            class="q-td-adress"
          >
            <div class="content">{{props.row.adress}}</div>
          </q-td>
          <q-td
            key="documents"
            :props="props"
            class="q-td-documents"
          >
            <div class="content">
              <q-icon color="grey-7" name="svguse:icons/allIcons.svg#document" class="q-icon-info">
                <sup v-show="props.row.documents.length > 0"><div class="number">{{props.row.documents.length}}</div></sup>
              </q-icon>
            </div>
          </q-td>

          <q-td
            key="action"
            :props="props"
            class="q-td-action"
          >
            <ActionBtn 
              :propsEl="props.key"
              :offsetYX="[55, -258]"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
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
      sortBy: 'adress',
      rowsPerPage: 0,
      descending: false
    })
    const columns = ref([
      { name: 'id', label: '', field: 'id', align: 'left' },
      { name: 'status', label: '', field: 'status', align: 'left', sortable: true },
      { name: 'adress', label: 'Адрес', field: 'adress', align: 'left', sortable: true },
      { name: 'emoji', label: '', field: 'emoji', align: 'left', sortable: true },
      { name: 'documents', label: '', field: 'documents', align: 'left', sortable: true },
      { name: 'action', label: '', field: 'action', align: 'left', sortable: true }
    ])
    const rows = ref([
      {
        id: 1,
        status: 1,
        adress: 'г. Краснодар, ул. Ленина, д. 15',
        emoji: '🏰',
        documents: [
          {link: ''},
          {link: ''}
        ]
      },
      {
        id: 2,
        status: 1,
        adress: 'г. Краснодар, ул. Ленина, д. 10',
        emoji: '🏰',
        documents: [
          {link: ''},
        ]
      }, 
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