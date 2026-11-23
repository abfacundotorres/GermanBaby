// Lecciones bonus de las dos unidades B2 de estructura (orden de las palabras e infinitivo y futuro):
// lectura, práctica, escucha larga y vocabulario temático.

import type { Lesson } from "../curriculum.ts";
import type { FreePrompt } from "./free-prompts.ts";
import { cz, qz, practice } from "./practice-a2.ts";
import { reading } from "./readings.ts";
import { listening } from "./long-listening.ts";
import { thema, w } from "./thematic.ts";

export const READINGS_B2X: Record<string, Lesson> = {
  "satzbau-b2": reading(
    "Una mudanza",
    "Leer un texto con el orden de las palabras de B2 y sumar dos palabras.",
    [
      { de: "der Karton", es: "la caja de cartón", emoji: "📦", note: "Plural: «die Kartons». «Umzugskartons» = cajas de mudanza." },
      { de: "der Möbelwagen", es: "el camión de mudanzas", emoji: "🚚", note: "Plural: «die Möbelwagen»." },
    ],
    [
      cz("Ich habe ___ gestern das Paket gegeben.", "Ayer le di el paquete a ella. (pronombre en dativo)", ["ihr", "sie", "ihn", "es"], "ihr", "«geben» pide dativo para la persona: «ihr»."),
      cz("Wir sind ___ nach Köln gezogen.", "Nos mudamos a Colonia ayer. (lugar al final)", ["gestern", "morgen", "bald", "nie"], "gestern", "Primero el tiempo, después el lugar."),
      { kind: "write", es: "la caja de cartón", references: ["der Karton"] },
    ],
    "Der Umzug",
    ["Letzten Monat sind wir wegen der Arbeit meiner Frau von Hamburg nach München gezogen. Wir haben die Wohnung drei Wochen vorher im Internet gefunden und sie sofort gemietet. Am Samstagmorgen haben uns zehn Freunde bei dem Umzug geholfen. Meinem Bruder haben wir danach zum Dank ein großes Essen gekocht. Heute stehen die Möbel endlich an ihrem Platz."],
    ["El mes pasado nos mudamos de Hamburgo a Múnich por el trabajo de mi esposa. Tres semanas antes encontramos el departamento en internet y lo alquilamos enseguida. El sábado por la mañana nos ayudaron con la mudanza diez amigos. A mi hermano le cocinamos después, en agradecimiento, una gran comida. Hoy los muebles están por fin en su lugar."],
    [
      { type: "choice", q: "¿Por qué se mudaron?", options: ["Por el trabajo de su esposa", "Por el clima", "Por la escuela", "Por una herencia"], answer: "Por el trabajo de su esposa", why: "«wegen der Arbeit meiner Frau»." },
      { type: "choice", q: "¿Cómo encontraron el departamento?", options: ["En internet", "Por un amigo", "En el diario", "Con un agente"], answer: "En internet", why: "«im Internet gefunden»." },
      { type: "fill", q: "¿Cuántos amigos ayudaron?", answers: ["10", "zehn"], hint: "un número", why: "«zehn Freunde»." },
      { type: "tf", q: "A su hermano le cocinaron una gran comida.", answer: true, why: "«Meinem Bruder ... ein großes Essen gekocht»." },
    ],
  ),
  "infinitiv-futur": reading(
    "Planes para el año",
    "Leer un texto con infinitivos con «zu» y futuro, y sumar dos palabras.",
    [
      { de: "sich vornehmen", es: "proponerse", emoji: "🎯", note: "«Ich nehme mir vor, mehr zu lesen.» Separable." },
      { de: "die Angewohnheit", es: "el hábito", emoji: "📌", note: "Plural: «die Angewohnheiten»." },
    ],
    [
      cz("Er hat vor, nächstes Jahr ___ Spanien zu reisen.", "Piensa viajar a España el año próximo.", ["nach", "in", "zu", "bei"], "nach", "Los países sin artículo llevan «nach»."),
      cz("Im Sommer ___ wir endlich Urlaub machen.", "En el verano por fin vamos a hacer vacaciones. (futuro)", ["werden", "wurden", "würde", "wird"], "werden", "Futuro I: «werden» + infinitivo."),
      { kind: "write", es: "el hábito", references: ["die Angewohnheit"] },
    ],
    "Gute Vorsätze",
    ["Zu Beginn des Jahres nehme ich mir immer vor, gesünder zu leben. Dieses Jahr habe ich beschlossen, jeden Morgen eine halbe Stunde zu laufen, anstatt lange zu schlafen. Außerdem werde ich weniger Süßes essen, ohne dabei auf alles zu verzichten. Um das nicht zu vergessen, schreibe ich alles auf. Im Dezember werde ich sehen, ob ich es geschafft habe."],
    ["Al comenzar el año siempre me propongo vivir de manera más sana. Este año decidí correr cada mañana media hora en lugar de dormir mucho. Además voy a comer menos dulces, sin renunciar por eso a todo. Para no olvidarlo, lo anoto todo. En diciembre voy a ver si lo logré."],
    [
      { type: "choice", q: "¿Qué decidió hacer cada mañana?", options: ["Correr media hora", "Dormir más", "Leer", "Cocinar"], answer: "Correr media hora", why: "«eine halbe Stunde zu laufen»." },
      { type: "choice", q: "¿Qué hará con los dulces?", options: ["Comerá menos sin renunciar a todo", "Los evitará del todo", "Comerá más", "Los venderá"], answer: "Comerá menos sin renunciar a todo", why: "«weniger Süßes ... ohne ... auf alles zu verzichten»." },
      { type: "tf", q: "Anota todo para no olvidarlo.", answer: true, why: "«Um das nicht zu vergessen, schreibe ich alles auf»." },
      { type: "choice", q: "¿Cuándo verá si lo logró?", options: ["En diciembre", "En enero", "En verano", "Mañana"], answer: "En diciembre", why: "«Im Dezember»." },
    ],
  ),
};

export const PRACTICE_B2X: Record<string, Lesson> = {
  "satzbau-b2": practice(
    "orden de las palabras",
    "Repasar dativo antes de acusativo y tiempo-causa-modo-lugar con frases nuevas.",
    [
      cz("Ich schenke ___ ein Buch.", "Le regalo un libro a ella.", ["ihr", "sie", "ihm", "es"], "ihr", "La persona va en dativo."),
      cz("Ich gebe ___ dem Lehrer.", "Se lo doy al profesor. (el libro, pronombre)", ["es", "ihm", "ihn", "sie"], "es", "Con dos pronombres, primero el acusativo."),
      cz("Er ist ___ mit dem Zug nach Berlin gefahren.", "Ayer viajó a Berlín en tren.", ["gestern", "morgen", "bald", "nie"], "gestern", "Primero tiempo, luego modo y lugar."),
      qz("¿Cuál oración es correcta?", ["Ich habe ihm das Buch gegeben.", "Ich habe das Buch ihm gegeben.", "Ich habe gegeben ihm das Buch.", "Ich ihm habe das Buch gegeben."], "Ich habe ihm das Buch gegeben.", "Dativo (pronombre) antes del acusativo con sustantivo."),
      { kind: "build", es: "Ayer le mandé un correo a mi jefe", answer: "Gestern habe ich meinem Chef eine E-Mail geschickt", extra: ["ihn", "sie", "schicke"] },
      { kind: "write", es: "Decí que le diste las llaves a tu vecino ayer.", references: ["Ich habe meinem Nachbarn gestern die Schlüssel gegeben", "Gestern habe ich meinem Nachbarn die Schlüssel gegeben"] },
      { kind: "speak", de: "Ich habe ihm das Buch gestern gegeben", es: "Le di el libro ayer" },
    ],
    "Wer hat was bekommen?",
    "Lara y Tom hablan de los regalos de una fiesta",
    [
      ["f", "Lara", "Hast du Oma schon das Geschenk gegeben?", "¿Ya le diste el regalo a la abuela?"],
      ["m", "Tom", "Ja, ich habe es ihr gestern im Garten gegeben.", "Sí, se lo di ayer en el jardín."],
      ["f", "Lara", "Und was hat sie dem Opa geschenkt?", "¿Y qué le regaló ella al abuelo?"],
      ["m", "Tom", "Einen warmen Schal. Sie hat ihn ihm heute früh gebracht.", "Una bufanda abrigada. Se la trajo esta mañana temprano."],
      ["f", "Lara", "Wie schön! Dann schenke ich meinen Eltern morgen eine Reise.", "¡Qué lindo! Entonces mañana les regalo un viaje a mis padres."],
    ],
    [
      { type: "choice", q: "¿Dónde le dio Tom el regalo a la abuela?", options: ["En el jardín", "En la cocina", "En la calle", "En el coche"], answer: "En el jardín", why: "«im Garten»." },
      { type: "choice", q: "¿Qué le regaló la abuela al abuelo?", options: ["Una bufanda", "Un libro", "Un reloj", "Una torta"], answer: "Una bufanda", why: "«warmen Schal»." },
      { type: "tf", q: "Lara regala un viaje a sus padres.", answer: true, why: "«schenke ich meinen Eltern ... eine Reise»." },
    ],
  ),
  "infinitiv-futur": practice(
    "infinitivo y futuro",
    "Repasar «zu» + infinitivo, um… zu, ohne… zu y el futuro con frases nuevas.",
    [
      cz("Ich habe keine Lust, heute ___ arbeiten.", "No tengo ganas de trabajar hoy.", ["zu", "um", "ohne", "zum"], "zu", "«Lust haben» + «zu» + infinitivo."),
      cz("Er ging, ___ sich zu verabschieden.", "Se fue sin despedirse.", ["ohne", "um", "anstatt", "damit"], "ohne", "«ohne … zu» = sin + infinitivo."),
      cz("Nächstes Jahr ___ ich Spanisch lernen.", "El año próximo voy a aprender español.", ["werde", "wurde", "würde", "bin"], "werde", "Futuro I: «werden» + infinitivo."),
      qz("¿Cuál oración es correcta?", ["Sie fährt nach Berlin, um ihre Tante zu besuchen.", "Sie fährt nach Berlin, um ihre Tante besuchen.", "Sie fährt nach Berlin, zu ihre Tante besuchen.", "Sie fährt nach Berlin, damit ihre Tante zu besuchen."], "Sie fährt nach Berlin, um ihre Tante zu besuchen.", "«um … zu» + infinitivo al final."),
      { kind: "build", es: "Ella estudia para aprobar el examen", answer: "Sie lernt, um die Prüfung zu bestehen", extra: ["damit", "ohne", "bestanden"] },
      { kind: "write", es: "Decí que vas a mudarte a Berlín el año que viene.", references: ["Ich werde nächstes Jahr nach Berlin ziehen", "Nächstes Jahr werde ich nach Berlin ziehen"] },
      { kind: "speak", de: "Er ist gegangen, ohne etwas zu sagen", es: "Se fue sin decir nada" },
    ],
    "Pläne für die Zukunft",
    "Mia y Jan hablan de lo que harán el año próximo",
    [
      ["f", "Mia", "Was hast du für nächstes Jahr vor?", "¿Qué pensás hacer el año próximo?"],
      ["m", "Jan", "Ich werde in Wien studieren, um besser Deutsch zu lernen.", "Voy a estudiar en Viena para aprender mejor alemán."],
      ["f", "Mia", "Und deine Wohnung? Wirst du sie behalten?", "¿Y tu departamento? ¿Lo vas a conservar?"],
      ["m", "Jan", "Nein, ich werde sie vermieten, ohne viel Aufwand zu haben.", "No, lo voy a alquilar sin tener mucho trabajo."],
      ["f", "Mia", "Das klingt gut. Vergiss nicht, mich zu besuchen!", "Suena bien. ¡No te olvides de visitarme!"],
    ],
    [
      { type: "choice", q: "¿Dónde va a estudiar Jan?", options: ["En Viena", "En Berlín", "En Hamburgo", "En Zúrich"], answer: "En Viena", why: "«in Wien studieren»." },
      { type: "choice", q: "¿Qué hará con su departamento?", options: ["Lo alquilará", "Lo venderá", "Lo regalará", "Lo cerrará"], answer: "Lo alquilará", why: "«ich werde sie vermieten»." },
      { type: "tf", q: "Mia le pide que la visite.", answer: true, why: "«Vergiss nicht, mich zu besuchen»." },
    ],
  ),
};

export const FREE_PROMPTS_B2X: Record<string, FreePrompt> = {
  "satzbau-b2": { prompt: "Contá qué hiciste ayer: a quién le diste o le mandaste algo, cuándo y cómo.", focus: ["dativo antes de acusativo", "tiempo antes de lugar", "un pronombre (ihm / ihr / es)"], minSentences: 4 },
  "infinitiv-futur": { prompt: "Escribí tus planes para el año próximo y para qué los hacés.", focus: ["werden + infinitivo", "um … zu", "ohne … zu o anstatt … zu"], minSentences: 4 },
};

export const LONG_B2X: Record<string, Lesson> = {
  "satzbau-b2": listening(
    "una mudanza caótica",
    "Seguir un relato largo con dativo, acusativo y el orden tiempo-causa-modo-lugar.",
    "Der Umzugstag",
    "Eva le cuenta a su colega Paul cómo fue su mudanza",
    [
      ["m", "Paul", "Eva, wie war dein Umzug am Wochenende?", "Eva, ¿cómo fue tu mudanza el fin de semana?"],
      ["f", "Eva", "Chaotisch! Der Wagen sollte um acht Uhr morgens kommen, aber er kam erst um zehn.", "¡Caótica! El camión debía venir a las ocho de la mañana, pero llegó recién a las diez."],
      ["m", "Paul", "Und wer hat dir geholfen?", "¿Y quién te ayudó?"],
      ["f", "Eva", "Meine Schwester und ihr Mann. Ich habe ihnen zum Dank am Abend ein großes Essen gekocht.", "Mi hermana y su marido. Les cociné a la noche una gran comida en agradecimiento."],
      ["m", "Paul", "Und die Möbel? Sind sie heil angekommen?", "¿Y los muebles? ¿Llegaron enteros?"],
      ["f", "Eva", "Fast alle. Nur den Spiegel haben die Träger leider im Treppenhaus fallen lassen.", "Casi todos. Solo el espejo lo dejaron caer lamentablemente los cargadores en la escalera."],
      ["m", "Paul", "Das ist schade. Hast du es dem Verleih gemeldet?", "Qué lástima. ¿Se lo avisaste a la empresa?"],
      ["f", "Eva", "Ja, ich habe es ihnen noch am selben Tag per E-Mail geschrieben.", "Sí, se lo escribí por correo el mismo día."],
      ["m", "Paul", "Und haben sie dir schon geantwortet?", "¿Y ya te respondieron?"],
      ["f", "Eva", "Gestern haben sie mir einen Gutschein über fünfzig Euro angeboten.", "Ayer me ofrecieron un vale por cincuenta euros."],
      ["m", "Paul", "Nimmst du ihn an?", "¿Lo aceptás?"],
      ["f", "Eva", "Vielleicht. Zuerst will ich der Firma meine Meinung deutlich sagen.", "Tal vez. Primero quiero decirle claramente mi opinión a la empresa."],
      ["m", "Paul", "Das verstehe ich. Wann ist denn die Einweihungsparty?", "Lo entiendo. ¿Y cuándo es la fiesta de inauguración?"],
      ["f", "Eva", "Am Samstag in zwei Wochen. Ich schicke dir die Einladung morgen.", "El sábado en dos semanas. Te mando la invitación mañana."],
    ],
    [
      { type: "choice", q: "¿A qué hora llegó el camión?", options: ["A las diez", "A las ocho", "A las doce", "A las seis"], answer: "A las diez", why: "«erst um zehn»." },
      { type: "choice", q: "¿Quiénes la ayudaron?", options: ["Su hermana y su marido", "Sus padres", "Sus colegas", "Sus vecinos"], answer: "Su hermana y su marido", why: "«Meine Schwester und ihr Mann»." },
      { type: "choice", q: "¿Qué se rompió?", options: ["El espejo", "La mesa", "El sillón", "Una lámpara"], answer: "El espejo", why: "«den Spiegel»." },
      { type: "tf", q: "Eva avisó a la empresa por correo el mismo día.", answer: true, why: "«noch am selben Tag per E-Mail»." },
      { type: "fill", q: "¿De cuántos euros es el vale que le ofrecieron?", answers: ["50", "fünfzig"], hint: "un número", why: "«fünfzig Euro»." },
      { type: "choice", q: "¿Qué quiere hacer Eva primero?", options: ["Decirle su opinión a la empresa", "Aceptar el vale", "Ignorar el tema", "Cambiar de empresa"], answer: "Decirle su opinión a la empresa", why: "«meine Meinung deutlich sagen»." },
      { type: "choice", q: "¿Cuándo es la fiesta de inauguración?", options: ["El sábado en dos semanas", "Mañana", "El domingo", "En un mes"], answer: "El sábado en dos semanas", why: "«Am Samstag in zwei Wochen»." },
    ],
  ),
  "infinitiv-futur": listening(
    "el año que viene",
    "Seguir una charla larga sobre planes con «zu» + infinitivo, um… zu y futuro.",
    "Pläne für das neue Jahr",
    "Clara y Ben hablan de sus propósitos para el año nuevo",
    [
      ["f", "Clara", "Ben, hast du dir etwas für das neue Jahr vorgenommen?", "Ben, ¿te propusiste algo para el año nuevo?"],
      ["m", "Ben", "Ja, ich werde endlich anfangen, regelmäßig Sport zu treiben.", "Sí, por fin voy a empezar a hacer deporte con regularidad."],
      ["f", "Clara", "Das sagst du jedes Jahr! Was wird diesmal anders sein?", "¡Eso decís todos los años! ¿Qué va a ser distinto esta vez?"],
      ["m", "Ben", "Diesmal habe ich mich im Verein angemeldet, um nicht allein trainieren zu müssen.", "Esta vez me anoté en un club para no tener que entrenar solo."],
      ["f", "Clara", "Klingt vernünftig. Und was ist mit deiner Reise nach Japan?", "Suena razonable. ¿Y tu viaje a Japón?"],
      ["m", "Ben", "Ich habe vor, im Herbst zu fahren, aber ich muss noch Geld sparen.", "Pienso viajar en otoño, pero todavía tengo que ahorrar dinero."],
      ["f", "Clara", "Du könntest anfangen, weniger auswärts zu essen.", "Podrías empezar a comer menos afuera."],
      ["m", "Ben", "Das stimmt. Ich werde jeden Tag selbst kochen, anstatt Essen zu bestellen.", "Es verdad. Voy a cocinar yo mismo todos los días en lugar de pedir comida."],
      ["f", "Clara", "Ich hoffe, dass ich dieses Jahr mehr Zeit für meine Familie haben werde.", "Espero tener este año más tiempo para mi familia."],
      ["m", "Ben", "Hast du schon geplant, wie du das schaffen willst?", "¿Ya planeaste cómo querés lograrlo?"],
      ["f", "Clara", "Ja, ich werde mein Handy abends ausschalten, ohne ständig Nachrichten zu lesen.", "Sí, voy a apagar el celular de noche, sin leer mensajes todo el tiempo."],
      ["m", "Ben", "Das wird bestimmt nicht leicht, aber es lohnt sich.", "Seguramente no será fácil, pero vale la pena."],
      ["f", "Clara", "Wir sollten uns in einem halben Jahr wieder treffen, um Bilanz zu ziehen.", "Deberíamos encontrarnos en medio año para hacer un balance."],
    ],
    [
      { type: "choice", q: "¿Qué se propone Ben?", options: ["Hacer deporte con regularidad", "Dejar su trabajo", "Mudarse", "Aprender japonés"], answer: "Hacer deporte con regularidad", why: "«regelmäßig Sport zu treiben»." },
      { type: "choice", q: "¿Por qué se anotó en un club?", options: ["Para no entrenar solo", "Por el precio", "Por un amigo", "Por obligación"], answer: "Para no entrenar solo", why: "«um nicht allein trainieren zu müssen»." },
      { type: "choice", q: "¿Cuándo piensa viajar a Japón?", options: ["En otoño", "En verano", "En primavera", "En invierno"], answer: "En otoño", why: "«im Herbst»." },
      { type: "choice", q: "¿Qué hará para ahorrar?", options: ["Cocinar todos los días en lugar de pedir comida", "Vender el auto", "Trabajar más", "Dejar el club"], answer: "Cocinar todos los días en lugar de pedir comida", why: "«anstatt Essen zu bestellen»." },
      { type: "tf", q: "Clara quiere pasar más tiempo con su familia.", answer: true, why: "«mehr Zeit für meine Familie»." },
      { type: "choice", q: "¿Qué hará Clara con el celular?", options: ["Apagarlo de noche", "Venderlo", "Regalarlo", "Comprar otro"], answer: "Apagarlo de noche", why: "«abends ausschalten»." },
      { type: "choice", q: "¿Para qué quieren verse en medio año?", options: ["Para hacer un balance", "Para festejar", "Para viajar", "Para cocinar"], answer: "Para hacer un balance", why: "«um Bilanz zu ziehen»." },
    ],
  ),
};

export const THEMATIC_B2X: Record<string, Lesson> = {
  "satzbau-b2": thema(
    "tránsito y multas",
    "🚦",
    "Hablar de tránsito: reglas, multas, desperfectos y seguro.",
    [
      "En Alemania hay límites de «Geschwindigkeit» claros y los controles son frecuentes. Un «Verstoß» (infracción) se castiga con un «Bußgeld» (multa) y, si es grave, con puntos en el «Führerschein» (licencia).",
      "Si tenés un choque, la «Haftpflicht» (seguro de responsabilidad civil) cubre los daños a terceros; el auto roto va a la «Werkstatt» (taller).",
    ],
    [
      "«die Vorfahrt» = la prioridad de paso; «Vorfahrt achten» es la señal de ceda el paso.",
      "«überholen» = adelantar; con prefijo inseparable: «ich überhole».",
      "«abschleppen» (separable) = remolcar: «Man hat mein Auto abgeschleppt.»",
    ],
    [
      w("der Blitzer", "el radar de tránsito", "📸", "Der Blitzer hat mich gestern erwischt.", "El radar me atrapó ayer.", "Plural: «die Blitzer»."),
      w("das Tempolimit", "el límite de velocidad", "🚧", "In der Stadt gilt ein Tempolimit von fünfzig.", "En la ciudad rige un límite de velocidad de cincuenta."),
      w("überholen", "adelantar", "🚗", "Hier darf man nicht überholen.", "Acá no se puede adelantar.", "Inseparable: «ich überhole»."),
      w("der Kreisverkehr", "la rotonda", "🔄", "Im Kreisverkehr hat man Vorfahrt.", "En la rotonda se tiene prioridad.", "Plural: «die Kreisverkehre»."),
      w("die Vorfahrt", "la prioridad de paso", "↗️", "Hier hat der Radfahrer Vorfahrt.", "Acá el ciclista tiene prioridad."),
      w("das Bußgeld", "la multa", "💶", "Das Bußgeld beträgt hundert Euro.", "La multa es de cien euros."),
      w("der Strafzettel", "la boleta de multa", "🎫", "Am Auto hing ein Strafzettel.", "En el auto había una boleta de multa.", "Plural: «die Strafzettel»."),
      w("abschleppen", "remolcar", "🛻", "Sie müssen mein Auto abschleppen.", "Tienen que remolcar mi auto.", "Separable."),
      w("der Kostenvoranschlag", "el presupuesto", "🧮", "Die Werkstatt hat mir einen Kostenvoranschlag gemacht.", "El taller me hizo un presupuesto.", "Plural: «die Kostenvoranschläge»."),
      w("die Haftpflicht", "el seguro de responsabilidad civil", "📑", "Die Haftpflicht zahlt den Schaden des anderen.", "El seguro de responsabilidad civil paga el daño del otro."),
    ],
    [
      cz("Er hat das ___ überschritten.", "Superó el límite de velocidad.", ["Tempolimit", "Kostenvoranschlag", "Vorfahrt", "Haftpflicht"], "Tempolimit", "«Tempolimit» = límite de velocidad."),
      cz("Wegen der Raserei muss er ein ___ zahlen.", "Por manejar a exceso de velocidad tiene que pagar una multa.", ["Bußgeld", "Strafzettel", "Taxi", "Bahnticket"], "Bußgeld", "«Bußgeld» = multa."),
      { kind: "write", es: "el presupuesto", references: ["der Kostenvoranschlag"] },
      { kind: "write", es: "la prioridad de paso", references: ["die Vorfahrt"] },
    ],
    "An der Kreuzung",
    "Dos conductores hablan después de una infracción",
    [
      ["m", "Polizist", "Guten Tag, Sie haben an der Kreuzung die Vorfahrt nicht beachtet.", "Buen día, usted no respetó la prioridad de paso en el cruce."],
      ["f", "Frau Wolf", "Das tut mir leid, ich habe das Schild nicht gesehen.", "Lo lamento, no vi la señal."],
      ["m", "Polizist", "Das ist ein Verstoß. Das Bußgeld beträgt sechzig Euro. Bitte zeigen Sie mir Ihren Führerschein.", "Es una infracción. La multa es de sesenta euros. Muéstreme por favor su licencia."],
      ["f", "Frau Wolf", "Hier bitte. Ist an dem anderen Wagen etwas passiert?", "Acá tiene. ¿Le pasó algo al otro auto?"],
      ["m", "Polizist", "Nur ein kleiner Schaden. Ihre Haftpflicht übernimmt die Kosten für die Werkstatt.", "Solo un daño pequeño. Su seguro de responsabilidad civil se hace cargo de los costos del taller."],
    ],
    [
      { type: "choice", q: "¿Qué no respetó la señora?", options: ["La prioridad de paso", "La velocidad", "El semáforo", "El estacionamiento"], answer: "La prioridad de paso", why: "«die Vorfahrt nicht beachtet»." },
      { type: "fill", q: "¿Cuántos euros es la multa?", answers: ["60", "sechzig"], hint: "un número", why: "«sechzig Euro»." },
      { type: "tf", q: "El seguro pagará el arreglo en el taller.", answer: true, why: "«Haftpflicht übernimmt die Kosten für die Werkstatt»." },
    ],
  ),
  "infinitiv-futur": thema(
    "propósitos y proyectos",
    "🎯",
    "Hablar de metas, planes y plazos: proponerse, lograr, postergar y renunciar.",
    [
      "Los verbos de «proponerse» y «lograr» piden casi siempre «zu» + infinitivo: «Ich habe vor, …», «Ich versuche, …», «Es ist mir gelungen, …».",
      "«Vorhaben», «Ziel» y «Plan» son los sustantivos habituales; con «sich vornehmen» (separable) el infinitivo con «zu» va al final.",
    ],
    [
      "«sich zutrauen» = animarse a: «Ich traue mir das zu.»",
      "«gelingen» = lograr: «Es gelingt mir, …» (dativo).",
      "«dranbleiben» = no soltar; «aufgeben» = abandonar, rendirse.",
    ],
    [
      w("der Vorsatz", "el propósito", "🎯", "Mein guter Vorsatz ist, mehr zu lesen.", "Mi buen propósito es leer más.", "Plural: «die Vorsätze». «Gute Vorsätze» = propósitos de año nuevo."),
      w("die Entschlossenheit", "la determinación", "🔥", "Mit Entschlossenheit geht man weiter.", "Con determinación se sigue adelante."),
      w("sich zutrauen", "animarse a, creerse capaz", "🦁", "Du solltest dir mehr zutrauen.", "Deberías creer más en vos.", "Separable y reflexivo, con dativo."),
      w("dranbleiben", "no soltar, seguir con algo", "🧲", "Du musst an deinem Ziel dranbleiben.", "Tenés que seguir con tu meta.", "Separable, coloquial."),
      w("sich aufraffen", "juntar fuerzas", "💪", "Ich kann mich heute nicht aufraffen, laufen zu gehen.", "Hoy no logro juntar fuerzas para ir a correr.", "Reflexivo, separable."),
      w("die Etappe", "la etapa", "🛤️", "Die erste Etappe ist geschafft.", "La primera etapa está cumplida.", "Plural: «die Etappen»."),
      w("vorankommen", "avanzar", "🚶", "Wir wollen mit dem Projekt schneller vorankommen.", "Queremos avanzar más rápido con el proyecto.", "Separable."),
      w("der Neuanfang", "el nuevo comienzo", "🌅", "Nach der Krise wagte er einen Neuanfang.", "Después de la crisis se animó a un nuevo comienzo.", "Plural: «die Neuanfänge»."),
      w("motiviert", "motivado", "⚡", "Heute bin ich richtig motiviert.", "Hoy estoy realmente motivado.", "Adjetivo invariable."),
      w("der Rückschlag", "el revés", "📉", "Nach dem Rückschlag hat er nicht aufgegeben.", "Después del revés no se rindió.", "Plural: «die Rückschläge»."),
    ],
    [
      cz("Es ist mir ___, den Test zu bestehen.", "Logré aprobar el examen.", ["gelungen", "gelang", "gelingt", "gelingen"], "gelungen", "«gelingen» → «gelungen»."),
      cz("Er will an seinem Ziel ___.", "Quiere seguir con su meta.", ["dranbleiben", "drangeblieben", "bleibt dran", "dranbleibt"], "dranbleiben", "Infinitivo separable tras el modal."),
      { kind: "write", es: "el propósito", references: ["der Vorsatz"] },
      { kind: "write", es: "la etapa", references: ["die Etappe"] },
    ],
    "Ein Gespräch über Ziele",
    "Dos amigos hablan de sus metas del año",
    [
      ["f", "Sara", "Hast du dein Ziel für dieses Jahr erreicht?", "¿Alcanzaste tu meta de este año?"],
      ["m", "Luis", "Fast. Ich wollte das Examen ablegen, aber ich musste es aufschieben.", "Casi. Quería rendir el examen, pero tuve que dejarlo para después."],
      ["f", "Sara", "Gib nicht auf! Was hast du jetzt vor?", "¡No te rindas! ¿Qué pensás hacer ahora?"],
      ["m", "Luis", "Ich habe vor, im Frühjahr einen neuen Versuch zu starten.", "Tengo pensado hacer un nuevo intento en primavera."],
      ["f", "Sara", "Das ist ein guter Plan. Ich bin sicher, es wird dir gelingen.", "Es un buen plan. Estoy segura de que te va a salir."],
    ],
    [
      { type: "choice", q: "¿Qué tuvo que dejar para después Luis?", options: ["El examen", "El viaje", "La mudanza", "La boda"], answer: "El examen", why: "«das Examen ... aufschieben»." },
      { type: "choice", q: "¿Cuándo hará un nuevo intento?", options: ["En primavera", "En otoño", "Mañana", "En verano"], answer: "En primavera", why: "«im Frühjahr»." },
      { type: "tf", q: "Sara cree que no lo logrará.", answer: false, why: "«Ich bin sicher, es wird dir gelingen»." },
    ],
  ),
};
