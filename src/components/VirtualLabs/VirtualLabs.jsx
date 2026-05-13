import { useState, useEffect } from 'react'
import {
  FlaskConical, Clock, Users, ChevronRight, Play, X,
  CheckCircle, Circle, Terminal, BookOpen, Code2,
} from 'lucide-react'
import { VIRTUAL_LABS, MAJORS } from '../../data/mockData.js'
import { useApp } from '../../context/AppContext.jsx'

const DIFF_BADGE = {
  Beginner:     'bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/30',
  Intermediate: 'bg-amber-900/40 text-amber-300 border border-amber-700/30',
  Advanced:     'bg-violet-900/40 text-violet-300 border border-violet-700/30',
}

const DOMAIN_ACCENT = {
  cs:     'from-lime-600 to-emerald-700',
  ds:     'from-violet-700 to-indigo-800',
  ee:     'from-amber-700 to-orange-800',
  bio:    'from-emerald-700 to-teal-800',
  math:   'from-sky-700 to-blue-800',
  chem:   'from-pink-700 to-rose-800',
  design: 'from-violet-600 to-purple-800',
}

// â”€â”€ Lab Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function LabCard({ lab, onLaunch, completed }) {
  const major  = MAJORS.find(m => m.id === lab.domain)
  const accent = DOMAIN_ACCENT[lab.domain] || DOMAIN_ACCENT.cs

  return (
    <div className="card-hover flex flex-col group">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
        {lab.icon}
      </div>

      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className={`badge ${DIFF_BADGE[lab.difficulty]}`}>{lab.difficulty}</span>
        <span className="badge badge-indigo text-[10px]">{major?.label || lab.domain}</span>
        {completed && (
          <span className="badge bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/30 text-[10px]">
            <CheckCircle size={9} className="inline mr-0.5" /> Done
          </span>
        )}
      </div>

      <h3 className="text-white font-semibold mb-2 line-clamp-2">{lab.title}</h3>
      <p className="text-xs text-white/45 mb-3 line-clamp-2 flex-1">{lab.objective}</p>

      <div className="flex items-center gap-3 mb-3 text-xs text-white/35">
        <span className="flex items-center gap-1"><Clock size={10} /> {lab.duration}</span>
        <span className="flex items-center gap-1"><Users size={10} /> {lab.completions.toLocaleString()}</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {lab.technologies.slice(0, 3).map(t => (
          <span key={t} className="text-[10px] bg-[#1a1c24] border border-[#a3e635]/15 text-white/45 px-2 py-0.5 rounded-full">{t}</span>
        ))}
      </div>

      <button onClick={() => onLaunch(lab)}
        className="mt-auto btn-primary text-sm py-2 gap-2 justify-center">
        <Play size={13} /> {completed ? 'Reopen Lab' : 'Launch Lab'}
      </button>
    </div>
  )
}

// â”€â”€ Simulated IDE for coding labs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CodeEditor({ lab }) {
  const [code, setCode] = useState(
    lab.domain === 'cs' && lab.title.includes('REST')
      ? `const express = require('express');\nconst app = express();\n\n// Step 1: Define a GET route\napp.get('/api/users', (req, res) => {\n  res.json({ users: [] });\n});\n\napp.listen(3000, () => console.log('Server running on port 3000'));`
      : lab.domain === 'ds'
      ? `import pandas as pd\nimport matplotlib.pyplot as plt\n\n# Step 1: Load dataset\ndf = pd.read_csv('data.csv')\nprint(df.head())\nprint(df.describe())\n\n# Step 2: Check for missing values\nprint(df.isnull().sum())`
      : `# Welcome to the ${lab.title} lab\n# Follow the steps in the instruction panel\n\nprint("Lab started!")`
  )
  const [output, setOutput]   = useState('')
  const [running, setRunning] = useState(false)

  const run = async () => {
    setRunning(true)
    setOutput('')
    await new Promise(r => setTimeout(r, 900))
    const outputs = {
      cs: `[nodemon] starting 'server.js'\nServer running on port 3000\nGET /api/users 200 12ms - 15b\nâœ“ Route registered successfully`,
      ds: `   age  salary  dept\n0   28   55000    IT\n1   34   72000    HR\n\nage      0\nsalary   1\ndtype: int64\n\nâœ“ Dataset loaded, 1 missing value found in 'salary'`,
      default: `âœ“ Code executed successfully\nOutput: Lab step complete`,
    }
    setOutput(outputs[lab.domain] || outputs.default)
    setRunning(false)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar â€” intentionally dark IDE chrome */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0a0b0f] border-b border-[#a3e635]/10">
        <div className="flex items-center gap-2">
          <Code2 size={14} className="text-[#a3e635]" />
          <span className="text-xs text-white/50 font-mono">
            {lab.domain === 'ds' ? 'notebook.py' : 'server.js'}
          </span>
        </div>
        <button onClick={run} disabled={running}
          className="flex items-center gap-1.5 text-white text-xs px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #a3e635, #22d3ee)' }}>
          {running
            ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : <Play size={11} />}
          {running ? 'Running...' : 'Run Code'}
        </button>
      </div>

      {/* Editor */}
      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        className="flex-1 bg-[#0f1014] text-white/70 text-xs font-mono p-4 resize-none focus:outline-none leading-relaxed"
        spellCheck={false}
      />

      {/* Output */}
      <div className="h-36 bg-[#0f1014] border-t border-[#a3e635]/10">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-[#a3e635]/10 bg-[#0a0b0f]">
          <Terminal size={12} className="text-[#a3e635]/50" />
          <span className="text-xs text-white/30 font-mono">Output</span>
        </div>
        <pre className="p-3 text-xs font-mono text-[#a3e635] overflow-auto h-24 leading-relaxed">
          {output || <span className="text-white/20">Run the code to see output...</span>}
        </pre>
      </div>
    </div>
  )
}

// â”€â”€ Simulation frame â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SimFrame({ lab }) {
  const [step, setStep] = useState(0)

  const domainContent = {
    ee: {
      desc: 'Build and analyze a series circuit with 3 resistors.',
      visual: (
        <svg viewBox="0 0 400 200" className="w-full h-40 bg-[#0f1014] rounded-lg p-4">
          <line x1="20" y1="100" x2="20" y2="60" stroke="#a3e635" strokeWidth="2" />
          <line x1="15" y1="60" x2="25" y2="60" stroke="#a3e635" strokeWidth="3" />
          <line x1="13" y1="70" x2="27" y2="70" stroke="#a3e635" strokeWidth="1.5" />
          <line x1="20" y1="70" x2="20" y2="100" stroke="#a3e635" strokeWidth="2" />
          <text x="27" y="68" fill="#ffffff80" fontSize="10">9V</text>
          <line x1="20" y1="60" x2="380" y2="60" stroke="#22d3ee" strokeWidth="2" />
          <rect x="100" y="50" width="60" height="20" rx="3" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <text x="115" y="64" fill="#f59e0b" fontSize="9">100Î©</text>
          <rect x="200" y="50" width="60" height="20" rx="3" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <text x="215" y="64" fill="#f59e0b" fontSize="9">220Î©</text>
          <rect x="300" y="50" width="60" height="20" rx="3" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <text x="315" y="64" fill="#f59e0b" fontSize="9">330Î©</text>
          <line x1="20" y1="100" x2="380" y2="100" stroke="#22d3ee" strokeWidth="2" />
          <line x1="380" y1="60" x2="380" y2="100" stroke="#22d3ee" strokeWidth="2" />
          <text x="130" y="130" fill="#a3e635" fontSize="10">Total R = 650Î©</text>
          <text x="130" y="148" fill="#a3e635" fontSize="10">I = 9V Ã· 650Î© = 13.8mA</text>
        </svg>
      ),
    },
    math: {
      desc: 'Visualize the derivative of f(x) = xÂ² as a tangent line.',
      visual: (
        <svg viewBox="0 0 400 200" className="w-full h-40 bg-[#0f1014] rounded-lg p-4">
          <line x1="10" y1="100" x2="390" y2="100" stroke="#1a1c24" strokeWidth="1" />
          <line x1="200" y1="10" x2="200" y2="190" stroke="#1a1c24" strokeWidth="1" />
          <path d="M 10 190 Q 200 10 390 190" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
          <line x1="120" y1="10" x2="280" y2="100" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" />
          <circle cx="200" cy="100" r="5" fill="#a3e635" />
          <text x="210" y="96" fill="#ffffff70" fontSize="10">x=0, f(0)=0</text>
          <text x="10" y="20" fill="#a3e635" fontSize="11">f(x) = xÂ²</text>
          <text x="10" y="35" fill="#f59e0b" fontSize="11">f'(x) = 2x</text>
        </svg>
      ),
    },
    chem: {
      desc: 'Perform a virtual acid-base titration. HCl + NaOH â†’ NaCl + Hâ‚‚O',
      visual: (
        <div className="w-full h-40 bg-[#0f1014] rounded-lg flex items-center justify-center gap-10">
          <div className="text-center">
            <div className="w-8 h-24 border-2 border-[#a3e635]/20 rounded-b-full mx-auto relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 bg-rose-500/60 transition-all duration-700"
                style={{ height: `${Math.max(0, 100 - step * 20)}%` }} />
            </div>
            <p className="text-xs text-rose-400 mt-1">HCl (Acid)</p>
          </div>
          <div className="text-center">
            <p className="text-4xl text-white/50 mb-2">+</p>
            <p className="text-xs text-white/30">â†’</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-24 border-2 border-[#a3e635]/20 rounded-b-full mx-auto relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 bg-sky-500/60 transition-all duration-700"
                style={{ height: `${Math.min(100, step * 20)}%` }} />
            </div>
            <p className="text-xs text-sky-400 mt-1">NaOH (Base)</p>
          </div>
          <div className="text-center">
            <div className={`w-10 h-10 rounded-full border-2 transition-colors duration-500 ${
              step < 3 ? 'border-rose-500 bg-rose-500/10' : step === 3 ? 'border-[#a3e635] bg-[#a3e635]/20' : 'border-sky-500 bg-sky-500/10'
            }`} />
            <p className="text-xs text-white/40 mt-1">pH: {[2, 4, 7, 9, 12][Math.min(step, 4)]}</p>
          </div>
        </div>
      ),
    },
  }

  const content = domainContent[lab.domain]

  return (
    <div className="p-4 h-full flex flex-col gap-4">
      {content ? (
        <>
          <p className="text-xs text-white/60">{content.desc}</p>
          {content.visual}
          <div className="flex gap-2">
            <button onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0} className="btn-secondary text-xs px-3 py-1.5 disabled:opacity-30">â† Step</button>
            <button onClick={() => setStep(s => Math.min(4, s + 1))}
              disabled={step === 4} className="btn-primary text-xs px-3 py-1.5 disabled:opacity-30">Step â†’</button>
            <span className="text-xs text-white/30 self-center ml-2 accent-text">Step {step + 1} / 5</span>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full flex-col gap-3">
          <div className="text-6xl">{lab.icon}</div>
          <p className="text-white/50 text-sm text-center">{lab.objective}</p>
          <p className="text-xs text-white/30 accent-text">Interactive simulation for this domain coming soon</p>
        </div>
      )}
    </div>
  )
}

// â”€â”€ Lab Viewer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function LabViewer({ lab, onClose, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [reflection, setReflection]   = useState('')
  const [submitted, setSubmitted]     = useState(false)
  const [activePanel, setActivePanel] = useState('instructions')
  const isCoding = lab.type === 'coding' || lab.type === 'notebook'

  const submit = () => {
    if (!reflection.trim()) return
    setSubmitted(true)
    setTimeout(() => { onComplete(lab.id); onClose() }, 1500)
  }

  return (
    <div className="fixed inset-0 z-[200] flex flex-col animate-fade-in" style={{ background: '#0a0b0f' }}>
      {/* Header */}
      <div className="h-12 border-b border-[#1e2028] flex items-center justify-between px-4 flex-shrink-0" style={{ background: 'rgba(10,11,15,0.97)' }}>
        <div className="flex items-center gap-3">
          <span className="text-lg">{lab.icon}</span>
          <span className="text-white font-semibold text-sm">{lab.title}</span>
          <span className={`badge ${DIFF_BADGE[lab.difficulty]} text-[10px]`}>{lab.difficulty}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/35 flex items-center gap-1 accent-text"><Clock size={11} /> {lab.duration}</span>
          <button onClick={onClose} className="text-white/30 hover:text-[#a3e635] p-1.5 rounded-lg hover:bg-[#13151a] transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Instructions */}
        <div className="w-72 flex-shrink-0 border-r border-[#1e2028] flex flex-col overflow-y-auto" style={{ background: 'rgba(13,11,38,0.98)' }}>
          {/* Panel tabs */}
          <div className="flex border-b border-[#1e2028]">
            {['instructions', 'objective', 'reflect'].map(p => (
              <button key={p} onClick={() => setActivePanel(p)}
                className={`flex-1 py-2 text-xs font-medium capitalize transition-colors ${
                  activePanel === p
                    ? 'text-[#a3e635] border-b-2 border-[#a3e635]'
                    : 'text-white/35 hover:text-white'
                }`}>
                {p}
              </button>
            ))}
          </div>

          <div className="p-4 flex-1">
            {activePanel === 'instructions' && (
              <div className="space-y-2">
                <p className="text-xs text-white/40 mb-3 accent-text">Follow each step in order. Check them off as you go.</p>
                {lab.steps.map((step, i) => (
                  <button key={i} onClick={() => setCurrentStep(i)}
                    className={`w-full flex items-center gap-2.5 p-2.5 rounded-lg text-left transition-all ${
                      i === currentStep ? 'bg-[#a3e635]/10 border border-[#a3e635]/25' :
                      i < currentStep  ? 'opacity-50' : 'hover:bg-[#13151a]'
                    }`}>
                    {i < currentStep
                      ? <CheckCircle size={14} className="text-[#a3e635] flex-shrink-0" />
                      : <Circle size={14} className={`flex-shrink-0 ${i === currentStep ? 'text-[#a3e635]' : 'text-white/20'}`} />
                    }
                    <span className={`text-xs ${i === currentStep ? 'text-white font-medium' : 'text-white/45'}`}>
                      {i + 1}. {step}
                    </span>
                  </button>
                ))}
                <div className="flex gap-2 pt-3">
                  <button onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                    disabled={currentStep === 0} className="btn-secondary text-xs py-1.5 px-3 disabled:opacity-30">â† Prev</button>
                  <button onClick={() => setCurrentStep(s => Math.min(lab.steps.length - 1, s + 1))}
                    disabled={currentStep === lab.steps.length - 1} className="btn-primary text-xs py-1.5 px-3 disabled:opacity-30">Next â†’</button>
                </div>
              </div>
            )}

            {activePanel === 'objective' && (
              <div>
                <p className="text-xs text-white font-medium mb-2">Lab Objective</p>
                <p className="text-xs text-white/50 leading-relaxed">{lab.objective}</p>
                <div className="mt-4">
                  <p className="text-xs text-white/30 font-semibold mb-2 uppercase accent-text">Technologies</p>
                  <div className="flex flex-wrap gap-1.5">
                    {lab.technologies.map(t => (
                      <span key={t} className="badge badge-indigo text-[10px]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activePanel === 'reflect' && (
              <div>
                <p className="text-xs text-white font-medium mb-2">Reflection Questions</p>
                <p className="text-xs text-white/40 mb-3 accent-text">Answer to complete the lab and earn your badge.</p>
                <div className="space-y-3 mb-3">
                  <p className="text-xs text-white/60">1. What was the most challenging step and why?</p>
                  <p className="text-xs text-white/60">2. How would you apply this in a real project?</p>
                </div>
                <textarea value={reflection} onChange={e => setReflection(e.target.value)}
                  placeholder="Write your reflections here..." rows={5}
                  className="input-field text-xs resize-none" />
                {submitted ? (
                  <div className="mt-3 flex items-center gap-2 text-[#a3e635] text-xs">
                    <CheckCircle size={14} /> Lab complete! Awarding badge...
                  </div>
                ) : (
                  <button onClick={submit} disabled={!reflection.trim()}
                    className="btn-primary text-xs w-full mt-2 disabled:opacity-40">
                    Submit & Complete Lab
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Lab environment */}
        <div className="flex-1 overflow-hidden">
          {isCoding ? <CodeEditor lab={lab} onComplete={onComplete} /> : <SimFrame lab={lab} />}
        </div>
      </div>
    </div>
  )
}

// â”€â”€ Main â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function VirtualLabs() {
  const { showNotification }              = useApp()
  const [activeLab, setActiveLab]         = useState(null)
  const [completedLabs, setCompletedLabs] = useState(new Set(['l5']))
  const [domainFilter, setDomainFilter]   = useState('all')

  const domains  = [{ id: 'all', label: 'All Labs', icon: 'ðŸ”¬' }, ...MAJORS.filter(m => VIRTUAL_LABS.some(l => l.domain === m.id))]
  const filtered = VIRTUAL_LABS.filter(l => domainFilter === 'all' || l.domain === domainFilter)

  const complete = (labId) => {
    setCompletedLabs(s => new Set([...s, labId]))
    showNotification('Lab complete! Badge earned ðŸ†')
  }

  const groupedByDomain = filtered.reduce((acc, lab) => {
    if (!acc[lab.domain]) acc[lab.domain] = []
    acc[lab.domain].push(lab)
    return acc
  }, {})

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <span className="text-[#a3e635] text-sm accent-text block mb-2">
          <FlaskConical size={12} className="inline mr-1" />Virtual Labs
        </span>
        <h1 className="text-2xl text-white mb-2" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Hands-On Learning Labs</h1>
        <p className="text-white/50 text-sm">
          Practical simulations and coding environments for {VIRTUAL_LABS.length} labs across 7 domains. No setup required.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="card text-center">
          <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{VIRTUAL_LABS.length}</p>
          <p className="text-xs text-white/40 accent-text">Available Labs</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-[#a3e635]" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{completedLabs.size}</p>
          <p className="text-xs text-white/40 accent-text">Completed</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-white/60" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{VIRTUAL_LABS.length - completedLabs.size}</p>
          <p className="text-xs text-white/40 accent-text">Remaining</p>
        </div>
      </div>

      {/* Domain filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {domains.map(d => (
          <button key={d.id} onClick={() => setDomainFilter(d.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium flex-shrink-0 transition-all border ${
              domainFilter === d.id
                ? 'text-white border-[#a3e635]/35'
                : 'bg-[#13151a] text-white/50 hover:text-white border-transparent'
            }`}
            style={domainFilter === d.id ? { background: 'linear-gradient(135deg, #a3e635, #22d3ee)' } : {}}>
            <span>{d.icon}</span> {d.label || d.id}
          </button>
        ))}
      </div>

      {/* Labs grid */}
      {domainFilter === 'all' ? (
        Object.entries(groupedByDomain).map(([domain, labs]) => {
          const major = MAJORS.find(m => m.id === domain)
          return (
            <div key={domain} className="mb-8">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                <span className="text-xl">{major?.icon}</span>
                {major?.label || domain}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {labs.map(lab => (
                  <LabCard key={lab.id} lab={lab} onLaunch={setActiveLab} completed={completedLabs.has(lab.id)} />
                ))}
              </div>
            </div>
          )
        })
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(lab => (
            <LabCard key={lab.id} lab={lab} onLaunch={setActiveLab} completed={completedLabs.has(lab.id)} />
          ))}
        </div>
      )}

      {activeLab && (
        <LabViewer lab={activeLab} onClose={() => setActiveLab(null)} onComplete={complete} />
      )}
    </div>
  )
}


