"use client"

import { useMemo } from "react"
import { type TranslationKey, translations } from "./translations"

export function useTranslations() {
  // Always use English
  const language = "en"

  const t = useMemo(() => (key: TranslationKey): string => {
    return translations[language][key] || key
  }, [language])

  return { t, language }
}
