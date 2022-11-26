<template>
  <q-menu
    class="q-menu-userinfo"
    :anchor="`${anchor[0]} ${anchor[1]}`"
    :self="`${self[0]} ${self[1]}`"
    :style="{transform: `translateY(${translateY})`}"
  >
    <q-item clickable>
      <q-item-section class="head">
        <q-item-section class="name">
          <img src="" alt="">
          <q-item-label>
            <div class="name-user">Имя Фамилия</div>
            <div class="email-user">example@gmail.com</div>
          </q-item-label>
        </q-item-section>
        <q-item-section class="reviews">
          <q-tabs
            v-model="tab"
            class="q-tabs-reviews"
          >
            <q-tab name="1" icon="svguse:icons/allIcons.svg#like" label="12" />
            <q-tab name="2" icon="svguse:icons/allIcons.svg#dislike" label="5" />
          </q-tabs>
          <q-item-label>17 отзывов</q-item-label>
        </q-item-section>
      </q-item-section>
      <q-item-section class="foot">
        <q-item-section class="message">
          <q-list class="q-list-user-info">
            <q-item
              class="link-mail"
              link
              :href="`mailto:`"
            >
              <q-icon color="white" size="20px" name="svguse:icons/allIcons.svg#mail" />
            </q-item>
            <q-item
              class="link-whatsap"
              link
              :href="``"
            >
              <img src="~assets/whatsapp.svg" alt="">
            </q-item>
            <q-item
              class="link-telegram"
              link
              :href="``"
            >
              <img src="~assets/telegram.svg" alt="">
            </q-item>
            <q-item
              class="link-insta"
              link
              :href="``"
            >
              <img src="~assets/instagram.svg" alt="">
            </q-item>
          </q-list>
        </q-item-section>
        <a :href="`tel:`" class="foot__tel">+7 (999) 999-99-99</a>
      </q-item-section>
    </q-item>
  </q-menu>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'CardInfo',
  props: {
    anchor: Array,
    self: Array,
    translateY: String
  },
  setup() {
    const tab = ref();
    return {
      tab
    }
  },
})
</script>