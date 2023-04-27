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
      <q-card-section class="q-card-head">
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
      </q-card-section>
      <q-card-section class="q-card-titles">
        <q-item>
          <div class="title">Помещения</div>
        </q-item>
        <q-item>
          <div class="title">Площадь, м2</div>
        </q-item>
      </q-card-section>
      <q-card-section 
        v-for="premis in premises"
        :key="premis"
        class="q-card-content q-card-room"
      >
        <q-item>
          <q-input v-model="premis.input" class="my-input bg-grey-3" placeholder="Введите название">
            <template v-slot:append>
              <q-icon name="svguse:icons/btnIcons.svg#delete" size="16px" />
            </template>
          </q-input>
        </q-item>
        <q-item>
          <q-input v-model="premis.s" class="my-input bg-grey-3" />
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
import { useQuasar } from 'quasar'

export default defineComponent({
  components: {

  },
  props: {
    type: Object
  },
  setup(props, {emit}) {
    const $q = useQuasar()

    const select1 = ref(
      {
        label: 'Квартира',
        value: 1
      },
    )

    const premises = ref([
      {
        input: 'Кухня',
        s: 115
      },
      {
        input: 'Прихожая',
        s: 5
      },
      {
        input: 'Спальня',
        s: 13
      },
      {
        input: '',
        s: 0
      },
    ])

    const text4 = ref('')
    const text2 = ref('115')
    const text = ref('г. Краснодар, ул. Ленина, д. 15')

    onMounted(() => {
      
    })

    return {
      select1,
      premises,
      text4,
      text2,
      text,
    }
  },
})
</script>
