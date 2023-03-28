<template>
  <q-expansion-item
    expand-separator
    default-opened
    class="designer q-expansion-my q-expansion-my-change"
  >
    <template v-slot:header>
      <div class="title">
        Условия работы с подрядчиками
      </div>
      <q-icon
        name="svguse:icons/allIcons.svg#settings"
        size="17px"
        class="settings-icon"
        @click.stop="isActive.designer = true"
      />
    </template>

    <div class="no-data" v-show="!isActive.designer &&  term_bid === 0">
      <div class="text">Условия пока не указаны вами</div>
    </div>
    

    <div v-show="!isActive.designer">
      <div class="desc-sec desc-sec-design bg-grey-9" v-show="term_bid !== 0">
        <div class="information">
          <div class="number">
            {{term_bid}}%
          </div>
          <div class="subtext">
            Вознаграждение<br>
            дизайнера
          </div>
        </div>
        <div class="text lg-visible">
          {{term_text}}
        </div>
        <div class="text mb-visible">
          {{term_text}}
        </div>
      </div>
      <q-btn
        unelevated 
        no-caps
        class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10 lg-visible"
        padding="0"
        @click="isActive.designer = !isActive.designer"
      >
        <span class="block text-grey-5">Изменить</span>
      </q-btn>
    </div>

    <div class="form-chapter" v-show="isActive.designer">
      <div class="chapter">
        <q-list>
          <q-item class="q-item-textarea">
            <div class="title">Условия выплаты</div>
            <q-input type="textarea" v-model="term_text" class="my-input bg-grey-3 my-textarea" placeholder="Опишите условия" />
          </q-item>
        </q-list>
        <q-list>
          <q-item class="q-item-reward">
            <div class="title">Вознаграждение</div>
            <q-input
              v-model="term_bid" type="number"
              class="my-input bg-grey-3 q-field__no-append"
              :error="isValid(term_bid)"
              placeholder="Введите значение"
            >
              <span class="procent">%</span>
            </q-input>
          </q-item>
          <div class="q-item-reward-text">
            Укажите стандартное для вас значение агентского вознаграждения от подрядчиков и условия его получения в свободной форме. В реальных сметах вы сможете пересмотреть это значение по каждой позиции и договориться индивидуально.
          </div>
          <q-btn
            unelevated 
            no-caps
            flat
            class="my-btn my-effect h-opacity btn-add q-item-reward-btn"
            padding="0"
          >
            <span class="block text-grey-5">Показать примеры <br> заполнения описания</span>
          </q-btn>
        </q-list>
      </div>
      <q-btn
        no-caps
        padding="20px 10px"
        class="full-width bg-positive text-white my-btn my-btn-shadow my-effect h-dark q-btn-actions br-10 btn-50"
        label="Сохранить изменения"
        :class="{'btn-load': lodingBtn}"
        @click="updateData"
      />
    </div>

  </q-expansion-item>
</template>

<script>
import { start } from 'repl'
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { contractorApi } from 'src/api/contractor'

export default {
  name: 'ProfileTermsDesigners',
  setup() {
    const $q = useQuasar()
    const lodingBtn = ref(false)
    
    const isActive = ref({
      details: false,
      designer: false,
      documents: false,
    })  

    function isValid(value) {
      if (`${value}`.length > 2) return true
      else return false
    }

    const term_bid = ref()
    const term_text = ref('')

    async function getData() {
      try {
        await contractorApi.getSetTerms().then(resp => {
          term_bid.value = resp.term_bid
          term_text.value = resp.term_text
        })
      } catch (err) {
        $q.notify({
          color: 'negative',
          message: 'произошла ошибка получения данных об условиях сотрудничества'
        })
        console.log(err)
      }
    }

    async function updateData() {
      if (isValid(term_bid.value)) {
        return false
      } else {
        lodingBtn.value = true
        isActive.value.designer = !isActive.value.designer
        let obj = {
          term_bid: term_bid.value,
          term_text: term_text.value
        }
        try {
          await contractorApi.updateSetTerms(obj).then(resp => {
            term_bid.value = resp.term_bid
            term_text.value = resp.term_text
            $q.notify({
              color: 'positive',
              message: 'Данные обновлены'
            })
          })
        } catch (err) {
          $q.notify({
            color: 'negative',
            message: 'произошла ошибка'
          })
          console.log(err)
        }
      }
      
      lodingBtn.value = false
    }

    onMounted(() => {
      getData()
    })

    return {
      isActive,
      term_bid,
      term_text,
      lodingBtn,
      start,
      updateData,
      getData,
      isValid,
    }
  },
}
</script>