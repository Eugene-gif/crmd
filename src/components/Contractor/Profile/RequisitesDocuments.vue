<template>
  <q-expansion-item
    expand-separator
    default-opened
    class="foto-gallery q-expansion-my details-documents"
  >
    <template v-slot:header>
      <div class="title">
        Реквизиты для документов
      </div>
      <q-btn
        unelevated 
        no-caps
        flat
        class="my-btn my-effect h-opacity btn-custom"
        style="margin-left: auto;"
        color="grey-5"
        padding="0"
        label="Изменить"
        @click.stop="isActive.documents = !isActive.documents"
      />
      <q-icon
        name="svguse:icons/allIcons.svg#settings"
        size="13px"
        class="settings-icon mb-visible"
        @click.stop="isActive.documents = !isActive.documents"
      />
    </template>

    <div class="details" v-show="!isActive.documents">
      <div class="sec">
        <div
          class="item"
          v-for="item in documents"
          :key="item"
        >
          <div class="cell">{{item.title}}</div>
          <div class="cell">{{item.value}}</div>
        </div>
      </div>
      <q-btn
        unelevated 
        no-caps
        class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
        padding="0"
        @click="isActive.documents = !isActive.documents"
      >
        <span class="block text-grey-5">Изменить</span>
      </q-btn>
    </div>

    <div class="form-chapter" v-show="isActive.documents">
      <div class="chapter">
        <q-list>
          <q-item>
            <div class="title">Тип</div>
            <q-input v-model="formData.company_type" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
          <q-item>
            <div class="title">Юридический адрес</div>
            <q-input v-model="formData.legal_address" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
          <q-item>
            <div class="title">ИНН</div>
            <q-input v-model="formData.inn" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
          <q-item>
            <div class="title">КПП (для ООО)</div>
            <q-input v-model="formData.kpp" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
        </q-list>

        <q-list>
          <q-item>
            <div class="title">Название компании</div>
            <q-input v-model="formData.company_name" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
          <q-item>
            <div class="title">Фактический адрес</div>
            <q-input v-model="formData.actual_address" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
          <q-item>
            <div class="title">ОГРН (для ООО и ИП)</div>
            <q-input v-model="formData.ogrn" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
        </q-list>
      </div>

      <div class="chapter">
        <q-list>
          <q-item>
            <div class="title">ФИО подписанта </div>
            <q-input v-model="formData.person_name" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
          <q-item>
            <div class="title">Основание (для ООО)</div>
            <q-input v-model="formData.person_based_on" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
        </q-list>

        <q-list>
          <q-item>
            <div class="title">Должность (для ООО)</div>
            <q-input v-model="formData.person_position" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
        </q-list>
      </div>

      <div class="chapter">
        <q-list>
          <q-item>
            <div class="title">Расчётный счёт</div>
            <q-input v-model="formData.settlement_account" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
          <q-item>
            <div class="title">Отделение банка</div>
            <q-input v-model="formData.bank_branch" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
        </q-list>

        <q-list>
          <q-item>
            <div class="title">Корреспондетский счёт</div>
            <q-input v-model="formData.correspondent_account" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
          <q-item>
            <div class="title">БИК банка</div>
            <q-input v-model="formData.bank_bik" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
        </q-list>
      </div>
      <q-btn
        no-caps
        padding="20px 10px"
        class="full-width bg-positive text-white my-btn my-btn-shadow my-effect h-dark q-btn-actions br-10 btn-50"
        label="Сохранить изменения"
        @click="isActive.documents = !isActive.documents"
      />
    </div>
    
  </q-expansion-item>
</template>

<script>
import { ref, onMounted } from 'vue'
import { contractorApi } from 'src/api/contractor';

export default {
  name: 'ProfileRequisitesDocuments',
  setup() {
    
    const isActive = ref({
      documents: false,
    })  
    const formData = ref({
      company_type: '',
      company_name: '',
      legal_address: '',
      actual_address: '',
      inn: '',
      ogrn: '',
      kpp: '',
      settlement_account: '',
      correspondent_account: '',
      bank_branch: '',
      bank_bik: '',
      person_name: '',
      person_position: '',
      person_based_on: '',
    })
    const documents = ref([
      {
        title: 'Тип',
        value: formData.value.company_type
      },
      {
        title: 'Название компании',
        value: formData.value.company_name
      },
      {
        title: 'Юридический адрес',
        value: formData.value.legal_address
      },
      {
        title: 'Фактический адрес',
        value: formData.value.actual_address
      },
      {
        title: 'ИНН',
        value: formData.value.inn
      },
      {
        title: 'ОГРН (для ООО и ИП)',
        value: formData.value.ogrn
      },
      {
        title: 'КПП (для ООО)',
        value: formData.value.kpp
      },
      {
        title: 'ФИО подписанта ',
        value: formData.value.person_name
      },
      {
        title: 'Должность (для ООО)',
        value: formData.value.person_position
      },
      {
        title: 'Основание (для ООО)',
        value: formData.value.person_based_on
      },
      {
        title: 'Расчётный счёт',
        value: formData.value.settlement_account
      },
      {
        title: 'Корреспондетский счёт',
        value: formData.value.correspondent_account
      },
      {
        title: 'Отделение банка',
        value: formData.value.bank_branch
      },
      {
        title: 'БИК банка',
        value: formData.value.bank_bik
      },
    ])

    async function getInfoDocs() {
      try {
        await contractorApi.getBankingInfo(formData.value).then(resp => {
          formData.value = resp
        })
      } catch (err) {
        console.log(err)
      }
    }

    async function start() {
      await getInfoDocs()
      let arr = Object.values(formData.value)
      let bool = null
      arr.find(item => {
        if (item === null) {
          bool = true
        }
      })
      console.log(bool)
      if (bool === true) {
        isActive.value.documents = true
      }
    }
    onMounted(() => {
      start()
    })

    return {
      isActive,
      formData,
      documents,
      getInfoDocs,
      start
    }
  },
}
</script>