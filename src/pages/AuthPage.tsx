/**
 * AuthPage.tsx
 * Handles user authentication (sign in, sign up, OAuth) using Supabase.
 * Supports Email/Password, Google, and GitHub providers.
 */
import React, { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

interface AuthFormState {
  email: string
  password: string
}

export function AuthPage() {
  const [form, setForm] = useState<AuthFormState>({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  // Handle input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Email/password sign up
  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })
    setLoading(false)
    if (error) setError(error.message)
    else setMessage('Check your email for a confirmation link!')
  }

  // Email/password sign in
  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })
    setLoading(false)
    if (error) setError(error.message)
    else setMessage('Signed in!')
  }

  // OAuth sign in (Google/GitHub)
  async function handleOAuth(provider: 'google' | 'github') {
    setLoading(true)
    setError(null)
    setMessage(null)
    const { error } = await supabase.auth.signInWithOAuth({ provider })
    setLoading(false)
    if (error) setError(error.message)
    // On success, Supabase will redirect
  }

  return (
    <section className="max-w-md mx-auto mt-10 p-8 bg-white rounded shadow text-center">
      <h2 className="text-2xl font-semibold mb-4">Sign In / Sign Up</h2>
      <form className="space-y-4" onSubmit={handleSignIn}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2 w-full"
          autoComplete="email"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2 w-full"
          autoComplete="current-password"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
            disabled={loading}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={handleSignUp}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex-1"
            disabled={loading}
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="my-4 text-center text-gray-500">or</div>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleOAuth('google')}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
          disabled={loading}
        >
          Continue with Google
        </button>
        <button
          onClick={() => handleOAuth('github')}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 w-full"
          disabled={loading}
        >
          Continue with GitHub
        </button>
      </div>
      {message && <div className="text-green-600 mt-4">{message}</div>}
      {error && <div className="text-red-600 mt-4">{error}</div>}
    </section>
  )
}