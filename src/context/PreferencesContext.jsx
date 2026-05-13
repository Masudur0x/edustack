import { createContext, useContext, useEffect, useState, useCallback } from 'react'

/* ──────────────────────────────────────────────────────────────────────────
   Translations — English + Bangla
   Keep top-level keys stable. Add new keys here as needed.
   ──────────────────────────────────────────────────────────────────────── */

const TRANSLATIONS = {
  en: {
    // Navbar
    'nav.login':         'Log In',
    'nav.signup':        'Get Started Free',
    'nav.dashboard':     'Dashboard',
    'nav.signOut':       'Sign Out',
    'nav.signedInAs':    'Signed in as',

    // Hero
    'hero.badge':        'Built in Bangladesh',
    'hero.subhead':      'Free courses, certifications and labs — curated by AI for your major and Bangladesh’s job market.',
    'hero.ctaPrimary':   'Start for free',
    'hero.ctaSecondary': 'Watch the 60-second pitch',
    'hero.footer.early': 'Early access',
    'hero.footer.free':  'Always free for students',
    'hero.footer.event': 'Infinity AI BuildFest 2026',

    // Rotating taglines (line1, line2 before, accent, line2 after)
    'tag.1.line1':  'Your AI study partner.',
    'tag.1.before': 'Built for',
    'tag.1.accent': 'Bangladesh',
    'tag.1.after':  '.',
    'tag.2.line1':  'Skip the coaching.',
    'tag.2.before': 'Keep the',
    'tag.2.accent': 'learning',
    'tag.2.after':  '.',
    'tag.3.line1':  'Your major. Your goal.',
    'tag.3.before': 'Guided by',
    'tag.3.accent': 'AI',
    'tag.3.after':  '.',
    'tag.4.line1':  'A path that fits you.',
    'tag.4.before': '',
    'tag.4.accent': 'Free',
    'tag.4.after':  ', always.',

    // Theme + language toggles
    'pref.theme.toLight':    'Switch to light mode',
    'pref.theme.toDark':     'Switch to dark mode',
    'pref.language.label':   'Language',

    // Final CTA
    'cta.caption':  'Ready when you are',
    'cta.line1':    'Stop hunting. Start',
    'cta.accent':   'today',
    'cta.body':     'Two minutes to your first path. Then it adapts every week to your major, your gaps, and the job you want next.',
    'cta.button':   'Create free account',
    'cta.trust.free':  'Free, always',
    'cta.trust.noCard':'No card required',
    'cta.trust.time':  '60 sec to set up',

    // PROBLEM / STOP HUNTING section
    'p.caption':     'What we built',
    'p.headline.1':  'Stop hunting.',
    'p.headline.2':  'Start learning.',
    'p.subhead':     'You should not need 12 tabs open to study. EduStack pulls the best free courses, certifications and labs from across the web — and orders them for your major, your level, and the gaps your quizzes reveal.',
    'p.feed.label':  'Your feed · Tasnim · CSE Year 2',
    'p.feed.live':   'Live',
    'p.feed.footer.bold': 'One feed.',
    'p.feed.footer.body': ' MIT, 10MS, Coursera, freeCodeCamp, Khan, edX, YouTube — pulled together and ordered for exactly where you are.',
    'p.feed.item.1.title': 'Linear Algebra (Lec 5)',
    'p.feed.item.1.tag':   'Course',
    'p.feed.item.2.title': 'Cell Biology — Class 11',
    'p.feed.item.2.tag':   'Video',
    'p.feed.item.3.title': 'Google Data Analytics',
    'p.feed.item.3.tag':   'Cert',
    'p.feed.item.4.title': 'JS DOM Manipulation',
    'p.feed.item.4.tag':   'Lab',
    'p.side.1.label': 'Calibrated',
    'p.side.1.title': 'To your major, not theirs',
    'p.side.1.body':  'A BUET CSE second-year, a DU economics fresher, and an AIUB BBA student do not need the same feed. EduStack reads your profile and curates accordingly.',
    'p.side.2.label': 'Adaptive',
    'p.side.2.title': 'Shifts as you learn',
    'p.side.2.body':  'Weekly quizzes find your weak topics. The next time you open the app, foundational content for those topics is already at the top of your feed.',

    // VIDEO section
    'v.caption':     'Reel · 0:60',
    'v.headline.1':  'The whole idea,',
    'v.headline.2':  'in sixty seconds.',
    'v.body':        'A quick walkthrough of the curated feed, the adaptive quizzes, and the dashboard students actually use. No founder monologue, no buzzwords.',
    'v.chapter.1':   'Your major, your feed',
    'v.chapter.2':   'Quizzes that adapt',
    'v.chapter.3':   'Free certs that count',
    'v.chapter.4':   'Why it stays free',
    'v.card.brand':  'EduStack / 2026',
    'v.card.take':   'Take 01',
    'v.card.featured': 'Featured reel',
    'v.card.title':  'How EduStack works.',
    'v.card.duration':'60 seconds',
    'v.card.cta':    'Coming soon',
    'v.card.time':   '00:00 / 01:00',
    'v.card.aspect': 'Aspect 16:9',

    // WHO IT'S FOR
    'who.caption':    "Who it's for",
    'who.count':      '03 Voices',
    'who.headline.1': 'Built for the people',
    'who.headline.2': 'the system overlooks.',
    'who.subhead':    'Three Bangladeshi students. Three different gaps. One feed that adapts to all of them.',
    'who.personaTag': 'Persona',
    'who.p.1.quote':  'I will learn algorithms at uni. EduStack handles the parts they will not teach me.',
    'who.p.1.name':   'Tasnim, 21',
    'who.p.1.role':   'CSE Year 2',
    'who.p.1.aff':    'BUET · BRAC · NSU · DU · AIUB',
    'who.p.2.quote':  'Coaching costs thirty thousand a month. I have a phone and time.',
    'who.p.2.name':   'Rifat, 17',
    'who.p.2.role':   'HSC & admission prep',
    'who.p.2.aff':    'Outside the coaching circuit',
    'who.p.3.quote':  'Bank job by day, learning to code by night. I need a path, not a hundred tabs.',
    'who.p.3.name':   'Sumaiya, 25',
    'who.p.3.role':   'Switching into tech',
    'who.p.3.aff':    'No CS degree, no problem',
    'who.cta.body':   'See yourself in one of these?',
    'who.cta.bodyB':  'EduStack is free, always.',
    'who.cta.start':  'Start free',
    'who.cta.browse': 'Browse resources',

    // FEATURES
    'f.caption':     'What you get',
    'f.count':       '05 capabilities',
    'f.headline.1':  "A serious student's toolkit.",
    'f.headline.2':  'Curated, not piled up.',
    'f.subhead':     'Five things you actually need. No bloat, no paywalls on the parts that matter.',
    'f.hero.label':  'The brain',
    'f.hero.tag':    'Hero feature',
    'f.hero.title':  'An AI that knows your major.',
    'f.hero.body':   'Tell us your university, level, and the job you want next. Claude reads your profile and orders the right courses, certifications and labs from across the web — and refreshes the order every week as you progress.',
    'f.hero.milestone.label': 'Milestone progression',
    'f.hero.milestone.you':   'You are here · 33%',
    'f.milestone.1': 'Explorer',
    'f.milestone.2': 'Apprentice',
    'f.milestone.3': 'Practitioner',
    'f.milestone.4': 'Expert',
    'f.2.label': 'Credentials',
    'f.2.title': 'Certifications that count',
    'f.2.desc':  'Google, IBM, Meta, MIT, Stanford — auditable for free. Earn the badges recruiters in Bangladesh actually recognise.',
    'f.3.label': 'Quizzes',
    'f.3.title': 'Find your gaps weekly',
    'f.3.desc':  'Five-minute quizzes reveal weak topics. Foundational content for those topics moves to the top of your feed next time.',
    'f.4.label': 'Labs',
    'f.4.title': 'Hands-on, no equipment',
    'f.4.desc':  'Code, circuits, chemistry, biology — simulations your university budget cannot buy. Learn by doing, not watching.',
    'f.5.label': 'Progress',
    'f.5.title': 'See yourself level up',
    'f.5.desc':  'Live dashboard tracks every course, lab and quiz. Move from Explorer to Apprentice to Expert — visible, every week.',

    // HOW IT WORKS
    'h.caption':    'How it works',
    'h.steps':      '04 steps',
    'h.headline.1': 'Two minutes to a path.',
    'h.headline.2': 'Then it adapts to you.',
    'h.subhead':    'From sign-up to your first lesson before your tea finishes brewing.',
    'h.step.1.meta':  '30 sec',
    'h.step.1.title': 'Sign up free',
    'h.step.1.desc':  'Create an account. No card, no fees, no catch.',
    'h.step.2.meta':  '1 min',
    'h.step.2.title': 'Tell us your major',
    'h.step.2.desc':  'Your university and field — we calibrate the path to your actual curriculum.',
    'h.step.3.meta':  'Instant',
    'h.step.3.title': 'Get your AI path',
    'h.step.3.desc':  'Claude reads your profile and orders the right courses, certs, and labs.',
    'h.step.4.meta':  'Today',
    'h.step.4.title': 'Start learning',
    'h.step.4.desc':  'Track progress, take quizzes, earn certifications, and level up.',

    // COMMUNITY
    'c.caption':    'Community',
    'c.live':       'Live',
    'c.headline.1': 'Built by students.',
    'c.headline.2': 'Read by recruiters.',
    'c.subhead':    'Major-specific boards, study groups, and real notes from real students at universities across Bangladesh. Sorted by your major when you sign in.',
    'c.feed.label': 'Recent activity / All boards',
    'c.feed.online':'47 online',
    'c.post.1.user':'Tasnim R.', 'c.post.1.uni':'BUET', 'c.post.1.time':'12m',
    'c.post.1.tag':'Question',
    'c.post.1.text':'Anyone got notes for CSE 2105 Data Structures finals? Sharing my recursion notes — drop a reply.',
    'c.post.2.user':'Rifat H.', 'c.post.2.uni':'IUT', 'c.post.2.time':'1h',
    'c.post.2.tag':'Project',
    'c.post.2.text':'Built a small React dashboard during the Cohort 03 weekend hack. Open to feedback.',
    'c.post.3.user':'Sumaiya K.', 'c.post.3.uni':'NSU', 'c.post.3.time':'3h',
    'c.post.3.tag':'Study group',
    'c.post.3.text':'Starting a Google Data Analytics study cohort. Six spots left, reply to claim.',
    'c.post.4.user':'Ayaan M.', 'c.post.4.uni':'BRAC', 'c.post.4.time':'6h',
    'c.post.4.tag':'Resource',
    'c.post.4.text':'Free MIT lecture playlist mapped to CSE 1213 Discrete Math. Helpful for the midterm.',
    'c.stat.1.n':'12+',  'c.stat.1.l':'Universities',
    'c.stat.2.n':'40+',  'c.stat.2.l':'Major boards',
    'c.stat.3.n':'0',    'c.stat.3.l':'Spam, ever',
    'c.cta':        'Join the forum',

    // PARTNERS
    'partners.caption': 'Courses, certifications & communities from across Bangladesh and the world',

    // FOOTER
    'footer.made':       'Made in Bangladesh',
    'footer.version':    'v1.0 · 2026',
    'footer.desc':       'An AI study partner for Bangladeshi students — curated free courses, certifications and labs, in one feed sized for your major.',
    'footer.newsletter': 'Weekly drop — one email, no spam',
    'footer.placeholder':'you@university.edu',
    'footer.subscribe':  'Join',
    'footer.thanks':     'Thanks',
    'footer.group.platform': 'Platform',
    'footer.group.company':  'Company',
    'footer.group.legal':    'Legal',
    'footer.link.resources': 'Free Resources',
    'footer.link.forum':     'Community Forum',
    'footer.link.quizzes':   'Quizzes',
    'footer.link.labs':      'Virtual Labs',
    'footer.link.about':     'About',
    'footer.link.blog':      'Blog',
    'footer.link.careers':   'Careers',
    'footer.link.press':     'Press',
    'footer.link.privacy':   'Privacy Policy',
    'footer.link.terms':     'Terms of Service',
    'footer.link.cookie':    'Cookie Policy',
    'footer.link.access':    'Accessibility',
    'footer.copyright':      '© 2026 EduStack',
    'footer.eventPrefix':    'Built for the',
    'footer.eventName':      'Infinity AI BuildFest 2026',
    'footer.tagline':        'Built for learners, by learners.',
  },

  bn: {
    // Navbar
    'nav.login':         'লগ ইন',
    'nav.signup':        'বিনামূল্যে শুরু করুন',
    'nav.dashboard':     'ড্যাশবোর্ড',
    'nav.signOut':       'সাইন আউট',
    'nav.signedInAs':    'হিসেবে সাইন ইন',

    // Hero
    'hero.badge':        'বাংলাদেশে তৈরি',
    'hero.subhead':      'বিনামূল্যে কোর্স, সার্টিফিকেশন ও ল্যাব — আপনার মেজর এবং বাংলাদেশের জব মার্কেটের জন্য AI দ্বারা সাজানো।',
    'hero.ctaPrimary':   'বিনামূল্যে শুরু করুন',
    'hero.ctaSecondary': '৬০ সেকেন্ডের পরিচয় দেখুন',
    'hero.footer.early': 'আর্লি অ্যাক্সেস',
    'hero.footer.free':  'শিক্ষার্থীদের জন্য সবসময় বিনামূল্যে',
    'hero.footer.event': 'ইনফিনিটি AI বিল্ডফেস্ট ২০২৬',

    // Rotating taglines
    'tag.1.line1':  'আপনার AI পড়াশোনার সঙ্গী।',
    'tag.1.before': 'তৈরি',
    'tag.1.accent': 'বাংলাদেশের',
    'tag.1.after':  ' জন্য।',
    'tag.2.line1':  'কোচিং বাদ দিন।',
    'tag.2.before': 'রাখুন',
    'tag.2.accent': 'শেখা',
    'tag.2.after':  '।',
    'tag.3.line1':  'আপনার মেজর। আপনার লক্ষ্য।',
    'tag.3.before': 'পরিচালিত',
    'tag.3.accent': 'AI দ্বারা',
    'tag.3.after':  '।',
    'tag.4.line1':  'আপনার জন্য তৈরি পথ।',
    'tag.4.before': '',
    'tag.4.accent': 'বিনামূল্যে',
    'tag.4.after':  ', সবসময়।',

    // Theme + language toggles
    'pref.theme.toLight':    'লাইট মোডে যান',
    'pref.theme.toDark':     'ডার্ক মোডে যান',
    'pref.language.label':   'ভাষা',

    // Final CTA
    'cta.caption':  'আপনি প্রস্তুত হলেই',
    'cta.line1':    'অনুসন্ধান বাদ দিন। শুরু করুন',
    'cta.accent':   'আজই',
    'cta.body':     'দুই মিনিটে আপনার প্রথম পথ। তারপর প্রতি সপ্তাহে আপনার মেজর, ঘাটতি ও পরবর্তী চাকরির জন্য মানিয়ে নেয়।',
    'cta.button':   'বিনামূল্যে অ্যাকাউন্ট খুলুন',
    'cta.trust.free':  'সবসময় বিনামূল্যে',
    'cta.trust.noCard':'কোনো কার্ড লাগবে না',
    'cta.trust.time':  '৬০ সেকেন্ডে সেট আপ',

    // PROBLEM / STOP HUNTING
    'p.caption':     'আমরা যা বানিয়েছি',
    'p.headline.1':  'অনুসন্ধান বাদ দিন।',
    'p.headline.2':  'শেখা শুরু করুন।',
    'p.subhead':     'পড়ার জন্য ১২টা ট্যাব খোলা রাখার দরকার নেই। EduStack ইন্টারনেট থেকে সেরা বিনামূল্যের কোর্স, সার্টিফিকেশন ও ল্যাব নিয়ে আসে — এবং আপনার মেজর, লেভেল ও কুইজে যেসব ঘাটতি ধরা পড়ে সেই অনুযায়ী সাজিয়ে দেয়।',
    'p.feed.label':  'আপনার ফিড · তাসনিম · CSE ২য় বর্ষ',
    'p.feed.live':   'লাইভ',
    'p.feed.footer.bold': 'একটি ফিড।',
    'p.feed.footer.body': ' MIT, 10MS, Coursera, freeCodeCamp, Khan, edX, YouTube — সব একসাথে এনে আপনার অবস্থানের জন্য সাজানো।',
    'p.feed.item.1.title': 'লিনিয়ার আলজেব্রা (লেকচার ৫)',
    'p.feed.item.1.tag':   'কোর্স',
    'p.feed.item.2.title': 'কোষ জীববিজ্ঞান — ১১ শ্রেণি',
    'p.feed.item.2.tag':   'ভিডিও',
    'p.feed.item.3.title': 'Google ডেটা অ্যানালিটিক্স',
    'p.feed.item.3.tag':   'সার্ট',
    'p.feed.item.4.title': 'JS DOM ম্যানিপুলেশন',
    'p.feed.item.4.tag':   'ল্যাব',
    'p.side.1.label': 'ক্যালিব্রেটেড',
    'p.side.1.title': 'অন্যদের জন্য না, আপনার মেজরের জন্য',
    'p.side.1.body':  'BUET CSE-এর দ্বিতীয় বর্ষ, DU অর্থনীতির নতুন শিক্ষার্থী, আর AIUB BBA-এর ছাত্র — সবার ফিড এক হতে পারে না। EduStack আপনার প্রোফাইল পড়ে সে অনুযায়ী সাজায়।',
    'p.side.2.label': 'অ্যাডাপ্টিভ',
    'p.side.2.title': 'আপনি শেখার সাথে সাথে বদলায়',
    'p.side.2.body':  'সাপ্তাহিক কুইজ আপনার দুর্বল টপিক খুঁজে বের করে। পরবর্তী লগইনে সেই টপিকের ভিত্তির কন্টেন্ট ফিডের উপরে চলে আসে।',

    // VIDEO
    'v.caption':     'রিল · ০:৬০',
    'v.headline.1':  'পুরো ধারণাটি,',
    'v.headline.2':  'ষাট সেকেন্ডে।',
    'v.body':        'কিউরেটেড ফিড, অ্যাডাপ্টিভ কুইজ ও শিক্ষার্থীরা আসলে যে ড্যাশবোর্ড ব্যবহার করেন তার একটি দ্রুত ওয়াকথ্রু। ফাউন্ডার মনোলোগ নেই, বাজওয়ার্ড নেই।',
    'v.chapter.1':   'আপনার মেজর, আপনার ফিড',
    'v.chapter.2':   'কুইজ যা মানিয়ে নেয়',
    'v.chapter.3':   'যে বিনামূল্যের সার্ট সত্যিই কাজে দেয়',
    'v.chapter.4':   'কেন সবসময় বিনামূল্যে',
    'v.card.brand':  'EduStack / ২০২৬',
    'v.card.take':   'টেক ০১',
    'v.card.featured': 'ফিচার্ড রিল',
    'v.card.title':  'EduStack কীভাবে কাজ করে।',
    'v.card.duration':'৬০ সেকেন্ড',
    'v.card.cta':    'শীঘ্রই আসছে',
    'v.card.time':   '০০:০০ / ০১:০০',
    'v.card.aspect': 'অ্যাসপেক্ট ১৬:৯',

    // WHO IT'S FOR
    'who.caption':    'কাদের জন্য',
    'who.count':      '০৩ কণ্ঠস্বর',
    'who.headline.1': 'যাদের সিস্টেম ভুলে যায়',
    'who.headline.2': 'তাদের জন্যই তৈরি।',
    'who.subhead':    'তিনজন বাংলাদেশি শিক্ষার্থী। তিনটি আলাদা ঘাটতি। একটিই ফিড — সবার জন্য মানিয়ে নেয়।',
    'who.personaTag': 'পার্সোনা',
    'who.p.1.quote':  'বিশ্ববিদ্যালয়ে অ্যালগরিদম শিখব। বাকি যা তারা শেখাবে না, সেটা EduStack সামলাবে।',
    'who.p.1.name':   'তাসনিম, ২১',
    'who.p.1.role':   'CSE ২য় বর্ষ',
    'who.p.1.aff':    'BUET · BRAC · NSU · DU · AIUB',
    'who.p.2.quote':  'কোচিং-এ মাসে ত্রিশ হাজার লাগে। আমার আছে একটি ফোন ও সময়।',
    'who.p.2.name':   'রিফাত, ১৭',
    'who.p.2.role':   'HSC ও ভর্তির প্রস্তুতি',
    'who.p.2.aff':    'কোচিং সার্কেলের বাইরে',
    'who.p.3.quote':  'দিনে ব্যাংকের চাকরি, রাতে কোডিং শিখি। আমার দরকার একটি পথ, একশো ট্যাব না।',
    'who.p.3.name':   'সুমাইয়া, ২৫',
    'who.p.3.role':   'টেকে ক্যারিয়ার বদল',
    'who.p.3.aff':    'CS ডিগ্রি নেই, সমস্যা নেই',
    'who.cta.body':   'এদের মধ্যে নিজেকে দেখছেন?',
    'who.cta.bodyB':  'EduStack সবসময় বিনামূল্যে।',
    'who.cta.start':  'বিনামূল্যে শুরু',
    'who.cta.browse': 'রিসোর্স দেখুন',

    // FEATURES
    'f.caption':     'আপনি যা পাবেন',
    'f.count':       '০৫ ক্ষমতা',
    'f.headline.1':  'একজন সিরিয়াস শিক্ষার্থীর টুলকিট।',
    'f.headline.2':  'সাজানো, স্তূপ করা নয়।',
    'f.subhead':     'যে পাঁচটি জিনিস সত্যিই দরকার। কোনো বাড়তি নেই, যেখানে গুরুত্বপূর্ণ সেখানে কোনো পেওয়াল নেই।',
    'f.hero.label':  'মস্তিষ্ক',
    'f.hero.tag':    'প্রধান ফিচার',
    'f.hero.title':  'একটি AI যা আপনার মেজর জানে।',
    'f.hero.body':   'আমাদের বলুন আপনার বিশ্ববিদ্যালয়, লেভেল, এবং পরবর্তী যে চাকরি চান। Claude আপনার প্রোফাইল পড়ে সঠিক কোর্স, সার্টিফিকেশন ও ল্যাব সাজায় — এবং প্রতি সপ্তাহে আপনার অগ্রগতির সাথে নতুন করে সাজায়।',
    'f.hero.milestone.label': 'মাইলস্টোন অগ্রগতি',
    'f.hero.milestone.you':   'আপনি এখানে · ৩৩%',
    'f.milestone.1': 'এক্সপ্লোরার',
    'f.milestone.2': 'অ্যাপ্রেন্টিস',
    'f.milestone.3': 'প্র্যাকটিশনার',
    'f.milestone.4': 'এক্সপার্ট',
    'f.2.label': 'ক্রেডেনশিয়াল',
    'f.2.title': 'সার্টিফিকেট যা গণ্য হয়',
    'f.2.desc':  'Google, IBM, Meta, MIT, Stanford — বিনামূল্যে অডিট করুন। বাংলাদেশের রিক্রুটাররা যেসব ব্যাজ চেনে, সেগুলো অর্জন করুন।',
    'f.3.label': 'কুইজ',
    'f.3.title': 'সপ্তাহে আপনার ঘাটতি খুঁজুন',
    'f.3.desc':  'পাঁচ মিনিটের কুইজে দুর্বল টপিক ধরা পড়ে। পরের বার সেই টপিকের ভিত্তি কন্টেন্ট আপনার ফিডের উপরে আসে।',
    'f.4.label': 'ল্যাব',
    'f.4.title': 'যন্ত্র ছাড়া হাতে-কলমে',
    'f.4.desc':  'কোড, সার্কিট, কেমিস্ট্রি, বায়োলজি — সিমুলেশন যা আপনার বিশ্ববিদ্যালয়ের বাজেট কিনতে পারে না। দেখা না, করা শিখুন।',
    'f.5.label': 'অগ্রগতি',
    'f.5.title': 'নিজেকে এগিয়ে যেতে দেখুন',
    'f.5.desc':  'লাইভ ড্যাশবোর্ড প্রতিটি কোর্স, ল্যাব ও কুইজ ট্র্যাক করে। এক্সপ্লোরার থেকে অ্যাপ্রেন্টিস, প্র্যাকটিশনার, এক্সপার্ট পর্যন্ত — প্রতি সপ্তাহে দৃশ্যমান।',

    // HOW IT WORKS
    'h.caption':    'কীভাবে কাজ করে',
    'h.steps':      '০৪ ধাপ',
    'h.headline.1': 'দুই মিনিটে একটি পথ।',
    'h.headline.2': 'তারপর আপনার সাথে মানিয়ে নেয়।',
    'h.subhead':    'চা শেষ হওয়ার আগেই — সাইন-আপ থেকে প্রথম পাঠ।',
    'h.step.1.meta':  '৩০ সেকেন্ড',
    'h.step.1.title': 'বিনামূল্যে সাইন আপ',
    'h.step.1.desc':  'একটি অ্যাকাউন্ট খুলুন। কার্ড নেই, ফি নেই, কোনো প্যাঁচ নেই।',
    'h.step.2.meta':  '১ মিনিট',
    'h.step.2.title': 'মেজরটি বলুন',
    'h.step.2.desc':  'আপনার বিশ্ববিদ্যালয় ও বিষয় — আমরা আপনার আসল কারিকুলাম অনুযায়ী সাজাই।',
    'h.step.3.meta':  'তৎক্ষণাৎ',
    'h.step.3.title': 'AI পথ পান',
    'h.step.3.desc':  'Claude আপনার প্রোফাইল পড়ে সঠিক কোর্স, সার্ট ও ল্যাব সাজায়।',
    'h.step.4.meta':  'আজই',
    'h.step.4.title': 'শেখা শুরু',
    'h.step.4.desc':  'অগ্রগতি ট্র্যাক করুন, কুইজ দিন, সার্টিফিকেশন অর্জন করুন, লেভেল আপ করুন।',

    // COMMUNITY
    'c.caption':    'কমিউনিটি',
    'c.live':       'লাইভ',
    'c.headline.1': 'শিক্ষার্থীদের তৈরি।',
    'c.headline.2': 'রিক্রুটাররা পড়েন।',
    'c.subhead':    'মেজর-ভিত্তিক বোর্ড, স্টাডি গ্রুপ, এবং বাংলাদেশের বিশ্ববিদ্যালয়গুলোর প্রকৃত শিক্ষার্থীদের আসল নোট। সাইন ইন করলেই আপনার মেজর অনুযায়ী সাজানো।',
    'c.feed.label': 'সাম্প্রতিক কার্যক্রম / সব বোর্ড',
    'c.feed.online':'৪৭ অনলাইন',
    'c.post.1.user':'তাসনিম র.', 'c.post.1.uni':'BUET', 'c.post.1.time':'১২ মি',
    'c.post.1.tag':'প্রশ্ন',
    'c.post.1.text':'CSE 2105 ডেটা স্ট্রাকচারস ফাইনালের নোট কারো আছে? আমার রিকার্সন নোট শেয়ার করছি — একটা রিপ্লাই দিন।',
    'c.post.2.user':'রিফাত হ.', 'c.post.2.uni':'IUT', 'c.post.2.time':'১ ঘ',
    'c.post.2.tag':'প্রজেক্ট',
    'c.post.2.text':'কোহর্ট ০৩ উইকেন্ড হ্যাকে একটি ছোট React ড্যাশবোর্ড বানিয়েছি। ফিডব্যাকের জন্য খোলা।',
    'c.post.3.user':'সুমাইয়া ক.', 'c.post.3.uni':'NSU', 'c.post.3.time':'৩ ঘ',
    'c.post.3.tag':'স্টাডি গ্রুপ',
    'c.post.3.text':'Google Data Analytics স্টাডি কোহর্ট শুরু করছি। ৬টি জায়গা বাকি, রিপ্লাই দিয়ে নাম লেখান।',
    'c.post.4.user':'আয়ান ম.', 'c.post.4.uni':'BRAC', 'c.post.4.time':'৬ ঘ',
    'c.post.4.tag':'রিসোর্স',
    'c.post.4.text':'CSE 1213 ডিসক্রিট ম্যাথের সাথে মিলিয়ে বিনামূল্যের MIT লেকচার প্লেলিস্ট। মিডটার্মের জন্য কাজে লাগবে।',
    'c.stat.1.n':'১২+',  'c.stat.1.l':'বিশ্ববিদ্যালয়',
    'c.stat.2.n':'৪০+',  'c.stat.2.l':'মেজর বোর্ড',
    'c.stat.3.n':'০',    'c.stat.3.l':'কোনো স্প্যাম নেই',
    'c.cta':        'ফোরামে যোগ দিন',

    // PARTNERS
    'partners.caption': 'বাংলাদেশ ও বিশ্বের কোর্স, সার্টিফিকেশন ও কমিউনিটি',

    // FOOTER
    'footer.made':       'বাংলাদেশে তৈরি',
    'footer.version':    'ভি১.০ · ২০২৬',
    'footer.desc':       'বাংলাদেশি শিক্ষার্থীদের জন্য AI পড়াশোনার সঙ্গী — কিউরেটেড বিনামূল্যের কোর্স, সার্টিফিকেশন ও ল্যাব, আপনার মেজরের মাপের একটি ফিডে।',
    'footer.newsletter': 'সাপ্তাহিক — সপ্তাহে একটি ইমেইল, কোনো স্প্যাম নেই',
    'footer.placeholder':'apni@university.edu',
    'footer.subscribe':  'যোগ দিন',
    'footer.thanks':     'ধন্যবাদ',
    'footer.group.platform': 'প্ল্যাটফর্ম',
    'footer.group.company':  'কোম্পানি',
    'footer.group.legal':    'লিগ্যাল',
    'footer.link.resources': 'বিনামূল্যের রিসোর্স',
    'footer.link.forum':     'কমিউনিটি ফোরাম',
    'footer.link.quizzes':   'কুইজ',
    'footer.link.labs':      'ভার্চুয়াল ল্যাব',
    'footer.link.about':     'আমাদের সম্পর্কে',
    'footer.link.blog':      'ব্লগ',
    'footer.link.careers':   'ক্যারিয়ার',
    'footer.link.press':     'প্রেস',
    'footer.link.privacy':   'প্রাইভেসি পলিসি',
    'footer.link.terms':     'টার্মস অফ সার্ভিস',
    'footer.link.cookie':    'কুকি পলিসি',
    'footer.link.access':    'অ্যাক্সেসিবিলিটি',
    'footer.copyright':      '© ২০২৬ EduStack',
    'footer.eventPrefix':    'নির্মিত',
    'footer.eventName':      'ইনফিনিটি AI বিল্ডফেস্ট ২০২৬-এর জন্য',
    'footer.tagline':        'শিক্ষার্থীদের জন্য, শিক্ষার্থীদের দ্বারা।',
  },
}

const STORAGE_KEY = 'edustack.preferences'

const PreferencesContext = createContext(null)

export function PreferencesProvider({ children }) {
  // Language only — EduStack is dark-themed by design. Theme toggle removed.
  const [language, setLanguageState] = useState(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.language === 'en' || parsed.language === 'bn') return parsed.language
      }
    } catch { /* ignore */ }
    return 'en'
  })

  // Pin <html data-theme="dark"> and reflect language for screen-readers
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', 'dark')
    root.setAttribute('lang', language === 'bn' ? 'bn' : 'en')
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ language }))
    } catch { /* ignore */ }
  }, [language])

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang)
  }, [])

  const t = useCallback((key) => {
    return TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? key
  }, [language])

  return (
    <PreferencesContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export const usePreferences = () => {
  const ctx = useContext(PreferencesContext)
  if (!ctx) throw new Error('usePreferences must be used within PreferencesProvider')
  return ctx
}
