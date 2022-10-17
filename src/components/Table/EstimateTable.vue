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
    <template #body="props">
      <q-tr
        :props="props"
        @dblclick="editModal(props.row)"
      >
        <q-td
          key="id"
          :props="props"
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.id}}
            </div>
          </div>
        </q-td>
        <q-td
          key="name"
          :props="props"
        >
          <div class="td-content-section td-content-name">
            <q-icon
              name="svguse:icons/financeTable.svg#image"
              size="20px"
              class="q-icon-tooltip"
            >
              <q-tooltip
                anchor="center left"
                self="center right"
                class="q-tooltip-estimates-img"
                v-if="props.row.name.imageUrl"
              >
                <div class="img">
                  <img :src="props.row.name.imageUrl" alt="">
                </div>
              </q-tooltip>
            </q-icon>
            <div class="text">{{props.row.name.title}}</div>
            <q-icon
              color="black"
              style="opacity: 0.2;"
              name="svguse:icons/financeTable.svg#copy2"
              size="17px"
              class="td-content-name__copy"
            />
          </div>
        </q-td>
        <q-td
          key="room"
          :props="props"
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.room}}
            </div>
          </div>
        </q-td>
        <q-td
          key="desc"
          :props="props"
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.desc}}
            </div>
          </div>
        </q-td>
        <q-td
          key="metrics"
          :props="props"
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.metrics}}
            </div>
          </div>
        </q-td>
        <q-td
          key="price"
          :props="props"
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.price}}
            </div>
          </div>
        </q-td>
        <q-td
          key="total"
          :props="props"
          class="td-total"
          @click="props.row.smetaVal = !props.row.smetaVal"
          :class="{open: props.row.smetaVal}"
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.total}}
            </div>
            <div class="total-img">
              <img v-if="props.row.status.imageUrl && props.row.smeta" :src="props.row.status.imageUrl" alt="">
            </div>
            <q-icon v-if="props.row.smeta" size="12px" name="svguse:icons/financeTable.svg#miniArrowe" />
          </div>
        </q-td>
        <q-td
          key="deadline"
          :props="props"
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.deadline}} дней
            </div>
          </div>
        </q-td>
        <q-td
          key="status"
          :props="props"
        >
          <div class="td-content-section td-content-status">
            <div class="status">
              <div :class="`circle bg-${colorStatus(props.row.status.id)}`"></div>
              <div class="desc">{{props.row.status.name}}</div>
            </div>
            <img v-if="props.row.status.imageUrl" :src="props.row.status.imageUrl" alt="" class="status-img">
          </div>
        </q-td>
        <q-td
          key="procent"
          :props="props"
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.procent}}%
            </div>
          </div>
        </q-td>
        <q-td
          key="agent"
          :props="props"
        >
          <div class="td-content-section">
            <div class="text">
              {{props.row.agent}}
            </div>
          </div>
        </q-td>
      </q-tr>

      <q-tr
        v-for="smeta in props.row.smeta"
        :key="smeta"
        class="q-tr-smeta"
        v-show="props.row.smetaVal"
      >
        <q-td key="id" class="td-id"/>
        <q-td
          key="name"
          :props="props"
          class="td-name"
        >
          <div class="td-content-section">
            <div class="name-img">
              <img v-if="smeta.imageUrl" :src="smeta.imageUrl" alt="">
            </div>
            <div class="text">{{smeta.name}}</div>
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
              {{smeta.metrics}}
            </div>
          </div>
        </q-td>
        <q-td
          key="price"
          :props="props"
        >
          <div class="td-content-section">
            <div class="text">
              {{smeta.price}}
            </div>
          </div>
        </q-td>
        <q-td
          key="total"
          :props="props"
        >
          <div class="td-content-section">
            <div class="text">
              {{smeta.total}}
            </div>
          </div>
        </q-td>
        <q-td
          key="deadline"
          :props="props"
        >
          <div class="td-content-section">
            <div class="text">
              {{smeta.deadline}} <span v-if="smeta.deadline != '—'">дней</span>
            </div>
          </div>
        </q-td>
        <q-td
          key="status"
          :props="props"
        >
          <div class="td-content-section td-content-status">
            <div class="status">
              <div :class="`circle bg-${colorStatus(smeta.status.id)}`"></div>
              <div class="desc">{{smeta.status.name}}</div>
            </div>
          </div>
        </q-td>
        <q-td
          key="procent"
          :props="props"
        >
          <div class="td-content-section">
            <div class="text">
              {{smeta.procent}}<span class="text" v-if="smeta.procent != '—'">%</span>
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
              {{smeta.agent}}
            </div>
          </div>
        </q-td>
      </q-tr>

      <q-tr class="q-tr-smeta q-tr-smeta-null" v-show="props.row.smetaVal" v-if="props.row.smeta">
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
      </q-tr>
      <div class="q-tr-separator"></div>
    </template>
  </q-table>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'EstimateTable',
  props: {
    columns: Array,
    rows: Array
  },
  setup (props, { emit }) {
    function colorStatus(statusId) {
      if (statusId === 1) {
        return 'positive'
      }
      if (statusId === 2) {
        return 'negative'
      }
      if (statusId === 3) {
        return 'grey-7'
      }
    }
    function editModal(val) {
      emit('editModal', val)
    }
    return {
      colorStatus,
      editModal,
    }
  }
})
</script>