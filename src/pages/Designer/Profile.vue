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

<script>
import { ref, onMounted } from 'vue'
import { inject } from 'vue'
import CardInfo from 'components/CardInfo'
import Info1 from 'components/Designer/Info'
import Info2 from 'components/Designer/Info2'

import DetailInfo from 'components/Contractor/Profile/DetailInfo'
import Services from 'components/Designer/Services'
import Fillials from 'components/Contractor/Profile/Fillials'
import ActivityCategory from 'components/Contractor/Profile/ActivityCategory'
import TermsContractors from 'components/Designer/TermsContractors'
import RequisitesDocuments from 'components/Contractor/Profile/RequisitesDocuments'
import MyFiles from 'components/Designer/MyFiles'
import ProfilePhotos from 'components/Designer/ProfilePhotos'

export default {
  name: 'ProfileСontractor',
  components: {
    CardInfo,
    Info1,
    Info2,
    DetailInfo,
    Services,
    Fillials,
    ActivityCategory,
    TermsContractors,
    RequisitesDocuments,
    MyFiles,
    ProfilePhotos,
  },

  setup () {
    const companyName = ref()

    const emitter = inject('emitter')     
    emitter.on('myevent', (value) => { 
      companyName.value = value
    })

    function start() {

    }
    onMounted(() => {
      
    })
    return {
      companyName
    }
  }
}
</script>
