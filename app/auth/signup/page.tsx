"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { createBrowserClient } from "@/lib/supabase/client"
import { Loader2, CheckCircle, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/onboarding`,
        data: {
          full_name: name,
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Check your inbox</h1>
          <p className="text-muted-foreground text-lg mb-2">We sent a confirmation link to</p>
          <p className="text-foreground font-semibold mb-8">{email}</p>
          <p className="text-sm text-muted-foreground mb-8">
            Click the link in the email to activate your account and start discovering movies.
          </p>
          <Link href="/auth/login">
            <Button variant="outline" size="lg" className="bg-transparent">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - features showcase */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/movie-popcorn-cinema-dark-moody-aesthetic.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

        <div className="relative z-10 flex flex-col justify-center p-12">
          <div className="space-y-8 max-w-md">
            <div>
              <Sparkles className="h-10 w-10 text-primary mb-4" />
              <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Discover your perfect watchlist</h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of movie lovers finding their next favorite film.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              {[
                { title: "Personalized picks", desc: "AI-powered recommendations tailored to you" },
                { title: "All your services", desc: "See where movies stream across platforms" },
                { title: "Staff curated", desc: "Expert picks from film enthusiasts" },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right side - signup form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-12 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
            <p className="text-muted-foreground mt-2">Start discovering great movies today</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className="h-14 pl-12 bg-card border-border text-base placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="h-14 pl-12 bg-card border-border text-base placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground pl-1">At least 6 characters</p>
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
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>

          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
