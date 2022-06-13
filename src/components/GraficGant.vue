<template>
  <div class="graficgant">
    <div class="info">
      
    </div>
    <div class="grafic">

    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default ({
  name: 'BtnDate',
  setup () {
    return {
      date: ref('Выберите дату'),
      
    }
  }
})
</script>
