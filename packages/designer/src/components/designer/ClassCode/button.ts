import SecurityButton from '@core/security-button/model/SecurityButton'

const ClassCodeButtons: Array<SecurityButton> = []

let add = new SecurityButton()
add.key = 'B-Add'
add.text = 'Add'
add.icon = 'mdi-plus'
add.color = 'primary'
add.event = 'addChild'
ClassCodeButtons.push(add)

let edit = new SecurityButton()
edit.key = 'B-Edit'
edit.text = 'Edit'
edit.icon = 'mdi-pencil'
edit.color = 'warning'
ClassCodeButtons.push(edit)

let del = new SecurityButton()
del.key = 'B-Del'
del.text = 'Delete'
del.icon = 'mdi-delete'
del.color = 'error'
ClassCodeButtons.push(del)

let importData = new SecurityButton()
importData.key = 'B-Import'
importData.text = 'Import'
importData.icon = 'mdi-file-import'
importData.color = 'primary'
ClassCodeButtons.push(importData)

let exportExcel = new SecurityButton()
exportExcel.key = 'B-ExportExcel'
exportExcel.text = 'Export Excel'
exportExcel.icon = 'mdi-file-excel'
exportExcel.color = 'success'
ClassCodeButtons.push(exportExcel)

let exportWord = new SecurityButton()
exportWord.key = 'B-ExportWord'
exportWord.text = 'Export'
exportWord.icon = 'mdi-file-word'
exportWord.tips = 'Export Word'
exportWord.color = 'success'
ClassCodeButtons.push(exportWord)

let exportProject = new SecurityButton()
exportProject.key = 'B-ExportProject'
exportProject.text = 'Export Project'
exportProject.icon = 'mdi-chart-gantt'
exportProject.color = 'success'
ClassCodeButtons.push(exportProject)

let save = new SecurityButton()
save.key = 'B-Save'
save.text = 'Save'
save.icon = 'mdi-content-save'
save.color = 'primary'
ClassCodeButtons.push(save)

let submit = new SecurityButton()
submit.key = 'B-Submit'
submit.text = 'Submit'
submit.icon = 'repeat'
submit.color = 'success'
ClassCodeButtons.push(submit)

let revocation = new SecurityButton()
revocation.key = 'B-Revocation'
revocation.text = 'Revocation'
revocation.icon = 'mdi-repeat-off'
revocation.color = 'warning'
ClassCodeButtons.push(revocation)

let agree = new SecurityButton()
agree.key = 'B-Agree'
agree.text = 'Agree'
agree.icon = 'mdi-check-bold'
agree.color = 'success'
ClassCodeButtons.push(agree)

let reject = new SecurityButton()
reject.key = 'B-Reject'
reject.text = 'Reject'
reject.icon = 'mdi-close'
reject.color = 'error'
ClassCodeButtons.push(reject)

let forward = new SecurityButton()
forward.key = 'B-Forward'
forward.text = 'Forward'
forward.icon = 'mdi-arrow-right-circle'
forward.color = 'primary'
ClassCodeButtons.push(forward)

let viewStep = new SecurityButton()
viewStep.key = 'B-ViewStep'
viewStep.text = 'View Step'
viewStep.icon = 'mdi-eye'
viewStep.color = 'primary'
ClassCodeButtons.push(viewStep)

export default ClassCodeButtons