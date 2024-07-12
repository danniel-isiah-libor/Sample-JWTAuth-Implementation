/**
 * =====================================
 * API Request for Signup
 * =====================================
 */
import axios from 'axios'
import Config from '@/config/app'
import lang from '@/services/lang'

const locale = lang.get() ? lang.get().value : null

/**
 * Initial config for http request
 *
 * @param String baseUrl
 * @return {*} http
 */
const http = (baseUrl) => {
  const http = axios.create({ baseURL: baseUrl, withCredentials: true })
  http.interceptors.request.use(async config => {
    config.headers.Accept = 'application/json'
    config.headers['Accept-Language'] = locale

    return config
  })

  return http
}

export default {
  baseUrl: Config.services.auth.url,
  endpoint: '/api/v1/signup',

  /**
   * Signup request
   *
   * @param {*} params
   * @return {*} http
   */
  signup (params) {
    return http(this.baseUrl).post(this.endpoint, params)
  }

}
