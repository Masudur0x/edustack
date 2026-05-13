import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

/* ──────────────────────────────────────────────────────────────────────────
   Section + question data
   ──────────────────────────────────────────────────────────────────────── */

const SECTIONS = [
  { id: 'about',      n: '01', name: 'About you',     fields: ['identity', 'university'] },
  { id: 'interest',   n: '02', name: 'Your interest', fields: ['interest'] },
  { id: 'background', n: '03', name: 'Background',    fields: ['level', 'hours'] },
  { id: 'goal',       n: '04', name: 'Goal',          fields: ['goal'] },
  { id: 'specifics',  n: '05', name: 'Specifics',     fields: ['notes'] },
]

const QUESTIONS = {
  identity: {
    title: 'Who are you?',
    sub: 'One of these will fit best.',
    type: 'choice',
    options: [
      { id: 'university', label: 'University student',     desc: 'Currently in a degree program.' },
      { id: 'hsc',        label: 'HSC / admission seeker', desc: 'Studying for HSC or university admission tests.' },
      { id: 'switcher',   label: 'Career switcher',         desc: 'Working today, want to move into tech, data, or design.' },
      { id: 'self',       label: 'Curious self-learner',    desc: 'I just want to learn something specific.' },
    ],
  },
  university: {
    title: 'Your university',
    sub: 'Helps us sort you with peers studying the same things.',
    type: 'choice',
    optional: true,
    options: [
      { id: 'buet',  label: 'BUET' },
      { id: 'brac',  label: 'BRAC University' },
      { id: 'nsu',   label: 'North South University' },
      { id: 'du',    label: 'University of Dhaka' },
      { id: 'iut',   label: 'IUT' },
      { id: 'aiub',  label: 'AIUB' },
      { id: 'iub',   label: 'IUB' },
      { id: 'other', label: 'Other' },
      { id: 'none',  label: 'Not a student yet' },
    ],
  },
  interest: {
    title: 'What do you want to learn?',
    sub: 'Pick the one that fits — or write your own. The AI uses this to build your feed.',
    type: 'choice',
    allowCustom: true,
    options: [
      { id: 'ai',       label: 'AI & Automation' },
      { id: 'webdev',   label: 'Web Development' },
      { id: 'mobile',   label: 'Mobile Development' },
      { id: 'data',     label: 'Data Science & Analytics' },
      { id: 'design',   label: 'Design & UX' },
      { id: 'business', label: 'Business & Marketing' },
      { id: 'cybersec', label: 'Cybersecurity' },
      { id: 'math',     label: 'Math & Science' },
      { id: 'language', label: 'English / Languages' },
    ],
  },
  level: {
    title: 'Where are you starting from?',
    sub: 'Honest answer means a better path.',
    type: 'choice',
    options: [
      { id: 'beginner',  label: 'Complete beginner', desc: 'Never touched it.' },
      { id: 'basics',    label: 'Some basics',        desc: 'Watched a few videos, did one course.' },
      { id: 'practical', label: 'Practical',          desc: 'Built something, took multiple courses.' },
      { id: 'advanced',  label: 'Advanced',           desc: 'Skip the introductions — I want depth.' },
    ],
  },
  hours: {
    title: 'How much time per week?',
    sub: 'We will pace the path to match.',
    type: 'choice',
    options: [
      { id: '1-3',  label: '1 – 3 hrs',  desc: 'A bit on the weekend.' },
      { id: '4-7',  label: '4 – 7 hrs',  desc: 'Steady evenings.' },
      { id: '8-14', label: '8 – 14 hrs', desc: 'Serious commitment.' },
      { id: '15+',  label: '15+ hrs',    desc: 'Full-time learning.' },
    ],
  },
  goal: {
    title: 'What does winning look like?',
    sub: 'What you want six months from now.',
    type: 'choice',
    allowCustom: true,
    options: [
      { id: 'internship', label: 'Get internship-ready' },
      { id: 'firstjob',   label: 'Land my first job' },
      { id: 'switch',     label: 'Switch careers' },
      { id: 'exam',       label: 'Pass an exam or admission test' },
      { id: 'project',    label: 'Build a specific project' },
      { id: 'curiosity',  label: 'Pure curiosity' },
    ],
  },
  notes: {
    title: 'Anything specific?',
    sub: 'Optional. A course you heard about, a company you want to work at, a skill you keep getting stuck on — anything. The AI reads this.',
    type: 'text',
    placeholder: 'I want to learn Python so I can automate the data entry job at my office…',
  },
}

/* Required fields for the "Save & sign up" button to enable */
const REQUIRED_FIELDS = ['identity', 'interest', 'level', 'hours', 'goal']

/* ──────────────────────────────────────────────────────────────────────────
   Question renderers
   ──────────────────────────────────────────────────────────────────────── */

function ChoiceQuestion({ q, fieldKey, value, customValue, onChange, onCustomChange }) {
  const isCustom = value === '__custom__'
  return (
    <div>
      <h3 className="text-white text-xl sm:text-2xl mb-2 leading-tight"
        style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.01em' }}>
        {q.title}
        {q.optional && <span className="ml-2 text-xs tracking-[0.18em] uppercase text-white/30 font-mono align-middle">Optional</span>}
      </h3>
      <p className="text-white/50 text-sm mb-6 leading-relaxed max-w-xl">{q.sub}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {q.options.map(opt => {
          const selected = value === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`group flex items-start gap-3 p-4 rounded-xl text-left transition-all border ${
                selected
                  ? 'bg-[#13151a] border-[#a3e635]/40'
                  : 'bg-transparent border-[#1e2028] hover:border-[#2a2d38]'
              }`}>
              {/* Radio dot */}
              <div className={`mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border ${
                selected ? 'border-[#a3e635] bg-[#a3e635]' : 'border-[#2a2d38] bg-transparent group-hover:border-[#3a3d48]'
              }`}>
                {selected && <Check size={9} strokeWidth={3} className="text-[#0a0b0f]" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${selected ? 'text-white' : 'text-white/75'}`}>
                  {opt.label}
                </p>
                {opt.desc && (
                  <p className="text-xs text-white/45 mt-1 leading-relaxed">{opt.desc}</p>
                )}
              </div>
            </button>
          )
        })}

        {q.allowCustom && (
          <button
            onClick={() => onChange('__custom__')}
            className={`group flex items-start gap-3 p-4 rounded-xl text-left transition-all border sm:col-span-2 ${
              isCustom
                ? 'bg-[#13151a] border-[#22d3ee]/40'
                : 'bg-transparent border-[#1e2028] border-dashed hover:border-[#2a2d38]'
            }`}>
            <div className={`mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border ${
              isCustom ? 'border-[#22d3ee] bg-[#22d3ee]' : 'border-[#2a2d38] bg-transparent group-hover:border-[#3a3d48]'
            }`}>
              {isCustom && <Check size={9} strokeWidth={3} className="text-[#0a0b0f]" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${isCustom ? 'text-white' : 'text-white/75'}`}>
                Something else — write your own
              </p>
              {isCustom && (
                <input
                  type="text"
                  autoFocus
                  value={customValue || ''}
                  onChange={(e) => onCustomChange(e.target.value)}
                  placeholder="e.g. AI automation for HR teams"
                  className="mt-3 w-full bg-transparent border-b border-[#22d3ee]/30 focus:border-[#22d3ee] focus:outline-none text-sm text-white placeholder-white/30 pb-1.5"
                />
              )}
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

function TextQuestion({ q, value, onChange }) {
  return (
    <div>
      <h3 className="text-white text-xl sm:text-2xl mb-2 leading-tight"
        style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.01em' }}>
        {q.title}
        <span className="ml-2 text-xs tracking-[0.18em] uppercase text-white/30 font-mono align-middle">Optional</span>
      </h3>
      <p className="text-white/50 text-sm mb-6 leading-relaxed max-w-xl">{q.sub}</p>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={q.placeholder}
        rows={5}
        className="w-full rounded-xl p-4 text-sm text-white placeholder-white/30 resize-none focus:outline-none focus:border-[#a3e635]/40 transition-colors"
        style={{ background: 'rgba(19,21,26,0.6)', border: '1px solid #1e2028' }}
      />
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   Main page
   ──────────────────────────────────────────────────────────────────────── */

export default function Onboarding() {
  const { user, pendingOnboarding, setPendingOnboarding, setAuthModal, completeOnboarding, showNotification } = useApp()
  const navigate = useNavigate()

  // Initialize state from pending (if user navigated away and back) or empty
  const [data, setData] = useState(() => pendingOnboarding || {})
  const [active, setActive] = useState('about')

  // Persist as the user types
  useEffect(() => {
    setPendingOnboarding(data)
  }, [data, setPendingOnboarding])

  const setField = (key, value) => setData(d => ({ ...d, [key]: value }))

  const isFieldComplete = (key) => {
    const v = data[key]
    if (!v) return false
    if (v === '__custom__') return !!data[`${key}_custom`]
    return true
  }
  const isSectionComplete = (section) => section.fields.every(isFieldComplete)
  const completedCount = SECTIONS.filter(isSectionComplete).length

  // Required fields check (for save button)
  const canSubmit = REQUIRED_FIELDS.every(isFieldComplete)

  const activeSection = SECTIONS.find(s => s.id === active)
  const activeIdx = SECTIONS.findIndex(s => s.id === active)
  const prevSection = activeIdx > 0 ? SECTIONS[activeIdx - 1] : null
  const nextSection = activeIdx < SECTIONS.length - 1 ? SECTIONS[activeIdx + 1] : null

  const handleSubmit = () => {
    if (!canSubmit) {
      showNotification('Please complete the required sections first.', 'error')
      return
    }
    if (user) {
      completeOnboarding(data)
      navigate('/dashboard')
    } else {
      // Opens signup modal — pendingOnboarding will merge on signup
      setAuthModal('signup')
    }
  }

  return (
    <div className="min-h-[100dvh]" style={{ background: '#0a0b0f' }}>
      {/* Subtle dot grid */}
      <div className="fixed inset-0 pointer-events-none opacity-50" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">

        {/* Top breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')}
              className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-white/45 hover:text-white font-mono transition-colors">
              <ChevronLeft size={12} /> Back home
            </button>
          </div>
          <p className="text-[10px] tracking-[0.22em] uppercase text-white/30 font-mono">
            Onboarding · {completedCount}/{SECTIONS.length} sections
          </p>
        </div>

        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#a3e635] font-mono mb-3">
            Build my path
          </p>
          <h1 className="text-3xl sm:text-4xl text-white leading-[1.08] mb-4"
            style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.02em' }}>
            Five quick sections.<br />
            <span className="text-white/45">Then your dashboard.</span>
          </h1>
          <p className="text-white/55 leading-relaxed text-sm sm:text-base">
            Answer what you can. The AI uses these to order your courses, certifications,
            and labs. You can change any of these later from your dashboard.
          </p>
        </div>

        {/* Grid: sidebar + content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">

          {/* ── Sidebar ─────────────────────────────────────────────── */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-10 space-y-2">
              {/* Section list */}
              <nav className="rounded-xl overflow-hidden"
                style={{ background: 'rgba(19,21,26,0.6)', border: '1px solid #1e2028' }}>
                {SECTIONS.map((s) => {
                  const isActive = s.id === active
                  const done = isSectionComplete(s)
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActive(s.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-[#1e2028] last:border-b-0 transition-colors ${
                        isActive
                          ? 'bg-[#13151a]'
                          : 'hover:bg-white/[0.015]'
                      }`}>
                      {/* Index marker */}
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        done
                          ? 'bg-[#a3e635]'
                          : isActive
                            ? 'border border-[#a3e635]'
                            : 'border border-[#2a2d38]'
                      }`}>
                        {done
                          ? <Check size={10} strokeWidth={3} className="text-[#0a0b0f]" />
                          : <span className="w-1.5 h-1.5 rounded-full" style={{ background: isActive ? '#a3e635' : 'transparent' }} />
                        }
                      </span>

                      {/* Number + name */}
                      <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
                        <span className={`text-[10px] tracking-[0.18em] uppercase font-mono ${
                          isActive ? 'text-[#a3e635]' : 'text-white/35'
                        }`}>
                          {s.n}
                        </span>
                        <span className={`text-sm ${
                          isActive ? 'text-white font-semibold' : done ? 'text-white/75' : 'text-white/55'
                        }`}>
                          {s.name}
                        </span>
                      </div>

                      <ChevronRight size={14} className={`flex-shrink-0 transition-colors ${
                        isActive ? 'text-[#a3e635]' : 'text-white/15'
                      }`} />
                    </button>
                  )
                })}
              </nav>

              {/* Save button — always visible */}
              <button onClick={handleSubmit} disabled={!canSubmit}
                className="w-full mt-4 rounded-xl px-5 py-3.5 text-sm font-bold transition-all inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: canSubmit ? '#a3e635' : '#1e2028',
                  color: canSubmit ? '#0a0b0f' : 'rgba(255,255,255,0.4)',
                  boxShadow: canSubmit ? '0 0 28px rgba(163,230,53,0.3)' : 'none',
                }}>
                {user ? 'Save & open dashboard' : 'Save & sign up'} <ArrowRight size={15} />
              </button>

              <p className="text-[10px] tracking-[0.18em] uppercase text-white/30 font-mono text-center mt-3 px-1">
                {canSubmit
                  ? user ? 'Ready when you are' : 'One sign-up step left'
                  : `Complete ${REQUIRED_FIELDS.filter(f => !isFieldComplete(f)).length} more required field${REQUIRED_FIELDS.filter(f => !isFieldComplete(f)).length === 1 ? '' : 's'}`}
              </p>
            </div>
          </aside>

          {/* ── Content pane ────────────────────────────────────────── */}
          <main className="lg:col-span-8">
            <div className="rounded-2xl p-6 sm:p-8 lg:p-10"
              style={{
                background: 'rgba(19,21,26,0.5)',
                border: '1px solid #1e2028',
                minHeight: '500px',
              }}>
              {/* Section header */}
              <div className="flex items-baseline gap-3 mb-7 pb-5 border-b border-[#1e2028]">
                <span
                  className="leading-none"
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: 'clamp(1.5rem, 2vw, 1.85rem)',
                    color: '#a3e635',
                    letterSpacing: '-0.02em',
                  }}>
                  {activeSection.n}
                </span>
                <span className="text-[10px] tracking-[0.22em] uppercase text-white/30 font-mono">
                  {activeSection.name}
                </span>
              </div>

              {/* Questions */}
              <div className="space-y-10">
                {activeSection.fields.map((fieldKey) => {
                  const q = QUESTIONS[fieldKey]
                  if (q.type === 'choice') {
                    return (
                      <ChoiceQuestion
                        key={fieldKey}
                        q={q}
                        fieldKey={fieldKey}
                        value={data[fieldKey]}
                        customValue={data[`${fieldKey}_custom`]}
                        onChange={(v) => setField(fieldKey, v)}
                        onCustomChange={(v) => setField(`${fieldKey}_custom`, v)}
                      />
                    )
                  }
                  if (q.type === 'text') {
                    return (
                      <TextQuestion
                        key={fieldKey}
                        q={q}
                        value={data[fieldKey]}
                        onChange={(v) => setField(fieldKey, v)}
                      />
                    )
                  }
                  return null
                })}
              </div>

              {/* Prev / Next nav */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#1e2028]">
                <button
                  disabled={!prevSection}
                  onClick={() => prevSection && setActive(prevSection.id)}
                  className="flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                  <ChevronLeft size={15} /> {prevSection ? prevSection.name : 'Previous'}
                </button>
                <button
                  disabled={!nextSection}
                  onClick={() => nextSection && setActive(nextSection.id)}
                  className="flex items-center gap-2 text-sm font-semibold text-[#a3e635] hover:text-[#bef264] transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                  {nextSection ? nextSection.name : 'Done'} <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
