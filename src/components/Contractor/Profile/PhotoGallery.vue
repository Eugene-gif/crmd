<template>

  <div class="details" v-show="!isActive.details">
    <div class="item">
      <div class="cell">Название</div>
      <div class="cell" v-if="formData.name != '' && formData.name != null">{{formData.name}}</div>
      <div class="cell" v-else-if="formData.name === null">—</div>
      <div v-else>—</div> 
    </div>
    <div class="item">
      <div class="cell">Город</div>
      <div class="cell" v-if="formData.city != '' && formData.city != null">{{formData.city}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Область работы</div>
      <div class="cell" v-if="formData.region != '' && formData.region != null">{{formData.region}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Адрес</div>
      <div class="cell" v-if="formData.public_address != '' && formData.public_address != null">{{formData.public_address}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Телефон</div>
      <div class="cell" v-if="formData.public_phone != '' && formData.public_phone != null">{{formData.public_phone}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">E-mail</div>
      <div class="cell" v-if="formData.public_email != '' && formData.public_email != null">{{formData.public_email}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Сайт</div>
      <div class="cell" v-if="formData.url != '' && formData.url != null">{{formData.url}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">WhatsApp</div>
      <div class="cell" v-if="formData.soc_wa != '' && formData.soc_wa != null"><a :href="formData.soc_wa" target="_blank" class="link">{{formData.soc_wa}}</a></div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Telegram</div>
      <div class="cell" v-if="formData.soc_tg != '' && formData.soc_tg != null"><a :href="formData.soc_tg" target="_blank" class="link">{{formData.soc_tg}}</a></div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Instagram</div>
      <div class="cell" v-if="formData.soc_inst != '' && formData.soc_inst != null"><a :href="formData.soc_inst" target="_blank" class="link">{{formData.soc_inst}}</a></div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Описание</div>
      <div class="cell" v-if="formData.description != '' && formData.description != null">{{formData.description}}</div>
      <div v-else>—</div>
    </div>
    <q-btn
      unelevated 
      no-caps
      class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
      padding="0"
      @click="isActive.details = !isActive.details"
    >
      <span class="block text-grey-5">Изменить</span>
    </q-btn>
  </div>
  
  <div class="form-chapter" v-show="isActive.details">
    <q-form @submit="checkAdress">
      <div class="chapter">
        <q-list>
          <q-item>
            <div class="title">Название</div>
            <q-input 
              v-model="formData.name" 
              class="my-input bg-grey-3" 
              placeholder="Введите название" 
              :rules="[ val => val && val.length > 0 || '']"
            />
          </q-item>
          <q-item>
            <div class="title">Город</div>
            <!-- <q-input v-model="formData.city" class="my-input bg-grey-3" placeholder="Введите название" /> -->
            <vue-dadata
              v-model="query"
              :fromBound="`city`"
              :toBound="`city`"
              label="sdf"
              :token="token"
            />
          </q-item>
          <q-item>
            <div class="title">Область работы</div>
            <q-input
              type="textarea"
              v-model="formData.region"
              class="my-input bg-grey-3 my-textarea"
              placeholder="Укажите вашу область работы в свободной форме"
              style="min-height: 140px;"
              
            />
            <!-- :rules="[ val => !val || val.length < 60 ]" -->
          </q-item>
        </q-list>
        <q-list>
          <q-item class="q-item-textarea">
            <div class="title">Описание</div>
            <q-input 
              type="textarea" 
              v-model="formData.description" 
              class="my-input bg-grey-3 my-textarea my-textarea-full" 
              placeholder="Опишите вашу компанию" 
            />
          </q-item>
        </q-list>
      </div>

      <div class="chapter">
        <q-list>
          <q-item>
            <div class="title">Телефон</div>
            <q-input 
              v-model="formData.public_phone" 
              class="my-input bg-grey-3" 
              placeholder="Укажите ваш номер"
              type="Number" 
            />
          </q-item>
          <q-item>
            <div class="title">Адрес</div>
            <q-input 
              v-model="formData.public_address" 
              class="my-input bg-grey-3" 
              placeholder="Укажите ваш адрес" 
            />
          </q-item>
          <q-item>
            <div class="title">E-mail</div>
            <q-input 
              v-model="formData.public_email" 
              class="my-input bg-grey-3" 
              placeholder="Укажите вашу почту" 
              
            />
            <!-- :rules="[ val => val.length && val.includes('@')]" 
            :rules="[ val => val && val.length > 0 || '']"
            -->
          </q-item>
          <q-item>
            <div class="title">Сайт</div>
            <q-input 
              v-model="formData.url" 
              class="my-input bg-grey-3" 
              placeholder="Ссылка на ваш сайт" 
            />
          </q-item>
        </q-list>
        <q-list>
          <q-item>
            <div class="title">
              WhatsApp
            </div>
            <q-input
              v-model="formData.soc_wa"
              class="my-input bg-grey-3"
              placeholder="Ссылка на WhatsApp Business"
              lazy-rules
            >
              <template v-slot:after>
                <img src="~assets/whatsapp.svg" alt="" class="q-mr-md">
              </template>
            </q-input>
          </q-item>
          <q-item>
            <div class="title">
              Telegram
            </div>
            <q-input
              v-model="formData.soc_tg"
              class="my-input bg-grey-3"
              placeholder="@аккаунт"
              lazy-rules
              
            >
            <!-- :rules="[ val => val.length && val.includes('@')]" -->
              <template v-slot:after>
                <img src="~assets/telegram.svg" alt="" class="q-mr-md">
              </template>
            </q-input>
          </q-item>
          <q-item>
            <div class="title">
              Instagram
            </div>
            <q-input
              v-model="formData.soc_inst"
              class="my-input bg-grey-3"
              placeholder="@аккаунт"
              lazy-rules
              
            >
            <!-- :rules="[ val => val.length && val.includes('@')]" -->
              <template v-slot:after>
                <img src="~assets/instagram.svg" alt="" class="q-mr-md">
              </template>
            </q-input>
          </q-item>
        </q-list>
      </div>
      <q-btn
        no-caps
        padding="20px 10px"
        class="full-width bg-positive text-white my-btn my-btn-shadow my-effect h-dark q-btn-actions br-10 btn-50"
        label="Сохранить изменения"
        type="submit"
        :class="{'btn-load': lodingBtn}"
      />
      <!--  -->
    </q-form>
    
  </div>

</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { contractorApi } from 'src/api/contractor'
import { VueDadata } from 'vue-dadata'
import { useQuasar } from 'quasar'
import { inject } from 'vue'

export default {
  name: 'PhotoGallery',
  components: {
    VueDadata
  },
  setup() {
    const $q = useQuasar()
    const lodingBtn = ref(false)
    const query = ref(null)
    const suggestion = ref(undefined)
    const emitter = inject('emitter')

    const formData = ref({
      name: '',
      city: '',
      region: '',
      public_email: '',
      public_phone: '',
      public_address: '',
      url: '',
      soc_wa: '',
      soc_tg: '',
      soc_inst: '',
      description: '',
    })
    const isActive = ref({
      details: false,
      designer: false,
      documents: false,
    })  

    function checkWa() {
      if (formData.value.soc_wa === '' || formData.value.soc_wa === null) {
        return true
      } else if (formData.value.soc_wa.indexOf('http') === -1) {
        return formData.value.soc_wa = `https://wa.me/${formData.value.soc_wa}`.replace(/[@]/gi, '')
      } 
    }
    function checkTg() {
      if (formData.value.soc_tg === '' || formData.value.soc_tg === null) {
        return true
      } else if (formData.value.soc_tg.indexOf('http') === -1) {
        return formData.value.soc_tg = `https://t.me/${formData.value.soc_tg}`.replace(/[@]/gi, '')
      } 
    }
    function checkInst() {
      if (formData.value.soc_inst === '' || formData.value.soc_inst === null) {
        return true
      } else if (formData.value.soc_inst.indexOf('http') === -1) {
        return formData.value.soc_inst = `https://www.instagram.com/${formData.value.soc_inst}`.replace(/[@]/gi, '')
      } 
    }

    async function updateContractor() {
      lodingBtn.value = true
      try {
        checkWa()
        checkTg()
        checkInst()
        await contractorApi.updateContractor(formData.value).then(resp => {
          formData.value = resp
          isActive.value.details = false
          $q.notify({
            color: 'positive',
            message: 'Информация обновлена'
          })
        })
        emitter.emit('myevent', formData.value.name)
      } catch (err) {
        $q.notify({
          color: 'negative',
          message: 'произошла ошибка'
        })
        console.log(err)
      }
      lodingBtn.value = false
    }

    async function getInfoContractor() {
      try {
        await contractorApi.getInfoContractor().then(resp => {
          formData.value = resp
          query.value = resp.city
        })
        emitter.emit('myevent', formData.value.name)
      } catch (err) {
        $q.notify({
          color: 'negative',
          message: 'произошла ошибка'
        })
        console.log(err)
        emitter.emit('myevent', '')
      }
    }

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

      fetch(url, options)
        .then(response => response.text())
        .then(result => {
          let arr = JSON.parse(result)
          let arrActive = false

          arr.suggestions.forEach(element => {
            if (element.value === query.value) {
              arrActive = true
            }
          });
          if (arrActive) {
            formData.value.city = query.value
            updateContractor()
          } else {
            $q.notify({
              color: 'negative',
              message: 'Поле "город" не выбрано'
            })
          }
        })
        .catch(error => console.log("error", error));
    }

    onMounted( async () => {
      await getInfoContractor()
      let bool = formData.value.name !== '' && 
      formData.value.city !== '' && formData.value.city !== null  && 
      formData.value.region !== '' && formData.value.region !== null  && 
      formData.value.public_email !== '' && formData.value.public_email !== null  && 
      formData.value.public_phone !== '' && formData.value.public_phone !== null 

      if (!bool) {
        isActive.value.details = true
      }
    }) 

    return {
      formData,
      isActive,
      lodingBtn,
      updateContractor,
      getInfoContractor,
      checkAdress,
      token: '4e03d732e3760f1aaf0f990ea5f6bedf457ee979',
      query,
      suggestion,
      checkWa,
      checkTg,
      checkInst,
    }
  },
}
</script>