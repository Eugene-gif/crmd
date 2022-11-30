<template>
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
        @click.stop="isActive.designer = !isActive.designer"
      />
      <q-icon
        name="svguse:icons/allIcons.svg#settings"
        size="13px"
        class="settings-icon mb-visible"
        @click.stop="isActive.designer = !isActive.designer"
      />
    </template>

    <div class="no-data">
      <div class="text">Условия пока не указаны вами</div>
    </div>
    <q-btn
      unelevated 
      no-caps
      class="my-btn-custom-big my-btn-custom-big-noactive bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
      padding="0"
      @click="isActive.designer = !isActive.designer"
    >
      <span class="block text-grey-5">Изменить</span>
    </q-btn>
    <!-- <div v-show="!isActive.designer">
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
        class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10 lg-visible"
        padding="0"
        @click="isActive.designer = !isActive.designer"
      >
        <span class="block text-grey-5">Изменить</span>
      </q-btn>
    </div> -->

    <!-- <div class="form-chapter" v-show="isActive.designer">
      <div class="chapter">
        <q-list>
          <q-item class="q-item-textarea">
            <div class="title">Условия выплаты</div>
            <q-input type="textarea" v-model="inp" class="my-input bg-grey-3 my-textarea" placeholder="Введите название" />
          </q-item>
        </q-list>
        <q-list>
          <q-item class="q-item-reward">
            <div class="title">Вознаграждение</div>
            <q-input v-model="inp" type="number" class="my-input bg-grey-3" placeholder="Введите название">
              <span class="procent">%</span>
            </q-input>
          </q-item>
          <div class="q-item-reward-text">
            Укажите стандартное для вас значение агентского вознаграждения дизайнеров и условия его получения в свободной форме. В реальных сметах вы сможете пересмотреть это значение по каждой позиции и договориться индивидуально.
          </div>
          <q-btn
            unelevated 
            no-caps
            flat
            class="my-btn my-effect h-opacity btn-add q-item-reward-btn"
            padding="0"
          >
            <span class="block text-grey-5">Показать примеры <br> заполнения описания</span>
          </q-btn>
        </q-list>
      </div>
      <q-btn
        no-caps
        padding="20px 10px"
        class="full-width bg-positive text-white my-btn my-btn-shadow my-effect h-dark q-btn-actions br-10 btn-50"
        label="Сохранить изменения"
        @click="isActive.designer = !isActive.designer"
      />
    </div> -->

  </q-expansion-item>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ProfileTermsDesigners',
  setup() {
    
    const isActive = ref({
      details: false,
      designer: false,
      documents: false,
    })  

    return {
      isActive
    }
  },
}
</script>