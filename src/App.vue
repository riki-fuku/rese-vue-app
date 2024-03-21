<template>
  <v-app>

    <UserMenu></UserMenu>

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
import UserMenu from './components/UserMenu.vue'

export default {
  name: 'App',

  components: {
    UserMenu,
  },

  data: () => ({
    //
  }),
}
</script>./components/UserMenu.vue
