import React from 'react'

const mockAccounts = [
  { id: 1, username: 'admin', email: 'admin@example.com', password: '123456', role: 'admin', status: 'active' },
  { id: 2, username: 'user1', email: 'user1@example.com', password: '123456', role: 'user', status: 'active' },
  { id: 3, username: 'user2', email: 'user2@example.com', password: '123456', role: 'user', status: 'locked' },
]

export const AuthContext = React.createContext({
  user: null,
  login: async () => {},
  logout: () => {},
})

function authReducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload }
    case 'logout':
      return { ...state, user: null }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(authReducer, { user: null })

  const login = async ({ username, password }) => {
    // validation and mock auth
    if (!username || !password) {
      return { ok: false, message: 'Username and password required' }
    }

    const found = mockAccounts.find((a) => a.username === username && a.password === password)
    if (!found) return { ok: false, message: 'Invalid credentials' }
    if (found.role !== 'admin') return { ok: false, message: 'Only admin allowed' }
    if (found.status !== 'active') return { ok: false, message: 'Account inactive' }

    dispatch({ type: 'login', payload: { id: found.id, username: found.username, role: found.role } })
    return { ok: true }
  }

  const logout = () => dispatch({ type: 'logout' })

  return <AuthContext.Provider value={{ user: state.user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
