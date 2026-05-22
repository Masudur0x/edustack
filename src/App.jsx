import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext.jsx'
import { PreferencesProvider } from './context/PreferencesContext.jsx'
import Navbar from './components/Layout/Navbar.jsx'
import Footer from './components/Layout/Footer.jsx'
import Sidebar from './components/Layout/Sidebar.jsx'
import LandingPage from './components/Landing/LandingPage.jsx'
import AuthModals from './components/Auth/AuthModals.jsx'
import ResourceHub from './components/ResourceHub/ResourceHub.jsx'
import Onboarding from './components/Onboarding/Onboarding.jsx'
import WelcomeNudge from './components/Onboarding/WelcomeNudge.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Forum from './components/Forum/Forum.jsx'
import Quiz from './components/Quiz/Quiz.jsx'
import VirtualLabs from './components/VirtualLabs/VirtualLabs.jsx'

// Routes that use the in-app Sidebar layout. /onboarding intentionally excluded
// — onboarding has its own self-contained layout and runs pre-signup.
const APP_ROUTES = ['/dashboard', '/forum', '/quiz', '/labs', '/resources']

function ProtectedRoute({ children }) {
  const { user } = useApp()
  if (!user) return <Navigate to="/" replace />
  return children
}

function OnboardedRoute({ children }) {
  const { user } = useApp()
  if (!user) return <Navigate to="/" replace />
  if (!user.onboardingComplete) return <Navigate to="/onboarding" replace />
  return children
}

function Notification() {
  const { notification } = useApp()
  if (!notification) return null
  const colors = {
    success: 'bg-[#13151a] border-[#a3e635]/40',
    error:   'bg-red-900 border-red-700/50',
    info:    'bg-[#13151a] border-[#22d3ee]/30',
  }
  return (
    <div className={`fixed top-5 right-5 z-[9999] ${colors[notification.type] || colors.success} border text-white px-5 py-3 rounded-xl shadow-lime-lg text-sm font-medium animate-slide-up flex items-center gap-2`}>
      <span className="text-[#a3e635]">✦</span> {notification.msg}
    </div>
  )
}

function AppRoutes() {
  const { user } = useApp()
  const location = useLocation()
  const isAppPage = APP_ROUTES.some(r => location.pathname.startsWith(r))

  // Collapsible sidebar — shared so the main content margin tracks the rail width.
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try { return localStorage.getItem('edustack.sidebarCollapsed') === '1' } catch { return false }
  })
  const toggleSidebar = () => setSidebarCollapsed(prev => {
    const next = !prev
    try { localStorage.setItem('edustack.sidebarCollapsed', next ? '1' : '0') } catch { /* ignore */ }
    return next
  })

  const routes = (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/resources" element={<ResourceHub />} />
      <Route path="/onboarding" element={
        user?.onboardingComplete
          ? <Navigate to="/dashboard" replace />
          : <Onboarding />
      } />
      <Route path="/dashboard" element={<OnboardedRoute><Dashboard /></OnboardedRoute>} />
      <Route path="/forum"     element={<ProtectedRoute><Forum /></ProtectedRoute>} />
      <Route path="/quiz"      element={<OnboardedRoute><Quiz /></OnboardedRoute>} />
      <Route path="/labs"      element={<OnboardedRoute><VirtualLabs /></OnboardedRoute>} />
      <Route path="*"          element={<Navigate to="/" replace />} />
    </Routes>
  )

  if (isAppPage) {
    return (
      <div className="min-h-screen flex bg-[#0a0b0f]">
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        <main className={`flex-1 min-h-screen overflow-x-hidden transition-[margin] duration-200 ease-out ${sidebarCollapsed ? 'ml-[72px]' : 'ml-[224px]'}`}>
          {routes}
        </main>
        <AuthModals />
        <Notification />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0b0f]">
      <Navbar />
      <main className="flex-1">
        {routes}
      </main>
      <Footer />
      <AuthModals />
      <Notification />
      <WelcomeNudge />
    </div>
  )
}

export default function App() {
  return (
    <PreferencesProvider>
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </PreferencesProvider>
  )
}
