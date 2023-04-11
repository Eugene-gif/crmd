<template>
  <q-page class="flex flex-center">
    
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    onMounted(() => {
      let user = JSON.parse(localStorage.getItem('userInfo'))
      let userRole = user.role.code ? user.role.code : user.role_info.code 
      
      if (userRole === 'designer') {
        window.location.href = '/#/designer/profile/2'
      } if (userRole === 'contractor') {
        window.location.href = '/#/contractor/profile/2'
      }
    })
    return {

    }
  }
  
})
</script>
