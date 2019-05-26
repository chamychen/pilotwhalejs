import SecurityButton from '../model/SecurityButton'

const ClassCodeData: Array<SecurityButton> = []

let add = new SecurityButton()
add.id = 'sb1'
add.code = 'B-Add'
add.btnName = 'Add'
add.iconClass = 'mdi-plus'
add.color = 'primary'
ClassCodeData.push(add)

let edit = new SecurityButton()
edit.id = 'sb2'
edit.code = 'B-Edit'
edit.btnName = 'Edit'
edit.iconClass = 'mdi-pencil'
edit.color = 'warning'
ClassCodeData.push(edit)

let del = new SecurityButton()
del.id = 'sb3'
del.code = 'B-Del'
del.btnName = 'Delete'
del.iconClass = 'mdi-delete'
del.color = 'error'
ClassCodeData.push(del)

let importData = new SecurityButton()
importData.id = 'sb4'
importData.code = 'B-Import'
importData.btnName = 'Import'
importData.iconClass = 'mdi-file-import'
importData.color = 'primary'
ClassCodeData.push(importData)

let exportExcel = new SecurityButton()
exportExcel.id = 'sb5'
exportExcel.code = 'B-ExportExcel'
exportExcel.btnName = 'Export Excel'
exportExcel.iconClass = 'mdi-file-excel'
exportExcel.color = 'success'
ClassCodeData.push(exportExcel)

let exportWord = new SecurityButton()
exportWord.id = 'sb6'
exportWord.code = 'B-ExportWord'
exportWord.btnName = 'Export'
exportWord.iconClass = 'mdi-file-word'
exportWord.title = 'Export Word'
exportWord.color = 'success'
ClassCodeData.push(exportWord)

let exportProject = new SecurityButton()
exportProject.id = 'sb7'
exportProject.code = 'B-ExportProject'
exportProject.btnName = 'Export Project'
exportProject.iconClass = 'mdi-chart-gantt'
exportProject.color = 'success'
ClassCodeData.push(exportProject)

let save = new SecurityButton()
save.id = 'sb8'
save.code = 'B-Save'
save.btnName = 'Save'
save.iconClass = 'mdi-content-save'
save.color = 'primary'
ClassCodeData.push(save)

let submit = new SecurityButton()
submit.id = 'sb9'
submit.code = 'B-Submit'
submit.btnName = 'Submit'
submit.iconClass = 'repeat'
submit.color = 'success'
ClassCodeData.push(submit)

let revocation = new SecurityButton()
revocation.id = 'sb10'
revocation.code = 'B-Revocation'
revocation.btnName = 'Revocation'
revocation.iconClass = 'mdi-repeat-off'
revocation.color = 'warning'
ClassCodeData.push(revocation)

let agree = new SecurityButton()
agree.id = 'sb11'
agree.code = 'B-Agree'
agree.btnName = 'Agree'
agree.iconClass = 'mdi-check-bold'
agree.color = 'success'
ClassCodeData.push(agree)

let reject = new SecurityButton()
reject.id = 'sb12'
reject.code = 'B-Reject'
reject.btnName = 'Reject'
reject.iconClass = 'mdi-close'
reject.color = 'error'
ClassCodeData.push(reject)

let forward = new SecurityButton()
forward.id = 'sb13'
forward.code = 'B-Forward'
forward.btnName = 'Forward'
forward.iconClass = 'mdi-arrow-right-circle'
forward.color = 'primary'
ClassCodeData.push(forward)

let viewStep = new SecurityButton()
viewStep.id = 'sb14'
viewStep.code = 'B-ViewStep'
viewStep.btnName = 'View Step'
viewStep.iconClass = 'mdi-eye'
viewStep.color = 'primary'
ClassCodeData.push(viewStep)

export default ClassCodeData