import ElementButtonArea from '@core/security-button/model/ElementButtonArea'

const mainTabButtonGroups = [
    new ElementButtonArea('main', ['B-Save', 'B-Submit'], null, null, true),
    new ElementButtonArea('main', ['B-ViewStep', 'B-Agree', 'B-Reject', 'B-Forward', 'B-Revocation'], 'Flow', 'mdi-clipboard-flow', true)
    // new ElementButtonArea('main', ['B-ExportWord'], 'Other', 'mdi-list')
]

const childTabButtonGroups = [
    new ElementButtonArea('child', ['B-Add'], null, null, true),
    new ElementButtonArea('child', ['B-Edit', 'B-Del']),
    new ElementButtonArea('child', ['B-Import', 'B-ExportExcel'], 'more', 'mdi-dots-vertical')
]

const ClassCodeButtonGroups = {
    mainTab: mainTabButtonGroups,
    childTab: childTabButtonGroups
}
export default ClassCodeButtonGroups
