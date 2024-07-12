export default {
  /**
   * Services Configuration
   */
  services: {
    /**
     * ===========================================
     * Auth Service Configuration
     * ===========================================
     *
     */
    auth: {
      url: process.env.VUE_APP_AUTH_URL
    },
    /**
     * ============================================
     * Blog Service Configuration
     * ============================================
     *
     */
    blog: {
      url: process.env.VUE_APP_BLOG_URL
    }
  },
}
