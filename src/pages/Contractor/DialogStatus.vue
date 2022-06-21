<template>
  <q-card>
    <div class="q-card-background" @click="$emit('modalFalse')"></div>
    <div class="dialog-section">
      <q-card-section class="row items-center justify-between head">
        <div class="title">Сменить статус</div>
        <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
      </q-card-section>     

      <q-card-section class="form-section form-section-row head-section">
        <label class="lable-title">СтройПро</label>
        <img src="/icons/stroipro.jpg" alt="">
      </q-card-section>
      <q-card-section class="form-section">
        <label class="lable-title">Выберите один из предустановленных</label>
        <q-tabs
          v-model="tab"
          narrow-indicator
          dense
          class="q-tabs-null q-tabs-contractor-status"
        >
          <q-tab class="" no-caps name="1" label="Нет статуса">
            <div class="circle bg-grey-7"></div>
          </q-tab>
          <q-tab class="" no-caps name="2" label="Работаем">
            <div class="circle bg-positive"></div>
          </q-tab>
          <q-tab class="" no-caps name="3" label="Должник">
            <div class="circle bg-negative"></div>
          </q-tab>
          <q-tab class="" no-caps name="4" label="Чёрный список">
            <div class="circle bg-grey-5"></div>
          </q-tab>
        </q-tabs>
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
      tab: ref('1')
    }
  }
})
</script>
