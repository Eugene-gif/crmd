<template>
  <!-- <q-dialog
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog finance-dialog"
  >
    <Dialog @modalFalse="modalFalse" />
  </q-dialog> -->
  
  <q-page class="page-contractor">
    <div class="row justify-between items-center">
      <div class="text-h2">Подрядчики</div>
      <div class="lg-visible">
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
          label="Пригласить подрядчика"
        />
      </div>
      <q-icon size="18px" class="mb-visible" name="svguse:icons/allIcons.svg#back" />
    </div>
    <div class="head row">
      <q-btn
        rounded
        no-caps
        outline
        color="grey-3"
        class="q-mr-xs my-btn my-effect my-btn--outline"
      >
        <q-icon
          name="svguse:icons/allIcons.svg#filter-icon"
          color="grey-8"
          size="15px"
          class="q-mr-md link-icon"
        >
          <div class="circle"></div>
        </q-icon>
        <div class="block text-grey-5">Выбрать категорию</div>
      </q-btn>
      <div class="select-section row">
        <label>Город: </label>
        <q-select
          borderless
          v-model="model"
          :options="options"
          dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
        />
      </div>
      <div class="select-section row">
        <label>Проект: </label>
        <q-select
          borderless
          v-model="model2"
          :options="options2"
          dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
        />
      </div>   
    </div>

    <q-table
      flat
      :rows="rows"
      :columns="columns"
      row-key="id"
      hide-pagination
      class="my-table contractor-table"
      :pagination="pagination"
    >
      <template v-slot:header-cell-content="props">
        <q-th :props="props" class="q-th__content">
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
            <q-icon
              size="7px"
              color="grey-5"
              name="svguse:icons/financeTable.svg#tableArrrow"
            />
          </i>
        </q-th>
      </template>
      <template #body="props">
        <q-tr
          :props="props"
        >
          <q-td
            key="content"
            :props="props"
            class="q-td-content"
          >
            <div class="avatar item">
              <img :src="props.row.image" alt="">
            </div>
            <div class="name item">
              {{props.row.name}}
            </div>
            <div class="status item">
              <div class="circle" :class="{active: props.row.status > 1}"></div>
              {{props.row.statusName}}
            </div>
            <q-tabs
              v-model="props.row.tab"
              class="q-tabs-reviews item"
            >
              <q-tab name="1" icon="svguse:icons/allIcons.svg#like" :label="props.row.like" />
              <q-tab name="2" icon="svguse:icons/allIcons.svg#dislike" :label="props.row.dislike" />
            </q-tabs>
            <div class="reviews item">
              {{props.row.reviews}} отзывов
            </div>
            <div class="estimates item">
              <q-icon color="grey-7" name="svguse:icons/allIcons.svg#document" class="q-icon-info">
                <sup><div class="number">3</div></sup>
              </q-icon>
              <q-icon color="grey-7" name="svguse:icons/allIcons.svg#rub" class="q-icon-info">
                <sup><q-icon size="7px" color="white" name="svguse:icons/allIcons.svg#check" class="icon-check" /></sup>
              </q-icon>
            </div>
            <div class="bid item">
              {{props.row.bid}}%
            </div>
            <ActionBtn 
              :propsEl="props.id"
              :offsetYX="[55, -258]"
              class="item"
            />
            <div class="projects-section item">
              <div class="projects">
                <q-chip class="q-chip-outline"
                  v-for="project in props.row.projects"
                  :key="project"
                >{{project.name}}</q-chip>
              </div>
              <div class="city">
                {{props.row.city}}
              </div>
            </div>
            
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
            <div class="sait item">
              {{props.row.sait}}
            </div>
            <div class="email item">{{props.row.email}}</div>
            <div class="phone item">{{props.row.tel}}</div>
          </q-td>
        </q-tr>
        <!-- q-th__share -->
      </template>
    </q-table>
    
  </q-page>
</template>

<script>
import Dialog from 'pages/Finance/dialog.vue'
import ActionBtn from 'components/Table/ActionBtn.vue'
import { ref } from 'vue'

const columns = [
  { name: 'name', label: 'Имя', field: 'statnameus', align: 'left', sortable: true },
  { name: 'category', label: 'Категория', field: 'category', align: 'left', sortable: true },
  { name: 'status', label: 'Статус', field: 'status', align: 'left', sortable: true },
  { name: 'rating', label: 'Рейтинг', field: 'rating', align: 'left', sortable: true },
  { name: 'reviews', label: 'Отзывы', field: 'reviews', align: 'left', sortable: true},
  { name: 'estimates', label: 'Сметы', field: 'estimates', align: 'left', sortable: true },
  { name: 'bid', label: 'Ставка', field: 'bid', align: 'left', sortable: true },
  { name: 'content', label: '', field: 'content', align: 'left', sortable: true },
]
const rows = ref([
  {
    id: 1,
    image: '/icons/anton.jpg',
    name: 'Антон Глуханько длинное и название',
    status: 1,
    statusName: 'Нет статуса',
    tab: '',
    like: 25,
    dislike: 2,
    reviews: 12,
    documents: 3,
    pay: true,
    bid: 13,
    projects: [
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'натяжные потолки',
        link: ''
      },
      {
        name: 'ремонт под ключ',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'натяжные потолки',
        link: ''
      },
      {
        name: 'ремонт под ключ',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
    ],
    city: 'Краснодар',
    email: 'stroypro@mail.ru',
    sait: 'stroypro.ru',
    whatsapp: 79184550216,
    tel: '+7 (918) 455-02-16',
    telegram: '',
    instagram: '',
  },
  {
    id: 2,
    image: '/icons/anton.jpg',
    name: 'Антон Глуханько длинное и название',
    status: 1,
    statusName: 'Нет статуса',
    tab: '',
    like: 25,
    dislike: 2,
    reviews: 12,
    documents: 3,
    pay: true,
    bid: 13,
    projects: [
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'натяжные потолки',
        link: ''
      },
      {
        name: 'ремонт под ключ',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'натяжные потолки',
        link: ''
      },
      {
        name: 'ремонт под ключ',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
    ],
    city: 'Краснодар',
    email: 'stroypro@mail.ru',
    sait: 'stroypro.ru',
    whatsapp: 79184550216,
    tel: '+7 (918) 455-02-16',
    telegram: '',
    instagram: '',
  },
  {
    id: 3,
    image: '/icons/anton.jpg',
    name: 'Антон Глуханько длинное и название',
    status: 1,
    statusName: 'Нет статуса',
    tab: '',
    like: 25,
    dislike: 2,
    reviews: 12,
    documents: 3,
    pay: true,
    bid: 13,
    projects: [
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'натяжные потолки',
        link: ''
      },
      {
        name: 'ремонт под ключ',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'натяжные потолки',
        link: ''
      },
      {
        name: 'ремонт под ключ',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
      {
        name: 'освещение',
        link: ''
      },
    ],
    city: 'Краснодар',
    email: 'stroypro@mail.ru',
    sait: 'stroypro.ru',
    whatsapp: 79184550216,
    tel: '+7 (918) 455-02-16',
    telegram: '',
    instagram: '',
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
      sortBy: 'id',
      rowsPerPage: 0
    })
    return {
      model: ref('Любой'),
      model2: ref('Любой'),
      options: [
        'Любой', 'Краснодар', 'Новосибирск', 'Москва', 'Санкт-Петербург'
      ],
      options2: [
        'Любой', 'Краснодар', 'Новосибирск', 'Москва', 'Санкт-Петербург'
      ],
      tab: ref('1'),
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
