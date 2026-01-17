import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import type { Movie } from "@/lib/types"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="group relative shrink-0 w-45 md:w-50">
      <div className="relative aspect-2/3 rounded-lg overflow-hidden bg-card border border-border group-hover:border-primary/50 transition-all">
        <Image
          src={
            movie.poster_url ||
            `/placeholder.svg?height=300&width=200&query=${encodeURIComponent(movie.title + " movie poster")}`
          }
          alt={movie.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="200px"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Rating badge */}
        {movie.rating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-sm font-medium">
            <Star className="h-3 w-3 text-primary fill-primary" />
            {movie.rating.toFixed(1)}
          </div>
        )}

        {/* Hover info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
          <p className="text-xs text-muted-foreground line-clamp-2">{movie.genres?.join(", ")}</p>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">{movie.title}</h3>
        <p className="text-xs text-muted-foreground">{movie.year}</p>
      </div>
    </Link>
  )
}
