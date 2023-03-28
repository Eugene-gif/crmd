<template>
  <q-card>
    <div class="q-card-background" @click="$emit('modalFalse')"></div>
    <div class="dialog-section">
      <q-card-section class="row items-center justify-between head">
        <div class="title" v-if="updateActivated">Изменить</div>
        <div class="title" v-else>Добавить услугу</div>
        <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
      </q-card-section>
      
      <q-card-section class="form-section">
        <label class="lable-title">Название</label>
        <q-input v-model="formData.text2" class="my-input bg-grey-3" placeholder="Введите название" />
      </q-card-section>

      <q-card-section class="form-section">
        <div class="text">
          Каждая услуга имеет свою стоимость и сроки — они помогают сформировать понимание, сколько времени длится проект и какая общая сумма подлежит выплате. Вы можете указать стоимость и сроки услуги либо за услугу целиком, либо за квадратный метр. 
        </div>
      </q-card-section>

      <q-card-section 
        class="form-section-row-offer"
        :class="[
          {'form-section-row-offer-enter': formData.offer1.length && formData.offer2.length || formData.offer3.length && formData.offer4.length}
        ]"
      >
        <div class="close-form rotate" @click="offerDisActive">
          <q-icon name="svguse:icons/allIcons.svg#close-modal" size="12px"/>
        </div>
        
        <div class="title title-two-subtitles ">
          <div class="row items-center subtitle">
            <span>За услугу целиком</span>
            <q-btn flat class="circle-warning-15 mb-visible">
              <q-icon name="svguse:icons/allIcons.svg#tooltip" color="grey-4" size="7px"/>
                <q-menu
                  :offset="[10, 10]"
                  anchor="top middle" self="bottom middle"
                  class="circle-warning-tooltip"
                  ref="menu"
                  width="300px"
                >
                  Стоимость и сроки, указанные ниже будут учтены в проекте, независимо от его площади.
                </q-menu>
            </q-btn>
            <div class="circle-warning-15 lg-visible">
              <q-icon name="svguse:icons/allIcons.svg#tooltip" color="grey-4" size="7px"/>
              <q-tooltip max-width="300px" anchor="bottom middle" self="top middle" class="my-tooltip-bottom">
                Стоимость и сроки, указанные ниже будут учтены в проекте, независимо от его площади.
              </q-tooltip>
            </div>
          </div>
          <div class="row items-center subtitle">
            <span>За квадратный метр</span>
            <q-btn flat class="circle-warning-15 mb-visible">
              <q-icon name="svguse:icons/allIcons.svg#tooltip" color="grey-4" size="7px"/>
                <q-menu
                  :offset="[10, 10]"
                  anchor="top middle" self="bottom middle"
                  class="circle-warning-tooltip"
                  ref="menu"
                  width="300px"
                >
                  Эта стоимость и сроки будут учитываться в проекте, умноженными на его площадь.
                </q-menu>
            </q-btn>
            <div class="circle-warning-15 lg-visible">
              <q-icon name="svguse:icons/allIcons.svg#tooltip" color="grey-4" size="7px"/>
              <q-tooltip max-width="300px" anchor="bottom middle" self="top middle" class="my-tooltip-bottom">
                Эта стоимость и сроки будут учитываться в проекте, умноженными на его площадь.
              </q-tooltip>
            </div>
          </div>
        </div>

        <div class="form-section form-section-row"> 
          <div class="form-col-6-row q-pl-none items-start">

            <div class="row items-center subtitle mb-visble">
              <span>За услугу целиком</span>
              <q-btn flat class="circle-warning-15 mb-visible">
                <q-icon name="svguse:icons/allIcons.svg#tooltip" color="grey-4" size="7px"/>
                  <q-menu
                    :offset="[10, 10]"
                    anchor="top middle" self="bottom middle"
                    class="circle-warning-tooltip"
                    ref="menu"
                    width="300px"
                  >
                    Стоимость и сроки, указанные ниже будут учтены в проекте, независимо от его площади.
                  </q-menu>
              </q-btn>
              <div class="circle-warning-15 lg-visible">
                <q-icon name="svguse:icons/allIcons.svg#tooltip" color="grey-4" size="7px"/>
                <q-tooltip max-width="300px" anchor="bottom middle" self="top middle" class="my-tooltip-bottom">
                  Стоимость и сроки, указанные ниже будут учтены в проекте, независимо от его площади.
                </q-tooltip>
              </div>
            </div>
            <div class="cell-form">
              <label class="lable-title" style="display: flex;">
                Стоимость, руб.
              </label>
              <q-input 
                v-model="formData.offer1" 
                type="number" 
                class="my-input bg-grey-3 q-field__no-append" 
                placeholder="Стоимость" 
                :error="isValid(formData.offer1)"
                :disable="formData.offer3.length > 0 || formData.offer4.length > 0"
              />
            </div>
            <div class="cell-form">
              <label class="lable-title" style="display: flex;">
                Срок, дн.
              </label>
              <q-input 
                v-model="formData.offer2" 
                type="number" 
                class="my-input bg-grey-3 q-field__no-append" 
                placeholder="Срок" 
                :error="isValid(formData.offer2)"
                :disable="formData.offer3.length > 0 || formData.offer4.length > 0"
              />
            </div>  
          </div>


          <div class="form-col-6-row q-pl-none items-start">

            <div class="row items-center subtitle mb-visble">
              <span>За квадратный метр</span>
              <q-btn flat class="circle-warning-15 mb-visible">
                <q-icon name="svguse:icons/allIcons.svg#tooltip" color="grey-4" size="7px"/>
                  <q-menu
                    :offset="[10, 10]"
                    anchor="top middle" self="bottom middle"
                    class="circle-warning-tooltip"
                    ref="menu"
                    width="300px"
                  >
                    Эта стоимость и сроки будут учитываться в проекте, умноженными на его площадь.
                  </q-menu>
              </q-btn>
              <div class="circle-warning-15 lg-visible">
                <q-icon name="svguse:icons/allIcons.svg#tooltip" color="grey-4" size="7px"/>
                <q-tooltip max-width="300px" anchor="bottom middle" self="top middle" class="my-tooltip-bottom">
                  Эта стоимость и сроки будут учитываться в проекте, умноженными на его площадь.
                </q-tooltip>
              </div>
            </div>

            <div class="cell-form">
              <label class="lable-title" style="display: flex;">
                Стоимость, руб.
              </label>
              <q-input 
                v-model="formData.offer3" 
                type="number" 
                class="my-input bg-grey-3 q-field__no-append" 
                placeholder="Стоимость" 
                :error="isValid(formData.offer3)"
                :disable="formData.offer1.length > 0 || formData.offer2.length > 0"
              />
            </div>
            <div class="cell-form">
              <label class="lable-title" style="display: flex;">
                Срок, дн.
              </label>
              <q-input 
                v-model="formData.offer4" 
                type="number" 
                class="my-input bg-grey-3 q-field__no-append" 
                placeholder="Срок" 
                :error="isValid(formData.offer4)"
                :disable="formData.offer1.length > 0 || formData.offer2.length > 0"
              />
            </div>  
          </div>
          
        </div>
        
      </q-card-section>


      <div class="section-btn">
        <q-btn
          unelevated
          no-caps
          padding="20px 10px"
          class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
          label="Сохранить"
          v-if="updateActivated"
        />
        <q-btn
          unelevated
          no-caps
          padding="20px 10px"
          class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
          label="Добавить услугу"
          v-else
        />
      </div>
      
    </div>
  </q-card>
  
</template>

<script>
import { onMounted, ref } from 'vue'
import BtnDate from 'components/BtnDate'

export default ({
  name: 'DialogDesigner',
  emits: ['modalFalse'],
  components: {
    BtnDate,
  }, 
  props: {
    updateActivated: Boolean,
    data: Object
  },
  setup (props) {

    const formData = ref({
      offer1: '',
      offer2: '',
      offer3: '',
      offer4: '',
      val: '',
      text: '',
      text2: '',
    })

    function isValid(value) {
      if (`${value}`.length > 2) return true
      else return false
    }

    function offerDisActive() {
      formData.value.offer1 = ''
      formData.value.offer2 = ''
      formData.value.offer3 = ''
      formData.value.offer4 = ''
    }

    onMounted(() => {
      if (props.updateActivated) {
        formData.value.text2 = props.data.name
      }
    })

    return {
      isValid,
      formData,
      select1: ref(
        {
          label: 'Квартира',
          value: 1
        },
      ),
      offerDisActive, 
    }
  }
})
</script>
