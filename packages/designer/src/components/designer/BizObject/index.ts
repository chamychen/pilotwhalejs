import { Prop, Provide, Component } from 'vue-property-decorator'
import BizObjectLayout from './layout'
import bizObjectButtons from './buttonConfig'
import DesignerRoot from '@components/DesignerRoot'
import bizObjectClassCode from '../../../core/class-code/data/BizObjectClassCode'

@Component({})
export default class BizObjectComponents extends DesignerRoot {
  constructor() {
    super()
    this.layoutEntity = new BizObjectLayout()
    this.buttons = bizObjectButtons
    this.currentValue = { layoutStructureItemList: [], dataColumnList: [] }
  }
}