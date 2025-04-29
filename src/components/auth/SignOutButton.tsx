/**
 * SignOutButton.tsx
 * Button to sign out the current Supabase user.
 */
import { supabase } from '../../utils/supabaseClient'

export function SignOutButton() {
  async function handleSignOut() {
    await supabase.auth.signOut()
    // Optionally, you can show a message or redirect the user here
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm text-gray-600 hover:text-red-600 px-3 py-1 border border-gray-300 rounded transition"
    >
      Sign Out
    </button>
  )
}