// Lecturas: una lección extra (opcional) al final de cada unidad desde la 9. Cada una trae un texto con
// audio y traducción, palabras nuevas con tarjetas, ejercicios de completar y preguntas de comprensión.
// No bloquean el avance: se abren al terminar la lección anterior de su unidad.

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
export const READINGS: Record<string, Lesson> = {
  wohnung: reading(
    "Mi departamento",
    "Leer una descripción corta de una vivienda y ampliar el vocabulario.",
    [
      { de: "der Garten", es: "el jardín", emoji: "🌳", note: "Plural: «die Gärten»." },
      { de: "ruhig", es: "tranquilo", emoji: "🤫", note: "Para un lugar sin ruido." },
    ],
    [
      cz("Die Wohnung ist klein, ___ schön.", "El departamento es chico, pero lindo.", ["aber", "und", "oder", "weil"], "aber", "«aber» = pero."),
      cz("Ich habe ___ Garten.", "Tengo un jardín.", ["einen", "ein", "eine", "einem"], "einen", "«der Garten» es masculino: «einen»."),
      { kind: "write", es: "el jardín", references: ["der Garten"] },
    ],
    "Meine Wohnung",
    ["Das ist meine Wohnung. Sie ist klein, aber schön und hell. Ich habe ein Wohnzimmer, ein Schlafzimmer, eine Küche und ein Bad. Ich habe auch einen Garten. Er ist ruhig."],
    ["Este es mi departamento. Es chico, pero lindo y luminoso. Tengo un living, un dormitorio, una cocina y un baño. También tengo un jardín. Es tranquilo."],
    [
      { type: "tf", q: "El departamento es grande.", answer: false, why: "«Sie ist klein»." },
      { type: "choice", q: "¿Qué tiene además de los ambientes?", options: ["Un jardín", "Un balcón", "Una terraza", "Un garaje"], answer: "Un jardín", why: "«Ich habe auch einen Garten»." },
      { type: "choice", q: "¿Cómo es el jardín?", options: ["Tranquilo", "Ruidoso", "Grande", "Nuevo"], answer: "Tranquilo", why: "«Er ist ruhig»." },
    ],
  ),
  stadt: reading(
    "Mi ciudad",
    "Leer sobre una ciudad chica y aprender palabras para describirla.",
    [
      { de: "das Zentrum", es: "el centro", emoji: "🏙️", note: "Neutro. «im Zentrum» = en el centro." },
      { de: "die Kirche", es: "la iglesia", emoji: "⛪" },
      { de: "der Platz", es: "la plaza", emoji: "🟫", note: "Plural: «die Plätze»." },
    ],
    [
      cz("Der Bahnhof ist ___ weit.", "La estación no está lejos.", ["nicht", "kein", "keine", "nichts"], "nicht", "«nicht» niega el adjetivo «weit»."),
      cz("Ich gehe ___ Bahnhof.", "Voy a la estación.", ["zum", "zur", "im", "am"], "zum", "zu + dem = zum."),
      { kind: "write", es: "la plaza", references: ["der Platz"] },
    ],
    "Meine Stadt",
    ["Meine Stadt ist klein. Im Zentrum gibt es einen Platz, eine Kirche und einen Supermarkt. Der Bahnhof ist nicht weit. Ich gehe zu Fuß zum Park. Es gibt keine Bank, aber es gibt eine Apotheke."],
    ["Mi ciudad es chica. En el centro hay una plaza, una iglesia y un supermercado. La estación no está lejos. Voy a pie al parque. No hay banco, pero hay una farmacia."],
    [
      { type: "tf", q: "En la ciudad hay un banco.", answer: false, why: "«Es gibt keine Bank»." },
      { type: "choice", q: "¿Cómo va al parque?", options: ["A pie", "En bus", "En tren", "En auto"], answer: "A pie", why: "«zu Fuß»." },
      { type: "choice", q: "¿Qué hay en el centro?", options: ["Una plaza, una iglesia y un supermercado", "Una estación", "Un hospital", "Un museo"], answer: "Una plaza, una iglesia y un supermercado", why: "«einen Platz, eine Kirche und einen Supermarkt»." },
    ],
  ),
  essen: reading(
    "Al mediodía",
    "Leer sobre qué come una familia y aprender nombres de comidas.",
    [
      { de: "der Reis", es: "el arroz", emoji: "🍚" },
      { de: "die Kartoffel", es: "la papa", emoji: "🥔", note: "Plural: «die Kartoffeln»." },
      { de: "das Gemüse", es: "las verduras", emoji: "🥦", note: "Se usa en singular: «das Gemüse»." },
      { de: "Ich habe Hunger", es: "Tengo hambre", emoji: "😋", note: "Literal: «tengo hambre»; sin artículo." },
    ],
    [
      cz("Mein Bruder ___ Fleisch.", "Mi hermano come carne.", ["isst", "esse", "esst", "essen"], "isst", "Con «er»: isst."),
      cz("Ich esse gern Fisch ___ Reis.", "Me gusta comer pescado con arroz.", ["mit", "von", "bei", "zu"], "mit", "«mit» = con."),
      { kind: "write", es: "el arroz", references: ["der Reis"] },
    ],
    "Das Mittagessen",
    ["Ich habe Hunger! Zum Mittagessen esse ich gern Fisch mit Reis. Mein Bruder isst Fleisch mit Kartoffeln. Meine Mutter ist Vegetarierin: Sie isst Gemüse und Käse. Wir trinken Wasser. Das schmeckt gut!"],
    ["¡Tengo hambre! Al mediodía me gusta comer pescado con arroz. Mi hermano come carne con papas. Mi mamá es vegetariana: come verduras y queso. Tomamos agua. ¡Está rico!"],
    [
      { type: "choice", q: "¿Qué come el hermano?", options: ["Carne con papas", "Pescado con arroz", "Verduras", "Pizza"], answer: "Carne con papas", why: "«Mein Bruder isst Fleisch mit Kartoffeln»." },
      { type: "tf", q: "La mamá es vegetariana.", answer: true, why: "«Meine Mutter ist Vegetarierin»." },
      { type: "choice", q: "¿Qué toman?", options: ["Agua", "Té", "Café", "Leche"], answer: "Agua", why: "«Wir trinken Wasser»." },
    ],
  ),
  modal: reading(
    "Un viaje de fin de semana",
    "Leer un plan con können, müssen y wollen.",
    [
      { de: "die Reise", es: "el viaje", emoji: "🧳", note: "«eine Reise machen» = hacer un viaje." },
      { de: "früh", es: "temprano", emoji: "🌅", note: "«früh aufstehen» = levantarse temprano." },
    ],
    [
      cz("Ich ___ nach Wien fahren.", "Quiero viajar a Viena.", ["will", "willst", "wollen", "wollt"], "will", "Con «ich»: will."),
      cz("Er ___ arbeiten.", "Él tiene que trabajar.", ["muss", "musst", "müssen", "müsst"], "muss", "Con «er»: muss."),
      { kind: "write", es: "el viaje", references: ["die Reise"] },
    ],
    "Mein Wochenende",
    ["Am Wochenende will ich eine Reise machen. Ich will nach Wien fahren. Ich kann mit dem Zug fahren, aber ich muss früh aufstehen. Mein Bruder kann nicht kommen: Er muss arbeiten."],
    ["El fin de semana quiero hacer un viaje. Quiero ir a Viena. Puedo ir en tren, pero tengo que levantarme temprano. Mi hermano no puede venir: tiene que trabajar."],
    [
      { type: "choice", q: "¿Adónde quiere viajar?", options: ["A Viena", "A Berlín", "A Múnich", "A Hamburgo"], answer: "A Viena", why: "«nach Wien fahren»." },
      { type: "choice", q: "¿Por qué no puede ir su hermano?", options: ["Porque tiene que trabajar", "Porque está enfermo", "Porque no quiere", "Porque no tiene dinero"], answer: "Porque tiene que trabajar", why: "«Er muss arbeiten»." },
      { type: "tf", q: "Tiene que levantarse temprano.", answer: true, why: "«ich muss früh aufstehen»." },
    ],
  ),
  perfekt: reading(
    "Una excursión",
    "Leer un relato corto en Perfekt y ampliar el vocabulario de viaje.",
    [
      { de: "der Ausflug", es: "la excursión", emoji: "🚌", note: "«einen Ausflug machen» = hacer una excursión." },
      { de: "das Museum", es: "el museo", emoji: "🏛️", note: "Plural: «die Museen»." },
      { de: "das Foto", es: "la foto", emoji: "📷", note: "«Fotos machen» = sacar fotos." },
    ],
    [
      cz("Ich ___ mit dem Zug gefahren.", "Viajé en tren.", ["bin", "habe", "hat", "ist"], "bin", "«fahren» usa «sein»."),
      cz("Ich ___ ein Museum gesehen.", "Vi un museo.", ["habe", "bin", "ist", "hat"], "habe", "«sehen» usa «haben»."),
      { kind: "write", es: "la excursión", references: ["der Ausflug"] },
    ],
    "Ein Ausflug",
    ["Am Samstag habe ich einen Ausflug gemacht. Ich bin mit dem Zug nach Hamburg gefahren. Dort habe ich ein Museum gesehen und viele Fotos gemacht. Am Abend habe ich Fisch gegessen. Das war ein schöner Tag!"],
    ["El sábado hice una excursión. Viajé en tren a Hamburgo. Allá vi un museo y saqué muchas fotos. A la noche comí pescado. ¡Fue un lindo día!"],
    [
      { type: "choice", q: "¿Cómo viajó?", options: ["En tren", "En bus", "En auto", "En avión"], answer: "En tren", why: "«mit dem Zug»." },
      { type: "choice", q: "¿Qué comió a la noche?", options: ["Pescado", "Carne", "Sopa", "Pizza"], answer: "Pescado", why: "«Fisch gegessen»." },
      { type: "tf", q: "Sacó muchas fotos.", answer: true, why: "«viele Fotos gemacht»." },
    ],
  ),
  pruefung: reading(
    "Estudiar para el examen",
    "Leer sobre una rutina de estudio y aprender palabras para hablar de estudiar.",
    [
      { de: "die Stunde", es: "la hora (de clase o duración)", emoji: "⏱️", note: "Plural: «die Stunden». Para la hora del reloj se usa «Uhr»." },
      { de: "das Wort", es: "la palabra", emoji: "🔤", note: "Plural: «die Wörter»." },
      { de: "schwer", es: "difícil / pesado", emoji: "😓", note: "«Das Wort ist schwer»." },
      { de: "üben", es: "practicar", emoji: "🏋️", note: "«Ich übe» = practico." },
    ],
    [
      cz("Meine Prüfung ist ___ zehnten Juni.", "Mi examen es el 10 de junio.", ["am", "im", "um", "vom"], "am", "Con fechas: «am» + ordinal."),
      cz("Ich lerne jeden Tag ___ Stunde.", "Estudio una hora por día.", ["eine", "einen", "ein", "einem"], "eine", "«die Stunde» es femenino."),
      { kind: "write", es: "la palabra", references: ["das Wort"] },
    ],
    "Die Prüfung",
    ["Meine Prüfung ist am zehnten Juni. Ich lerne jeden Tag eine Stunde Deutsch. Ich lerne viele Wörter. Manche Wörter sind schwer, aber ich übe."],
    ["Mi examen es el 10 de junio. Estudio alemán una hora por día. Aprendo muchas palabras. Algunas palabras son difíciles, pero practico."],
    [
      { type: "tf", q: "El examen es el 10 de junio.", answer: true, why: "«am zehnten Juni»." },
      { type: "fill", q: "¿Cuántas horas estudia por día? (un número)", answers: ["1", "eine", "ein", "eine stunde"], hint: "Un número", why: "«eine Stunde»." },
      { type: "choice", q: "¿Cómo son algunas palabras?", options: ["Difíciles", "Fáciles", "Largas", "Nuevas"], answer: "Difíciles", why: "«Manche Wörter sind schwer»." },
    ],
  ),
  vergangenheit: reading(
    "Mi historia",
    "Leer una historia personal con pasado, vor y seit.",
    [
      { de: "Deutschland", es: "Alemania", emoji: "🇩🇪" },
      { de: "kaum", es: "apenas / casi no", emoji: "🤏", note: "«Ich konnte kaum Deutsch» = casi no sabía alemán." },
      { de: "die Geschichte", es: "la historia / el relato", emoji: "📜" },
    ],
    [
      cz("Vor fünf Jahren ___ ich nach Deutschland gekommen.", "Hace cinco años llegué a Alemania.", ["bin", "habe", "war", "hatte"], "bin", "«kommen» usa «sein»."),
      cz("Ich lerne ___ zwei Jahren Deutsch.", "Estudio alemán desde hace dos años.", ["seit", "vor", "für", "bei"], "seit", "Algo que sigue hasta hoy: «seit»."),
      { kind: "write", es: "la historia", references: ["die Geschichte"] },
    ],
    "Meine Geschichte",
    [
      "Ich bin in Argentinien geboren. Als Kind habe ich in Buenos Aires gewohnt.",
      "Vor fünf Jahren bin ich nach Deutschland gekommen. Ich wollte hier arbeiten, aber ich konnte kaum Deutsch. Seit zwei Jahren lerne ich Deutsch, und heute geht es gut.",
    ],
    [
      "Nací en Argentina. De chico viví en Buenos Aires.",
      "Hace cinco años llegué a Alemania. Quería trabajar acá, pero casi no sabía alemán. Desde hace dos años estudio alemán y hoy me va bien.",
    ],
    [
      { type: "choice", q: "¿Dónde nació?", options: ["En Argentina", "En España", "En Alemania", "En Austria"], answer: "En Argentina", why: "«in Argentinien geboren»." },
      { type: "fill", q: "¿Hace cuántos años llegó a Alemania? (un número)", answers: ["5", "fünf"], hint: "Un número", why: "«Vor fünf Jahren»." },
      { type: "fill", q: "¿Desde hace cuántos años estudia alemán? (un número)", answers: ["2", "zwei"], hint: "Un número", why: "«Seit zwei Jahren»." },
      { type: "tf", q: "Cuando llegó hablaba muy bien alemán.", answer: false, why: "«ich konnte kaum Deutsch»." },
    ],
  ),
  gesundheit: reading(
    "Estoy enfermo",
    "Leer un relato sobre una enfermedad con imperativo y reflexivos.",
    [
      { de: "viel", es: "mucho", emoji: "➕", note: "«viel Wasser» = mucha agua." },
      { de: "bald", es: "pronto", emoji: "🔜" },
      { de: "sagen", es: "decir", emoji: "💬", note: "«Der Arzt sagt…» = el médico dice…" },
    ],
    [
      cz("Ich ___ krank.", "Estoy enfermo.", ["bin", "habe", "hat", "ist"], "bin", "«krank sein» = estar enfermo."),
      cz("___ Sie im Bett!", "¡Quédese en la cama!", ["Bleiben", "Bleibt", "Bleib", "Bleibe"], "Bleiben", "Imperativo con «Sie»: infinitivo + Sie."),
      { kind: "write", es: "pronto", references: ["bald"] },
    ],
    "Beim Arzt",
    [
      "Ich bin krank. Ich habe Fieber und Husten, und mein Kopf tut weh. Ich gehe zum Arzt. Der Arzt sagt: «Bleiben Sie im Bett und trinken Sie viel Wasser!»",
      "Dann gehe ich in die Apotheke. Ich ruhe mich aus. Bald bin ich wieder gesund.",
    ],
    [
      "Estoy enfermo. Tengo fiebre y tos, y me duele la cabeza. Voy al médico. El médico dice: «¡Quédese en la cama y tome mucha agua!»",
      "Después voy a la farmacia. Descanso. Pronto voy a estar sano de nuevo.",
    ],
    [
      { type: "choice", q: "¿Qué síntomas tiene?", options: ["Fiebre, tos y dolor de cabeza", "Dolor de estómago", "Dolor de espalda", "Solo cansancio"], answer: "Fiebre, tos y dolor de cabeza", why: "«Fieber und Husten, und mein Kopf tut weh»." },
      { type: "choice", q: "¿Qué le dice el médico?", options: ["Que se quede en la cama y tome mucha agua", "Que trabaje", "Que viaje", "Que haga deporte"], answer: "Que se quede en la cama y tome mucha agua", why: "«Bleiben Sie im Bett und trinken Sie viel Wasser»." },
      { type: "tf", q: "Después va a la farmacia.", answer: true, why: "«Dann gehe ich in die Apotheke»." },
    ],
  ),
  kleidung: reading(
    "Mi ropa de invierno",
    "Leer una descripción de ropa con adjetivos con terminación.",
    [
      { de: "der Winter", es: "el invierno", emoji: "❄️" },
      { de: "die Mütze", es: "el gorro", emoji: "🧢" },
      { de: "der Schal", es: "la bufanda", emoji: "🧣" },
      { de: "tragen", es: "llevar puesto", emoji: "👕", note: "«er trägt» = él lleva puesto. Cambia la vocal: a → ä." },
    ],
    [
      cz("Ich trage ___ rote Mütze.", "Llevo un gorro rojo.", ["eine", "einen", "ein", "einem"], "eine", "«die Mütze» es femenino: «eine»."),
      cz("Er trägt ___ grünen Pullover.", "Él lleva un pulóver verde.", ["einen", "eine", "ein", "einem"], "einen", "«der Pullover» como objeto: «einen»."),
      { kind: "write", es: "la bufanda", references: ["der Schal"] },
    ],
    "Im Winter",
    ["Im Winter trage ich eine schwarze Jacke, eine rote Mütze und einen blauen Schal. Meine Schuhe sind braun. Mein Bruder trägt gern einen grünen Pullover."],
    ["En invierno llevo una campera negra, un gorro rojo y una bufanda azul. Mis zapatos son marrones. A mi hermano le gusta llevar un pulóver verde."],
    [
      { type: "choice", q: "¿De qué color es el gorro?", options: ["Rojo", "Verde", "Azul", "Negro"], answer: "Rojo", why: "«eine rote Mütze»." },
      { type: "choice", q: "¿Qué lleva el hermano?", options: ["Un pulóver verde", "Una campera negra", "Zapatos marrones", "Un gorro"], answer: "Un pulóver verde", why: "«einen grünen Pullover»." },
      { type: "tf", q: "Los zapatos son negros.", answer: false, why: "«Meine Schuhe sind braun»." },
    ],
  ),
  gruende: reading(
    "Por qué estudio alemán",
    "Leer razones y opiniones con weil, dass y wenn.",
    [
      { de: "leicht", es: "fácil", emoji: "🪶", note: "Lo contrario de «schwer»." },
      { de: "schwierig", es: "difícil", emoji: "🧗", note: "Parecido a «schwer», más para tareas y problemas." },
      { de: "die Grammatik", es: "la gramática", emoji: "📘" },
    ],
    [
      cz("Ich lerne Deutsch, ___ ich in Berlin arbeite.", "Estudio alemán porque trabajo en Berlín.", ["weil", "denn", "dass", "wenn"], "weil", "Con el verbo al final: «weil»."),
      cz("Wenn ich jeden Tag übe, ___ ich viel.", "Si practico todos los días, aprendo mucho.", ["lerne", "lernen", "gelernt", "lernst"], "lerne", "Después de la coma va el verbo de la principal."),
      { kind: "write", es: "la gramática", references: ["die Grammatik"] },
    ],
    "Mein Deutsch",
    ["Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte. Ich finde, dass Deutsch nicht leicht ist, denn die Grammatik ist schwierig. Aber wenn ich jeden Tag übe, lerne ich viel."],
    ["Estudio alemán porque quiero trabajar en Alemania. Me parece que el alemán no es fácil, porque la gramática es difícil. Pero si practico todos los días, aprendo mucho."],
    [
      { type: "choice", q: "¿Por qué estudia alemán?", options: ["Porque quiere trabajar en Alemania", "Porque tiene un examen", "Porque le gusta viajar", "Porque su familia es alemana"], answer: "Porque quiere trabajar en Alemania", why: "«weil ich in Deutschland arbeiten möchte»." },
      { type: "choice", q: "¿Qué piensa de la gramática?", options: ["Que es difícil", "Que es fácil", "Que es aburrida", "Que es corta"], answer: "Que es difícil", why: "«die Grammatik ist schwierig»." },
      { type: "tf", q: "Cree que el alemán es muy fácil.", answer: false, why: "«Deutsch nicht leicht ist»." },
    ],
  ),
  geschenke: reading(
    "Un cumpleaños en familia",
    "Leer sobre regalos y ayudar en casa, con el dativo.",
    [
      { de: "backen", es: "hornear", emoji: "🥧", note: "«Wir backen einen Kuchen» = horneamos una torta." },
      { de: "die Überraschung", es: "la sorpresa", emoji: "🎉" },
    ],
    [
      cz("Ich schenke ___ Blumen.", "Le regalo flores (a ella).", ["ihr", "sie", "ihn", "ihm"], "ihr", "Dativo de «sie» (ella): ihr."),
      cz("Ich helfe ___ Mutter.", "Ayudo a mi madre.", ["meiner", "meine", "meinem", "meinen"], "meiner", "«helfen» + dativo femenino: meiner."),
      { kind: "write", es: "la sorpresa", references: ["die Überraschung"] },
    ],
    "Ein Geburtstag",
    ["Am Samstag hat meine Schwester Geburtstag. Ich schenke ihr Blumen und ein Buch. Meine Eltern schenken ihr eine Reise nach Wien. Das ist eine Überraschung! Ich helfe meiner Mutter: Wir kochen und backen einen Kuchen."],
    ["El sábado cumple años mi hermana. Le regalo flores y un libro. Mis padres le regalan un viaje a Viena. ¡Es una sorpresa! Ayudo a mi madre: cocinamos y horneamos una torta."],
    [
      { type: "choice", q: "¿Qué le regalan sus padres?", options: ["Un viaje a Viena", "Flores", "Un libro", "Una torta"], answer: "Un viaje a Viena", why: "«eine Reise nach Wien»." },
      { type: "tf", q: "El narrador le regala flores y un libro.", answer: true, why: "«Blumen und ein Buch»." },
      { type: "choice", q: "¿Qué hacen el narrador y su mamá?", options: ["Cocinan y hornean una torta", "Compran regalos", "Limpian", "Viajan"], answer: "Cocinan y hornean una torta", why: "«kochen und backen einen Kuchen»." },
    ],
  ),
  ort: reading(
    "Mi cuarto",
    "Leer la descripción de un cuarto con preposiciones de lugar.",
    [
      { de: "die Ecke", es: "el rincón / la esquina", emoji: "📐", note: "«in der Ecke» = en el rincón." },
      { de: "der Schreibtisch", es: "el escritorio", emoji: "🖥️" },
    ],
    [
      cz("Auf dem Schreibtisch ___ Bücher.", "Sobre el escritorio hay libros.", ["liegen", "legen", "legt", "gelegt"], "liegen", "Dónde están (acostados): «liegen»."),
      cz("Ich hänge das Bild ___ die Wand.", "Cuelgo el cuadro en la pared.", ["an", "in", "unter", "hinter"], "an", "«an die Wand» (adónde: acusativo)."),
      { kind: "write", es: "el escritorio", references: ["der Schreibtisch"] },
    ],
    "Mein Zimmer",
    ["Mein Zimmer ist klein, aber schön. In der Ecke steht ein Schreibtisch. Auf dem Schreibtisch liegen Bücher. Neben dem Schreibtisch steht ein Regal. An der Wand hängt ein Bild. Mein Bett steht am Fenster, und unter dem Bett stehen meine Schuhe."],
    ["Mi cuarto es chico, pero lindo. En el rincón hay un escritorio. Sobre el escritorio hay libros. Al lado del escritorio hay un estante. En la pared hay un cuadro. Mi cama está junto a la ventana y debajo de la cama están mis zapatos."],
    [
      { type: "choice", q: "¿Dónde está el escritorio?", options: ["En el rincón", "Junto a la puerta", "En el balcón", "Debajo de la cama"], answer: "En el rincón", why: "«In der Ecke steht ein Schreibtisch»." },
      { type: "choice", q: "¿Dónde están los zapatos?", options: ["Debajo de la cama", "Sobre la mesa", "En el armario", "Detrás de la puerta"], answer: "Debajo de la cama", why: "«unter dem Bett stehen meine Schuhe»." },
      { type: "tf", q: "Hay un cuadro en la pared.", answer: true, why: "«An der Wand hängt ein Bild»." },
    ],
  ),
  reise: reading(
    "Vacaciones junto al mar",
    "Leer un plan de vacaciones con comparativos.",
    [
      { de: "das Meer", es: "el mar", emoji: "🌊", note: "Neutro. «am Meer» = junto al mar." },
      { de: "der Strand", es: "la playa", emoji: "🏖️", note: "Plural: «die Strände»." },
    ],
    [
      cz("Der Zug ist ___ als der Bus.", "El tren es más rápido que el bus.", ["schneller", "schnell", "am schnellsten", "schnellste"], "schneller", "Comparativo + «als»."),
      cz("Am ___ finde ich das Meer.", "Lo que más me gusta es el mar.", ["besten", "guten", "besser", "gutsten"], "besten", "Superlativo irregular: am besten."),
      { kind: "write", es: "la playa", references: ["der Strand"] },
    ],
    "Im Sommer",
    ["Im Sommer fahre ich nach Italien. Ich fahre mit dem Zug, weil das Wetter dort schön ist und der Zug schneller als der Bus ist. Das Hotel ist größer als mein Haus! Das Zimmer kostet hundert Euro pro Nacht, aber das Frühstück ist dabei. Am besten finde ich das Meer."],
    ["En verano viajo a Italia. Voy en tren porque el clima allá es lindo y el tren es más rápido que el bus. ¡El hotel es más grande que mi casa! La habitación cuesta cien euros por noche, pero el desayuno está incluido. Lo que más me gusta es el mar."],
    [
      { type: "choice", q: "¿Cómo viaja?", options: ["En tren", "En bus", "En auto", "En avión"], answer: "En tren", why: "«Ich fahre mit dem Zug»." },
      { type: "tf", q: "El hotel es más chico que su casa.", answer: false, why: "«größer als mein Haus»." },
      { type: "fill", q: "¿Cuánto cuesta la habitación por noche? (en euros)", answers: ["100", "hundert"], hint: "Un número", why: "«hundert Euro pro Nacht»." },
      { type: "choice", q: "¿Qué es lo que más le gusta?", options: ["El mar", "El hotel", "El tren", "La comida"], answer: "El mar", why: "«Am besten finde ich das Meer»." },
    ],
  ),
  arbeit: reading(
    "Mi restaurante",
    "Leer sobre planes laborales con werden y würde.",
    [
      { de: "das Land", es: "el país", emoji: "🗺️", note: "Plural: «die Länder»; en dativo plural: «Ländern»." },
      { de: "eröffnen", es: "abrir (un negocio)", emoji: "🔓" },
      { de: "genug", es: "suficiente", emoji: "✅" },
    ],
    [
      cz("Nächstes Jahr ___ ich ein Restaurant eröffnen.", "El año que viene voy a abrir un restaurante.", ["werde", "wirst", "wird", "werden"], "werde", "Futuro: werde + infinitivo."),
      cz("Ich ___ gern Gäste haben.", "Me gustaría tener clientes.", ["würde", "werde", "wurde", "wirst"], "würde", "«würde gern» = me gustaría."),
      { kind: "write", es: "el país", references: ["das Land"] },
    ],
    "Meine Pläne",
    ["Ich bin Köchin von Beruf. Ich arbeite seit drei Jahren in einem Restaurant. Nächstes Jahr werde ich ein Restaurant eröffnen. Ich würde gern Gäste aus vielen Ländern haben. Hoffentlich habe ich genug Geld!"],
    ["Soy cocinera. Trabajo desde hace tres años en un restaurante. El año que viene voy a abrir un restaurante. Me gustaría tener clientes de muchos países. ¡Ojalá tenga suficiente dinero!"],
    [
      { type: "choice", q: "¿Qué profesión tiene?", options: ["Cocinera", "Docente", "Médica", "Ingeniera"], answer: "Cocinera", why: "«Ich bin Köchin»." },
      { type: "choice", q: "¿Qué hará el año que viene?", options: ["Abrir un restaurante", "Viajar", "Estudiar", "Cambiar de trabajo"], answer: "Abrir un restaurante", why: "«werde ich ein Restaurant eröffnen»." },
      { type: "tf", q: "Ya tiene suficiente dinero.", answer: false, why: "«Hoffentlich habe ich genug Geld»: todavía no está segura." },
    ],
  ),
  "pruefung-a2": reading(
    "Un correo formal",
    "Leer un correo formal para acordar una cita.",
    [
      { de: "die Antwort", es: "la respuesta", emoji: "↩️", note: "Plural: «die Antworten»." },
      { de: "Ich freue mich auf Ihre Antwort", es: "Espero su respuesta", emoji: "📬", note: "«sich freuen auf» + acusativo = tener ganas de que llegue algo. «Ihre» = su (de usted)." },
    ],
    [
      cz("___ es Ihnen am Mittwoch?", "¿Le viene bien el miércoles?", ["Passt", "Passe", "Passen", "Passt's"], "Passt", "«passen» con «es»: passt."),
      cz("Ich ___ einen Termin vereinbaren.", "Quisiera acordar una cita.", ["möchte", "möchtest", "möchten", "möchtet"], "möchte", "Con «ich»: möchte."),
      { kind: "write", es: "la respuesta", references: ["die Antwort"] },
    ],
    "Eine E-Mail",
    [
      "Sehr geehrter Herr Weiß, ich möchte einen Termin vereinbaren. Am Dienstag habe ich leider keine Zeit, denn ich muss zum Arzt. Passt es Ihnen am Mittwoch um fünfzehn Uhr?",
      "Ich freue mich auf Ihre Antwort. Mit freundlichen Grüßen, Anna Costa",
    ],
    [
      "Estimado Sr. Weiß, quisiera acordar una cita. El martes lamentablemente no tengo tiempo, porque tengo que ir al médico. ¿Le viene bien el miércoles a las quince horas?",
      "Espero su respuesta. Saludos cordiales, Anna Costa",
    ],
    [
      { type: "choice", q: "¿Para qué escribe?", options: ["Para acordar una cita", "Para pedir información", "Para quejarse", "Para reservar un hotel"], answer: "Para acordar una cita", why: "«einen Termin vereinbaren»." },
      { type: "choice", q: "¿Por qué no puede el martes?", options: ["Tiene que ir al médico", "Está de viaje", "Tiene un examen", "Está enferma"], answer: "Tiene que ir al médico", why: "«denn ich muss zum Arzt»." },
      { type: "fill", q: "¿A qué hora propone el miércoles? (formato 24 h, un número)", answers: ["15", "fünfzehn"], hint: "Un número", why: "«um fünfzehn Uhr»." },
    ],
  ),
  erzaehlen: reading(
    "Veranos de mi infancia",
    "Leer un relato en Präteritum con als y nachdem.",
    [
      { de: "die Erinnerung", es: "el recuerdo", emoji: "💭", note: "Plural: «die Erinnerungen»." },
      { de: "unvergesslich", es: "inolvidable", emoji: "⭐" },
    ],
    [
      cz("Als ich ein Kind ___, wohnten wir in einem Dorf.", "Cuando era chico, vivíamos en un pueblo.", ["war", "bin", "wäre", "wurde"], "war", "Pasado de «sein»: war."),
      cz("Nachdem wir gegessen ___, gingen wir schlafen.", "Después de comer, nos fuimos a dormir.", ["hatten", "haben", "waren", "wurden"], "hatten", "Con «nachdem»: Plusquamperfekt (hatten + participio)."),
      { kind: "write", es: "el recuerdo", references: ["die Erinnerung"] },
    ],
    "Die Sommer meiner Kindheit",
    [
      "Als ich ein Kind war, wohnten wir in einem kleinen Dorf. Jeden Sommer fuhren wir zu meiner Oma ans Meer. Wir spielten am Strand, und abends aßen wir Fisch.",
      "Nachdem wir gegessen hatten, gingen wir schlafen. Das war die schönste Zeit, eine unvergessliche Erinnerung.",
    ],
    [
      "Cuando era chico, vivíamos en un pueblo chico. Cada verano íbamos a lo de mi abuela, junto al mar. Jugábamos en la playa y a la noche comíamos pescado.",
      "Después de comer nos íbamos a dormir. Fue la época más linda, un recuerdo inolvidable.",
    ],
    [
      { type: "choice", q: "¿Adónde iban cada verano?", options: ["A lo de la abuela, junto al mar", "A Viena", "A la montaña", "A la ciudad"], answer: "A lo de la abuela, junto al mar", why: "«zu meiner Oma ans Meer»." },
      { type: "choice", q: "¿Qué comían a la noche?", options: ["Pescado", "Carne", "Sopa", "Pan"], answer: "Pescado", why: "«abends aßen wir Fisch»." },
      { type: "tf", q: "Después de comer se iban a dormir.", answer: true, why: "«Nachdem wir gegessen hatten, gingen wir schlafen»." },
    ],
  ),
  wuensche: reading(
    "Un sueño",
    "Leer sobre un deseo con Konjunktiv II.",
    [
      { de: "die Weltreise", es: "el viaje alrededor del mundo", emoji: "🌍" },
      { de: "der Traum", es: "el sueño", emoji: "💭", note: "Plural: «die Träume»." },
      { de: "sparen", es: "ahorrar", emoji: "🐷" },
      { de: "frei", es: "libre", emoji: "🕊️" },
    ],
    [
      cz("Wenn ich viel Geld ___, würde ich reisen.", "Si tuviera mucho dinero, viajaría.", ["hätte", "habe", "hatte", "hat"], "hätte", "Condición irreal: hätte."),
      cz("Du ___ Geld sparen.", "Deberías ahorrar dinero.", ["solltest", "sollst", "solltet", "sollte"], "solltest", "Consejo con «du»: solltest."),
      { kind: "write", es: "el sueño", references: ["der Traum"] },
    ],
    "Mein Traum",
    ["Wenn ich viel Geld hätte, würde ich eine Weltreise machen. Ich würde nach Japan und nach Kanada fahren. Ich wäre gern frei, aber ich weiß, dass das nur ein Traum ist. Meine Schwester sagt: Du solltest jeden Monat ein bisschen Geld sparen."],
    ["Si tuviera mucho dinero, haría un viaje alrededor del mundo. Iría a Japón y a Canadá. Me gustaría ser libre, pero sé que es solo un sueño. Mi hermana dice: Deberías ahorrar un poco de dinero cada mes."],
    [
      { type: "choice", q: "¿Qué haría con mucho dinero?", options: ["Un viaje alrededor del mundo", "Una casa", "Una empresa", "Estudiar"], answer: "Un viaje alrededor del mundo", why: "«eine Weltreise machen»." },
      { type: "choice", q: "¿Qué le aconseja su hermana?", options: ["Ahorrar un poco cada mes", "Trabajar más", "Vender el auto", "Viajar ya"], answer: "Ahorrar un poco cada mes", why: "«jeden Monat ein bisschen Geld sparen»." },
      { type: "tf", q: "Cree que es solo un sueño.", answer: true, why: "«das nur ein Traum ist»." },
    ],
  ),
  relativ: reading(
    "Mi vecina",
    "Leer una descripción con oraciones de relativo.",
    [
      { de: "freundlich", es: "amable", emoji: "😊", note: "«eine freundliche Frau»." },
      { de: "lange", es: "hace mucho / mucho tiempo", emoji: "⌛", note: "«schon lange» = desde hace mucho." },
    ],
    [
      cz("Das ist die Frau, ___ im dritten Stock wohnt.", "Esta es la mujer que vive en el tercer piso.", ["die", "der", "den", "dem"], "die", "Femenino, sujeto: die."),
      cz("Das ist ein Buch, ___ ich suche.", "Este es un libro que busco.", ["das", "den", "dem", "der"], "das", "Neutro, objeto: das."),
      { kind: "write", es: "amable", references: ["freundlich"] },
    ],
    "Meine Nachbarin",
    ["Das ist meine Nachbarin, die im dritten Stock wohnt. Sie ist eine Frau, die immer freundlich ist. Gestern hat sie mir ein Buch geschenkt, das ich schon lange suche. Das ist ein Geschenk, über das ich mich sehr freue."],
    ["Esta es mi vecina, que vive en el tercer piso. Es una mujer que siempre es amable. Ayer me regaló un libro que busco desde hace mucho. Es un regalo por el que estoy muy contento."],
    [
      { type: "choice", q: "¿Dónde vive la vecina?", options: ["En el tercer piso", "En el segundo piso", "En otro edificio", "En la planta baja"], answer: "En el tercer piso", why: "«im dritten Stock»." },
      { type: "choice", q: "¿Qué le regaló?", options: ["Un libro que buscaba hace tiempo", "Flores", "Una torta", "Una película"], answer: "Un libro que buscaba hace tiempo", why: "«ein Buch, das ich schon lange suche»." },
      { type: "tf", q: "La vecina es antipática.", answer: false, why: "«immer freundlich»." },
    ],
  ),
  passiv: reading(
    "Mi ciudad cambia",
    "Leer sobre una ciudad con el Passiv.",
    [
      { de: "das Rathaus", es: "el ayuntamiento", emoji: "🏛️" },
      { de: "montags", es: "los lunes", emoji: "📅", note: "Terminación «-s» para decir «todos los lunes». También: «dienstags», «mittwochs»…" },
    ],
    [
      cz("Das Rathaus ___ letztes Jahr renoviert.", "El ayuntamiento se renovó el año pasado.", ["wurde", "wird", "ist", "hatte"], "wurde", "Pasado del Passiv: wurde + participio."),
      cz("Hier darf nicht geraucht ___.", "Acá no se puede fumar.", ["werden", "wird", "wurde", "worden"], "werden", "Con modal: participio + werden."),
      { kind: "write", es: "el ayuntamiento", references: ["das Rathaus"] },
    ],
    "Unsere Stadt",
    ["In unserer Stadt wird viel gebaut. Das alte Rathaus wurde letztes Jahr renoviert. Jetzt wird ein neuer Park gemacht. Das Museum ist montags geschlossen. Hier darf nicht geraucht werden."],
    ["En nuestra ciudad se construye mucho. El viejo ayuntamiento se renovó el año pasado. Ahora se está haciendo un parque nuevo. El museo está cerrado los lunes. Acá no se puede fumar."],
    [
      { type: "choice", q: "¿Qué se renovó el año pasado?", options: ["El ayuntamiento", "El museo", "El parque", "La estación"], answer: "El ayuntamiento", why: "«Das alte Rathaus wurde letztes Jahr renoviert»." },
      { type: "tf", q: "El museo está abierto los lunes.", answer: false, why: "«montags geschlossen»." },
      { type: "tf", q: "Se puede fumar.", answer: false, why: "«darf nicht geraucht werden»." },
    ],
  ),
};
