/**
 * =======================================
 * API Request for Registration
 * =======================================
 */
import axios from 'axios'
import Config from '@/config/app'

/**
 * Initial config for http request
 *
 * @param String baseURL
 * @return {*} http
 */
const http = (baseUrl) => {
  const http = axios.create({ baseURL: baseUrl })
  http.interceptors.request.use(config => {
    config.headers.Accept = 'application/json'

    return config
  })

  return http
}

export default {
  baseUrl: Config.services.auth.url,
  endpoint: 'api/v1/registration',

  /**
   * Activate Account Request
   *
   * @param {*} params
   * @return {*} http
   */
  activate (params) {
    return http(this.baseUrl).post(`${this.endpoint}/activate-account`, params)
  },

  /**
   * Verify Token Request
   *
   * @param {*} params
   * @return {*} http
   */
  verify (params) {
    return http(this.baseUrl).post(`${this.endpoint}/verify-token`, params)
  }

}
