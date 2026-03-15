import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-mono">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-orange-500/30">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="ForgeAI Logo"
            width={40}
            height={40}
            className="object-contain invert"
          />
          <span className="text-orange-500 font-bold text-xl tracking-widest">
            FORGEAI
          </span>
        </div>
        <div className="flex gap-6 text-sm">
          <a href="#tools" className="hover:text-orange-500 transition-colors">
            Tools
          </a>
          <a href="#about" className="hover:text-orange-500 transition-colors">
            About
          </a>
          <a href="/login" className="hover:text-orange-500 transition-colors">
            Login
          </a>
          <a
            href="/signup"
            className="bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-400 transition-colors font-bold"
          >
            Sign Up
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-8 py-32">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="ForgeAI"
          width={160}
          height={160}
          className="object-contain mb-8 drop-shadow-[0_0_30px_rgba(234,88,12,0.5)]"
        />
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          <span className="text-orange-500">FORGE</span>AI
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-2xl">
          Build it. Forge it. Free it.
        </p>

        <p className="text-gray-500 max-w-xl mb-12 leading-relaxed">
          The open source AI tools platform. One app. Every AI tool. Built by
          everyone. Free for everyone.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/signup"
            className="bg-orange-500 text-black px-8 py-4 rounded font-black text-lg hover:bg-orange-400 transition-colors tracking-wider"
          >
            START FORGING →
          </a>
          <a
            href="#tools"
            className="border border-orange-500 text-orange-500 px-8 py-4 rounded font-bold text-lg hover:bg-orange-500/10 transition-colors"
          >
            EXPLORE TOOLS
          </a>
        </div>

        {/* Terminal boot sequence */}
        <div className="mt-16 text-left bg-gray-950 border border-orange-500/30 rounded-lg p-6 max-w-lg w-full">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-sm space-y-1">
            <p>
              <span className="text-orange-500">[FORGE]</span> Platform →
              Initializing... <span className="text-green-400">✓</span>
            </p>
            <p>
              <span className="text-orange-500">[FORGE]</span> AI Engine → CUDA
              13.0 <span className="text-green-400">✓</span>
            </p>
            <p>
              <span className="text-orange-500">[FORGE]</span> Tools → Registry
              loaded <span className="text-green-400">✓</span>
            </p>
            <p>
              <span className="text-orange-500">[FORGE]</span> License → AGPL v3{" "}
              <span className="text-green-400">✓</span>
            </p>
            <p>
              <span className="text-orange-500">[FORGE]</span> Mission →
              Democratize AI <span className="text-green-400">✓</span>
            </p>
            <p className="mt-2">
              <span className="text-orange-500">[FORGE]</span> Status →{" "}
              <span className="text-orange-400">forge begins. 🔥</span>
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-orange-500/30 py-8 px-8">
        <div className="flex flex-wrap justify-center gap-12 text-center">
          <div>
            <p className="text-3xl font-black text-orange-500">0</p>
            <p className="text-gray-500 text-sm mt-1">Tools Available</p>
          </div>
          <div>
            <p className="text-3xl font-black text-orange-500">0</p>
            <p className="text-gray-500 text-sm mt-1">Developers</p>
          </div>
          <div>
            <p className="text-3xl font-black text-orange-500">0</p>
            <p className="text-gray-500 text-sm mt-1">Downloads</p>
          </div>
          <div>
            <p className="text-3xl font-black text-orange-500">∞</p>
            <p className="text-gray-500 text-sm mt-1">Potential</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="tools" className="px-8 py-24">
        <h2 className="text-3xl font-black text-center mb-4">
          Every AI Tool. <span className="text-orange-500">One Platform.</span>
        </h2>
        <p className="text-gray-500 text-center mb-16">
          Coming soon. Be the first to build.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: "🏠", label: "IoT & Smart Home" },
            { icon: "🎮", label: "Gaming" },
            { icon: "🌐", label: "Language & Voice" },
            { icon: "📁", label: "Productivity" },
            { icon: "🚁", label: "Drones" },
            { icon: "🎬", label: "Creative" },
            { icon: "📚", label: "Education" },
            { icon: "🤖", label: "Automation" },
          ].map((cat) => (
            <div
              key={cat.label}
              className="border border-orange-500/30 rounded-lg p-6 text-center hover:border-orange-500 hover:bg-orange-500/5 transition-all cursor-pointer"
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <p className="text-sm text-gray-400">{cat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About / Philosophy */}
      <section
        id="about"
        className="px-8 py-24 border-t border-orange-500/30 max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-black mb-8 text-center">
          The <span className="text-orange-500">Blacksmith</span> Philosophy
        </h2>
        <div className="space-y-4 text-gray-400 leading-relaxed text-center">
          <p>
            A blacksmith takes raw material. Heats it. Shapes it. Strengthens
            it.
          </p>
          <p>
            Creates tools that last generations. Built by skilled hands, not
            factories.
          </p>
          <p className="text-white font-bold">ForgeAI does the same with AI.</p>
          <p>Built by the community. Free for everyone. Forever.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 border-t border-orange-500/30 text-center">
        <h2 className="text-4xl font-black mb-4">
          Ready to <span className="text-orange-500">Forge?</span>
        </h2>
        <p className="text-gray-500 mb-8">
          Join the movement. Build AI tools for everyone.
        </p>
        <a
          href="/signup"
          className="bg-orange-500 text-black px-10 py-4 rounded font-black text-lg hover:bg-orange-400 transition-colors"
        >
          GET STARTED FREE →
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-orange-500/30 px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <p>
          ⚒️ <span className="text-orange-500 font-bold">ForgeAI</span> · A
          BlackRails Technology Project
        </p>
        <p>AGPL v3 · Open Source · Free Forever</p>
        <p>Build it. Forge it. Free it.</p>
      </footer>
    </main>
  );
}
