"use client";
import { useState, useCallback } from "react";
import { CONSENT_VERSION, POLICY_VERSION } from "@/lib/consent-config";
import { Button } from "@/components/ui/button";

const translations = {
  en: {
    ageTitle: "This site is for adults only! It contains only AI-generated adult content.",
    ageDesc: "By entering this website, you confirm that you are 18 years or older. We use cookies for basic analytics and spam detection. All content on this website is AI-generated! Any generations that resemble real people are purely coincidental.",
    cookieTitle: "This website uses cookies",
    cookieDesc: "To change your preferences, please click on the settings button.",
    cookieSettings: "Cookie Settings",
    confirmAll: "Confirm all terms",
    reject: "Reject non-essential",
    termsLink: "Terms",
    privacyLink: "Privacy",
    ageCheckbox: "I confirm I am at least 18 years old",
    termsCheckbox: "I agree to the Terms and Policies",
    needConfirm: "Please confirm age and accept terms first",
    rulesTitle: "Chatbots are strictly allowed for sexting with minimum age of 18. Restricted and blocked activities from chat bots:",
    rules: [
      "Illegal Activities & Criminal Behavior",
      "Commercial sexual activities (including prostitution)",
      "Human trafficking",
      "Sexual exploitation and pornography (including child pornography)",
      "Solicitation or promotion of criminal activity",
      "Child labor exploitation",
      "Promotion of illegal drugs or substance abuse",
      "Promotion of illegal weapons",
      "Use of the service for phishing, scams, or account hijacking",
      "Distribution or discussion of cannibalism",
      "Breach of local, national, or international laws and regulations",
      "Child Exploitation & Minor Protection",
      "Creation or depiction of underage characters (realistic, fictional, AI-generated, or 'aged-up')",
      "Sharing any sexualized or exploitative material involving minors (including drawings, art, or AI-generated visuals)",
      "Any content that harms, entices, or endangers minors",
      "Sexual Content Restrictions",
      "Explicit images showing real or realistic nudity or sexual acts",
      "Overt or implied sexual acts, unless clearly fictionalized and within permitted contexts",
      "Kink content involving:",
      "Death or serious harm to humans or animals",
      "Amputation, dismemberment",
      "Cannibalism",
      "Bodily fluids (feces, urine, semen, cum, saliva, mucus, menstrual blood, vomit)",
      "Bestiality (real-life animals)",
      "Non-consensual sexual acts (rape, sexual abuse, sextortion, revenge porn, etc.)",
      "Incest (including non-blood-related scenarios like step-relationships)",
      "Sexual depictions in digital or real art unless within strict educational, scientific, or comedic context",
      "Violence & Harm",
      "Incitement, glorification, or depiction of violence, murder, or terrorism",
      "Threats of physical harm or violence",
      "Promotion or encouragement of self-harm, suicide, eating disorders, or drug abuse",
      "Depictions of gore, death of animals, or intense violence",
      "Discussions encouraging or promoting necrophilia",
      "Hate Speech & Discrimination",
      "Content promoting hatred or violence against individuals or groups based on:",
      "Race or ethnicity",
      "Nationality",
      "Religion",
      "Disability",
      "Gender or gender identity",
      "Sexual orientation",
      "Age or veteran status",
      "Idolization or glorification of hate figures (e.g., Adolf Hitler, Joseph Stalin, Pol Pot)",
      "Privacy, Deception, and Impersonation",
      "Sharing personal or confidential information of others without consent",
      "Impersonation of real individuals, including celebrities or public figures",
      "Uploading real images or AI-generated images that resemble real individuals without consent",
      "Using the service for deceptive behavior (false information, multiple accounts, fake identities)",
      "Solicitation of payments from users under deceptive pretenses",
      "Misinformation & Political Interference",
      "Posting misinformation that could lead to violence, harm, or disrupt political processes",
      "Discussions of political opinions or religious and spiritual beliefs (explicitly prohibited topics)",
      "Spam & Irrelevant Content",
      "Spamming, including sending unwanted promotional, commercial, or bulk messages",
      "Generating meaningless, irrelevant, or purposeless content",
      "Restricted Goods and Transactions",
      "Advertising or attempting to transact regulated or restricted goods"
    ],
  },
};

interface CookiePreferences {
  analytics: boolean;
  marketing: boolean;
}

interface ConsentPayload {
  version: number;
  policyVersion: number;
  timestamp: number;
  preferences: CookiePreferences;
  confirmations: { age: boolean; terms: boolean };
}

export default function LandingDisclaimerModal({
  open,
  onConfirm,
  onCookieSettings,
  lang = "en",
  initialPreferences,
}: {
  open: boolean;
  // Called with final saved preferences (either accept all or custom)
  onConfirm: (prefs: CookiePreferences, full?: ConsentPayload) => void;
  onCookieSettings: () => void;
  lang?: "en";
  initialPreferences?: Partial<CookiePreferences>;
}) {
  const t = translations[lang];
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    analytics: initialPreferences?.analytics ?? true,
    marketing: initialPreferences?.marketing ?? false,
  });
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const ready = ageConfirmed && termsAccepted;
  const [showValidation, setShowValidation] = useState(false);

  const ensureReady = useCallback((action: () => void) => {
    if (!ready) {
      // trigger validation message highlight
      setShowValidation(true);
      setTimeout(() => setShowValidation(false), 1600);
      return;
    }
    action();
  }, [ready]);

  if (!open) return null;

  const buildConsent = (finalPrefs: CookiePreferences): ConsentPayload => ({
    version: CONSENT_VERSION,
    policyVersion: POLICY_VERSION,
    timestamp: Date.now(),
    preferences: finalPrefs,
    confirmations: { age: ageConfirmed, terms: termsAccepted },
  });

  const saveAndClose = (finalPrefs: CookiePreferences) => {
    const consent = buildConsent(finalPrefs);
    onConfirm(finalPrefs, consent);
  };

  const acceptAll = () => ensureReady(() => saveAndClose({ analytics: true, marketing: true }));
  const rejectNonEssential = () => ensureReady(() => saveAndClose({ analytics: false, marketing: false }));
  const saveCustom = () => ensureReady(() => saveAndClose(prefs));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-4">
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-[95%] sm:max-w-[90%] md:max-w-[75%] lg:max-w-[65%] max-h-[95vh] sm:max-h-[90vh] overflow-y-auto flex flex-col p-4 sm:p-6 md:p-8 relative border-2 border-primary/20">
        {!showSettings && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">{t.ageTitle}</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-3">{t.ageDesc}</p>
            <p className="text-muted-foreground text-xs sm:text-sm mb-4 flex flex-wrap gap-2 sm:gap-4">
              <a href="/terms" className="underline hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">{t.termsLink}</a>
              <a href="/privacy" className="underline hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">{t.privacyLink}</a>
            </p>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-foreground">{t.cookieTitle}</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">{t.cookieDesc}</p>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-foreground">{t.rulesTitle}</h3>
            <ul className="text-muted-foreground text-xs sm:text-sm mb-6 list-disc pl-4 sm:pl-6 max-h-40 sm:max-h-48 overflow-y-auto border border-primary/10 rounded-lg p-3 bg-muted/30">
              {t.rules.map((rule, idx) => (
                <li key={idx} className="mb-1">{rule}</li>
              ))}
            </ul>
            <div className="space-y-2 sm:space-y-3 mb-4">
              <label className="flex items-start gap-2 text-foreground text-xs sm:text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="mt-0.5 sm:mt-1 h-4 w-4 flex-shrink-0 rounded border-primary/30 text-primary focus:ring-primary"
                  checked={ageConfirmed}
                  onChange={(e) => setAgeConfirmed(e.target.checked)}
                />
                <span>{t.ageCheckbox}</span>
              </label>
              <label className="flex items-start gap-2 text-foreground text-xs sm:text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="mt-0.5 sm:mt-1 h-4 w-4 flex-shrink-0 rounded border-primary/30 text-primary focus:ring-primary"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <span>{t.termsCheckbox}</span>
              </label>
              {(!ready || showValidation) && (
                <p className={`text-xs sm:text-sm font-medium transition-colors ${showValidation ? "text-destructive animate-pulse" : "text-destructive/80"}`}>{t.needConfirm}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 mt-2">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  className="bg-background border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 font-semibold text-sm sm:text-base flex-1 shadow-sm pointer-events-auto py-2 sm:py-3"
                  type="button"
                  onClick={() => setShowSettings(true)}
                >
                  {t.cookieSettings}
                </Button>
                <Button
                  variant="destructive"
                  className={`bg-destructive hover:bg-destructive/90 text-destructive-foreground text-sm sm:text-base font-semibold flex-1 shadow py-2 sm:py-3 ${!ready && "opacity-60"}`}
                  type="button"
                  onClick={rejectNonEssential}
                  aria-disabled={!ready}
                >
                  {t.reject}
                </Button>
              </div>
              <Button
                className={`bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base font-semibold w-full sm:flex-1 shadow py-2 sm:py-3 focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 ${!ready && "opacity-60"}`}
                type="button"
                onClick={acceptAll}
                aria-disabled={!ready}
              >
                {t.confirmAll}
              </Button>
            </div>
          </>
        )}

        {showSettings && (
          <div className="text-foreground space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold">{t.cookieTitle}</h2>
              <button
                className="text-xs sm:text-sm underline hover:text-primary transition-colors"
                onClick={() => setShowSettings(false)}
              >
                ← Back
              </button>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">{t.cookieDesc}</p>
            <div className="bg-primary/5 rounded-lg p-3 sm:p-4 border border-primary/20">
              <h3 className="font-semibold text-sm sm:text-base">Necessary</h3>
              <p className="text-xs text-muted-foreground">
                Required for the site to function (always enabled).
              </p>
              <div className="mt-2 text-xs inline-block px-2 py-1 rounded bg-primary/10 border border-primary/30">
                Active
              </div>
            </div>
            <div className="bg-primary/5 rounded-lg p-3 sm:p-4 border border-primary/20 flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
              <div className="flex-1">

                <h3 className="font-semibold text-sm sm:text-base">Analytics</h3>
                <p className="text-xs text-muted-foreground">
                  Helps us understand usage and improve the service.
                </p>
              </div>
              <label className="inline-flex items-center gap-2 cursor-pointer select-none flex-shrink-0">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-primary/30 text-primary focus:ring-primary"
                  checked={prefs.analytics}
                  onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                />
                <span className="text-xs sm:text-sm">{prefs.analytics ? "On" : "Off"}</span>
              </label>
            </div>
            <div className="bg-primary/5 rounded-lg p-3 sm:p-4 border border-primary/20 flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-sm sm:text-base">Marketing</h3>
                <p className="text-xs text-muted-foreground">
                  Used for personalized content and offers.
                </p>
              </div>
              <label className="inline-flex items-center gap-2 cursor-pointer select-none flex-shrink-0">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-primary/30 text-primary focus:ring-primary"
                  checked={prefs.marketing}
                  onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
                />
                <span className="text-xs sm:text-sm">{prefs.marketing ? "On" : "Off"}</span>
              </label>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  className={`bg-background border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 text-sm sm:text-base font-semibold flex-1 shadow-sm py-2 sm:py-3 ${!ready && "opacity-60"}`}
                  type="button"
                  onClick={saveCustom}
                  aria-disabled={!ready}
                >
                  Save preferences
                </Button>
                <Button
                  variant="destructive"
                  className={`bg-destructive hover:bg-destructive/90 text-destructive-foreground text-sm sm:text-base font-semibold flex-1 shadow py-2 sm:py-3 ${!ready && "opacity-60"}`}
                  type="button"
                  onClick={rejectNonEssential}
                  aria-disabled={!ready}
                >
                  {t.reject}
                </Button>
              </div>
              <Button
                className={`bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base font-semibold w-full sm:flex-1 shadow py-2 sm:py-3 focus:ring-2 focus:ring-offset-2 focus:ring-primary ${!ready && "opacity-60"}`}
                type="button"
                onClick={acceptAll}
                aria-disabled={!ready}
              >
                {t.accept}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
