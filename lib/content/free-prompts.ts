// Producción libre: un ejercicio por cada «Práctica» (A2 a B2). El alumno escribe varias frases propias
// sobre un tema usando las estructuras de la unidad, y Claude las corrige (app/api/free/route.ts).
// Clave: id de la unidad. Se agregan al final de los ejercicios de la práctica en lib/curriculum.ts.

export type FreePrompt = { prompt: string; focus: string[]; minSentences: number; hint?: string };

import { FREE_PROMPTS_A1 } from "./practice-a1.ts";

export const FREE_PROMPTS: Record<string, FreePrompt> = {
  ...FREE_PROMPTS_A1,
  // ---------- A2
  vergangenheit: { prompt: "Contá cómo era tu vida hace unos años: dónde vivías, qué hacías y qué no podías hacer.", focus: ["war / hatte / konnte / musste", "früher o vor … Jahren", "seit"], minSentences: 3 },
  gesundheit: { prompt: "Contale a un médico cómo te sentís: qué te duele, desde cuándo y qué hacés para mejorar.", focus: ["tut weh / Ich habe …", "un verbo reflexivo", "un imperativo (Sie)"], minSentences: 3 },
  kleidung: { prompt: "Describí la ropa que llevás puesta hoy y la que te gustaría comprar.", focus: ["colores", "adjetivo con terminación antes del sustantivo", "Ich finde … / Das passt"], minSentences: 3 },
  gruende: { prompt: "Explicá por qué estudiás alemán y qué hacés cuando no tenés ganas de estudiar.", focus: ["weil", "dass o wenn", "immer / oft / manchmal / nie"], minSentences: 3 },
  geschenke: { prompt: "Contá qué le regalarías a tres personas de tu familia o amigos y por qué.", focus: ["schenken / geben + dativo", "mir / dir / ihm / ihr", "meiner Mutter, meinem Bruder…"], minSentences: 3 },
  ort: { prompt: "Describí tu habitación o tu escritorio: qué hay y dónde está cada cosa.", focus: ["auf / unter / neben / hinter + dativo", "stehen / liegen / hängen", "stellen / legen + acusativo"], minSentences: 4 },
  reise: { prompt: "Comparé dos lugares o dos medios de transporte y contá adónde querés viajar.", focus: ["comparativo con als", "so … wie", "am liebsten / am besten"], minSentences: 3 },
  arbeit: { prompt: "Contá a qué te dedicás (o te gustaría dedicarte) y qué vas a hacer el año que viene.", focus: ["Ich bin / Ich arbeite als", "werden + infinitivo", "ich würde gern"], minSentences: 3 },
  "pruefung-a2": { prompt: "Escribí un correo corto a un conocido para proponerle una cita y acordar un día y una hora.", focus: ["saludo y cierre", "Wie wäre es mit …?", "Passt es dir …?"], minSentences: 4 },

  // ---------- B1
  erzaehlen: { prompt: "Contá lo que hiciste el último fin de semana, como si fuera una pequeña historia.", focus: ["Präteritum", "als / während / bevor / nachdem", "Plusquamperfekt en una frase"], minSentences: 4 },
  wuensche: { prompt: "Escribí qué harías si ganaras la lotería y qué consejo le darías a un amigo que está cansado.", focus: ["Konjunktiv II (hätte / wäre / würde)", "wenn + irreal", "solltest / könntest"], minSentences: 4 },
  relativ: { prompt: "Describí a una persona que admirás y un lugar donde te sentís bien.", focus: ["oración de relativo (der / die / das)", "relativo con preposición", "alles, was … o jemand, der …"], minSentences: 3 },
  passiv: { prompt: "Describí cómo se hace algo que conocés bien (una receta, un trámite, una reparación).", focus: ["Passiv de presente (wird … gemacht)", "Passiv con modal (muss … werden)", "von + dativo o un pasado (wurde)"], minSentences: 4 },
  ziele: { prompt: "Contá qué metas tenés para este año y qué hacés (o no) para lograrlas.", focus: ["um … zu", "damit", "obwohl o trotzdem", "ohne … zu / statt … zu"], minSentences: 4 },
  genitiv: { prompt: "Describí la casa o el barrio de alguien que conocés y contá qué pasó por un problema del clima.", focus: ["genitivo (des / der)", "wegen / trotz + genitivo", "adjetivos con -en en dativo"], minSentences: 4 },
  meinung: { prompt: "Dá tu opinión sobre el transporte en bici frente al auto, con ventajas y desventajas.", focus: ["Meiner Meinung nach", "einerseits … andererseits", "zwar … aber", "ob en una pregunta indirecta"], minSentences: 4 },
  "praeposition-verben": { prompt: "Contá qué te interesa, a qué le tenés miedo, con qué soñás y por qué te enojás.", focus: ["sich interessieren für", "Angst haben vor", "träumen von", "sich ärgern über"], minSentences: 4 },
  "konjunktiv-vergangenheit": { prompt: "Contá algo que lamentás y qué habrías hecho distinto, y qué le reprocharías a un amigo.", focus: ["hätte / wäre + participio", "Wenn ich … gehabt hätte", "hättest … sollen / können"], minSentences: 4 },
  konnektoren: { prompt: "Explicá cómo aprendés alemán y qué cosas hacés según el tiempo que tengás.", focus: ["falls", "je … desto", "indem", "sondern o sowohl … als auch"], minSentences: 4 },
  "pruefung-b1": { prompt: "Escribí un reclamo formal por un producto que no funciona y pedí una solución.", focus: ["saludo formal", "Ich schreibe Ihnen, weil …", "Bitte schicken Sie …", "cierre formal"], minSentences: 5 },

  // ---------- B2
  "indirekte-rede": { prompt: "Contá lo que dijo un amigo sobre su trabajo, como si lo escribieras en una noticia.", focus: ["Konjunktiv I (er sei / habe / komme)", "laut o angeblich", "ob o solle"], minSentences: 4 },
  partizipien: { prompt: "Describí una escena en la calle con participios como adjetivos.", focus: ["Partizip I (-end)", "Partizip II con terminación", "un participio ampliado"], minSentences: 3 },
  nominalstil: { prompt: "Escribí un párrafo formal sobre un problema de una ciudad y su solución, con sustantivos en lugar de subordinadas.", focus: ["sustantivos en -ung", "aufgrund / angesichts / infolge + genitivo", "verbo + sustantivo (eine Entscheidung treffen)"], minSentences: 4 },
  "passiv-plus": { prompt: "Describí lo que se hizo, se está haciendo y se va a hacer en una obra o en una empresa.", focus: ["Passiv Perfekt (ist … worden)", "Passiv con modal o futuro", "pasiva impersonal o man / sich lassen"], minSentences: 4 },
  "konnektoren-b2": { prompt: "Explicá en qué condiciones aceptarías un trabajo en el exterior y qué razones tendrías.", focus: ["sofern / solange / es sei denn", "da o zumal", "folglich o somit", "dennoch o jedoch"], minSentences: 5 },
  meinungstext: { prompt: "Escribí un texto de opinión corto: ¿conviene trabajar desde casa?", focus: ["introducción (Heutzutage … / Die Frage ist, ob …)", "zunächst / darüber hinaus", "una objeción (Man könnte einwenden …)", "una conclusión (Abschließend …)"], minSentences: 6 },
  register: { prompt: "Escribí dos versiones del mismo pedido de ayuda: una informal, para un amigo, y una formal, para un jefe.", focus: ["du frente a Sie", "partículas (doch / mal)", "Konjunktiv II de cortesía"], minSentences: 4 },
  "pruefung-b2": { prompt: "Describí con tus palabras una gráfica sobre un tema que elijas y sacá una conclusión.", focus: ["Die Grafik zeigt, dass …", "steigen / sinken, um … Prozent", "im Vergleich zu", "una conclusión"], minSentences: 5 },

  // ---------- C1
  vermutung: { prompt: "Un compañero no vino hoy y nadie sabe por qué. Escribí qué suponés, qué dicen otros y qué afirma él mismo.", focus: ["muss / dürfte / kann nicht + infinitivo", "soll / will + infinitivo (perfecto)", "wohl / offenbar / anscheinend"], minSentences: 5 },
  "relativ-plus": { prompt: "Describí a tres personas de tu entorno y a un lugar que conocés, con oraciones de relativo avanzadas.", focus: ["dessen / deren", "wer … o was …", "relativo con preposición", "wo o warum"], minSentences: 5 },
  irrealis: { prompt: "Contá algo que lamentás y cómo habría sido distinto, y describí a alguien que hace como si nada pasara.", focus: ["Wenn … nur / Hätte … doch / Ich wünschte", "als ob / als + Konjunktiv II", "beinahe o ohne dass"], minSentences: 5 },
  akademisch: { prompt: "Presentá por escrito los resultados de un estudio imaginario sobre un tema que elijas, con lenguaje académico.", focus: ["zufolge / gemäß / hinsichtlich / bezüglich", "demnach / mithin / insbesondere", "belegen / darlegen / hinweisen auf"], minSentences: 6 },
  "bruecke-c1": { prompt: "Escribí un texto corto sobre un cambio social que te preocupa (trabajo, clima, tecnología): qué pasa, qué dicen otros y qué habría que hacer.", focus: ["pasiva con modal (muss … werden)", "Konjunktiv I o laut / zufolge", "un conector (dadurch / daher / demnach)"], minSentences: 5 },
  konzessiv: { prompt: "Defendé una decisión difícil que tomaste, reconociendo los argumentos en contra.", focus: ["obgleich / wenngleich / auch wenn", "selbst wenn + Konjunktiv II", "gleichwohl o zwar … doch", "una fórmula fija (Wie dem auch sei)"], minSentences: 5 },
  wortbildung: { prompt: "Describí un lugar o una persona usando palabras derivadas (sufijos y prefijos).", focus: ["-keit / -heit / -ung / -schaft", "-bar / -los / -voll / -sam", "un verbo con ver- / ent- / zer-"], minSentences: 5 },
  funktionsverben: { prompt: "Escribí el resumen de una reunión formal de una empresa, con locuciones verbales.", focus: ["in Betracht ziehen / in Frage stellen", "zur Sprache bringen / Stellung beziehen", "in Kraft treten / in Angriff nehmen"], minSentences: 6 },
  "redewendungen-c1": { prompt: "Contá un día en el que todo salió mal usando expresiones idiomáticas.", focus: ["ins Wasser fallen / Glück im Unglück", "die Nase voll haben / auf die Nerven gehen", "una más a tu elección"], minSentences: 5 },
  "diskussion-c1": { prompt: "Escribí un breve diálogo de debate entre dos personas que no piensan igual sobre un tema que elijas.", focus: ["Zugegeben, … / Da muss ich Ihnen recht geben", "Dem muss ich widersprechen / Ich stimme dem nur bedingt zu", "Entscheidend ist, ob… / Fassen wir zusammen"], minSentences: 6 },
  textanalyse: { prompt: "Resumí y evaluá un texto o artículo que hayas leído, en presente.", focus: ["Der Text behandelt… / Der Autor vertritt die These, dass…", "sich stützen auf / gegliedert in", "una valoración (überzeugend, einseitig, schlüssig)"], minSentences: 6 },
  "medien-c1": { prompt: "Explicá cómo te informás y qué riesgos ves en las redes sociales y las noticias falsas.", focus: ["stärker / mehr … als + oración", "sich (genitivo) bewusst sein", "Es besteht die Gefahr, dass…"], minSentences: 5 },
  "technik-c1": { prompt: "Dá tu opinión sobre la inteligencia artificial: oportunidades, riesgos y qué habrá que esperar.", focus: ["Es bleibt abzuwarten / ist zu beachten", "hängt davon ab, ob / wie", "ein Recht darauf, zu… o pasiva con modal"], minSentences: 6 },
  "pruefung-c1": { prompt: "Escribí un ensayo corto con introducción, argumentos, una objeción y una conclusión sobre el home office.", focus: ["In der heutigen Zeit… / Die Frage, ob…", "Für diese Position sprechen… / Allerdings darf nicht übersehen werden", "Meines Erachtens / Abwägend lässt sich festhalten"], minSentences: 7 },
};
