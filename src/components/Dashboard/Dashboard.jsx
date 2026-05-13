import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Flame, BookOpen, Award, TrendingUp, ArrowRight,
  CheckCircle, Circle, Clock, Star, Zap, Brain,
  ExternalLink, ChevronRight, Bookmark, Users, FlaskConical,
} from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { COURSES, QUIZZES, FORUM_POSTS, MAJORS } from '../../data/mockData.js'
import { getRecommendations, computeProgress, getMilestone } from '../../utils/recommendations.js'

const MILESTONE_LABELS = ['Explorer', 'Apprentice', 'Practitioner', 'Expert']

function ProgressBar({ user }) {
  const [animPct, setAnimPct] = useState(0)
  const major     = MAJORS.find(m => m.id === user.major?.primary)
  const rawPct    = computeProgress(user.completedIds || [], user.major?.primary)
  const milestone = getMilestone(rawPct)

  useEffect(() => { const t = setTimeout(() => setAnimPct(rawPct), 200); return () => clearTimeout(t) }, [rawPct])

  return (
    <div className="card p-6 mb-6 border-[#a3e635]/20" style={{ background: 'linear-gradient(135deg,rgba(163,230,53,0.1),rgba(26,28,36,0.97))' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            {major?.icon} Your Learning Journey â€” {major?.label}
          </h2>
          <p className="text-white/55 text-sm">
            Current milestone: <span className="text-[#a3e635] font-semibold accent-text">{milestone.label}</span>
            {milestone.next && <span className="text-white/35"> â†’ next: {milestone.next}</span>}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            {rawPct}<span className="text-sm text-white/40">%</span>
          </p>
          <p className="text-xs text-white/35">complete</p>
        </div>
      </div>

      {/* Bar */}
      <div className="relative h-4 bg-[#1a1c24] rounded-full overflow-hidden mb-2">
        <div className="h-full rounded-full progress-fill relative"
          style={{ width: `${animPct}%`, background: 'linear-gradient(90deg,#a3e635,#22d3ee)' }}>
          <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/20 rounded-full blur-sm" />
        </div>
        {[25, 50, 75, 100].map(pct => (
          <div key={pct} className={`absolute top-0 bottom-0 w-px ${rawPct >= pct ? 'bg-[#a3e635]/40' : 'bg-white/10'}`}
            style={{ left: `${pct}%` }} />
        ))}
      </div>

      <div className="flex justify-between text-xs text-white/25">
        {MILESTONE_LABELS.map((label, i) => (
          <span key={label} className={rawPct >= (i + 1) * 25 ? 'text-[#a3e635]/70' : ''}>{label}</span>
        ))}
      </div>
      {milestone.next && (
        <p className="text-xs text-white/35 mt-2 accent-text">
          Complete {Math.ceil((milestone.pct - rawPct) / 10)} more activities to reach{' '}
          <span className="text-[#a3e635]">{milestone.next}</span>
        </p>
      )}
    </div>
  )
}

function QuickStats({ user }) {
  const avg = Object.values(user.quizScores || {})
  const stats = [
    { icon: BookOpen,    label: 'In Progress',  value: '3',                                                       color: 'text-[#a3e635]' },
    { icon: Award,       label: 'Certs Earned', value: '2',                                                       color: 'text-sky-400' },
    { icon: TrendingUp,  label: 'Quiz Average', value: `${avg.length ? Math.round(avg.reduce((a,b)=>a+b,0)/avg.length) : 0}%`, color: 'text-violet-400' },
    { icon: Flame,       label: 'Day Streak',   value: user.streak,                                               color: 'text-amber-400' },
  ]
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {stats.map(s => (
        <div key={s.label} className="card flex items-center gap-3">
          <div className={`w-9 h-9 icon-container ${s.color}`}>
            <s.icon size={18} />
          </div>
          <div>
            <p className="text-xl font-bold text-white leading-none" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{s.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function RecommendationCard({ item }) {
  const { toggleSave, user } = useApp()
  const saved  = user?.savedResources?.includes(item.id)
  const icons  = { course: BookOpen, certification: Award, tool: Zap }
  const Icon   = icons[item._type] || BookOpen
  const typeCls = { course: 'badge-indigo', certification: 'badge-cyan', tool: 'badge-purple' }

  return (
    <div className="card-hover flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <span className={`badge ${typeCls[item._type] || 'badge-indigo'} text-[10px]`}>
          <Icon size={10} /> {item._type || 'course'}
        </span>
        {item._type !== 'tool' && (
          <button onClick={() => toggleSave(item.id)}
            className={`text-xs transition-colors ${saved ? 'text-[#a3e635]' : 'text-white/25 hover:text-[#a3e635]'}`}>
            <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>
      <h4 className="text-sm font-semibold text-white mb-1 line-clamp-2 flex-1">{item.title || item.name}</h4>
      <p className="text-xs text-white/50 mb-3 line-clamp-2">{item.description}</p>
      {item._reason && (
        <p className="text-[10px] text-[#a3e635]/70 italic mb-2 accent-text">âœ¦ {item._reason}</p>
      )}
      <button className="mt-auto text-xs btn-primary py-1.5 gap-1">
        {item._type === 'tool' ? 'Try Tool' : item._type === 'certification' ? 'View Cert' : 'Start Learning'}
        <ExternalLink size={11} />
      </button>
    </div>
  )
}

function ContinueLearning({ user }) {
  const { markComplete } = useApp()
  const lastCourse = COURSES.find(c => !user.completedIds?.includes(c.id))
  if (!lastCourse) return null
  return (
    <div className="card border-[#a3e635]/15 mb-6" style={{ background: 'linear-gradient(135deg,rgba(163,230,53,0.07),rgba(26,28,36,0.98))' }}>
      <div className="flex items-center gap-2 mb-3">
        <BookOpen size={16} className="text-[#a3e635]" />
        <p className="text-sm font-semibold text-white">Continue Where You Left Off</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium text-sm line-clamp-1">{lastCourse.title}</h4>
          <p className="text-xs text-white/40">{lastCourse.provider} Â· {lastCourse.duration}</p>
          <div className="mt-2 h-1.5 bg-[#1a1c24] rounded-full overflow-hidden">
            <div className="h-full rounded-full w-[38%]" style={{ background: 'linear-gradient(90deg,#a3e635,#22d3ee)' }} />
          </div>
          <p className="text-xs text-white/35 mt-1">38% complete</p>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <button className="btn-primary text-xs py-2 px-3 gap-1">Resume <ArrowRight size={12} /></button>
          <button onClick={() => markComplete(lastCourse.id)} className="btn-secondary text-xs py-2 px-3">Mark Done</button>
        </div>
      </div>
    </div>
  )
}

function WeeklyGoal({ user }) {
  const target = user.hoursPerWeek || 7
  const done   = 4.5
  const pct    = Math.round((done / target) * 100)
  const r      = 36
  const circ   = 2 * Math.PI * r
  const dash   = (pct / 100) * circ

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 icon-container"><Clock size={13} className="text-[#a3e635]" /></div>
        <p className="text-sm font-semibold text-white">Weekly Goal</p>
      </div>
      <div className="flex items-center justify-center relative">
        <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
          <circle cx="48" cy="48" r={r} fill="none" stroke="#1e2028" strokeWidth="8" />
          <circle cx="48" cy="48" r={r} fill="none" stroke="url(#wg)" strokeWidth="8"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
          <defs>
            <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a3e635" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute text-center">
          <p className="text-xl font-bold text-white" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{done}h</p>
          <p className="text-xs text-white/35">/ {target}h</p>
        </div>
      </div>
      <p className="text-center text-xs text-white/40 mt-2">{target - done}h to hit your weekly goal</p>
    </div>
  )
}

function UpcomingQuiz({ user }) {
  const navigate = useNavigate()
  const quiz = QUIZZES.find(q => q.major === user.major?.primary)
  if (!quiz) return null
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 icon-container"><Brain size={13} className="text-[#a3e635]" /></div>
        <p className="text-sm font-semibold text-white">Upcoming Quiz</p>
      </div>
      <h4 className="text-white text-sm font-medium mb-2">{quiz.title}</h4>
      <div className="flex gap-2 mb-3 flex-wrap">
        <span className="badge badge-purple">{quiz.level}</span>
        <span className="badge badge-indigo">{quiz.topic}</span>
        <span className="text-xs text-white/35 flex items-center gap-1"><Clock size={10} /> {quiz.duration}m</span>
      </div>
      <p className="text-xs text-white/35 mb-3 accent-text">Scheduled: {quiz.scheduledDate}</p>
      <button onClick={() => navigate('/quiz')} className="btn-primary text-xs w-full py-2">Take Quiz</button>
    </div>
  )
}

function LearningPath({ user }) {
  const major      = user.major?.primary
  const pathCourses = COURSES.filter(c => c.majorTags.includes(major)).slice(0, 5)
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 icon-container"><TrendingUp size={13} className="text-[#a3e635]" /></div>
        <p className="text-sm font-semibold text-white">Learning Path</p>
        <span className="badge badge-indigo text-[10px] ml-auto">Next 5</span>
      </div>
      <ul className="space-y-2.5">
        {pathCourses.map((course, i) => {
          const done = user.completedIds?.includes(course.id)
          return (
            <li key={course.id} className="flex items-center gap-2.5">
              {done
                ? <CheckCircle size={16} className="text-[#a3e635] flex-shrink-0" />
                : <Circle size={16} className={`flex-shrink-0 ${i === 0 ? 'text-[#a3e635]' : 'text-white/20'}`} />}
              <span className={`text-xs leading-tight flex-1 ${done ? 'text-white/30 line-through' : i === 0 ? 'text-white' : 'text-white/50'}`}>
                {course.title}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ForumActivity() {
  const navigate = useNavigate()
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 icon-container"><Users size={13} className="text-[#a3e635]" /></div>
          <p className="text-sm font-semibold text-white">Community Activity</p>
        </div>
        <button onClick={() => navigate('/forum')} className="text-xs text-[#a3e635]/70 hover:text-[#a3e635] flex items-center gap-0.5">
          View all <ChevronRight size={12} />
        </button>
      </div>
      <ul className="space-y-3">
        {FORUM_POSTS.slice(0, 3).map(p => (
          <li key={p.id} className="flex items-start gap-2 cursor-pointer group">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-[#0a0b0f] flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#a3e635,#22d3ee)' }}>
              {p.author.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-white font-medium line-clamp-1 group-hover:text-[#a3e635] transition-colors">{p.title}</p>
              <p className="text-[10px] text-white/35">{p.upvotes} upvotes Â· {p.replies} replies</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ToolOfWeek() {
  return (
    <div className="card border-[#22d3ee]/20" style={{ background: 'linear-gradient(135deg,rgba(34,211,238,0.08),rgba(26,28,36,0.98))' }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 icon-container"><Zap size={13} className="text-[#a3e635]" /></div>
        <p className="text-sm font-semibold text-white">Tool of the Week</p>
      </div>
      <h4 className="text-white font-semibold mb-1">Julius AI</h4>
      <p className="text-xs text-white/50 mb-3 leading-relaxed">Upload any CSV or Excel file and ask questions in plain English. Perfect for data science assignments.</p>
      <button className="btn-secondary text-xs py-2 gap-1 w-full">
        Try Julius AI <ExternalLink size={11} />
      </button>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useApp()
  const navigate = useNavigate()
  const recommendations = getRecommendations(user, { limit: 4 })
  const major = MAJORS.find(m => m.id === user.major?.primary)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl text-white" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              Welcome back, {user.name.split(' ')[0]}
            </h1>
            {user.streak > 0 && (
              <div className="flex items-center gap-1 badge badge-amber">
                <Flame size={13} fill="currentColor" className="text-amber-400" />
                <span className="text-xs font-bold text-amber-300">{user.streak} day streak</span>
              </div>
            )}
          </div>
          <p className="text-white/50 text-sm accent-text">
            {major?.icon} {major?.label} Â· {user.knowledgeLevel} level
          </p>
        </div>
        <button onClick={() => navigate('/labs')}
          className="hidden sm:flex btn-secondary text-sm gap-2">
          <FlaskConical size={15} /> Virtual Labs
        </button>
      </div>

      <ProgressBar user={user} />
      <QuickStats user={user} />
      <ContinueLearning user={user} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Brain size={16} className="text-[#a3e635]" /> Recommended For You
                </h3>
                <p className="text-xs text-white/35">Updated daily based on your progress</p>
              </div>
              <button onClick={() => navigate('/resources')} className="text-xs text-[#a3e635]/70 hover:text-[#a3e635] flex items-center gap-0.5">
                Browse all <ChevronRight size={12} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.map((item, i) => <RecommendationCard key={item.id || i} item={item} />)}
            </div>
          </div>
          <ForumActivity />
        </div>

        {/* Right */}
        <div className="space-y-4">
          <WeeklyGoal user={user} />
          <LearningPath user={user} />
          <UpcomingQuiz user={user} />
          <ToolOfWeek />
        </div>
      </div>
    </div>
  )
}

