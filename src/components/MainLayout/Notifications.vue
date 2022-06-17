<template>
  <q-btn-dropdown 
    flat
    round
    class="header__btn__alert my-effect h-primary dropdown-none"
    content-class="q-menu__notifications"
  > 
    <template v-slot:label>
      <q-icon color="black" size="19px" name="svguse:icons/allIcons.svg#alert" />
      <sup>
        6
      </sup>
    </template>
    <q-list>
      <q-item class="head">
        <q-item-section>
          <q-item-label>Сегодня</q-item-label>
          <q-btn
            flat
            rounded
            v-close-popup
            class="bg-grey-3 my-effect h-opacity rotate"
            padding="11px"
          >
            <q-icon size="13px" name="svguse:icons/allIcons.svg#close-modal" />
          </q-btn>
        </q-item-section>
      </q-item>

      <q-item class="column" to="#">
        <q-item-section class="d-flex row kind">
          <q-icon color="black" name="svguse:icons/allIcons.svg#sms" />
          <q-item-label>Сообщения</q-item-label>
          <div class="time">09:35</div>
        </q-item-section>
        <q-item-section class="d-flex row message">
          <q-item-section class="info">
            <div class="name">Антон Глуханько </div>
            <div class="text">
              Привезем без проблем, если границы не закроют снова!
            </div>
          </q-item-section>
          <img src="~assets/anton.jpg">
        </q-item-section>
      </q-item>

      <q-item class="column" to="#">
        <q-item-section class="d-flex row kind">
          <q-icon color="black" name="svguse:icons/allIcons.svg#sms" />
          <q-item-label>Сообщения</q-item-label>
          <div class="time">09:35</div>
        </q-item-section>
        <q-item-section class="d-flex row message">
          <q-item-section class="info">
            <div class="name">Антон Глуханько </div>
            <div class="text">
              Привезем без проблем, если границы не закроют снова!
            </div>
          </q-item-section>
          <img src="~assets/stroipro.jpg">
        </q-item-section>
      </q-item>

      <q-item class="column" to="#">
        <q-item-section class="d-flex row kind">
          <q-icon color="black" name="svguse:icons/allIcons.svg#sms" />
          <q-item-label>Сообщения</q-item-label>
          <div class="time">09:35</div>
        </q-item-section>
        <q-item-section class="d-flex row message">
          <q-item-section class="info">
            <div class="name">Антон Глуханько </div>
            <div class="text">
              Привезем без проблем, если границы не закроют снова!
            </div>
          </q-item-section>
          <img src="~assets/anton.jpg">
        </q-item-section>
      </q-item>

      <q-item class="column" to="#">
        <q-item-section class="d-flex row kind">
          <q-icon color="black" name="svguse:icons/allIcons.svg#sms" />
          <q-item-label>Сообщения</q-item-label>
          <div class="time">09:35</div>
        </q-item-section>
        <q-item-section class="d-flex row message">
          <q-item-section class="info">
            <div class="name">Антон Глуханько </div>
            <div class="text">
              Привезем без проблем, если границы не закроют снова!
            </div>
          </q-item-section>
          <img src="~assets/anton.jpg">
        </q-item-section>
      </q-item>

      <q-item class="foot">
        <q-item-section>
          <q-btn
            unelevated
            no-caps
            class="bg-grey-6 text-white my-btn my-effect h-opacity"
            padding="16.5px 0"
            label="Все уведомления"
          />
        </q-item-section>
      </q-item>

    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { ref } from 'vue'

export default ({
  name: 'Notifications',

  setup () {
    return {
      
    }
  }
})
</script>
