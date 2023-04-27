<template>
  <q-expansion-item
    expand-separator
    default-opened
    class="estimates"
  >
  <template v-slot:header>
    <div class="title">
      Сметы
    </div>
    <q-icon name="svguse:icons/allIcons.svg#settings" size="17px" class="settings-icon" @click.stop="true" />
  </template>
    <q-card>

      <q-card-section>
        <div class="title">
          Общая смета проекта
        </div>
        <div class="text">
          Сумма всех<br>
          отдельных смет
        </div>
      </q-card-section>
      <q-card-section
        v-for="item in data" :key="item.id"
      >
        <q-item to="#dsf" class="link-all"></q-item>
        <div class="title">{{item.name}}</div>
        <q-btn
          rounded
          unelevated
          no-caps
          padding="4.5px 10px"
          class="
            bg-negative 
            text-white 
            my-btn 
            my-btn-14 
            my-effect 
            h-dark
            btn-news
            btn-hide
          "
        />
        <!-- :label="`Новых предложений: ${item.news}`"
          :class="{'btn-hide': item.news === null}" -->
        <div class="text">
          Изменена: {{item.updated_at}}
          <span>Создана: {{item.created_at}}</span>
        </div>
        <div class="access q-pr-xs">
          <div class="text">
            Общий доступ
          </div>
          <q-icon name="svguse:icons/btnIcons.svg#link" size="18px" class="q-mr-sm link-icon">
            <q-item class="link-all" to="#eee"></q-item>
            <div class="circle"></div>
          </q-icon>
        </div>
        <q-list class="q-list-share">
          <!-- <q-item
            v-for="el in item.share.slice(0, 1)" :key="el.link"
          >
            <q-btn :to="el.link">
              <img :src="el.icon" alt="">
            </q-btn>
          </q-item>
          <q-item
            v-if="item.share.length > 1"
          >
            <q-btn class="q-td-share__btn__limit" :label="`+${item.share.length - 1}`" />
          </q-item> -->
          <q-item class="q-item-add">
            <q-btn class="q-td-share__btn__add" icon="svguse:icons/allIcons.svg#plus" />
          </q-item>
          <q-item class="q-item-action">
            <ActionBtn 
              :propsEl="item.id"
              :offsetYX="[55, -266]"
              :actionfunc="actionfunc"
            />
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section class="q-card-add">
        <q-btn
          rounded
          unelevated
          no-caps
          icon="svguse:icons/btnIcons.svg#plus"
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite lg-visible"
        />
        <div class="text lg-visible">
          Добавить<br>
          смету
        </div>
        <q-btn
            unelevated
            no-caps
            outline
            class="bg-white text-grey-3 my-btn my-effect my-btn--outline mb-visible"
            style="border-radius: 10px;"
            padding="24px 24px 24px 19px"
          >
            <div class="block text-grey-5">Добавить</div>
            <q-icon
              name="svguse:icons/allIcons.svg#plus"
              size="12px"
              color="black"
              style="opacity: 0.3;margin-left: auto;"
            />
        </q-btn>
      </q-card-section>
      
    </q-card>
  </q-expansion-item>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import ActionBtn from 'components/Table/ActionBtn.vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  components: {
    ActionBtn,
  },
  props: {
    data: Array
  },
  setup(props, {emit}) {
    
    // const estimates = ref([
    //   {
    //     id: '1',
    //     name: 'Напольные покрытия',
    //     changed: '10:35',
    //     created: '24/05/2021',
    //     share: [
    //       {
    //         icon: '/icons/anton.jpg',
    //         link: 's'
    //       },
    //       {
    //         icon: '/icons/stroipro.jpg',
    //         link: ''
    //       },
    //       {
    //         icon: '/icons/anton.jpg',
    //         link: ''
    //       },
    //       {
    //         icon: '/icons/anton.jpg',
    //         link: ''
    //       },
    //       {
    //         icon: '/icons/stroipro.jpg',
    //         link: ''
    //       },
    //       {
    //         icon: '/icons/stroipro.jpg',
    //         link: ''
    //       }
    //     ],
    //     news: 24,
    //   },
    // ])

    const actionfunc = ref([
      {
        title: 'Открыть',
        emmit: ''
      },
      {
        title: 'Редактировать',
        emmit: ''
      },
      {
        title: 'Настройки доступа',
        emmit: ''
      },
      {
        title: 'Удалить',
        emmit: ''
      },
    ])

    onMounted(() => {
      props.data.map((el) => {
        if (el.created_at) {
          el.created_at = el.created_at.split(' ')[1]
        }
        if (el.updated_at) {
          el.updated_at = el.updated_at.split(' ')[1]
        }
      })
    })

    return {
      actionfunc,
      // estimates,
    }
  },
})
</script>
