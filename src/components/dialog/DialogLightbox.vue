<template>
  <q-card>
    <div class="q-card-background" @click="modalFalseLightbox(false)"></div>
    <div class="dialog-section">
      <div class="circle-close rotate" @click="modalFalseLightbox(false)">
        <q-icon
          size="12px"
          name="svguse:icons/allIcons.svg#close-modal"
          color="black"
          style="opacity: 0.3;"
          
        />
      </div>
      <q-item-section>
        <div class="circle-close left">
          <q-icon
            name="svguse:icons/allIcons.svg#arrow-box"
            size="16px"
            @click="nextTab('prev')"
          />
        </div>
        <div class="circle-close right">
          <q-icon
            name="svguse:icons/allIcons.svg#arrow-box"
            size="16px"
            @click="nextTab('next')"
          />
        </div>

        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="slide-right"
          transition-next="slide-left"
        >
          <q-tab-panel
            v-for="item in tabList"
            :key="item"
            :name="item"
            v-touch-swipe.mouse.right="handleSwipePrev"
            v-touch-swipe.mouse.left="handleSwipeNext"
            :style="`background: url(${item})`"
            :class="{'image-chek': item == ' '}"
          />
        </q-tab-panels>
      </q-item-section>
    </div>
  </q-card>
</template>

<script>
import {ref, defineComponent, onMounted} from 'vue'

export default defineComponent({
  name: 'DialogLightbox',
  props: {
    images: Array,
    currentObj: Object
  },
  setup(props, { emit }) {
    const tab = ref(props.currentObj.url)
    const openTabs = ref(false)
    const openModal = ref(false)
    const tabList = ref([])
    
    function nextTab(val) {
      const lengthTabs = tabList.value.length - 1
      const currentTab = tab.value
      const indexCurrent = tabList.value.indexOf(currentTab)
      let nextSlideIndex = 0

      if (val === 'prev') {
        nextSlideIndex = indexCurrent - 1
        if (nextSlideIndex < 0) {
          nextSlideIndex = lengthTabs
        }
      }
      if (val === 'next') {
        nextSlideIndex = indexCurrent + 1
        if (nextSlideIndex > lengthTabs) {
          nextSlideIndex = 0
        }
      }
      tab.value = tabList.value[nextSlideIndex]
    }

    function modalFalseLightbox(val) {
      emit('modalFalseLightbox', val)
    }

    function start() {
      tabList.value = props.images.map(el => {
        return el.url
      })
    }

    onMounted( async () => {
      await start()
    })

    return {
      modalFalseLightbox,
      openModal,
      openTabs,
      text: ref(),
      tab,
      tabList,
      nextTab,
      start,
      handleSwipeNext ({ evt, ...newInfo }) {
        nextTab('next')
      },
      handleSwipePrev ({ evt, ...newInfo }) {
        nextTab('prev')
      },
    }
  },
})
</script>