/**
 * =======================================
 * API Request for Authorization
 * =======================================
 */
import api from '@/api/index'
import Config from '@/config/app'

export default {
  baseUrl: Config.services.auth.url,
  endpoint: '/api/v1/user',
  ...api,
  /**
   * Verify Access token of the user
   *
   * @return {*} http
   */
  auth () {
    return this.http(this.baseUrl).post(`${this.endpoint}/auth`)
  },

  /**
   * Change password API call
   *
   */
  changePassword (payload) {
    return this.http(this.baseUrl)
      .put(`${this.endpoint}/change-password`, payload)
  },

  /**
   * Update email request API call
   *
   */
  changeEmailRequest (payload) {
    return this.http(this.baseUrl)
      .post(`${this.endpoint}/change-email`, payload)
  },

  /**
   * Update email with confirmation code API call
   *
   */
  changeEmailConfirm (payload) {
    return this.http(this.baseUrl)
      .post(`${this.endpoint}/change-email/confirm`, payload)
  }
}
