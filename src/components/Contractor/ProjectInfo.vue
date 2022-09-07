 <template>
  <div class="contractor-project-info">
    <div class="head">
      <div class="top-info row">
        <div class="title">
          г. Краснодар, ул. Ленина, д. 15 тест длинного адреса
        </div>
        <q-btn
          rounded
          unelevated
          no-caps
          class="
            bg-grey-3
            text-grey-5
            my-btn my-effect
            h-dark-lite
            q-mr-xs
            lg-visible
          "
          label="Назад"
        />
      </div>
      <div class="desc-sec bg-grey-9">
        <div class="text">
          Внимание, здесь отображаются все данные проекта (такие как параметры,
          сметы, альбомы, файлы и т.д.), к которым вы дали доступ данному
          подрядчику, а не просто поделились ссылкой.
        </div>
        <q-btn
          rounded
          unelevated
          no-caps
          class="bg-positive text-white q-mr-xs my-btn my-effect h-dark q-ml-xs"
          label="Настройки доступа"
        />
      </div>
      <div class="data">
        <div class="params">
          <div class="cell">
            <strong>Адрес:</strong> г. Краснодар, ул. Ленина, д. 15 тест
            длинного адреса
          </div>
          <div class="cell"><strong>Тип:</strong> Квартира</div>
          <div class="cell">
            <strong>Заказчик:</strong> Иванов Петр Александрович
          </div>
        </div>
        <div class="square">
          <div class="cell">Общая площадь</div>
          <div class="number">115 м2</div>
        </div>
      </div>
    </div>
    <q-expansion-item
      expand-separator
      default-opened
      class="visual q-expansion-my title-custom"
    >
      <template v-slot:header>
        <div class="title">Экспликация помещений</div>
        <div class="custom" @click.stop="true">Изменить</div>
      </template>

      <q-list class="contractor-list-project">
        <q-item>
          <q-item-section>
            <div class="subtitle">Кухня</div>
            <div class="metrs">25 м2</div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="subtitle">Прихожая</div>
            <div class="metrs">5 м2</div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="subtitle">Спальня</div>
            <div class="metrs">15 м2</div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>

    <q-expansion-item
      expand-separator
      default-opened
      class="visual q-expansion-my title-custom q-expansion-my-contactor-smeta"
    >
      <template v-slot:header>
        <div class="title">Общие сметы</div>
        <div class="custom" @click.stop="true">Изменить</div>
      </template>

      <q-table
        flat
        :rows="rows2"
        :columns="columns"
        row-key="id"
        hide-pagination
        class="
          my-table
          projects-table projects-table-cubes projects-table-cubes-contractor
        "
        v-model:pagination="pagination"
        v-show="rows2 != ''"
      >
        <template v-slot:header-cell-action="props">
          <q-th :props="props" class="q-th__action"> </q-th>
        </template>
        <template v-slot:header-cell-share="props">
          <q-th :props="props" class="q-th__share"> </q-th>
        </template>

        <template v-slot:header-cell="props">
          <q-th :props="props">
            <span class="q-th__title">
              {{ props.col.label }}
            </span>
            <i
              class="
                notranslate
                material-icons
                q-icon
                q-table__sort-icon q-table__sort-icon--left
              "
              aria-hidden="true"
              role="presentation"
            >
              <q-icon
                size="7px"
                color="grey-5"
                name="svguse:icons/financeTable.svg#tableArrrow"
              />
            </i>
          </q-th>
        </template>
        <template #body="props">
          <q-tr :props="props" class="q-tr-tiles">
            <q-item to="id" class="q-tr-tiles__link" />
            <q-td key="image" :props="props" class="q-td-image">
              <q-item to="/id">
                <img v-show="props.row.image" :src="props.row.image" alt="" />
              </q-item>
            </q-td>
            <q-td key="name" :props="props" class="q-td-name">
              <div class="text-h3">
                <span class="name-ico">{{ props.row.iconName }}</span
                >{{ props.row.name }}
              </div>
            </q-td>
            <q-td key="action" :props="props" class="q-td-action">
              <ActionBtn
                :propsEl="props.row.id"
                :offsetYX="[55, -258]"
                :actionfunc="actionfunc"
                @actionUpdate="onActionUpdate"
                @actionCopy="onActionCopy"
                @actionDel="onActionDel"
              />
            </q-td>

            <q-td key="changed" :props="props" class="q-td-changed">
              <div class="text">Изменен: {{ props.row.changed }}</div>
            </q-td>

            <q-td key="created" :props="props" class="q-td-created">
              <div class="text">Создан: {{ props.row.created }}</div>
            </q-td>

            <q-td key="access" :props="props" class="q-td-created q-td-access">
              <div class="text">{{ props.row.access }}</div>
            </q-td>

            <q-td
              style="flex: 0 0 100%; order: 7"
              v-if="tab === 'stripes'"
            ></q-td>

            <q-td key="share" :props="props" class="q-td-share">
              <q-list>
                <q-item>
                  <q-btn :to="props.row.share.link">
                    <img :src="props.row.share.image" alt="" />
                  </q-btn>
                </q-item>
              </q-list>
            </q-td>
          </q-tr>
          <!-- q-th__share -->
        </template>
      </q-table>
    </q-expansion-item>

    <q-expansion-item
      expand-separator
      default-opened
      class="
        visual
        q-expansion-my
        title-custom
        q-expansion-my-contractor-attached-files
      "
    >
      <template v-slot:header>
        <div class="title">Приложенные файлы</div>
        <div class="custom" @click.stop="true">Изменить</div>
      </template>

      <q-list class="contractor-list contractor-list-project">
        <q-item>
          <q-item-section>
            <div class="subtitle">Архив с 3д-моделями столов</div>
            <div class="size"><span class="lg-visible">ZIP,</span> 1 мб</div>
            <span class="mb-visible format">ZIP</span>
            <q-icon name="svguse:icons/allIcons.svg#download" size="17px" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="subtitle">Архив с 3д-моделями столов</div>
            <div class="size"><span class="lg-visible">Ссылка</span></div>
            <span class="mb-visible format">Ссылка</span>
            <q-icon name="svguse:icons/allIcons.svg#download" size="17px" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>

    <q-expansion-item
      expand-separator
      default-opened
      class="visual q-expansion-my title-custom"
    >
      <template v-slot:header>
        <div class="title">Прочие данные</div>
        <div class="custom" @click.stop="true">Изменить</div>
      </template>
      <div class="requisites">
        <div class="item">
          <div class="cell">
            <div class="title">Общество с ограниченной ответственностью</div>
            <div class="text">Тип</div>
          </div>

          <div class="cell">
            <div class="title">Название компании</div>
            <div class="text">Название</div>
          </div>

          <div class="cell">
            <div class="title">350000 г. Краснодар, ул. Красная 17, кв. 9</div>
            <div class="text">Юридический адрес</div>
          </div>
          <div class="cell">
            <div class="title">350000 г. Краснодар, ул. Красная 17, кв. 9</div>
            <div class="text">Фактический адрес</div>
          </div>

          <div class="cell cell-text-hidden">
            <div class="text" :class="{activated: activatedText}">
              Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры
              находят друг друга и продуктивно работают. Вам понравится! Добрый
              день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят
              друг друга и продуктивно работают. Добрый день! Приглашаю вас в
              CRMD — здесь подрядчичи и дизайнеры находят друг друга и
              продуктивно работают. Вам понравится! Добрый день! Приглашаю вас в
              CRMD — здесь подрядчичи и дизайнеры находят друг друга и
              продуктивно работают. Вам понравится!
              Добрый день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры
              находят друг друга и продуктивно работают. Вам понравится! Добрый
              день! Приглашаю вас в CRMD — здесь подрядчичи и дизайнеры находят
            </div>
            <q-btn
              flat
              style="color: #000"
              padding="0"
              class="q-btn-activated"
              :class="{activated: activatedText}"
              @click="activatedText = !activatedText"
            >
              <span class="block" v-if="!activatedText">Показать полностью</span>
              <span class="block" v-if="activatedText">Скрыть</span>
              <q-icon name="svguse:icons/allIcons.svg#select-arrow" size="11px" />
            </q-btn>
          </div>
        </div>
      </div>
    </q-expansion-item>

    <!--     
    <q-btn
      unelevated
      no-caps
      outline
      class="bg-white text-grey-3 my-btn my-effect"
      style="border-radius: 6px; width: 100%; margin-bottom: 20px"
      padding="7px 16px 7px 20px"
    >
      <div class="block text-grey-5" style="line-height: 29px">
        Назад к списку подрядчиков
      </div>
      <q-icon
        size="18px"
        name="svguse:icons/allIcons.svg#back"
        style="margin-left: auto"
      />
    </q-btn> -->
  </div>
</template>

<script>
import { ref } from "vue";
import ActionBtn from "components/Table/ActionBtn.vue";

export default {
  components: {
    ActionBtn,
  },
  setup() {
    const rows2 = [
      {
        id: 1,
        name: "Отделочные работы (квартира на Патриарших)",
        changed: "2022 12 6",
        created: "2022 12 6",
        access: "Может редактировать все ячейки сметы",
        share: {
          link: "/",
          image: "/icons/anton.jpg",
        },
      },
      {
        id: 2,
        name: "Мебель (здесь очень длинное название объекта, например)",
        changed: "2022 12 6",
        created: "2022 12 6",
        access: "Может указывать свою цену",
        share: {
          link: "/",
          image: "/icons/anton.jpg",
        },
      },
      {
        id: 3,
        name: "Мебель (здесь очень длинное название объекта, например)",
        changed: "2022 12 6",
        created: "2022 12 6",
        access: "Может указывать свою цену",
        share: {
          link: "/",
          image: "/icons/anton.jpg",
        },
      },
      {
        id: 4,
        name: "Мебель (здесь очень длинное название объекта, например)",
        changed: "2022 12 6",
        created: "2022 12 6",
        access: "Может указывать свою цену",
        share: {
          link: "/",
          image: "/icons/anton.jpg",
        },
      },
    ]
    const columns = [
      {
        name: "name",
        label: "Название",
        field: "name",
        align: "left",
        sortable: true,
      },
      {
        name: "created",
        label: "Создана",
        field: "created",
        align: "left",
        sortable: true,
      },
      {
        name: "changed",
        label: "Изменена",
        field: "changed",
        align: "left",
        sortable: true,
      },
      {
        name: "access",
        label: "Доступ",
        field: "access",
        align: "left",
        sortable: true,
      },
      { name: "action", label: "", field: "action", align: "left" },
      { name: "share", label: "", field: "share", align: "left" },
    ]
    const pagination = ref({
      sortBy: "id",
      rowsPerPage: 0,
      descending: false,
    })
    const activatedText = ref(false)
    return {
      rows2,
      columns,
      pagination,
      activatedText
    };
  },
};
</script>