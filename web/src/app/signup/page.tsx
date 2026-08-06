'use client'
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Globe2, Mail, Lock, User as UserIcon } from "lucide-react"

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();

  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${location.origin}/auth/callback`
      }
    })
    router.refresh(); // refresh server state after auth
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <main className="flex min-h-screen bg-background">
      {/* Form side */}
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="mb-10 flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Globe2 className="size-5" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-foreground">Travelog</span>
          </Link>

          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">Create your account</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Join Travelog to save stays and track the best NZ hotel prices.
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSignUp}>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Full name
              </span>
              <span className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30">
                <span className="text-muted-foreground">
                  <UserIcon className="size-4" />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Kiri Ngata"
                  autoComplete="name"
                  required
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Email
              </span>
              <span className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30">
                <span className="text-muted-foreground">
                  <Mail className="size-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Password
              </span>
              <span className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30">
                <span className="text-muted-foreground">
                  <Lock className="size-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </span>
            </label>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Image side */}
      <div className="relative hidden lg:block lg:w-1/2">
        <Image
          src="/hotels/queenstown.png"
          alt="Lakefront lodge in Queenstown, New Zealand"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-12">
          <p className="max-w-md text-balance font-display text-2xl font-bold leading-tight text-white">
            One property. Every price. Compare New Zealand hotels in NZD.
          </p>
          <p className="mt-2 text-sm text-white/80">Queenstown, Aotearoa</p>
        </div>
      </div>
    </main>
  )
}
