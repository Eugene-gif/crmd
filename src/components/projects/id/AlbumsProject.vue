<template>
  <q-dialog
    v-model="dialog"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog contractor-dialog-share"
  >
    <DialogUploadImg 
      @modalFalse="modalFalse"
      :project_id="project_id"
      v-if="project_id"
    />
  </q-dialog>

  <q-dialog
    v-model="dialogDelModal"
    transition-show="fade"
    transition-hide="fade" 
    class="my-dialog"
  >
    <DialogDelite 
      @modalFalse="modalOpenDel"
    />
  </q-dialog>

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
            :offsetYX="[55, -256]"
            :actionfunc="actionfunc"
            @actionOpen="onActionEdit"
            @actionEdit="onActionEdit"
            @actionSecurity="onActionSecurity"
            @actionDel="onActionAlbumDel(item.id)"
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
            <!-- <q-item
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
            </q-item> -->
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
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite"
          @click="dialog = true" 
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
import DialogUploadImg from 'src/components/Profile/DialogUploadImg.vue'
import DialogDelite from 'components/dialog/DialogDelite'
import { albumsApi } from 'src/api/albums'
import { useQuasar } from 'quasar'

export default defineComponent({
  components: {
    ActionBtn,
    VisualSlider,
    DialogUploadImg,
    DialogDelite,
  },
  props: {
    data: Array,
    project_id: String
  },
  setup(props, {emit}) {

    const dialog = ref(false)
    const dialogDelModal = ref(false)
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

    const actionfunc = ref([
      {
        title: 'Открыть',
        emmit: 'actionOpen'
      },
      {
        title: 'Редактировать',
        emmit: 'actionEdit'
      },
      {
        title: 'Настройки доступа',
        emmit: 'actionSecurity'
      },
      {
        title: 'Удалить',
        emmit: 'actionDel'
      },
    ])

    async function onActionAlbumDel(id) {
      try {
        await albumsApi.delAlbum(id).then(resp => {
          console.log(resp)
          visual.value = visual.value.filter((item) => item.id !== id)
          setTimeout(() => {
            $q.notify({
              color: 'positive',
              message: 'Альбом удален'
            })
          }, 0)
        })
      } catch (err) {
        console.log(err)
        setTimeout(() => {
          $q.notify({
            color: 'red',
            message: 'Произошла ошибка, попробуйте позже'
          })
        }, 0)
      }
    }

    function modalFalse(val) {
      dialog.value = false
      props.data.push(val)
    }
    
    return {
      visual,
      dialog,
      dialogDelModal,
      actionfunc,
      modalFalse,
      onActionAlbumDel,
    }
  },
})
</script>
