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
      :idEstimate="activeEstimate.id"
      :rate="null"
      :types="project.explications"
      @createItem="onCreateItem"
     />
     <!-- :update="onUpdate" -->
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
      :types="project.explications" 
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
    <DialogSettings 
      :idEstimate="idEstimate"
      :estimateName="estimate.name"
      @modalFalse="val => {estimate.name = val; dialogSettings = false}"
    />
  </q-dialog>

  <q-dialog
    v-model="dialogDubleEstimate"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog"
  >
    <DialogDuble 
      :idEstimate="idEstimate"
      :estimateName="estimate.name"
      :project_id="estimate.project_id"
    />
  </q-dialog>

  <q-page class="page-estimates page-estimates-nofull page-estimates-all">
    <div class="row justify-between items-center">
      <div class="text-h2">Общая смета</div>
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
          @click="(() => { router.push(`/estimates`) })"
        />
      </div>
    </div> 
    
    <div class="info row justify-between">
      <p class="desc"><b>Проект</b>: {{ project.name }}</p>
      <q-item to="/" class="action q-item-none">Перенести в другой проект</q-item>
    </div>
    <q-item class="smeta-section">
      <div class="title">Сумма: 90 000 руб.</div>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-positive my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-white">42 000 руб.</span>
      </q-btn>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-negative my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-white">18 000 руб.</span>
      </q-btn>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-grey-3 my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-grey-5">30 000 руб.</span>
      </q-btn>
    </q-item>

    <q-item class="smeta-section">
      <div class="title">Агентские: 18 000 руб.</div>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-positive my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-white">6 300 руб.</span>
      </q-btn>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-negative my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-white">2 700 руб.</span>
      </q-btn>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-grey-3 my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-grey-5">9 000 руб.</span>
      </q-btn>
    </q-item>
    <q-item class="smeta-section no-border">
      <div class="subtitle">Обозначения:</div>
      <div class="status">
        <div class="circle bg-positive"></div>
        <div class="desc">Оплачено</div>
      </div>
      <div class="status">
        <div class="circle bg-negative"></div>
        <div class="desc">Ожидается</div>
      </div>
      <div class="status">
        <div class="circle bg-grey-7"></div>
        <div class="desc">На согласовании</div>
      </div>
    </q-item>



    <div class="estimates-table-container">
      
      <q-expansion-item
        v-for="estimate in project.estimates"
        :key="estimate.id"
        switch-toggle-side
        expand-separator
        default-opened
        label="Wifi settings"
        class="estimates-expansion"
      >
        <template v-slot:header>
          <div class="title" @click.stop="true">
            {{ estimate.name }}
          </div>
          
          <q-checkbox
            v-model="val"
            checked-icon="svguse:icons/allIcons.svg#check"
            class="my-checkbox flat"
            color="black"
            label="Вкл"
            @click.stop="true"
          />
          <ActionBtn
            propsEl="1"
            :offsetYX="[55, -258]"
            @click.stop
          />
          <div class="item" @click.stop="true">
            <q-btn
              outline
              rounded
              unelevated
              no-caps
              padding="7.5px 18px"
              class="btn-sum my-btn my-btn-14 no-cursor"
              color="grey-3"
            >
              <span class="block text-grey-5">2 290 000 руб.</span>
              <span class="info-pay">итого</span>
            </q-btn>
            <!-- <q-btn
              outline
              rounded
              unelevated
              no-caps
              padding="7.5px 18px"
              class="btn-sum my-btn my-btn-14 no-cursor q-ml-sm"
              color="grey-3"
            >
              <span class="block text-grey-5">2 290 000 руб.</span>
              <span class="info-pay">агентские</span>
            </q-btn>
            
            <q-list class="list-users">
              <q-item>
                <img src="~assets/anton.jpg" alt="">
              </q-item>
              <q-item>
                <img src="~assets/stroipro.jpg" alt="">
              </q-item>
            </q-list> -->
            <div class="estimates-action-btns">
              <q-btn
                rounded
                no-caps
                flat
                color="grey-3"
                class="q-mr-xs my-btn my-effect my-btn--outline q-btn-info"
                padding="5.5px 0"
              >
                <q-icon name="svguse:icons/btnIcons.svg#user" color="grey-8" size="11px" class="q-mr-sm">
                  <sup>
                    3
                  </sup>
                </q-icon>
                <q-icon name="svguse:icons/btnIcons.svg#link" color="grey-8" size="14px" class="q-mr-sm link-icon">
                  <div class="circle"></div>
                </q-icon>
                <div class="block text-grey-5">Настройки доступа</div>
              </q-btn>
              <q-btn
                rounded
                no-caps
                flat
                color="grey-3"
                class="my-btn my-effect my-btn--outline"
                padding="5.5px 0"
                @click.stop="activeEstimate = estimate; dialogPosition = true; "
              >
                <q-icon name="svguse:icons/allIcons.svg#plus" color="grey-8" size="12px" class="q-mr-sm" />
                <div class="block text-grey-5">Добавить позицию</div>
              </q-btn>
            </div>
          </div>
        </template>
        <EstimateTable2
          :columns="columnsTable"
          :rows="estimate.items"
          @openSmeta="onOpenSmeta"
          @chooseSmeta="onChooseSmeta"
          @editModal="onEditModal"
          @updateItem="openDialogUpdate"
          @dubleItem="(id) => onDubleItem(id)"
          @delItem="(id) => onActionDel('delItem', id)"
        />

      </q-expansion-item>
      
      
    </div>

    <q-item class="smeta-section">
      <div class="title">Сумма: 90 000 руб.</div>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-positive my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-white">42 000 руб.</span>
      </q-btn>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-negative my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-white">18 000 руб.</span>
      </q-btn>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-grey-3 my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-grey-5">30 000 руб.</span>
      </q-btn>
    </q-item>

    <q-item class="smeta-section">
      <div class="title">Агентские: 18 000 руб.</div>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-positive my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-white">6 300 руб.</span>
      </q-btn>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-negative my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-white">2 700 руб.</span>
      </q-btn>
      <q-btn
        rounded
        unelevated
        no-caps
        padding="7px 18px"
        class="bg-grey-3 my-btn my-btn-14 no-cursor q-ml-xs"
      >
        <span class="block text-grey-5">9 000 руб.</span>
      </q-btn>
    </q-item>
    <q-item class="smeta-section no-border">
      <div class="subtitle">Обозначения:</div>
      <div class="status">
        <div class="circle bg-positive"></div>
        <div class="desc">Оплачено</div>
      </div>
      <div class="status">
        <div class="circle bg-negative"></div>
        <div class="desc">Ожидается</div>
      </div>
      <div class="status">
        <div class="circle bg-grey-7"></div>
        <div class="desc">На согласовании</div>
      </div>
    </q-item>

    <div class="prev-list">
      <q-btn
        unelevated
        no-caps
        outline
        class="bg-white text-grey-3 my-btn my-effect с"
        style="border-radius: 10px;width: 100%;"
        padding="24px 24px 24px 19px"
        @click="(() => { router.push(`/estimates`) })"
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
import { useRoute, useRouter } from 'vue-router'
import EstimateTable2 from 'components/Table/EstimateTable2.vue'
import ActionBtn from 'components/Table/ActionBtn.vue'
import NoDate from 'src/components/NoDate.vue'
import DialogDelite from 'src/components/dialog/DialogDelite'
import useDialogDel from 'src/composable/useDialogDel'
import DialogPosition from 'src/pages/Estimates/DialogPosition'
import DialogUpdate from 'src/pages/Estimates/DialogUpdate'
import DialogSecurity from 'src/pages/Estimates/DialogSecurity'
import DialogExport from 'src/pages/Estimates/DialogExport'
import DialogSettings from 'src/pages/Estimates/DialogSettings'
import DialogDuble from 'src/pages/Estimates/DialogDuble'

const idProject = useRoute().params.id
const activeEstimate = ref({})
const idActiveItem = ref(null)
const project = ref({})
const router = useRouter()

const user = JSON.parse(localStorage.getItem('userInfo'))
const userRole = user.role

const columnsTable = ref([
  { name: 'id', label: '№', field: 'id', sortable: true },
  { name: 'name', label: 'Название', field: 'name', sortable: false },
  { name: 'room', label: 'Помещение', field: 'room', sortable: false },
  { name: 'desc', label: 'Описание', field: 'desc', sortable: false },
  { name: 'metrics', label: 'м2/шт', field: 'metrics', sortable: false },
  { name: 'price', label: 'Цена, руб.', field: 'price', sortable: false },
  { name: 'deadline', label: 'Срок, дн', field: 'dedline', sortable: false },
  { name: 'total', label: 'Итого', field: 'total', sortable: false },
  { name: 'procent', label: 'Ставка', field: 'procent', sortable: false },
  { name: 'agent', label: 'Агентские, руб.', field: 'agent', sortable: false },
  { name: 'status', label: 'Статус', field: 'status', sortable: false },
  { name: 'brand', label: 'Производитель', field: 'brand', sortable: false },
  { name: 'code', label: 'Артикул', field: 'code', sortable: false },
  { name: 'color', label: 'Цвет', field: 'color', sortable: false },
  { name: 'file', label: 'Файл', field: 'file', sortable: false },
])


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
    // await estimatesApi.setSelectedProposal(estimateId, proposalId)
    getProject()
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
const dialogDubleEstimate = ref(false)
const modalFalse = () => {
  dialogSecurity.value = false
  dialogExport.value = false
}

// добавление новой позиции сметы
const dialogPosition = ref(false)
const onCreateItem = async (obj) => {
  dialogPosition.value = false
  getProject()
}

// открыть модалку обновления сметы
const dialogUpdate = ref(false)
const openDialogUpdate = (id) => {
  
  idActiveItem.value = id
  dialogUpdate.value = true
}

// обновление позиции сметы
const onUpdateItem = async (bool) => {
  if (bool !== true) dialogUpdate.value = false
  // estimate.value.items = estimate.value.items.map((item) => {
  //   if (item.id === obj.id) {
  //     return obj
  //   }
  //   return item
  // })
  getProject()
}

// открыть редактирование сметы с видимым полем
const onActiveField = ref()
// const dataEdit = ref([])
const onEditModal = (val, field) => {
  console.log(val, field)
  idActiveItem.value = val.id
  onActiveField.value = field
  dialogUpdate.value = true
  // dataEdit.value = val
}

// дублировать позицию сметы
const onDubleItem = async (id) => {
  try {
    const resp = await estimatesApi.duplicateItem(id)
    getProject()
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
    getProject()
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
    const resp = await estimatesApi.getById(idEstimate, userRole, user.role_info.id)
    estimate.value = resp
  } catch (err) {
    console.log(err)
    $q.notify({
      color: 'negative',
      message: 'Произошла ошибка получения данных о смете'
    })
  }
  
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
  delItem: onDelItem
}
const { 
  dialogDelite, 
  dialogDelId, 
  dialogDelName, 
  onActionDel, 
  modalCloseDel, 
  handleModalClose 
} = useDialogDel(actionHandlers)

const val = ref(true)

const getProject = async () => {
  try {
    const resp = await projectsApi.getById(idProject)
    project.value = resp
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getProject()
})


</script>
