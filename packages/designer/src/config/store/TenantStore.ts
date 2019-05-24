import TenantService from '@service/TenantService'
import { stringUtils } from 'pilotwhale-utils'


// 系统设置信息
let tenantStore = {
  state: {
    tenantId: '55aa75cf-8abf-4546-bcce-13effc99df65',
    tenant: null
  },
  actions: {
    setTenant(context) {
      if (!stringUtils.isEmpty(context.state.tenantId)) {
        TenantService.getTenant(context.state.tenantId).then(data => {
          context.commit('setTenantM', data)
        })
      }
    }
  },
  mutations: {
    setTenantM: (state, data) => {
      state.tenant = data
    },
    setTenantId: (state, data) => {
      state.tenantId = data
    }
  }
}

export default tenantStore
