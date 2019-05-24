import rest from '@config/rest'

export default class TenantApi {
  /**
   *获取系统设定
   *
   * @static
   * @param {string} tenantId
   * @returns
   * @memberof TenantService
   */
  static async getTenant(tenantId) {
    if (tenantId) {
      return null
    } else {
      let tenant = await rest.default.get(`tenant/${tenantId}`)
      return new Promise(resolve => {
        resolve(tenant)
      })
    }
  }
}
