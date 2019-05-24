import ElementButtonArea from '@core/element/decorator/ElementButtonArea'

const childTabButtons = {
    child: [
        new ElementButtonArea('child', ['B-Add', 'B-Edit'], 'Operation', 'list'),
        new ElementButtonArea('child', ['B-Del'])
    ]
}


const ClassCodeButtons = {
    childTab: childTabButtons
}
export default ClassCodeButtons
