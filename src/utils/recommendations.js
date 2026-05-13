import { COURSES, CERTIFICATIONS, AI_TOOLS, QUIZZES } from '../data/mockData.js'

// Weight constants
const W = { major: 3, level: 2, goal: 1.5, behavior: 2.5 }

function scoreItem(item, user) {
  let score = 0
  const { major, knowledgeLevel, learningGoals = [], completedIds = [], quizScores = {} } = user

  // Major match
  if (item.majorTags?.includes(major.primary)) score += W.major
  if (major.secondary?.some(s => item.majorTags?.includes(s))) score += W.major * 0.5

  // Level match (courses only)
  if (item.level) {
    const levels = ['Beginner', 'Intermediate', 'Advanced']
    const userIdx = levels.indexOf(knowledgeLevel)
    const itemIdx = levels.indexOf(item.level)
    const diff = Math.abs(userIdx - itemIdx)
    if (diff === 0) score += W.level
    else if (diff === 1) score += W.level * 0.5
    // stretch recommendation: one level above
    if (itemIdx === userIdx + 1) score += 0.5
  }

  // Goal alignment
  if (learningGoals.includes('job') && (item.recognitionScore >= 4 || item.category === 'Programming')) score += W.goal
  if (learningGoals.includes('cert') && item.recognitionScore) score += W.goal
  if (learningGoals.includes('supplement') && item.majorTags?.includes(major.primary)) score += W.goal * 0.5

  // Behavioral: already completed → penalize
  if (completedIds.includes(item.id)) score -= 10

  // Quiz-driven: if low score in topic → boost foundational content
  if (quizScores[item.topic] !== undefined && quizScores[item.topic] < 60) {
    if (item.level === 'Beginner') score += W.behavior
  }

  return score
}

export function getRecommendations(user, options = {}) {
  const { limit = 4, type = 'all' } = options

  if (!user?.major?.primary) return { courses: [], certifications: [], tools: [] }

  const scored = (items) =>
    items
      .map(item => ({ ...item, _score: scoreItem(item, user) }))
      .filter(item => item._score > 0)
      .sort((a, b) => b._score - a._score)

  const courses = scored(COURSES)
  const certifications = scored(CERTIFICATIONS)
  const tools = scored(AI_TOOLS)

  if (type === 'courses') return courses.slice(0, limit)
  if (type === 'certifications') return certifications.slice(0, limit)
  if (type === 'tools') return tools.slice(0, limit)

  // Mixed feed: 2 courses, 1 cert, 1 tool
  const mixed = [
    ...courses.slice(0, 2).map(c => ({ ...c, _type: 'course', _reason: `Because you study ${user.major.primary === 'cs' ? 'Computer Science' : user.major.primary}` })),
    ...certifications.slice(0, 1).map(c => ({ ...c, _type: 'certification', _reason: 'Highly recognized in your field' })),
    ...tools.slice(0, 1).map(t => ({ ...t, _type: 'tool', _reason: 'Popular with students like you' })),
  ]

  return mixed.slice(0, limit)
}

export function getQuizRecommendations(user) {
  return QUIZZES.filter(q => q.major === user?.major?.primary).slice(0, 3)
}

export function computeProgress(completedIds = [], major) {
  if (!major) return 0
  const majorCourses = COURSES.filter(c => c.majorTags.includes(major))
  if (majorCourses.length === 0) return 0
  const completed = completedIds.filter(id => majorCourses.some(c => c.id === id))
  return Math.round((completed.length / Math.min(majorCourses.length, 10)) * 100)
}

export function getMilestone(progress) {
  if (progress < 25) return { label: 'Explorer', next: 'Apprentice', pct: 25 }
  if (progress < 50) return { label: 'Apprentice', next: 'Practitioner', pct: 50 }
  if (progress < 75) return { label: 'Practitioner', next: 'Expert', pct: 75 }
  return { label: 'Expert', next: null, pct: 100 }
}
