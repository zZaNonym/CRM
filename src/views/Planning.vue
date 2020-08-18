<template>
  <div>
    <div class="page-title">
      <h3>{{ 'CostsForCategories' | localize }}</h3>
      <h4>{{ info.bill | currency }}</h4>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!categories.length" class="center">
      {{ 'NoCategories' | localize }}
      <router-link to="/categories">{{ 'Create' | localize }}</router-link>
    </p>
    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ cat.spend | currency }} из {{ cat.limit | currency }}
        </p>
        <div v-tooltip="cat.tooltip" class="progress">
          <div
            class="determinate"
            :class="cat.progressColor"
            :style="{ width: cat.progressProcent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import currencyFilter from '@/filtres/currency';
import localize from '../filtres/locale';

export default {
  name: 'Record',
  metaInfo() {
    return { title: this.$title('Menu_Planning') };
  },
  data: () => ({ loading: true, categories: [] }),
  computed: mapGetters(['info']),
  async mounted() {
    const categories = await this.$store.dispatch('fetchCategories');
    const records = await this.$store.dispatch('fetchRecords');

    this.categories = categories.map((cat) => {
      const spend = records
        .filter((r) => r.categoryId === cat.id && r.type === 'Outcome')
        .reduce((total, record) => (total += +record.amount), 0);
      const precent = (100 * spend) / cat.limit;
      const progressProcent = precent > 100 ? 100 : precent;
      const progressColor =
        precent < 60 ? 'green' : precent < 100 ? 'yellow' : 'red';

      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? localize('MoreThan') : localize('Stayed')
      } ${currencyFilter(Math.abs(tooltipValue))}`;

      return {
        ...cat,
        progressProcent,
        progressColor,
        spend,
        tooltip,
      };
    });
    this.loading = false;
  },
};
</script>
