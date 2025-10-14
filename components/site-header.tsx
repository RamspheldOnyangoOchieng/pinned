"use client"

import { useCharacters } from "@/components/character-context"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserTokenBalance } from "@/components/user-token-balance"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "./auth-context"

export function SiteHeader() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-x-hidden">
      <div className="container flex h-16 items-center justify-between px-4 max-w-full">
        <div className="flex items-center gap-6">
          {/* Character Type Tabs - Removed for future implementation */}
        </div>

        <div className="flex items-center justify-end space-x-2 sm:space-x-4 flex-wrap">
          {user && <UserTokenBalance userId={user.id} />}
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-foreground/90">Hej, {user.username || ""}!</span>
              <UserNav />
            </div>
          ) : (
            <UserNav />
          )}
        </div>
      </div>
    </header>
  )
}
