<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <q-header class="bg-white" bordered>
      <q-toolbar>
        <q-input color="grey-2" class="header__input__search" v-model="text">
          <template v-slot:prepend>
            <q-icon color="grey-2" size="18px" name="svguse:icons/allIcons.svg#search" />
          </template>
        </q-input>
        <q-btn flat round class="my-effect h-primary"> 
          <q-icon color="black" size="20px"  name="svguse:icons/allIcons.svg#mail" />
        </q-btn>
        <q-btn flat round class="header__btn__alert my-effect h-primary"> 
          <q-icon color="black" size="19px" name="svguse:icons/allIcons.svg#alert" />
          <sup>
            6
          </sup>
        </q-btn>
        <q-btn flat round v-ripple class="header__btn__avatar my-effect h-img"> 
          <img src="~assets/anton.jpg">
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="276"
      class="bg-grey"
    >
      <q-item-label
        header
      >
        CRMD
      </q-item-label>
      <q-list class="essential-link">
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <q-list class="essential-about">
        <q-item 
          v-for="item in links"
          :key="item.title"
          :to="item.link"
          class="my-effect h-opacity"
        >
          <q-item-label>{{item.title}}</q-item-label>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Проекты',
    link: 'projects',
    number: 6
  },
  {
    title: 'Сметы',
    link: 'estimates',
    number: 43
  },
  {
    title: 'Финансы',
    link: '/finance',
    number: null
  },
  {
    title: 'Заказчики',
    link: 'customers',
    number: 2
  },
  {
    title: 'Подрядчики',
    link: 'contractors',
    number: 150
  },
  {
    title: 'Документы',
    link: 'documents',
    number: null
  }
];

const links = [
  {
    title: 'О проекте',
    link: '#'
  },
  {
    title: 'Полезные сервисы',
    link: '#'
  },
  {
    title: 'Техподдержка',
    link: '#'
  },
  {
    title: 'Настройки',
    link: '#'
  }
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      links,
      leftDrawerOpen,
      text: ref(''),
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
