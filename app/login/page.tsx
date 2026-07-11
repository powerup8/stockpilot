'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (res?.error) {
      setError('Invalid email or password')
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
      <div className="w-full max-w-sm bg-[#1E293B] rounded-xl border border-white/10 p-8">
        <Link
          href="/"
          className="text-sm font-medium text-slate-400 hover:text-[#F8FAFC] transition-colors duration-150 mb-6 inline-block"
        >
          ← Back
        </Link>

        <h1 className="text-2xl font-semibold text-[#F8FAFC] mb-1">Welcome back</h1>
        <p className="text-sm text-slate-400 mb-6">Log in to manage your inventory</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-white/10 bg-[#0F172A] text-[#F8FAFC] px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow duration-150"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-white/10 bg-[#0F172A] text-[#F8FAFC] px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow duration-150"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563EB] text-white text-sm font-medium rounded-lg py-2 hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-sm text-slate-400 mt-6 text-center">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#60A5FA] hover:text-[#93C5FD] font-medium transition-colors duration-150">
             Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}