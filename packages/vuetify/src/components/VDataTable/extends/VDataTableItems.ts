import { TableMode, ScrollData } from '../mixins/model'
import { VNode } from 'vue/types/vnode'
import { TableHeader } from '../mixins/header'
import { CreateElement } from 'vue'
import { stringUtils } from 'pilotwhale-utils'
import VDefaultRowPC from './VDefaultRowPC'
import { VSimpleCheckbox } from '../../VCheckbox'
import { getPrefixedScopedSlots } from '../../../util/helpers'
import { DataProps } from '@components/VData/VData'

export default {
  mixins: [VDefaultRowPC],
  props: {},
  data() {
    return {
      rtl: this.$vuetify.rtl,
      dataList: this.items ? this.items : [],
      currentItemsCount: this.items ? this.items.length : 0,
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
    },
    currentItems: {
      get() {
        if (this.isTreeGrid) {
          let sortNoField = this.treeListDescribe.sortNoField
          return this.dataList.sort((a: string, b: string) => {
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
        } else {
          return this.dataList
        }
      },
      set(newVal) {
        this.$set(this, 'dataList', newVal)
      }
    }
  },
  methods: {
    genItems(props: DataProps) {
      const empty = this.genEmpty(props.pagination.itemsLength)
      if (empty) return [empty]
      let result = []
      this.currentItems.forEach((item, index) => {
        if (this.isTreeGrid && this.hiddenLongCodes) {
          let longCode = item[this.treeListDescribe.longCodeField]
          let isHidden = this.hiddenLongCodes.some(i =>
            new RegExp(`^${i}\\.`).test(longCode)
          )
          if (!isHidden) {
            result.push(this.genRow(this.$createElement, item, index))
          }
        }
      })
      return result
    },
    genRow(h: CreateElement, item: any, rowIndex: number) {
      // return <div>1111</div>（页面必须是tsx）
      let isEdit = false
      let id = item[this.itemKey]
      let limitCells = null
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
      if (this.isMobile) {
        return this.genMobileRow(h, item, rowIndex, isEdit, limitCells)
      } else {
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
        let editorConfig = Object.assign({}, header.editor)
        editorConfig.key = editorConfig.ref = `${itemId}_${fieldName}`
        editorConfig.props.value = item[fieldName]
        editorConfig.on = {
          change: value => {
            item[fieldName] = value
            if (this.valid && this.valid.$each && this.valid.$each[rowIndex]) {
              let validProp = this.valid.$each[this.rowIndex][fieldName]
              validProp.$touch()
            }
          }
        }
        // editorConfig.model = {
        //     value: item[fieldName]
        //     // callback: value => {
        //     //     item[fieldName] = value
        //     //     if (this.valid && this.valid.$each && this.valid.$each[rowIndex]) {
        //     //         let validProp = this.valid.$each[this.rowIndex][fieldName]
        //     //         validProp.$touch()
        //     //     }
        //     // }
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
