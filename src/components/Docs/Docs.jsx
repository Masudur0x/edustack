// ─────────────────────────────────────────────────────────────────────────────
// /docs — the live documentation page for EduStack.
//
// A judge, investor, or new contributor lands here and gets the full story
// of the project: pitch, demo, architecture, AI layer, stack, roadmap, team.
// One page. No clicking around.
//
// To embed the pitch video, set YOUTUBE_ID below to the YouTube video id
// (the part after youtu.be/ or v= in the URL). If left empty, a tasteful
// "coming soon" card is shown instead.
// ─────────────────────────────────────────────────────────────────────────────
import {
  Github, ExternalLink, PlayCircle, Sparkles, Brain, Database,
  Users, ArrowRight, Check, Mail, BookOpen, Zap, GraduationCap,
  Languages, Shield,
} from 'lucide-react'

const YOUTUBE_ID = '' // ← paste your YouTube video id here (e.g. 'abc123XYZ')
const LIVE_URL   = 'https://edustack-mu.vercel.app'
const GITHUB_URL = 'https://github.com/Masudur0x/edustack'

const SECTIONS = [
  { id: 'problem',      label: 'The Problem' },
  { id: 'solution',     label: 'The Solution' },
  { id: 'demo',         label: 'Demo' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'ai',           label: 'AI & Data' },
  { id: 'stack',        label: 'Tech Stack' },
  { id: 'roadmap',      label: 'Roadmap' },
  { id: 'market',       label: 'Market & Business' },
  { id: 'team',         label: 'Team' },
  { id: 'vision',       label: 'Vision' },
]

const TEAM = [
  { name: '[Your Name]',        role: 'Team Leader',                    email: 'lead@example.com' },
  { name: '[Member Name]',      role: 'Business and Data Analyst',      email: 'analyst@example.com' },
  { name: '[Member Name]',      role: 'Frontend Developer',             email: 'frontend@example.com' },
  { name: '[Member Name]',      role: 'Backend and Database Engineer',  email: 'backend@example.com' },
  { name: '[Member Name]',      role: 'Presentation and Communication', email: 'comms@example.com' },
  { name: '[NRB Advisor Name]', role: 'Global Advisor (NRB)',           email: 'advisor@example.com' },
]

// ── Reusable bits ───────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, sub }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a3e635] mb-2">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl text-white mb-3" style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.01em' }}>
        {title}
      </h2>
      {sub && <p className="text-white/55 max-w-2xl leading-relaxed">{sub}</p>}
    </div>
  )
}

function StatCard({ value, label, accent = 'lime' }) {
  const c = accent === 'cyan' ? '#22d3ee' : '#a3e635'
  return (
    <div className="card">
      <p className="text-3xl mb-1" style={{ fontFamily: "'Archivo Black', sans-serif", color: c }}>{value}</p>
      <p className="text-sm text-white/60 leading-relaxed">{label}</p>
    </div>
  )
}

function StatusChip({ status = 'live', children }) {
  const isLive = status === 'live'
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
      isLive
        ? 'bg-[#a3e635]/10 text-[#a3e635] border border-[#a3e635]/30'
        : 'bg-[#22d3ee]/8 text-[#22d3ee] border border-dashed border-[#22d3ee]/40'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-[#a3e635]' : 'bg-[#22d3ee]'}`} />
      {children}
    </span>
  )
}

// ── Architecture diagram, inline ─────────────────────────────────────────────
function ArchitectureFlow() {
  const Box = ({ title, items, hero }) => (
    <div className={`card flex-1 ${hero ? 'border-[#a3e635]/30' : ''}`}>
      <p className="text-xs font-bold uppercase tracking-wider mb-3 text-[#a3e635]">{title}</p>
      <ul className="space-y-2 text-sm text-white/75">
        {items.map(it => (
          <li key={it.text} className="flex gap-2 items-start">
            <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${it.next ? 'bg-transparent border border-dashed border-[#22d3ee]' : 'bg-[#a3e635]'}`} />
            <span>{it.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-stretch gap-3">
        <Box title="You" items={[
          { text: 'Your interest' },
          { text: 'Your level' },
          { text: 'Your goal' },
          { text: 'Your quiz results' },
        ]} />
        <div className="flex items-center justify-center text-[#a3e635]/70 rotate-90 lg:rotate-0 self-center px-2">
          <ArrowRight size={28} />
        </div>
        <Box hero title="The AI" items={[
          { text: 'Claude writes your reason for every course (live)' },
          { text: 'A simple engine ranks your feed (live)' },
          { text: 'Smart search over many free courses', next: true },
          { text: 'Topic map in the right order', next: true },
        ]} />
        <div className="flex items-center justify-center text-[#a3e635]/70 rotate-90 lg:rotate-0 self-center px-2">
          <ArrowRight size={28} />
        </div>
        <Box title="Your learning" items={[
          { text: 'A personal path' },
          { text: 'Quizzes that adapt' },
          { text: 'A community to learn with' },
          { text: 'Bangla and English' },
        ]} />
      </div>

      <div className="mt-4 card border-dashed border-[#22d3ee]/40 flex items-center gap-3 text-sm text-white/70" style={{ background: 'linear-gradient(90deg, rgba(163,230,53,0.04), rgba(34,211,238,0.04))' }}>
        <span className="text-[#22d3ee] text-lg leading-none">↻</span>
        <span><strong className="text-white font-semibold">Every quiz you take makes your next path better.</strong> The loop never stops.</span>
      </div>

      <div className="flex flex-wrap gap-4 mt-4 text-xs text-white/50">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#a3e635]/30 border border-[#a3e635]/60" /> Live in production</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border border-dashed border-[#22d3ee]/70" /> Next build at the BuildFest</span>
      </div>
    </div>
  )
}

// ── Roadmap column ──────────────────────────────────────────────────────────
function RoadmapCol({ title, tone, items }) {
  const color = tone === 'lime' ? '#a3e635' : tone === 'cyan' ? '#22d3ee' : 'rgba(255,255,255,0.45)'
  const borderClass = tone === 'lime' ? 'border-[#a3e635]/25' : tone === 'cyan' ? 'border-[#22d3ee]/25' : ''
  return (
    <div className={`card ${borderClass}`}>
      <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color }}>{title}</p>
      <ul className="space-y-2 text-sm text-white/75">
        {items.map(it => (
          <li key={it} className="flex gap-2 items-start">
            <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: color }} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Main page ───────────────────────────────────────────────────────────────
export default function Docs() {
  return (
    <div className="min-h-screen text-white">
      {/* HERO */}
      <header className="text-center py-20 px-6 border-b border-[#1e2028]">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/30 mb-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#a3e635]">
          <Sparkles size={12} /> Live Documentation · v1.0 · 2026
        </div>
        <h1 className="text-5xl md:text-6xl mb-4" style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.02em' }}>
          EduStack
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Your starting line for the AI journey. Built in Bangladesh.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <a href={LIVE_URL} target="_blank" rel="noreferrer" className="btn-primary gap-2 text-sm">
            Try the live app <ExternalLink size={14} />
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn-secondary gap-2 text-sm">
            View source on GitHub <Github size={14} />
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <StatusChip status="live">Live in production</StatusChip>
          <span className="badge badge-cyan">EdTech track</span>
          <span className="badge badge-indigo">Infinity AI BuildFest 2026</span>
        </div>
      </header>

      {/* BODY */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex gap-10">
          {/* Sticky TOC, desktop only */}
          <aside className="hidden lg:block w-52 shrink-0">
            <nav className="sticky top-24">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/35 mb-3">On this page</p>
              <ul className="space-y-1.5">
                {SECTIONS.map(s => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="block text-sm text-white/55 hover:text-[#a3e635] hover:translate-x-0.5 transition-all duration-150">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="flex-1 min-w-0 space-y-24">
            {/* PROBLEM */}
            <section id="problem" className="scroll-mt-24">
              <SectionHeader
                eyebrow="01 · The vibe"
                title="The problem"
                sub="Smart people, online every day, with free lessons everywhere. And still, no clear way in."
              />
              <p className="text-white/75 leading-relaxed mb-6">
                Bangladesh is young and online. More than 170 million people, over 130 million internet subscriptions, smartphone use past 72 percent, and the second largest pool of online freelancers in the world by the Oxford Internet Institute's count. The talent is here. The way into AI is not.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <StatCard value="~900,000" label="University graduates in Bangladesh were jobless in 2024, the highest unemployment rate of any education level. Source: Labour Force Survey 2024." />
                <StatCard value="77M+" label="People using the internet in Bangladesh, with about 44 million reachable on YouTube. Source: DataReportal Digital 2025." accent="cyan" />
              </div>
              <p className="text-white/75 leading-relaxed">
                Beginners, especially people with no technical background, know AI matters but have no idea where to start. They open ten tabs, watch random videos, join scattered Facebook groups, and quit within a week. The free lessons are already on YouTube. A single, clear place to start is missing.
              </p>
            </section>

            {/* SOLUTION */}
            <section id="solution" className="scroll-mt-24">
              <SectionHeader
                eyebrow="02 · The solution"
                title="One place to learn AI"
                sub="A personal dashboard, the best free resources, quizzes, and a community, in one place, in Bangla and English."
              />
              <p className="text-white/75 leading-relaxed mb-6">
                EduStack asks every learner three simple things: their interest, their level, and their goal. From that, it builds a personal dashboard, finds the best free YouTube videos and online courses for them, sets quizzes that adapt to how they are doing, and links them to relevant Skool communities so they can learn alongside others. Not a list of links. A path that grows with them.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: GraduationCap, t: 'Personal onboarding',  d: 'Five questions, one minute, then a path tailored to you.' },
                  { icon: BookOpen,      t: 'Curated free courses', d: 'YouTube and free online courses, ranked for your level and goal.' },
                  { icon: Brain,         t: 'Adaptive quizzes',     d: 'A low score moves foundational lessons to the top of your feed.' },
                  { icon: Users,         t: 'Real community',       d: 'Linked Skool groups so you never have to learn alone.' },
                  { icon: Languages,     t: 'Bangla and English',   d: 'A local first product, not a translation afterthought.' },
                  { icon: Zap,           t: 'AI written reasons',   d: 'Every recommendation has a clear explanation of why it fits you.' },
                ].map(({ icon: I, t, d }) => (
                  <div key={t} className="card flex gap-3">
                    <div className="icon-container w-9 h-9 shrink-0"><I size={16} className="text-[#a3e635]" /></div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-0.5">{t}</p>
                      <p className="text-white/55 text-xs leading-relaxed">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* DEMO */}
            <section id="demo" className="scroll-mt-24">
              <SectionHeader
                eyebrow="03 · Demo"
                title="Watch and try"
                sub="The 180 second pitch video and the live application."
              />
              {YOUTUBE_ID ? (
                <div className="aspect-video rounded-2xl overflow-hidden border border-[#1e2028] mb-4">
                  <iframe
                    width="100%" height="100%"
                    src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
                    title="EduStack pitch — Vibe to Production in 180 seconds"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="card mb-4 flex items-center gap-3 border-[#22d3ee]/30">
                  <PlayCircle size={22} className="text-[#22d3ee] shrink-0" />
                  <div>
                    <p className="text-white text-sm font-semibold">Pitch video coming soon</p>
                    <p className="text-white/55 text-xs">Once uploaded, the 180 second pitch will play right here.</p>
                  </div>
                </div>
              )}
              <a href={LIVE_URL} target="_blank" rel="noreferrer" className="btn-primary gap-2 text-sm">
                Open the live product <ExternalLink size={14} />
              </a>
            </section>

            {/* ARCHITECTURE */}
            <section id="architecture" className="scroll-mt-24">
              <SectionHeader
                eyebrow="04 · System"
                title="How EduStack works"
                sub="Your profile goes in. The AI thinks. Your personal path comes out. Your progress feeds the next loop."
              />
              <ArchitectureFlow />
            </section>

            {/* AI & DATA */}
            <section id="ai" className="scroll-mt-24">
              <SectionHeader
                eyebrow="05 · AI and data"
                title="The AI layer and the data layer"
                sub="How the model thinks, what grounds it, and how we keep it honest."
              />
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="card">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#a3e635] mb-3 flex items-center gap-2"><Brain size={14} /> Models</p>
                  <ul className="space-y-2 text-sm text-white/75">
                    <li className="flex gap-2 items-start"><Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" /> Claude (Anthropic) is the primary model, served through OpenRouter, live today.</li>
                    <li className="flex gap-2 items-start"><Check size={14} className="text-[#22d3ee] shrink-0 mt-0.5" /> GPT (OpenAI) and Gemini (Google) sit as supportive models through the same OpenRouter setup, for fallback and cross checking.</li>
                    <li className="flex gap-2 items-start"><Check size={14} className="text-[#22d3ee] shrink-0 mt-0.5" /> An open embedding model is planned for semantic search at the BuildFest.</li>
                  </ul>
                </div>
                <div className="card">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#a3e635] mb-3 flex items-center gap-2"><Database size={14} /> Data sources</p>
                  <ul className="space-y-2 text-sm text-white/75">
                    <li className="flex gap-2 items-start"><Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" /> Primary: YouTube videos and channels for free AI content.</li>
                    <li className="flex gap-2 items-start"><Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" /> Free online courses from Coursera, edX, MIT OpenCourseWare, and Khan Academy.</li>
                    <li className="flex gap-2 items-start"><Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" /> Links to relevant Skool communities so learners can join groups of people learning the same topics.</li>
                    <li className="flex gap-2 items-start"><Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" /> Internal: user profiles, quiz scores, and progress.</li>
                  </ul>
                </div>
              </div>
              <div className="card border-[#a3e635]/25" style={{ background: 'linear-gradient(135deg, rgba(163,230,53,0.05), rgba(19,21,26,0.96))' }}>
                <p className="text-xs font-bold uppercase tracking-wider text-[#a3e635] mb-3 flex items-center gap-2"><Shield size={14} /> Responsible AI</p>
                <p className="text-sm text-white/75 leading-relaxed">
                  Every recommendation comes with a reason a learner can read, so the AI is never a black box. The model API key lives on the server and is never shipped in the browser. We collect only what is needed (interest, level, goal, progress), validate every model response, and fall back to a deterministic reason if anything goes wrong. All content is free and openly available, and we review for bias as the library grows.
                </p>
              </div>
            </section>

            {/* TECH STACK */}
            <section id="stack" className="scroll-mt-24">
              <SectionHeader
                eyebrow="06 · Stack"
                title="Built with"
                sub="A small, open, modern stack. Easy to extend, easy to deploy."
              />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { t: 'Frontend',     d: 'React 18, Vite 5, Tailwind CSS 3, React Router 6, lucide-react.' },
                  { t: 'Backend',      d: 'Node serverless functions on Vercel using built in fetch. No extra runtime.' },
                  { t: 'AI',           d: 'Claude through OpenRouter, with GPT and Gemini available as fallbacks.' },
                  { t: 'Hosting',      d: 'Vercel, with continuous deployment from main on GitHub.' },
                  { t: 'Build tools',  d: 'VS Code with the Claude Code extension, and Cursor, driven by structured prompts.' },
                  { t: 'Planned',      d: 'PostgreSQL with pgvector, a graph database, Playwright scrapers, Redis cache, Metabase analytics.' },
                ].map(({ t, d }) => (
                  <div key={t} className="card">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#a3e635] mb-1">{t}</p>
                    <p className="text-sm text-white/70 leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ROADMAP */}
            <section id="roadmap" className="scroll-mt-24">
              <SectionHeader
                eyebrow="07 · Roadmap"
                title="Live now, next at the BuildFest, then beyond"
              />
              <div className="grid md:grid-cols-3 gap-4">
                <RoadmapCol title="Live today" tone="lime" items={[
                  'Personalized onboarding and dashboard',
                  'AI written reasons on every recommendation',
                  'Adaptive quiz loop that reorders your feed',
                  'Full English and Bangla support',
                  'Secure serverless backend at /api/reasons',
                ]} />
                <RoadmapCol title="Next at the BuildFest" tone="cyan" items={[
                  'Smart search over real free courses',
                  'A knowledge graph for topic order',
                  'A Bangla AI tutor for beginner questions',
                  'Content ingestion pipeline',
                  'User accounts and authentication',
                ]} />
                <RoadmapCol title="Beyond Bangladesh" tone="muted" items={[
                  'Scale across South Asia',
                  'University and community partnerships',
                  'Recruiter and freelance platform bridges',
                  'An MCP server so other AI tools can plug in',
                  'Open contribution model for educators',
                ]} />
              </div>
            </section>

            {/* MARKET & BUSINESS */}
            <section id="market" className="scroll-mt-24">
              <SectionHeader
                eyebrow="08 · Market and business"
                title="Why now and how it grows"
              />
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <StatCard value="170M+" label="People in Bangladesh, one of the youngest populations in the world." />
                <StatCard value="77M+"  label="Internet users in Bangladesh, with about 44 million on YouTube." accent="cyan" />
                <StatCard value="#2"    label="Bangladesh's rank globally for online freelancer supply (Oxford Internet Institute)." />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="card">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#a3e635] mb-2">Business model</p>
                  <p className="text-sm text-white/75 leading-relaxed">
                    Free for learners, always. Revenue will come from partnerships with universities, freelancing platforms, and AI tool providers who want to reach a well prepared talent pool. We never sell user data.
                  </p>
                </div>
                <div className="card">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#a3e635] mb-2">Go to market</p>
                  <p className="text-sm text-white/75 leading-relaxed">
                    Start in Bangladeshi student communities online and on campus. Partner with university clubs and Skool communities. First target: one hundred real users for feedback, then a few thousand in year one.
                  </p>
                </div>
                <div className="card">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#a3e635] mb-2">Traction</p>
                  <p className="text-sm text-white/75 leading-relaxed">
                    A working product is live in production today, with onboarding, a personalized dashboard, an adaptive quiz loop, live AI written reasoning, and Bangla support.
                  </p>
                </div>
                <div className="card">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#a3e635] mb-2">Unique advantage</p>
                  <p className="text-sm text-white/75 leading-relaxed">
                    Built for the beginner that everyone else overlooks. In Bangla. Free. With a real, adaptive path instead of a course library. Local first, ready to scale.
                  </p>
                </div>
              </div>
            </section>

            {/* TEAM */}
            <section id="team" className="scroll-mt-24">
              <SectionHeader
                eyebrow="09 · Team"
                title="The team"
                sub="Replace the placeholders with your real members. The grid keeps the cards uniform automatically."
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {TEAM.map((m) => {
                  const initial = m.name.replace(/[\[\]]/g, '').trim()[0] || '·'
                  return (
                    <div key={m.role} className="card flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full mb-3 flex items-center justify-center text-2xl text-[#0a0b0f] shadow-[0_0_24px_rgba(163,230,53,0.18)]" style={{ background: 'linear-gradient(135deg,#a3e635,#22d3ee)', fontFamily: "'Archivo Black', sans-serif" }}>
                        {initial}
                      </div>
                      <p className="text-white font-semibold">{m.name}</p>
                      <p className="text-[11px] text-[#a3e635] uppercase tracking-wider mt-0.5 font-bold">{m.role}</p>
                      <a href={`mailto:${m.email}`} className="text-xs text-white/45 hover:text-white mt-2 flex items-center gap-1 transition-colors">
                        <Mail size={11} /> {m.email}
                      </a>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* VISION */}
            <section id="vision" className="scroll-mt-24">
              <SectionHeader
                eyebrow="10 · Vision"
                title="What this becomes"
              />
              <div className="card text-center py-14 border-[#a3e635]/30" style={{ background: 'linear-gradient(135deg, rgba(163,230,53,0.06), rgba(34,211,238,0.04))' }}>
                <p className="text-2xl md:text-3xl text-white max-w-3xl mx-auto leading-snug" style={{ fontFamily: "'Archivo Black', sans-serif", letterSpacing: '-0.01em' }}>
                  A generation of young people in Bangladesh finding their way into AI, together, in their own language, for free.
                </p>
                <p className="text-white/55 mt-4 max-w-xl mx-auto">
                  Built in Bangladesh. Ready for everywhere with the same problem.
                </p>
              </div>
            </section>

            {/* FOOTER */}
            <footer className="pt-12 border-t border-[#1e2028] text-sm text-white/45">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p>EduStack · v1.0 · 2026 · Built for the Infinity AI BuildFest 2026.</p>
                <div className="flex gap-5">
                  <a href={LIVE_URL} target="_blank" rel="noreferrer" className="hover:text-[#a3e635] transition-colors">Live app</a>
                  <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-[#a3e635] transition-colors">GitHub</a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
