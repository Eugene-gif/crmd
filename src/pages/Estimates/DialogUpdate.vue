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
        <q-input v-model="formData.text2" class="my-input bg-grey-3" placeholder="Введите название" />
      </q-card-section>

      <q-card-section class="form-section form-section-uploud-file">
        <label class="lable-title lg-visible">Описание</label>
        <q-card-section class="form-section form-section-upload">
          <q-input
            filled
            type="textarea"
            v-model="formData.textarea"
            class="my-textarea bg-grey-3 lg-visivle"
            placeholder="Введите описание"
          />

          <div class="form-col-delimiter mb-visible">
            <label class="lable-title">Описание</label>
            <q-input
              filled
              type="textarea"
              v-model="formData.textarea"
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
          <label class="lable-title">Помещение</label>
          <q-select
            filled
            v-model="formData.select1"
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
          <q-input v-model="formData.text3" class="my-input bg-grey-3" placeholder="шт/м2" />
        </div>
      </q-card-section>


      <q-card-section class="form-section form-section-row no-wrap">
        <div class="form-col-4 q-pl-none items-start">
          <label class="lable-title ib-mb" style="display: flex;">
            Прогноз<br class="mb-visible"> цены
            <q-btn flat class="circle-warning-15 mb-visible">
              <q-icon name="svguse:icons/allIcons.svg#tooltip" color="grey-4" size="7px"/>
                <q-menu
                  :offset="[10, 10]"
                  anchor="top middle" self="bottom middle"
                  class="circle-warning-tooltip"
                  ref="menu"
                  width="300px"
                >
                  Задайте прогноз цены, чтобы подрядчики могли учитывать его при подаче своих предложений. Подать предложение можно к уже созданным позициям сметы.
                </q-menu>
            </q-btn>
            <div class="circle-warning-15 lg-visible">
              <q-icon name="svguse:icons/allIcons.svg#tooltip" color="grey-4" size="7px"/>
              <q-tooltip max-width="300px" anchor="bottom middle" self="top middle" class="my-tooltip-bottom">
                Задайте прогноз цены, чтобы подрядчики могли учитывать его при подаче своих предложений. Подать предложение можно к уже созданным позициям сметы.
              </q-tooltip>
            </div>
          </label>
          <q-input 
            v-model="formData.val31" 
            type="number" 
            class="my-input bg-grey-3 q-field__no-append" 
            placeholder="Цена" 
            :error="isValid(formData.val31)"
          />
        </div>
        <div class="form-col-4">
          <label class="lable-title">Срок,<br class="mb-visible"> дней</label>
          <q-input 
            v-model="formData.val32" 
            type="number" 
            class="my-input bg-grey-3 q-field__no-append" 
            placeholder="Срок" 
            :error="isValid(formData.val32)"
          />
        </div>
        <div class="form-col-4 q-pr-none items-end">
          <label class="lable-title">Ставка,<br class="mb-visible"> процент</label>
          <q-input 
            v-model="formData.stavka" 
            type="number" 
            class="my-input bg-grey-3 q-field-procent q-field__no-append" 
            placeholder="15" 
            :error="isValid(formData.stavka)"
          >
            <template v-slot:append>
              %
            </template>
          </q-input>
        </div>
      </q-card-section>


      <q-card-section 
        class="form-section-row-offer"
        :class="[
          {'form-section-row-offer-enter': formData.offer1.length || formData.offer2.length || formData.offer3.length && !offerActive},
          {'form-section-row-offer-activated': offerActive}
        ]"
      >
        <div class="close-form rotate" @click="offerDisActive">
          <q-icon name="svguse:icons/allIcons.svg#close-modal" size="12px"/>
        </div>
        
        <div class="title">
          <span>Подать предложение по цене</span>
          <q-btn flat class="circle-warning-15 mb-visible">
            <q-icon name="svguse:icons/allIcons.svg#tooltip" color="grey-4" size="7px"/>
              <q-menu
                :offset="[10, 10]"
                anchor="top middle" self="bottom middle"
                class="circle-warning-tooltip"
                ref="menu"
                width="300px"
              >
                Подайте предложение, указав условия, на которые вы согласны. Вы сможете поменять и дополнить его, пока статус позиции не будет переведен в «Согласован» обеими сторонами.
              </q-menu>
          </q-btn>
          <div class="circle-warning-15 lg-visible">
            <q-icon name="svguse:icons/allIcons.svg#tooltip" color="grey-4" size="7px"/>
            <q-tooltip max-width="300px" anchor="bottom middle" self="top middle" class="my-tooltip-bottom">
              Подайте предложение, указав условия, на которые вы согласны. Вы сможете поменять и дополнить его, пока статус позиции не будет переведен в «Согласован» обеими сторонами.
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
              Цена за<br class="mb-visible"> единицу
            </label>
            <q-input 
              v-model="formData.offer1" 
              type="number" 
              class="my-input bg-grey-3 q-field__no-append" 
              placeholder="Цена" 
              :error="isValid(formData.offer1)"
            />
          </div>
          <div class="form-col-4">
            <label class="lable-title">Срок,<br class="mb-visible"> дней</label>
            <q-input 
              v-model="formData.offer2" 
              type="number" 
              class="my-input bg-grey-3 q-field__no-append" 
              placeholder="Срок"
              :error="isValid(formData.offer2)"
            />
          </div>
          <div class="form-col-4 q-pr-none items-end">
            <label class="lable-title">Ставка,<br class="mb-visible"> процент</label>
            <q-input 
              v-model="formData.offer3" 
              type="number" 
              class="my-input bg-grey-3 q-field-procent q-field__no-append" 
              placeholder="15" 
              :error="isValid(formData.offer3)"
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
            @click="offerActive = true"
          />
          <q-btn 
            flat 
            no-caps 
            padding="0" 
            label="Отмена" 
            class="text-white btn-flat" 
            @click="formData.offer1 = '', formData.offer2 = '', formData.offer3 = ''"
          />
        </div>
      </q-card-section>


      <q-card-section class="form-section">
        <label class="lable-title">Ссылка</label>
        <q-input v-model="formData.text2" class="my-input bg-grey-3" placeholder="Укажите ссылку на товар" />
      </q-card-section>
      <q-card-section class="form-section">
        <label class="lable-title">Производитель</label>
        <q-input v-model="formData.proizvoditel" class="my-input bg-grey-3" placeholder="Укажите производителя" />
      </q-card-section>

      <q-card-section class="form-section form-section-row form-section-row-behiver">
        <div class="form-col">
          <label class="lable-title">Артикул</label>
          <q-input v-model="formData.text2" class="my-input bg-grey-3" placeholder="Укажите артикул" />
        </div>
        <div class="form-col">
          <label class="lable-title">Цвет</label>
          <q-input v-model="formData.color" class="my-input bg-grey-3" placeholder="Код"  />
        </div>
      </q-card-section>

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
      file: null,
      offer1: '',
      offer2: '',
      offer3: '',
      val: '',
      val1: '',
      val2: '',
      val3: '',
      val31: '',
      val32: '',
      val4: '',
      val5: '',
      text: '',
      text2: '',
      text3: '',
      text4: 15,
      customer1: '',
      customer2: '',
      customer3: '',
      customer4: '',
      customer5: '',
      textarea: '',
      stavka: '',
      proizvoditel: '',
      color: '',
    })

    const offerActive = ref(false)

    function isValid(value) {
      if (`${value}`.length > 2) return true
      else return false
    }

    function offerDisActive() {
      formData.value.offer1 = ''
      formData.value.offer2 = ''
      formData.value.offer3 = ''
      offerActive.value = false
    }

    return {
      isValid,
      checkFileSize,
      onRejected,
      formData,
      select1: ref(
        {
          label: 'Квартира',
          value: 1
        },
      ),
      offerDisActive,

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

      show: ref(false),

      offerActive,

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
