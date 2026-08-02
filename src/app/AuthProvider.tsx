import { useEffect, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { AuthContext } from './auth-context'
import { syncRoutinesFromCloud } from '../lib/routinesApi'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { loadStore, saveStore, updateProfile } from '../lib/store'

function displayNameFromUser(user: User) {
  return (
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    (user.user_metadata?.display_name as string | undefined) ||
    user.email?.split('@')[0] ||
    'User'
  )
}

function clearSessionLocalData() {
  const store = loadStore()
  store.routines = []
  store.checkins = []
  store.photos = []
  store.ratings = []
  store.profile = {
    ...store.profile,
    displayName: '',
    goal: undefined,
  }
  saveStore(store)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    const hydrateUser = (nextUser: User) => {
      const store = loadStore()
      if (!store.profile.displayName) {
        updateProfile({ displayName: displayNameFromUser(nextUser) })
      }
      // Defer so we don't deadlock Supabase auth lock (async in onAuthStateChange).
      setTimeout(() => {
        void syncRoutinesFromCloud()
      }, 0)
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user ?? null)
      if (data.session?.user) {
        hydrateUser(data.session.user)
      }
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((event, next) => {
      setSession(next)
      setUser(next?.user ?? null)
      if (event === 'SIGNED_OUT') {
        clearSessionLocalData()
        return
      }
      if (next?.user) {
        hydrateUser(next.user)
      }
    })

    return () => sub.subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    try {
      if (supabase) {
        const { error } = await supabase.auth.signOut({ scope: 'local' })
        if (error) {
          console.warn('signOut', error.message)
          await supabase.auth.signOut({ scope: 'global' }).catch(() => undefined)
        }
      }
    } finally {
      setUser(null)
      setSession(null)
      clearSessionLocalData()
    }
  }

  const continueAsGuest = () => {
    const store = loadStore()
    if (!store.profile.displayName) {
      updateProfile({ displayName: 'Guest' })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        configured: isSupabaseConfigured,
        signOut,
        continueAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
