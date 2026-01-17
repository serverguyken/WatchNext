import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Play, Sparkles, CheckCircle, ChevronRight } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"

const STREAMING_SERVICES = [
  { name: "Netflix", color: "#E50914" },
  { name: "Prime Video", color: "#00A8E1" },
  { name: "Disney+", color: "#113CCF" },
  { name: "Hulu", color: "#1CE783" },
  { name: "Max", color: "#002BE7" },
  { name: "Apple TV+", color: "#A2AAAD" },
]

const FEATURES = [
  {
    title: "Connect Your Services",
    description: "Link all your streaming subscriptions to see what's available to you right now.",
  },
  {
    title: "AI-Powered Picks",
    description: "Our smart recommendations learn your taste and surface hidden gems you'll love.",
  },
  {
    title: "Staff Curated Lists",
    description: "Expert picks from film enthusiasts who know great cinema inside and out.",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Movie Recommendations
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Never wonder what to watch <span className="text-primary">again</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            WatchNext combines your streaming services, viewing history, and AI recommendations to help you find the
            perfect movie every time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
              <Button size="lg" animate>
                <div className="gap-2 flex items-center">
                  <Play className="h-5 w-5" />
                  Start Watching
                </div>
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="secondary" animate>
                <div className="flex items-center gap-2">
                  I have an account
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Streaming Services */}
      <section className="py-16 border-y border-border bg-card/50">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground mb-8 text-sm uppercase tracking-wider">
            Works with your favorite streaming services
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {STREAMING_SERVICES.map((service) => (
              <div
                key={service.name}
                className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors"
                style={{ color: service.color }}
              >
                {service.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Three simple steps to your next favorite movie
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className="relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4 bg-card/50 border-y border-border">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Stop scrolling, start watching</h2>
              <p className="text-muted-foreground text-lg mb-8">
                The average person spends 23 minutes deciding what to watch. WatchNext cuts that down to seconds with
                smart, personalized recommendations.
              </p>
              <ul className="space-y-4">
                {[
                  "Recommendations across all your services",
                  "Discover hidden gems in your subscriptions",
                  "Track what you've watched and loved",
                  "Get AI suggestions based on your mood",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-4/3 rounded-xl bg-secondary/50 border border-border overflow-hidden">
                <Image
                  src="/movie-app-interface-dark-theme-showing-movie-recom.jpg"
                  alt="WatchNext app interface"
                  className="w-full h-full object-cover"
                  width={600}
                  height={450}
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to find your next watch?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of movie lovers who have already discovered their new favorites.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="gap-2 px-8">
              <Play className="h-5 w-5" />
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} WatchNext. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
