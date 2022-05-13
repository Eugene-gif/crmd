<template>
  <q-card>
    <div class="q-card-background" @click="$emit('modalFalse')"></div>
    <div class="dialog-section">
      <q-card-section class="row items-center justify-between head">
        <div class="title">Указать перевод</div>
        <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
      </q-card-section>

      <q-card-section class="form-section">
        <label class="lable-title">Тип</label>
        <q-select
          filled
          v-model="select1"
          :options="type"
          stack-label
          placeholder="Выбрать"
          dropdown-icon="svguse:icons/allIcons.svg#select-arrow"
          class="my-select"
          behavior="menu"
          ref="selectDropbox"
          @popup-hide="focusSelect"
          popup-content-class="my-select-menu"
          :label="select1 ? undefined : 'Выбрать'"
        />
      </q-card-section>

      <q-card-section class="form-section">
        <label class="lable-title">Проект</label>
        <DropBox />
      </q-card-section>

      <q-card-section class="form-section"  v-show="select1.value === 1 || select1.value === 2 || select1.value === 3">
        <label class="lable-title">От кого</label>
        <DropBox />
      </q-card-section>
      
      <q-card-section class="form-section" v-show="select1.value === 3 || select1.value === 4">
        <label class="lable-title">Кому</label>
        <DropBox />
      </q-card-section>

      <q-card-section class="form-section" v-show="select1.value === 1 || select1.value === 2 || select1.value === 4">
        <label class="lable-title">Сумма, руб.</label>
        <q-input v-model="text2" class="my-input bg-grey-3" placeholder="Введите сумму" />
      </q-card-section>

      <q-card-section class="form-section form-section-row" v-show="select1.value === 3">
        <div class="form-col">
          <label class="lable-title">Сумма, руб.</label>
          <q-input v-model="text3" class="my-input bg-grey-3" placeholder="Введите сумму" />
        </div>
        <div class="form-col">
          <label class="lable-title">Агентские, %</label>
          <q-input v-model="text4" class="my-input bg-grey-3" placeholder="Введите сумму" />
        </div>
        <div class="form-col form-col-hint">
          <div class="hint">Сумма агентских: 15 000 руб.</div>
        </div>
      </q-card-section>

      <q-card-section class="form-section">
        <label class="lable-title">Дата</label>
        <BtnDate />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          unelevated
          no-caps
          padding="20px 10px"
          class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
          label="Добавить перевод"
        />
      </q-card-actions>
    </div>
  </q-card>
  
</template>

<script>
import { ref } from 'vue'
import BtnDate from 'components/BtnDate.vue'
import DropBox from 'components/DropBox.vue'

export default ({
  name: 'FinanceDialog',
  emits: ['modalFalse'],
  components: {
    BtnDate,
    DropBox
  }, 
  setup () {
    const selectDropbox = ref();
    return {
      select1: ref(
        {
          label: 'Гонорар',
          value: 1
        },
      ),
      
      type: [
        {
          label: 'Гонорар',
          value: 1
        },
        {
          label: 'Агентсткие',
          value: 2
        },
        {
          label: 'Трансфер',
          value: 3
        },
        {
          label: 'Возврат',
          value: 4
        }
      ],
      
      selectDropbox,

      text: ref(''),
      text2: ref(''),
      show: ref(false),
      text3: ref(),
      text4: ref(15),
      focusSelect() {
        function func() {
          selectDropbox.value.blur()
        }
        setTimeout(func, 100);
      },
      beforeHide() {
        show.value = true;
      }
    }
  }
})
</script>
