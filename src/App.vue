<template>
  <v-app>

    <Menu></Menu>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import Menu from './components/Menu.vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',

  components: {
    Menu,
    HelloWorld,
  },

  data: () => ({
    //
  }),
}
</script>
