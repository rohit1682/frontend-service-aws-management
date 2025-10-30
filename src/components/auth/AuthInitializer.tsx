import { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Loader from '../../utils/Loader'

interface AuthInitializerProps {
  children: React.ReactNode
}

const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const { initialize, isInitialized } = useAuth()

  useEffect(() => {
    initialize()
  }, [initialize])

  if (!isInitialized) {
    return <Loader fullScreen />
  }

  return <>{children}</>
}

export default AuthInitializer