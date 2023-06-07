<template>
  <div class="info-1">
    <div class="continer">
      <div class="item">
        <div class="title">Проектов доступно</div>
        <div class="number">
          <span>0</span>
          <!-- <div class="new">
            0 новых
          </div> -->
        </div>
      </div>
      <div class="item">
        <div class="title">Смет доступно</div>
        <div class="number">
          <span>0</span>
          <!-- <div class="new">
            0 новых
          </div> -->
        </div>
      </div>
      <div class="item">
        <div class="title">Дизайнеры <br class="lg-visible">на связи</div>
        <!-- <div class="null-text">Пока не добавлены</div> -->
        <UsersOnline :list="listUsers" />
      </div>
      <div class="item">
        <q-btn 
          class="btn-base btn-flat" 
          flat 
          no-caps 
          label="База дизайнеров" 
          padding="0" 
          to="/designer"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import CardInfo from 'components/CardInfo'
import UsersOnline from 'components/Contractor/Profile/UsersOnline'

export default {
  name: 'ProfileInfo1',
  components: {
    CardInfo,
    UsersOnline,
  },
  setup() {
    const listUsers = ref([
      {
        id: 1,
        img: 'icons/stroipro.jpg'
      },
      {
        id: 2,
        img: 'icons/anton.jpg'
      },
      {
        id: 3,
        img: 'icons/stroipro.jpg'
      },
      {
        id: 4,
        img: 'icons/anton.jpg'
      },
      {
        id: 5,
        img: 'icons/stroipro.jpg'
      },
      {
        id: 6,
        img: 'icons/anton.jpg'
      },
      {
        id: 7,
        img: 'icons/stroipro.jpg'
      },
      {
        id: 8,
        img: 'icons/anton.jpg'
      },
      {
        id: 9,
        img: 'icons/stroipro.jpg'
      },
      {
        id: 10,
        img: 'icons/anton.jpg'
      },
      {
        id: 11,
        img: 'icons/stroipro.jpg'
      },
      {
        id: 12,
        img: 'icons/anton.jpg'
      },
      {
        id: 13,
        img: 'icons/stroipro.jpg'
      },
      {
        id: 14,
        img: 'icons/anton.jpg'
      },
      {
        id: 15,
        img: 'icons/stroipro.jpg'
      },
      {
        id: 16,
        img: 'icons/anton.jpg'
      },
    ])
    return {
      listUsers,
    }
  },
}
</script>