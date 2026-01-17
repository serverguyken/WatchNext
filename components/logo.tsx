import { Film } from "lucide-react"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Film className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold tracking-tight">WatchNext</span>
    </div>
  )
}
