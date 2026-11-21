// Test de nivel inicial: 12 preguntas por nivel, de A1 a B2, de gramática y vocabulario en contexto.
// La primera opción es la correcta (la pantalla las mezcla).

export type PlacementLevel = "A1" | "A2" | "B1" | "B2";
export type PlacementQ = { level: PlacementLevel; q: string; options: string[]; why: string };

const q = (level: PlacementLevel, text: string, options: string[], why: string): PlacementQ => ({ level, q: text, options, why });

export const PLACEMENT: PlacementQ[] = [
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
];

export const PLACEMENT_PASS = 8; // de 12 por nivel
export const PLACEMENT_PER_LEVEL = 12;
/** Un nivel se cierra antes de tiempo cuando ya está aprobado (8 aciertos) o cuando ya no se puede aprobar (5 errores). */
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
