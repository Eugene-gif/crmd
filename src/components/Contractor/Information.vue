<template>
  <q-expansion-item
    expand-separator
    default-opened
    class="visual q-expansion-my"
  >
    <template v-slot:header>
      <div class="title">
        Филиалы и менеджеры
      </div>
    </template>

    <div class="desc-sec bg-grey-9">
      <div class="title">
        г. Краснодар, ул. Красных Партизан, д. 232, офис 307
      </div>
      <div class="text">
        ПН — ПТ: с 9:00 до 20:00, <br>
        СБ: с 10:00 до 17:00, ВС: Выходной
      </div>
    </div>

    <div class="desc-sec bg-grey-9">
      <div class="title">
        г. Краснодар, ул. Красных Партизан, д. 232, офис 307
      </div>
      <div class="text">
        ПН — ПТ: с 9:00 до 20:00, <br>
        СБ: с 10:00 до 17:00, ВС: Выходной
      </div>
    </div>

    <div class="desc-sec">
      <div class="title">
        Акеева Полина Андреевна
      </div>
      <div class="text">
        Должность: Операционный директор<br>
        Email: krasotka92@mail.ru<br>
        Тел.: +7 (918) 455-55-55
      </div>
    </div>

    <div class="desc-sec">
      <div class="title">
        Акеева Полина Андреевна
      </div>
      <div class="text">
        Должность: Операционный директор<br>
        Email: krasotka92@mail.ru<br>
        Тел.: +7 (918) 455-55-55
      </div>
    </div>
  </q-expansion-item>
  
  <q-expansion-item
    expand-separator
    default-opened
    class="visual q-expansion-my"
  >
    <template v-slot:header>
      <div class="title">
        Категории деятельности
      </div>
    </template>

    <q-expansion-item
      expand-separator
      default-opened
      class="visual q-expansion-my-2"
      style="margin-top: 0;"
    >
      <template v-slot:header>
        <div class="title">
          Работы и услуги
        </div>
      </template>
      <div class="sections-btns">
        <q-btn 
          outline
          unelevated
          no-caps
          class="q-mr-xs my-btn my-effect h-opacity"
          color="positive"
        >
          <span class="text-black block">Проектирование и строительство домов</span>
        </q-btn>
        <q-btn 
          outline
          unelevated
          no-caps
          class="q-mr-xs my-btn my-effect h-opacity"
          color="positive"
        >
          <span class="text-black block">Юридическая поддержка</span>
        </q-btn>
      </div>
    </q-expansion-item>

    <q-expansion-item
      expand-separator
      default-opened
      class="visual q-expansion-my-2"
    >
      <template v-slot:header>
        <div class="title">
          Напольные покрытия
        </div>
      </template>
      <div class="sections-btns">
        <q-btn 
          outline
          unelevated
          no-caps
          class="q-mr-xs my-btn my-effect h-opacity"
          color="positive"
        >
          <span class="text-black block">Паркет</span>
        </q-btn>
        <q-btn 
          outline
          unelevated
          no-caps
          class="q-mr-xs my-btn my-effect h-opacity"
          color="positive"
        >
          <span class="text-black block">Паркетная доска</span>
        </q-btn>
        <q-btn 
          outline
          unelevated
          no-caps
          class="q-mr-xs my-btn my-effect h-opacity"
          color="positive"
        >
          <span class="text-black block">Инженерная доска</span>
        </q-btn>
        <q-btn 
          outline
          unelevated
          no-caps
          class="q-mr-xs my-btn my-effect h-opacity"
          color="positive"
        >
          <span class="text-black block">Массивная доска</span>
        </q-btn>
        <q-btn 
          outline
          unelevated
          no-caps
          class="q-mr-xs my-btn my-effect h-opacity"
          color="positive"
        >
          <span class="text-black block">Ламинат</span>
        </q-btn>
        <q-btn 
          outline
          unelevated
          no-caps
          class="q-mr-xs my-btn my-effect h-opacity"
          color="positive"
        >
          <span class="text-black block">Керамическая плитка</span>
        </q-btn>
        <q-btn 
          outline
          unelevated
          no-caps
          class="q-mr-xs my-btn my-effect h-opacity"
          color="positive"
        >
          <span class="text-black block">Керамогранит</span>
        </q-btn>
      </div>
    </q-expansion-item>    

    <q-expansion-item
      expand-separator
      default-opened
      class="visual q-expansion-my-2"
    >
      <template v-slot:header>
        <div class="title">
          Бренды
        </div>
      </template>
      <div class="sections-btns">
        <q-btn 
          outline
          unelevated
          no-caps
          class="q-mr-xs my-btn my-effect h-opacity"
          color="positive"
        >
          <span class="text-black block">Porcelanosa</span>
        </q-btn>
        <q-btn 
          outline
          unelevated
          no-caps
          class="q-mr-xs my-btn my-effect h-opacity"
          color="positive"
        >
          <span class="text-black block">Grohe</span>
        </q-btn>
        <q-btn 
          outline
          unelevated
          no-caps
          class="q-mr-xs my-btn my-effect h-opacity"
          color="positive"
        >
          <span class="text-black block">Kerama Marazzi</span>
        </q-btn>
        <q-btn 
          outline
          unelevated
          no-caps
          class="q-mr-xs my-btn my-effect h-opacity"
          color="positive"
        >
          <span class="text-black block">Fendi Casa</span>
        </q-btn>
        <q-btn 
          outline
          unelevated
          no-caps
          class="q-mr-xs my-btn my-effect h-opacity"
          color="positive"
        >
          <span class="text-black block">Apavisa</span>
        </q-btn>
        <q-btn 
          outline
          unelevated
          no-caps
          class="q-mr-xs my-btn my-effect h-opacity"
          color="positive"
        >
          <span class="text-black block">Kerama Marazzi</span>
        </q-btn>
        <q-btn 
          outline
          unelevated
          no-caps
          class="q-mr-xs my-btn my-effect h-opacity"
          color="positive"
        >
          <span class="text-black block">Porcelanosa</span>
        </q-btn>
        <q-btn 
          outline
          unelevated
          no-caps
          class="q-mr-xs my-btn my-effect h-opacity"
          color="positive"
        >
          <span class="text-black block">Apavisa</span>
        </q-btn>
      </div>
    </q-expansion-item>    
  </q-expansion-item>

  <q-expansion-item
    expand-separator
    default-opened
    class="visual q-expansion-my"
  >
    <template v-slot:header>
      <div class="title">
        Работает с дизайнерами
      </div>
    </template>

    <q-list class="contractor-list">
      <q-item>
        <q-item-section>
          <div class="avatar">
            <img src="~assets/anton.jpg" alt="">
          </div>
          <div class="subtitle">
            Антон Глуханько
          </div>
          <ActionBtn
            :propsEl="1"
            :offsetYX="[55, -258]"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <div class="avatar">
            <img src="~assets/stroipro.jpg" alt="">
          </div>
          <div class="subtitle">
            СтройПро
          </div>
          <ActionBtn
            :propsEl="1"
            :offsetYX="[55, -258]"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <div class="avatar">
            <img src="~assets/anton.jpg" alt="">
          </div>
          <div class="subtitle">
            Антон Глуханько
          </div>
          <ActionBtn
            :propsEl="1"
            :offsetYX="[55, -258]"
          />
        </q-item-section>
      </q-item>
    </q-list>

  </q-expansion-item>

  <q-expansion-item
    expand-separator
    default-opened
    class="visual q-expansion-my"
  >
    <template v-slot:header>
      <div class="title">
        Условия работы с дизайнерами
      </div>
    </template>

    <div class="desc-sec desc-sec-design bg-grey-9">
      <div class="information">
        <div class="number">
          10%
        </div>
        <div class="subtext">
          Вознаграждение<br>
          дизайнера
        </div>
      </div>
      <div class="text">
        Условия выплаты: Сразу после поступления оплаты от заказчика. Предлагаю не усложнять это поле вариантами, между которыми нужно выбирать, а оставить просто как поле для ввода. Сразу после поступления оплаты от заказчика. Предлагаю не усложнять это поле вариантами, между которыми нужно выбирать, а 
      </div>
    </div>
  </q-expansion-item>

  <q-expansion-item
    expand-separator
    default-opened
    class="visual q-expansion-my q-expansion-design"
  >
    <template v-slot:header>
      <div class="title">
        2D/3D файлы
      </div>
    </template>

    <q-list class="contractor-list">
      <q-item>
        <q-item-section>
          <div class="subtitle">
            Архив с 3д-моделями столов
          </div>
          <div class="size">ZIP, 1 мб</div>
          <q-icon name="svguse:icons/allIcons.svg#download" size="17px" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <div class="subtitle">
            СтройПро
          </div>
          <div class="size">Ссылка</div>
          <q-icon name="svguse:icons/allIcons.svg#download" size="17px" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-expansion-item>

  <q-expansion-item
    expand-separator
    default-opened
    class="visual q-expansion-my"
  >
    <template v-slot:header>
      <div class="title">
        Реквизиты для документов
      </div>
    </template>
    <div class="requisites">
      <div class="item">
        <div class="subtitle">
          Данные об организации
        </div>
        <div class="cell">
          <div class="title">
            Общество с ограниченной ответственностью
          </div>
          <div class="text">
            Тип
          </div>
        </div>

        <div class="cell">
          <div class="title">
            Название компании
          </div>
          <div class="text">
            Название
          </div>
        </div>
        <div class="cell">
          <div class="title">
            350000 г. Краснодар, ул. Красная 17, кв. 9
          </div>
          <div class="text">
            Юридический адрес
          </div>
        </div>
        <div class="cell">
          <div class="title">
            350000 г. Краснодар, ул. Красная 17, кв. 9
          </div>
          <div class="text">
            Фактический адрес
          </div>
        </div>
        <div class="cell">
          <div class="title">
            245754645733
          </div>
          <div class="text">
            ИНН
          </div>
        </div>
        <div class="cell">
          <div class="title">
            318237500481684
          </div>
          <div class="text">
            ОГРН
          </div>
        </div>
        <div class="cell">
          <div class="title">
            245754645733
          </div>
          <div class="text">
            КПП (для ООО)
          </div>
        </div>
      </div>
      
      <div class="item">
        <div class="subtitle">
          Подписант
        </div>
        <div class="cell">
          <div class="title">
            Глуханько Антон Александрович
          </div>
          <div class="text">
            ФИО подписанта документов
          </div>
        </div>
        <div class="cell">
          <div class="title">
            Директор
          </div>
          <div class="text">
            Должность
          </div>
        </div>
        <div class="cell">
          <div class="title">
            Устав
          </div>
          <div class="text">
            Основание
          </div>
        </div>
      </div>

      <div class="item">
        <div class="subtitle">
          Банковские реквизиты
        </div>
        <div class="cell">
          <div class="title">
            40802810630000052573
          </div>
          <div class="text">
            Расчетный счет
          </div>
        </div>
        <div class="cell">
          <div class="title">
            40802810630000052573
          </div>
          <div class="text">
            Корреспондентский счет
          </div>
        </div>
        <div class="cell">
          <div class="title">
            КРАСНОДАРСКОЕ ОТДЕЛЕНИЕ №8619 ПАО СБЕРБАНК
          </div>
          <div class="text">
            Отделение банка
          </div>
        </div>
        <div class="cell">
          <div class="title">
            318237500481684
          </div>
          <div class="text">
            БИК банка
          </div>
        </div>
      </div>

      <div class="item">
        <div class="subtitle">
          Контактные данные
        </div>
        <div class="cell">
          <div class="title">
            +7 (918) 455-02-16
          </div>
          <div class="text">
            Телефон
          </div>
        </div>
        <div class="cell">
          <div class="title">
            antonglukhanko@gmail.com
          </div>
          <div class="text">
            E-mail
          </div>
        </div>
      </div>

    </div>
  </q-expansion-item>

</template>

<script>
import ActionBtn from 'components/Table/ActionBtn.vue'

export default {
  components: {
    ActionBtn
  },
  setup() {
    
  },
}
</script>