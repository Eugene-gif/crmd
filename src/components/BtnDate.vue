<template>
  <div class="date-field">
    <q-date
      v-model="date"
      minimal
      mask="D MMMM YYYY"
      today-btn
      :class="{ active: dateActive }"
      @update:model-value="dateActive = !dateActive"
    />
    <q-btn
      unelevated 
      no-caps
      color="grey-3"
      :label="date"
      class="full-width btn-date my-effect h-dark"
      icon-right="svguse:icons/allIcons.svg#date-ico"
      @click="dateActive = !dateActive"
    >
    </q-btn>
  </div>
</template>

<script>
import { ref } from 'vue'

export default ({
  name: 'BtnDate',
  setup () {
    return {
      date: ref('Выберите дату'),
      dateActive: ref(false),
      monthList: [

      ]
    }
  }
})
</script>
