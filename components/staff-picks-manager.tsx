"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { createBrowserClient } from "@/lib/supabase/client"
import { Star, Search, Loader2 } from "lucide-react"
import type { Movie } from "@/lib/types"

interface StaffPicksManagerProps {
  movies: Movie[]
}

export function StaffPicksManager({ movies }: StaffPicksManagerProps) {
  const [search, setSearch] = useState("")
  const [isPending, startTransition] = useTransition()
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createBrowserClient()

  const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()))

  const staffPicks = movies.filter((m) => m.is_staff_pick)
  const regularMovies = filteredMovies.filter((m) => !m.is_staff_pick)

  const toggleStaffPick = async (movie: Movie) => {
    setUpdatingId(movie.id)

    await supabase.from("movies").update({ is_staff_pick: !movie.is_staff_pick }).eq("id", movie.id)

    startTransition(() => {
      router.refresh()
      setUpdatingId(null)
    })
  }

  return (
    <div className="space-y-8">
      {/* Current Staff Picks */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Current Staff Picks ({staffPicks.length})</h2>
        {staffPicks.length === 0 ? (
          <p className="text-muted-foreground">No staff picks selected yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {staffPicks.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center justify-between p-4 rounded-lg bg-card border border-primary/50"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground">{movie.release_year}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleStaffPick(movie)}
                  disabled={updatingId === movie.id}
                >
                  {updatingId === movie.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Star className="h-4 w-4 fill-primary text-primary" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* All Movies */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">All Movies</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regularMovies.map((movie) => (
            <div
              key={movie.id}
              className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{movie.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">{movie.release_year}</span>
                  {movie.rating && (
                    <Badge variant="secondary" className="text-xs">
                      {movie.rating.toFixed(1)}
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleStaffPick(movie)}
                disabled={updatingId === movie.id || isPending}
              >
                {updatingId === movie.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Star className="h-4 w-4 text-muted-foreground hover:text-primary" />
                )}
              </Button>
            </div>
          ))}
        </div>

        {regularMovies.length === 0 && search && (
          <p className="text-center text-muted-foreground py-8">No movies found matching &quot;{search}&quot;</p>
        )}
      </section>
    </div>
  )
}
