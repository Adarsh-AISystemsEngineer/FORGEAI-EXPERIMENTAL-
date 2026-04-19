<div align="center">

### `Build it. Forge it. Free it.`

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-orange.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Status](https://img.shields.io/badge/Status-Experimental-red.svg)]()
[![Platform](https://img.shields.io/badge/Platform-Web_•_Android_•_iOS_•_Desktop-black.svg)]()
[![Made with](https://img.shields.io/badge/Made_with-Linux_•_Python_•_Next.js-orange.svg)]()

</div>

---

```bash
$ ./forgeai --init

  ███████╗ ██████╗ ██████╗  ██████╗ ███████╗ █████╗ ██╗
  ██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝██╔══██╗██║
  █████╗  ██║   ██║██████╔╝██║  ███╗█████╗  ███████║██║
  ██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  ██╔══██║██║
  ██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗██║  ██║██║
  ╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝

  [FORGE] Platform     → Initializing...         ✓
  [FORGE] AI Engine    → GTX 1650 · CUDA 13.0    ✓
  [FORGE] Stack        → Next.js · FastAPI        ✓
  [FORGE] License      → AGPL v3                 ✓
  [FORGE] Mission      → Democratize AI          ✓
  ─────────────────────────────────────────────────────
  [FORGE] Status       → forge begins. 🔥
```

---

## 🔥 What is ForgeAI?

> **ForgeAI is the open source AI tools platform.**  
> One app. Every AI tool. Built by everyone. Free for everyone.

Right now AI is fragmented:

- 10 different apps for 10 different tasks
- Expensive subscriptions for basic tools
- Closed source — you can't audit what runs on your machine
- Built for corporations, not people

**ForgeAI changes this.**

Think of electricity. Before it, every factory ran its own generator. After it — one grid, everyone connects, civilization advances. **ForgeAI is that grid for AI.**

---

## ⚒️ The Blacksmith Philosophy

```
A blacksmith takes raw material.
Heats it. Shapes it. Strengthens it.
Creates tools that last generations.
Built by skilled hands, not factories.

ForgeAI takes raw code.
Shapes it into AI tools.
Distributes tools that empower people.
Built by the community, not corporations.
```

---

## 🎯 Vision

```
TODAY  →  Everyone is learning AI
          Tools are fragmented and expensive
          Ordinary people are locked out

TOMORROW → AI becomes a necessity like electricity
           One platform provides everything
           IoT · Drones · Gaming · Editing · Education
           Free. Open. Trusted. Yours.
```

**We are the bridge that connects developers and people.**

---

## 🛠️ Tool Categories

| Category                | Examples                                 |
| ----------------------- | ---------------------------------------- |
| 🏠 **Smart Home / IoT** | Climate control, automation, sensors     |
| 🎮 **Gaming**           | Real-time assistant, coaching, analysis  |
| 🌐 **Language**         | Translation, accessibility, voice assist |
| 📁 **Productivity**     | File transfer, automation, organization  |
| 🎬 **Creative**         | Video editing, image generation, audio   |
| 📚 **Education**        | Tutoring, language learning, research    |
| 🔧 **Developer**        | Code assist, debugging, documentation    |
| 🤖 **Automation**       | Workflows, scheduling, task management   |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                  CLIENT LAYER                   │
│         Web · Android · iOS · Desktop           │
│              (Next.js + Flutter)                │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────┐
│                 API GATEWAY                     │
│          Auth · Rate Limiting · Routing         │
│                  (FastAPI)                      │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────┐
│              TOOL RUNTIME ENGINE                │
│         Sandbox · Permissions · Monitor         │
│                  (Docker)                       │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────┐
│               TOOL REGISTRY                     │
│          Store · Review · Versioning            │
│               (PostgreSQL)                      │
└─────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
ForgeAI/
├── platform/          # Next.js web application
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── lib/           # Utilities and helpers
│       ├── hooks/         # Custom React hooks
│       └── types/         # TypeScript definitions
├── backend/           # FastAPI Python backend
│   └── main.py            # API entry point
├── tools/             # AI tool registry
│   └── tool-manifest.json # Tool standard template
├── sandbox/           # Sandboxing engine
└── docs/              # Documentation
```

---

## 🔒 Security Model

Every tool on ForgeAI must declare its permissions upfront — like a passport:

```json
{
  "name": "your-tool",
  "permissions": [],
  "sandbox": {
    "network": false,
    "filesystem": false,
    "microphone": false,
    "camera": false,
    "background": false,
    "max_memory_mb": 256,
    "max_cpu_percent": 25
  }
}
```

**Security layers:**

```
Layer 1 → Static code analysis (automated scanning)
Layer 2 → Sandboxed execution (Docker isolation)
Layer 3 → Permission manifest (declared before install)
Layer 4 → Community audit (open source = public scrutiny)
Layer 5 → Runtime monitoring (flag abnormal behavior)
Layer 6 → Kill switch (platform terminates any tool)
```

Open source is our security model. **10,000 eyes find bugs faster than any closed team.**

---

## 🚀 Getting Started

### Prerequisites

```bash
# Required
Node.js 20+
Python 3.11+
Docker
Git
```

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/FORGEAI-EXPERIMENTAL.git
cd FORGEAI-EXPERIMENTAL

# Frontend setup
cd platform
npm install
npm run dev

# Backend setup (new terminal)
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

### Verify setup

```bash
# Frontend running at
http://localhost:3000

# Backend running at
http://localhost:8000

# API docs at
http://localhost:8000/docs
```

---

## 🛠️ Tech Stack

| Layer        | Technology           | Why                                       |
| ------------ | -------------------- | ----------------------------------------- |
| **Frontend** | Next.js + TypeScript | Cross-platform, fast, scalable            |
| **Styling**  | Tailwind CSS         | Utility-first, consistent                 |
| **Backend**  | FastAPI (Python)     | AI-native, async, fast                    |
| **AI/ML**    | PyTorch + CUDA       | GPU accelerated, industry standard        |
| **Database** | PostgreSQL           | Reliable, open source                     |
| **Sandbox**  | Docker               | Isolated, secure, standard                |
| **Mobile**   | Flutter              | One codebase, all platforms               |
| **OS**       | Ubuntu 24.04 LTS     | Stable, NVIDIA support, industry standard |

---

## 🗺️ Roadmap

```
Phase 1 — Foundation (Current)
  ☐ Platform architecture
  ☐ Frontend shell (Next.js)
  ☐ Basic backend (FastAPI)
  ☐ Tool manifest standard
  ☐ First internal tool

Phase 2 — Mobile
  ☐ Flutter Android app
  ☐ iOS app
  ☐ Tool permission UI
  ☐ Push notifications

Phase 3 — Runtime Engine
  ☐ Docker sandbox
  ☐ Security scanning
  ☐ Developer SDK
  ☐ IoT device support

Phase 4 — Open Platform
  ☐ Public developer program
  ☐ Revenue share model
  ☐ Enterprise tier
  ☐ Hardware partnerships
```

---

## 🤝 Contributing

ForgeAI is built by the community for the community.

**Before submitting a tool:**

- [ ] Tool manifest included with all permissions declared
- [ ] README with clear documentation
- [ ] Sandbox tested locally
- [ ] No hardcoded credentials or API keys
- [ ] SECURITY.md with known limitations
- [ ] Code is readable and commented

**Security Policy:** If you find a vulnerability, open a private issue. Don't exploit it. We're all building this together.

---

## 📜 License

```
ForgeAI is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, version 3.

This means:
  ✓ Use it for anything
  ✓ Modify it freely
  ✓ Distribute your changes
  ✓ Run it as a service
  ✗ Cannot close source it
  ✗ Cannot remove this license
  ✗ Corporate forks must stay open
```

**AGPL v3** — Because AI tools that empower people should stay free. Forever.

---

## 💬 Philosophy

```
"It's about impact over money."

Right now AI is owned by OpenAI, Google, Microsoft.
Tomorrow AI should be owned by a farmer in Kerala,
a student in Nigeria, a mechanic in Brazil,
a nurse in Vietnam.

ForgeAI makes that possible.
That's not a startup. That's a movement.
```

---

<div align="center">

```
    ⚒️  F O R G E A I  ⚒️

    Build it. Forge it. Free it.

    One platform. Every AI tool.
    Built by everyone. Free for everyone.
```

**[Website](#) · [Docs](#) · [Discord](#) · [Contribute](#)**

_ForgeAI is experimental. Everything here is being actively built._  
_If you believe in democratizing AI — you're in the right place._

</div>
