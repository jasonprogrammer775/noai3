

/**
 * useUser.ts
 * Custom React hook to get and subscribe to the current Supabase user session.
 */
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import type { User } from '@supabase/supabase-js'

export function useUser() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Get the current session on mount
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null))

    // Listen for auth state changes and update user
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // Cleanup the listener on unmount
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return user
}