/* @vue component */
export default {
  name: 'c-dropdown',
  props: {
    items: {
      type: Array
    },
    label: {
      type: String
    },
    flat: {
      type: Boolean,
      default: true
    },
    downIcon: {
      type: String
      default: 'mdi-menu-down'
    },
    hiddenIcon: {
      type: String
      default: 'mdi-menu-down'
    },
    maxHeight: {
      type: Number
    },
    // 下拉按钮组合样式
    btnGroupStyle: {
      type: Boolean
      default: true
    },
    // 消息组合样式
    msgStyle: {
      type: Boolean
      default: false
    },
    // 菜单样式
    menuStyle: {
      type: Boolean
      default: false
    }
  }
}
