<template>
  <div class="users">
    <div 
      class="users-content" 
      :class="{'users-content-activated': activeList}"
    >
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
</template>

<script>
import { ref, computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    list: Array
  },
  setup(props, { emit }) {
    const activeList = ref(false)
    const lengthList = computed(() => {
      if (props.list.length > 7 && !activeList.value) {
        return 7
      } else {
        return props.list.length
      }
    })
    return {
      activeList,
      lengthList,
    }
  },
})
</script>