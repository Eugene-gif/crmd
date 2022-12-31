<template>
  <q-page class="page-setemail">
    <LoaderDate
      v-show="loading"
    />
    <!-- @reset="onReset" -->
    <q-form
      @submit="onSubmit"
      
      class="q-gutter-md"
    >
      <div class="form-section">
        <div class="head">
          <q-item to="/login">
            <span>Вход</span>
          </q-item>
          <q-item to="/setemail">
            <span>Регистрация</span>
          </q-item>
          <q-item></q-item>
        </div>

        <div class="info-email">
          {{user.email}}
        </div>
        <div class="info-text">
          Спасибо, e-mail подтвержден. Учетная запись пользователя создана. Чтобы начать полноценно пользоваться проектом вам осталось только выбрать вашу роль: дизайнер или подрядчик.
        </div>
        
        <div class="section-btn">
          <q-btn
            unelevated
            no-caps
            padding="20px 10px"
            class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
            label="Выбрать роль на проекте"
          />
        </div>
      </div>

    </q-form>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'


export default {
  setup () {   
    const user = ref(JSON.parse(localStorage.getItem('userInfo')))
    onMounted(() => {
      console.log(user)
    })
    return {
      user
    }
  }
}
</script>