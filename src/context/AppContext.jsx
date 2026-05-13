import { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

const DEMO_USER = {
  id: 'u1', name: 'Alex Chen', email: 'alex@example.com',
  major: { primary: 'cs', secondary: ['ds'] },
  knowledgeLevel: 'Intermediate',
  learningGoals: ['job', 'cert'],
  hoursPerWeek: 8,
  onboardingComplete: true,
  streak: 7,
  joinDate: '2026-03-01',
  completedIds: ['c1', 'c3', 'c10'],
  quizScores: { Programming: 85, Statistics: 62 },
  notifications: { newsletter: 'weekly', quizReminders: true, contentAlerts: true },
  savedResources: ['c2', 'cert7'],
}

export function AppProvider({ children }) {
  const [user, setUser]             = useState(null)
  const [authModal, setAuthModal]   = useState(null) // 'login' | 'signup' | null
  const [notification, setNotif]    = useState(null)
  // Onboarding answers collected BEFORE signup, merged into user on signup
  const [pendingOnboarding, setPendingOnboarding] = useState(null)

  const showNotification = useCallback((msg, type = 'success') => {
    setNotif({ msg, type })
    setTimeout(() => setNotif(null), 3500)
  }, [])

  const login = useCallback((email, _password) => {
    // Demo: accept any credentials
    const u = { ...DEMO_USER, email }
    setUser(u)
    setAuthModal(null)
    showNotification(`Welcome back, ${u.name.split(' ')[0]}!`)
    return u
  }, [showNotification])

  const signup = useCallback((data) => {
    // If user filled the onboarding before signing up, merge those answers in now.
    const hasPending = pendingOnboarding && Object.keys(pendingOnboarding).length > 0
    const u = {
      ...DEMO_USER,
      id: 'u_new',
      name: data.name,
      email: data.email,
      onboardingComplete: !!hasPending,
      completedIds: [],
      streak: 0,
      joinDate: new Date().toISOString().split('T')[0],
      ...(hasPending ? pendingOnboarding : {}),
    }
    setUser(u)
    setAuthModal(null)
    setPendingOnboarding(null)
    showNotification(hasPending
      ? `Welcome, ${u.name.split(' ')[0]}! Your dashboard is ready.`
      : `Welcome, ${u.name.split(' ')[0]}! Let's set up your profile.`)
    return u
  }, [showNotification, pendingOnboarding])

  const logout = useCallback(() => {
    setUser(null)
    showNotification('Logged out successfully.')
  }, [showNotification])

  const completeOnboarding = useCallback((onboardingData) => {
    setUser(prev => ({
      ...prev,
      ...onboardingData,
      onboardingComplete: true,
    }))
    showNotification('Profile set up! Your dashboard is ready.')
  }, [showNotification])

  const toggleSave = useCallback((resourceId) => {
    setUser(prev => {
      const saved = prev.savedResources || []
      const isSaved = saved.includes(resourceId)
      showNotification(isSaved ? 'Removed from saved' : 'Saved to your list')
      return { ...prev, savedResources: isSaved ? saved.filter(id => id !== resourceId) : [...saved, resourceId] }
    })
  }, [showNotification])

  const markComplete = useCallback((courseId) => {
    setUser(prev => {
      if (prev.completedIds.includes(courseId)) return prev
      showNotification('Course marked as complete! 🎉')
      return { ...prev, completedIds: [...prev.completedIds, courseId] }
    })
  }, [showNotification])

  const saveQuizScore = useCallback((topic, score) => {
    setUser(prev => ({
      ...prev,
      quizScores: { ...(prev.quizScores || {}), [topic]: score },
    }))
  }, [])

  return (
    <AppContext.Provider value={{
      user, authModal, notification,
      setAuthModal, login, signup, logout,
      completeOnboarding, toggleSave, markComplete,
      saveQuizScore, showNotification,
      pendingOnboarding, setPendingOnboarding,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
