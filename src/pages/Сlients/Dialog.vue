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
              placeholder="+7 (999)-999-99-99"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '']"
            />
          </q-card-section>
          <q-card-section class="form-section">
            <label class="lable-title">E-mail</label>
            <q-input
              v-model="formOrderers.email"
              class="my-input bg-grey-3"
              placeholder="email@gmail.com"
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
              :rules="[ val => val && val.length > 0 || '']"
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
              placeholder="Ссылка на Telegram"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '']"
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
              placeholder="Ссылка на Instagram"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '']"
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
                style="max-width: 300px"
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

<script>


import { defineComponent, ref } from 'vue'
import BtnDate from 'components/BtnDate'
import { orderersApi } from 'src/api/orderers';
import { useQuasar } from 'quasar'
    

export default defineComponent({
  name: 'ClientsDialog',
  components: {
    BtnDate
  }, 
  setup (props, { emit }) {
    const $q = useQuasar()
    const loading = ref(false)
    
    const addCustomer = ref(false)
    const selectDropbox = ref();
    
    const formData = ref({
      name: '',
      emoji: '',
      adress: '',
      square: '',
      project_type_id: 1,
      orderer: ''
    })
    const formOrderers = ref({
      // user_id: '',
      first_name: 'Вася',
      second_name: 'отчество',
      last_name: 'ивановов',
      birth_date: '27-09-1998',
      phone: '8999999999999',
      email: 'email@gmil.com',
      soc_inst: 'https://link',
      soc_wa: 'https://link',
      soc_tg: 'https://link',
      photo: '',
      personal_info: ' ',
      second_name: 'Вася ивановов'
    })
    
    // addCustomer

    async function onSubmit() {
      if (addCustomer.value === true) {
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
      } else {

      }
    }

    function updateData() {
      emit('updateData')
      emit('modalFalse')
    }

    async function createOrderer() {
      try {
        await orderersApi.createOrderers(formOrderers.value)
        .then(resp => {
          formData.value.orderer = resp.data.id
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

    function ongetEmojik(data) {
      formData.value.name = data.text.value
      formData.value.emoji = data.emojiIcon.value
    }
    function ongetOrderer(select) {
      formData.value.orderer = select.value.user_id
    }
    function ongetTime(time) {
      formOrderers.value.birth_date = time
    }
    function onFileChange(file) {
      formOrderers.value.photo = file[0]
    }
    function getSelectType(data) {
      formData.value.project_type_id = data.value
      console.log(formData.value.project_type_id)
    }

    return {
      ongetOrderer,
      ongetEmojik,
      updateData,
      getSelectType,
      formData,
      formOrderers,

      val: ref(false),
      val1: ref(false),
      val2: ref(true),
      val3: ref(false),
      val4: ref(false),
      val5: ref(false),
      addCustomer,
      
      selectDropbox,

      show: ref(false),
      text4: ref(15),

      ongetTime,
      onFileChange,
      onSubmit,

      file: ref(),
      focusSelect() {
        function func() {
          selectDropbox.value.blur()
        }
        setTimeout(func, 100);
      },
      beforeHide() {
        show.value = true;
      },
      
    }
  }
})
</script>
