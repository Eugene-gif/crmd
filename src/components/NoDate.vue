<template>
  <div class="nodate-section">
    <div class="nodate">
      <div class="circle">
        <img src="~/assets/no-date.svg" alt="">
      </div>
      <div class="text">
        {{text}}
      </div>
    </div>
  </div>
  
</template>

<script>

export default {
  props: {
    text: String
  },
  setup() {
    
  },
}
</script>