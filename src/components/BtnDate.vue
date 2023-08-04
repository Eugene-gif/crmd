<template>
  <div class="date-field">
    <q-date
      v-model="date"
      minimal
      mask="D-M-YYYY"
      today-btn
      :class="{ active: dateActive}"
      @update:model-value="update"
    />
    <q-btn
      unelevated 
      no-caps
      color="grey-3"
      :label="dateInfo"
      class="full-width btn-date"
      icon-right="svguse:icons/allIcons.svg#date-ico"
      @click="toggleDate"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  addClass: String,
  info: String
})

const emit = defineEmits(['getTime'])

const dateActive = ref(false)
const date = ref()

function toggleDate () {
  dateActive.value = !dateActive.value
}
function getTime() {
  emit('getTime', date.value)
}
function update () {
  getTime()
  dateActive.value = !dateActive.value
}

const dateInfo = computed(() => {
  if (!date.value) return 'Выберите дату'

  let arrDate = date.value.split('-')
  let day = arrDate[0]
  let month = arrDate[1]
  let year = arrDate[2]

  let arrMonthNames = { 
    0: 'Января',
    1: 'Февраля',
    2: 'Марта',
    3: 'Апреля',
    4: 'Мая',
    5: 'Июня',
    6: 'Июля',
    7: 'Августа',
    8: 'Сентября',
    9: 'Октября',
    10: 'Ноября',
    11: 'Декабря',
  }

  return `${day} ${arrMonthNames[parseInt(month) - 1]} ${year}`
})

onMounted(() => {
  date.value = props.info
})

</script>
