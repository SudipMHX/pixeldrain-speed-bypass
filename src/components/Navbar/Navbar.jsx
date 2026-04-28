import { MdBolt } from "react-icons/md";

const Navbar = () => (
  <div className="flex items-center justify-between">
    <a href="/" className="flex items-center gap-2 no-underline group">
      <MdBolt className="text-2xl text-violet-400 drop-shadow-[0_0_6px_rgba(108,99,255,0.7)] group-hover:text-violet-300 transition-colors" />
      <span className="font-[Space_Grotesk] text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
        SpeedDrain
      </span>
    </a>

    <a
      href="https://speed-drain.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs font-semibold text-white/40 border border-white/10 rounded-full px-3 py-1.5 no-underline hover:text-violet-400 hover:border-violet-500/50 hover:bg-violet-500/[0.08] transition-all"
    >
      speed-drain.com ↗
    </a>
  </div>
);

export default Navbar;
