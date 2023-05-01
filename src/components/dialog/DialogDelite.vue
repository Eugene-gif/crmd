<template>
  
  <q-card class="q-card-delite">
    <div class="q-card-background" @click="modalFalse(false)"></div>
    <div class="dialog-section">
      <div class="title">
        Внимание, это действие нельзя отменить. 
      </div>
      <div class="btns-section">
        <q-btn
          unelevated
          no-caps
          padding="20px 10px"
          class="full-width bg-negative text-white my-btn my-effect h-dark q-btn-actions"
          type="submit"
          @click="modalFalse(true)"
        >
          <span class="block">
            Удалить
          </span>
        </q-btn>
        <q-btn
          unelevated
          no-caps
          padding="20px 10px"
          class="full-width bg-grey-6 text-white my-btn my-effect h-dark q-btn-actions"
          type="submit"
          @click="modalFalse(false)"
        >
          <span class="block">
            Отмена
          </span>
        </q-btn>
      </div>
    </div>
  </q-card>


</template>

<script>
import { defineComponent} from 'vue'

export default defineComponent({
  name: 'DialogDelite',

  setup(props, { emit }) {

    function modalFalse(val) {
      emit('modalFalse', val)
    }

    return {
      modalFalse
    }
  },
})
</script>