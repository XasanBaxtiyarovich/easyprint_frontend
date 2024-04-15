import { createApp } from 'vue';

import App from './App.vue';
import store from './store';
import router from './router';
import componentsUi from './components/UI';

import '@fortawesome/fontawesome-free/js/all.js';
import '@fortawesome/fontawesome-free/css/all.css';
import '@coreui/coreui/dist/css/coreui.min.css';

import './assets/vendor/css/core.css';
import './assets/vendor/css/theme-default.css'
import './assets/vendor/css/pages/page-auth.css';
import './assets/vendor/libs/apex-charts/apex-charts.css'
import './assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css'
import './assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';

import '@k90mirzaei/vue-toast/dist/index.css'
import { toast } from "@k90mirzaei/vue-toast";

import { defaultLocale, languages } from './lang';
import { createI18n, useI18n } from 'vue-i18n/dist/vue-i18n'

const messages = Object.assign(languages);
const localLang = localStorage.getItem('lang');
const i18n = createI18n({
    legacy: false,
    locale: localLang || defaultLocale,
    fallbackLocale: 'en',
    messages
});

const app = createApp(App, {
    setup() {
        const { t } = useI18n();
        return { t };
    }
});

componentsUi.forEach(componentUi => {
    app.component(componentUi.name, componentUi)
})

app.use(i18n).use(store).use(toast).use(router).mount('#app');
