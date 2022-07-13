<template>
  <q-markup-table
    flat
    class="estimates-table"
  >
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column"
          :class="`text-left th-${column.name}`"
        >
          <div class="th-content">
            <div
              v-if="column.name === 'name'"
              :class="`th-content-${column.name}`"
            >
              <q-icon
                name="svguse:icons/financeTable.svg#photo"
                size="16px"
                color="grey-5"
                style="opacity: 0.3;"
                class="icon-photo"
              />
              {{column.label}}
              <q-icon
                name="svguse:icons/financeTable.svg#share"
                size="13px"
                color="grey-5"
                style="opacity: 0.3;"
                class="icon-share"
              />
            </div>
            <div
              v-else
            >
              {{column.label}}
            </div>
            <q-icon
              v-if="column.sortable"
              class="sorted-icon"
              size="7px"
              name="svguse:icons/financeTable.svg#tableArrrow"
            />
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="row in rows"
        :key="row"
      >
        <td
          v-for="(item, index) in row"
          :key="item"
          :todos="item"
          :class="`td-content-${index}`"
        > 
          <div
            v-if="index === 'name'"
            class="td-content-section"
          >
            <q-icon
              color="black"
              style="opacity: 0.2;"
              name="svguse:icons/financeTable.svg#image"
              size="20px"
            >
              <q-tooltip anchor="center left" self="center right">
                Here I am!
              </q-tooltip>
            </q-icon>
            <div class="text">{{item}}</div>
            <q-icon
              color="black"
              style="opacity: 0.2;"
              name="svguse:icons/financeTable.svg#copy2"
              size="17px"
              class="td-content-name__copy"
            />
          </div>
          <div
            class="td-content-section"
            v-else-if="index === 'deadline'"
          >
            <div class="text"> {{item}} дней</div>
          </div>
          <div
            class="td-content-section"
            v-else-if="index === 'status'"
          >
            <div class="status">
              <div class="circle bg-positive"></div>
              <div class="desc">Оплачено</div>
            </div>
          </div>
          <div
            class="td-content-section"
            v-else-if="index === 'procent'"
          >
            <div class="text">{{item}}%</div>
          </div>
          <div class="td-content-section" v-else>
            <div class="text">{{item}}</div>
          </div>
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'EstimateTable',
  props: {
    columns: Array,
    rows: Array
  },
  setup (props) {
    return {}
  }
}
</script>