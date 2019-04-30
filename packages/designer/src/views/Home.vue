<template>
  <div>
    <v-navigation-drawer app fixed left clipped>
      <designer></designer>
    </v-navigation-drawer>
    <v-toolbar color="primary" dense dark fixed app clipped-left clipped-right>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer app fixed right clipped>
      <designer></designer>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <v-tooltip right>
              <v-btn icon large target="_blank" slot="activator">
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  data: () => ({
    dark: true,
    drawers: ['Default (no property)', 'Permanent', 'Temporary'],
    primaryDrawer: {
      model: null,
      type: 'default (no property)',
      clipped: false,
      floating: false,
      mini: false
    },
    footer: {
      inset: false
    }
  })
}
</script>