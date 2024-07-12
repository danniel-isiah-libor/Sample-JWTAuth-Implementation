/**
 * =======================================
 * API Request for Authorization
 * =======================================
 */
import axios from 'axios'
import Config from '@/config/app'
import AuthService from '@/services/auth'

export default {
  baseUrl: Config.services.auth.url,
  
  /**
   * Login Request
   *
   * @param {*} params
   * @return {*} http
   */
  login (params) {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${AuthService.getAccessToken()}`
    }

    return axios.post(`${this.baseUrl}/api/v1/login`, params, { headers })
  },

  /**
   * Logout Request
   *
   * @param {*} params
   * @return {*} http
   */
  logout () {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${AuthService.getAccessToken()}`
    }

    return axios.post(`${this.baseUrl}/api/v1/logout`, {}, { headers })
  }
}
