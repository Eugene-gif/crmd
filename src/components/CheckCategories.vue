<template>
  <q-card>
    <div class="q-card-background" @click="modalFalse()"></div>
    <div class="dialog-section dialog-check-category">
      <q-card-section class="row items-center justify-between head">
        <div class="title">Выберите группу категорий</div>
        <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
      </q-card-section>   

      <div class="choise-category">
        <div class="choice-place">
          <q-checkbox
            v-for="check in list"
            :key="check"
            v-model="check.value"
            :label="check.name"
            class="q-checkbox-choice no-shadow"
          />
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  props: {
    list: Array,
  },
  setup(props, { emit }) {

    function modalFalse() {
      emit('modalFalse')
    }

    return {
      modalFalse
    }
  },
})
</script>