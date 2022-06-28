<template>  
  <q-page class="page-clients">
    <div class="row justify-between items-center">
      <div class="text-h2">Заказчики</div>
      <q-icon size="18px" class="mb-visible" name="svguse:icons/allIcons.svg#back" />
      <div class="sectiobn-btns">
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite q-mr-xs"
          label="Выбрать"
        />
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-positive text-white my-btn my-effect h-dark"
        >
          <span class="block">
            <q-icon size="10px" name="svguse:icons/allIcons.svg#plus" class="mb-visible" />
            Добавить <span class="lg-visible">заказчика</span>
          </span>
        </q-btn>
      </div>
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
      <div class="sorted-btns mb-visible" style="margin-right: 0;">
        <q-icon size="7px" name="svguse:icons/allIcons.svg#tableArrowDown" />
        <q-icon size="7px" name="svguse:icons/allIcons.svg#tableArrowUp" />
      </div>
    </div>
    <q-table
      flat
      :rows="sortRows"
      :columns="columns"
      row-key="index"
      hide-pagination
      class="my-table clients-table"
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
      <template v-slot:header-cell-content="props">
        <q-th :props="props" class="q-th__content">
        </q-th>
      </template>
      <template v-slot:header-cell-image="props">
        <q-th :props="props" class="q-th__image">
        </q-th>
      </template>
      <template #top-row>
        <div class="sort-number">
          <q-checkbox
            v-for="item in checkArray"
            :key="item"
            v-model="sort"
            :label="item"
            :val="item"
            @click="sortedTable"
          />
        </div>
      </template>
      <template #body="props">
        <div
          class="number"
          v-if="props.row.letter"
        >
          {{props.row.letter}}
        </div>
          <!-- {{props.key}}<br> -->
          <!-- {{sortRows[props.row.index].letter}} -->
        <q-tr
          :props="props"
          :class="{visibility: props.row.show}"
        >
          <q-td
            key="content"
            :props="props"
            class="q-td-content"
          >
            <div class="head">
              <div class="avatarka item">
                <img :src="props.row.image" alt="">
                <div class="circle" v-show="props.row.status === 2">
                  <div class="img">👑</div>
                </div>
              </div>
              <div class="name item">{{props.row.name}}</div>
              <div class="icon-toggle mb-visible">
                <q-icon
                  size="12px"
                  color="black"
                  name="svguse:icons/allIcons.svg#select-arrow"
                  :class="{rotate: props.row.show}"
                  @click="props.row.show = !props.row.show"
                />
              </div>
              <div class="city item">{{props.row.city}}</div>

              <div class="projects item " @click="props.row.showProjects = !props.row.showProjects">
                Проектов: {{props.row.projects.length}}
                <q-icon
                  size="12px"
                  name="svguse:icons/allIcons.svg#select-arrow"
                  class="q-ml-xs"
                  :class="{rotate: props.row.showProjects}"
                />
              </div>
              <div class="tel item lg-visible">{{props.row.tel}}</div>
              <q-list class="q-list-user-info item lg-visible">
                <q-item
                  class="link-mail"
                  link
                  :href="`mailto:${props.row.email}`"
                  style="background: #f0f0f0;"
                >
                  <q-icon color="black" size="20px" name="svguse:icons/allIcons.svg#mail" />
                </q-item>
                <q-item
                  class="link-whatsap"
                  link
                  :href="`mailto:${props.row.whatsapp}`"
                >
                  <img src="~assets/whatsapp.svg" alt="">
                </q-item>
                <q-item
                  class="link-telegram"
                  link
                  :href="`${props.row.telegram}`"
                >
                  <img src="~assets/telegram.svg" alt="">
                </q-item>
                <q-item
                  class="link-insta"
                  link
                  :href="`${props.row.instagram}`"
                >
                  <img src="~assets/instagram.svg" alt="">
                </q-item>
              </q-list>
              <div class="action item lg-visible">
                <ActionBtn 
                  :propsEl="props.row.id"
                  :offsetYX="[55, -258]"
                />
              </div>

            </div>
            <div class="content" :class="{show: props.row.showProjects}">
              <q-item
                class="item"
                v-for="item in props.row.projects"
                :key="item"
              >
                <div class="image">
                  <div class="icon">{{item.icon}}</div>
                </div>
                <div class="name">{{item.name}}</div>
                <div class="info">
                  <div class="toolbar">
                    <div class="toolbar-procent" :style="{width: item.progress + '%'}"></div>
                  </div>
                  <div class="toolbar">
                    <div class="toolbar-procent" :style="{width: item.pay + '%'}"></div>
                  </div>
                  <q-chip>
                    <div class="text">Готовность: <span>{{item.progress}}</span>%</div>
                  </q-chip>
                  <q-chip>
                    <div class="text">Оплата: <span>{{item.pay}}</span>%</div>
                  </q-chip>
                </div>
                <div class="city">{{item.city}}</div>
              </q-item>
            </div>
            <div class="foot mb-visible">
              <div class="tel item">{{props.row.tel}}</div>
              <q-list class="q-list-user-info item">
                <q-item
                  class="link-mail"
                  link
                  :href="`mailto:${props.row.email}`"
                  style="background: #f0f0f0;"
                >
                  <q-icon color="black" size="20px" name="svguse:icons/allIcons.svg#mail" />
                </q-item>
                <q-item
                  class="link-whatsap"
                  link
                  :href="`mailto:${props.row.whatsapp}`"
                >
                  <img src="~assets/whatsapp.svg" alt="">
                </q-item>
                <q-item
                  class="link-telegram"
                  link
                  :href="`${props.row.telegram}`"
                >
                  <img src="~assets/telegram.svg" alt="">
                </q-item>
                <q-item
                  class="link-insta"
                  link
                  :href="`${props.row.instagram}`"
                >
                  <img src="~assets/instagram.svg" alt="">
                </q-item>
              </q-list>
              <div class="action">
                <ActionBtn 
                  :propsEl="props.row.id"
                  :offsetYX="[55, -258]"
                />
              </div>

            </div>
          </q-td>
        </q-tr>
        <!-- 
          <ActionBtn 
            :propsEl="props"
            :offsetYX="[55, -258]"
          />
          <q-chip>
            <div class="text">Готовность: <span>{{props.row.readiness}}</span>%</div>
          </q-chip
          <q-chip>
            <div class="text">Оплата: <span>{{props.row.payment}}</span>%</div>
          </q-chip>
         -->
      </template>
    </q-table>
  </q-page>
</template>

<script>

import ActionBtn from 'components/Table/ActionBtn.vue'
import { ref, onMounted } from 'vue'
 
const columns = [
  { name: 'status', label: '', field: 'status', align: 'left', sortable: true },
  { name: 'image', label: '', field: 'image', align: 'left', sortable: true },
  { name: 'name', label: 'Имя', field: 'name', align: 'left', sortable: true },
  { name: 'city', label: 'Город', field: 'city', align: 'left', sortable: true },
  { name: 'projects', label: 'Проекты', field: 'projects', align: 'left', sortable: true },
  { name: 'content', label: '', field: 'content', align: 'left', sortable: true },
]

const rows = ref([
  {
    id: 11,
    status: 2,
    image: '/icons/anton.jpg',
    name: 'Константин Лавров',
    city: 'Краснодар',
    tel: '+7 (918) 455-02-16',
    whatsapp: '',
    telegram: '',
    instagram: '',
    email: '',
    show: false,
    showProjects: false,
    projects: [
      {
        icon: '',
        name: 'Квартира на Мира',
        progress: 20,
        pay: 0,
        city: 'Краснодар',
        link: ''
      },
      {
        icon: '🏰',
        name: 'Название объекта, заданное пользователем',
        progress: 50,
        pay: 20,
        city: 'Сочи',
        link: ''
      },
      {
        icon: '🏡',
        name: 'Короткое название',
        progress: 100,
        pay: 100,
        city: 'Санкт-Петербург',
        link: ''
      },
    ]    
  },
  {
    id: 1,
    status: 2,
    image: '/icons/anton.jpg',
    name: 'Константин Константинопольский',
    city: 'Краснодар',
    tel: '+7 (918) 455-02-16',
    whatsapp: '',
    telegram: '',
    instagram: '',
    email: '',
    show: false,
    showProjects: false,
    projects: [
      {
        icon: '',
        name: 'Квартира на Мира',
        progress: 20,
        pay: 0,
        city: 'Краснодар',
        link: ''
      },
      {
        icon: '🏰',
        name: 'Название объекта, заданное пользователем',
        progress: 50,
        pay: 20,
        city: 'Сочи',
        link: ''
      },
      {
        icon: '🏡',
        name: 'Короткое название',
        progress: 100,
        pay: 100,
        city: 'Санкт-Петербург',
        link: ''
      },
    ]    
  },
  
  {
    id: 2,
    status: 1,
    image: '/icons/anton.jpg',
    name: 'Антон Глуханько',
    city: 'Краснодар',
    tel: '+7 (918) 455-02-16',
    whatsapp: '',
    telegram: '',
    instagram: '',
    email: '',
    show: false,
    projects: [
      {
        icon: '🏰',
        name: 'Квартира на Мира',
        progress: 20,
        pay: 0,
        city: 'Краснодар',
        link: ''
      },
    ]    
  },
  {
    id: 22,
    status: 1,
    image: '/icons/anton.jpg',
    name: 'Армен Бармен',
    city: 'Краснодар',
    tel: '+7 (918) 455-02-16',
    whatsapp: '',
    telegram: '',
    instagram: '',
    email: '',
    show: false,
    projects: [
      {
        icon: '🏰',
        name: 'Квартира на Мира',
        progress: 20,
        pay: 0,
        city: 'Краснодар',
        link: ''
      },
    ]    
  },
  {
    id: 3,
    status: 1,
    image: '/icons/anton.jpg',
    name: 'Богдан Алиев',
    city: 'Краснодар',
    tel: '+7 (918) 455-02-16',
    whatsapp: '',
    telegram: '',
    instagram: '',
    email: '',
    show: false,
    projects: [
      {
        icon: '🏰',
        name: 'Квартира на Мира',
        progress: 20,
        pay: 0,
        city: 'Краснодар',
        link: ''
      },
    ]    
  },
  {
    id: 4,
    status: 1,
    image: '/icons/anton.jpg',
    name: 'Богдан Алиев',
    city: 'Краснодар',
    tel: '+7 (918) 455-02-16',
    whatsapp: '',
    telegram: '',
    instagram: '',
    email: '',
    show: false,
    projects: [
      {
        icon: '🏰',
        name: 'Квартира на Мира',
        progress: 20,
        pay: 0,
        city: 'Краснодар',
        link: ''
      },
    ]    
  },
])
const sortRows = ref([])
const checkArray = ref([
  'а',
  'б',
  'в',
  'г',
  'д',
  'е',
  'ж',
  'з',
  'и',
  'к',
  'л',
  'м',
  'н',
  'о',
  'п',
  'р',
  'с',
  'т',
  'у',
  'ф',
  'х',
  'ц',
  'ч',
  'ш',
  'щ',
  'ы',
  'э',
  'ю',
  'я'
])
const sort = ref(['а','к', 'б'])
const pagination = ref({
  sortBy: '',
  rowsPerPage: 0
})

function sortedTable() {
  let arr = []
  let index = 0
  let oneLetter = ''
  rows.value.filter((item) => {
    let letter = item.name.toLowerCase().substr(0, 1)
    if (sort.value.includes(letter)) {
      if (oneLetter != letter) {
        oneLetter = letter
        item.letter = oneLetter
        // item.letter = letter
        item.index = index
        index++
      }
      return arr.push(item)
    }
  })
  sortRows.value = arr
}
export default {
  name: 'PageСlients',
  components: {
    ActionBtn
  },
  setup () {
    onMounted(() => {
      sortedTable()
    })
    return {
      columns,
      rows,
      sortRows,
      pagination,
      checkArray,
      sort,
      sortedTable
    }
  }
}
</script>
