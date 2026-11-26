// Simulacros A2 adicionales (4 y 5): lectura, escucha y escritura con textos propios (no son materiales oficiales).
// La respuesta correcta va primera en `c`; la pantalla mezcla las opciones.

import type { ListenQuestion } from "../curriculum.ts";
import type { Exam } from "./exams.ts";

const c = (q: string, options: string[], why: string): ListenQuestion => ({ type: "choice", q, options, answer: options[0], why });
const tf = (q: string, answer: boolean, why: string): ListenQuestion => ({ type: "tf", q, answer, why });
const fi = (q: string, answers: string[], why: string): ListenQuestion => ({ type: "fill", q, answers, hint: "un número", why });

export const EXAMS_A2X: Exam[] = [
  {
    id: "a2-4",
    level: "A2",
    title: "Simulacro A2 · 4",
    lesen: [
      {
        title: "Eine Postkarte aus Italien",
        text: [
          "Liebe Oma, lieber Opa, wir sind seit vier Tagen in Rimini und es gefällt uns sehr gut. Am Montag sind wir mit dem Zug aus München abgefahren und haben fast acht Stunden gebraucht, weil es auf der Strecke einen Stau gab und der Zug lange stehen musste. Das Hotelzimmer ist klein, aber sauber, und von unserem Fenster sehen wir das Meer.",
          "Gestern haben wir eine lange Wanderung am Ufer gemacht und viele Fotos gemacht. Heute Abend gehen wir mit netten Leuten aus dem Hotel in ein Lokal. Übermorgen fahren wir mit dem Bus nach Venedig, und am Sonntag kommen wir zurück. Wir vermissen euch! Eure Lena",
        ],
        questions: [
          c("¿Hace cuántos días están en Rimini?", ["Cuatro", "Dos", "Una semana", "Ocho"], "«seit vier Tagen»."),
          c("¿Por qué el viaje en tren fue tan largo?", ["Hubo un embotellamiento en el trayecto y el tren tuvo que esperar", "El tren estaba roto", "Se equivocaron de tren", "Hubo huelga"], "«einen Stau auf der Strecke»."),
          c("¿Qué ven desde la ventana del hotel?", ["El mar", "La montaña", "Un parque", "La ciudad"], "«sehen wir das Meer»."),
          tf("Ayer hicieron una caminata larga.", true, "«eine lange Wanderung»."),
          c("¿Cómo viajarán a Venecia?", ["En colectivo", "En tren", "En avión", "En auto"], "«mit dem Bus nach Venedig»."),
        ],
      },
      {
        title: "Hotelinformationen",
        text: [
          "Willkommen im Hotel Sonnenhof! Das Frühstück gibt es täglich von 7 bis 10 Uhr im Erdgeschoss; am Wochenende bis 11 Uhr. Die Rezeption ist rund um die Uhr geöffnet. Am Abreisetag muss das Zimmer bis 11 Uhr frei sein, die Koffer können Sie aber bis 18 Uhr bei uns lassen.",
          "Parken ist im Parkhaus neben dem Hotel möglich und kostet zehn Euro pro Tag. Den Prospekt mit Ausflügen finden Sie an der Rezeption; der Eintritt in das Stadtmuseum ist für Hotelgäste ermäßigt. Wenn Sie ein Taxi brauchen, rufen wir gern eines für Sie.",
        ],
        questions: [
          fi("¿Hasta qué hora es el desayuno de lunes a viernes?", ["10", "zehn"], "«von 7 bis 10 Uhr»."),
          c("¿Cuándo está abierta la recepción?", ["Las 24 horas", "Solo de día", "De 7 a 18", "Solo al desayuno"], "«rund um die Uhr»."),
          fi("¿Hasta qué hora debe estar libre la habitación el día de la partida?", ["11", "elf"], "«bis 11 Uhr frei»."),
          fi("¿Cuántos euros cuesta el estacionamiento por día?", ["10", "zehn"], "«zehn Euro pro Tag»."),
          tf("El hotel puede llamar un taxi para los huéspedes.", true, "«rufen wir gern eines für Sie»."),
        ],
      },
    ],
    hoeren: [
      {
        title: "Am Fahrkartenschalter",
        setting: "Paul compra un pasaje de tren en la estación",
        lines: [
          { who: "m", name: "Paul", de: "Guten Tag. Ich möchte eine Fahrkarte nach Hamburg, bitte." },
          { who: "f", name: "Schalter", de: "Einfach oder hin und zurück?" },
          { who: "m", name: "Paul", de: "Hin und zurück. Ich fahre am Samstag und komme am Sonntagabend zurück." },
          { who: "f", name: "Schalter", de: "Gut. Es gibt eine Bahnverbindung um 8:15 Uhr, Sie sind um 12:40 Uhr in Hamburg." },
          { who: "m", name: "Paul", de: "Gibt es auch einen früheren Zug?" },
          { who: "f", name: "Schalter", de: "Ja, um 6:50 Uhr. Aber dann müssen Sie in Hannover umsteigen. Das dauert länger." },
          { who: "m", name: "Paul", de: "Dann nehme ich den um 8:15. Was kostet das?" },
          { who: "f", name: "Schalter", de: "Hin und zurück neunundachtzig Euro. Mit der Bahncard fünfzig Prozent weniger." },
          { who: "m", name: "Paul", de: "Leider habe ich keine Bahncard. Kann ich mit Karte zahlen?" },
          { who: "f", name: "Schalter", de: "Natürlich. Der Zug fährt von Gleis sieben ab. Gute Reise!" },
        ],
        questions: [
          c("¿Qué tipo de pasaje compra?", ["Ida y vuelta", "Solo de ida", "Un abono mensual", "Uno de primera clase"], "«Hin und zurück»."),
          c("¿Cuándo vuelve?", ["El domingo a la noche", "El sábado a la noche", "El lunes", "El domingo a la mañana"], "«am Sonntagabend»."),
          c("¿Por qué no toma el tren de las 6:50?", ["Hay que hacer transbordo y tarda más", "Es más caro", "Está lleno", "No existe"], "«in Hannover umsteigen. Das dauert länger»."),
          fi("¿Cuántos euros cuesta ida y vuelta?", ["89", "neunundachtzig"], "«neunundachtzig Euro»."),
          tf("Paul tiene Bahncard.", false, "«Leider habe ich keine Bahncard»."),
          fi("¿De qué vía sale el tren?", ["7", "sieben"], "«Gleis sieben»."),
        ],
      },
    ],
    schreiben: {
      prompt: "Escribí un mail al hotel Sonnenhof: querés reservar una habitación doble para tres noches en agosto, preguntá si el desayuno está incluido, si hay estacionamiento y a qué hora podés llegar. Tratamiento formal.",
      focus: ["Anrede und Schluss formal (Sehr geehrte Damen und Herren / Mit freundlichen Grüßen)", "Reservierungswunsch mit Datum und Dauer", "mindestens zwei Fragen (Frühstück, Parkplatz, Ankunft)"],
      minSentences: 5,
      hint: "Ich möchte … reservieren. Ist das Frühstück im Preis enthalten? Gibt es …? Wann kann ich …?",
    },
  },
  {
    id: "a2-5",
    level: "A2",
    title: "Simulacro A2 · 5",
    lesen: [
      {
        title: "Zimmer in einer WG",
        text: [
          "Zimmer frei in netter WG! Wir sind drei Studenten und suchen einen vierten Mitbewohner oder eine vierte Mitbewohnerin. Das Zimmer ist 14 Quadratmeter groß und hat ein Fenster zum Garten. Es kostet 320 Euro im Monat inklusive Heizung und Internet. Die Wohnung liegt im Norden der Stadt, fünf Minuten zu Fuß von der Straßenbahn.",
          "Wir kochen oft zusammen, und jeden Samstag macht jemand den Putzdienst: Bad, Küche und Flur. Rauchen ist in der Wohnung verboten, Haustiere sind leider nicht erlaubt. Wenn Sie Interesse haben, rufen Sie bitte Tom an (Vorwahl 089, Nummer 4455), am besten abends nach 18 Uhr.",
        ],
        questions: [
          c("¿Cuántas personas viven ya en el departamento?", ["Tres", "Cuatro", "Dos", "Cinco"], "«drei Studenten … einen vierten»."),
          fi("¿Cuánto cuesta el cuarto por mes (euros)?", ["320", "dreihundertzwanzig"], "«320 Euro im Monat»."),
          c("¿Qué incluye el precio?", ["Calefacción e internet", "Solo la luz", "La comida", "El gas y el agua"], "«inklusive Heizung und Internet»."),
          tf("Se permiten mascotas.", false, "«Haustiere sind leider nicht erlaubt»."),
          c("¿Cuándo conviene llamar a Tom?", ["De noche, después de las 18", "A la mañana", "El sábado", "Al mediodía"], "«abends nach 18 Uhr»."),
        ],
      },
      {
        title: "Tipps bei einer Erkältung",
        text: [
          "Eine Erkältung ist im Herbst und im Winter normal. Meistens beginnt sie mit Halsschmerzen und Schnupfen, später kommen Husten und Kopfweh dazu. Fieber hat man nicht immer. Wichtig ist: viel schlafen, warm anziehen und viel trinken, am besten Tee oder Wasser.",
          "Gehen Sie zum Arzt, wenn die Beschwerden länger als eine Woche dauern oder wenn Sie hohes Fieber haben. In der Apotheke bekommen Sie Medikamente gegen Husten und Schmerzen. Bleiben Sie zu Hause, damit Sie niemanden anstecken, und waschen Sie oft die Hände.",
        ],
        questions: [
          c("¿Con qué suele empezar un resfrío?", ["Con dolor de garganta y catarro", "Con fiebre alta", "Con dolor de estómago", "Con dolor de muelas"], "«Halsschmerzen und Schnupfen»."),
          tf("Siempre hay fiebre.", false, "«Fieber hat man nicht immer»."),
          c("¿Qué conviene tomar?", ["Té o agua", "Café", "Vino", "Jugo con hielo"], "«Tee oder Wasser»."),
          c("¿Cuándo hay que ir al médico?", ["Si dura más de una semana", "Desde el primer día", "Si hace frío", "Nunca"], "«länger als eine Woche»."),
          tf("Se recomienda quedarse en casa.", true, "«Bleiben Sie zu Hause»."),
        ],
      },
    ],
    hoeren: [
      {
        title: "Im Restaurant",
        setting: "Una pareja pide la cena y luego pide la cuenta",
        lines: [
          { who: "m", name: "Kellner", de: "Guten Abend. Haben Sie schon gewählt?" },
          { who: "f", name: "Nina", de: "Ja, ich nehme die Nudeln mit Pilzen. Ist das Gericht vegetarisch?" },
          { who: "m", name: "Kellner", de: "Ja, aber die Sauce enthält Sahne. Möchten Sie lieber Olivenöl?" },
          { who: "f", name: "Nina", de: "Ja, bitte mit Olivenöl. Und dazu ein Mineralwasser." },
          { who: "m", name: "Kellner", de: "Gern. Und für den Herrn?" },
          { who: "m", name: "Ben", de: "Ich nehme das Hähnchen mit Pommes und ein Glas Wein, bitte." },
          { who: "m", name: "Kellner", de: "Rot oder weiß?" },
          { who: "m", name: "Ben", de: "Weiß, bitte. Und zum Nachtisch einen Joghurt mit Honig." },
          { who: "m", name: "Kellner", de: "Das bringe ich später. Das Essen dauert etwa zwanzig Minuten." },
          { who: "f", name: "Nina", de: "Kein Problem. Danach möchten wir bitte die Rechnung, getrennt." },
        ],
        questions: [
          c("¿Qué pide Nina?", ["Fideos con hongos", "Pollo con papas", "Sopa", "Ensalada"], "«die Nudeln mit Pilzen»."),
          c("¿Qué le sugiere el mozo cambiar?", ["La crema por aceite de oliva", "La sal", "Los hongos", "Los fideos"], "«lieber Olivenöl»."),
          c("¿Qué bebida pide Ben?", ["Una copa de vino blanco", "Vino tinto", "Cerveza", "Agua mineral"], "«Weiß»."),
          c("¿Qué pide Ben de postre?", ["Yogur con miel", "Torta", "Helado", "Fruta"], "«Joghurt mit Honig»."),
          fi("¿Cuántos minutos tarda la comida?", ["20", "zwanzig"], "«etwa zwanzig Minuten»."),
          tf("Nina y Ben quieren una cuenta en conjunto.", false, "«getrennt»."),
        ],
      },
    ],
    schreiben: {
      prompt: "Un amigo te preguntó cómo estás porque no te vio en el curso. Escribile un mensaje: estás resfriado desde hace tres días, qué síntomas tenés, qué hacés para mejorar y cuándo volvés al curso. Terminá con una pregunta.",
      focus: ["Beschwerden beschreiben (Ich habe Schnupfen, Mein Hals tut weh)", "Dauer mit «seit drei Tagen»", "Maßnahmen und Rückkehr (Ich bleibe zu Hause, Ich komme am … wieder)"],
      minSentences: 5,
      hint: "Hallo …, ich bin seit drei Tagen erkältet. Ich habe … Ich trinke … Am Montag komme ich wieder. Hast du …?",
    },
  },
];
