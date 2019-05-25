import ElementButtonArea from '@core/security-button/model/ElementButtonArea'

const childTabButtons = [
    new ElementButtonArea('child', ['B-Add', 'B-Edit'], 'Operation', 'list'),
    new ElementButtonArea('child', ['B-Del', 'B-Add', 'B-Edit'])
]

const mainTabButtons = [
    new ElementButtonArea('main', ['B-Add', 'B-Edit'], 'Operation', 'list'),
    new ElementButtonArea('main', ['B-Del'])
]



const ClassCodeButtons = {
    mainTab: mainTabButtons,
    childTab: childTabButtons
}
export default ClassCodeButtons
