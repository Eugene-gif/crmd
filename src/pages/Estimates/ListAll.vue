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
    v-model="dialogDubleEstimate"
    transition-show="fade"
    transition-hide="fade"
    class="my-dialog"
  >
    <DialogDuble
      :idEstimate="activeEstimate.idEstimate"
      :estimateName="activeEstimate.estimateName"
      :project_id="activeEstimate.project_id"
    />
  </q-dialog>

  <q-page class="page-estimates page-estimates-all-project">
    <div class="row justify-between items-center">
      <div class="text-h2">Сметы</div>
    </div>

    <q-expansion-item
      v-for="(project, index) in projects"
      :key="project.id"
      expand-separator
      :default-opened="index === 0?? true"
      class="q-expansion-my"
      @click.native="openEstimatesProject(project.id, index)"
    >
      <template v-slot:header >
        <div class="title">
          {{ project.emoji }} {{ project.name }}
        </div>
        <q-btn flat padding="0" no-caps label="Открыть проект" class="btn-open q-ml-auto lg-visible" @click="(() => { router.push(`/projects/${project.id}`) })" />
      </template>
      <div class="row mb-visible full-width text-center">
        <q-btn
          no-caps
          unelevated
          rounded
          padding="8.5px 65px"
          color="grey-3"
          label="Открыть проект"
          class="btn-open text-grey-5"
          @click="(() => { router.push(`/projects/${project.id}`) })"
        />
      </div>

      <q-table
        flat
        :rows="project?.estimates"
        :columns="columns"
        :pagination="pagination"
        row-key="id"
        hide-pagination
        class="my-table project-table table-head-no-pdd table-list"
      >
        <template v-slot:header-cell-id="props">
          <q-th :props="props" class="q-th__id">
          </q-th>
        </template>
        <template v-slot:header-cell-action="props">
          <q-th :props="props">
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


        <template #body="props">
          <q-tr 
            class="tr-all" 
            style="cursor: pointer;"
            @dblclick="(() => { router.push(`/estimates/project/${props.row.project_id}`) })"
          >
            <q-td
              key="name"
              :props="props"
              class="q-td-name"
              style="width: 65%"
            >
              <div class="content">Общая смета проекта</div>
            </q-td>
            <q-td
              key="changed"
              :props="props"
              class="q-td-changed"
            >
              <div class="content" style="width: 102px;">Сумма всех отдельных смет</div>
            </q-td>
            <q-td
              key="created"
              :props="props"
              class="q-td-created"
            >
              <div class="content"></div>
            </q-td>
            <q-td
              key="security"
              :props="props"
              class="q-td-status"
            >
              <div class="content">

              </div>
            </q-td>
          </q-tr>

          <q-tr
            :props="props"
            style="cursor: pointer;"
            @dblclick="(() => { router.push(`/estimates/${props.row.id}`) })"
          >
            <q-td
              key="name"
              :props="props"
              class="q-td-name"
              style="width: 65%"
            >
              <div class="content row">
                {{props.row.name}}
                <div class="row" style="flex: 1;">
                  <q-btn
                    rounded
                    unelevated
                    no-caps
                    padding="2px 15px"
                    style="width: max-content;height: 19px;border-radius: 13px;"
                    class="bg-negative my-btn my-btn-14 no-cursor q-ml-xs btn-new q-ml-sm btn-new-single"
                    v-if="props.row.isNew !== null"
                  >
                    <span class="block text-white" style="font-size:10px;">{{ props.row.isNew }}</span>
                  </q-btn>
                  <q-btn
                    rounded
                    unelevated
                    no-caps
                    padding="2px 24px"
                    style="width: max-content;height: 19px;border-radius: 13px;"
                    class="bg-negative my-btn my-btn-14 no-cursor q-ml-xs btn-new q-ml-auto q-mr-md btn-new-all"
                  >
                    <span class="block text-white" style="font-size:10px;">Новых: 2</span>
                  </q-btn>
                </div>
              </div>

            </q-td>
            <q-td
              key="changed"
              :props="props"
              class="q-td-changed"
            >
              <div class="content">{{props.row.updated_at}}</div>
            </q-td>
            <q-td
              key="created"
              :props="props"
              class="q-td-created"
            >
              <div class="content">{{props.row.created_at}}</div>
            </q-td>
            <q-td
              key="security"
              :props="props"
              class="q-td-security"
            >
              <div class="content row flex-wrap" style="width: 196px;" v-if="userRole === 'contractor'">
                <!-- <span
                  v-for="el in props.row.security"
                  :key="el"
                >

                </span> -->
                <span>Можно сделать предложение,</span>
                <span>прогноз скрыт</span>
              </div>
              <div class="content row" style="width: 196px;" v-if="userRole === 'designer'">

                <div class="row items-center " style="flex: 1;">
                  <q-btn flat round class="bg-grey-3" padding="9px">
                    <q-icon size="12px" name="svguse:icons/allIcons.svg#plus" color="black" />
                  </q-btn>
                  <q-list class="list-share q-ml-sm">
                    <q-item
                      v-for="el in 1" :key="el"
                      class="q-item-none"
                    >
                      <q-btn :to="el.link">
                        <img src="/icons/anton.jpg" alt="">
                      </q-btn>
                    </q-item>
                    <q-btn class="q-td-share__btn__limit no-cursor q-ml-sm" :label="`+5`" />
                  </q-list>
                  <q-icon
                    name="svguse:icons/btnIcons.svg#link"
                    size="18px"
                    class="link-icon share q-ml-auto"
                  >
                    <q-item class="link-all"></q-item>
                    <div class="circle"></div>
                  </q-icon>
                  <!-- <q-item
                    v-if="item.share.length > 1"
                  >
                    <q-btn class="q-td-share__btn__limit" :label="`+${item.share.length - 1}`" />
                  </q-item> -->
                  <ActionBtn
                    :propsEl="props.row.id"
                    :offsetYX="[55, -257]"
                    :actionfunc="actionfunc"
                    class="q-ml-auto"
                    @actionOpen="(() => { router.push(`/estimates/${props.row.id}`) })"
                    @actionChange="openEditEstimate(props.row.id)"
                    @actionDuble="openDubleDialog(props.row.id, props.row.project_id, props.row.name)"
                    @actionDel="onActionDel('delEstimate', props.row.id)"
                  />

                </div>

              </div>
            </q-td>

          </q-tr>
        </template>
        <template #bottom>
          <q-tr
            :props="props"
          >
            <q-btn
              unelevated
              no-caps
              class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite mb-visible"
            >
              <div class="block">Новый документ из шаблонов</div>
              <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" />
            </q-btn>
          </q-tr>
        </template>
      </q-table>

    </q-expansion-item>
  </q-page>
</template>

<script setup>
import { inject } from 'vue'
import { ref, onMounted } from 'vue'
import { estimatesApi } from 'src/api/estimates'
import { projectsApi } from 'src/api/projects'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import ActionBtn from 'components/Table/ActionBtn.vue'
import DialogDelite from 'src/components/dialog/DialogDelite'
import useDialogDel from 'src/composable/useDialogDel'
import DialogDuble from 'src/pages/Estimates/DialogDuble'

const $q = useQuasar()
const router = useRouter()
const emitter = inject('emitter')
const user = JSON.parse(localStorage.getItem('userInfo'))
const userRole = user.role

const dialogDubleEstimate = ref(false)
const activeEstimate = ref({
  idEstimate: null,
  estimateName: null,
  project_id: null,
})

const columns = ref([
  { name: 'name', label: 'Название сметы', field: 'name', align: 'left', sortable: false },
  { name: 'changed', label: 'Изменена', field: 'changed', align: 'left', sortable: false },
  { name: 'created', label: 'Создана', field: 'created', align: 'left', sortable: false },
  { name: 'security', label: userRole === 'contractor' ? 'Мой доступ' : 'Доступы', field: 'security', align: 'left', sortable: false },
])

const pagination = ref({
  rowsPerPage: 0,
})

const actionfunc = ref([
  {
    title: 'Открыть',
    emmit: 'actionOpen'
  },
  {
    title: 'Настройки доступа',
    emmit: ''
  },
  {
    title: 'Изменить',
    emmit: 'actionChange'
  },
  {
    title: 'Дублировать',
    emmit: 'actionDuble'
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

const actionHandlers = {
  delEstimate: onDelEstimate
}
const {
  dialogDelite,
  dialogDelId,
  dialogDelName,
  onActionDel,
  modalCloseDel,
  handleModalClose
} = useDialogDel(actionHandlers)

// удаление сметы
async function onDelEstimate(id) {
  try {
    await estimatesApi.del(id)
    getProjcts()
    $q.notify({
      color: 'positive',
      message: 'Смета удалена'
    })
  } catch(err) {
    console.log(err)
  }
}

const openDubleDialog = async (idEstimate, project_id, estimateName) => {
  activeEstimate.value.idEstimate = idEstimate
  activeEstimate.value.estimateName = estimateName
  activeEstimate.value.project_id = project_id
  dialogDubleEstimate.value = true
}

const openEditEstimate = (id) => {
  // localStorage.setItem('open_dialog', 'true')
  localStorage.setItem('open_dialog', 'edit')
  router.push(`/estimates/${id}`)
}


const projects = ref([])

const getProjcts = async () => {
  try {
    if (userRole === 'designer') await projectsApi.getAllMy().then(resp => {projects.value = resp})
    else await projectsApi.getAll().then(resp => {projects.value = resp})

    openEstimatesProject(projects.value[0].id, 0)
  } catch(err) {
    console.log(err)
  }
}
const getForProject = async (id) => {
  try {
    const resp = await estimatesApi.getId(id)
    return resp
  } catch(err) {
    console.log(err)
  }
}

const openEstimatesProject = async (idProject, index) => {
  if (projects.value[index].estimates === undefined || projects.value[index].estimates.length < 1) {
    const estimates = await getForProject(idProject)
    projects.value[index].estimates = estimates
  }
}


onMounted(async () => {
  getProjcts()
})

</script>
