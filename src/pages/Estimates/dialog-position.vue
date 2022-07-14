<template>
  <q-card>
    <div class="q-card-background" @click="$emit('modalFalse')"></div>
    <div class="dialog-section">
      <q-card-section class="row items-center justify-between head">
        <div class="title">Добавить позицию</div>
        <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
      </q-card-section>

      <q-card-section class="form-section">
        <label class="lable-title">Название</label>
        <q-input v-model="text2" class="my-input bg-grey-3" placeholder="Введите название" />
      </q-card-section>

      <q-card-section class="form-section">
        <label class="lable-title">Описание</label>
        <q-card-section class="form-section form-section-upload">
          <q-input
            filled
            type="textarea"
            v-model="textarea"
            class="my-textarea bg-grey-3"
            placeholder="Введите примечание"
          />
          <div class="my-file-upload lg-visible">
            <label class="lable-title">Изображение</label>
            <q-uploader
              url="http://localhost:8080/upload"
              style="max-width: 300px"
            />
          </div>
        </q-card-section>
      </q-card-section>

      <q-card-section class="form-section form-section-row">
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
        <div class="form-col lg-visible">
          <label class="lable-title">Кол-во</label>
          <q-input v-model="text3" class="my-input bg-grey-3" />
        </div>
      </q-card-section>

      <q-card-section class="form-section form-section-row">
        <div class="form-col">
          <label class="lable-title">Цена за единицу (прогноз цены)<sup style="font-size: 10px;font-weight: bold;">2</sup></label>
          <q-input v-model="text2" class="my-input bg-grey-3" placeholder="Укажите прогноз цены" />
        </div>
        <div class="form-col lg-visible">
          <label class="lable-title">Ставка</label>
          <q-input v-model="text3" class="my-input bg-grey-3" />
        </div>
      </q-card-section>

      <q-card-section class="form-section mb-visible">
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
      </q-card-section>

      <q-card-section class="form-section form-section-link">
        <label class="lable-title">Ссылка</label>
        <q-input v-model="text2" class="my-input bg-grey-3" placeholder="Укажите ссылку на товар" />
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
  setup () {
    const selectDropbox = ref();
    return {
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
