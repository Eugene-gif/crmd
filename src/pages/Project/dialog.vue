<template>
  <q-card>
    <div class="q-card-background" @click="$emit('modalFalse')"></div>
    <div class="dialog-section">
      <q-card-section class="row items-center justify-between head">
        <div class="title">Добавить проект</div>
        <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
      </q-card-section>

      <q-card-section class="form-section">
        <label class="lable-title">Название</label>
        <Emoji />
      </q-card-section>

      <q-card-section class="form-section">
        <label class="lable-title">Адрес</label>
        <q-input v-model="text2" class="my-input bg-grey-3" placeholder="Введите адрес" />
      </q-card-section>

      <q-card-section class="form-section form-section-row">
        <div class="form-col">
          <label class="lable-title">Площадь, м<sup style="font-size: 10px;font-weight: bold;">2</sup></label>
          <q-input v-model="text3" class="my-input bg-grey-3" placeholder="115" />
        </div>
        <div class="form-col">
          <label class="lable-title">Тип</label>
          <q-select
            filled
            v-model="select1"
            :options="type"
            stack-label
            placeholder="Выбрать"
            dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
            class="my-select"
            behavior="menu"
            ref="selectDropbox"
            @popup-hide="focusSelect"
            popup-content-class="my-select-menu"
            :label="select1 ? undefined : 'Выбрать'"
          />
        </div>
      </q-card-section>

      <q-card-section class="form-section form-section-row-2">
        <div class="form-col">
          <label class="lable-title">Заказчик</label>
          <DropBox />
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
          <q-input v-model="customer1" class="my-input bg-grey-3" placeholder="Введите фамилию" />
        </q-card-section>
        <q-card-section class="form-section">
          <label class="lable-title">Имя</label>
          <q-input v-model="customer2" class="my-input bg-grey-3" placeholder="Введите имя" />
        </q-card-section>
        <q-card-section class="form-section">
          <label class="lable-title">Отчество</label>
          <q-input v-model="customer3" class="my-input bg-grey-3" placeholder="Введите отчество" />
        </q-card-section>
        <q-card-section class="form-section">
          <label class="lable-title">Телефон</label>
          <q-input v-model="customer4" class="my-input bg-grey-3" placeholder="+7 (999)-999-99-99" />
        </q-card-section>
        <q-card-section class="form-section">
          <label class="lable-title">E-mail</label>
          <q-input v-model="customer5" class="my-input bg-grey-3" placeholder="email@gmail.com" />
        </q-card-section>
        <q-card-section class="form-section">
          <label class="lable-title">Дата рождения</label>
          <BtnDate />
        </q-card-section>

        <q-card-section class="form-section form-section-whatsapp">
          <q-input v-model="whatsapp" class="my-input bg-grey-3" placeholder="Ссылка на WhatsApp">
            <template v-slot:after>
              <img src="~assets/whatsapp.svg" alt="" class="q-mr-md">
            </template>
          </q-input>
        </q-card-section>
        <q-card-section class="form-section form-section-social">
          <q-input v-model="telegram" class="my-input bg-grey-3" placeholder="Ссылка на Telegram">
            <template v-slot:after>
              <img src="~assets/telegram.svg" alt="" class="q-mr-md">
            </template>
          </q-input>
        </q-card-section>
        <q-card-section class="form-section form-section-social">
          <q-input v-model="instagram" class="my-input bg-grey-3" placeholder="Ссылка на Instagram">
            <template v-slot:after>
              <img src="~assets/instagram.svg" alt="" class="q-mr-md">
            </template>
          </q-input>
        </q-card-section>

        <q-card-section class="form-section form-section-upload">
          <q-input
            filled
            type="textarea"
            v-model="textarea"
            class="my-textarea bg-grey-3"
            placeholder="Введите примечание"
          />
          <div class="my-file-upload">
            <label class="lable-title">Изображение</label>
            <q-uploader
              url="http://localhost:8080/upload"
              style="max-width: 300px"
            />
          </div>
          
          <!-- <UploadFile /> -->
        </q-card-section>
      </q-card-actions>

      <q-card-actions>
        <div class="text-subtitle1">Какие услуги оказываем:</div>
        <q-list class="q-list-options">
          <q-item>
            <q-checkbox
              v-model="val"
              checked-icon="svguse:icons/allIcons.svg#check"
              class="my-checkbox flat bg-grey-3"
              color="black"
            />
            <label class="name-field">Планировочное решение</label>
          </q-item>
          <q-item>
            <q-checkbox
              v-model="val1"
              checked-icon="svguse:icons/allIcons.svg#check"
              class="my-checkbox flat bg-grey-3"
              color="black"
            />
            <label class="name-field">Дизайн-концепция</label>
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
              class="my-checkbox flat bg-grey-3"
              color="black"
            />
            <label class="name-field">Визуальная подача</label>
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
              class="my-checkbox flat bg-grey-3"
              color="black"
            />
            <label class="name-field">Рабочая документация</label>
          </q-item>
          <q-item>
            <q-checkbox
              v-model="val4"
              checked-icon="svguse:icons/allIcons.svg#check"
              class="my-checkbox flat bg-grey-3"
              color="black"
            />
            <label class="name-field">Авторское сопровождение</label>
          </q-item>
          <q-item>
            <q-checkbox
              v-model="val5"
              checked-icon="svguse:icons/allIcons.svg#check"
              class="my-checkbox flat bg-grey-3"
              color="black"
            />
            <label class="name-field">Комплектация</label>
          </q-item>
        </q-list>
        <q-btn
          unelevated
          no-caps
          padding="20px 10px"
          class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
          label="Добавить проект"
          @click="addProject"
        />
        
      </q-card-actions>
    </div>
  </q-card>
  
</template>

<script>
import { ref } from 'vue'
import BtnDate from 'components/BtnDate'
import DropBox from 'components/DropBox'
import UploadFile from 'components/UploadFile'
import Emoji from 'components/Emoji'
import { projectsApi } from 'src/api/projects';

export default ({
  name: 'FinanceDialog',
  emits: ['modalFalse'],
  components: {
    BtnDate,
    DropBox,
    UploadFile,
    Emoji
  }, 
  setup () {
    const selectDropbox = ref();
    async function addProject() {
      try {
        await projectsApi.createProject().then(resp => {
          
        })
      } catch (err) {
        console.log(err)
      }
    }

    return {
      addProject,
      select1: ref(
        {
          label: 'Квартира',
          value: 1
        },
      ),
      val: ref(false),
      val1: ref(false),
      val2: ref(true),
      val3: ref(false),
      val4: ref(false),
      val5: ref(false),
      addCustomer: ref(false),
      type: [
        {
          label: 'Квартира',
          value: 1
        },
        {
          label: 'Офис',
          value: 2
        },
        {
          label: 'Коттедж',
          value: 3
        },
        {
          label: 'Бар',
          value: 4
        }
      ],
      
      selectDropbox,

      text: ref(''),
      text2: ref(''),
      show: ref(false),
      text3: ref(),
      text4: ref(15),

      customer1: ref(),
      customer2: ref(),
      customer3: ref(),
      customer4: ref(),
      customer5: ref(),

      whatsapp: ref(),
      telegram: ref(),
      instagram: ref(),
      textarea: ref(),

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
      onFileChange: function(e) {
        console.log(e.target)
      },
    }
  }
})
</script>
