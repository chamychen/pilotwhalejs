const ElementPropsTmpl = {
    tab: {
        buttonMinWidth: 80,
        buttonSize: 'small',
        // buttonColor: 'white',
        buttonDark: false,
        buttonStyle: 'raised', // raised|flat|depressed|icon|fab
        // buttonOutline: true,
        buttonRound: false,
        buttonStaticClass: 'mx-1'
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
        smallChips: false
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
        smallChips: true
    },
    multiCombobox: {
        multiple: true,
        clearable: false,
        chips: true,
        deletableChips: true,
        smallChips: true
    }
}

export default ElementPropsTmpl