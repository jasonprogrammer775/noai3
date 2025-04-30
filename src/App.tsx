/**
 * App.tsx
 * Main application component. Sets up global providers, routing, and the app header.
 */
import { Route, BrowserRouter as Router, Routes,  } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LearningPage } from './pages/LearningPage'
import { AuthPage } from './pages/AuthPage'
import { ProfilePage } from './pages/ProfilePage'
// ...import your pages/components

// Initialize React Query client (for server state management)
const queryClient = new QueryClient()

export default function App() {
  return (
    // Provide React Query context to the app
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header
          title="NoAI Flame"
          subtitle="Your AI-Free Learning App"
          links={[
            { to: '/', label: 'Learning' },
            { to: '/auth', label: 'Login / Signup' },
            { to: '/profile', label: 'Profile' }
            // ...other links
          ]}
        />
        <main>
          <Routes>
            {/* Define your routes here */}
             <Route path="/" element={<LearningPage />} /> 
             <Route path="/auth" element={<AuthPage />} />
             <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </Router>
    </QueryClientProvider>
  )
}
