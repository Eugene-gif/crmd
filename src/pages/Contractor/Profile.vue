<template>
  <q-page class="page-contractor-single page-profile">
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

        <div class="branch-managers">
          <Fillials />
        </div>

        <ActivityCategory />
        <TermsDesigners />
        <RequisitesDocuments />
        <TwoThreeD />
        <ProfilePhotos />
        <ProfileReviews />

      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { inject } from 'vue'
import CardInfo from 'components/CardInfo'
import Info1 from 'components/Contractor/Profile/Info1'
import Info2 from 'components/Contractor/Profile/Info2'
import DetailInfo from 'components/Contractor/Profile/DetailInfo'
import Fillials from 'components/Contractor/Profile/Fillials'
import ActivityCategory from 'components/Contractor/Profile/ActivityCategory'
import TermsDesigners from 'components/Contractor/Profile/TermsDesigners'
import RequisitesDocuments from 'components/Contractor/Profile/RequisitesDocuments'

import TwoThreeD from 'components/Profile/MyFiles'
import ProfilePhotos from 'components/Profile/ProfilePhotos'
import ProfileReviews from 'components/Contractor/Profile/ProfileReviews'

export default {
  name: 'ProfileСontractor',
  components: {
    CardInfo,
    Info1,
    Info2,
    DetailInfo,
    Fillials,
    ActivityCategory,
    TermsDesigners,
    RequisitesDocuments,
    TwoThreeD,
    ProfilePhotos,
    ProfileReviews
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
