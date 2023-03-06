import i18n from "./i18n.vue";

const i18nSteafish = {
  install(Vue, options) {
        // Add $plugin instance method directly to Vue components
        Vue.prototype.$setStringData = (stringData) => {
            Vue.prototype.$stringData = stringData;
        };
        Vue.prototype.$setLanguage = (language_id) => {
            Vue.prototype.$language_id = language_id;
        };
        Vue.prototype.$setAdmin = (admin) => {
            Vue.prototype.$admin = admin;
        };
        Vue.prototype.$setSourceLanguage = (sourceLanguage_id) => {
            Vue.prototype.$sourceLanguage_id=sourceLanguage_id;
        };
        Vue.prototype.$getString = (string_id, category_id, language_id) => {
            return options.getString(string_id, category_id, language_id);
        };
        Vue.prototype.$setString = (string, string_id, category_id, language_id, parent) => {
            options.setString(string, string_id, category_id, language_id, parent);
        };
        Vue.prototype.$getLanguage = () => {
            if(Vue.prototype.$language_id==null){
                Vue.prototype.$language_id = options.getLanguage();
            }
            return Vue.prototype.$language_id;
        };
        Vue.prototype.$getSourceLanguage = () => {
            return Vue.prototype.$sourceLanguage_id=options.getSourceLanguage();
        };
        Vue.prototype.$getMessage = (string_id, language_id, category_id) => {
            let lookUpString = null
            if(string_id!=null && language_id!=null){
                lookUpString = options.getString(string_id, category_id, language_id);
                if(lookUpString===null){
                   options.setString(null, string_id, category_id, language_id);
                }
            }
            return lookUpString;
        };
        Vue.prototype.$t = (string_id, variables, category_id, language_id) => {
            return options.getString(string_id, category_id, language_id);
        };
        Vue.component("i18n", i18n);
    },
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== "undefined" && window.Vue) {
    window.Vue.use(i18nSteafish);
}

export default i18nSteafish;
export { i18n };
