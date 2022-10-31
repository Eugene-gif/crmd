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
              class="my-btn my-effect h-opacity btn-custom"
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
              class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
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

            <div
              class="item"
              v-for="item in fillials"
              :key="item"
            >
              <div class="item-sec">
                <div class="title">
                  {{item.title}}
                </div>
                <div class="txt-content">
                  <span v-html="item.timework"></span>
                </div>
              </div>
              <div class="btn-sec">
                <q-btn
                  unelevated 
                  no-caps
                  flat
                  class="my-btn my-effect h-opacity btn-add"
                  padding="0"
                >
                  <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="16px" class="q-mr-sm" />
                  <span class="block text-grey-5">Редактировать</span>
                </q-btn>
                <q-btn
                  unelevated 
                  no-caps
                  flat
                  class="my-btn my-effect h-opacity btn-add"
                  padding="0"
                >
                  <q-icon name="svguse:icons/btnIcons.svg#delete" color="grey-8" size="16px" class="q-mr-sm" />
                  <span class="block text-grey-5">Удалить</span>
                </q-btn>
              </div>
            </div>
            <q-btn
              unelevated 
              no-caps
              class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
              padding="8.5px 25.5px"
            >
              <span class="block text-grey-5">Добавить филиал</span>
              <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" color="black" style="margin-left: auto;" />
            </q-btn>
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

            <div
              class="item"
              v-for="item in managers"
              :key="item"
            >
              <div class="item-sec">
                <div class="title">
                  {{item.title}}
                </div>
                <div class="txt-content">
                  Должность: {{item.jobtitle}}<br>
                  Email: {{item.email}}<br>
                  Тел: {{item.phone}}
                </div>
              </div>
              <div class="btn-sec">
                <q-btn
                  unelevated 
                  no-caps
                  flat
                  class="my-btn my-effect h-opacity btn-add"
                  padding="0"
                >
                  <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="16px" class="q-mr-sm" />
                  <span class="block text-grey-5">Редактировать</span>
                </q-btn>
                <q-btn
                  unelevated 
                  no-caps
                  flat
                  class="my-btn my-effect h-opacity btn-add"
                  padding="0"
                >
                  <q-icon name="svguse:icons/btnIcons.svg#delete" color="grey-8" size="16px" class="q-mr-sm" />
                  <span class="block text-grey-5">Удалить</span>
                </q-btn>
              </div>
            </div>
            <q-btn
              unelevated 
              no-caps
              class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
              padding="8.5px 25.5px"
            >
              <span class="block text-grey-5">Добавить менеджера</span>
              <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" color="black" style="margin-left: auto;" />
            </q-btn>
          </q-expansion-item>
        </div>

        <q-expansion-item
            expand-separator
            default-opened
            class="q-expansion-my activity-categories"
          >
            <template v-slot:header>
              <div class="title">
                Категории деятельности
              </div>
            </template>

            <div class="sec">
              <div class="item">
                <q-btn
                  unelevated 
                  no-caps
                  class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
                  padding="5px 25.5px"
                >
                  <span class="block text-grey-5">Добавить</span>
                  <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" color="black" style="margin-left: auto;" />
                </q-btn>

                <q-expansion-item
                  expand-separator
                  default-opened
                  class="q-expansion-my-2"
                >
                  <template v-slot:header>
                    <div class="title">
                      Работы и услуги
                    </div>
                  </template>

                  <q-btn
                    unelevated 
                    outline
                    no-caps
                    class="my-btn-custom-big my-btn my-effect  btn-custom br-10"
                    padding="5px 25.5px"
                    color="grey-7"
                  >
                    <span class="block text-grey-5">Освещение</span>
                    <q-icon name="svguse:icons/btnIcons.svg#delete" size="16px" style="margin-left: auto;" />
                  </q-btn>
                  <q-btn
                    unelevated 
                    outline
                    no-caps
                    class="my-btn-custom-big my-btn my-effect  btn-custom br-10"
                    padding="5px 25.5px"
                    color="grey-7"
                  >
                    <span class="block text-grey-5">Натяжные потолки</span>
                    <q-icon name="svguse:icons/btnIcons.svg#delete" size="16px" style="margin-left: auto;" />
                  </q-btn>
                  <q-btn
                    unelevated 
                    outline
                    no-caps
                    class="my-btn-custom-big my-btn my-effect  btn-custom br-10"
                    padding="5px 25.5px"
                    color="grey-7"
                  >
                    <span class="block text-grey-5">Ремонт под ключ</span>
                    <q-icon name="svguse:icons/btnIcons.svg#delete" size="16px" style="margin-left: auto;" />
                  </q-btn>
                </q-expansion-item>

                <q-expansion-item
                  expand-separator
                  default-opened
                  class="q-expansion-my-2"
                >
                  <template v-slot:header>
                    <div class="title">
                      Мебель для общественных помещений
                    </div>
                  </template>

                  <q-btn
                    unelevated 
                    outline
                    no-caps
                    class="my-btn-custom-big my-btn my-effect  btn-custom br-10"
                    padding="5px 25.5px"
                    color="grey-7"
                  >
                    <span class="block text-grey-5">Офисная мебель</span>
                    <q-icon name="svguse:icons/btnIcons.svg#delete" size="16px" style="margin-left: auto;" />
                  </q-btn>
                  <q-btn
                    unelevated 
                    outline
                    no-caps
                    class="my-btn-custom-big my-btn my-effect  btn-custom br-10"
                    padding="5px 25.5px"
                    color="grey-7"
                  >
                    <span class="block text-grey-5">Уличная мебель</span>
                    <q-icon name="svguse:icons/btnIcons.svg#delete" size="16px" style="margin-left: auto;" />
                  </q-btn>
                  
                </q-expansion-item>
              </div>
              <div class="item">
                <div class="text">
                  Выберите один или несколько видов деятельности, чтобы дизайнеры могли найти вас через поиск. Помните, что при ранжировании в результатах поиска по виду деятельности приоритет получают компании с более узким профилем, поэтому лучше не указывать слишком много категорий.
                </div>
              </div>
            </div>
            
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          default-opened
          class="designer q-expansion-my q-expansion-my-change"
        >
          <template v-slot:header>
            <div class="title">
              Условия работы с дизайнерами
            </div>
            <q-btn
              unelevated 
              no-caps
              flat
              class="my-btn my-effect h-opacity btn-custom"
              color="grey-5"
              padding="0"
              label="Изменить"
            />
          </template>

          <div class="desc-sec desc-sec-design bg-grey-9">
            <div class="information">
              <div class="number">
                10%
              </div>
              <div class="subtext">
                Вознаграждение<br>
                дизайнера
              </div>
            </div>
            <div class="text lg-visible">
              Условия выплаты: Сразу после поступления оплаты от заказчика. Предлагаю не усложнять это поле вариантами, между которыми нужно выбирать, а оставить просто как поле для ввода. Сразу после поступления оплаты от заказчика. Предлагаю не усложнять это поле вариантами, между которыми нужно выбирать, а 
            </div>
            <div class="text mb-visible">
              Условия выплаты: Сразу после поступления оплаты от заказчика. Предлагаю не усложнять это поле вариантами, между которыми нужно выбирать, а оставить просто как поле для ввода. Сразу после поступления оплаты от заказчика. 
            </div>
          </div>
          <q-btn
            unelevated 
            no-caps
            class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
            padding="0"
          >
            <span class="block text-grey-5">Изменить</span>
          </q-btn>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          default-opened
          class="foto-gallery q-expansion-my details-documents"
        >
          <template v-slot:header>
            <div class="title">
              Реквизиты для документов
            </div>
            <q-btn
              unelevated 
              no-caps
              flat
              class="my-btn my-effect h-opacity btn-custom"
              style="margin-left: auto;"
              color="grey-5"
              padding="0"
              label="Изменить"
            />
          </template>

          <div class="details">
            <div class="sec">
              <div
                class="item"
                v-for="item in documents"
                :key="item"
              >
                <div class="cell">{{item.title}}</div>
                <div class="cell">{{item.value}}</div>
              </div>
            </div>
            <q-btn
              unelevated 
              no-caps
              class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
              padding="0"
            >
              <span class="block text-grey-5">Изменить</span>
            </q-btn>
          </div>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          default-opened
          class="files23d q-expansion-my"
        >
          <template v-slot:header>
            <div class="title">
              2D/3D файлы
            </div>
          </template>

          <q-list class="contractor-list">
            <q-item>
              <q-item-section>
                <div class="subtitle">
                  Архив с 3д-моделями столов
                </div>
                <div class="size"><span class="lg-visible">ZIP,</span> 1 мб</div>
                <span class="mb-visible format">ZIP</span>
                <div class="btn-sec">
                  <q-btn
                    unelevated 
                    no-caps
                    flat
                    class="my-btn my-effect h-opacity btn-add"
                    padding="0"
                  >
                    <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="16px" class="q-mr-sm" />
                    <span class="block text-grey-5">Редактировать</span>
                  </q-btn>
                  <q-btn
                    unelevated 
                    no-caps
                    flat
                    class="my-btn my-effect h-opacity btn-add"
                    padding="0"
                  >
                    <q-icon name="svguse:icons/btnIcons.svg#delete" color="grey-8" size="16px" class="q-mr-sm" />
                    <span class="block text-grey-5">Удалить</span>
                  </q-btn>
                </div>
                <q-icon name="svguse:icons/allIcons.svg#download" size="17px" />
              </q-item-section>
            </q-item>


            <q-item>
              <q-item-section>
                <div class="subtitle">
                  СтройПро
                </div>
                <div class="size"><span class="lg-visible">Ссылка</span></div>
                <span class="mb-visible format">Ссылка</span>
                <div class="btn-sec">
                  <q-btn
                    unelevated 
                    no-caps
                    flat
                    class="my-btn my-effect h-opacity btn-add"
                    padding="0"
                  >
                    <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="16px" class="q-mr-sm" />
                    <span class="block text-grey-5">Редактировать</span>
                  </q-btn>
                  <q-btn
                    unelevated 
                    no-caps
                    flat
                    class="my-btn my-effect h-opacity btn-add"
                    padding="0"
                  >
                    <q-icon name="svguse:icons/btnIcons.svg#delete" color="grey-8" size="16px" class="q-mr-sm" />
                    <span class="block text-grey-5">Удалить</span>
                  </q-btn>
                </div>
                <q-icon name="svguse:icons/allIcons.svg#download" size="17px" />
              </q-item-section>
            </q-item>
            
          </q-list>

          <q-btn
            unelevated 
            no-caps
            class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
            padding="5px 25px"
          >
            <span class="block text-grey-5">Загрузить файл</span>
            <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" style="margin-left: auto;" />
          </q-btn>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          default-opened
          class="foto q-expansion-my"
        >
          <template v-slot:header>
            <div class="title">
              Фото
            </div>
          </template>

          <q-card class="q-card-visual-slider">
            <q-card-section
                v-for="item in visual"
                :key="item.id"
              >
                <VisualSlider
                  :images="item.images"
                />
                <div class="row desc">
                  <div class="title">{{item.name}}</div>
                </div>
                <div class="row security">
                  <q-btn
                    unelevated
                    no-caps
                    class="bg-grey-3 text-grey-5 my-btn my-effect btn-kolvo"
                    padding="7.5px 12px"
                  >
                    {{item.rights}}
                  </q-btn>
                  <div class="btn-sec">
                    <q-btn
                      unelevated 
                      no-caps
                      flat
                      class="my-btn my-effect h-opacity btn-add"
                      padding="0"
                    >
                      <q-icon name="svguse:icons/btnIcons.svg#edit" color="grey-8" size="16px" class="q-mr-sm" />
                      <span class="block text-grey-5">Редактировать</span>
                    </q-btn>
                    <q-btn
                      unelevated 
                      no-caps
                      flat
                      class="my-btn my-effect h-opacity btn-add"
                      padding="0"
                    >
                      <q-icon name="svguse:icons/btnIcons.svg#delete" color="grey-8" size="16px" class="q-mr-sm" />
                      <span class="block text-grey-5">Удалить</span>
                    </q-btn>
                  </div>
                </div>
                <!-- action -->
            </q-card-section>
          </q-card>
          <q-btn
            unelevated 
            no-caps
            class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
            padding="5px 25px"
          >
            <span class="block text-grey-5">Добавить альбом</span>
            <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" style="margin-left: auto;" />
          </q-btn>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          default-opened
          class="reviews q-expansion-my"
        >
          <template v-slot:header>
            <div class="title">
              Отзывы
            </div>
          </template>

          <div class="contractor-single-reviews">
            <q-list class="q-list-reviews">

              <q-item>
                <q-item-section class="review">
                  <q-item-label>Все хорошо!</q-item-label>
                </q-item-section>
                <q-item-section class="information">
                  <div class="user">
                    <img src="/icons/anton.jpg" alt="">
                    <div class="title">Антон Глуханько</div>
                  </div>
                  <div class="data"><span class="lg-visible">Отзыв оставлен: </span>25/05/2021</div>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section class="review">
                  <q-item-label>
                    Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Вам понравится! Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Вам понравится!
                  </q-item-label>
                </q-item-section>
                <q-item-section class="information">
                  <div class="user">
                    <img src="/icons/anton.jpg" alt="">
                    <div class="title">Антон Глуханько</div>
                  </div>
                  <div class="data"><span class="lg-visible">Отзыв оставлен: </span>25/05/2021</div>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section class="review">
                  <q-item-label>
                    Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Вам понравится! Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Вам понравится! Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Вам понравится! 
                  </q-item-label>
                </q-item-section>
                <q-item-section class="information">
                  <div class="user">
                    <img src="/icons/anton.jpg" alt="">
                    <div class="title">Антон Глуханько</div>
                  </div>
                  <div class="data"><span class="lg-visible">Отзыв оставлен: </span>25/05/2021</div>
                </q-item-section>
              </q-item>

            </q-list>
          </div>
        </q-expansion-item>

      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import VisualSlider from 'components/projects/VisualSlider.vue'

export default {
  name: 'ProfileСontractor',
  components: {
    VisualSlider
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
    const fillials = ref([
      {
        title: 'г. Краснодар, ул. Красных Партизан, д. 232, оф 307',
        timework: 'ПН — ПТ: с 9:00 до 20:00, <br>СБ: с 10:00 до 17:00, ВС: Выходной'
      },
      {
        title: 'г. Краснодар, ул. Красных Партизан, д. 232, оф 307',
        timework: 'ПН — ПТ: с 9:00 до 20:00, <br>СБ: с 10:00 до 17:00, ВС: Выходной'
      },
    ])
    const managers = ref([
      {
        title: 'Акеева Полина Андреевна',
        jobtitle: 'Операционный директор',
        email: 'krasotka92@mail.ru',
        phone: '+7 (918) 455-55-55',
      },
    ])
    const documents = ref([
      {
        title: 'Тип',
        value: 'Общество с ограниченной ответственностью'
      },
      {
        title: 'Название компании',
        value: 'Глуханько Антон Александрович'
      },
      {
        title: 'Юридический адрес',
        value: '350000 г. Краснодар, ул. Красная 17, кв. 9'
      },
      {
        title: 'Фактический адрес',
        value: '350000 г. Краснодар, ул. Красная 17, кв. 9'
      },
      {
        title: 'ИНН',
        value: '245754645733'
      },
      {
        title: 'ОГРН (для ООО и ИП)',
        value: '318237500481684'
      },
      {
        title: 'КПП (для ООО)',
        value: '245754645733'
      },
      {
        title: 'ФИО подписанта ',
        value: 'Глуханько Антон Александрович'
      },
      {
        title: 'Должность (для ООО)',
        value: 'Директор'
      },
      {
        title: 'Основание (для ООО)',
        value: 'Директор'
      },
      {
        title: 'Расчётный счёт',
        value: '40802810630000052573'
      },
      {
        title: 'Корреспондетский счёт',
        value: '40802810630000052573'
      },
      {
        title: 'Отделение банка',
        value: 'КРАСНОДАРСКОЕ ОТДЕЛЕНИЕ №8619 ПАО СБЕРБАНК'
      },
      {
        title: 'БИК банка',
        value: '318237500481684'
      },
    ])
    const visual = ref([
      {
        id: 1,
        images: [
          ' ',
          '/project-2.jpg',
          '/project-3.jpg',
        ],
        name: 'Фото помещения',
        rights: '5 фото'
      },
      {
        id: 2,
        images: [
          '/project-1.jpg',
          '/project-2.jpg',
          '/project-3.jpg',
        ],
        name: 'Визуализации',
        rights: '5 фото'
      },
      {
        id: 3,
        images: [
          '/project-1.jpg',
          '/project-2.jpg',
          '/project-3.jpg',
        ],
        name: 'Визуализации',
        rights: '5 фото'
      }
    ])

    onMounted(() => {
      
    })
    return {
      tab,
      images,
      details,
      fillials,
      managers,
      documents,
      visual
    }
  }
}
</script>
