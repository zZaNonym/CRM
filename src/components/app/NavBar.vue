<template>
  <nav class="navbar  indigo darken-3">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a @click.prevent="$emit('click')" href="#">
          <i class="material-icons ">dehaze</i>
        </a>
        <span>{{ date | date('datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger "
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name && name.toUpperCase() }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>
                {{ 'ProfileTitle' | localize }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>
                {{ 'Exit' | localize }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
  }),
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.dropdown = M.Dropdown.init(this.$refs.dropdown);
  },

  computed: {
    name() {
      return this.$store.getters.info.name;
    },
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout');
        this.$router.push('/login?message=logout');
      } catch (error) {
        console.log(error);
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
    this.dropdown && this.dropdown.destroy && this.dropdown.destroy();
  },
};
</script>
