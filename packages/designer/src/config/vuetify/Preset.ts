const VuetifyPreset = {
    ssr: false,
    locale: {
        lang: 'en',
        rtl: false
    },
    icons: {
        iconfont: 'mdi'
    },
    theme: {
        options: {
            cspNonce: undefined
        },
        default: 'light',
        themes: {
            dark: {
                primary: '#1976D2',   // blue.darken2
                secondary: '#424242', // grey.darken3
                accent: '#82B1FF',    // blue.accent1
                error: '#FF5252',     // red.accent2
                info: '#2196F3',      // blue.base
                success: '#4CAF50',   // green.base
                warning: '#FFC107'    // amber.base
            },
            light: {
                primary: '#2196f3',   // blue.darken2
                secondary: '#424242', // grey.darken3
                accent: '#82B1FF',    // blue.accent1
                error: '#FF5252',     // red.accent2
                info: '#2196F3',      // blue.base
                success: '#4CAF50',   // green.base
                warning: '#FFC107'    // amber.base
            }
        }
    }
}

export default VuetifyPreset