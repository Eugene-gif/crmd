<template>
  <q-page class="page-contractor-single page-profile designer-profile">
    <div class="row justify-between items-center">
      <div class="text-h2">{{companyName}}</div>
      <q-icon
        size="18px"
        class="mb-visible"
        name="svguse:icons/allIcons.svg#back"
        style="margin-left: auto;"
      />
    </div>
    <div class="row section">
      <div class="content">

        <Info1 />
        <Info2 />
        <DetailInfo />
        <Services />
        <TermsContractors />
        <RequisitesDocuments />
        <MyFiles />
        <ProfilePhotos />

      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { inject } from 'vue'
import CardInfo from 'components/CardInfo'
import Info1 from 'components/Designer/Info'
import Info2 from 'components/Designer/Info2'
import DetailInfo from 'components/Designer/DetailInfo'
import Services from 'components/Designer/Services'
import TermsContractors from 'components/Designer/TermsContractors'
import RequisitesDocuments from 'components/Contractor/Profile/RequisitesDocuments'
import MyFiles from 'components/Profile/MyFiles'
import ProfilePhotos from 'components/Profile/ProfilePhotos'

const companyName = ref()

const emitter = inject('emitter')
emitter.on('myevent', (value) => { 
  companyName.value = value
})

</script>