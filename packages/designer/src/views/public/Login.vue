<template>
  <div :style="{'background-image':loginBgUrl,'background-size': 'cover','background-position': 'center','height':'100%'} ">
    <login-form />
  </div>
</template>

<style lang="scss">
html {
  overflow: auto;
}
</style>

<script>

import { mapState } from 'vuex'
export default {
  data() {
    return {
      loginBgNamePrefix: 'login-bg',
      loginBgUrl: this.getLoginBgUrl()
    }
  },
  computed: {
    // ...mapState({
    //   tenant: state => state.tenantStore.tenant
    // }),
    sysName() {
      return this.tenant && this.tenant.loginPageName ? this.tenant.loginPageName : ''
    }
  },
  methods: {
    getLoginBgUrl() {
      let no = Math.floor((Math.random() * 3) + 1)
      let imgUrl = 'url(' + require(`@assets/images/login-bg${no}.jpg`) + ')'
      return imgUrl
    }
  },
  beforeMount() {
    setInterval(() => {
      this.loginBgUrl = this.getLoginBgUrl()
    }, 2000)
  }
}
</script>
