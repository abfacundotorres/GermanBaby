// Consignas de escritura con rúbrica por nivel. Cada una pide cubrir unos puntos de contenido, en un registro y con un largo mínimo.
// La corrección (/api/rubric) puntúa cuatro criterios de 0 a 5. Para sumar una consigna, agregá una entrada.

export type WritingLevel = "A1" | "A2" | "B1" | "B2" | "C1";
export type WritingTask = {
  id: string; level: WritingLevel; emoji: string; title: string;
  genre: string; // tipo de texto
  register: "du" | "Sie" | "neutral";
  prompt: string; // consigna en español
  points: string[]; // puntos de contenido que debe cubrir
  minWords: number; maxWords: number;
  tip: string;
};

export const WRITING_CRITERIA = [
  { id: "task", name: "Cumplimiento de la consigna", desc: "Cubre todos los puntos pedidos, con el registro y el tipo de texto adecuados." },
  { id: "structure", name: "Coherencia y estructura", desc: "Ideas ordenadas, saludo y cierre cuando corresponden, conectores." },
  { id: "vocab", name: "Vocabulario", desc: "Variedad y precisión de las palabras y expresiones." },
  { id: "grammar", name: "Gramática y ortografía", desc: "Corrección de las estructuras, el orden de palabras y la escritura." },
] as const;
export type CriterionId = (typeof WRITING_CRITERIA)[number]["id"];

export const WRITING: WritingTask[] = [
  { id: "a1-vorstellung", level: "A1", emoji: "👋", title: "Presentarte", genre: "Texto breve", register: "neutral",
    prompt: "Presentate en un foro de alemán: tu nombre, de dónde sos, dónde vivís, cuántos años tenés y qué te gusta hacer.",
    points: ["nombre", "origen", "lugar donde vive", "edad", "una actividad que le gusta"], minWords: 25, maxWords: 70, tip: "Una idea por frase: Ich heiße … Ich komme aus … Ich wohne in … Ich spiele gern …" },
  { id: "a1-familie", level: "A1", emoji: "👨‍👩‍👧", title: "Tu familia", genre: "Texto breve", register: "neutral",
    prompt: "Escribile a un amigo alemán sobre tu familia: quiénes son, cuántos años tienen y qué hacen.",
    points: ["al menos tres personas de la familia", "edad de al menos una", "una actividad o profesión"], minWords: 30, maxWords: 80, tip: "Mein Vater heißt … Er ist … Jahre alt. Er arbeitet …" },
  { id: "a1-tag", level: "A1", emoji: "⏰", title: "Un día normal", genre: "Texto breve", register: "neutral",
    prompt: "Contá cómo es un día normal tuyo, con tres o más horas.",
    points: ["al menos tres actividades", "al menos tres horas", "algo que hacés a la noche"], minWords: 30, maxWords: 80, tip: "Um sieben Uhr stehe ich auf. Dann frühstücke ich …" },
  { id: "a2-einladung", level: "A2", emoji: "🎉", title: "Invitar a una fiesta", genre: "Mensaje informal", register: "du",
    prompt: "Invitá a un amigo a tu cumpleaños: cuándo y dónde es, qué van a comer, y pedile que traiga algo. Terminá con una pregunta.",
    points: ["fecha y hora", "lugar", "comida o bebida", "pedido de traer algo", "pregunta final"], minWords: 40, maxWords: 90, tip: "Saludo (Hallo …), motivo, datos, pedido con «Kannst du … mitbringen?», despedida." },
  { id: "a2-beschwerde", level: "A2", emoji: "📧", title: "Reclamo por un pedido", genre: "Mail formal", register: "Sie",
    prompt: "Pedí en línea una chaqueta y llegó de otro color. Escribí un mail a la tienda: qué pasó, qué querés y que respondan pronto.",
    points: ["qué pidió y qué llegó", "qué quiere (cambio o reembolso)", "pedido de respuesta", "saludo y cierre formales"], minWords: 45, maxWords: 100, tip: "Sehr geehrte Damen und Herren, … Mit freundlichen Grüßen" },
  { id: "a2-urlaub", level: "A2", emoji: "🏖️", title: "Tus vacaciones", genre: "Postal / mensaje", register: "du",
    prompt: "Contá en pasado cómo fueron tus últimas vacaciones: adónde fuiste, con quién, qué hiciste y qué te gustó.",
    points: ["destino", "con quién", "al menos dos actividades en pasado", "una opinión"], minWords: 50, maxWords: 110, tip: "Usá Perfekt: Ich bin nach … gefahren. Wir haben … gemacht." },
  { id: "a2-wohnung", level: "A2", emoji: "🏠", title: "Tu casa ideal", genre: "Texto breve", register: "neutral",
    prompt: "Describí tu departamento o casa ideal: dónde está, cuántas habitaciones tiene y qué cosas hay.",
    points: ["ubicación", "cantidad de habitaciones", "al menos tres muebles u objetos", "por qué te gusta"], minWords: 50, maxWords: 110, tip: "Mi casa ideal: in der Nähe von …, mit … Zimmern; Wechselpräpositionen para ubicar objetos." },
  { id: "b1-bewerbung", level: "B1", emoji: "💼", title: "Carta de postulación", genre: "Carta formal", register: "Sie",
    prompt: "Te postulás a un trabajo de verano en un hotel. Presentate, contá tu experiencia, explicá por qué te interesa y cuándo podés empezar.",
    points: ["presentación breve", "experiencia o habilidades", "motivo del interés", "disponibilidad", "saludo y cierre formales"], minWords: 90, maxWords: 160, tip: "Sehr geehrte Damen und Herren, ich interessiere mich für … Mit freundlichen Grüßen" },
  { id: "b1-meinung", level: "B1", emoji: "💬", title: "Opinión en un foro", genre: "Comentario", register: "neutral",
    prompt: "En un foro preguntan: «¿Es mejor vivir en la ciudad o en el campo?». Escribí tu opinión con dos argumentos y un ejemplo.",
    points: ["postura clara", "dos argumentos", "un ejemplo personal", "una conclusión"], minWords: 90, maxWords: 160, tip: "Meiner Meinung nach … Erstens … Zweitens … Deshalb …" },
  { id: "b1-erlebnis", level: "B1", emoji: "📖", title: "Una experiencia", genre: "Relato", register: "du",
    prompt: "Contale a un amigo algo que te pasó y te sorprendió: qué pasó, cuándo, cómo reaccionaste y qué aprendiste.",
    points: ["qué pasó y cuándo", "cómo reaccionó", "qué aprendió", "orden cronológico claro"], minWords: 90, maxWords: 170, tip: "Als …, Nachdem …, Plötzlich …; mezclá Präteritum y Perfekt." },
  { id: "b1-reklamation", level: "B1", emoji: "🛠️", title: "Pedir una solución", genre: "Mail formal", register: "Sie",
    prompt: "Alquilaste un departamento de vacaciones y la calefacción no funciona. Escribí al propietario: describí el problema, qué ya intentaste y qué pedís.",
    points: ["el problema", "qué intentó", "qué pide", "plazo o consecuencia", "saludo y cierre formales"], minWords: 90, maxWords: 160, tip: "Leider funktioniert … nicht. Ich bitte Sie, … Falls …" },
  { id: "b2-leserbrief", level: "B2", emoji: "📰", title: "Carta de lectores", genre: "Texto argumentativo", register: "neutral",
    prompt: "Un diario publicó que se prohibirán los autos en el centro. Escribí una carta de lectores: tu postura, argumentos a favor y en contra, y una propuesta.",
    points: ["postura clara", "al menos dos argumentos", "una objeción y su respuesta", "una propuesta concreta", "introducción y conclusión"], minWords: 150, maxWords: 250, tip: "Einerseits … andererseits …; Zwar … aber …; Abschließend möchte ich …" },
  { id: "b2-bericht", level: "B2", emoji: "📊", title: "Informe de una encuesta", genre: "Informe", register: "neutral",
    prompt: "Hiciste una encuesta a 100 personas sobre cuánto tiempo pasan en el celular: 45 % más de cuatro horas, 35 % entre dos y cuatro, 20 % menos de dos. Escribí un informe con resultados, una interpretación y una recomendación.",
    points: ["los tres porcentajes", "una comparación", "una interpretación", "una recomendación"], minWords: 140, maxWords: 230, tip: "Die Umfrage zeigt, dass …; Im Vergleich zu …; Daraus lässt sich schließen, dass …" },
  { id: "b2-kuendigung", level: "B2", emoji: "✉️", title: "Carta de renuncia con recomendación", genre: "Carta formal", register: "Sie",
    prompt: "Dejás tu trabajo por un traslado. Escribí a tu jefa: comunicá la decisión, agradecé, ofrecé ayudar con el traspaso y pedí una carta de referencia.",
    points: ["comunicar la decisión y la fecha", "motivo breve", "agradecimiento", "oferta de ayuda con el traspaso", "pedido de la carta de referencia"], minWords: 130, maxWords: 220, tip: "Hiermit möchte ich … kündigen; Ich bedanke mich für …; Ich wäre Ihnen dankbar, wenn …" },
  { id: "b2-vortrag", level: "B2", emoji: "🎤", title: "Resumen de una charla", genre: "Resumen y opinión", register: "neutral",
    prompt: "Asististe a una charla sobre «El trabajo remoto en el futuro». Escribí un resumen de tres ideas posibles de la charla y tu valoración personal.",
    points: ["tres ideas principales", "conexión lógica entre ellas", "valoración personal fundamentada", "conclusión"], minWords: 150, maxWords: 250, tip: "Der Referent betonte, dass …; Besonders interessant fand ich …; Konjunktiv I para el discurso indirecto." },
  { id: "c1-essay", level: "C1", emoji: "✒️", title: "Ensayo argumentativo", genre: "Ensayo", register: "neutral",
    prompt: "«El progreso tecnológico hace a las sociedades más libres.» Escribí un ensayo: tesis, dos líneas de argumentación con ejemplos, una contraposición matizada y una conclusión que vaya más allá de repetir lo dicho.",
    points: ["tesis clara en la introducción", "dos líneas de argumentación con ejemplos", "contraargumento tratado con matices", "conclusión que aporta una valoración propia", "conectores y progresión lógica"], minWords: 250, maxWords: 380, tip: "Zunächst … Dem steht entgegen, dass …; Dennoch lässt sich festhalten, dass …; nominalización y subordinadas variadas." },
  { id: "c1-stellungnahme", level: "C1", emoji: "🏛️", title: "Toma de posición formal", genre: "Carta formal argumentativa", register: "Sie",
    prompt: "El concejo de tu ciudad quiere cerrar una biblioteca barrial para ahorrar costos. Escribí una carta formal a la comisión: reconocé el problema de costos, argumentá por qué conviene mantenerla, proponé alternativas de financiación y pedí una respuesta.",
    points: ["reconocer la situación y el motivo del concejo", "al menos dos argumentos en contra del cierre", "una propuesta concreta de financiación o uso alternativo", "pedido de respuesta o reunión", "registro formal coherente en todo el texto"], minWords: 220, maxWords: 340, tip: "Sehr geehrte Damen und Herren, … Ich möchte darauf hinweisen, dass …; Konjunktiv II para proponer; cierre formal." },
];
