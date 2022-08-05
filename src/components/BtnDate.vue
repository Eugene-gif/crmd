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

<script>
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'BtnDate',
  props: {
    addClass: String,
    info: String
  },
  
  setup (props, { emit }) {
    const dateActive = ref(false)
    const date = ref()
    const dateInfo = ref('Выберите дату')

    function toggleDate () {
      dateActive.value = !dateActive.value
    }
    function getTime() {
      emit('getTime', date.value)
    }
    function update () {
      setupDate()
      getTime()
      dateActive.value = !dateActive.value
    }
    function setupDate () {
      let arrDate = date.value.split('-') 
      let day = arrDate[0]
      let mounth = arrDate[1]
      let year = arrDate[2]
      let arrMounth = {
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
        11: 'Декабря'
      }
      dateInfo.value = `${day} ${arrMounth[mounth]} ${year}`
    }

    onMounted(() => {
      if (props.info) {
        date.value = props.info
        setupDate()
      }
    })
    return {
      date,
      dateInfo,
      dateActive,
      toggleDate,
      update,
      setupDate,
      getTime
    }
  }
})
</script>
