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
