import ElementButtonArea from '@core/security-button/model/ElementButtonArea'

const mainTabButtons = [
    new ElementButtonArea('main', ['B-Save', 'B-Submit']),
    new ElementButtonArea('main', ['B-ViewStep', 'B-Agree', 'B-Reject', 'B-Forward', 'B-Revocation'], 'Flow', 'mdi-clipboard-flow', true)
    // new ElementButtonArea('main', ['B-ExportWord'], 'Other', 'mdi-list')
]

const childTabButtons = [
    new ElementButtonArea('child', ['B-Add', 'B-Edit', 'B-Del']),
    new ElementButtonArea('child', ['B-Import', 'B-ExportExcel'], 'more', 'mdi-dots-vertical')
]





const ClassCodeButtons = {
    mainTab: mainTabButtons,
    childTab: childTabButtons
}
export default ClassCodeButtons
