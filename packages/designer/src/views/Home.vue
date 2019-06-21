<template>
  <div :class="this.fullscreen?'d-fullscreen':null">
    <v-app-bar v-if='!this.fullscreen' id="appBar" color="primary" dark app dense fixed clipped-left clipped-right>
      <v-toolbar-title>PilotWhale</v-toolbar-title>
      <v-toolbar-title class="hidden-xs-only">&nbsp;&nbsp;Designer</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <common-drop-menu :items="designerMenuItems" smallIcon="mdi-content-save-edit-outline" label="设计管理" />
      </v-toolbar-items>
    </v-app-bar>
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      fullscreen: false,
      designerMenuItems: [
        {
          key: 'bizObject',
          text: '业务对象',
          icon: 'mdi-google-pages',
          routeName: 'bizObject'
        },
        {
          key: 'formDesignBtn',
          text: '表单设计器',
          icon: 'mdi-google-pages',
          routeName: 'designCenter'
        },
        {
          key: 'classManagerBtn',
          text: '分类码管理',
          icon: 'mdi-format-size',
          routeName: 'classManager'
        },
        {
          key: 'buttonManagerBtn',
          text: '按钮管理',
          icon: 'mdi-gesture-tap-hold',
          routeName: 'buttonManager'
        }
      ]
    }
  },
  methods: {}
})
</script>