// Brezi, la mascota: un pretzel redondito con salitas. Cambia de cara según el estado.

export type Mood = "happy" | "cheer" | "sad" | "think" | "sleepy";

export default function Mascot({ mood = "happy", size = 96, animate = true }: { mood?: Mood; size?: number; animate?: boolean }) {
  const cls = animate ? { happy: "m-bob", cheer: "m-jump", sad: "m-shake", think: "m-bob", sleepy: "m-bob" }[mood] : "";
  return (
    <svg
      className={`mascot-svg ${cls}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Brezi, la mascota (${mood})`}
    >
      <defs>
        <radialGradient id="mb" cx="40%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#f6c75c" />
          <stop offset="100%" stopColor="#d9901d" />
        </radialGradient>
      </defs>
      {/* brazos */}
      {mood === "cheer" ? (
        <>
          <path d="M14 56 Q2 38 10 24" stroke="#b9700f" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M86 56 Q98 38 90 24" stroke="#b9700f" strokeWidth="8" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <path d="M14 60 Q4 66 8 76" stroke="#b9700f" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M86 60 Q96 66 92 76" stroke="#b9700f" strokeWidth="8" strokeLinecap="round" fill="none" />
        </>
      )}
      {/* patitas */}
      <ellipse cx="36" cy="92" rx="10" ry="6" fill="#b9700f" />
      <ellipse cx="64" cy="92" rx="10" ry="6" fill="#b9700f" />
      {/* cuerpo */}
      <circle cx="50" cy="52" r="38" fill="url(#mb)" stroke="#b9700f" strokeWidth="5" />
      {/* nudo de pretzel en la cabeza */}
      <path d="M38 17 C28 6 20 16 32 22 M62 17 C72 6 80 16 68 22 M38 17 L62 22 M62 17 L38 22" stroke="#b9700f" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* sal */}
      {[[26, 40], [72, 34], [78, 62], [22, 66], [60, 28]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="5" height="3.2" rx="1.2" fill="#fff" opacity="0.9" transform={`rotate(${i * 37} ${x} ${y})`} />
      ))}
      {/* mejillas */}
      <circle cx="30" cy="62" r="5" fill="#ef7b6c" opacity="0.55" />
      <circle cx="70" cy="62" r="5" fill="#ef7b6c" opacity="0.55" />
      {/* ojos */}
      {mood === "cheer" ? (
        <>
          <path d="M31 50 Q37 42 43 50" stroke="#2b1d00" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M57 50 Q63 42 69 50" stroke="#2b1d00" strokeWidth="4" strokeLinecap="round" fill="none" />
        </>
      ) : mood === "sleepy" ? (
        <>
          <path d="M31 50 H43" stroke="#2b1d00" strokeWidth="4" strokeLinecap="round" />
          <path d="M57 50 H69" stroke="#2b1d00" strokeWidth="4" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="37" cy="49" rx="6" ry={mood === "sad" ? 6.5 : 7} fill="#fff" />
          <ellipse cx="63" cy="49" rx="6" ry={mood === "sad" ? 6.5 : 7} fill="#fff" />
          <circle cx={mood === "think" ? 39 : 37} cy={mood === "sad" ? 52 : mood === "think" ? 46 : 50} r="3.4" fill="#2b1d00" />
          <circle cx={mood === "think" ? 65 : 63} cy={mood === "sad" ? 52 : mood === "think" ? 46 : 50} r="3.4" fill="#2b1d00" />
          <circle cx="38.2" cy="48.4" r="1.1" fill="#fff" />
          <circle cx="64.2" cy="48.4" r="1.1" fill="#fff" />
        </>
      )}
      {mood === "sad" && <path d="M29 45 L43 39 M71 45 L57 39" stroke="#2b1d00" strokeWidth="3" strokeLinecap="round" />}
      {mood === "think" && <path d="M56 38 L70 36" stroke="#2b1d00" strokeWidth="3" strokeLinecap="round" />}
      {/* boca */}
      {mood === "cheer" ? (
        <path d="M38 62 Q50 82 62 62 Z" fill="#7a1f1f" stroke="#2b1d00" strokeWidth="3" strokeLinejoin="round" />
      ) : mood === "sad" ? (
        <path d="M40 70 Q50 60 60 70" stroke="#2b1d00" strokeWidth="4" strokeLinecap="round" fill="none" />
      ) : mood === "think" ? (
        <path d="M43 68 H57" stroke="#2b1d00" strokeWidth="4" strokeLinecap="round" />
      ) : mood === "sleepy" ? (
        <ellipse cx="50" cy="68" rx="4" ry="3" fill="#7a1f1f" />
      ) : (
        <path d="M39 64 Q50 76 61 64" stroke="#2b1d00" strokeWidth="4" strokeLinecap="round" fill="none" />
      )}
      {mood === "sad" && <path d="M26 56 q-3 7 0 10 q3 -3 0 -10z" fill="#6cc4ff" />}
      {mood === "sleepy" && (
        <text x="74" y="26" fontSize="14" fontWeight="900" fill="#6d665c">z</text>
      )}
    </svg>
  );
}
