"use client"

import { Button } from "@/components/ui/button"
import PromotionalBanner from "@/components/promotional-banner"
import { useCharacters } from "@/components/character-context"
import { useState, useEffect, Suspense } from "react"
import { ArrowRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { CharacterGrid } from "@/components/character-grid"
import { CompanionExperienceSection } from "@/components/companion-experience-section"
import { FAQSection } from "@/components/faq-section"
import Link from "next/link"
import { useTranslations } from "@/lib/use-translations"
import LandingDisclaimerModal from "@/components/landing-disclaimer-modal"
import { CONSENT_VERSION, POLICY_VERSION, CONSENT_STORAGE_KEY } from "@/lib/consent-config"
import { useConsent } from "@/components/use-consent"

export default function Home() {
  const { characters, isLoading } = useCharacters()
  const { t } = useTranslations()
  const { consent, isLoaded, updateConsent } = useConsent()

  // Filter characters based on the active type (case-insensitive)
  const { activeType } = useCharacters()
  const filteredCharacters = characters.filter((char) => {
    if (activeType === "All") return true
    // Convert both to lowercase for case-insensitive comparison
    const charCategory = (char.category || "").toLowerCase()
    const activeTypeLC = activeType.toLowerCase()
    return charCategory.includes(activeTypeLC)
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [lang, setLang] = useState("en") // or "en" based on user preference

  // Check if consent modal should be shown based on centralized consent state
  useEffect(() => {
    if (!isLoaded) return
    
    const consentVersion = consent?.version
    const consentPolicyVersion = consent?.policyVersion
    
    if (!consent || consentVersion !== CONSENT_VERSION || consentPolicyVersion !== POLICY_VERSION) {
      // No consent or outdated version -> show modal
      setModalOpen(true)
    } else {
      // Valid consent exists -> hide modal
      setModalOpen(false)
    }
  }, [isLoaded, consent?.version, consent?.policyVersion, consent?.timestamp])

  const handleConfirm = (prefs: {analytics: boolean; marketing: boolean}) => {
    updateConsent(prefs)
    setModalOpen(false)
  }
  const handleCookieSettings = () => { setModalOpen(true) }

  return (
    <div className="bg-background">
      {/* Content Area */}
      <main>
  {/* Featured Promotional Banner */}
        <PromotionalBanner />

        <div className="mt-6 mb-4 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold">
            <span className="text-primary">{t("general.explore")}</span>
          </h2>
        </div>

        <div className="space-y-4">
          <Suspense fallback={<div>Loading characters...</div>}>
            <CharacterGrid characters={filteredCharacters || []} />
          </Suspense>
        </div>

        {/* Add the FAQ Section */}
        <FAQSection />

        {/* Add the Companion Experience Section */}
        <CompanionExperienceSection />

        {/* Anchor sections moved to bottom just before footer for better layout */}
        <section id="how-it-works" className="mx-auto max-w-5xl px-4 md:px-6 py-20 border-t border-border scroll-mt-24">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Create an account, explore characters or generate your own. Start chatting right away – conversations evolve dynamically and your AI remembers preferences when you return.</p>
          <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
            <li>Sign up or log in.</li>
            <li>Choose or create an AI character.</li>
            <li>Chat, generate images or request voice/video.</li>
            <li>Save favorites and customize personality.</li>
            <li>Upgrade for unlimited and faster interactions.</li>
          </ol>
        </section>
        <section id="roadmap" className="mx-auto max-w-5xl px-4 md:px-6 py-20 border-t border-border scroll-mt-24">
          <h2 className="text-3xl font-bold mb-4">Roadmap</h2>
            <ul className="space-y-3 text-sm md:text-base text-muted-foreground">
              <li><span className="font-medium text-foreground">Q1:</span> Enhanced voice chat & adaptive memory.</li>
              <li><span className="font-medium text-foreground">Q2:</span> Video avatar rendering & improved moderation.</li>
              <li><span className="font-medium text-foreground">Q3:</span> Real-time multi-party chat & mobile apps.</li>
              <li><span className="font-medium text-foreground">Q4:</span> Offline mode and private edge inference.</li>
            </ul>
        </section>
        <section id="guide" className="mx-auto max-w-5xl px-4 md:px-6 py-20 border-t border-border scroll-mt-24">
          <h2 className="text-3xl font-bold mb-4">Guide</h2>
          <p className="text-muted-foreground mb-4">Quick start for new users. Here's how to get the most out of the platform:</p>
          <div className="grid md:grid-cols-2 gap-6 text-sm md:text-base">
            <div>
              <h3 className="font-semibold mb-2">Chat Smart</h3>
              <p>Be specific in your requests. Ask for style, tone or scenario for more accurate responses.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Safe Interactions</h3>
              <p>Report inappropriate content. Our filters protect but feedback improves everything.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Generate Images</h3>
              <p>Use short clear phrases. Combine attributes ("soft lighting", "portrait", "anime style").</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Personalize</h3>
              <p>Adjust personality and background to improve dialogue consistency over time.</p>
            </div>
          </div>
        </section>
        <section id="complaints" className="mx-auto max-w-5xl px-4 md:px-6 py-20 border-t border-border scroll-mt-24">
          <h2 className="text-3xl font-bold mb-4">Complaints & Content Removal</h2>
          <p className="text-muted-foreground mb-6">Want to report a problem, incorrect content or request removal? Contact us and we'll handle the matter promptly.</p>
          <div className="space-y-2 text-sm md:text-base">
            <p>Email: <a href="mailto:support@sinsync.co.uk" className="text-primary hover:underline">support@sinsync.co.uk</a></p>
            <p>Provide link/ID of the content and brief description of the problem.</p>
            <p>Urgent matters (security/abuse) are prioritized within 24 hours.</p>
          </div>
        </section>
      </main>

      {/* Site footer is rendered globally in ClientRootLayout */}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around items-center py-2 md:hidden">
        <Link href="/" className="flex flex-col items-center p-2 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="text-xs mt-1">{t("general.explore")}</span>
        </Link>
        <Link href="/generate" className="flex flex-col items-center p-2 text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="text-xs mt-1">{t("general.generate")}</span>
        </Link>
        <Link href="/create-character" className="flex flex-col items-center p-2 text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-xs mt-1">{t("general.create")}</span>
        </Link>
        <Link href="/chat" className="flex flex-col items-center p-2 text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span className="text-xs mt-1">{t("general.chat")}</span>
        </Link>
        <Link href="/premium" className="flex flex-col items-center p-2 text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <span className="text-xs mt-1">{t("general.premium")}</span>
        </Link>
      </nav>

      <LandingDisclaimerModal
        open={modalOpen}
        onConfirm={handleConfirm}
        onCookieSettings={handleCookieSettings}
        initialPreferences={consent?.preferences}
        lang={lang as "en"}
      />
    </div>
  )
}
