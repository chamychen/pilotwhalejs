const ElementPropsTmpl = {
    readonly: {
        counter: false,
        readonly: true
    },
    tab: {
        buttonMinWidth: 80,
        buttonSize: 'small',
        // buttonColor: 'white',
        buttonDark: false,
        buttonStyle: 'text', // raised|text|depressed|icon|fab
        // buttonOutline: true,
        buttonRound: false,
        buttonStaticClass: null
    },
    verticalTab: {
        vertical: true
    },
    verticalTextTab: {
        vertical: true,
        verticalText: true
    },
    singleSelect: {
        multiple: false,
        clearable: false,
        chips: false,
        deletableChips: false,
        smallChips: false,
        counter: false
    },
    multiSelect: {
        multiple: true,
        clearable: false,
        chips: true,
        deletableChips: true,
        smallChips: true
    },
    singleCombobox: {
        multiple: true,
        clearable: false,
        chips: true,
        deletableChips: true,
        smallChips: true,
        counter: false
    },
    multiCombobox: {
        multiple: true,
        clearable: false,
        chips: true,
        deletableChips: true,
        smallChips: true
    },
    treeGrid: {
        rowAvgHeight: 48,
        disablePagination: true,
        itemKey: 'id',
        showSelect: true,
        tableMode: 2,
        showRowNo: true,
        isTreeGrid: true,
        buttonSize: 'small',
        singleSelect: false
    },
    grid: {
        rowAvgHeight: 48,
        disablePagination: false,
        itemKey: 'id',
        showSelec: true,
        tableMode: 2,
        showRowNo: true,
        buttonSize: 'small'
    }
}

export default ElementPropsTmpl