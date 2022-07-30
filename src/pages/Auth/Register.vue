<template>
  <q-page class="page-register">
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

        <!-- <q-input
          filled
          type="text"
          v-model="form.login"
          placeholder="Ваш логин"
          class="input-auth"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Поле не должно быть пустым']"
        /> -->

        <div class="form-cell">
          <div class="item">
            <q-input
              filled
              type="text"
              v-model="form.name"
              placeholder="Ваше имя"
              class="input-auth"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Поле не должно быть пустым']"
            />
            <q-input
              filled
              type="text"
              v-model="form.lastName"
              placeholder="Ваша фамилия"
              class="input-auth"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Поле не должно быть пустым']"
            />
          </div>
          <div class="item">
            <div class="my-file-upload my-file-upload-rounded">
              <q-uploader
                url="http://localhost:8080/upload"
                style="max-width: 300px"
              />
            </div>
          </div>
        </div>

        <q-input
          filled
          type="email"
          v-model="form.email"
          placeholder="Ваш e-mail (он же логин)"
          class="input-auth input-email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Поле не должно быть пустым']"
        />

        <q-input
          filled
          type="password"
          v-model="form.password"
          placeholder="Пароль"
          class="input-auth"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Поле не должно быть пустым'
          ]"
        >
          <template v-slot:after>
            <div class="q-pr-md emoji-div">
              <q-icon
                size="24px"
                name="svguse:icons/allIcons.svg#eye-no"
              />
            </div>
          </template>
        </q-input>

        <q-input
          filled
          type="password"
          v-model="form.confirmPassword"
          placeholder="Повторите пароль"
          class="input-auth"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Поле не должно быть пустым'
          ]"
        >
          <template v-slot:after>
            <div class="q-pr-md emoji-div">
              <q-icon
                size="24px"
                name="svguse:icons/allIcons.svg#eye-no"
              />
            </div>
          </template>
        </q-input>
        
        <div class="dop-info row items-center justify-between">
          <q-checkbox
            v-model="policy"
            checked-icon="svguse:icons/allIcons.svg#check"
            class="my-checkbox flat"
            color="black"
          >
            Я принимаю <q-item to="/policy" class="q-item-none"> политику конфиденциальности.</q-item>
          </q-checkbox>
        </div>
        
        <div class="section-btn">
          <q-btn
            unelevated
            no-caps
            type="submit"
            padding="20px 10px"
            class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
            label="Зарегистрироваться"
          />
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
import { useStore } from 'vuex';

import AuthInformation from 'src/components/auth/AuthInformation.vue'
import LoginIn from 'src/components/auth/LoginIn.vue'

export default {
  components: {
    AuthInformation,
    LoginIn
  },
  setup () {
    const accept = ref(false)
    const store = useStore();    
    const policy = ref(true);

    const form = ref({
      login: '',
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    })   
    const isValidPass = computed(() => {
      return form.value.password == form.value.confirmPassword
    })    

    return {
      accept,
      form,
      isValidPass,
      policy,

      async onSubmit () {
        if (isValidPass.value) {
          try {
            await store.dispatch('auth/doRegister', form.value)
          } catch (error) {
            console.log(error)
          }
        } else {
          alert('пароли должны совпадать')
        }
      }

    }
  }
}
</script>