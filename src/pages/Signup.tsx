import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import TextField from '../components/auth/TextField'
import PrimaryButton from '../components/auth/PrimaryButton'

function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signup(name, email, password)
      navigate('/')
    } catch (err) {
      setError('Unable to sign up. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] grid place-items-center">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Create your account</h1>
          <p className="text-slate-600 text-sm">Start managing your AWS costs</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            id="name"
            label="Full name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
          />
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
            {loading ? 'Creating account…' : 'Sign up'}
          </PrimaryButton>
        </form>
        <div className="mt-4 text-center text-sm">
          <span className="text-slate-600">Already have an account?</span>{' '}
          <Link to="/login" className="text-slate-900 font-medium hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup


