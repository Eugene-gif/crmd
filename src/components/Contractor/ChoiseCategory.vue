<template>
  <div class="choise-category-bcg" :class="{'choise-category-bcg-active': btnActive}"></div>
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
        :label="check.name"
        class="q-checkbox-choice no-shadow"
        @click.stop="checkFuncOpen(check)"
      />
    </div>
    <div class="choice-place choice-place-2" v-show="btnActive && checkActive">
      <div class="head">
        <div class="title">
          {{activeList.name}}
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
          v-for="check in activeList.tags"
          :key="check"
          v-model="check.value"
          :label="check.name"
          class="q-checkbox-choice no-shadow"
          @click="addTagInCategory()"
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
          {{item.name}}
        </div>
      </template>

      <q-btn
        unelevated 
        outline
        no-caps
        class="my-btn-custom-big my-btn my-effect  btn-custom br-10"
        padding="5px 25.5px"
        color="grey-7"
        v-for="el in item.tags"
        :key="el"
        v-show="el.value"
      >
        <span class="block text-grey-5">{{el.name}}</span>
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
import { ref, defineComponent, onMounted } from 'vue'
import { contractorApi } from 'src/api/contractor'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup(props, { emit }) {
    const $q = useQuasar()

    const checklist = ref([])
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
        activeList.value.tags.filter((item) => {
          item.value = true
        })
      }
      if (val === 'clear') {
        activeList.value.value = false
        activeList.value.tags.filter((item) => {
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

    async function useCheckList(parentList) {
      console.log(parentList)
      let formData = {
        category_id: parentList.id,
        name: 'nananna',
        description: 'no desc',
      }
      if (parentList.tags.length > 0) {
        let bool = parentList.tags.find(item => item.value === true)
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

    // api tags
    async function getListTags() {
      try {
        await contractorApi.getListTags().then(resp => {
          checklist.value = resp
          console.log(resp)
        })
      } catch (err) {
        $q.notify({
          color: 'negative',
          message: 'произошла ошибка'
        })
        console.log(err)
      }
    }
    async function getActiveListTags() {
      try {
        await contractorApi.getActiveListTags().then(resp => {
          console.log(resp)
        })
      } catch (err) {
        $q.notify({
          color: 'negative',
          message: 'произошла ошибка'
        })
        console.log(err)
      }
    }
    async function addTagInCategory() {
      let arr = []
      activeList.value.tags.filter((el) => {
        if(el.value === true) {
          return arr.push(el.id)
        }
      })
      try {
        await contractorApi.addTagInCategory(arr).then(resp => {
          $q.notify({
            color: 'positive',
            message: `Тег добавлен`
          })
          // getActiveListTags()
        })
      } catch (err) {
        $q.notify({
          color: 'negative',
          message: 'произошла ошибка'
        })
        console.log(err)
      }
    }
    
    onMounted(() => {
      getListTags()
      getActiveListTags()
    })

    return {
      checklist,
      checkActive,
      btnActive,
      activeList,
      checkFuncOpen,
      customCheckList,
      getList,
      useCheckList,
      delEl,
      getListTags,
      getActiveListTags,
      addTagInCategory
    }
  },
})
</script>
