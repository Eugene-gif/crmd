<template>
  <q-card>
    <div class="q-card-background" @click="modalFalse()"></div>
    <div class="dialog-section">
      <q-card-section class="row items-center justify-between head">
        <div class="title">
          <span v-show="modalCustom === false">Добавить</span>
          <span v-show="modalCustom === true">Редактировать</span>
          менеджера
        </div>
        <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
      </q-card-section>     
      <q-form @submit="addManager">
        <q-card-section class="form-section">
          <label class="lable-title">ФИО</label>
          <q-input 
            v-model="formData.name" 
            class="my-input bg-grey-3" 
            placeholder="Введите ФИО" 
            :rules="[ val => val && val.length > 0 || '']"
          />
        </q-card-section>
        <q-card-section class="form-section">
          <label class="lable-title">Должность</label>
          <q-input
            v-model="formData.info" 
            class="my-input bg-grey-3"
            placeholder="Введите должность" 
            :rules="[ val => val && val.length > 0 || '']"
          />
        </q-card-section>
        <q-card-section class="form-section">
          <label class="lable-title">E-mail:</label>
          <q-input 
            v-model="formData.email" 
            class="my-input bg-grey-3"
            placeholder="Введите e-mail" 
            :rules="[ val => val && val.length > 0 || '']"
          />
        </q-card-section>
        <q-card-section class="form-section">
          <label class="lable-title">Телефон:</label>
          <q-input 
            v-model="formData.phone" 
            class="my-input bg-grey-3"
            placeholder="Введите телефон" 
            :rules="[ val => val && val.length > 0 || '']"
          />
        </q-card-section>
        
        <q-card-actions>
          <q-btn
            unelevated
            no-caps
            padding="20px 10px"
            class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
            type="submit"
          >
            <span class="block">
              <span v-show="modalCustom === false">Добавить</span>
              <span v-show="modalCustom === true">Редактировать</span>
              менеджера
            </span>
          </q-btn>
        </q-card-actions>
      </q-form>
    </div>
  </q-card>
  
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { contractorApi } from 'src/api/contractor';

export default defineComponent({
  name: 'DialogCreateManager',
  props: {
    modalCustom: Boolean,
    data: Object
  },
  setup (props, { emit }) {
    const formData = ref({
      type: 'm',
      name: '',
      email: '',
      phone: '',
      address: 'null',
      info: ''
    })

    async function addManager() {
      if (props.modalCustom === true) {
        try {
          await contractorApi.updateManager(formData.value).then(resp => {
            modalFalse('Менеджер обновлен')
          })
        } catch (err) {
          $q.notify({
            color: 'negative',
            message: 'произошла ошибка'
          })
          console.log(err)
        }
      } else {
        try {
          await contractorApi.AddManager(formData.value).then(resp => {
            modalFalse('Менеджер создан')
          })
        } catch (err) {
          $q.notify({
            color: 'negative',
            message: 'произошла ошибка'
          })
          console.log(err)
        }
      }
    }
    function modalFalse(val) {
      emit('modalFalse', val)
      formData.value.name = ''
      formData.value.email = ''
      formData.value.phone = ''
      formData.value.info = ''
      formData.value.id = null
    }
  
    onMounted(() => {
      if (props.modalCustom === true) {
        console.log(props.data)
        formData.value.id = props.data.id
        formData.value.name = props.data.title
        formData.value.email = props.data.email
        formData.value.phone = props.data.phone
        formData.value.info = props.data.jobtitle
      }
    })

    return {     
      modalFalse,
      formData,
      addManager
    }
  }
})
</script>
