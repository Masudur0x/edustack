import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { usePreferences } from '../../context/PreferencesContext.jsx'

export default function Navbar() {
  const { user, setAuthModal, logout } = useApp()
  const { language, setLanguage, t } = usePreferences()
  const [menuOpen, setMenuOpen]       = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 glass border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src="/logo-EduStack.jpg" alt="EduStack" className="w-8 h-8 rounded-lg object-cover" />
          <span className="text-lg gradient-text" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            EduStack
          </span>
        </Link>

        {/* Desktop right cluster: theme + language + auth */}
        <div className="hidden md:flex items-center gap-2.5">

          {/* Language pill — EN / বাং */}
          <div className="flex items-center rounded-full overflow-hidden text-[11px] font-mono tracking-wide"
            style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
            <button
              onClick={() => setLanguage('en')}
              aria-label="Switch to English"
              className={`px-2.5 py-1 transition-colors ${
                language === 'en' ? 'bg-[#a3e635] text-[#0a0b0f] font-bold' : 'text-white/55 hover:text-white'
              }`}>
              EN
            </button>
            <button
              onClick={() => setLanguage('bn')}
              aria-label="Switch to Bangla"
              className={`px-2.5 py-1 transition-colors ${
                language === 'bn' ? 'bg-[#a3e635] text-[#0a0b0f] font-bold' : 'text-white/55 hover:text-white'
              }`}>
              বাং
            </button>
          </div>

          {/* Divider */}
          <span className="w-px h-5 bg-[var(--border)] mx-1" />

          {/* Auth */}
          {user ? (
            <div className="relative">
              <button onClick={() => setUserMenuOpen(o => !o)}
                className="flex items-center gap-2 btn-ghost">
                <div className="w-8 h-8 icon-container text-xs font-bold text-[#a3e635]">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-white/80">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className={`text-white/40 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-52 card shadow-mint-lg z-50 py-1">
                  <div className="px-4 py-2 border-b border-[#1e2028]">
                    <p className="text-xs text-white/40">{t('nav.signedInAs')}</p>
                    <p className="text-sm font-medium text-white truncate">{user.email}</p>
                  </div>
                  <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-[#13151a] transition-colors">
                    <LayoutDashboard size={15} /> {t('nav.dashboard')}
                  </Link>
                  <button onClick={() => { logout(); setUserMenuOpen(false) }}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-[#13151a] transition-colors w-full text-left">
                    <LogOut size={15} /> {t('nav.signOut')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => setAuthModal('login')} className="btn-ghost text-sm">{t('nav.login')}</button>
              <button onClick={() => navigate('/onboarding')} className="btn-primary text-sm">{t('nav.signup')}</button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden btn-ghost p-2" onClick={() => setMenuOpen(o => !o)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#1e2028] px-4 py-3 animate-slide-up shadow-glass"
          style={{ background: 'rgba(10,11,15,0.98)', backdropFilter: 'blur(24px)' }}>

          {/* Mobile language row */}
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-[var(--border)]">
            <span className="text-[10px] tracking-[0.22em] uppercase text-white/35 font-mono">
              {t('pref.language.label')}
            </span>
            <div className="flex items-center rounded-full overflow-hidden text-[11px] font-mono"
              style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
              <button onClick={() => setLanguage('en')}
                className={`px-3 py-1 ${language === 'en' ? 'bg-[#a3e635] text-[#0a0b0f] font-bold' : 'text-white/55'}`}>
                EN
              </button>
              <button onClick={() => setLanguage('bn')}
                className={`px-3 py-1 ${language === 'bn' ? 'bg-[#a3e635] text-[#0a0b0f] font-bold' : 'text-white/55'}`}>
                বাং
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {user ? (
              <button onClick={() => { logout(); setMenuOpen(false) }}
                className="flex items-center gap-2 text-red-400 btn-ghost py-2.5 text-sm">
                <LogOut size={15} /> {t('nav.signOut')}
              </button>
            ) : (
              <>
                <button onClick={() => { setAuthModal('login'); setMenuOpen(false) }} className="btn-secondary text-sm">{t('nav.login')}</button>
                <button onClick={() => { navigate('/onboarding'); setMenuOpen(false) }} className="btn-primary text-sm">{t('nav.signup')}</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
