import ElementTypes from '@core/element/types'
import DesignerDecoratorType from '@core/element/decorator'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import ButtonItem from '@entity/ButtonList/ButtonItem'

export default class ButtonSetterLayout {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { items: ['buttonList'] })
    buttonSetterTabs = null


    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.table, 'buttonSetterTabs', 'buttonTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { model: 'childSelectedItem', itemKey: 'buttonId', tableMode: 2, singleSelect: false, disablePagination: true })
    buttonList: ButtonItem = new ButtonItem()
}