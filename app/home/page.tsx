import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { AppHeader } from "@/components/app-header"
import { MovieCarousel } from "@/components/movie-carousel"
import { Sparkles } from "lucide-react"
import type { Movie } from "@/lib/types"

export default async function HomePage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Redirect to onboarding if not completed
  if (!profile?.onboarding_completed) {
    redirect("/onboarding")
  }

  // Get all movies
  const { data: allMovies } = await supabase.from("movies").select("*").order("created_at", { ascending: false })

  const movies = (allMovies as Movie[]) || []

  // Get staff picks
  const staffPicks = movies.filter((m) => m.staff_pick)

  // Filter movies by user's streaming services
  const userServices = profile?.streaming_services || []
  const availableMovies = movies.filter((m) => m.streaming_services?.some((s) => userServices.includes(s)))

  // Filter by user's favorite genres for "For You"
  const userGenres = profile?.favorite_genres || []
  const forYouMovies = availableMovies.filter((m) => m.genres?.some((g) => userGenres.includes(g.toLowerCase())))

  // Get trending (highest rated)
  const trendingMovies = [...movies].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 10)

  // Recent additions
  const recentMovies = movies.slice(0, 10)

  return (
    <div className="min-h-screen bg-background">
      <AppHeader userName={profile?.full_name} isAdmin={profile?.is_admin} />

      <main className="py-6">
        {/* Hero / Featured */}
        <section className="px-4 md:px-8 mb-8">
          <div className="relative rounded-2xl overflow-hidden bg-card border border-border">
            <div className="absolute inset-0">
              <img src="/cinematic-movie-scene-dark-dramatic.jpg" alt="Featured" className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            </div>
            <div className="relative p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                AI Recommendation
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 max-w-xl">
                Based on your taste, you might love these
              </h1>
              <p className="text-muted-foreground max-w-lg">
                We analyzed your preferences and found some hidden gems across your streaming services.
              </p>
            </div>
          </div>
        </section>

        {/* Staff Picks */}
        {staffPicks.length > 0 && (
          <div id="staff-picks">
            <MovieCarousel title="Staff Picks" subtitle="Curated by our movie experts" movies={staffPicks} />
          </div>
        )}

        {/* For You */}
        {forYouMovies.length > 0 && (
          <div id="for-you">
            <MovieCarousel
              title="For You"
              subtitle={`Based on your love for ${userGenres.slice(0, 2).join(" & ")}`}
              movies={forYouMovies}
            />
          </div>
        )}

        {/* Trending */}
        <MovieCarousel title="Trending Now" subtitle="What everyone's watching" movies={trendingMovies} />

        {/* Available on your services */}
        {availableMovies.length > 0 && (
          <MovieCarousel
            title="Available on Your Services"
            subtitle={`On ${userServices.slice(0, 3).join(", ")}${userServices.length > 3 ? "..." : ""}`}
            movies={availableMovies}
          />
        )}

        {/* Recently Added */}
        <MovieCarousel title="Recently Added" movies={recentMovies} />
      </main>
    </div>
  )
}
