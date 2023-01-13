<template>
  <q-page class="page-role">
    <LoaderDate
      v-show="loading"
    />
    <!-- @reset="onReset" -->
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <div class="form-section">
        <div class="head">
          <q-item to="/role">
            <span>Выберите роль</span>
          </q-item>
          <q-item></q-item>
        </div>

        <div class="form-text">
          Поздравляем! Учетная запись создана. <br>
          Самое время выбрать вашу роль на проекте:
        </div>

        <q-tabs
          v-model="tab"
          narrow-indicator
          dense
          class="q-tabs-null q-tabs-role"
        >
          <q-tab name="mails">
            <div class="title">Дизайнер</div>
            <div class="text">
              Добавьте информацию <br>
              о своих заказчиках 
              и проектах. Ведите сметы, выдавайте доступ к ним подрядчикам, чтобы получить их предложения цены и условия агентских вознаграждений.
            </div>
          </q-tab>
          <q-tab name="alarms">
            <div class="title">Подрядчик</div>
            <div class="text">
              Укажите свои услуги 
              и получайте приглашения 
              на выполнение работ 
              и поставку товаров 
              от дизайнеров. Улучшайте рейтинг и получайте больше заказов. Ведите учет финансовых расчетов.
            </div>
          </q-tab>
        </q-tabs>

        <q-item to="/more" class="q-item-none reset">Подробнее об отличиях дизайнера и подрядчика</q-item>
        
        <div class="section-btn">
          <q-btn
            unelevated
            no-caps
            type="submit"
            padding="20px 10px"
            class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
            label="Готово"
            @click="onSubmit"
          />
        </div>
      </div>

    </q-form>
    <AuthInformation />
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex';
import { useQuasar } from 'quasar'
import { userApi } from 'src/api/user';
import { contractorApi } from 'src/api/contractor'

import AuthInformation from 'src/components/auth/AuthInformation.vue'
import LoaderDate from 'src/components/LoaderDate.vue'

export default {
  components: {
    AuthInformation,
    LoaderDate
  },
  setup () {
    const tab = ref('mails')

    async function onSubmit() {
      try {
        await userApi.setRoleForUser().then(resp => {
          let user = localStorage.getItem('userInfo')
          let userObj = JSON.parse(user)
          userObj.email_verified_at = true
          userObj.role.id = 3

          let userInfo = JSON.stringify(userObj)
          localStorage.setItem('userInfo', userInfo)

          window.location.href = '/'
        })
      } catch (err) {
        console.log(err)
      }
    }

    return {
      tab,
      onSubmit
    }
  }
}
</script>