import Vue, { Component, PluginFunction, PluginObject, VueConstructor, DirectiveFunction, DirectiveOptions } from 'vue'
import './lib'
import './alacarte'
import './colors'

// Services
import { Application } from '../src/services/application'
import { Breakpoint } from '../src/services/breakpoint'
import { Goto } from '../src/services/goto'
import { Icons } from '../src/services/icons'
import { Lang } from '../src/services/lang'
import { Theme } from '../src/services/theme'

// Service Options
import { VuetifyBreakpointOptions } from './services/breakpoint'
import { VuetifyGoToOptions } from './services/goto'
import { VuetifyIconOptions } from './services/icons'
import { VuetifyLangOptions } from './services/lang'
import { VuetifyThemeOptions } from './services/theme'

declare const Vuetifyx: Vuetifyx
export default Vuetifyx
export interface Vuetifyx {
  install: PluginFunction<VuetifyUseOptions>
  version: string
}

export type ComponentOrPack = Component & {
  $_vuetify_subcomponents?: Record<string, ComponentOrPack>
}

export interface VuetifyUseOptions {
  transitions?: Record<string, VueConstructor>
  directives?: Record<string, DirectiveOptions>
  components?: Record<string, ComponentOrPack>
  /** @see https://vuetifyjs.com/style/theme */
  theme?: Partial<VuetifyThemeOptions> | false
  breakpoint?: Partial<VuetifyBreakpointOptions> | false
  /**
   * Override specific icon names. You can also specify your own custom ones that can then be accessed from v-icon
   *
   * @example &lt;v-icon&gt;$vuetifyx.icons.(name)&lt;/v-icon&gt;
   */
  icons?: Partial<VuetifyIconOptions>
  lang?: Partial<VuetifyLangOptions>
  rtl?: boolean
}

export interface VuetifyObject extends Vue {
  readonly breakpoint: InstanceType<typeof Breakpoint>
  readonly goTo: <T extends string | number | HTMLElement | Vue>(target: T, options?: VuetifyGoToOptions) => Promise<T>
  application: InstanceType<typeof Application>
  theme: InstanceType<typeof Theme>
  icons: InstanceType<typeof Icons>
  lang: InstanceType<typeof Lang>
  rtl: boolean
}

declare module 'vue/types/vue' {
  export interface Vue {
    $vuetifyx: VuetifyObject
  }
}

declare module 'vue/types/options' {
  export interface ComponentOptions<
    V extends Vue,
    Data=DefaultData<V>,
    Methods=DefaultMethods<V>,
    Computed=DefaultComputed,
    PropsDef=PropsDefinition<DefaultProps>,
    Props=DefaultProps> {
    vuetifyx?: any
  }
}