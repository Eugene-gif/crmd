<template>
  <q-page class="page-register">
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
          :rules="[ val => val && val.length > 0 || '']"
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
              :rules="[ val => val && val.length > 0 || '']"
            />
            <q-input
              filled
              type="text"
              v-model="form.lastName"
              placeholder="Ваша фамилия"
              class="input-auth"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '']"
            />
          </div>
          <div class="item">
            <div class="my-file-upload my-file-upload-rounded">
              <q-uploader
                url="http://localhost:8080/upload"
                style="max-width: 300px"
                @added="onFileChange"
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
          :rules="[ val => val && val.length > 0 || '']"
        />

        <q-input
          filled
          :type="passEye1 ? 'password' : 'text'"
          v-model="form.password"
          placeholder="Пароль"
          class="input-auth pass-input"
          lazy-rules
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
              @click="passEye1 = !passEye1"
              v-show="passEye1"
              name="svguse:icons/allIcons.svg#eye-yes"
            />
          </template>
        </q-input>

        <q-input
          filled
          :type="passEye2 ? 'password' : 'text'"
          v-model="form.confirmPassword"
          placeholder="Повторите пароль"
          class="input-auth pass-input"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || ''
          ]"
        >
          <template v-slot:after @click="passEye1">
            <q-icon
              @click="passEye2 = !passEye2"
              v-show="!passEye2"
              name="svguse:icons/allIcons.svg#eye-no"
            />
            <q-icon
              @click="passEye2 = !passEye2"
              v-show="passEye2"
              name="svguse:icons/allIcons.svg#eye-yes"
            />
          </template>
        </q-input>
        
        <div class="dop-info row items-center justify-between">
          <q-checkbox
            v-model="policy"
            checked-icon="svguse:icons/allIcons.svg#check"
            class="my-checkbox flat"
            color="black"
          >
            Я принимаю<q-item to="/policy" class="q-item-none">политику конфиденциальности.</q-item>
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
    const accept = ref(false)
    const store = useStore();    
    const policy = ref(true);
    const $q = useQuasar()

    const form = ref({
      login: '',
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      image: ''
    })   
    const isValidPass = computed(() => {
      return form.value.password == form.value.confirmPassword
    })    

    const passEye1 = ref(true)    
    const passEye2 = ref(true)

    const loading = ref(false);

    async function onSubmit () {
      loading.value = true
      if (isValidPass.value) {
        try {
          await authApi.doRegister(form.value).then(resp => {
            const token = resp.data.data.token
            store.commit('auth/setToken', token)
            // window.location.href = '/';
            console.log(resp)
          })
          loading.value = false
        } catch (err) {
          console.log(err)
          loading.value = false
          $q.notify({
            color: 'red',
            message: 'Произошла ошибка, повторите попытку позже'
          })
        }
      } else {
        loading.value = false
        $q.notify({
          color: 'red',
          message: 'пароли должны совпадать'
        })
      }
    }

    function onFileChange(file) {
      let uploadFile = file[0]
      form.value.image = uploadFile
    }

    return {
      accept,
      form,
      isValidPass,
      policy,

      loading,

      passEye1,
      passEye2,

      onSubmit,
      onFileChange
    }
  }
}
</script>