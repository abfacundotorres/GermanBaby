// Test de nivel inicial: 15 preguntas por nivel (12 de gramática y vocabulario y 3 de escucha), de A1 a B2, de gramática y vocabulario en contexto.
// La primera opción es la correcta (la pantalla las mezcla).

export type PlacementLevel = "A1" | "A2" | "B1" | "B2";
export type PlacementQ = { level: PlacementLevel; q: string; options: string[]; why: string; listen?: string };

const q = (level: PlacementLevel, text: string, options: string[], why: string): PlacementQ => ({ level, q: text, options, why });
/** Pregunta de escucha: se oye `de` (voz sintética) y se elige qué significa. */
const lq = (level: PlacementLevel, de: string, options: string[]): PlacementQ => ({ level, q: "Escuchá la frase y elegí qué dice.", options, why: `Decía: «${de}».`, listen: de });

const RAW: PlacementQ[] = [
  q("A1", "Ich ___ Anna.", ["heiße", "heißt", "heißen", "heiß"], "Con «ich» el verbo termina en -e: ich heiße."),
  q("A1", "Wo ___ du? – In Berlin.", ["wohnst", "wohne", "wohnt", "wohnen"], "Con «du» el verbo termina en -st."),
  q("A1", "___ ist das? – Das ist mein Bruder.", ["Wer", "Was", "Wo", "Wie"], "«Wer» pregunta por personas."),
  q("A1", "Ich ___ einen Kaffee, bitte.", ["möchte", "möchtest", "möchten", "möchtet"], "Con «ich»: ich möchte."),
  q("A1", "Wir ___ zwei Geschwister.", ["haben", "habe", "hast", "hat"], "Con «wir»: wir haben."),
  q("A1", "Das ist ___ Haus.", ["das", "der", "die", "den"], "«Haus» es neutro: das Haus."),
  q("A1", "Es ist 7:30 Uhr. Es ist halb ___.", ["acht", "sieben", "sechs", "neun"], "«Halb acht» = 7:30: se cuenta hacia la hora que viene."),
  q("A1", "Ich sehe ___ Hund.", ["einen", "ein", "einem", "eine"], "Acusativo masculino: einen."),
  q("A1", "Ich ___ aus Spanien.", ["komme", "kommst", "kommt", "kommen"], "Con «ich»: ich komme."),
  q("A1", "Das ist ___ Frau.", ["meine", "mein", "meinen", "meinem"], "«Frau» es femenino: meine Frau."),
  q("A1", "Wie viel ___ das? – Zehn Euro.", ["kostet", "kosten", "koste", "kostest"], "Con «das»: es kostet."),
  q("A1", "Er ___ gern Fußball.", ["spielt", "spiele", "spielst", "spielen"], "Con «er»: er spielt."),
  lq("A1", "Guten Morgen! Wie geht's?", ["Buen día, ¿cómo andás?", "Buenas noches, ¿cómo te llamás?", "Chau, nos vemos mañana", "Perdón, ¿qué hora es?"]),
  lq("A1", "Ich wohne in Berlin und arbeite in einem Café.", ["Vivo en Berlín y trabajo en un café", "Vivo en Viena y estudio en un café", "Trabajo en Berlín y vivo en un café", "Me gustan Berlín y los cafés"]),
  lq("A1", "Das kostet fünf Euro.", ["Cuesta cinco euros", "Cuesta quince euros", "Son las cinco y media", "Tengo cinco euros"]),
  q("A2", "Gestern ___ ich ins Kino gegangen.", ["bin", "habe", "war", "wurde"], "«gehen» forma el Perfekt con «sein»."),
  q("A2", "Ich bleibe zu Hause, ___ ich krank bin.", ["weil", "aber", "und", "denn"], "El verbo va al final: solo «weil» lo permite."),
  q("A2", "Ich fahre ___ dem Bus zur Arbeit.", ["mit", "in", "auf", "zu"], "Medio de transporte: mit + dativo."),
  q("A2", "Das ist das Auto ___ meinem Vater.", ["von", "für", "ohne", "gegen"], "«von meinem Vater» = de mi padre (von + dativo)."),
  q("A2", "Ich habe einen Bruder, ___ in Wien wohnt.", ["der", "den", "dem", "das"], "Relativo en nominativo masculino: der."),
  q("A2", "Kannst du mir bitte ___?", ["helfen", "hilft", "geholfen", "helfe"], "Con un modal, el verbo va en infinitivo."),
  q("A2", "Wenn ich Zeit ___, besuche ich dich.", ["habe", "hat", "hatte", "haben"], "Con «ich»: ich habe."),
  q("A2", "Mein Zimmer ist ___ als deins.", ["größer", "großer", "am größten", "groß"], "Comparativo: groß → größer."),
  q("A2", "Ich habe gestern einen Film ___.", ["gesehen", "gesehe", "sah", "sehen"], "Perfekt de «sehen»: haben + gesehen."),
  q("A2", "Ich ___ gestern lange arbeiten.", ["musste", "muss", "müssen", "gemusst"], "Pasado de «müssen»: ich musste."),
  q("A2", "Wir treffen uns ___ Montag.", ["am", "im", "um", "an"], "Días de la semana: am Montag."),
  q("A2", "Er ist größer ___ ich.", ["als", "wie", "wenn", "dass"], "Comparativo: größer als."),
  lq("A2", "Gestern bin ich mit dem Zug nach Wien gefahren.", ["Ayer fui a Viena en tren", "Mañana voy a Viena en tren", "Ayer volví de Viena en colectivo", "Siempre viajo a Viena en tren"]),
  lq("A2", "Kannst du mir bitte das Salz geben?", ["¿Me podés pasar la sal, por favor?", "¿Querés sal en la comida?", "¿Dónde compraste la sal?", "No me pases la sal"]),
  lq("A2", "Am Wochenende möchte ich meine Großeltern besuchen, weil sie krank sind.", ["El fin de semana quiero visitar a mis abuelos porque están enfermos", "El fin de semana quiero visitar a mis abuelos porque están de vacaciones", "El fin de semana mis abuelos me visitan", "Quiero llamar a mis abuelos el domingo"]),
  q("B1", "Wenn ich mehr Geld ___, würde ich reisen.", ["hätte", "habe", "hatte", "hätten"], "Irreal: Konjunktiv II, ich hätte."),
  q("B1", "Das Fenster ___ gestern repariert.", ["wurde", "wird", "worden", "wurden"], "Passiv en pasado: wurde + participio."),
  q("B1", "Er fragt, ___ ich morgen Zeit habe.", ["ob", "dass", "wenn", "weil"], "Pregunta indirecta sí/no: ob."),
  q("B1", "Ich freue mich ___ das Wochenende.", ["auf", "über", "für", "an"], "«sich freuen auf» = alegrarse por algo que viene."),
  q("B1", "Nachdem er gegessen ___, ging er schlafen.", ["hatte", "hat", "wurde", "war"], "«Nachdem» pide Plusquamperfekt: hatte gegessen."),
  q("B1", "Der Mann, ___ ich gestern getroffen habe, ist Arzt.", ["den", "der", "dem", "dessen"], "Relativo en acusativo masculino: den."),
  q("B1", "Ich interessiere mich ___ Geschichte.", ["für", "an", "auf", "mit"], "«sich interessieren für»."),
  q("B1", "Ich habe keine Lust, heute ins Kino ___.", ["zu gehen", "gehen", "zu gegangen", "geht"], "Infinitivo con «zu» después de «Lust»."),
  q("B1", "Das ist der Mann, mit ___ ich gestern gesprochen habe.", ["dem", "den", "der", "dessen"], "«mit» pide dativo: mit dem."),
  q("B1", "Sie sagt, dass sie keine Zeit ___.", ["hat", "hast", "haben", "habt"], "Con «sie» (ella): sie hat."),
  q("B1", "Ich warte ___ den Bus.", ["auf", "für", "an", "über"], "«warten auf»."),
  q("B1", "Obwohl es regnete, ___ wir spazieren.", ["gingen", "ging", "gegangen", "gehen"], "Pasado con «wir»: wir gingen."),
  lq("B1", "Wenn ich mehr Zeit hätte, würde ich öfter ins Fitnessstudio gehen.", ["Si tuviera más tiempo, iría más seguido al gimnasio", "Como tengo más tiempo, voy más seguido al gimnasio", "Si fuera al gimnasio, tendría más tiempo", "Nunca tengo tiempo para el gimnasio"]),
  lq("B1", "Nachdem wir gegessen hatten, sind wir spazieren gegangen.", ["Después de comer, salimos a caminar", "Antes de comer, salimos a caminar", "Como no comimos, salimos a caminar", "Mientras comíamos, caminamos"]),
  lq("B1", "Der Zug nach München fällt heute wegen eines Streiks aus.", ["El tren a Múnich hoy se cancela por una huelga", "El tren a Múnich llega con retraso por el clima", "El tren a Múnich sale de la vía cinco", "Hoy no hay huelga en Múnich"]),
  q("B2", "Das Projekt, ___ Ergebnisse alle überraschten, wurde gestoppt.", ["dessen", "deren", "das", "dem"], "Relativo en genitivo neutro: dessen."),
  q("B2", "___ der hohen Kosten entschied sich die Firma für das Projekt.", ["Trotz", "Obwohl", "Weil", "Damit"], "Solo «trotz» lleva genitivo: obwohl, weil y damit abren una subordinada."),
  q("B2", "Er hätte früher anrufen ___.", ["sollen", "sollte", "gesollt", "soll"], "Konjunktiv II del pasado con modal: hätte ... sollen."),
  q("B2", "Die Preise sollen nächstes Jahr ___ werden.", ["erhöht", "erhöhen", "erhöhte", "erhöhend"], "Passiv con modal: participio + werden."),
  q("B2", "Je mehr man übt, ___ besser wird man.", ["desto", "so", "als", "wie"], "Estructura «je ... desto»."),
  q("B2", "Ich bestehe ___, dass wir den Vertrag prüfen.", ["darauf", "davon", "dafür", "dabei"], "«bestehen auf» → darauf + dass."),
  q("B2", "Hätte ich das gewusst, ___ ich nicht gekommen.", ["wäre", "würde", "hätte", "war"], "Irreal del pasado: wäre ... gekommen."),
  q("B2", "Die ___ Arbeitslosigkeit ist ein großes Problem.", ["steigende", "steigendes", "steigender", "steigend"], "Participio de presente como adjetivo: die steigende."),
  q("B2", "Er behauptet, das Auto nie gesehen ___ haben.", ["zu", "zum", "dass", "um"], "Infinitivo con «zu» después de «behaupten»."),
  q("B2", "Die Entscheidung, ___ gestern getroffen wurde, ist umstritten.", ["die", "der", "den", "dessen"], "Relativo en nominativo femenino: die."),
  q("B2", "Man sollte nicht alles glauben, ___ man im Internet liest.", ["was", "das", "welches", "dass"], "Después de «alles» el relativo es «was»."),
  q("B2", "Das Gesetz tritt in Kraft, ___ das Parlament zustimmt.", ["sobald", "obwohl", "sodass", "weder"], "«sobald» = apenas / en cuanto."),
  lq("B2", "Obwohl die Studie viele Mängel aufweist, wurde sie in den Medien breit zitiert.", ["Aunque el estudio tiene muchas fallas, fue citado ampliamente en los medios", "Como el estudio tiene fallas, no se lo citó en los medios", "Los medios criticaron el estudio por citarlo mal", "Los medios publicaron un estudio sin fallas"]),
  lq("B2", "Hätte die Regierung früher reagiert, wäre der Schaden deutlich geringer gewesen.", ["Si el gobierno hubiera reaccionado antes, el daño habría sido mucho menor", "El gobierno reaccionó antes y por eso el daño fue menor", "Si el daño fuera menor, el gobierno reaccionaría", "El gobierno no reaccionó porque el daño era menor"]),
  lq("B2", "Die Verhandlungen scheiterten, weil keine der Parteien zu Zugeständnissen bereit war.", ["Las negociaciones fracasaron porque ninguna parte estaba dispuesta a hacer concesiones", "Las negociaciones tuvieron éxito porque ambas partes cedieron", "Las partes negociaron concesiones para evitar el fracaso", "Las negociaciones se postergaron porque faltaban partes"]),
];

/** Las 3 de escucha van intercaladas (puestos 3, 6 y 9 de cada nivel; el cierre adaptativo exige al menos 10 respuestas) para que el cierre adaptativo no las salteé. */
export const PLACEMENT: PlacementQ[] = (["A1", "A2", "B1", "B2"] as const).flatMap((lv) => {
  const g = RAW.filter((x) => x.level === lv && !x.listen);
  const l = RAW.filter((x) => x.level === lv && x.listen);
  return g.flatMap((x, k) => [x, ...([1, 3, 5].includes(k) ? [l[[1, 3, 5].indexOf(k)]] : [])]);
});

export const PLACEMENT_PASS = 10; // de 15 por nivel (12 de gramática y vocabulario, 3 de escucha)
export const PLACEMENT_PER_LEVEL = 15;
/** Un nivel se cierra antes de tiempo cuando ya está aprobado (10 aciertos) o cuando ya no se puede aprobar (6 errores). */
export const levelSettled = (correct: number, wrong: number) => correct >= PLACEMENT_PASS || wrong > PLACEMENT_PER_LEVEL - PLACEMENT_PASS;

/** Resultado a partir de los aciertos por nivel (los niveles no rendidos quedan sin definir). */
export function placementResult(scores: Partial<Record<PlacementLevel, number>>): { level: PlacementLevel; partial: boolean } {
  const order: PlacementLevel[] = ["A1", "A2", "B1", "B2"];
  let reached: PlacementLevel = "A1";
  let all = true;
  for (const lv of order) {
    const s = scores[lv];
    if (s === undefined || s < PLACEMENT_PASS) { all = false; break; }
    reached = lv;
  }
  // «reached» es el último nivel aprobado; si no aprobó A1, empieza por A1.
  const passedA1 = (scores.A1 ?? 0) >= PLACEMENT_PASS;
  return { level: passedA1 ? reached : "A1", partial: !all };
}
