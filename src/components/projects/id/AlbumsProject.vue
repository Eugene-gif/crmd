<template>
  <q-expansion-item
    expand-separator
    default-opened
    class="visual"
  >
  <!-- visual-2 -->
  <template v-slot:header>
    <div class="title">
      Визуал
    </div>
    <q-icon name="svguse:icons/allIcons.svg#settings" size="17px" class="settings-icon" @click.stop="true" />
  </template>
    <q-card>
      <q-card-section
        v-for="item in data"
        :key="item.id"
      >
        <VisualSlider
          :images="item.images"
        />
        <div class="row desc">
          <div class="title">{{item.name}}</div>
          <ActionBtn 
            :propsEl="item.id"
            :offsetYX="[55, -266]"
          />
        </div>
        <div class="row security">
          <q-btn
            unelevated
            no-caps
            class="bg-grey-3 text-grey-5 my-btn my-effect"
            padding="9px 14px"
          >
            Доступ по ссылке
            <q-icon name="svguse:icons/btnIcons.svg#link" size="18px" class="q-mr-sm link-icon">
              <div class="circle"></div>
            </q-icon>
          </q-btn>
          <q-list class="q-list-share">
            <q-item
              v-for="el in item.share.slice(0, 4)" :key="el.link"
            >
              <q-btn :to="el.link">
                <img :src="el.icon" alt="">
              </q-btn>
            </q-item>
            <q-item
              v-if="item.share.length > 1"
            >
              <q-btn class="q-td-share__btn__limit" :label="`+${item.share.length - 1}`" />
            </q-item>
            <q-item class="q-item-add">
              <q-btn class="q-td-share__btn__add" icon="svguse:icons/allIcons.svg#plus" />
            </q-item>
          </q-list>
        </div>
        
      </q-card-section>
      <q-card-section class="q-card-btn">
        <q-btn
          unelevated
          no-caps
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite " 
        >
          <div class="block">Добавить альбом</div>
          <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" />
        </q-btn>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import ActionBtn from 'components/Table/ActionBtn.vue'
import VisualSlider from 'components/projects/VisualSlider.vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  components: {
    ActionBtn,
    VisualSlider,
  },
  props: {
    data: Array
  },
  setup(props, {emit}) {

    const visual = ref([
      {
        id: '1',
        images: [
          {
            thumbnail: '/project-1.jpg'
          },
          {
            thumbnail: '/project-2.jpg'
          },
          {
            thumbnail: '/project-3.jpg'
          },
        ],
        name: 'Планы, чертежи, схемы',
        share: [
          {
            icon: '/icons/anton.jpg',
            link: 's'
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          }
        ]
      },
      {
        id: '2',
        images: [
          {
            thumbnail: '/project-1.jpg'
          },
          {
            thumbnail: '/project-2.jpg'
          },
          {
            thumbnail: '/project-3.jpg'
          },
        ],
        name: 'Планы, чертежи, схемы',
        share: [
          {
            icon: '/icons/anton.jpg',
            link: 's'
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          }
        ]
      },
      {
        id: '3',
        images: [
          {
            thumbnail: '/project-1.jpg'
          },
          {
            thumbnail: '/project-2.jpg'
          },
          {
            thumbnail: '/project-3.jpg'
          },
        ],
        name: 'Планы, чертежи, схемы',
        share: [
          {
            icon: '/icons/anton.jpg',
            link: 's'
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          }
        ]
      },
      {
        id: '4',
        images: [
          {
            thumbnail: '/project-1.jpg'
          },
          {
            thumbnail: '/project-2.jpg'
          },
          {
            thumbnail: '/project-3.jpg'
          },
        ],
        name: 'Планы, чертежи, схемы',
        share: [
          {
            icon: '/icons/anton.jpg',
            link: 's'
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/anton.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          },
          {
            icon: '/icons/stroipro.jpg',
            link: ''
          }
        ]
      },
    ])

    return {
      visual,
    }
  },
})
</script>
