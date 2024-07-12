import axios from 'axios'
import Config from '@/config/app'
import { DateTime } from 'luxon'

/**
 * ===============================================
 * Auth service
 * ===============================================
 *
 * Provides authentication properties and actions
 *
 * ===============================================
 */

export default {
  /**
   * The intended page of the user
   *
   */
  requestedPage: '/',

  /**
   * Formats and stores the auth access in sessionStorage
   *
   * @param data
   */
  setAuth (data) {
    data.expiration_date = DateTime.now().plus({ seconds: data.expires_in }).toISO()

    localStorage.setItem('auth', JSON.stringify(data))
  },

  /**
   * Gets the auth access in sessionStorage.
   *
   * @return * { expiration_date }
   */
  getAuth () {
    return JSON.parse(localStorage.getItem('auth'))
  },

  /**
   * store the user data in sessionStorage
   *
   * @param data
   */
  setUser (data) {
    sessionStorage.setItem('user', JSON.stringify(data))
  },

  /**
   * Gets the user data in sessionStorage.
   *
   * @return {*}
   */
  getUser () {
    return JSON.parse(sessionStorage.getItem('user'))
  },

  /**
   * Verify if authenticated
   *
   * @return bool
   */
  isAuthenticated () {
    return !!this.getAuth()
  },

  /**
   * Gets the access_token from auth.
   *
   * @return string
   */
  getAccessToken () {
    return this.getAuth() ? this.getAuth().access_token : null
  },

  /**
   * Gets the refresh_token from auth.
   *
   * @return string
   */
  getRefreshToken () {
    return this.getAuth() ? this.getAuth().refresh_token : null
  },

  /**
   * Gets the expiration_date from auth.
   *
   */
  getTokenExpiration () {
    return this.getAuth() ? this.getAuth().expiration_date : null
  },

  /**
   * Removes auth and user from sessionStorage.
   *
   */
  flush () {
    localStorage.clear()
    sessionStorage.clear()
  },

  /**
   * Checks if token is expired.
   * An allowance of 1 minute is set
   * to prevent tokens expiring between API calls
   *
   * @return bool
   */
  isAccessTokenExpired () {
    const tokenExpiration = DateTime.fromISO(this.getTokenExpiration())

    return DateTime.now().plus({ minutes: 1 }).equals(tokenExpiration) || DateTime.now().plus({ minutes: 1 }) > tokenExpiration
  },

  /**
   * Checks refresh is allowed
   * An allowance of 1 hour
   *
   * @return bool
   */
  allowRefresh () {
    const tokenExpiration = this.getTokenExpiration()
    const refreshTokenAllowance = DateTime.fromISO(tokenExpiration).plus({ hours: 1 })

    return DateTime.now() < refreshTokenAllowance
  },

  /**
   * Sends an auth check request to Auth API.
   *
   * @return {*} http
   */
  verifyAccessToken () {
    const headers = { Accept: 'application/json' }

    headers.Authorization = `Bearer ${this.getAccessToken()}`

    return axios.get(`${Config.services.auth.url}/api/v1/user/auth`, { headers })
  },

  /**
   * Sends refresh token to Auth API.
   *
   * @return {*} http
   */
  refreshToken () {
    const headers = { Accept: 'application/json' }

    return axios.post(`${Config.services.auth.url}/api/v1/refresh-token`,
      { refresh_token: `${this.getRefreshToken()}` },
      { headers })
  },
}
