<template>
  <q-layout class="auth-layout">
    <q-header>
      <q-toolbar>
        <q-item-label
          header
        >
          CRMD 
        </q-item-label>
      </q-toolbar>
    </q-header>

    <q-page-container>      
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'AuthLayout',
  components: {},

  setup () {
    onMounted(() => {
      let user = localStorage.getItem('userInfo')
      let userObj = JSON.parse(user)

      console.log(user)
      if (userObj.role === '') {
        window.location.href = '/#/role'
      }
      if (userObj.email_verified_at === null) {
        window.location.href = '/#/setemail'
      }
      
      
    })
    return {
      
    }
  }
})
</script>
