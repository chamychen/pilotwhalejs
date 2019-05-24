import TenantApi from '@api/TenantApi'

export default class TenantService {
  /**
   *获取系统设定
   *
   * @static
   * @param {string} tenantId
   * @returns
   * @memberof TenantService
   */
  static async getTenant(tenantId) {
    return TenantApi.getTenant(tenantId)
  }
}
