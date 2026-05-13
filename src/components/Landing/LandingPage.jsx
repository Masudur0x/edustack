import { useEffect, useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, Award, Zap, Brain, FlaskConical,
  TrendingUp, Play, Users,
  Volume2, Subtitles, Maximize2, Settings,
} from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { usePreferences } from '../../context/PreferencesContext.jsx'
import { PARTNERS } from '../../data/mockData.js'


// Hero taglines — built from translation keys so they switch language.
// Each cycles in with per-word stagger + drawn underline.
const buildTaglines = (t) => [
  { line1: t('tag.1.line1'), before: t('tag.1.before'), accent: t('tag.1.accent'), after: t('tag.1.after') },
  { line1: t('tag.2.line1'), before: t('tag.2.before'), accent: t('tag.2.accent'), after: t('tag.2.after') },
  { line1: t('tag.3.line1'), before: t('tag.3.before'), accent: t('tag.3.accent'), after: t('tag.3.after') },
  { line1: t('tag.4.line1'), before: t('tag.4.before'), accent: t('tag.4.accent'), after: t('tag.4.after') },
]

// Premium per-word animation: opacity + rise + de-blur
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const WORD_DUR = 0.7
const STAGGER = 0.07

function Word({ children, delay, italic = false, color }) {
  return (
    <span
      className="inline-block will-change-transform"
      style={{
        fontStyle: italic ? 'italic' : 'normal',
        color: color || 'inherit',
        animation: `wordRise ${WORD_DUR}s ${EASE} both`,
        animationDelay: `${delay}s`,
      }}>
      {children}
    </span>
  )
}

function DrawnUnderline({ delay }) {
  return (
    <svg
      aria-hidden="true"
      className="absolute -bottom-2 left-0 w-full pointer-events-none"
      viewBox="0 0 240 12"
      preserveAspectRatio="none"
      style={{ height: 'clamp(8px, 1.1vw, 14px)' }}>
      <path
        d="M2,7 Q60,1 120,5 T238,4"
        fill="none"
        stroke="#a3e635"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
        style={{
          strokeDasharray: 260,
          strokeDashoffset: 260,
          animation: `drawStroke 0.8s cubic-bezier(0.65, 0, 0.35, 1) both`,
          animationDelay: `${delay}s`,
        }}
      />
    </svg>
  )
}

function RotatingHeadline() {
  const { t, language } = usePreferences()
  const taglines = buildTaglines(t)
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  // Reset to first tagline when the language changes so users immediately
  // see Bangla / English content in sync with their toggle
  useEffect(() => { setI(0) }, [language])

  useEffect(() => {
    if (paused) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = setInterval(() => setI(x => (x + 1) % taglines.length), 3800)
    return () => clearInterval(id)
  }, [paused, taglines.length])

  const tag = taglines[i]
  const line1Words = tag.line1.split(' ')
  const beforeWords = tag.before ? tag.before.split(' ') : []

  const line2Start = (line1Words.length - 1) * STAGGER + 0.18
  const accentDelay = line2Start + beforeWords.length * STAGGER
  const underlineDelay = accentDelay + 0.42

  return (
    <h1
      key={`${language}-${i}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="text-white mb-7 mx-auto max-w-3xl"
      style={{
        fontFamily: "'Archivo Black', sans-serif",
        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
      }}>
      {/* Line 1 */}
      <span className="block">
        {line1Words.map((w, idx) => (
          <Fragment key={idx}>
            <Word delay={idx * STAGGER}>{w}</Word>
            {idx < line1Words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>

      {/* Line 2 */}
      <span className="block">
        {beforeWords.map((w, idx) => (
          <Fragment key={idx}>
            <Word delay={line2Start + idx * STAGGER}>{w}</Word>{' '}
          </Fragment>
        ))}
        <span className="relative inline-block whitespace-nowrap">
          <Word delay={accentDelay} italic color="#a3e635">{tag.accent}</Word>
          <DrawnUnderline delay={underlineDelay} />
        </span>
        <Word delay={accentDelay + STAGGER}>{tag.after}</Word>
      </span>
    </h1>
  )
}


const FEATURE_HERO = {
  accent: '#a3e635',
  index: '01',
  label: 'The brain',
  title: 'An AI that knows your major.',
  body: 'Tell us your university, level, and the job you want next. Claude reads your profile and orders the right courses, certifications and labs from across the web — and refreshes the order every week as you progress.',
}

const FEATURES = [
  { accent: '#22d3ee', index: '02', label: 'Credentials', title: 'Certifications that count', desc: 'Google, IBM, Meta, MIT, Stanford — auditable for free. Earn the badges recruiters in Bangladesh actually recognise.' },
  { accent: '#f59e0b', index: '03', label: 'Quizzes',     title: 'Find your gaps weekly',     desc: 'Five-minute quizzes reveal weak topics. Foundational content for those topics moves to the top of your feed next time.' },
  { accent: '#818cf8', index: '04', label: 'Labs',        title: 'Hands-on, no equipment',    desc: 'Code, circuits, chemistry, biology — simulations your university budget cannot buy. Learn by doing, not watching.' },
  { accent: '#f472b6', index: '05', label: 'Progress',    title: 'See yourself level up',      desc: 'Live dashboard tracks every course, lab and quiz. Move from Explorer to Apprentice to Expert — visible, every week.' },
]

const MILESTONES = ['Explorer', 'Apprentice', 'Practitioner', 'Expert']

// Live community activity — mock forum / Discord-style posts
const COMMUNITY_ACTIVITY = [
  {
    initials: 'TR', user: 'Tasnim R.', uni: 'BUET', uniColor: '#a3e635',
    time: '12m', tag: 'Question',
    text: 'Anyone got notes for CSE 2105 Data Structures finals? Sharing my recursion notes — drop a reply.',
  },
  {
    initials: 'RH', user: 'Rifat H.', uni: 'IUT', uniColor: '#22d3ee',
    time: '1h',  tag: 'Project',
    text: 'Built a small React dashboard during the Cohort 03 weekend hack. Open to feedback.',
  },
  {
    initials: 'SK', user: 'Sumaiya K.', uni: 'NSU', uniColor: '#818cf8',
    time: '3h',  tag: 'Study group',
    text: 'Starting a Google Data Analytics study cohort. Six spots left, reply to claim.',
  },
  {
    initials: 'AM', user: 'Ayaan M.', uni: 'BRAC', uniColor: '#f59e0b',
    time: '6h',  tag: 'Resource',
    text: 'Free MIT lecture playlist mapped to CSE 1213 Discrete Math. Helpful for the midterm.',
  },
]

const HOW_IT_WORKS = [
  { step: '01', meta: '30 sec',   title: 'Sign up free',       desc: 'Create an account. No card, no fees, no catch.' },
  { step: '02', meta: '1 min',    title: 'Tell us your major', desc: 'Your university and field — we calibrate the path to your actual curriculum.' },
  { step: '03', meta: 'Instant',  title: 'Get your AI path',   desc: 'Claude reads your profile and orders the right courses, certs, and labs.' },
  { step: '04', meta: 'Today',    title: 'Start learning',     desc: 'Track progress, take quizzes, earn certifications, and level up.' },
]

// Curated feed items shown in the hero card — feels like an actual product peek
const CURATED_FEED = [
  { title: 'Linear Algebra (Lec 5)', src: 'MIT OCW',       srcColor: '#a3e635', tag: 'Course' },
  { title: 'Cell Biology — Class 11', src: '10 Minute School', srcColor: '#22d3ee', tag: 'Video' },
  { title: 'Google Data Analytics',    src: 'Coursera',      srcColor: '#818cf8', tag: 'Cert'   },
  { title: 'JS DOM Manipulation',      src: 'freeCodeCamp',  srcColor: '#f59e0b', tag: 'Lab'    },
]

const VALUE_SIDE = [
  {
    accent: '#22d3ee',
    label: 'Calibrated',
    title: 'To your major, not theirs',
    body: 'A BUET CSE second-year, a DU economics fresher, and an AIUB BBA student do not need the same feed. EduStack reads your profile and curates accordingly.',
  },
  {
    accent: '#818cf8',
    label: 'Adaptive',
    title: 'Shifts as you learn',
    body: 'Weekly quizzes find your weak topics. The next time you open the app, foundational content for those topics is already at the top of your feed.',
  },
]

const PERSONAS = [
  {
    n: '01',
    accent: '#a3e635',
    quote: 'I will learn algorithms at uni. EduStack handles the parts they will not teach me.',
    person: 'Tasnim, 21',
    role: 'CSE Year 2',
    affiliations: 'BUET · BRAC · NSU · DU · AIUB',
  },
  {
    n: '02',
    accent: '#22d3ee',
    quote: 'Coaching costs thirty thousand a month. I have a phone and time.',
    person: 'Rifat, 17',
    role: 'HSC & admission prep',
    affiliations: 'Outside the coaching circuit',
  },
  {
    n: '03',
    accent: '#818cf8',
    quote: 'Bank job by day, learning to code by night. I need a path, not a hundred tabs.',
    person: 'Sumaiya, 25',
    role: 'Switching into tech',
    affiliations: 'No CS degree, no problem',
  },
]

export default function LandingPage() {
  const { setAuthModal, user } = useApp()
  const { t } = usePreferences()
  const navigate = useNavigate()

  const handleCTA = () => {
    if (user) navigate(user.onboardingComplete ? '/dashboard' : '/onboarding')
    else navigate('/onboarding') // build your path first → sign up to save
  }

  return (
    <div className="animate-fade-in">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[82vh] flex items-center">
        {/* Soft dot-grid */}
        <div className="absolute inset-0 pointer-events-none opacity-70" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        {/* Single centered atmospheric glow */}
        <div className="absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{
          width: '1100px', height: '900px',
          background: 'radial-gradient(ellipse, rgba(163,230,53,0.10) 0%, rgba(34,211,238,0.04) 35%, transparent 65%)',
        }} />

        {/* Faint horizon line near bottom — editorial structure */}
        <div className="absolute left-0 right-0 bottom-[14%] h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-20 w-full text-center">
          {/* Tiny badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-10 border border-[var(--border)] text-[10px] font-semibold tracking-[0.18em] uppercase text-white/55" style={{ background: 'var(--bg-input)', backdropFilter: 'blur(8px)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] inline-block" />
            {t('hero.badge')}
          </div>

          {/* Rotating headline — cycles 4 taglines, pauses on hover */}
          <RotatingHeadline />

          {/* One-line subhead */}
          <p className="text-base sm:text-lg text-white/55 mb-10 leading-relaxed max-w-xl mx-auto">
            {t('hero.subhead')}
          </p>

          {/* CTA: one button, one text link */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-14">
            <button onClick={handleCTA}
              className="rounded-full px-7 py-3.5 text-sm font-bold text-[#0a0b0f] transition-all"
              style={{ background: '#a3e635', boxShadow: '0 0 28px rgba(163,230,53,0.28)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#bef264'; e.currentTarget.style.boxShadow = '0 0 40px rgba(163,230,53,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#a3e635'; e.currentTarget.style.boxShadow = '0 0 28px rgba(163,230,53,0.28)' }}>
              {t('hero.ctaPrimary')}
            </button>
            <button
              onClick={() => document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/65 hover:text-white transition-colors">
              <span className="w-7 h-7 rounded-full flex items-center justify-center border border-[var(--border)] group-hover:border-[#a3e635]/40 transition-colors"
                style={{ background: 'var(--bg-input)' }}>
                <Play size={10} fill="currentColor" className="text-[#a3e635] ml-0.5" strokeWidth={0} />
              </span>
              {t('hero.ctaSecondary')}
            </button>
          </div>

          {/* Footer strip — minimal */}
          <p className="text-[11px] text-white/35 tracking-[0.15em] uppercase">
            <span className="text-white/55">{t('hero.footer.early')}</span>
            <span className="mx-2 text-white/15">/</span>
            {t('hero.footer.free')}
            <span className="mx-2 text-white/15">/</span>
            <span className="text-white/55">{t('hero.footer.event')}</span>
          </p>
        </div>
      </section>

      {/* ── ONE FEED, EVERY SOURCE ──────────────────────────────────────── */}
      <section className="relative border-y border-[var(--border)] py-16 sm:py-20" style={{ background: 'var(--bg-section)' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14">

          {/* Header — left-aligned editorial */}
          <div className="max-w-2xl mb-12">
            <p className="text-[#a3e635] text-sm mb-3 accent-text">{t('p.caption')}</p>
            <h2 className="text-2xl sm:text-4xl text-white leading-[1.08] mb-4"
              style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.02em' }}>
              {t('p.headline.1')} <span className="text-white/45">{t('p.headline.2')}</span>
            </h2>
            <p className="text-white/55 leading-relaxed text-sm sm:text-base">
              {t('p.subhead')}
            </p>
          </div>

          {/* Bento: feed preview (left, big) + 2 value cards (right, stacked) */}
          <div className="grid grid-cols-1 md:grid-cols-5 md:grid-rows-2 gap-4 md:auto-rows-fr">

            {/* HERO: live feed preview */}
            <div
              className="md:col-span-3 md:row-span-2 relative overflow-hidden rounded-2xl p-6 sm:p-8 flex flex-col"
              style={{
                background: 'linear-gradient(135deg, rgba(163,230,53,0.06) 0%, var(--bg-card) 70%)',
                border: '1px solid var(--border)',
              }}>
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(163,230,53,0.6), transparent)' }} />
              <div className="absolute -top-24 -left-24 w-72 h-72 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.10) 0%, transparent 60%)' }} />

              {/* Feed header */}
              <div className="relative flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] inline-block animate-pulse" />
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/55">
                    {t('p.feed.label')}
                  </p>
                </div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-white/30 font-mono">
                  {t('p.feed.live')}
                </p>
              </div>

              {/* Feed items — mini product peek */}
              <div className="relative flex-1 space-y-2 mb-6">
                {CURATED_FEED.map((item, idx) => (
                  <div key={idx}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-white/[0.02]"
                    style={{
                      background: 'rgba(255,255,255,0.015)',
                      border: '1px solid rgba(255,255,255,0.04)',
                    }}>
                    <span className="text-[10px] font-mono text-white/30 w-5 flex-shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm text-white/85 flex-1 truncate">{t(`p.feed.item.${idx + 1}.title`)}</p>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        color: item.srcColor,
                        background: `${item.srcColor}10`,
                        border: `1px solid ${item.srcColor}33`,
                      }}>
                      {item.src}
                    </span>
                    <span className="hidden sm:inline-block text-[10px] tracking-widest uppercase text-white/35 w-12 text-right">
                      {t(`p.feed.item.${idx + 1}.tag`)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer copy */}
              <div className="relative">
                <div className="h-px w-10 mb-4" style={{ background: 'rgba(163,230,53,0.4)' }} />
                <p className="text-white/55 text-sm leading-relaxed">
                  <span className="text-white">{t('p.feed.footer.bold')}</span>{t('p.feed.footer.body')}
                </p>
              </div>
            </div>

            {/* SIDE CARDS — supporting value props */}
            {VALUE_SIDE.map((v, idx) => (
              <div key={idx}
                className="md:col-span-2 relative overflow-hidden rounded-2xl p-5 sm:p-6 flex flex-col"
                style={{
                  background: `linear-gradient(135deg, ${v.accent}08 0%, var(--bg-card) 75%)`,
                  border: '1px solid var(--border)',
                }}>
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${v.accent}b3, transparent)` }} />

                <p className="text-[10px] tracking-[0.22em] uppercase mb-3 font-semibold"
                  style={{ color: v.accent }}>
                  {t(`p.side.${idx + 1}.label`)}
                </p>

                <h3 className="text-white font-semibold text-base sm:text-lg mb-2 leading-snug"
                  style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.01em' }}>
                  {t(`p.side.${idx + 1}.title`)}
                </h3>
                <p className="text-white/55 text-xs sm:text-sm leading-relaxed">{t(`p.side.${idx + 1}.body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO EXPLAINER (editorial split) ───────────────────────────── */}
      <section id="video-section" className="py-16 sm:py-20 relative">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14">

          {/*
            ── HOW TO ENABLE THE REAL VIDEO ────────────────────────────────
            When the YouTube video is ready, REPLACE the entire <div className="relative … placeholder">
            block below with this iframe. YouTube's player gives you fullscreen, volume,
            subtitles, playback speed, and quality — no need to build any of that.

            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0&modestbranding=1"
              title="EduStack — 60-second pitch"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          */}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* LEFT — editorial copy + chapter markers */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] tracking-[0.22em] uppercase text-[#22d3ee] font-mono">
                  {t('v.caption')}
                </span>
                <span className="h-px flex-1 max-w-12 bg-[var(--border)]" />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white leading-[1.08] mb-5"
                style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.02em' }}>
                {t('v.headline.1')}<br />
                <span className="text-white/45">{t('v.headline.2')}</span>
              </h2>

              <p className="text-white/55 leading-relaxed text-sm sm:text-base mb-8 max-w-md">
                {t('v.body')}
              </p>

              {/* Chapter markers — film/podcast style timestamps */}
              <ul className="space-y-2.5">
                {[
                  { t: '0:00', key: 'v.chapter.1' },
                  { t: '0:18', key: 'v.chapter.2' },
                  { t: '0:35', key: 'v.chapter.3' },
                  { t: '0:52', key: 'v.chapter.4' },
                ].map(ch => (
                  <li key={ch.t} className="flex items-baseline gap-4 group">
                    <span className="text-[11px] font-mono text-white/30 tabular-nums tracking-tight group-hover:text-[#22d3ee] transition-colors">
                      {ch.t}
                    </span>
                    <span className="h-px flex-shrink-0 w-6 bg-[var(--border)] mb-1" />
                    <span className="text-sm text-white/65 group-hover:text-white transition-colors">
                      {t(ch.key)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT — video-player placeholder (looks unmistakably like a paused video) */}
            <div className="lg:col-span-7">
              <button
                onClick={() => { /* swap to real video on click later */ }}
                className="relative w-full rounded-xl overflow-hidden group cursor-pointer aspect-video text-left"
                style={{
                  background: 'linear-gradient(160deg, var(--bg-card) 0%, var(--bg-page) 100%)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 24px 60px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)',
                }}>

                {/* Film grain texture — subtle, makes it feel like footage */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{
                  backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%222%22 numOctaves=%222%22/></filter><rect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.6%22/></svg>")',
                  backgroundSize: '120px 120px',
                }} />

                {/* Atmospheric vignette for "video poster" feel */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)' }} />

                {/* TOP-LEFT: brand mark + recording dot */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inset-0 rounded-full bg-[#ef4444] animate-ping opacity-75" />
                    <span className="relative inline-flex rounded-full w-2 h-2 bg-[#ef4444]" />
                  </span>
                  <span className="text-[10px] tracking-[0.22em] uppercase text-white/55 font-mono">
                    {t('v.card.brand')}
                  </span>
                </div>

                {/* TOP-RIGHT: duration badge (like YouTube) */}
                <div className="absolute top-4 right-4 z-10 px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wide text-white/80"
                  style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
                  0:60
                </div>

                {/* CENTER: huge play button — unmistakably a video */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10">
                  <div className="relative">
                    {/* Pulsing halo */}
                    <span className="absolute inset-0 rounded-full animate-ping"
                      style={{ background: 'rgba(163,230,53,0.25)' }} />
                    {/* Wider soft glow ring */}
                    <span className="absolute -inset-3 rounded-full"
                      style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.25) 0%, transparent 70%)' }} />
                    {/* The play button itself */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        background: '#a3e635',
                        boxShadow: '0 0 50px rgba(163,230,53,0.55), inset 0 2px 0 rgba(255,255,255,0.25), inset 0 -2px 0 rgba(0,0,0,0.1)',
                      }}>
                      <Play size={34} fill="#0a0b0f" className="text-[#0a0b0f] ml-1.5" strokeWidth={0} />
                    </div>
                  </div>
                  {/* Video title — clearly THE video name */}
                  <div className="text-center">
                    <p className="text-white text-base sm:text-xl text-center leading-tight"
                      style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.02em' }}>
                      {t('v.card.title')}
                    </p>
                    <p className="text-white/45 text-[10px] tracking-[0.3em] uppercase mt-2 font-mono">
                      {t('v.card.featured')} · {t('v.card.duration')}
                    </p>
                  </div>
                </div>

                {/* BOTTOM: video player controls chrome — universally recognized */}
                <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-3 pt-12"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}>

                  {/* Progress bar with scrubber */}
                  <div className="relative h-1 rounded-full mb-2.5 cursor-pointer group/scrub"
                    style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <div className="absolute left-0 top-0 h-full rounded-full"
                      style={{ width: '0%', background: '#a3e635' }} />
                    {/* Buffered indicator */}
                    <div className="absolute left-0 top-0 h-full rounded-full opacity-30"
                      style={{ width: '8%', background: 'rgba(255,255,255,0.4)' }} />
                  </div>

                  {/* Controls row */}
                  <div className="flex items-center justify-between text-white/75">
                    <div className="flex items-center gap-3">
                      {/* Play (small, secondary) */}
                      <Play size={14} fill="currentColor" strokeWidth={0} />
                      {/* Volume */}
                      <Volume2 size={15} strokeWidth={1.8} />
                      {/* Time */}
                      <span className="text-[11px] font-mono tabular-nums text-white/70 ml-1">
                        {t('v.card.time')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      {/* Coming-soon pill (where settings would normally be) */}
                      <span className="text-[9px] tracking-[0.22em] uppercase font-mono px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(163,230,53,0.12)', color: '#a3e635', border: '1px solid rgba(163,230,53,0.35)' }}>
                        {t('v.card.cta')}
                      </span>
                      <Subtitles size={15} strokeWidth={1.8} />
                      <Settings size={15} strokeWidth={1.8} />
                      <Maximize2 size={14} strokeWidth={1.8} />
                    </div>
                  </div>
                </div>

              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR (editorial pull-quote spread) ──────────────────── */}
      <section className="border-y border-[var(--border)] py-16 sm:py-20" style={{ background: 'var(--bg-section)' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14">

          {/* Header — left-aligned editorial */}
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] tracking-[0.22em] uppercase text-[#a3e635] font-mono">
                  {t('who.caption')}
                </span>
                <span className="h-px flex-1 max-w-12 bg-[var(--border)]" />
                <span className="text-[10px] tracking-[0.22em] uppercase text-white/30 font-mono">
                  {t('who.count')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl text-white leading-[1.08]"
                style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.02em' }}>
                {t('who.headline.1')}<br />
                <span className="text-white/45">{t('who.headline.2')}</span>
              </h2>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {t('who.subhead')}
            </p>
          </div>

          {/* Persona cards — editorial pull-quote format */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PERSONAS.map(({ n, accent }, idx) => {
              const i = idx + 1
              return (
              <article
                key={n}
                className="relative overflow-hidden rounded-2xl p-6 sm:p-7 flex flex-col group transition-colors"
                style={{
                  background: `linear-gradient(160deg, ${accent}06 0%, var(--bg-card) 70%)`,
                  border: '1px solid var(--border)',
                }}>
                {/* Soft corner glow on hover */}
                <div className="absolute -top-20 -right-20 w-56 h-56 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle, ${accent}22 0%, transparent 65%)` }} />

                {/* Top row: index + small accent rule */}
                <div className="relative flex items-center justify-between mb-8">
                  <span
                    className="leading-none select-none"
                    style={{
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
                      color: accent,
                      letterSpacing: '-0.02em',
                    }}>
                    {n}
                  </span>
                  <span className="text-[10px] tracking-[0.22em] uppercase text-white/30 font-mono">
                    {t('who.personaTag')} / {n}
                  </span>
                </div>

                {/* Pull quote — serif italic, the visual moment */}
                <blockquote className="relative mb-7 flex-1">
                  <span
                    className="absolute -left-1 -top-3 select-none pointer-events-none leading-none"
                    aria-hidden="true"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                      fontSize: 'clamp(3rem, 4.5vw, 4rem)',
                      color: `${accent}30`,
                      lineHeight: 0.7,
                    }}>
                    “
                  </span>
                  <p
                    className="relative text-white/85 leading-[1.4] pl-5"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                      fontWeight: 400,
                      fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
                    }}>
                    {t(`who.p.${i}.quote`)}
                  </p>
                </blockquote>

                {/* Byline */}
                <div className="relative">
                  <div className="h-px w-10 mb-4" style={{ background: `${accent}40` }} />
                  <p className="text-sm font-semibold text-white mb-0.5">{t(`who.p.${i}.name`)}</p>
                  <p className="text-xs text-white/45 mb-3">{t(`who.p.${i}.role`)}</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-mono"
                    style={{ color: `${accent}b0` }}>
                    {t(`who.p.${i}.aff`)}
                  </p>
                </div>
              </article>
            )})}
          </div>

          {/* CTA strip — refined */}
          <div className="mt-12 flex items-center justify-between flex-wrap gap-4 pt-8 border-t border-[var(--border)]">
            <p className="text-white/45 text-sm">
              {t('who.cta.body')} <span className="text-white/75">{t('who.cta.bodyB')}</span>
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <button onClick={handleCTA} className="btn-primary gap-2">
                {t('who.cta.start')} <ArrowRight size={16} />
              </button>
              <button onClick={() => navigate('/resources')} className="btn-ghost text-sm">
                {t('who.cta.browse')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES (editorial asymmetric bento) ───────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14">

          {/* Header — left-aligned editorial */}
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] tracking-[0.22em] uppercase text-[#a3e635] font-mono">
                  {t('f.caption')}
                </span>
                <span className="h-px flex-1 max-w-12 bg-[var(--border)]" />
                <span className="text-[10px] tracking-[0.22em] uppercase text-white/30 font-mono">
                  {t('f.count')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl text-white leading-[1.08]"
                style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.02em' }}>
                {t('f.headline.1')}<br />
                <span className="text-white/45">{t('f.headline.2')}</span>
              </h2>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {t('f.subhead')}
            </p>
          </div>

          {/* Bento: hero (2 cols) + 4 compact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* HERO CARD — AI Brain (spans 2 cols) */}
            <article
              className="md:col-span-2 relative overflow-hidden rounded-2xl p-6 sm:p-8 flex flex-col"
              style={{
                background: `linear-gradient(135deg, ${FEATURE_HERO.accent}07 0%, var(--bg-card) 65%)`,
                border: '1px solid var(--border)',
              }}>
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${FEATURE_HERO.accent}cc, transparent)` }} />
              <div className="absolute -top-32 -right-24 w-72 h-72 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${FEATURE_HERO.accent}1a 0%, transparent 60%)` }} />

              {/* Top label row */}
              <div className="relative flex items-center justify-between mb-6">
                <div className="flex items-baseline gap-3">
                  <span
                    className="leading-none select-none"
                    style={{
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
                      color: FEATURE_HERO.accent,
                      letterSpacing: '-0.02em',
                    }}>
                    {FEATURE_HERO.index}
                  </span>
                  <span className="text-[10px] tracking-[0.22em] uppercase text-white/40 font-mono">
                    {t('f.hero.label')}
                  </span>
                </div>
                <span className="text-[10px] tracking-[0.22em] uppercase text-white/30 font-mono">
                  {t('f.hero.tag')}
                </span>
              </div>

              <h3 className="text-white text-xl sm:text-2xl mb-3 leading-tight max-w-md"
                style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.01em' }}>
                {t('f.hero.title')}
              </h3>
              <p className="text-white/55 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                {t('f.hero.body')}
              </p>

              {/* Milestone progression visualization */}
              <div className="relative mt-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/35 font-mono">
                    {t('f.hero.milestone.label')}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-mono" style={{ color: FEATURE_HERO.accent }}>
                    {t('f.hero.milestone.you')}
                  </span>
                </div>

                {/* Track with milestones */}
                <div className="relative">
                  <div className="h-px w-full" style={{ background: 'var(--border)' }} />
                  <div className="absolute top-0 left-0 h-px" style={{ width: '33%', background: FEATURE_HERO.accent }} />

                  <div className="flex justify-between mt-3">
                    {[1,2,3,4].map((idxOneBased) => {
                      const idx = idxOneBased - 1
                      const isActive = idx === 1 // Apprentice = current
                      const isPast = idx === 0
                      return (
                        <div key={idxOneBased} className="flex flex-col items-center"
                          style={{ position: 'relative', top: '-15px' }}>
                          <div className="w-2 h-2 rounded-full mb-2"
                            style={{
                              background: isActive ? FEATURE_HERO.accent : isPast ? `${FEATURE_HERO.accent}66` : 'var(--border-strong)',
                              boxShadow: isActive ? `0 0 12px ${FEATURE_HERO.accent}` : 'none',
                            }} />
                          <span className="text-[10px] tracking-[0.16em] uppercase font-mono"
                            style={{ color: isActive ? 'white' : 'rgba(255,255,255,0.35)' }}>
                            {t(`f.milestone.${idxOneBased}`)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </article>

            {/* COMPACT CARDS */}
            {FEATURES.map((f) => (
              <article
                key={f.index}
                className="relative overflow-hidden rounded-2xl p-5 sm:p-6 flex flex-col group"
                style={{
                  background: `linear-gradient(160deg, ${f.accent}07 0%, var(--bg-card) 75%)`,
                  border: '1px solid var(--border)',
                }}>
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${f.accent}b3, transparent)` }} />
                <div className="absolute -top-20 -right-20 w-44 h-44 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle, ${f.accent}22 0%, transparent 65%)` }} />

                {/* Top row */}
                <div className="relative flex items-baseline justify-between mb-5">
                  <span
                    className="leading-none select-none"
                    style={{
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)',
                      color: f.accent,
                      letterSpacing: '-0.02em',
                    }}>
                    {f.index}
                  </span>
                  <span className="text-[10px] tracking-[0.22em] uppercase text-white/35 font-mono">
                    {t(`f.${parseInt(f.index, 10)}.label`)}
                  </span>
                </div>

                <h3 className="relative text-white font-semibold text-base mb-2 leading-snug"
                  style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.01em' }}>
                  {t(`f.${parseInt(f.index, 10)}.title`)}
                </h3>
                <p className="relative text-white/55 text-xs sm:text-sm leading-relaxed">{t(`f.${parseInt(f.index, 10)}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (horizontal timeline) ──────────────────────────── */}
      <section className="border-y border-[var(--border)] py-16 sm:py-20" style={{ background: 'var(--bg-section)' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14">

          {/* Editorial header */}
          <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] tracking-[0.22em] uppercase text-[#22d3ee] font-mono">
                  {t('h.caption')}
                </span>
                <span className="h-px flex-1 max-w-12 bg-[var(--border)]" />
                <span className="text-[10px] tracking-[0.22em] uppercase text-white/30 font-mono">
                  {t('h.steps')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl text-white leading-[1.08]"
                style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.02em' }}>
                {t('h.headline.1')}<br />
                <span className="text-white/45">{t('h.headline.2')}</span>
              </h2>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {t('h.subhead')}
            </p>
          </div>

          {/* Timeline — horizontal connected steps */}
          <div className="relative">
            <div
              className="hidden md:block absolute left-[calc(12.5%)] right-[calc(12.5%)] h-px z-0"
              style={{
                top: '23px',
                background: 'linear-gradient(90deg, rgba(163,230,53,0.4) 0%, rgba(34,211,238,0.4) 50%, rgba(129,140,248,0.4) 100%)',
                boxShadow: '0 0 12px rgba(163,230,53,0.15)',
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
              {HOW_IT_WORKS.map(({ step }, idx) => {
                const i = idx + 1
                const markerColors = ['#a3e635', '#66d4a0', '#22d3ee', '#818cf8']
                const color = markerColors[idx]
                return (
                  <div key={step} className="relative flex flex-col items-center text-center md:items-center">
                    <div className="relative mb-6 md:mb-7 z-10">
                      <div className="absolute inset-0 rounded-full blur-md"
                        style={{ background: color, opacity: 0.25, transform: 'scale(1.3)' }} />
                      <div
                        className="relative w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background: '#0a0b0f',
                          border: `1.5px solid ${color}`,
                          boxShadow: `0 0 0 4px rgba(10,11,15,1), inset 0 1px 0 ${color}33`,
                        }}>
                        <span className="font-mono font-bold text-sm" style={{ color }}>{step}</span>
                      </div>
                    </div>

                    <span className="text-[10px] tracking-[0.22em] uppercase mb-3 font-mono" style={{ color }}>
                      {t(`h.step.${i}.meta`)}
                    </span>

                    <h3 className="text-white text-base sm:text-lg mb-2 leading-tight"
                      style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.01em' }}>
                      {t(`h.step.${i}.title`)}
                    </h3>

                    <p className="text-white/50 text-sm leading-relaxed max-w-[200px]">
                      {t(`h.step.${i}.desc`)}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY (single-column, feed-first) ───────────────────────── */}
      <section className="border-y border-[var(--border)] py-16 sm:py-20" style={{ background: 'var(--bg-section)' }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-14">

          {/* Editorial header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[var(--border)]" />
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#a3e635] font-mono inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse" />
                {t('c.caption')} · {t('c.live')}
              </span>
              <span className="h-px w-8 bg-[var(--border)]" />
            </div>
            <h2 className="text-2xl sm:text-4xl text-white leading-[1.08] mb-4 mx-auto max-w-2xl"
              style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.02em' }}>
              {t('c.headline.1')}{' '}
              <span className="text-white/45">{t('c.headline.2')}</span>
            </h2>
            <p className="text-white/55 leading-relaxed text-sm sm:text-base max-w-xl mx-auto">
              {t('c.subhead')}
            </p>
          </div>

          {/* Activity feed — centerpiece */}
          <div className="relative overflow-hidden rounded-2xl p-5 sm:p-7 mb-8"
            style={{
              background: 'linear-gradient(160deg, rgba(163,230,53,0.04) 0%, var(--bg-card) 70%)',
              border: '1px solid var(--border)',
            }}>
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(163,230,53,0.6), transparent)' }} />

            <div className="relative flex items-center justify-between mb-5 pb-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] inline-block animate-pulse" />
                <p className="text-[10px] tracking-[0.22em] uppercase text-white/55 font-mono">
                  {t('c.feed.label')}
                </p>
              </div>
              <p className="text-[10px] tracking-[0.18em] uppercase text-white/30 font-mono">
                {t('c.feed.online')}
              </p>
            </div>

            <div className="relative space-y-0.5">
              {COMMUNITY_ACTIVITY.map((p, idx) => {
                const i = idx + 1
                return (
                <div key={i} className="group flex gap-3 sm:gap-4 px-2 py-3 -mx-2 rounded-lg transition-colors hover:bg-white/[0.02]">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold tracking-wide"
                    style={{
                      background: `${p.uniColor}15`,
                      border: `1px solid ${p.uniColor}40`,
                      color: p.uniColor,
                    }}>
                    {p.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-medium text-white/85">{t(`c.post.${i}.user`)}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                        style={{
                          color: p.uniColor,
                          background: `${p.uniColor}10`,
                          border: `1px solid ${p.uniColor}30`,
                        }}>
                        {t(`c.post.${i}.uni`)}
                      </span>
                      <span className="text-white/20">·</span>
                      <span className="text-[10px] tracking-[0.18em] uppercase text-white/40 font-mono">
                        {t(`c.post.${i}.tag`)}
                      </span>
                      <span className="text-[11px] text-white/30 ml-auto font-mono tabular-nums">
                        {t(`c.post.${i}.time`)}
                      </span>
                    </div>
                    <p className="text-sm text-white/65 leading-relaxed">
                      {t(`c.post.${i}.text`)}
                    </p>
                  </div>
                </div>
              )})}
            </div>
          </div>

          {/* Bottom strip: stats inline + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-2">
            <div className="flex items-center gap-6 sm:gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col">
                  <span className="text-lg text-white leading-none mb-1"
                    style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.02em' }}>
                    {t(`c.stat.${i}.n`)}
                  </span>
                  <span className="text-[10px] tracking-[0.18em] uppercase text-white/40 font-mono">
                    {t(`c.stat.${i}.l`)}
                  </span>
                </div>
              ))}
            </div>

            <button onClick={() => user ? navigate('/forum') : setAuthModal('signup')}
              className="btn-primary gap-2 self-start sm:self-auto">
              {t('c.cta')} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ─────────────────────────────────────────────────────── */}
      <section className="border-y border-[var(--border)] py-14" style={{ background: 'var(--bg-section)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-white/30 text-sm mb-7 accent-text">
            {t('partners.caption')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PARTNERS.map(p => (
              <div key={p.name}
                className="px-5 py-2.5 rounded-xl text-white/50 text-sm font-medium transition-all duration-200 hover:text-[#a3e635] cursor-default"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(163,230,53,0.4)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(163,230,53,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}>
                {p.abbr}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA (editorial closing) ───────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-2xl py-10 sm:py-12 px-6 sm:px-10 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(163,230,53,0.07) 0%, rgba(13,15,20,0.95) 60%)',
            border: '1px solid rgba(163,230,53,0.18)',
          }}>
          {/* Atmospheric glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px]"
              style={{ background: 'radial-gradient(ellipse, rgba(163,230,53,0.08) 0%, transparent 65%)' }} />
          </div>
          {/* Subtle grid */}
          <div className="absolute inset-0 pointer-events-none opacity-50" style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />

          <div className="relative max-w-xl mx-auto">
            {/* Mono caption */}
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-7 bg-[#a3e635]/40" />
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#a3e635] font-mono">
                {t('cta.caption')}
              </span>
              <span className="h-px w-7 bg-[#a3e635]/40" />
            </div>

            {/* Headline — tightened scale */}
            <h2 className="text-white leading-[1.08] mb-4"
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: 'clamp(1.65rem, 3vw, 2.5rem)',
                letterSpacing: '-0.02em',
              }}>
              {t('cta.line1')}{' '}
              <span className="relative inline-block whitespace-nowrap">
                <span style={{ fontStyle: 'italic', color: '#a3e635' }}>{t('cta.accent')}</span>
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 w-full pointer-events-none"
                  viewBox="0 0 240 12"
                  preserveAspectRatio="none"
                  style={{ height: 'clamp(6px, 0.8vw, 10px)' }}>
                  <path
                    d="M2,7 Q60,1 120,5 T238,4"
                    fill="none"
                    stroke="#a3e635"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </svg>
              </span>.
            </h2>

            <p className="text-white/55 mb-7 max-w-md mx-auto leading-relaxed text-sm">
              {t('cta.body')}
            </p>

            {/* Single CTA */}
            <button onClick={handleCTA}
              className="rounded-full px-7 py-3 text-sm font-bold text-[#0a0b0f] transition-all inline-flex items-center gap-2"
              style={{ background: '#a3e635', boxShadow: '0 0 30px rgba(163,230,53,0.3)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#bef264'; e.currentTarget.style.boxShadow = '0 0 44px rgba(163,230,53,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#a3e635'; e.currentTarget.style.boxShadow = '0 0 30px rgba(163,230,53,0.3)' }}>
              {t('cta.button')} <ArrowRight size={15} />
            </button>

            {/* Trust strip */}
            <div className="mt-7 flex items-center justify-center gap-4 sm:gap-6 flex-wrap text-[10px] tracking-[0.18em] uppercase font-mono text-white/35">
              <span className="text-white/65">{t('cta.trust.free')}</span>
              <span className="text-white/15">/</span>
              <span className="text-white/65">{t('cta.trust.noCard')}</span>
              <span className="text-white/15">/</span>
              <span className="text-white/65">{t('cta.trust.time')}</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
