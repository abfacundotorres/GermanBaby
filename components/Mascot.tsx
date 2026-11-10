// Donki, el burrito alemán de DankeDonkey: sombrero tirolés con pluma y bufanda negro-rojo-dorado.
// Cambia de cara y de orejas según el estado, parpadea y mueve las orejas.

export type Mood = "happy" | "cheer" | "sad" | "think" | "sleepy";

const FUR = "#a8b1c7";
const FUR_DARK = "#69718f";
const MUZZLE = "#f7eedd";
const INNER = "#f2a6b4";
const INK = "#2b1d1d";

// Rotación de cada oreja según el ánimo (izquierda, derecha), en grados.
const EARS: Record<Mood, [number, number]> = {
  happy: [-14, 14],
  cheer: [-4, 4],
  sad: [-68, 68],
  think: [-14, 46],
  sleepy: [-40, 40],
};

function Ear({ side, rot, wiggle }: { side: "l" | "r"; rot: number; wiggle: boolean }) {
  const x = side === "l" ? 30 : 70;
  return (
    <g transform={`rotate(${rot} ${x} 40)`}>
      <g className={wiggle ? `ear-wiggle ear-${side}` : undefined} style={{ transformOrigin: `${x}px 40px` }}>
        <ellipse cx={x} cy="22" rx="8.5" ry="20" fill={FUR} stroke={FUR_DARK} strokeWidth="3" />
        <ellipse cx={x} cy="24" rx="4" ry="12.5" fill={INNER} />
      </g>
    </g>
  );
}

export default function Mascot({ mood = "happy", size = 96, animate = true }: { mood?: Mood; size?: number; animate?: boolean }) {
  const cls = animate ? { happy: "m-bob", cheer: "m-jump", sad: "m-shake", think: "m-bob", sleepy: "m-bob" }[mood] : "";
  const [er, el] = [EARS[mood][1], EARS[mood][0]];
  const blink = animate && (mood === "happy" || mood === "think");
  return (
    <svg className={`mascot-svg ${cls}`} width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={`Donki, el burrito (${mood})`}>
      {/* orejas (detrás de la cabeza) */}
      <Ear side="l" rot={el} wiggle={animate && mood !== "sad"} />
      <Ear side="r" rot={er} wiggle={animate && mood !== "sad"} />

      {/* cabeza */}
      <ellipse cx="50" cy="55" rx="31" ry="28" fill={FUR} stroke={FUR_DARK} strokeWidth="3.5" />

      {/* mejillas */}
      <circle cx="27" cy="63" r="5" fill="#ef7b8e" opacity="0.45" />
      <circle cx="73" cy="63" r="5" fill="#ef7b8e" opacity="0.45" />

      {/* hocico */}
      <ellipse cx="50" cy="69" rx="17.5" ry="13.5" fill={MUZZLE} stroke={FUR_DARK} strokeWidth="2" opacity="0.98" />
      <ellipse cx="43.5" cy="66" rx="2.3" ry="3.1" fill="#c9788a" />
      <ellipse cx="56.5" cy="66" rx="2.3" ry="3.1" fill="#c9788a" />
      {mood === "cheer" ? (
        <>
          <path d="M41.5 73.5 Q50 90 58.5 73.5 Z" fill="#7a1f2b" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
          <ellipse cx="50" cy="82" rx="4.5" ry="2.8" fill="#f08c9c" />
        </>
      ) : mood === "sad" ? (
        <path d="M42.5 79 Q50 72 57.5 79" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
      ) : mood === "think" ? (
        <path d="M44 77 H56" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      ) : mood === "sleepy" ? (
        <ellipse cx="50" cy="77" rx="3.5" ry="2.6" fill="#7a1f2b" />
      ) : (
        <path d="M42.5 74.5 Q50 82 57.5 74.5" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
      )}

      {/* ojos */}
      <g className={blink ? "eyes-blink" : undefined} style={{ transformOrigin: "50px 51px" }}>
        {mood === "cheer" ? (
          <>
            <path d="M30 52 Q37.5 42 45 52" stroke={INK} strokeWidth="3.6" strokeLinecap="round" fill="none" />
            <path d="M55 52 Q62.5 42 70 52" stroke={INK} strokeWidth="3.6" strokeLinecap="round" fill="none" />
          </>
        ) : mood === "sleepy" ? (
          <>
            <path d="M31 52 H44" stroke={INK} strokeWidth="3.6" strokeLinecap="round" />
            <path d="M56 52 H69" stroke={INK} strokeWidth="3.6" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="38" cy="51" rx="6.4" ry="7.4" fill="#fff" stroke={FUR_DARK} strokeWidth="1.2" />
            <ellipse cx="62" cy="51" rx="6.4" ry="7.4" fill="#fff" stroke={FUR_DARK} strokeWidth="1.2" />
            <circle cx={mood === "think" ? 40 : 38} cy={mood === "sad" ? 54 : mood === "think" ? 47.5 : 52} r="3.8" fill={INK} />
            <circle cx={mood === "think" ? 64 : 62} cy={mood === "sad" ? 54 : mood === "think" ? 47.5 : 52} r="3.8" fill={INK} />
            <circle cx={mood === "think" ? 41.3 : 39.3} cy={mood === "sad" ? 52.5 : mood === "think" ? 46 : 50.4} r="1.2" fill="#fff" />
            <circle cx={mood === "think" ? 65.3 : 63.3} cy={mood === "sad" ? 52.5 : mood === "think" ? 46 : 50.4} r="1.2" fill="#fff" />
          </>
        )}
      </g>
      {mood === "sad" && <path d="M30 44 L44 40 M70 44 L56 40" stroke={INK} strokeWidth="3" strokeLinecap="round" />}
      {mood === "think" && <path d="M55 40 L69 37" stroke={INK} strokeWidth="3" strokeLinecap="round" />}
      {mood === "sad" && <path d="M28.5 57 q-3.4 7 0 10.5 q3.4 -3.5 0 -10.5z" fill="#6cc4ff" />}
      {mood === "sleepy" && <text x="76" y="30" fontSize="15" fontWeight="900" fill="#8b86a0">z</text>}

      {/* sombrero tirolés */}
      <path d="M26 33 Q50 41 74 33 Q50 24 26 33Z" fill="#35835a" stroke="#256444" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M35 32 L38.5 13 Q50 7 61.5 13 L65 32 Q50 37 35 32Z" fill="#3e8e5e" stroke="#256444" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M35.6 27.5 Q50 32.5 64.4 27.5 L65 32 Q50 37 35 32Z" fill="#256444" />
      <rect x="46" y="29" width="8" height="5" rx="1.2" fill="#f2b632" stroke="#b9831a" strokeWidth="1" />
      <path d="M60 15 Q75 10 73 -1" stroke="#d6453d" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M60.5 14.5 Q73 10.5 71.5 1" stroke="#f08a80" strokeWidth="1.4" fill="none" strokeLinecap="round" />

      {/* bufanda negro-rojo-dorado */}
      <path d="M27 80 Q50 98 73 80" stroke="#2b2b33" strokeWidth="6.5" fill="none" strokeLinecap="round" />
      <path d="M28.5 86 Q50 104 71.5 86" stroke="#d6453d" strokeWidth="6.5" fill="none" strokeLinecap="round" />
      <path d="M31 92 Q50 109 69 92" stroke="#f2b632" strokeWidth="6.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}
