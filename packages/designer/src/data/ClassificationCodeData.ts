import ClassificationCodeDto from '@entity/ClassificationCode'
import ClassificationCode from '@entity/ClassificationCode/ClassificationCode'
import ClassificationCodeItem from '@entity/ClassificationCode/ClassificationCodeItem'

const inputFieldRenderType = new ClassificationCodeDto()
inputFieldRenderType.main = new ClassificationCode()
inputFieldRenderType.main.id = 'D-IFRT'
inputFieldRenderType.main.name = 'Input Field Render Type'
inputFieldRenderType.main.code = 'D-IFRT'
inputFieldRenderType.child = []
const solo = new ClassificationCodeItem()
solo.id = 'D-IFRT-SOLO'
solo.text = 'SOLO'
solo.value = 'solo'
solo.sortNo = 1
solo.treeNo = 1
inputFieldRenderType.child.push(solo)
const box = new ClassificationCodeItem()
box.id = 'D-IFRT-BOX'
box.text = 'BOX'
box.value = 'box'
box.sortNo = 1
box.treeNo = 2
inputFieldRenderType.child.push(box)
const outline = new ClassificationCodeItem()
outline.id = 'D-IFRT-OUTLINE'
outline.text = 'OUTLINE'
outline.value = 'outline'
outline.sortNo = 1
outline.treeNo = 3
inputFieldRenderType.child.push(outline)

const ClassificationCodeData = [
    inputFieldRenderType
]

export default ClassificationCodeData