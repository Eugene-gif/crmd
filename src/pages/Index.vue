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
      if (user.role.id === 2) {
        window.location.href = '/#/designer/profile/2'
      } if (user.role.id === 3) {
        window.location.href = '/#/contractor/profile/2'
      }
    })
    return {

    }
  }
  
})
</script>
