<template>  
  <q-dialog
    v-model="dialogDelite"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog"
  >
    <DialogDelite @modalFalse="handleModalClose" />
  </q-dialog>

  <q-dialog
    v-model="dialogPosition"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog estimates-dialog"
  >
    <DialogPosition  
      :idEstimate="idEstimate"
      :rate="estimate?.rate"
      :types="estimate.project?.explications" 
      @createItem="onCreateItem"
     />
     <!-- :update="onUpdate"z -->
  </q-dialog>

  <q-dialog
    v-model="dialogUpdate"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog estimates-dialog"
  >
    <DialogUpdate 
      @updateItem="onUpdateItem" 
      :iditem="idActiveItem"
      :activeField="onActiveField"
      :types="estimate.project?.explications" 
      v-if="idActiveItem"
    />
  </q-dialog>

  <q-dialog
    v-model="dialogSecurity"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog estimates-dialog-security"
  >
    <DialogSecurity @modalFalse="modalFalse" />
  </q-dialog>

  <q-dialog
    v-model="dialogExport"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog estimates-dialog-export"
  >
    <DialogExport @modalFalse="modalFalse" />
  </q-dialog>
  
  <q-dialog
    v-model="dialogSettings"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog estimates-dialog-export estimates-dialog-settings"
  >
    <DialogSettings @modalFalse="modalFalse" />
  </q-dialog>

  <LoaderDate
    v-show="loading"
  />
  
  <q-page class="page-estimates page-estimates-single">
    <div class="row justify-between items-center">
      <div class="text-h2">{{estimate.name}}</div>
      <q-icon size="18px" class="mb-visible" name="svguse:icons/allIcons.svg#back" />
      <div class="lg-visible">
        <q-btn
          rounded
          no-caps
          outline
          color="grey-3"
          class="my-btn my-effect q-mr-xs my-btn--outline"
        >
          <div class="block text-grey-5">Выбрать</div>
        </q-btn>
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite q-ml-xs"
          label="Назад"
        />
      </div>
    </div> 
    <div class="info row justify-between">
      <p class="desc"><b>Проект</b>: {{estimate.project?.name}}</p>
      <q-item to="/" class="action q-item-none">Перенести в другой проект</q-item>
    </div>
    <div class="sectiobn-btns">
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white q-mr-xs my-btn my-effect h-dark"
        padding="12px 24px 12px 20px"
        @click="dialogPosition = true"
      >
        <q-icon size="13px" name="svguse:icons/allIcons.svg#miniplus" class="q-mr-sm" />
        <span class="block q-ml-xs">Добавить позицию</span>
      </q-btn>
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white q-mr-xs my-btn my-effect h-dark"
        padding="12px 24px 12px 20px"
        @click="dialogUpdate = true"
      >
        <q-icon size="13px" name="svguse:icons/allIcons.svg#miniplus" class="q-mr-sm" />
        <span class="block q-ml-xs">Изменить</span>
      </q-btn>
      <q-btn
        rounded
        unelevated
        no-caps
        color="grey-3"
        class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite q-ml-xs mb-visible"
        label="Выбрать"
      />
      <q-btn
        rounded
        no-caps
        outline
        color="grey-3"
        class="q-mr-xs my-btn my-effect my-btn--outline q-btn-info"
        @click="dialogSecurity = true"
      >
        <q-icon name="svguse:icons/btnIcons.svg#user" color="grey-8" size="16px" class="q-mr-md">
          <sup>
            3
          </sup>
        </q-icon>
        <q-icon name="svguse:icons/btnIcons.svg#link" color="grey-8" size="18px" class="q-mr-md link-icon">
          <div class="circle"></div>
        </q-icon>
        <div class="block text-grey-5">Настройки доступа</div>
      </q-btn>
      <q-btn
        rounded
        no-caps
        outline
        color="grey-3"
        class="my-btn my-effect q-mr-xs my-btn--outline"
        @click="dialogSettings = true"
      >
        <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="17px" class="q-mr-md" />
        <div class="block text-grey-5">Редактировать</div>
      </q-btn>
      <q-btn
        rounded
        no-caps
        outline
        color="grey-3"
        class="my-btn my-effect q-mr-xs my-btn--outline"
      >
        <q-icon name="svguse:icons/btnIcons.svg#copy" color="grey-8" size="15px" class="q-mr-md" />
        <div class="block text-grey-5">Дублировать смету</div>
      </q-btn>
      <q-btn
        rounded
        no-caps
        outline
        color="grey-3"
        class="my-btn my-effect q-mr-xs my-btn--outline"
        @click="dialogExport = true"
      >
        <q-icon name="svguse:icons/btnIcons.svg#export" color="grey-8" size="13px" class="q-mr-md" />
        <div class="block text-grey-5">Экспорт</div>
      </q-btn>
      <q-btn
        rounded
        no-caps
        outline
        color="grey-3"
        class="my-btn my-effect q-mr-xs my-btn--outline"
      >
        <q-icon name="svguse:icons/btnIcons.svg#delete" color="grey-8" size="16px" class="q-mr-md" />
        <div class="block text-grey-5">Удалить смету</div>
      </q-btn>
    </div>
    
    <q-item class="smeta-section">
      <div class="title">Сумма: 90 000 руб. <span class="q-ml-lg">Агентские 18 000 руб.</span></div>
    </q-item>

    <div class="estimates-info row items-center">
      <div
        @click="priceForecast('div')"
        class="title"
      >
      <!-- :class="{disable: !toggle}" -->
        Прогноз цены
      </div>
      <q-toggle
        v-model="toggle"
        color="primary"
        class="toggle-small"
        @click="priceForecast('toggle')"
      />
      <div class="title">Цена подрядчика:</div>
      <q-tabs
        v-model="tab"
        class="q-tabs-null q-tabs-estimates"
      >
        <q-tab
          v-for="tab in tabs"
          :key="tab"
          :name="tab.name"
          @click="priceForecast('tab')"
        >
          <div class="img-null" v-show="!tab.imageUrl">
            <div class="text">
              {{cutTitle(tab.name)}}
            </div>
          </div>
          <img v-show="tab.imageUrl" :src="tab.imageUrl" alt="">
        </q-tab>
      </q-tabs>

      <div class="enter-offer">
        <div 
          class="circle-warning-26 circle-warning-26-icon-white mb-19-grey" 
        >
          <q-icon name="svguse:icons/financeTable.svg#warning" size="26px" />
          <q-menu
            :offset="[10, 10]"
            anchor="top middle" self="bottom middle"
            class="circle-warning-tooltip"
            ref="menu"
            width="300px"
          >
            Тултип шириной 300 px, где мы расскажем о том, что в работе три проекта и по ним ожидается еще суммарно 3 450 000 руб.
          </q-menu>
          <q-tooltip max-width="300px" anchor="top middle" self="bottom middle" class="lg-visible">
            Тултип шириной 300 px, где мы расскажем о том, что в работе три проекта и по ним ожидается еще суммарно 3 450 000 руб.
          </q-tooltip>
        </div>
        <q-btn
          rounded
          unelevated
          no-caps
          padding="8px 18px"
          class="bg-positive my-btn my-btn-14 q-ml-xs my-effect h-dark"
        >
          <span class="block text-white">Применить предложения</span>
        </q-btn>
      </div>
      
    </div>

    <div class="estimates-table-container">
      <EstimateTable2
        :columns="columnsTable"
        :rows="estimate.items"
        v-if="estimate.items"
        @openSmeta="onOpenSmeta"
        @chooseSmeta="onChooseSmeta"
        @editModal="onEditModal"
        @updateItem="openDialogUpdate"
        @dubleItem="(id) => onDubleItem(id)"
        @delItem="(id) => onActionDel('delItem', id)"
      />
    </div>

    <q-item class="smeta-section">
      <div class="title">Сумма: 90 000 руб. <span class="q-ml-lg">Агентские 18 000 руб.</span></div>
    </q-item>

    <div class="prev-list">
      <q-btn
        unelevated
        no-caps
        outline
        class="bg-white text-grey-3 my-btn my-effect с"
        style="border-radius: 10px;width: 100%;"
        padding="24px 24px 24px 19px"
      >
        <div class="block text-grey-5">Назад к списку смет</div>
        <q-icon size="18px" name="svguse:icons/allIcons.svg#back" style="margin-left: auto;" />
      </q-btn>
    </div>
  </q-page>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { estimatesApi } from 'src/api/estimates'
  import { projectsApi } from 'src/api/projects'
  import { designerApi } from 'src/api/designer'
  import { useRoute } from 'vue-router'
  import { useQuasar } from 'quasar'

  import LoaderDate from 'src/components/LoaderDate.vue'

  import DialogDelite from 'src/components/dialog/DialogDelite'
  import useDialogDel from 'src/composable/useDialogDel'

  import EstimateTable2 from 'components/Table/EstimateTable2'
  import DialogPosition from 'src/pages/Estimates/DialogPosition'
  import DialogUpdate from 'src/pages/Estimates/DialogUpdate'
  import DialogSecurity from 'src/pages/Estimates/DialogSecurity'
  import DialogExport from 'src/pages/Estimates/DialogExport'
  import DialogSettings from 'src/pages/Estimates/DialogSettings'
  
  const $q = useQuasar()
  const loading = ref(false)
  const idEstimate = useRoute().params.id
  const cutTitle = (title) => {
    return String(title.substring(0,2))
  }
  

  const columnsTable = ref([
    { name: 'id', label: '№', field: 'id', sortable: true },
    { name: 'name', label: 'Название', field: 'name', sortable: false },
    { name: 'room', label: 'Помещение', field: 'room', sortable: false },
    { name: 'desc', label: 'Описание', field: 'desc', sortable: false },
    { name: 'price', label: 'Цена, руб.', field: 'price', sortable: false },
    { name: 'metrics', label: 'м2/шт', field: 'metrics', sortable: false },
    { name: 'total', label: 'Итого', field: 'total', sortable: false },
    { name: 'deadline', label: 'Срок, дн', field: 'dedline', sortable: false },
    { name: 'status', label: 'Статус', field: 'status', sortable: false },
    { name: 'procent', label: 'Ставка', field: 'procent', sortable: false },
    { name: 'agent', label: 'Агентские, руб.', field: 'agent', sortable: false },
    { name: 'brand', label: 'Производитель', field: 'brand', sortable: false },
    { name: 'code', label: 'Артикул', field: 'code', sortable: false },
    { name: 'color', label: 'Цвет', field: 'color', sortable: false },
    { name: 'file', label: 'Файл', field: 'file', sortable: false },
  ])
  const estimate = ref({})
  const idActiveItem = ref(null)

  const toggle = ref(true)
  const tab = ref()

  const tabs = ref([
    {
      name: '1',
      imageUrl: '/icons/stroipro.jpg' 
    },
    {
      name: '2',
      imageUrl: '/icons/anton.jpg' 
    },
    {
      name: '3',
      imageUrl: '' 
    },
  ])

  const priceForecast = (val) => {
    if (val === 'tab') {
      toggle.value = false
    } else {
      if (toggle.value === true) {
        tab.value = ''
      } else {
        tab.value = tabs.value[0].name
      }
    }
    if (val === 'div') {
      if (toggle.value === true) {
        tab.value = tabs.value[0].name
        toggle.value = false
      } else {
        tab.value = ''
        toggle.value = true
      }
    }
    // console.log(toggle.value)
  }

  const onOpenSmeta = (val) => {
    estimate.value.items.forEach((item) => {
      if (item.id === val) {
        item.smetaVal = !item.smetaVal
      }
    })
  }

  // применение предложения
  const onChooseSmeta = async (estimateId, proposalId) => {
    try {
      loading.value = true
      await estimatesApi.setSelectedProposal(estimateId, proposalId)
      await getData()
      await getProject()
      loading.value = false
      $q.notify({
        color: 'positive',
        message: 'Предложение для позиции сметы применено'
      })
    } catch (err) {
      console.log(err)
    }
  }


  const dialogSecurity = ref(false)
  const dialogExport = ref(false)
  const dialogSettings = ref(false)
  const modalFalse = () => {
    dialogSecurity.value = false
    dialogExport.value = false
    dialogSettings.value = false
  }

  // добавление новой позиции сметы
  const dialogPosition = ref(false)
  const onCreateItem = async (obj) => {
    dialogPosition.value = false
    loading.value = true
    await getData()
    await getProject()
    loading.value = false
  }

  // открыть модалку обновления сметы
  const dialogUpdate = ref(false)
  const openDialogUpdate = (id) => {
    idActiveItem.value = id
    dialogUpdate.value = true
  }

  // обновление позиции сметы
  const onUpdateItem = (obj) => {
    dialogUpdate.value = false
    estimate.value.items = estimate.value.items.map((item) => {
      if (item.id === obj.id) {
        return obj
      }
      return item
    })
  }

  // открыть редактирование сметы с видимым полем
  const onActiveField = ref()
  // const dataEdit = ref([])
  const onEditModal = (val, field) => {
    idActiveItem.value = val.id
    onActiveField.value = field
    dialogUpdate.value = true
    // dataEdit.value = val
  }

  // дублировать позицию сметы
  const onDubleItem = async (id) => {
    try {
      const resp = await estimatesApi.duplicateItem(id)
      loading.value = true
      await getData()
      await getProject()
      loading.value = false
      $q.notify({
        color: 'positive',
        message: 'Позиция сметы продублирована'
      })
    } catch (err) {
      console.log(err)
    }
  }

  // удаление позиции сметы
  const onDelItem = async (id) => {
    try {
      await estimatesApi.delItem(id)
      loading.value = true
      await getData()
      await getProject()
      loading.value = false
      $q.notify({
        color: 'positive',
        message: 'Позиция сметы удалена'
      })
    } catch (err) {
      console.log(err)
    }
  }

  // получение данных
  const getData = async () => {
    try {
      const resp = await estimatesApi.getById(idEstimate)
      estimate.value = resp
    } catch (err) {
      console.log(err)
      $q.notify({
        color: 'negative',
        message: 'Произошла ошибка получения данных о смете'
      })
    }
    
  } 
  
  // получить проект для сметы
  const getProject = async () => {
    try {
      const resp = await projectsApi.getById(estimate.value.project_id)
      estimate.value.project = {
        name: resp.name,
        explications: resp.explications
      }
    } catch (err) {
      console.log(err)
      $q.notify({
        color: 'negative',
        message: 'Произошла ошибка получения данных о проекте сметы'
      })
    }
    loading.value = false
  } 
  
  async function getSetTerms() {
    try {
      await designerApi.getSetTerms(estimate.value.user_id).then(resp => {
        estimate.value.rate = resp.rate
      })
    } catch (err) {
      $q.notify({
        color: 'negative',
        message: 'произошла ошибка получения данных об условиях сотрудничества'
      })
      console.log(err)
    }
  }

  // composable удаления
  const actionHandlers = {
    delItem: onDelItem,
  }
  const { 
    dialogDelite, 
    dialogDelId, 
    dialogDelName, 
    onActionDel, 
    modalCloseDel, 
    handleModalClose 
  } = useDialogDel(actionHandlers)

  onMounted( async() => {
    loading.value = true
    await getData()
    await getProject()
    await getSetTerms()
    loading.value = false
  })

</script>
