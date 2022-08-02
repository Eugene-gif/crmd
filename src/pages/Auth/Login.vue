<template>
  <q-page class="page-login">
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
          :rules="[ val => val && val.length > 0 || 'Пожалуйста, заполните это поле']"
        />

        <q-input
          :type="passEye1 ? 'password' : 'text'"
          v-model="form.password"
          placeholder="Ваш пароль"
          lazy-rules
          class="input-auth pass-input"
          :rules="[
            val => val !== null && val !== '' || 'Пожалуйста, заполните это поле'
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import AuthInformation from 'src/components/auth/AuthInformation.vue'
import LoginIn from 'src/components/auth/LoginIn.vue'

export default {
  components: {
    AuthInformation,
    LoginIn
  },
  setup () {
    const router = useRouter();
    const accept = ref(false)
    const store = useStore();    
    const followeMe = ref(false);    
    const form = ref({
      email: 'admin@mail.com',
      password: '123123'
    })
    const stateToken = computed(() => store.state['auth'].token)    

    const passEye1 = ref(true)

    return {
      accept,
      form,
      stateToken,
      followeMe,

      passEye1,

      async onSubmit () {
        if (accept.value !== true) {
          try {
            await store.dispatch('auth/doLogin', form.value)
          } catch (err) {
            console.log(err)
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