export default ({
    name: 'xMobile',
    props: {
        // 强制为移动形式显示
        forceMobile: Boolean,
        mobileBreakpoint: {
            type: Number,
            default: 1024
        }
    },
    computed: {
        isMobile(): boolean {
            return this.forceMobile || this.$vuetify.breakpoint.width < this.mobileBreakpoint
        }
    }
})
