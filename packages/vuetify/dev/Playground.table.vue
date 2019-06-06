<template>
  <div>
    <v-data-table key="test" ref="test" :headers=" h" itemKey="id" :items="currentValue.test" show-select v-model="c" :tableMode='m' showRowNo :buttonGroups="buttonGroups" :buttons="buttons" buttonSize='small' :context="this">
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { TableMode } from '../src/components/VDataTable/mixins/model'
import ElementButtonArea from '../../designer/src/core/security-button/model/ElementButtonArea'
import Button from '../src/mixins/xbutton/Button'
import { guidUtils } from 'pilotwhale-utils'
import TableHandler from './TableHandler'

export default {
  data: () => ({
    h: [
      {
        text: 'fieldList_key',
        value: 'key',
        editor: { props: { elementName: 'VTextField' } }
      },
      { text: '按钮', value: 'actions' }
    ],
    c: [{ id: '2', key: 'b' }, { id: '3', key: 'c' }],
    m: TableMode.SINGLE_LINE,
    buttonGroups: [
      new ElementButtonArea('actions', ['B-Add', 'B-Edit', 'B-Del'])
    ],
    currentValue: {
      test: [
        { id: '1', key: 'a' },
        { id: '2', key: 'b' },
        { id: '3', key: 'c' }
      ]
    }
  }),
  computed: {
    buttons() {
      let add = new Button()
      add.key = 'B-Add'
      add.text = 'Add'
      add.icon = 'mdi-plus'
      add.color = 'primary'
      add.event = 'addTestRow'
      let edit = new Button()
      edit.key = 'B-Edit'
      edit.text = 'Edit'
      edit.icon = 'mdi-pencil'
      edit.color = 'warning'
      edit.event = 'editTestRow'
      let del = new Button()
      del.key = 'B-Del'
      del.text = 'Delete'
      del.icon = 'mdi-delete'
      del.color = 'error'
      del.event = 'delTestRow'
      return [add, edit, del]
    }
  },
  methods: {
    addTestRow(e: any, key: string, item: any, rowIndex: number) {
      let tableHandler = new TableHandler(this)
      tableHandler.addTableRow(key)
    },
    delTestRow(e: any, key: string, item: any, rowIndex: number) {
      let tableHandler = new TableHandler(this)
      tableHandler.delTableRowByItem(key, item)
    },
    editTestRow(e: any, key: string, item: any, rowIndex: number) {
      let tableHandler = new TableHandler(this)
      tableHandler.editRow(key, item)
    }
  }
}
</script>