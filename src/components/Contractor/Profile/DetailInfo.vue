<template>
  <q-expansion-item
    expand-separator
    default-opened
    class="foto-gallery q-expansion-my"
  >
    <template v-slot:header>
      <div class="title">
        Общая информация
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
      />
    </template>

    <div class="container">
      <div class="item avatar">
        <div class="title">
          Аватар
        </div>
        <div class="sec-imgage">
          <div class="circle-close rotate">
            <q-icon
              size="12px"
              name="svguse:icons/allIcons.svg#close-modal"
              color="black"
              style="opacity: 0.3;"
            />
          </div>
          <img src="~assets/stroipro.jpg" alt="">
        </div>
        <div class="sec-btn">
          <q-btn
            unelevated 
            no-caps
            class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom"
            padding="0"
          >
            <span class="block text-grey-5">Заменить фото</span>
          </q-btn>
          <q-btn
            unelevated 
            no-caps
            class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom btn-custom-del mb-visible"
            padding="0"
          >
            <span class="block text-grey-5">Удалить аватар</span>
          </q-btn>
        </div>
          
      </div>
      <div class="item scrollbar">
        <div class="title">
          Фото на главной
        </div>
        <div class="sec">
          <div class="scroll-x my-scrollbar">
            <div
              class="sec-imgage"
              v-for="item in images"
              :key="item"
            >
              <div class="circle-close mini rotate">
                <q-icon
                  size="12px"
                  name="svguse:icons/allIcons.svg#close-modal"
                  color="black"
                  style="opacity: 0.3;"
                />
              </div>
              <img :src="item.img" alt="">
            </div>
          </div>
        </div>
        <div class="custom-sec">
          <q-btn
            unelevated 
            no-caps
            flat
            class="my-btn my-effect h-opacity btn-add"
            padding="0"
          >
            <span class="block text-grey-5">Добавить фото</span>
            <q-icon name="svguse:icons/allIcons.svg#plus" size="12px" color="black" />
          </q-btn>
          <q-btn
            unelevated 
            no-caps
            flat
            class="my-btn my-effect h-opacity btn-delete"
            style="margin-left: auto;opacity: 0.3"
            color="grey-5"
            padding="0"
            label="Удалить все"
          />
        </div>
      </div>
    </div>

    <div class="details" v-show="!isActive.details">
      <div
        class="item"
        v-for="item in details"
        :key="item"
      >
        <div class="cell">{{item.title}}</div>
        <div class="cell">{{item.value}}</div>
      </div>
      <q-btn
        unelevated 
        no-caps
        class="my-btn-custom-big bg-grey-3 my-btn my-effect h-opacity btn-custom br-10"
        padding="0"
        @click="isActive.details = !isActive.details"
      >
        <span class="block text-grey-5">Изменить</span>
      </q-btn>
    </div>
    
    <div class="form-chapter" v-show="isActive.details">
      <div class="chapter">
        <q-list>
          <q-item>
            <div class="title">Название</div>
            <q-input v-model="inp" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
          <q-item>
            <div class="title">Город</div>
            <q-input v-model="inp" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
          <q-item>
            <div class="title">Область работы</div>
            <q-input
              type="textarea"
              v-model="inp"
              class="my-input bg-grey-3 my-textarea"
              placeholder="Введите название"
              style="min-height: 140px;"
            />
          </q-item>
        </q-list>
        <q-list>
          <q-item class="q-item-textarea">
            <div class="title">Описание</div>
            <q-input type="textarea" v-model="inp" class="my-input bg-grey-3 my-textarea" placeholder="Введите название" />
          </q-item>
        </q-list>
      </div>

      <div class="chapter">
        <q-list>
          <q-item>
            <div class="title">Телефон</div>
            <q-input v-model="inp" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
          <q-item>
            <div class="title">Общий адрес</div>
            <q-input v-model="inp" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
          <q-item>
            <div class="title">E-mail</div>
            <q-input v-model="inp" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
          <q-item>
            <div class="title">Сайт</div>
            <q-input v-model="inp" class="my-input bg-grey-3" placeholder="Введите название" />
          </q-item>
        </q-list>
        <q-list>
          <q-item>
            <div class="title">
              Ссылка на WhatsApp
            </div>
            <q-input
              v-model="inp"
              class="my-input bg-grey-3"
              placeholder="Ссылка на WhatsApp"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '']"
            >
              <template v-slot:after>
                <img src="~assets/whatsapp.svg" alt="" class="q-mr-md">
              </template>
            </q-input>
          </q-item>
          <q-item>
            <div class="title">
              Ссылка на Telegram
            </div>
            <q-input
              v-model="inp"
              class="my-input bg-grey-3"
              placeholder="Ссылка на Telegram"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '']"
            >
              <template v-slot:after>
                <img src="~assets/telegram.svg" alt="" class="q-mr-md">
              </template>
            </q-input>
          </q-item>
          <q-item>
            <div class="title">
              Ссылка на Instagram
            </div>
            <q-input
              v-model="inp"
              class="my-input bg-grey-3"
              placeholder="Ссылка на Instagram"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '']"
            >
              <template v-slot:after>
                <img src="~assets/instagram.svg" alt="" class="q-mr-md">
              </template>
            </q-input>
          </q-item>
        </q-list>
      </div>
      <q-btn
        no-caps
        padding="20px 10px"
        class="full-width bg-positive text-white my-btn my-btn-shadow my-effect h-dark q-btn-actions br-10 btn-50"
        label="Сохранить изменения"
        @click="isActive.details = !isActive.details"
      />

    </div>
  </q-expansion-item>
</template>

<script>
import { ref, onMounted } from 'vue'
import { contractorApi } from 'src/api/contractor';

export default {
  name: 'ProfileDetilInfo',
  setup() {
    const images = ref([
      {
        img: '/project-1.jpg'
      },
      {
        img: '/project-2.jpg'
      },
      {
        img: '/project-3.jpg'
      },
      {
        img: '/project-1.jpg'
      },
      {
        img: '/project-2.jpg'
      },
      {
        img: '/project-3.jpg'
      },
      {
        img: '/project-1.jpg'
      },
      {
        img: '/project-2.jpg'
      },
      {
        img: '/project-3.jpg'
      },
    ])
    const details = ref([
      {
        title: 'Название',
        value: 'СтройПро'
      },
      {
        title: 'Город',
        value: 'Краснодар'
      },
      {
        title: 'Область работы',
        value: 'Краснодарский край, ЮФО, Республики Северного Кавказа'
      },
      {
        title: 'Адрес',
        value: 'г. Краснодар, ул. Красных Партизан, д. 232, офис 307'
      },
      {
        title: 'Телефон',
        value: '+7 (918) 455-02-16'
      },
      {
        title: 'E-mail',
        value: 'antonglukhanko@gmail.com'
      },
      {
        title: 'Сайт',
        value: 'https://www.glukhanko.ru'
      },
      {
        title: 'WhatsApp',
        value: '—'
      },
      {
        title: 'Telegram',
        value: '—'
      },
      {
        title: 'Instagram',
        value: '@glukhanko'
      },
      {
        title: 'Описание',
        value: 'Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Вам понравится! Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Вам понравится! Добрый день! Приглашаю вас в '
      },      
    ])
    const isActive = ref({
      details: false,
      designer: false,
      documents: false,
    })  
    
    return {
      images,
      details,
      isActive
    }
  },
}
</script>