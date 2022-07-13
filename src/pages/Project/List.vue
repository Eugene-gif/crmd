<template>
  <q-dialog
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog projects-dialog"
  >
    <Dialog @modalFalse="modalFalse" />
  </q-dialog>
  
  <q-page class="page-projects">
    <div class="row justify-between items-center head">
      <div class="text-h2">Проекты</div>
      <q-icon size="18px" class="mb-visible" name="svguse:icons/allIcons.svg#back" />
      <div class="head-btns">
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite"
          label="Выбрать"
        />
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-positive text-white q-mr-xs my-btn my-effect h-dark q-ml-xs"
          @click="dialog = true"
        >
          <q-icon size="10px" name="svguse:icons/allIcons.svg#plus" color="white" class="mb-visible" />
          <div class="block">Добавить <span class="lg-visible">проект</span></div>
        </q-btn>
      </div>
      <div class="sorted">
        <div class="sorted-section mb-visible">
          <div class="title">Сортировка: </div>
          <q-select
            borderless
            v-model="model"
            :options="options2"
            behavior="menu"
            popup-content-class="select-menu-mobile"
          />
        </div>
        <div class="sorted-btns mb-visible">
          <q-icon size="7px" name="svguse:icons/allIcons.svg#tableArrowDown" />
          <q-icon size="7px" name="svguse:icons/allIcons.svg#tableArrowUp" />
        </div>
      </div>
    </div>

    <div class="projects">
      <!-- :sort-method="customSort" -->
      <q-table
        flat
        :rows="rows"
        :columns="columns"
        row-key="id"
        hide-pagination
        class="my-table projects-table "
        :class="{'projects-table-cubes': tab === 'cubes', 'projects-table-stripes': tab === 'stripes'}"
        :pagination="pagination"
      >
        <template v-slot:header-cell-status="props">
          <q-th :props="props" class="q-th__smaile">
            <!-- Сортировать: -->
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
        <template v-slot:header-cell-address="props">
          <q-th :props="props" class="q-th__address">
          </q-th>
        </template>
        <template v-slot:header-cell-share="props">
          <q-th :props="props" class="q-th__share">
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
            <q-item to="id" class="q-tr-tiles__link" />
            <q-td
              key="image"
              :props="props"
              class="q-td-image"
            >
              <q-item to="/id">
                <img v-show="props.row.image" :src="props.row.image" alt="">
              </q-item>
            </q-td>
            <q-td
              key="name"
              :props="props"
              class="q-td-name"
            >
              <div class="text-h3">
                <span class="name-ico">{{props.row.iconName}}</span>{{props.row.name}}
              </div>
            </q-td>
            <q-td
              key="action"
              :props="props"
              class="q-td-action"
            >
              <ActionBtn 
                :propsEl="props"
                :offsetYX="[55, -258]"
              />
            </q-td>
            <q-td
              key="square"
              :props="props"
              class="q-td-square"
            >
              <div class="text">Квартира, {{props.row.square}} м<sup>2</sup></div>
            </q-td>
            <q-td
              key="changed"
              :props="props"
              class="q-td-changed"
            >
              <div class="text">Изменен: {{props.row.changed}}</div>
            </q-td>
            <q-td
              key="customer"
              :props="props"
              class="q-td-customer"
            >
              <div class="text">{{props.row.customer}}</div>
            </q-td>
            <q-td
              key="created"
              :props="props"
              class="q-td-created"
            >
              <div class="text">Создан: {{props.row.created}}</div>
            </q-td>
            <q-td
              key="address"
              :props="props"
              class="q-td-address"
            >
              <div class="text">{{props.row.address}}</div>
            </q-td>
            <q-td style="flex: 0 0 100%;order: 4;" v-if="tab === 'stripes'"></q-td>
            <q-td
              key="readiness"
              :props="props"
              class="q-td-readiness"
            >
              <q-chip>
                <div class="text">Готовность: <span>{{props.row.readiness}}</span>%</div>
              </q-chip>
              <div class="flex toolbar">
                <div class="toolbar-procent bg-primary" :style="{width: props.row.readiness + '%'}"></div>
              </div>
            </q-td>
            <q-td
              key="payment"
              :props="props"
              class="q-td-payment"
            >
              <q-chip>
                <div class="text">Оплата: <span>{{props.row.payment}}</span>%</div>
              </q-chip>
              <div class="flex toolbar">
                <div class="toolbar-procent bg-positive" :style="{width: props.row.payment + '%'}"></div>
              </div>
            </q-td>
            <q-td
              key="timing"
              :props="props"
              class="q-td-timing"
            >
              <div class="text">Сроки: осталось {{props.row.timing}} дн</div>
            </q-td>
            <q-td style="flex: 0 0 100%;order: 7;" v-if="tab === 'stripes'"></q-td>
            <q-td
              key="share"
              :props="props"
              class="q-td-share"
            >
              <q-list>
                <q-item
                  v-for="item in props.row.share.slice(0, 3)" :key="item.link"
                >
                  <q-btn :to="item.link">
                    <img :src="item.icon" alt="">
                  </q-btn>
                </q-item>
                <q-item
                  v-if="props.row.share.length > 3"
                >
                  <q-btn class="q-td-share__btn__limit" :label="`+${props.row.share.length - 3}`" />
                </q-item>
                <q-item class="q-item-add">
                  <q-btn class="q-td-share__btn__add" icon="svguse:icons/allIcons.svg#plus" />
                </q-item>
              </q-list>
            </q-td>
          </q-tr>
          <!-- q-th__share -->
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
  { name: 'action', label: '', field: 'action', align: 'left' },
  { name: 'share', label: '', field: 'share', align: 'left' },
  { name: 'address', label: '', field: 'address', align: 'left' }
]
// /icons/anton.jpg
// /icons/stroipro.jpg
const rows = ref([
  {
    id: 1,
    status: 1,
    image: '/project-1.jpg',
    iconName: '🏰',
    name: 'Название проекта, заданное пользователем',
    type: 1,
    typeName: 'Квартира',
    address: 'г. Краснодар, ул. Ставропольская, д. 250',
    square: 90,
    customer: 'Андикаловский А.А.',
    changed: '10:35',
    created: 'позавчера',
    timing: 50,
    payment: 80,
    readiness: 40,
    share: [
      {
        icon: '/icons/anton.jpg',
        link: 's'
      },
      {
        icon: '/icons/stroipro.jpg',
        link: ''
      },
      {
        icon: '/icons/anton.jpg',
        link: ''
      },
      {
        icon: '/icons/anton.jpg',
        link: ''
      },
      {
        icon: '/icons/stroipro.jpg',
        link: ''
      },
      {
        icon: '/icons/stroipro.jpg',
        link: ''
      }
    ]    
  },
  {
    id: 2,
    status: 1,
    image: '',
    iconName: '🏰',
    name: 'Название проекта, заданное пользователем',
    type: 1,
    typeName: 'Квартира',
    address: 'г. Краснодар, ул. Ставропольская, д. 250',
    square: 90,
    customer: 'Андикаловский А.А.',
    changed: '10:35',
    created: 'позавчера',
    timing: 50,
    payment: 80,
    readiness: 30,
    share: [
      {
        icon: '/icons/anton.jpg',
        link: ''
      },
      {
        icon: '/icons/stroipro.jpg',
        link: ''
      },
      {
        icon: '/icons/anton.jpg',
        link: ''
      },
      {
        icon: '/icons/anton.jpg',
        link: ''
      },
      {
        icon: '/icons/stroipro.jpg',
        link: ''
      }
    ]      
  },
  {
    id: 3,
    status: 1,
    image: 'project-2.jpg',
    iconName: '🏰',
    name: 'Название проекта, заданное пользователем',
    type: 1,
    typeName: 'Квартира',
    address: 'г. Краснодар, ул. Ставропольская, д. 250',
    square: 90,
    customer: 'Андикаловский А.А.',
    changed: '10:35',
    created: 'позавчера',
    timing: 50,
    payment: 80,
    readiness: 40,
    share: [
      
    ]       
  },
  {
    id: 4,
    status: 1,
    image: 'project-3.jpg',
    iconName: '🏰',
    name: 'Название проекта',
    type: 1,
    typeName: 'Квартира',
    address: 'г. Краснодар, ул. Ставропольская, д. 250',
    square: 90,
    customer: 'Андикаловский А.А.',
    changed: '10:35',
    created: 'позавчера',
    timing: 50,
    payment: 80,
    readiness: 40,
    share: [
      {
        icon: '/icons/anton.jpg',
        link: ''
      },
      {
        icon: '/icons/stroipro.jpg',
        link: ''
      },
      {
        icon: '/icons/anton.jpg',
        link: ''
      },
      {
        icon: '/icons/anton.jpg',
        link: ''
      },
      {
        icon: '/icons/stroipro.jpg',
        link: ''
      }
    ]        
  },
  {
    id: 5,
    status: 1,
    image: '',
    iconName: '🏰',
    name: 'Название проекта, пользователем 2',
    type: 1,
    typeName: 'Квартира',
    address: 'г. Краснодар, ул. Ставропольская, д. 250',
    square: 90,
    customer: 'Андикаловский А.А.',
    changed: '10:35',
    created: 'позавчера',
    timing: 50,
    payment: 80,
    readiness: 40,
    share: [
      {
        icon: '/icons/anton.jpg',
        link: ''
      },
      {
        icon: '/icons/stroipro.jpg',
        link: ''
      },
      {
        icon: '/icons/anton.jpg',
        link: ''
      },
      {
        icon: '/icons/anton.jpg',
        link: ''
      },
      {
        icon: '/icons/stroipro.jpg',
        link: ''
      }
    ]       
  },
  {
    id: 6,
    status: 1,
    image: '',
    iconName: '🏰',
    name: 'Название, заданное пользовате',
    type: 1,
    typeName: 'Квартира',
    address: 'г. Краснодар, ул. Ставропольская, д. 250',
    square: 90,
    customer: 'Андикаловский А.А.',
    changed: '10:35',
    created: 'позавчера',
    timing: 50,
    payment: 80,
    readiness: 40,
    share: [
      {
        icon: '/icons/anton.jpg',
        link: ''
      },
      {
        icon: '/icons/stroipro.jpg',
        link: ''
      },
      {
        icon: '/icons/anton.jpg',
        link: ''
      },
      {
        icon: '/icons/anton.jpg',
        link: ''
      },
      {
        icon: '/icons/stroipro.jpg',
        link: ''
      }
    ]       
  },
  {
    id: 7,
    status: 1,
    image: '',
    iconName: '🏰',
    name: 'Название, заданное пользовате',
    type: 1,
    typeName: 'Квартира',
    address: 'г. Краснодар, ул. Ставропольская, д. 250',
    square: 90,
    customer: 'Андикаловский А.А.',
    changed: '10:35',
    created: 'позавчера',
    timing: 50,
    payment: 80,
    readiness: 40,
    share: [
      {
        icon: '/icons/anton.jpg',
        link: ''
      },
      {
        icon: '/icons/stroipro.jpg',
        link: ''
      },
      {
        icon: '/icons/anton.jpg',
        link: ''
      },
      {
        icon: '/icons/anton.jpg',
        link: ''
      },
      {
        icon: '/icons/stroipro.jpg',
        link: ''
      }
    ]       
  }
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
      sortBy: 'id',
      rowsPerPage: 0
    })
    return {
      model: ref('Имя'),
      tab: ref('tiles'),
      options2: [
        'Имя',
        'Тип',
        'Площадь',
        'Заказчик',
        'Изменен',
        'Создан',
        'Сроки',
        'Оплата',
        'Готовность'
      ],
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
