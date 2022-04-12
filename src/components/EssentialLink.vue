<template>
  <q-item
    clickable
    v-ripple
    :to="link"
    class="my-effect h-opacity"
  >
    <q-item-section>
      <q-item-label>{{ title }} <sup>{{number}}</sup></q-item-label>
      <q-icon size="12px" name="svguse:icons/allIcons.svg#essentialPlus" />
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    link: {
      type: String,
      default: '#'
    },

    number: {
      type: Number,
      default: null
    }
  }
})
</script>
