import { useUser } from "../hooks/useUser"
import { useProfileQuery } from "../queries/useProfileQuery"





export const ProfilePage = () => {
  const user = useUser()
  const { data: profile, isLoading, error } = useProfileQuery(user)

  if (!user) return <div className="p-4">You must be logged in to see your profile.</div>
  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto p-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4" />
        <div className="h-6 bg-gray-200 rounded mb-2" />
        <div className="h-6 bg-gray-200 rounded mb-2" />
        <div className="h-6 bg-gray-200 rounded mb-2" />
      </div>
    )
  }
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>
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