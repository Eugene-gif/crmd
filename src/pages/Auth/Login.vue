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
          <template v-slot:after @click="passEye1">
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { authApi } from 'src/api/auth';
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
      email: 'admin@mail.com',
      password: '123123'
    })
    const stateToken = computed(() => store.state['auth'].token)    

    const passEye1 = ref(true)

    const loading = ref(false)


    onMounted(() => {

    })  
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
          try {
            await authApi.doLogin(form.value).then(resp => {
              let token = resp.data.data.token
              store.commit('auth/setToken', token)
              token = localStorage.getItem('token')
              
              let userInfo = JSON.stringify(resp.data.data.user)
              localStorage.setItem('userInfo', userInfo)
              window.location.href = '/'
            })
            loading.value = false
          } catch (err) {
            console.log(err)
            loading.value = false
            setTimeout(() => {
              $q.notify({
                color: 'red',
                timeout: 2000,
                message: 'Произошла ошибка, повторите попытку позже'
              })
            }, 0)
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