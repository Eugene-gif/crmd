<template>  
  <q-dialog
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog projects-dialog clients-dialog"
  >
    <Dialog
      @modalFalse="modalFalse"
      @updateData="getAll"
    />
  </q-dialog>

  <q-dialog
    v-model="dialogChange"
    :maximized="maximizedToggle"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog projects-dialog clients-dialog"
  >
    <DialogChange
      @modalFalse="modalFalse"
      @updateData="getAll"
      :formData="formOrderer"
    />
  </q-dialog>
  <q-page class="page-clients">
    <LoaderDate
      v-show="loading"
    />

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
          @click="dialog = true"
        >
          <span class="block">
            <q-icon size="10px" name="svguse:icons/allIcons.svg#plus" class="mb-visible" style="vertical-align: initial;" />
            Добавить <span class="lg-visible">заказчика</span>
          </span>
        </q-btn>
      </div>
    </div> 

    <SortedMobile
      :columns="columns"
      :pagination="pagination"
      @updateRows="onUpdateRows"
    />

    <NoDate 
      text="Список проектов пуст"
      v-show="nodate"
    />
    <q-table
      flat
      :rows="sortRows"
      :columns="columns"
      row-key="index"
      hide-pagination
      class="my-table clients-table"
      v-model:pagination="pagination"
      v-show="!nodate"
    >
      <template v-slot:header-cell-status="props">
        <q-th :props="props" class="q-th__smaile" @click="updateSorted">
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
        <q-th :props="props" @click="updateSorted">
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
        <q-th :props="props" >
        </q-th>
      </template>
      <template v-slot:header-cell-image="props">
        <q-th :props="props" class="q-th__image">
        </q-th>
      </template>
      <template #top-row>
        <div
          class="sort-number-container"
          v-show="!nullNumberSorted"
        >
          <div
            class="sort-number" 
            ref="sortNumber"
            :class="{ 'activate': sortNumberState }"
          >
            <q-btn
              v-for="item in checkArray"
              :key="item"
              @click.stop="scrollMeTo(item.number)"
              :class="{activate: item.active}"
            >
              {{item.number}}
            </q-btn>
          </div>
        </div>
      </template>
      <template #body="props">
        <div
          class="number"
          v-show="!nullNumberSorted && props.row.letter"
          :ref="el => numberTable[props.row.letter] = el"
        >
          {{props.row.letter}}
        </div>
        
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
              <div class="avatarka item" @click="props.row.show = !props.row.show">
                <img :src="props.row.image" alt="">
                <div class="circle" v-show="props.row.status === 2">
                  <div class="img">👑</div>
                </div>
              </div>
              <div class="name item" @click="props.row.show = !props.row.show">{{props.row.name}}</div>
              <div class="icon-toggle mb-visible">
                <q-icon
                  size="12px"
                  color="black"
                  name="svguse:icons/allIcons.svg#select-arrow"
                  :class="{rotate: props.row.show}"
                  @click="props.row.show = !props.row.show"
                />
              </div>

              <div class="projects item " @click="props.row.showProjects = !props.row.showProjects">
                Проектов: <span v-if="props.row.projects.length > 0">{{props.row.projects.length}}</span>
                <span v-else>нет</span>
                <q-icon
                  size="12px"
                  name="svguse:icons/allIcons.svg#select-arrow"
                  class="q-ml-xs"
                  :class="{rotate: props.row.showProjects}"
                  v-if="props.row.projects.length > 0"
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
                  :actionfunc="actionfunc"
                  @actionUpdate="onActionUpdate"
                  @actionCopy="onActionCopy"
                  @actionDel="onActionDel"
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
                  :actionfunc="actionfunc"
                  @actionUpdate="onActionUpdate"
                  @actionCopy="onActionCopy"
                  @actionDel="onActionDel"
                />
              </div>

            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import ActionBtn from 'components/Table/ActionBtn.vue'
  import LoaderDate from 'src/components/LoaderDate.vue'
  import NoDate from 'src/components/NoDate.vue'
  import SortedMobile from 'components/Table/SortedMobile.vue'
  import Dialog from 'pages/Сlients/Dialog.vue'
  import DialogChange from 'pages/Сlients/DialogChange.vue'
  import { orderersApi } from 'src/api/orderers'
  import { useQuasar } from 'quasar'
  import { useRoute } from 'vue-router'
  import { inject } from 'vue'

  const $q = useQuasar()
  const emitter = inject('emitter')
  const loading = ref(false)
  const nodate = ref(true)
  const dialog = ref(false)
  const dialogChange = ref(false)
  const route = useRoute()

  const columns = ref([
    { name: 'status', label: '', field: 'status', align: 'left', sortable: true },
    { name: 'image', label: '', field: 'image', align: 'left', sortable: true },
    { name: 'name', label: 'Имя', field: 'name', align: 'left', sortable: true },
    { name: 'projects', label: 'Проекты', field: 'projects', align: 'left', sortable: true },
    { name: 'content', label: '', field: 'content', align: 'left', sortable: true },
  ])

  const rows = ref([])
  
  const pagination = ref({
    sortBy: '',
    rowsPerPage: 0,
    descending: false
  })
  
  async function getAll() {
    loading.value = true
    try {
      await orderersApi.getClients()
      .then(resp => {
        rows.value = resp
        sortedTable()
      })
    } catch (err) {
      console.log(err)
    }
    loading.value = false
    if (rows.value == '') {
      nodate.value = true
    } else {
      nodate.value = false
    }
  }

  const actionfunc = ref([
    {
      title: 'Редактировать',
      emmit: 'actionUpdate'
    },
    {
      title: 'Дублировать',
      emmit: 'actionCopy'
    },
    {
      title: 'Удалить',
      emmit: 'actionDel'
    },
  ])
  const formOrderer = ref()

  const onActionUpdate =(id) => {
    loading.value = true
    sortRows.value.map((item) => {
      if (item.id === id) {
        let firstname = item.name.split(' ')[0]
        let lastName = item.name.split(' ')[1]

        return formOrderer.value = {
          id: id,
          first_name: firstname,
          second_name: item.name,
          last_name: lastName,
          birth_date: '',
          phone: item.tel,
          email: item.email,
          soc_inst: item.instagram,
          soc_wa: item.whatsapp,
          soc_tg: item.telegram,
          photo: item.image,
          birth_date: item.birth_date,
          personal_info: 'информация'
        }
      }
    })
    dialogChange.value = true
    loading.value = false
  }

  async function onActionCopy(id) {
    loading.value = true
    let element 
    sortRows.value.map((item) => {
      if (item.id === id) {
        let firstname = item.name.split(' ')[0]
        let lastName = item.name.split(' ')[1]

        return element = {
          first_name: firstname,
          second_name: item.name,
          last_name: lastName,
          birth_date: '',
          phone: item.tel,
          email: item.email,
          soc_inst: item.instagram,
          soc_wa: item.whatsapp,
          soc_tg: item.telegram,
          birth_date: item.birth_date,
          personal_info: 'информация'
        }
      }
    })
    try {
      await orderersApi.createOrderers(element)
      .then(resp => {
        getAll()
        setTimeout(() => {
          $q.notify({
            color: 'positive',
            timeout: 3000,
            message: 'Дублирование выполнено'
          })
        }, 0)
      })
    } catch (err) {
      console.log(err)
      setTimeout(() => {
        $q.notify({
          color: 'red',
          timeout: 3000,
          message: 'Произошла ошибка, попробуйте позже'
        })
      }, 0)
    }
    loading.value = false
  }

  async function onActionDel(id) {
    loading.value = true
    try {
      await orderersApi.delOrderer(id).then(resp => {
        getAll()
        setTimeout(() => {
          $q.notify({
            color: 'positive',
            message: 'Заказчик удален'
          })
        }, 0)
      })
    } catch (err) {
      console.log(err)
      setTimeout(() => {
        $q.notify({
          color: 'red',
          message: 'Произошла ошибка, попробуйте позже'
        })
      }, 0)
    }
    loading.value = false
  }
  async function onUpdateRows(name, descending) {
    pagination.value.sortBy = name
    pagination.value.descending = descending
  }

  const sortRows = ref([])

  const checkArray = ref([
    {
      number: 'а',
      active: false
    },
    {
      number: 'б',
      active: false
    },
    {
      number: 'в',
      active: false
    },
    {
      number: 'г',
      active: false
    },
    {
      number: 'д',
      active: false
    },
    {
      number: 'е',
      active: false
    },
    {
      number: 'ж',
      active: false
    },
    {
      number: 'з',
      active: false
    },
    {
      number: 'и',
      active: false
    },
    {
      number: 'к',
      active: false
    },
    {
      number: 'л',
      active: false
    },
    {
      number: 'м',
      active: false
    },
    {
      number: 'н',
      active: false
    },
    {
      number: 'о',
      active: false
    },
    {
      number: 'п',
      active: false
    },
    {
      number: 'р',
      active: false
    },
    {
      number: 'с',
      active: false
    },
    {
      number: 'т',
      active: false
    },
    {
      number: 'у',
      active: false
    },
    {
      number: 'ф',
      active: false
    },
    {
      number: 'х',
      active: false
    },
    {
      number: 'ц',
      active: false
    },
    {
      number: 'ч',
      active: false
    },
    {
      number: 'ш',
      active: false
    },
    {
      number: 'щ',
      active: false
    },
    {
      number: 'ы',
      active: false
    },
    {
      number: 'э',
      active: false
    },
    {
      number: 'ю',
      active: false
    },
    {
      number: 'я',
      active: false
    }
  ])
  const sort = ref([])
  const numberTable = ref([])
  const sortNumber = ref()
  const sortNumberOffset = ref()
  const nullNumberSorted = ref(false)
  const sortNumberState = ref(false)
  const sortStartNumberWidth = ref()

  const sortedTable = () => {
    let arr = []
    let index = 0
    let oneLetter = ''
    
    rows.value.filter((item) => {
      let letter = item.name.toLowerCase().substr(0, 1)
      sort.value.push(letter)
      checkArray.value.filter((el) => {    
        if (el.number.toLowerCase().substr(0, 1) === letter) {
          el.active = true
        }
      })
      if (sort.value.includes(letter)) {
        if (oneLetter != letter) {
          oneLetter = letter
          item.letter = oneLetter
          item.index = index
          index++
        }
        return arr.push(item)
      }
    })
    sortRows.value = arr
  }

  const updateSorted = () => {
    const variable = pagination.value.sortBy
    if (variable === 'name' || variable === null) {
      nullNumberSorted.value = false
    } else {
      nullNumberSorted.value = true
    }
  }

  const scrollMeTo = (ref) => {
    if (window.innerWidth > 772 && numberTable.value[ref]) {
      window.scrollTo({
        top: numberTable.value[ref].offsetTop,
        behavior: 'smooth'
      })
    } else if (numberTable.value[ref]) {
      window.scrollTo({
        top: numberTable.value[ref].offsetTop
      })
    }
  }

  const getTouch = (e) => {
    let y = Math.trunc(e.changedTouches[0].clientY)
    document.body.style.overflow = 'hidden'
    let letters = sortNumber.value.querySelectorAll('.activate')
    letters.forEach(function (el) {
      if(el.getBoundingClientRect().top === y) {
        el.click()
      }
    }) 
  }

  const outTouchSortNumber = (e) => {
    document.body.style.overflow = 'visible'
  }

  const sortNumberScroll = () => {
    if (window.scrollY > sortNumberOffset.value + 300) {
      sortNumberState.value = true
      sortNumber.value.style.width = `${sortStartNumberWidth.value}px`
    } else {
      sortNumberState.value = false
      sortNumber.value.style.width = 'auth'
    }
  }

  emitter.on('openModal', (bool) => {
    if (bool) dialog.value = true
  })

  onMounted( async() => {
    await getAll()
    window.addEventListener('scroll', sortNumberScroll)
    sortNumberOffset.value = sortNumber.value.offsetTop
    sortNumber.value.addEventListener('touchmove', getTouch)
    sortNumber.value.addEventListener('touchend', outTouchSortNumber)
    sortStartNumberWidth.value = sortNumber.value.offsetWidth
    
    if (localStorage.getItem('open_dialog') === 'true') dialog.value = true
    localStorage.setItem('open_dialog', '')
  })

  const modalFalse = () => {
    dialog.value = false
    dialogChange.value = false
    localStorage.setItem('open_dialog', '')
  }
 
</script>
