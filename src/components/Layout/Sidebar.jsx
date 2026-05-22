import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Library, Brain, FlaskConical, Users,
  LogOut, LogIn, Zap, ChevronsLeft, ChevronsRight,
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

function NavItem({ icon: Icon, label, active, collapsed, onClick }) {
  return (
    <button onClick={onClick}
      aria-current={active ? 'page' : undefined}
      title={collapsed ? label : undefined}
      className={`group relative w-full flex items-center py-2.5 rounded-xl text-sm mb-0.5
                  transition-colors duration-150 ${collapsed ? 'justify-center px-0' : 'gap-3 px-3'} ${
        active
          ? 'bg-[#a3e635]/10 text-[#a3e635] font-semibold'
          : 'text-white/55 hover:text-white hover:bg-white/[0.04]'
      }`}>
      {/* left accent bar (active indicator) */}
      <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-[#a3e635]
                        transition-opacity duration-150 ${active ? 'opacity-100' : 'opacity-0'}`} />
      <Icon size={18} strokeWidth={2}
        className={`shrink-0 transition-colors ${active ? 'text-[#a3e635]' : 'text-white/45 group-hover:text-white/80'}`} />
      {!collapsed && <span className="truncate">{label}</span>}

      {/* hover tooltip when collapsed */}
      {collapsed && (
        <span className="pointer-events-none absolute left-full ml-3 px-2 py-1 rounded-md
                         bg-[#1a1c24] border border-[#2a2d38] text-xs text-white whitespace-nowrap
                         opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50 shadow-glass">
          {label}
        </span>
      )}
    </button>
  )
}

export default function Sidebar({ collapsed = false, onToggle }) {
  const { user, setAuthModal, logout } = useApp()
  const location = useLocation()
  const navigate = useNavigate()

  const handleNav = (to, requiresAuth) => {
    if (requiresAuth && !user) { setAuthModal('login'); return }
    navigate(to)
  }

  return (
    <aside
      className={`fixed left-0 top-0 h-screen flex flex-col border-r border-[#1e2028] z-40
                  transition-[width] duration-200 ease-out ${collapsed ? 'w-[72px]' : 'w-[224px]'}`}
      style={{ background: '#111318' }}>

      {/* Logo + collapse toggle */}
      <div className={`flex items-center h-[68px] border-b border-[#1e2028] flex-shrink-0
                       ${collapsed ? 'justify-center px-0' : 'gap-2.5 px-4'}`}>
        <Link to="/" className="flex items-center gap-2.5 min-w-0">
          <img src="/logo-EduStack.jpg" alt="EduStack" className="w-8 h-8 rounded-lg object-cover shrink-0" />
          {!collapsed && (
            <span className="text-base gradient-text truncate" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              EduStack
            </span>
          )}
        </Link>
        {!collapsed && (
          <button onClick={onToggle} aria-label="Collapse sidebar"
            className="ml-auto p-1.5 rounded-lg text-white/35 hover:text-white hover:bg-white/[0.05] transition-colors">
            <ChevronsLeft size={16} />
          </button>
        )}
      </div>

      {/* Expand toggle (only when collapsed) */}
      {collapsed && (
        <button onClick={onToggle} aria-label="Expand sidebar"
          className="mx-auto mt-3 mb-1 p-1.5 rounded-lg text-white/35 hover:text-white hover:bg-white/[0.05] transition-colors">
          <ChevronsRight size={16} />
        </button>
      )}

      {/* Nav */}
      <nav className={`flex-1 px-3 py-4 ${collapsed ? 'overflow-visible' : 'overflow-y-auto'}`}>
        {!collapsed && (
          <p className="text-[10px] text-white/30 font-semibold uppercase tracking-widest px-3 mb-2">Main</p>
        )}
        {MAIN_NAV.map(({ icon, label, to, auth }) => (
          <NavItem key={to} icon={icon} label={label} collapsed={collapsed}
            active={location.pathname === to}
            onClick={() => handleNav(to, auth && !user)} />
        ))}

        {collapsed
          ? <div className="my-3 mx-auto h-px w-8 bg-[#1e2028]" />
          : <p className="text-[10px] text-white/30 font-semibold uppercase tracking-widest px-3 mb-2 mt-5">Community</p>}
        {OTHER_NAV.map(({ icon, label, to, auth }) => (
          <NavItem key={to} icon={icon} label={label} collapsed={collapsed}
            active={location.pathname === to}
            onClick={() => handleNav(to, auth && !user)} />
        ))}
      </nav>

      {/* Bottom */}
      <div className={`pb-4 pt-3 border-t border-[#1e2028] flex-shrink-0 ${collapsed ? 'px-2' : 'px-3'}`}>
        {user ? (
          collapsed ? (
            <div className="flex flex-col items-center gap-2">
              <div title={user.name}
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-[#0a0b0f]"
                style={{ background: 'linear-gradient(135deg,#a3e635,#22d3ee)' }}>
                {user.name.charAt(0)}
              </div>
              <button onClick={logout} title="Sign Out"
                className="p-2 rounded-xl text-red-400 hover:bg-white/[0.05] transition-colors">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2.5 px-2 py-2 mb-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#0a0b0f] flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#a3e635,#22d3ee)' }}>
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate leading-tight">{user.name}</p>
                  <p className="text-[11px] text-white/40 truncate">{user.email}</p>
                </div>
              </div>
              <button onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-white/[0.05] rounded-xl transition-colors">
                <LogOut size={14} /> Sign Out
              </button>
            </>
          )
        ) : (
          collapsed ? (
            <button onClick={() => setAuthModal('signup')} title="Get Started"
              className="w-full flex items-center justify-center p-2.5 rounded-xl bg-[#a3e635] text-[#0a0b0f] hover:bg-[#bef264] transition-colors">
              <LogIn size={16} />
            </button>
          ) : (
            <div className="space-y-2">
              <div className="px-2 py-2 rounded-xl border border-[#a3e635]/20 mb-2" style={{ background: 'rgba(163,230,53,0.06)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <Zap size={12} className="text-[#a3e635]" />
                  <span className="text-xs text-[#a3e635] font-semibold">Free Forever</span>
                </div>
                <p className="text-[10px] text-white/45 leading-relaxed">Courses, labs and quizzes. No credit card.</p>
              </div>
              <button onClick={() => setAuthModal('login')} className="btn-secondary text-sm w-full py-2">Log In</button>
              <button onClick={() => setAuthModal('signup')} className="btn-primary text-sm w-full py-2">Get Started</button>
            </div>
          )
        )}
      </div>
    </aside>
  )
}
