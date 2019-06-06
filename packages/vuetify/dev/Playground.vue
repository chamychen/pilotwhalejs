<template>
  <div>
    <v-btn @click="addRootRow"></v-btn>
    <v-data-table key="test" ref="test" :headers=" h" itemKey="id" :items="currentValue.test" show-select v-model="c" :tableMode='m' showRowNo isTreeGrid :buttonGroups="buttonGroups" :buttons="buttons" :treeListDescribe="treeListDescribe" buttonSize='small' :context="this">
    </v-data-table>
  </div>
</template>

<script>
import {
  TableMode,
  TreeListDescribe
} from '../src/components/VDataTable/mixins/model'
import ElementButtonArea from '../../designer/src/core/security-button/model/ElementButtonArea'
import Button from '../src/mixins/xbutton/Button'
import { guidUtils } from 'pilotwhale-utils'
import TableHandler from './TableHandler'
import TreeListHandler from './TreeListHandler'

export default {
  data: () => ({
    h: [
      {
        text: 'longCode',
        value: 'longCode',
        editor: { props: { elementName: 'VTextField' } }
      },
      {
        text: 'id',
        value: 'id',
        editor: { props: { elementName: 'VTextField' } }
      },
      {
        text: 'name',
        value: 'name',
        editor: { props: { elementName: 'VTextField' } }
      },
      {
        text: 'parentId',
        value: 'parentId',
        editor: { props: { elementName: 'VTextField' } }
      },
      {
        text: 'sortNo',
        value: 'sortNo',
        editor: { props: { elementName: 'VTextField' } }
      },
      {
        text: 'level',
        value: 'level',
        editor: { props: { elementName: 'VTextField' } }
      },
      {
        text: 'leaf',
        value: 'leaf',
        editor: { props: { elementName: 'VCheckbox' } }
      },
      { text: '按钮', value: 'actions' }
    ],
    c: [{ id: '2', key: 'b' }, { id: '3', key: 'c' }],
    m: TableMode.SINGLE_LINE,
    buttonGroups: [
      new ElementButtonArea('actions', ['B-Add', 'B-Edit', 'B-Del'])
    ],
    currentValue: {
      test: []
    },
    treeListDescribe: new TreeListDescribe()
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
    addRootRow(e) {
      let treeListHandler = new TreeListHandler(
        this.currentValue.test,
        this.treeListDescribe
      )
      treeListHandler.add()
      this.$set(this.currentValue, 'test', treeListHandler.data)
    },
    addTestRow(e, key, item, rowIndex) {
      let treeListHandler = new TreeListHandler(
        this.currentValue.test,
        this.treeListDescribe
      )
      treeListHandler.add(item['id'])
      this.$set(this.currentValue, 'test', treeListHandler.data)
    },
    delTestRow(e, key, item, rowIndex) {
      let treeListHandler = new TreeListHandler(
        this.currentValue.test,
        this.treeListDescribe
      )
      treeListHandler.delete(item['id'])
      this.$set(this.currentValue, 'test', treeListHandler.data)
    },
    editTestRow(e, key, item, rowIndex) {
      let tableHandler = new TableHandler(this)
      tableHandler.editRow(key, item)
    }
  }
}
</script>
