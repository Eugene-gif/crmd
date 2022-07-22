<template>
  <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        type="text"
        v-model="form.login"
        label="Ваш логин *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Поле не должно быть пустым']"
      />
      <q-input
        filled
        type="text"
        v-model="form.name"
        label="Ваше имя *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Поле не должно быть пустым']"
      />
      <q-input
        filled
        type="text"
        v-model="form.lastName"
        label="Ваша фамилия *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Поле не должно быть пустым']"
      />
      <q-input
        filled
        type="email"
        v-model="form.email"
        label="Ваш email *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Поле не должно быть пустым']"
      />

      <q-input
        filled
        type="password"
        v-model="form.password"
        label="Пароль *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Поле не должно быть пустым'
        ]"
      />
      <q-input
        filled
        type="password"
        v-model="form.confirmPassword"
        label="Подтвердите пароль *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Поле не должно быть пустым'
        ]"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Зарегистрироваться" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
</template>
<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex';

export default {
  setup () {
    const accept = ref(false)
    const store = useStore();    
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