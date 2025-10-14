"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { useAuth } from "@/components/auth-context"

export default function AffiliatePage() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { user } = useAuth()

    const handleAffiliateApplication = async () => {
        if (!user) {
            toast.error("Log in to apply for the affiliate program.")
            router.push("/login?redirect=/affiliate")
            return
        }

        setIsLoading(true)
        toast.info("Submitting your application…")

        // Simulate an API call to submit the application
        setTimeout(() => {
            setIsLoading(false)
            toast.success("Your application has been submitted! We'll get back to you soon.")
        }, 2000)
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">Join Our Affiliate Program</h1>
                <p className="text-muted-foreground">Earn money by promoting our products.</p>
            </div>

            <Card className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Why Join?</h2>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start">
                                <span className="text-primary mr-2">✔</span>
                                <span>Competitive commission rates.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">✔</span>
                                <span>High-quality products that sell themselves.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">✔</span>
                                <span>Dedicated support team for affiliates.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">✔</span>
                                <span>Real-time tracking and reporting.</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
                        <ol className="list-decimal list-inside space-y-3">
                            <li>Register for our affiliate program.</li>
                            <li>Get your unique referral link.</li>
                            <li>Share the link with your audience.</li>
                            <li>Earn commission for every sale through your link.</li>
                        </ol>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <Button
                        className="w-full max-w-xs bg-primary hover:bg-primary/90 text-white"
                        onClick={handleAffiliateApplication}
                        disabled={isLoading}
                    >
                        {isLoading ? "Submitting…" : "Apply Now"}
                    </Button>
                </div>
            </Card>
        </div>
    )
}