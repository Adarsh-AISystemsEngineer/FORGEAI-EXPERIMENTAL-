┌─────────────────────────────────────────────┐
│ FORGEAI AGENT SYSTEM │
│ │
│ ┌─────────────────────────────────────┐ │
│ │ ORCHESTRATOR AGENT │ │
│ │ Coordinates all other agents │ │
│ │ Decides what needs attention │ │
│ │ Escalates to human when needed │ │
│ └──────────────┬──────────────────────┘ │
│ │ │
│ ┌────────────┼────────────┐ │
│ ▼ ▼ ▼ │
│ ┌──────┐ ┌──────────┐ ┌────────┐ │
│ │VERIFY│ │ CI/CD │ │ AUDIT │ │
│ │AGENT │ │ AGENT │ │ AGENT │ │
│ └──────┘ └──────────┘ └────────┘ │
│ ▼ ▼ ▼ │
│ ┌──────┐ ┌──────────┐ ┌────────┐ │
│ │ TEST │ │ MONITOR │ │CREATOR │ │
│ │AGENT │ │ AGENT │ │ AGENT │ │
│ └──────┘ └──────────┘ └────────┘ │
└─────────────────────────────────────────────┘
