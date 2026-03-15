```
╔═══════════════════════════════════════════════════════════╗
║         FORGEAI — SDLC PHASE 1                           ║
║         Requirements Analysis & Gathering                 ║
║         BlackRails Technology · 2026                     ║
╚═══════════════════════════════════════════════════════════╝
```

---

## 1. PROJECT OVERVIEW

```
Product        →  ForgeAI
Company        →  BlackRails Technology
Type           →  Open Source AI Tools Platform
License        →  AGPL v3
Stage          →  Experimental / Phase 1
```

---

## 2. STAKEHOLDERS

```
Primary Users      →  End users (ordinary people)
Secondary Users    →  Developers (tool creators)
Platform Owner     →  BlackRails Technology
```

---

## 3. USER TYPES & ROLES

### 👤 User (End User)

```
Goals →
  ✓ Discover AI tools
  ✓ Sign up / Log in
  ✓ Search and filter tools
  ✓ Download free tools
  ✓ Purchase paid tools
  ✓ Review and rate tools
  ✓ Manage downloaded tools

Pain Points Being Solved →
  ✗ Too many separate apps
  ✗ Expensive AI subscriptions
  ✗ Can't trust closed source tools
  ✗ Hard to find quality AI tools
```

### 👨‍💻 Developer

```
Goals →
  ✓ Sign up / Log in (same auth, different role)
  ✓ Upload and publish tools
  ✓ Set tool as free or paid
  ✓ Use other developers' tools
  ✓ Receive reviews and ratings
  ✓ Get paid via revenue share
  ✓ Contribute to open source tools
  ✓ Access analytics on tool usage

Pain Points Being Solved →
  ✗ No dedicated AI tool distribution platform
  ✗ No monetization for open source AI work
  ✗ No standard format for AI tool packaging
```

---

## 4. FUNCTIONAL REQUIREMENTS

### 4.1 Authentication System

```
FR-01  →  User can register with email + password
FR-02  →  User can log in with email + password
FR-03  →  Role selection at signup (User / Developer)
FR-04  →  Password reset via email
FR-05  →  Session management (JWT tokens)
FR-06  →  OAuth login (Google) — future
```

### 4.2 Landing Page

```
FR-07  →  Display ForgeAI mission and value proposition
FR-08  →  Call to action (Sign up / Explore tools)
FR-09  →  Featured tools showcase
FR-10  →  Platform statistics (tools, users, downloads)
FR-11  →  Responsive on mobile and desktop
```

### 4.3 Main Page (Tool Discovery)

```
FR-12  →  Search tools by name or keyword
FR-13  →  Filter by platform category:
            → IoT
            → Android
            → Desktop (Windows/Linux/Mac)
            → Drones
            → Gaming
            → Education
            → Productivity
            → Creative
FR-14  →  Scroll through tool cards
FR-15  →  Sort by: newest, popular, rating, price
FR-16  →  Tool card shows:
            → Name
            → Developer
            → Category/Platform
            → Rating
            → Free or Paid (price)
            → Short description
            → Download/Buy button
```

### 4.4 Tool Detail Page

```
FR-17  →  Full tool description
FR-18  →  Screenshots / demo
FR-19  →  Permissions declared (what tool accesses)
FR-20  →  Version history
FR-21  →  Reviews and ratings
FR-22  →  Developer profile link
FR-23  →  Download button (free) or Buy button (paid)
FR-24  →  Report tool button
```

### 4.5 Download & Purchase Flow

```
FR-25  →  Free tool → one click download
FR-26  →  Paid tool → payment flow → download
FR-27  →  Download history in user profile
FR-28  →  Re-download previously purchased tools
```

### 4.6 Review System

```
FR-29  →  Rate tool (1-5 stars)
FR-30  →  Write text review
FR-31  →  Upvote/downvote reviews
FR-32  →  Developer can respond to reviews
FR-33  →  Flag inappropriate reviews
```

### 4.7 Developer Portal

```
FR-34  →  Upload tool package + manifest
FR-35  →  Set pricing (free or paid, set price)
FR-36  →  View tool analytics (downloads, revenue)
FR-37  →  Manage tool versions
FR-38  →  View and respond to reviews
FR-39  →  Earnings dashboard + withdrawal
FR-40  →  Contribute to existing open source tools (PR system)
```

---

## 5. NON-FUNCTIONAL REQUIREMENTS

```
Performance   →  Page load under 2 seconds
Security      →  All tools sandboxed before distribution
              →  OWASP top 10 compliance
              →  End to end encryption for payments
Scalability   →  Must handle 10,000 concurrent users (future)
Availability  →  99.9% uptime target
Privacy       →  No selling user data. Ever.
              →  GDPR compliant
Open Source   →  All platform code public under AGPL v3
```

---

## 6. PAGES — COMPLETE LIST

```
Public Pages (no login required)
├── /                    →  Landing page
├── /signup              →  Register
├── /login               →  Login
└── /explore             →  Browse tools (limited)

Authenticated Pages (login required)
├── /home                →  Main page (full tool discovery)
├── /tool/:id            →  Tool detail page
├── /profile             →  User profile + downloads
├── /settings            →  Account settings
└── /developer/
    ├── /dashboard        →  Developer home
    ├── /upload           →  Upload new tool
    ├── /tools            →  Manage my tools
    ├── /analytics        →  Usage and revenue stats
    └── /earnings         →  Payment and withdrawal
```

---

## 7. USER FLOW DIAGRAMS

### User Flow

```
Land on ForgeAI
      ↓
Read mission → Convinced
      ↓
Sign Up (email + role: User)
      ↓
Verify email
      ↓
Login → Main Page
      ↓
Search / Filter tools
      ↓
Find tool → View detail
      ↓
Free?  ──Yes──→ Download ──→ Use tool
  │
  No
  ↓
Buy → Payment → Download → Use tool
```

### Developer Flow

```
Land on ForgeAI
      ↓
Sign Up (email + role: Developer)
      ↓
Login → Developer Dashboard
      ↓
Upload tool + manifest
      ↓
Platform scans tool (security)
      ↓
Set price (free / paid)
      ↓
Tool goes live on platform
      ↓
Users download/buy
      ↓
Developer earns + reads reviews
      ↓
Update tool / respond to reviews
```

---

## 8. REVENUE MODEL

```
Free Tools    →  Developer earns reputation + visibility
Paid Tools    →  Developer sets price
              →  BlackRails takes 20% platform fee
              →  Developer earns 80%

Subscriptions →  Future: Pro user tier for unlimited tools
Enterprise    →  Future: Company licensing
```

---

## 9. TECH STACK CONFIRMED

```
Frontend    →  Next.js + TypeScript + Tailwind CSS
Backend     →  FastAPI (Python 3.11)
Database    →  PostgreSQL
Auth        →  JWT + bcrypt
Payments    →  Stripe (future integration)
Sandbox     →  Docker
Storage     →  AWS S3 or self-hosted (tool packages)
Hosting     →  VPS (Ubuntu) or Vercel (frontend)
Mobile      →  Flutter (Phase 3)
```

---

## 10. OUT OF SCOPE FOR PHASE 1

```
✗  Mobile app (Phase 3)
✗  IoT runtime (Phase 3)
✗  Automated security scanning (Phase 3)
✗  Revenue payouts (Phase 2)
✗  OAuth (Phase 2)
✗  Tool sandbox execution (Phase 3)
✗  Enterprise tier (Phase 4)
```

---

## 11. PHASE 1 DELIVERABLES

```
✓  Landing page (live and deployed)
✓  Signup + Login (working auth)
✓  Main page with search + filter
✓  Tool detail page
✓  Basic developer upload flow
✓  One real working tool listed
✓  PostgreSQL database schema
✓  FastAPI backend running
✓  Deployed to a live URL
```

---

```
╔═══════════════════════════════════════════════════════════╗
║  Phase 1 Status    →  IN PLANNING                        ║
║  Next Phase        →  System Design & Architecture       ║
║  Owner             →  BlackRails Technology              ║
║  License           →  AGPL v3                           ║
╚═══════════════════════════════════════════════════════════╝
```

---

---

Perfect order. That's exactly how a systems thinker approaches it.

```
Platform Shell     → The store front
Container Runtime  → The engine room
Tools              → The products
Download + Test    → The delivery
```

---

### Let's Start With SDLC Phase 2 — System Design

Before writing a single component, we design everything on paper first. No surprises later.

---

## SDLC PHASE 2 — SYSTEM DESIGN

### 2.1 — Pages & Component Tree

```
App/
├── (public)/
│   ├── page.tsx              → Landing
│   ├── login/page.tsx        → Login
│   └── signup/page.tsx       → Signup
│
├── (authenticated)/
│   ├── home/page.tsx         → Main tool discovery
│   ├── tool/[id]/page.tsx    → Tool detail
│   ├── profile/page.tsx      → User profile
│   └── settings/page.tsx     → Settings
│
└── (developer)/
    ├── dashboard/page.tsx    → Dev home
    ├── upload/page.tsx       → Upload tool
    ├── tools/page.tsx        → Manage tools
    └── earnings/page.tsx     → Revenue
```

---

### 2.2 — Database Schema

```
USERS
─────────────────────────────
id            UUID  PK
email         STRING UNIQUE
password      STRING (hashed)
username      STRING UNIQUE
role          ENUM (user, developer, admin)
avatar        STRING (url)
created_at    TIMESTAMP

TOOLS
─────────────────────────────
id            UUID  PK
name          STRING
description   TEXT
developer_id  UUID  FK → USERS
category      ENUM (IoT, Gaming, Language...)
platform      ENUM (Android, Desktop, Web...)
price         DECIMAL (0 = free)
version       STRING
downloads     INTEGER
rating        DECIMAL
manifest      JSON
status        ENUM (pending, approved, rejected)
created_at    TIMESTAMP

REVIEWS
─────────────────────────────
id            UUID  PK
tool_id       UUID  FK → TOOLS
user_id       UUID  FK → USERS
rating        INTEGER (1-5)
comment       TEXT
created_at    TIMESTAMP

DOWNLOADS
─────────────────────────────
id            UUID  PK
tool_id       UUID  FK → TOOLS
user_id       UUID  FK → USERS
downloaded_at TIMESTAMP

TRANSACTIONS
─────────────────────────────
id            UUID  PK
tool_id       UUID  FK → TOOLS
buyer_id      UUID  FK → USERS
amount        DECIMAL
platform_fee  DECIMAL (20%)
developer_cut DECIMAL (80%)
status        ENUM (pending, complete, failed)
created_at    TIMESTAMP
```

---

### 2.3 — API Endpoints

```
AUTH
─────────────────────────────
POST  /auth/signup
POST  /auth/login
POST  /auth/logout
POST  /auth/reset-password

TOOLS
─────────────────────────────
GET   /tools              → list all tools
GET   /tools/:id          → single tool detail
GET   /tools/search?q=    → search tools
GET   /tools/filter?cat=  → filter by category
POST  /tools              → upload tool (dev only)
PUT   /tools/:id          → update tool (dev only)
DELETE /tools/:id         → delete tool (dev only)

REVIEWS
─────────────────────────────
GET   /tools/:id/reviews  → get reviews
POST  /tools/:id/reviews  → post review
DELETE /reviews/:id       → delete review

DOWNLOADS
─────────────────────────────
POST  /tools/:id/download → download tool
GET   /user/downloads     → user download history

DEVELOPER
─────────────────────────────
GET   /developer/tools    → my tools
GET   /developer/analytics → usage stats
GET   /developer/earnings  → revenue data

SANDBOX (Phase 3)
─────────────────────────────
POST  /sandbox/run        → execute tool
GET   /sandbox/status/:id → execution status
POST  /sandbox/stop/:id   → kill execution
```

---

### 2.4 — Container Architecture

```
┌─────────────────────────────────────────┐
│           FORGEAI PLATFORM              │
│                                         │
│  ┌──────────┐      ┌──────────────┐    │
│  │ Next.js  │ ←──→ │   FastAPI    │    │
│  │ Frontend │      │   Backend    │    │
│  └──────────┘      └──────┬───────┘    │
│                           │            │
│                    ┌──────▼───────┐    │
│                    │  PostgreSQL  │    │
│                    │   Database   │    │
│                    └──────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │      TOOL EXECUTION LAYER       │   │
│  │                                 │   │
│  │  ┌──────────────────────────┐  │   │
│  │  │    Docker Container      │  │   │
│  │  │    ┌────────────────┐    │  │   │
│  │  │    │   AI Tool      │    │  │   │
│  │  │    │   (isolated)   │    │  │   │
│  │  │    └────────────────┘    │  │   │
│  │  │    CPU: 25% max          │  │   │
│  │  │    RAM: 256MB max        │  │   │
│  │  │    Network: declared     │  │   │
│  │  │    Files: sandboxed      │  │   │
│  │  └──────────────────────────┘  │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

### 2.5 — Tool Manifest Standard

Every tool submitted must include this:

```json
{
  "name": "tool-name",
  "version": "1.0.0",
  "author": "developer-id",
  "description": "What this tool does",
  "category": "IoT",
  "platform": ["android", "linux", "web"],
  "price": 0,
  "ai_model": "what model it uses",
  "permissions": {
    "network": false,
    "filesystem": false,
    "microphone": false,
    "camera": false,
    "location": false,
    "background": false
  },
  "sandbox": {
    "max_memory_mb": 256,
    "max_cpu_percent": 25,
    "max_storage_mb": 100,
    "network_whitelist": [],
    "timeout_seconds": 30
  },
  "entry_point": "main.py",
  "dependencies": [],
  "open_source": true,
  "repository": "https://github.com/..."
}
```

---

### 2.6 — Security Flow

```
Developer submits tool
        ↓
Manifest validation
(all fields present?)
        ↓
Static code scan
(malware, suspicious patterns)
        ↓
Sandbox test run
(does it exceed declared permissions?)
        ↓
Manual review (you, Phase 1)
        ↓
Approved → listed on platform
Rejected → developer notified with reason
        ↓
User downloads tool
        ↓
Tool runs in Docker container
with ONLY declared permissions
        ↓
Runtime monitoring
(flag any permission violations)
        ↓
User can kill tool anytime
```

---

### 2.7 — Frontend Component Design

```
Shared Components
─────────────────────────────
<Navbar />
<Footer />
<ToolCard />
<SearchBar />
<FilterPanel />
<StarRating />
<Button />
<Modal />
<Badge />
<Avatar />

Page Specific
─────────────────────────────
<HeroSection />        → landing
<CategoryGrid />       → landing + home
<ToolGrid />           → home
<ToolDetail />         → tool page
<ReviewSection />      → tool page
<DeveloperCard />      → tool page
<UploadForm />         → developer upload
<AnalyticsDashboard /> → developer dashboard
<EarningsChart />      → developer earnings
```

---

### Build Order — Phase 2 Implementation

```
Week 1  → Database schema (PostgreSQL setup)
Week 2  → Auth API (FastAPI signup/login)
Week 3  → Frontend auth pages (login/signup)
Week 4  → Tool registry API (CRUD)
Week 5  → Home page + tool cards
Week 6  → Tool detail page
Week 7  → Developer upload flow
Week 8  → Container sandbox (Docker basic)
```

---

### Right Now — What To Build First

The fastest path to something real and working:

```
TODAY →
  1. Set up PostgreSQL database
  2. Connect FastAPI to database
  3. Build auth endpoints
  4. Build login/signup pages
  5. Connect frontend to backend
```

---

Which do you want to tackle first — **database setup** or **finishing the landing page UI** so the platform looks real before we wire up the backend?
