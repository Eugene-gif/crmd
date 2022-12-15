<template>
  <q-dialog
    v-model="dialog"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog contractor-dialog-share"
  >
    <DialogUploadImg 
      @modalFalse="modalFalse"
    />
  </q-dialog>
  <q-dialog
    v-model="dialogUpdate"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog contractor-dialog-share"
  >
    <DialogUpdateAlbum 
      @modalFalse="modalFalseUpdate"
      :data="modalUpdateData"
    />
  </q-dialog>
  <q-dialog
    v-model="dialogDelModal"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog contractor-dialog-share"
  >
    <DialogDelite 
      @modalFalse="modalOpenDel"
    />
  </q-dialog>

  <q-expansion-item
    expand-separator
    default-opened
    class="foto q-expansion-my"
  >
    <template v-slot:header>
      <div class="title">
        Фото
      </div>
    </template>

    <q-card class="q-card-visual-slider">
      <q-card-section
          v-for="item in visual"
          :key="item.id"
        >
          <VisualSlider
            :images="item.images"
          />
          <div class="row desc">
            <div class="title">{{item.name}}</div>
          </div>
          <div class="row security">
            <q-btn
              unelevated
              no-caps
              class="bg-grey-3 text-grey-5 my-btn my-effect btn-kolvo"
              padding="7.5px 12px"
            >
              {{item.images.length}} фото
            </q-btn>
            <div class="btn-sec">
              <q-btn
                unelevated 
                no-caps
                flat
                class="my-btn my-effect h-opacity btn-add"
                padding="0"
                @click="updateAlubum(item)"
              >
                <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="16px" class="q-mr-sm" />
                <span class="block text-grey-5">Редактировать</span>
              </q-btn>
              <q-btn
                unelevated 
                no-caps
                flat
                class="my-btn my-effect h-opacity btn-add"
                padding="0"
                @click="callDelDialog('delAvatar', item.id)"
              >
                <q-icon name="svguse:icons/btnIcons.svg#delete" color="grey-8" size="16px" class="q-mr-sm" />
                <span class="block text-grey-5">Удалить</span>
              </q-btn>
            </div>
          </div>
          <!-- action -->
      </q-card-section>
    </q-card>
    <q-btn
      unelevated 
      no-caps
      class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
      padding="5px 25px"
      @click="dialog = true"
    >
      <span class="block text-grey-5">Добавить альбом</span>
      <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" style="margin-left: auto;" />
    </q-btn>
  </q-expansion-item>
</template>

<script>
import { ref, onMounted } from 'vue'
import VisualSlider from 'components/projects/VisualSlider'
import DialogUploadImg from 'src/pages/Contractor/DialogUploadImg.vue'
import DialogUpdateAlbum from 'src/pages/Contractor/DialogUpdateAlbum.vue'
import DialogDelite from 'components/dialog/DialogDelite'
import { useQuasar } from 'quasar'
import { albumsApi } from 'src/api/albums'

export default {
  name: 'ProfilePhotos',
  components: {
    VisualSlider,
    DialogUploadImg,
    DialogUpdateAlbum,
    DialogDelite
  },
  setup() {
    const $q = useQuasar()
    const dialog = ref(false)
    const dialogUpdate = ref(false)
    const dialogDelModal = ref(false)
    const dialogName = ref()
    const delAlbumId = ref()
    const visual = ref([])
    const modalUpdateData = ref()
    
    async function getAllDataAlbums() {
      try {
        await albumsApi.getAllAlbums().then(resp => {
          visual.value = resp
        })
      } catch (err) {
        $q.notify({
          color: 'negative',
          message: 'Произошла ошибка получения данных'
        })
        console.log(err)
      }
    }

    async function delAlbum(id) {
      try {
        await albumsApi.delAlbum(id).then(resp => {
          console.log(resp)
          visual.value = visual.value.filter((item) => item.id !== id)
          setTimeout(() => {
            $q.notify({
              color: 'positive',
              message: 'Альбом удален'
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

    async function updateAlubum(album) {
      dialogUpdate.value = true
      modalUpdateData.value = album
    }

    function callDelDialog(modal, id) {
      dialogName.value = modal
      dialogDelModal.value = true
      delAlbumId.value = id
    }

    function modalOpenDel(val) {
      dialogDelModal.value = false
      if (dialogName.value === 'delAvatar' && val) delAlbum(delAlbumId.value)
      delAlbumId.value = null
    }
    

    onMounted( async () => {
      await getAllDataAlbums()
    })
        
    return {
      visual,
      dialog,
      dialogUpdate,
      modalUpdateData,
      dialogDelModal,
      dialogName,
      delAlbumId,
      delAlbum,
      updateAlubum,
      callDelDialog,
      modalOpenDel,
      modalFalse(val) {
        dialog.value = false
        visual.value.push(val)
      },
      modalFalseUpdate(val) {
        dialog.value = false
        visual.value.push(val)
      },
    }
  },
}
</script>