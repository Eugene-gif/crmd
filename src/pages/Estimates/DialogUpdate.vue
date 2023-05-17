<template>
  <q-card>
    <div class="q-card-background" v-close-popup></div>

    <div class="dialog-section">

      <q-card-section class="row items-center justify-between head">
        <div class="title">Изменить</div>
        <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
      </q-card-section>

      <q-form @submit="onSubmit">
        <q-card-section class="form-section">
          <label class="lable-title">Название</label>
          <q-input 
            v-model="formData.name" 
            class="my-input bg-grey-3" 
            placeholder="Введите название" 
            :rules="[(val) => (val && val.length > 0) || '']"
          />
        </q-card-section>

        <q-card-section class="form-section form-section-uploud-file">
          <label class="lable-title lg-visible">Описание</label>
          <q-card-section class="form-section form-section-upload">
            <q-input
              filled
              type="textarea"
              v-model="formData.description"
              class="my-textarea bg-grey-3 lg-visivle"
              placeholder="Введите описание"
            />

            <div class="form-col-delimiter mb-visible">
              <label class="lable-title">Описание</label>
              <q-input
                filled
                type="textarea"
                v-model="formData.description"
                class="my-textarea bg-grey-3"
                placeholder="Введите примечание"
              />
            </div>
            
            <div class="my-file-upload">
              <label class="lable-title">Изображение</label>
              <q-uploader
                style="max-width: 300px"
                @added="onImageChange"
                @removed="formData.image = null"
              />
            </div>
          </q-card-section>
        </q-card-section>

        <q-card-section class="form-section form-section-row form-section-row-behiver">
          <div class="form-col">
            <label class="lable-title">Помещение</label>
            <SelectType @getData="getSelectType" />
          </div>
          <div class="form-col">
            <label class="lable-title">Кол-во</label>
            <q-input 
              v-model="formData.quantity" 
              class="my-input bg-grey-3"
              placeholder="шт/м2" 
              type="number"
              :rules="[(val) => (val && val.length > 0) || '']"
            />
          </div>
        </q-card-section>


        <q-card-section class="form-section form-section-row no-wrap">
          <div class="form-col-4 q-pl-none items-start">
            <label class="lable-title ib-mb" style="display: flex;">
              Прогноз цены
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
                  Подайте предложение, указав условия, на которые вы согласны. Вы сможете поменять и дополнить его, пока статус позиции не будет переведен в «Согласован» обеими сторонами.
                </q-tooltip>
              </div>
            </label>
            
            <q-input 
              v-model="formData.price_forecast" 
              type="number" 
              class="my-input bg-grey-3 q-field__no-append" 
              placeholder="Цена" 
              :rules="[val => (val != null && val != '' && `${val}`.length > 0) || '']"
            />
          </div>
          <div class="form-col-4">
            <label class="lable-title">Срок, дней</label>
            <q-input 
              v-model="formData.term_forecast" 
              type="number" 
              class="my-input bg-grey-3 q-field__no-append" 
              placeholder="Срок" 
              :rules="[val => (val != null && val != '' && `${val}`.length > 0) || '']"
            />
          </div>
          <div class="form-col-4 q-pr-none items-end">
            <label class="lable-title">Ставка, процент</label>
            <q-input 
              v-model="formData.rate_forecast" 
              type="number" 
              class="my-input bg-grey-3 q-field__no-append q-field-procent" 
              placeholder="15" 
              :rules="[val => (val != null && val != '' && `${val}`.length > 0) || '']"
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
              :rules="[val => (val != null && val != '' && `${val}`.length > 0) || '']"
            />
          </div>
          <div class="form-col-4">
            <label class="lable-title">Срок,<br class="mb-visible"> дней</label>
            <q-input 
              v-model="formData.offer2" 
              type="number" 
              class="my-input bg-grey-3 q-field__no-append" 
              placeholder="Срок"
              :rules="[val => (val != null && val != '' && `${val}`.length > 0) || '']"
            />
          </div>
          <div class="form-col-4 q-pr-none items-end">
            <label class="lable-title">Ставка,<br class="mb-visible"> процент</label>
            <q-input 
              v-model="formData.offer3" 
              type="number" 
              class="my-input bg-grey-3 q-field-procent q-field__no-append" 
              placeholder="15" 
              :rules="[val => (val != null && val != '' && `${val}`.length > 0) || '']"
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
          <q-input 
            v-model="formData.link" 
            class="my-input bg-grey-3"
            placeholder="Укажите ссылку на товар"
            :rules="[val => (val != null && val != '' && `${val}`.length > 0) || '']"
          />
        </q-card-section>
        <q-card-section class="form-section">
          <label class="lable-title">Производитель</label>
          <q-input 
            v-model="formData.manufacturer"
            class="my-input bg-grey-3"
            placeholder="Укажите производителя"
            :rules="[val => (val != null && val != '' && `${val}`.length > 0) || '']"
          />
        </q-card-section>

        <q-card-section class="form-section form-section-row form-section-row-behiver">
          <div class="form-col">
            <label class="lable-title">Артикул</label>
            <q-input
              v-model="formData.article" 
              class="my-input bg-grey-3" 
              placeholder="Укажите артикул"
              type="number"
              :rules="[val => (val != null && val != '' && `${val}`.length > 0) || '']"
            />
          </div>
          <div class="form-col">
            <label class="lable-title">Цвет</label>
            <q-input
              v-model="formData.color" 
              class="my-input bg-grey-3"
              placeholder="Код" 
              :rules="[val => (val != null && val != '' && `${val}`.length > 0) || '']"
            />
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
              @removed="formData.file = null"
              @rejected="onRejected"
            />
          </div>
        </q-card-section>

        <div class="section-btn">
          <q-btn
            unelevated
            no-caps
            padding="20px 10px"
            class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
            label="Изменить позицию"
            type="submit"
            :class="{'btn-load-black': lodingBtn}"
          />
        </div>

      </q-form>
      
    </div>
  </q-card>
  
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useQuasar } from 'quasar'
  import { estimatesApi } from 'src/api/estimates'
  import SelectType from "components/projects/SelectType"
  
  const $q = useQuasar()
  const lodingBtn = ref(false)

  const props = defineProps({
    idEstimate: String
  })
  
  const emit = defineEmits(['updateItem'])

  const selectDropbox = ref()

  

  const formData = ref({
    estimate_id: props.idEstimate,

    offer1: '',
    offer2: '',
    offer3: '',

    name: '',
    link: '',
    room_type: null,
    description: '',
    quantity: '',
    price_forecast: '',
    term_forecast: '',
    rate_forecast: '',
    article: '',
    color: '',
    manufacturer: '',

    image: null,
    file: null,
  })

  // тип помещения
  function getSelectType(data) {
    formData.value.room_type = data
  }

  const onSubmit = async () => {
    lodingBtn.value = true
    if (formData.value.room_type == null) {
      $q.notify({
        color: 'negative',
        message: 'Выберите помещение'
      })
      return
    } 
    try {
      const resp = await estimatesApi.updateItem(formData.value)
      emit('updateItem', resp)
      $q.notify({
        color: 'positive',
        message: 'Позиция cметы успешно создана'
      })
    } catch(err) {
      console.log(err)
      $q.notify({
        color: 'negative',
        message: 'Произошла ошибка, попробуйте позже'
      })
    }
    lodingBtn.value = false
  }



  const offerActive = ref(false)
  const offerDisActive = () => {
    formData.value.offer1 = ''
    formData.value.offer2 = ''
    formData.value.offer3 = ''
    offerActive.value = false
  }

  const show = ref(false)
  const beforeHide = () => {
    show.value = true;
  }


  // работа с загрузкой файлов и картинок
  const onFileChange = (file) => {
    formData.value.file = file[0]
  }
  const onImageChange = (file) => {
    formData.value.image = file[0]
  }
  const checkFileSize = (files) => {
    return files.filter(file => file.size > 2048)
  }
  const onRejected = () => {
    $q.notify({
      type: 'negative',
      message: 'Файл не соответствуeт расширению'
    })
  } 

</script>
