<template>
  <div class="contractor-photos-info">
    <div class="section-photo" style="margin-bottom: 63px;">
      <div class="row justify-between items-center head">
        <div class="text-h2">Визуализации</div>
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite q-mr-xs lg-visible"
          label="Назад"
        />
      </div>  
      <div class="row visuaisation-4in4">
        <div 
          class="item"
          v-for="item in arrImages"
          :key="item"
        >
          <div class="image">
            <img :src="item.imageUrl" alt="">
          </div>
          <div class="subtitle">{{item.title}}</div>
        </div>
      </div>  
      <div class="q-card-prev">
        <q-btn
          unelevated
          no-caps
          outline
          class="bg-white text-grey-3 my-btn my-effect с"
          style="border-radius: 10px;width: 100%;"
          padding="24px 24px 24px 19px"
        >
          <div class="block text-grey-5">Назад к списку альбомов</div>
          <q-icon size="18px" name="svguse:icons/allIcons.svg#back" style="margin-left: auto;" />
        </q-btn>
      </div>
    </div>

    <div class="section-photo lg-visible">
      <div class="row justify-between items-center head">
        <div class="text-h2">Визуализации</div>
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite q-mr-xs lg-visible"
          label="Назад"
        />
      </div>  
      <div class="row visuaisation-3in3">
        <div 
          class="item"
          v-for="item in arrImages"
          :key="item"
        >
          <div class="image">
            <img :src="item.imageUrl" alt="">
          </div>
          <div class="subtitle">{{item.title}}</div>
        </div>
      </div>  
      <div class="q-card-prev">
        <q-btn
          unelevated
          no-caps
          outline
          class="bg-white text-grey-3 my-btn my-effect с"
          style="border-radius: 10px;width: 100%;"
          padding="24px 24px 24px 19px"
        >
          <div class="block text-grey-5">Назад к списку альбомов</div>
          <q-icon size="18px" name="svguse:icons/allIcons.svg#back" style="margin-left: auto;" />
        </q-btn>
      </div>
    </div>
      
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  components: {
    
  },
  setup() {
    const arrImages = ref([
      {
        title: 'Кухня 1',
        imageUrl: '/project-4 10.jpg'
      },
      {
        title: 'Кухня 2',
        imageUrl: '/project-4 11.jpg'
      },
      {
        title: 'Спальня',
        imageUrl: '/project-4 12.jpg'
      },
      {
        title: 'Гостиная 1',
        imageUrl: '/project-4 13.jpg'
      },
      {
        title: 'Гостиная 2',
        imageUrl: '/project-4 14.jpg'
      },
      {
        title: 'Гостиная 3',
        imageUrl: '/project-4 15.jpg'
      },
      {
        title: 'Коридор',
        imageUrl: '/project-4 16.jpg'
      },
      {
        title: 'Коридор',
        imageUrl: '/project-4 17.jpg'
      },
      {
        title: 'Гостиная 3',
        imageUrl: '/project-4 18.jpg'
      },
    ])
    return {
      arrImages
    };
  },
};
</script>