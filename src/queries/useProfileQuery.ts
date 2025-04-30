// src/queries/useProfileQuery.ts
import { useQuery } from "@tanstack/react-query"
import { supabase } from "../utils/supabaseClient"



interface AuthUser {
    id: string
    email?: string
    user_metadata?: {
      full_name?: string
      avatar_url?: string
      [key: string]: unknown
    }
  }

export function useProfileQuery(user: AuthUser | null) {
  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null
      // Try to fetch the profile
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()
      if (error) {
        // If not found, create it
        if (error.code === "PGRST116" || error.message.includes("No rows")) {
          const { data: newProfile, error: insertError } = await supabase
            .from("profiles")
            .insert({
              id: user.id,
              username: user.email?.split("@")[0] ?? "",
              display_name: user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "",
              avatar_url: user.user_metadata?.avatar_url ?? null,
              bio: ""
            })
            .select("*")
            .single()
          if (insertError) throw new Error(insertError.message)
          return newProfile
        }
        throw new Error(error.message)
      }
      return data
    },
    enabled: !!user, // Only run if user exists
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  })
}