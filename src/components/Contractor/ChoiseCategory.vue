<template>
  <div class="choise-category">
    <q-btn
      unelevated 
      no-caps
      class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
      padding="5px 25.5px"
      :class="{'btn-active': btnActive}"
      @click="btnActive = !btnActive"
    >
      <span class="block text-grey-5">
        <span v-show="!btnActive">Добавить</span>
        <span v-show="btnActive">Выберите категорию</span>
      </span>
      <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" color="black" style="margin-left: auto;" />
    </q-btn>
    <div class="choice-place choice-place-no-active-check" v-show="btnActive && !checkActive">
      <q-checkbox
        v-for="check in checklist"
        :key="check"
        v-model="check.value"
        :label="check.text"
        class="q-checkbox-choice no-shadow"
        @click.stop="checkFuncOpen(check)"
      />
    </div>
    <div class="choice-place choice-place-2" v-show="btnActive && checkActive">
      <div class="head">
        <div class="title">
          {{activeList.text}}
        </div>
        <q-btn
          class="btn-close"
          @click="checkActive = false"
        >
          <q-icon
            name="svguse:icons/allIcons.svg#arrowe-btn-left"
            size="10px"
            style="opacity: 0.3"
          />
        </q-btn>
      </div>
      <div class="sec-btn">
        <q-btn
          flat 
          no-caps 
          label="Включить все" 
          class="my-effect h-opacity" 
          @click="customCheckList('add', activeList)"
        />
        <q-btn
          flat 
          no-caps 
          label="Убрать все" 
          class="my-effect h-opacity" 
          @click="customCheckList('clear', activeList)"
        />
      </div>
      <div class="sec-check">
        <q-checkbox
          v-for="check in activeList.checklist"
          :key="check"
          v-model="check.value"
          :label="check.text"
          class="q-checkbox-choice no-shadow"
          @click="useCheckList(activeList)"
        />
      </div>
      
    </div>
  </div>

  <div
    v-for="item in checklist"
    :key="item"
  >
    <q-expansion-item
      expand-separator
      default-opened
      class="q-expansion-my-2"
      v-if="item.value"
    >
      <template v-slot:header>
        <div class="title">
          {{item.text}}
        </div>
      </template>

      <q-btn
        unelevated 
        outline
        no-caps
        class="my-btn-custom-big my-btn my-effect  btn-custom br-10"
        padding="5px 25.5px"
        color="grey-7"
        v-for="el in item.checklist"
        :key="el"
        v-show="el.value"
      >
        <span class="block text-grey-5">{{el.text}}</span>
        <q-icon 
          name="svguse:icons/btnIcons.svg#delete" 
          size="16px" 
          style="margin-left: auto;" 
          @click="delEl(el, item)"
        />
        <!-- useCheckList(item.checklist) -->
      </q-btn>
    </q-expansion-item>
  </div>  
</template>

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup(props, { emit }) {
    const checklist = ref([
      {
        value: true,
        text: 'Работы и услуги',
        checklist: [
          {
            text: 'Плинтусы',
            value: false
          },
          {
            text: 'Кухонные гарнитуры',
            value: true
          },
          {
            text: 'Молдинги',
            value: true
          },
          {
            text: 'Стеновые панели',
            value: false
          },
          {
            text: 'Декоративные элементы',
            value: true
          },
        ]
      },
      {
        value: false,
        text: 'Напольные покрытия',
        checklist: [],
      },
      {
        value: false,
        text: 'Стеновые покрытия',
        checklist: [],
      },
      {
        value: false,
        text: 'Потолок',
        checklist: [],
      },
      {
        value: false,
        text: 'Декоративные отделочные элементы',
        checklist: [],
      },
      {
        value: false,
        text: 'Перегородки',
        checklist: [],
      },
      {
        value: false,
        text: 'Двери',
        checklist: [],
      },
      {
        value: false,
        text: 'Окна',
        checklist: [],
      },
      {
        value: false,
        text: 'Отопление',
        checklist: [],
      },
      {
        value: false,
        text: 'Электрофурнитура',
        checklist: [],
      },
      {
        value: false,
        text: 'Освещение',
        checklist: [],
      },
      {
        value: false,
        text: 'Мебель',
        checklist: [],
      },
      {
        value: false,
        text: 'Ванная и сауна',
        checklist: [],
      },
      {
        value: false,
        text: 'Заказные изделия',
        checklist: [],
      },
      {
        value: false,
        text: 'Оборудование',
        checklist: [],
      },
      {
        value: false,
        text: 'Декор',
        checklist: [],
      },
      {
        value: false,
        text: 'Благоустройство территории',
        checklist: [],
      },
    ])
    const checkActive = ref(false)
    const btnActive = ref(false)
    const activeList = ref({})
    
    function getList() {
      emit('getList', activeList.value)
    }
    function checkFuncOpen(val) {
      val.value = false
      
      activeList.value = val
      checkActive.value = true
      useCheckList(val)
    }
    function customCheckList(val, list) {
      if (val === 'add') {
        activeList.value.value = true
        activeList.value.checklist.filter((item) => {
          item.value = true
        })
      }
      if (val === 'clear') {
        activeList.value.value = false
        activeList.value.checklist.filter((item) => {
          item.value = false
        })
      }
      useCheckList(list)
    }
    function delEl(el, list) {
      el.value = false
      useCheckList(list)
      // let bool = list.checklist.find(item => item.value === true)
      // if (bool === undefined) {
      //   list.value = false
      // } else {
      //   useCheckList(list)
      // }
    }
    function useCheckList(parentList) {
      if (parentList.checklist.length > 0) {
        let bool = parentList.checklist.find(item => item.value === true)
        if (bool != undefined) {
          if (bool.value === true) {
            parentList.value = true 
          } else {
            parentList.value = false
          }
        } else {
          parentList.value = false
        }
      } else {
        parentList.value = false
      }
    }
    return {
      checklist,
      checkActive,
      btnActive,
      activeList,
      checkFuncOpen,
      customCheckList,
      getList,
      useCheckList,
      delEl
    }
  },
})
</script>
