"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "@/lib/use-translations"
import { useAuth } from "@/components/auth-context"
import { Pencil, Save, X, Plus, Trash } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export function SiteFooter() {
  const { t, language } = useTranslations()
  const currentYear = new Date().getFullYear()
  const { user } = useAuth()
  // Derive admin flag if user role metadata is available
  // @ts-ignore optional chaining depending on Supabase user structure
  const isAdmin = user?.user_metadata?.role === 'admin' || user?.role === 'admin'
  const [isEditing, setIsEditing] = useState(false)
  
  const defaultData = useMemo(() => ({
    companyName: "Sin Stream",
    companyDescription: "Sin Stream provides immersive experiences with AI companions that feel real, allowing users to create images and chat.",
    features: [
      { id: 1, title: "Generate Image", url: "/generate" },
      { id: 2, title: "Chat", url: "/chat" },
      { id: 3, title: "Create Girlfriend", url: "/create-character" },
      { id: 4, title: "Explore", url: "/characters" },
    ],
    legal: [
      { id: 1, title: "Terms and Conditions", url: "/villkor" },
      { id: 2, title: "Privacy Policy", url: "/integritetspolicy" },
      { id: 3, title: "Reporting and Complaints", url: "/rapportera" },
      { id: 4, title: "Guidelines", url: "/riktlinjer" },
      { id: 5, title: "Cookies", url: "/cookies" },
    ],
    aboutUs: [
      { id: 2, title: "About Us", url: "/om-oss" },
      { id: 4, title: "Blog", url: "/blogg" },
      { id: 5, title: "Guide", url: "/guide" },
      { id: 6, title: "Contact Us", url: "/kontakta" },
      { id: 7, title: "FAQ", url: "/faq" },
    ],
  }), [language])

  const [footerData, setFooterData] = useState(defaultData)
  const [tempData, setTempData] = useState(defaultData)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const loadFooterData = async () => {
      try {
        const { data, error } = await supabase.from("footer_content").select("*").single()

        if (data && !error) {
          setFooterData(data.content)
          setTempData(data.content)
        }
      } catch (error) {
        console.error("Error loading footer data:", error)
      }
    }

    loadFooterData()
  }, []) // Remove supabase from dependencies

  // Rebuild default translated data when language changes and not editing
  useEffect(() => {
    if (!isEditing) {
      setFooterData(defaultData)
      setTempData(defaultData)
    }
  }, [defaultData, isEditing])

  const handleSave = async () => {
    try {
      const { error } = await supabase.from("footer_content").upsert({
        id: 1,
        content: tempData,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      setFooterData(tempData)
      setIsEditing(false)
    } catch (error) {
      console.error("Error saving footer data:", error)
    }
  }

  const handleCancel = () => {
    setTempData(footerData)
    setIsEditing(false)
  }

  const handleResetDefaults = async () => {
    // Rebuild default translated data and remove stored DB row so cache clears
    setFooterData(defaultData)
    setTempData(defaultData)
    try {
      await supabase.from('footer_content').delete().eq('id', 1)
    } catch (e) {
      console.error('Error clearing footer cache', e)
    }
  }

  const handleAddItem = (section: keyof typeof footerData) => {
    // @ts-ignore - footer sections are arrays in these keys
    setTempData((prev) => ({
      ...prev,
      [section]: [...(prev as any)[section], { id: Date.now(), title: "New Item", url: "/" }],
    }))
  }

  const handleRemoveItem = (section: keyof typeof footerData, id: number) => {
    // @ts-ignore
    setTempData((prev) => ({
      ...prev,
      [section]: (prev as any)[section].filter((item: any) => item.id !== id),
    }))
  }

  const handleItemChange = (section: keyof typeof footerData, id: number, field: string, value: string) => {
    // @ts-ignore
    setTempData((prev) => ({
      ...prev,
      [section]: (prev as any)[section].map((item: any) => (item.id === id ? { ...item, [field]: value } : item)),
    }))
  }

  const handleTextChange = (field: keyof typeof footerData, value: string) => {
    setTempData((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="w-full bg-background text-foreground py-8 sm:py-10 md:py-12 mt-auto rounded-[2px] border border-border overflow-x-hidden">
      {isAdmin && (
        <div className="container mx-auto px-4 md:px-6 py-2 flex justify-end gap-2 max-w-full">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
              >
                <Save size={16} /> {t("general.save")}
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm"
              >
                <X size={16} /> {t("general.cancel")}
              </button>
              <button
                onClick={handleResetDefaults}
                className="flex items-center gap-1 bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-md text-sm"
              >
                <X size={16} /> {t('footer.resetDefaults')}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 rounded-md text-sm"
            >
              <Pencil size={16} /> {t("footer.editFooter")}
            </button>
          )}
        </div>
      )}
      <div className="container mx-auto px-4 md:px-6 max-w-full overflow-x-hidden">
        {/* Mobile - Same content as desktop but in single column layout */}
        <div className="md:hidden space-y-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="text-xl font-bold">
                Sin<span className="text-primary">Stream</span>
              </h2>
            </Link>
            <p className="text-muted-foreground text-sm">{tempData.companyDescription}</p>
          </div>

          {/* AI Girlfriends Section */}
          <div className="space-y-3">
            <h3 className="text-base font-medium">{t("general.features")}</h3>
            <ul className="space-y-2">
              {tempData.features.map((item: any) => (
                <li key={item.id}>
                  <Link href={item.url} className="text-muted-foreground hover:text-foreground text-sm transition-colors block">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Villkor Section */}
          <div className="space-y-3">
            <h3 className="text-base font-medium">{t("general.legal")}</h3>
            <ul className="space-y-2">
              {tempData.legal.map((item: any) => (
                <li key={item.id}>
                  <Link href={item.url} className="text-muted-foreground hover:text-foreground text-sm transition-colors block">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Om oss Section */}
          <div className="space-y-3">
            <h3 className="text-base font-medium">{t("footer.about.title")}</h3>
            <ul className="space-y-2">
              {tempData.aboutUs.map((item: any) => (
                <li key={item.id}>
                  <Link 
                    href={item.url} 
                    target={item.url.startsWith("http") ? "_blank" : undefined} 
                    rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors block"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {/* Column 1: Sin Stream - Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold">
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.companyName}
                    onChange={(e) => handleTextChange("companyName", e.target.value)}
                    className="bg-muted border border-border rounded px-2 py-1 w-full"
                  />
                ) : (
                  <>
                    Sin<span className="text-primary"> Stream</span>
                  </>
                )}
              </h2>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              {isEditing ? (
                <textarea
                  value={tempData.companyDescription}
                  onChange={(e) => handleTextChange("companyDescription", e.target.value)}
                  className="bg-muted border border-border rounded px-2 py-1 w-full h-24"
                />
              ) : (
                tempData.companyDescription
              )}
            </p>
          </div>

          {/* Column 2: Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t("general.features")}</h3>
            <ul className="space-y-3">
              {tempData.features.map((item: any) => (
                <li key={item.id}>
                  {isEditing ? (
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleItemChange("features", item.id, "title", e.target.value)}
                        className="bg-muted border border-border rounded px-2 py-1 flex-1"
                      />
                      <input
                        type="text"
                        value={item.url}
                        onChange={(e) => handleItemChange("features", item.id, "url", e.target.value)}
                        className="bg-muted border border-border rounded px-2 py-1 w-20"
                        placeholder="URL"
                      />
                      <button onClick={() => handleRemoveItem("features", item.id)} className="text-destructive hover:opacity-80">
                        <Trash size={16} />
                      </button>
                    </div>
                  ) : (
                    <Link href={item.url} className="text-[#FF13F0] text-sm font-medium transition-colors">
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
              {isEditing && (
                <li>
                  <button onClick={() => handleAddItem("features")} className="flex items-center gap-1 text-primary hover:opacity-80 text-sm">
                    <Plus size={16} /> {t("footer.addItem")}
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t("general.legal")}</h3>
            <ul className="space-y-3">
              {tempData.legal.map((item: any) => (
                <li key={item.id}>
                  {isEditing ? (
                    <div className="flex items-center gap-2 mb-2">
                      <input type="text" value={item.title} onChange={(e) => handleItemChange("legal", item.id, "title", e.target.value)} className="bg-muted border border-border rounded px-2 py-1 flex-1" />
                      <input type="text" value={item.url} onChange={(e) => handleItemChange("legal", item.id, "url", e.target.value)} className="bg-muted border border-border rounded px-2 py-1 w-20" placeholder="URL" />
                      <button onClick={() => handleRemoveItem("legal", item.id)} className="text-destructive hover:opacity-80">
                        <Trash size={16} />
                      </button>
                    </div>
                  ) : (
                    <Link href={item.url} className="text-[#FF13F0] text-sm font-medium transition-colors">
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
              {isEditing && (
                <li>
                  <button onClick={() => handleAddItem("legal")} className="flex items-center gap-1 text-primary hover:opacity-80 text-sm">
                    <Plus size={16} /> {t("footer.addItem")}
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: About Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t("footer.about.title")}</h3>
            <ul className="space-y-3">
              {tempData.aboutUs.map((item: any) => (
                <li key={item.id}>
                  {isEditing ? (
                    <div className="flex items-center gap-2 mb-2">
                      <input type="text" value={item.title} onChange={(e) => handleItemChange("aboutUs", item.id, "title", e.target.value)} className="bg-muted border border-border rounded px-2 py-1 flex-1" />
                      <input type="text" value={item.url} onChange={(e) => handleItemChange("aboutUs", item.id, "url", e.target.value)} className="bg-muted border border-border rounded px-2 py-1 w-20" placeholder="URL" />
                      <button onClick={() => handleRemoveItem("aboutUs", item.id)} className="text-destructive hover:opacity-80">
                        <Trash size={16} />
                      </button>
                    </div>
                  ) : (
                    <Link href={item.url} target={item.url.startsWith("http") ? "_blank" : undefined} rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined} className="text-[#FF13F0] text-sm font-medium transition-colors">
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
              {isEditing && (
                <li>
                  <button onClick={() => handleAddItem("aboutUs")} className="flex items-center gap-1 text-primary hover:opacity-80 text-sm">
                    <Plus size={16} /> {t("footer.addItem")}
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
          <div className="text-muted-foreground text-xs text-center">© {currentYear} Sin Stream. All rights reserved.</div>
        </div>
      </div>
    </div>
  )
}
