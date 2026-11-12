// Glosario de palabras sueltas que aparecen en los diálogos sin ser vocabulario de una lección:
// interjecciones, palabras funcionales y formas conjugadas. Se muestra al revelar el texto del
// diálogo. tests/content.test.ts exige que toda palabra de un diálogo esté enseñada o acá.

export const GLOSS: Record<string, string> = {
  ja: "sí", auch: "también", hier: "acá / aquí", schon: "ya", also: "entonces", genau: "exacto",
  super: "genial", toll: "genial", schade: "qué pena", oh: "¡ay!", ah: "¡ah!", perfekt: "perfecto",
  willkommen: "bienvenido/a", problem: "problema", kein: "ningún / no… (un)", alle: "todos",
  nächste: "próxima", jetzt: "ahora", früh: "temprano", bleiben: "quedarse", gute: "buen/a",
  reise: "viaje", kurs: "curso", deutschkurs: "curso de alemán", monate: "meses", jahren: "años",
  tagen: "días", wiederhören: "hasta luego (por teléfono)", kaufen: "comprar", neue: "nueva",
  mussten: "tuvimos que", spielen: "jugar", spiele: "toco / juego", musst: "tenés que",
  spanisch: "español", steh: "levantate (de «aufstehen»)", wasch: "lavate", zieh: "vestite (de «anziehen»)",
  beeile: "apuro (de «sich beeilen»)", eier: "huevos", beim: "en lo de / en el (bei + dem)",
  frau: "señora", herr: "señor", lernst: "aprendés",
  oma: "abuela", dann: "entonces / después", etwas: "algo", bis: "hasta", ihr: "su (de usted)",
  für: "para", leider: "lamentablemente", noch: "todavía / más", mal: "vez", wie: "cómo",
  klar: "claro / por supuesto", bestimmt: "seguro / seguramente", kochst: "cocinás", schlafe: "duermo", arbeitet: "trabaja",
  fertig: "listo", wieder: "otra vez / de nuevo", name: "nombre / apellido", nächte: "noches",
  restaurant: "restaurante", interessant: "interesante", team: "equipo", plan: "plan", firma: "empresa",
  schreiben: "escribir", beginne: "empiezo", ende: "final",
  wohntest: "vivías", dorf: "pueblo", machtest: "hacías", dort: "allá / ahí", tante: "tía", wunderbar: "maravilloso",
  museen: "museos", jeden: "cada", anfang: "principio", schien: "brilló (de «scheinen»)", büro: "oficina",
  aufstand: "me levanté (de «aufstehen»)", gefrühstückt: "desayuné", lag: "estaba acostado", würdest: "harías / irías",
  hättest: "tuvieras", professor: "profesor", natürlich: "por supuesto", erklären: "explicar", erkläre: "explico",
  internet: "internet",
  kennen: "conocer", kennst: "conocés", kenne: "conozco", stock: "piso (de un edificio)", wirklich: "de verdad", sohn: "hijo",
  informationen: "información", beste: "el/la mejor", mach: "hacé", bring: "traé", möchtest: "querés", brauchst: "necesitás",
  geschäft: "negocio / tienda", gerade: "justo ahora", gefeiert: "festejado", dieses: "este", fotografieren: "sacar fotos",
  doch: "¡sí! (contradice un no)", herein: "adelante / adentro", verständnis: "comprensión",
  nur: "solo", wohnen: "vivir", familie: "familia", plus: "más (suma)", viel: "mucho", heute: "hoy", morgen: "mañana",
  opa: "abuelo", hund: "perro", spät: "tarde", müde: "cansado/a", viele: "muchos/as",
  das: "esto / el (neutro)", aber: "pero",
  manche: "algunos/as", trage: "llevo puesto", bücher: "libros", sommer: "verano", gäste: "invitados / clientes", geld: "dinero",
  ans: "a la / al (an + das)", schönste: "la más linda", geschenkt: "regalado", letztes: "pasado / último", geraucht: "fumado",
  unserer: "nuestra",
  bestehen: "aprobar", sparst: "ahorrás", reiseführer: "guía de viaje", ins: "al (in + das)", kino: "cine", auszugehen: "salir",
  recht: "razón (recht haben)", tochter: "hija", sohnes: "del hijo", verloren: "perdido/a", wetters: "del clima",
  drinnen: "adentro", welcher: "qué (cuál)",
  denkst: "pensás", homeoffice: "trabajo desde casa", kollegen: "colegas", beides: "las dos cosas", laut: "ruidoso",
  langweilig: "aburrido", argument: "argumento", gespart: "ahorrado", entschuldigen: "disculpar", beginnen: "empezar",
  bekommen: "recibir", worum: "¿de qué?", zieht: "se muda", mädchen: "niña / joven", endet: "termina",
  braucht: "necesita", jeder: "todos / cada uno", erstens: "primero", zweitens: "segundo",
  sind: "son / están", ist: "es / está", wir: "nosotros", und: "y",
};

/** Nombres propios y lugares que se aceptan sin enseñar. */
export const PROPER = new Set([
  "madrid", "wien", "hamburg", "berlin", "münchen", "buenos", "aires", "argentinien", "japan", "italien", "kanada", "thomas", "peter", "schulz", "lena", "müller",
]);

const tok = (s: string) =>
  s.toLowerCase().replace(/[.,!?¿¡;:"«»„“”()…/]/g, " ").replace(/-/g, " ").split(/\s+/).filter(Boolean);

/** Números compuestos (veinticinco, 2016…): se enseñan por patrón, no hace falta glosarlos. */
export const isNumberWord = (w: string) =>
  /^\d+$/.test(w) ||
  /^(ein|zwei|drei|vier|fünf|sechs|sieben|acht|neun)und(zwanzig|dreißig|vierzig|fünfzig|sechzig|siebzig|achtzig|neunzig)$/.test(w) ||
  /^(zweitausend|neunzehnhundert)[a-zäöüß]*$/.test(w) ||
  /^(vierzehn|fünfzehn|achtzehn|neunzehn)$/.test(w);

/** Palabras glosadas que aparecen en las líneas de un diálogo (sin repetir). */
export function glossFor(lines: string[]): [string, string][] {
  const seen = new Set<string>();
  const out: [string, string][] = [];
  for (const l of lines) for (const w of tok(l)) if (GLOSS[w] && !seen.has(w)) { seen.add(w); out.push([w, GLOSS[w]]); }
  return out;
}

export { tok as tokenize };
