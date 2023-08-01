<template>

  <q-table
    flat
    :columns="columns"
    :rows="rows"
    row-key="id"
    hide-pagination
    class="estimates-table"
    :pagination="pagination"
    binary-state-sort
    :class="{'estimates-table-version-contractor': userRole === 'contractor'}"
  >
    <template v-slot:header-cell="props">
      <q-th :props="props">
        <span class="q-th__title">
          {{ props.col.label }}
        </span>
        <i
          class="notranslate material-icons q-icon q-table__sort-icon q-table__sort-icon--left"
          aria-hidden="true"
          role="presentation"
        >
          <q-icon size="7px" color="grey-5" name="svguse:icons/financeTable.svg#tableArrrow" />
        </i>
      </q-th>
    </template>
    <template v-slot:header-cell-id="props">
      <q-th :props="props" class="th-id">
        {{props.col.label}}
      </q-th>
    </template>
    <template v-slot:header-cell-name="props">
      <q-th :props="props" class="th-name">
        <div class="th-name th-content-name">
          <q-icon
            name="svguse:icons/financeTable.svg#photo"
            size="16px"
            color="grey-5"
            style="opacity: 0.3;"
            class="icon-photo"
          />
          {{props.col.label}}
          <q-icon
            name="svguse:icons/financeTable.svg#share"
            size="13px"
            color="grey-5"
            style="opacity: 0.3;"
            class="icon-share"
          />
        </div>
      </q-th>
    </template>
    <template v-slot:header-cell-procent="props">
      <q-th :props="props">
        <div class="th-name th-content-name">
          {{props.col.label}} %
        </div>
      </q-th>
    </template>

    <template #header v-if="userRole === 'contractor'">
      <!-- {{ columns.name }} -->
      <q-tr class="tr-colspan">
        <q-th colspan="5"></q-th>
        <q-th colspan="5">
          <div class="text-center">Прогноз</div>
        </q-th>
        <q-th colspan="5">
          <div class="text-center">Мое предложение</div>
        </q-th>
        <q-th colspan="5"></q-th>
      </q-tr>
      <q-tr>
        <q-th>№</q-th>
        <q-th>Название</q-th>
        <q-th>Помещение</q-th>
        <q-th>Описание</q-th>
        <q-th>м2/шт</q-th>
        <q-th>Цена, руб.</q-th>
        <q-th>Срок, дн</q-th>
        <q-th>Итого</q-th>
        <q-th>Ставка</q-th>
        <q-th>Агентские, руб.</q-th>
        <q-th>Цена, руб.</q-th>
        <q-th>Срок, дн</q-th>
        <q-th>Итого</q-th>
        <q-th>Ставка</q-th>
        <q-th>Агентские, руб</q-th>
        <q-th>Статус</q-th>
        <q-th>Производитель</q-th>
        <q-th>Артикул</q-th>
        <q-th>Цвет</q-th>
        <q-th>Файл</q-th>
      </q-tr>
    </template>


    <template #body="props">
      <q-menu
        ref="contextMenu"
        :style="menuStyle"
        class="q-menu-edit"
      >
        <q-list>
          <q-item v-close-popup>
            <q-item-section>
              <q-item-label @click="$emit('updateItem', contextMenuActiveTrId)">Изменить</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-close-popup>
            <q-item-section>
              <q-item-label @click="$emit('dubleItem', contextMenuActiveTrId)">Дублировать</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-close-popup>
            <q-item-section>
              <q-item-label @click="$emit('delItem', contextMenuActiveTrId)">Удалить</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>

      <q-tr
        :props="props"
        @contextmenu.prevent="!isMobile() && showContextMenu($event, props.row)"
        @touchstart="isMobile() && handleTouchStart($event, props.row)"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @click.stop=""
      >
        <q-td
          key="id"
          :props="props"
          @click.stop=""
          @dblclick="editModal(props.row, null)"
        >
          <div class="status-new" v-if="props.row.new"></div>
          <div class="td-content-section">
            <div class="text">
              {{props.row.iterationId}}
            </div>
          </div>
        </q-td>
        <q-td
          key="name"
          :props="props"
          @dblclick="editModal(props.row, 'name')"
          @click.stop=""
        >
          <div class="td-content-section td-content-name">
            <q-icon
              name="svguse:icons/financeTable.svg#image"
              size="20px"
              class="q-icon-tooltip"
              :class="{'hide': !props.row.image.thumbnail}"
            >
              <q-tooltip
                anchor="center left"
                self="center right"
                class="q-tooltip-estimates-img"
                v-if="props.row.image.thumbnail"
              >
                <div class="img">
                  <img :src="props.row.image.thumbnail" alt="" style="">
                </div>
              </q-tooltip>
            </q-icon>
            {{props.row.image}}
            <div class="text" :class="{'q-ml-none': !props.row.image.thumbnail}">{{props.row.name}}</div>
            <q-icon
              color="black"
              style="opacity: 0.2;"
              name="svguse:icons/financeTable.svg#copy2"
              size="17px"
              class="td-content-name__copy"
              :class="{'hide': !props.row.link}"
              @click="goToLink(props.row.link)"
            >
              <q-tooltip
                anchor="bottom middle"
                self="top middle"
                class="q-tooltip-estimates-text"
              >
                <div class="text flex items-center">
                  <q-icon size="10px" name="svguse:icons/allIcons.svg#copyico" />
                  <span class="desc">{{props.row.link}}</span>
                </div>
              </q-tooltip>
            </q-icon>
          </div>
        </q-td>
        <q-td
          key="room"
          :props="props"
          @dblclick="editModal(props.row, 'room_type')"
          @click.stop=""
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.room_type}}
            </div>
          </div>
        </q-td>
        <q-td
          key="desc"
          :props="props"
          @dblclick="editModal(props.row, 'description')"
          @click.stop=""
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.description}}
            </div>
          </div>
        </q-td>

        <q-td
          key="price"
          :props="props"
          @dblclick="editModal(props.row, 'quantity')"
          @click.stop=""
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.quantity}}
            </div>
          </div>
        </q-td>

        <q-td
          key="metrics"
          :props="props"
          @dblclick="editModal(props.row, 'forecast_price')"
          @click.stop=""
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.forecast.price}}
            </div>
          </div>
        </q-td>

        <q-td
          key="deadline"
          :props="props"
          @dblclick="editModal(props.row, 'term_forecast')"
          @click.stop=""
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.forecast.term}}
            </div>
          </div>
        </q-td>

        <q-td
          key="total"
          :props="props"
          class="td-total"
          @click.stop="openSmeta(props.row.id)"
          :class="{open: props.row.smetaVal}"
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.forecast.total_price}}
            </div>
            <div class="total-img">
              <!-- <img v-if="props.row.status.imageUrl && props.row.smeta" :src="props.row.status.imageUrl" alt=""> -->
            </div>
            <q-icon
              v-if="props.row.proposals.length && userRole === 'designer'"
              size="12px"
              name="svguse:icons/financeTable.svg#miniArrowe"
            />
          </div>
        </q-td>

        <q-td
          key="procent"
          :props="props"
          @dblclick="editModal(props.row, 'rate')"
          @click.stop=""
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.forecast.rate}}
            </div>
          </div>
        </q-td>
        <q-td
          key="agent"
          :props="props"
          @click.stop=""
          @dblclick="editModal(props.row, null)"
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.forecast.fee}}
            </div>
          </div>
        </q-td>



        <q-td
          key="price"
          :props="props"
          @dblclick="editModal(props.row, 'offerprice')"
          v-if="userRole !== 'designer'"
        >
          <div class="td-content-section">
            <div class="text">
              {{ props.row.my_proposal?.price }}
            </div>
          </div>
        </q-td>

        <q-td
          key="deadline"
          :props="props"
          @dblclick="editModal(props.row, 'offerprice')"
          v-if="userRole !== 'designer'"
        >
          <div class="td-content-section">
            <div class="text">
              {{ props.row.my_proposal?.term }}
            </div>
          </div>
        </q-td>

        <q-td
          key="total"
          :props="props"
          class="td-total"
          @dblclick="editModal(props.row, 'offerprice')"
          v-if="userRole !== 'designer'"
        >
          <div class="td-content-section">
            <div class="text">
              {{ props.row.my_proposal?.total_price }}
            </div>
          </div>
        </q-td>

        <q-td
          key="procent"
          :props="props"
          @dblclick="editModal(props.row, 'offerprice')"
          v-if="userRole !== 'designer'"
        >
          <div class="td-content-section">
            <div class="text">
              {{ props.row.my_proposal?.rate }}
            </div>
          </div>
        </q-td>
        <q-td
          key="agent"
          :props="props"
          @dblclick="editModal(props.row, 'offerprice')"
          v-if="userRole !== 'designer'"
        >
          <div class="td-content-section">
            <div class="text">
              {{ props.row.my_proposal?.fee }}
            </div>
          </div>
        </q-td>



        <q-td
          key="status"
          :props="props"
          @dblclick="editModal(props.row, 'status')"
          @click.stop=""
        >
          <div class="td-content-section td-content-status">
            <div class="status">
              <div :class="`circle bg-${colorStatus(props.row.status)}`"></div>
              <div class="desc">{{props.row.status}}</div>
            </div>
            <!-- <img v-if="props.row.status.imageUrl" :src="props.row.status.imageUrl" alt="" class="status-img"> -->
          </div>
          <q-menu
            anchor="bottom middle"
            self="top middle"
            class="menu-estimate-status"
          >
            <SelectStatus
              :estimate_item_id="props.row.id"
              :status="props.row.status"
              :options="optionstab"
              v-if="optionstab"
              @updateStatus="value => props.row.status = value"
            />
          </q-menu>
        </q-td>

        <q-td
          key="brand"
          :props="props"
          class="td-brand"
          @dblclick="editModal(props.row, 'brand')"
          @click.stop=""
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.manufacturer}}
            </div>
          </div>
        </q-td>
        <q-td
          key="code"
          :props="props"
          class="td-code"
          @dblclick="editModal(props.row, 'article')"
          @click.stop=""
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.article}}
            </div>
          </div>
        </q-td>
        <q-td
          key="color"
          :props="props"
          class="td-color"
          @dblclick="editModal(props.row, 'color')"
          @click.stop=""
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.color}}
            </div>
          </div>
        </q-td>

        <q-td
          key="file"
          :props="props"
          class="td-file"
          @click.stop=""
        >
          <div class="td-content-section">
            <a :href="props.row.file?.file" target="_blank" class="text link" v-if="props.row.file.file">
              {{props.row.file?.extension}}, {{props.row.file?.size}}
            </a>
          </div>
        </q-td>

      </q-tr>

      <q-tr
        v-for="smeta in props.row.proposals"
        :key="smeta"
        class="q-tr-smeta"
        v-show="props.row.smetaVal && userRole === 'designer'"
        @click.stop="chooseSmeta(smeta)"
        @contextmenu.prevent.stop
        @touchstart.stop
        @touchmove.stop
        @touchend.stop
      >
      <!-- v-show="props.row.proposals.length" -->
        <q-td key="id" class="td-id"/>
        <q-td
          key="name"
          :props="props"
          class="td-name"
        >
          <div class="td-content-section">
            <div class="name-img">
              <img
                v-if="smeta.contractor?.image?.placeholder"
                :src="smeta.contractor?.image?.placeholder"
                alt=""
              >
            </div>
            <div class="text">{{smeta.contractor?.name}}</div>
          </div>
        </q-td>
        <q-td key="room" class="td-room"/>
        <q-td key="desc" class="td-desc"/>
        <q-td
          key="metrics"
          :props="props"
        >
          <div class="td-content-section">
            <div class="text">
              {{smeta.price}}
            </div>
          </div>
        </q-td>
        <q-td
          key="price"
          :props="props"
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.quantity}}
              <!-- {{smeta.term}} -->
            </div>
          </div>
        </q-td>
        <q-td
          key="total"
          :props="props"
        >
          <div class="td-content-section">
            <div class="text">
              {{smeta.fee}}
            </div>
          </div>
        </q-td>
        <q-td
          key="deadline"
          :props="props"
        >
          <div class="td-content-section">
            <div class="text">
              {{smeta.term}}
            </div>
          </div>
        </q-td>
        <q-td
          key="status"
          :props="props"
        >
          <div class="td-content-section td-content-status">
            <div class="status">
              <!-- <div :class="`circle bg-${colorStatus(smeta.status.id)}`"></div>
              <div class="desc">{{smeta.status.name}}</div> -->
            </div>
          </div>
        </q-td>
        <q-td
          key="procent"
          :props="props"
        >
          <div class="td-content-section">
            <div class="text">
              {{smeta.rate}}
            </div>
          </div>
        </q-td>
        <q-td
          key="agent"
          :props="props"
          class="td-agent"
        >
          <div class="td-content-section">
            <div class="text">
              {{smeta.term}}
            </div>
          </div>
        </q-td>
        <q-td key="brand" class="td-brand"/>
        <q-td key="code" class="td-code"/>
        <q-td key="color" class="td-color"/>
        <q-td key="file" class="td-file"/>

      </q-tr>

      <q-tr
        class="q-tr-smeta q-tr-smeta-null"
        v-show="props.row.smetaVal"
        v-if="props.row.proposals && userRole === 'designer'"
        @click.stop="chooseSmeta(smeta)"
        @contextmenu.prevent.stop
        @touchstart.stop
        @touchmove.stop
        @touchend.stop
      >
        <q-td key="id" class="td-id"/>
        <q-td class="td-name">
          <div class="td-content-section">
            <div class="name-img"></div>
            <div class="text">Не выбрано</div>
          </div>
        </q-td>
        <q-td key="room" class="td-room"/>
        <q-td key="desc" class="td-desc"/>
        <q-td>
          <div class="td-content-section">
            <div class="text">
              —
            </div>
          </div>
        </q-td>
        <q-td>
          <div class="td-content-section">
            <div class="text">
              —
            </div>
          </div>
        </q-td>
        <q-td>
          <div class="td-content-section">
            <div class="text">
              —
            </div>
          </div>
        </q-td>
        <q-td>
          <div class="td-content-section">
            <div class="text">
              —
            </div>
          </div>
        </q-td>
        <q-td>
          <div class="td-content-section td-content-status">
            <div class="status">
              <div class="circle"></div>
              <div class="desc">—</div>
            </div>
          </div>
        </q-td>
        <q-td>
          <div class="td-content-section">
            <div class="text">
              —
            </div>
          </div>
        </q-td>
        <q-td class="td-agent">
          <div class="td-content-section">
            <div class="text">
              —
            </div>
          </div>
        </q-td>
        <q-td key="brand" class="td-brand"/>
        <q-td key="code" class="td-code"/>
        <q-td key="color" class="td-color"/>
        <q-td key="file" class="td-file"/>
      </q-tr>

      <div class="q-tr-separator"></div>
    </template>
  </q-table>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { estimatesApi } from 'src/api/estimates'
  import useContextMenu from 'src/composable/useContextMenu'
  import SelectStatus from 'src/components/estimate/SelectStatus'

  const props = defineProps({
    columns: Array,
    rows: Array
  })

  const emit = defineEmits([
    'openSmeta',
    'editModal',
    'chooseSmeta',
    'updateItem',
    'dubleItem',
    'delItem',
  ])

  const activeSmeta = ref()

  const pagination = ref({
    sortBy: '',
    rowsPerPage: 0,
    descending: false
  })


  const {
    contextMenu,
    contextMenuActiveTrId,
    touchStartTimestamp,
    touchMoveTimestamp,
    touchStartTimeout,
    touchMoveTimeout,
    touchEndTimeout,
    touchCancelTimeout,
    mouseX,
    mouseY,
    menuStyle,
    showContextMenu,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleTouchCancel,
    isMobile
  } = useContextMenu()


  const colorStatus = (statusId) => {
    if (statusId === 'В работе') {
      return 'positive'
    }
    if (statusId === 'Отмена') {
      return 'negative'
    }
    if (statusId === 'Куплено заказчиком') {
      return 'primary'
    }
    if (statusId === 'Скомплектовано') {
      return 'grey-7'
    }
  }

  function openSmeta(val) {
    activeSmeta.value = val
    emit('openSmeta', val)
    contextMenu.value.hide()
  }
  function editModal(val, field) {
    emit('editModal', val, field)
  }
  function chooseSmeta(item) {
    emit('chooseSmeta', item.estimate_item_id, item.id)
  }

  function goToLink(link) {
    if (!/^https?:\/\//i.test(link)) {
      link = 'https://' + link
    }
    window.open(link, '_blank')
  }

  const optionstab = ref([])
  const getStatuses = async () => {
    try {
      const resp = await estimatesApi.getStatuses()
      optionstab.value = resp
    } catch (e) {
      console.log(e)
    }
  }

  const user = JSON.parse(localStorage.getItem('userInfo'))
  const userRole = user.role

  onMounted(() => {
    getStatuses()
  })

</script>
