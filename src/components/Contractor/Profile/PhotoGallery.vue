<template>
  
  <div class="details" v-show="!isActive.details">
    <div class="item">
      <div class="cell">Название</div>
      <div class="cell" v-if="formData.data.name != null">{{formData.data.name}}</div>
      <div v-else>—</div> 
    </div>
    <div class="item">
      <div class="cell">Город</div>
      <div class="cell" v-if="formData.data.city != null">{{formData.data.city}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Область работы</div>
      <div class="cell" v-if="formData.data.region != null">{{formData.data.region}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Адрес</div>
      <div class="cell" v-if="formData.data.public_address != null">{{formData.data.public_address}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Телефон</div>
      <div class="cell" v-if="formData.data.public_phone != null">{{formData.data.public_phone}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">E-mail</div>
      <div class="cell" v-if="formData.data.public_email != null">{{formData.data.public_email}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Сайт</div>
      <div class="cell" v-if="formData.data.url != null">{{formData.data.url}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">WhatsApp</div>
      <div class="cell" v-if="formData.data.soc_wa != null">{{formData.data.soc_wa}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Telegram</div>
      <div class="cell" v-if="formData.data.soc_tg != null">{{formData.data.soc_tg}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Instagram</div>
      <div class="cell" v-if="formData.data.soc_inst != null">{{formData.data.soc_inst}}</div>
      <div v-else>—</div>
    </div>
    <div class="item">
      <div class="cell">Описание</div>
      <div class="cell" v-if="formData.data.desc != null">{{formData.data.desc}}</div>
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
    <div class="chapter">
      <q-list>
        <q-item>
          <div class="title">Название</div>
          <q-input v-model="formData.data.name" class="my-input bg-grey-3" placeholder="Введите название" />
        </q-item>
        <q-item>
          <div class="title">Город</div>
          <q-input v-model="formData.data.city" class="my-input bg-grey-3" placeholder="Введите название" />
        </q-item>
        <q-item>
          <div class="title">Область работы</div>
          <q-input
            type="textarea"
            v-model="formData.data.region"
            class="my-input bg-grey-3 my-textarea"
            placeholder="Введите название"
            style="min-height: 140px;"
          />
        </q-item>
      </q-list>
      <q-list>
        <q-item class="q-item-textarea">
          <div class="title">Описание</div>
          <q-input type="textarea" v-model="formData.data.desc" class="my-input bg-grey-3 my-textarea" placeholder="Введите название" />
        </q-item>
      </q-list>
    </div>

    <div class="chapter">
      <q-list>
        <q-item>
          <div class="title">Телефон</div>
          <q-input v-model="formData.data.public_phone" class="my-input bg-grey-3" placeholder="Введите название" />
        </q-item>
        <q-item>
          <div class="title">Общий адрес</div>
          <q-input v-model="formData.data.public_address" class="my-input bg-grey-3" placeholder="Введите название" />
        </q-item>
        <q-item>
          <div class="title">E-mail</div>
          <q-input v-model="formData.data.public_email" class="my-input bg-grey-3" placeholder="Введите название" />
        </q-item>
        <q-item>
          <div class="title">Сайт</div>
          <q-input v-model="formData.data.url" class="my-input bg-grey-3" placeholder="Введите название" />
        </q-item>
      </q-list>
      <q-list>
        <q-item>
          <div class="title">
            Ссылка на WhatsApp
          </div>
          <q-input
            v-model="formData.data.soc_wa"
            class="my-input bg-grey-3"
            placeholder="Ссылка на WhatsApp"
            lazy-rules
            :rules="[ val => val && val.length > 0 || '']"
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
            v-model="formData.data.soc_tg"
            class="my-input bg-grey-3"
            placeholder="Ссылка на Telegram"
            lazy-rules
            :rules="[ val => val && val.length > 0 || '']"
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
            v-model="formData.data.soc_inst"
            class="my-input bg-grey-3"
            placeholder="Ссылка на Instagram"
            lazy-rules
            :rules="[ val => val && val.length > 0 || '']"
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
      @click="updateContractor"
    />

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
      data: {
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
        desc: null
      }
    })
    const isActive = ref({
      details: false,
      designer: false,
      documents: false,
    })  

    async function updateContractor() {
      try {
        await contractorApi.updateContractor(formData.value).then(resp => {
          formData.value.data = resp
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
          formData.value.data = resp
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