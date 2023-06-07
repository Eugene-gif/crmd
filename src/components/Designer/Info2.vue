<template>
  <div class="info-2 info-2-">
    <div class="container">
      <div class="item">
        <div class="title">
          Проектов
          <q-btn class="circle-plus bg-positive" flat to="/projects" @click.stop="emitOpenDialog">
            <q-icon size="12px" name="svguse:icons/allIcons.svg#plus" color="white" />
          </q-btn>
        </div>
        <div class="number">
          {{ projects.length }}
        </div>
      </div>

      <div class="item">
        <div class="title">
          Получено от заказчиков
          <div class="circle-plus bg-positive">
            <q-icon size="12px" name="svguse:icons/allIcons.svg#plus" color="white" />
          </div>
        </div>
        <div class="number">
          15 500 000 руб.
        </div>
      </div>

      <div class="item">
        <div class="title">
          Получено агентских
          <div class="circle-plus bg-positive">
            <q-icon size="12px" name="svguse:icons/allIcons.svg#plus" color="white" />
          </div>
        </div>
        <div class="number">
          250 000 руб.
        </div>
      </div>

      <div class="item">
        <div class="title" style="display: block;">
          Ожидается агентских
        </div>
        <div class="number">
          50 000 руб.
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { projectsApi } from 'src/api/projects'

const tab = ref()
const projects = ref([])

const getProjects = async () => {
  try {
    await projectsApi.getAllMy().then(resp => {
      projects.value = resp
    })
  } catch (err) {
    console.log(err)
  }
}

const emitOpenDialog = () => {
  localStorage.setItem('open_dialog', 'true')
}

onMounted( () => {
  getProjects()
})

</script>