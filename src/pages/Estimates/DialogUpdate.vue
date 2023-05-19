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
            <SelectType 
              :data="formData.room_type.name === null ? formData.room_type.name = '' : formData.room_type" 
              @getData="getSelectType" 
              v-if="formData.room_type"
            />
          </div>
          <div class="form-col">
            <label class="lable-title">Кол-во</label>
            <q-input 
              v-model="formData.quantity" 
              class="my-input bg-grey-3"
              placeholder="шт/м2" 
              type="number"
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
              class="my-input bg-grey-3 q-field__no-append" 
              placeholder="Цена" 
            />
          </div>
          <div class="form-col-4">
            <label class="lable-title">Срок, дней</label>
            <q-input 
              v-model="formData.term_forecast" 
              type="number" 
              class="my-input bg-grey-3 q-field__no-append" 
              placeholder="Срок" 
            />
          </div>
          <div class="form-col-4 q-pr-none items-end">
            <label class="lable-title">Ставка, процент</label>
            <q-input 
              v-model="formData.rate_forecast" 
              type="number" 
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
              {'form-section-row-offer-enter': offer.offer1.length || offer.offer2.length || offer.offer3.length && !offerActive},
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
                  v-model="offer.offer1" 
                  type="number" 
                  class="my-input bg-grey-3 q-field__no-append" 
                  placeholder="Цена" 
                  :rules="[val => (val != null && val != '' && `${val}`.length > 0) || '']"
                />
              </div>
              <div class="form-col-4">
                <label class="lable-title">Срок,<br class="mb-visible"> дней</label>
                <q-input 
                  v-model="offer.offer2" 
                  type="number" 
                  class="my-input bg-grey-3 q-field__no-append" 
                  placeholder="Срок"
                  :rules="[val => (val != null && val != '' && `${val}`.length > 0) || '']"
                />
              </div>
              <div class="form-col-4 q-pr-none items-end">
                <label class="lable-title">Ставка,<br class="mb-visible"> процент</label>
                <q-input 
                  v-model="offer.offer3" 
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
                @click="offer.offer1 = '', offer.offer2 = '', offer.offer3 = ''"
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
            class="my-input bg-grey-3"
            placeholder="Укажите производителя"
          />
        </q-card-section>

        <q-card-section class="form-section form-section-row form-section-row-behiver">
          <div class="form-col">
            <label class="lable-title">Артикул</label>
            <q-input
              v-model="formData.article" 
              class="my-input bg-grey-3" 
              placeholder="Укажите артикул"
            />
          </div>
          <div class="form-col">
            <label class="lable-title">Цвет</label>
            <q-input
              v-model="formData.color" 
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
    iditem: String
  })
  
  const emit = defineEmits(['updateItem'])

  const formData = ref({})

  const offer = ref({
    offer1: '',
    offer2: '',
    offer3: '',
  })

  const onSubmitOffer = () => {
    offerActive.value = true
    console.log(offer.value)
  }


  const offerActive = ref(false)
  const offerDisActive = () => {
    offer.value.offer1 = ''
    offer.value.offer2 = ''
    offer.value.offer3 = ''
    offerActive.value = false
  }

  const show = ref(false)
  const beforeHide = () => {
    show.value = true;
  }

  

  // тип помещения
  function getSelectType(data) {
    formData.value.room_type = data.name
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


  onMounted( async () => {
    await getItem()
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
