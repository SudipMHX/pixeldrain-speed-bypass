import { useState } from "react";
import {
  MdContentPaste, MdContentCopy, MdDownload, MdCheckCircle,
  MdError, MdBolt, MdOpenInNew, MdList, MdLink,
} from "react-icons/md";

const CDN_BASE = "https://cdn.pixeldrain.eu.cc";

const PIXELDRAIN_REGEX =
  /^https?:\/\/(?:www\.)?pixeldrain\.(?:com|net|org|in|eu|co|io|app|me|cc|to|link|download|cloud|host|space|xyz|zip)\/(?:u|l)\/([a-zA-Z0-9]+)/i;

const extractId = (url) => {
  const m = url.trim().match(PIXELDRAIN_REGEX);
  return m ? m[1] : null;
};

// ── Result Card ──────────────────────────────────────────────────
const ResultCard = ({ url, downloadUrl, index }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(downloadUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* ignore */ }
  };

  return (
    <div className="bg-white/[0.03] border border-green-500/20 rounded-xl p-4 flex flex-col gap-3 hover:border-green-500/35 transition-colors">
      {/* Source */}
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="text-[0.7rem] font-bold font-mono bg-violet-500/20 text-violet-400 rounded px-1.5 py-0.5 flex-shrink-0">
          #{index + 1}
        </span>
        <span className="text-xs text-white/35 truncate">{url}</span>
      </div>

      {/* CDN URL — click to copy */}
      <button
        onClick={copy}
        title="Click to copy"
        className={`flex items-center gap-2 w-full text-left rounded-lg px-3.5 py-2.5 border transition-all ${
          copied
            ? "cdn-copied border-green-400 bg-green-500/[0.18]"
            : "bg-green-500/[0.06] border-green-500/25 hover:bg-green-500/[0.12] hover:border-green-500/50"
        }`}
      >
        <span className="flex-1 text-sm font-mono text-green-400 truncate">{downloadUrl}</span>
        <span className={`flex-shrink-0 text-base transition-transform ${copied ? "text-green-400 scale-110" : "text-green-500/50"}`}>
          {copied ? <MdCheckCircle /> : <MdContentCopy />}
        </span>
        {copied && <span className="text-[0.7rem] font-bold text-green-400 flex-shrink-0">Copied!</span>}
      </button>

      {/* Disabled action buttons */}
      <div className="flex gap-2 flex-wrap">
        <button disabled className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/30 opacity-50 cursor-not-allowed">
          <MdDownload /> Download
        </button>
        <button disabled className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/30 opacity-50 cursor-not-allowed">
          <MdOpenInNew /> Open Tab
        </button>
      </div>

      {/* Instruction */}
      <p className="text-xs text-white/40 leading-relaxed py-2 px-3 bg-yellow-400/[0.05] border-l-2 border-yellow-400/40 rounded-r-lg">
        ⓘ Click the URL above to copy → paste in your browser or a download manager like{" "}
        <strong className="text-yellow-300">JDownloader</strong>,{" "}
        <strong className="text-yellow-300">IDM</strong>, or{" "}
        <strong className="text-yellow-300">FDM</strong> for best speed.
      </p>
    </div>
  );
};

// ── Main ─────────────────────────────────────────────────────────
const Downloader = () => {
  const [mode, setMode] = useState("single");
  const [singleUrl, setSingleUrl] = useState("");
  const [batchText, setBatchText] = useState("");
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allCopied, setAllCopied] = useState(false);

  const switchMode = (m) => { setMode(m); setResults([]); setErrors([]); };

  const pasteSingle = async () => {
    try { setSingleUrl(await navigator.clipboard.readText()); } catch { /* ignore */ }
  };

  const generate = async () => {
    if (loading) return;
    setLoading(true); setResults([]); setErrors([]);
    const urls = mode === "single"
      ? [singleUrl]
      : batchText.split(/[\n,]+/).map(l => l.trim()).filter(Boolean);
    await new Promise(r => setTimeout(r, 1000));
    const ok = [], bad = [];
    for (const url of urls) {
      const id = extractId(url);
      if (id) ok.push({ url, downloadUrl: `${CDN_BASE}/${id}` });
      else bad.push({ url: url || "(empty)", message: "Not a valid Pixeldrain URL" });
    }
    setResults(ok); setErrors(bad); setLoading(false);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(results.map(r => r.downloadUrl).join("\n"));
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2200);
  };

  const batchCount = batchText.split(/[\n,]+/).filter(l => l.trim()).length;

  return (
    <div className="flex flex-col gap-4">
      {/* Mode toggle */}
      <div className="flex gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-lg w-fit">
        {[
          { id: "single", label: "Single URL", icon: <MdLink /> },
          { id: "batch",  label: "Batch URLs", icon: <MdList /> },
        ].map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => switchMode(id)}
            className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-md border-0 transition-all ${
              mode === id
                ? "bg-gradient-to-br from-violet-600 to-violet-500 text-white shadow-lg shadow-violet-500/30"
                : "bg-transparent text-white/40 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* Input area */}
      {mode === "single" ? (
        <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
          <svg className="w-4 h-4 text-white/30 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          <input
            type="url"
            placeholder="https://pixeldrain.com/u/XXXXXXXX"
            value={singleUrl}
            onChange={e => setSingleUrl(e.target.value)}
            onKeyDown={e => e.key === "Enter" && generate()}
            className="flex-1 bg-transparent border-0 outline-none text-white text-sm py-3 px-1 font-mono placeholder:text-white/25"
          />
          <button onClick={pasteSingle} title="Paste" className="text-white/35 hover:text-violet-400 p-1.5 rounded transition-colors">
            <MdContentPaste className="text-lg" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <textarea
            rows={7}
            spellCheck={false}
            value={batchText}
            onChange={e => setBatchText(e.target.value)}
            placeholder={"Paste multiple Pixeldrain URLs — one per line or comma-separated.\n\npixeldrain.com, pixeldrain.in, pixeldrain.net …"}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm font-mono p-4 resize-y outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all placeholder:text-white/25 leading-relaxed"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/35">{batchCount} URL(s) detected</span>
            <button
              onClick={async () => { try { setBatchText(await navigator.clipboard.readText()); } catch { /* ignore */ } }}
              className="flex items-center gap-1.5 text-xs font-semibold text-white/40 hover:text-violet-400 border border-white/10 hover:border-violet-500/40 rounded-lg px-3 py-1.5 transition-all"
            >
              <MdContentPaste /> Paste All
            </button>
          </div>
        </div>
      )}

      {/* Domain hint */}
      <p className="text-xs text-white/35 flex flex-wrap gap-1 items-center">
        ✓ Supports&nbsp;
        {["pixeldrain.com","pixeldrain.in","pixeldrain.net","and more…"].map((d, i) => (
          <code key={i} className="bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[0.7rem] px-1.5 py-0.5 rounded font-mono">{d}</code>
        ))}
      </p>

      {/* Action bar */}
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={generate}
          disabled={loading}
          className="flex items-center gap-1.5 text-sm font-bold px-5 py-2.5 rounded-xl text-white border-0 bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-500/30 hover:-translate-y-0.5 hover:shadow-violet-500/45 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 transition-all"
        >
          <MdBolt />
          {loading ? "Generating…" : mode === "batch" ? `Generate ${batchCount > 0 ? batchCount : ""} Links` : "Generate Link"}
          {loading && <span className="spinner" />}
        </button>

        {results.length > 1 && (
          <button
            onClick={copyAll}
            className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/[0.18] transition-all"
          >
            {allCopied ? <MdCheckCircle /> : <MdContentCopy />}
            {allCopied ? "All Copied!" : `Copy All ${results.length} URLs`}
          </button>
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="flex flex-col gap-3">
          {results.map((r, i) => (
            <ResultCard key={i} index={i} url={r.url} downloadUrl={r.downloadUrl} />
          ))}
        </div>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <div className="flex flex-col gap-2">
          {errors.map((e, i) => (
            <div key={i} className="flex items-center gap-2 flex-wrap bg-red-500/[0.08] border border-red-500/25 text-red-400 text-sm font-medium px-3 py-2.5 rounded-lg">
              <MdError className="flex-shrink-0" />
              <span className="font-mono text-xs opacity-70 truncate max-w-[280px]">{e.url}</span>
              <span className="ml-auto text-xs opacity-80">{e.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer tip */}
      <p className="text-xs text-white/30 text-center">
        Click any generated URL to copy · Paste into browser or download manager for full speed
      </p>
    </div>
  );
};

export default Downloader;
