<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <q-header class="bg-white" bordered>
      <q-toolbar>
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="246"
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
    link: '/',
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
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
