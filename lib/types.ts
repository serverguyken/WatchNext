export interface Movie {
  id: string
  title: string
  poster_url: string | null
  rating: number | null
  description: string | null
  genres: string[]
  runtime: number | null
  year: number | null
  cast_members: string[]
  where_to_watch: Record<string, string | null>
  staff_pick: boolean
  featured: boolean
  created_at: string
  updated_at: string
  streaming_services: string[]
}

export interface Profile {
  id: string
  email: string | null
  onboarding_completed: boolean
  favorite_genres: string[]
  linked_streaming_accounts: Record<string, StreamingAccount>
  created_at: string
  updated_at: string
}

export interface StreamingAccount {
  connected: boolean
  connected_at: string | null
  display_name: string | null
  region: string | null
}

export const STREAMING_SERVICES = [
  { id: "netflix", name: "Netflix", color: "#E50914" },
  { id: "prime", name: "Prime Video", color: "#00A8E1" },
  { id: "hulu", name: "Hulu", color: "#1CE783" },
  { id: "apple", name: "Apple TV+", color: "#000000" },
  { id: "hbo", name: "Max", color: "#002BE7" },
] as const

export const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "War",
  "Western",
] as const
