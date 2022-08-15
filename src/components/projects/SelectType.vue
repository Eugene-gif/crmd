<template>
  <q-select
    filled
    v-model="select1"
    :options="type"
    stack-label
    placeholder="Выбрать"
    dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
    class="my-select"
    behavior="menu"
    ref="selectDropbox"
    @update:model-value="onGetData"
    popup-content-class="my-select-menu"
    :label="select1 ? undefined : 'Выбрать'"
  />
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { projectsApi } from 'src/api/projects';

export default defineComponent ({
  setup(props, { emit }) {
    const select1 = ref({
      label: 'Квартира',
      value: 1
    })
    const type = ref([])

    function onGetData() {
      emit('getData', select1.value)
    }

    async function getType() {
      try {
        await projectsApi.getTypes()
        .then(resp => {
          type.value = resp
          select1.value = resp[0]
        })
      } catch (err) {
        console.log(err)
      }      
    }

    onMounted(() => {
      getType()
    })

    return {
      select1,
      type,
      onGetData,
      getType
    }
  },
})
</script>