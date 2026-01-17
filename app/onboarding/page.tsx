"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { createBrowserClient } from "@/lib/supabase/client"
import { Loader2, Check } from "lucide-react"

const STREAMING_SERVICES = [
  { id: "netflix", name: "Netflix", color: "#E50914" },
  { id: "prime", name: "Prime Video", color: "#00A8E1" },
  { id: "disney", name: "Disney+", color: "#113CCF" },
  { id: "hulu", name: "Hulu", color: "#1CE783" },
  { id: "max", name: "Max", color: "#002BE7" },
  { id: "apple", name: "Apple TV+", color: "#A2AAAD" },
  { id: "peacock", name: "Peacock", color: "#000000" },
  { id: "paramount", name: "Paramount+", color: "#0064FF" },
]

const GENRES = [
  { id: "action", name: "Action" },
  { id: "comedy", name: "Comedy" },
  { id: "drama", name: "Drama" },
  { id: "horror", name: "Horror" },
  { id: "sci-fi", name: "Sci-Fi" },
  { id: "romance", name: "Romance" },
  { id: "thriller", name: "Thriller" },
  { id: "documentary", name: "Documentary" },
  { id: "animation", name: "Animation" },
  { id: "fantasy", name: "Fantasy" },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createBrowserClient()

  const toggleService = (id: string) => {
    setSelectedServices((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const toggleGenre = (id: string) => {
    setSelectedGenres((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]))
  }

  const handleComplete = async () => {
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from("profiles")
        .update({
          streaming_services: selectedServices,
          favorite_genres: selectedGenres,
          onboarding_completed: true,
        })
        .eq("id", user.id)
    }

    router.push("/home")
    router.refresh()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="p-4 border-b border-border">
        <Logo />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-border"}`} />
            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-border"}`} />
          </div>

          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Which streaming services do you have?</h1>
                <p className="text-muted-foreground">Select all that apply so we can show you what&apos;s available</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {STREAMING_SERVICES.map((service) => {
                  const isSelected = selectedServices.includes(service.id)
                  return (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`relative p-4 rounded-xl border-2 transition-all ${
                        isSelected ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                      <span className="font-semibold" style={{ color: service.color }}>
                        {service.name}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="flex justify-end">
                <Button size="lg" onClick={() => setStep(2)} disabled={selectedServices.length === 0}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">What genres do you enjoy?</h1>
                <p className="text-muted-foreground">Pick your favorites to personalize your recommendations</p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {GENRES.map((genre) => {
                  const isSelected = selectedGenres.includes(genre.id)
                  return (
                    <button
                      key={genre.id}
                      onClick={() => toggleGenre(genre.id)}
                      className={`px-5 py-2.5 rounded-full border-2 font-medium transition-all ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {genre.name}
                    </button>
                  )
                })}
              </div>

              <div className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button size="lg" onClick={handleComplete} disabled={loading || selectedGenres.length === 0}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Start Exploring
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
