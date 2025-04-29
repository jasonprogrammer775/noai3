// src/pages/HomePage.tsx

/**
 * HomePage
 * The landing page for the app. Welcomes users and provides a brief intro.
 */
export function HomePage() {
  return (
    <section className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded shadow text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to NoAI App</h1>
      <p className="text-gray-700 mb-2">
        This is a modern React + Supabase starter with authentication, modular structure, and Tailwind CSS.
      </p>
      <p className="text-gray-500">
        Use the navigation above to sign in or access your dashboard.
      </p>
    </section>
  );
}