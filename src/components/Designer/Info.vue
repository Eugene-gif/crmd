<template>
  <div class="info-1">
    <div class="continer">
      <div class="item item-mb-nowrap">
        <div class="title title-mowrap">
          Мои заказчики
          <q-btn class="circle-plus bg-positive" flat to="/clients" @click.stop="emitOpenDialog">
            <q-icon size="12px" name="svguse:icons/allIcons.svg#plus" color="white" />
          </q-btn>
        </div>
        <q-btn v-if="!listUsers.length" :loading="!listUsers.length" flat full-width/>
        <UsersOnline :list="listUsers" v-if="listUsers.length" />
      </div>
      <div class="item">
       
      </div>
      <div class="item">
        <div class="title">Мои подрядчики</div>
        <!-- <div class="null-text">Пока не добавлены</div> -->
        <q-btn v-if="!listUsers.length" :loading="!listUsers.length" flat full-width/>
        <UsersOnline :list="listUsers" v-if="listUsers.length" />
      </div>
      <div class="item mb-no-mt">
        <q-btn 
          class="btn-base btn-flat" 
          flat 
          no-caps 
          label="База подрядчиков" 
          padding="0" 
          to="/contractor"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { orderersApi } from 'src/api/orderers'
import UsersOnline from 'components/Contractor/Profile/UsersOnline'

const listUsers = ref([])

const emitOpenDialog = () => {
  localStorage.setItem('open_dialog', 'true')
}

const getAll = async () => {
  try {
    const resp = await orderersApi.getClients()
    listUsers.value = resp
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getAll()
})

</script>