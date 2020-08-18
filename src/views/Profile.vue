<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{ invalid: $v.name.$anyError }"
        />
        <label for="description">{{ 'Name' | localize }}</label>
        <span v-if="$v.name.$anyError" class="helper-text invalid">{{
          'Message_NumeleRequired' | localize
        }}</span>
      </div>
      <div class="switch">
        <label>
          EN
          <input type="checkbox" v-model="isRoLocale" />
          <span class="lever"></span>
          RO
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Update' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  data: () => ({ name: '', isRoLocale: true }),
  metaInfo() {
    return { title: this.$title('ProfileTitle') };
  },
  validations: { name: { required } },
  computed: mapGetters(['info']),
  mounted() {
    this.name = this.info.name;
    this.isRoLocale = this.info.locale === 'ro-RO';
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      } else if (
        this.name === this.info.name &&
        this.isRoLocale === (this.info.locale === 'ro-RO')
      ) {
        this.$error('Message_TheSameData');

        return;
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRoLocale ? 'ro-RO' : 'en-EN',
        });
        this.$message('Message_DataSuccessUpdated');
      } catch (error) {}
    },
  },
};
</script>
<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
