import { useAuth } from '../context/AuthContext'

function Home() {
  const { isAuthenticated } = useAuth()

  // This should only be shown to authenticated users due to redirect logic in App.tsx
  if (!isAuthenticated) {
    return null // This shouldn't be reached due to redirect, but just in case
  }

  return (
    <div className="space-y-2">
      <h1 className="text-xl sm:text-2xl font-semibold">Welcome to Workmates</h1>
      <p className="text-sm sm:text-base text-slate-600">Manage your AWS resources efficiently.</p>
    </div>
  )
}

export default Home
