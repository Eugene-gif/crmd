<template>
  <q-expansion-item
    expand-separator
    default-opened
    class="q-expansion-my activity-categories"
  >
    <template v-slot:header>
      <div class="title">
        Категории деятельности
      </div>
    </template>

    <div class="sec">
      <div class="item">
        <ChoiseCategory />
      </div>
      <div class="item">
        <div class="text">
          Выберите один или несколько видов деятельности, чтобы дизайнеры могли найти вас через поиск. Помните, что при ранжировании в результатах поиска по виду деятельности приоритет получают компании с более узким профилем, поэтому лучше не указывать слишком много категорий.
        </div>
      </div>
    </div>
  </q-expansion-item>
</template>

<script>
import { ref, onMounted } from 'vue'
import ChoiseCategory from 'components/Contractor/ChoiseCategory'

export default {
  name: 'ActivityCategory',
  components: {
    ChoiseCategory
  },
  setup() {
    return {
      
    }
  },
}
</script>