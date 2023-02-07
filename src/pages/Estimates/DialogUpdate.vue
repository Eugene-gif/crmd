<template>
  <q-card>
    <div class="q-card-background" @click="$emit('modalFalse')"></div>
    <div class="dialog-section">
      <q-card-section class="row items-center justify-between head">
        <div class="title">Изменить</div>
        <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
      </q-card-section>

      <q-card-section class="form-section">
        <label class="lable-title">Название</label>
        <q-input v-model="text2" class="my-input bg-grey-3" placeholder="Введите название" />
      </q-card-section>

      <q-card-section class="form-section form-section-uploud-file">
        <label class="lable-title lg-visible">Описание</label>
        <q-card-section class="form-section form-section-upload">
          <q-input
            filled
            type="textarea"
            v-model="textarea"
            class="my-textarea bg-grey-3 lg-visivle"
            placeholder="Введите примечание"
          />

          <div class="form-col-delimiter mb-visible">
            <label class="lable-title">Описание</label>
            <q-input
              filled
              type="textarea"
              v-model="textarea"
              class="my-textarea bg-grey-3"
              placeholder="Введите примечание"
            />
          </div>
          
          <div class="my-file-upload">
            <label class="lable-title">Изображение</label>
            <q-uploader
              url="http://localhost:8080/upload"
              style="max-width: 300px"
            />
          </div>
        </q-card-section>
      </q-card-section>

      <q-card-section class="form-section form-section-row form-section-row-behiver">
        <div class="form-col">
          <label class="lable-title">Помещение<sup style="font-size: 10px;font-weight: bold;">2</sup></label>
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
        <div class="form-col">
          <label class="lable-title">Кол-во</label>
          <q-input v-model="text3" class="my-input bg-grey-3" />
        </div>
      </q-card-section>


      <q-card-section class="form-section form-section-row no-wrap">
        <div class="form-col-4 q-pl-none items-start">
          <label class="lable-title" style="display: flex;">
            Прогноз цены
            <div class="circle-warning-15">
              <q-icon name="svguse:icons/allIcons.svg#tooltip" color="grey-4" size="7px"/>
              <q-tooltip max-width="300px" anchor="top middle" self="bottom middle">
                Задайте прогноз цены, чтобы подрядчики могли учитывать его при подаче своих предложений. Подать предложение можно к уже созданным позициям сметы.
              </q-tooltip>
            </div>
          </label>
          <q-input v-model="val31" type="number" class="my-input bg-grey-3" placeholder="Цена" />
        </div>
        <div class="form-col-4">
          <label class="lable-title">Срок, дней</label>
          <q-input v-model="val32" type="number" class="my-input bg-grey-3" placeholder="Срок" />
        </div>
        <div class="form-col-4 q-pr-none items-end">
          <label class="lable-title">Ставка, процент</label>
          <q-input 
            v-model="text3" 
            type="number" 
            class="my-input bg-grey-3 q-field-procent" 
            placeholder="15" 
          >
            <template v-slot:append>
              %
            </template>
          </q-input>
        </div>
      </q-card-section>


      <q-card-section 
        class="form-section-row-offer"
        :class="{'form-section-row-offer-enter': offer1.length || offer2.length || offer3.length}"
      >
        <div class="title">
          <span>Подать предложение по цене</span>
          <div class="circle-warning-15">
            <q-icon name="svguse:icons/allIcons.svg#tooltip" color="grey-4" size="7px"/>
            <q-tooltip max-width="300px" anchor="top middle" self="bottom middle">
              Задайте прогноз цены, чтобы подрядчики могли учитывать его при подаче своих предложений. Подать предложение можно к уже созданным позициям сметы.
            </q-tooltip>
          </div>
        </div>
        <q-btn 
          flat 
          no-caps 
          padding="0 12px" 
          label="Вставить" 
          icon="svguse:icons/allIcons.svg#past" 
          class="btn-past text-grey-5" 
        />
        <div class="form-section form-section-row"> 
          <div class="form-col-4 q-pl-none items-start">
            <label class="lable-title" style="display: flex;">
              Цена за единицу
            </label>
            <q-input v-model="offer1" type="number" class="my-input bg-grey-3" placeholder="Цена" />
          </div>
          <div class="form-col-4">
            <label class="lable-title">Срок, дней</label>
            <q-input v-model="offer2" type="number" class="my-input bg-grey-3" placeholder="Срок" />
          </div>
          <div class="form-col-4 q-pr-none items-end">
            <label class="lable-title">Ставка, процент</label>
            <q-input 
              v-model="offer3" 
              type="number" 
              class="my-input bg-grey-3 q-field-procent" 
              placeholder="15" 
            >
              <template v-slot:append>
                %
              </template>
            </q-input>
          </div>
        </div>
        <div class="btns-sec">
          <q-btn 
            flat 
            no-caps 
            padding="0" 
            label="Сделать предложение" 
            class="text-white btn-flat" 
          />
          <q-btn 
            flat 
            no-caps 
            padding="0" 
            label="Отмена" 
            class="text-white btn-flat" 
            @click="offer1 = '', offer2 = '', offer3 = ''"
          />
        </div>
      </q-card-section>



      <q-card-section class="form-section">
        <label class="lable-title">Ссылка</label>
        <q-input v-model="text2" class="my-input bg-grey-3" placeholder="Укажите ссылку на товар" />
      </q-card-section>
      <q-card-section class="form-section">
        <label class="lable-title">Производитель</label>
        <q-input v-model="text3" class="my-input bg-grey-3" placeholder="Укажите производителя" />
      </q-card-section>

      <q-card-section class="form-section form-section-row form-section-row-behiver">
        <div class="form-col">
          <label class="lable-title">Артикул</label>
          <q-input v-model="text2" class="my-input bg-grey-3" placeholder="Укажите артикул" />
        </div>
        <div class="form-col">
          <label class="lable-title">Цвет</label>
          <q-input v-model="text3" class="my-input bg-grey-3" placeholder="Код"  />
        </div>
      </q-card-section>

      <!-- <q-card-section class="form-section mb-visible">
        <q-card-section class="form-section form-section-upload form-section-upload-mb">
          <div class="my-file-upload">
            <div
              class="mb-visible"
            >
              <div class="form-col">
                <label class="lable-title">Кол-во</label>
                <q-input v-model="text3" class="my-input bg-grey-3" />
              </div>
              <div class="form-col">
                <label class="lable-title">Ставка</label>
                <q-input v-model="text3" class="my-input bg-grey-3" />
              </div>
            </div>
            <q-uploader
              url="http://localhost:8080/upload"
              style="max-width: 300px"
            />
          </div>
        </q-card-section>
      </q-card-section> -->

      <q-card-section class="form-section">
        <label class="lable-title">Файл</label>
        <div class="multiple-upload-files">
          <q-uploader
            label="Выберите файл"
            :filter="checkFileSize"
            :max-files="1"
            @added="onFileChange"
            @removed="formData.files = []"
            @rejected="onRejected"
          />
          <!-- accept=".doc, .pdf, .docx" -->
        </div>
      </q-card-section>

      <div class="section-btn">
        <q-btn
          unelevated
          no-caps
          padding="20px 10px"
          class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
          label="Добавить позицию"
        />
      </div>
      
    </div>
  </q-card>
  
</template>

<script>
import { ref } from 'vue'
import BtnDate from 'components/BtnDate'

export default ({
  name: 'DialogPosition',
  emits: ['modalFalse'],
  components: {
    BtnDate
  }, 
  setup (props) {
    const selectDropbox = ref();

    function checkFileSize (files) {
      return files.filter(file => file.size > 2048)
    }
    function onRejected () {
      $q.notify({
        type: 'negative',
        message: 'Файл не соответствуeт расширению'
      })
    }
    const formData = ref({
      file: null
    })

    const offer1 = ref('')
    const offer2 = ref('')
    const offer3 = ref('')

    return {
      checkFileSize,
      onRejected,
      formData,
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
      val31: ref(false),
      val32: ref(false),
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

      offer1,
      offer2,
      offer3,

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
        // let files = e.target.file;
        console.log(e.target)
        // if (!files.length)
        //     return;
        // file.value = files;
      },
    }
  }
})
</script>
