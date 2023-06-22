<template>
  <q-dialog
    v-model="dialogModal"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog projects-dialog projects-dialog-create"
  >
    <Dialog @modalFalse="dialogModal = false" />
  </q-dialog>
  
  <q-dialog
    v-model="dialogDelite"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog"
  >
    <DialogDelite @modalFalse="handleModalClose" />
  </q-dialog>

  <div class="row items-center header-btns-2" v-if="userRole === 'designer'">
    <q-btn
      rounded
      no-caps
      outline
      color="grey-3"
      class="q-mr-xs my-btn my-effect my-btn--outline q-btn-info"
      @click="dialogModal = true"
    >
      <q-icon name="svguse:icons/btnIcons.svg#user" color="grey-8" size="16px" class="q-mr-md">
        <sup>
          3
        </sup>
      </q-icon>
      <q-icon name="svguse:icons/btnIcons.svg#link" color="grey-8" size="18px" class="q-mr-md link-icon">
        <div class="circle"></div>
      </q-icon>
      <div class="block text-grey-5">Настройки доступа</div>
    </q-btn>
    <q-btn
      rounded
      no-caps
      outline
      color="grey-3"
      class="my-btn my-effect q-mr-xs my-btn--outline"
      @click="dashboardActive = true"
    >
      <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="17px" class="q-mr-md" />
      <div class="block text-grey-5">Редактировать</div>
    </q-btn>
    <q-btn
      rounded
      no-caps
      outline
      color="grey-3"
      class="my-btn my-effect q-mr-xs my-btn--outline"
      @click="onActionDel('delProject', projectId)"
    >
      <q-icon name="svguse:icons/btnIcons.svg#delete" color="grey-8" size="17px" class="q-mr-md" />
      <div class="block text-grey-5">Удалить проект</div>
    </q-btn>
  </div>
  
  <q-expansion-item
    expand-separator
    default-opened
    label="Wifi settings"
    class="dashboard"
    :class="{'hidden-settings-icon': dashboardActive}"
  >
    <template v-slot:header>
      <div class="title q-mr-auto">Данные объекта</div>
      <q-icon
        name="svguse:icons/allIcons.svg#settings"
        size="17px"
        class="settings-icon"
        v-if="userRole === 'designer' && !dashboardActive"
        @click.stop="dashboardActive = !dashboardActive"
      />
    </template>

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
            v-show="formData.image?.url"
            @click="uploadProfilePhoto([''])"
            v-if="userRole === 'designer'"
           >
            <q-icon
              size="12px"
              name="svguse:icons/allIcons.svg#close-modal"
              color="black"
              style="opacity: 0.3;"
            />
          </div>
          <img :src="formData.image?.url" alt="" v-show="formData.image?.url">
          <div class="btn-upload" v-show="formData.image?.url">
            <q-uploader
              @added="uploadProfilePhoto"
              accept=".jpg, image/*"
              @rejected="onRejected"
              :class="{'btn-load-black': lodingBtn}"
            />
            <label class="text text-white">Заменить фото</label>
          </div>
          <div class="btn-upload-2" @click="triggerFilePicker">
            <q-uploader
              @added="uploadProfilePhoto"
              multiple
              accept=".jpg, image/*"
              @rejected="onRejected"
              ref="uploader"
              v-if="userRole === 'designer'"
              :class="{ 'btn-load-grey': lodingBtn2 }"
            />
            <div class="upload-content">
              <div class="circle-photo" v-if="userRole === 'designer'">
                <q-icon
                  size="38px"
                  name="svguse:icons/allIcons.svg#no-photo"
                  color="black"
                  style="opacity: 0.1;"
                />
              </div>
              <label class="text" v-if="userRole === 'designer'">Добавить фото</label>
            </div>
          </div>
        </div>

        <div class="q-item section-toolbar" v-if="userRole === 'designer'">
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

      <q-card-section class="img-section" >
        <div
          class="circle-close mini rotate" 
          v-show="formData.image?.url"
          @click="uploadProfilePhoto([''])"
        >
          <q-icon
            size="12px"
            name="svguse:icons/allIcons.svg#close-modal"
            color="black"
            style="opacity: 0.3;"
          />
        </div>
        <img :src="formData.image?.url" alt="" v-show="formData.image?.url">
        <div class="btn-upload" v-show="formData.image?.url" v-if="userRole === 'designer'">
          <q-uploader
            @added="uploadProfilePhoto"
            accept=".jpg, image/*"
            @rejected="onRejected"
            :class="{'btn-load-black': lodingBtn}"
          />
          <label class="text text-white">Заменить фото</label>
        </div>
        <div class="btn-upload-2" @click="triggerFilePicker">
          <q-uploader
            @added="uploadProfilePhoto"
            multiple
            accept=".jpg, image/*"
            @rejected="onRejected"
            v-if="userRole === 'designer'"
            :class="{ 'btn-load-grey': lodingBtn2 }"
          />
          <div class="upload-content">
            <div class="circle-photo">
              <q-icon
                size="38px"
                name="svguse:icons/allIcons.svg#no-photo"
                color="black"
                style="opacity: 0.1;"
                
              />
            </div>
            <label class="text" v-if="userRole === 'designer'">Добавить фото</label>
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
                v-model="formData.cost"
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
      v-if="userRole === 'designer'"
    />
    <q-btn
      unelevated
      no-caps
      class="my-btn my-effect h-opacity btn-custom text-white"
      color="positive"
      label="Сохранить изменения"
      v-show="dashboardActive"
      @click="updateInfo"
    />
  </q-expansion-item>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue"
  import Emoji from "components/Emoji"
  import Dialog from 'pages/Project/dialog-create.vue'
  import { projectsApi } from 'src/api/projects'
  import { useQuasar } from 'quasar'
  import DialogDelite from 'src/components/dialog/DialogDelite'
  import useDialogDel from 'src/composable/useDialogDel'
  import { useRouter } from 'vue-router'

  const props = defineProps({
    info: Object,
    type: Array,
    orderer: Object,
    projectId: String,
    userRole: String
  })

  const $q = useQuasar()
  const dialogModal = ref(false)
  const loding = ref(false)
  const lodingBtn = ref(false)
  const lodingBtn2 = ref(false)
  const dashboardActive = ref(false)
  const uploader = ref(null)
  const router = useRouter()
  const triggerFilePicker = () => {
    if (uploader.value && props.userRole === 'designer') {
      uploader.value.pickFiles()
    }
  }

  const formData = ref({
    name: null,
    emoji: null,
    address: null,
    square: null,
    project_type: null,
    cost: null,
    file: null,
    uploadFile: null,
    image: null,
  })
  
  function ongetEmojik(data) {
    formData.value.name = data.text.value
    formData.value.emoji = data.emojiIcon.value
  }
  function onRejected() {
    $q.notify({
      type: 'negative',
      message: 'Ошибка загрузки'
    })
  }

  async function onActionProjectDel() {
    try {
      await projectsApi.delProject(props.projectId).then(resp => {
        router.push(`/projects`)
        setTimeout(() => {
          $q.notify({
            color: 'positive',
            message: 'Проект удален'
          })
        }, 0)
      })
    } catch (err) {
      console.log(err)
      setTimeout(() => {
        $q.notify({
          color: 'red',
          message: 'Произошла ошибка, попробуйте позже'
        })
      }, 0)
    }
  }

  const actionHandlers = {
    delProject: onActionProjectDel,
  }
  const { 
    dialogDelite, 
    dialogDelId, 
    dialogDelName, 
    onActionDel, 
    modalCloseDel, 
    handleModalClose 
  } = useDialogDel(actionHandlers)


  async function uploadProfilePhoto(file) {
    lodingBtn2.value = true

    formData.value.uploadFile = file[0]
    try {
      const resp = await projectsApi.updateImage(formData.value)
      
      if (file[0] === '') {
        $q.notify({
          color: 'positive',
          message: 'Картинка удалена'
        })
      } else {
        $q.notify({
          color: 'positive',
          message: 'Картинка обновлена'
        })
      }
      formData.value.image = resp.image
    } catch (err) {
      console.log(err)
    }
    
    lodingBtn2.value = false
  }

  async function updateInfo() {
    try {
      const resp = await projectsApi.updateInfo(formData.value)
      console.log(resp)
      $q.notify({
        color: 'positive',
        message: 'Данные обновлены'
      })
      dashboardActive.value = false
    } catch (err) {
      console.log(err)
      $q.notify({
        color: 'negative',
        message: 'Произошла ошибка, попробуйте позже'
      })
    }
  }

  const customer = computed(() => {
    if (props.orderer && props.orderer.data) {
      const name = `${props.orderer.data.first_name || ''} ${props.orderer.data.last_name || ''}`.trim() || null
      const image = props.orderer.data.image?.thumbnail ? props.orderer.data.image.thumbnail : props.orderer.data.image?.placeholder
      const tooltip = 'Подсказка'

      return { name, image, tooltip }
    } else {
      return { name: null, image: null, tooltip: null }
    }
  })
  
  onMounted(() => {
    console.log(props.info)
    if (props.info.name) {
      formData.value = props.info 
      formData.value.file = null
    }
  })

</script>
