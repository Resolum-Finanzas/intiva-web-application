/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_AUTH_SIGN_IN: string
  readonly VITE_AUTH_SIGN_UP: string
  readonly VITE_VEHICLES_BASE_PATH: string
  readonly VITE_ANALYTICS_LOAN_SIMULATION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
