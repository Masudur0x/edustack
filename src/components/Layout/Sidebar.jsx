import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Library, Brain,
  FlaskConical, Users, LogOut, Zap,
} from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

const MAIN_NAV = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard', auth: true },
  { icon: Library,         label: 'Resources', to: '/resources' },
  { icon: Brain,           label: 'Quizzes',   to: '/quiz',      auth: true },
  { icon: FlaskConical,    label: 'Labs',       to: '/labs',      auth: true },
]

const OTHER_NAV = [
  { icon: Users, label: 'Forum', to: '/forum', auth: true },
]

function NavItem({ icon: Icon, label, to, active, onClick }) {
  return (
    <button onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm mb-0.5 transition-all font-medium ${
        active
          ? 'bg-[#a3e635] text-[#0a0b0f] font-bold shadow-lime'
          : 'text-white/55 hover:text-white hover:bg-[#13151a]'
      }`}>
      <Icon size={16} />
      {label}
    </button>
  )
}

export default function Sidebar() {
  const { user, setAuthModal, logout } = useApp()
  const location = useLocation()
  const navigate  = useNavigate()

  const handleNav = (to, requiresAuth) => {
    if (requiresAuth && !user) { setAuthModal('login'); return }
    navigate(to)
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-[224px] flex flex-col border-r border-[#1e2028] z-40"
      style={{ background: '#111318' }}>

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 px-4 py-5 border-b border-[#1e2028] flex-shrink-0">
        <img src="/logo-EduStack.jpg" alt="EduStack" className="w-8 h-8 rounded-lg object-cover" />
        <span className="text-base gradient-text" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
          EduStack
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-[10px] text-white/25 font-semibold uppercase tracking-widest px-3 mb-2">Main</p>
        {MAIN_NAV.map(({ icon, label, to, auth }) => (
          <NavItem key={to} icon={icon} label={label} to={to}
            active={location.pathname === to}
            onClick={() => handleNav(to, auth && !user)} />
        ))}

        <p className="text-[10px] text-white/25 font-semibold uppercase tracking-widest px-3 mb-2 mt-5">Community</p>
        {OTHER_NAV.map(({ icon, label, to, auth }) => (
          <NavItem key={to} icon={icon} label={label} to={to}
            active={location.pathname === to}
            onClick={() => handleNav(to, auth && !user)} />
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 pt-3 border-t border-[#1e2028] flex-shrink-0">
        {user ? (
          <>
            <div className="flex items-center gap-2.5 px-2 py-2 mb-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#0a0b0f] flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#a3e635,#22d3ee)' }}>
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate leading-tight">{user.name}</p>
                <p className="text-[11px] text-white/35 truncate">{user.email}</p>
              </div>
            </div>
            <button onClick={logout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-[#13151a] rounded-xl transition-colors">
              <LogOut size={14} /> Sign Out
            </button>
          </>
        ) : (
          <div className="space-y-2">
            <div className="px-2 py-2 rounded-xl border border-[#a3e635]/20 mb-2" style={{ background: 'rgba(163,230,53,0.06)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Zap size={12} className="text-[#a3e635]" />
                <span className="text-xs text-[#a3e635] font-semibold">Free Forever</span>
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed">Courses, labs & quizzes — no credit card.</p>
            </div>
            <button onClick={() => setAuthModal('login')} className="btn-secondary text-sm w-full py-2">Log In</button>
            <button onClick={() => setAuthModal('signup')} className="btn-primary text-sm w-full py-2">Get Started</button>
          </div>
        )}
      </div>
    </aside>
  )
}
