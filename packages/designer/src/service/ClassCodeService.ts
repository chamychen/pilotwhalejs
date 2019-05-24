import ClassCodeData from '@core/class-code/data'
import ClassCodeDTO from '@core/class-code/model'

import { stringUtils } from 'pilotwhale-utils'

/**
 * 分类码
 */
export default class ClassCodeService {
    /**
     * 获取所有分类码
     */
    static getAllClassCode(): Array<ClassCodeDTO> {
        let privateClassCodeData = ClassCodeData || []
        let systemClassCodeData = []// 待实现
        let all = privateClassCodeData.concat(systemClassCodeData)
        return all
    }

    /**
     * 查询单个分类码
     * @param code 
     */
    static getClassCodeBY(code: string): ClassCodeDTO {
        if (ClassCodeData) {
            let dto = ClassCodeService.getAllClassCode().find(item => stringUtils.compare(item.main.code, code))
            dto.child.sort(i => i.treeNo)
            return dto
        }
    }
}