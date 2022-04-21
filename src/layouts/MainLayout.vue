<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <q-header class="bg-white">
      <q-toolbar>
        <q-item-label
          header
          class="mb-visible"
        >
          CRMD
        </q-item-label>
        <q-input color="grey-2" class="header__input__search" v-model="text">
          <template v-slot:prepend>
            <q-icon color="grey-2" size="18px" name="svguse:icons/allIcons.svg#search" />
          </template>
        </q-input>
        <q-btn flat round class="my-effect h-primary header__btn__mail"> 
          <q-icon color="black" size="20px"  name="svguse:icons/allIcons.svg#mail" />
        </q-btn>
        <q-btn-dropdown 
          flat
          round
          class="header__btn__alert my-effect h-primary dropdown-none"
        > 
          <template v-slot:label>
            <q-icon color="black" size="19px" name="svguse:icons/allIcons.svg#alert" />
            <sup>
              6
            </sup>
          </template>
          <q-list>
            <q-item clickable>
              <q-item-section>
                <q-item-label>Photos</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section>
                <q-item-label>Videos</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section>
                <q-item-label>Articles</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn flat class="header__btn__avatar my-effect h-img lg-visible"> 
          <img src="~assets/anton.jpg">
        </q-btn>
        <q-btn
          flat
          class="btn-burger my-effect h-img mb-visible"
          :class="{ 'btn-burger--active': leftDrawerOpen }"
          @click="leftDrawerOpen = !leftDrawerOpen"
        > 
          <span></span>
          <span></span>
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      breakpoint="772"
      class="bg-grey"
    >
      <q-item-label
        header
        class="lg-visible"
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
      <q-item class="q-item__avatar">
        <q-item-section>
          <img src="~assets/anton.jpg">
          <q-item-label>Антон Глуханько</q-item-label>
          <q-icon size="14px"  name="svguse:icons/allIcons.svg#exit" />
        </q-item-section>
      </q-item>
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
      <q-list class="gorisont-nav mb-visible">
        <q-item
          v-for="link in essentialLinks"
          :key="link.title"
          :to="link.link"
          class="my-effect h-opacity"
        >
          <q-item-label>
            {{link.title}}
          </q-item-label>
        </q-item>
      </q-list>
      
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

import { ref } from 'vue'

export default ({
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
      },
    }
  }
})
</script>
