<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout" :key="locale">
      <Navbar @click="isOpen = !isOpen" />
      <Sidebar :open="isOpen" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large indigo darken-3"
          to="/record"
          v-tooltip="localize('CreateNewRecord')"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/app/NavBar';
import Sidebar from '@/components/app/SideBar';
import messages from '@/utils/messages';
import localize from '../filtres/locale';

export default {
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  name: 'main-layout',
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
    }
    this.loading = false;
  },
  components: { Navbar, Sidebar },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    },
  },

  watch: {
    error(code) {
      this.$error(messages[code] || 'SomeThingWasWrong');
    },
  },
  methods: {
    localize: localize,
  },
};
</script>
