<template>  
  <q-dialog
    v-model="dialogPosition"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog estimates-dialog"
  >
    <DialogEdit
      @modalFalse="modalFalse"
      :editValue="dataEdit"
      :activeField="onActiveField"
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
      @modalFalse="modalFalse"
      :editData="dataEdit"
    />
  </q-dialog>

  <q-page class="page-estimates page-estimates-all">
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
        />
      </div>
    </div> 
    <div class="info row justify-between">
      <p class="desc"><b>Проект</b>: г. Краснодар, ул. Ленина, д. 15 тест длинного адреса</p>
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
        switch-toggle-side
        expand-separator
        default-opened
        label="Wifi settings"
        class="estimates-expansion"
      >
        <template v-slot:header>
          <div class="title" @click.stop="true">
            Название сметы, например, освещение
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
            @click.stop="true"
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
            <q-btn
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
            </q-list>
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
                @click.stop="dialogPosition = true"
              >
                <q-icon name="svguse:icons/allIcons.svg#plus" color="grey-8" size="12px" class="q-mr-sm" />
                <div class="block text-grey-5">Добавить позицию</div>
              </q-btn>
              <!-- <q-btn
                rounded
                no-caps
                flat
                color="grey-3"
                class="my-btn my-effect my-btn--outline"
                padding="5.5px 0"
                @click.stop="dialogPosition = true"
              >
                <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="12px" class="q-mr-sm" />
                <div class="block text-grey-5">Редактировать</div>
              </q-btn>
              <q-btn
                rounded
                no-caps
                flat
                color="grey-3"
                class="my-btn my-effect my-btn--outline"
                padding="5.5px 0"
              >
                <q-icon name="svguse:icons/btnIcons.svg#export" color="grey-8" size="11px" class="q-mr-sm" />
                <div class="block text-grey-5">Экспорт</div>
              </q-btn> -->
            </div>
          </div>
        </template>
        <EstimateTable
          :columns="columnsTable"
          :rows="rowTable"
          @editModal="startEditModal"
          @openSmeta="onOpenSmeta"
          @chooseSmeta="onChooseSmeta"
        />
      </q-expansion-item>
      
      <q-expansion-item
        switch-toggle-side
        expand-separator
        default-opened
        label="Wifi settings"
        class="estimates-expansion"
      >
        <template v-slot:header>
          <div class="title" @click.stop="true">
            Название сметы, например, освещение 2
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
            @click.stop="true"
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
            <q-btn
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
            </q-list>
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
                @click.stop="dialogPosition = true"
              >
                <q-icon name="svguse:icons/allIcons.svg#plus" color="grey-8" size="12px" class="q-mr-sm" />
                <div class="block text-grey-5">Добавить позицию</div>
              </q-btn>
              <!-- <q-btn
                rounded
                no-caps
                flat
                color="grey-3"
                class="my-btn my-effect my-btn--outline"
                padding="5.5px 0"
                @click.stop="dialogPosition = true"
              >
                <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="12px" class="q-mr-sm" />
                <div class="block text-grey-5">Редактировать</div>
              </q-btn>
              <q-btn
                rounded
                no-caps
                flat
                color="grey-3"
                class="my-btn my-effect my-btn--outline"
                padding="5.5px 0"
              >
                <q-icon name="svguse:icons/btnIcons.svg#export" color="grey-8" size="11px" class="q-mr-sm" />
                <div class="block text-grey-5">Экспорт</div>
              </q-btn> -->
            </div>
          </div>
        </template>
        <EstimateTable
          :columns="columnsTable"
          :rows="rowTable"
          @editModal="startEditModal"
          @openSmeta="onOpenSmeta"
          @chooseSmeta="onChooseSmeta"
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
      >
        <div class="block text-grey-5">Назад к списку смет</div>
        <q-icon size="18px" name="svguse:icons/allIcons.svg#back" style="margin-left: auto;" />
      </q-btn>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import EstimateTable from 'components/Table/EstimateTable.vue'
import DialogEdit from 'src/pages/Estimates/DialogEdit.vue' 
import DialogSecurity from 'src/pages/Estimates/DialogSecurity.vue'
import DialogExport from 'src/pages/Estimates/DialogExport.vue'
import DialogSettings from 'src/pages/Estimates/DialogSettings.vue'
import ActionBtn from 'components/Table/ActionBtn.vue'

const cutTitle = function(title) {
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
const rowTable = ref([
  {
    id: 1,
    imageUrl: '/smeta.jpg',
    name: {
      title: 'Керамогранит',
      imageUrl: '/smeta.jpg'
    },
    room: 'Спальня',
    desc: 'KERAMA MARAZZI',
    metrics: 20,
    price: '1 200',
    total: 24000,
    deadline: 2,
    status: {
      id: 1,
      name: 'Оплачено',
      user: 'Иван',
      imageUrl: '/icons/stroipro.jpg'
    },
    procent: 15,
    agent: '3 600',
    smetaVal: false,
    smeta: [
      {
        id: 5,
        imageUrl: '/icons/stroipro.jpg',
        name: "ООО «СтройПро»",
        price: "1 200",
        metrics: 25,
        total: "30 000",
        deadline: 30,
        status: {
          id: 3,
          name: 'Не согласовано',
        },
        procent: 15,
        agent: "9 000",
      },
    ],
    link: 'google.com',
    brand: 'Kerama Marazzi',
    code: '325-1200-333',
    color: 'RAL 1005',
    file: 'ZIP, 5 мб',
    new: true,
  },
  {
    id: 2,
    imageUrl: '/smeta.jpg',
    name: {
      title: 'Ламинат',
      imageUrl: ''
    },
    room: 'Спальня',
    desc: '1200*200 мм ',
    metrics: 15,
    price: '1 200',
    total: 18000,
    deadline: 5,
    status: {
      id: 2,
      name: 'Оплачено',
      user: '',
      imageUrl: ''
    },
    procent: 15,
    agent: '3 600',
    link: '',
    brand: 'Porcelanosa',
    code: '325-1200-2',
    color: 'RAL 1020',
    file: 'PDF, 896 кб',
    new: false,
  },
  {
    id: 3,
    imageUrl: '/smeta.jpg',
    name: {
      title: 'Ламинат',
      imageUrl: ''
    },
    room: 'Спальня',
    desc: '1200*200 мм ',
    metrics: 15,
    price: '1 200',
    total: 18000,
    deadline: 5,
    status: {
      id: 3,
      name: 'В работе',
      user: '',
      imageUrl: ''
    },
    procent: 15,
    agent: '3 600',
    link: 'https://quasar.dev/vue-components/tooltip#introduction',
    brand: 'Porcelanosa',
    code: '325-1200-2',
    color: 'RAL 1020',
    file: 'PDF, 896 кб',
    new: true,
  },
  {
    id: 4,
    imageUrl: '/smeta.jpg',
    name: {
      title: 'Керамогранит',
      imageUrl: '/smeta.jpg'
    },
    room: 'Спальня',
    desc: 'KERAMA MARAZZI',
    metrics: 20,
    price: '1 200',
    total: 24000,
    deadline: 2,
    status: {
      id: 2,
      name: 'Оплачено',
      user: 'Иван',
      imageUrl: '/icons/stroipro.jpg'
    },
    procent: 15,
    agent: '3 600',
    smetaVal: false,
    smeta: [
      {
        id: 5,
        imageUrl: '/icons/stroipro.jpg',
        name: "ООО «СтройПро»",
        price: "1 200",
        metrics: 25,
        total: "30 000",
        deadline: 30,
        status: {
          id: 3,
          name: 'Не согласовано',
        },
        procent: 15,
        agent: "9 000",
      },
    ],
    link: 'google.com',
    brand: 'Kerama Marazzi',
    code: '325-1200-333',
    color: 'RAL 1005',
    file: 'ZIP, 5 мб',
    new: false,
  },
  {
    id: 5,
    imageUrl: '/smeta.jpg',
    name: {
      title: 'Ламинат',
      imageUrl: ''
    },
    room: 'Спальня',
    desc: '1200*200 мм ',
    metrics: 15,
    price: '1 200',
    total: 18000,
    deadline: 5,
    status: {
      id: 3,
      name: 'Скомплектовано',
      user: '',
      imageUrl: ''
    },
    procent: 15,
    agent: '3 600',
    link: 'https://quasar.dev/vue-components/tooltip#introduction',
    brand: 'Porcelanosa',
    code: '325-1200-2',
    color: 'RAL 1020',
    file: 'PDF, 896 кб',
    new: true,
  },
])


const dialogPosition = ref(false)
const dialogSecurity = ref(false)
const dialogExport = ref(false)
const dialogSettings = ref(false)
const dataEdit = ref([])
const onActiveField = ref()

function startEditModal(val, field) {
  onActiveField.value = field
  dialogPosition.value = true
  dataEdit.value = val
}
function onOpenSmeta(val) {
  rowTable.value.filter((item) => {
    if (item.id === val) {
      item.smetaVal = !item.smetaVal
    }
  })
}
function onChooseSmeta(smeta, val) {
  rowTable.value.filter((item) => {
    if (item.id === smeta) {
      item.price = val.price
      item.metrics = val.metrics
      item.total = val.total
      item.deadline = val.deadline

      item.status.id = val.status.id
      item.status.name = val.status.name

      item.status.user = val.name
      // item.status.imageUrl = val.imageUrl
      item.status.imageUrl = '/icons/anton.jpg'

      item.procent = val.procent
      item.agent = val.agent
      item.smetaVal = !item.smetaVal
    }
  })
}
const val = ref(true)
const modalFalse = () => {
  dialogPosition.value = false
  dialogSecurity.value = false
  dialogExport.value = false
  dialogSettings.value = false
}

</script>
