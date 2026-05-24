// ─────────────────────────────────────────────────────────────────────────────
// AI-generated recommendation reasons.
//
// Production / preview (Vercel): the browser POSTs a non-secret { profile, items }
// payload to /api/reasons; the key lives only on the server. The key is NEVER in
// the client bundle.
//
// Local dev convenience: if VITE_OPENROUTER_API_KEY is set in .env.local, `npm run
// dev` calls OpenRouter directly so you can record locally without `vercel dev`.
// This branch is dead-stripped from production builds (import.meta.env.DEV === false),
// and .env.local is gitignored, so that key never ships.
//
// Either way: results are cached per profile (one call per user), and any failure
// falls back silently to the rule-based reason — the demo never breaks on camera.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useMemo, useState } from 'react'
import { MAJORS, LEARNING_GOALS } from '../data/mockData.js'

const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions'
const DEFAULT_MODEL = 'anthropic/claude-3.5-haiku'
const CACHE_PREFIX = 'edustack.aiReasons:'
const TIMEOUT_MS = 12000

const SYSTEM_PROMPT =
  'You are the personalization engine for EduStack, a free learning platform for ' +
  'students in Bangladesh. For each recommended resource, write ONE concise reason ' +
  'it fits THIS specific student. Rules: address the student as "you"; max 14 words; ' +
  'ground it in their field, level, goal, or note; no preamble, no quotes, no markdown. ' +
  'Output ONLY a JSON object mapping each resource id to its reason string.'

// ── Profile → readable summary the model can reason over (non-secret) ─────────
function majorLabel(user) {
  return MAJORS.find(m => m.id === user?.major?.primary)?.label || user?.major?.primary || 'a student'
}

function goalLabels(user) {
  return (user?.learningGoals || []).map(g => LEARNING_GOALS.find(l => l.id === g)?.label || g)
}

export function buildProfile(user) {
  const parts = [`Field of study: ${majorLabel(user)}`]
  if (user?.knowledgeLevel) parts.push(`Current level: ${user.knowledgeLevel}`)

  const goals = goalLabels(user)
  if (goals.length) parts.push(`Goals: ${goals.join(', ')}`)
  if (user?.hoursPerWeek) parts.push(`Study time: ~${user.hoursPerWeek} hrs/week`)

  const interest = user?.interest === '__custom__' ? user?.interest_custom : user?.interest
  if (interest) parts.push(`Wants to learn: ${interest}`)
  if (user?.notes) parts.push(`Note from student: "${String(user.notes).slice(0, 160)}"`)

  return parts.join('\n')
}

function minimalItems(items) {
  return items.map(it => ({
    id: it.id,
    type: it._type,
    title: it.title || it.name,
    description: it.description,
  }))
}

function parseReasons(content, items) {
  let obj = null
  try {
    obj = JSON.parse(content)
  } catch {
    const match = content.match(/\{[\s\S]*\}/)
    if (match) { try { obj = JSON.parse(match[0]) } catch { /* ignore */ } }
  }
  if (!obj || typeof obj !== 'object') throw new Error('Unparseable AI response')

  const out = {}
  for (const it of items) {
    if (obj[it.id]) out[it.id] = String(obj[it.id]).trim().replace(/^["']|["']$/g, '')
  }
  if (Object.keys(out).length === 0) throw new Error('No reasons matched the recommended items')
  return out
}

// ── Production / preview: secure server route (key stays server-side) ─────────
async function callServer(profile, items) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch('/api/reasons', {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile, items }),
    })
    if (!res.ok) throw new Error(`/api/reasons ${res.status}`)
    const data = await res.json()
    const reasons = data?.reasons || {}
    if (Object.keys(reasons).length === 0) throw new Error('No reasons returned')
    return reasons
  } finally {
    clearTimeout(timer)
  }
}

// ── Local dev only: direct OpenRouter call (key from .env.local, never shipped) ─
async function callDirect(profile, items) {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY
  const model = import.meta.env.VITE_OPENROUTER_MODEL || DEFAULT_MODEL
  const list = items
    .map(it => `- ${it.id} [${it.type || 'resource'}] ${it.title}: ${it.description || ''}`)
    .join('\n')
  const userMsg =
    `Student profile:\n${profile}\n\n` +
    `Recommended resources:\n${list}\n\n` +
    `Return ONLY a JSON object: { "<id>": "<reason>" } for every id above.`

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(OPENROUTER_ENDPOINT, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        'X-Title': 'EduStack',
        ...(typeof window !== 'undefined' ? { 'HTTP-Referer': window.location.origin } : {}),
      },
      body: JSON.stringify({
        model,
        temperature: 0.5,
        max_tokens: 400,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMsg },
        ],
      }),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      throw new Error(`OpenRouter ${res.status}: ${detail.slice(0, 120)}`)
    }
    const data = await res.json()
    return parseReasons(data?.choices?.[0]?.message?.content || '', items)
  } finally {
    clearTimeout(timer)
  }
}

export async function generateReasons(user, items) {
  const profile = buildProfile(user)
  const compact = minimalItems(items)

  if (import.meta.env.DEV && import.meta.env.VITE_OPENROUTER_API_KEY) {
    return callDirect(profile, compact) // local recording without `vercel dev`
  }
  return callServer(profile, compact)   // production: key never leaves the server
}

// ── Per-profile cache so repeat dashboard visits cost nothing ─────────────────
function signature(user, items) {
  return [
    user?.major?.primary,
    user?.knowledgeLevel,
    (user?.learningGoals || []).join(','),
    user?.interest || user?.interest_custom || '',
    String(user?.notes || '').slice(0, 40),
    items.map(i => i.id).join(','),
  ].join('|')
}

function readCache(sig) {
  try { const raw = localStorage.getItem(CACHE_PREFIX + sig); return raw ? JSON.parse(raw) : null }
  catch { return null }
}

function writeCache(sig, map) {
  try { localStorage.setItem(CACHE_PREFIX + sig, JSON.stringify(map)) } catch { /* ignore */ }
}

// ── Hook the dashboard consumes ───────────────────────────────────────────────
export function useAiReasons(user, items) {
  const [reasons, setReasons] = useState({})
  const [loading, setLoading] = useState(false)

  // Recommendations get a fresh array reference every render; key the effect on
  // the stable id string + profile fields, not the array identity.
  const ids = items.map(i => i.id).join(',')
  const sig = useMemo(() => signature(user, items), [user, ids]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let cancelled = false

    if (!user?.major?.primary || items.length === 0) {
      setReasons({}); setLoading(false); return
    }

    const cached = readCache(sig)
    if (cached) { setReasons(cached); setLoading(false); return }

    setLoading(true)
    generateReasons(user, items)
      .then(map => { if (!cancelled) { setReasons(map); writeCache(sig, map) } })
      .catch(err => {
        if (!cancelled) {
          console.warn('[EduStack] AI reasons unavailable, using fallback:', err.message)
          setReasons({})
        }
      })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [sig]) // eslint-disable-line react-hooks/exhaustive-deps

  return { reasons, loading }
}
