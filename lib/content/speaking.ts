// Consignas de expresión oral: monólogos de 30 segundos a 2 minutos. Se graban, se transcriben con Azure y se puntúan
// con la misma rúbrica que la escritura (/api/rubric), más fluidez y pronunciación medidas por Azure.

export type SpeakingLevel = "A1" | "A2" | "B1" | "B2";
export type SpeakingTask = {
  id: string; level: SpeakingLevel; emoji: string; title: string;
  genre: string; register: "du" | "Sie" | "neutral";
  prompt: string; points: string[];
  minSeconds: number; maxSeconds: number;
  tip: string;
};

export const SPEAKING: SpeakingTask[] = [
  { id: "s-a1-vorstellung", level: "A1", emoji: "👋", title: "Presentarte", genre: "Presentación", register: "neutral",
    prompt: "Presentate: tu nombre, de dónde sos, dónde vivís, cuántos años tenés y qué te gusta hacer.",
    points: ["nombre", "origen", "lugar donde vive", "edad", "una actividad que le gusta"], minSeconds: 20, maxSeconds: 60, tip: "Frases cortas: Ich heiße … Ich komme aus … Ich wohne in …" },
  { id: "s-a1-tag", level: "A1", emoji: "⏰", title: "Tu día", genre: "Descripción", register: "neutral",
    prompt: "Contá cómo es un día normal tuyo, con tres o más horas.",
    points: ["al menos tres actividades", "al menos tres horas"], minSeconds: 20, maxSeconds: 60, tip: "Um sieben Uhr stehe ich auf. Dann …" },
  { id: "s-a2-restaurant", level: "A2", emoji: "🍽️", title: "En el restaurante", genre: "Pedido", register: "Sie",
    prompt: "Hablale al mozo: pedí una bebida y un plato, preguntá si hay una opción vegetariana y pedí la cuenta.",
    points: ["bebida", "plato", "pregunta por la opción vegetariana", "pedido de la cuenta", "tratamiento formal"], minSeconds: 25, maxSeconds: 70, tip: "Ich möchte … Haben Sie …? Die Rechnung, bitte." },
  { id: "s-a2-wochenende", level: "A2", emoji: "🎈", title: "Tu fin de semana", genre: "Relato", register: "neutral",
    prompt: "Contá qué hiciste el fin de semana pasado y qué vas a hacer este.",
    points: ["al menos dos cosas en pasado", "al menos una en futuro", "una opinión"], minSeconds: 30, maxSeconds: 80, tip: "Perfekt: Ich bin … gegangen. Futuro cercano: Am Samstag gehe ich …" },
  { id: "s-a2-wohnung", level: "A2", emoji: "🏠", title: "Describir tu casa", genre: "Descripción", register: "neutral",
    prompt: "Describí el lugar donde vivís: cuántas habitaciones tiene, qué hay en cada una y qué te gusta.",
    points: ["cantidad de habitaciones", "al menos tres objetos", "ubicación de algo", "qué le gusta"], minSeconds: 30, maxSeconds: 80, tip: "Es gibt … ; Das Sofa steht im Wohnzimmer." },
  { id: "s-b1-meinung", level: "B1", emoji: "💬", title: "Ciudad o campo", genre: "Opinión", register: "neutral",
    prompt: "Dá tu opinión sobre vivir en la ciudad o en el campo, con dos argumentos y un ejemplo personal.",
    points: ["postura clara", "dos argumentos", "un ejemplo personal", "una conclusión"], minSeconds: 50, maxSeconds: 110, tip: "Meiner Meinung nach … Erstens … Zweitens … Deshalb …" },
  { id: "s-b1-erlebnis", level: "B1", emoji: "📖", title: "Una experiencia", genre: "Relato", register: "du",
    prompt: "Contá algo que te sorprendió: qué pasó, cuándo, cómo reaccionaste y qué aprendiste.",
    points: ["qué pasó y cuándo", "cómo reaccionó", "qué aprendió", "orden claro"], minSeconds: 50, maxSeconds: 120, tip: "Als …, Nachdem …, Plötzlich …" },
  { id: "s-b1-problem", level: "B1", emoji: "📞", title: "Llamar por un problema", genre: "Llamada formal", register: "Sie",
    prompt: "Llamás a la inmobiliaria porque la calefacción no funciona. Explicá el problema, qué probaste y qué pedís.",
    points: ["el problema", "qué intentó", "qué pide", "plazo", "tratamiento formal"], minSeconds: 40, maxSeconds: 100, tip: "Guten Tag, ich rufe an, weil … Ich bitte Sie, …" },
  { id: "s-b2-debatte", level: "B2", emoji: "🎙️", title: "Postura en un debate", genre: "Argumentación", register: "neutral",
    prompt: "Argumentá a favor o en contra de que el trabajo remoto sea un derecho legal. Incluí una objeción y tu respuesta.",
    points: ["postura clara", "al menos dos argumentos", "una objeción y su respuesta", "conclusión"], minSeconds: 80, maxSeconds: 150, tip: "Einerseits … andererseits …; Man könnte einwenden, dass …; Dem ist entgegenzuhalten, dass …" },
  { id: "s-b2-grafik", level: "B2", emoji: "📊", title: "Describir datos", genre: "Presentación", register: "neutral",
    prompt: "Presentá estos datos: el uso del auto bajó del 60 % al 45 % en diez años, y el de la bicicleta subió del 10 % al 22 %. Interpretalos y concluí.",
    points: ["los cuatro datos", "una comparación", "una interpretación", "una conclusión"], minSeconds: 70, maxSeconds: 140, tip: "Aus der Grafik geht hervor, dass …; Im Vergleich zu …; Das lässt darauf schließen, dass …" },
  { id: "s-b2-vortrag", level: "B2", emoji: "🎤", title: "Mini presentación", genre: "Exposición", register: "neutral",
    prompt: "Dá una exposición breve sobre un tema que conozcas bien: introducí el tema, desarrollá dos ideas y cerrá con tu valoración.",
    points: ["introducción del tema", "dos ideas desarrolladas", "ejemplos", "valoración final"], minSeconds: 90, maxSeconds: 150, tip: "Ich möchte heute über … sprechen; Zunächst …; Abschließend …" },
];
