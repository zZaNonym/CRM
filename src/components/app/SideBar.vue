<template>
  <ul class="sidenav app-sidenav" :class="{ open: open }">
    <router-link
      v-for="link of links"
      :key="link.url"
      tag="li"
      :to="link.url"
      active-class="active"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-indigo pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>
<script>
import localize from '../../filtres/locale';

export default {
  props: ['open'],
  data: () => ({
    links: [
      { url: '/', title: localize('Menu_Bill'), exact: true },
      { url: '/history', title: localize('Menu_History') },
      { url: '/planning', title: localize('Menu_Planning') },
      { url: '/record', title: localize('Menu_NewRecord') },
      { url: '/categories', title: localize('Menu_Categories') },
    ],
  }),
};
</script>
