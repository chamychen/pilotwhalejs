const shell = require('shelljs')

let target = process.argv[2]
const alias = {
  docs: 'vuetifyjs.com',
  kitchen: '@vuetify/kitchen'
}
target = alias[target] || target

if (!target) {
  shell.exec('lerna run dev --scope vuetifyx --stream')
} else {
  shell.exec(`lerna run dev --scope ${target} --stream`)
}
