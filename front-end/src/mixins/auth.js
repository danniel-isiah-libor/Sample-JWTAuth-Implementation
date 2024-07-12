/**
 * -------------------------------------------------
 * Mixins For Auth
 * -------------------------------------------------
 *
 * All form validation must be in "rules" property
 *
 */

import AuthService from '@/services/auth'
import AuthRequest from '@/api/auth/auth'
import ApiValidator from '@/mixins/api-validator'
import UserRequest from '@/api/auth/user'
import Redirect from '@/mixins/redirect'

export default {
  mixins: [ApiValidator, Redirect],
  data () {
    return {
      redirectPage: '/',
      loading: false
    }
  },
  computed: {
    /**
     * Is not authenticated user
     *
     * @return bool
     */
    guest () {
      return !AuthService.isAuthenticated()
    },
    /**
     * Is Authenticated User
     *
     * @return bool
     */
    authenticated () {
      return AuthService.isAuthenticated()
    },
    /**
     * Auth User
     *
     * @return {*}
     */
    user () {
      return AuthService.getUser()
    }
  },
  methods: {
    /**
     * Logout the user
     *
     * @return void
     */
    logout () {
      this.loading = true

      AuthRequest.logout()
        .finally(() => {
          this.loading = false
          AuthService.requestedPage = '/'
          AuthService.flush()
          window.location.replace(`${window.location.origin}/login`)
        })
    },
    /**
     * Action Login
     *
     * @return void
     */
    login () {
      this.loading = true

      AuthRequest
        .login({
          username: this.username,
          password: this.password,
          remember_me: this.rememberMe
        })
        .then(({ data }) => {
          AuthService.setAuth(data)

          UserRequest.auth()
            .then(({ data }) => AuthService.setUser(data))
        })
        .finally(() => {
          this.loading = false
        })
    },
  }
}
