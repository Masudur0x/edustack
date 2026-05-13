// ─── MAJORS ──────────────────────────────────────────────────────────────────
export const MAJORS = [
  { id: 'cs',       label: 'Computer Science',      icon: '💻', group: 'STEM' },
  { id: 'ds',       label: 'Data Science',           icon: '📊', group: 'STEM' },
  { id: 'ee',       label: 'Electrical Engineering', icon: '⚡', group: 'STEM' },
  { id: 'me',       label: 'Mechanical Engineering', icon: '⚙️', group: 'STEM' },
  { id: 'math',     label: 'Mathematics',            icon: '∑',  group: 'STEM' },
  { id: 'physics',  label: 'Physics',                icon: '🔭', group: 'STEM' },
  { id: 'bio',      label: 'Biology',                icon: '🧬', group: 'STEM' },
  { id: 'chem',     label: 'Chemistry',              icon: '🧪', group: 'STEM' },
  { id: 'finance',  label: 'Finance',                icon: '📈', group: 'Business' },
  { id: 'mkt',      label: 'Marketing',              icon: '📢', group: 'Business' },
  { id: 'mgmt',     label: 'Management',             icon: '🏢', group: 'Business' },
  { id: 'econ',     label: 'Economics',              icon: '🏦', group: 'Business' },
  { id: 'psych',    label: 'Psychology',             icon: '🧠', group: 'Social Sciences' },
  { id: 'polsci',   label: 'Political Science',      icon: '🏛️', group: 'Social Sciences' },
  { id: 'design',   label: 'UX/UI Design',           icon: '🎨', group: 'Arts & Design' },
  { id: 'health',   label: 'Public Health',          icon: '🏥', group: 'Health' },
  { id: 'law',      label: 'Law & Policy',           icon: '⚖️', group: 'Law' },
  { id: 'edu',      label: 'Education',              icon: '📚', group: 'Education' },
  { id: 'undecided',label: 'Undecided / Exploring',  icon: '🔍', group: 'Other' },
]

export const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

export const LEARNING_GOALS = [
  { id: 'job',       label: 'Get a Job',                    icon: '💼' },
  { id: 'supplement',label: 'Supplement University Courses', icon: '🎓' },
  { id: 'switch',    label: 'Career Switch',                icon: '🔄' },
  { id: 'interest',  label: 'Personal Interest',            icon: '❤️' },
  { id: 'grad',      label: 'Prepare for Grad School',      icon: '🏫' },
  { id: 'cert',      label: 'Pass a Certification Exam',    icon: '🏆' },
]

// ─── COURSES ─────────────────────────────────────────────────────────────────
export const COURSES = [
  {
    id: 'c1', title: 'CS50: Introduction to Computer Science', provider: 'Harvard / edX',
    duration: '12 weeks', level: 'Beginner', rating: 4.9, enrollments: 3200000,
    majorTags: ['cs', 'ds'], description: 'The most popular intro CS course on earth. Covers C, Python, SQL, web basics.',
    url: '#', category: 'Programming', language: 'English', addedDate: '2024-01-15',
  },
  {
    id: 'c2', title: 'Machine Learning Specialization', provider: 'Coursera / Stanford',
    duration: '3 months', level: 'Intermediate', rating: 4.8, enrollments: 980000,
    majorTags: ['cs', 'ds', 'math'], description: 'Andrew Ng\'s legendary ML course covering supervised learning, neural networks, and best practices.',
    url: '#', category: 'Machine Learning', language: 'English', addedDate: '2024-02-01',
  },
  {
    id: 'c3', title: 'Python for Everybody', provider: 'Coursera / UMich',
    duration: '8 months', level: 'Beginner', rating: 4.8, enrollments: 2100000,
    majorTags: ['cs', 'ds', 'bio', 'chem'], description: 'Learn Python from scratch — data structures, web scraping, databases, and data visualization.',
    url: '#', category: 'Programming', language: 'English', addedDate: '2024-01-20',
  },
  {
    id: 'c4', title: 'Data Structures and Algorithms', provider: 'MIT OpenCourseWare',
    duration: '15 weeks', level: 'Intermediate', rating: 4.7, enrollments: 450000,
    majorTags: ['cs', 'math'], description: 'Classic MIT 6.006 covering sorting, graphs, dynamic programming, and complexity.',
    url: '#', category: 'Computer Science', language: 'English', addedDate: '2024-03-10',
  },
  {
    id: 'c5', title: 'Financial Markets', provider: 'Coursera / Yale',
    duration: '7 weeks', level: 'Beginner', rating: 4.7, enrollments: 670000,
    majorTags: ['finance', 'econ'], description: 'Robert Shiller\'s acclaimed course on behavioral finance, risk, and market structures.',
    url: '#', category: 'Finance', language: 'English', addedDate: '2024-01-05',
  },
  {
    id: 'c6', title: 'Introduction to Psychology', provider: 'MIT OpenCourseWare',
    duration: '12 weeks', level: 'Beginner', rating: 4.6, enrollments: 320000,
    majorTags: ['psych'], description: 'Covers perception, cognition, emotion, personality, behavior and psychological disorders.',
    url: '#', category: 'Psychology', language: 'English', addedDate: '2024-02-15',
  },
  {
    id: 'c7', title: 'Circuits and Electronics', provider: 'MIT OpenCourseWare',
    duration: '16 weeks', level: 'Intermediate', rating: 4.7, enrollments: 210000,
    majorTags: ['ee'], description: 'Resistors, capacitors, op-amps, digital gates and state machines.',
    url: '#', category: 'Engineering', language: 'English', addedDate: '2024-04-01',
  },
  {
    id: 'c8', title: 'UX Design Professional Certificate', provider: 'Google / Coursera',
    duration: '6 months', level: 'Beginner', rating: 4.8, enrollments: 890000,
    majorTags: ['design', 'cs'], description: 'End-to-end UX process: empathize, define, ideate, prototype, test. Industry-recognized credential.',
    url: '#', category: 'Design', language: 'English', addedDate: '2024-03-20',
  },
  {
    id: 'c9', title: 'Linear Algebra', provider: 'MIT OpenCourseWare',
    duration: '14 weeks', level: 'Intermediate', rating: 4.9, enrollments: 540000,
    majorTags: ['math', 'cs', 'ds', 'physics'], description: 'Gilbert Strang\'s legendary 18.06 — vectors, matrices, eigenvalues, SVD.',
    url: '#', category: 'Mathematics', language: 'English', addedDate: '2024-01-12',
  },
  {
    id: 'c10', title: 'Full-Stack Web Development Bootcamp', provider: 'freeCodeCamp',
    duration: '6 months', level: 'Beginner', rating: 4.7, enrollments: 1500000,
    majorTags: ['cs', 'design'], description: 'HTML, CSS, JavaScript, React, Node.js, databases — the full stack from zero.',
    url: '#', category: 'Web Development', language: 'English', addedDate: '2024-02-28',
  },
  {
    id: 'c11', title: 'Organic Chemistry', provider: 'Khan Academy',
    duration: 'Self-paced', level: 'Intermediate', rating: 4.6, enrollments: 280000,
    majorTags: ['chem', 'bio', 'health'], description: 'Functional groups, reactions, mechanisms, and stereochemistry.',
    url: '#', category: 'Chemistry', language: 'English', addedDate: '2024-04-10',
  },
  {
    id: 'c12', title: 'Digital Marketing Analytics', provider: 'Coursera / IE Business',
    duration: '5 weeks', level: 'Intermediate', rating: 4.5, enrollments: 190000,
    majorTags: ['mkt', 'mgmt'], description: 'SEO, SEM, social analytics, A/B testing, attribution models.',
    url: '#', category: 'Marketing', language: 'English', addedDate: '2024-03-05',
  },
  {
    id: 'c13', title: 'Computational Biology', provider: 'MIT OpenCourseWare',
    duration: '14 weeks', level: 'Advanced', rating: 4.6, enrollments: 89000,
    majorTags: ['bio', 'cs', 'ds'], description: 'Sequence alignment, phylogenetics, protein structure, and genomic analysis.',
    url: '#', category: 'Biology', language: 'English', addedDate: '2024-02-10',
  },
  {
    id: 'c14', title: 'Classical Mechanics', provider: 'MIT OpenCourseWare',
    duration: '13 weeks', level: 'Intermediate', rating: 4.8, enrollments: 340000,
    majorTags: ['physics', 'me', 'math'], description: 'Newtonian mechanics, Lagrangian dynamics, oscillations, and orbital mechanics.',
    url: '#', category: 'Physics', language: 'English', addedDate: '2024-01-30',
  },
  {
    id: 'c15', title: 'Introduction to Public Health', provider: 'Coursera / JHU',
    duration: '5 weeks', level: 'Beginner', rating: 4.7, enrollments: 260000,
    majorTags: ['health'], description: 'Epidemiology, biostatistics, environmental health, health policy.',
    url: '#', category: 'Health', language: 'English', addedDate: '2024-04-22',
  },
]

// ─── CERTIFICATIONS ──────────────────────────────────────────────────────────
export const CERTIFICATIONS = [
  {
    id: 'cert1', name: 'AWS Cloud Practitioner', organization: 'Amazon Web Services',
    estimatedTime: '40 hours', recognitionScore: 5, cost: 'Free to Study / Paid Exam',
    skills: ['Cloud Computing', 'AWS Services', 'Security'], domain: 'Technology',
    majorTags: ['cs', 'ds'], description: 'Foundation-level cloud certification recognized by 90%+ of tech employers.',
  },
  {
    id: 'cert2', name: 'Google Data Analytics Certificate', organization: 'Google',
    estimatedTime: '6 months', recognitionScore: 5, cost: 'Free to Audit',
    skills: ['SQL', 'R', 'Tableau', 'Data Cleaning'], domain: 'Data',
    majorTags: ['ds', 'cs', 'mkt'], description: 'Industry-recognized cert covering the complete data analysis workflow.',
  },
  {
    id: 'cert3', name: 'Meta Front-End Developer Certificate', organization: 'Meta',
    estimatedTime: '7 months', recognitionScore: 4, cost: 'Free to Audit',
    skills: ['React', 'HTML/CSS', 'JavaScript', 'Version Control'], domain: 'Development',
    majorTags: ['cs', 'design'], description: 'Build job-ready React apps with Meta\'s curriculum.',
  },
  {
    id: 'cert4', name: 'IBM Data Science Professional', organization: 'IBM',
    estimatedTime: '5 months', recognitionScore: 4, cost: 'Free to Audit',
    skills: ['Python', 'Machine Learning', 'SQL', 'Jupyter'], domain: 'Data Science',
    majorTags: ['ds', 'cs'], description: '10-course series covering the full data science lifecycle.',
  },
  {
    id: 'cert5', name: 'CFA Level I (Study Materials)', organization: 'CFA Institute',
    estimatedTime: '300 hours', recognitionScore: 5, cost: 'Free Study Resources',
    skills: ['Portfolio Management', 'Financial Analysis', 'Ethics'], domain: 'Finance',
    majorTags: ['finance', 'econ'], description: 'Gold standard in investment management. Free prep materials via the Institute.',
  },
  {
    id: 'cert6', name: 'Google UX Design Certificate', organization: 'Google',
    estimatedTime: '6 months', recognitionScore: 5, cost: 'Free to Audit',
    skills: ['Figma', 'Prototyping', 'User Research', 'Usability Testing'], domain: 'Design',
    majorTags: ['design', 'cs'], description: 'From empathy maps to high-fidelity prototypes — Google\'s official UX cert.',
  },
  {
    id: 'cert7', name: 'Deep Learning Specialization', organization: 'DeepLearning.AI',
    estimatedTime: '4 months', recognitionScore: 5, cost: 'Free to Audit',
    skills: ['Neural Networks', 'CNNs', 'RNNs', 'TensorFlow'], domain: 'AI/ML',
    majorTags: ['cs', 'ds', 'math'], description: 'Andrew Ng\'s 5-course deep learning series — the field\'s foundational curriculum.',
  },
  {
    id: 'cert8', name: 'Microsoft Azure Fundamentals (AZ-900)', organization: 'Microsoft',
    estimatedTime: '35 hours', recognitionScore: 4, cost: 'Free Study / Paid Exam',
    skills: ['Azure Services', 'Cloud Concepts', 'Pricing'], domain: 'Technology',
    majorTags: ['cs', 'ee'], description: 'Entry-point cloud cert for the Microsoft ecosystem.',
  },
  {
    id: 'cert9', name: 'HubSpot Content Marketing Certification', organization: 'HubSpot',
    estimatedTime: '6 hours', recognitionScore: 3, cost: 'Completely Free',
    skills: ['Content Strategy', 'SEO', 'Blogging', 'Lead Generation'], domain: 'Marketing',
    majorTags: ['mkt', 'mgmt'], description: 'Free industry cert recognized across digital marketing roles.',
  },
  {
    id: 'cert10', name: 'Six Sigma Green Belt Prep', organization: 'ASQ',
    estimatedTime: '80 hours', recognitionScore: 4, cost: 'Free to Study',
    skills: ['Process Improvement', 'DMAIC', 'Statistics', 'Quality Control'], domain: 'Operations',
    majorTags: ['me', 'mgmt', 'ee'], description: 'Operations and quality management methodology used in engineering and business.',
  },
]

// ─── AI TOOLS ─────────────────────────────────────────────────────────────────
export const AI_TOOLS = [
  {
    id: 't1', name: 'NotebookLM', category: 'Writing & Research',
    description: 'Google\'s AI notebook that reasons over your uploaded documents — papers, PDFs, notes.',
    useCase: 'Upload your lecture slides and textbook chapters; ask it to explain concepts or generate study guides.',
    url: '#', rating: 4.7, majorTags: ['cs', 'bio', 'chem', 'physics'],
  },
  {
    id: 't2', name: 'Wolfram Alpha', category: 'Math & Science',
    description: 'Computational knowledge engine that solves equations, plots functions, and explains step by step.',
    useCase: 'Paste a calculus integral or statistics problem and get a step-by-step solution with visualizations.',
    url: '#', rating: 4.8, majorTags: ['math', 'physics', 'chem', 'ee'],
  },
  {
    id: 't3', name: 'GitHub Copilot', category: 'Coding',
    description: 'AI pair programmer that autocompletes code, explains functions, and catches bugs in real time.',
    useCase: 'Students get free access. Use it to understand unfamiliar code patterns and accelerate assignments.',
    url: '#', rating: 4.7, majorTags: ['cs', 'ds', 'ee'],
  },
  {
    id: 't4', name: 'Elicit', category: 'Writing & Research',
    description: 'AI research assistant that searches and summarizes academic papers for literature reviews.',
    useCase: 'Type a research question; Elicit surfaces relevant papers and extracts key findings automatically.',
    url: '#', rating: 4.5, majorTags: ['bio', 'chem', 'psych', 'health'],
  },
  {
    id: 't5', name: 'Anki + AnkiGPT', category: 'Study & Flashcards',
    description: 'Spaced repetition flashcard system combined with AI card generation from your notes.',
    useCase: 'Paste a lecture transcript into AnkiGPT; it creates 30 flashcards in under a minute.',
    url: '#', rating: 4.9, majorTags: ['bio', 'chem', 'health', 'psych'],
  },
  {
    id: 't6', name: 'Julius AI', category: 'Data & Analysis',
    description: 'AI data analyst — upload a CSV or Excel file and ask questions in plain English.',
    useCase: 'Upload your economics dataset and ask "show me the correlation between GDP and unemployment."',
    url: '#', rating: 4.6, majorTags: ['ds', 'econ', 'finance', 'psych'],
  },
  {
    id: 't7', name: 'Perplexity AI', category: 'Writing & Research',
    description: 'AI search engine that gives sourced answers to complex questions, unlike plain chatbots.',
    useCase: 'Ask "What are the latest developments in CRISPR gene editing?" and get cited, current answers.',
    url: '#', rating: 4.7, majorTags: ['bio', 'chem', 'polsci', 'health'],
  },
  {
    id: 't8', name: 'Desmos', category: 'Math & Science',
    description: 'Beautiful, free graphing calculator with animations, regressions, and interactive sliders.',
    useCase: 'Visualize how changing parameters in a parabola equation shifts its shape in real time.',
    url: '#', rating: 4.9, majorTags: ['math', 'physics', 'econ'],
  },
  {
    id: 't9', name: 'Grammarly', category: 'Writing & Research',
    description: 'AI writing assistant for grammar, clarity, style, and plagiarism detection.',
    useCase: 'Paste your essay draft; Grammarly flags passive voice overuse and suggests stronger word choices.',
    url: '#', rating: 4.6, majorTags: ['edu', 'law', 'mkt', 'psych'],
  },
  {
    id: 't10', name: 'Otter.ai', category: 'Study & Flashcards',
    description: 'AI meeting and lecture transcription with speaker identification and keyword summaries.',
    useCase: 'Record your lecture; Otter auto-generates a searchable transcript with timestamps.',
    url: '#', rating: 4.4, majorTags: ['cs', 'mgmt', 'edu', 'law'],
  },
  {
    id: 't11', name: 'Khanmigo (Khan Academy AI)', category: 'Study & Flashcards',
    description: 'Socratic AI tutor that guides students to answers rather than giving them directly.',
    useCase: 'Stuck on a physics problem? Khanmigo asks leading questions until you arrive at the solution yourself.',
    url: '#', rating: 4.7, majorTags: ['math', 'physics', 'chem', 'bio'],
  },
  {
    id: 't12', name: 'Beautiful.ai', category: 'Writing & Research',
    description: 'AI-powered presentation builder that auto-designs slides as you type your content.',
    useCase: 'Input your project outline; Beautiful.ai formats it into a polished presentation deck.',
    url: '#', rating: 4.3, majorTags: ['mkt', 'mgmt', 'design', 'edu'],
  },
]

// ─── FORUM POSTS ─────────────────────────────────────────────────────────────
export const FORUM_POSTS = [
  {
    id: 'p1', title: 'Best resources for learning React in 2025?',
    content: 'I\'ve finished the HTML/CSS basics and started JavaScript. What\'s the best pathway to get into React? Any recommendations for projects to build after the basics?',
    author: { name: 'Alex Chen', reputation: 245, major: 'Computer Science' },
    majorBoard: 'cs', subBoard: 'Resource Sharing', type: 'Question',
    upvotes: 47, replies: 12, timestamp: '2026-05-10T14:23:00Z', resolved: true,
    tags: ['react', 'frontend', 'javascript'],
  },
  {
    id: 'p2', title: 'How to approach ML research papers as a beginner?',
    content: 'I\'m interested in machine learning but every research paper I try to read feels like a different language. How did you all break through this barrier?',
    author: { name: 'Maria S.', reputation: 128, major: 'Data Science' },
    majorBoard: 'ds', subBoard: 'Study Help', type: 'Question',
    upvotes: 83, replies: 24, timestamp: '2026-05-11T09:15:00Z', resolved: false,
    tags: ['research', 'machine-learning', 'papers'],
  },
  {
    id: 'p3', title: 'Sharing my financial modeling template (Excel + Python)',
    content: 'After 3 months of building this out, I\'m open-sourcing my DCF modeling template. It includes Python scripts for data fetching and automated scenario analysis.',
    author: { name: 'James T.', reputation: 512, major: 'Finance' },
    majorBoard: 'finance', subBoard: 'Resource Sharing', type: 'Resource Share',
    upvotes: 156, replies: 31, timestamp: '2026-05-09T16:40:00Z', resolved: false,
    tags: ['excel', 'python', 'modeling', 'DCF'],
  },
  {
    id: 'p4', title: 'Study group for AWS certification — anyone interested?',
    content: 'Planning to take the AWS Cloud Practitioner exam next month. Looking for 3-4 people to study with via weekly Discord calls. DM me if interested!',
    author: { name: 'Priya K.', reputation: 89, major: 'Computer Science' },
    majorBoard: 'cs', subBoard: 'Project Collaboration', type: 'Discussion',
    upvotes: 29, replies: 18, timestamp: '2026-05-11T11:30:00Z', resolved: false,
    tags: ['aws', 'certification', 'study-group'],
  },
  {
    id: 'p5', title: 'Cognitive biases every psychology student must know',
    content: 'Compiled a list of the 20 most empirically significant cognitive biases with study notes and examples from Kahneman, Tversky, and others. Hope this helps before the midterm!',
    author: { name: 'Sara O.', reputation: 334, major: 'Psychology' },
    majorBoard: 'psych', subBoard: 'Study Help', type: 'Resource Share',
    upvotes: 201, replies: 45, timestamp: '2026-05-08T08:00:00Z', resolved: false,
    tags: ['cognitive-bias', 'behavioral', 'midterm'],
  },
  {
    id: 'p6', title: 'How I passed Linear Algebra with Gilbert Strang\'s MIT course',
    content: 'Failed my university linear algebra course, retook it using MIT 18.06 on OpenCourseWare. Here\'s my 8-week study plan that turned everything around.',
    author: { name: 'David L.', reputation: 678, major: 'Mathematics' },
    majorBoard: 'math', subBoard: 'Career Advice', type: 'Discussion',
    upvotes: 312, replies: 67, timestamp: '2026-05-07T13:20:00Z', resolved: false,
    tags: ['linear-algebra', 'mit', 'study-plan'],
  },
  {
    id: 'p7', title: 'Anyone else using AI tools for circuit simulation?',
    content: 'Found that combining Wolfram Alpha with Falstad for circuit analysis saves hours on homework. What AI workflows are EE students using?',
    author: { name: 'Riya M.', reputation: 145, major: 'Electrical Engineering' },
    majorBoard: 'ee', subBoard: 'Study Help', type: 'Discussion',
    upvotes: 54, replies: 21, timestamp: '2026-05-10T17:45:00Z', resolved: false,
    tags: ['circuits', 'ai-tools', 'simulation'],
  },
]

// ─── QUIZZES ─────────────────────────────────────────────────────────────────
export const QUIZZES = [
  {
    id: 'q1', title: 'Python Fundamentals', major: 'cs', topic: 'Programming',
    level: 'Beginner', duration: 15, scheduledDate: '2026-05-14',
    questions: [
      {
        id: 'q1_1', type: 'multiple_choice',
        text: 'What is the output of: print(type([])) ?',
        options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"],
        correctAnswer: 0,
        explanation: 'Square brackets create a list in Python. The type() function returns the class of an object.',
      },
      {
        id: 'q1_2', type: 'multiple_choice',
        text: 'Which of the following is used to define a function in Python?',
        options: ['function', 'def', 'fn', 'define'],
        correctAnswer: 1,
        explanation: 'The "def" keyword is used to define functions in Python, followed by the function name and parentheses.',
      },
      {
        id: 'q1_3', type: 'true_false',
        text: 'Python uses indentation to define code blocks instead of curly braces.',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'Python uses whitespace indentation to delimit code blocks, unlike C, Java, or JavaScript which use curly braces.',
      },
      {
        id: 'q1_4', type: 'multiple_choice',
        text: 'What does the len() function return when called on a string "Hello"?',
        options: ['4', '5', '6', 'It raises an error'],
        correctAnswer: 1,
        explanation: '"Hello" has 5 characters: H, e, l, l, o. len() counts each character including spaces.',
      },
      {
        id: 'q1_5', type: 'multiple_choice',
        text: 'Which data structure uses key-value pairs in Python?',
        options: ['List', 'Tuple', 'Dictionary', 'Set'],
        correctAnswer: 2,
        explanation: 'Dictionaries (dict) store data as key-value pairs. Example: {"name": "Alice", "age": 25}',
      },
    ],
  },
  {
    id: 'q2', title: 'Statistics Fundamentals', major: 'ds', topic: 'Statistics',
    level: 'Intermediate', duration: 20, scheduledDate: '2026-05-15',
    questions: [
      {
        id: 'q2_1', type: 'multiple_choice',
        text: 'What does a p-value of 0.03 indicate at a significance level of 0.05?',
        options: [
          'Fail to reject the null hypothesis',
          'Reject the null hypothesis',
          'The result is inconclusive',
          'The effect size is 3%',
        ],
        correctAnswer: 1,
        explanation: 'A p-value of 0.03 is less than α = 0.05, so we reject the null hypothesis — the result is statistically significant.',
      },
      {
        id: 'q2_2', type: 'multiple_choice',
        text: 'Which measure of central tendency is most affected by outliers?',
        options: ['Mode', 'Median', 'Mean', 'Range'],
        correctAnswer: 2,
        explanation: 'The mean is calculated using all values, so extreme outliers pull it significantly. The median and mode are more robust.',
      },
      {
        id: 'q2_3', type: 'true_false',
        text: 'Correlation always implies causation.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: 'Correlation measures the statistical relationship between variables, but does not prove one causes the other. A third variable may explain both.',
      },
      {
        id: 'q2_4', type: 'multiple_choice',
        text: 'In a normal distribution, approximately what percentage of data falls within 2 standard deviations of the mean?',
        options: ['68%', '90%', '95%', '99.7%'],
        correctAnswer: 2,
        explanation: 'The empirical rule: ~68% within 1σ, ~95% within 2σ, ~99.7% within 3σ of the mean.',
      },
    ],
  },
  {
    id: 'q3', title: 'Financial Valuation Concepts', major: 'finance', topic: 'Valuation',
    level: 'Intermediate', duration: 20, scheduledDate: '2026-05-16',
    questions: [
      {
        id: 'q3_1', type: 'multiple_choice',
        text: 'EBITDA stands for:',
        options: [
          'Earnings Before Interest, Taxes, Depreciation, and Amortization',
          'Estimated Business Income, Tax Deductions, and Assets',
          'Earnings Before Income Tax, Dividends, and Appreciation',
          'None of the above',
        ],
        correctAnswer: 0,
        explanation: 'EBITDA measures a company\'s core operational profitability before the impact of financing and non-cash items.',
      },
      {
        id: 'q3_2', type: 'true_false',
        text: 'A higher P/E ratio always means a stock is overvalued.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: 'A high P/E may reflect strong growth expectations. Context matters — compare within the same industry and growth stage.',
      },
      {
        id: 'q3_3', type: 'multiple_choice',
        text: 'In a DCF model, what does "discount rate" represent?',
        options: [
          'The annual revenue growth rate',
          'The required rate of return / cost of capital',
          'The tax rate applied to cash flows',
          'The inflation adjustment factor',
        ],
        correctAnswer: 1,
        explanation: 'The discount rate reflects the opportunity cost of capital — the return an investor requires to justify the risk of the investment.',
      },
    ],
  },
  {
    id: 'q4', title: 'UX Design Principles', major: 'design', topic: 'UX Fundamentals',
    level: 'Beginner', duration: 15, scheduledDate: '2026-05-17',
    questions: [
      {
        id: 'q4_1', type: 'multiple_choice',
        text: 'Which UX research method is best for understanding user motivations and mental models?',
        options: ['A/B Testing', 'User Interviews', 'Heatmaps', 'Analytics Dashboard'],
        correctAnswer: 1,
        explanation: 'User interviews are qualitative — they reveal the "why" behind behavior. Quantitative methods show "what" happened, not why.',
      },
      {
        id: 'q4_2', type: 'multiple_choice',
        text: 'What is the primary purpose of a wireframe?',
        options: [
          'Define the visual brand and color system',
          'Show final pixel-perfect designs to stakeholders',
          'Map layout, hierarchy, and functionality without visual design details',
          'Conduct usability testing with real users',
        ],
        correctAnswer: 2,
        explanation: 'Wireframes are low-fidelity structural blueprints that communicate layout and interaction flow without the distraction of visual design.',
      },
      {
        id: 'q4_3', type: 'true_false',
        text: 'According to Fitts\'s Law, larger targets are easier to click/tap.',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'Fitts\'s Law states that the time to reach a target is a function of the distance to and size of the target. Larger targets reduce acquisition time.',
      },
    ],
  },
]

// ─── VIRTUAL LABS ─────────────────────────────────────────────────────────────
export const VIRTUAL_LABS = [
  {
    id: 'l1', title: 'Build a REST API with Node.js', domain: 'cs',
    type: 'coding', icon: '🖥️',
    objective: 'Create a fully functional REST API with Express, implement CRUD operations, and connect to a mock database.',
    duration: '60 min', difficulty: 'Intermediate', completions: 12400,
    steps: ['Setup Express server', 'Define routes', 'Implement CRUD handlers', 'Add middleware', 'Test with Postman'],
    technologies: ['Node.js', 'Express', 'REST'],
  },
  {
    id: 'l2', title: 'Exploratory Data Analysis with Python', domain: 'ds',
    type: 'notebook', icon: '📓',
    objective: 'Analyze a real-world dataset using pandas, identify patterns, handle missing values, and create visualizations.',
    duration: '45 min', difficulty: 'Intermediate', completions: 9800,
    steps: ['Load dataset', 'Summary statistics', 'Handle missing data', 'Visualize distributions', 'Correlation analysis'],
    technologies: ['Python', 'pandas', 'matplotlib', 'seaborn'],
  },
  {
    id: 'l3', title: 'DC Circuit Analysis Lab', domain: 'ee',
    type: 'simulation', icon: '⚡',
    objective: 'Build and analyze series/parallel circuits. Apply Kirchhoff\'s laws and verify Ohm\'s law experimentally.',
    duration: '30 min', difficulty: 'Beginner', completions: 5600,
    steps: ["Build series circuit", "Measure voltage drops", "Build parallel circuit", "Apply KVL/KCL", "Verify calculations"],
    technologies: ['Falstad Simulator', 'Circuit Analysis'],
  },
  {
    id: 'l4', title: 'DNA Sequence Alignment', domain: 'bio',
    type: 'simulation', icon: '🧬',
    objective: 'Use Needleman-Wunsch and Smith-Waterman algorithms to align DNA sequences and interpret biological significance.',
    duration: '40 min', difficulty: 'Advanced', completions: 3200,
    steps: ['Input sequences', 'Global alignment', 'Local alignment', 'Score matrix', 'Interpret results'],
    technologies: ['Bioinformatics', 'Python', 'Biopython'],
  },
  {
    id: 'l5', title: 'Interactive Graphing: Calculus Concepts', domain: 'math',
    type: 'simulation', icon: '∫',
    objective: 'Visualize limits, derivatives, and integrals interactively. Connect symbolic calculus to geometric intuition.',
    duration: '25 min', difficulty: 'Beginner', completions: 18700,
    steps: ['Plot functions', 'Explore limits', 'Tangent lines', 'Area under curve', 'Fundamental theorem'],
    technologies: ['Desmos', 'GeoGebra'],
  },
  {
    id: 'l6', title: 'Titration Simulation Lab', domain: 'chem',
    type: 'simulation', icon: '🧪',
    objective: 'Perform acid-base titrations virtually. Calculate molarity, identify equivalence points, and plot titration curves.',
    duration: '35 min', difficulty: 'Intermediate', completions: 4100,
    steps: ['Setup burette', 'Perform titration', 'Record pH readings', 'Plot curve', 'Calculate concentration'],
    technologies: ['PhET Simulations', 'Virtual Lab'],
  },
  {
    id: 'l7', title: 'Build a Neural Network from Scratch', domain: 'cs',
    type: 'coding', icon: '🤖',
    objective: 'Implement a 2-layer neural network in pure Python — forward pass, backpropagation, and gradient descent.',
    duration: '90 min', difficulty: 'Advanced', completions: 6700,
    steps: ['Initialize weights', 'Forward propagation', 'Loss function', 'Backpropagation', 'Train on dataset'],
    technologies: ['Python', 'NumPy', 'Deep Learning'],
  },
  {
    id: 'l8', title: 'UX Wireframing: Mobile App', domain: 'design',
    type: 'design', icon: '🎨',
    objective: 'Design a complete user flow for a food delivery mobile app from user journey map to clickable wireframe.',
    duration: '50 min', difficulty: 'Beginner', completions: 7800,
    steps: ['User journey map', 'Information architecture', 'Low-fi sketches', 'Digital wireframes', 'Prototype links'],
    technologies: ['Figma', 'UX Design'],
  },
]

// ─── NEWSLETTER ISSUES ────────────────────────────────────────────────────────
export const NEWSLETTER_PREVIEW = {
  issue: 47,
  date: '2026-05-12',
  spotlight: {
    major: 'Data Science',
    resources: [
      'New: Stanford CS229 2025 lecture notes released',
      'DeepLearning.AI drops free short course on multimodal models',
    ],
  },
  toolOfWeek: { name: 'Julius AI', category: 'Data Analysis', teaser: 'Upload a CSV, ask questions in plain English.' },
  communityHighlights: [
    '"How I passed Linear Algebra with MIT OpenCourseWare" — 312 upvotes',
    '"Sharing my financial modeling template (Excel + Python)" — 156 upvotes',
  ],
}

// ─── PARTNERS ────────────────────────────────────────────────────────────────
export const PARTNERS = [
  { name: 'BUET',                   abbr: 'BUET' },
  { name: 'BRAC University',        abbr: 'BRAC U' },
  { name: 'University of Dhaka',    abbr: 'DU' },
  { name: 'North South University', abbr: 'NSU' },
  { name: '10 Minute School',       abbr: '10MS' },
  { name: 'Shikho',                 abbr: 'Shikho' },
  { name: 'Coursera',               abbr: 'Coursera' },
  { name: 'freeCodeCamp',           abbr: 'fCC' },
]
