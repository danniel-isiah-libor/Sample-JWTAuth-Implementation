import AuthService from '@/services/auth'

/**
 * =======================================
 * Route Guards
 * =======================================
 */
export default {
  /**
   * Route guard for protected endpoints.
   *
   * @param next
   * @return next
   */
  async authorized (to, next) {
    AuthService.requestedPage = to.fullPath

    // Proceed to login page if the user is unauthenticated
    if (!AuthService.isAuthenticated()) {
      AuthService.flush()
      return next({ path: '/login' })
    }

    // Attempt to refresh token if token is expired
    if (AuthService.isAccessTokenExpired()) {
      await AuthService.refreshToken()
        .then(({ data }) => {
          AuthService.setAuth(data)
        })
        .catch(() => {
          AuthService.flush()
          return next({ path: '/login' })
        })
    }

    // If user is authenticated, verify the access token
    AuthService.verifyAccessToken()
      .then(async ({ data }) => {
        AuthService.setUser(data)

        return next()
      })
      .catch(() => {
        AuthService.flush()
        return next({ path: '/login' })
      })
  },

  /**
   * Route Guard for registration endpoint (login, sign-up)
   *
   * @param {*} from
   * @param {*} next
   * @param {*} to
   * @return next
   */
  registration (to, from, next) {
    // Proceed to login page if the user is already authenticated
    if (AuthService.isAuthenticated() && !AuthService.isAccessTokenExpired()) return next({ path: from.path })

    // If user is authenticated, verify the access token
    AuthService.verifyAccessToken()
      .then(({ data }) => {
        AuthService.setUser(data)

        AuthService.refreshToken()
          .then(({ data }) => {
            AuthService.setAuth(data)
            return next({ path: from.path })
          })
          .catch(() => {
            AuthService.flush()
            return next()
          })
      })
      .catch(() => {
        AuthService.flush()
        return next()
      })
  }
}
