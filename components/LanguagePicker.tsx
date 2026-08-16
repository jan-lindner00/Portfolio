// components/LanguageSwitcher.tsx
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { i18nConfig } from '@/app/i18n/config'
import type { Locale } from '@/app/i18n/config'

// Language display name mapping
const localeNames: Record<Locale, string> = {
  'en': 'English',
  'de': 'Deutsch',
}

export function LanguagePicker({ currentLocale, t }: { currentLocale: Locale, t:  string }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLocaleChange = (newLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`

    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    router.push(newPathname)
  }

  return (
    <div className="relative order-last md:order-first">
      <select
        value={currentLocale}
        aria-label={t}
        onChange={(e) => handleLocaleChange(e.target.value as Locale)}
        className="px-4 py-2 font-inherit border rounded-lg"
      >
        {i18nConfig.locales.map((locale) => (
          <option className="font-inherit" key={locale} value={locale}>
            {localeNames[locale]}
          </option>
        ))}
      </select>
    </div>
  )
}