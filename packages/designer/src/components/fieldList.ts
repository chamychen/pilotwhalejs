import BaseDesigner from '@core/BaseDesigner'
import FieldListDto from '@entity/FieldList'

export default ({
  mixins: [BaseDesigner],
  props: {
    value: {
      type: Object
    },
    dataList: {
      type: Array
    }
  },
  data() {
    return {
      currentValue: { fieldList: this.dataList },
      uiEntity: new FieldListDto()
    }
  },
  computed: {
    selectedItem: {
      get() {
        return [this.value]
      },
      set(newVal) {
        this.$emit('input', newVal[0])
      }
    }
  },
  methods: {
    /**
     * 设置tab的高度
     */
    setTabContextHeight() {
      let height = 0
      let bodyHeight = window.innerHeight
      let appBar = document.getElementById('appBar')
      if (appBar) {
        let appBarHeight = appBar.children[0].clientHeight
        height = bodyHeight - appBarHeight - 48
      } else {
        height = bodyHeight - 48
      }
      this.$refs.fieldListTab.currentContextHeight = height + 'px'
    }
  },
  mounted() {
    this.setTabContextHeight()
    window.onresize = this.setTabContextHeight
  }
})