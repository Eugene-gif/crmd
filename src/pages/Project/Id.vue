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
  
  <q-page class="page-project">
    <div class="row justify-between items-center head">
      <div class="text-h2">Название проекта</div>
      <q-icon size="18px" class="mb-visible" name="svguse:icons/allIcons.svg#back" />
      <div class="head-btns">
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite lg-visible"
          label="Назад"
        />
      </div>
    </div>
    <div class="row items-center header-btns">
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white q-mr-xs my-btn my-effect h-dark"
        label="Выставить счет"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white my-btn my-effect h-dark q-mr-xs"
        label="Указать поступление средств"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white my-btn my-effect h-dark q-mr-xs"
        label="План-график"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white my-btn my-effect h-dark q-mr-xs"
        label="Сметы"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white my-btn my-effect h-dark q-mr-xs"
        label="Финансы"
      />
    </div>
    <div class="row items-center header-btns-2">
      <q-btn
        rounded
        no-caps
        outline
        color="grey-3"
        class="q-mr-xs my-btn my-effect h-dark"
      >
        <q-icon name="svguse:icons/btnIcons.svg#user" size="16px" class="q-mr-md">
          <sup>
            3
          </sup>
        </q-icon>
        <q-icon name="svguse:icons/btnIcons.svg#link" size="18px" class="q-mr-md" />
        <div class="block text-grey-5">Настройки доступа</div>
      </q-btn>
      <q-btn
        rounded
        no-caps
        outline
        color="grey-3"
        class="my-btn my-effect h-dark q-mr-xs"
      >
        <q-icon name="svguse:icons/btnIcons.svg#edit" size="17px" class="q-mr-sm" />
        <div class="block text-grey-5">Редактировать</div>
      </q-btn>
      <q-btn
        rounded
        no-caps
        outline
        color="grey-3"
        class="my-btn my-effect h-dark q-mr-xs"
      >
        <q-icon name="svguse:icons/btnIcons.svg#delete" size="17px" class="q-mr-sm" />
        <div class="block text-grey-5">Удалить проект</div>
      </q-btn>
    </div>

    <q-list class="project-sections">
      <q-expansion-item
        expand-separator
        default-opened
        label="Wifi settings"
        class="dashboard"
      >
      <template v-slot:header>
        <div class="title">
          Дашборд
        </div>
        <q-icon name="svguse:icons/allIcons.svg#settings" size="17px" class="settings-icon" @click.stop="true" />
      </template>
      
        <q-card>
          <q-card-section>
            <q-item>
              
            </q-item>
            <q-item>
              
            </q-item>
          </q-card-section>
          <q-card-section>
            <img src="~assets/project-1.jpg" alt="">
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
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

export default {
  name: 'PageFinance',
  components: {
    Dialog,
    ActionBtn
  },
  setup () {
    const dialog = ref(false)

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
      dialog,
      maximizedToggle: ref(true),
      modalFalse() {
        dialog.value = false
      }
    }
  }
}
</script>
