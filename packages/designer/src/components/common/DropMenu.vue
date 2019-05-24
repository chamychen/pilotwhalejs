<template>
  <v-menu bottom left offset-y max-height="700">
    <template #activator="{ on: menu }">
      <v-btn aria-label="设计管理" text style="min-width: 48px" v-on="menu">
        <span class="hidden-sm-and-down mr-1">{{label}}</span>
        <v-icon class="hidden-sm-and-down">{{downIcon}}</v-icon>
        <v-icon class="hidden-md-and-up">{{smallIcon}}</v-icon>
      </v-btn>
    </template>

    <v-list light dense>
      <v-list-item v-for="item in items" :key="item.key" class="v-list__tile--doc" ripple rel='noopener' :to='item.routeName'>
        <v-list-item-avatar v-if="item.avatar" :color="item.avatarColor">
          <v-icon dark v-text="item.avatar" />
        </v-list-item-avatar>
        <v-list-item-action v-else-if="item.icon">
          <v-icon v-text="item.icon" />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <span v-text="item.text" />
          </v-list-item-title>
          <v-list-item-sub-title v-if="item.subtext">
            <span v-if="noMarkdown" v-text="item.subtext" />
            <doc-markdown v-else>{{ item.subtext }}</doc-markdown>
          </v-list-item-sub-title>
        </v-list-item-content>
        <v-chip v-if="item.chip" :color="item.chipColor" class="v-chip--x-small" dark>{{ item.chip }}</v-chip>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    label: {
      type: String
    },
    downIcon: {
      type: String,
      default: 'mdi-menu-down'
    },
    smallIcon: {
      type: String
    },
    items: {
      type: Array
    }
  }
})
</script>


