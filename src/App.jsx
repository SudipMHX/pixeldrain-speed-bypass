import MouseEffect from "./components/MouseEffect/MouseEffect";
import Navbar from "./components/Navbar/Navbar";
import Downloader from "./components/Downloader/Downloader";
import { MdBolt } from "react-icons/md";

function App() {
  return (
    <>
      <MouseEffect />
      <div className="bg-grid" aria-hidden="true" />

      <div className="min-h-screen flex flex-col">
        {/* ── Header ── */}
        <header className="sticky top-0 z-[100] px-6 py-3 backdrop-blur-xl border-b border-white/[0.08] bg-black/60">
          <Navbar />
        </header>

        {/* ── Main / Hero ── */}
        <main className="hero-section flex-1 flex flex-col items-center px-4 pt-16 pb-20 gap-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-violet-500/15 border border-violet-500/35 text-violet-300 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full animate-[fadeDown_0.6s_ease_both]">
            <MdBolt className="text-base text-violet-400" />
            Instant · Free · No Limits
          </div>

          {/* Title */}
          <h1 className="font-[Space_Grotesk] text-[clamp(2rem,6vw,3.8rem)] font-extrabold leading-tight text-center max-w-3xl">
            <span className="gradient-text">SpeedDrain</span>
            <br />
            <span className="text-white">Lightning-Fast Pixeldrain Downloads</span>
          </h1>

          {/* Sub */}
          <p className="text-lg text-white/50 text-center max-w-xl leading-relaxed">
            Bypass Pixeldrain speed limits in seconds. Paste a link, generate your
            direct CDN URL, and download at full speed — no registration required.
          </p>

          {/* Downloader card */}
          <div className="w-full max-w-3xl bg-white/[0.04] border border-white/[0.08] rounded-2xl backdrop-blur-2xl shadow-[0_8px_40px_rgba(108,99,255,0.15)] hover:shadow-[0_16px_60px_rgba(108,99,255,0.22)] hover:-translate-y-0.5 transition-all duration-300">
            <div className="p-6 sm:p-8">
              <Downloader />
            </div>
          </div>

          {/* How it works */}
          <section className="w-full max-w-3xl mt-4">
            <h2 className="font-[Space_Grotesk] text-2xl font-bold text-center text-white mb-6">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { num: "01", title: "Paste your URL", desc: "Copy any Pixeldrain share link and paste it into the input field." },
                { num: "02", title: "Generate CDN Link", desc: "We instantly convert it to a high-speed CDN download URL." },
                { num: "03", title: "Copy & Download", desc: "Click the URL to copy, then paste it in your browser or download manager." },
              ].map((s) => (
                <div key={s.num} className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5 flex flex-col gap-2 hover:border-violet-500/40 hover:-translate-y-1 transition-all duration-200 backdrop-blur-sm">
                  <span className="text-3xl font-extrabold font-[Space_Grotesk] bg-gradient-to-br from-violet-500 to-pink-500 bg-clip-text text-transparent leading-none">{s.num}</span>
                  <h3 className="text-sm font-bold text-white">{s.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* ── Footer ── */}
        <footer className="border-t border-white/[0.08] bg-black/60 backdrop-blur-xl py-8 px-6">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2">
              <MdBolt className="text-2xl text-violet-400 drop-shadow-[0_0_6px_rgba(108,99,255,0.7)]" />
              <span className="font-[Space_Grotesk] text-lg font-bold text-white">SpeedDrain</span>
            </div>
            <p className="text-sm text-white/40">The fastest way to bypass Pixeldrain limits.</p>
            <a
              href="https://speed-drain.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-violet-400 border border-violet-500/30 rounded-full px-4 py-1.5 hover:bg-violet-500/10 hover:border-violet-500/60 transition-all no-underline"
            >
              🌐 Our New Website: <strong className="text-violet-300">speed-drain.com</strong>
            </a>
            <p className="text-xs text-white/20">© {new Date().getFullYear()} SpeedDrain. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
