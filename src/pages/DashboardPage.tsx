// src/pages/DashboardPage.tsx

/**
 * DashboardPage
 * Protected area for authenticated users. Replace with your app's dashboard content.
 */
export function DashboardPage() {
  return (
    <section className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded shadow text-center">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <p className="text-gray-700">
        This is your dashboard. Only authenticated users should see this page.
      </p>
      {/* TODO: Add protected content and user-specific features here */}
    </section>
  );
}