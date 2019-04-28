import { VuetifyIconOptions } from 'vuetifyx/types/services/icons'
import { VuetifyThemeOptions } from 'vuetifyx/types/services/theme'

export interface VuetifyPreset {
  [name: string]: any

  ssr?: boolean
  locale?: {
    lang?: string
    rtl?: boolean
  }
  icons: VuetifyIconOptions
  theme: VuetifyThemeOptions
}
