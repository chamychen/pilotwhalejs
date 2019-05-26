import ClassCodeDTO from '@core/class-code/model'
import ClassCode from '@core/class-code/model/ClassCode'
import ClassCodeItem from '@core/class-code/model/ClassCodeItem'

const DesignerClassCode = [
]

// input控件显示类型
const inputFieldRenderType = new ClassCodeDTO()
inputFieldRenderType.main = new ClassCode()
inputFieldRenderType.main.id = 'D-IFRT'
inputFieldRenderType.main.name = 'Input Field Render Type'
inputFieldRenderType.main.code = 'D-IFRT'
inputFieldRenderType.child = []
const solo = new ClassCodeItem()
solo.id = 'D-IFRT-SOLO'
solo.text = 'SOLO'
solo.value = 'solo'
solo.sortNo = 1
solo.treeNo = 1
inputFieldRenderType.child.push(solo)
const box = new ClassCodeItem()
box.id = 'D-IFRT-BOX'
box.text = 'BOX'
box.value = 'box'
box.sortNo = 1
box.treeNo = 2
inputFieldRenderType.child.push(box)
const outline = new ClassCodeItem()
outline.id = 'D-IFRT-OUTLINE'
outline.text = 'OUTLINE'
outline.value = 'outline'
outline.sortNo = 1
outline.treeNo = 3
inputFieldRenderType.child.push(outline)
DesignerClassCode.push(inputFieldRenderType)

// Button属性sizes
const buttonPropSizes = new ClassCodeDTO()
buttonPropSizes.main = new ClassCode()
buttonPropSizes.main.id = 'D-BPS'
buttonPropSizes.main.name = 'Button prop sizes '
buttonPropSizes.main.code = 'D-BPS'
buttonPropSizes.child = []
const xsmall = new ClassCodeItem()
xsmall.id = 'D-BPS-XSmall'
xsmall.text = 'x-small'
xsmall.value = 'x-small'
xsmall.sortNo = 1
xsmall.treeNo = 1
buttonPropSizes.child.push(xsmall)
const small = new ClassCodeItem()
small.id = 'D-BPS-Small'
small.text = 'small'
small.value = 'small'
small.sortNo = 2
small.treeNo = 2
buttonPropSizes.child.push(small)
const medium = new ClassCodeItem()
medium.id = 'D-BPS-Medium'
medium.text = 'medium'
medium.value = 'medium'
medium.sortNo = 3
medium.treeNo = 3
buttonPropSizes.child.push(medium)
const large = new ClassCodeItem()
large.id = 'D-BPS-Large'
large.text = 'large'
large.value = 'large'
large.sortNo = 4
large.treeNo = 4
buttonPropSizes.child.push(large)
const xlarge = new ClassCodeItem()
xlarge.id = 'D-BPS-XLarge'
xlarge.text = 'x-large'
xlarge.value = 'x-large'
xlarge.sortNo = 5
xlarge.treeNo = 5
buttonPropSizes.child.push(xlarge)
DesignerClassCode.push(buttonPropSizes)

const buttonStyle = new ClassCodeDTO()
buttonStyle.main = new ClassCode()
buttonStyle.main.id = 'D-BS'
buttonStyle.main.name = 'Button style'
buttonStyle.main.code = 'D-BS'
buttonStyle.child = []
// 默认样式(边框加阴影)
const raised = new ClassCodeItem()
raised.id = 'D-BS-Raised'
raised.text = 'raised'
raised.value = null
raised.sortNo = 1
raised.treeNo = 1
buttonStyle.child.push(raised)
// 无边框
const flat = new ClassCodeItem()
flat.id = 'D-BS-Flat'
flat.text = 'flat'
flat.value = 'flat'
flat.sortNo = 2
flat.treeNo = 2
buttonStyle.child.push(flat)
// 边框无阴影
const depressed = new ClassCodeItem()
depressed.id = 'D-BS-Depressed '
depressed.text = 'depressed'
depressed.value = 'depressed'
depressed.sortNo = 3
depressed.treeNo = 3
buttonStyle.child.push(depressed)
// 仅显示为图标
const icon = new ClassCodeItem()
icon.id = 'D-BS-Icon '
icon.text = 'icon'
icon.value = 'icon'
icon.sortNo = 4
icon.treeNo = 4
buttonStyle.child.push(icon)
// 仅显示为圆形图标
const fabIcon = new ClassCodeItem()
icon.id = 'D-BS-Fabicon '
icon.text = 'fab icon'
icon.value = 'fab'
icon.sortNo = 5
icon.treeNo = 5
buttonStyle.child.push(icon)
DesignerClassCode.push(buttonStyle)

export default DesignerClassCode