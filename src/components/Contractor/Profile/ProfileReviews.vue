<template>
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
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ProfileReviews',
  setup() {

    return {
      
    }
  },
}
</script>