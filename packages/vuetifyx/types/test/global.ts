import Vue from 'vue'

Vue.component('breakpoint', {
  created () {
    const name: string = this.$vuetifyx.breakpoint.name
    const numbers: number[] = [
      this.$vuetifyx.breakpoint.height,
      this.$vuetifyx.breakpoint.width,
      this.$vuetifyx.breakpoint.scrollbarWidth
    ]
    const objects: Object[] = [
      this.$vuetifyx.breakpoint.thresholds
    ]
    const booleans: boolean[] = [
      this.$vuetifyx.breakpoint.lg,
      this.$vuetifyx.breakpoint.lgAndDown,
      this.$vuetifyx.breakpoint.lgAndUp,
      this.$vuetifyx.breakpoint.lgOnly,
      this.$vuetifyx.breakpoint.md,
      this.$vuetifyx.breakpoint.mdAndDown,
      this.$vuetifyx.breakpoint.mdAndUp,
      this.$vuetifyx.breakpoint.mdOnly,
      this.$vuetifyx.breakpoint.sm,
      this.$vuetifyx.breakpoint.smAndDown,
      this.$vuetifyx.breakpoint.smAndUp,
      this.$vuetifyx.breakpoint.smOnly,
      this.$vuetifyx.breakpoint.xl,
      this.$vuetifyx.breakpoint.xlOnly,
      this.$vuetifyx.breakpoint.xs,
      this.$vuetifyx.breakpoint.xsOnly
    ]
  }
})

Vue.component('theme', {
  created () {
    // Can't do this, some components rely on the pre-defined values
    // this.$vuetifyx.theme = { primary: 123 }

    Object.assign(this.$vuetifyx.theme.themes.light, {
      primary: 123
    })

    this.$vuetifyx.theme.themes.light.primary = 132
  }
})
