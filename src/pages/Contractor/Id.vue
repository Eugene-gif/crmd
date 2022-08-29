<template>
    
  <q-page class="page-contractor-single">
    <div class="row justify-between items-center">
      <div class="text-h2">СтройПро</div>
      <q-icon size="18px" class="mb-visible" name="svguse:icons/allIcons.svg#back" />
      <div class="sectiobn-btns">
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite q-mr-xs"
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
        
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'PageСontractorSingle',
  components: {
    
  },
  setup () {
    const tab = ref()
    return {
      tab
    }
  }
}
</script>
