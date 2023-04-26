<template>
  <q-expansion-item
    expand-separator
    default-opened
    label="Wifi settings"
    class="dashboard"
  >
    <template v-slot:header>
      <div class="title">Данные объекта</div>
      <q-icon
        name="svguse:icons/allIcons.svg#settings"
        size="17px"
        class="settings-icon"
        @click.stop="dashboardActive = !dashboardActive"
      />
    </template>
{{formData}}
    <q-card v-show="!dashboardActive">
      <q-card-section>
        <div class="section">
          <q-item class="square">
            <div class="title">Площадь</div>
            <div class="number">{{info.square}} м<sup>2</sup></div>
          </q-item>
          <q-item class="info">
            <p class="adres">{{info.address}}</p>
            <div class="row">
              
              <img 
                :src="customer.image"
                alt="" 
                class="avatar" 
               />
              <p class="type">{{customer.name}}</p>
              <q-btn flat class="circle-warning-15 mb-visible">
                <q-icon
                  name="svguse:icons/allIcons.svg#tooltip"
                  color="grey-4"
                  size="7px"
                />
                <q-menu
                  :offset="[10, 10]"
                  anchor="top middle"
                  self="bottom middle"
                  class="circle-warning-tooltip"
                  ref="menu"
                  width="300px"
                >
                  {{ customer.tooltip }}
                </q-menu>
              </q-btn>
            </div>
          </q-item>
        </div>
        
        <div class="img-section mb-visible">
          <div 
            class="circle-close mini rotate"
            v-show="formData.file"
            @click="formData.file = null"
           >
            <q-icon
              size="12px"
              name="svguse:icons/allIcons.svg#close-modal"
              color="black"
              style="opacity: 0.3;"
              @click="delImage(item.id)"
            />
          </div>
          <img :src="formData.file" alt="" v-show="formData.file">
          <div class="btn-upload" v-show="formData.file">
            <q-uploader
              @added="uploadProfilePhoto"
              accept=".jpg, image/*"
              @rejected="onRejected"
              :class="{'btn-load-black': lodingBtn}"
            />
            <label class="text text-white">Заменить фото</label>
          </div>
          <div class="btn-upload-2">
            <q-uploader
              @added="uploadProfilePhoto"
              multiple
              accept=".jpg, image/*"
              @rejected="onRejected"
              :class="{ 'btn-load-grey': lodingBtn2 }"
            />
            <div class="upload-content">
              <div class="circle-photo">
                <q-icon
                  size="38px"
                  name="svguse:icons/allIcons.svg#no-photo"
                  color="black"
                  style="opacity: 0.1;"
                  @click="delImage(item.id)"
                />
              </div>
              <label class="text">Добавить фото</label>
            </div>
          </div>
        </div>

        <div class="q-item section-toolbar">
          <div class="item">
            <div class="title">Прогресс проекта <span>{{info.readiness}}%</span></div>
            <div class="flex toolbar">
              <div class="toolbar-procent bg-primary" :style="`width: ${info.readiness}%`"></div>
            </div>
          </div>
          <div class="item">
            <div class="title">Оплата <span>20%</span></div>
            <div class="flex toolbar">
              <div class="toolbar-procent bg-positive" style="width: 30%"></div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="img-section">
        <div
          class="circle-close mini rotate" 
          v-show="formData.file"
          @click="formData.file = null"
        >
          <q-icon
            size="12px"
            name="svguse:icons/allIcons.svg#close-modal"
            color="black"
            style="opacity: 0.3;"
            @click="delImage(item.id)"
          />
        </div>
        <img :src="formData.file" alt="" v-show="formData.file">
        <div class="btn-upload" v-show="formData.file">
          <q-uploader
            @added="uploadProfilePhoto"
            accept=".jpg, image/*"
            @rejected="onRejected"
            :class="{'btn-load-black': lodingBtn}"
          />
          <label class="text text-white">Заменить фото</label>
        </div>
        <div class="btn-upload-2">
          <q-uploader
            @added="uploadProfilePhoto"
            multiple
            accept=".jpg, image/*"
            @rejected="onRejected"
            :class="{ 'btn-load-grey': lodingBtn2 }"
          />
          <div class="upload-content">
            <div class="circle-photo">
              <q-icon
                size="38px"
                name="svguse:icons/allIcons.svg#no-photo"
                color="black"
                style="opacity: 0.1;"
                @click="delImage(item.id)"
              />
            </div>
            <label class="text">Добавить фото</label>
          </div>
        </div>
      </q-card-section>

    </q-card>
    
    <q-card class="q-card-dashboard-option" v-show="dashboardActive">
      <div class="row">
        <div class="col-12 col-md-6">
          <q-card-section>
            <q-item>
              <div class="title">Название</div>
              <Emoji 
                @getEmojik="ongetEmojik" 
                :name="formData.name"
                :icon="formData.emoji"
                v-if="formData.name !== null"
              />
            </q-item>

            <q-item>
              <div class="title">Адрес</div>
              <q-input
                v-model="formData.address"
                class="my-input bg-grey-3"
                placeholder="Введите адрес"
              />
            </q-item>

            <q-item>
              <div class="title">Гонорар дизайнера</div>
              <q-input
                v-model="formData.price"
                class="my-input bg-grey-3 q-field-procent"
                placeholder="Укажите общий гонорар"
              >
                <template v-slot:append> руб. </template>
              </q-input>
            </q-item>
          </q-card-section>
        </div>
        <div class="col-12 col-md-6">
          <q-card-section>
            <q-item>
              <div class="title">
                Заказчик
                <span>Карточка заказчика</span>
              </div>
              <q-input
                class="my-input bg-grey-3 my-input__customer"
                placeholder="Введите адрес"
                :disable="true"
                v-model="customer.name"
              >
                <template v-slot:prepend>
                  <img :src="customer.image" alt="" />
                </template>
                <template v-slot:append>
                  <q-btn flat class="circle-warning-15 mb-visible">
                    <q-icon
                      name="svguse:icons/allIcons.svg#tooltip"
                      color="grey-4"
                      size="7px"
                    />
                    <q-menu
                      :offset="[10, 10]"
                      anchor="top middle"
                      self="bottom middle"
                      class="circle-warning-tooltip"
                      ref="menu"
                      width="300px"
                    >
                      {{ customer.tooltip }}
                    </q-menu>
                  </q-btn>
                  <div
                    class="circle-warning-15 lg-visible"
                    style="z-index: 1000"
                  >
                    <q-icon
                      name="svguse:icons/allIcons.svg#tooltip"
                      color="grey-4"
                      size="7px"
                    />
                    <q-tooltip
                      max-width="300px"
                      anchor="bottom middle"
                      self="top middle"
                    >
                      {{ customer.tooltip }}
                    </q-tooltip>
                  </div>
                </template>
              </q-input>
            </q-item>
          </q-card-section>
          <q-card-section class="q-card-different">
            <q-item>
              <div class="title">Площадь, м2</div>
              <q-input
                v-model="formData.square"
                type="number"
                class="my-input bg-grey-3"
              />
            </q-item>
            <q-item>
              <div class="title">Тип</div>
              <q-select
                filled
                v-model="formData.project_type"
                :options="type"
                stack-label
                placeholder="Выбрать"
                dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
                class="my-select"
                behavior="menu"
                ref="selectDropbox"
                popup-content-class="my-select-menu"
                option-value="id"
                option-label="name"
              />
            </q-item>
          </q-card-section>
        </div>
      </div>
    </q-card>

    <q-btn
      unelevated
      no-caps
      class="my-btn my-effect h-opacity btn-custom text-grey-5"
      color="grey-3"
      label="Изменить"
      v-show="!dashboardActive"
      @click="dashboardActive = true"
    />
    <q-btn
      unelevated
      no-caps
      class="my-btn my-effect h-opacity btn-custom text-white"
      color="positive"
      label="Сохранить изменения"
      v-show="dashboardActive"
      @click="dashboardActive = false"
    />
  </q-expansion-item>
</template>

<script>
import { ref, defineComponent, computed, onMounted, onBeforeMount } from "vue";
import Emoji from "components/Emoji"

export default defineComponent({
  components: {
    Emoji,
  },
  props: {
    info: Object,
    orderer: Object
  },
  setup(props, {emit}) {
    const loding = ref(false)
    const lodingBtn = ref(false)
    const lodingBtn2 = ref(false)
    const dashboardActive = ref(false);

    const formData = ref({
      name: null,
      emoji: null,
      address: null,
      square: null,
      project_type: null,
      orderer: null,
      price: null,
      file: null,
    })

    const type = ref([
      {
        name: 'Квартира',
        id: 1
      },
      {
        name: 'Офис',
        id: 2
      },
      {
        name: 'Коттедж',
        id: 3
      },
      {
        name: 'Бар',
        id: 4
      }
    ])
    
    function ongetEmojik(data) {
      formData.value.name = data.text.value;
      formData.value.emoji = data.emojiIcon.value;
    }

    function onRejected() {
      $q.notify({
        type: 'negative',
        message: 'Ошибка загрузки'
      })
    }

    async function uploadProfilePhoto(file) {
      lodingBtn2.value = true

      // formData.value.file = file[0]

      const reader = new FileReader()
      reader.onload = () => {
        formData.value.file = reader.result
      }
      reader.readAsDataURL(file[0])

      lodingBtn2.value = false
    }

    const customer = computed(() => {
      if (props.orderer && props.orderer.data) {
        const name = `${props.orderer.data.first_name || ''} ${props.orderer.data.last_name || ''}`.trim() || null;
        const image = props.orderer.data.image?.thumbnail ? props.orderer.data.image.thumbnail : props.orderer.data.image?.placeholder;
        const tooltip = 'Подсказка';

        return { name, image, tooltip };
      } else {
        return { name: null, image: null, tooltip: null };
      }
    })

    onMounted(() => {
      if (props.info.name) {
        formData.value.name = props.info.name || '';
        formData.value.emoji = props.info.emoji || '';
        formData.value.address = props.info.address || '';
        formData.value.square = props.info.square || '';
        formData.value.project_type = props.info.project_type || '';
      }
    })

    return {
      loding,
      lodingBtn,
      lodingBtn2,
      formData,
      dashboardActive,
      ongetEmojik,
      customer,
      type,
      uploadProfilePhoto,
      onRejected,
    }
  },
})
</script>
