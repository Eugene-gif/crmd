<template>
  <q-card>
    <div class="q-card-background" @click="$emit('modalFalse')"></div>
    <div class="dialog-section">
      <q-form @submit="onSubmit">
        <q-card-section class="row items-center justify-between head">
          <div class="title">Добавить проект</div>
          <q-icon
            class="close rotate"
            v-close-popup
            name="svguse:icons/allIcons.svg#close-modal"
          />
        </q-card-section>

        <q-card-section class="form-section">
          <label class="lable-title">Название</label>
          <Emoji 
            @getEmojik="ongetEmojik"
            :name="formData.name"
            :icon="formData.emoji"
          />
        </q-card-section>

        <q-card-section class="form-section">
          <label class="lable-title">Адрес</label>
          <q-input
            v-model="formData.adress"
            class="my-input bg-grey-3"
            placeholder="Введите адрес"
            :rules="[(val) => (val && val.length > 0) || '']"
          />
        </q-card-section>

        <q-card-section class="form-section form-section-row">
          <div class="form-col">
            <label class="lable-title"
              >Площадь, м<sup style="font-size: 10px font-weight: bold"
                >2</sup
              >
            </label>
            <q-input
              v-model="formData.square"
              class="my-input bg-grey-3"
              type="number"
              placeholder="0"
              :rules="[(val) => (val && val.length > 0) || '']"
            />
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
            <label class="lable-title" style="opacity: 0">-</label>
            <q-checkbox
              v-model="addCustomer"
              checked-icon="svguse:icons/allIcons.svg#check-close"
              unchecked-icon="svguse:icons/allIcons.svg#plus"
              class="my-checkbox flat bg-grey-3"
              color="black"
            />
          </div>
        </q-card-section>

        <q-card-actions
          class="q-card-actions-add-customer"
          v-if="addCustomer === true"
        >
          <q-card-section class="form-section">
            <label class="lable-title">Имя</label>
            <q-input
              v-model="formOrderers.first_name"
              class="my-input bg-grey-3"
              placeholder="Введите имя"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '']"
            />
          </q-card-section>
          <q-card-section class="form-section">
            <label class="lable-title">Фамилия</label>
            <q-input
              v-model="formOrderers.last_name"
              class="my-input bg-grey-3"
              placeholder="Введите фамилию"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '']"
            />
          </q-card-section>
          <q-card-section class="form-section">
            <label class="lable-title">Отчество</label>
            <q-input
              v-model="formOrderers.second_name"
              class="my-input bg-grey-3"
              placeholder="Введите отчество"
              lazy-rules
            />
          </q-card-section>
          <q-card-section class="form-section">
            <label class="lable-title">Телефон</label>
            <q-input
              v-model="formOrderers.phone"
              class="my-input bg-grey-3"
              placeholder="+7 (999)-999-99-99"
              mask="+7 (###) ###-##-##"
              lazy-rules
            />
          </q-card-section>
          <q-card-section class="form-section">
            <label class="lable-title">E-mail</label>
            <q-input
              v-model="formOrderers.email"
              class="my-input bg-grey-3"
              placeholder="email@gmail.com"
              type="email"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0 && val.includes('@')) || (val.length == 0 || 'Email должен содержать @')
              ]"
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
                <img src="~assets/whatsapp.svg" alt="" class="q-mr-md" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-section class="form-section form-section-social">
            <q-input
              v-model="formOrderers.soc_tg"
              class="my-input bg-grey-3"
              placeholder="Ссылка на Telegram"
              lazy-rules
              
            >
              <template v-slot:after>
                <img src="~assets/telegram.svg" alt="" class="q-mr-md" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-section class="form-section form-section-social">
            <q-input
              v-model="formOrderers.soc_inst"
              class="my-input bg-grey-3"
              placeholder="Ссылка на Instagram"
              lazy-rules
              
            >
              <template v-slot:after>
                <img src="~assets/instagram.svg" alt="" class="q-mr-md" />
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
            <q-item 
              v-for="check in services"
              :key="check.id"
            >
              <q-checkbox
                v-model="check.value"
                checked-icon="svguse:icons/allIcons.svg#check"
                class="my-checkbox flat"
                color="black"
                :label="check.name"
              />
              <!-- <div class="circle-warning" v-if="check.price > 200">
                <q-icon
                  name="svguse:icons/allIcons.svg#tooltip"
                  color="white"
                  size="7px"
                />
                <q-tooltip
                  max-width="256px"
                  anchor="top middle"
                  self="bottom middle"
                >
                  Дизайн-концепция
                </q-tooltip>
              </div> -->
            </q-item>

          </q-list>
        </q-card-actions>

        <q-card-section class="form-section form-section-fee">
          <label class="lable-title">Стоимость дизайн-проекта</label>
          <q-input
            v-model="formData.price"
            class="my-input bg-grey-3"
            placeholder="Укажите общий гонорар"
            type="number"
            :rules="[(val) => (val && val.length > 0) || 0]"
          >
            <template v-slot:append>
              <div class="text">руб.</div>
            </template>
          </q-input>
        </q-card-section>
        <q-card-section class="form-section form-section-btn">
          <q-btn
            unelevated
            no-caps
            padding="20px 10px"
            class="
              full-width
              bg-positive
              text-white
              my-btn my-effect
              h-dark
              q-btn-actions
            "
            label="Добавить проект"
            type="submit"
          />
        </q-card-section>
      </q-form>
    </div>
  </q-card>
</template>

<script>
import { defineComponent, ref, onMounted, watchEffect } from "vue"
import BtnDate from "components/BtnDate"
import DropBox from "components/DropBox"
import SelectType from "components/projects/SelectType"
import Emoji from "components/Emoji"
import { projectsApi } from "src/api/projects"
import { orderersApi } from "src/api/orderers"
import { designerApi } from 'src/api/designer'
import { useQuasar } from "quasar"

export default defineComponent({
  name: "FinanceDialog",
  components: {
    BtnDate,
    DropBox,
    Emoji,
    SelectType,
  },
  setup(props, { emit }) {
    const $q = useQuasar()
    const loading = ref(false)

    const addCustomer = ref(false)
    const selectDropbox = ref()
    const services = ref([])

    const formData = ref({
      name: "",
      emoji: "",
      adress: "",
      square: "",
      project_type_id: null,
      orderer: null,
      orderer_id: null,
      services: [],
      price: 0,
    })
    const formOrderers = ref({
      // user_id: '',
      first_name: "",
      last_name: "",
      birth_date: "",
      phone: "",
      email: "",
      soc_inst: "",
      soc_wa: "",
      soc_tg: "",
      image: "",
      personal_info: " ",
      second_name: "",
    })

    watchEffect(() => {
      formData.value.price = services.value.reduce((accumulator, current) => {
        if (current.type === 'unit' && current.value === true) return accumulator + (current.price * formData.value.square)
        else if (current.type === 'service' && current.value === true) return accumulator + current.price
        else return accumulator
      }, 0)
    })

    // addCustomer

    async function onSubmit() {
      if (addCustomer.value === true) {
        if (formData.value.project_type_id !== null) {
          createOrderer()
        } else {
          setTimeout(() => {
            $q.notify({
              color: "red",
              timeout: 3000,
              message: "Необходимо заполнить все данные",
            })
          }, 0)
        }
      } else {
        if (formData.value.orderer && formData.value.project_type_id !== null) addProject()
        else {
          setTimeout(() => {
            $q.notify({
              color: "red",
              timeout: 3000,
              message: "Необходимо заполнить все данные",
            })
          }, 0)
        }
      }
    }

    function updateData() {
      emit("updateData")
      emit("modalFalse")
    }

    async function addProject() {
      services.value.filter((el) => {
        if (el.value === true) {
          formData.value.services.push(`${el.id}`)
        }
      })
      try {
        await projectsApi.createProject(formData.value).then((resp) => {
          updateData()
          setTimeout(() => {
            $q.notify({
              color: "positive",
              timeout: 3000,
              message: "Проект создан",
            })
          }, 0)
        })
      } catch (err) {
        console.log(err)
        setTimeout(() => {
          $q.notify({
            color: "red",
            timeout: 3000,
            message: "Произошла ошибка, попробуйте позже",
          })
        }, 0)
      }
    }

    async function createOrderer() {
      try {
        await orderersApi.createOrderers(formOrderers.value).then((resp) => {
          formData.value.orderer = resp.data.id
          formData.value.orderer_id = resp.data.id
          addProject()
          updateData()
          setTimeout(() => {
            $q.notify({
              color: "positive",
              timeout: 3000,
              message: "Заказчик создан",
            })
          }, 0)
        })
      } catch (err) {
        console.log(err)
        setTimeout(() => {
          $q.notify({
            color: "red",
            timeout: 3000,
            message: "Произошла ошибка, попробуйте позже",
          })
        }, 0)
      }
    }

    function ongetEmojik(data) {
      formData.value.name = data.text.value
      formData.value.emoji = data.emojiIcon.value
    }
    function ongetOrderer(select) {
      formData.value.orderer = select.orderer
      formData.value.orderer_id = select.orderer
    }
    function ongetTime(time) {
      formOrderers.value.birth_date = time
    }
    function onFileChange(file) {
      formOrderers.value.image = file[0]
    }
    function getSelectType(data) {
      formData.value.project_type_id = data.id
    }

    async function getServices() {
      try {
        await designerApi.getServices().then(resp => {
          services.value = resp
          // console.log(resp)
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
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (userInfo.role === 'designer') getServices()
      // console.log(JSON.parse(localStorage.getItem('userInfo')))
    }) 

    return {
      ongetOrderer,
      ongetEmojik,
      addProject,
      updateData,
      getSelectType,
      formData,
      formOrderers,
      services,

      addCustomer,
      selectDropbox,

      show: ref(false),

      ongetTime,
      onFileChange,
      onSubmit,

      file: ref(),
      focusSelect() {
        function func() {
          selectDropbox.value.blur()
        }
        setTimeout(func, 100)
      },
      beforeHide() {
        show.value = true
      },
    }
  },
})
</script>
