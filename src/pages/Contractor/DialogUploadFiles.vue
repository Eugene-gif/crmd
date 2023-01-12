<template>
  <q-card>
    <div class="q-card-background" @click="modalFalse()"></div>
    <div class="dialog-section">
      <q-form
        @submit="uploadFiles"
      >
        <q-card-section class="row items-center justify-between head">
          <div class="title">
            Загрузить файл
          </div>
          <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
        </q-card-section>     

        <q-card-section class="form-section">
          <label class="lable-title">Название файла</label>
          <q-input 
            v-model="formData.name" 
            class="my-input bg-grey-3" 
            placeholder="Укажите название" 
            :rules="[ val => val && val.length > 0 || '']"
          />
        </q-card-section>
        
        <q-card-section class="form-section form-section-desc">
          <div class="form-section__text">
            Загрузите файл одним из двух способов: напрямую через загрузчик внизу, либо вставив ссылку на файл, если он уже хранится в вашем облачном хранилище. Рекомендуем второй вариант, так как место для ваших файлов на нашем сервисе ограничено. 
          </div>
          <a href="" target="_blank" class="form-section__link">Подробнее об условиях</a>
        </q-card-section>

        <q-card-section class="form-section">
          <label class="lable-title">Ссылка на файлообменник</label>
          <q-input 
            v-model="formData.link" 
            class="my-input bg-grey-3" 
            placeholder="Вставьте ссылку" 
          />
        </q-card-section>
        <q-card-section class="form-section">
          <label class="lable-title">Загрузка файл</label>
          <div class="multiple-upload-files">
            <q-uploader
              label="Выберите файл"
              :filter="checkFileSize"
              :max-files="1"
              @added="onFileChange"
              accept=".doc, .pdf, .docx"
              @rejected="onRejected"
              :disable="(formData.link.length > 0)"
            />
            <!-- <div class="text">Поле для размещения</div> -->
          </div>
        </q-card-section>
        {{uploadActive}}
        <q-card-actions>
          <q-btn
            unelevated
            no-caps
            padding="20px 10px"
            class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
            type="submit"
          >
            <span class="block">
              Добавить
            </span>
          </q-btn>
        </q-card-actions>
      </q-form>
    </div>
    
  </q-card>
  
</template>

<script>
import { defineComponent, ref, onMounted , computed} from 'vue'
import { filesApi } from 'src/api/files';
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'DialogUploadImg',
  props: {
    
  },
  setup (props, { emit }) {
    const $q = useQuasar()

    const formData = ref({
      name: '',
      link: '',
      files: []
    })

    async function onFileChange(file) {
      formData.value.files = file
    }
    function checkFileSize (files) {
      return files.filter(file => file.size > 2048)
    }
    function onRejected () {
      $q.notify({
        type: 'negative',
        message: 'Файл не соответствуeт расширению'
      })
    }

    async function uploadFiles() {
      console.log(formData.value)
      if (formData.value.link.length > 0 || formData.value.files.length > 0) {
        try {
          await filesApi.uploadFiles(formData.value).then(resp => {
            console.log(resp)
            modalFalse()
            $q.notify({
              color: 'positive',
              message: 'файл загружен'
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
          message: 'Загрузите пожалуйста файл'
        })
      }
    }

    function modalFalse(val) {
      emit('modalFalse', val)
    }
  
    onMounted(() => {
      
    })

    return {     
      formData,
      modalFalse,
      onFileChange,
      onRejected,
      uploadFiles,
      checkFileSize
    }
  }
})
</script>
