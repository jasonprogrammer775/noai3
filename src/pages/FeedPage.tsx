import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "../utils/supabaseClient"
import { useUser } from "../hooks/useUser"

interface Post {
  id: string
  user_id: string
  content: string
  created_at: string
  profiles?: { display_name: string; username: string }[]
}

export const FeedPage = () => {
  const user = useUser()
  const queryClient = useQueryClient()
  const [content, setContent] = useState("")
  const [formError, setFormError] = useState<string | null>(null)

  // Fetch posts with author info
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, user_id, content, created_at, profiles(display_name, username)")
        .order("created_at", { ascending: false })
      if (error) throw new Error(error.message)
      return data as Post[]
    }
  })

  // Mutation for creating a post
  const createPost = useMutation({
    mutationFn: async (content: string) => {
      setFormError(null)
      const { error } = await supabase.from("posts").insert({
        user_id: user?.id,
        content
      })
      if (error) throw new Error(error.message)
    },
    onSuccess: () => {
      setContent("")
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
    onError: (err: unknown) => {
      if (typeof err === "object" && err !== null && "message" in err) {
        setFormError((err as { message: string }).message)
      } else {
        setFormError("An unknown error occurred.")
      }
    }
  })

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Feed</h1>
      {user && (
        <form
          className="mb-6"
          onSubmit={e => {
            e.preventDefault()
            if (content.trim()) createPost.mutate(content)
          }}
        >
          <textarea
            className="w-full border rounded p-2 mb-2"
            placeholder="What's on your mind?"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={3}
            required
          />
          {formError && <div className="text-red-500 mb-2">{formError}</div>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={createPost.isPending}
          >
            Post
          </button>
        </form>
      )}
      {isLoading ? (
        <div>Loading posts...</div>
      ) : error ? (
        <div className="text-red-500">Error: {error.message}</div>
      ) : posts && posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map(post => {
            const author = post.profiles?.[0]
            return (
              <li key={post.id} className="border rounded p-4 bg-white shadow-sm">
                <div className="text-sm text-gray-600 mb-1">
                  {author?.display_name || "Unknown"} @{author?.username || ""}
                  <span className="ml-2 text-gray-400">
                    {new Date(post.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="text-lg">{post.content}</div>
              </li>
            )
          })}
        </ul>
      ) : (
        <div>No posts yet. Be the first to post!</div>
      )}
    </div>
  )
}