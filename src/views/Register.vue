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
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{
            invalid: $v.name.$anyError,
          }"
        />
        <label for="name">{{ 'Name' | localize }}</label>
        <small v-if="$v.name.$anyError" class="helper-text invalid"
          >{{ 'Message_MinLength' | localize }}
          {{ $v.name.$params.minLength.min }}</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model.trim="agree" />
          <span>{{ 'AcceptRules' | localize }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ 'Register' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ 'HasAccount' | localize }}
        <router-link to="/login">{{ 'Login' | localize }}</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import { required, minLength, email } from 'vuelidate/lib/validators';

export default {
  name: 'register',
  data: () => ({ password: '', email: '', name: '', agree: false }),
  metaInfo() {
    return { title: this.$title('Register') };
  },
  validations: {
    password: { required, minLength: minLength(6) },
    email: { required, email },
    name: { minLength: minLength(8), required },
    agree: { checked: (v) => v },
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
        name: this.name,
      };
      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/');
      } catch (e) {}
    },
  },
};
</script>
