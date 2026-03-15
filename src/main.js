import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      darkTheme: {
        dark: true,
        colors: {
          primary: '#00C853',
          secondary: '#1DE9B6',
          background: '#0F1923',
          surface: '#162232',
          'surface-variant': '#1E3248',
          error: '#EF5350',
          warning: '#FFA726',
          info: '#29B6F6',
          success: '#66BB6A',
        },
      },
    },
  },
})

createApp(App).use(vuetify).mount('#app')
