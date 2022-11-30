<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <q-header class="bg-white">
      <q-card :class="{visibility: showing}" class="header-menu" ref="qCardHeaderMenu">
        <div class="head">
          <q-input
            color="grey-2"
            class="header__input__search"
            v-model="text" 
            @update:model-value="filterFn(headerMenu)"
            :class="{'q-field--placholder': text.length > 0}"
          >
            <template v-slot:prepend>
              <q-icon
                color="grey-2"
                size="18px"
                name="svguse:icons/allIcons.svg#search"
                @click="focusInput"
              />
            </template>
          </q-input>
          <q-btn
            rounded
            unelevated
            no-caps
            class="bg-positive text-white q-mr-xs my-btn my-effect h-dark"
            label="Найти"
            padding="12px 48px"
          />
          <q-icon
            color="black"
            class="rotate"
            size="13px"
            name="svguse:icons/allIcons.svg#close-modal"
            @click="closeHeaderMenu"
          />
        </div>
        <div class="content">
          <q-list class="q-list-projects">
            <q-item class="q-item-noresult" v-if="filterHeaderMenu.length === 0">
              <q-item-section avatar></q-item-section>
              <q-item-section>Нет результатов</q-item-section>
            </q-item>
            <q-item
              v-for="item in filterHeaderMenu.slice(0, 8)"
              :key="item"
              to="#"
            >
              <q-item-section avatar>
                {{item.icon}}
              </q-item-section>
              <q-item-section>
                <div class="text">{{item.name}}</div>
              </q-item-section>
              <q-item-section class="type">{{item.type}}</q-item-section>
            </q-item>
            <q-item class="q-item-btn">
              <q-item-section avatar></q-item-section>
              <q-item-section>
                <q-btn
                  unelevated
                  no-caps
                  class="bg-grey-6 text-white my-btn my-effect h-opacity btn-sup"
                  padding="16.5px 0"
                >
                  <span class="block">
                    Все результаты 
                    <sup v-if="filterHeaderMenu.length > 8">
                      {{filterHeaderMenu.length - 8 }}
                    </sup>
                  </span>
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
          <q-list class="q-list-params">
            <q-item
              v-for="item in serchBox"
              :key="item"
            >
              <q-checkbox
                v-model="item.value"
                checked-icon="svguse:icons/allIcons.svg#check"
                class="my-checkbox flat bg-grey-3"
                color="black"
              />
              <div class="text">
                {{item.title}}
              </div>
            </q-item>
          </q-list>
        </div>
      </q-card>
      <q-toolbar>
        <q-item-label
          header
          class="mb-visible"
        >
          CRMD 
        </q-item-label>
        <q-input
          color="grey-2"
          class="header__input__search lg-visible"
          v-model="text" 
          @update:model-value="filterFn(headerMenu)"
          ref="headerInputSerach"
          placholder="Поиск"
          :class="{'q-field--placholder': text.length > 0}"
        >
          <template v-slot:prepend>
            <q-icon
              color="grey-2"
              size="18px"
              name="svguse:icons/allIcons.svg#search"
              @click="focusInput"
            />
          </template>
        </q-input>
        <q-input
          class="header__input__search mb-visible"
          ref="mobIconOpenSearch"
          placholder="Поиск"
          :class="{'q-field--placholder': text.length > 0}"
        >
          <template v-slot:prepend>
            <q-icon
              size="18px"
              name="svguse:icons/allIcons.svg#search"
              @click="openMobileSearch"
              :class="{activate: showingMob}"
            />
          </template>
        </q-input>
        <q-btn flat round class="my-effect h-primary header__btn__mail"> 
          <q-icon color="black" size="20px"  name="svguse:icons/allIcons.svg#mail" />
        </q-btn>
        <Notifications />
        <q-btn
          flat
          class="header__btn__avatar my-effect h-img lg-visible"
          :style="{background: userInfo.colorBkg}"
        > 
          <!-- <img :src="`${userUrl}${userInfo.image}`"> -->
          <img :src="`https://crmd.crookedweb.site/${userInfo.image}` || `https://crmd.crookedweb.site/${userInfo.system_image}`">
          <span>{{userInfo.userNikeName}}</span>
        </q-btn>

        <q-icon
          color="black"
          class="q-ml-md lg-visible"
          size="16px"
          name="svguse:icons/allIcons.svg#logout"
          style="cursor: pointer;"
          @click="logout"
        />
        <!-- <p style="color: black;">{{tokken}}</p> -->
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
          <div class="img-section" :style="{background: userInfo.colorBkg}">
            <img :src="`https://crmd.crookedweb.site/${userInfo.image}` || `https://crmd.crookedweb.site/${userInfo.system_image}`">
          </div>
          
          <q-item-label>{{userInfo.user_name}} {{userInfo.user_lastname}} </q-item-label>
          <q-icon size="14px" name="svguse:icons/allIcons.svg#exit" @click="logout" />
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
      <q-card class="q-card-search" :class="{visibility: showingMob}">
        <q-input
          color="grey-2"
          class="header__input__search"
          v-model="text" 
          ref="InputSerachMobile"
          :class="{'q-field--placholder': text.length > 0}"
        >
          <template v-slot:prepend>
            <q-icon
              color="black"
              size="12px"
              name="svguse:icons/allIcons.svg#search"
            />
          </template>
        </q-input>
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-positive text-white q-mr-xs my-btn my-effect h-dark"
          label="найти"
          padding="2px 12px"
          t="asd"
        />
        <q-icon
          color="black"
          class="rotate"
          size="10px"
          name="svguse:icons/allIcons.svg#close-modal"
          @click="showingMob = false"
        />
      </q-card>
      
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
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex';
import EssentialLink from 'components/EssentialLink.vue'
import Notifications from 'components/MainLayout/Notifications.vue'
import { useRouter } from 'vue-router';

const linksList = [
  {
    title: 'Проекты',
    link: '/projects',
    number: 6
  },
  {
    title: 'Сметы',
    link: '/estimates',
    number: 43
  },
  {
    title: 'Финансы',
    link: '/finance',
    number: null
  },
  {
    title: 'Заказчики',
    link: '/clients',
    number: 2
  },
  {
    title: 'Подрядчики',
    link: '/contractor',
    number: 150
  },
  {
    title: 'Документы',
    link: '/documents',
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

export default ({
  name: 'MainLayout',

  components: {
    EssentialLink,
    Notifications
  },

  setup () {
    const userInfo = ref({})
    const userUrl = ref('https://crmd.crookedweb.site/')

    const leftDrawerOpen = ref(false)
    const text = ref('')
    const showing = ref(false)
    const showingMob = ref(false)
    const headerMenu = ref([
      {
        icon: '🏰',
        name: 'Квартира на патриарших прудах',
        type: 'проекты'
      },
      {
        icon: '🏰',
        name: 'Квартира в ЖК Адмирал',
        type: 'проекты'
      },
      {
        icon: '🏰',
        name: 'Название сметы, в котором есть слово квартира ',
        type: 'сметы'
      },
      {
        icon: '',
        name: 'Довольно длинное название сметы, в котором есть слово квартира в котором есть слово квартира в котором есть слово квартира в котором есть слово квартира',
        type: 'сметы'
      },
      {
        icon: '',
        name: 'Название сметы, в котором есть слово квартира ',
        type: 'сметы'
      },
      {
        icon: '',
        name: 'Название сметы, в котором есть слово квартира ',
        type: 'сметы'
      },
      {
        icon: '',
        name: 'Довольно длинное название сметы, в котором есть слово ква ква ква',
        type: 'сметы'
      },
      {
        icon: '',
        name: 'Название сметы, в котором есть слово квартира',
        type: 'сметы'
      },
    ])
    const serchBox = ref([
      {
        value: true,
        title: 'Проекты'
      },
      {
        value: true,
        title: 'Сметы'
      },
      {
        value: true,
        title: 'Финансы'
      },
      {
        value: false,
        title: 'Заказчики'
      },
      {
        value: false,
        title: 'Подрядчики'
      },
      {
        value: false,
        title: 'Документы'
      },
    ]) 
    const filterHeaderMenu = ref([])
    const headerInputSerach = ref()
    const qCardHeaderMenu = ref()
    const InputSerachMobile = ref()
    const mobIconOpenSearch = ref()

    const router = useRouter();
    const store = useStore()
    const isAuthenticated = computed(() => store.state['auth'].isAuthenticated)

    const userNikeName = computed(() => {
      let name = userInfo.value.user_name
      let lastName = userInfo.value.user_lastname
      if (name) {
        name = name.slice(0, 1)
        lastName = lastName.slice(0, 1)
      }
      return name+lastName
    })

    onMounted(() => {
      window.addEventListener('click', dropdown)
      window.addEventListener('click', dropdownMob)
      getUser()
    })
    
    function dropdown(e){
      let el = qCardHeaderMenu.value.$el
      const click = e.composedPath().includes(el)
      if (!click) {
        showing.value = false
        text.value = ''
      }
    } 
    function dropdownMob(e){
      let el = InputSerachMobile.value.$el
      let el2 = mobIconOpenSearch.value.$el
      const click = e.composedPath().includes(el)
      const click2 = e.composedPath().includes(el2)
      if (!click2 && !click) {
        showingMob.value = false
        text.value = ''
      }
    }      
    function logout(){
      store.dispatch('auth/singOut')
      router.push({ path: '/login' })
    } 

    function getUser() {
      let user = localStorage.getItem('userInfo')
      userInfo.value = JSON.parse(user)
      console.log(userInfo.value)
    }
    
    return {
      userInfo, 
      userUrl,
      getUser,
      userNikeName,

      showing,
      showingMob,
      essentialLinks: linksList,
      links,
      serchBox,
      headerMenu,
      filterHeaderMenu,
      leftDrawerOpen,
      headerInputSerach,
      InputSerachMobile,
      dropdown,
      dropdownMob,
      qCardHeaderMenu,
      mobIconOpenSearch,
      text,
      logout,
      isAuthenticated,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      
      filterFn (arrayMenu) {
        if (text.value.length > 1) {
          showing.value = true
        } else {
          showing.value = false
        }
        const needle = text.value.toLowerCase()
        filterHeaderMenu.value = arrayMenu.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      },

      focusInput() {
        headerInputSerach.value.focus()
      },
      closeHeaderMenu() {
        showing.value = false
        text.value = ''
      },
      openMobileSearch() {
        showingMob.value = true
        
        function func() {
          InputSerachMobile.value.focus()
        }
        setTimeout(func, 400);
      }
    }
  }
})
</script>
