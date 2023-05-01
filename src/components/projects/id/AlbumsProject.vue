<template>
  <q-dialog
    v-model="dialog"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog contractor-dialog-share"
  >
    <DialogUploadImg 
      @modalFalse="modalFalse"
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
    v-model="dialogDelModal"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog"
  >
    <DialogDelite 
      @modalFalse="modaCloseDel"
    />
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
        :key="item.id"
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
            @actionOpen="onActionOpen"
            @actionEdit="onActionEdit(item)"
            @actionSecurity="onActionSecurity"
            @actionDel="onActionDel('delAlbums', item.id)"
          />
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
import ActionBtn from 'components/Table/ActionBtn.vue'
import VisualSlider from 'components/projects/VisualSlider.vue'
import DialogUploadImg from 'src/components/Profile/DialogUploadImg.vue'
import DialogUpdateAlbum from 'src/components/Profile/DialogUpdateAlbum.vue'
import DialogDelite from 'components/dialog/DialogDelite'
import { albumsApi } from 'src/api/albums'
import { useQuasar } from 'quasar'

const props = defineProps({
  data: Array,
  project_id: String,
})

const emit = defineEmits([
  'actionOpen',
  'actionEdit',
  'actionSecurity',
  'delAlbums',
  'updateAlbums',
])

const $q = useQuasar()
const dialog = ref(false)
const dialogUpadte = ref(false)
const dialogDelModal = ref(false)
const dialogDelId = ref()
const dialogName = ref('')
const modalUpdateData = ref({})
const visual = ref([])

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

function onActionDel(value, id) {
  dialogName.value = value
  dialogDelId.value = id
  dialogDelModal.value = true
}

async function modaCloseDel(val) {
  dialogDelModal.value = false
  if (dialogName.value === 'delAlbums' && val) await onActionAlbumDel(dialogDelId.value)
}

async function onActionAlbumDel(id) {
  try {
    await albumsApi.delAlbum(id).then((resp) => {
      emit('delAlbums', id)
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
async function onActionEdit(obj) {
  modalUpdateData.value = obj
  dialogUpadte.value = true
}

function modalFalse(val) {
  dialog.value = false
  props.data.push(val)
}

// emit функции при обновлении альбома
function modalFalseUpdatePhotos(val) {
  console.log('popka')
  const newList = props.data.map((element) => {
    if (element.id === val.id) {
      return val
    }
    return element
  })
  emit('updateAlbums', newList)
}
function modalUpdateFalse(val) {
  dialogUpadte.value = false
  console.log(val)
}
</script>