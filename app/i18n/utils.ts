import type { Locale, Namespace } from './config'

// Translation file cache (avoid repeated reads)
const translationsCache = new Map<string, any>()

/**
 * Load translation files for specified language
 *
 * @param locale Language code like 'en', 'zh-CN'
 * @param namespaces Translation namespace array like ['common', 'home']
 * @returns Translation object { common: {...}, home: {...} }
 */
export async function loadTranslations(
  locale: Locale,
  namespaces: Namespace[]
) {
  const translations: Record<string, any> = {}

  for (const namespace of namespaces) {
    const cacheKey = `${locale}-${namespace}`

    if (!translationsCache.has(cacheKey)) {
      try {
        const translation = await import(
          `@/app/i18n/locales/${locale}/${namespace}.json`
        )
        translationsCache.set(cacheKey, translation.default)
      } catch (error) {
        console.warn(`Translation file not found: ${locale}/${namespace}.json`)
        translationsCache.set(cacheKey, {})
      }
    }

    translations[namespace] = translationsCache.get(cacheKey)
  }

  return translations
}

/**
 * Create type-safe translation function
 *
 * Usage:
 * const t = createTranslator(translations)
 * t('common.nav.home')
 * t('home.welcome', { name: 'John' }) // Supports variable replacement
 */
export function createTranslator(translations: any) {
  return (key: string, params?: Record<string, string>) => {
    const keys = key.split('.')
    let value = translations

    // Access nested properties layer by layer
    for (const k of keys) {
      value = value?.[k]
    }

    // Return key itself when translation not found (useful for debugging)
    if (!value) {
      console.warn(`Translation missing: ${key}`)
      return key
    }

    // Support variable replacement: replace {{name}} with actual value
    if (params) {
      return Object.entries(params).reduce(
        (str, [key, val]) => str.replace(`{{${key}}}`, val),
        value
      )
    }

    return value
  }
}