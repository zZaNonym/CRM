<template>
  <form class="card auth-card" @submit.prevent="submitHandle">
    <div class="card-content">
      <span class="card-title">{{ 'CRM_Title' | localize }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid: $v.email.$anyError,
          }"
        />
        <label for="email">{{ 'Email' | localize }}</label>
        <small v-if="$v.email.$anyError" class="helper-text invalid">{{
          'Message_EmailRequired' | localize
        }}</small>
      </div>
      <div class="input-field">
        <input
          :class="{
            invalid: $v.password.$anyError,
          }"
          id="password"
          type="password"
          v-model.trim="password"
        />
        <label for="password">{{ 'Password' | localize }}</label>
        <small v-if="$v.password.$anyError" class="helper-text invalid"
          >{{ 'Message_MinLength' | localize }}
          {{ $v.password.$params.minLength.min }}</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ 'Login' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ 'NoAccount' | localize }}
        <router-link to="/register">{{ 'Register' | localize }}</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import messages from '@/utils/messages';

export default {
  name: 'login',
  metaInfo() {
    return { title: this.$title('Login') };
  },
  data: () => ({ password: '', email: '' }),
  validations: {
    password: { required, minLength: minLength(6) },
    email: { required, email },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    async submitHandle() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        password: this.password,
        email: this.email,
      };

      try {
        await this.$store.dispatch('login', formData);
        this.$router.push('/');
      } catch (err) {}
    },
  },
};
</script>
