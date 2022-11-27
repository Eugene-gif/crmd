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
        <div class="item">
          <div class="cell">Тип</div>
          <div class="cell" v-if="formData.company_type != null">{{formData.company_type}}</div>
          <div v-else>—</div>
        </div>
        <div class="item">
          <div class="cell">Название компании</div>
          <div class="cell" v-if="formData.company_name != null">{{formData.company_name}}</div>
          <div v-else>—</div>
        </div>
        <div class="item">
          <div class="cell">Юридический адрес</div>
          <div class="cell" v-if="formData.legal_address != null">{{formData.legal_address}}</div>
          <div v-else>—</div>
        </div>
        <div class="item">
          <div class="cell">Фактический адрес</div>
          <div class="cell" v-if="formData.actual_address != null">{{formData.actual_address}}</div>
          <div v-else>—</div>
        </div>
        <div class="item">
          <div class="cell">ИНН</div>
          <div class="cell" v-if="formData.inn != null">{{formData.inn}}</div>
          <div v-else>—</div>
        </div>
        <div class="item">
          <div class="cell">ОГРН (для ООО и ИП)</div>
          <div class="cell" v-if="formData.ogrn != null">{{formData.ogrn}}</div>
          <div v-else>—</div>
        </div>
        <div class="item">
          <div class="cell">КПП (для ООО)</div>
          <div class="cell" v-if="formData.kpp != null">{{formData.kpp}}</div>
          <div v-else>—</div>
        </div>
        <div class="item">
          <div class="cell">ФИО подписанта </div>
          <div class="cell" v-if="formData.person_name != null">{{formData.person_name}}</div>
          <div v-else>—</div>
        </div>
        <div class="item">
          <div class="cell">Должность (для ООО)</div>
          <div class="cell" v-if="formData.person_position != null">{{formData.person_position}}</div>
          <div v-else>—</div>
        </div>
        <div class="item">
          <div class="cell">Основание (для ООО)</div>
          <div class="cell" v-if="formData.person_based_on != null">{{formData.person_based_on}}</div>
          <div v-else>—</div>
        </div>
        <div class="item">
          <div class="cell">Расчётный счёт</div>
          <div class="cell" v-if="formData.settlement_account != null">{{formData.settlement_account}}</div>
          <div v-else>—</div>
        </div>
        <div class="item">
          <div class="cell">Корреспондетский счёт</div>
          <div class="cell" v-if="formData.correspondent_account != null">{{formData.correspondent_account}}</div>
          <div v-else>—</div>
        </div>
        <div class="item">
          <div class="cell">Отделение банка</div>
          <div class="cell" v-if="formData.bank_branch != null">{{formData.bank_branch}}</div>
          <div v-else>—</div>
        </div>
        <div class="item">
          <div class="cell">БИК банка</div>
          <div class="cell" v-if="formData.bank_bik != null">{{formData.bank_bik}}</div>
          <div v-else>—</div>
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
        @click="getInfoDocs('open', formData)"
      />
    </div>
    
  </q-expansion-item>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
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
    
    async function getInfoDocs(val, data) {
      try {
        await contractorApi.getBankingInfo(data).then(resp => {
          formData.value = resp
        })
        if (val === 'open') {
          isActive.value.documents = !isActive.value.documents
        }
      } catch (err) {
        console.log(err)
      }
    }

    async function start() {
      await getInfoDocs('', {})
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
      getInfoDocs,
      start
    }
  },
}
</script>