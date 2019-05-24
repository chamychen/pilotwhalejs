enum ListItemType {
    AVATAR = 'v-list-item-avatar',
    CONTENT = 'v-list-item-content',
    CONTENT_TITLE = 'v-list-item-title',
    CONTENT_SUB_TITLE = 'v-list-item-subtitle',
    ICON = 'v-list-item-icon',
    ACTION_TEXT = 'v-list-item-action-text',
    ACTION_ICON = 'v-icon'
}

class ListItemData {
    subheader: string

    divider: boolean

    dividerInset: boolean
}

class ListItemEntity {
    subheader: string

    /**
     *<v-list-item-group v-model="selected" multiple active-class="pink--text">
     *
     * @type {string}
     * @memberof ListEntity
     */
    isGroup: string

    /**
     *listItemTypes中的每一项对应listData中的每一列
     *listItemTypes按数组中的先后顺序进行渲染
     * @type {Array<ListItemType>}
     * @memberof ListEntity
     */
    listItemTypes: Array<ListItemType>

    listData: Array<any>
}