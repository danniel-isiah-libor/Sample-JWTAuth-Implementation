/**
 * -------------------------------------------------
 * Mixins For Redirect
 * -------------------------------------------------
 */
export default {
  methods: {
    /**
     * Redirect to Path
     *
     * @param String path
     * @return void
     */
    redirectTo (path) {
      this.$router.push({ path: path })
    }
  }
}
