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
          <div class="circle-close rotate">
            <q-icon
              size="12px"
              name="svguse:icons/allIcons.svg#close-modal"
              color="black"
              style="opacity: 0.3;"
              @click="onFileChange([null])"
            />
          </div>
          <img :src="`https://crmd.crookedweb.site/${userImage}`" alt="">
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
          <!-- <q-btn
            unelevated 
            no-caps
            class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom"
            padding="0"
          >
            <span class="block text-grey-5">Заменить фото</span>
          </q-btn> -->
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
                />
              </div>
              <img :src="item.img" alt="">
            </div>
          </div>
        </div>
        <div class="custom-sec">
          <q-btn
            unelevated 
            no-caps
            flat
            class="my-btn my-effect h-opacity btn-add"
            padding="0"
          >
            <span class="block text-grey-5">Добавить фото</span>
            <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" color="black" />
          </q-btn>
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
import { userApi } from 'src/api/user';
import { useQuasar } from 'quasar'
import PhotoGallery from 'components/Contractor/Profile/PhotoGallery'

export default {
  name: 'ProfileDetilInfo',
  components: {
    PhotoGallery
  },
  setup() {
    const $q = useQuasar()
// system_image
    const images = ref([
      {
        img: '/project-1.jpg'
      },
      {
        img: '/project-2.jpg'
      },
      {
        img: '/project-3.jpg'
      },
      {
        img: '/project-1.jpg'
      },
      {
        img: '/project-2.jpg'
      },
      {
        img: '/project-3.jpg'
      },
      {
        img: '/project-1.jpg'
      },
      {
        img: '/project-2.jpg'
      },
      {
        img: '/project-3.jpg'
      },
    ])
    const userImage = ref()
    function getUserImage() {
      let storageUser = JSON.parse(localStorage.getItem('userInfo'))
      if (storageUser.image === '') {
        userImage.value = storageUser.system_image
      } else {
        userImage.value = storageUser.image
      } 
    }

    function checkFileSize (files) {
      return files.filter(file => file.size < 2048)
    }

    // function checkFileType (files) {
    //   return files.filter(file => file.type === 'image/*')
    // }
    async function onFileChange(file) {
      try {
        await userApi.updateUser(file[0]).then(resp => {
          if (resp.image === '') {
            userImage.value = resp.image
          } else {
            userImage.value = resp.system_image
          }
          
          let userInfo = JSON.stringify(resp)
          localStorage.setItem('userInfo', userInfo)
        })
      } catch (err) {
        console.log(err)
      }
    }

    function onRejected (rejectedEntries) {
      $q.notify({
        type: 'negative',
        message: 'Файл не соответствуeт расширению'
      })
    }
    
    onMounted(() => {
      getUserImage()
    }) 

    return {
      userImage,
      images,
      getUserImage,
      checkFileSize,
      onFileChange,
      onRejected,
    }
  },
}
</script>