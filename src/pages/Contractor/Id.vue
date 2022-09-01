<template>
  <q-page class="page-contractor-single">
    <div class="row justify-between items-center">
      <div class="text-h2">СтройПро</div>
      <q-icon
        size="18px"
        class="mb-visible"
        name="svguse:icons/allIcons.svg#back"
        style="margin-left: auto;"
      />
      <div class="sectiobn-btns">
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite q-mr-xs lg-visible"
          label="Назад"
        />
      </div>
    </div>
    <div class="row items-center section-btns">
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white q-mr-xs my-btn my-effect h-dark q-ml-xs"
        label="Изменить статус"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white q-mr-xs my-btn my-effect h-dark q-ml-xs"
        label="Написать сообщение"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white q-mr-xs my-btn my-effect h-dark q-ml-xs"
        label="Поделиться сметой"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white q-mr-xs my-btn my-effect h-dark q-ml-xs"
        label="Отправить шаблон документа"
      />
    </div>
    <div class="row section">
      <div class="sidebar">
        <div class="avatar">
          <img src="~assets/stroipro.jpg" alt="">
        </div>
        <div class="info">
          <q-list class="q-list-user-info">
            <q-item
              link
              href="`mailto:${scope.opt.email}`"
            >
              <q-icon color="black" size="20px" name="svguse:icons/allIcons.svg#mail" />
            </q-item>
            <q-item
              class="link-whatsap"
              link
              href="`${scope.opt.whatsapp}`"
            >
              <img src="~assets/whatsapp.svg" alt="">
            </q-item>
            <q-item
              class="link-telegram"
              link
              href="`${scope.opt.telegram}`"
            >
              <img src="~assets/telegram.svg" alt="">
            </q-item>
            <q-item
              class="link-insta"
              link
              href="`${scope.opt.instagram}`"
            >
              <img src="~assets/instagram.svg" alt="">
            </q-item>
          </q-list>
          <q-item-section class="reviews">
            <q-tabs
              v-model="tab"
              class="q-tabs-reviews"
            >
              <q-tab name="1" icon="svguse:icons/allIcons.svg#like" label="25" />
              <q-tab name="2" icon="svguse:icons/allIcons.svg#dislike" label="2" />
            </q-tabs>
            <q-item-label>12 отзывов</q-item-label>
          </q-item-section>
        </div>
        <div class="city">
          г. Краснодар
        </div>

        <div class="title info-status">
          Работаем <span class="status bg-positive"></span>
        </div>
        <div class="text">Изменить статус</div>

        <div class="title info-mail">
          info@stroypro.com
        </div>
        <div class="text">Общий e-mail</div>

        <div class="title info-phone">
          +7 (918) 455-02-16
        </div>
        <div class="text">Общий телефон</div>

        <div class="text info-adres">
          г. Краснодар, ул. Красных Партизан, д. 232, офис 307
        </div>

        <div class="text info-sait">
          www.stroypro.com
        </div>
      </div>
      <div class="content">
        <div class="sections-btns">
          <q-btn 
            outline
            unelevated
            no-caps
            class="q-mr-xs my-btn my-effect h-dark"
            color="grey-3"
            style="background: #F7F7F7 !important;"
          >
            <span class="text-black block">Работы и услуги</span>
          </q-btn>
          <q-btn 
            outline
            unelevated
            no-caps
            class="q-mr-xs my-btn my-effect h-opacity"
            color="positive"
          >
            <span class="text-black block">Работы и услуги</span>
          </q-btn>
          <q-btn 
            outline
            unelevated
            no-caps
            class="q-mr-xs my-btn my-effect h-opacity"
            color="positive"
          >
            <span class="text-black block">Мебель для общественных помещений</span>
          </q-btn>
        </div>
        <div class="description">
          Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Вам понравится! Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Вам понравится! Добрый день! Приглашаю вас в 
        </div>
        <div class="info row">
          <div class="item agency">
            <div class="text">
              Получено агентских 
              <div class="circle bg-positive">
                <q-icon size="12px" name="svguse:icons/allIcons.svg#plus" color="white" />
              </div>
            </div>
            <div class="sum">
              500 000 руб.
            </div>
          </div>
          <div class="item dolg">
            <div class="text">
              Долг 
              <div class="circle bg-grey-3">
                <q-icon size="12px" name="svguse:icons/allIcons.svg#tooltip" color="grey-4" />
              </div>
            </div>
            <div class="sum">
              250 000 руб.
            </div>
          </div>
          <q-btn
            unelevated
            no-caps
            class="share my-effect h-opacity"
          >
            <span class="block">Поделиться</span>
            <q-icon size="17px" name="svguse:icons/btnIcons.svg#copy" />
          </q-btn>
        </div>
        <div class="region">
          Область работы: Краснодарский край, ЮФО, Республики Северного Кавказа
        </div>

        <div class="row tab-section">
          <q-tabs
            v-model="tab2"
            class="q-tabs-null q-tabs-contractor"
          >
            <q-tab name="information" label="Информация" />
            <q-tab name="projects" label="Проекты" />
            <q-tab name="finance" label="Финансы" />
            <q-tab name="document" label="Документы" />
            <q-tab name="reviews" label="Отзывы" />
            <q-tab name="photo" label="Фото" />
          </q-tabs>
          <div class="circle bg-grey-3">
            <q-icon size="12px" name="svguse:icons/allIcons.svg#tooltip" color="grey-4" />
          </div>
        </div>
        <q-tab-panels
          v-model="tab2"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="information">
            <div class="section">
              <Information />
            </div>
          </q-tab-panel>

          <q-tab-panel name="projects">
            
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import Information from 'components/Contractor/Information.vue'

export default {
  name: 'PageСontractorSingle',
  components: {
    Information
  },
  setup () {
    const tab = ref()
    const tab2 = ref('information')
    return {
      tab,
      tab2
    }
  }
}
</script>
