<template>
  <q-page class="page-reset">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <div class="form-section">
        <div class="head">
          <q-item to="/reset">
            <span>Восстановить пароль</span>
          </q-item>
          <q-item></q-item>
        </div>
  
        <q-input
          type="email"
          v-model="form.email"
          placeholder="Введите e-mail"
          lazy-rules
          class="input-auth"
          :rules="[ val => val && val.length > 0 || '']"
        />

        <div class="form-text">
          Если ваша почта уже зарегистрирована в CRMD, 
          то на нее придет письмо со ссылкой для сброса пароля.
        </div>
        <q-item to="/login" class="q-item-none reset lg-visible">Обратно к форме входа</q-item>
        
        <div class="section-btn">
          <q-btn
            unelevated
            no-caps
            type="submit"
            padding="20px 10px"
            class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
            label="Отправить"
          />
          <q-item to="/login" class="q-item-none reset mb-visible">Обратно к форме входа</q-item>
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

    return {
      accept,
      form,
      stateToken,
      followeMe,

      async onSubmit () {
        if (accept.value !== true) {
          try {
            await store.dispatch('auth/doReset', form.value)
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