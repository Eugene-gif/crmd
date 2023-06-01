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
            ref="name" 
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
                ref="description"
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
            <q-select
              filled
              v-model="formData.room_type"
              :options="types"
              stack-label
              placeholder="Выбрать"
              dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
              class="my-select"
              behavior="menu"
              ref="selectDropbox"
              popup-content-class="my-select-menu"
              :label="formData.room_type?.name == null ? 'Выберите помещение' : undefined"
              option-value="id"
              option-label="name"
            />
          </div>
          <div class="form-col">
            <label class="lable-title">Кол-во</label>
            <q-input 
              v-model="formData.quantity" 
              class="my-input bg-grey-3"
              placeholder="шт/м2" 
              type="number"
              ref="quantity"
              :rules="[val => (val != null && val != '' && `${val}`.length > 0) || '']"
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
              ref="forecast_price"
              class="my-input bg-grey-3 q-field__no-append" 
              placeholder="Цена" 
            />
          </div>
          <div class="form-col-4">
            <label class="lable-title">Срок, дней</label>
            <q-input 
              v-model="formData.term_forecast" 
              type="number" 
              ref="term_forecast"
              class="my-input bg-grey-3 q-field__no-append" 
              placeholder="Срок" 
            />
          </div>
          <div class="form-col-4 q-pr-none items-end">
            <label class="lable-title">Ставка, процент</label>
            <q-input 
              v-model="formData.rate_forecast" 
              type="number" 
              ref="rate"
              class="my-input bg-grey-3 q-field__no-append q-field-procent" 
              placeholder="%" 
            >
              <template v-slot:append>
                %
              </template>
            </q-input>
          </div>
        </q-card-section>

        <q-form @submit="onSubmitOffer">
          <q-card-section 
            class="form-section-row-offer"
            :class="[
              {'form-section-row-offer-enter': offer.price.length || offer.term.length || offer.rate.length && !offerActive},
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
                  v-model="offer.price" 
                  type="number" 
                  class="my-input bg-grey-3 q-field__no-append" 
                  placeholder="Цена" 
                  :rules="[val => (val != null && val != '' && `${val}`.length > 0) || '']"
                />
              </div>
              <div class="form-col-4">
                <label class="lable-title">Срок,<br class="mb-visible"> дней</label>
                <q-input 
                  v-model="offer.term" 
                  type="number" 
                  class="my-input bg-grey-3 q-field__no-append" 
                  placeholder="Срок"
                  :rules="[val => (val != null && val != '' && `${val}`.length > 0) || '']"
                />
              </div>
              <div class="form-col-4 q-pr-none items-end">
                <label class="lable-title">Ставка,<br class="mb-visible"> процент</label>
                <q-input 
                  v-model="offer.rate" 
                  type="number" 
                  class="my-input bg-grey-3 q-field-procent q-field__no-append" 
                  placeholder="%" 
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
                type="submit"
              />
              <q-btn 
                flat 
                no-caps 
                padding="0" 
                label="Отмена" 
                class="text-white btn-flat" 
                @click="offer.price = '', offer.term = '', offer.rate = ''"
              />
            </div>
          </q-card-section>
        </q-form>

        <q-card-section class="form-section">
          <label class="lable-title">Ссылка</label>
          <q-input 
            v-model="formData.link" 
            class="my-input bg-grey-3"
            placeholder="Укажите ссылку на товар"
          />
        </q-card-section>
        <q-card-section class="form-section">
          <label class="lable-title">Производитель</label>
          <q-input 
            v-model="formData.manufacturer"
            ref="brand"
            class="my-input bg-grey-3"
            placeholder="Укажите производителя"
          />
        </q-card-section>

        <q-card-section class="form-section form-section-row form-section-row-behiver">
          <div class="form-col">
            <label class="lable-title">Артикул</label>
            <q-input
              v-model="formData.article" 
              ref="article"
              class="my-input bg-grey-3" 
              placeholder="Укажите артикул"
            />
          </div>
          <div class="form-col">
            <label class="lable-title">Цвет</label>
            <q-input
              v-model="formData.color" 
              ref="color"
              class="my-input bg-grey-3"
              placeholder="Код" 
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

        <div
          class="uploadedFile-section"
          :class="{'uploadedFile-section-uploaded': formData.file?.file_name}"
          v-show="formData.file?.file_name"
        >
        <!-- propsFile !== '' &&  -->
          <div
            class="uploadedFile row"
          >
            {{formData.file?.file_name}}
            <q-icon 
              name="svguse:icons/btnIcons.svg#delete" 
              color="grey-8" 
              size="16px" 
              class="q-ml-auto"
              style="cursor: pointer;"
            />
          </div>
        </div>

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
  import { proposalsApi } from 'src/api/proposals'
  
  const $q = useQuasar()
  const lodingBtn = ref(false)

  const props = defineProps({
    iditem: String,
    editValue: Array,
    activeField: String,
    types: Array
  })
  
  const emit = defineEmits(['updateItem'])

  const formData = ref({})

  const offer = ref({
    price: '',
    term: '',
    rate: '',
  })

  const onSubmitOffer = async () => {
    offerActive.value = true
    const data = {
      estimate_item_id: props.iditem,
      price: offer.value.price,
      term: offer.value.term,
      rate: offer.value.rate,
    }
    try {
      const resp = await proposalsApi.create(data)
      console.log(resp)
    } catch (error) {
      console.log(error)
      $q.notify({
        color: 'negative',
        message: 'Произошла ошибка, попробуйте позже',
      })
    }
    // estimate_item_id: data.estimate_item_id,
    console.log(offer.value)
  }


  const offerActive = ref(false)
  const offerDisActive = () => {
    offer.value.price = ''
    offer.value.term = ''
    offer.value.rate = ''
    offerActive.value = false
  }

  const show = ref(false)
  const beforeHide = () => {
    show.value = true;
  }

  const onSubmit = async () => {
    lodingBtn.value = true
    // if (formData.value.room_type == null) {
    //   $q.notify({
    //     color: 'negative',
    //     message: 'Выберите помещение'
    //   })
    //   return
    // } 
    try {
      const resp = await estimatesApi.updateItem(formData.value)
      console.log(resp)
      emit('updateItem', resp)
      $q.notify({
        color: 'positive',
        message: 'Позиция cмeты успешно создана'
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

  const getItem = async () => {
    try {
      formData.value = await estimatesApi.getItemById(props.iditem)
    } catch (err) {
      console.log(err)
    }
  }


  // получение полей
  const term_forecast = ref()
  const name = ref()
  const forecast_price = ref()
  const quantity = ref()
  const rate = ref()
  const brand = ref()
  const article = ref()
  const color = ref()

  onMounted( async () => {
    await getItem()
    switch(props.activeField) {
      case 'term_forecast':
        term_forecast.value.focus()
        break
      case 'name':
        name.value.focus()
        break
      case 'forecast_price':
        forecast_price.value.focus()
        break
      case 'quantity':
        quantity.value.focus()
        break
      case 'brand':
        brand.value.focus()
        break
      case 'article':
        article.value.focus()
        break
      case 'color':
        color.value.focus()
        break
    }
  })


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
      message: 'Файл не cooтвeтcтвyeт расширению'
    })
  } 

</script>
