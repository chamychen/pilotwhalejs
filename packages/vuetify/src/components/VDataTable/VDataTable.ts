import './VDataTable.sass'

// Types
import { VNode, VNodeChildrenArrayContents, VNodeChildren, CreateElement } from 'vue'
import { PropValidator } from 'vue/types/options'
import { DataProps, DataPaginaton, DataOptions } from '../VData/VData'
import { TableHeader } from './mixins/header'

// Components
import { VData } from '../VData'
import { VDataFooter, VDataIterator } from '../VDataIterator'
import VDataTableHeader from './VDataTableHeader'
import VProgressLinear from '../VProgressLinear'
import VSimpleTable from './VSimpleTable'

// Helpers
import { deepEqual, getObjectValueByPath, compareFn, getPrefixedScopedSlots } from '../../util/helpers'
import { breaking } from '../../util/console'
import { TableMode, TableType, GroupField, TreeListDescribe, ScrollData } from './mixins/model'
import VDataTableItems from './extends/VDataTableItems'
import xbutton from '../../mixins/xbutton'
import VTreeGrid from './extends/VTreeGrid'

/* @vue/component */
/* eslint-disable indent */
export default VDataIterator.extend({
  name: 'v-data-table',
  mixins: [VTreeGrid, VDataTableItems, xbutton],
  props: {
    // 上下文对象
    context: Object,
    // 表格类型
    tableType: {
      type: Number,
      default: TableType.DEFAULT
    } as PropValidator<TableType>,
    // 表格查看/编缉模式
    tableMode: {
      type: Number,
      default: TableMode.VIEW
    } as PropValidator<TableMode>,
    // 移动端表格查看/编缉模式
    mobileTableMode: {
      type: Number,
      default: TableMode.VIEW
    } as PropValidator<TableMode>,
    // 表头
    headers: {
      type: Array
    } as PropValidator<TableHeader[]>,
    // 主键
    itemKey: String,
    // 验证规则
    valid: Object,
    // 是否显示行号
    showRowNo: Boolean,
    // 是否显示选择器
    showSelect: {
      type: Boolean,
      default: true
    },
    // 是否单选
    singleSelect: {
      type: Boolean,
      default: false
    },
    // 分组字段
    groupFields: {
      type: Array
    } as PropValidator<GroupField[]>,
    // 分组/树形展开按钮
    expandIcon: {
      type: String,
      default: 'mdi-chevron-right'
    },
    // 分组/树形收起按钮
    shirnkIcon: {
      type: String,
      default: 'mdi-chevron-down'
    },
    // 减小行高
    dense: Boolean,
    // 编缉控件控制方法名
    limitEditMethod: String,
    // 是否点击行选中
    rowClickForSelect: {
      type: Boolean,
      default: true
    },
    showExpand: Boolean,
    showGroupBy: Boolean,
    virtualRows: Boolean,
    height: [Number, String],
    hideDefaultHeader: Boolean,
    caption: String,
    headerProps: Object,
    calculateWidths: Boolean,
    fixedHeader: Boolean,
    headersLength: Number,
    fixedLeftCols: Number,
    fixedRightCols: Number,
    buttonStyle: {
      type: String,
      default: 'fab'
    }, // raised|flat|depressed|icon|fab
    // PC行平均高度，此为虚拟表格配置
    rowAvgHeight: {
      type: Number
    },
    // 移动端行渲染函数
    mobileRenderMethod: {
      type: Function
    } as PropValidator<(h: CreateElement, headers: TableHeader[], item: any, itemKey: string, rowIndex: Number) => VNode>
  },
  data() {
    return {
      scrollData: null,
      internalGroupBy: [] as string[],
      openCache: {} as { [key: string]: boolean },
      widths: [] as number[],
      expandWidth: 60,
      selectWidth: 60,
      isSingleSelect: !this.showSelect || this.singleSelect,
      isRowClickForSelect: this.rowClickForSelect || !this.showSelect || this.singleSelect
    }
  },

  computed: {
    computedHeaders(): TableHeader[] {
      if (!this.headers) return []
      let fixedLeftCols = this.fixedLeftCols
      const fixedRightCols = this.fixedRightCols
      const headers = this.headers.filter(h => h.value === undefined || !this.internalGroupBy.find(v => v === h.value))
      const hasFixedColumn = this.fixedLeftCols > 0 || this.fixedRightCols > 0
      if (this.showSelect) {
        headers.unshift({
          text: '',
          value: 'data-table-select',
          sortable: false,
          width: hasFixedColumn ? '60px' : '1px'
        })
        fixedLeftCols += 1
      }
      if (this.showRowNo) {
        headers.unshift({
          text: this.$vuetify.lang.t('$vuetify.dataTable.rowNoCol'),
          value: 'data-table-rowNo',
          sortable: false,
          width: hasFixedColumn ? '60px' : '1px'
        })
        fixedLeftCols += 1
      }
      if (this.showExpand) {
        headers.unshift({
          text: '',
          value: 'data-table-expand',
          sortable: false,
          width: hasFixedColumn ? '60px' : '1px'
        })
        fixedLeftCols += 1
      }
      if (hasFixedColumn) {
        const minWidth = 280
        let currentLeftWidth = 0
        headers.forEach((i, index) => {
          if (index + 1 <= fixedLeftCols) {
            i.fixedStyle = `position:sticky;left:${currentLeftWidth}px;z-index:3;background:white;`
          }
          if (!i.width) {
            i.width = `${minWidth}px`
          }
          const iWidth = i.width ? parseInt(i.width) : minWidth
          currentLeftWidth += iWidth
        })
        let currentRightWidth = 0
        if (fixedRightCols) {
          headers.reverse().forEach((i, index) => {
            if (index + 1 <= fixedRightCols && !i.fixedStyle) {
              i.fixedStyle = `position:sticky;right:${currentRightWidth}px;z-index:2;background:white;`
            }
            if (!i.width) {
              i.width = `${minWidth}px`
            }
            const iWidth = i.width ? parseInt(i.width) : minWidth
            currentRightWidth += iWidth
          })
          headers.reverse()
        }
      }
      return headers
    },
    computedHeadersLength(): number {
      return this.headersLength || this.computedHeaders.length
    }
  },

  created() {
    const breakingProps = [['sort-icon', 'header-props.sort-icon'], ['hide-headers', 'hide-default-hedader'], ['select-all', 'show-select']]

    breakingProps.forEach(([original, replacement]) => {
      if (this.$attrs.hasOwnProperty(original)) breaking(original, replacement)
    })
  },

  mounted() {
    // if ((!this.sortBy || !this.sortBy.length) && (!this.options.sortBy || !this.options.sortBy.length)) {
    //   const firstSortable = this.headers.find(h => !('sortable' in h) || !!h.sortable)
    //   if (firstSortable) this.updateOptions({ sortBy: [firstSortable.value], sortDesc: [false] })
    // }
    if (this.calculateWidths) {
      window.addEventListener('resize', this.calcWidths)
      this.calcWidths()
    }
  },

  beforeDestroy() {
    if (this.calculateWidths) {
      window.removeEventListener('resize', this.calcWidths)
    }
  },

  methods: {
    calcWidths() {
      this.widths = Array.from(this.$el.querySelectorAll('th')).map((e: any) => e.clientWidth)
    },
    customFilterWithColumns(items: any[], search: string) {
      const filterableHeaders = this.computedHeaders.filter(h => !!h.filter)
      if (filterableHeaders.length) {
        items = items.filter(i => filterableHeaders.every(h => h.filter!(getObjectValueByPath(i, h.value), this.search, i)))
      }

      return this.customFilter(items, search)
    },
    customSortWithHeaders(items: any[], sortBy: string[], sortDesc: boolean[], locale: string) {
      const customSorters = this.computedHeaders.reduce((acc: any, header: TableHeader) => {
        if (header.sort) acc[header.value] = header.sort
        return acc
      }, {})
      return this.customSort(items, sortBy, sortDesc, locale, customSorters)
    },
    createItemProps(item: any) {
      const props = VDataIterator.options.methods.createItemProps.call(this, item)

      return Object.assign(props, { headers: this.computedHeaders })
    },
    genCaption(props: DataProps) {
      if (this.caption) return [this.$createElement('caption', [this.caption])]

      return this.genSlots('caption', props)
    },
    genColgroup(props: DataProps) {
      return this.$createElement(
        'colgroup',
        this.computedHeaders.map((header: TableHeader) => {
          let headerWidth = header.width
          if (header.width) {
            if (typeof (header.width) === 'number') {
              headerWidth = `${header.width}px`
            }
          }
          return this.$createElement('col', {
            class: {
              divider: header.divider
            },
            style: {
              width: headerWidth
            }
          })
        })
      )
    },
    genLoading() {
      const progress = this.$slots['progress']
        ? this.$slots.progress
        : this.$createElement(VProgressLinear, {
          props: {
            color: this.loading === true ? 'primary' : this.loading,
            height: 2,
            indeterminate: true
          }
        })

      const th = this.$createElement(
        'th',
        {
          staticClass: 'column',
          attrs: {
            colspan: this.computedHeadersLength
          }
        },
        [progress]
      )

      const tr = this.$createElement(
        'tr',
        {
          staticClass: 'v-data-table__progress'
        },
        [th]
      )

      return this.$createElement('thead', [tr])
    },
    genHeaders(props: DataProps) {
      const data = {
        props: {
          ...this.headerProps,
          headers: this.computedHeaders,
          options: props.options,
          mobile: this.isMobile,
          showGroupBy: this.showGroupBy,
          someItems: this.someItems,
          everyItem: this.everyItem
        },
        on: {
          sort: props.sort,
          group: props.group,
          'toggle-select-all': this.toggleSelectAll
        }
      }

      const children: VNodeChildrenArrayContents = [this.genSlots('header', data)]

      if (!this.hideDefaultHeader) {
        const scopedSlots = getPrefixedScopedSlots('header.column.', this.$scopedSlots)
        children.push(
          this.$createElement(VDataTableHeader, {
            ...data,
            scopedSlots
          })
        )
      }

      if (this.loading) children.push(this.genLoading())

      return children
    },
    genEmptyWrapper(content: VNodeChildrenArrayContents) {
      return this.$createElement('tr', [
        this.$createElement(
          'td',
          {
            attrs: {
              colspan: this.computedHeadersLength
            }
          },
          content
        )
      ])
    },
    genBody(props: DataProps): VNode | string | VNodeChildren {
      const data = {
        ...props,
        headers: this.computedHeaders
      }

      if (this.$scopedSlots.body) {
        return this.$scopedSlots.body!(data)
      }

      return this.$createElement('tbody', [
        this.genSlots('body.prepend', data),
        this.genItems(props),
        this.genSlots('body.append', data)
      ])
    },
    genFooters(props: DataProps) {
      if (!this.hideDefaultFooter && !this.disablePagination) {
        const data = {
          props: {
            options: props.options,
            pagination: props.pagination,
            itemsPerPageText: '$vuetify.dataTable.itemsPerPageText',
            ...this.footerProps
          },
          on: {
            'update:options': (value: any) => props.updateOptions(value)
          },
          widths: this.widths,
          headers: this.computedHeaders
        }
        const children: VNodeChildren = [this.genSlots('footer', data)]
        children.push(this.$createElement(VDataFooter, data))
        return children
      }
    },
    genDefaultScopedSlot(props: DataProps): VNode {
      if (!this.isMobile) {
        const simpleProps = {
          height: this.height,
          fixedHeader: this.fixedHeader,
          hasFixedCols: this.fixedLeftCols > 0 || this.fixedRightCols > 0,
          dense: this.dense,
          isMobile: this.isMobile
        }

        return this.$createElement(
          VSimpleTable,
          {
            props: simpleProps
          },
          [
            this.proxySlot('top', this.genSlots('top', props)),
            this.genCaption(props),
            this.genColgroup(props),
            this.genHeaders(props),
            this.genBody(props),
            this.proxySlot('bottom', this.genFooters(props))
          ]
        )
      } else {
        let items = this.genItems(props)
        let divider = this.$createElement('VDivider')
        let elements = []
        if (items) {
          items.forEach(item => {
            elements.push(item)
            elements.push(divider)
          })
        }
        return this.$createElement('VList', { class: 'v-datatable-mobile' }, elements)
      }
    },
    proxySlot(slot: string, content: VNodeChildren) {
      return this.$createElement('template', { slot }, content)
    }
  },

  render(): VNode {
    return this.$createElement(VData, {
      props: {
        ...this.$props,
        customFilter: this.customFilterWithColumns,
        customSort: this.customSortWithHeaders
      },
      on: {
        'update:options': (v: DataOptions, old: DataOptions) => {
          this.internalGroupBy = v.groupBy || []
          !deepEqual(v, old) && this.$emit('update:options', v)
        },
        'update:page': (v: number) => this.$emit('update:page', v),
        'update:items-per-page': (v: number) => this.$emit('update:items-per-page', v),
        'update:sort-by': (v: string | string[]) => this.$emit('update:sort-by', v),
        'update:sort-desc': (v: boolean | boolean[]) => this.$emit('update:sort-desc', v),
        'update:group-by': (v: string | string[]) => this.$emit('update:group-by', v),
        'update:group-desc': (v: boolean | boolean[]) => this.$emit('update:group-desc', v),
        pagination: (v: DataPaginaton, old: DataPaginaton) => !deepEqual(v, old) && this.$emit('pagination', v),
        'current-items': (v: any[]) => {
          this.internalCurrentItems = v
          this.$emit('current-items', v)
        },
        'page-count': (v: number) => this.$emit('page-count', v),
        'changeScroll': (v: ScrollData) => {
          this.$set(this, 'scrollData', v)
        }
      },
      scopedSlots: {
        default: this.genDefaultScopedSlot as any
      }
    })
  }
})
