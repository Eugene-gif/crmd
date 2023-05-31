<template>
  <q-item
    clickable
    v-ripple
    :to="`${link}`"
    class="my-effect h-opacity"
  >
    <q-item-section>
      <q-item-label>{{ title }} <!-- <sup>{{number}}</sup> --></q-item-label>
      <q-btn
        v-if="prefix" 
        flat
        padding="0"
        icon="svguse:icons/allIcons.svg#essentialPlus"
        class="q-icon"
        :to="`${link}${prefix}`"
        @click.stop
      />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
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
    },
    prefix: String || null,
  },
}
</script>
