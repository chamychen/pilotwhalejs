import ClassCodeDTO from '@core/class-code/model'
import DesignerClassCode from './DesignerClassCode'
import BizObjectClassCode from './BizObjectClassCode'


const ClassCodeData: Array<ClassCodeDTO> = [
    ...DesignerClassCode, ...BizObjectClassCode
]

export default ClassCodeData