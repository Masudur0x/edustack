import { useState } from 'react'
import { X, Eye, EyeOff, Github, Mail, ArrowRight, BookOpen } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'

function PasswordInput({ value, onChange, placeholder = 'Password' }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <input type={show ? 'text' : 'password'} value={value} onChange={onChange}
        placeholder={placeholder} className="input-field pr-10" required />
      <button type="button" onClick={() => setShow(s => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#a3e635]">
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  )
}

function Divider({ label }) {
  return (
    <div className="relative flex items-center gap-3">
      <div className="flex-1 h-px bg-[#a3e635]/15" />
      <span className="text-xs text-white/35">{label}</span>
      <div className="flex-1 h-px bg-[#a3e635]/15" />
    </div>
  )
}

function LoginModal({ onClose, onSwitch }) {
  const { login } = useApp()
  const navigate   = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const u = login(email, password)
    setLoading(false)
    onClose()
    if (u?.onboardingComplete) navigate('/dashboard')
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center">
        <div className="w-12 h-12 icon-container mx-auto mb-4 shadow-mint">
          <BookOpen size={22} className="text-[#a3e635]" />
        </div>
        <h2 className="text-xl text-white" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
          Welcome back
        </h2>
        <p className="text-white/50 text-sm mt-1 accent-text">Sign in to continue your learning journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="Email address" className="input-field" required />
        <PasswordInput value={password} onChange={e => setPassword(e.target.value)} />
        <div className="text-right">
          <button type="button" className="text-xs text-[#a3e635]/70 hover:text-[#a3e635]">Forgot password?</button>
        </div>
        <button type="submit" disabled={loading}
          className="btn-primary w-full py-3 gap-2">
          {loading
            ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : <>Sign In <ArrowRight size={16} /></>}
        </button>
      </form>

      <Divider label="or continue with" />

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => { login('demo@google.com', ''); onClose(); navigate('/dashboard') }}
          className="btn-secondary text-sm py-2.5 gap-2">
          <Mail size={15} /> Google
        </button>
        <button onClick={() => { login('demo@github.com', ''); onClose(); navigate('/dashboard') }}
          className="btn-secondary text-sm py-2.5 gap-2">
          <Github size={15} /> GitHub
        </button>
      </div>

      <p className="text-center text-sm text-white/50">
        Don't have an account?{' '}
        <button onClick={onSwitch} className="text-[#a3e635] hover:text-[#a3e635]/80 font-medium">Sign up free</button>
      </p>
    </div>
  )
}

function SignupModal({ onClose, onSwitch }) {
  const { signup }  = useApp()
  const navigate    = useNavigate()
  const [form, setForm]     = useState({ name: '', email: '', password: '', level: '' })
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors]   = useState({})

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.name.trim())           errs.name     = 'Name is required'
    if (!form.email.includes('@'))   errs.email    = 'Valid email required'
    if (form.password.length < 8)    errs.password = 'At least 8 characters'
    if (!agreed)                     errs.agreed   = 'Please accept the terms'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    signup(form)
    setLoading(false)
    onClose()
    navigate('/onboarding')
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <div className="w-12 h-12 icon-container mx-auto mb-4 shadow-mint">
          <BookOpen size={22} className="text-[#a3e635]" />
        </div>
        <h2 className="text-xl text-white" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
          Create your account
        </h2>
        <p className="text-white/50 text-sm mt-1 accent-text">Free forever. No credit card needed.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input type="text" value={form.name} onChange={set('name')} placeholder="Full name" className="input-field" />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <input type="email" value={form.email} onChange={set('email')} placeholder="Email address" className="input-field" />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <PasswordInput value={form.password} onChange={set('password')} placeholder="Password (min 8 chars)" />
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
        </div>
        <select value={form.level} onChange={set('level')} className="input-field text-sm">
          <option value="">Academic level (optional)</option>
          <option value="highschool">High School</option>
          <option value="undergrad">Undergraduate</option>
          <option value="grad">Graduate</option>
          <option value="professional">Professional</option>
          <option value="self">Self-Learner</option>
        </select>

        <label className="flex items-start gap-2.5 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
            className="mt-0.5 accent-[#a3e635]" />
          <span className="text-xs text-white/50 leading-relaxed">
            I agree to the{' '}
            <span className="text-[#a3e635] hover:text-[#a3e635]/80 cursor-pointer">Terms of Service</span> and{' '}
            <span className="text-[#a3e635] hover:text-[#a3e635]/80 cursor-pointer">Privacy Policy</span>
          </span>
        </label>
        {errors.agreed && <p className="text-red-400 text-xs">{errors.agreed}</p>}

        <button type="submit" disabled={loading}
          className="btn-primary w-full py-3 gap-2">
          {loading
            ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : <>Create Account <ArrowRight size={16} /></>}
        </button>
      </form>

      <Divider label="or" />

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => { signup({ name: 'Demo User', email: 'demo@google.com' }); onClose(); navigate('/onboarding') }}
          className="btn-secondary text-sm py-2.5 gap-2">
          <Mail size={15} /> Google
        </button>
        <button onClick={() => { signup({ name: 'Demo User', email: 'demo@github.com' }); onClose(); navigate('/onboarding') }}
          className="btn-secondary text-sm py-2.5 gap-2">
          <Github size={15} /> GitHub
        </button>
      </div>

      <p className="text-center text-sm text-white/50">
        Already have an account?{' '}
        <button onClick={onSwitch} className="text-[#a3e635] hover:text-[#a3e635]/80 font-medium">Sign in</button>
      </p>
    </div>
  )
}

export default function AuthModals() {
  const { authModal, setAuthModal } = useApp()
  if (!authModal) return null

  const onClose  = () => setAuthModal(null)
  const onSwitch = () => setAuthModal(authModal === 'login' ? 'signup' : 'login')

  return (
    <div className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 modal-backdrop"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="border border-[#1e2028] rounded-2xl w-full max-w-md p-7 relative shadow-glass animate-slide-up" style={{ background: 'rgba(10,11,15,0.97)', backdropFilter: 'blur(24px)' }}>
        <button onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-[#a3e635] transition-colors p-1 rounded-lg hover:bg-[#13151a]">
          <X size={18} />
        </button>
        {authModal === 'login'
          ? <LoginModal onClose={onClose} onSwitch={onSwitch} />
          : <SignupModal onClose={onClose} onSwitch={onSwitch} />}
      </div>
    </div>
  )
}

