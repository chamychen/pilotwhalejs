declare module 'vuetifyx/es5/install' {
  import { VueConstructor } from 'vue'

  const install: (Vue: VueConstructor, args: {}) => void

  export { install }
}
declare module 'vuetifyx/es5/components/Vuetifyx' {
  import Vuetifyx from 'vuetifyx'

  export default Vuetifyx
}

declare module 'vuetifyx/es5/components/*' {
  import { ComponentOrPack } from 'vuetifyx'
  import { VueConstructor } from 'vue'

  const VuetifyComponent: {
    // FIX: The & VueConstructor is a lie.
    // This might not be a valid component.
    // But registering arbitrary objects as components is the status quo.
    default: ComponentOrPack & VueConstructor
    [key: string]: ComponentOrPack & VueConstructor
  }

  export = VuetifyComponent
}

declare module 'vuetifyx/es5/directives' {
  import { DirectiveOptions, PluginFunction } from 'vue'

  const ClickOutside: DirectiveOptions
  const Ripple: DirectiveOptions
  const Resize: DirectiveOptions
  const Scroll: DirectiveOptions
  const Touch: DirectiveOptions

  export {
    ClickOutside,
    Ripple,
    Resize,
    Scroll,
    Touch
  }
}

declare module 'vuetifyx/lib/install' {
  import { VueConstructor } from 'vue'

  const install: (Vue: VueConstructor, args: {}) => void

  export { install }
}
declare module 'vuetifyx/lib/components/Vuetifyx' {
  import Vuetifyx from 'vuetifyx'

  export default Vuetifyx
}

declare module 'vuetifyx/lib/components/*' {
  import { ComponentOrPack } from 'vuetifyx'
  import { VueConstructor } from 'vue'

  const VuetifyComponent: {
    // FIX: The & VueConstructor is a lie.
    // This might not be a valid component.
    // But registering arbitrary objects as components is the status quo.
    default: ComponentOrPack & VueConstructor
    [key: string]: ComponentOrPack & VueConstructor
  }

  export = VuetifyComponent
}

declare module 'vuetifyx/lib/directives' {
  import { DirectiveOptions, PluginFunction } from 'vue'

  const ClickOutside: DirectiveOptions
  const Ripple: DirectiveOptions
  const Resize: DirectiveOptions
  const Scroll: DirectiveOptions
  const Touch: DirectiveOptions

  export {
    ClickOutside,
    Ripple,
    Resize,
    Scroll,
    Touch
  }
}

