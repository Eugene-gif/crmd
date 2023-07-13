<template>  
  <q-page class="page-estimates page-estimates-all-project">
    <div class="row justify-between items-center">
      <div class="text-h2">Сметы</div>
    </div> 

    <q-expansion-item
      expand-separator
      default-opened
      class="q-expansion-my"
      v-for="table in tables"
      :key="table.id"
    >
      <template v-slot:header>
        <div class="title">
          🏰 Условия работы с дизайнерами
        </div>
        <q-btn flat padding="0" no-caps label="Открыть проект" class="btn-open q-ml-auto" @click.stop />
      </template>

      <q-table
        flat
        :rows="rows"
        :columns="columns"
        row-key="id"
        hide-pagination
        class="my-table project-table table-head-no-pdd table-list"
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
          <q-tr class="tr-all">
            <q-td
              key="name"
              :props="props"
              class="q-td-name"
              style="width: 65%"
            >
              <div class="content">Общая смета проекта</div>
            </q-td>
            <q-td
              key="changed"
              :props="props"
              class="q-td-changed"
            >
              <div class="content" style="width: 102px;">Сумма всех отдельных смет</div>
            </q-td>
            <q-td
              key="created"
              :props="props"
              class="q-td-created"
            >
              <div class="content"></div>
            </q-td>
            <q-td
              key="security"
              :props="props"
              class="q-td-status"
            >
              <div class="content">
                
              </div>
            </q-td>
          </q-tr>

          <q-tr
            :props="props"
          >
            <q-td
              key="name"
              :props="props"
              class="q-td-name"
              style="width: 65%"
            >
              <div class="content row">
                {{props.row.name}}
                <div class="row" style="flex: 1;">
                  <q-btn
                    rounded
                    unelevated
                    no-caps
                    padding="2px 15px"
                    style="width: max-content;height: 19px;border-radius: 13px;"
                    class="bg-negative my-btn my-btn-14 no-cursor q-ml-xs btn-new q-ml-sm btn-new-single"
                  >
                    <span class="block text-white" style="font-size:10px;">Новая</span>
                  </q-btn>
                  <q-btn
                    rounded
                    unelevated
                    no-caps
                    padding="2px 24px"
                    style="width: max-content;height: 19px;border-radius: 13px;"
                    class="bg-negative my-btn my-btn-14 no-cursor q-ml-xs btn-new q-ml-auto q-mr-md btn-new-all"
                  >
                    <span class="block text-white" style="font-size:10px;">Новых: 2</span>
                  </q-btn>
                </div>
              </div>
              
            </q-td>
            <q-td
              key="changed"
              :props="props"
              class="q-td-changed"
            >
              <div class="content">{{props.row.changed}}</div>
            </q-td>
            <q-td
              key="created"
              :props="props"
              class="q-td-created"
            >
              <div class="content">{{props.row.created}}</div>
            </q-td>
            <q-td
              key="security"
              :props="props"
              class="q-td-security"
            >
              <div class="content row flex-wrap" style="width: 196px;">
                <span
                  v-for="el in props.row.security"
                  :key="el"
                >
                  {{ el }},
                </span>
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

    </q-expansion-item>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { name: 'name', label: 'Название сметы', field: 'name', align: 'left', sortable: false },
  { name: 'changed', label: 'Изменена', field: 'changed', align: 'left', sortable: false },
  { name: 'created', label: 'Создана', field: 'created', align: 'left', sortable: false },
  { name: 'security', label: 'Мой доступ', field: 'security', align: 'left', sortable: false },
])

const rows = ref([
  {
    id: 1,
    name: 'Напольные покрытия',
    changed: '24/05/2021',
    created: '24/05/2021',
    security: ['Можно сделать предложение', 'прогноз скрыт'],
  },
  {
    id: 2,
    name: 'Стеновые покрытия',
    changed: '15:35',
    created: 'Позавчера',
    security: ['Только просмотр', 'прогноз скрыт'],
  },
])
const tables = ref([
  {},{}
])
</script>
