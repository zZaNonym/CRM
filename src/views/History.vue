<template>
  <div>
    <div class="page-title">
      <h3>{{ 'History_Title' | localize }}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!records.length" class="center">
      {{ 'NoRecords' | localize }}
      <router-link to="/record">{{ 'CreateNewRecord' | localize }}</router-link>
    </p>
    <section v-else>
      <HistoryTable :records="items" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="paginateHandler"
        :prev-text="'Back' | localize"
        :next-text="'Forward' | localize"
        :container-class="'pagination center'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>
<script>
import HistoryTable from '../components/HistoryTable';
import PaginationMixin from '../mixins/pagination';
import { Pie } from 'vue-chartjs';

export default {
  name: 'History',
  extends: Pie,
  metaInfo() {
    return { title: this.$title('Menu_History') };
  },
  mixins: [PaginationMixin],
  data: () => ({ records: [], loading: true }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.setUpPagination(
      this.records.map((r) => {
        return {
          ...r,
          categoryName: categories.find((cat) => cat.id === r.categoryId).title,
          classType: r.type === 'Income' ? 'green' : 'red',
          textType: r.type === 'Income' ? 'Income' : 'Outcome',
        };
      })
    );
    await this.renderChart({
      labels: categories.map((c) => c.title),
      datasets: [
        {
          label: 'Categories outcome amount',
          data: categories.map((c) => {
            return this.records.reduce((total, record) => {
              if (record.type === 'Outcome' && record.categoryId === c.id) {
                total += +record.amount;
              }
              return total;
            }, 0);
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
    this.loading = false;
  },

  components: {
    HistoryTable,
  },
};
</script>
