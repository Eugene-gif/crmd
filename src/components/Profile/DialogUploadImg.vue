<template>
  <q-card>
    <div class="q-card-background" @click="modalFalse()"></div>
    <div class="dialog-section">
      <q-form
        @submit="createAlbum"
      >
        <q-card-section class="row items-center justify-between head">
          <div class="title">
            Добавление альбома
          </div>
          <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
        </q-card-section>     

        <q-card-section class="form-section">
          <label class="lable-title">Название альбома</label>
          <q-input 
            v-model="formData.name" 
            class="my-input bg-grey-3" 
            placeholder="Введите название" 
            :rules="[ val => val && val.length > 0 || '']"
          />
        </q-card-section>
        <q-card-section class="form-section">
          <label class="lable-title">Описание альбома</label>
          <q-input
            type="textarea"
            v-model="formData.description"
            class="my-input bg-grey-3 my-textarea"
            placeholder="Введите описание"
            style="min-height: 140px;"
            
          />
        </q-card-section>

        <q-card-section class="form-section">
          <label class="lable-title">Загрузка фото</label>
          <div 
            class="multiple-upload"
            :class="{'multiple-upload-uploaded': formData.images.length > 0}"
          >
            <q-uploader
              label="Выберите файл"
              multiple
              max-files="24"
              
              @added="onFileChange"
              accept=".jpg, image/*"
              @rejected="onRejected"
              @removed="delFileInArr"
              :rules="[ val => val && val.length > 0 || '']"
            />
            <!-- <div class="text">Поле для размещения</div> max-total-size="4096" -->
          </div>
        </q-card-section>
        
        <q-card-actions>
          <q-btn
            unelevated
            no-caps
            padding="20px 10px"
            class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
            type="submit"
            :class="{'btn-load': lodingBtn}"
          >
            <span class="block">
              Создать альбом 
            </span>
          </q-btn>
        </q-card-actions>
      </q-form>
    </div>
    
  </q-card>
  
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { albumsApi } from 'src/api/albums';
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'DialogUploadImg',
  props: {
    project_id: String
  },
  setup (props, { emit }) {
    const $q = useQuasar()
    const lodingBtn = ref(false)

    const formData = ref({
      name: '',
      description: '',
      images: []
    })
    const lenghtFiles = ref(null)

    async function onFileChange(file) {
      formData.value.images = file
    }
    function onRejected (err) {
      console.log(err[0])
      if (err[0].failedPropValidation === 'max-files') {
        $q.notify({
          type: 'negative',
          message: 'Максимальное количество фото - 24 штуки'
        })
      }
      // if (err[0].failedPropValidation === 'max-total-size') {
      //   $q.notify({
      //     type: 'negative',
      //     message: 'Максимальный размер загружаемого контента = 4056mb'
      //   })
      // }
      
    }
    function delFileInArr(file) {
      formData.value.images = formData.value.images.filter((el) => el.__key !== file[0].__key)
    }

    async function createAlbum() {
      lodingBtn.value = true
      if (formData.value.images.length > 0) {
        try {
          await albumsApi.createAlbum(props.project_id, formData.value).then(resp => {
            modalFalse(resp)
            $q.notify({
              color: 'positive',
              message: 'Альбом создан'
            })
          })
        } catch (err) {
          $q.notify({
            color: 'negative',
            message: 'произошла ошибка'
          })
          console.log(err)
        }
      } else {
        $q.notify({
          color: 'negative',
          message: 'Загрузите пожалуйста фото'
        })
      }
      lodingBtn.value = false
    }

    function modalFalse(val) {
      emit('modalFalse', val)
    }
  
    onMounted(() => {
      
    })

    return {     
      formData,
      lodingBtn,
      lenghtFiles,
      modalFalse,
      onFileChange,
      onRejected,
      createAlbum,
      delFileInArr
    }
  }
})
</script>
