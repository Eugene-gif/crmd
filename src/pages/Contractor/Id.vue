<template>
  <q-page class="page-contractor-single">
    <div class="row justify-between items-center">
      <div class="text-h2">СтройПро</div>
      <q-icon
        size="18px"
        class="mb-visible"
        name="svguse:icons/allIcons.svg#back"
        style="margin-left: auto;"
      />
      <div class="sectiobn-btns">
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-grey-3 text-grey-5 my-btn my-effect h-dark-lite q-mr-xs lg-visible"
          label="Назад"
          to="/contractor"
        />
      </div>
    </div>
    <div class="row items-center section-btns">
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white q-mr-xs my-btn my-effect h-dark q-ml-xs"
        label="Изменить статус"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white q-mr-xs my-btn my-effect h-dark q-ml-xs"
        label="Написать сообщение"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white q-mr-xs my-btn my-effect h-dark q-ml-xs"
        label="Поделиться сметой"
      />
      <q-btn
        rounded
        unelevated
        no-caps
        class="bg-positive text-white q-mr-xs my-btn my-effect h-dark q-ml-xs"
        label="Отправить шаблон документа"
      />
    </div>
    <div class="row section">
      <div class="sidebar lg-visible">
        <div
          class="avatar"
          :style="`height: ${contentHeadHeight}px;`"
        >
          <img
            src="~assets/stroipro.jpg"
            alt=""
            @mouseover="hideSlider(true)"
            @mouseleave="hideSlider(false)"
          >
        </div>
        <div class="info">
          <q-list class="q-list-user-info">
            <q-item
              link
              href="`mailto:${scope.opt.email}`"
            >
              <q-icon color="black" size="20px" name="svguse:icons/allIcons.svg#mail" />
            </q-item>
            <q-item
              class="link-whatsap"
              link
              href="`${scope.opt.whatsapp}`"
            >
              <img src="~assets/whatsapp.svg" alt="">
            </q-item>
            <q-item
              class="link-telegram"
              link
              href="`${scope.opt.telegram}`"
            >
              <img src="~assets/telegram.svg" alt="">
            </q-item>
            <q-item
              class="link-insta"
              link
              href="`${scope.opt.instagram}`"
            >
              <img src="~assets/instagram.svg" alt="">
            </q-item>
          </q-list>
          <q-item-section class="reviews">
            <q-tabs
              v-model="tab"
              class="q-tabs-reviews"
            >
              <q-tab name="1" icon="svguse:icons/allIcons.svg#like" label="25" />
              <q-tab name="2" icon="svguse:icons/allIcons.svg#dislike" label="2" />
            </q-tabs>
            <q-item-label>12 отзывов</q-item-label>
          </q-item-section>
        </div>
        <div class="city">
          г. Краснодар
        </div>

        <div class="relative-content" ref="stiky">
          <div class="company">
            <img src="~assets/stroipro.jpg" alt="">
            <div class="name">СтройПро</div>
          </div>
          <div class="info">
            <q-list class="q-list-user-info">
              <q-item
                link
                href="`mailto:${scope.opt.email}`"
              >
                <q-icon color="black" size="20px" name="svguse:icons/allIcons.svg#mail" />
              </q-item>
              <q-item
                class="link-whatsap"
                link
                href="`${scope.opt.whatsapp}`"
              >
                <img src="~assets/whatsapp.svg" alt="">
              </q-item>
              <q-item
                class="link-telegram"
                link
                href="`${scope.opt.telegram}`"
              >
                <img src="~assets/telegram.svg" alt="">
              </q-item>
              <q-item
                class="link-insta"
                link
                href="`${scope.opt.instagram}`"
              >
                <img src="~assets/instagram.svg" alt="">
              </q-item>
            </q-list>
            <q-item-section class="reviews">
              <q-tabs
                v-model="tab"
                class="q-tabs-reviews"
              >
                <q-tab name="1" icon="svguse:icons/allIcons.svg#like" label="25" />
                <q-tab name="2" icon="svguse:icons/allIcons.svg#dislike" label="2" />
              </q-tabs>
              <q-item-label>12 отзывов</q-item-label>
            </q-item-section>
          </div>
          <div class="title info-status">
            Работаем <span class="status bg-positive"></span>
          </div>
          <div class="text info-status-text">Изменить статус</div>

          <div class="title info-mail">
            info@stroypro.com
          </div>
          <div class="text">Общий e-mail</div>

          <div class="title info-phone">
            +7 (918) 455-02-16
          </div>
          <div class="text">Общий телефон</div>

          <div class="text info-adres">
            г. Краснодар, ул. Красных Партизан, д. 232, офис 307
          </div>

          <div class="text info-sait">
            www.stroypro.com
          </div>
        </div>
      </div>
      
      
      <div class="content">
        <div
          class="foto-collage mb-visible"
          :style="`height: ${contentHeadHeight}px;`"
          ref="SecHoverSlider"
        >
          <div class="scroll-sec" ref="HoverSlider">
            <img src="~assets/stroipro.jpg" alt="">
            <img src="~assets/anton.jpg" alt="">
            <img src="~assets/stroipro.jpg" alt="">
            <img src="~assets/anton.jpg" alt="">
            <img src="~assets/anton.jpg" alt="">
            <img src="~assets/stroipro.jpg" alt="">
            <img src="~assets/anton.jpg" alt="">
          </div>
        </div>
        <div class="content-head" ref="contentHead">
          <div class="sections-btns">
            <q-btn 
              outline
              unelevated
              no-caps
              class="q-mr-xs my-btn my-effect h-dark"
              color="grey-3"
              style="background: #F7F7F7 !important;"
            >
              <span class="text-black block">Ставка: 15%</span>
            </q-btn>
            <q-btn 
              outline
              unelevated
              no-caps
              class="q-mr-xs my-btn my-effect h-opacity"
              color="positive"
            >
              <span class="text-black block">Работы и услуги</span>
            </q-btn>
            <q-btn 
              outline
              unelevated
              no-caps
              class="q-mr-xs my-btn my-effect h-opacity"
              color="positive"
            >
              <span class="text-black block">Мебель для общественных помещений</span>
            </q-btn>
          </div>
          <div class="description">
            Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Вам понравится! Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят друг друга и продуктивно работают. Вам понравится! Добрый день! Приглашаю вас в 
          </div>
        </div>
        <div class="region region-mobile">
          <div class="city" style="margin-right: 4px;">
            г. Краснодар 
          </div>
          <div class="text">
            Область работы: Краснодарский край, ЮФО, Республики Северного Кавказа
          </div>
        </div>
        <div class="info-1 mb-visible">
          <q-list class="q-list-user-info">
            <q-item
              link
              href="`mailto:${scope.opt.email}`"
            >
              <q-icon color="black" size="20px" name="svguse:icons/allIcons.svg#mail" />
            </q-item>
            <q-item
              class="link-whatsap"
              link
              href="`${scope.opt.whatsapp}`"
            >
              <img src="~assets/whatsapp.svg" alt="">
            </q-item>
            <q-item
              class="link-telegram"
              link
              href="`${scope.opt.telegram}`"
            >
              <img src="~assets/telegram.svg" alt="">
            </q-item>
            <q-item
              class="link-insta"
              link
              href="`${scope.opt.instagram}`"
            >
              <img src="~assets/instagram.svg" alt="">
            </q-item>
          </q-list>
          <q-item-section class="reviews">
            <q-tabs
              v-model="tab"
              class="q-tabs-reviews"
            >
              <q-tab name="1" icon="svguse:icons/allIcons.svg#like" label="25" />
              <q-tab name="2" icon="svguse:icons/allIcons.svg#dislike" label="2" />
            </q-tabs>
            <q-item-label>12 отзывов</q-item-label>
          </q-item-section>
        </div>
        <div class="info row">
          <div class="item agency">
            <div class="text">
              Получено агентских 
              <div class="circle bg-positive">
                <q-icon size="12px" name="svguse:icons/allIcons.svg#plus" color="white" />
              </div>
            </div>
            <div class="sum">
              500 000 руб.
            </div>
          </div>
          <div class="item dolg">
            <div class="text">
              Долг 
              <div class="circle bg-grey-3">
                <q-icon size="12px" name="svguse:icons/allIcons.svg#tooltip" color="grey-4" />
              </div>
            </div>
            <div class="sum">
              250 000 руб.
            </div>
          </div>
          <q-btn
            unelevated
            no-caps
            class="share my-effect h-opacity"
          >
            <span class="block">Поделиться</span>
            <q-icon size="17px" name="svguse:icons/btnIcons.svg#copy" />
          </q-btn>

          <div class="desc mb-visible">
            <div class="title info-status">
              Работаем <span class="status bg-positive"></span>
            </div>
            <div class="text">Изменить статус</div>

            <div class="title info-mail">
              info@stroypro.com
            </div>
            <div class="text">Общий e-mail</div>

            <div class="title info-phone">
              +7 (918) 455-02-16
            </div>
            <div class="text">Общий телефон</div>

            <div class="text info-adres">
              г. Краснодар, ул. Красных Партизан, д. 232, офис 307
            </div>

            <div class="text info-sait">
              www.stroypro.com
            </div>
          </div>
          
        </div>
        <div class="region region-nomobile">
          Область работы: Краснодарский край, ЮФО, Республики Северного Кавказа
        </div>

        <div class="row tab-section">
          <q-tabs
            v-model="tab2"
            class="q-tabs-null q-tabs-contractor"
          >
            <q-tab name="information" label="Информация" />
            <q-tab name="projects" label="Проекты" />
            <!-- <q-tab name="projects2" label="Проекты2" /> -->
            <q-tab name="finance" label="Финансы" />
            <q-tab name="document" label="Документы" />
            <q-tab name="reviews" label="Отзывы" />
            <q-tab name="photo" label="Фото" />
            <!-- <q-tab name="photo2" label="Фото2" /> -->
          </q-tabs>
          <div class="circle bg-grey-3">
            <q-icon size="12px" name="svguse:icons/allIcons.svg#tooltip" color="grey-4" />
          </div>
        </div>
        <q-tab-panels
          v-model="tab2"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="information">
            <div class="section">
              <Information />
            </div>
          </q-tab-panel>

          <q-tab-panel name="projects">
            <div class="section">
              <Projects />
            </div>
          </q-tab-panel>

          <q-tab-panel name="projects2">
            <div class="section">
              <ProjectInfo />
            </div>
          </q-tab-panel>
          
          <q-tab-panel name="finance">
            <div class="section">
              <Finance />
            </div>
          </q-tab-panel>

          <q-tab-panel name="document">
            <div class="section">
              <Documents />
            </div>
          </q-tab-panel>

          <q-tab-panel name="reviews">
            <div class="section">
              <Reviews />
            </div>
          </q-tab-panel>

          <q-tab-panel name="photo">
            <div class="section">
              <Photos />
            </div>
          </q-tab-panel>
          
          <q-tab-panel name="photo2">
            <div class="section">
              <PhotosInfo />
            </div>
          </q-tab-panel>

        </q-tab-panels>
        <q-btn
          unelevated
          no-caps
          outline
          class="bg-white text-grey-3 my-btn my-effect mb-visible btn-back"
          style="border-radius: 10px;width: 100%;"
          padding="12px 17px 12px 20px"
        >
          <div class="block text-grey-5">Назад к списку подрядчиков</div>
          <q-icon size="18px" name="svguse:icons/allIcons.svg#back" style="margin-left: auto;" />
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import Information from 'components/Contractor/Information.vue'
import Projects from 'components/Contractor/Projects.vue'
import ProjectInfo from 'components/Contractor/ProjectInfo.vue'
import Finance from 'components/Contractor/Finance.vue'
import Documents from 'components/Contractor/Documents.vue'
import Reviews from 'components/Contractor/Reviews.vue'
import Photos from 'components/Contractor/Photos.vue'
import PhotosInfo from 'components/Contractor/PhotosInfo.vue'

export default {
  name: 'PageСontractorSingle',
  components: {
    Information,
    Projects,
    ProjectInfo,
    Finance,
    Documents,
    Reviews,
    Photos,
    PhotosInfo
  },
  
  setup () {
    const tab = ref()
    const contentHead = ref()
    const stiky = ref()

    const contentHeadHeight = ref()
    const HoverSlider = ref()
    const SecHoverSlider = ref()
    const hoverVal = false
    const tab2 = ref('information')

    function stickySidebar() {
      if (window.pageYOffset > stiky.value.offsetTop) {
        stiky.value.classList.add('stiky')
      } 
      if (window.pageYOffset < stiky.value.offsetTop) {
        stiky.value.classList.remove('stiky')
      } 
    }

    function hoverSlider(val) {
      let i = 0
      let iArr = 0
      let ArrElements = HoverSlider.value.querySelectorAll('img')

      const inetval1 = setInterval(() => {
        HoverSlider.value.scrollTo({
          top: 0,
          left: i,
          behavior: 'smooth'
        })
        i += 3
      }, 70)
      
      const inetval2 = setInterval(() => {
        if (iArr > ArrElements.length) {
          iArr = 0
        } else {
          iArr += 1
        }

        if (val) {
          let newEl = document.createElement("img")
          let imgSrc = ArrElements[iArr].getAttribute('src')
          newEl.setAttribute('src', imgSrc)
          HoverSlider.value.appendChild(newEl)
        }

        // let firstEl = HoverSlider.value.querySelector('img')
        // HoverSlider.value.removeChild(firstEl)
      }, 1700)
        // if (val === false) {
        //   clearInterval(inetval1)
        //   clearInterval(inetval2)
        // }
    }
    function hideSlider(val) {
      if (val === true) {
        SecHoverSlider.value.style.opacity = '1';
      } 
      if (val === false) {
        SecHoverSlider.value.style.opacity = '0';
      }
    }
    onMounted(() => {
      contentHeadHeight.value = contentHead.value.clientHeight
      stickySidebar()
      if (window.innerWidth > 772) {
        hoverSlider(true)
      }
      window.addEventListener('scroll', stickySidebar)
    })
    return {
      tab,
      tab2,
      stiky,
      contentHead,
      contentHeadHeight,
      HoverSlider,
      SecHoverSlider,
      hoverVal,
      stickySidebar,
      hoverSlider,
      hideSlider,
      
    }
  }
}
</script>
