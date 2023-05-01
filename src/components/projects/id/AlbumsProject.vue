<template>
  <q-dialog
    v-model="dialog"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog contractor-dialog-share"
  >
    <DialogUploadImg 
      @modalFalse="modalCloseCreateAlbum"
      :project_id="project_id"
      v-if="project_id"
    />
  </q-dialog>
  <q-dialog
    v-model="dialogUpadte"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog contractor-dialog-share"
  >
    <DialogUpdateAlbum 
      @modalFalseUpdate="modalUpdateFalse"
      @modalFalseUpdatePhotos="modalFalseUpdatePhotos"
      :data="modalUpdateData"
    />
  </q-dialog>

  <q-dialog
    v-model="dialogDelite"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog"
  >
    <DialogDelite @modalFalse="handleModalClose" />
  </q-dialog>
  

  <q-expansion-item
    expand-separator
    default-opened
    class="visual"
  >
  <!-- visual-2 -->
  <template v-slot:header>
    <div class="title">
      Визуал
    </div>
    <q-icon name="svguse:icons/allIcons.svg#settings" size="17px" class="settings-icon" @click.stop="true" />
  </template>
    <q-card>
      <q-card-section
        v-for="item in data"
        :key="item"
      >
        <VisualSlider
          :images="item.images"
        />
        <div class="row desc">
          <div class="title">{{item.name}}</div>
          <ActionBtn 
            :propsEl="item.id"
            :offsetYX="[55, -256]"
            :actionfunc="actionfunc"
            @actionEdit="onActionEdit(item)"
            @actionDel="onActionDel('delAlbums', item.id)"
          />
          <!-- 
            @actionOpen="onActionOpen"
@actionSecurity="onActionSecurity"
           -->
        </div>
        <div class="row security">
          <q-btn
            unelevated
            no-caps
            class="bg-grey-3 text-grey-5 my-btn my-effect"
            padding="9px 14px"
          >
            Доступ по ссылке
            <q-icon name="svguse:icons/btnIcons.svg#link" size="18px" class="q-mr-sm link-icon">
              <div class="circle"></div>
            </q-icon>
          </q-btn>
          <q-list class="q-list-share">
            <!-- <q-item
              v-for="el in item.share.slice(0, 4)" :key="el.link"
            >
              <q-btn :to="el.link">
                <img :src="el.icon" alt="">
              </q-btn>
            </q-item>
            <q-item
              v-if="item.share.length > 1"
            >
              <q-btn class="q-td-share__btn__limit" :label="`+${item.share.length - 1}`" />
            </q-item> -->
            <q-item class="q-item-add">
              <q-btn class="q-td-share__btn__add" icon="svguse:icons/allIcons.svg#plus" />
            </q-item>
          </q-list>
        </div>
        
      </q-card-section>
      <q-card-section class="q-card-btn">
        <q-btn
          unelevated
          no-caps
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite"
          @click="dialog = true" 
        >
          <div class="block">Добавить альбом</div>
          <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" />
        </q-btn>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
import { ref } from 'vue'
import ActionBtn from 'src/components/Table/ActionBtn.vue'
import VisualSlider from 'src/components/projects/VisualSlider.vue'
import DialogUploadImg from 'src/components/Profile/DialogUploadImg.vue'
import DialogUpdateAlbum from 'src/components/Profile/DialogUpdateAlbum.vue'

import DialogDelite from 'src/components/dialog/DialogDelite'
import useDialogDel from 'src/composable/useDialogDel'

import { albumsApi } from 'src/api/albums'
import { useQuasar } from 'quasar'

const props = defineProps({
  data: Array,
  project_id: String,
})

const emit = defineEmits([
  'updateAlbums',
])

const actionHandlers = {
  delAlbums: onActionAlbumDel,
}
const { dialogDelite, dialogDelId, dialogDelName, onActionDel, modalCloseDel, handleModalClose } = useDialogDel(actionHandlers)

const $q = useQuasar()
const dialog = ref(false)
const dialogUpadte = ref(false)
const modalUpdateData = ref({})

const actionfunc = ref([
  {
    title: 'Открыть',
    emmit: 'actionOpen',
  },
  {
    title: 'Редактировать',
    emmit: 'actionEdit',
  },
  {
    title: 'Настройки доступа',
    emmit: 'actionSecurity',
  },
  {
    title: 'Удалить',
    emmit: 'actionDel',
  },
])

// удаление альбома
async function onActionAlbumDel(id) {
  try {
    await albumsApi.delAlbum(id).then((resp) => {
      const newList = props.data.filter((item) => item.id !== id)
      emit('updateAlbums', newList)
      setTimeout(() => {
        $q.notify({
          color: 'positive',
          message: 'Альбом удален',
        })
      }, 0)
    })
  } catch (err) {
    console.log(err)
    setTimeout(() => {
      $q.notify({
        color: 'red',
        message: 'Произошла ошибка, попробуйте позже',
      })
    }, 0)
  }
}

// функция при нажатии именения альбома
async function onActionEdit(obj) {
  modalUpdateData.value = obj
  dialogUpadte.value = true
}

// функция после создания альбома
function modalCloseCreateAlbum(val) {
  dialog.value = false
  if (val) props.data.push(val)
}

// emit функции при обновлении фото альбома
function modalFalseUpdatePhotos(val) {
  if (val) {
    const newList = props.data.map((element) => {
      if (element.id === val.id) {
        return val
      }
      return element
    })
    emit('updateAlbums', newList)
  }
}
// функция после изменения данных альбома
function modalUpdateFalse(val) {
  modalFalseUpdatePhotos(val)
  dialogUpadte.value = false
}
</script>