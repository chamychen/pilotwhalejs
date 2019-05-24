import SecurityButton from "../model/SecurityButton"

const ClassCodeData: Array<SecurityButton> = []

let add = new SecurityButton()
add.id = 'sb1'
add.code = 'B-Add'
add.text = 'Add'
add.iconClass = 'add'
ClassCodeData.push(add)

let edit = new SecurityButton()
edit.id = 'sb1'
edit.code = 'B-Edit'
edit.text = 'Edit'
edit.iconClass = 'edit'
ClassCodeData.push(edit)

let del = new SecurityButton()
del.id = 'sb1'
del.code = 'B-Del'
del.text = 'Delete'
del.iconClass = 'delete'
ClassCodeData.push(del)

export default ClassCodeData