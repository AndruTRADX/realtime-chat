import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import { AuthProvider, AuthRoute } from './context/auth'

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/chat"
            element={
              <AuthRoute>
                <Home />
              </AuthRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
