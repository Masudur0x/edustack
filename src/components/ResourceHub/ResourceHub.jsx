import { useState, useMemo } from 'react'
import { Search, Star, ExternalLink, Bookmark, BookmarkCheck, Filter, BookOpen, Award, Zap, X } from 'lucide-react'
import { COURSES, CERTIFICATIONS, AI_TOOLS, MAJORS } from '../../data/mockData.js'
import { useApp } from '../../context/AppContext.jsx'

const TABS = [
  { id: 'courses', label: 'Free Courses',   icon: BookOpen, count: COURSES.length },
  { id: 'certs',   label: 'Certifications', icon: Award,    count: CERTIFICATIONS.length },
  { id: 'tools',   label: 'AI Tools',       icon: Zap,      count: AI_TOOLS.length },
]

const TOOL_CATS   = [...new Set(AI_TOOLS.map(t => t.category))]
const COURSE_CATS = [...new Set(COURSES.map(c => c.category))]

const LEVEL_CLS = {
  Beginner:     'bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/30',
  Intermediate: 'bg-amber-900/40 text-amber-300 border border-amber-700/30',
  Advanced:     'bg-violet-900/40 text-violet-300 border border-violet-700/30',
}

function SaveButton({ id }) {
  const { user, toggleSave, setAuthModal } = useApp()
  const saved = user?.savedResources?.includes(id)
  return (
    <button onClick={() => user ? toggleSave(id) : setAuthModal('login')}
      className={`p-1.5 rounded-lg transition-colors ${saved ? 'text-[#a3e635] bg-[#a3e635]/10' : 'text-white/30 hover:text-[#a3e635] hover:bg-[#a3e635]/10'}`}>
      {saved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
    </button>
  )
}

function CourseCard({ course }) {
  return (
    <div className="card-hover flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <span className={`badge ${LEVEL_CLS[course.level]}`}>{course.level}</span>
        <SaveButton id={course.id} />
      </div>
      <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2 flex-1">{course.title}</h3>
      <p className="text-xs text-white/55 mb-3 line-clamp-2">{course.description}</p>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#a3e635]/10">
        <div>
          <p className="text-xs text-[#a3e635] font-medium">{course.provider}</p>
          <p className="text-xs text-white/55">{course.duration}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-amber-400">
          <Star size={11} fill="currentColor" /> {course.rating}
        </div>
      </div>
      <a href={course.url} target="_blank" rel="noopener noreferrer"
        className="mt-3 btn-secondary text-xs py-2 gap-1">
        Start Learning <ExternalLink size={11} />
      </a>
    </div>
  )
}

function CertCard({ cert }) {
  const costCls = cert.cost === 'Completely Free'
    ? 'bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/30'
    : cert.cost.includes('Audit')
      ? 'bg-sky-900/40 text-sky-300 border border-sky-700/30'
      : 'bg-amber-900/40 text-amber-300 border border-amber-700/30'
  const stars = Array.from({ length: 5 }, (_, i) => i < cert.recognitionScore)
  return (
    <div className="card-hover flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <span className={`badge ${costCls} text-[10px]`}>{cert.cost}</span>
        <SaveButton id={cert.id} />
      </div>
      <h3 className="text-sm font-semibold text-white mb-0.5 line-clamp-2">{cert.name}</h3>
      <p className="text-xs text-[#a3e635] font-medium mb-2">{cert.organization}</p>
      <p className="text-xs text-white/55 mb-3 line-clamp-2 flex-1">{cert.description}</p>
      <div className="flex items-center gap-1 mb-3">
        {stars.map((filled, i) => (
          <Star key={i} size={11} className={filled ? 'text-amber-400 fill-amber-400' : 'text-white/15'} />
        ))}
        <span className="text-xs text-white/55 ml-1">Industry recognition</span>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {cert.skills.slice(0, 3).map(s => (
          <span key={s} className="badge badge-indigo text-[10px]">{s}</span>
        ))}
      </div>
      <div className="mt-auto pt-3 border-t border-[#a3e635]/10 flex items-center justify-between">
        <span className="text-xs text-white/55">{cert.estimatedTime}</span>
        <button className="btn-primary text-xs px-3 py-1.5 gap-1">
          View Cert <ExternalLink size={11} />
        </button>
      </div>
    </div>
  )
}

function ToolCard({ tool }) {
  const catCls = {
    'Writing & Research': 'bg-violet-900/40 text-violet-300 border border-violet-700/30',
    'Math & Science':     'bg-sky-900/40 text-sky-300 border border-sky-700/30',
    'Coding':             'bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/30',
    'Study & Flashcards': 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/30',
    'Data & Analysis':    'bg-amber-900/40 text-amber-300 border border-amber-700/30',
  }
  return (
    <div className="card-hover flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <span className={`badge ${catCls[tool.category] || 'badge-indigo'} text-[10px]`}>{tool.category}</span>
        <div className="flex items-center gap-1 text-xs text-amber-400">
          <Star size={11} fill="currentColor" /> {tool.rating}
        </div>
      </div>
      <h3 className="text-sm font-semibold text-white mb-1">{tool.name}</h3>
      <p className="text-xs text-white/55 mb-3 line-clamp-2 flex-1">{tool.description}</p>
      <div className="bg-[#1a1c24] rounded-lg p-2.5 mb-3 border border-[#a3e635]/15">
        <p className="text-xs text-white/70 leading-relaxed">
          <span className="text-[#a3e635] font-medium">Student use: </span>
          {tool.useCase}
        </p>
      </div>
      <a href={tool.url} target="_blank" rel="noopener noreferrer"
        className="mt-auto btn-secondary text-xs py-2 gap-1">
        Try {tool.name} <ExternalLink size={11} />
      </a>
    </div>
  )
}

export default function ResourceHub() {
  const [tab, setTab]                 = useState('courses')
  const [search, setSearch]           = useState('')
  const [levelFilter, setLevelFilter] = useState('')
  const [majorFilter, setMajorFilter] = useState('')
  const [catFilter, setCatFilter]     = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (tab === 'courses')
      return COURSES.filter(c =>
        (!q || c.title.toLowerCase().includes(q) || c.provider.toLowerCase().includes(q)) &&
        (!levelFilter || c.level === levelFilter) &&
        (!majorFilter || c.majorTags.includes(majorFilter)) &&
        (!catFilter   || c.category === catFilter))
    if (tab === 'certs')
      return CERTIFICATIONS.filter(c =>
        (!q || c.name.toLowerCase().includes(q) || c.organization.toLowerCase().includes(q)) &&
        (!majorFilter || c.majorTags.includes(majorFilter)))
    return AI_TOOLS.filter(t =>
      (!q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)) &&
      (!catFilter || t.category === catFilter))
  }, [tab, search, levelFilter, majorFilter, catFilter])

  const clearFilters = () => { setLevelFilter(''); setMajorFilter(''); setCatFilter(''); setSearch('') }
  const hasFilters = levelFilter || majorFilter || catFilter || search

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

      {/* Header */}
      <div className="mb-8">
        <span className="block mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a3e635]">Free Resource Hub</span>
        <h1 className="text-3xl text-white mb-2" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
          Learn without limits
        </h1>
        <p className="text-white/55 max-w-2xl">200+ free courses, certifications, and AI tools. No login required to browse.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border border-[#1e2028] rounded-xl p-1 mb-6 overflow-x-auto" style={{ background: 'rgba(13,15,20,0.9)' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setCatFilter(''); setLevelFilter('') }}
            className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium flex-shrink-0 transition-colors ${
              tab === t.id
                ? 'bg-[#a3e635]/12 text-[#a3e635]'
                : 'text-white/55 hover:text-white hover:bg-white/[0.04]'
            }`}>
            <t.icon size={15} className={tab === t.id ? 'text-[#a3e635]' : 'text-white/45 group-hover:text-white/80'} />
            {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${tab === t.id ? 'bg-[#a3e635]/20 text-[#a3e635]' : 'bg-white/[0.06] text-white/45'}`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${tab === 'courses' ? 'courses' : tab === 'certs' ? 'certifications' : 'tools'}...`}
            className="input-field pl-9" />
        </div>
        <button onClick={() => setShowFilters(s => !s)}
          className={`btn-secondary gap-2 text-sm flex-shrink-0 ${showFilters ? 'border-[#a3e635]/60 text-[#a3e635]' : ''}`}>
          <Filter size={15} /> Filters
          {hasFilters && <span className="w-2 h-2 bg-[#a3e635] rounded-full" />}
        </button>
        {hasFilters && (
          <button onClick={clearFilters} className="btn-ghost text-sm gap-1 text-red-400 hover:text-red-300">
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {/* Filter dropdowns */}
      {showFilters && (
        <div className="card mb-4 flex flex-wrap gap-3 animate-slide-up">
          {tab !== 'tools' && (
            <select value={majorFilter} onChange={e => setMajorFilter(e.target.value)}
              className="input-field text-sm w-auto min-w-[160px]">
              <option value="">All Majors</option>
              {MAJORS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          )}
          {tab === 'courses' && (
            <>
              <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)}
                className="input-field text-sm w-auto min-w-[140px]">
                <option value="">All Levels</option>
                <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
              </select>
              <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
                className="input-field text-sm w-auto min-w-[160px]">
                <option value="">All Categories</option>
                {COURSE_CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </>
          )}
          {tab === 'tools' && (
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
              className="input-field text-sm w-auto min-w-[180px]">
              <option value="">All Categories</option>
              {TOOL_CATS.map(c => <option key={c}>{c}</option>)}
            </select>
          )}
        </div>
      )}

      <p className="text-white/55 text-xs mb-4">
        Showing {filtered.length} {tab === 'courses' ? 'courses' : tab === 'certs' ? 'certifications' : 'tools'}
        {hasFilters ? ' (filtered)' : ''}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Search size={40} className="text-white/15 mx-auto mb-3" />
          <p className="text-white/50 font-medium">No results found</p>
          <p className="text-white/45 text-sm">Try adjusting your search or filters</p>
          <button onClick={clearFilters} className="btn-ghost text-sm mt-3 text-[#a3e635]">Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tab === 'courses' && filtered.map(c => <CourseCard key={c.id} course={c} />)}
          {tab === 'certs'   && filtered.map(c => <CertCard   key={c.id} cert={c} />)}
          {tab === 'tools'   && filtered.map(t => <ToolCard   key={t.id} tool={t} />)}
        </div>
      )}
    </div>
  )
}

