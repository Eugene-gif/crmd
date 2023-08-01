<template>
  <q-card>
    <div class="q-card-background" @click="$emit('modalFalse')"></div>
    <div class="dialog-section">
      <q-form
        @submit="onSubmit"
      >
        <q-card-section class="row items-center justify-between head">
          <div class="title">Добавить заказчика</div>
          <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
        </q-card-section>

        <q-card-actions class="q-card-actions-add-customer" >
          <q-card-section class="form-section">
            <label class="lable-title">Имя</label>
            <q-input
              v-model="formOrderers.first_name"
              class="my-input bg-grey-3"
              placeholder="Введите имя"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '']"
            />
          </q-card-section>
          <q-card-section class="form-section">
            <label class="lable-title">Фамилия</label>
            <q-input
              v-model="formOrderers.last_name"
              class="my-input bg-grey-3"
              placeholder="Введите фамилию"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '']"
            />
          </q-card-section>
          
          <q-card-section class="form-section">
            <label class="lable-title">Отчество</label>
            <q-input
              v-model="formOrderers.second_name"
              class="my-input bg-grey-3"
              placeholder="Введите отчество"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '']"
            />
          </q-card-section>
          <q-card-section class="form-section">
            <label class="lable-title">Телефон</label>
            <q-input
              v-model="formOrderers.phone"
              class="my-input bg-grey-3"
              placeholder="Введите телефон"
              mask="+7 (###)-###-##-##"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '']"
            />
          </q-card-section>
          <q-card-section class="form-section">
            <label class="lable-title">E-mail</label>
            <q-input
              v-model="formOrderers.email"
              class="my-input bg-grey-3"
              placeholder="Введите e-mail"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '']"
            />
          </q-card-section>
          <q-card-section class="form-section">
            <label class="lable-title">Дата рождения</label>
            <BtnDate @getTime="ongetTime" />
          </q-card-section>

          <q-card-section class="form-section form-section-whatsapp">
            <q-input
              v-model="formOrderers.soc_wa"
              class="my-input bg-grey-3"
              placeholder="Ссылка на WhatsApp"
              lazy-rules
            >
              <template v-slot:after>
                <img src="~assets/whatsapp.svg" alt="" class="q-mr-md">
              </template>
            </q-input>
          </q-card-section>
          <q-card-section class="form-section form-section-social">
            <q-input
              v-model="formOrderers.soc_tg"
              class="my-input bg-grey-3"
              placeholder="@аккаунт"
              lazy-rules
            >
              <template v-slot:after>
                <img src="~assets/telegram.svg" alt="" class="q-mr-md">
              </template>
            </q-input>
          </q-card-section>
          <q-card-section class="form-section form-section-social">
            <q-input
              v-model="formOrderers.soc_inst"
              class="my-input bg-grey-3"
              placeholder="@аккаунт"
              lazy-rules
            >
              <template v-slot:after>
                <img src="~assets/instagram.svg" alt="" class="q-mr-md">
              </template>
            </q-input>
          </q-card-section>

          <q-card-section class="form-section form-section-upload">
            <q-input
              filled
              type="textarea"
              v-model="formOrderers.personal_info"
              class="my-textarea bg-grey-3"
              placeholder="Введите примечание"
            />
            
            <div class="my-file-upload">
              <label class="lable-title">Изображение</label>
              <q-uploader
                @added="onFileChange"
                url="http://localhost:8080/upload"
              />
            </div>
          </q-card-section>
          <q-btn
            unelevated
            no-caps
            padding="20px 10px"
            class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
            label="Добавить заказчика"
            type="submit"
          />
        </q-card-actions>

      </q-form>
    </div>
    
  </q-card>
  
</template>

<script setup>
import { defineComponent, ref, onMounted } from 'vue'
import BtnDate from 'components/BtnDate'
import { orderersApi } from 'src/api/orderers'
import { useQuasar } from 'quasar'
    

const $q = useQuasar()
const loading = ref(false)

const emit = defineEmits(['updateData', 'modalFalse'])

const formOrderers = ref({
  // user_id: '',
  first_name: '',
  second_name: '',
  last_name: '',
  birth_date: '',
  phone: '',
  email: '',
  soc_inst: '',
  soc_wa: '',
  soc_tg: '',
  image: '',
  personal_info: '',
})

async function onSubmit() {
  if (formOrderers.value.birth_date != '') {
    createOrderer()
  } else {
    setTimeout(() => {
      $q.notify({
        color: 'red',
        timeout: 3000,
        message: 'Необходимо заполнить все данные'
      })
    }, 0)
  }
}

function updateData() {
  emit('updateData')
  emit('modalFalse')
  formOrderers.value = {}
}

async function updateOrderer() {
  try {
    await orderersApi.updateOrderers(formOrderers.value)
    .then(resp => {
      updateData()
      setTimeout(() => {
        $q.notify({
          color: 'positive',
          timeout: 3000,
          message: 'Заказчик изменен'
        })
      }, 0)
    })
  } catch (err) {
    console.log(err)
    setTimeout(() => {
      $q.notify({
        color: 'red',
        timeout: 3000,
        message: 'Произошла ошибка, попробуйте позже'
      })
    }, 0)
  }
}

async function createOrderer() {
  try {
    await orderersApi.createOrderers(formOrderers.value)
    .then(resp => {
      updateData()
      setTimeout(() => {
        $q.notify({
          color: 'positive',
          timeout: 3000,
          message: 'Заказчик создан'
        })
      }, 0)
    })
  } catch (err) {
    console.log(err)
    setTimeout(() => {
      $q.notify({
        color: 'red',
        timeout: 3000,
        message: 'Произошла ошибка, попробуйте позже'
      })
    }, 0)
  }
}

function ongetTime(time) {
  formOrderers.value.birth_date = time
}
function onFileChange(file) {
  formOrderers.value.image = file[0]
}

const file = ref()


</script>
