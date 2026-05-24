// ─────────────────────────────────────────────────────────────────────────────
// Vercel serverless function — generates personalized recommendation reasons.
//
// The OpenRouter key lives ONLY here, server-side, as process.env.OPENROUTER_API_KEY
// (no VITE_ prefix → never inlined into the public client bundle). The browser POSTs
// a non-secret { profile, items } payload and receives { reasons: { id: text } }.
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_MODEL = 'anthropic/claude-3.5-haiku'

const SYSTEM_PROMPT =
  'You are the personalization engine for EduStack, a free learning platform for ' +
  'students in Bangladesh. For each recommended resource, write ONE concise reason ' +
  'it fits THIS specific student. Rules: address the student as "you"; max 14 words; ' +
  'ground it in their field, level, goal, or note; no preamble, no quotes, no markdown. ' +
  'Output ONLY a JSON object mapping each resource id to its reason string.'

function parseReasons(content, items) {
  let obj = null
  try {
    obj = JSON.parse(content)
  } catch {
    const match = content.match(/\{[\s\S]*\}/) // tolerate models that wrap JSON in prose
    if (match) { try { obj = JSON.parse(match[0]) } catch { /* ignore */ } }
  }
  if (!obj || typeof obj !== 'object') return {}

  const out = {}
  for (const it of items) {
    if (obj[it.id]) out[it.id] = String(obj[it.id]).trim().replace(/^["']|["']$/g, '')
  }
  return out
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const key = process.env.OPENROUTER_API_KEY
  if (!key) {
    res.status(500).json({ error: 'Server is missing OPENROUTER_API_KEY' })
    return
  }
  const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})
    const { profile, items } = body
    if (!profile || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'Missing profile or items' })
      return
    }

    const list = items
      .map(it => `- ${it.id} [${it.type || 'resource'}] ${it.title || ''}: ${it.description || ''}`)
      .join('\n')

    const userMsg =
      `Student profile:\n${profile}\n\n` +
      `Recommended resources:\n${list}\n\n` +
      `Return ONLY a JSON object: { "<id>": "<reason>" } for every id above.`

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 12000)

    let upstream
    try {
      upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
          'X-Title': 'EduStack',
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
    } finally {
      clearTimeout(timer)
    }

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => '')
      res.status(502).json({ error: `OpenRouter ${upstream.status}`, detail: detail.slice(0, 200) })
      return
    }

    const data = await upstream.json()
    const content = data?.choices?.[0]?.message?.content || ''
    res.status(200).json({ reasons: parseReasons(content, items) })
  } catch (err) {
    res.status(500).json({ error: err?.message || 'Unknown error' })
  }
}
