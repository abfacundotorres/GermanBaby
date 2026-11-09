// Currículo A1. Cada lección declara vocabulario (se presenta con tarjetas y
// genera ejercicios automáticos de opción múltiple y escucha) y ejercicios
// escritos a mano (armar frases, hablar, traducir, dictado).

export type Vocab = {
  de: string;
  es: string;
  emoji?: string;
  note?: string; // explicación gramatical o cultural breve
};

export type HandExercise =
  | { kind: "build"; es: string; answer: string; extra: string[] }
  | { kind: "speak"; de: string; es: string }
  | { kind: "write"; es: string; references: string[]; hint?: string }
  | { kind: "dictation"; de: string; es: string };

export type Lesson = {
  id: string;
  title: string;
  goal: string;
  vocab: Vocab[];
  exercises: HandExercise[];
};

export type Unit = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
  chat: {
    title: string;
    scenario: string; // para el system prompt (en español, describe el rol)
    opener: string; // primera frase del personaje, en alemán
    openerEs: string;
  };
};

export const UNITS: Unit[] = [
  {
    id: "hallo",
    title: "¡Hallo!",
    emoji: "👋",
    description: "Saludar, despedirte y presentarte.",
    lessons: [
      {
        id: "gruesse",
        title: "Saludos",
        goal: "Saludar y despedirte en situaciones formales e informales.",
        vocab: [
          { de: "Hallo", es: "Hola", emoji: "👋" },
          { de: "Guten Morgen", es: "Buenos días", emoji: "🌅", note: "Se usa hasta media mañana." },
          { de: "Guten Tag", es: "Buen día / Buenas tardes", emoji: "☀️", note: "Saludo formal durante el día." },
          { de: "Guten Abend", es: "Buenas noches (al llegar)", emoji: "🌙" },
          { de: "Tschüss", es: "Chau", emoji: "🙋", note: "Informal. La «ü» se dice con labios de «u» y lengua de «i»." },
          { de: "Auf Wiedersehen", es: "Adiós / Hasta luego (formal)", emoji: "🤝", note: "La «W» alemana suena como una «v» con los dientes sobre el labio." },
        ],
        exercises: [
          { kind: "speak", de: "Guten Morgen", es: "Buenos días" },
          { kind: "build", es: "Buenas tardes y adiós", answer: "Guten Tag und auf Wiedersehen", extra: ["Morgen", "Tschüss"] },
          { kind: "dictation", de: "Tschüss", es: "Chau" },
          { kind: "speak", de: "Auf Wiedersehen", es: "Adiós (formal)" },
          { kind: "write", es: "Hola, buenas noches", references: ["Hallo, guten Abend"] },
        ],
      },
      {
        id: "vorstellen",
        title: "Presentarte",
        goal: "Decir tu nombre, de dónde sos y preguntar lo mismo.",
        vocab: [
          { de: "Ich heiße Ana", es: "Me llamo Ana", emoji: "🙂", note: "«heiße» viene de «heißen» (llamarse). La «ß» es una «s» fuerte." },
          { de: "Wie heißt du?", es: "¿Cómo te llamás?", emoji: "❓", note: "«du» es el vos/tú informal." },
          { de: "Wie heißen Sie?", es: "¿Cómo se llama (usted)?", emoji: "🎩", note: "«Sie» con mayúscula es el usted. El verbo va igual que con «ellos»." },
          { de: "Ich komme aus Argentinien", es: "Soy de Argentina", emoji: "🇦🇷", note: "Literal: «vengo de Argentina»." },
          { de: "Woher kommst du?", es: "¿De dónde sos?", emoji: "🗺️" },
          { de: "Freut mich!", es: "¡Mucho gusto!", emoji: "😊" },
        ],
        exercises: [
          { kind: "build", es: "¿Cómo te llamás?", answer: "Wie heißt du", extra: ["Sie", "heiße", "Woher"] },
          { kind: "speak", de: "Ich heiße Ana", es: "Me llamo Ana" },
          { kind: "write", es: "Soy de Argentina", references: ["Ich komme aus Argentinien"] },
          { kind: "build", es: "¿De dónde sos?", answer: "Woher kommst du", extra: ["komme", "Wie", "Sie"] },
          { kind: "speak", de: "Woher kommst du?", es: "¿De dónde sos?" },
          { kind: "dictation", de: "Freut mich", es: "¡Mucho gusto!" },
          { kind: "write", es: "¿Cómo se llama usted?", references: ["Wie heißen Sie?"], hint: "Formal: usá «Sie»." },
        ],
      },
      {
        id: "wie-gehts",
        title: "¿Cómo andás?",
        goal: "Preguntar cómo está alguien y responder.",
        vocab: [
          { de: "Wie geht's?", es: "¿Cómo andás?", emoji: "🤔", note: "Forma corta de «Wie geht es dir?»." },
          { de: "Gut, danke", es: "Bien, gracias", emoji: "👍" },
          { de: "Sehr gut", es: "Muy bien", emoji: "🤩" },
          { de: "Nicht so gut", es: "No tan bien", emoji: "😕" },
          { de: "Und dir?", es: "¿Y vos?", emoji: "👉", note: "«dir» es el dativo de «du»: «¿y a vos (cómo te va)?»." },
          { de: "Danke", es: "Gracias", emoji: "🙏" },
          { de: "Bitte", es: "Por favor / De nada", emoji: "💐" },
        ],
        exercises: [
          { kind: "speak", de: "Wie geht's?", es: "¿Cómo andás?" },
          { kind: "build", es: "Bien, gracias. ¿Y vos?", answer: "Gut danke und dir", extra: ["Sie", "nicht", "sehr"] },
          { kind: "write", es: "Muy bien, gracias", references: ["Sehr gut, danke"] },
          { kind: "dictation", de: "Nicht so gut", es: "No tan bien" },
          { kind: "speak", de: "Gut, danke. Und dir?", es: "Bien, gracias. ¿Y vos?" },
        ],
      },
    ],
    chat: {
      title: "Conocer a alguien en un bar de Berlín",
      scenario:
        "Sos Lena, una estudiante alemana simpática de 24 años que conoce al usuario en un bar de Berlín. Lo saludás, le preguntás cómo se llama, de dónde es y cómo está.",
      opener: "Hallo! Ich heiße Lena. Wie heißt du?",
      openerEs: "¡Hola! Me llamo Lena. ¿Cómo te llamás?",
    },
  },
  {
    id: "zahlen",
    title: "Números",
    emoji: "🔢",
    description: "Contar del 1 al 10 y decir tu edad.",
    lessons: [
      {
        id: "eins-fuenf",
        title: "Del 1 al 5",
        goal: "Contar del uno al cinco.",
        vocab: [
          { de: "eins", es: "uno", emoji: "1️⃣", note: "«ei» se pronuncia «ai»." },
          { de: "zwei", es: "dos", emoji: "2️⃣", note: "La «z» alemana suena «ts»: «tsvai»." },
          { de: "drei", es: "tres", emoji: "3️⃣" },
          { de: "vier", es: "cuatro", emoji: "4️⃣", note: "La «v» alemana suena como «f»: «fiar»." },
          { de: "fünf", es: "cinco", emoji: "5️⃣" },
        ],
        exercises: [
          { kind: "speak", de: "zwei", es: "dos" },
          { kind: "dictation", de: "vier", es: "cuatro" },
          { kind: "speak", de: "eins, zwei, drei", es: "uno, dos, tres" },
          { kind: "write", es: "cinco", references: ["fünf"] },
        ],
      },
      {
        id: "sechs-zehn",
        title: "Del 6 al 10",
        goal: "Contar del seis al diez.",
        vocab: [
          { de: "sechs", es: "seis", emoji: "6️⃣", note: "«chs» suena «ks»: «seks»." },
          { de: "sieben", es: "siete", emoji: "7️⃣", note: "La «s» antes de vocal suena como una «z» zumbada." },
          { de: "acht", es: "ocho", emoji: "8️⃣", note: "La «ch» después de «a» es una «j» suave, raspando la garganta." },
          { de: "neun", es: "nueve", emoji: "9️⃣", note: "«eu» se pronuncia «oi»." },
          { de: "zehn", es: "diez", emoji: "🔟" },
        ],
        exercises: [
          { kind: "speak", de: "acht", es: "ocho" },
          { kind: "dictation", de: "neun", es: "nueve" },
          { kind: "speak", de: "sechs, sieben, acht", es: "seis, siete, ocho" },
          { kind: "write", es: "diez", references: ["zehn"] },
        ],
      },
      {
        id: "alter",
        title: "Tu edad",
        goal: "Preguntar y decir la edad.",
        vocab: [
          { de: "Wie alt bist du?", es: "¿Cuántos años tenés?", emoji: "🎂", note: "En alemán se «es» de una edad: literalmente «¿qué tan viejo sos?»." },
          { de: "Ich bin zehn Jahre alt", es: "Tengo diez años", emoji: "🧒", note: "Ich bin = yo soy. Jahre = años." },
          { de: "das Jahr", es: "el año", emoji: "📅", note: "Sustantivo neutro: das. Plural: die Jahre." },
          { de: "alt", es: "viejo / de edad", emoji: "👴" },
          { de: "jung", es: "joven", emoji: "👶", note: "La «j» suena como «i» (ye): «iung»." },
        ],
        exercises: [
          { kind: "build", es: "¿Cuántos años tenés?", answer: "Wie alt bist du", extra: ["bin", "Jahre", "Sie"] },
          { kind: "speak", de: "Wie alt bist du?", es: "¿Cuántos años tenés?" },
          { kind: "build", es: "Tengo ocho años", answer: "Ich bin acht Jahre alt", extra: ["habe", "bist", "Jahr"] },
          { kind: "write", es: "Tengo nueve años", references: ["Ich bin neun Jahre alt", "Ich bin neun"], hint: "En alemán se usa «ser», no «tener»." },
          { kind: "speak", de: "Ich bin zehn Jahre alt", es: "Tengo diez años" },
        ],
      },
    ],
    chat: {
      title: "Un nene curioso en el parque",
      scenario:
        "Sos Max, un nene alemán de 8 años muy curioso en un parque de Múnich. Le hacés al usuario preguntas simples: cómo se llama, cuántos años tiene, y le proponés contar juntos hasta diez.",
      opener: "Hallo! Ich bin Max. Ich bin acht Jahre alt. Wie alt bist du?",
      openerEs: "¡Hola! Soy Max. Tengo ocho años. ¿Cuántos años tenés?",
    },
  },
  {
    id: "cafe",
    title: "En el café",
    emoji: "☕",
    description: "Pedir algo para tomar y comer, y pagar.",
    lessons: [
      {
        id: "getraenke",
        title: "Bebidas y comida",
        goal: "Nombrar bebidas y comidas con su artículo.",
        vocab: [
          { de: "der Kaffee", es: "el café", emoji: "☕", note: "Masculino: der. En alemán cada sustantivo tiene género y siempre va con mayúscula." },
          { de: "der Tee", es: "el té", emoji: "🍵" },
          { de: "das Wasser", es: "el agua", emoji: "💧", note: "Neutro: das. Ojo: en español es femenino." },
          { de: "die Milch", es: "la leche", emoji: "🥛", note: "Femenino: die. La «ch» después de «i» es suave, como un gato que bufa." },
          { de: "das Brötchen", es: "el pancito", emoji: "🥖", note: "Todo sustantivo terminado en -chen es neutro (das)." },
          { de: "der Kuchen", es: "la torta", emoji: "🍰" },
        ],
        exercises: [
          { kind: "speak", de: "das Brötchen", es: "el pancito" },
          { kind: "write", es: "el agua", references: ["das Wasser"], hint: "No te olvides del artículo." },
          { kind: "dictation", de: "die Milch", es: "la leche" },
          { kind: "speak", de: "der Kaffee und der Kuchen", es: "el café y la torta" },
        ],
      },
      {
        id: "bestellen",
        title: "Pedir",
        goal: "Pedir algo con «Ich möchte…».",
        vocab: [
          { de: "Ich möchte einen Kaffee", es: "Quisiera un café", emoji: "🙋", note: "Con masculinos, «ein» pasa a «einen» cuando es el objeto (acusativo)." },
          { de: "Ich möchte ein Wasser", es: "Quisiera un agua", emoji: "💧", note: "Neutro: «ein» no cambia." },
          { de: "Ich möchte eine Limonade", es: "Quisiera una limonada", emoji: "🍋", note: "Femenino: «eine» no cambia." },
          { de: "Was möchten Sie?", es: "¿Qué desea?", emoji: "🧑‍🍳" },
          { de: "Sonst noch etwas?", es: "¿Algo más?", emoji: "➕" },
          { de: "Nein, danke", es: "No, gracias", emoji: "🙅" },
        ],
        exercises: [
          { kind: "build", es: "Quisiera un café, por favor", answer: "Ich möchte einen Kaffee bitte", extra: ["ein", "eine", "Tee"] },
          { kind: "speak", de: "Ich möchte einen Tee, bitte", es: "Quisiera un té, por favor" },
          { kind: "write", es: "Quisiera un pancito", references: ["Ich möchte ein Brötchen"], hint: "Brötchen es neutro." },
          { kind: "write", es: "Quisiera una torta", references: ["Ich möchte einen Kuchen"], hint: "Kuchen es masculino. En alemán «una torta» es «einen Kuchen»." },
          { kind: "speak", de: "Nein, danke", es: "No, gracias" },
        ],
      },
      {
        id: "bezahlen",
        title: "Pagar",
        goal: "Pedir la cuenta y preguntar el precio.",
        vocab: [
          { de: "Die Rechnung, bitte", es: "La cuenta, por favor", emoji: "🧾" },
          { de: "Was kostet das?", es: "¿Cuánto cuesta?", emoji: "💶" },
          { de: "Das kostet drei Euro", es: "Cuesta tres euros", emoji: "3️⃣" },
          { de: "Zusammen oder getrennt?", es: "¿Juntos o separado?", emoji: "👥", note: "En Alemania es muy común pagar cada uno lo suyo." },
          { de: "Stimmt so", es: "Quedate con el cambio", emoji: "🪙", note: "Se dice al redondear para dejar propina." },
        ],
        exercises: [
          { kind: "speak", de: "Die Rechnung, bitte", es: "La cuenta, por favor" },
          { kind: "build", es: "¿Cuánto cuesta el café?", answer: "Was kostet der Kaffee", extra: ["das", "Wie", "kosten"] },
          { kind: "dictation", de: "Das kostet fünf Euro", es: "Cuesta cinco euros" },
          { kind: "write", es: "La cuenta, por favor", references: ["Die Rechnung, bitte"] },
          { kind: "speak", de: "Zusammen oder getrennt?", es: "¿Juntos o separado?" },
        ],
      },
    ],
    chat: {
      title: "Pedir en un café de Viena",
      scenario:
        "Sos Herr Huber, un mozo amable de un café tradicional de Viena. Atendés al usuario de usted (Sie): le preguntás qué desea, si quiere algo más, y al final le decís el precio y le preguntás si paga junto o separado. Precios: Kaffee 3 €, Tee 2,50 €, Wasser 2 €, Kuchen 4 €, Brötchen 1,50 €.",
      opener: "Guten Tag! Was möchten Sie?",
      openerEs: "¡Buenas tardes! ¿Qué desea?",
    },
  },
];

export function getUnit(unitId: string) {
  return UNITS.find((u) => u.id === unitId);
}

export function getLesson(unitId: string, lessonId: string) {
  const unit = getUnit(unitId);
  const lesson = unit?.lessons.find((l) => l.id === lessonId);
  return unit && lesson ? { unit, lesson } : undefined;
}

export const lessonKey = (unitId: string, lessonId: string) => `${unitId}/${lessonId}`;

/** Orden global de lecciones, para desbloquear de a una. */
export const LESSON_ORDER: string[] = UNITS.flatMap((u) => u.lessons.map((l) => lessonKey(u.id, l.id)));

export const ALL_VOCAB: (Vocab & { unitId: string })[] = UNITS.flatMap((u) =>
  u.lessons.flatMap((l) => l.vocab.map((v) => ({ ...v, unitId: u.id }))),
);
