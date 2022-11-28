<template>
  <q-dialog
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog contractor-dialog-share"
  >
    <DialogManager 
      @modalFalse="modalFalse" 
      :modalCustom="modalCustom" 
      :data="editDataManager" 
    />
  </q-dialog>
  <q-dialog
    v-model="dialogAffiliate"
    :maximized="maximizedToggle"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog contractor-dialog-share"
  >
    <DialogManager 
      @modalFalse="modalFalseAffiliate" 
      :modalCustom="modalCustom" 
      :data="editDataAffiliate" 
    />
  </q-dialog>

  <q-expansion-item
    expand-separator
    default-opened
    class="q-expansion-my"
  >
    <template v-slot:header>
      <div class="title">
        Филиалы
      </div>
    </template>

    <div
      class="item"
      v-for="item in fillials"
      :key="item"
    >
      <div class="item-sec">
        <div class="title">
          {{item.title}}
        </div>
        <div class="txt-content">
          <span v-html="item.timework"></span>
        </div>
      </div>
      <div class="btn-sec">
        <q-btn
          unelevated 
          no-caps
          flat
          class="my-btn my-effect h-opacity btn-add"
          padding="0"
        >
          <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="16px" class="q-mr-sm" />
          <span class="block text-grey-5">Редактировать</span>
        </q-btn>
        <q-btn
          unelevated 
          no-caps
          flat
          class="my-btn my-effect h-opacity btn-add"
          padding="0"
        >
          <q-icon name="svguse:icons/btnIcons.svg#delete" color="grey-8" size="16px" class="q-mr-sm" />
          <span class="block text-grey-5">Удалить</span>
        </q-btn>
      </div>
    </div>
    <q-btn
      unelevated 
      no-caps
      class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
      padding="8.5px 25.5px"
    >
      <span class="block text-grey-5">Добавить филиал</span>
      <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" color="black" style="margin-left: auto;" />
    </q-btn>
  </q-expansion-item>

  <q-expansion-item
    expand-separator
    default-opened
    class="q-expansion-my"
  >
    <template v-slot:header>
      <div class="title">
        Менеджеры
      </div>
    </template>

    <div
      class="item"
      v-for="item in managers"
      :key="item"
    >
      <div class="item-sec">
        <div class="title">
          {{item.title}}
        </div>
        <div class="txt-content">
          Должность: {{item.jobtitle}}<br>
          Email: {{item.email}}<br>
          Тел: {{item.phone}}
        </div>
      </div>
      <div class="btn-sec">
        <q-btn
          unelevated 
          no-caps
          flat
          class="my-btn my-effect h-opacity btn-add"
          padding="0"
          @click="editManager(item)"
        >
          <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="16px" class="q-mr-sm" />
          <span class="block text-grey-5">Редактировать</span>
        </q-btn>
        <q-btn
          unelevated 
          no-caps
          flat
          class="my-btn my-effect h-opacity btn-add"
          padding="0"
          @click="delManager(item.id)"
        >
          <q-icon name="svguse:icons/btnIcons.svg#delete" color="grey-8" size="16px" class="q-mr-sm" />
          <span class="block text-grey-5">Удалить</span>
        </q-btn>
      </div>
    </div>
    <q-btn
      unelevated 
      no-caps
      class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
      padding="8.5px 25.5px"
      @click="dialog = true"
    >
      <span class="block text-grey-5">Добавить менеджера</span>
      <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" color="black" style="margin-left: auto;" />
    </q-btn>
  </q-expansion-item>
</template>

<script>
import { ref, onMounted } from 'vue'
import DialogManager from 'pages/Contractor/DialogManager.vue'
import { contractorApi } from 'src/api/contractor'
import { useQuasar } from 'quasar'

export default {
  name: 'ProfileFillials',
  components: {
    DialogManager
  },
  setup() {
    const $q = useQuasar()
    const modalCustom = ref(false)

    // fillals
    const dialogAffiliate = ref(false)
    const fillials = ref([
      {
        title: 'г. Краснодар, ул. Красных Партизан, д. 232, оф 307',
        timework: 'ПН — ПТ: с 9:00 до 20:00, <br>СБ: с 10:00 до 17:00, ВС: Выходной'
      },
      {
        title: 'г. Краснодар, ул. Красных Партизан, д. 232, оф 307',
        timework: 'ПН — ПТ: с 9:00 до 20:00, <br>СБ: с 10:00 до 17:00, ВС: Выходной'
      },
    ])
    const editDataAffiliate = ref({})
    async function getAllAffiliate() {
      try {
        await contractorApi.getAllAffiliate().then(resp => {
          managers.value = resp
        })
      } catch (err) {
        $q.notify({
          color: 'negative',
          message: 'произошла ошибка'
        })
        console.log(err)
      }
    }
    function editAffiliate(object) {
      editDataAffiliate.value = object
      modalCustom.value = true
      dialogAffiliate.value = true
    }
    async function delManager(id) {
      try {
        await contractorApi.delAffiliate(id, 'm').then(resp => {
          getAllAffiliate()
          $q.notify({
            color: 'positive',
            message: 'Менеджер удален'
          })
        })
      } catch (err) {
        $q.notify({
          color: 'negative',
          message: 'произошла ошибка'
        })
        console.log(err)
      }
    }


    
    // manager
    const managers = ref([])
    const editDataManager = ref({})
  
    async function getAllManagers() {
      try {
        await contractorApi.getAllManagers().then(resp => {
          managers.value = resp
        })
      } catch (err) {
        $q.notify({
          color: 'negative',
          message: 'произошла ошибка'
        })
        console.log(err)
      }
    }
    function editManager(object) {
      editDataManager.value = object
      modalCustom.value = true
      dialog.value = true
    }
    async function delManager(id) {
      try {
        await contractorApi.delManager(id, 'm').then(resp => {
          getAllManagers()
          $q.notify({
            color: 'positive',
            message: 'Менеджер удален'
          })
        })
      } catch (err) {
        $q.notify({
          color: 'negative',
          message: 'произошла ошибка'
        })
        console.log(err)
      }
    }

    const dialog = ref(false)

    onMounted(() => {
      getAllManagers()
    })

    return {
      fillials,
      dialogAffiliate,
      editDataAffiliate,

      managers,
      editDataManager,
      dialog,
      modalCustom,
      getAllManagers,
      editManager,
      delManager,

      modalFalse(val) {
        dialog.value = false
        modalCustom.value = false
        editDataManager.value = null
        if (val != null) {
          $q.notify({
            color: 'positive',
            message: val
          })
        }
        getAllManagers()
      },
      modalFalseAffiliate(val) {
        dialogAffiliate.value = false
        modalCustom.value = false
        editDataAffiliate.value = null
        if (val != null) {
          $q.notify({
            color: 'positive',
            message: val
          })
        }
        getAllManagers()
      },
    }
  },
}
</script>