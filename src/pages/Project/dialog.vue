<template>
  <q-card>
    <div class="q-card-background" @click="$emit('modalFalse')"></div>
    <div class="dialog-section">
      <q-card-section class="row items-center justify-between head">
        <div class="title">Добавить проект</div>
        <q-icon class="close rotate" v-close-popup name="svguse:icons/allIcons.svg#close-modal" />
      </q-card-section>

      <q-card-section class="form-section">
        <label class="lable-title">Название</label>
        <q-input v-model="text2" class="my-input bg-grey-3" placeholder="Введите название">
          <template v-slot:after>
            <q-icon size="16px" name="svguse:icons/financeTable.svg#smaile" class="q-mr-md" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="form-section">
        <label class="lable-title">Адрес</label>
        <q-input v-model="text2" class="my-input bg-grey-3" placeholder="Введите адрес" />
      </q-card-section>

      <q-card-section class="form-section form-section-row">
        <div class="form-col">
          <label class="lable-title">Площадь, м<sup style="font-size: 10px;font-weight: bold;">2</sup></label>
          <q-input v-model="text3" class="my-input bg-grey-3" placeholder="115" />
        </div>
        <div class="form-col">
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
        </div>
      </q-card-section>

      <q-card-section class="form-section form-section-row-2">
        <div class="form-col">
          <label class="lable-title">Заказчик</label>
          <DropBox />
        </div>
        <div class="form-col">
          <label class="lable-title" style="opacity: 0;">-</label>
          <q-btn
            class="dialog-btn bg-grey-3"
            flat
          >
          <q-icon size="12px" name="svguse:icons/allIcons.svg#plus" style="opacity: 0.3;" />
          </q-btn>
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <div class="text-subtitle1">Какие услуги оказываем:</div>
        <q-list class="q-list-options">
          <q-item>
            <q-checkbox
              v-model="val"
              checked-icon="svguse:icons/allIcons.svg#check"
              class="my-checkbox flat bg-grey-3"
              color="black"
            />
            <label class="name-field">Планировочное решение</label>
          </q-item>
          <q-item>
            <q-checkbox
              v-model="val1"
              checked-icon="svguse:icons/allIcons.svg#check"
              class="my-checkbox flat bg-grey-3"
              color="black"
            />
            <label class="name-field">Дизайн-концепция</label>
            <div class="circle-warning">
              <q-icon name="svguse:icons/allIcons.svg#tooltip" color="white" size="7px"/>
              <q-tooltip max-width="256px" anchor="top middle" self="bottom middle">
                Дизайн-концепция
              </q-tooltip>
            </div>
          </q-item>
          <q-item>
            <q-checkbox
              v-model="val2"
              checked-icon="svguse:icons/allIcons.svg#check"
              class="my-checkbox flat bg-grey-3"
              color="black"
            />
            <label class="name-field">Визуальная подача</label>
            <div class="circle-warning">
              <q-icon name="svguse:icons/allIcons.svg#tooltip" color="white" size="7px"/>
              <q-tooltip max-width="256px" anchor="top middle" self="bottom middle">
                Дизайн-концепция
              </q-tooltip>
            </div>
          </q-item>
          <q-item>
            <q-checkbox
              v-model="val3"
              checked-icon="svguse:icons/allIcons.svg#check"
              class="my-checkbox flat bg-grey-3"
              color="black"
            />
            <label class="name-field">Рабочая документация</label>
          </q-item>
          <q-item>
            <q-checkbox
              v-model="val4"
              checked-icon="svguse:icons/allIcons.svg#check"
              class="my-checkbox flat bg-grey-3"
              color="black"
            />
            <label class="name-field">Авторское сопровождение</label>
          </q-item>
          <q-item>
            <q-checkbox
              v-model="val5"
              checked-icon="svguse:icons/allIcons.svg#check"
              class="my-checkbox flat bg-grey-3"
              color="black"
            />
            <label class="name-field">Комплектация</label>
          </q-item>
        </q-list>
        <q-btn
          unelevated
          no-caps
          padding="20px 10px"
          class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
          label="Добавить проект"
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
          label: 'Квартира',
          value: 1
        },
      ),
      val: ref(false),
      val1: ref(false),
      val2: ref(true),
      val3: ref(false),
      val4: ref(false),
      val5: ref(false),
      type: [
        {
          label: 'Квартира',
          value: 1
        },
        {
          label: 'Офис',
          value: 2
        },
        {
          label: 'Коттедж',
          value: 3
        },
        {
          label: 'Бар',
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
