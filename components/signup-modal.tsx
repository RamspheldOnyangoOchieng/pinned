"use client"

import { useState } from "react"
import Image from "next/image"
import { AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useTranslations } from "@/lib/use-translations"
import { useAuth } from "@/components/auth-context"
import ConfirmEmailModal from "@/components/confirm-email-modal"
import { useAuthModal } from "./auth-modal-context"

export function SignupModal() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showConfirmEmail, setShowConfirmEmail] = useState(false)

    const { t } = useTranslations()
    const { signup } = useAuth()
    const { isSignupModalOpen, closeSignupModal, switchToLogin } = useAuthModal()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (password.length < 6) {
            setError(t("signup.passwordMinLength"))
            return
        }

        setIsLoading(true)
        try {
            const success = await signup(username, email, password)
            if (success) {
                setShowConfirmEmail(true)
            } else {
                setError(t("signup.emailInUse"))
            }
        } catch (err) {
            console.error(err)
            setError(t("signup.errorOccurred"))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Dialog open={isSignupModalOpen} onOpenChange={closeSignupModal}>
                <DialogContent className="w-full max-w-[95%] sm:max-w-3xl p-0 bg-[#1E1E1E] border-[#252525] rounded-lg grid grid-cols-1 sm:grid-cols-2">
                    <div className="relative h-48 sm:h-full w-full hidden sm:block">
                        <Image
                            src="/signup-placeholder.jpeg"
                            alt="Registreringsbild"
                            fill
                            className="object-cover rounded-l-lg"
                        />
                    </div>
                    <div className="relative p-4 sm:p-8">
                        <DialogTitle className="sr-only">{t("auth.createAccount")}</DialogTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 z-10 bg-transparent hover:bg-black/20 text-white"
                            onClick={closeSignupModal}
                        >
                            <X className="h-4 w-4" />
                        </Button>

                        <div className="text-center mb-6 sm:mb-8">
                            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">{t("auth.createAccount")}</h1>
                        </div>

                        {error && (
                            <div className="bg-destructive/10 border border-destructive text-destructive px-3 py-2 sm:px-4 sm:py-3 rounded-lg mb-4 sm:mb-6 flex items-center text-sm">
                                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="username-signup" className="block text-sm font-medium text-gray-300">
                                    {t("signup.username")}
                                </label>
                                <Input
                                    id="username-signup"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="bg-card border-border text-foreground focus:ring-primary focus:border-primary text-sm sm:text-base"
                                    placeholder={t("signup.username")}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email-signup" className="block text-sm font-medium text-gray-300">
                                    {t("login.emailLabel")}
                                </label>
                                <Input
                                    id="email-signup"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-card border-border text-foreground focus:ring-primary focus:border-primary text-sm sm:text-base"
                                    placeholder={t("login.emailPlaceholder")}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password-signup" className="block text-sm font-medium text-gray-300">
                                    {t("login.passwordLabel")}
                                </label>
                                <Input
                                    id="password-signup"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-card border-border text-foreground focus:ring-primary focus:border-primary text-sm sm:text-base"
                                    placeholder={t("login.passwordPlaceholder")}
                                />
                                <p className="text-xs text-muted-foreground">{t("signup.passwordHint")}</p>
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 sm:py-5 text-sm sm:text-base"
                                    disabled={isLoading}
                                >
                                    {isLoading ? t("signup.submitting") : t("auth.createAccount")}
                                </Button>
                            </div>
                        </form>

                        <div className="relative my-4 sm:my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-600" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#1E1E1E] px-2 text-muted-foreground">{t("signup.orContinueWith")}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            <Button variant="outline" className="w-full bg-white text-black hover:bg-gray-200 text-xs sm:text-sm py-2 sm:py-3">
                                Google
                            </Button>
                            <Button variant="outline" className="w-full bg-[#5865F2] text-white hover:bg-[#4752C4] text-xs sm:text-sm py-2 sm:py-3">
                                Discord
                            </Button>
                            <Button variant="outline" className="w-full bg-black text-white border-gray-600 hover:bg-gray-900 text-xs sm:text-sm py-2 sm:py-3">
                                X
                            </Button>
                        </div>

                        <div className="mt-4 sm:mt-6 text-center text-sm">
                            <p className="text-muted-foreground">
                                {t("signup.haveAccount")} {" "}
                                <button onClick={switchToLogin} className="text-primary hover:underline">
                                    {t("auth.login")}
                                </button>
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <ConfirmEmailModal
                email={email}
                open={showConfirmEmail}
                onClose={() => setShowConfirmEmail(false)}
                onResend={async () => {
                    await signup(username, email, password)
                }}
                onSignIn={switchToLogin}
            />
        </>
    )
}