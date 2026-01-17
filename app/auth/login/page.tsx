"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { createBrowserClient } from "@/lib/supabase/client"
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/home")
    router.refresh()
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - cinematic background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/cinematic-movie-theater-dark-red-velvet-seats.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        <div className="relative z-10 flex flex-col justify-end p-12 pb-20">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Your next favorite movie is waiting</h2>
          <p className="text-lg text-muted-foreground max-w-md">
            Personalized recommendations based on your taste, all in one place.
          </p>
        </div>
      </div>

      {/* Right side - login form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-12 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground mt-2">Sign in to continue watching</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="h-14 pl-12 bg-card border-border text-base placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-14 pl-12 bg-card border-border text-base placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-14 text-base font-semibold group" disabled={loading}>
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-center text-muted-foreground">
              New to WatchNext?{" "}
              <Link href="/auth/signup" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}