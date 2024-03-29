<template>
  <q-dialog
    v-model="dialog"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog estimates-dialog estimates-dialog-create"
  >
    <DialogCreate 
      @add="modalCreate" 
      :project_id="project_id"
    />
  </q-dialog>
  <q-dialog
    v-model="dialogDelite"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog"
  >
    <DialogDelite @modalFalse="handleModalClose" />
  </q-dialog>

  <q-expansion-item
    expand-separator
    default-opened
    class="estimates hidden-settings-icon"
  >
  <template v-slot:header>
    <div class="title">
      Сметы
    </div>
  </template>
    <q-card>

      <q-card-section>
        <div class="title">
          Общая смета проекта
        </div>
        <div class="text">
          Сумма всех<br>
          отдельных смет
        </div>
      </q-card-section>
      <q-card-section
        v-for="item in estimates" :key="item"
        @dblclick="onActionOpen(item.id)"
      >
        <div class="title">{{item.name}}</div>
        <q-btn
          rounded
          unelevated
          no-caps
          padding="4.5px 10px"
          class="
            bg-negative 
            text-white 
            my-btn 
            my-btn-14 
            my-effect 
            h-dark
            btn-news
            btn-hide
          "
        />
        <!-- :label="`Новых предложений: ${item.news}`"
          :class="{'btn-hide': item.news === null}" -->
        <div class="text">
          Изменена: {{item.updated_at}}
          <span>Создана: {{item.created_at}}</span>
        </div>
        <div class="access q-pr-xs">
          <div class="text">
            Общий доступ
          </div>
          <q-icon
            name="svguse:icons/btnIcons.svg#link" 
            size="18px" 
            class="q-mr-sm link-icon" 
            v-if="userRole === 'designer'"
          >
            <q-item class="link-all" :to="`/estimates/${item.id}`"></q-item>
            <div class="circle"></div>
          </q-icon>
        </div>
        <q-list class="q-list-share">
          <!-- <q-item
            v-for="el in item.share.slice(0, 1)" :key="el.link"
          >
            <q-btn :to="el.link">
              <img :src="el.icon" alt="">
            </q-btn>
          </q-item>
          <q-item
            v-if="item.share.length > 1"
          >
            <q-btn class="q-td-share__btn__limit" :label="`+${item.share.length - 1}`" />
          </q-item> -->
          <q-item class="q-item-add" v-if="userRole === 'designer'">
            <q-btn class="q-td-share__btn__add" icon="svguse:icons/allIcons.svg#plus" />
          </q-item>
          <q-item class="q-item-action" v-if="userRole === 'designer'">
            <ActionBtn 
              :propsEl="item.id"
              :offsetYX="[55, -266]"
              :actionfunc="actionfunc"
              @open="onActionOpen(item.id)"
              @actionDel="onActionDel('del', item.id)"
            />
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section 
        class="q-card-add" 
        @click="dialog = true" 
        v-if="userRole === 'designer'"
      >
        <q-btn
          rounded
          unelevated
          no-caps
          icon="svguse:icons/btnIcons.svg#plus"
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite lg-visible"
          @click="dialog = true"
        />
        <div class="text lg-visible">
          Добавить<br>
          смету
        </div>
        <q-btn
          unelevated
          no-caps
          outline
          class="bg-white text-grey-3 my-btn my-effect my-btn--outline mb-visible"
          style="border-radius: 10px;"
          padding="24px 24px 24px 19px"
        >
          <div class="block text-grey-5">Добавить</div>
          <q-icon
            name="svguse:icons/allIcons.svg#plus"
            size="12px"
            color="black"
            style="opacity: 0.3;margin-left: auto;"
          />
        </q-btn>
      </q-card-section>
      
    </q-card>
  </q-expansion-item>
</template>

<script setup>
  import { ref, defineComponent, onMounted } from "vue"
  import { estimatesApi } from 'src/api/estimates'
  import ActionBtn from 'components/Table/ActionBtn.vue'
  import DialogCreate from 'src/pages/Estimates/DialogCreate'
  import DialogDelite from 'src/components/dialog/DialogDelite'
  import useDialogDel from 'src/composable/useDialogDel'
  import { getFormatDate } from 'src/composable/getFormatDate'
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router'

  const $q = useQuasar()
  const dialog = ref(false)
  const estimates = ref()
  const router = useRouter()

  const props = defineProps({
    data: Array,
    project_id: String,
    userRole: String
  })

  const actionfunc = ref([
    {
      title: 'Открыть',
      emmit: 'open'
    },
    {
      title: 'Настройки доступа',
      emmit: ''
    },
    {
      title: 'Изменить',
      emmit: ''
    },
    {
      title: 'Дублировать',
      emmit: ''
    },
    {
      title: 'Экспорт сметы',
      emmit: ''
    },
    {
      title: 'Удалить',
      emmit: 'actionDel'
    },
  ])

  const onActionOpen = (id) => {
    router.push(`/estimates/${id}`)
  }
  

  // инициализация функционала окна удаления
  const actionHandlers = {
    del: delEstimate,
  }
  const { 
    dialogDelite, 
    dialogDelId, 
    dialogDelName, 
    onActionDel, 
    modalCloseDel, 
    handleModalClose 
  } = useDialogDel(actionHandlers)
  
  // useDate

  // создание сметы
  function modalCreate(obj) {
    dialog.value = false
    
    if (obj) {
      // if (obj.created_at) obj.created_at = obj.created_at.split(' ')[1]
      // if (obj.updated_at) obj.updated_at = obj.updated_at.split(' ')[1]

      estimates.value.push(obj)
      $q.notify({
        color: 'positive',
        message: 'Смета добавлена'
      })
    }
  }

  async function delEstimate(id) {
    try {
      await estimatesApi.del(id)
      estimates.value = estimates.value.filter((item) => item.id !== id)
      $q.notify({
        color: 'positive',
        message: 'Смета удалена'
      })
    } catch(err) {
      console.log(err)
    }
  }

  onMounted(() => {
    estimates.value = props.data
    estimates.value.map((el) => {
      el.updated_at = getFormatDate(el.updated_at)
      el.created_at = getFormatDate(el.created_at)
    })
  })

</script>

