<template>
  <q-card>
    <div class="q-card-background" @click="$emit('modalFalse')"></div>
    <div class="dialog-section">
      <q-form
        @submit="onSubmit"
      >
        <q-card-section class="row items-center justify-between head">
          <div class="title">Добавить проект</div>
          <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
        </q-card-section>

        <q-card-section class="form-section">
          <label class="lable-title">Название</label>
          <Emoji @getEmojik="ongetEmojik"/>
        </q-card-section>

        <q-card-section class="form-section">
          <label class="lable-title">Адрес</label>
          <q-input v-model="formData.adress" class="my-input bg-grey-3" placeholder="Введите адрес" />
        </q-card-section>

        <q-card-section class="form-section form-section-row">
          <div class="form-col">
            <label class="lable-title">Площадь, м<sup style="font-size: 10px;font-weight: bold;">2</sup></label>
            <q-input v-model="formData.square" class="my-input bg-grey-3" placeholder="115" />
          </div>
          <div class="form-col">
            <label class="lable-title">Тип</label>
            <SelectType @getData="getSelectType" />
          </div>
        </q-card-section>

        <q-card-section class="form-section form-section-row-2">
          <div class="form-col">
            <label class="lable-title">Заказчик</label>
            <DropBox @getOrderer="ongetOrderer" :disableSelect="addCustomer" />
          </div>
          <div class="form-col">
            <label class="lable-title" style="opacity: 0;">-</label>
            <q-checkbox
              v-model="addCustomer"
              checked-icon="svguse:icons/allIcons.svg#check-close"
              unchecked-icon="svguse:icons/allIcons.svg#plus"
              class="my-checkbox flat bg-grey-3"
              color="black"
            />
          </div>
        </q-card-section>

        <q-card-actions class="q-card-actions-add-customer" v-show="addCustomer === true">
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
        </q-card-actions>

        <q-card-actions>
          <div class="text-subtitle1">Какие услуги оказываем:</div>
          <q-list class="q-list-options">
            <q-item>
              <q-checkbox
                v-model="val"
                checked-icon="svguse:icons/allIcons.svg#check"
                class="my-checkbox flat"
                color="black"
                label="Планировочное решение"
              />
            </q-item>
            <q-item>
              <q-checkbox
                v-model="val1"
                checked-icon="svguse:icons/allIcons.svg#check"
                class="my-checkbox flat"
                color="black"
                label="Дизайн-концепция"
              />
              <div class="circle-warning">
                <q-icon name="svguse:icons/allIcons.svg#tooltip" color="white" size="7px"/>
                <q-tooltip max-width="256px" anchor="top middle" self="bottom middle">
                  Дизайн-концепция
                </q-tooltip>
              </div>
            </q-item>
            <q-item>
              <q-checkbox
                v-model="val2"
                checked-icon="svguse:icons/allIcons.svg#check"
                class="my-checkbox flat"
                color="black"
                label="Визуальная подача"
              />
              <div class="circle-warning">
                <q-icon name="svguse:icons/allIcons.svg#tooltip" color="white" size="7px"/>
                <q-tooltip max-width="256px" anchor="top middle" self="bottom middle">
                  Дизайн-концепция
                </q-tooltip>
              </div>
            </q-item>
            <q-item>
              <q-checkbox
                v-model="val3"
                checked-icon="svguse:icons/allIcons.svg#check"
                class="my-checkbox flat"
                color="black"
                label="Рабочая документация"
              />
            </q-item>
            <q-item>
              <q-checkbox
                v-model="val4"
                checked-icon="svguse:icons/allIcons.svg#check"
                class="my-checkbox flat"
                color="black"
                label="Авторское сопровождение"
              />
            </q-item>
            <q-item>
              <q-checkbox
                v-model="val5"
                checked-icon="svguse:icons/allIcons.svg#check"
                class="my-checkbox flat"
                color="black"
                label="Комплектация"
              />
            </q-item>
          </q-list>
          <q-btn
            unelevated
            no-caps
            padding="20px 10px"
            class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
            label="Добавить проект"
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
import DropBox from 'components/DropBox'
import SelectType from 'components/projects/SelectType'
import Emoji from 'components/Emoji'
import { projectsApi } from 'src/api/projects';
import { orderersApi } from 'src/api/orderers';
import { useQuasar } from 'quasar'
    

export default defineComponent({
  name: 'FinanceDialog',
  components: {
    BtnDate,
    DropBox,
    Emoji,
    SelectType
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
      first_name: '',
      second_name: '',
      last_name: '',
      birth_date: '',
      phone: '',
      email: '',
      soc_inst: '',
      soc_wa: '',
      soc_tg: '',
      photo: '',
      personal_info: ' ',
      second_name: ' '
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
        addProject()
      }
    }

    function updateData() {
      emit('updateData')
      emit('modalFalse')
    }

    async function addProject() {
      try {
        await projectsApi.createProject(formData.value)
        .then(resp => {
          updateData()
          setTimeout(() => {
            $q.notify({
              color: 'positive',
              timeout: 3000,
              message: 'Проект создан'
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
          formData.value.orderer = resp.data.id
          addProject()
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
      addProject,
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
