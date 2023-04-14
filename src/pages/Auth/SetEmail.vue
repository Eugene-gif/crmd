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
          Мы отправили на указанную вами почту запрос&nbsp;
          на подтверждение. В письме будет ссылка, перейдите&nbsp;
          по ней, чтобы завершить процесс регистрации и выбрать свою роль на проекте: дизайнер или подрядчик.
        </div>
        
        <div class="section-btn">
          <q-btn
            unelevated
            no-caps
            padding="20px 10px"
            class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
            label="Зарегистрироваться на другую почту"
            to="/register"
          />
        </div>
      </div>

    </q-form>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { userApi } from 'src/api/user'
import { authApi } from 'src/api/auth'
import { projectsApi } from 'src/api/projects'

export default {
  setup () {   
    const user = ref(JSON.parse(localStorage.getItem('userInfo')) || '')

    async function getRoleForUser() {
      let user = localStorage.getItem('userInfo')
      let userObj = JSON.parse(user)
     
      try {
        await projectsApi.getAll()   
      } catch (err) {
        console.log(err)

        if (err.response.status === 403) {
          console.log()
          if (err.response.data.data === 'EMAIL_NOT_VERIFIED') {
            window.location.href = '/#/setemail'
          }
          if (err.response.data.data === 'ROLE_NOT_SET') {
            userObj.email_verified_at = true
            let userInfo = JSON.stringify(userObj)
            localStorage.setItem('userInfo', userInfo)
            window.location.href = '/#/role'
          }
        } 
      }
    }

    onMounted(() => {
      console.log(user)
      getRoleForUser()
    })
    return {
      user,
      getRoleForUser
    }
  }
}
</script>