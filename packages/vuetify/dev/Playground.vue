<template>
  <div>
    <v-btn @click="addRootRow"></v-btn>
    <v-data-table key="test" ref="test" :height="600" :rowAvgHeight="48" disablePagination :headers=" h" itemKey="id" :items="currentValue.test" show-select v-model="c" :tableMode='m' showRowNo isTreeGrid :buttonGroups="buttonGroups" :buttons="buttons" :treeListDescribe="treeListDescribe" buttonSize='small' :context="this" :fixedLeftCols="1" :fixedRightCols="1">
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
      { text: '按钮', value: 'actions', width: 200 }
    ],
    c: [{ id: '2', key: 'b' }, { id: '3', key: 'c' }],
    m: TableMode.SINGLE_LINE,
    buttonGroups: [
      new ElementButtonArea('actions', ['B-Add', 'B-Edit', 'B-Del']),
      new ElementButtonArea('actions', ['B-MoveUp', 'B-MoveDown', 'B-MoveLeft', 'B-MoveRight'], 'move', 'mdi-cursor-move')
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
      let moveUp = new Button()
      moveUp.key = 'B-MoveUp'
      moveUp.text = 'Move Up'
      moveUp.icon = 'mdi-gesture-swipe-up'
      moveUp.color = 'grey'
      moveUp.event = 'moveUp'
      let moveDown = new Button()
      moveDown.key = 'B-MoveDown'
      moveDown.text = 'Move Down'
      moveDown.icon = 'mdi-gesture-swipe-down'
      moveDown.color = 'grey'
      moveDown.event = 'moveDown'
      let moveLeft = new Button()
      moveLeft.key = 'B-MoveLeft'
      moveLeft.text = 'Move Left'
      moveLeft.icon = 'mdi-gesture-swipe-left'
      moveLeft.color = 'grey'
      moveLeft.event = 'moveLeft'
      let moveRight = new Button()
      moveRight.key = 'B-MoveRight'
      moveRight.text = 'Move Right'
      moveRight.icon = 'mdi-gesture-swipe-right'
      moveRight.color = 'grey'
      moveRight.event = 'moveRight'
      return [add, edit, del, moveUp, moveDown, moveLeft, moveRight]
    }
  },
  methods: {
    addRootRow(e) {
      this.$refs.test.addTreeNode()
    },
    addTestRow(e, key, item, rowIndex) {
      this.$refs.test.addTreeNode(item['id'])
    },
    delTestRow(e, key, item, rowIndex) {
      this.$refs.test.deleteTreeNode(item['id'])
    },
    editTestRow(e, key, item, rowIndex) {
      let tableHandler = new TableHandler(this)
      tableHandler.editRow(key, item)
    },
    moveUp(e, key, item, rowIndex) {
      this.$refs.test.moveUp(item)
    },
    moveDown(e, key, item, rowIndex) {
      this.$refs.test.moveDown(item)
    },
    moveLeft(e, key, item, rowIndex) {
      this.$refs.test.moveLeft(item)
    },
    moveRight(e, key, item, rowIndex) {
      this.$refs.test.moveRight(item)
    }
  }
}
</script>
