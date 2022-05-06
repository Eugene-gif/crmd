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
              <!-- <ActionBtn 
                :propsEl="props"
              /> -->
              <div class="q-td__action">
                <q-btn
                  unelevated
                  no-caps
                  icon="svguse:icons/financeTable.svg#action"
                  class="my-effect"
                ></q-btn>
              </div>
            </q-td>
            <q-td
              key="square"
              :props="props"
              class="q-td-square"
            >
              <div class="text">Квартира, {{props.row.square}}</div>
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
            <q-td
              key="readiness"
              :props="props"
              class="q-td-readiness"
            >
              <q-chip>
                <div class="text">Готовность: {{props.row.readiness}}%</div>
              </q-chip>
            </q-td>
            <q-td
              key="payment"
              :props="props"
              class="q-td-payment"
            >
              <q-chip>
                <div class="text">Оплата: {{props.row.payment}}%</div>
              </q-chip>
            </q-td>
            <q-td
              key="timing"
              :props="props"
              class="q-td-timing"
            >
              <div class="text">Сроки: осталось {{props.row.timing}} дн</div>
            </q-td>
            <q-td
              key="share"
              :props="props"
              class="q-td-share"
            >
              <q-list>
                <q-item
                  v-for="item in props.row.share.slice(0, 5)" :key="item.link"
                >
                  <q-btn :to="item.link">
                    <img :src="item.icon" alt="">
                  </q-btn>
                </q-item>
                <q-item
                  v-if="props.row.share.length > 5"
                >
                  <q-btn class="q-td-share__btn__limit" :label="`+${props.row.share.length - 5}`" />
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
    name: '🏰 Название проекта, заданное пользователем',
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
    name: '🏰 Название проекта, заданное пользователем',
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
    name: '🏰 Название проекта, заданное пользователем',
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
    id: 4,
    status: 1,
    image: 'project-3.jpg',
    name: '🏰 Название проекта, заданное пользователем',
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
    name: '🏰 Название проекта, заданное пользователем',
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
