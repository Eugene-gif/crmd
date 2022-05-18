<template>
  <div class="emoji">
    <q-input v-model="text" class="my-input bg-grey-3" placeholder="Введите название">
      <template v-slot:after>
        <div class="q-mr-md q-pr-xs emoji-div" @click="openModal = !openModal">
          <q-icon
            size="16px"
            name="svguse:icons/financeTable.svg#smaile"
            v-show="!emojiIcon"
          />
          {{emojiIcon}}
        </div>
        
      </template>
    </q-input>
    <q-card :class="{active: openModal}">
      <q-item class="content" v-show="!openTabs">
        <q-item-section class="head">
          <q-icon
            color="white"
            name="svguse:icons/allIcons.svg#slider-left"
            class="left"
            @click="nextTab('prev')"
          />
          <q-item-label @click="openTabs = true">{{tab}}</q-item-label>
          <q-icon
            color="white"
            name="svguse:icons/allIcons.svg#slider-right"
            class="right"
            @click="nextTab('next')"
          />
        </q-item-section>

        <q-item-section class="foot">
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="Символы">
              <div
                class="symbol"
                v-for="symbol in symbols[0]"
                :key="symbol"
              >
                <span @click="emojiFunc(symbol)">{{symbol}}</span>
              </div>
            </q-tab-panel>
            <q-tab-panel name="Природа">
              <div
                class="symbol"
                v-for="symbol in symbols[1]"
                :key="symbol"
              >
                <span @click="emojiFunc(symbol)">{{symbol}}</span>
              </div>
            </q-tab-panel>
            <q-tab-panel name="Еда">
              <div
                class="symbol"
                v-for="symbol in symbols[2]"
                :key="symbol"
              >
                <span @click="emojiFunc(symbol)">{{symbol}}</span>
              </div>
            </q-tab-panel>
            <q-tab-panel name="Занятия">
              <div
                class="symbol"
                v-for="symbol in symbols[3]"
                :key="symbol"
              >
                <span @click="emojiFunc(symbol)">{{symbol}}</span>
              </div>
            </q-tab-panel>
            <q-tab-panel name="Здания">
              <div
                class="symbol"
                v-for="symbol in symbols[4]"
                :key="symbol"
              >
                <span @click="emojiFunc(symbol)">{{symbol}}</span>
              </div>
            </q-tab-panel>
            <q-tab-panel name="Предметы">
              <div
                class="symbol"
                v-for="symbol in symbols[5]"
                :key="symbol"
              >
                <span @click="emojiFunc(symbol)">{{symbol}}</span>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-item-section>
      </q-item>
      <q-item class="tabs" :class="{active: openTabs}">
        <q-tabs
          v-model="tab"
          class="q-tabs-null"
          align="justify"
          @click="openTabs = false"
        >
        <!-- tabList -->
          <q-tab 
            v-for="tab in tabList"
            :key="tab"
            :name="tab"
            :label="tab"
          />
        </q-tabs>
      </q-item>
    </q-card>
  </div>
  
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const emojiIcon = ref()
    const tab = ref('Символы')
    const openTabs = ref(false)
    const openModal = ref(false)
    const tabList = [
      'Символы',
      'Природа',
      'Еда',
      'Занятия',
      'Здания',
      'Предметы'
    ]
    return {
      emojiIcon,
      openModal,
      openTabs,
      text: ref(),
      tab,
      tabList,
      symbols: [
        {
          icon1: '❤',
          icon2: '💛',
          icon3: '💚',
          icon4: '💙',
          icon5: '💜',
          icon6: '🖤',
          icon7: '💔',
          icon8: '💝',
          icon9: '❌',
          icon10: '⭕',
          icon11: '🛑',
          icon12: '⛔',
          icon13: '🚫',
          icon14: '⚠',
          icon15: '♻',
          icon16: '🔶',
          icon17: '🔷',
          icon18: '⚪',
          icon19: '🔵️',
          icon20: '🔴',
          icon21: '♥',
          icon22: '♦',
          icon23: '♠',
          icon24: '♣️'
        },
        {
          icon1: '☀️',
          icon2: '🌍',
          icon3: '💦',
          icon4: '🐶',
          icon5: '🐱',
          icon6: '🐭',
          icon7: '🐹',
          icon8: '🐰',
          icon9: '🦊',
          icon10: '🐻',
          icon11: '🐼',
          icon12: '🐨',
          icon13: '🐯',
          icon14: '🦁',
          icon15: '🐮',
          icon16: '🐷',
          icon17: '🌺',
          icon18: '🌸',
          icon19: '🌼',
          icon20: '🌻',
          icon21: '⭐',
          icon22: '🔥',
          icon23: '❄',
          icon24: '⛄️'
        },
        {
          icon1: '🍏',
          icon2: '🍎',
          icon3: '🍐',
          icon4: '🍊',
          icon5: '🍋',
          icon6: '🍑',
          icon7: '🍅',
          icon8: '🍱',
          icon9: '🍟',
          icon10: '🍤',
          icon11: '🎂',
          icon12: '🍰',
          icon13: '🍭',
          icon14: '🍿',
          icon15: '🍩',
          icon16: '🥂',
          icon17: '🥃',
          icon18: '🍽',
        },
        {
          icon1: '⚽',
          icon2: '🏀',
          icon3: '🎾',
          icon4: '🏐',
          icon5: '🎱',
          icon6: '🏓',
          icon7: '🎿',
          icon8: '🏵',
          icon9: '🎤',
          icon10: '🎭',
          icon11: '️🎸',
          icon12: '🎺',
          icon13: '🎷',
          icon14: '🎻',
          icon15: '🎯',
          icon16: '🎳',
          icon17: '🎮',
          icon18: '🚀',
          icon19: '🚁',
          icon20: '⛵',
          icon21: '🗽',
          icon22: '🎠',
          icon23: '🏖',
          icon24: '🏕',
        },
        {
          icon1: '🏠',
          icon2: '🏡',
          icon3: '🏢',
          icon4: '🏗',
          icon5: '🏬',
          icon6: '🏣',
          icon7: '🏤',
          icon8: '🏥',
          icon9: '🏦',
          icon10: '🏨',
          icon11: '️🏪',
          icon12: '🏫',
          icon13: '🏩',
          icon14: '💒',
          icon15: '🏛',
          icon16: '⛪',
          icon17: '🕌',
          icon18: '🕍',
          icon19: '🏭',
          icon20: '🏰',
          icon21: '🏗',
        },
        {
          icon1: '⏱',
          icon2: '💡',
          icon3: '🔋',
          icon4: '💎',
          icon5: '💣',
          icon6: '🛀',
          icon7: '🛎',
          icon8: '🛍',
          icon9: '🎈',
          icon10: '🏮',
          icon11: '️📍',
          icon12: '🔐',
          icon13: '🔒',
          icon14: '🔓',
          icon15: '👑',
          icon16: '💵',
          icon17: '🏆',
          icon18: '⏰',
          icon19: '🎩',
          icon20: '👒',
        }
      ],
      emojiFunc(icon) {
        emojiIcon.value = icon
        openModal.value = false
      },
      nextTab(val) {
        const lengthTabs = tabList.length - 1
        const currentTab = tab.value
        const indexCurrent = tabList.indexOf(currentTab)
        let nextSlideIndex = 0
  
        if (val === 'prev') {
          nextSlideIndex = indexCurrent - 1
          if (nextSlideIndex < 0) {
            nextSlideIndex = 0
          }
        }
        if (val === 'next') {
          nextSlideIndex = indexCurrent + 1
          if (nextSlideIndex > lengthTabs) {
            nextSlideIndex = lengthTabs
          }
        }
        tab.value = tabList[nextSlideIndex]
      }
    }
  }
}
</script>
