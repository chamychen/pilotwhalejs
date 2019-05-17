<template>
  <v-app id="app">
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
    }
  },
  created() {
    window.app = this
  }
}
</script>



