import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../useLocalStorage'
import { defaultUser } from '../data/seed'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [account, setAccount] = useLocalStorage('tasks_account', defaultUser)
  const [session, setSession] = useLocalStorage('tasks_session', null)

  const value = useMemo(
    () => ({
      user: session ? account : null,
      account,
      signIn: ({ name, email } = {}) => {
        setAccount((prev) => ({
          ...prev,
          name: name || prev.name,
          email: email || prev.email,
        }))
        setSession({ active: true })
      },
      signUp: ({ name, email, password }) => {
        setAccount((prev) => ({
          ...prev,
          name: name || prev.name,
          email: email || prev.email,
          password: password || prev.password,
        }))
        setSession({ active: true })
      },
      signOut: () => setSession(null),
      updateAccount: (patch) => setAccount((prev) => ({ ...prev, ...patch })),
    }),
    [account, session, setAccount, setSession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
