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
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'AuthLayout',
  components: {},

  setup () {
    onMounted(() => {
      let user = localStorage.getItem('userInfo')
      if (user) {
        let userObj = JSON.parse(user)

        if (userObj.email_verified_at === null) {
          window.location.href = '/#/setemail'
        }
        if (userObj.role.code === '') {
          window.location.href = '/#/role'
        }
        
      }
      
    })
    return {
      
    }
  }
})
</script>
