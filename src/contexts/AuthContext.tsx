import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types'
import { readStorage, writeStorage } from '../utils/storage'

interface AuthContextValue {
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const userStorageKey = 'shopmini.user'
export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const username = readStorage(userStorageKey, 'sessionStorage')
    return typeof username === 'string' && username.trim() ? { username } : null
  })

  function login(username: string, password: string): boolean {
    const name = username.trim()
    if (name.length === 0 || password !== '123456') return false

    setUser({ username: name })
    writeStorage(userStorageKey, name, 'sessionStorage')
    return true
  }

  function logout() {
    setUser(null)
    writeStorage(userStorageKey, null, 'sessionStorage')
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth phải nằm bên trong AuthProvider.')
  return context
}
