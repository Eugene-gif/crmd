<template>
  <q-page class="page-contractor-single page-contractor-profile">
    <div class="row justify-between items-center">
      <div class="text-h2">СтройПро</div>
      <q-icon
        size="18px"
        class="mb-visible"
        name="svguse:icons/allIcons.svg#back"
        style="margin-left: auto;"
      />
    </div>
    <div class="row section">
      <div class="content">
        <div class="info-1">
          <div class="continer">
            <div class="item">
              <div class="title">Проектов доступно</div>
              <div class="number">
                <span>6</span>
                <div class="new">
                  2 новых
                </div>
              </div>
            </div>
            <div class="item">
              <div class="title">Смет доступно</div>
              <div class="number">
                <span>87</span>
                <div class="new">
                  24 новых
                </div>
              </div>
            </div>
            <div class="item">
              <div class="title">Дизайнеры на связи</div>
              <div class="designers">
                <img src="~assets/anton.jpg" alt="">
                <img src="~assets/stroipro.jpg" alt="">
                <img src="~assets/anton.jpg" alt="">
                <img src="~assets/stroipro.jpg" alt="">
                <img src="~assets/anton.jpg" alt="">
                <img src="~assets/stroipro.jpg" alt="">
              </div>
            </div>

          </div>
        </div>

        <div class="info-2">
          <div class="container">
            <div class="item">
              <div class="title">
                Сделок
              </div>
              <div class="number">
                24
              </div>
            </div>
            <div class="item">
              <div class="title">
                Получено от заказчиков
                <div class="circle-plus bg-positive">
                  <q-icon size="12px" name="svguse:icons/allIcons.svg#plus" color="white" />
                </div>
              </div>
              <div class="number">
                15 500 000 руб.
              </div>
            </div>
            <div class="item">
              <div class="title">
                Агентских к выплате
                <div class="circle-plus bg-positive">
                  <q-icon size="12px" name="svguse:icons/allIcons.svg#plus" color="white" />
                </div>
              </div>
              <div class="number">
                250 000 руб.
              </div>
            </div>
            <div class="item">
              <div class="title">
                Рейтинг
              </div>
              <q-tabs
                v-model="tab"
                class="q-tabs-reviews q-tabs-null"
              >
                <q-tab name="1" icon="svguse:icons/allIcons.svg#like" label="25" />
                <q-tab name="2" icon="svguse:icons/allIcons.svg#dislike" label="2" />
              </q-tabs>
            </div>

          </div>
        </div>

        <q-expansion-item
          expand-separator
          default-opened
          class="foto-gallery q-expansion-my"
        >
          <template v-slot:header>
            <div class="title">
              Общая информация
            </div>
            <q-btn
              unelevated 
              no-caps
              flat
              class="my-btn my-effect h-opacity"
              style="margin-left: auto;"
              color="grey-5"
              padding="0"
              label="Изменить"
            />
          </template>

          <div class="container">
            <div class="item avatar">
              <div class="title">
                Аватар
              </div>
              <div class="sec-imgage">
                <div class="circle-close rotate">
                  <q-icon
                    size="12px"
                    name="svguse:icons/allIcons.svg#close-modal"
                    color="black"
                    style="opacity: 0.3;"
                  />
                </div>
                <img src="~assets/stroipro.jpg" alt="">
              </div>
              <q-btn
                unelevated 
                no-caps
                class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom"
                padding="0"
              >
                <span class="block text-grey-5">Заменить фото</span>
              </q-btn>
            </div>

            <div class="item scrollbar">
              <div class="title">
                Фото на главной
              </div>
              <div class="sec">
                <div class="scroll-x my-scrollbar">
                  <div
                    class="sec-imgage"
                    v-for="item in images"
                    :key="item"
                  >
                    <div class="circle-close mini rotate">
                      <q-icon
                        size="12px"
                        name="svguse:icons/allIcons.svg#close-modal"
                        color="black"
                        style="opacity: 0.3;"
                      />
                    </div>
                    <img :src="item.img" alt="">
                  </div>
                </div>
              </div>
              <div class="custom-sec">
                <q-btn
                  unelevated 
                  no-caps
                  flat
                  class="my-btn my-effect h-opacity btn-add"
                  padding="0"
                >
                  <span class="block text-grey-5">Добавить фото</span>
                  <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" color="black" />
                </q-btn>
                <q-btn
                  unelevated 
                  no-caps
                  flat
                  class="my-btn my-effect h-opacity btn-delete"
                  style="margin-left: auto;opacity: 0.3"
                  color="grey-5"
                  padding="0"
                  label="Удалить все"
                />
              </div>
            </div>
          </div>

          <div class="details">
            <div
              class="item"
              v-for="item in details"
              :key="item"
            >
              <div class="cell">{{item.title}}</div>
              <div class="cell">{{item.value}}</div>
            </div>
            <q-btn
              unelevated 
              no-caps
              class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom"
              padding="0"
            >
              <span class="block text-grey-5">Изменить</span>
            </q-btn>
          </div>
        </q-expansion-item>

        <div class="branch-managers">
          <q-expansion-item
            expand-separator
            default-opened
            class="q-expansion-my"
          >
            <template v-slot:header>
              <div class="title">
                Филиалы
              </div>
            </template>
            <div class="item">
              <div class="title">
                г. Краснодар, ул. Красных Партизан, д. 232, оф 307
              </div>
              <div class="txt-content">
                ПН — ПТ: с 9:00 до 20:00, <br>
                СБ: с 10:00 до 17:00, ВС: Выходной
              </div>
              <div class="btn-sec">

              </div>
            </div>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            default-opened
            class="q-expansion-my"
          >
            <template v-slot:header>
              <div class="title">
                Менеджеры
              </div>
            </template>
          </q-expansion-item>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ProfileСontractor',
  components: {
    
  },

  setup () {
    const tab = ref()
    const images = ref([
      {
        img: '/project-1.jpg'
      },
      {
        img: '/project-2.jpg'
      },
      {
        img: '/project-3.jpg'
      },
      {
        img: '/project-1.jpg'
      },
      {
        img: '/project-2.jpg'
      },
      {
        img: '/project-3.jpg'
      },
      {
        img: '/project-1.jpg'
      },
      {
        img: '/project-2.jpg'
      },
      {
        img: '/project-3.jpg'
      },
    ])
    const details = ref([
      {
        title: 'Название',
        value: 'СтройПро'
      },
      {
        title: 'Город',
        value: 'Краснодар'
      },
      {
        title: 'Область работы',
        value: 'Краснодарский край, ЮФО, Республики Северного Кавказа'
      },
      {
        title: 'Адрес',
        value: 'г. Краснодар, ул. Красных Партизан, д. 232, офис 307'
      },
      {
        title: 'Телефон',
        value: '+7 (918) 455-02-16'
      },
      {
        title: 'E-mail',
        value: 'antonglukhanko@gmail.com'
      },
      {
        title: 'Сайт',
        value: 'https://www.glukhanko.ru'
      },
      {
        title: 'WhatsApp',
        value: '—'
      },
      {
        title: 'Telegram',
        value: '—'
      },
      {
        title: 'Instagram',
        value: '@glukhanko'
      },
      {
        title: 'Описание',
        value: 'Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Вам понравится! Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Вам понравится! Добрый день! Приглашаю вас в '
      },      
    ])
    onMounted(() => {
      
    })
    return {
      tab,
      images,
      details
    }
  }
}
</script>
