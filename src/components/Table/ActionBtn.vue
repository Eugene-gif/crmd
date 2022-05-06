<template>
  <div class="q-td__action">
    <q-btn
      unelevated
      no-caps
      icon="svguse:icons/financeTable.svg#action"
      class="my-effect"
      :ref="el => dropdown[propsEl.key] = el"
      :auto-close="false" 
      @click.stop="notify(propsEl.key)"
    ></q-btn>

    <q-menu
      :offset="[20, 10]"
      class="q-td__action__list"
      :ref="el => menu[propsEl.key] = el"
    >
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>Изменить</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>Дублировать</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>Удалить</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default ({
  name: 'ActionBtn',
  props: {
    propsEl: Number
  },
  setup () {
    const dropdown = ref([])
    const menu = ref([])
    // onMounted(() => {
    //   handleScroll()
    // })
    return {
      dropdown,
      menu,
      notify(el) {
        menu.value[el].show()
        console.log(menu.value[el].infoBox)
      },
      handleScroll() {
        console.log('asdasd')
      }
    }
    
  }

})
</script>