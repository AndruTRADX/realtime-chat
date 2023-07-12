import { createContext, useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
// import endpoints from '../libs/endpoints'
// import axios from 'axios'
// import Cookie from 'js-cookie'

type UserLog = {
  username: string
  avatarURL: string
}

type AuthContextType = {
  user: UserLog | null
  login: (userLog: UserLog) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<UserLog | null>(null)
  const navigate = useNavigate()

  const login = async (userLog: UserLog) => {
    setUser(userLog)
    navigate('/chat')
  }

  const logout = () => {
    setUser(null)
    navigate('/')
  }

  const authContextValue: AuthContextType = {
    user,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextType {
  const auth = useContext(AuthContext)
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return auth
}

function AuthRoute({ children }: { children: JSX.Element }) {
  const auth = useAuth()

  if (!auth.user) {
    return <Navigate to="/" />
  }

  return children
}

export { AuthProvider, useAuth, AuthRoute }
