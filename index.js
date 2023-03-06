import translate from "./translate.vue";
export default {
  install: (app, options) => {
    // Add $plugin instance method directly to Vue components
    app.config.globalProperties.$setStringData = (stringData) => {
      app.config.globalProperties.$stringData = stringData
    }
    app.config.globalProperties.$setLanguage = (language_id) => {
      app.config.globalProperties.$language_id = language_id
    }
    app.config.globalProperties.$setAdmin = (admin) => {
      app.config.globalProperties.$admin = admin
    }
    app.config.globalProperties.$setSourceLanguage = (sourceLanguage_id) => {
      app.config.globalProperties.$sourceLanguage_id = sourceLanguage_id
    }
    app.config.globalProperties.$getString = (string_id, category_id, language_id) => {
      return options.getString(string_id, category_id, language_id)
    }
    app.config.globalProperties.$setString = (string, string_id, category_id, language_id, parent) => {
      options.setString(string, string_id, category_id, language_id, parent)
    }
    app.config.globalProperties.$getLanguage = () => {
      if (app.config.globalProperties.$language_id == null) {
        app.config.globalProperties.$language_id = options.getLanguage()
      }
      return app.config.globalProperties.$language_id
    }
    app.config.globalProperties.$getSourceLanguage = () => {
      return app.config.globalProperties.$sourceLanguage_id = options.getSourceLanguage()
    }
    app.config.globalProperties.$getMessage = (string_id, language_id, category_id) => {
      let lookUpString = null
      if (string_id != null && language_id != null) {
        lookUpString = options.getString(string_id, category_id, language_id)
        if (lookUpString === null) {
          options.setString(null, string_id, category_id, language_id)
        }
      }
      return lookUpString
    }
    app.config.globalProperties.$t = (string_id, variables, category_id, language_id) => {
      return options.getString(string_id, category_id, language_id)
    }
    app.config.globalProperties.$translate = (key) => {
      // retrieve a nested property in `options`
      // using `key` as the path
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
    app.component("translate", translate)
  },
}
