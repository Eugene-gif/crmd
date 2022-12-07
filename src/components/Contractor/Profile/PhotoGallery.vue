<template>
  
  <div class="details" v-show="!isActive.details">
    <div class="item">
      <div class="cell">Название</div>
      <div class="cell" v-if="formData.name != null">{{formData.name}}</div>
      <div v-else>—</div> 
    </div>
    <div class="item">
      <div class="cell">Город</div>
      <div class="cell" v-if="formData.city != null">{{formData.city}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Область работы</div>
      <div class="cell" v-if="formData.region != null">{{formData.region}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Адрес</div>
      <div class="cell" v-if="formData.public_address != null">{{formData.public_address}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Телефон</div>
      <div class="cell" v-if="formData.public_phone != null">{{formData.public_phone}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">E-mail</div>
      <div class="cell" v-if="formData.public_email != null">{{formData.public_email}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Сайт</div>
      <div class="cell" v-if="formData.url != null">{{formData.url}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">WhatsApp</div>
      <div class="cell" v-if="formData.soc_wa != null">{{formData.soc_wa}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Telegram</div>
      <div class="cell" v-if="formData.soc_tg != null">{{formData.soc_tg}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Instagram</div>
      <div class="cell" v-if="formData.soc_inst != null">{{formData.soc_inst}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Описание</div>
      <div class="cell" v-if="formData.desc != null">{{formData.desc}}</div>
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
    <q-form @submit="updateContractor">
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
            <q-input v-model="formData.city" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
          <q-item>
            <div class="title">Область работы</div>
            <q-input
              type="textarea"
              v-model="formData.region"
              class="my-input bg-grey-3 my-textarea"
              placeholder="Введите название"
              style="min-height: 140px;"
            />
          </q-item>
        </q-list>
        <q-list>
          <q-item class="q-item-textarea">
            <div class="title">Описание</div>
            <q-input type="textarea" v-model="formData.desc" class="my-input bg-grey-3 my-textarea" placeholder="Введите название" />
          </q-item>
        </q-list>
      </div>

      <div class="chapter">
        <q-list>
          <q-item>
            <div class="title">Телефон</div>
            <q-input v-model="formData.public_phone" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
          <q-item>
            <div class="title">Общий адрес</div>
            <q-input v-model="formData.public_address" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
          <q-item>
            <div class="title">E-mail</div>
            <q-input v-model="formData.public_email" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
          <q-item>
            <div class="title">Сайт</div>
            <q-input v-model="formData.url" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
        </q-list>
        <q-list>
          <q-item>
            <div class="title">
              Ссылка на WhatsApp
            </div>
            <q-input
              v-model="formData.soc_wa"
              class="my-input bg-grey-3"
              placeholder="Ссылка на WhatsApp"
              lazy-rules
            >
              <template v-slot:after>
                <img src="~assets/whatsapp.svg" alt="" class="q-mr-md">
              </template>
            </q-input>
          </q-item>
          <q-item>
            <div class="title">
              Ссылка на Telegram
            </div>
            <q-input
              v-model="formData.soc_tg"
              class="my-input bg-grey-3"
              placeholder="Ссылка на Telegram"
              lazy-rules
            >
              <template v-slot:after>
                <img src="~assets/telegram.svg" alt="" class="q-mr-md">
              </template>
            </q-input>
          </q-item>
          <q-item>
            <div class="title">
              Ссылка на Instagram
            </div>
            <q-input
              v-model="formData.soc_inst"
              class="my-input bg-grey-3"
              placeholder="Ссылка на Instagram"
              lazy-rules
            >
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
      />
    </q-form>
  </div>

</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { contractorApi } from 'src/api/contractor';
import { useQuasar } from 'quasar'

export default {
  name: 'PhotoGallery',
  setup() {
    const $q = useQuasar()

    const formData = ref({
      name: '',
      // city: '',
      // region: '',
      // public_email: '',
      // public_phone: '',
      // public_address: '',
      // url: '',
      // soc_wa: '',
      // soc_tg: '',
      // soc_inst: '',
      // desc: '',
      // image: null
    })
    const isActive = ref({
      details: false,
      designer: false,
      documents: false,
    })  

    async function updateContractor() {
      try {
        await contractorApi.updateContractor(formData.value).then(resp => {
          formData.value = resp
          isActive.value.details = false
          $q.notify({
            color: 'positive',
            message: 'Информация обновлена'
          })
        })
      } catch (err) {
        $q.notify({
          color: 'negative',
          message: 'произошла ошибка'
        })
        console.log(err)
      }
    }

    async function getInfoContractor() {
      try {
        await contractorApi.getInfoContractor().then(resp => {
          formData.value = resp
          formData.value.data.desc = null
        })
      } catch (err) {
        $q.notify({
          color: 'negative',
          message: 'произошла ошибка'
        })
        console.log(err)
      }
    }
    
    onMounted(() => {
      getInfoContractor()
    }) 

    return {
      formData,
      isActive,
      updateContractor,
      getInfoContractor
    }
  },
}
</script>