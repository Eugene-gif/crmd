<template>
  <q-page class="page-login">
    <LoaderDate
      v-show="loading"
    />
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <div class="form-section">
        <div class="head">
          <q-item to="/login">
            <span>Вход</span>
          </q-item>
          <q-item to="/register">
            <span>Регистрация</span>
          </q-item>
          <q-item></q-item>
        </div>

        <q-input
          type="email"
          v-model="form.email"
          placeholder="Ваш e-mail (он же логин)"
          lazy-rules
          class="input-auth"
          :rules="[ val => val && val.length > 0 || '']"
        />

        <q-input
          :type="passEye1 ? 'password' : 'text'"
          v-model="form.password"
          placeholder="Ваш пароль"
          lazy-rules
          class="input-auth pass-input"
          :rules="[
            val => val !== null && val !== '' || ''
          ]"
        >
          <template v-slot:after>
            <q-icon
              @click="passEye1 = !passEye1"
              v-show="!passEye1"
              name="svguse:icons/allIcons.svg#eye-no"
            />
            <q-icon
              @click.stop="passEye1 = !passEye1"
              v-show="passEye1"
              name="svguse:icons/allIcons.svg#eye-yes"
            />
          </template>
        </q-input>
        
        <div class="dop-info row items-center justify-between">
          <q-checkbox
            v-model="followeMe"
            checked-icon="svguse:icons/allIcons.svg#check"
            class="my-checkbox flat"
            label="Запомнить меня"
            color="black"
          />
          <q-item to="/reset" class="q-item-none reset lg-visible">Восстановить пароль</q-item>
        </div>
        
        <div class="section-btn">
          <q-btn
            unelevated
            no-caps
            type="submit"
            padding="20px 10px"
            class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
            label="Войти"
          />
          <q-item to="/reset" class="q-item-none reset mb-visible">Восстановить пароль</q-item>
        </div>
      </div>
      <div class="form-section form-auth">
        <LoginIn />
      </div>
    </q-form>
    <AuthInformation />
  </q-page>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { authApi } from 'src/api/auth'
import { useQuasar } from 'quasar'

import AuthInformation from 'src/components/auth/AuthInformation.vue'
import LoginIn from 'src/components/auth/LoginIn.vue'
import LoaderDate from 'src/components/LoaderDate.vue'

export default {
  components: {
    AuthInformation,
    LoginIn,
    LoaderDate
  },
  setup () {
    const $q = useQuasar()

    const router = useRouter()
    const accept = ref(false)
    const store = useStore()    
    const followeMe = ref(false) 
     
    const form = ref({
      email: '',
      password: ''
    })
    const stateToken = computed(() => store.state['auth'])    
    const passEye1 = ref(true)
    const loading = ref(false)

    return {
      accept,
      form,
      stateToken,
      followeMe,
      loading,

      passEye1,

      async onSubmit () {
        loading.value = true
        if (accept.value !== true) {
          localStorage.clear()
          try {
            await authApi.doLogin(form.value).then(resp => {
              let token = resp.data.data.token
              
              store.commit('auth/setToken', token)

              token = localStorage.getItem('token')
              
              let userInfo = JSON.stringify(resp.data.data.user)
              localStorage.setItem('userInfo', userInfo)

              if (resp.data.data.user.email_verified_at === null) {
                setTimeout(() => {
                  window.location.href = '/#/setemail'
                }, 500)
              } else if (resp.data.data.user.role === '') {
                setTimeout(() => {
                  window.location.href = '/#/role'
                }, 500)
              } else {
                window.location.href = '/'
              }
              
            })
            loading.value = false
          } catch (err) {
            console.log(err)
            loading.value = false

            $q.notify({
              color: 'red',
              timeout: 2000,
              message: 'Неправильный логин или пароль'
            })

            let user = localStorage.getItem('userInfo')
            let userObj = JSON.parse(user)

            if (userObj.email_verified_at === null) {
              $q.notify({
                color: 'red',
                timeout: 2000,
                message: 'подтвердите ваш Email'
              })
              setTimeout(() => {
                window.location.href = '/#/setemail'
              }, 2000)
            } else if (userObj.role === '') {
              setTimeout(() => {
                window.location.href = '/#/role'
              }, 500)
            } 
          }
        }
      },

      onReset () {
        email.value = null
        pass.value = null
        accept.value = false
      }
    }
  }
}
</script>