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

    <div
      class="q-td__action__list"
      :ref="el => menu[propsEl.key] = el"
      :style="{ top: offsetYX[0] + 'px', left: offsetYX[1] + 'px' }"
    >
      <q-list>
        <q-item clickable>
          <q-item-section>
            <q-item-label>Изменить</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section>
            <q-item-label>Дублировать</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section>
            <q-item-label>Удалить</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default ({
  name: 'ActionBtn',
  props: {
    propsEl: Object,
    offsetYX: Array
  },
  setup () {
    const dropdown = ref([])
    const menu = ref([])

    function onClickOtside() {
      for (let item of document.querySelectorAll('.q-td__action__list')) {
        item.classList.remove('visible');
      } 
    }
    onMounted(() => {
      window.addEventListener('click', onClickOtside);
    })

    return {
      dropdown,
      menu,
      onClickOtside,
      notify(el) {
        onClickOtside()
        menu.value[el].classList.add('visible')
      }
    }
  }
})
</script>