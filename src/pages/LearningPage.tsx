import { Link } from "react-router-dom"

export const LearningPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
    <h1 className="text-4xl font-bold mb-4 text-center">Welcome to NoAI Flame</h1>
    <p className="text-lg mb-8 text-center max-w-xl">
      Your AI-Free Learning App. Join a community focused on authentic, distraction-free learning and social connection. Sign up to create your profile, share your progress, and connect with others!
    </p>
    <div className="flex gap-4">
      <Link
        to="/auth"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Sign Up / Log In
      </Link>
      <Link
        to="/profile"
        className="bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300 transition"
      >
        My Profile
      </Link>
    </div>
  </div>
)