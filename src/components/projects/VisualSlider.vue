<template>
  <div class="visual-slider">
    
    <q-list :class="{active: openModal}">

      <q-item class="content" v-show="!openTabs">
        <q-item-section>
          <q-icon
            name="svguse:icons/allIcons.svg#visual-arrow-left"
            class="left"
            size="47px"
            @click="nextTab('prev')"
          />
          <q-icon
            name="svguse:icons/allIcons.svg#visual-arrow-right"
            class="right"
            size="47px"
            @click="nextTab('next')"
          />
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
        
      </q-item>
    </q-list>
  </div>
  
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    images: Array
  },
  setup(props) {
    const tab = ref(props.images[0])
    const openTabs = ref(false)
    const openModal = ref(false)
    const tabList = props.images
    function nextTab(val) {
      const lengthTabs = tabList.length - 1
      const currentTab = tab.value
      const indexCurrent = tabList.indexOf(currentTab)
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
      tab.value = tabList[nextSlideIndex]
    }
    return {
      openModal,
      openTabs,
      text: ref(),
      tab,
      tabList,
      nextTab,
      handleSwipeNext ({ evt, ...newInfo }) {
        nextTab('next')
      },
      handleSwipePrev ({ evt, ...newInfo }) {
        nextTab('prev')
      },
    }
  }
}
</script>
