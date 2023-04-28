<template>
  <q-expansion-item
    expand-separator
    default-opened
    class="data"
  >
  <template v-slot:header>
    <div class="title">
      Экспликации
    </div>
    <q-icon name="svguse:icons/allIcons.svg#settings" size="17px" class="settings-icon" @click.stop="true" />
  </template>
    <q-card>
      <!-- <q-card-section class="q-card-head">
        <q-item>
          <div class="title">Адрес</div>
          <q-input v-model="text" class="my-input bg-grey-3" />
        </q-item>
        <q-item>
          <div class="title">Площадь, м2</div>
          <q-input v-model="text2" class="my-input bg-grey-3" />
        </q-item>
        <q-item>
          <div class="title">Тип</div>
          <q-select
            filled
            v-model="select1"
            :options="type"
            stack-label
            placeholder="Выбрать"
            dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
            class="my-select"
            behavior="menu"
            ref="selectDropbox"
            popup-content-class="my-select-menu"
          />
        </q-item>
      </q-card-section> -->
      <q-card-section class="q-card-titles">
        <q-item>
          <div class="title">Помещения</div>
        </q-item>
        <q-item>
          <div class="title">Площадь, м2</div>
        </q-item>
      </q-card-section>
      <q-card-section 
        v-for="premis in data"
        :key="premis"
        class="q-card-content q-card-room"
      >
        <q-item>
          <q-input v-model="premis.name" class="my-input bg-grey-3" placeholder="Введите название">
            <template v-slot:append>
              <q-icon name="svguse:icons/btnIcons.svg#delete" size="16px" @click.stop="delExplication()" />
            </template>
          </q-input>
        </q-item>
        <q-item>
          <q-input v-model="premis.square" class="my-input bg-grey-3" />
        </q-item>
      </q-card-section>

      <q-card-section 
        class="q-card-content q-card-room"
        v-show="openNewExplication"
      >
        <q-item>
          <q-input 
            v-model="FormData.name" 
            class="my-input bg-grey-3" 
            placeholder="Введите название"
            :rules="[ val => val && val.length > 0 || '']"
            @blur="addExplication"
          >
            <template v-slot:append>
              <q-icon name="svguse:icons/btnIcons.svg#delete" size="16px" @click.stop="openNewExplication = false" />
            </template>
          </q-input>
        </q-item>
        <q-item>
          <q-input 
            v-model="FormData.square"
            class="my-input bg-grey-3" 
            type="number" 
            :rules="[ val => val && val !== '']"
            @blur="addExplication"
          />
        </q-item>
      </q-card-section>

      <q-card-section 
        class="q-card-add"
      >
        <q-item>
          <q-btn
            unelevated
            no-caps
            outline
            class="bg-white text-grey-3 my-btn my-effect my-btn--outline"
            style="border-radius: 10px;"
            padding="24px 24px 24px 19px"
            @click="openNewExplication = true"
          >
            <div class="block text-grey-5">Добавить</div>
            <q-icon
              name="svguse:icons/allIcons.svg#plus"
              size="12px"
              color="black"
              style="opacity: 0.3;margin-left: auto;"
            />
          </q-btn>
        </q-item>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import { explicationsApi } from 'src/api/explications'
import { useQuasar } from 'quasar'

export default defineComponent({
  components: {

  },
  props: {
    type: Object,
    data: Array,
    id: String,
  },
  setup(props, {emit}) {
    const $q = useQuasar()

    const openNewExplication = ref(false)
    const FormData = ref({
      name: null,
      square: 0
    })

    async function addExplication() {
      if (FormData.value.name !== null && FormData.value.square !== null) {
        try {
          const resp = await explicationsApi.create(props.id, FormData.value)
          props.data.push(resp.data.data)
          FormData.value.name = null
          FormData.value.square = 0
          openNewExplication.value = false
          $q.notify({
            type: 'positive',
            message: 'Экспликация добавлена'
          })
        } catch (err) {
          console.log(err)
        }
      } else {
        // $q.notify({
        //   type: 'negative',
        //   message: 'Не все поля заполнены'
        // })
      }
    }

    async function delExplication(id) {
      try {
        const resp = await explicationsApi.del(id)
        
        $q.notify({
          type: 'positive',
          message: 'Экспликация удалена'
        })
      } catch (err) {
        console.log(err)
      }
    }

    onMounted(() => {
      
    })

    return {
      // select1,
      openNewExplication,
      addExplication,
      delExplication,
      FormData,
    }
  },
})
</script>
