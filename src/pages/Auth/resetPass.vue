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
        <div class="head" style="padding-bottom: 0;">
          <q-item to="/resetpass">
            <span>Восстановление пароля</span>
          </q-item>
        </div>
<!-- 
        <div class="info-email">
          
        </div> -->
        <div class="info-text">
          Мы отправили на&nbsp;указанную вами почту запрос на&nbsp;восстановление пароля. В&nbsp;письме будет ссылка, 
перейдите&nbsp;по&nbsp;ней и&nbsp;вам будет отправлен временный пароль, по&nbsp;которому вы&nbsp;сможете войти в&nbsp;платформу. Вы&nbsp;сможете поменять временный пароль после авторизации.
        </div>
        
        <div class="section-btn">
          <q-btn
            unelevated
            no-caps
            padding="20px 10px"
            class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
            label="Назад к форме входа"
            to="/login"
          />
        </div>
      </div>

    </q-form>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { userApi } from 'src/api/user'

export default {
  setup () {   

    onMounted(() => {
      // console.log()
    })
    return {
      
    }
  }
}
</script>