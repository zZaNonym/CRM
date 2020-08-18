<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Edit' | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandle">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="cat of categories" :key="cat.id" :value="cat.id">{{
              cat.title
            }}</option>
          </select>
          <label>{{ 'SelectCategory' | localize }}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="name"
            :class="{ invalid: $v.name.$dirty && !$v.name.required }"
          />
          <label for="name">{{ 'Name' | localize }}</label>
          <span
            v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid"
            >{{ 'Message_CategoryTitle' | localize }}</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="limit"
            :class="{ invalid: $v.limit.$anyError }"
          />
          <label for="limit">{{ 'Limit' | localize }}</label>
          <span v-if="$v.limit.$anyError" class="helper-text invalid"
            >{{ 'Message_MinLength' | localize }}
            {{ $v.limit.$params.minValue.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'Update' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  data: () => ({ select: null, name: '', limit: '', current: null }),
  validations: {
    name: { required },
    limit: { required, minValue: minValue(100) },
  },
  props: ['categories'],

  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  watch: {
    current(id) {
      const { title, limit } = this.categories.find((cat) => cat.id === id);
      this.name = title;
      this.limit = limit;
    },
  },
  created() {
    const { title, id, limit } = this.categories[0];
    this.current = id;
    this.name = title;
    this.limit = limit;
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
        const formData = {
          title: this.name,
          limit: this.limit,
          id: this.current,
        };

        await this.$store.dispatch('updateCategory', formData);
        this.$message('Category_HasBeenUpdated');
        this.$emit('update');
      } catch (error) {}
    },
  },
};
</script>
