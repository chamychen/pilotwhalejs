import SecurityButton from '../model/SecurityButton'

const ClassCodeData: Array<SecurityButton> = []

let add = new SecurityButton()
add.id = 'sb1'
add.code = 'B-Add'
add.btnName = 'Add'
add.iconClass = 'add'
add.color = 'primary'
ClassCodeData.push(add)

let edit = new SecurityButton()
edit.id = 'sb2'
edit.code = 'B-Edit'
edit.btnName = 'Edit'
edit.iconClass = 'edit'
edit.color = 'warning'
ClassCodeData.push(edit)

let del = new SecurityButton()
del.id = 'sb3'
del.code = 'B-Del'
del.btnName = 'Delete'
del.iconClass = 'delete'
del.color = 'error'
ClassCodeData.push(del)

export default ClassCodeData