<template>
  <q-select
    filled
    v-model="select2"
    :options="options"
    stack-label
    use-input
    @filter="filterFn"
    dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
    class="my-select"
    ref="selectDropbox"
    behavior="menu"
    @popup-hide="focusSelect"
    popup-content-class="my-dopbox-menu"
    :label="select2 ? undefined : 'Введите имя или e-mail'"
  >
    <template v-slot:prepend>
      <q-icon size="18px" name="svguse:icons/allIcons.svg#field-search" @click.stop class="search-input" />
    </template>
    <template v-slot:append>
      <q-icon name="svguse:icons/allIcons.svg#clear-field" @click.stop="select2 = null" class="cursor-pointer clear-input rotate" />
    </template>
    <template v-slot:option="scope">
      <q-item v-if="!scope.opt.group"
        v-bind="scope.itemProps"
      >      
        <q-item-section avatar>
          <img :src="scope.opt.icon" alt="">
        </q-item-section>
        <q-item-section>
          <q-item-label v-html="scope.opt.label" ></q-item-label>
          <q-item-label caption>{{ scope.opt.description }}</q-item-label>
        </q-item-section>
        <q-icon
          class="bg-grey-3"
          name="svguse:icons/FinanceTable.svg#warning"
          style="border-radius: 5px;"
          @click.stop
        >
          <q-menu class="q-menu-userinfo">
            <q-item clickable>
              <q-item-section class="head">
                <q-item-section class="name">
                  <img :src="scope.opt.icon" alt="">
                  <q-item-label>
                    <div class="name-user">{{scope.opt.label}}</div>
                    <div class="email-user">{{scope.opt.email}}</div>
                  </q-item-label>
                </q-item-section>
                <q-item-section class="reviews">
                  <q-tabs
                    v-model="scope.opt.tab"
                  >
                    <q-tab name="1" icon="svguse:icons/allIcons.svg#like" :label="scope.opt.like" />
                    <q-tab name="2" icon="svguse:icons/allIcons.svg#dislike" :label="scope.opt.dislike" />
                  </q-tabs>
                  <q-item-label>{{scope.opt.reviews}} отзывов</q-item-label>
                </q-item-section>
              </q-item-section>
              <q-item-section class="foot">
                <q-item-section class="message">
                  <q-list>
                    <q-item
                      class="link-mail"
                      link
                      :href="`mailto:${scope.opt.email}`"
                    >
                      <q-icon color="white" size="20px" name="svguse:icons/allIcons.svg#mail" />
                    </q-item>
                    <q-item
                      class="link-whatsap"
                      link
                      :href="`mailto:${scope.opt.whatsapp}`"
                    >
                      <img src="~assets/whatsapp.svg" alt="">
                    </q-item>
                    <q-item
                      class="link-telegram"
                      link
                      :href="`${scope.opt.telegram}`"
                    >
                      <img src="~assets/telegram.svg" alt="">
                    </q-item>
                    <q-item
                      class="link-insta"
                      link
                      :href="`${scope.opt.instagram}`"
                    >
                      <img src="~assets/instagram.svg" alt="">
                    </q-item>
                  </q-list>
                </q-item-section>
                <a :href="`tel:${scope.opt.whatsapp}`" class="foot__tel">{{scope.opt.tel}}</a>
              </q-item-section>
            </q-item>
          </q-menu>
        </q-icon>
      </q-item>
    </template>
    <template v-slot:no-option>
      <q-item class="no-result">
        <q-item-section class="text-dark">
          Нет результатов
        </q-item-section>
      </q-item>
    </template>
  </q-select>
  
</template>
<script>
import { ref } from 'vue'

const stringOptions = [
  {
    label: 'Антон Глуханько',
    value: 'Антон Глуханько',
    icon: '/icons/anton.jpg',
    email: 'stroypro@mail.ru',
    like: 25,
    dislike: 2,
    reviews: 12,
    whatsapp: 79184550216,
    tel: '+7 (918) 455-02-16',
    telegram: '',
    instagram: '',
    tab: ''
  },
  {
    label: 'Довольно длинное название объекта, которое нуфывфывыф...',
    value: 'СтройПро',
    icon: '/icons/stroipro.jpg',
    email: 'stroypro@mail.ru',
    like: 25,
    dislike: 2,
    reviews: 12,
    whatsapp: 79184550216,
    tel: '+7 (918) 455-02-16',
    telegram: '',
    instagram: '',
    tab: ''
  },
  {
    label: 'Антон Глуханько',
    value: 'Антон Глуханько',
    icon: '/icons/anton.jpg',
    email: 'stroypro@mail.ru',
    like: 25,
    dislike: 2,
    reviews: 12,
    whatsapp: 79184550216,
    tel: '+7 (918) 455-02-16',
    telegram: '',
    instagram: '',
    tab: ''
  },
  {
    label: 'СтройПро',
    value: 'СтройПро',
    icon: '/icons/stroipro.jpg',
    email: 'stroypro@mail.ru',
    like: 25,
    dislike: 2,
    reviews: 12,
    whatsapp: 79184550216,
    tel: '+7 (918) 455-02-16',
    telegram: '',
    instagram: '',
    tab: ''
  },
]

export default ({
  name: 'DropBox',

  setup () {
    const options = ref(stringOptions)
    const selectDropbox = ref();

    return {
      select2: ref(
        {
          label: 'Выбрать',
          value: null
        }
      ),

      stringOptions,
      options,
      selectDropbox,
      
      filterFn (val, update) {
        if (val === '') {
          update(() => {
            options.value = stringOptions
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          options.value = stringOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      },

      focusSelect() {
        function func() {
          selectDropbox.value.blur()
        }
        setTimeout(func, 100);
      }
    }
  }
})
</script>