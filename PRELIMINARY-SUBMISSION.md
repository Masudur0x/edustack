# EduStack — 1-Page Project Summary
**Infinity AI BuildFest 2026 · Track: EdTech (Personalized, Adaptive AI Learning)**

**Team:** [Team name] · **Members:** [Leader], [Business/Data Analyst], [Frontend], [Backend], [Comms Lead] · **NRB / Global advisor:** [Name, country]

---

### Problem
Bangladeshi students drown in free learning content but starve for direction. A second-year CSE student keeps a dozen tabs open across MIT, Coursera, YouTube and freeCodeCamp with no order and no path. Private coaching costs ~৳30,000/month — out of reach for most. The same gap hits HSC aspirants outside the coaching circuit and working adults switching into tech. **Target users:** university students, HSC/admission seekers, and career switchers in Bangladesh, with a model that generalizes to any emerging market.

### Solution
**EduStack** is an adaptive AI study partner. A student answers five questions; EduStack pulls the best free courses, certifications and labs from across the web and orders them for their major, level and goal — then **re-ranks the path every week** as quizzes reveal gaps. Not another course library: a path that adapts to the learner.

### AI-Native Approach
- **LLM reasoning (LIVE):** Claude, via OpenRouter, reads each student's profile and writes the personalized rationale behind every recommendation — explainable, not a black box.
- **Explainable ranking engine (LIVE):** a transparent, weighted model orders resources by major, level, goal and quiz performance; every result carries a reason.
- **RAG (NEXT BUILD):** retrieval over a corpus of real, scraped free-course data (MIT, Coursera, edX, 10 Minute School) to keep recommendations current and grounded.
- **Graph reasoning (NEXT BUILD):** a knowledge graph mapping course ↔ curriculum ↔ prerequisite to sequence the path correctly.
- **System flow:** Input (profile + quiz scores) → AI (rank · reason · retrieve · sequence) → Output (ordered, re-ranking path).
- **Stack:** Cursor + Claude Code (built), LLMs via OpenRouter, React/Vite frontend, cloud-ready.

### Prototype & Feasibility (working today)
A functional React app demonstrates the full experience layer: 1-minute onboarding → personalized feed → **adaptive quiz loop** (a low score moves foundational content to the top of the feed) → **live LLM-generated reasons** on each card → progress dashboard (Explorer → Expert). This proves we can execute; the AI architecture above is the production path.

### Localization
Full **English ⇄ বাংলা** interface, built for low-bandwidth use — designed for the Bangladeshi context from day one.

### Impact & KPIs (Year 1 targets)
- Cut **time-to-first-skill** from months of aimless searching to **one week** on a guided path.
- **10,000 students** on personalized paths in Year 1 — free.
- Addressable base: **4M+ tertiary students** in Bangladesh plus one of the world's largest youth freelancing workforces.

### Responsible AI
Recommendations are **explainable and documented**; content is legally sourced / openly licensed; recommendation quality and bias are reviewed as the corpus grows.

### Roadmap to BuildFest
Ship the live **RAG engine** and a **Bangla AI tutor**, add the knowledge graph, and harden the personalization workflow into a production, cloud-deployed system.

> *Vibe to production — built in Bangladesh, for the world.*
