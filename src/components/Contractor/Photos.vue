<template>
  <div class="contractor-photos">
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
              class="bg-grey-3 text-grey-5 my-btn my-effect"
              padding="7.5px 12px"
            >
              {{item.rights}}
            </q-btn>
          </div>
          <!-- action -->
      </q-card-section>
    </q-card>
    
  </div>
</template>

<script>
import { ref } from "vue";
import VisualSlider from 'components/projects/VisualSlider.vue'

export default {
  components: {
    VisualSlider
  },
  setup() {
    const activatedText = ref(false)
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
      activatedText,
      visual,
    };
  },
};
</script>