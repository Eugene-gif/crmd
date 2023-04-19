<template>
  <LoaderDate
    v-show="loading"
  />
  <q-dialog
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog contractor-dialog-share"
  >
    <DialogShare @modalFalse="modalFalse" />
  </q-dialog>
  <q-dialog
    v-model="dialog2"
    :maximized="maximizedToggle2"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog contractor-dialog-status"
  >
    <DialogStatus @modalFalse="modalFalse2" />
  </q-dialog>

  <q-dialog
    v-model="dialog4"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog dialog-check-city"
  >
    <CheckCity @modalFalse="modalFalse4" :cityVal="city" />
  </q-dialog>
  
  <q-page class="page-contractor page-designers">
    <div class="row justify-between items-center">
      <div class="text-h2">Дизайнеры</div>
      <q-icon size="18px" class="mb-visible" name="svguse:icons/allIcons.svg#back" />
      <div class="sectiobn-btns">
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite q-mr-xs"
          label="Выбрать"
          @click="dialog2 = true"
        />
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-positive text-white my-btn my-effect h-dark"
          label="Пригласить подрядчика"
          @click="dialog = true"
        />
      </div>
    </div>
    <div class="head row">      
      <div class="select-section row">
        <q-btn
          flat
          rounded
          no-caps
          outline
          color="grey-5"
          class="q-mr-xs my-btn my-effect my-btn--outline"
          :label="city ? city : 'Выбрать город'"
          @click="dialog4 = true"
        >
          <q-icon
            name="svguse:icons/allIcons.svg#select-arrow"
            size="12px"
            class="q-ml-md"
          />
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
          :class="{visibility: props.row.show}"
          @dblclick="openContactor(props.row.id)"
        >
          <q-td
            key="content"
            :props="props"
            class="q-td-content"
          >
            <div class="avatar item" @click="props.row.show = !props.row.show">
              <img :src="props.row.image" alt="">
            </div>
            <div class="name item" @click="props.row.show = !props.row.show">
              {{props.row.name}}
            </div>
            <q-icon
              size="12px"
              color="black"
              class="icon-toggle mb-visible"
              name="svguse:icons/allIcons.svg#select-arrow"
              :class="{rotate: props.row.show}"
              @click="props.row.show = !props.row.show"
            />
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
                <sup v-show="props.row.documents"><div class="number">{{props.row.documents}}</div></sup>
              </q-icon>
              <q-icon
                color="grey-7"
                name="svguse:icons/allIcons.svg#rub"
                class="q-icon-info"
              >
                <sup v-show="props.row.pay"><q-icon size="7px" color="white" name="svguse:icons/allIcons.svg#check" class="icon-check" /></sup>
                <div v-show="props.row.pay === false" class="circle bg-negative"></div>
              </q-icon>
            </div>
            <div class="bid item">
              {{props.row.bid}}%
            </div>
            <div class="br mb-visible"></div>
            <ActionBtn 
              :propsEl="props.id"
              :offsetYX="[55, -258]"
              :actionfunc="actionfunc"
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
            <div class="city mb-visible">
              {{props.row.city}}
            </div>
            <q-list class="q-list-user-info item">
              <q-item
                class="link-mail"
                link
                v-show="props.row.email !== '' && props.row.email !== null && props.row.email !== 'null'"
                :href="`mailto:${props.row.email}`"
                style="background: #f0f0f0;"
              >
                <q-icon color="black" size="20px" name="svguse:icons/allIcons.svg#mail" />
              </q-item>
              <q-item
                class="link-whatsap"
                link
                v-show="props.row.whatsapp !== '' && props.row.whatsapp !== null && props.row.whatsapp !== 'null'"
                :href="`mailto:${props.row.whatsapp}`"
              >
                <img src="~assets/whatsapp.svg" alt="">
              </q-item>
              <q-item
                class="link-telegram"
                link
                v-show="props.row.telegram !== '' && props.row.telegram !== null && props.row.telegram !== 'null'"
                :href="`${props.row.telegram}`"
              >
                <img src="~assets/telegram.svg" alt="">
              </q-item>
              <q-item
                class="link-insta"
                link
                v-show="props.row.instagram !== '' && props.row.instagram !== null && props.row.instagram !== 'null'"
                :href="`${props.row.instagram}`"
              >
                <img src="~assets/instagram.svg" alt="">
              </q-item>
            </q-list>
            <div class="sait item">
              {{props.row.sait}}
            </div>
            <div class="email item">{{props.row.email}}</div>
            <div class="phone item" v-if="props.row.tel !== '' && props.row.tel !== 'null' && props.row.tel !== null">
              {{props.row.tel}}
            </div> 
          </q-td>
        </q-tr>
        <!-- q-th__share -->
      </template>
    </q-table>


    
  </q-page>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import { designerApi } from 'src/api/designer'
import DialogShare from 'pages/Contractor/DialogShare.vue'
import DialogStatus from 'pages/Contractor/DialogStatus.vue'
import CheckCity from 'components/CheckCity.vue'
import ActionBtn from 'components/Table/ActionBtn.vue'
import LoaderDate from 'src/components/LoaderDate.vue'

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

export default {
  name: 'PageFinance',
  components: {
    DialogShare,
    DialogStatus,
    ActionBtn,
    CheckCity,
    LoaderDate
  },
  setup () {
    const loading = ref(false)
    const dialog = ref(false)
    const dialog2 = ref(false)
    const dialog4 = ref(false)

    const city = ref('')

    const actionfunc = ref([
      {
        title: 'Поделиться сметой',
        emmit: 'actionShare'
      },
      {
        title: 'Написать сообщение',
        emmit: 'actionWrite'
      },
      {
        title: 'Добавить отзыв',
        emmit: 'actionAddRew'
      },
      {
        title: 'Изменить статус',
        emmit: 'actionChangeStatus'
      },
      {
        title: 'Добавить в чёрный список',
        emmit: 'actionAddBlack'
      },
    ])
    const checkActive = ref(null)

    const pagination = ref({
      sortBy: 'id',
      rowsPerPage: 0
    })
    const rows = ref([])

    function openContactor(id) {
      loading.value = true
      setTimeout(() => {
        window.location.href = `${window.location.href}/${id}`
      }, 100)      
    }

    async function getAll() {
      loading.value = true
      try {
        const resp = await designerApi.getListDesigners()
        rows.value = resp
        console.log(resp)
      } catch (err) {
        throw err
      }
      loading.value = false
    }

    
    onMounted(() => {
      getAll()

    })

    return {
      getAll,
      checkActive,
      city,
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
      dialog2,
      dialog4,
      maximizedToggle: ref(true),
      maximizedToggle2: ref(true),
      openContactor,
 
      modalFalse() {
        dialog.value = false
      },
      modalFalse2() {
        dialog2.value = false
      },
      modalFalse4(val) {
        dialog4.value = false
        city.value = val
        console.log(city.value)
      },
      actionfunc,
      loading,

    }
  }
}
</script>
