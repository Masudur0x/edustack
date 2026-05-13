import { useState, useMemo } from 'react'
import {
  MessageSquare, ThumbsUp, CheckCircle2, Plus, Search,
  Clock, X, Send, Users,
} from 'lucide-react'
import { FORUM_POSTS, MAJORS } from '../../data/mockData.js'
import { useApp } from '../../context/AppContext.jsx'

const SUB_BOARDS = ['All', 'General Discussion', 'Study Help', 'Project Collaboration', 'Career Advice', 'Resource Sharing']

const TYPE_BADGE = {
  Question:          'bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/30',
  Discussion:        'bg-violet-900/40 text-violet-300 border border-violet-700/30',
  'Resource Share':  'bg-sky-900/40 text-sky-300 border border-sky-700/30',
  'Project Showcase':'bg-emerald-900/40 text-emerald-300 border border-emerald-700/30',
}

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso)) / 1000
  if (diff < 60)    return 'just now'
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function PostCard({ post, onClick }) {
  const [upvoted, setUpvoted] = useState(false)
  const [voteCount, setVoteCount] = useState(post.upvotes)

  const toggleVote = (e) => {
    e.stopPropagation()
    setUpvoted(u => !u)
    setVoteCount(c => upvoted ? c - 1 : c + 1)
  }

  return (
    <div onClick={onClick} className="card-hover cursor-pointer">
      <div className="flex items-start gap-3">
        {/* Vote */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <button onClick={toggleVote}
            className={`p-1.5 rounded-lg transition-colors ${upvoted ? 'text-[#a3e635] bg-[#a3e635]/10' : 'text-white/30 hover:text-[#a3e635] hover:bg-[#a3e635]/10'}`}>
            <ThumbsUp size={14} />
          </button>
          <span className="text-xs font-bold text-white/40">{voteCount}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className={`badge ${TYPE_BADGE[post.type] || 'badge-indigo'} text-[10px]`}>{post.type}</span>
            {post.resolved && (
              <span className="badge bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/30 text-[10px]">
                <CheckCircle2 size={9} className="inline mr-0.5" /> Resolved
              </span>
            )}
            <span className="badge badge-indigo text-[10px]">{post.subBoard}</span>
          </div>

          <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">{post.title}</h3>
          <p className="text-xs text-white/45 line-clamp-2 mb-2">{post.content}</p>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-[#001F14]"
                style={{ background: 'linear-gradient(135deg, #a3e635, #008156)' }}>
                {post.author.name.charAt(0)}
              </div>
              <span className="text-xs text-white/50">{post.author.name}</span>
              <span className="text-[10px] text-[#a3e635]">Â·{post.author.reputation}pts</span>
            </div>
            <span className="text-xs text-white/30 flex items-center gap-1">
              <Clock size={10} /> {timeAgo(post.timestamp)}
            </span>
            <span className="text-xs text-white/30 flex items-center gap-1">
              <MessageSquare size={10} /> {post.replies}
            </span>
          </div>

          {post.tags?.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {post.tags.map(t => (
                <span key={t} className="text-[10px] text-white/35 bg-[#13151a] border border-[#a3e635]/15 px-2 py-0.5 rounded-full">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PostModal({ post, onClose }) {
  const { user } = useApp()
  const [reply, setReply] = useState('')
  const [replies, setReplies] = useState([
    { id: 1, author: 'Sam R.', text: 'Great question! I recommend starting with the official React docs, then building a to-do app.', upvotes: 12, timestamp: '2026-05-10T15:00:00Z' },
    { id: 2, author: 'Priya K.', text: "freeCodeCamp's React curriculum is also excellent and completely free.", upvotes: 8, timestamp: '2026-05-10T16:30:00Z' },
  ])

  const submitReply = () => {
    if (!reply.trim()) return
    setReplies(r => [...r, {
      id: Date.now(), author: user?.name || 'You', text: reply.trim(),
      upvotes: 0, timestamp: new Date().toISOString(),
    }])
    setReply('')
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-sm flex items-start justify-center p-4 pt-10 overflow-y-auto"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="border border-[#1e2028] rounded-2xl w-full max-w-2xl animate-slide-up" style={{ background: 'rgba(10,11,15,0.97)', backdropFilter: 'blur(24px)' }}>
        <div className="p-6 border-b border-[#a3e635]/10 flex items-start justify-between gap-4">
          <div>
            <div className="flex gap-2 flex-wrap mb-2">
              <span className={`badge ${TYPE_BADGE[post.type] || 'badge-indigo'} text-[10px]`}>{post.type}</span>
              {post.resolved && (
                <span className="badge bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/30 text-[10px]">
                  <CheckCircle2 size={9} className="inline mr-0.5" /> Resolved
                </span>
              )}
            </div>
            <h2 className="text-white font-semibold text-lg" style={{ fontFamily: "'Archivo Black', sans-serif" }}>{post.title}</h2>
            <p className="text-xs text-white/40 mt-1 accent-text">{post.author.name} Â· {timeAgo(post.timestamp)}</p>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-[#a3e635] p-1 rounded-lg hover:bg-[#1a1c24] flex-shrink-0 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-white/70 text-sm leading-relaxed mb-4">{post.content}</p>
          {post.tags?.length > 0 && (
            <div className="flex gap-1 flex-wrap mb-4">
              {post.tags.map(t => (
                <span key={t} className="text-[10px] text-white/35 bg-[#13151a] border border-[#a3e635]/15 px-2 py-0.5 rounded-full">#{t}</span>
              ))}
            </div>
          )}
          <div className="space-y-3 mb-4">
            <p className="text-xs text-white/30 font-semibold uppercase tracking-wider accent-text">{replies.length} replies</p>
            {replies.map(r => (
              <div key={r.id} className="flex gap-3 p-3 bg-[#13151a] border border-[#1e2028] rounded-xl">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-[#001F14] flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #a3e635, #008156)' }}>
                  {r.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-medium text-white">{r.author} <span className="text-white/35 font-normal">Â· {timeAgo(r.timestamp)}</span></p>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">{r.text}</p>
                </div>
              </div>
            ))}
          </div>

          {user && (
            <div className="flex gap-2">
              <input value={reply} onChange={e => setReply(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submitReply()}
                placeholder="Write a reply..." className="input-field flex-1 text-sm" />
              <button onClick={submitReply} className="btn-primary px-3">
                <Send size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function NewPostModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ title: '', content: '', type: 'Question', subBoard: 'Study Help' })
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <div className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="border border-[#1e2028] rounded-2xl w-full max-w-lg animate-slide-up p-6" style={{ background: 'rgba(10,11,15,0.97)', backdropFilter: 'blur(24px)' }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-semibold" style={{ fontFamily: "'Archivo Black', sans-serif" }}>New Post</h2>
          <button onClick={onClose} className="text-white/30 hover:text-[#a3e635] transition-colors"><X size={18} /></button>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <select value={form.type} onChange={set('type')} className="input-field text-sm">
              <option>Question</option>
              <option>Discussion</option>
              <option>Resource Share</option>
              <option>Project Showcase</option>
            </select>
            <select value={form.subBoard} onChange={set('subBoard')} className="input-field text-sm">
              {SUB_BOARDS.slice(1).map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <input value={form.title} onChange={set('title')} placeholder="Post title..." className="input-field" />
          <textarea value={form.content} onChange={set('content')}
            placeholder="Share your question, idea, or resource..." rows={5}
            className="input-field resize-none text-sm" />
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="btn-secondary text-sm">Cancel</button>
            <button onClick={() => { onSubmit(form); onClose() }}
              disabled={!form.title.trim() || !form.content.trim()}
              className="btn-primary text-sm disabled:opacity-40">
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Forum() {
  const { user, showNotification } = useApp()
  const [board, setBoard]       = useState('all')
  const [subBoard, setSubBoard] = useState('All')
  const [search, setSearch]     = useState('')
  const [selected, setSelected] = useState(null)
  const [newPost, setNewPost]   = useState(false)
  const [posts, setPosts]       = useState(FORUM_POSTS)

  const boards = [{ id: 'all', label: 'All Boards', icon: 'ðŸŒ' }, ...MAJORS.slice(0, 8)]

  const filtered = useMemo(() => posts.filter(p =>
    (board === 'all' || p.majorBoard === board) &&
    (subBoard === 'All' || p.subBoard === subBoard) &&
    (!search || p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase()))
  ), [posts, board, subBoard, search])

  const addPost = (form) => {
    const newP = {
      id: `p_${Date.now()}`,
      ...form,
      majorBoard: board === 'all' ? 'cs' : board,
      author: { name: user?.name || 'You', reputation: 0, major: 'Computer Science' },
      upvotes: 0, replies: 0,
      timestamp: new Date().toISOString(),
      resolved: false, tags: [],
    }
    setPosts(p => [newP, ...p])
    showNotification('Post published!')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[#a3e635] text-sm accent-text block mb-2">
            <Users size={12} className="inline mr-1" />Community
          </span>
          <h1 className="text-2xl text-white mb-1" style={{ fontFamily: "'Archivo Black', sans-serif" }}>Community Forum</h1>
          <p className="text-white/50 text-sm">Ask questions, share resources, collaborate</p>
        </div>
        <button onClick={() => setNewPost(true)} className="btn-primary gap-2">
          <Plus size={16} /> New Post
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar: boards */}
        <div className="lg:w-56 flex-shrink-0">
          <p className="text-xs text-white/30 font-semibold uppercase tracking-wider mb-2 accent-text">Boards</p>
          <div className="space-y-0.5">
            {boards.map(b => (
              <button key={b.id} onClick={() => setBoard(b.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                  board === b.id
                    ? 'bg-[#a3e635]/10 text-[#a3e635] border border-[#a3e635]/25 font-medium'
                    : 'text-white/50 hover:text-white hover:bg-[#13151a]'
                }`}>
                <span className="text-sm">{b.icon}</span>
                <span className="truncate">{b.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search posts..." className="input-field pl-9 text-sm" />
            </div>
          </div>

          {/* Sub-board tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {SUB_BOARDS.map(s => (
              <button key={s} onClick={() => setSubBoard(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex-shrink-0 transition-all ${
                  subBoard === s
                    ? 'text-white border border-[#a3e635]/35'
                    : 'bg-[#13151a] text-white/50 hover:text-white border border-transparent'
                }`}
                style={subBoard === s ? { background: 'linear-gradient(135deg, #a3e635, #22d3ee)' } : {}}>
                {s}
              </button>
            ))}
          </div>

          <p className="text-white/30 text-xs mb-3 accent-text">{filtered.length} posts</p>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <MessageSquare size={40} className="text-white/15 mx-auto mb-3" />
              <p className="text-white/50">No posts found</p>
              <button onClick={() => setNewPost(true)} className="btn-primary text-sm mt-3 gap-1 mx-auto inline-flex items-center">
                <Plus size={14} /> Start a discussion
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(post => (
                <PostCard key={post.id} post={post} onClick={() => setSelected(post)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {selected && <PostModal post={selected} onClose={() => setSelected(null)} />}
      {newPost && <NewPostModal onClose={() => setNewPost(false)} onSubmit={addPost} />}
    </div>
  )
}


