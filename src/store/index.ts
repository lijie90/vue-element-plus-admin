import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()

store.use(piniaPluginPersistedstate)
console.log

export const setupStore = (app: App<Element>) => {
  app.use(store)
}

export { store }
