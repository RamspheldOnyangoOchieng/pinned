"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Check, Shield, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { useAuth } from "@/components/auth-context"
import { createClient } from "@/utils/supabase/client"

interface TokenPackage {
  id: string
  name: string
  tokens: number
  price: number
}

interface PremiumPageContent {
  [key: string]: string
}

interface PlanFeature {
  id: string
  feature_key: string
  feature_label: string
  free_value: string
  premium_value: string
  sort_order: number
  active: boolean
}

export default function PremiumPage() {
  const [tokenPackages, setTokenPackages] = useState<TokenPackage[]>([])
  const [content, setContent] = useState<PremiumPageContent>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingStatus, setIsCheckingStatus] = useState(true)
  const [statusError, setStatusError] = useState<string | null>(null)
  const [planFeatures, setPlanFeatures] = useState<PlanFeature[]>([])
  const [language, setLanguage] = useState<"en" | "sv">("sv")
  const router = useRouter()
  const { user } = useAuth()
  const statusCheckRef = useRef<boolean>(false)
  const [selectedTokenPackageId, setSelectedTokenPackageId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchInitialData = async () => {
      const { data: packagesData, error: packagesError } = await supabase.from("token_packages").select("*")
      if (packagesError) {
        toast.error("Failed to load token packages.")
      } else {
        setTokenPackages(packagesData)
      }

      const { data: contentData, error: contentError } = await supabase.from("premium_page_content").select("*")
      if (contentError) {
        toast.error("Failed to load page content.")
      } else {
        const formattedContent = contentData.reduce((acc, item) => {
          acc[item.section] = item.content
          return acc
        }, {})
        setContent(formattedContent)
      }

      // Fetch plan features (admin configured). If none, we fall back later.
      const { data: featuresData } = await supabase
        .from("plan_features")
        .select("*")
        .eq("active", true)
        .order("sort_order")

      if (featuresData && featuresData.length) {
        setPlanFeatures(featuresData as PlanFeature[])
      }
    }

    fetchInitialData()
  }, [])

  useEffect(() => {
    const checkPremiumStatus = async () => {
      if (statusCheckRef.current) return
      statusCheckRef.current = true

      try {
        setIsCheckingStatus(true)
        setStatusError(null)

        if (!user) {
          setIsCheckingStatus(false)
          statusCheckRef.current = false
          return
        }

        try {
          const response = await fetch("/api/check-premium-status")
          const data = await response.json()

          if (data.error) {
            console.error("Premium status error:", data.error)
            setStatusError(`Error checking premium status`)
          }
        } catch (error) {
          console.error("Error checking premium status:", error)
          setStatusError("Unable to check premium status")
        }
      } finally {
        setIsCheckingStatus(false)
        statusCheckRef.current = false
      }
    }

    checkPremiumStatus()
  }, [user?.id]) // Only depend on user ID

  const handleTokenPurchase = async () => {
    if (!selectedTokenPackageId) {
      toast.error("Please select a token package")
      return
    }

    try {
      setIsLoading(true)

      const selectedPackage = tokenPackages.find((pkg) => pkg.id === selectedTokenPackageId)
      if (!selectedPackage) {
        throw new Error("Selected token package could not be found")
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: selectedTokenPackageId,
          userId: user?.id,
          email: user?.email,
          metadata: {
            type: "token_purchase",
            tokens: selectedPackage.tokens,
            price: selectedPackage.price,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment session")
      }

      window.location.href = data.url
    } catch (error) {
  console.error("Payment error:", error)
  toast.error("Could not complete token purchase. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
      minimumFractionDigits: 2,
    }).format(price)
  }

  if (isCheckingStatus) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-4 flex justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container max-w-md mx-auto py-12 px-4">
        <Card className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Login Required</h1>
            <p className="text-muted-foreground">Log in to access premium features</p>
          </div>
          <Button className="w-full" onClick={() => router.push("/login?redirect=/premium")}>
            Log In
          </Button>
        </Card>
      </div>
    )
  }

  if (statusError) {
    return (
      <div className="container max-w-md mx-auto py-12 px-4">
        <Card className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Error</h1>
            <p className="text-muted-foreground">An error occurred while checking your premium status</p>
            {process.env.NODE_ENV === "development" && <p className="text-xs text-destructive mt-2">{statusError}</p>}
          </div>
          <Button className="w-full" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">{content.main_title}</h1>
        <p className="text-muted-foreground">{content.main_subtitle}</p>
      </div>

      <Card className="p-8 relative overflow-hidden">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-3">
            <div className="mb-8">
              <h2 className="text-primary text-2xl font-bold">{content.token_system_title}</h2>
              <h3 className="text-3xl font-bold mb-2">{content.pay_as_you_go_title}</h3>
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: content.purchase_intro || "" }} />
            </div>

            <div className="bg-muted/30 p-4 rounded-lg border border-border">
              <h4 className="font-medium mb-2">{content.how_tokens_work_title}</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>{content.how_tokens_work_item_1}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>{content.how_tokens_work_item_2}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>{content.how_tokens_work_item_3}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-5">
            <h3 className="text-xl font-bold mb-4">{content.select_package_title}</h3>
            <div className="space-y-4">
              {tokenPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-lg p-4 cursor-pointer transition-all duration-300 ${selectedTokenPackageId === pkg.id
                    ? "bg-primary text-primary-foreground shadow-lg border-2 border-primary transform scale-[1.02] ring-2 ring-primary/30"
                    : "bg-card hover:bg-primary/5 border border-border hover:border-primary/50 hover:shadow-md"
                    }`}
                  onClick={() => setSelectedTokenPackageId(pkg.id)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-bold text-lg">{pkg.name}</div>
                    {pkg.name === "Super Value" && (
                      <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">BEST VALUE</div>
                    )}
                    {pkg.name === "Standard" && (
                      <div className="bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded">POPULAR</div>
                    )}
                  </div>

                  <div className="flex items-center mt-1">
                    <span className={`text-3xl font-bold ${selectedTokenPackageId === pkg.id ? "text-white" : ""}`}>
                      {pkg.tokens}
                    </span>
                    <span
                      className={`ml-2 ${selectedTokenPackageId === pkg.id ? "text-white/90" : "text-muted-foreground"}`}
                    >
                      tokens
                    </span>
                  </div>

                  <div className="mt-2 flex justify-between items-center">
                    <div
                      className={`${selectedTokenPackageId === pkg.id ? "text-white/90" : "text-muted-foreground"} text-sm`}
                    >
                      {Math.floor(pkg.tokens / 5)} bilder
                    </div>
                    <div className="font-bold">{formatPrice(pkg.price)}</div>
                  </div>

                  {selectedTokenPackageId === pkg.id && (
                    <div className="mt-2 flex items-center">
                      <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center mr-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
            <span className="text-sm font-medium">Selected Package</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2 h-12 mt-6 transition-all duration-300"
              onClick={handleTokenPurchase}
              disabled={isLoading || !selectedTokenPackageId}
            >
        {isLoading ? "Processing…" : "Buy tokens"}
              {!isLoading && (
                <span className="flex items-center gap-1">
                  <img src="/visa-logo.svg" alt="Visa" className="h-5" />
                  <img src="/mastercard-logo.svg" alt="Mastercard" className="h-5" />
                </span>
              )}
            </Button>

            <div className="text-center text-xs text-muted-foreground mt-2">
              {selectedTokenPackageId && (
                <>
          One-time payment of{" "}
                  {formatPrice(tokenPackages.find((pkg) => pkg.id === selectedTokenPackageId)?.price || 0)}
                </>
              )}
            </div>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xl font-bold mb-4">{content.value_comparison_title}</h3>
            <div className="space-y-4">
              {(() => {
                if (tokenPackages.length === 0) {
                  return null
                }

                const sortedPackages = [...tokenPackages].sort((a, b) => a.tokens - b.tokens)
                const basePackage = sortedPackages[0]
                const baseCostPerToken = basePackage.price / basePackage.tokens

                return sortedPackages.map((pkg) => {
                  const costPerToken = pkg.price / pkg.tokens
                  const costPerImage = costPerToken * 5
                  const savings = ((baseCostPerToken - costPerToken) / baseCostPerToken) * 100

                  return (
                    <div
                      key={`value-${pkg.id}`}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{pkg.tokens} tokens</div>
                        <div className="text-sm text-muted-foreground">{formatPrice(costPerImage)} per bild</div>
                      </div>
                      {pkg.id !== basePackage.id && savings > 0 && (
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                          Save {savings.toFixed(0)}%
                        </div>
                      )}
                    </div>
                  )
                })
              })()}
            </div>

            <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
              <h4 className="font-medium mb-2">{content.why_buy_tokens_title}</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>{content.why_buy_tokens_item_1}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>{content.why_buy_tokens_item_2}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>{content.why_buy_tokens_item_3}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-center mt-8 space-x-8">
        <div className="flex items-center text-muted-foreground">
          <Shield className="h-5 w-5 mr-2" />
          <span>{content.security_badge_1}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Lock className="h-5 w-5 mr-2" />
          <span>{content.security_badge_2}</span>
        </div>
      </div>

      {/* Feature comparison table */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-6">
          Comparison: Free vs Premium
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-primary text-primary-foreground">
              <tr>
                <th className="text-left px-4 py-3 font-semibold w-1/3">
                  {language === "sv" ? "Funktion" : "Feature"}
                </th>
                <th className="text-left px-4 py-3 font-semibold w-1/3">
                  {language === "sv" ? "Gratis" : "Free Plan"}
                </th>
                <th className="text-left px-4 py-3 font-semibold w-1/3">
                  {language === "sv" ? "Premium" : "Premium Plan"}
                </th>
              </tr>
            </thead>
            <tbody>
              {(planFeatures.length ? planFeatures : [
                {
                  feature_key: "text_messages",
                  feature_label: "Text Messages",
                  free_value: "3 free messages",
                  premium_value: "Truly Unlimited",
                },
                {
                  feature_key: "image_gen_non_nude",
                  feature_label: "Image Generation (non-nude)",
                  
                  free_value: "1 free image",
                  
                  premium_value: "Unlimited / Higher Quality",
                  
                },
                {
                  feature_key: "image_gen_nude",
                  feature_label: "Image Generation (nude)",
                  
                  free_value: "Blurred",
                  
                  premium_value: "Not blurred",
                  
                },
                {
                  feature_key: "receiving_images",
                  feature_label: "Receiving Images",
                  
                  free_value: "1 free image",
                  
                  premium_value: "Available",
                  
                },
                {
                  feature_key: "receiving_videos_non_nude",
                  feature_label: "Receiving Videos (non-nude)",
                  
                  free_value: "1 free video",
                  
                  premium_value: "Available",
                  
                },
                {
                  feature_key: "receiving_videos_nude",
                  feature_label: "Receiving Videos (nude)",
                  
                  free_value: "Blurred",
                  
                  premium_value: "Not blurred",
                  
                },
                {
                  feature_key: "response_time",
                  feature_label: "Response Time",
                  
                  free_value: "Slower (Lower Priority)",
                  
                  premium_value: "Faster (Priority Processing)",
                  
                },
                {
                  feature_key: "image_blur_removal",
                  feature_label: "Image Blur Removal",
                  
                  free_value: "Not Included",
                  
                  premium_value: "Automatic",
                  
                },
                {
                  feature_key: "bot_memory",
                  feature_label: "Bot Memory",
                  
                  free_value: "Short",
                  
                  premium_value: "Extended/Longer",
                  
                },
                {
                  feature_key: "active_ai_girlfriends",
                  feature_label: "Active AI Girlfriends",
                  
                  free_value: "One at a Time",
                  
                  premium_value: "Unlimited",
                  
                },
                {
                  feature_key: "sending_photos",
                  feature_label: "Sending Photos",
                  
                  free_value: "Not Available",
                  
                  premium_value: "Available",
                  
                },
                {
                  feature_key: "chat_history",
                  feature_label: "Chat History",
                  
                  free_value: "Deleted after 3 days",
                  
                  premium_value: "Never Deleted",
                  
                },
                {
                  feature_key: "watermark",
                  feature_label: "Watermark on Images",
                  
                  free_value: "Yes",
                  
                  premium_value: "No",
                  
                },
                {
                  feature_key: "support",
                  feature_label: "Support",
                  
                  free_value: "Standard",
                  
                  premium_value: "Priority",
                  
                },
                {
                  feature_key: "new_feature_access",
                  feature_label: "New Feature Access",
                  
                  free_value: "Standard",
                  
                  premium_value: "Early Access",
                  
                },
                {
                  feature_key: "advanced_customization",
                  feature_label: "Advanced Customization",
                  
                  free_value: "Limited",
                  
                  premium_value: "Full",
                  
                },
                {
                  feature_key: "exclusive_features",
                  feature_label: "Exclusive Premium Features",
                  
                  free_value: "No",
                  
                  premium_value: "Potential Future Additions",
                  
                },
              ]).map((feat, i) => {
                const isDb = !!(feat as any).id
                const key = (feat as any).feature_key || (feat as any).id || i
                const label = false
                  ? (isDb ? (feat as any).feature_label_sv : (feat as any).feature_label_sv)
                  : (isDb ? (feat as any).feature_label_en : (feat as any).feature_label_en)
                const freeVal = false
                  ? (isDb ? (feat as any).free_value_sv : (feat as any).free_value_sv)
                  : (isDb ? (feat as any).free_value_en : (feat as any).free_value_en)
                const premiumVal = false
                  ? (isDb ? (feat as any).premium_value_sv : (feat as any).premium_value_sv)
                  : (isDb ? (feat as any).premium_value_en : (feat as any).premium_value_en)
                return (
                  <tr key={key} className="border-t border-border hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-sm">{label}</td>
                    <td className="px-4 py-3 text-xs sm:text-sm align-top">{freeVal}</td>
                    <td className="px-4 py-3 text-xs sm:text-sm align-top font-semibold text-primary">{premiumVal}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground text-center">
          Features & limits may change. Live values are controlled by the administrator.
        </p>
      </div>
    </div>
  )
}
