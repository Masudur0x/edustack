import { useState, useEffect } from 'react'
import { Brain, Clock, ChevronRight, CheckCircle, XCircle, Flag, ArrowRight, RotateCcw, TrendingUp, BookOpen, Award, Lock } from 'lucide-react'
import { QUIZZES } from '../../data/mockData.js'
import { useApp } from '../../context/AppContext.jsx'

// â”€â”€ Quiz Catalog â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function QuizCard({ quiz, onStart, prevScore }) {
  const levelCls = {
    Beginner:     'bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/30',
    Intermediate: 'bg-amber-900/40 text-amber-300 border border-amber-700/30',
    Advanced:     'bg-violet-900/40 text-violet-300 border border-violet-700/30',
  }
  return (
    <div className="card-hover flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <span className={`badge ${levelCls[quiz.level]}`}>{quiz.level}</span>
        <span className="text-xs text-white/35 flex items-center gap-1"><Clock size={11} /> {quiz.duration}m</span>
      </div>
      <h3 className="text-white font-semibold mb-1">{quiz.title}</h3>
      <p className="text-xs text-white/45 mb-1">
        Topic: <span className="text-[#a3e635]">{quiz.topic}</span>
      </p>
      <p className="text-xs text-white/35 mb-3">{quiz.questions.length} questions</p>

      {prevScore !== undefined && (
        <div className={`text-xs px-3 py-1.5 rounded-lg mb-3 font-medium ${
          prevScore >= 80 ? 'bg-[#a3e635]/10 text-[#a3e635]' :
          prevScore >= 60 ? 'bg-amber-900/40 text-amber-300' :
          'bg-red-900/40 text-red-300'
        }`}>
          Last score: {prevScore}%
        </div>
      )}

      <p className="text-xs text-white/35 mb-3">
        Scheduled: <span className="text-white/70">{quiz.scheduledDate}</span>
      </p>

      <button onClick={() => onStart(quiz)} className="mt-auto btn-primary text-sm py-2 gap-1 justify-center">
        {prevScore !== undefined ? 'Retake Quiz' : 'Take Quiz'} <ChevronRight size={14} />
      </button>
    </div>
  )
}

// â”€â”€ Taking a Quiz â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function QuizTaker({ quiz, onFinish }) {
  const [currentQ, setCurrentQ]   = useState(0)
  const [answers, setAnswers]     = useState({})
  const [flagged, setFlagged]     = useState(new Set())
  const [review, setReview]       = useState(false)
  const [timeLeft, setTimeLeft]   = useState(quiz.duration * 60)

  useEffect(() => {
    if (timeLeft <= 0) { onFinish(answers); return }
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000)
    return () => clearInterval(t)
  }, [timeLeft])

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  const q          = quiz.questions[currentQ]
  const allAnswered = quiz.questions.every(q => q.id in answers)
  const progress   = Object.keys(answers).length / quiz.questions.length

  const toggleFlag = () => setFlagged(f => { const n = new Set(f); n.has(q.id) ? n.delete(q.id) : n.add(q.id); return n })
  const selectAnswer = (idx) => { if (!review) setAnswers(a => ({ ...a, [q.id]: idx })) }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="card mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold">{quiz.title}</h2>
          <span className={`flex items-center gap-1.5 text-sm font-mono font-bold ${timeLeft < 60 ? 'text-red-400' : 'text-[#a3e635]'}`}>
            <Clock size={15} /> {fmt(timeLeft)}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-2 bg-[#1a1c24] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress * 100}%`, background: 'linear-gradient(90deg, #008156, #a3e635)' }} />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-white/35">
          <span>Question {currentQ + 1} of {quiz.questions.length}</span>
          <span>{Object.keys(answers).length} answered</span>
        </div>
      </div>

      {/* Question nav dots */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {quiz.questions.map((qq, i) => (
          <button key={qq.id} onClick={() => setCurrentQ(i)}
            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
              i === currentQ    ? 'text-white ring-2 ring-[#a3e635]/60' :
              qq.id in answers  ? flagged.has(qq.id) ? 'bg-amber-900/40 text-amber-300' : 'bg-[#a3e635]/15 text-[#a3e635]' :
              'bg-[#1a1c24] text-white/40'
            }`}
            style={i === currentQ ? { background: 'linear-gradient(135deg, #a3e635, #22d3ee)' } : {}}>
            {i + 1}
          </button>
        ))}
      </div>

      {/* Question */}
      <div className="card mb-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <p className="text-white font-medium leading-relaxed">{q.text}</p>
          <button onClick={toggleFlag}
            className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${flagged.has(q.id) ? 'text-amber-400 bg-amber-900/30' : 'text-white/30 hover:text-amber-400'}`}>
            <Flag size={15} />
          </button>
        </div>

        <div className="space-y-2.5">
          {q.options.map((opt, idx) => {
            const selected = answers[q.id] === idx
            const correct  = idx === q.correctAnswer
            let cls = 'border-[#1e2028] bg-[#13151a] text-white/60 hover:border-[#a3e635]/40'
            if (selected && !review)           cls = 'border-[#a3e635] bg-[#a3e635]/10 text-white'
            if (review && correct)             cls = 'border-emerald-500 bg-emerald-900/30 text-emerald-300'
            if (review && selected && !correct) cls = 'border-red-500 bg-red-900/20 text-red-300'

            return (
              <button key={idx} onClick={() => selectAnswer(idx)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${cls}`}>
                <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                {review && correct    && <CheckCircle size={14} className="inline ml-2 text-emerald-400" />}
                {review && selected && !correct && <XCircle size={14} className="inline ml-2 text-red-400" />}
              </button>
            )
          })}
        </div>

        {review && (
          <div className="mt-4 p-3 bg-[#a3e635]/5 border border-[#a3e635]/20 rounded-xl">
            <p className="text-xs text-[#a3e635] font-medium mb-1 accent-text">Explanation</p>
            <p className="text-xs text-white/60 leading-relaxed">{q.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={() => setCurrentQ(c => Math.max(0, c - 1))} disabled={currentQ === 0}
          className="btn-secondary text-sm disabled:opacity-40">â† Previous</button>

        <div className="flex gap-2">
          {!review && allAnswered && (
            <button onClick={() => setReview(true)} className="btn-secondary text-sm">
              Review Answers
            </button>
          )}
          {currentQ < quiz.questions.length - 1 ? (
            <button onClick={() => setCurrentQ(c => c + 1)} className="btn-primary text-sm">Next â†’</button>
          ) : (
            <button onClick={() => onFinish(answers)} className="btn-primary text-sm gap-1">
              Submit <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// â”€â”€ Results â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function QuizResults({ quiz, answers, onRetake, onDone }) {
  const correct = quiz.questions.filter(q => answers[q.id] === q.correctAnswer).length
  const score   = Math.round((correct / quiz.questions.length) * 100)
  const { saveQuizScore } = useApp()

  useEffect(() => { saveQuizScore(quiz.topic, score) }, [])

  const grade = score >= 80
    ? { label: 'Excellent!',      color: 'text-[#a3e635]',   ringColor: '#a3e635',  trackColor: '#1a1c24' }
    : score >= 60
    ? { label: 'Good Job!',       color: 'text-amber-400',   ringColor: '#f59e0b',  trackColor: '#1a1c24' }
    : { label: 'Keep Practicing', color: 'text-red-400',     ringColor: '#f87171',  trackColor: '#1a1c24' }

  const circumference = 2 * Math.PI * 45
  const dash = (score / 100) * circumference

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      <div className="card mb-5 text-center p-8">
        <p className={`text-lg font-bold mb-3 ${grade.color}`} style={{ fontFamily: "'Archivo Black', sans-serif" }}>{grade.label}</p>
        <div className="relative flex items-center justify-center mb-3">
          <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
            <circle cx="60" cy="60" r="45" fill="none" stroke={grade.trackColor} strokeWidth="10" />
            <circle cx="60" cy="60" r="45" fill="none" stroke={grade.ringColor} strokeWidth="10"
              strokeDasharray={`${dash} ${circumference}`} strokeLinecap="round" />
          </svg>
          <div className="absolute text-center">
            <p className="text-4xl font-extrabold text-white" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{score}</p>
            <p className="text-sm text-white/40">%</p>
          </div>
        </div>
        <p className="text-white/50">{correct} / {quiz.questions.length} correct</p>
      </div>

      {/* Per-question breakdown */}
      <div className="card mb-5">
        <h3 className="text-white font-semibold mb-4" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Question Review</h3>
        <div className="space-y-3">
          {quiz.questions.map((q, i) => {
            const isCorrect = answers[q.id] === q.correctAnswer
            return (
              <div key={q.id} className={`p-3 rounded-xl border ${isCorrect ? 'border-emerald-700/40 bg-emerald-900/20' : 'border-red-800/40 bg-red-900/15'}`}>
                <div className="flex items-start gap-2">
                  {isCorrect
                    ? <CheckCircle size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    : <XCircle    size={15} className="text-red-400 flex-shrink-0 mt-0.5" />}
                  <div>
                    <p className="text-sm text-white">{i + 1}. {q.text}</p>
                    {!isCorrect && (
                      <p className="text-xs text-white/45 mt-1">
                        Correct: <span className="text-[#a3e635]">{q.options[q.correctAnswer]}</span>
                      </p>
                    )}
                    <p className="text-xs text-white/35 mt-1 leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recommendation */}
      {score < 80 && (
        <div className="card border-[#a3e635]/20 bg-[#a3e635]/5 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 icon-container"><BookOpen size={12} className="text-[#a3e635]" /></div>
            <p className="text-sm font-semibold text-white">Recommended next</p>
          </div>
          <p className="text-xs text-white/50">
            Based on your score, review {score < 60 ? 'foundational' : 'intermediate'} resources in{' '}
            <span className="text-[#a3e635]">{quiz.topic}</span>.
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onRetake} className="btn-secondary flex-1 gap-2 justify-center text-sm">
          <RotateCcw size={14} /> Retake
        </button>
        <button onClick={onDone} className="btn-primary flex-1 gap-2 justify-center text-sm">
          Done <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}

// â”€â”€ Main â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function Quiz() {
  const { user } = useApp()
  const [phase, setPhase]             = useState('catalog')
  const [activeQuiz, setActiveQuiz]   = useState(null)
  const [finalAnswers, setFinalAnswers] = useState(null)

  const majorQuizzes = QUIZZES.filter(q => q.major === user.major?.primary)
  const otherQuizzes = QUIZZES.filter(q => q.major !== user.major?.primary)

  const start  = (quiz)    => { setActiveQuiz(quiz); setPhase('taking') }
  const finish = (answers) => { setFinalAnswers(answers); setPhase('results') }
  const reset  = ()        => { setPhase('catalog'); setActiveQuiz(null); setFinalAnswers(null) }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {phase === 'catalog' && (
        <>
          <div className="mb-8">
            <span className="text-[#a3e635] text-sm accent-text block mb-2">
              <Brain size={12} className="inline mr-1" />Quizzes
            </span>
            <h1 className="text-2xl text-white mb-2" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Subject-Specific Quizzes</h1>
            <p className="text-white/50 text-sm">Test your knowledge, reveal gaps, and earn mastery badges. Scores feed your AI recommendations.</p>
          </div>

          {majorQuizzes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                <div className="w-6 h-6 icon-container"><Award size={13} className="text-[#a3e635]" /></div>
                Quizzes for Your Major
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {majorQuizzes.map(q => (
                  <QuizCard key={q.id} quiz={q} onStart={start} prevScore={user.quizScores?.[q.topic]} />
                ))}
              </div>
            </div>
          )}

          {otherQuizzes.length > 0 && (
            <div>
              <h2 className="text-white/50 font-semibold mb-4 flex items-center gap-2">
                <Lock size={14} className="text-white/30" />
                <span>Other Subjects</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherQuizzes.map(q => (
                  <QuizCard key={q.id} quiz={q} onStart={start} prevScore={user.quizScores?.[q.topic]} />
                ))}
              </div>
            </div>
          )}

          {/* Score summary */}
          {Object.keys(user.quizScores || {}).length > 0 && (
            <div className="mt-8 card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 icon-container"><TrendingUp size={14} className="text-[#a3e635]" /></div>
                <h3 className="text-white font-semibold" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Your Score History</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(user.quizScores).map(([topic, score]) => (
                  <div key={topic} className="bg-[#13151a] border border-[#1e2028] rounded-xl p-3 text-center">
                    <p className={`text-xl font-bold ${score >= 80 ? 'text-[#a3e635]' : score >= 60 ? 'text-amber-400' : 'text-red-400'}`}
                      style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                      {score}%
                    </p>
                    <p className="text-xs text-white/40 mt-0.5 accent-text">{topic}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {phase === 'taking' && activeQuiz && (
        <>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={reset} className="btn-secondary text-sm">â† Back to Quizzes</button>
            <span className="text-white/45 text-sm accent-text">{activeQuiz.title}</span>
          </div>
          <QuizTaker quiz={activeQuiz} onFinish={finish} />
        </>
      )}

      {phase === 'results' && activeQuiz && finalAnswers && (
        <>
          <div className="mb-6">
            <h2 className="text-2xl text-white mb-1" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Quiz Results</h2>
            <p className="text-white/45 text-sm accent-text">{activeQuiz.title}</p>
          </div>
          <QuizResults
            quiz={activeQuiz}
            answers={finalAnswers}
            onRetake={() => start(activeQuiz)}
            onDone={reset}
          />
        </>
      )}
    </div>
  )
}


