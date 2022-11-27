<template>
  <q-expansion-item
    expand-separator
    default-opened
    class="files23d q-expansion-my"
  >
    <template v-slot:header>
      <div class="title">
        2D/3D файлы
      </div>
    </template>

    <q-list class="contractor-list">
      <q-item>
        <q-item-section>
          <div class="subtitle">
            Архив с 3д-моделями столов
          </div>
          <div class="size"><span class="lg-visible">ZIP,</span> 1 мб</div>
          <span class="mb-visible format">ZIP</span>
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
          <q-icon name="svguse:icons/allIcons.svg#download" size="17px" />
        </q-item-section>
      </q-item>


      <q-item>
        <q-item-section>
          <div class="subtitle">
            СтройПро
          </div>
          <div class="size"><span class="lg-visible">Ссылка</span></div>
          <span class="mb-visible format">Ссылка</span>
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
          <q-icon name="svguse:icons/allIcons.svg#download" size="17px" />
        </q-item-section>
      </q-item>
      
    </q-list>

    <q-btn
      unelevated 
      no-caps
      class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
      padding="5px 25px"
    >
      <span class="block text-grey-5">Загрузить файл</span>
      <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" style="margin-left: auto;" />
    </q-btn>
  </q-expansion-item>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ProfileTwoThreeD',
  setup() {

    return {
      
    }
  },
}
</script>