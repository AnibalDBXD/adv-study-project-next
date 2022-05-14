import { User } from './types'
import { createContext, ReactNode, useContext, useState } from 'react'
import { useRouter } from 'next/router'

interface UserContextValue {
  user: User | null;
  login: (user: User) => void;
}

const initivalUserValue = {
  user: null,
  login: () => { }
}

export const UserContext = createContext<UserContextValue>(initivalUserValue)

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(initivalUserValue.user)
  const { push } = useRouter()

  const login = async (user: User) => {
    const response = await fetch('/api/login', { body: JSON.stringify(user), method: 'POST' })
    const data = await response.json()
    if (response.status !== 200) {
      return alert(data.message)
    }
    push('/')
    setUser(data.user)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): UserContextValue => useContext(UserContext)
