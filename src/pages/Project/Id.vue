<template>
  
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
      <!-- <div v-if="userRole === 'designer'">
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
      </div> -->
    </div>
    

    <q-list class="project-sections" v-if="!loading">
      <DashboardComp 
        :info="generalInfo"
        :orderer="data.orderer"
        :type="type"
        :projectId="projectId"
        :userRole="userRole"
        v-if="generalInfo"
      />

      <DiagramGant />
      <DocumentsProject />
      <ExplicationsProject 
        :type="type" 
        :id="projectId" 
        :data="data.explications" 
        @update="onUpdateExplication"
        v-if="data.explications"
      />
      <EstimatesProject 
        :data="data.estimates"
        :project_id="projectId"
        v-if="data.estimates"
      />
      <AlbumsProject 
        :data="data.albums" 
        :project_id="projectId" 
        @updateAlbums="onUpdateAlbums"
        v-if="data.albums" 
      />
      <FilesProject 
        :data="data.files" 
        :project_id="projectId" 
        v-if="data.files" 
      />      

      <div class="q-card-prev">
        <q-btn
          unelevated
          no-caps
          outline
          class="bg-white text-grey-3 my-btn my-effect"
          style="border-radius: 10px;width: 100%;"
          padding="24px 24px 24px 19px"
          to="/projects"
        >
          <div class="block text-grey-5">Назад к списку проектов</div>
          <q-icon size="18px" name="svguse:icons/allIcons.svg#back" style="margin-left: auto;" />
        </q-btn>
      </div>

    </q-list>
  </q-page>
</template>

<script setup>
  import LoaderDate from 'src/components/LoaderDate.vue'
  import DashboardComp from "components/projects/id/DashboardComp.vue"
  import DiagramGant from "components/projects/id/DiagramGant"
  import DocumentsProject from "components/projects/id/DocumentsProject"
  import ExplicationsProject from "components/projects/id/ExplicationsProject"
  import EstimatesProject from "components/projects/id/EstimatesProject"
  import AlbumsProject from "components/projects/id/AlbumsProject"
  import FilesProject from "components/projects/id/FilesProject"

  import { projectsApi } from 'src/api/projects'
  import { designerApi } from 'src/api/designer'
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const projectId = ref(route.params.id)
  const loading = ref(true)
  
  let userRole = JSON.parse(localStorage.getItem('userInfo')).role
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

  const creater = ref({})
  async function getCreater() {
    try {
      creater.value = await designerApi.getInfoDesigner(data.value.user_id)
    } catch (err) {
      console.log(err)
    }      
  }

  function onUpdateAlbums(array) {
    data.value.albums = array
  }
  function onUpdateExplication(array) {
    data.value.explications = array
  }

  onMounted( async() => {
    await getType()
    await getProject()
    await getCreater()
  })

</script>

