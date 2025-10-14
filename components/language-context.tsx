"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useSite } from "./site-context"
import { type TranslationKey, translations } from "@/lib/translations"

type LanguageContextType = {
  language: "en"
  t: (key: TranslationKey) => string
  changeLanguage: (lang: "en") => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { settings, updateSettings } = useSite()
  const language = "en" // Always use English

  const t = (key: TranslationKey): string => {
    return translations.en[key] || key
  }

  const changeLanguage = (lang: "en") => {
    updateSettings({ language: lang })
  }

  return <LanguageContext.Provider value={{ language, t, changeLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
