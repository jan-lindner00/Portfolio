export const i18nConfig = {
  locales: ['en', 'de'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localesToPrerender: ['en', 'de']          
} as const

export type Locale = (typeof i18nConfig)['locales'][number]

export const namespaces = ['common', 'home', 'projects'] as const
export type Namespace = (typeof namespaces)[number]