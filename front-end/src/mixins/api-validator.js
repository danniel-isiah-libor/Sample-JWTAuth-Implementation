/**
 * -------------------------------------------------
 * Mixins For API Error Handler
 * -------------------------------------------------
 *
 *
 */
export default {
  data () {
    return {
      rules: {
        status: null,
        messages: []
      }
    }
  },
  methods: {
    /**
     * Handle Api Errors
     * Set rules status to INVALID
     * Map http errors in rules.messages property
     *
     * @param array errors
     * @return void
     */
    handleApiErrors (errors) {
      this.rules.status = 'INVALID'
      errors = JSON.parse(JSON.stringify(errors))
      for (const key in errors) {
        const messages = errors[key]
        for (const index in messages) {
          this.$set(this.rules.messages, key, messages[index])
        }
      }
    },
    /**
     * Reset Error Validations
     *
     * @return void
     */
    resetFormValidations () {
      this.rules.status = null
      this.rules.messages = []
    }
  }
}
