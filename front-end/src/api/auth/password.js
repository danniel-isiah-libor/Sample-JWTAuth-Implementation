/**
 * =======================================
 * API Request for Password Reset
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
  
  /**
   * Forgot Password Request
   *
   * @param {*} params
   * @return {*} http
   */
  forgot (params) {
    return http(this.baseUrl).post('/api/v1/forgot-password', params)
  },

  /**
   * Reset Password Request
   *
   * @param {*} params
   * @return {*} http
   */
  reset (params) {
    return http(this.baseUrl).post('/api/v1/reset-password', params)
  },
}
