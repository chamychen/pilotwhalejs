export default class ElementFilter {
    include: Array<string>
    exclude: Array<string>

    /**
     * 
     * @param typeNames 要过滤的elementTypeName
     * @param filterType 1表示包含2表示排除
     */
    constructor(typeNames: Array<string>, filterType: number) {
        if (!typeNames || typeNames.length === 0) {
            throw new Error('ElementFilter constructor typeNames property cannot be empty')
        } else {
            switch (filterType) {
                case 1:
                    this.include = typeNames
                    break
                case 2:
                    this.exclude = typeNames
                    break
            }
        }
    }
}