<template>
  <q-expansion-item
    expand-separator
    default-opened
    class="files"
  >
    <template v-slot:header>
      <div class="title">
        Приложенные файлы
      </div>
      <q-icon name="svguse:icons/allIcons.svg#settings" size="17px" class="settings-icon" @click.stop="true" />
    </template>
    <q-card>
      <q-card-section>
        <div class="sorted">
          <div class="sorted-section mb-visible">
            <div class="title">Сортировка: </div>
            <q-select
              borderless
              v-model="model"
              :options="columns"
              behavior="menu"
              popup-content-class="select-menu-mobile"
            />
          </div>
          <div class="sorted-btns mb-visible">
            <q-icon size="7px" name="svguse:icons/allIcons.svg#tableArrowDown" />
            <q-icon size="7px" name="svguse:icons/allIcons.svg#tableArrowUp" />
          </div>
        </div>
        <q-table
          flat
          :rows="rows2"
          :columns="columns2"
          row-key="id"
          hide-pagination
          class="my-table project-table"
        >
          <template v-slot:header-cell-id="props">
            <q-th :props="props" class="q-th__id">
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
                key="name"
                :props="props"
                class="q-td-name"
              >
                <div class="row items-center">
                  <q-icon size="17px" name="svguse:icons/allIcons.svg#download" class="q-mr-md" />
                  <div class="content">{{props.row.name}}</div>
                </div>
                
              </q-td>
              <q-td
                key="created"
                :props="props"
                class="q-td-created"
              >
                <div class="content">{{props.row.created}}</div>
              </q-td>
              <q-td
                key="changed"
                :props="props"
                class="q-td-changed"
              >
                <div class="content">{{props.row.changed}}</div>
              </q-td>
              <q-td
                key="type"
                :props="props"
                class="q-td-type"
              >
                <div class="content">{{props.row.type}}</div>
              </q-td>
              <q-td
                key="size"
                :props="props"
                class="q-td-status"
              >
                <div class="row items-center">
                  <div class="content">{{props.row.size}}</div>
                  <ActionBtn 
                    :propsEl="props.row.id"
                    :offsetYX="[55, -258]"
                  />
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
                class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite"
              >
                <div class="block">Загрузить файл</div>
                <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" />
              </q-btn>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import ActionBtn from 'components/Table/ActionBtn.vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  components: {
    ActionBtn,
  },
  props: {
    data: Array
  },
  setup(props, {emit}) {

    const model = ref('Название')

    const columns = ref([
      'Имя',
      'Тип',
      'Площадь',
      'Заказчик',
      'Изменен',
      'Создан',
      'Сроки',
      'Оплата',
      'Готовность'
    ])

    const columns2 = ref([
      { name: 'id', label: '', field: 'id', align: 'left' },
      { name: 'name', label: 'Название', field: 'name', align: 'left', sortable: true },
      { name: 'created', label: 'Создан', field: 'created', align: 'left', sortable: true },
      { name: 'changed', label: 'Изменен', field: 'changed', align: 'left', sortable: true },
      { name: 'type', label: 'Тип', field: 'type', align: 'left', sortable: true },
      { name: 'size', label: 'Размер', field: 'size', align: 'left', sortable: true }
    ])
    const rows2 = ref([
      {
        id: '1',
        name: 'Архив с 3д-моделями столов',
        created: 'Позавчера',
        changed: '14:23',
        type: 'ZIP',
        size: '1 мб',
      },
      {
        id: '2',
        name: 'Архив с 3д-моделями стульев',
        created: '25 / 05 / 2021',
        changed: '25 / 05 / 2021',
        type: 'Ссылка',
        size: '',
      },
    ])

    return {
      model,
      columns,
      columns2,
      rows2,
    }
  },
})
</script>
