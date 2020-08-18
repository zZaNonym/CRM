<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_NewRecord' | localize }}</h3>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!categories.length" class="center">
      {{ 'NoCategories' | localize }}
      <router-link to="/categories">{{ 'Create' | localize }}</router-link>
    </p>
    <form v-else class="form" @submit.prevent="submitHandle">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="cat of categories" :key="cat.id" :value="cat.id">{{
            cat.title
          }}</option>
        </select>
        <label>{{ 'SelectCategory' | localize }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="Income"
            v-model="type"
          />
          <span>{{ 'Income' | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="Outcome"
            v-model="type"
          />
          <span>{{ 'Outcome' | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model="amount"
          :class="{ invalid: $v.amount.$anyError }"
        />
        <label for="amount">{{ 'Amount' | localize }}</label>
        <span class="helper-text invalid" v-if="$v.amount.$anyError"
          >{{ 'Message_MinLength' | localize }}
          {{ $v.amount.$params.minValue.min }}</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="descriptions"
          :class="{ invalid: $v.descriptions.$anyError }"
        />
        <label for="description">{{ 'Description' | localize }}</label>
        <span class="helper-text invalid" v-if="$v.descriptions.$anyError"
          >{{ 'Description' | localize }}
          {{ 'Message_IsRequired' | localize }}</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Create' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import { required, minValue } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    select: null,
    categories: [],
    loading: true,
    category: null,
    type: 'Income',
    amount: '',
    descriptions: '',
  }),
  metaInfo() {
    return { title: this.$title('Menu_NewRecord') };
  },
  validations: {
    descriptions: { required },
    amount: { required, minValue: minValue(1) },
  },
  watch: {
    category() {
      this.$v.$reset();
    },
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'Income') {
        return true;
      }
      return +this.info.bill >= +this.amount;
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

    this.category = this.categories[0].id;
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
    }, 0);
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async submitHandle() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        if (this.canCreateRecord) {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            descriptions: this.descriptions,
            type: this.type,
            date: new Date().toJSON(),
          });

          const bill =
            this.type === 'Income'
              ? this.info.bill + Number(this.amount)
              : this.info.bill - Number(this.amount);

          await this.$store.dispatch('updateInfo', { bill });

          this.$message('RecordHasBeenCreated');
          this.descriptions = '';
          this.amount = '';
          this.$v.$reset();
        } else {
          this.$error('NotEnoughMoney');
        }
      } catch (error) {}
    },
  },
};
</script>
