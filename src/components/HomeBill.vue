<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{'BillInCurrency'| localize}}</span>

        <p v-for="cur of currency" :key="cur" class="currency-line">
          <span>{{ getCurrency(cur) | currency(cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["rates"],
  data: () => ({ currency: ["MDL", "EUR", "USD"] }),
  computed: {
    base() {
      return this.$store.getters.info.bill / this.rates["MDL"];
    }
  },
  methods: {
    getCurrency(cur) {
      return this.base * this.rates[cur];
    }
  }
};
</script>
