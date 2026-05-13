import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react'
import { usePreferences } from '../../context/PreferencesContext.jsx'

const LINK_GROUPS = [
  {
    titleKey: 'footer.group.platform',
    links: [
      { labelKey: 'footer.link.resources', to: '/resources' },
      { labelKey: 'footer.link.forum',     to: '/forum' },
      { labelKey: 'footer.link.quizzes',   to: '/quiz' },
      { labelKey: 'footer.link.labs',      to: '/labs' },
    ],
  },
  {
    titleKey: 'footer.group.company',
    links: [
      { labelKey: 'footer.link.about',   to: '#' },
      { labelKey: 'footer.link.blog',    to: '#' },
      { labelKey: 'footer.link.careers', to: '#' },
      { labelKey: 'footer.link.press',   to: '#' },
    ],
  },
  {
    titleKey: 'footer.group.legal',
    links: [
      { labelKey: 'footer.link.privacy', to: '#' },
      { labelKey: 'footer.link.terms',   to: '#' },
      { labelKey: 'footer.link.cookie',  to: '#' },
      { labelKey: 'footer.link.access',  to: '#' },
    ],
  },
]

const SOCIALS = [
  { Icon: Twitter,  label: 'Twitter',  href: '#' },
  { Icon: Github,   label: 'GitHub',   href: '#' },
  { Icon: Linkedin, label: 'LinkedIn', href: '#' },
  { Icon: Mail,     label: 'Email',    href: '#' },
]

export default function Footer() {
  const { t } = usePreferences()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setEmail('') }, 3000)
  }

  return (
    <footer className="border-t border-[#1e2028] mt-auto" style={{ background: 'rgba(8,9,13,0.95)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 py-14 sm:py-16">

        {/* Top row: editorial mono caption */}
        <div className="flex items-center gap-3 mb-10 sm:mb-12">
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#a3e635] font-mono">
            {t('footer.made')}
          </span>
          <span className="h-px flex-1 bg-[#1e2028]" />
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30 font-mono">
            {t('footer.version')}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 mb-12">

          {/* Brand + newsletter */}
          <div className="col-span-2 md:col-span-5">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <img src="/logo-EduStack.jpg" alt="EduStack" className="w-9 h-9 rounded-lg object-cover" />
              <span className="text-xl gradient-text" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                EduStack
              </span>
            </Link>

            <p className="text-white/55 text-sm leading-relaxed max-w-sm mb-6">
              {t('footer.desc')}
            </p>

            {/* Newsletter — minimal inline form */}
            <form onSubmit={handleSubscribe} className="mb-7 max-w-sm">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/45 mb-2.5 font-mono">
                {t('footer.newsletter')}
              </p>
              <div className="flex gap-0 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e2028' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.placeholder')}
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none"
                />
                <button type="submit"
                  className="px-4 flex items-center gap-1.5 text-xs font-semibold transition-colors text-[#0a0b0f]"
                  style={{ background: submitted ? '#22d3ee' : '#a3e635' }}>
                  {submitted ? t('footer.thanks') : (<>{t('footer.subscribe')} <ArrowRight size={13} /></>)}
                </button>
              </div>
            </form>

            {/* Social icons — restrained */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-[#a3e635] hover:bg-[#13151a] transition-colors"
                  style={{ border: '1px solid #1e2028' }}>
                  <Icon size={14} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {LINK_GROUPS.map((group) => (
            <div key={group.titleKey} className="md:col-span-2 lg:col-span-2 last:md:col-span-3">
              <h4 className="text-[10px] tracking-[0.22em] uppercase text-white/45 font-mono mb-5">
                {t(group.titleKey)}
              </h4>
              <ul className="space-y-3">
                {group.links.map(link => (
                  <li key={link.labelKey}>
                    <Link to={link.to}
                      className="text-sm text-white/60 hover:text-white transition-colors">
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1e2028] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-white/35 text-xs font-mono tracking-wide">
              {t('footer.copyright')}
            </p>
            <span className="text-white/15">·</span>
            <p className="text-white/35 text-xs">
              {t('footer.eventPrefix')} <span className="text-white/60">{t('footer.eventName')}</span>
            </p>
          </div>
          <p className="text-white/25 text-xs"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  )
}
