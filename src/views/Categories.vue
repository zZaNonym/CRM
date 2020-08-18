<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Categories' | localize }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate />
        <CategoryUpdate
          :key="categories.length + updateCount"
          @update="updateHandle"
          :categories="categories"
          v-if="categories.length"
        />
        <p v-else class="center">{{ 'NoCategories' | localize }}</p>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

import CategoryCreate from '../components/CategoryCreate';
import CategoryUpdate from '../components/CategoryUpdate';
import localize from '../filtres/locale';

export default {
  data: () => ({ loading: true, updateCount: 0 }),
  metaInfo() {
    return { title: this.$title('Menu_Categories') };
  },
  computed: mapGetters(['categories']),

  methods: {
    updateHandle() {
      this.updateCount++;
    },
  },

  async mounted() {
    await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  components: {
    CategoryCreate,
    CategoryUpdate,
  },
};
</script>
