<template>
  <v-app id="app">
    <!--IOS设备快捷按钮图标-->
    <link ref="appleTouchIcon" rel="apple-touch-icon">
    <!--浏览器中地址栏左侧显示的图标-->
    <link ref="faviconIcon" rel="shortcut icon">
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </v-app>
</template>

<script lang="ts">
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      tenant: state => state.tenantStore.tenant
    })
  },
  methods: {
    ...mapActions(['setTenant']),
    ...mapMutations(['setTenantId']),
    // 渲染系统设置
    renderTenant(tenant) {
      if (!tenant) {
      } else {
        if (tenant.pageTitle) {
          document.title = tenant.pageTitle
        }
        if (tenant.appleTouchIconUrl) {
          this.$refs.appleTouchIcon.href = tenant.appleTouchIconUrl
        }
        if (tenant.faviconIconUrl) {
          this.$refs.faviconIcon.src = tenant.faviconIconUrl
        }
      }
    }
  },
  created() {
    window.app = this
    let urlTenantId = this.$route.params.tenantId
    if (urlTenantId) {
      this.setTenantId(urlTenantId)
    }
    this.setTenant()
  },
  provide() {
    return { getComplexI18n: 'getComplexI18n' }
  },
  watch: {
    tenant(val, oldVal) {
      this.renderTenant(val)
    }
  }
}
</script>
