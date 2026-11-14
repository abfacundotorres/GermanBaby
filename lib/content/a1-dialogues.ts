// Diálogos cortos (3 a 6 líneas) para las unidades 1 a 8 de A1. Usan solo lo enseñado hasta cada lección,
// así la escucha larga se introduce de a poco y no aparece de golpe en la unidad 9.

import type { Dialogue } from "../curriculum.ts";

const L = (who: "f" | "m", name: string, de: string, es: string) => ({ who, name, de, es });

/** Clave: «unidad/lección». */
export const A1_DIALOGUES: Record<string, Dialogue> = {
  "hallo/gruesse": {
    title: "Buenos días",
    setting: "Tom y Lena se saludan",
    lines: [
      L("m", "Tom", "Hallo, Lena! Guten Morgen!", "¡Hola, Lena! ¡Buenos días!"),
      L("f", "Lena", "Guten Morgen, Tom!", "¡Buenos días, Tom!"),
      L("m", "Tom", "Tschüss, Lena!", "¡Chau, Lena!"),
      L("f", "Lena", "Tschüss, Tom!", "¡Chau, Tom!"),
    ],
    questions: [
      { type: "choice", q: "¿Qué momento del día es?", options: ["La mañana", "La noche", "La tarde", "El mediodía"], answer: "La mañana", why: "«Guten Morgen» = buenos días." },
      { type: "tf", q: "Se despiden con «Tschüss».", answer: true, why: "Los dos dicen «Tschüss»." },
      { type: "tf", q: "Se tratan de usted (formal).", answer: false, why: "Dicen «Hallo» y «Tschüss», que son informales." },
    ],
  },
  "hallo/vorstellen": {
    title: "Presentarse",
    setting: "Anna conoce a Tom",
    lines: [
      L("f", "Anna", "Hallo! Ich heiße Anna. Wie heißt du?", "¡Hola! Me llamo Anna. ¿Cómo te llamás?"),
      L("m", "Tom", "Ich heiße Tom. Woher kommst du?", "Me llamo Tom. ¿De dónde sos?"),
      L("f", "Anna", "Ich komme aus Argentinien. Und du?", "Soy de Argentina. ¿Y vos?"),
      L("m", "Tom", "Ich komme aus Berlin. Freut mich!", "Soy de Berlín. ¡Mucho gusto!"),
      L("f", "Anna", "Freut mich!", "¡Mucho gusto!"),
    ],
    questions: [
      { type: "choice", q: "¿De dónde es Anna?", options: ["De Argentina", "De Berlín", "De Viena", "De Madrid"], answer: "De Argentina", why: "«Ich komme aus Argentinien»." },
      { type: "choice", q: "¿De dónde es Tom?", options: ["De Berlín", "De Argentina", "De Viena", "De Madrid"], answer: "De Berlín", why: "«Ich komme aus Berlin»." },
      { type: "tf", q: "Los dos se llaman Anna.", answer: false, why: "Ella es Anna y él es Tom." },
    ],
  },
  "hallo/wie-gehts": {
    title: "¿Cómo andás?",
    setting: "Lena y Tom se preguntan cómo están",
    lines: [
      L("f", "Lena", "Hallo Tom! Wie geht's?", "¡Hola, Tom! ¿Cómo andás?"),
      L("m", "Tom", "Sehr gut, danke! Und dir?", "¡Muy bien, gracias! ¿Y vos?"),
      L("f", "Lena", "Nicht so gut.", "No tan bien."),
      L("m", "Tom", "Schade!", "¡Qué pena!"),
      L("f", "Lena", "Danke!", "¡Gracias!"),
    ],
    questions: [
      { type: "choice", q: "¿Cómo está Tom?", options: ["Muy bien", "No tan bien", "Mal", "Más o menos"], answer: "Muy bien", why: "«Sehr gut, danke!»" },
      { type: "choice", q: "¿Cómo está Lena?", options: ["No tan bien", "Muy bien", "Bien", "Cansada"], answer: "No tan bien", why: "«Nicht so gut»." },
      { type: "tf", q: "Lena le pregunta a Tom cómo está.", answer: true, why: "«Wie geht's?»" },
    ],
  },
  "zahlen/eins-fuenf": {
    title: "Contar",
    setting: "Max y Lena cuentan juntos",
    lines: [
      L("m", "Max", "Eins, zwei, drei!", "¡Uno, dos, tres!"),
      L("f", "Lena", "Vier, fünf! Und jetzt: null!", "¡Cuatro, cinco! Y ahora: ¡cero!"),
      L("m", "Max", "Super! Eins, zwei, drei, vier, fünf!", "¡Genial! ¡Uno, dos, tres, cuatro, cinco!"),
      L("f", "Lena", "Toll!", "¡Genial!"),
    ],
    questions: [
      { type: "fill", q: "¿Qué número dice Lena al final? (un número)", answers: ["0", "null"], hint: "Un número", why: "«null» = 0." },
      { type: "choice", q: "¿Con qué número empieza Max?", options: ["Uno", "Dos", "Tres", "Cuatro"], answer: "Uno", why: "«Eins, zwei, drei!»" },
      { type: "tf", q: "Max cuenta hasta cinco.", answer: true, why: "«eins, zwei, drei, vier, fünf»." },
    ],
  },
  "zahlen/sechs-zehn": {
    title: "Sumas",
    setting: "Lena le hace sumas a Max",
    lines: [
      L("f", "Lena", "Wie viel ist drei plus vier?", "¿Cuánto es tres más cuatro?"),
      L("m", "Max", "Das ist sieben!", "¡Es siete!"),
      L("f", "Lena", "Und sechs plus vier?", "¿Y seis más cuatro?"),
      L("m", "Max", "Zehn!", "¡Diez!"),
      L("f", "Lena", "Sehr gut!", "¡Muy bien!"),
    ],
    questions: [
      { type: "fill", q: "¿Cuánto es tres más cuatro? (un número)", answers: ["7", "sieben"], hint: "Un número", why: "«sieben» = 7." },
      { type: "fill", q: "¿Cuánto es seis más cuatro? (un número)", answers: ["10", "zehn"], hint: "Un número", why: "«zehn» = 10." },
      { type: "tf", q: "Max se equivoca en una suma.", answer: false, why: "Las dos respuestas están bien: «Sehr gut!»" },
    ],
  },
  "zahlen/alter": {
    title: "¿Cuántos años tenés?",
    setting: "Lena y Max hablan de su edad",
    lines: [
      L("f", "Lena", "Max, wie alt bist du?", "Max, ¿cuántos años tenés?"),
      L("m", "Max", "Ich bin acht Jahre alt. Und du?", "Tengo ocho años. ¿Y vos?"),
      L("f", "Lena", "Ich bin zehn Jahre alt.", "Tengo diez años."),
      L("m", "Max", "Zehn? Super!", "¿Diez? ¡Genial!"),
    ],
    questions: [
      { type: "fill", q: "¿Cuántos años tiene Max? (un número)", answers: ["8", "acht"], hint: "Un número", why: "«acht Jahre alt»." },
      { type: "fill", q: "¿Cuántos años tiene Lena? (un número)", answers: ["10", "zehn"], hint: "Un número", why: "«zehn Jahre alt»." },
      { type: "tf", q: "Max es mayor que Lena.", answer: false, why: "Max tiene 8 y Lena 10." },
    ],
  },
  "cafe/getraenke": {
    title: "En la mesa",
    setting: "Lena y Max miran qué hay para el desayuno",
    lines: [
      L("f", "Lena", "Das ist der Kaffee. Und das ist der Tee.", "Esto es el café. Y esto es el té."),
      L("m", "Max", "Das ist das Wasser. Und das ist die Milch.", "Esto es el agua. Y esto es la leche."),
      L("f", "Lena", "Und das Brötchen? Und der Kuchen?", "¿Y el pancito? ¿Y la torta?"),
      L("m", "Max", "Das ist das Brötchen. Das ist der Kuchen!", "¡Esto es el pancito. Esto es la torta!"),
    ],
    questions: [
      { type: "choice", q: "¿Qué hay en la mesa además del café?", options: ["Té", "Jugo", "Cerveza", "Sopa"], answer: "Té", why: "«Das ist der Kaffee. Und das ist der Tee»." },
      { type: "tf", q: "Hay un pancito.", answer: true, why: "«Das ist das Brötchen»." },
      { type: "tf", q: "Hay limonada.", answer: false, why: "No se nombra ninguna limonada." },
    ],
  },
  "cafe/bestellen": {
    title: "En el café",
    setting: "Lena pide en un café de Viena",
    lines: [
      L("m", "Herr Huber", "Guten Tag! Was möchten Sie?", "¡Buenas tardes! ¿Qué desea?"),
      L("f", "Lena", "Ich möchte einen Kaffee, bitte.", "Quisiera un café, por favor."),
      L("m", "Herr Huber", "Sonst noch etwas?", "¿Algo más?"),
      L("f", "Lena", "Ja, ein Wasser. Danke!", "Sí, un agua. ¡Gracias!"),
      L("m", "Herr Huber", "Bitte!", "¡De nada!"),
    ],
    questions: [
      { type: "choice", q: "¿Qué pide Lena primero?", options: ["Un café", "Un té", "Una torta", "Leche"], answer: "Un café", why: "«Ich möchte einen Kaffee»." },
      { type: "choice", q: "¿Qué pide después?", options: ["Un agua", "Un té", "Una torta", "Leche"], answer: "Un agua", why: "«ein Wasser»." },
      { type: "tf", q: "Lena pide una limonada.", answer: false, why: "Pide un café y un agua." },
    ],
  },
  "cafe/bezahlen": {
    title: "La cuenta",
    setting: "Lena paga en el café",
    lines: [
      L("f", "Lena", "Die Rechnung, bitte.", "La cuenta, por favor."),
      L("m", "Herr Huber", "Zusammen oder getrennt?", "¿Juntos o separado?"),
      L("f", "Lena", "Zusammen.", "Juntos."),
      L("m", "Herr Huber", "Das kostet fünf Euro.", "Son cinco euros."),
      L("f", "Lena", "Stimmt so!", "¡Quédese con el cambio!"),
    ],
    questions: [
      { type: "fill", q: "¿Cuánto cuesta? (en euros)", answers: ["5", "fünf"], hint: "Un número", why: "«fünf Euro»." },
      { type: "choice", q: "¿Pagan juntos o separado?", options: ["Juntos", "Separado", "Cada uno lo suyo", "No pagan"], answer: "Juntos", why: "«Zusammen»." },
      { type: "tf", q: "Lena deja propina.", answer: true, why: "«Stimmt so» = quedate con el cambio." },
    ],
  },
  "familie/familie": {
    title: "Una foto de familia",
    setting: "Tom le muestra una foto a Lena",
    lines: [
      L("m", "Tom", "Das ist die Mutter. Das ist der Vater.", "Esta es la madre. Este es el padre."),
      L("f", "Lena", "Und das ist die Schwester? Und der Bruder?", "¿Y esta es la hermana? ¿Y el hermano?"),
      L("m", "Tom", "Ja! Das sind die Eltern und die Kinder.", "¡Sí! Son los padres y los hijos."),
      L("f", "Lena", "Das ist eine Familie!", "¡Es una familia!"),
    ],
    questions: [
      { type: "choice", q: "¿Quiénes están en la foto?", options: ["Los padres y los hijos", "Solo la mamá", "Los abuelos", "Los amigos"], answer: "Los padres y los hijos", why: "«die Eltern und die Kinder»." },
      { type: "tf", q: "En la foto hay una hermana.", answer: true, why: "Tom confirma: «Ja!»" },
      { type: "tf", q: "En la foto no está el padre.", answer: false, why: "«Das ist der Vater»." },
    ],
  },
  "familie/mein": {
    title: "Mi familia",
    setting: "Lena le muestra su familia a Tom",
    lines: [
      L("f", "Lena", "Das ist meine Mutter. Das ist mein Vater.", "Esta es mi madre. Este es mi padre."),
      L("m", "Tom", "Und dein Bruder?", "¿Y tu hermano?"),
      L("f", "Lena", "Das ist mein Bruder. Und das ist meine Schwester.", "Este es mi hermano. Y esta es mi hermana."),
      L("m", "Tom", "Hast du Geschwister?", "¿Tenés hermanos?"),
      L("f", "Lena", "Ja, zwei.", "Sí, dos."),
    ],
    questions: [
      { type: "choice", q: "¿De quién es la familia que se muestra?", options: ["De Lena", "De Tom", "De la maestra", "De un amigo"], answer: "De Lena", why: "Lena dice «meine Mutter, mein Vater»." },
      { type: "choice", q: "¿Cuántos hermanos tiene Lena?", options: ["Dos", "Uno", "Tres", "Ninguno"], answer: "Dos", why: "«Ja, zwei»." },
      { type: "tf", q: "Lena tiene un hermano y una hermana.", answer: true, why: "«mein Bruder» y «meine Schwester»." },
    ],
  },
  "familie/haben": {
    title: "¿Tenés hermanos?",
    setting: "Tom y Lena comparan sus familias",
    lines: [
      L("m", "Tom", "Hast du Geschwister?", "¿Tenés hermanos?"),
      L("f", "Lena", "Ich habe einen Bruder und eine Schwester. Und du?", "Tengo un hermano y una hermana. ¿Y vos?"),
      L("m", "Tom", "Ich habe keine Geschwister.", "No tengo hermanos."),
      L("f", "Lena", "Wirklich?", "¿De verdad?"),
      L("m", "Tom", "Ja, ich habe nur Eltern!", "Sí, ¡solo tengo padres!"),
    ],
    questions: [
      { type: "choice", q: "¿Qué tiene Lena?", options: ["Un hermano y una hermana", "Dos hermanas", "Solo un hermano", "Ningún hermano"], answer: "Un hermano y una hermana", why: "«einen Bruder und eine Schwester»." },
      { type: "tf", q: "Tom tiene hermanos.", answer: false, why: "«Ich habe keine Geschwister»." },
      { type: "tf", q: "Tom tiene padres.", answer: true, why: "«ich habe nur Eltern»." },
    ],
  },
  "verben/ich-du": {
    title: "¿Dónde vivís?",
    setting: "Lena y Tom hablan de dónde viven",
    lines: [
      L("f", "Lena", "Wo wohnst du?", "¿Dónde vivís?"),
      L("m", "Tom", "Ich wohne in Berlin. Und du?", "Vivo en Berlín. ¿Y vos?"),
      L("f", "Lena", "Ich wohne in Buenos Aires. Ich lerne Deutsch.", "Vivo en Buenos Aires. Aprendo alemán."),
      L("m", "Tom", "Und ich arbeite in Berlin.", "Y yo trabajo en Berlín."),
    ],
    questions: [
      { type: "choice", q: "¿Dónde vive Lena?", options: ["En Buenos Aires", "En Berlín", "En Viena", "En Madrid"], answer: "En Buenos Aires", why: "«Ich wohne in Buenos Aires»." },
      { type: "choice", q: "¿Qué hace Lena?", options: ["Aprende alemán", "Trabaja", "Cocina", "Nada"], answer: "Aprende alemán", why: "«Ich lerne Deutsch»." },
      { type: "tf", q: "Tom trabaja en Berlín.", answer: true, why: "«Ich arbeite in Berlin»." },
    ],
  },
  "verben/er-wir": {
    title: "¿Qué te gusta hacer?",
    setting: "Lena y Tom hablan de sus gustos",
    lines: [
      L("f", "Lena", "Was machst du gern?", "¿Qué te gusta hacer?"),
      L("m", "Tom", "Ich spiele gern Fußball. Und du?", "Me gusta jugar al fútbol. ¿Y a vos?"),
      L("f", "Lena", "Ich koche gern. Mein Bruder spielt auch Fußball.", "Me gusta cocinar. Mi hermano también juega al fútbol."),
      L("m", "Tom", "Wo wohnt ihr?", "¿Dónde viven ustedes?"),
      L("f", "Lena", "Wir wohnen in Berlin.", "Vivimos en Berlín."),
    ],
    questions: [
      { type: "choice", q: "¿Qué le gusta hacer a Tom?", options: ["Jugar al fútbol", "Cocinar", "Leer", "Nadar"], answer: "Jugar al fútbol", why: "«Ich spiele gern Fußball»." },
      { type: "choice", q: "¿Qué le gusta hacer a Lena?", options: ["Cocinar", "Jugar al fútbol", "Leer", "Nadar"], answer: "Cocinar", why: "«Ich koche gern»." },
      { type: "tf", q: "El hermano de Lena también juega al fútbol.", answer: true, why: "«Mein Bruder spielt auch Fußball»." },
    ],
  },
  "verben/sein-haben": {
    title: "¿Cuántos años tenés?",
    setting: "Lena y Tom hablan de su edad y sus hermanos",
    lines: [
      L("f", "Lena", "Wie alt bist du?", "¿Cuántos años tenés?"),
      L("m", "Tom", "Ich bin zehn Jahre alt. Und du?", "Tengo diez años. ¿Y vos?"),
      L("f", "Lena", "Ich bin auch zehn! Hast du einen Bruder?", "¡Yo también tengo diez! ¿Tenés un hermano?"),
      L("m", "Tom", "Ja, er ist acht Jahre alt. Er hat einen Hund.", "Sí, tiene ocho años. Tiene un perro."),
    ],
    questions: [
      { type: "fill", q: "¿Cuántos años tiene Tom? (un número)", answers: ["10", "zehn"], hint: "Un número", why: "«Ich bin zehn Jahre alt»." },
      { type: "fill", q: "¿Cuántos años tiene el hermano de Tom? (un número)", answers: ["8", "acht"], hint: "Un número", why: "«er ist acht Jahre alt»." },
      { type: "tf", q: "Lena y Tom tienen la misma edad.", answer: true, why: "Los dos tienen diez años." },
    ],
  },
  "zeit/wochentage": {
    title: "Los días",
    setting: "Lena y Tom repasan los días de la semana",
    lines: [
      L("f", "Lena", "Heute ist Montag.", "Hoy es lunes."),
      L("m", "Tom", "Und morgen? Dienstag?", "¿Y mañana? ¿Martes?"),
      L("f", "Lena", "Ja! Dann Mittwoch, Donnerstag und Freitag.", "¡Sí! Después miércoles, jueves y viernes."),
      L("m", "Tom", "Und Samstag und Sonntag!", "¡Y sábado y domingo!"),
    ],
    questions: [
      { type: "choice", q: "¿Qué día es hoy?", options: ["Lunes", "Martes", "Miércoles", "Domingo"], answer: "Lunes", why: "«Heute ist Montag»." },
      { type: "choice", q: "¿Qué día es mañana?", options: ["Martes", "Lunes", "Jueves", "Sábado"], answer: "Martes", why: "«Und morgen? Dienstag?»" },
      { type: "tf", q: "Nombran los siete días de la semana.", answer: true, why: "De lunes a domingo." },
    ],
  },
  "zeit/uhrzeit": {
    title: "¿Qué hora es?",
    setting: "Lena le pregunta la hora a Tom",
    lines: [
      L("f", "Lena", "Wie spät ist es?", "¿Qué hora es?"),
      L("m", "Tom", "Es ist drei Uhr.", "Son las tres."),
      L("f", "Lena", "Und jetzt?", "¿Y ahora?"),
      L("m", "Tom", "Jetzt ist es halb vier.", "Ahora son las tres y media."),
      L("f", "Lena", "Danke!", "¡Gracias!"),
    ],
    questions: [
      { type: "fill", q: "¿Qué hora es al principio? (número de la hora)", answers: ["3", "drei"], hint: "Un número", why: "«Es ist drei Uhr»." },
      { type: "choice", q: "¿Qué hora es después?", options: ["Las tres y media", "Las tres y cuarto", "Las cuatro", "Las tres menos cuarto"], answer: "Las tres y media", why: "«halb vier» = las tres y media." },
      { type: "tf", q: "Pasan treinta minutos entre una hora y otra.", answer: true, why: "De las 3:00 a las 3:30." },
    ],
  },
  "zeit/termine": {
    title: "¿Tenés tiempo?",
    setting: "Tom invita a Lena",
    lines: [
      L("m", "Tom", "Hast du morgen Zeit?", "¿Tenés tiempo mañana?"),
      L("f", "Lena", "Leider nicht. Aber am Wochenende habe ich Zeit.", "Lamentablemente no. Pero el fin de semana tengo tiempo."),
      L("m", "Tom", "Gut! Dann am Wochenende!", "¡Bien! ¡Entonces el fin de semana!"),
      L("f", "Lena", "Ja, bis dann!", "¡Sí, hasta entonces!"),
    ],
    questions: [
      { type: "choice", q: "¿Cuándo tiene tiempo Lena?", options: ["El fin de semana", "Mañana", "Hoy", "Nunca"], answer: "El fin de semana", why: "«am Wochenende habe ich Zeit»." },
      { type: "tf", q: "Lena tiene tiempo mañana.", answer: false, why: "«Leider nicht»." },
      { type: "tf", q: "Quedan para el fin de semana.", answer: true, why: "«Dann am Wochenende!»" },
    ],
  },
  "markt/elf-zwanzig": {
    title: "Del 11 al 20",
    setting: "Lena y Max cuentan de a tres",
    lines: [
      L("f", "Lena", "Elf, zwölf, dreizehn, vierzehn!", "¡Once, doce, trece, catorce!"),
      L("m", "Max", "Fünfzehn, sechzehn, siebzehn!", "¡Quince, dieciséis, diecisiete!"),
      L("f", "Lena", "Achtzehn, neunzehn, zwanzig!", "¡Dieciocho, diecinueve, veinte!"),
      L("m", "Max", "Super!", "¡Genial!"),
    ],
    questions: [
      { type: "fill", q: "¿Qué número sigue después de diecisiete? (un número)", answers: ["18", "achtzehn"], hint: "Un número", why: "«achtzehn» = 18." },
      { type: "fill", q: "¿Hasta qué número cuentan? (un número)", answers: ["20", "zwanzig"], hint: "Un número", why: "«zwanzig» = 20." },
      { type: "tf", q: "Max dice «fünfzehn».", answer: true, why: "«Fünfzehn, sechzehn, siebzehn!»" },
    ],
  },
  "markt/bis-hundert": {
    title: "Los abuelos",
    setting: "Lena y Max hablan de la edad de sus abuelos",
    lines: [
      L("f", "Lena", "Wie alt ist deine Oma?", "¿Cuántos años tiene tu abuela?"),
      L("m", "Max", "Meine Oma ist siebzig Jahre alt.", "Mi abuela tiene setenta años."),
      L("f", "Lena", "Und dein Opa?", "¿Y tu abuelo?"),
      L("m", "Max", "Mein Opa ist achtzig Jahre alt.", "Mi abuelo tiene ochenta años."),
      L("f", "Lena", "Super!", "¡Genial!"),
    ],
    questions: [
      { type: "fill", q: "¿Cuántos años tiene la abuela de Max? (un número)", answers: ["70", "siebzig"], hint: "Un número", why: "«siebzig»." },
      { type: "fill", q: "¿Cuántos años tiene el abuelo? (un número)", answers: ["80", "achtzig"], hint: "Un número", why: "«achtzig»." },
      { type: "tf", q: "El abuelo es más joven que la abuela.", answer: false, why: "Él tiene 80 y ella 70." },
    ],
  },
  "markt/einkaufen": {
    title: "En el mercado",
    setting: "Herr Berg compra frutas y verduras",
    lines: [
      L("f", "Frau Becker", "Guten Morgen! Was möchten Sie?", "¡Buenos días! ¿Qué desea?"),
      L("m", "Herr Berg", "Ich nehme ein Kilo Äpfel.", "Llevo un kilo de manzanas."),
      L("f", "Frau Becker", "Das macht vier Euro.", "Son cuatro euros."),
      L("m", "Herr Berg", "Und die Tomaten? Sind sie teuer?", "¿Y los tomates? ¿Son caros?"),
      L("f", "Frau Becker", "Nein, sie sind billig. Das Kilo kostet zwei Euro.", "No, son baratos. El kilo cuesta dos euros."),
      L("m", "Herr Berg", "Dann ein Kilo Tomaten, bitte!", "¡Entonces un kilo de tomates, por favor!"),
    ],
    questions: [
      { type: "fill", q: "¿Cuánto cuestan las manzanas? (en euros)", answers: ["4", "vier"], hint: "Un número", why: "«vier Euro»." },
      { type: "choice", q: "¿Cómo son los tomates?", options: ["Baratos", "Caros", "Viejos", "Grandes"], answer: "Baratos", why: "«sie sind billig»." },
      { type: "tf", q: "Herr Berg compra también tomates.", answer: true, why: "«Dann ein Kilo Tomaten, bitte!»" },
    ],
  },
  "alltag/morgens": {
    title: "Mi mañana",
    setting: "Tom y Lena cuentan cómo empiezan el día",
    lines: [
      L("m", "Tom", "Morgens stehe ich um sieben Uhr auf.", "A la mañana me levanto a las siete."),
      L("f", "Lena", "Ich auch! Dann dusche ich.", "¡Yo también! Después me ducho."),
      L("m", "Tom", "Und dann frühstücke ich um acht Uhr.", "Y después desayuno a las ocho."),
      L("f", "Lena", "Super! Und abends?", "¡Genial! ¿Y a la noche?"),
      L("m", "Tom", "Abends lerne ich Deutsch.", "A la noche estudio alemán."),
    ],
    questions: [
      { type: "fill", q: "¿A qué hora se levanta Tom? (un número)", answers: ["7", "sieben"], hint: "Un número", why: "«um sieben Uhr»." },
      { type: "fill", q: "¿A qué hora desayuna? (un número)", answers: ["8", "acht"], hint: "Un número", why: "«um acht Uhr»." },
      { type: "choice", q: "¿Qué hace Tom a la noche?", options: ["Estudia alemán", "Mira tele", "Cocina", "Duerme"], answer: "Estudia alemán", why: "«Abends lerne ich Deutsch»." },
    ],
  },
  "alltag/trennbar": {
    title: "Planes de hoy",
    setting: "Lena y Tom hablan de lo que hacen",
    lines: [
      L("f", "Lena", "Siehst du gern fern?", "¿Te gusta mirar tele?"),
      L("m", "Tom", "Ja! Abends sehe ich fern. Und du?", "¡Sí! A la noche miro tele. ¿Y vos?"),
      L("f", "Lena", "Heute kaufe ich ein. Morgen rufe ich dich an.", "Hoy hago las compras. Mañana te llamo."),
      L("m", "Tom", "Gut! Ruf mich an!", "¡Bien! ¡Llamame!"),
    ],
    questions: [
      { type: "choice", q: "¿Qué hace Lena hoy?", options: ["Las compras", "Mira tele", "Cocina", "Estudia"], answer: "Las compras", why: "«Heute kaufe ich ein»." },
      { type: "tf", q: "Tom mira tele a la noche.", answer: true, why: "«Abends sehe ich fern»." },
      { type: "choice", q: "¿Cuándo va a llamar Lena a Tom?", options: ["Mañana", "Hoy", "Nunca", "El fin de semana"], answer: "Mañana", why: "«Morgen rufe ich dich an»." },
    ],
  },
  "alltag/mein-tag": {
    title: "Mi día",
    setting: "Tom le cuenta su día a Lena",
    lines: [
      L("f", "Lena", "Wie ist dein Tag?", "¿Cómo es tu día?"),
      L("m", "Tom", "Zuerst dusche ich. Dann frühstücke ich.", "Primero me ducho. Después desayuno."),
      L("f", "Lena", "Und danach?", "¿Y después?"),
      L("m", "Tom", "Danach lerne ich Deutsch. Um elf Uhr gehe ich schlafen.", "Después estudio alemán. A las once me voy a dormir."),
      L("f", "Lena", "Um elf Uhr! Das ist spät.", "¡A las once! Es tarde."),
    ],
    questions: [
      { type: "choice", q: "¿Qué hace Tom primero?", options: ["Se ducha", "Desayuna", "Estudia", "Se va a dormir"], answer: "Se ducha", why: "«Zuerst dusche ich»." },
      { type: "fill", q: "¿A qué hora se va a dormir? (un número)", answers: ["11", "elf"], hint: "Un número", why: "«Um elf Uhr»." },
      { type: "tf", q: "Tom desayuna antes de ducharse.", answer: false, why: "Primero se ducha, después desayuna." },
    ],
  },
};
