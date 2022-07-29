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
          lazy-rules
          class="input-auth"
          :rules="[ val => val && val.length > 0 || 'Поле не должно быть пустым']"
        />

        <q-input
          v-model="form.password"
          lazy-rules
          class="input-auth"
          :rules="[
            val => val !== null && val !== '' || 'Поле не должно быть пустым'
          ]"
        />
        
        <div class="dop-info row items-center justify-between">
          <q-checkbox
            v-model="followeMe"
            checked-icon="svguse:icons/allIcons.svg#check"
            class="my-checkbox flat"
            label="Запомнить меня"
            color="black"
          />
          <q-item to="/reset" class="q-item-none reset">Восстановить пароль</q-item>
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
        </div>
      </div>
      <div class="form-section form-auth">
        
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
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