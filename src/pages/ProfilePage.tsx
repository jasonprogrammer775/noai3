import { useState } from "react"
import { useUser } from "../hooks/useUser"
import { useProfileQuery } from "../queries/useProfileQuery"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "../utils/supabaseClient"




interface MutationError {
    message: string
  }


export const ProfilePage = () => {
  const user = useUser()
  const queryClient = useQueryClient()
  const { data: profile, isLoading, error } = useProfileQuery(user)
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({ display_name: "", bio: "" })
  const [formError, setFormError] = useState<string | null>(null)

  // Pre-fill form when entering edit mode
  const startEdit = () => {
    if (profile) setForm({ display_name: profile.display_name, bio: profile.bio || "" })
    setIsEditing(true)
    setFormError(null)
  }

  // Mutation for updating profile
  const updateProfile = useMutation({
    mutationFn: async (fields: { display_name: string; bio: string }) => {
      const { error } = await supabase
        .from("profiles")
        .update(fields)
        .eq("id", user?.id)
      if (error) throw new Error(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] })
      setIsEditing(false)
    },
    onError: (err: MutationError) => setFormError(err.message)
  })

  if (!user) return <div className="p-4">You must be logged in to see your profile.</div>
  if (isLoading) return <div className="max-w-xl mx-auto p-4 animate-pulse"><div className="h-8 bg-gray-200 rounded mb-4" /></div>
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>
  if (!profile) return <div className="p-4">No profile found.</div>

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {isEditing ? (
        <form
          className="space-y-4"
          onSubmit={e => {
            e.preventDefault()
            updateProfile.mutate({ display_name: form.display_name, bio: form.bio })
          }}
        >
          <div>
            <label className="font-semibold">Display Name:</label>
            <input
              className="block w-full border rounded p-2 mt-1"
              value={form.display_name}
              onChange={e => setForm(f => ({ ...f, display_name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="font-semibold">Bio:</label>
            <textarea
              className="block w-full border rounded p-2 mt-1"
              value={form.bio}
              onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
              rows={3}
            />
          </div>
          {formError && <div className="text-red-500">{formError}</div>}
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={updateProfile.isPending}
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setIsEditing(false)}
              disabled={updateProfile.isPending}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
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
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={startEdit}
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  )
}