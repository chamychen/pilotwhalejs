<template>
  <v-app id="app">
    <v-app-bar id="appBar" color="primary" :dark="dark" app dense fixed clipped-left clipped-right>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-app-bar>
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </v-app>
</template>


<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      dark: true
    }
  }
}
</script>



