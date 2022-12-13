<template>
  <q-expansion-item
    expand-separator
    default-opened
    class="foto-gallery q-expansion-my"
  >
    <template v-slot:header>
      <div class="title">
        Общая информация
      </div>
      <q-btn
        unelevated 
        no-caps
        flat
        class="my-btn my-effect h-opacity btn-custom"
        style="margin-left: auto;"
        color="grey-5"
        padding="0"
        label="Изменить"
      />
    </template>

    <div class="container">
      <div class="item avatar">
        <div class="title">
          Аватар
        </div>
        <div class="sec-imgage">
          <div class="circle-close rotate" v-if="!systemImage">
            <q-icon
              size="12px"
              name="svguse:icons/allIcons.svg#close-modal"
              color="black"
              style="opacity: 0.3;"
              @click="onFileChange()"
            />
          </div>
          <img :src="`http://crmd.crookedweb.ru/${userImage}`" alt="">
        </div>
        <div class="sec-btn">
          <div class="btn-upload">
            <q-uploader
              @added="onFileChange"
              accept=".jpg, image/*"
              @rejected="onRejected"
            />
            <label class="text">Заменить фото</label>
          </div>
          <q-btn
            unelevated 
            no-caps
            class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom btn-custom-del mb-visible"
            padding="0"
          >
            <span class="block text-grey-5">Удалить аватар</span>
          </q-btn>
        </div>
      </div>

      <div class="item scrollbar">
        <div class="title">
          Фото на главной
        </div>
        <div class="sec">
          <div class="no-photo" v-if="!images.length">Фото для главной пока не загружены</div>
          <div class="scroll-x my-scrollbar">
            <div
              class="sec-imgage"
              v-for="item in images"
              :key="item"
            >
              <div class="circle-close mini rotate">
                <q-icon
                  size="12px"
                  name="svguse:icons/allIcons.svg#close-modal"
                  color="black"
                  style="opacity: 0.3;"
                  @click="delImage(item.id)"
                />
              </div>
              <img :src="`http://crmd.crookedweb.ru/${item.file}`" alt="">
            </div>
          </div>
        </div>
        <div class="custom-sec">
          <div class="btn-upload-2">
            <q-uploader
              @added="uploadProfilePhoto"
              multiple
              accept=".jpg, image/*"
              @rejected="onRejected"
            />
            <div class="upload-content">
              <label class="text">Добавить фото</label>
              <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" color="black" />
            </div>
          </div>
          <q-btn
            unelevated 
            no-caps
            flat
            class="my-btn my-effect h-opacity btn-delete"
            style="margin-left: auto;opacity: 0.3"
            color="grey-5"
            padding="0"
            label="Удалить все"
          />
        </div>
      </div>
    </div>

    <PhotoGallery />
  </q-expansion-item>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { contractorApi } from 'src/api/contractor';
import { albumsApi } from 'src/api/albums';
import { imagesApi } from 'src/api/images';
import { useQuasar } from 'quasar'
import PhotoGallery from 'components/Contractor/Profile/PhotoGallery'

export default {
  name: 'ProfileDetilInfo',
  components: {
    PhotoGallery
  },
  setup() {
    const $q = useQuasar()

    // загрузка аватарки
    const images = ref([])

    const userImage = ref()
    const systemImage = ref(true)

    function getUserImage() {
      let storageUser = JSON.parse(localStorage.getItem('userInfo'))
      if (storageUser.image === '') {
        userImage.value = storageUser.system_image
      } else {
        userImage.value = storageUser.image
        systemImage.value = false
      } 
    }


    function checkFileSize (files) {
      return files.filter(file => file.size < 2048)
    }
    function onRejected (rejectedEntries) {
      $q.notify({
        type: 'negative',
        message: 'Файл не соответствуeт расширению'
      })
    }
    async function onFileChange(file) {
      if (file === undefined) {
        file = [null]
      }
      try {
        await contractorApi.updateContractorAvatar(file[0]).then(resp => {
          let storageUser = JSON.parse(localStorage.getItem('userInfo'))
          if (resp.image == '') {
            userImage.value = storageUser.system_image
            systemImage.value = true
          } else {
            userImage.value = resp.image
            systemImage.value = false
          }
          storageUser.image = resp.image
          let userInfo = JSON.stringify(storageUser)
          localStorage.setItem('userInfo', userInfo)
        })
      } catch (err) {
        console.log(err)
      }
    }
    async function uploadProfilePhoto(file) {
      let storageUser = JSON.parse(localStorage.getItem('userInfo'))
      let id = storageUser.profile_album_id
      try {
        await albumsApi.addImagesInAlbum(file, id).then(resp => {
          console.log(resp)
        })
      } catch (err) {
        console.log(err)
      }
    }
    async function getAlbum() {
      let storageUser = JSON.parse(localStorage.getItem('userInfo'))
      let id = storageUser.profile_album_id
      try {
        await albumsApi.getAlbum(id).then(resp => {
          images.value = resp
        })
      } catch (err) {
        console.log(err)
      }
    }
    async function delImage(id) {
      try {
        await imagesApi.delImage(id).then(resp => {
          images.value = images.value.filter((item) => item.id !== id)
          $q.notify({
            type: 'positive',
            message: 'Картинка удалена'
          })
        })
      } catch (err) {
        console.log(err)
        $q.notify({
          type: 'negative',
          message: 'Произошла ошибка'
        })
      }
    }
    
    // загрузка множества 


    onMounted(() => {
      getUserImage()
      getAlbum()
    }) 

    return {
      userImage,
      images,
      systemImage,
      getUserImage,
      checkFileSize,
      onFileChange,
      onRejected,
      uploadProfilePhoto,
      getAlbum,
      delImage,
    }
  },
}
</script>