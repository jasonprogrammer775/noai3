import { useEffect, useState } from "react"
import { supabase } from "../utils/supabaseClient"
import { useUser } from "../hooks/useUser"

interface Profile {
  id: string
  username: string
  display_name: string
  avatar_url: string | null
  bio: string | null
  created_at: string
}

export const ProfilePage = () => {
    const user = useUser()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    const fetchProfile = async () => {
      setIsLoading(true)
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()
      if (error) setError(error.message)
      else setProfile(data)
      setIsLoading(false)
    }
    fetchProfile()
  }, [user])

  if (!user) return <div className="p-4">You must be logged in to see your profile.</div>
  if (isLoading) return <div className="p-4">Loading profile...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>
  if (!profile) return <div className="p-4">No profile found.</div>

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="mb-4">
        <div className="font-semibold">Username:</div>
        <div>{profile.username}</div>
      </div>
      <div className="mb-4">
        <div className="font-semibold">Display Name:</div>
        <div>{profile.display_name}</div>
      </div>
      <div className="mb-4">
        <div className="font-semibold">Bio:</div>
        <div>{profile.bio}</div>
      </div>
      {/* Add avatar and edit form here later */}
    </div>
  )
}