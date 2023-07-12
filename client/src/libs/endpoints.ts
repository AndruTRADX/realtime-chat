const API = import.meta.env.VITE_API_URL

const endpoints = {
  auth: {
    login: `${API}/auth/login`,
    redirect: `${API}/auth/google/callback`,
  },
  user: `${API}/user`,
  contact: `${API}/contact`,
  chat: `${API}/chat`,
}

export default endpoints
