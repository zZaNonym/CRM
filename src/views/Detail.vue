<template>
  <div>
    <Loader v-if="loading" />
    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{
          'Detail_Title' | localize
        }}</router-link>
        <a class="breadcrumb">{{ record.type | localize }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              green: record.type === 'Income',
              red: record.type === 'Outcome',
            }"
          >
            <div class="card-content white-text">
              <p>{{ 'Description' | localize }}: {{ record.descriptions }}</p>
              <p>{{ 'Amount' | localize }}: {{ record.amount | currency }}</p>
              <p>{{ 'Category' | localize }}: {{ record.categoryName }}</p>

              <small>{{ record.date }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'detail',
  metaInfo() {
    return { title: this.$title('Detail_Title') };
  },
  data: () => ({ record: null, loading: true }),
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch('fetchRecordById', id);
    const category = await this.$store.dispatch(
      'fetchCategoryById',
      record.categoryId
    );
    this.record = {
      ...record,
      categoryName: category.title,
      classType: record.type === 'Income' ? 'green' : 'red',
    };
    this.loading = false;
  },
};
</script>
