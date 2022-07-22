<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <q-header class="bg-white">
      
      <q-toolbar>
        
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default ({
  name: 'AuthLayout',
  components: {},

  setup () {
    
    return {
      
    }
  }
})
</script>
