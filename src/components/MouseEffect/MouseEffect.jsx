import { useEffect, useRef, useState } from "react";
import "./MouseEffect.css";

const TRAIL_LENGTH = 18;

const MouseEffect = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isClicked, setIsClicked] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const trailRef = useRef([]);
  const frameRef = useRef(null);
  const mouseRef = useRef({ x: -200, y: -200 });

  // Sync mouse position
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        setIsPointer(getComputedStyle(el).cursor === "pointer");
      }
    };
    const onDown = (e) => e.button === 0 && setIsClicked(true);
    const onUp   = (e) => e.button === 0 && setIsClicked(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  }, []);

  // Animate trail dots
  useEffect(() => {
    const dots = trailRef.current;
    if (!dots.length) return;

    // init positions
    dots.forEach((d) => { if (d) { d._x = mouseRef.current.x; d._y = mouseRef.current.y; } });

    const animate = () => {
      let x = mouseRef.current.x;
      let y = mouseRef.current.y;

      dots.forEach((dot, i) => {
        if (!dot) return;
        const ratio = (TRAIL_LENGTH - i) / TRAIL_LENGTH;
        const scale = isClicked ? ratio * 1.6 : isPointer ? ratio * 1.35 : ratio;

        dot.style.transform = `translate(${x - 6}px, ${y - 6}px) scale(${scale})`;
        dot.style.opacity = String(ratio * 0.7);

        dot._x = x;
        dot._y = y;

        const next = dots[i + 1] || dots[0];
        if (next) {
          x += (next._x - x) * 0.28;
          y += (next._y - y) * 0.28;
        }
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isClicked, isPointer]);

  // Accent color gradient across trail
  const trailColors = [
    "#a78bff","#9d7cff","#9370ff","#8860ff","#7d50f0",
    "#7242e0","#6c63ff","#6057f0","#5548d8","#4a3ac0",
    "#42d9ff","#36c8f0","#2ab8e0","#1fa8d0","#6c63ff",
    "#ff6584","#e85f78","#c95a6a",
  ];

  return (
    <>
      {/* Leading cursor dot */}
      <div
        className="cursor-dot"
        style={{
          transform: `translate(${pos.x - 5}px, ${pos.y - 5}px) scale(${isClicked ? 0.5 : 1})`,
        }}
      />

      {/* Cursor ring */}
      <div
        className={`cursor-ring ${isPointer ? "hovered" : ""} ${isClicked ? "clicked" : ""}`}
        style={{
          transform: `translate(${pos.x - 20}px, ${pos.y - 20}px)`,
        }}
      />

      {/* Trail dots */}
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <div
          key={i}
          ref={(el) => { trailRef.current[i] = el; }}
          className="trail-dot"
          style={{ backgroundColor: trailColors[i % trailColors.length] }}
        />
      ))}
    </>
  );
};

export default MouseEffect;
