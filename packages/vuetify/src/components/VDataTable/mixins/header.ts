import { VDataTable } from '../'
import { DataOptions } from '../../VData/VData'
import VIcon from '../../VIcon'
import VSimpleCheckbox from '../../VCheckbox/VSimpleCheckbox'

import Vue, { PropType } from 'vue'
import mixins from '../../../util/mixins'
import { compareFn } from '../../../util/helpers'


export interface TableHeader {
  text: string
  value: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  divider?: boolean
  class?: string | string[]
  width?: string | number
  filter?: (value: any, search: string, item: any) => boolean
  sort?: compareFn
  fixedStyle?: string
  editor?: any
  mobileHidden?: boolean
}

type VDataTableInstance = InstanceType<typeof VDataTable>

interface options extends Vue {
  dataTable: VDataTableInstance
}

export default mixins<options>().extend({
  props: {
    headers: {
      type: Array as PropType<TableHeader[]>,
      required: true
    },
    options: {
      type: Object as PropType<DataOptions>,
      default: () => ({
        page: 1,
        itemsPerPage: 10,
        sortBy: [],
        sortDesc: [],
        groupBy: [],
        groupDesc: [],
        multiSort: false,
        mustSort: false
      })
    },
    sortIcon: {
      type: String,
      default: '$vuetify.icons.sort'
    },
    everyItem: Boolean,
    someItems: Boolean,
    showGroupBy: Boolean
  },

  methods: {
    genSelectAll() {
      const data = {
        props: {
          value: this.everyItem,
          indeterminate: !this.everyItem && this.someItems
        },
        on: {
          input: (v: boolean) => this.$emit('toggle-select-all', v)
        }
      }

      if (this.$scopedSlots['data-table-select']) {
        return this.$scopedSlots['data-table-select']!(data)
      }

      return this.$createElement(VSimpleCheckbox, {
        staticClass: 'v-data-table__checkbox',
        ...data
      })
    },
    genSortIcon() {
      return this.$createElement(VIcon, [this.sortIcon])
    }
  }
})
