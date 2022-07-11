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
              color="grey-5"
              name="svguse:icons/financeTable.svg#tableArrrow"
            />
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-left">
          {{rows}}
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