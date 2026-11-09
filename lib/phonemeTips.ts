// Consejos de pronunciación para hispanohablantes.
// Se eligen a partir de los fonemas mal puntuados (IPA) que devuelve Azure y,
// como respaldo, de las letras de la palabra.

type Tip = { title: string; tip: string };

const BY_IPA: Record<string, Tip> = {
  "y": { title: "ü", tip: "Poné los labios como para decir «u» y, sin moverlos, decí «i»." },
  "ʏ": { title: "ü corta", tip: "Como la «ü» larga pero breve y relajada: labios de «u», lengua de «i»." },
  "ø": { title: "ö", tip: "Labios redondos como para «o», y decí «e» sin moverlos." },
  "œ": { title: "ö corta", tip: "Una «e» abierta con labios redondeados, corta." },
  "ɛ": { title: "ä / e abierta", tip: "Una «e» más abierta que la española, como en «perro»." },
  "ç": { title: "ch suave (ich)", tip: "Decí «i» y soplá fuerte sin voz, como un gato que bufa: «ij» muy suave, no «sh»." },
  "x": { title: "ch fuerte (ach)", tip: "Como la «j» española, pero raspando suavemente atrás de la garganta." },
  "ʁ": { title: "r alemana", tip: "No se hace vibrar la punta de la lengua: es un roce suave en la garganta, como una «j» muy suave con voz." },
  "ɐ": { title: "-er final", tip: "Al final de palabra, «-er» casi no tiene r: suena como una «a» corta y relajada." },
  "ts": { title: "z", tip: "La «z» alemana es «ts», como en «tsunami»." },
  "v": { title: "w", tip: "La «w» se dice apoyando los dientes de arriba en el labio de abajo, con voz (como una «f» que vibra)." },
  "z": { title: "s sonora", tip: "Antes de vocal la «s» zumba, como una abeja: «zzz»." },
  "ʃ": { title: "sch", tip: "Como el «sh» para pedir silencio, con los labios hacia adelante." },
  "h": { title: "h aspirada", tip: "La «h» inicial se pronuncia: un soplido suave, como empañar un vidrio." },
  "ŋ": { title: "ng", tip: "Como la «n» de «tengo», sin pronunciar la «g» al final." },
  "ə": { title: "e átona", tip: "La «e» final sin acento es muy débil y corta, casi un murmullo." },
  "aɪ": { title: "ei", tip: "«ei» se dice «ai»." },
  "ɔʏ": { title: "eu / äu", tip: "«eu» y «äu» se dicen «oi»." },
  "aʊ": { title: "au", tip: "«au» como en «auto»." },
  "iː": { title: "vocal larga", tip: "Esta vocal es larga: estirala un poco más que en español." },
  "eː": { title: "e larga", tip: "Una «e» cerrada y estirada, sonriendo un poco." },
  "uː": { title: "u larga", tip: "Una «u» estirada con labios bien redondos." },
  "oː": { title: "o larga", tip: "Una «o» cerrada y estirada." },
  "aː": { title: "a larga", tip: "Estirá la «a»: en alemán la duración cambia el significado." },
};

const BY_LETTERS: [RegExp, Tip][] = [
  [/ü/i, BY_IPA["y"]],
  [/ö/i, BY_IPA["ø"]],
  [/ä/i, BY_IPA["ɛ"]],
  [/sch/i, BY_IPA["ʃ"]],
  [/[iey]ch|ch$/i, BY_IPA["ç"]],
  [/[aou]ch/i, BY_IPA["x"]],
  [/z/i, BY_IPA["ts"]],
  [/w/i, BY_IPA["v"]],
  [/^v|[^a-z]v/i, { title: "v", tip: "La «v» alemana casi siempre suena como «f»: «vier» = «fiar»." }],
  [/ei/i, BY_IPA["aɪ"]],
  [/eu|äu/i, BY_IPA["ɔʏ"]],
  [/er\b/i, BY_IPA["ɐ"]],
  [/r/i, BY_IPA["ʁ"]],
  [/^h/i, BY_IPA["h"]],
  [/ß/i, { title: "ß", tip: "La «ß» es una «s» fuerte y sorda, nunca zumbada." }],
];

export function tipsFor(words: { word: string; score: number; phonemes: { phoneme: string; score: number }[] }[]) {
  const found = new Map<string, Tip & { word: string }>();
  for (const w of words) {
    if (w.score >= 80) continue;
    const weak = w.phonemes.filter((p) => p.score < 70).map((p) => p.phoneme);
    let matched = false;
    for (const ph of weak) {
      const tip = BY_IPA[ph] ?? BY_IPA[ph.replace("ː", "")];
      if (tip && !found.has(tip.title)) {
        found.set(tip.title, { ...tip, word: w.word });
        matched = true;
      }
    }
    if (!matched) {
      for (const [re, tip] of BY_LETTERS) {
        if (re.test(w.word) && !found.has(tip.title)) {
          found.set(tip.title, { ...tip, word: w.word });
          break;
        }
      }
    }
  }
  return [...found.values()].slice(0, 3);
}
