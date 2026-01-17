import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createServerClient } from "@/lib/supabase/server"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Calendar, Play, ArrowLeft, Check } from "lucide-react"
import type { Movie } from "@/lib/types"

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const { data: movie } = await supabase.from("movies").select("*").eq("id", id).single()

  if (!movie) {
    notFound()
  }

  const typedMovie = movie as Movie
  const userServices = profile?.streaming_services || []
  const availableServices = typedMovie.streaming_services?.filter((s) => userServices.includes(s)) || []

  return (
    <div className="min-h-screen bg-background">
      <AppHeader userName={profile?.full_name} isAdmin={profile?.is_admin} />

      {/* Back button */}
      <div className="container mx-auto px-4 pt-4">
        <Link href="/home">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {/* Poster */}
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-card border border-border">
            <Image
              src={
                typedMovie.poster_url ||
                `/placeholder.svg?height=450&width=300&query=${encodeURIComponent(typedMovie.title + " movie poster")}`
              }
              alt={typedMovie.title}
              fill
              className="object-cover"
              priority
            />
            {typedMovie.staff_pick && (
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                Staff Pick
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{typedMovie.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                {typedMovie.year && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {typedMovie.year}
                  </span>
                )}
                {typedMovie.runtime && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {typedMovie.runtime} min
                  </span>
                )}
                {typedMovie.rating && (
                  <span className="flex items-center gap-1 text-primary">
                    <Star className="h-4 w-4 fill-primary" />
                    {typedMovie.rating.toFixed(1)}
                  </span>
                )}
              </div>
            </div>

            {/* Genres */}
            {typedMovie.genres && typedMovie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {typedMovie.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            )}

            {/* Description */}
            {typedMovie.description && (
              <p className="text-muted-foreground leading-relaxed max-w-2xl">{typedMovie.description}</p>
            )}

            {/* Streaming availability */}
            <div className="space-y-3">
              <h3 className="font-semibold">Available on</h3>
              {availableServices.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {availableServices.map((service) => (
                    <Button key={service} className="gap-2">
                      <Play className="h-4 w-4" />
                      Watch on {service}
                    </Button>
                  ))}
                </div>
              ) : typedMovie.streaming_services && typedMovie.streaming_services.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Not available on your connected services</p>
                  <div className="flex flex-wrap gap-2">
                    {typedMovie.streaming_services.map((service) => (
                      <Badge key={service} variant="outline">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Streaming information not available</p>
              )}
            </div>

            {/* User services check */}
            {availableServices.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary" />
                Available with your subscriptions
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
