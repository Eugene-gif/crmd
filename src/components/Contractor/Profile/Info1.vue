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
        <div class="title">Дизайнеры на связи</div>
        <!-- <div class="null-text">Пока не добавлены</div> -->
        <div class="designers">
          <div class="designers-content" :class="{'designers-content-activated': activeList}">
            <q-item 
              class="q-item-null"
              v-for="el in list.slice(0, lengthList)"
              :key="el.id"
            >
              <img :src="el.img" alt="">
              <CardInfo 
                :anchor="['bottom', 'middle']" 
                :self="['top', 'right']" 
                :translateY="`-25px`"
              />
            </q-item>
            <q-btn
              unelevated
              no-caps
              icon="svguse:icons/financeTable.svg#action"
              class="my-effect btn-flat btn-option"
              :auto-close="false" 
              @click="activeList = !activeList"
              v-show="list.length >= 6 && !activeList"
            />
          </div>
        </div> 
      </div>
      <div class="item">
        <q-btn class="btn-base btn-flat" flat no-caps label="База дизайнеров" padding="0" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import CardInfo from 'components/CardInfo'

export default {
  name: 'ProfileInfo1',
  components: {
    CardInfo,
  },
  setup() {
    const list = ref([
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
    
    const activeList = ref(false)
    const lengthList = computed(() => {
      if (list.value.length > 6 && !activeList.value) {
        return 6
      } else {
        return list.value.length
      }
    })
    return {
      list,
      activeList,
      lengthList,
    }
  },
}
</script>