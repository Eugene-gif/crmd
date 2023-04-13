<template>
  <q-card>
    <div class="q-card-background" @click="modalFalseClear"></div>
    <div class="dialog-section section-check-city">
      <q-card-section>
        <q-icon 
          class="close rotate" 
          size="13px" 
          v-close-popup name="svguse:icons/allIcons.svg#close-modal" 
          @click="modalFalseClear"
        />
        <vue-dadata
          v-model="query"
          :fromBound="`city`"
          :toBound="`city`"
          placeholder="Введите город"
          :token="token"
          @change="modalFalse"
        />
      </q-card-section>   
    </div>
  </q-card>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { VueDadata } from 'vue-dadata'
import { useQuasar } from 'quasar'

export default defineComponent({
  props: {
    list: Array,
  },
  components: {
    VueDadata
  },
  setup(props, { emit }) {
    const $q = useQuasar()
    const query = ref(null)
    const suggestion = ref(undefined);
    const arrActive = ref(false)

    async function checkAdress() {
      let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
      let token = "4e03d732e3760f1aaf0f990ea5f6bedf457ee979";

      let options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Token " + token
        },
        body: JSON.stringify({query: query.value})
      }

      await fetch(url, options)
        .then(response => response.text())
        .then(result => {
          let arr = JSON.parse(result)

          arr.suggestions.forEach(element => {
            if (element.value === query.value) {
              arrActive.value = true
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
    
    async function modalFalse() {
      await checkAdress()

      if(arrActive.value === true) {
        emit('modalFalse', query.value)
      } else {
        $q.notify({
          color: 'negative',
          message: 'Выберите город из списка!'
        })
      }
    }

    async function modalFalseClear() {
      emit('modalFalse', '')
    }


    return {
      modalFalse,
      modalFalseClear,
      checkAdress,
      query,
      arrActive,
      suggestion,
      token: '4e03d732e3760f1aaf0f990ea5f6bedf457ee979',
    }
  },
})
</script>