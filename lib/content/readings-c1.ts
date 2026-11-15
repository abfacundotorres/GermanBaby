// Lecturas de C1: una lección extra (opcional) al final de cada unidad. Mismo formato que readings.ts.

import type { Lesson, ListenQuestion, Vocab, HandExercise } from "../curriculum.ts";

type Cloze = Extract<HandExercise, { kind: "cloze" }>;
const cz = (sentence: string, es: string, options: string[], answer: string, explanation: string): Cloze => ({ kind: "cloze", sentence, es, options, answer, explanation });
const reading = (
  title: string,
  goal: string,
  vocab: Vocab[],
  exercises: HandExercise[],
  rTitle: string,
  text: string[],
  translation: string[],
  questions: ListenQuestion[],
): Lesson => ({ id: "lesen", title: `Lectura: ${title}`, goal, icon: "📖", bonus: true, vocab, exercises, reading: { title: rTitle, text, translation, questions } });

/** Clave: id de la unidad. */
export const READINGS_C1: Record<string, Lesson> = {
  vermutung: reading(
    "Un rumor en la oficina",
    "Leer un texto con suposiciones y rumores y sumar dos palabras.",
    [
      { de: "das Gerücht", es: "el rumor", emoji: "🗣️", note: "Plural: «die Gerüchte»." },
      { de: "vermuten", es: "suponer", emoji: "🤔", note: "«Ich vermute, dass…» = supongo que…" },
    ],
    [
      cz("Er ___ krank sein, denn er ist nicht gekommen.", "Seguro que está enfermo, porque no vino.", ["muss", "soll", "will", "darf"], "muss", "«muss» expresa casi certeza."),
      cz("Die Chefin ___ ihre Stelle verlassen, sagt man.", "Dicen que la jefa va a dejar su puesto.", ["soll", "muss", "will", "kann"], "soll", "«soll» = dicen que."),
      { kind: "write", es: "el rumor", references: ["das Gerücht"] },
    ],
    "Ein Gerücht im Büro",
    ["Im Büro gibt es ein Gerücht: Die Chefin soll ihre Stelle verlassen. Niemand weiß etwas Genaues, aber alle vermuten, dass es stimmt. Herr Klein will sie gestern mit einem Koffer gesehen haben. Frau Berg sagt, das könne nicht sein. Die Chefin dürfte nur auf Dienstreise sein."],
    ["En la oficina hay un rumor: dicen que la jefa va a dejar su puesto. Nadie sabe nada concreto, pero todos suponen que es verdad. El Sr. Klein dice que la vio ayer con una valija. La Sra. Berg dice que eso no puede ser. La jefa probablemente solo está de viaje de trabajo."],
    [
      { type: "choice", q: "¿Qué dice el rumor?", options: ["Que la jefa va a dejar su puesto", "Que la jefa se casa", "Que la empresa cierra", "Que hay un aumento"], answer: "Que la jefa va a dejar su puesto", why: "«Die Chefin soll ihre Stelle verlassen»." },
      { type: "tf", q: "Herr Klein dice que vio a la jefa con una valija.", answer: true, why: "«Herr Klein will sie… mit einem Koffer gesehen haben»." },
      { type: "choice", q: "¿Qué supone el texto sobre la jefa?", options: ["Que está de viaje de trabajo", "Que renunció", "Que está enferma", "Que se mudó"], answer: "Que está de viaje de trabajo", why: "«Die Chefin dürfte nur auf Dienstreise sein»." },
    ],
  ),
  "relativ-plus": reading(
    "Mi vecindario",
    "Leer una descripción con relativos avanzados y sumar dos palabras.",
    [
      { de: "hilfsbereit", es: "servicial", emoji: "🤝", note: "«die Hilfe» + «bereit» = dispuesto a ayudar." },
      { de: "die Nachbarschaft", es: "el vecindario", emoji: "🏘️", note: "Todos los vecinos de una zona." },
    ],
    [
      cz("Frau Weber, ___ Kinder im Park spielen, ist sehr hilfsbereit.", "La Sra. Weber, cuyos hijos juegan en el parque, es muy servicial.", ["deren", "dessen", "die", "der"], "deren", "Femenino: «deren»."),
      cz("Es gibt nichts, ___ ich stolzer bin.", "No hay nada de lo que esté más orgulloso.", ["worauf", "was", "wer", "wo"], "worauf", "«stolz sein auf» → «worauf»."),
      { kind: "write", es: "el vecindario", references: ["die Nachbarschaft"] },
    ],
    "Meine Nachbarschaft",
    ["Die Nachbarschaft, in der ich wohne, ist ruhig. Frau Weber, deren Kinder im Park spielen, ist sehr hilfsbereit. Herr Huber, dessen Auto gestohlen wurde, ist traurig, was ich verstehe. Wer Hilfe braucht, ruft sie an. Es gibt nichts, worauf ich stolzer bin als auf diese Nachbarschaft."],
    ["El vecindario en el que vivo es tranquilo. La Sra. Weber, cuyos hijos juegan en el parque, es muy servicial. El Sr. Huber, al que le robaron el auto, está triste, lo que entiendo. Quien necesita ayuda, la llama. No hay nada de lo que esté más orgulloso que de este vecindario."],
    [
      { type: "choice", q: "¿Cómo es la Sra. Weber?", options: ["Servicial", "Antipática", "Ruidosa", "Tímida"], answer: "Servicial", why: "«sehr hilfsbereit»." },
      { type: "tf", q: "A Herr Huber le robaron el auto.", answer: true, why: "«dessen Auto gestohlen wurde»." },
      { type: "choice", q: "¿Quién llama a la Sra. Weber?", options: ["Quien necesita ayuda", "Los niños", "El Sr. Huber", "Nadie"], answer: "Quien necesita ayuda", why: "«Wer Hilfe braucht, ruft sie an»." },
    ],
  ),
  irrealis: reading(
    "Un viaje largo",
    "Leer un texto con lamentos y situaciones irreales y sumar dos palabras.",
    [
      { de: "das Heimweh", es: "la nostalgia del hogar", emoji: "🏡", note: "«Heimweh haben» = extrañar el hogar." },
      { de: "einsam", es: "solo (sin compañía)", emoji: "😔", note: "La sensación de soledad." },
    ],
    [
      cz("Ich wünschte, ich ___ zu Hause geblieben.", "Ojalá me hubiera quedado en casa.", ["wäre", "hätte", "bin", "habe"], "wäre", "«bleiben» usa «sein»: «wäre geblieben»."),
      cz("___ ich nur meine Familie angerufen!", "¡Ojalá hubiera llamado a mi familia!", ["Hätte", "Habe", "Wäre", "Hatte"], "Hätte", "Lamento: «Hätte ich nur… angerufen»."),
      { kind: "write", es: "la nostalgia del hogar", references: ["das Heimweh"] },
    ],
    "Eine Reise",
    ["Auf der Reise war ich oft einsam. Ich wünschte, ich wäre zu Hause geblieben. Die anderen taten so, als hätten sie keine Sorgen, aber ich hatte Heimweh. Beinahe wäre ich früher zurückgefahren. Hätte ich nur meine Familie angerufen!"],
    ["En el viaje me sentí a menudo solo. Ojalá me hubiera quedado en casa. Los demás hacían como si no tuvieran preocupaciones, pero yo tenía nostalgia del hogar. Casi vuelvo antes. ¡Ojalá hubiera llamado a mi familia!"],
    [
      { type: "choice", q: "¿Cómo se sentía el narrador?", options: ["Solo", "Feliz", "Enojado", "Cansado"], answer: "Solo", why: "«oft einsam»." },
      { type: "tf", q: "El narrador deseaba haberse quedado en casa.", answer: true, why: "«Ich wünschte, ich wäre zu Hause geblieben»." },
      { type: "choice", q: "¿Qué estuvo a punto de hacer?", options: ["Volver antes", "Quedarse más", "Cambiar de país", "Llamar a un amigo"], answer: "Volver antes", why: "«Beinahe wäre ich früher zurückgefahren»." },
    ],
  ),
  akademisch: reading(
    "Un informe sobre bicicletas",
    "Leer un resumen académico y sumar dos palabras.",
    [
      { de: "die Nutzung", es: "el uso", emoji: "🚲", note: "«nutzen» = usar, aprovechar." },
      { de: "zunehmen", es: "aumentar", emoji: "📈", note: "Separable: «nimmt zu», «hat zugenommen»." },
    ],
    [
      cz("Der Studie ___ hat die Nutzung zugenommen.", "Según el estudio, el uso aumentó.", ["zufolge", "anhand", "mittels", "bezüglich"], "zufolge", "«zufolge» va después del sustantivo."),
      cz("___ in den Städten sind viele Menschen umgestiegen.", "En especial en las ciudades muchas personas cambiaron.", ["Insbesondere", "Demnach", "Mithin", "Entgegen"], "Insbesondere", "«insbesondere» = en especial."),
      { kind: "write", es: "el uso", references: ["die Nutzung"] },
    ],
    "Fahrräder",
    ["Der Studie zufolge hat die Nutzung von Fahrrädern deutlich zugenommen. Insbesondere in den Städten sind viele Menschen umgestiegen, demnach ist der Verkehr ruhiger geworden. Die Autoren legen dar, dass die Kosten sinken, sofern die Stadt neue Wege baut. Es handelt sich um eine Entwicklung, die man belegen kann."],
    ["Según el estudio, el uso de bicicletas aumentó notablemente. En especial en las ciudades, muchas personas cambiaron, por lo tanto el tránsito se volvió más tranquilo. Los autores exponen que los costos bajan, siempre que la ciudad construya nuevos caminos. Se trata de una evolución que se puede demostrar."],
    [
      { type: "choice", q: "¿Qué muestra el estudio?", options: ["Que aumentó el uso de bicicletas", "Que bajó", "Que no cambió", "Que hay menos ciudades"], answer: "Que aumentó el uso de bicicletas", why: "«die Nutzung von Fahrrädern deutlich zugenommen»." },
      { type: "tf", q: "El tránsito se volvió más ruidoso.", answer: false, why: "«der Verkehr ist ruhiger geworden»." },
      { type: "choice", q: "¿Cuándo bajan los costos según los autores?", options: ["Si la ciudad construye caminos nuevos", "Si suben los precios", "Si hay más autos", "Nunca"], answer: "Si la ciudad construye caminos nuevos", why: "«sofern die Stadt neue Wege baut»." },
    ],
  ),
};
