"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  {
    number: "01",
    title: "Fork the Repository",
    description:
      "Fork the BlackRails ForgeAI repository to your GitHub account",
    code: "https://github.com/Adarsh-AISystemsEngineer/FORGEAI-EXPERIMENTAL-.git",
    action: "Fork on GitHub →",
    link: "https://github.com/Adarsh-AISystemsEngineer/FORGEAI-EXPERIMENTAL-.git",
  },
  {
    number: "02",
    title: "Clone Your Fork",
    description: "Clone the forked repository to your local machine",
    code: "git clone git@github.com:YOUR_USERNAME/forgeai.git\ncd forgeai/tools",
    action: null,
    link: null,
  },
  {
    number: "03",
    title: "Create Your Tool Folder",
    description:
      "Create a folder with your tool name inside the tools/ directory",
    code: "mkdir my-ai-tool\ncd my-ai-tool",
    action: null,
    link: null,
  },
  {
    number: "04",
    title: "Add Required Files",
    description: "Every tool must have these 4 files. No exceptions.",
    code: "manifest.json\nmain.py\nrequirements.txt\nREADME.md",
    action: null,
    link: null,
  },
  {
    number: "05",
    title: "Push and Open PR",
    description: "Push your tool and open a Pull Request to the main repo",
    code: 'git add .\ngit commit -m "add: my-ai-tool"\ngit push\n# Then open PR on GitHub',
    action: null,
    link: null,
  },
  {
    number: "06",
    title: "Verification Runs",
    description:
      "Our automated agent verifies your tool. If it passes, an admin reviews and approves.",
    code: "[FORGE] Manifest check     → ✓\n[FORGE] Security scan      → ✓\n[FORGE] Dependency audit   → ✓\n[FORGE] Sandbox test       → ✓\n[FORGE] Status → APPROVED",
    action: null,
    link: null,
  },
];

const MANIFEST_TEMPLATE = `{
  "forge_version": "1.0",
  "name": "your-tool-name",
  "display_name": "Your Tool Name",
  "version": "1.0.0",
  "author": "your-github-username",
  "description": "What your tool does",
  "category": "productivity",
  "platforms": ["web", "desktop", "linux"],
  "entry_point": "main.py",
  "runtime": "python3.11",
  "permissions": {
    "network": false,
    "filesystem": false,
    "microphone": false,
    "camera": false,
    "background": false
  },
  "sandbox": {
    "max_memory_mb": 256,
    "max_cpu_percent": 25,
    "timeout_seconds": 30
  },
  "ui": {
    "inputs": [
      {
        "id": "text",
        "type": "textarea",
        "label": "Input label",
        "placeholder": "Placeholder text"
      }
    ],
    "outputs": [
      {
        "id": "result",
        "type": "markdown",
        "label": "Result"
      }
    ]
  },
  "open_source": true,
  "repository": "https://github.com/your-username/your-tool",
  "license": "AGPL-3.0"
}`;

const MAIN_TEMPLATE = `from forgeai_sdk import ForgeApp

app = ForgeApp()

@app.on_input
def handle(ctx):
    # Get user input
    text = ctx.input.get("text")

    # Use AI
    result = ctx.ai.generate(
        prompt=f"Process this: {text}",
        model="ollama/llama3"
    )

    # Send output to UI
    ctx.output.send("result", result)

if __name__ == "__main__":
    app.run()`;

export default function UploadToolPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"guide" | "manifest" | "example">(
    "guide",
  );
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      router.push("/login");
      return;
    }

    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      if (parsed.role === "user") {
        router.push("/developer");
        return;
      }
    }

    setLoading(false);
  }, [router]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <p className="text-orange-500 text-sm animate-pulse">
          [FORGE] Loading...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white font-mono">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-orange-500/30 sticky top-0 bg-black/95 backdrop-blur z-50">
        <Link href="/home" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="forgeai"
            width={36}
            height={36}
            className="object-contain invert"
          />
          <span className="text-orange-500 font-bold text-lg tracking-widest">
            FORGEAI
          </span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/developer"
            className="text-gray-400 hover:text-orange-500 transition-colors"
          >
            ← Dashboard
          </Link>
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-black font-black text-sm">
            {user?.username?.[0]?.toUpperCase() || "D"}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs text-orange-500 tracking-widest mb-1">
            [FORGE] Contribute a Tool
          </p>
          <h1 className="text-3xl font-black">
            Publish via <span className="text-orange-500">GitHub</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            All tools live in the open source repo. Fork, build, PR. That's it.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-orange-500/20">
          {(["guide", "manifest", "example"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-bold transition-colors capitalize ${
                activeTab === tab
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab === "guide"
                ? "📖 Step by Step"
                : tab === "manifest"
                  ? "📋 manifest.json"
                  : "💻 main.py"}
            </button>
          ))}
        </div>

        {/* Guide Tab */}
        {activeTab === "guide" && (
          <div className="space-y-4">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="border border-orange-500/20 rounded-xl p-6 hover:border-orange-500/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="text-orange-500 font-black text-2xl min-w-[40px]">
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-black text-lg mb-1">{step.title}</h3>
                    <p className="text-gray-500 text-sm mb-3">
                      {step.description}
                    </p>
                    <div className="relative">
                      <pre className="bg-gray-950 border border-orange-500/20 rounded px-4 py-3 text-xs text-green-400 overflow-x-auto whitespace-pre-wrap">
                        {step.code}
                      </pre>
                      <button
                        onClick={() => copyToClipboard(step.code, step.number)}
                        className="absolute top-2 right-2 text-xs text-gray-600 hover:text-orange-500 transition-colors px-2 py-1 rounded border border-orange-500/20"
                      >
                        {copied === step.number ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                    {step.link && (
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 bg-orange-500 text-black font-black px-4 py-2 rounded hover:bg-orange-400 transition-colors text-xs"
                      >
                        {step.action}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Tool Standard */}
            <div className="border border-orange-500/30 rounded-xl p-6 bg-orange-500/5">
              <h3 className="font-black text-orange-500 mb-3">
                ⚒️ Tool Standard — Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-400">
                {[
                  "manifest.json with all fields",
                  "main.py as entry point",
                  "requirements.txt",
                  "README.md with documentation",
                  "AI powered at its core",
                  "Open source (AGPL v3 preferred)",
                  "No hardcoded API keys",
                  "No access beyond manifest permissions",
                  "Must run in sandbox without errors",
                  "Dependencies must be on PyPI",
                ].map((req) => (
                  <p key={req}>✓ {req}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Manifest Tab */}
        {activeTab === "manifest" && (
          <div>
            <p className="text-gray-500 text-sm mb-4">
              Copy this template and fill in your tool details. Every field is
              required.
            </p>
            <div className="relative">
              <pre className="bg-gray-950 border border-orange-500/20 rounded-xl px-6 py-5 text-xs text-green-400 overflow-x-auto whitespace-pre leading-relaxed">
                {MANIFEST_TEMPLATE}
              </pre>
              <button
                onClick={() => copyToClipboard(MANIFEST_TEMPLATE, "manifest")}
                className="absolute top-3 right-3 text-xs text-gray-600 hover:text-orange-500 transition-colors px-3 py-1.5 rounded border border-orange-500/20 bg-black"
              >
                {copied === "manifest" ? "✓ Copied!" : "Copy"}
              </button>
            </div>

            {/* Field explanations */}
            <div className="mt-6 space-y-2">
              <h3 className="font-black text-sm mb-3">Field Guide</h3>
              {[
                { field: "forge_version", desc: "Always 1.0 for now" },
                { field: "name", desc: "Lowercase, hyphens only (url-safe)" },
                {
                  field: "display_name",
                  desc: "Human readable name shown in store",
                },
                {
                  field: "category",
                  desc: "iot, gaming, language, productivity, drones, creative, education, automation, developer",
                },
                {
                  field: "permissions",
                  desc: "Only declare what you actually need. Less is more.",
                },
                {
                  field: "sandbox.max_memory_mb",
                  desc: "Max 512MB. Lower is better.",
                },
                {
                  field: "ui.inputs",
                  desc: "What the user provides to your tool",
                },
                {
                  field: "ui.outputs",
                  desc: "What your tool returns to the user",
                },
              ].map((item) => (
                <div key={item.field} className="flex gap-3 text-xs">
                  <span className="text-orange-500 font-bold min-w-[180px]">
                    {item.field}
                  </span>
                  <span className="text-gray-500">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Example Tab */}
        {activeTab === "example" && (
          <div>
            <p className="text-gray-500 text-sm mb-4">
              Copy this starter template. Replace the logic with your tool's AI
              function.
            </p>
            <div className="relative">
              <pre className="bg-gray-950 border border-orange-500/20 rounded-xl px-6 py-5 text-xs text-green-400 overflow-x-auto whitespace-pre leading-relaxed">
                {MAIN_TEMPLATE}
              </pre>
              <button
                onClick={() => copyToClipboard(MAIN_TEMPLATE, "main")}
                className="absolute top-3 right-3 text-xs text-gray-600 hover:text-orange-500 transition-colors px-3 py-1.5 rounded border border-orange-500/20 bg-black"
              >
                {copied === "main" ? "✓ Copied!" : "Copy"}
              </button>
            </div>

            {/* ctx API reference */}
            <div className="mt-6">
              <h3 className="font-black text-sm mb-3">ForgeAI SDK — ctx API</h3>
              <div className="space-y-2">
                {[
                  {
                    method: "ctx.input.get('id')",
                    desc: "Get user input by input id from manifest",
                  },
                  {
                    method: "ctx.output.send('id', value)",
                    desc: "Send output to UI by output id",
                  },
                  {
                    method: "ctx.ai.generate(prompt, model)",
                    desc: "Run AI generation via Ollama or cloud",
                  },
                  {
                    method: "ctx.ai.embed(text)",
                    desc: "Generate text embeddings",
                  },
                  {
                    method: "ctx.storage.get(key)",
                    desc: "Read from tool's sandboxed storage",
                  },
                  {
                    method: "ctx.storage.set(key, value)",
                    desc: "Write to tool's sandboxed storage",
                  },
                  {
                    method: "ctx.notify(message)",
                    desc: "Send desktop notification (if permitted)",
                  },
                ].map((item) => (
                  <div
                    key={item.method}
                    className="flex gap-3 text-xs border border-orange-500/10 rounded px-3 py-2"
                  >
                    <span className="text-orange-500 font-bold min-w-[220px] font-mono">
                      {item.method}
                    </span>
                    <span className="text-gray-500">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 border border-orange-500/30 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-black">Ready to build?</p>
            <p className="text-gray-500 text-sm">
              Fork the repo and start building your first ForgeAI tool.
            </p>
          </div>
          <a>
            href="https://github.com/BlackRails/forgeai" target="_blank"
            rel="noopener noreferrer" className="bg-orange-500 text-black
            font-black px-8 py-3 rounded hover:bg-orange-400 transition-colors
            text-sm whitespace-nowrap" FORK ON GITHUB →
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-orange-500/30 px-8 py-6 text-center text-sm text-gray-500 mt-8">
        <p>
          ⚒️ <span className="text-orange-500 font-bold">forgeai</span> · A
          BlackRails Technology Project · AGPL v3
        </p>
      </footer>
    </main>
  );
}
