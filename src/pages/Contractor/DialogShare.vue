<template>
  <q-card>
    <div class="q-card-background" @click="$emit('modalFalse')"></div>
    <div class="dialog-section">
      <q-card-section class="row items-center justify-between head">
        <div class="title">Пригласить подрядчика</div>
        <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
      </q-card-section>     

      <q-card-section class="form-section">
        <label class="lable-title">E-mail</label>
        <q-input v-model="email" class="my-input bg-grey-3" placeholder="Введите e-mail" />
      </q-card-section>
      <q-card-section class="form-section">
        <label class="lable-title">Сообщение</label>
        <q-input
          filled
          type="textarea"
          v-model="textarea"
          class="my-textarea bg-grey-3"
          placeholder="Введите ваше сообщение"
        />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          unelevated
          no-caps
          padding="20px 10px"
          class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
          label="Отправить приглашение"
        />
      </q-card-actions>
    </div>
  </q-card>
  
</template>

<script>
import { ref } from 'vue'


export default ({
  name: 'DialogShare',
  emits: ['modalFalse'],
  components: {
    
  }, 
  setup () {
    return {     
      email: ref(''),
      textarea: ref(''),
    }
  }
})
</script>
