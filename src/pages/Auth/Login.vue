<template>
  <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        type="email"
        v-model="form.email"
        label="Your email *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Поле не должно быть пустым']"
      />

      <q-input
        filled
        v-model="form.password"
        label="Your age *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Поле не должно быть пустым'
        ]"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Войти" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
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
    const form = ref({
      email: 'admin@mail.com',
      password: '123123'
    })
    const stateToken = computed(() => store.state['auth'].token)    

    return {
      accept,
      form,
      stateToken,

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