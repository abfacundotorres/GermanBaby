// Simulacros tipo examen B2: comprensión lectora, auditiva y expresión escrita, con el formato y la dificultad de un examen
// de nivel B2 pero con textos propios (no son materiales oficiales). Para sumar un simulacro, agregá una entrada.

import type { ListenQuestion } from "../curriculum.ts";

export type ExamText = { title: string; text: string[]; questions: ListenQuestion[] };
export type ExamAudio = { title: string; setting: string; lines: { who: "f" | "m"; name: string; de: string }[]; questions: ListenQuestion[] };
export type ExamWriting = { prompt: string; focus: string[]; minSentences: number; hint?: string };
export type Exam = { id: string; level: "B2"; title: string; lesen: ExamText[]; hoeren: ExamAudio[]; schreiben: ExamWriting };

const c = (q: string, options: string[], why: string): ListenQuestion => ({ type: "choice", q, options, answer: options[0], why });
const tf = (q: string, answer: boolean, why: string): ListenQuestion => ({ type: "tf", q, answer, why });
const fi = (q: string, answers: string[], why: string): ListenQuestion => ({ type: "fill", q, answers, hint: "un número", why });

export const EXAMS: Exam[] = [
  {
    id: "b2-1",
    level: "B2",
    title: "Simulacro B2 · 1",
    lesen: [
      {
        title: "Zurück aufs Land",
        text: [
          "Jahrzehntelang zogen junge Menschen vom Land in die Städte, weil es dort mehr Arbeit, mehr Kultur und mehr Möglichkeiten gab. Seit einigen Jahren beobachten Forscher jedoch einen Gegentrend: Immer mehr Familien kehren den Großstädten den Rücken und suchen ein Zuhause in kleineren Orten.",
          "Der Hauptgrund sind die Wohnkosten. In vielen Städten sind die Mieten so stark gestiegen, dass sich eine Familie mit durchschnittlichem Einkommen kaum noch eine Wohnung mit mehreren Zimmern leisten kann. Auf dem Land bekommt man für dasselbe Geld ein Haus mit Garten. Hinzu kommt, dass das Arbeiten von zu Hause den täglichen Weg ins Büro überflüssig gemacht hat – zumindest an einigen Tagen der Woche.",
          "Doch das Landleben hat auch Schattenseiten. Wer nicht mit dem Auto unterwegs ist, hat es schwer: Busse fahren selten, und der nächste Arzt ist oft weit entfernt. Auch das Internet ist nicht überall schnell genug, was für Berufstätige zum Problem werden kann. Einige Gemeinden versuchen deshalb, neue Bewohner mit Zuschüssen und schnellen Glasfaserleitungen anzulocken.",
          "Ob aus dem Gegentrend eine dauerhafte Bewegung wird, ist noch offen. Experten gehen davon aus, dass die Städte weiter wachsen werden, die Zahl der Rückkehrer aber so groß ist, dass sich manche Dörfer erstmals seit Jahren über steigende Einwohnerzahlen freuen.",
        ],
        questions: [
          c("¿Por qué se mudaban antes muchos jóvenes a las ciudades?", ["Por el trabajo, la cultura y las oportunidades", "Por los alquileres bajos", "Por el aire más limpio", "Por la familia"], "«mehr Arbeit, mehr Kultur und mehr Möglichkeiten»."),
          c("Según el texto, ¿cuál es el motivo principal del regreso al campo?", ["Los altos costos de la vivienda en las ciudades", "El deseo de cambiar de profesión", "La falta de cultura en las ciudades", "La mejor educación en los pueblos"], "«Der Hauptgrund sind die Wohnkosten»."),
          tf("En el campo se consigue más espacio por el mismo dinero.", true, "«für dasselbe Geld ein Haus mit Garten»."),
          c("¿Qué problema del campo menciona el texto?", ["Pocos colectivos y médicos lejos", "Demasiado ruido", "Falta de naturaleza", "Pocos puestos de trabajo en casa"], "«Busse fahren selten, … der nächste Arzt ist oft weit entfernt»."),
          tf("Todos los municipios tienen internet rápido.", false, "«nicht überall schnell genug»."),
          c("¿Con qué intentan atraer vecinos nuevos algunos municipios?", ["Con subsidios y fibra óptica", "Con alquileres gratis", "Con trabajo asegurado", "Con transporte gratuito"], "«Zuschüssen und schnellen Glasfaserleitungen»."),
          c("¿Cómo evalúan la evolución los expertos?", ["Las ciudades siguen creciendo, pero algunos pueblos vuelven a crecer", "Las ciudades se van a vaciar", "Todos los pueblos pierden habitantes", "Nadie se pronuncia"], "«die Städte weiter wachsen… manche Dörfer… steigende Einwohnerzahlen»."),
        ],
      },
      {
        title: "Leserbrief zum Fahrverbot",
        text: [
          "Sehr geehrte Redaktion, mit Interesse habe ich Ihren Artikel über das geplante Fahrverbot in der Innenstadt gelesen. Natürlich ist saubere Luft wichtig, doch ich halte den Vorschlag für übereilt. Viele ältere Menschen können weder Rad fahren noch lange Wege zu Fuß zurücklegen, und die Busse sind zu den Stoßzeiten schon jetzt überfüllt. Bevor man Autos aussperrt, sollte die Stadt zuerst ein besseres Angebot im öffentlichen Nahverkehr schaffen. Außerdem fürchte ich, dass die Geschäfte in der Innenstadt Kunden verlieren, wenn diese nicht mehr bequem anreisen können. Ein schrittweises Vorgehen wäre meiner Ansicht nach klüger. Mit freundlichen Grüßen, Katrin Maurer",
        ],
        questions: [
          c("¿Qué opina la autora de la prohibición?", ["Que es apresurada", "Que es imprescindible", "Que llega tarde", "Que es demasiado suave"], "«ich halte den Vorschlag für übereilt»."),
          tf("Para la autora el aire limpio no es importante.", false, "«Natürlich ist saubere Luft wichtig»."),
          c("¿Qué dificultad nombra para los mayores?", ["No pueden andar en bici ni caminar mucho", "No tienen auto", "No usan el colectivo", "No conocen la zona"], "«weder Rad fahren noch lange Wege zu Fuß»."),
          c("¿Qué reclama que se haga primero?", ["Mejorar el transporte público", "Construir más estacionamientos", "Bajar los impuestos", "Cerrar el centro por completo"], "«zuerst ein besseres Angebot im öffentlichen Nahverkehr»."),
        ],
      },
    ],
    hoeren: [
      {
        title: "Beratung im Reisebüro",
        setting: "Herr Brandt llama a una agencia de viajes",
        lines: [
          { who: "f", name: "Frau Wolf", de: "Reisebüro Sonnenweg, Wolf am Apparat. Wie kann ich Ihnen helfen?" },
          { who: "m", name: "Herr Brandt", de: "Guten Tag, hier Brandt. Ich möchte im September mit meiner Frau eine Woche verreisen, am liebsten ans Meer, aber nicht nach Spanien." },
          { who: "f", name: "Frau Wolf", de: "Dann hätte ich Kroatien oder Griechenland. Griechenland ist im September noch warm, das Meer hat über zwanzig Grad." },
          { who: "m", name: "Herr Brandt", de: "Das klingt gut. Was kostet eine Woche für zwei Personen?" },
          { who: "f", name: "Frau Wolf", de: "In einem Hotel mit Halbpension ungefähr neunhundert Euro pro Person, ohne Flug. Der Flug kommt mit rund zweihundertfünfzig Euro dazu." },
          { who: "m", name: "Herr Brandt", de: "Das ist etwas mehr, als wir geplant haben. Wir wollten höchstens tausend Euro pro Person ausgeben, mit Flug." },
          { who: "f", name: "Frau Wolf", de: "Dann würde ich ein Hotel ohne Halbpension vorschlagen. Das spart etwa hundertfünfzig Euro, und in Griechenland isst man abends ohnehin gern in den kleinen Lokalen." },
          { who: "m", name: "Herr Brandt", de: "Gute Idee. Gibt es auch eine Möglichkeit, die Reise später kostenlos zu stornieren?" },
          { who: "f", name: "Frau Wolf", de: "Ja, bis vierzehn Tage vor der Abreise. Danach fallen Gebühren an. Diese Option kostet allerdings dreißig Euro extra." },
          { who: "m", name: "Herr Brandt", de: "Dreißig Euro für die Sicherheit, die nehme ich. Meine Frau hat im Herbst oft Termine, die sich kurzfristig ändern." },
          { who: "f", name: "Frau Wolf", de: "Dann reserviere ich Ihnen die Reise bis morgen Mittag. Ich schicke Ihnen alle Unterlagen per Mail." },
          { who: "m", name: "Herr Brandt", de: "Vielen Dank, Frau Wolf. Meine Adresse haben Sie ja schon." },
        ],
        questions: [
          c("¿Adónde NO quiere ir Herr Brandt?", ["A España", "A Croacia", "A Grecia", "Al mar"], "«aber nicht nach Spanien»."),
          tf("En septiembre el mar en Grecia todavía está cálido.", true, "«im September noch warm»."),
          c("¿Por qué el primer presupuesto no le sirve?", ["Supera lo que pensaba gastar", "Es muy barato", "No incluye hotel", "Es para una sola persona"], "«etwas mehr, als wir geplant haben»."),
          c("¿Qué propone la empleada para ahorrar?", ["Un hotel sin media pensión", "Viajar en octubre", "Ir a Croacia en auto", "Una semana menos"], "«ein Hotel ohne Halbpension»."),
          fi("¿Cuántos euros cuesta la opción de cancelación gratuita?", ["30", "dreißig"], "«dreißig Euro extra»."),
          c("¿Hasta cuándo se puede cancelar sin costo?", ["Hasta catorce días antes de la salida", "Hasta el día anterior", "Hasta una semana antes", "En cualquier momento"], "«bis vierzehn Tage vor der Abreise»."),
        ],
      },
    ],
    schreiben: {
      prompt: "Escribí una opinión para el diario de tu colegio: ¿deberían las escuelas dar menos tarea? Presentá tu postura, dos argumentos con un ejemplo, una objeción y una conclusión.",
      focus: ["Einleitung und eigene Meinung (Ich bin der Meinung, dass…)", "zwei Argumente mit Beispiel (zum Beispiel…, dafür spricht…)", "eine Gegenposition (zwar… aber / man könnte einwenden, dass…)", "Schluss (abschließend…)"],
      minSentences: 8,
      hint: "Usá conectores de B2 y mostrá el orden: introducción, argumentos, objeción, cierre.",
    },
  },
  {
    id: "b2-2",
    level: "B2",
    title: "Simulacro B2 · 2",
    lesen: [
      {
        title: "Plastikfrei einkaufen",
        text: [
          "In immer mehr Städten eröffnen Läden, in denen man Lebensmittel ohne Verpackung kaufen kann. Statt in Plastiktüten werden Nudeln, Reis oder Nüsse in mitgebrachte Gläser und Dosen gefüllt, und auch Waschmittel oder Öl gibt es zum Abfüllen.",
          "Die Idee dahinter ist einfach: Verpackungsmüll soll gar nicht erst entstehen. Nach Angaben von Umweltverbänden verursacht jeder Haushalt im Jahr mehrere hundert Kilogramm Verpackungsabfall – ein großer Teil davon ließe sich vermeiden.",
          "Doch die Läden haben mit Hindernissen zu kämpfen. Viele Kunden finden es umständlich, jedes Mal eigene Behälter mitzunehmen, und die Preise sind oft höher als im Supermarkt, weil die Betreiber kleine Mengen einkaufen und mehr Personal brauchen. Außerdem bieten sie nur einen Teil des Sortiments an, sodass man für den Wocheneinkauf trotzdem noch in den Supermarkt muss.",
          "Trotzdem sehen die Betreiber optimistisch in die Zukunft. Immer mehr große Ketten testen inzwischen eigene Abfüllstationen, was zeigt, dass die Idee im Alltag angekommen ist. Für viele Kunden bedeutet der Einkauf ohne Verpackung auch ein bewussteres Konsumverhalten: Wer nur so viel abfüllt, wie er braucht, wirft weniger Lebensmittel weg.",
        ],
        questions: [
          c("¿Qué tienen de particular estos negocios?", ["Venden alimentos sin envase", "Solo venden productos orgánicos", "Solo venden por internet", "Venden envases reutilizables"], "«Lebensmittel ohne Verpackung»."),
          tf("Los clientes llevan sus propios recipientes.", true, "«mitgebrachte Gläser und Dosen»."),
          c("¿Cuál es la idea central?", ["Que el residuo de envases ni siquiera se produzca", "Que se recicle más", "Que los productos sean más baratos", "Que haya más negocios chicos"], "«Verpackungsmüll soll gar nicht erst entstehen»."),
          c("¿Qué desventajas tienen estos negocios?", ["Precios más altos y surtido limitado", "Mala calidad", "Horarios muy cortos", "Poca higiene"], "«Preise… höher… nur einen Teil des Sortiments»."),
          tf("Con estos negocios se puede reemplazar por completo el supermercado.", false, "«trotzdem noch in den Supermarkt»."),
          c("¿Cómo reaccionan las grandes cadenas?", ["Prueban estaciones propias de relleno", "Los critican", "Los ignoran", "Los compran"], "«eigene Abfüllstationen»."),
          c("¿Qué efecto positivo menciona el texto para los clientes?", ["Tiran menos alimentos", "Gastan menos plata", "Ahorran tiempo", "Compran más variedad"], "«wirft weniger Lebensmittel weg»."),
        ],
      },
      {
        title: "Mitteilung der Hausverwaltung",
        text: [
          "Liebe Mieterinnen und Mieter, ab dem 1. März wird die Heizungsanlage in unserem Haus erneuert. Die Arbeiten dauern voraussichtlich vier Wochen. In dieser Zeit steht an manchen Tagen kein Warmwasser zur Verfügung; die genauen Termine hängen jeweils zwei Tage vorher im Treppenhaus aus. Wir bitten alle Bewohner, am ersten Arbeitstag zwischen 8 und 16 Uhr dafür zu sorgen, dass jemand in der Wohnung ist, damit die Handwerker die Heizkörper prüfen können. Für Fragen steht Hausmeister Herr Brandt montags bis donnerstags zwischen 9 und 11 Uhr zur Verfügung. Ihre Hausverwaltung",
        ],
        questions: [
          fi("¿Cuántas semanas durarán las obras?", ["4", "vier"], "«voraussichtlich vier Wochen»."),
          c("¿Qué pasará algunos días?", ["No habrá agua caliente", "No habrá luz", "Se cortará el gas", "No habrá ascensor"], "«kein Warmwasser»."),
          tf("Las fechas exactas se avisan por correo.", false, "«hängen… im Treppenhaus aus»."),
          c("¿Cuándo atiende el encargado?", ["De lunes a jueves, de 9 a 11", "Todos los días de 8 a 16", "Los viernes a la tarde", "Solo el primer día"], "«montags bis donnerstags zwischen 9 und 11 Uhr»."),
        ],
      },
    ],
    hoeren: [
      {
        title: "Termin in der Zahnarztpraxis",
        setting: "Herr Lindner llama a un consultorio para cambiar su turno",
        lines: [
          { who: "f", name: "Praxis", de: "Praxis Doktor Keller, guten Morgen." },
          { who: "m", name: "Herr Lindner", de: "Guten Morgen, Lindner. Ich habe morgen um zehn Uhr einen Termin bei Frau Doktor Keller, aber leider kann ich nicht kommen." },
          { who: "f", name: "Praxis", de: "Das ist schade. Geht es um die Kontrolle oder um die Behandlung?" },
          { who: "m", name: "Herr Lindner", de: "Um die Behandlung. Ich habe einen Zahn, der seit Tagen wehtut, aber morgen muss ich überraschend auf eine Dienstreise nach Hamburg." },
          { who: "f", name: "Praxis", de: "Dann sollten Sie den Termin nicht zu lange verschieben. Wir hätten nächste Woche am Dienstag um halb neun oder am Donnerstag um vierzehn Uhr etwas frei." },
          { who: "m", name: "Herr Lindner", de: "Dienstag früh geht bei mir nicht, da bin ich noch in Hamburg. Donnerstag um zwei passt gut." },
          { who: "f", name: "Praxis", de: "Gut, dann trage ich Sie für Donnerstag um vierzehn Uhr ein. Und falls die Schmerzen vorher stärker werden, rufen Sie bitte sofort an – wir haben jeden Tag eine Notfallsprechstunde." },
          { who: "m", name: "Herr Lindner", de: "Danke, das ist gut zu wissen. Muss ich irgendetwas mitbringen?" },
          { who: "f", name: "Praxis", de: "Bringen Sie bitte Ihre Versichertenkarte mit und, wenn Sie welche haben, die alten Röntgenbilder." },
          { who: "m", name: "Herr Lindner", de: "Die Bilder habe ich leider nicht mehr. Ich war zuletzt vor sechs Jahren bei einer anderen Praxis." },
          { who: "f", name: "Praxis", de: "Kein Problem, dann machen wir neue. Das dauert nur ein paar Minuten." },
          { who: "m", name: "Herr Lindner", de: "Wunderbar. Dann bis Donnerstag. Auf Wiederhören!" },
        ],
        questions: [
          c("¿Por qué no puede ir mañana?", ["Tiene un viaje de trabajo", "Está enfermo", "Tiene otro turno", "Se olvidó"], "«überraschend auf eine Dienstreise»."),
          c("¿Qué turno elige?", ["El jueves a las 14", "El martes a las 8.30", "El miércoles", "Mañana a las 10"], "«Donnerstag um zwei passt gut»."),
          tf("Herr Lindner tiene dolor.", true, "«ein Zahn, der seit Tagen wehtut»."),
          tf("Con más dolor debe esperar hasta el jueves.", false, "«rufen Sie bitte sofort an»."),
          c("¿Qué debe llevar al turno?", ["La tarjeta del seguro y, si tiene, radiografías viejas", "Solo un documento", "Un análisis de sangre", "Una derivación"], "«Versichertenkarte… alten Röntgenbilder»."),
          fi("¿Hace cuántos años fue por última vez a un dentista?", ["6", "sechs"], "«vor sechs Jahren»."),
        ],
      },
    ],
    schreiben: {
      prompt: "Escribí un mail formal al hotel donde pasaste tres noches: tu habitación era ruidosa por una obra y no te avisaron. Describí el problema y pedí un reembolso parcial.",
      focus: ["Anrede und Betreff", "Problem genau beschreiben (Perfekt / Präteritum)", "höfliche Forderung (Ich wäre Ihnen dankbar, wenn…)", "Schluss und Grußformel"],
      minSentences: 7,
      hint: "Tono formal: «Sehr geehrte Damen und Herren», «Hiermit möchte ich mich beschweren».",
    },
  },
];
