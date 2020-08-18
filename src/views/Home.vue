<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Bill' | localize }}</h3>

      <button @click="refresh" class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <div v-else class="row">
      <HomeBill :rates="currency.rates" />
      <HomeCurrency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill';
import HomeCurrency from '@/components/HomeCurrency';
import localize from '../filtres/locale';

export default {
  name: 'Home',
  metaInfo() {
    return { title: this.$title('Menu_Bill') };
  },
  data: () => ({ loading: true }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    },
  },
  components: { HomeCurrency, HomeBill },
};
</script>
