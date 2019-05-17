import ClassificationCodeDto from '@entity/ClassificationCode'
import ClassificationCodeData from '@data/ClassificationCodeData'
import { stringUtils } from 'pilotwhale-utils'

/**
 * 分类码
 */
export default class ClassificationCodeService {
    /**
     * 获取所有分类码
     */
    static getAllClassificationCode(): Array<ClassificationCodeDto> {
        let privateClassificationCodeData = ClassificationCodeData || []
        let systemClassificationCodeData = []// 待实现
        let all = privateClassificationCodeData.concat(systemClassificationCodeData)
        return all
    }

    /**
     * 查询单个分类码
     * @param code 
     */
    static getClassificationCodeBY(code: string): ClassificationCodeDto {
        if (ClassificationCodeData) {
            let dto = ClassificationCodeService.getAllClassificationCode().find(item => stringUtils.compare(item.main.code, code))
            dto.child.sort(i => i.treeNo)
            return dto
        }
    }
}