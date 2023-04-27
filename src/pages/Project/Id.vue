<template>
  <q-dialog
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog projects-dialog projects-dialog-create"
  >
    <Dialog @modalFalse="modalFalse" />
  </q-dialog>
  
  <q-page class="page-project">

    <LoaderDate
      v-show="loading"
    />

    <div class="row justify-between items-center head">
      <div class="text-h2">{{generalInfo.name}}</div>
      <q-icon size="18px" class="mb-visible" name="svguse:icons/allIcons.svg#back" />
      <div class="head-btns">
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite lg-visible"
          label="Назад"
          to="/projects"
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
        class="q-mr-xs my-btn my-effect my-btn--outline q-btn-info"
        @click="dialog = true"
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
        <q-icon name="svguse:icons/btnIcons.svg#delete" color="grey-8" size="17px" class="q-mr-md" />
        <div class="block text-grey-5">Удалить проект</div>
      </q-btn>
    </div>

    <q-list class="project-sections" v-if="!loading">
      <DashboardComp 
        :info="generalInfo"
        :orderer="data.orderer"
        :type="type"
        v-if="generalInfo"
      />

      <DiagramGant />
      <DocumentsProject />
      <ExplicationsProject :type="type" />
      <EstimatesProject :data="data.estimates" v-if="data.estimates" />
      <AlbumsProject :data="data.albums" v-if="data.albums" />
      <FilesProject :data="data.files" v-if="data.files" />      

      <div class="q-card-prev">
        <q-btn
          unelevated
          no-caps
          outline
          class="bg-white text-grey-3 my-btn my-effect с"
          style="border-radius: 10px;width: 100%;"
          padding="24px 24px 24px 19px"
        >
          <div class="block text-grey-5">Назад к списку проектов</div>
          <q-icon size="18px" name="svguse:icons/allIcons.svg#back" style="margin-left: auto;" />
        </q-btn>
      </div>

    </q-list>
  </q-page>
</template>

<script>
import Dialog from 'pages/Project/dialog-create.vue'
import LoaderDate from 'src/components/LoaderDate.vue'

import DashboardComp from "components/projects/id/DashboardComp"
import DiagramGant from "components/projects/id/DiagramGant"
import DocumentsProject from "components/projects/id/DocumentsProject"
import ExplicationsProject from "components/projects/id/ExplicationsProject"
import EstimatesProject from "components/projects/id/EstimatesProject"
import AlbumsProject from "components/projects/id/AlbumsProject"
import FilesProject from "components/projects/id/FilesProject"

import { projectsApi } from 'src/api/projects'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'


export default {
  name: 'PageFinance',
  components: {
    Dialog,
    DashboardComp,
    LoaderDate,
    DiagramGant,
    DocumentsProject,
    ExplicationsProject,
    EstimatesProject,
    AlbumsProject,
    FilesProject,
  },
  setup () {
    const route = useRoute()
    const projectId = ref(route.params.id)
    const loading = ref(false)
    const dialog = ref(false)


    const generalInfo = ref({})
    const data = ref({})
    async function getProject() {
      loading.value = true
      try {
        const resp = await projectsApi.getById(projectId.value)
        data.value = resp
        generalInfo.value = {
          id: projectId.value,
          project_type_id: resp.project_type_id,
          orderer_id: resp.orderer_id,
          name: resp.name,
          address: resp.address,
          square: resp.square,
          emoji: resp.emoji,
          readiness: resp.readiness,
          image: resp.image,
          project_type: resp.project_type,
          cost: resp.cost,
        }
      } catch (err) {
        console.log(err)
      }
      loading.value = false
    }

    const type = ref([])
    async function getType() {
      try {
        await projectsApi.getTypes()
        .then(resp => {
          type.value = resp
        })
      } catch (err) {
        console.log(err)
      }      
    }

    onMounted( async() => {
      await getType()
      await getProject()
    })

    return {
      generalInfo,
      loading,
      data,
      route,
      projectId,
      getProject,

      dialog,
      
      type,
      getType,

      maximizedToggle: ref(true),
      
      modalFalse() {
        dialog.value = false
      }
    }
  }
}
</script>

