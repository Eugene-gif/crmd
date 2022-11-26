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
      window.location.href = '#/contractor/profile/2'
    })
    return {

    }
  }
  
})
</script>
