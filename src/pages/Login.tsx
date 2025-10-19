import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import TextField from '../components/auth/TextField'
import PrimaryButton from '../components/auth/PrimaryButton'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] grid place-items-center">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-slate-600 text-sm">Log in to your account</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          {error ? <p className="text-red-600 text-sm">{error}</p> : null}
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Logging in…' : 'Log in'}
          </PrimaryButton>
        </form>
        <div className="mt-4 text-center text-sm">
          <span className="text-slate-600">Don't have an account?</span>{' '}
          <Link to="/signup" className="text-slate-900 font-medium hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login


