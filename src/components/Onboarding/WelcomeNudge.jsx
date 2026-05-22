import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, X, Clock, ListChecks, BadgeCheck } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { usePreferences } from '../../context/PreferencesContext.jsx'

/* ──────────────────────────────────────────────────────────────────────────
   WelcomeNudge — first-visit onboarding prompt for new (signed-out) visitors.

   Two stages, never repeating on a timer (anti-nag):
     1. welcome — a focused centred modal shortly after landing, explaining the
        personalization payoff. Easy to dismiss (button / X / backdrop / Esc).
     2. nudge   — after the modal is dismissed, ONE calm pill rests in the
        bottom-right corner. It stays put, never re-pops, and can be closed
        for good.

   Progress is persisted in localStorage so returning / dismissed visitors are
   never bombarded. Logged-in users and the /onboarding page never see it.
   ──────────────────────────────────────────────────────────────────────── */

const STORAGE_KEY   = 'edustack.onboardingNudge'
const WELCOME_DELAY = 1400 // ms — let the page paint first; instant popups jar.

// Persisted values: (unset) = brand-new · 'welcome-seen' = show pill · 'done' = gone.
function readState() {
  try { return localStorage.getItem(STORAGE_KEY) } catch { return null }
}
function writeState(v) {
  try { localStorage.setItem(STORAGE_KEY, v) } catch { /* ignore */ }
}

export default function WelcomeNudge() {
  const { user }   = useApp()
  const { t }      = usePreferences()
  const navigate   = useNavigate()
  const location   = useLocation()

  // 'hidden' | 'welcome' | 'nudge'
  const [phase, setPhase] = useState('hidden')

  const onOnboarding = location.pathname.startsWith('/onboarding')
  const suppressed   = !!user || onOnboarding

  // Decide the opening phase once, based on persisted progress.
  useEffect(() => {
    if (suppressed) return
    const saved = readState()
    if (saved === 'done') return
    if (saved === 'welcome-seen') { setPhase('nudge'); return }

    const timer = setTimeout(() => setPhase('welcome'), WELCOME_DELAY)
    return () => clearTimeout(timer)
  }, [suppressed])

  // Esc closes the welcome modal (counts as "look around first").
  useEffect(() => {
    if (phase !== 'welcome') return
    const onKey = (e) => { if (e.key === 'Escape') dismissWelcome() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  if (suppressed || phase === 'hidden') return null

  function startOnboarding() {
    writeState('done')
    setPhase('hidden')
    navigate('/onboarding')
  }
  function dismissWelcome() {
    writeState('welcome-seen')
    setPhase('nudge')
  }
  function dismissNudge() {
    writeState('done')
    setPhase('hidden')
  }

  /* ── Stage 2: calm corner pill ─────────────────────────────────────────── */
  if (phase === 'nudge') {
    return (
      <div className="fixed bottom-5 right-5 z-[150] max-w-[calc(100vw-2.5rem)] animate-slide-up">
        <div
          onClick={startOnboarding}
          className="group flex items-center gap-3 rounded-2xl border border-[#1e2028] pl-3 pr-2 py-2.5
                     cursor-pointer transition-all duration-200 hover:-translate-y-0.5
                     hover:border-[#a3e635]/40 shadow-card"
          style={{ background: 'rgba(10,11,15,0.95)', backdropFilter: 'blur(20px)' }}
          role="button"
          aria-label={t('nudge.pill')}
        >
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
                           bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635]">
            <Sparkles size={16} strokeWidth={2} />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#a3e635] animate-pulse-slow" />
          </span>

          <span className="text-sm font-medium text-white/85 group-hover:text-white whitespace-nowrap pr-1">
            {t('nudge.pill')}
          </span>

          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#0a0b0f]
                           bg-[#a3e635] rounded-lg px-2.5 py-1.5 transition-colors group-hover:bg-[#bef264]">
            {t('nudge.pillCta')} <ArrowRight size={13} strokeWidth={2.5} />
          </span>

          <button
            onClick={(e) => { e.stopPropagation(); dismissNudge() }}
            aria-label={t('nudge.close')}
            className="ml-0.5 p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5
                       transition-colors shrink-0"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    )
  }

  /* ── Stage 1: welcome modal ────────────────────────────────────────────── */
  const META = [
    { icon: ListChecks, label: t('nudge.meta.questions') },
    { icon: Clock,      label: t('nudge.meta.time') },
    { icon: BadgeCheck, label: t('nudge.meta.free') },
  ]

  return (
    <div
      className="fixed inset-0 z-[190] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && dismissWelcome()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-nudge-title"
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-white/[0.06] p-7 sm:p-8
                   overflow-hidden animate-slide-up shadow-glass
                   shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        style={{ background: 'rgba(10,11,15,0.97)', backdropFilter: 'blur(24px)' }}
      >
        {/* atmospheric lime glow, top-left — pure decoration, no pointer cost */}
        <div
          className="pointer-events-none absolute -top-24 -left-16 h-48 w-48 rounded-full opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.16), transparent 70%)' }}
        />

        <button
          onClick={dismissWelcome}
          aria-label={t('nudge.close')}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-white/30 hover:text-[#a3e635]
                     hover:bg-[#13151a] transition-colors"
        >
          <X size={18} />
        </button>

        <div className="relative">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl
                           bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635]
                           shadow-[0_0_28px_rgba(163,230,53,0.22)]">
            <Sparkles size={22} strokeWidth={2} />
          </span>

          <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#a3e635]">
            {t('nudge.eyebrow')}
          </p>

          <h2 id="welcome-nudge-title" className="mt-2 text-2xl leading-tight text-white">
            {t('nudge.title')}
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-white/60">
            {t('nudge.body')}
          </p>

          {/* meta row — divided by hairlines, no boxy cards */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            {META.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs text-white/45">
                <Icon size={14} strokeWidth={2} className="text-[#a3e635]/70" />
                {label}
              </span>
            ))}
          </div>

          <button onClick={startOnboarding} className="btn-primary w-full mt-6 group gap-2">
            {t('nudge.cta')}
            <ArrowRight size={17} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
          </button>

          <button
            onClick={dismissWelcome}
            className="w-full mt-2.5 py-2 text-sm font-medium text-white/45 hover:text-white/75 transition-colors"
          >
            {t('nudge.dismiss')}
          </button>
        </div>
      </div>
    </div>
  )
}
