<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ 'Amount' | localize }}</th>
        <th class="hidden">{{ 'Date' | localize }}</th>
        <th>{{ 'Category' | localize }}</th>
        <th>{{ 'Type' | localize }}</th>
        <th>{{ 'Open' | localize }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(r, index) of records" :key="r.id">
        <td>{{ index + 1 }}</td>
        <td>{{ r.amount | currency('MDL') }}</td>
        <td class="hidden">{{ r.date }}</td>
        <td>{{ r.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="r.classType">{{
            r.textType | localize
          }}</span>
        </td>
        <td>
          <button
            class="btn-small btn"
            @click="$router.push('/detail/' + r.id)"
            v-tooltip="localize('Message_RecordDetail')"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import localize from '../filtres/locale';

export default {
  props: ['records'],
  methods: {
    localize: localize,
  },
};
</script>
