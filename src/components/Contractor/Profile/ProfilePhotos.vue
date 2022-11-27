<template>
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
              {{item.rights}}
            </q-btn>
            <div class="btn-sec">
              <q-btn
                unelevated 
                no-caps
                flat
                class="my-btn my-effect h-opacity btn-add"
                padding="0"
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
    >
      <span class="block text-grey-5">Добавить альбом</span>
      <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" style="margin-left: auto;" />
    </q-btn>
  </q-expansion-item>
</template>

<script>
import { ref, onMounted } from 'vue'
import VisualSlider from 'components/projects/VisualSlider'

export default {
  name: 'ProfilePhotos',
  components: {
    VisualSlider
  },
  setup() {
    const visual = ref([
      {
        id: 1,
        images: [
          ' ',
          '/project-2.jpg',
          '/project-3.jpg',
        ],
        name: 'Фото помещения',
        rights: '5 фото'
      },
      {
        id: 2,
        images: [
          '/project-1.jpg',
          '/project-2.jpg',
          '/project-3.jpg',
        ],
        name: 'Визуализации',
        rights: '5 фото'
      },
      {
        id: 3,
        images: [
          '/project-1.jpg',
          '/project-2.jpg',
          '/project-3.jpg',
        ],
        name: 'Визуализации',
        rights: '5 фото'
      }
    ])

    return {
      visual
    }
  },
}
</script>