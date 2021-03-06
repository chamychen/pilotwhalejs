import { TableMode, ScrollData } from '../mixins/model'
import { VNode } from 'vue/types/vnode'
import { TableHeader } from '../mixins/header'
import { CreateElement } from 'vue'
import { stringUtils } from 'pilotwhale-utils'
import VDefaultRowPC from './VDefaultRowPC'
import { VSimpleCheckbox } from '../../VCheckbox'
import { getPrefixedScopedSlots } from '../../../util/helpers'
import { DataProps } from '@components/VData/VData'
import VDefaultRowMobile from './VDefaultRowMobile'

export default {
  mixins: [VDefaultRowPC, VDefaultRowMobile],
  props: {},
  data() {
    return {
      rtl: this.$vuetify.rtl,
      currentItems: this.getCurrentItems(true),
      currentEditRowId: null, // 当前编缉行id
      currentTableMode: this.tableMode,
      currentMobileTableMode: this.mobileTableMode
        ? this.mobileTableMode
        : this.tableMode,
      currentItemSlots: [],
      // 滚动条当前位置前多少行（用于显示）
      prevScrollRows: 15,
      // 滚动条当前位置后多少行（用于显示）
      nextScrollRows: 15
    }
  },
  computed: {
    currentItemsCount() {
      return this.currentItems ? this.currentItems.length : 0
    },
    // 当前滚动条所在行位置
    scrollRowIndex() {
      if (this.rowAvgHeight) {
        let scrollData: ScrollData = this.scrollData
        if (scrollData && scrollData.scrollTop) {
          return scrollData.scrollTop / this.rowAvgHeight
        } else {
          return 0
        }
      }
    }
  },
  methods: {
    /**
     * 
     * @param isInit 是否初始化调用
     */
    getCurrentItems(isInit) {
      let items = isInit ? this.items : this.currentItems
      let dataList = items ? [...items] : null
      if (this.isTreeGrid) {
        let sortNoField = this.treeListDescribe.sortNoField
        return dataList.sort((a: string, b: string) => {
          // 此排序仅支持10个层级，每个层级999个节点
          let a1 = parseFloat(a[sortNoField].substr(0, 15))
          let a2 = parseFloat(a[sortNoField].substr(15))
          let b1 = parseFloat(b[sortNoField].substr(0, 15))
          let b2 = parseFloat(b[sortNoField].substr(15))
          if (a1 < b1) {
            return -1
          } else if (a1 > b1) {
            return 1
          } else {
            return a2 - b2
          }
        })
      }
      return dataList
    },
    /**
     * 获取选项值的文本
     * @param header 
     * @param elementVal 
     */
    getItemText(header: TableHeader, elementVal: any) {
      if (elementVal && header.editor && header.editor.props.items) {
        let item = header.editor.props.items.find(i => i.value.toString() === elementVal.toString())
        if (item) {
          elementVal = item.text
        }
      }
      return elementVal ? elementVal.toString() : ''
    },
    genItems(props: DataProps) {
      const empty = this.genEmpty(this.currentItemsCount)
      if (empty) return [empty]
      let result = []
      this.currentItems.forEach((item, index) => {
        let isHidden = false
        // 树形表格展开&收缩控制
        if (this.isTreeGrid && this.hiddenLongCodes) {
          let longCode = item[this.treeListDescribe.longCodeField]
          isHidden = this.hiddenLongCodes.some(i =>
            new RegExp(`^${i}\\.`).test(longCode)
          )
        }
        if (!isHidden) {
          result.push(this.genRow(this.$createElement, item, index))
        }
      })
      return result
    },
    genRow(h: CreateElement, item: any, rowIndex: number) {
      let isEdit = false
      let id = item[this.itemKey]
      let limitCells = null
      // 编缉权限控制
      if (
        this.tableMode === TableMode.MULTI_LINE ||
        (this.tableMode === TableMode.SINGLE_LINE &&
          stringUtils.compare(id, this.currentEditRowId))
      ) {
        let limitEditMethodValue: string[] | boolean = this.getLimitCells(item)
        if (limitCells === true) {
          isEdit = false
        } else {
          if (Array.isArray(limitCells) && limitCells.length > 0) {
            limitCells = limitEditMethodValue
          } else {
            isEdit = true
          }
        }
      }
      if (this.isMobile) { // 手机行
        return this.genMobileRow(h, item, rowIndex, isEdit, limitCells)
      } else { // PC行
        let minScrollIndex = this.scrollRowIndex - this.prevScrollRows
        if (minScrollIndex < 0) {
          minScrollIndex = 0
        }
        // 是否可见行
        let isHiddenRow =
          this.rowAvgHeight &&
          (rowIndex < minScrollIndex ||
            rowIndex > this.scrollRowIndex + this.nextScrollRows)
        return this.genPcRow(h, item, rowIndex, isEdit, limitCells, isHiddenRow)
      }
    },
    /**
     * 获取限制输入的单元格
     * 返回true则表示整行不可编缉
     * 返回数组则表示数组内的列不可编缉
     */
    getLimitCells(item: any): boolean | string[] {
      let limitCells: string[] | boolean = true
      if (this.limitEditMethod) {
        if (!this.context) {
          throw new Error('VDataTableItems props [context] not be null')
        } else {
          let method = this.context[this.limitEditMethod]
          if (method) {
            limitCells = method(item)
          } else {
            throw new Error(
              `VDataTableItems props [context] without ${this.limitEditMethod} method`
            )
          }
        }
      } else {
        limitCells = false
      }
      return limitCells
    },
    /**
     * 生成编缉控件
     * @param h
     * @param header
     * @param item
     * @param itemId
     * @param rowIndex
     */
    genEditor(
      h: CreateElement,
      header: TableHeader,
      item: any,
      itemId: string,
      rowIndex: number
    ): VNode {
      let element: VNode = null
      if (header.editor && item) {
        let fieldName = header.value
        let editorConfig = { ...header.editor }
        editorConfig.key = `${itemId}_${fieldName}`
        editorConfig.ref = null // 不可以设置ref
        editorConfig.model = {
          value: item[fieldName],
          callback: value => {
            // 保持为空
          }
        }
        editorConfig.on = {
          change: (newVal) => {
            item[fieldName] = newVal
            this.$set(this.currentItems, rowIndex, item)
            if (this.valid && this.valid.$each && this.valid.$each[rowIndex]) {
              let validProp = this.valid.$each[this.rowIndex][fieldName]
              validProp.$touch()
            }
          }
        }
        // if (editorConfig.props.elementName === 'VSelect') {
        //   editorConfig.model = {
        //     value: item[fieldName],
        //     callback: value => {
        //       item[fieldName] = value
        //       this.$set(this.currentItems, rowIndex, item)
        //       if (this.valid && this.valid.$each && this.valid.$each[rowIndex]) {
        //         let validProp = this.valid.$each[this.rowIndex][fieldName]
        //         validProp.$touch()
        //       }
        //     }
        //   }
        // } else {
        //   editorConfig.props.value = item[fieldName]
        //   editorConfig.on = {
        //     change: value => {
        //       item[fieldName] = value
        //       this.$set(this.currentItems, rowIndex, item)
        //       if (this.valid && this.valid.$each && this.valid.$each[rowIndex]) {
        //         let validProp = this.valid.$each[this.rowIndex][fieldName]
        //         validProp.$touch()
        //       }
        //     }
        //   }
        // }
        element = h(editorConfig.props.elementName, editorConfig)
        return element
      }
    },
    getItemScopedSlots(item: any, rowIndex: number) {
      const scopedSlots = getPrefixedScopedSlots('item.', this.$scopedSlots)
      this.genSelectorSlot(item, scopedSlots)
      this.genRowNoSlot(item, scopedSlots)
      return scopedSlots
    },
    genSelectorSlot(item: any, scopedSlots: any) {
      if (this.showSelect) {
        const data = {
          props: {
            value: this.isSelected(item)
          },
          on: {
            click: e => {
              let isSelected = this.isSelected(item)
              this.select(item, !isSelected)
              e.stopPropagation()
            }
          }
        }
        scopedSlots['column.data-table-select'] = () =>
          this.$createElement(VSimpleCheckbox, {
            staticClass: 'v-data-table__checkbox',
            ...data
          })
      }
    },
    // 生成行号模板
    genRowNoSlot(item: any, scopedSlots: any) {
      if (this.showSelect) {
        scopedSlots['column.data-table-rowNo'] = (rowNo: number) =>
          this.$createElement(
            'span',
            {
              staticClass: 'v-data-table__rowNo'
            },
            [rowNo]
          )
      }
    }
  }
}
