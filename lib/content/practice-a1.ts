// Práctica extra de A1: una lección opcional («bonus») al final de las unidades 8 a 15, para escribir y decir lo aprendido.
// Igual que en A2: una escucha nueva con dos voces, completar la frase, traducciones escritas y frases para decir en voz alta.
// No enseña vocabulario nuevo. Cada una cierra con un ejercicio de producción libre (ver free-prompts.ts).

import type { Lesson } from "../curriculum.ts";
import type { FreePrompt } from "./free-prompts.ts";
import { practice, cz, qz } from "./practice-a2.ts";

/** Clave: id de la unidad. */
export const PRACTICE_A1: Record<string, Lesson> = {
  alltag: practice(
    "contar el día",
    "Repasar las horas, los verbos separables y «dann» con frases nuevas.",
    [
      cz("Ich ___ um sieben Uhr auf.", "Me levanto a las siete.", ["stehe", "steht", "stehst", "stehen"], "stehe", "Con «ich»: stehe … auf."),
      cz("Dann ___ ich Kaffee.", "Después tomo café.", ["trinke", "trinkt", "trinken", "trinkst"], "trinke", "Con «ich»: trinke."),
      cz("Wir ___ um acht Uhr zur Arbeit.", "A las ocho vamos al trabajo.", ["gehen", "gehe", "geht", "gehst"], "gehen", "Con «wir»: gehen."),
      qz("¿Cuál oración es correcta?", ["Ich rufe dich an.", "Ich anrufe dich.", "Ich rufe an dich.", "Ich dich anrufe."], "Ich rufe dich an.", "En los verbos separables, el prefijo («an») va al final."),
      { kind: "write", es: "Me levanto a las siete y desayuno.", references: ["Ich stehe um sieben Uhr auf und frühstücke", "Ich stehe um sieben Uhr auf. Ich frühstücke"] },
      { kind: "write", es: "Después voy al trabajo.", references: ["Dann gehe ich zur Arbeit", "Danach gehe ich zur Arbeit"] },
      { kind: "speak", de: "Ich stehe um sieben Uhr auf", es: "Me levanto a las siete" },
      { kind: "speak", de: "Dann gehe ich zur Arbeit", es: "Después voy al trabajo" },
    ],
    "Una mañana",
    "Lena y Tom hablan de su mañana",
    [
      ["f", "Lena", "Tom, wann stehst du auf?", "Tom, ¿a qué hora te levantás?"],
      ["m", "Tom", "Ich stehe um sieben Uhr auf. Und du?", "Me levanto a las siete. ¿Y vos?"],
      ["f", "Lena", "Um halb sieben. Dann dusche ich und frühstücke.", "A las seis y media. Después me ducho y desayuno."],
      ["m", "Tom", "Was isst du?", "¿Qué comés?"],
      ["f", "Lena", "Ein Brötchen und ich trinke Tee. Um acht Uhr gehe ich zur Arbeit.", "Un pancito y tomo té. A las ocho voy al trabajo."],
    ],
    [
      { type: "fill", q: "¿A qué hora se levanta Lena?", answers: ["6:30", "halb sieben", "6.30", "630"], hint: "una hora", why: "«Um halb sieben»." },
      { type: "choice", q: "¿Qué toma Lena?", options: ["Té", "Café", "Leche", "Agua"], answer: "Té", why: "«ich trinke Tee»." },
      { type: "fill", q: "¿A qué hora va Lena al trabajo?", answers: ["8", "acht"], hint: "un número", why: "«Um acht Uhr»." },
    ],
  ),
  wohnung: practice(
    "la casa",
    "Repasar los ambientes, los muebles y «es gibt» con frases nuevas.",
    [
      cz("In meiner Wohnung ___ es ein Bad.", "En mi departamento hay un baño.", ["gibt", "gebe", "gebt", "geben"], "gibt", "«es gibt» = hay."),
      cz("Das Sofa ist im ___.", "El sofá está en el living.", ["Wohnzimmer", "Küche", "Bad", "Garten"], "Wohnzimmer", "El sofá está en el «Wohnzimmer»."),
      cz("Die Wohnung hat zwei ___.", "El departamento tiene dos ambientes.", ["Zimmer", "Zimmers", "Zimmern", "Zimmere"], "Zimmer", "El plural de «Zimmer» es igual: zwei Zimmer."),
      qz("¿Cuál oración es correcta?", ["Die Lampe ist neben dem Bett.", "Die Lampe ist neben das Bett.", "Die Lampe ist neben der Bett.", "Die Lampe ist neben Bett."], "Die Lampe ist neben dem Bett.", "«neben» con «dem» (neutro) cuando algo está en un lugar."),
      { kind: "write", es: "El departamento tiene dos ambientes y una cocina.", references: ["Die Wohnung hat zwei Zimmer und eine Küche"] },
      { kind: "write", es: "En el cuarto hay una cama y una mesa.", references: ["Im Zimmer gibt es ein Bett und einen Tisch", "Im Zimmer ist ein Bett und ein Tisch"] },
      { kind: "speak", de: "Die Wohnung hat zwei Zimmer", es: "El departamento tiene dos ambientes" },
      { kind: "speak", de: "Das Sofa ist im Wohnzimmer", es: "El sofá está en el living" },
    ],
    "Mi departamento nuevo",
    "Anna le cuenta a Max cómo es su departamento",
    [
      ["m", "Max", "Anna, wie ist deine neue Wohnung?", "Anna, ¿cómo es tu departamento nuevo?"],
      ["f", "Anna", "Sie ist klein, aber schön. Sie hat zwei Zimmer und eine Küche.", "Es chico pero lindo. Tiene dos ambientes y una cocina."],
      ["m", "Max", "Gibt es einen Balkon?", "¿Hay un balcón?"],
      ["f", "Anna", "Ja, und das Wohnzimmer ist groß. Das Sofa steht neben dem Fenster.", "Sí, y el living es grande. El sofá está al lado de la ventana."],
      ["m", "Max", "Super! Wann kann ich kommen?", "¡Genial! ¿Cuándo puedo ir?"],
    ],
    [
      { type: "fill", q: "¿Cuántos ambientes tiene el departamento?", answers: ["2", "zwei"], hint: "un número", why: "«zwei Zimmer»." },
      { type: "choice", q: "¿Hay un balcón?", options: ["Sí", "No", "Solo en la cocina", "No se sabe"], answer: "Sí", why: "«Ja»." },
      { type: "choice", q: "¿Dónde está el sofá?", options: ["Al lado de la ventana", "En la cocina", "En el balcón", "En el baño"], answer: "Al lado de la ventana", why: "«neben dem Fenster»." },
    ],
  ),
  stadt: practice(
    "la ciudad y el camino",
    "Repasar los lugares, el camino y el dativo con frases nuevas.",
    [
      cz("Wo ist ___ Bahnhof?", "¿Dónde está la estación?", ["der", "die", "das", "dem"], "der", "«der Bahnhof»: masculino."),
      cz("Ich fahre ___ dem Bus.", "Viajo en colectivo.", ["mit", "nach", "bei", "in"], "mit", "Medio de transporte: «mit» + dativo."),
      cz("Die Bank ist ___ der Post.", "El banco está al lado del correo.", ["neben", "nach", "mit", "zu"], "neben", "«neben» = al lado de."),
      qz("¿Cuál oración es correcta?", ["Gehen Sie geradeaus.", "Gehen Sie geradeaus gehen.", "Sie gehen Sie geradeaus.", "Geradeaus Sie gehen."], "Gehen Sie geradeaus.", "El pedido con «Sie»: verbo primero."),
      { kind: "write", es: "¿Dónde está el banco?", references: ["Wo ist die Bank?", "Wo ist die Bank"] },
      { kind: "write", es: "Voy en colectivo al centro.", references: ["Ich fahre mit dem Bus ins Zentrum", "Ich fahre mit dem Bus in die Stadt"] },
      { kind: "speak", de: "Wo ist der Bahnhof, bitte", es: "¿Dónde está la estación, por favor?" },
      { kind: "speak", de: "Ich fahre mit dem Bus", es: "Viajo en colectivo" },
    ],
    "Por favor, ¿dónde está…?",
    "Una turista le pregunta el camino a un señor",
    [
      ["f", "Turista", "Entschuldigung, wo ist der Bahnhof, bitte?", "Perdón, ¿dónde está la estación, por favor?"],
      ["m", "Herr Klein", "Gehen Sie geradeaus, dann links. Der Bahnhof ist neben der Post.", "Siga derecho y después a la izquierda. La estación está al lado del correo."],
      ["f", "Turista", "Ist das weit?", "¿Queda lejos?"],
      ["m", "Herr Klein", "Nein, nur fünf Minuten. Sie können auch mit dem Bus fahren.", "No, solo cinco minutos. También puede ir en colectivo."],
      ["f", "Turista", "Vielen Dank!", "¡Muchas gracias!"],
    ],
    [
      { type: "choice", q: "¿Dónde está la estación?", options: ["Al lado del correo", "Al lado del banco", "Frente a la escuela", "En el parque"], answer: "Al lado del correo", why: "«neben der Post»." },
      { type: "fill", q: "¿Cuántos minutos son a pie?", answers: ["5", "fünf"], hint: "un número", why: "«nur fünf Minuten»." },
      { type: "choice", q: "¿Cómo más se puede ir?", options: ["En colectivo", "En tren", "En taxi", "En bicicleta"], answer: "En colectivo", why: "«mit dem Bus»." },
    ],
  ),
  essen: practice(
    "comida y gustos",
    "Repasar las comidas, «gern» y los verbos que cambian con frases nuevas.",
    [
      cz("Ich ___ gern Fisch.", "Me gusta comer pescado.", ["esse", "isst", "essen", "esst"], "esse", "Con «ich»: esse."),
      cz("Er ___ ein Stück Kuchen.", "Él come un pedazo de torta.", ["isst", "esse", "essen", "esst"], "isst", "Con «er»: isst."),
      cz("Was ___ du gern?", "¿Qué te gusta comer?", ["isst", "esse", "essen", "esst"], "isst", "Con «du»: isst."),
      qz("¿Cuál oración es correcta?", ["Ich möchte eine Suppe, bitte.", "Ich möchte ein Suppe, bitte.", "Ich möchte einen Suppe, bitte.", "Ich möchte Suppe ein."], "Ich möchte eine Suppe, bitte.", "«die Suppe» es femenino: eine Suppe."),
      { kind: "write", es: "Quisiera una sopa y un agua, por favor.", references: ["Ich möchte eine Suppe und ein Wasser, bitte", "Ich möchte eine Suppe und ein Wasser bitte"] },
      { kind: "write", es: "Me gusta comer pizza.", references: ["Ich esse gern Pizza"] },
      { kind: "speak", de: "Ich möchte eine Suppe, bitte", es: "Quisiera una sopa, por favor" },
      { kind: "speak", de: "Ich esse gern Pizza", es: "Me gusta comer pizza" },
    ],
    "En el restaurante",
    "Dos amigos piden la comida",
    [
      ["m", "Kellner", "Guten Abend! Was möchten Sie essen?", "¡Buenas noches! ¿Qué desean comer?"],
      ["f", "Eva", "Ich möchte die Suppe und ein Wasser, bitte.", "Quisiera la sopa y un agua, por favor."],
      ["m", "Kellner", "Und Sie?", "¿Y usted?"],
      ["m", "Paul", "Ich esse gern Fisch. Ich nehme den Fisch mit Kartoffeln.", "Me gusta comer pescado. Pido el pescado con papas."],
      ["m", "Kellner", "Gern. Möchten Sie auch etwas trinken?", "Con gusto. ¿Desean también algo para tomar?"],
    ],
    [
      { type: "choice", q: "¿Qué pide Eva?", options: ["Sopa y agua", "Pescado", "Pizza", "Torta"], answer: "Sopa y agua", why: "«die Suppe und ein Wasser»."},
      { type: "choice", q: "¿Qué pide Paul?", options: ["Pescado con papas", "Sopa", "Pizza", "Ensalada"], answer: "Pescado con papas", why: "«den Fisch mit Kartoffeln»." },
      { type: "tf", q: "A Paul le gusta comer pescado.", answer: true, why: "«Ich esse gern Fisch»." },
    ],
  ),
  modal: practice(
    "poder, querer y deber",
    "Repasar «können», «wollen» y «müssen» con frases nuevas.",
    [
      cz("Ich ___ gut schwimmen.", "Puedo nadar bien.", ["kann", "kannst", "können", "könnt"], "kann", "Con «ich»: kann."),
      cz("Du ___ heute arbeiten.", "Vos tenés que trabajar hoy.", ["musst", "muss", "müssen", "müsst"], "musst", "Con «du»: musst."),
      cz("Wir ___ ins Kino gehen.", "Queremos ir al cine.", ["wollen", "will", "willst", "wollt"], "wollen", "Con «wir»: wollen."),
      qz("¿Cuál oración es correcta?", ["Ich kann heute nicht kommen.", "Ich kann heute nicht komme.", "Ich kommen heute nicht kann.", "Ich kann kommen nicht heute."], "Ich kann heute nicht kommen.", "El verbo modal va segundo y el otro verbo, en infinitivo, al final."),
      { kind: "write", es: "Hoy no puedo venir.", references: ["Ich kann heute nicht kommen", "Heute kann ich nicht kommen"] },
      { kind: "write", es: "Tengo que trabajar el sábado.", references: ["Ich muss am Samstag arbeiten", "Am Samstag muss ich arbeiten"] },
      { kind: "speak", de: "Ich kann heute nicht kommen", es: "Hoy no puedo venir" },
      { kind: "speak", de: "Ich muss am Samstag arbeiten", es: "Tengo que trabajar el sábado" },
    ],
    "Una invitación",
    "Tom invita a Lena al cine",
    [
      ["m", "Tom", "Lena, willst du heute ins Kino gehen?", "Lena, ¿querés ir hoy al cine?"],
      ["f", "Lena", "Ich kann heute nicht. Ich muss arbeiten.", "Hoy no puedo. Tengo que trabajar."],
      ["m", "Tom", "Schade! Und morgen?", "¡Qué pena! ¿Y mañana?"],
      ["f", "Lena", "Morgen kann ich. Wann beginnt der Film?", "Mañana puedo. ¿A qué hora empieza la película?"],
      ["m", "Tom", "Um acht Uhr. Wir können vorher etwas essen.", "A las ocho. Antes podemos comer algo."],
    ],
    [
      { type: "choice", q: "¿Por qué no puede Lena hoy?", options: ["Tiene que trabajar", "Está enferma", "No quiere", "Va a viajar"], answer: "Tiene que trabajar", why: "«Ich muss arbeiten»." },
      { type: "fill", q: "¿A qué hora empieza la película?", answers: ["8", "acht"], hint: "un número", why: "«Um acht Uhr»." },
      { type: "choice", q: "¿Qué pueden hacer antes?", options: ["Comer algo", "Ir de compras", "Caminar", "Estudiar"], answer: "Comer algo", why: "«etwas essen»." },
    ],
  ),
  perfekt: practice(
    "contar lo que hice",
    "Repasar el Perfekt con «haben» y «sein» con frases nuevas.",
    [
      cz("Ich ___ gestern Fußball gespielt.", "Ayer jugué al fútbol.", ["habe", "bin", "hast", "ist"], "habe", "«spielen» forma el Perfekt con «haben»."),
      cz("Wir ___ nach Berlin gefahren.", "Viajamos a Berlín.", ["sind", "haben", "bin", "seid"], "sind", "«fahren» forma el Perfekt con «sein»."),
      cz("Sie hat einen Brief ___.", "Ella escribió una carta.", ["geschrieben", "geschreiben", "schreibt", "schrieb"], "geschrieben", "Participio irregular de «schreiben»: geschrieben."),
      qz("¿Cuál oración es correcta?", ["Ich habe gestern Pizza gegessen.", "Ich bin gestern Pizza gegessen.", "Ich habe gestern Pizza essen.", "Ich gegessen gestern Pizza habe."], "Ich habe gestern Pizza gegessen.", "«essen» forma el Perfekt con «haben» + participio al final."),
      { kind: "write", es: "Ayer compré pan.", references: ["Ich habe gestern Brot gekauft", "Gestern habe ich Brot gekauft"] },
      { kind: "write", es: "Fuimos al cine.", references: ["Wir sind ins Kino gegangen"] },
      { kind: "speak", de: "Ich habe gestern Brot gekauft", es: "Ayer compré pan" },
      { kind: "speak", de: "Wir sind ins Kino gegangen", es: "Fuimos al cine" },
    ],
    "El fin de semana",
    "Anna le cuenta a Tom su fin de semana",
    [
      ["m", "Tom", "Hallo Anna! Was hast du am Wochenende gemacht?", "¡Hola Anna! ¿Qué hiciste el fin de semana?"],
      ["f", "Anna", "Am Samstag habe ich Brot gekauft und Kuchen gebacken.", "El sábado compré pan e hice una torta."],
      ["m", "Tom", "Und am Sonntag?", "¿Y el domingo?"],
      ["f", "Anna", "Am Sonntag bin ich mit Freunden ins Kino gegangen.", "El domingo fui al cine con amigos."],
      ["m", "Tom", "Toll! Ich habe nur geschlafen.", "¡Genial! Yo solo dormí."],
    ],
    [
      { type: "choice", q: "¿Qué hizo Anna el sábado?", options: ["Compró pan e hizo una torta", "Fue al cine", "Trabajó", "Viajó"], answer: "Compró pan e hizo una torta", why: "«Brot gekauft und Kuchen gebacken»." },
      { type: "choice", q: "¿Adónde fue el domingo?", options: ["Al cine", "Al parque", "A Berlín", "A su casa"], answer: "Al cine", why: "«ins Kino gegangen»." },
      { type: "tf", q: "Tom salió el fin de semana.", answer: false, why: "«Ich habe nur geschlafen»." },
    ],
  ),
  pruefung: practice(
    "fechas, formularios y anuncios",
    "Repasar los meses, las fechas y los datos personales con frases nuevas.",
    [
      cz("Mein Geburtstag ist ___ Mai.", "Mi cumpleaños es en mayo.", ["im", "am", "um", "in"], "im", "Los meses van con «im»."),
      cz("Ich habe ___ fünften April Geburtstag.", "Cumplo años el cinco de abril.", ["am", "im", "um", "an"], "am", "Las fechas van con «am»."),
      cz("Mein Name ___ Anna Becker.", "Mi nombre es Anna Becker.", ["ist", "bin", "bist", "sind"], "ist", "Con «Name»: ist."),
      qz("¿Cuál oración es correcta?", ["Ich komme aus Argentinien.", "Ich komme in Argentinien.", "Ich komme nach Argentinien aus.", "Ich aus Argentinien komme."], "Ich komme aus Argentinien.", "«kommen aus» + país: de dónde sos."),
      { kind: "write", es: "Mi cumpleaños es el diez de mayo.", references: ["Mein Geburtstag ist am zehnten Mai", "Ich habe am zehnten Mai Geburtstag"] },
      { kind: "write", es: "Me llamo Anna y vivo en Berlín.", references: ["Ich heiße Anna und wohne in Berlin", "Ich heiße Anna und ich wohne in Berlin"] },
      { kind: "speak", de: "Mein Geburtstag ist im Mai", es: "Mi cumpleaños es en mayo" },
      { kind: "speak", de: "Ich heiße Anna und wohne in Berlin", es: "Me llamo Anna y vivo en Berlín" },
    ],
    "En la oficina de inscripción",
    "Una empleada le pregunta los datos a Tom",
    [
      ["f", "Frau Roth", "Guten Tag. Wie heißen Sie?", "Buenas tardes. ¿Cómo se llama?"],
      ["m", "Tom", "Ich heiße Tom Berger.", "Me llamo Tom Berger."],
      ["f", "Frau Roth", "Woher kommen Sie, und wo wohnen Sie?", "¿De dónde es y dónde vive?"],
      ["m", "Tom", "Ich komme aus Österreich und wohne jetzt in Berlin.", "Soy de Austria y vivo ahora en Berlín."],
      ["f", "Frau Roth", "Wann haben Sie Geburtstag?", "¿Cuándo cumple años?"],
      ["m", "Tom", "Am zehnten Mai.", "El diez de mayo."],
    ],
    [
      { type: "choice", q: "¿Cómo se llama el señor?", options: ["Tom Berger", "Tom Roth", "Paul Berger", "Max Klein"], answer: "Tom Berger", why: "«Tom Berger»." },
      { type: "choice", q: "¿De dónde es?", options: ["De Austria", "De Alemania", "De Suiza", "De Italia"], answer: "De Austria", why: "«aus Österreich»." },
      { type: "choice", q: "¿Cuándo cumple años?", options: ["El diez de mayo", "El diez de junio", "El cinco de mayo", "El veinte de mayo"], answer: "El diez de mayo", why: "«Am zehnten Mai»." },
    ],
  ),
};

/** Consignas libres de las prácticas de A1 (se suman a FREE_PROMPTS). */
export const FREE_PROMPTS_A1: Record<string, FreePrompt> = {
  alltag: { prompt: "Contá cómo es tu mañana: a qué hora te levantás, qué desayunás y adónde vas.", focus: ["um … Uhr", "un verbo separable (aufstehen)", "dann o danach"], minSentences: 3, hint: "Frases cortas con «ich» y la hora." },
  wohnung: { prompt: "Describí tu casa o tu cuarto: cuántos ambientes tiene y qué hay en cada uno.", focus: ["es gibt o Ich habe", "ein, eine o einen", "una preposición de lugar (neben, in)"], minSentences: 3, hint: "Ich wohne in einer … Es gibt …" },
  stadt: { prompt: "Explicá cómo llegar desde tu casa a un lugar de la ciudad: la estación o el banco.", focus: ["geradeaus, links o rechts", "mit dem Bus / zu Fuß", "neben o gegenüber"], minSentences: 3, hint: "Gehen Sie … Der Bahnhof ist neben …" },
  essen: { prompt: "Contá qué te gusta comer y tomar, y qué pedirías en un restaurante.", focus: ["Ich esse gern …", "Ich möchte …", "un verbo que cambia (essen, trinken)"], minSentences: 3, hint: "Ich esse gern … Ich möchte …" },
  modal: { prompt: "Contá qué podés, querés y tenés que hacer esta semana.", focus: ["können", "wollen", "müssen"], minSentences: 3, hint: "Ich kann … Ich will … Ich muss …" },
  perfekt: { prompt: "Contá qué hiciste el fin de semana pasado.", focus: ["Perfekt con haben", "Perfekt con sein", "gestern o am Samstag"], minSentences: 3, hint: "Ich habe … gekauft. Ich bin … gegangen." },
  pruefung: { prompt: "Presentate: tu nombre, de dónde sos, dónde vivís y cuándo es tu cumpleaños.", focus: ["Ich heiße / komme aus / wohne in", "im o am + fecha", "un número o una hora"], minSentences: 4, hint: "Ich heiße … Ich komme aus … Mein Geburtstag ist am …" },
};
