<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Create' | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandle">
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
            >{{ 'Message_EnterName' | localize }}</span
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
          {{ 'Create' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  data: () => ({ name: '', limit: '' }),
  validations: {
    name: { required },
    limit: { required, minValue: minValue(100) },
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    async submitHandle() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.$store.dispatch('createCategory', {
          title: this.name,
          limit: this.limit,
        });
        this.name = '';
        this.limit = '';
        this.$v.$reset();
        this.$message('Category_HasBeenCreated');
      } catch (error) {}
    },
  },
};
</script>
