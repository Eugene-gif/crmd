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
