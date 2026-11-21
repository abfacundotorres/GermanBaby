// Simulacros tipo examen (A2, B1 y B2): comprensión lectora, auditiva y expresión escrita, con el formato y la dificultad de un examen
// del nivel pero con textos propios (no son materiales oficiales). Para sumar un simulacro, agregá una entrada.

import type { ListenQuestion } from "../curriculum.ts";

export type ExamText = { title: string; text: string[]; questions: ListenQuestion[] };
export type ExamAudio = { title: string; setting: string; lines: { who: "f" | "m"; name: string; de: string }[]; questions: ListenQuestion[] };
export type ExamWriting = { prompt: string; focus: string[]; minSentences: number; hint?: string };
export type ExamLevel = "A2" | "B1" | "B2" | "C1";
export type Exam = { id: string; level: ExamLevel; title: string; lesen: ExamText[]; hoeren: ExamAudio[]; schreiben: ExamWriting };

const c = (q: string, options: string[], why: string): ListenQuestion => ({ type: "choice", q, options, answer: options[0], why });
const tf = (q: string, answer: boolean, why: string): ListenQuestion => ({ type: "tf", q, answer, why });
const fi = (q: string, answers: string[], why: string): ListenQuestion => ({ type: "fill", q, answers, hint: "un número", why });

export const EXAMS: Exam[] = [
  {
    id: "a2-1",
    level: "A2",
    title: "Simulacro A2 · 1",
    lesen: [
      {
        title: "Meine neue Stadt",
        text: [
          "Ich heiße Lara und wohne seit drei Monaten in Hamburg. Früher habe ich in einem kleinen Dorf gewohnt, aber ich wollte in einer großen Stadt arbeiten. Jetzt arbeite ich in einem Café in der Nähe vom Hafen. Die Arbeit gefällt mir, aber ich muss oft bis spät abends bleiben. Am Sonntag habe ich frei. Dann fahre ich mit dem Fahrrad zum Wasser oder besuche meine Freundin Eva. Sie wohnt auch in Hamburg, aber auf der anderen Seite der Stadt. Die Fahrt dauert fast eine Stunde. Meine Eltern vermisse ich ein bisschen, deshalb rufe ich sie jeden Abend an.",
        ],
        questions: [
          fi("¿Hace cuántos meses vive Lara en Hamburgo?", ["3", "drei"], "«seit drei Monaten»."),
          c("¿Dónde trabaja Lara?", ["En un café", "En una oficina", "En el puerto", "En una escuela"], "«in einem Café»."),
          tf("Lara tiene libres los domingos.", true, "«Am Sonntag habe ich frei»."),
          c("¿Cuánto dura el viaje a lo de Eva?", ["Casi una hora", "Diez minutos", "Dos horas", "Media hora"], "«fast eine Stunde»."),
          tf("Lara llama a sus padres todas las noches.", true, "«jeden Abend»."),
        ],
      },
      {
        title: "Hinweis im Schwimmbad",
        text: [
          "Achtung! Das Schwimmbad ist vom 10. bis 17. Juli geschlossen. In dieser Zeit wird das Becken renoviert. Das Kinderbecken bleibt geöffnet, aber nur von 10 bis 14 Uhr. Ab dem 18. Juli sind wir wieder von 8 bis 20 Uhr für Sie da.",
        ],
        questions: [
          fi("¿Desde qué día de julio vuelve a abrir la pileta?", ["18", "achtzehn"], "«Ab dem 18. Juli»."),
          c("¿Qué queda abierto durante las obras?", ["La pileta de los chicos, de 10 a 14", "Toda la pileta de 8 a 20", "El bufet", "Nada"], "«Das Kinderbecken bleibt geöffnet, aber nur von 10 bis 14 Uhr»."),
          tf("La pileta está cerrada todo el mes de julio.", false, "«vom 10. bis 17. Juli»."),
        ],
      },
    ],
    hoeren: [
      {
        title: "Im Café",
        setting: "Un cliente pide en un café",
        lines: [
          { who: "f", name: "Kellnerin", de: "Guten Tag! Was darf es sein?" },
          { who: "m", name: "Gast", de: "Einen Kaffee und ein Stück Apfelkuchen, bitte." },
          { who: "f", name: "Kellnerin", de: "Gern. Möchten Sie Sahne zum Kuchen?" },
          { who: "m", name: "Gast", de: "Ja, bitte. Und haben Sie auch Wasser?" },
          { who: "f", name: "Kellnerin", de: "Ja, mit oder ohne Kohlensäure?" },
          { who: "m", name: "Gast", de: "Ohne, bitte. Was macht das zusammen?" },
          { who: "f", name: "Kellnerin", de: "Der Kaffee kostet drei Euro, der Kuchen vier Euro fünfzig und das Wasser zwei Euro. Das macht neun Euro fünfzig." },
          { who: "m", name: "Gast", de: "Hier sind zehn Euro. Stimmt so." },
        ],
        questions: [
          c("¿Qué pide con el café?", ["Torta de manzana", "Torta de chocolate", "Un sándwich", "Helado"], "«ein Stück Apfelkuchen»."),
          tf("Quiere crema con la torta.", true, "«Ja, bitte»."),
          c("¿Qué agua pide?", ["Sin gas", "Con gas", "Con limón", "Caliente"], "«Ohne, bitte»."),
          fi("¿Cuánto es el total en euros?", ["9,50", "9.50", "9,5"], "«neun Euro fünfzig»."),
          tf("El cliente espera recibir vuelto.", false, "«Stimmt so»."),
        ],
      },
    ],
    schreiben: {
      prompt: "Escribí un mail corto a un amigo: invitalo a tu cumpleaños el sábado. Decile a qué hora es, dónde y qué puede traer.",
      focus: ["Einladung (Ich möchte dich einladen)", "Uhrzeit und Ort", "mitbringen / Bitte"],
      minSentences: 5,
      hint: "Empezá con «Hallo …» y terminá con «Viele Grüße».",
    },
  },
  {
    id: "a2-2",
    level: "A2",
    title: "Simulacro A2 · 2",
    lesen: [
      {
        title: "Ein Wochenende in Wien",
        text: [
          "Am Freitagabend sind wir mit dem Zug nach Wien gefahren. Das Hotel liegt direkt im Zentrum, und das Zimmer ist groß und hell. Am Samstag haben wir ein Museum besucht und danach in einem kleinen Restaurant Schnitzel gegessen. Das Essen war sehr gut, aber ein bisschen teuer. Am Abend sind wir müde, aber glücklich ins Bett gegangen. Am Sonntag hat es leider geregnet, deshalb sind wir nicht in den Park gegangen. Stattdessen haben wir im Hotel gefrühstückt und noch ein Café besucht. Um fünf Uhr sind wir wieder nach Hause gefahren.",
        ],
        questions: [
          c("¿Cómo viajaron a Viena?", ["En tren", "En auto", "En avión", "En colectivo"], "«mit dem Zug»."),
          tf("La habitación del hotel es chica.", false, "«groß und hell»."),
          c("¿Qué comieron el sábado?", ["Milanesa (Schnitzel)", "Pizza", "Pescado", "Ensalada"], "«Schnitzel gegessen»."),
          tf("El domingo no fueron al parque porque llovió.", true, "«es hat geregnet, deshalb… nicht in den Park»."),
          fi("¿A qué hora volvieron a casa?", ["5", "fünf", "17"], "«Um fünf Uhr»."),
        ],
      },
      {
        title: "Wohnungsanzeige",
        text: [
          "Zu vermieten: Zwei-Zimmer-Wohnung, 55 Quadratmeter, dritter Stock, mit Balkon. Miete 620 Euro warm. Ab dem 1. Oktober frei. Keine Haustiere. Besichtigung am Samstag um 11 Uhr.",
        ],
        questions: [
          fi("¿Cuántos euros es el alquiler?", ["620", "sechshundertzwanzig"], "«620 Euro warm»."),
          c("¿Desde cuándo está libre?", ["Desde el 1 de octubre", "Desde hoy", "Desde el sábado", "Desde el 1 de noviembre"], "«Ab dem 1. Oktober frei»."),
          tf("Se aceptan mascotas.", false, "«Keine Haustiere»."),
        ],
      },
    ],
    hoeren: [
      {
        title: "Verabredung zum Kino",
        setting: "Ben llama a su amiga Mia",
        lines: [
          { who: "m", name: "Ben", de: "Hallo Mia, hier ist Ben. Hast du am Samstag Zeit?" },
          { who: "f", name: "Mia", de: "Hallo Ben! Am Samstagvormittag muss ich einkaufen, aber am Nachmittag habe ich frei." },
          { who: "m", name: "Ben", de: "Super. Ich möchte ins Kino gehen. Es gibt einen neuen Film um sechzehn Uhr dreißig." },
          { who: "f", name: "Mia", de: "Gern. Wo treffen wir uns?" },
          { who: "m", name: "Ben", de: "Vor dem Kino, um Viertel nach vier. Die Karten kaufe ich schon online." },
          { who: "f", name: "Mia", de: "Danke! Soll ich etwas mitbringen?" },
          { who: "m", name: "Ben", de: "Nein, aber vielleicht etwas zu trinken. Danach können wir noch etwas essen gehen." },
          { who: "f", name: "Mia", de: "Gute Idee. Dann bis Samstag!" },
        ],
        questions: [
          c("¿Qué quiere hacer Ben el sábado?", ["Ir al cine", "Ir a comer", "Ir de compras", "Ir a nadar"], "«Ich möchte ins Kino gehen»."),
          c("¿A qué hora se encuentran?", ["A las cuatro y cuarto", "A las cuatro y media", "A las cinco", "A las tres"], "«um Viertel nach vier»."),
          tf("Mia tiene libre todo el sábado.", false, "«Am Samstagvormittag muss ich einkaufen»."),
          c("¿A qué hora empieza la película?", ["16:30", "16:15", "17:30", "15:30"], "«sechzehn Uhr dreißig»."),
          tf("Ben ya compra las entradas por internet.", true, "«Die Karten kaufe ich schon online»."),
        ],
      },
    ],
    schreiben: {
      prompt: "Escribí un mail a la dueña de un departamento en alquiler: te interesa verlo. Preguntá por el precio y pedí una cita para visitarlo.",
      focus: ["Anrede", "Fragen (Wie viel kostet…? / Ist … noch frei?)", "Terminwunsch (Kann ich…?)"],
      minSentences: 5,
      hint: "Tono formal: «Sehr geehrte Frau …».",
    },
  },
  {
    id: "b1-1",
    level: "B1",
    title: "Simulacro B1 · 1",
    lesen: [
      {
        title: "Ein neuer Job",
        text: [
          "Vor sechs Monaten habe ich meinen Job gewechselt, und ich muss sagen: Es war die beste Entscheidung des Jahres. In meiner alten Firma habe ich zehn Stunden am Tag vor dem Computer gesessen und kaum mit Kollegen gesprochen. Obwohl das Gehalt gut war, habe ich mich jeden Morgen ziemlich gequält. Jetzt arbeite ich in einem kleinen Team, in dem alle zusammen Mittagspause machen. Mein Chef fragt uns nach unserer Meinung, bevor er etwas entscheidet. Natürlich verdiene ich weniger, und der Weg zur Arbeit ist länger geworden. Dafür gehe ich abends nicht mehr müde und genervt nach Hause. Wenn ich ehrlich bin, hätte ich den Schritt schon viel früher wagen sollen. Mein Rat an alle, die unzufrieden sind: Wartet nicht zu lange, denn Angst vor Veränderung hält uns oft länger fest als ein schlechter Job.",
        ],
        questions: [
          c("¿Cuándo cambió de trabajo?", ["Hace seis meses", "Hace un año", "Hace un mes", "Hace dos años"], "«Vor sechs Monaten»."),
          tf("En la empresa anterior hablaba mucho con sus colegas.", false, "«kaum mit Kollegen gesprochen»."),
          c("¿Qué le gusta del equipo nuevo?", ["Que el jefe pregunta la opinión antes de decidir", "Que gana más", "Que queda más cerca", "Que trabaja menos horas"], "«Mein Chef fragt uns nach unserer Meinung»."),
          tf("En el trabajo nuevo gana más que antes.", false, "«Natürlich verdiene ich weniger»."),
          c("¿Qué lamenta?", ["No haber dado el paso antes", "Haber dejado a sus colegas", "Haber cambiado de ciudad", "Haber aceptado menos sueldo"], "«hätte ich den Schritt schon viel früher wagen sollen»."),
          c("¿Qué aconseja?", ["No esperar demasiado", "Cambiar de ciudad", "Pedir un aumento", "Hacer un curso"], "«Wartet nicht zu lange»."),
        ],
      },
      {
        title: "Sprachkurs im Abendprogramm",
        text: [
          "Sprachkurs Deutsch B1 – Abendkurs: Beginn am 12. September, dienstags und donnerstags von 18.30 bis 20.45 Uhr. Dauer: 10 Wochen. Kosten: 290 Euro (Bücher nicht inbegriffen). Anmeldung bis zum 1. September im Sekretariat oder online. Bei weniger als sechs Teilnehmern kann der Kurs nicht stattfinden; dann erhalten Sie Ihr Geld zurück.",
        ],
        questions: [
          fi("¿Cuántas semanas dura el curso?", ["10", "zehn"], "«Dauer: 10 Wochen»."),
          c("¿Qué no está incluido en el precio?", ["Los libros", "Las clases", "La matrícula", "El examen"], "«Bücher nicht inbegriffen»."),
          tf("La inscripción vence el 12 de septiembre.", false, "«bis zum 1. September»."),
          c("¿Qué pasa si hay menos de seis participantes?", ["No se dicta y se devuelve el dinero", "Se dicta igual", "Se pasa a otro horario", "Se cobra más"], "«nicht stattfinden… Geld zurück»."),
        ],
      },
    ],
    hoeren: [
      {
        title: "Wohnungsbesichtigung",
        setting: "Herr Arslan visita un departamento con la dueña",
        lines: [
          { who: "f", name: "Frau Lenz", de: "Guten Tag, Herr Arslan. Schön, dass Sie pünktlich sind. Kommen Sie herein." },
          { who: "m", name: "Herr Arslan", de: "Guten Tag, Frau Lenz. Die Gegend ist wirklich ruhig." },
          { who: "f", name: "Frau Lenz", de: "Ja, das ist einer der Vorteile. Die Wohnung hat zwei Zimmer und liegt im dritten Stock. Leider gibt es keinen Aufzug." },
          { who: "m", name: "Herr Arslan", de: "Das ist kein Problem, ich bin sportlich. Wie hoch sind die Nebenkosten?" },
          { who: "f", name: "Frau Lenz", de: "Die Miete beträgt sechshundertzwanzig Euro kalt, dazu kommen hundertzwanzig Euro Nebenkosten. Heizung und Wasser sind schon dabei." },
          { who: "m", name: "Herr Arslan", de: "Das ist etwas mehr, als ich eingeplant hatte, aber die Küche ist ja schon eingebaut." },
          { who: "f", name: "Frau Lenz", de: "Genau. Wenn Sie möchten, können Sie auch den Keller mitbenutzen. Dort gibt es einen Platz für Ihr Fahrrad." },
          { who: "m", name: "Herr Arslan", de: "Das wäre perfekt. Wie lange läuft der Mietvertrag?" },
          { who: "f", name: "Frau Lenz", de: "Mindestens zwei Jahre. Sie müssten außerdem eine Kaution von drei Monatsmieten zahlen." },
          { who: "m", name: "Herr Arslan", de: "Gut, ich überlege es mir über das Wochenende und rufe Sie am Montag an." },
        ],
        questions: [
          c("¿En qué piso queda el departamento?", ["En el tercero", "En el primero", "En el segundo", "En el quinto"], "«im dritten Stock»."),
          tf("El edificio tiene ascensor.", false, "«Leider gibt es keinen Aufzug»."),
          fi("¿Cuántos euros son los gastos?", ["120", "hundertzwanzig"], "«hundertzwanzig Euro Nebenkosten»."),
          c("¿Qué puede hacer con el sótano?", ["Guardar su bicicleta", "Alquilarlo aparte", "Usarlo como taller", "Nada"], "«Platz für Ihr Fahrrad»."),
          c("¿Cuánto dura como mínimo el contrato?", ["Dos años", "Un año", "Seis meses", "Cinco años"], "«Mindestens zwei Jahre»."),
          c("¿Qué hará Herr Arslan?", ["Lo pensará y llamará el lunes", "Firmará ahora", "Pedirá un descuento", "Rechazará la oferta"], "«rufe Sie am Montag an»."),
        ],
      },
    ],
    schreiben: {
      prompt: "Escribí un mail a un amigo: contale que cambiaste de trabajo o de casa (lo que prefieras), explicá por qué lo hiciste y cómo te sentís.",
      focus: ["Perfekt / Präteritum für Vergangenes", "weil / obwohl / damit", "eine persönliche Bewertung"],
      minSentences: 6,
      hint: "Mail informal: «Hallo …», «Liebe Grüße».",
    },
  },
  {
    id: "b1-2",
    level: "B1",
    title: "Simulacro B1 · 2",
    lesen: [
      {
        title: "Radfahren in der Stadt",
        text: [
          "Immer mehr Menschen in der Stadt steigen vom Auto aufs Fahrrad um. Der Grund ist einfach: Im Stau verliert man viel Zeit, und einen Parkplatz zu finden ist oft schwierig. Mit dem Rad kommt man meistens schneller ans Ziel, und man tut etwas für die Gesundheit. Allerdings ist das Radfahren nicht überall ungefährlich. Viele Straßen haben keine eigenen Radwege, sodass man sich den Platz mit Autos teilen muss. Besonders bei Regen oder im Winter sind viele Radfahrer unsicher. Deshalb fordern Verbände seit Jahren, dass die Stadt mehr sichere Wege baut. Die Stadtverwaltung antwortet, dass das nicht so schnell geht, weil dafür Straßen verengt werden müssten und das Geld fehle. Bis sich etwas ändert, raten Experten, immer einen Helm zu tragen und gut sichtbare Kleidung anzuziehen.",
        ],
        questions: [
          c("¿Por qué cambian a la bicicleta muchas personas?", ["Por el tránsito y la dificultad de estacionar", "Por el precio de la nafta", "Por el clima", "Por obligación"], "«Im Stau verliert man viel Zeit… Parkplatz»."),
          tf("En bici se llega casi siempre más despacio.", false, "«meistens schneller ans Ziel»."),
          c("¿Qué problema tiene andar en bici?", ["Muchas calles no tienen ciclovía", "Las bicis son caras", "No hay dónde dejarlas", "Hay muchas cuestas"], "«keine eigenen Radwege»."),
          tf("Las asociaciones están conformes con la situación.", false, "«fordern Verbände seit Jahren»."),
          c("¿Por qué tarda la construcción de ciclovías, según la ciudad?", ["Hay que angostar calles y falta dinero", "Faltan obreros", "Hay protestas", "Falta el permiso"], "«Straßen verengt… Geld fehle»."),
          c("¿Qué recomiendan los expertos mientras tanto?", ["Usar casco y ropa bien visible", "No usar la bici de noche", "Ir por la vereda", "Cambiar de ruta"], "«Helm… gut sichtbare Kleidung»."),
        ],
      },
      {
        title: "E-Mail vom Nachbarn",
        text: [
          "Liebe Frau Weber, leider muss ich Ihnen schreiben, dass ich am Samstag um zwei Uhr nachts wieder Musik aus Ihrer Wohnung gehört habe. Ich habe schon beim letzten Mal geklopft, aber niemand hat geöffnet. Ich verstehe, dass man manchmal feiern möchte, aber ich muss um sechs Uhr zur Arbeit aufstehen. Könnten Sie bitte nach zweiundzwanzig Uhr leiser sein? Falls es ein Problem gibt, können wir gern in Ruhe sprechen. Viele Grüße, Thomas Kern",
        ],
        questions: [
          c("¿De qué se queja Herr Kern?", ["De la música de noche", "De las visitas", "De un perro", "De la basura"], "«Musik aus Ihrer Wohnung»."),
          fi("¿A qué hora de la noche escuchó la música?", ["2", "zwei"], "«um zwei Uhr nachts»."),
          tf("La última vez golpeó y le abrieron.", false, "«niemand hat geöffnet»."),
          c("¿Qué le pide?", ["Que haga menos ruido después de las 22", "Que no haga fiestas", "Que se mude", "Que le pague"], "«nach zweiundzwanzig Uhr leiser»."),
        ],
      },
    ],
    hoeren: [
      {
        title: "Einladung zum Vorstellungsgespräch",
        setting: "Frau Dietz, de una empresa, llama a Herr Vogel",
        lines: [
          { who: "f", name: "Frau Dietz", de: "Guten Tag, Herr Vogel, hier ist Dietz von der Firma Nordwerk. Sie haben sich bei uns als Lagerleiter beworben." },
          { who: "m", name: "Herr Vogel", de: "Ja, guten Tag, Frau Dietz. Schön, dass Sie anrufen." },
          { who: "f", name: "Frau Dietz", de: "Wir haben Ihre Unterlagen gelesen und möchten Sie gern zu einem Gespräch einladen." },
          { who: "m", name: "Herr Vogel", de: "Das freut mich sehr. Wann wäre das möglich?" },
          { who: "f", name: "Frau Dietz", de: "Am Mittwoch, den zwölften, um zehn Uhr, oder am Donnerstag um vierzehn Uhr. Das Gespräch dauert etwa eine Stunde." },
          { who: "m", name: "Herr Vogel", de: "Mittwoch passt mir gut. Wo muss ich hinkommen?" },
          { who: "f", name: "Frau Dietz", de: "In unsere Zentrale in der Hafenstraße vierzehn. Fragen Sie am Empfang nach mir. Bitte bringen Sie Ihre Zeugnisse mit." },
          { who: "m", name: "Herr Vogel", de: "Gern. Gibt es einen Parkplatz?" },
          { who: "f", name: "Frau Dietz", de: "Ja, direkt hinter dem Gebäude, aber nur für Besucher. Ein Schild zeigt Ihnen den Weg." },
          { who: "m", name: "Herr Vogel", de: "Perfekt. Dann bis Mittwoch, Frau Dietz. Vielen Dank für den Anruf." },
        ],
        questions: [
          c("¿A qué puesto se postuló?", ["Jefe de depósito", "Contador", "Chofer", "Vendedor"], "«als Lagerleiter beworben»."),
          c("¿Qué día y hora elige?", ["El miércoles 12 a las 10", "El jueves a las 14", "El lunes a las 9", "El viernes a las 11"], "«Mittwoch passt mir gut»."),
          fi("¿Cuántas horas dura la entrevista, aproximadamente?", ["1", "eine", "ein", "einer"], "«etwa eine Stunde»."),
          fi("¿Qué número tiene el edificio en la calle Hafenstraße?", ["14", "vierzehn"], "«Hafenstraße vierzehn»."),
          tf("El estacionamiento es para todos.", false, "«nur für Besucher»."),
          c("¿Qué tiene que llevar?", ["Sus certificados", "Una foto", "Un currículum nuevo", "Su documento solamente"], "«Bitte bringen Sie Ihre Zeugnisse mit»."),
        ],
      },
    ],
    schreiben: {
      prompt: "Escribí un mail a tu docente de alemán: no podés ir a la próxima clase. Explicá el motivo, pedí el material de esa clase y proponé cómo podés recuperarla.",
      focus: ["Anrede und Grußformel (formell)", "Grund mit weil / da", "höfliche Bitte (Könnten Sie…?)"],
      minSentences: 6,
      hint: "Tono formal pero cercano: «Sehr geehrte Frau …».",
    },
  },
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
  {
    id: "a2-3",
    level: "A2",
    title: "Simulacro A2 · 3",
    lesen: [
      {
        title: "Eine Einladung",
        text: [
          "Liebe Mara, am 14. Juni feiern wir den Abschied von unserem Nachbarn Jonas. Er zieht nach Köln, weil er dort eine neue Arbeit gefunden hat. Die Feier beginnt um 17 Uhr im Garten hinter dem Haus. Wenn es regnet, feiern wir im Hausflur im Erdgeschoss.",
          "Wir grillen Würstchen und Gemüse. Bitte bring einen Salat oder einen Kuchen mit, die Getränke besorgen wir. Jonas wünscht sich keine Geschenke, aber wir sammeln Geld für ein Fotobuch mit Bildern aus den letzten Jahren. Wer mitmachen möchte, gibt bis zum 10. Juni bei mir Bescheid. Herzliche Grüße, Elke",
        ],
        questions: [
          c("¿Por qué se muda Jonas?", ["Encontró un nuevo trabajo", "Se casa", "Quiere vivir solo", "Estudia en Colonia"], "«eine neue Arbeit gefunden»."),
          fi("¿A qué hora empieza la fiesta?", ["17", "5", "fünf", "siebzehn"], "«um 17 Uhr»."),
          c("¿Dónde se festeja si llueve?", ["En el pasillo de la planta baja", "En el jardín", "En un restaurante", "En lo de Jonas"], "«im Hausflur im Erdgeschoss»."),
          c("¿Qué se pide que traiga Mara?", ["Una ensalada o una torta", "Bebidas", "Carne", "Un regalo"], "«einen Salat oder einen Kuchen»."),
          tf("Los invitados deben llevar un regalo.", false, "«wünscht sich keine Geschenke»."),
        ],
      },
      {
        title: "Stundenplan Deutschkurs",
        text: [
          "Der Intensivkurs A2 findet von Montag bis Donnerstag statt. Der Unterricht beginnt um 9 Uhr und endet um 12:30 Uhr, mit einer Pause von zwanzig Minuten. Am Freitag gibt es keinen Unterricht, aber im Lernzentrum können Sie von 10 bis 14 Uhr kostenlos mit Tutoren üben. Der Kurs dauert sechs Wochen und kostet 480 Euro. Das Buch ist im Preis nicht enthalten.",
        ],
        questions: [
          c("¿Qué días hay clases?", ["De lunes a jueves", "De lunes a viernes", "Solo los fines de semana", "Martes y viernes"], "«von Montag bis Donnerstag»."),
          fi("¿Cuántos minutos dura la pausa?", ["20", "zwanzig"], "«zwanzig Minuten»."),
          tf("El viernes se puede practicar gratis en el centro de aprendizaje.", true, "«kostenlos mit Tutoren üben»."),
          fi("¿Cuántas semanas dura el curso?", ["6", "sechs"], "«sechs Wochen»."),
          tf("El libro está incluido en el precio.", false, "«nicht enthalten»."),
        ],
      },
    ],
    hoeren: [
      {
        title: "Beim Arzt anrufen",
        setting: "Tim llama a un consultorio para pedir un turno",
        lines: [
          { who: "f", name: "Praxis", de: "Praxis Dr. Lehmann, guten Morgen." },
          { who: "m", name: "Tim", de: "Guten Morgen, hier Tim Roth. Ich habe seit drei Tagen starke Halsschmerzen und möchte einen Termin." },
          { who: "f", name: "Praxis", de: "Haben Sie auch Fieber?" },
          { who: "m", name: "Tim", de: "Ja, gestern Abend hatte ich achtunddreißig Grad." },
          { who: "f", name: "Praxis", de: "Dann können Sie heute noch kommen. Um halb elf oder um Viertel nach drei?" },
          { who: "m", name: "Tim", de: "Um halb elf geht leider nicht, da muss ich arbeiten. Dann lieber um Viertel nach drei." },
          { who: "f", name: "Praxis", de: "In Ordnung. Bitte bringen Sie Ihre Versichertenkarte mit." },
          { who: "m", name: "Tim", de: "Mache ich. Muss ich etwas bezahlen?" },
          { who: "f", name: "Praxis", de: "Nein, die Krankenkasse zahlt. Nur wenn Sie ein Rezept brauchen, kostet das fünf Euro." },
          { who: "m", name: "Tim", de: "Alles klar, vielen Dank. Bis später!" },
        ],
        questions: [
          c("¿Qué síntoma tiene Tim?", ["Dolor de garganta", "Dolor de cabeza", "Tos", "Dolor de espalda"], "«Halsschmerzen»."),
          fi("¿Cuántos grados de fiebre tuvo?", ["38", "achtunddreißig"], "«achtunddreißig Grad»."),
          c("¿Por qué no elige el turno de las diez y media?", ["Tiene que trabajar", "Está muy lejos", "Duerme", "No tiene seguro"], "«da muss ich arbeiten»."),
          c("¿A qué hora es su turno?", ["15:15", "10:30", "15:30", "14:15"], "«Viertel nach drei»."),
          c("¿Qué tiene que llevar?", ["La tarjeta del seguro", "El pasaporte", "Dinero en efectivo", "Un análisis"], "«Versichertenkarte»."),
          fi("¿Cuánto cuesta la receta en euros?", ["5", "fünf"], "«fünf Euro»."),
        ],
      },
    ],
    schreiben: {
      prompt: "Escribile a un amigo: te mudaste a un departamento nuevo. Contale cómo es (ubicación, habitaciones), qué te gusta y qué no, e invitalo a visitarte el sábado.",
      focus: ["Wohnung beschreiben (Es gibt…, Die Wohnung hat…)", "Meinung (Mir gefällt…, Leider…)", "Einladung (Kommst du am Samstag?)"],
      minSentences: 5,
      hint: "Saludo informal, descripción, opinión, invitación y despedida.",
    },
  },
  {
    id: "b1-3",
    level: "B1",
    title: "Simulacro B1 · 3",
    lesen: [
      {
        title: "Weniger Fleisch essen",
        text: [
          "In den letzten Jahren essen viele Menschen in Deutschland bewusst weniger Fleisch. Manche verzichten ganz darauf, andere legen einen fleischfreien Tag pro Woche ein. Die Gründe sind unterschiedlich: Für die einen steht die Gesundheit im Vordergrund, für die anderen der Klimaschutz oder das Wohl der Tiere.",
          "Der Handel hat darauf reagiert. In fast jedem Supermarkt gibt es heute Produkte aus Soja, Erbsen oder Pilzen, die wie Fleisch schmecken sollen. Allerdings sind sie oft teurer als normales Fleisch, und Ernährungsexperten weisen darauf hin, dass sie viel Salz enthalten können.",
          "Fleisch zu essen ist für viele noch immer ein Teil der Kultur, besonders bei Festen und Familienessen. Wer sich vegetarisch ernährt, muss deshalb manchmal erklären, warum. Trotzdem gilt der Trend als stabil: Umfragen zeigen, dass vor allem junge Menschen ihre Gewohnheiten ändern wollen.",
        ],
        questions: [
          c("¿Qué hacen algunas personas además de dejar la carne por completo?", ["Un día por semana sin carne", "Solo comen pescado", "Comen más carne los domingos", "Cocinan menos"], "«einen fleischfreien Tag pro Woche»."),
          c("¿Qué razones menciona el texto?", ["Salud, clima y bienestar animal", "Precio y sabor", "Falta de tiempo", "Moda y publicidad"], "«Gesundheit ... Klimaschutz ... Wohl der Tiere»."),
          tf("Los sustitutos de la carne son siempre más baratos.", false, "«oft teurer»."),
          c("¿Qué advierten los expertos?", ["Que pueden contener mucha sal", "Que no tienen proteínas", "Que son peligrosos", "Que engordan más"], "«viel Salz»."),
          c("¿Quiénes quieren cambiar más sus hábitos?", ["Los jóvenes", "Los mayores", "Las familias con chicos", "Los deportistas"], "«vor allem junge Menschen»."),
          tf("Comer carne ya no tiene ningún peso cultural.", false, "«noch immer ein Teil der Kultur»."),
        ],
      },
      {
        title: "Mail an den Vermieter",
        text: [
          "Sehr geehrter Herr Krüger, seit zwei Wochen funktioniert die Heizung in meinem Schlafzimmer nicht mehr. Ich habe bereits versucht, sie zu entlüften, aber ohne Erfolg. Da die Nächte inzwischen kalt sind, bitte ich Sie, bis spätestens Freitag einen Techniker zu schicken. Wenn die Reparatur nicht bald erfolgt, muss ich die Miete mindern. Ich bin am Mittwoch und Donnerstag nach 16 Uhr zu Hause. Mit freundlichen Grüßen, Laura Weiss",
        ],
        questions: [
          c("¿Qué problema tiene Laura?", ["La calefacción del dormitorio no funciona", "Hay una gotera", "No hay agua caliente", "La puerta no cierra"], "«Heizung in meinem Schlafzimmer»."),
          c("¿Qué intentó ella antes de escribir?", ["Purgar la calefacción", "Llamar a un técnico", "Cambiar el termostato", "Mudarse"], "«entlüften»."),
          c("¿Qué pide?", ["Que mande un técnico antes del viernes", "Que baje el alquiler ya", "Que ella misma la arregle", "Un nuevo departamento"], "«bis spätestens Freitag einen Techniker»."),
          c("¿Qué hará si no se repara?", ["Reducir el alquiler", "Denunciarlo", "Mudarse", "No pagar nada"], "«die Miete mindern»."),
          tf("Laura está en casa los lunes por la mañana.", false, "Solo «Mittwoch und Donnerstag nach 16 Uhr»."),
        ],
      },
    ],
    hoeren: [
      {
        title: "Wohnungsbesichtigung",
        setting: "Una pareja visita un departamento con la propietaria",
        lines: [
          { who: "f", name: "Frau Lindner", de: "Guten Tag, kommen Sie herein. Die Wohnung liegt im dritten Stock, einen Aufzug gibt es leider nicht." },
          { who: "m", name: "Herr Aksoy", de: "Das ist kein Problem. Wie groß ist die Wohnung genau?" },
          { who: "f", name: "Frau Lindner", de: "Sie hat siebzig Quadratmeter und drei Zimmer. Das Wohnzimmer geht zum Balkon, die Küche ist separat." },
          { who: "m", name: "Herr Aksoy", de: "Schön hell. Wie hoch ist die Miete?" },
          { who: "f", name: "Frau Lindner", de: "Neunhundertzwanzig Euro warm, also mit Heizung und Wasser. Strom kommt noch dazu." },
          { who: "m", name: "Herr Aksoy", de: "Und wie weit ist es bis zur nächsten Haltestelle?" },
          { who: "f", name: "Frau Lindner", de: "Etwa fünf Minuten zu Fuß. Die Bahn fährt alle zehn Minuten ins Zentrum." },
          { who: "m", name: "Herr Aksoy", de: "Dürfen wir einen Hund halten? Wir haben einen kleinen." },
          { who: "f", name: "Frau Lindner", de: "Kleine Hunde sind erlaubt, aber ich brauche vorher eine Genehmigung vom Hausbesitzer. Das dauert höchstens eine Woche." },
          { who: "m", name: "Herr Aksoy", de: "Gut. Wann könnten wir einziehen?" },
          { who: "f", name: "Frau Lindner", de: "Ab dem ersten Oktober. Wenn Sie die Wohnung nehmen wollen, schicken Sie mir bis Freitag Ihre Unterlagen." },
        ],
        questions: [
          c("¿En qué piso está el departamento?", ["En el tercero, sin ascensor", "En el segundo, con ascensor", "En la planta baja", "En el cuarto, sin ascensor"], "«dritten Stock ... keinen Aufzug»."),
          fi("¿Cuántos metros cuadrados tiene?", ["70", "siebzig"], "«siebzig Quadratmeter»."),
          fi("¿Cuántos euros cuesta el alquiler con calefacción y agua?", ["920", "neunhundertzwanzig"], "«neunhundertzwanzig Euro warm»."),
          c("¿Cuánto tarda caminando hasta la parada?", ["Cinco minutos", "Diez minutos", "Quince minutos", "Una hora"], "«fünf Minuten zu Fuß»."),
          c("¿Qué necesitan para tener el perro?", ["La autorización del propietario del edificio", "Pagar un depósito", "Nada", "Un certificado veterinario"], "«Genehmigung vom Hausbesitzer»."),
          c("¿Qué deben enviar hasta el viernes?", ["Sus documentos", "El primer alquiler", "Una carta de recomendación", "Fotos del perro"], "«Ihre Unterlagen»."),
        ],
      },
    ],
    schreiben: {
      prompt: "Un colega te pidió cambiar de turno el viernes. Escribile un mail informal: decile que no podés, explicá por qué, ofrecé una alternativa y proponé cómo resolver el problema.",
      focus: ["Ablehnung höflich formulieren (Leider kann ich nicht…)", "Begründung mit weil/denn", "Alternative vorschlagen (Wie wäre es, wenn…)", "Konjunktiv II (könnte, würde)"],
      minSentences: 6,
      hint: "Saludo, respuesta clara, motivo, alternativa y cierre amable.",
    },
  },
  {
    id: "b2-3",
    level: "B2",
    title: "Simulacro B2 · 3",
    lesen: [
      {
        title: "Das Ende der Bargeldgesellschaft?",
        text: [
          "Deutschland galt lange als Land der Bargeldzahler. Während in Skandinavien selbst am Kiosk mit dem Handy bezahlt wird, zückten die Deutschen im Supermarkt am liebsten Münzen und Scheine. Doch die Gewohnheiten ändern sich: Seit einigen Jahren nimmt der Anteil der Kartenzahlungen stetig zu, und die Corona-Pandemie hat diese Entwicklung noch einmal beschleunigt.",
          "Befürworter des digitalen Bezahlens betonen die Bequemlichkeit und die Hygiene. Zudem lassen sich Zahlungen leichter nachverfolgen, was Steuerbetrug und Geldwäsche erschweren soll. Kritiker halten dagegen, dass dadurch eine umfassende Überwachung des Konsumverhaltens möglich werde. Ältere Menschen und Personen ohne Konto könnten zudem benachteiligt werden, wenn Bargeld verschwindet.",
          "Auch ein technisches Risiko wird genannt: Fällt bei einem Stromausfall das Netz aus, kann niemand mehr bezahlen. Verbraucherschützer fordern deshalb, dass Geschäfte Bargeld weiterhin akzeptieren müssen. Die Politik hat bisher keine Pflicht eingeführt, plant jedoch, den Zugang zu Geldautomaten auch auf dem Land zu sichern.",
          "Wahrscheinlich wird sich keine der beiden Seiten vollständig durchsetzen. Wahrscheinlicher ist ein Nebeneinander, in dem jeder je nach Situation die passende Zahlungsart wählt. Entscheidend wird sein, dass niemand ausgeschlossen wird, nur weil er sich für die eine oder die andere entscheidet.",
        ],
        questions: [
          c("¿Cómo se caracteriza a Alemania en el texto?", ["Como un país tradicionalmente de pagos en efectivo", "Como pionero del pago digital", "Como un país sin bancos", "Como un país sin tarjetas"], "«Land der Bargeldzahler»."),
          tf("La pandemia frenó el aumento de los pagos con tarjeta.", false, "«noch einmal beschleunigt»."),
          c("¿Qué ventaja del pago digital se menciona junto con la comodidad?", ["La higiene", "El menor costo", "El anonimato", "La velocidad del banco"], "«Bequemlichkeit und die Hygiene»."),
          c("¿Qué temen los críticos?", ["Una vigilancia amplia del consumo", "Que suban los precios", "Que desaparezcan los bancos", "Que haya menos tiendas"], "«umfassende Überwachung»."),
          c("¿Quiénes podrían quedar en desventaja?", ["Los mayores y quienes no tienen cuenta", "Los turistas", "Los comerciantes grandes", "Los jóvenes"], "«Ältere Menschen und Personen ohne Konto»."),
          c("¿Qué riesgo técnico se menciona?", ["Que sin electricidad no se pueda pagar", "Que se pierdan las tarjetas", "Que fallen los cajeros siempre", "Que haya fraude masivo"], "«Stromausfall»."),
          c("¿Qué reclaman los defensores del consumidor?", ["Que los comercios sigan aceptando efectivo", "Que se prohíba el efectivo", "Que se baje la comisión", "Que haya más cajeros en ciudades"], "«Bargeld weiterhin akzeptieren»."),
          c("¿Qué escenario probable plantea el texto?", ["Una convivencia de ambos medios de pago", "El triunfo total del efectivo", "El fin de las tarjetas", "Una ley única"], "«Nebeneinander»."),
        ],
      },
      {
        title: "Kommentar: Praktikum ohne Bezahlung?",
        text: [
          "Immer mehr junge Menschen absolvieren nach dem Studium unbezahlte Praktika, in der Hoffnung, danach eine feste Stelle zu bekommen. Das Argument der Unternehmen lautet, die Praktikanten lernten schließlich etwas. Doch wer einen Praktikanten wie einen Mitarbeiter einsetzt, sollte ihn auch wie einen bezahlen. Sonst können sich nur diejenigen ein solches Praktikum leisten, deren Eltern sie unterstützen, und die Chancengleichheit bleibt auf der Strecke.",
        ],
        questions: [
          c("¿Qué postura defiende el comentario?", ["Que las pasantías deberían pagarse", "Que las pasantías no sirven", "Que deben ser más largas", "Que solo deben hacerlas becados"], "«auch wie einen bezahlen»."),
          c("¿Qué argumento dan las empresas?", ["Que los pasantes aprenden", "Que no tienen presupuesto", "Que es la ley", "Que es una costumbre"], "«die Praktikanten lernten schließlich etwas»."),
          tf("Según el texto, las pasantías sin pago favorecen la igualdad de oportunidades.", false, "«die Chancengleichheit bleibt auf der Strecke»."),
        ],
      },
    ],
    hoeren: [
      {
        title: "Podiumsgespräch: Homeoffice",
        setting: "Una moderadora y un experto en trabajo hablan sobre el home office",
        lines: [
          { who: "f", name: "Moderatorin", de: "Herr Dr. Berger, viele Firmen holen ihre Mitarbeiter wieder ins Büro zurück. Ist das Homeoffice ein Auslaufmodell?" },
          { who: "m", name: "Dr. Berger", de: "Keineswegs. Die Studien zeigen, dass die Produktivität im Homeoffice im Durchschnitt nicht sinkt, sondern bei konzentrierter Einzelarbeit sogar steigt." },
          { who: "f", name: "Moderatorin", de: "Aber leidet nicht die Zusammenarbeit im Team?" },
          { who: "m", name: "Dr. Berger", de: "Das ist tatsächlich die größte Schwäche. Spontane Gespräche am Kaffeeautomaten lassen sich digital kaum ersetzen, und gerade für Neue ist es schwer, sich ins Team einzufinden." },
          { who: "f", name: "Moderatorin", de: "Was empfehlen Sie den Unternehmen also?" },
          { who: "m", name: "Dr. Berger", de: "Ein Mischmodell: zwei bis drei Tage im Büro für Abstimmungen und Teamarbeit, den Rest zu Hause. Wichtig ist, dass die Regeln für alle gelten und nicht nur für Führungskräfte." },
          { who: "f", name: "Moderatorin", de: "Und wie sieht es mit der Belastung der Beschäftigten aus?" },
          { who: "m", name: "Dr. Berger", de: "Viele berichten, dass die Grenze zwischen Arbeit und Freizeit verschwimmt. Wer abends noch E-Mails beantwortet, riskiert auf Dauer Erschöpfung. Unternehmen sollten deshalb klare Zeiten vereinbaren, in denen niemand erreichbar sein muss." },
          { who: "f", name: "Moderatorin", de: "Gibt es denn auch einen ökologischen Nutzen?" },
          { who: "m", name: "Dr. Berger", de: "Ja, weniger Pendeln spart Emissionen. Allerdings muss man das Heizen und den Strom zu Hause gegenrechnen. Unterm Strich ist die Bilanz positiv, aber nicht so deutlich, wie oft behauptet wird." },
        ],
        questions: [
          c("¿Qué dice el experto sobre la productividad en el home office?", ["No baja y en trabajo individual concentrado incluso sube", "Baja siempre", "No hay estudios", "Sube solo para jefes"], "«nicht sinkt ... sogar steigt»."),
          c("¿Cuál es la mayor debilidad que menciona?", ["La colaboración espontánea en el equipo", "El costo del internet", "La falta de sueldo", "La seguridad de los datos"], "«Zusammenarbeit ... Kaffeeautomat»."),
          c("¿Qué modelo recomienda?", ["Dos o tres días en la oficina y el resto en casa", "Todo remoto", "Todo presencial", "Solo los lunes en casa"], "«zwei bis drei Tage im Büro»."),
          tf("Las reglas del modelo deberían valer solo para los empleados, no para los jefes.", false, "«für alle gelten und nicht nur für Führungskräfte»."),
          c("¿Qué riesgo señala para los empleados?", ["Agotamiento por el límite difuso entre trabajo y tiempo libre", "Aislamiento total", "Pérdida del empleo", "Problemas de visión"], "«Grenze ... verschwimmt ... Erschöpfung»."),
          c("¿Cómo califica el beneficio ecológico?", ["Positivo, pero no tan claro como se afirma", "Enorme", "Nulo", "Negativo"], "«positiv, aber nicht so deutlich»."),
        ],
      },
    ],
    schreiben: {
      prompt: "Escribí un comentario para un blog: ¿es positivo que cada vez más servicios públicos (trámites, citas médicas) sean solo digitales? Presentá tu postura, dos argumentos, una objeción con tu respuesta y una conclusión.",
      focus: ["Einleitung und eigene Position (Meiner Ansicht nach…)", "zwei Argumente mit Beispiel", "Gegenargument und Entkräftung (zwar… aber / dem lässt sich entgegenhalten…)", "Schluss mit Fazit oder Forderung"],
      minSentences: 8,
      hint: "Estructura clara con introducción, argumentos, objeción y cierre; conectores de B2.",
    },
  },
  {
    id: "c1-1",
    level: "C1",
    title: "Simulacro C1 · 1",
    lesen: [
      {
        title: "Arbeit als Sinnstifterin?",
        text: [
          "Lange galt Erwerbsarbeit in modernen Gesellschaften als Dreh- und Angelpunkt der Identität. Auf die Frage „Was machen Sie beruflich?“ antwortet man nicht nur mit einer Tätigkeit, sondern mit einer Selbstbeschreibung. Wer Arbeit hat, gehört dazu; wer keine hat, muss sich rechtfertigen. Diese Verknüpfung von Beruf und Selbstwert ist historisch betrachtet relativ jung und keineswegs selbstverständlich.",
          "In den vergangenen Jahren mehren sich die Anzeichen, dass sie bröckelt. Umfragen zufolge wünschen sich vor allem jüngere Beschäftigte eine strikte Trennung zwischen Arbeits- und Privatleben und sind seltener bereit, ihre Freizeit für eine Karriere zu opfern. Manche Beobachter deuten das als Ausdruck mangelnden Ehrgeizes, andere als vernünftige Reaktion auf eine Arbeitswelt, die in vielen Branchen Erreichbarkeit rund um die Uhr verlangt und dennoch keine Sicherheit garantiert.",
          "Soziologen warnen allerdings davor, die Entwicklung zu verallgemeinern. Wer in einem erfüllenden Beruf arbeitet, erlebt Arbeit weiterhin als Quelle von Sinn und Anerkennung. Die Ernüchterung betrifft eher Tätigkeiten, die als austauschbar oder bedeutungslos empfunden werden. Ob es um „Arbeit“ an sich geht oder um die Bedingungen, unter denen sie stattfindet, ist deshalb eine offene Frage.",
          "Fest steht, dass die Verhandlungsposition der Beschäftigten dort gestärkt ist, wo Fachkräfte knapp sind. Unternehmen reagieren mit flexibleren Arbeitszeiten, Homeoffice und Sabbaticals. Ob diese Angebote aus Überzeugung oder aus Not gemacht werden, wird sich erst in einer Phase wirtschaftlicher Schwäche zeigen, in der sich zeigen dürfte, wie belastbar die neuen Gewohnheiten tatsächlich sind.",
        ],
        questions: [
          c("¿Qué afirma el texto sobre la relación entre trabajo e identidad?", ["Que es históricamente reciente y no se da por sentada", "Que existió siempre", "Que desapareció por completo", "Que solo existe en el campo"], "«historisch betrachtet relativ jung»."),
          c("¿Qué desean sobre todo los empleados más jóvenes según las encuestas?", ["Una separación estricta entre trabajo y vida privada", "Trabajar más horas", "Menos vacaciones", "Un sueldo fijo"], "«strikte Trennung»."),
          c("¿Cómo interpretan algunos observadores ese cambio?", ["Como falta de ambición", "Como un error estadístico", "Como un fenómeno solo urbano", "Como producto de la moda"], "«mangelnden Ehrgeizes»."),
          c("¿Qué matiz aportan los sociólogos?", ["Que quien tiene un trabajo satisfactorio sigue encontrándole sentido", "Que nadie encuentra sentido en el trabajo", "Que todos quieren trabajar menos", "Que solo importa el sueldo"], "«erfüllenden Beruf»."),
          tf("La desilusión afecta sobre todo a tareas percibidas como intercambiables o sin sentido.", true, "«austauschbar oder bedeutungslos»."),
          c("¿Dónde es más fuerte la posición negociadora de los empleados?", ["Donde faltan profesionales", "Donde hay desempleo alto", "En empresas muy grandes", "En el sector público"], "«wo Fachkräfte knapp sind»."),
          c("¿Cuándo se verá si las nuevas costumbres son sólidas?", ["En una fase de debilidad económica", "En diez años", "Con una nueva ley", "Nunca"], "«Phase wirtschaftlicher Schwäche»."),
        ],
      },
      {
        title: "Leserbrief: Mehr Mut zur Pause",
        text: [
          "Sehr geehrte Redaktion, Ihr Artikel über die angebliche Arbeitsmüdigkeit der jungen Generation hat mich geärgert. Es ist zu einfach, Menschen Faulheit vorzuwerfen, die lediglich nicht bereit sind, sich dauerhaft zu verausgaben. Wer jahrelang überlastet arbeitet, sinkt in der Leistung und wird häufiger krank, was am Ende auch den Unternehmen schadet. Ich plädiere deshalb nicht für weniger Engagement, sondern für eine Arbeitskultur, in der Pausen als Voraussetzung produktiven Arbeitens gelten und nicht als Schwäche.",
        ],
        questions: [
          c("¿Qué le molestó a la autora?", ["Que se acuse de pereza a los jóvenes", "El precio del diario", "La longitud del artículo", "La falta de datos"], "«Faulheit vorzuwerfen»."),
          c("¿Qué consecuencia atribuye a la sobrecarga prolongada?", ["Menor rendimiento y más enfermedades", "Más ganancias", "Más vacaciones", "Mejor ánimo"], "«sinkt in der Leistung ... häufiger krank»."),
          tf("La autora pide menos compromiso laboral.", false, "No «für weniger Engagement»."),
          c("¿Qué propone?", ["Una cultura que vea las pausas como condición para trabajar bien", "Prohibir las pausas", "Trabajar solo de noche", "Reducir salarios"], "«Pausen als Voraussetzung»."),
          c("¿Cuál es el tono general del texto?", ["Crítico y argumentativo", "Humorístico", "Neutral y descriptivo", "Resignado"], "Una carta que critica y argumenta."),
        ],
      },
    ],
    hoeren: [
      {
        title: "Interview: Mehrsprachigkeit in der Schule",
        setting: "Una periodista entrevista a un profesor de lingüística sobre enseñanza bilingüe",
        lines: [
          { who: "f", name: "Moderatorin", de: "Herr Professor Keller, immer mehr Schulen bieten zweisprachigen Unterricht an. Hält die Forschung das für sinnvoll?" },
          { who: "m", name: "Prof. Keller", de: "Grundsätzlich ja, allerdings mit einer wichtigen Einschränkung. Der Erfolg hängt weniger vom Modell als von der Qualität der Umsetzung ab." },
          { who: "f", name: "Moderatorin", de: "Was heißt das konkret?" },
          { who: "m", name: "Prof. Keller", de: "Lehrkräfte müssen beide Sprachen sicher beherrschen und das Fach so unterrichten, dass die Kinder nicht überfordert werden. Wenn der Fachinhalt unter der Sprache leidet, ist niemandem geholfen." },
          { who: "f", name: "Moderatorin", de: "Gibt es denn Nachteile für Kinder, die zu Hause eine dritte Sprache sprechen?" },
          { who: "m", name: "Prof. Keller", de: "Im Gegenteil, die Herkunftssprache sollte ausdrücklich gefördert werden. Wer sie gut beherrscht, lernt weitere Sprachen leichter, weil er bereits über ein Gespür für Strukturen verfügt." },
          { who: "f", name: "Moderatorin", de: "Dennoch fürchten manche Eltern, dass die Kinder weder die eine noch die andere Sprache richtig lernen." },
          { who: "m", name: "Prof. Keller", de: "Diese Sorge ist verständlich, aber sie lässt sich empirisch kaum belegen. Zwar zeigen sich anfangs kleine Verzögerungen im Wortschatz einzelner Sprachen, doch gleichen sich diese später aus, sofern der Input in beiden Sprachen ausreichend ist." },
          { who: "f", name: "Moderatorin", de: "Und welchen Rat geben Sie Eltern, die ihre Kinder zweisprachig erziehen möchten?" },
          { who: "m", name: "Prof. Keller", de: "Konsequenz und Gelassenheit. Eine Person, eine Sprache ist ein bewährtes Prinzip, aber wichtiger als jede Regel ist, dass die Kinder die Sprachen mit positiven Erlebnissen verbinden und nicht mit Druck." },
        ],
        questions: [
          c("¿De qué depende según el profesor el éxito de la enseñanza bilingüe?", ["De la calidad de la implementación", "Del tamaño de la escuela", "De la edad de los chicos", "Del idioma elegido"], "«Qualität der Umsetzung»."),
          c("¿Qué advierte sobre los contenidos de las materias?", ["Que no deben sufrir por culpa del idioma", "Que deben ser más fáciles", "Que se enseñen solo en alemán", "Que se eliminen"], "«Fachinhalt unter der Sprache leidet»."),
          c("¿Qué dice sobre la lengua de origen en casa?", ["Que debe fomentarse expresamente", "Que debe evitarse", "Que confunde a los chicos", "Que es irrelevante"], "«ausdrücklich gefördert»."),
          c("¿Qué miedo tienen algunos padres?", ["Que los chicos no aprendan bien ninguna de las dos lenguas", "Que aprendan demasiado rápido", "Que olviden las matemáticas", "Que cueste demasiado"], "«weder die eine noch die andere»."),
          tf("El profesor afirma que ese miedo está confirmado empíricamente.", false, "«empirisch kaum belegen»."),
          c("¿Qué consejo da a los padres al final?", ["Consecuencia y serenidad, asociando las lenguas con experiencias positivas", "Corregir cada error", "Empezar recién a los diez años", "Usar solo libros de texto"], "«Konsequenz und Gelassenheit»."),
        ],
      },
    ],
    schreiben: {
      prompt: "Escribí un texto argumentativo para una revista: «¿Debería la edad de jubilación depender del tipo de trabajo?» Presentá una tesis, analizá argumentos a favor y en contra, discutí al menos una consecuencia social y concluí con una valoración propia.",
      focus: ["Einleitung mit klarer These", "Abwägung von Pro und Kontra (einerseits … andererseits; zwar … jedoch)", "gesellschaftliche Folgen (Nominalisierungen, Passiv)", "Schlussfolgerung mit eigener Wertung (Konjunktiv II, Partizipialkonstruktionen)"],
      minSentences: 10,
      hint: "Mostrá variedad sintáctica: subordinadas, nominalización y conectores de contraste; cuidá la coherencia entre párrafos.",
    },
  },
  {
    id: "c1-2",
    level: "C1",
    title: "Simulacro C1 · 2",
    lesen: [
      {
        title: "Erinnerungskultur im digitalen Zeitalter",
        text: [
          "Wie erinnert sich eine Gesellschaft an ihre Geschichte, wenn die letzten Zeitzeugen sterben? Diese Frage stellt sich in vielen Ländern mit wachsender Dringlichkeit. Jahrzehntelang prägten persönliche Berichte von Überlebenden das kollektive Gedächtnis; Schulklassen hörten ihnen zu, Gedenkveranstaltungen gaben ihnen Raum. Mit dem Tod der Generation verändert sich der Charakter des Erinnerns: Aus gelebter Erfahrung wird vermitteltes Wissen.",
          "Digitale Technologien eröffnen dafür neue Möglichkeiten. Interviews werden als dreidimensionale Aufnahmen konserviert, mit denen Schüler per Sprachsteuerung Fragen stellen können, die Antworten werden aus Hunderten von Stunden Material zusammengesetzt. Archive stellen Dokumente online bereit und machen sie weltweit zugänglich. Befürworter sehen darin die Chance, die Stimmen der Zeitzeugen zu bewahren und neuen Generationen auf vertraute Weise nahezubringen.",
          "Kritiker wenden ein, dass die Technik die Erinnerung zur Ware machen könnte. Ein Hologramm vermittle den Eindruck von Unmittelbarkeit, ersetze aber nicht die Begegnung mit einem Menschen, die Unruhe stiftet und zum Nachdenken zwingt. Zudem berge die Verbreitung historischer Bilder in sozialen Netzwerken Risiken: Ohne Kontext lassen sie sich leicht für Propaganda umdeuten oder verharmlosen.",
          "Pädagogen plädieren daher für einen reflektierten Umgang. Die digitale Quelle sollte Ausgangspunkt, nicht Endpunkt der Auseinandersetzung sein. Wer lernt, Quellen zu prüfen, Perspektiven zu vergleichen und Widersprüche auszuhalten, erwirbt eine Kompetenz, die über den historischen Gegenstand hinausreicht. Erinnerung wird dann weniger zur Pflicht als zur Fähigkeit, die Gegenwart kritisch zu betrachten.",
        ],
        questions: [
          c("¿Qué cambia con la muerte de los últimos testigos?", ["El recuerdo pasa de experiencia vivida a saber transmitido", "Se olvida la historia", "Se prohíben las ceremonias", "Los archivos se cierran"], "«gelebter Erfahrung ... vermitteltes Wissen»."),
          c("¿Qué permiten las grabaciones tridimensionales?", ["Hacer preguntas por voz a una persona grabada", "Viajar en el tiempo", "Traducir idiomas", "Escribir libros"], "«per Sprachsteuerung Fragen stellen»."),
          c("¿Qué ventaja ven los defensores de estas tecnologías?", ["Preservar las voces y acercarlas a nuevas generaciones", "Reducir los costos", "Eliminar los museos", "Evitar los debates"], "«Stimmen ... bewahren»."),
          c("¿Qué objeción plantean los críticos?", ["Que la tecnología puede convertir el recuerdo en mercancía", "Que es demasiado compleja", "Que es ilegal", "Que no atrae a los jóvenes"], "«Erinnerung zur Ware»."),
          c("¿Qué riesgo tienen las imágenes históricas sin contexto en las redes?", ["Que se reinterpreten para propaganda o se minimicen", "Que se pierdan", "Que se censuren", "Que cuesten dinero"], "«für Propaganda umdeuten oder verharmlosen»."),
          c("¿Qué proponen los pedagogos?", ["Que la fuente digital sea punto de partida, no final", "Que se prohíba lo digital", "Que se use solo libros", "Que se olviden las fuentes"], "«Ausgangspunkt, nicht Endpunkt»."),
          tf("Para los pedagogos, la competencia crítica sirve solo para la historia.", false, "«über den historischen Gegenstand hinaus»."),
        ],
      },
      {
        title: "Kommentar: Weniger Autos, mehr Stadt?",
        text: [
          "Die Idee autofreier Innenstädte wird gern als ideologisches Projekt abgetan, doch die Erfahrungen vieler Städte sprechen eine andere Sprache. Wo Straßen für Fußgänger und Radfahrer freigegeben wurden, haben Geschäfte häufig mehr Umsatz gemacht, nicht weniger, und der Lärm ist deutlich gesunken. Die eigentliche Herausforderung besteht nicht im Verbot, sondern darin, Alternativen so attraktiv zu gestalten, dass der Umstieg als Gewinn empfunden wird. Wer nur verbietet, ohne etwas anzubieten, schafft Widerstand, aber keine Veränderung.",
        ],
        questions: [
          c("¿Cómo califica el autor la idea de centros sin autos?", ["Como una propuesta respaldada por experiencias de muchas ciudades", "Como un proyecto ideológico sin base", "Como un riesgo para el comercio", "Como una moda pasajera"], "«Erfahrungen ... sprechen eine andere Sprache»."),
          c("¿Qué observó el comercio donde se liberaron calles?", ["Muchas veces más ventas", "Menos ventas", "Cierres masivos", "Ningún cambio"], "«mehr Umsatz gemacht»."),
          c("¿Cuál es el verdadero desafío según el autor?", ["Que las alternativas sean tan atractivas que el cambio se vea como ganancia", "Prohibir los autos cuanto antes", "Construir más estacionamientos", "Bajar los impuestos"], "«Alternativen so attraktiv»."),
          tf("El autor cree que prohibir sin ofrecer alternativas genera cambio.", false, "«schafft Widerstand, aber keine Veränderung»."),
          c("¿Qué postura general tiene el texto?", ["Favorable, pero con condiciones", "Totalmente contraria", "Indiferente", "Humorística"], "Defiende la idea con matices."),
        ],
      },
    ],
    hoeren: [
      {
        title: "Gespräch: Grundeinkommen",
        setting: "Un moderador conversa con una economista sobre el ingreso básico",
        lines: [
          { who: "m", name: "Moderator", de: "Frau Dr. Albrecht, das bedingungslose Grundeinkommen wird seit Jahren diskutiert. Sie haben Pilotprojekte ausgewertet. Was ist das Ergebnis?" },
          { who: "f", name: "Dr. Albrecht", de: "Zunächst eine Einschränkung: Die meisten Projekte waren klein und zeitlich begrenzt, sodass sich Schlüsse auf ein dauerhaftes System nur vorsichtig ziehen lassen." },
          { who: "m", name: "Moderator", de: "Dennoch gibt es Tendenzen?" },
          { who: "f", name: "Dr. Albrecht", de: "Ja. Entgegen der verbreiteten Sorge haben die Teilnehmer ihre Arbeitszeit kaum reduziert. Viele nutzten die finanzielle Sicherheit für Weiterbildung oder für die Gründung eines kleinen Unternehmens." },
          { who: "m", name: "Moderator", de: "Gleichwohl bleibt die Finanzierung die zentrale Frage." },
          { who: "f", name: "Dr. Albrecht", de: "Richtig. Ein flächendeckendes Grundeinkommen würde enorme Summen erfordern und müsste durch höhere Steuern oder den Abbau bestehender Sozialleistungen gegenfinanziert werden. Hier gehen die Meinungen auseinander." },
          { who: "m", name: "Moderator", de: "Befürchten Kritiker nicht, dass ein Grundeinkommen die Eigeninitiative schwächt?" },
          { who: "f", name: "Dr. Albrecht", de: "Das ist das häufigste Argument, aber die Daten stützen es bislang nicht. Interessanter finde ich die Wirkung auf Gesundheit und Zufriedenheit, die in mehreren Studien positiv ausfiel, besonders bei Menschen in unsicheren Arbeitsverhältnissen." },
          { who: "m", name: "Moderator", de: "Würden Sie das Modell also empfehlen?" },
          { who: "f", name: "Dr. Albrecht", de: "Ich würde zunächst gezielte Erweiterungen bestehender Leistungen erproben, bevor man das gesamte System umstellt. Ein schrittweises Vorgehen erlaubt es, aus Fehlern zu lernen, ohne ein ganzes Land zum Experiment zu machen." },
        ],
        questions: [
          c("¿Qué limitación señala la economista sobre los proyectos piloto?", ["Fueron pequeños y de duración limitada", "Fueron demasiado caros", "No tuvieron participantes", "Se hicieron solo en ciudades grandes"], "«klein und zeitlich begrenzt»."),
          c("¿Cómo cambiaron los participantes su horario de trabajo?", ["Casi no lo redujeron", "Dejaron de trabajar", "Lo duplicaron", "No hay datos"], "«kaum reduziert»."),
          c("¿Para qué usaron muchos la seguridad económica?", ["Para capacitarse o fundar una pequeña empresa", "Para viajar", "Para comprar casas", "Para dejar el país"], "«Weiterbildung ... kleines Unternehmen»."),
          c("¿Cuál es la cuestión central según el moderador?", ["La financiación", "La edad de los beneficiarios", "El nombre del programa", "La cantidad de proyectos"], "«Finanzierung»."),
          c("¿Qué efecto positivo menciona además?", ["En la salud y la satisfacción", "En la inflación", "En el turismo", "En la natalidad"], "«Gesundheit und Zufriedenheit»."),
          c("¿Qué recomienda al final?", ["Probar primero ampliaciones focalizadas de prestaciones existentes", "Aplicarlo ya en todo el país", "Abandonar la idea", "Esperar diez años sin hacer nada"], "«gezielte Erweiterungen bestehender Leistungen»."),
        ],
      },
    ],
    schreiben: {
      prompt: "Escribí una carta de lectores al diario: has leído que muchas universidades quieren reemplazar parte de los exámenes por trabajos escritos y evaluación continua. Expresá tu postura, evaluá ventajas y riesgos, y proponé cómo implementarlo de forma justa.",
      focus: ["Bezug auf den Artikel und klare Positionierung", "Vor- und Nachteile abwägen (differenzierte Argumentation)", "konkreter Vorschlag (Konjunktiv II, Modalverben)", "formale Höflichkeit und Schlussformel"],
      minSentences: 10,
      hint: "Registro formal y argumentación ordenada; evitá repetir estructuras y usá subordinadas y nominalizaciones.",
    },
  },
  {
    id: "c1-3",
    level: "C1",
    title: "Simulacro C1 · 3",
    lesen: [
      {
        title: "Künstliche Intelligenz und das Urheberrecht",
        text: [
          "Systeme der künstlichen Intelligenz, die Texte, Bilder oder Musik erzeugen, lernen anhand riesiger Mengen bestehender Werke. Autoren, Illustratoren und Musiker sehen darin eine unerlaubte Nutzung ihrer Arbeit und fordern Vergütung. Die Entwickler der Systeme entgegnen, das Lernen aus vorhandenen Werken sei mit dem Studium durch einen Menschen vergleichbar und stelle keine Kopie dar.",
          "Juristisch ist die Lage unübersichtlich. Das Urheberrecht schützt Werke, die eine persönliche geistige Schöpfung darstellen, und setzt nach herrschender Auffassung einen menschlichen Urheber voraus. Ob ein maschinell erzeugtes Ergebnis geschützt werden kann, ist daher fraglich. Ebenso offen ist, ob das Training mit geschützten Werken unter bestehende Ausnahmen für Forschung und Text- und Data-Mining fällt oder einer Erlaubnis bedarf.",
          "Politisch zeichnen sich unterschiedliche Lösungswege ab. Manche schlagen vor, Urheber die Möglichkeit zu geben, der Nutzung ihrer Werke zu widersprechen. Andere wollen Anbieter verpflichten, offenzulegen, womit sie ihre Systeme trainiert haben, damit Rechteinhaber überhaupt prüfen können, ob ihre Werke betroffen sind. Wieder andere denken an pauschale Abgaben, aus denen Kreative entschädigt werden.",
          "Wirtschaftlich steht viel auf dem Spiel. Strenge Regeln könnten Innovationen bremsen und Entwickler in Länder mit lockereren Bestimmungen abwandern lassen. Zu lasche Regeln dagegen würden die Verhandlungsposition von Kreativen schwächen, deren Arbeit die Grundlage der Systeme bildet. Der Gesetzgeber muss also zwischen dem Schutz geistigen Eigentums und dem Interesse an technischem Fortschritt abwägen.",
        ],
        questions: [
          c("¿Qué reclaman autores y artistas?", ["Una compensación por el uso de sus obras", "Que se prohíban las máquinas", "Que se cierren las editoriales", "Que se baje el precio de sus obras"], "«fordern Vergütung»."),
          c("¿Cómo responden los desarrolladores?", ["Que aprender de obras existentes es comparable al estudio humano y no es copiar", "Que no usan obras de nadie", "Que pagarán todo", "Que se trata de un error"], "«mit dem Studium durch einen Menschen vergleichbar»."),
          c("¿Qué presupone el derecho de autor según la opinión dominante?", ["Un autor humano", "Un contrato", "Una máquina", "Un editor"], "«einen menschlichen Urheber»."),
          tf("El texto afirma que está claro si el entrenamiento cae bajo las excepciones existentes.", false, "Es «ebenso offen»."),
          c("¿Qué propone una de las soluciones políticas?", ["Obligar a los proveedores a revelar con qué entrenaron sus sistemas", "Prohibir el entrenamiento", "Eliminar el derecho de autor", "Limitar la cantidad de obras"], "«offenzulegen, womit sie ihre Systeme trainiert haben»."),
          c("¿Qué riesgo traerían las reglas demasiado estrictas?", ["Frenar la innovación y que los desarrolladores migren", "Aumentar la creatividad", "Reducir los precios", "Eliminar la competencia"], "«Innovationen bremsen ... abwandern»."),
          c("¿Qué debe hacer el legislador según el texto?", ["Equilibrar la protección de la propiedad intelectual y el progreso técnico", "Elegir solo la protección", "Elegir solo el progreso", "Esperar sin actuar"], "«zwischen ... abwägen»."),
        ],
      },
      {
        title: "Kommentar: Lernen ohne Noten?",
        text: [
          "Einige Schulen experimentieren damit, Noten in den unteren Klassen durch ausführliche Rückmeldungen zu ersetzen. Befürworter verweisen darauf, dass Ziffern den Blick auf den Lernfortschritt verengen und Kinder früh in Gewinner und Verlierer einteilen. Das Argument überzeugt nur teilweise: Rückmeldungen sind aufwendig, und wer sie schreibt, ist nicht davor gefeit, ebenfalls zu werten. Entscheidend ist weniger das Instrument als die Haltung, mit der Lehrkräfte Leistung beurteilen, nämlich nachvollziehbar, ermutigend und an klaren Kriterien orientiert.",
        ],
        questions: [
          c("¿Qué experimentan algunas escuelas?", ["Reemplazar notas por devoluciones detalladas", "Eliminar la escuela", "Tomar más exámenes", "Cambiar el calendario"], "«Noten ... durch ausführliche Rückmeldungen»."),
          c("¿Qué argumentan los defensores?", ["Que las notas estrechan la mirada y dividen en ganadores y perdedores", "Que son caras", "Que no existen", "Que cuestan tiempo a los chicos"], "«Gewinner und Verlierer»."),
          c("¿Qué opina el autor del argumento?", ["Que convence solo en parte", "Que es totalmente falso", "Que es indiscutible", "Que no entiende"], "«überzeugt nur teilweise»."),
          tf("Para el autor lo decisivo es el instrumento y no la actitud al evaluar.", false, "«weniger das Instrument als die Haltung»."),
          c("¿Cómo debería ser la evaluación según el autor?", ["Comprensible, alentadora y basada en criterios claros", "Rápida y severa", "Anónima", "Solo oral"], "«nachvollziehbar, ermutigend ... klaren Kriterien»."),
        ],
      },
    ],
    hoeren: [
      {
        title: "Diskussion: Mietpreisbremse",
        setting: "Un moderador conversa con una experta en política de vivienda sobre el límite a los alquileres",
        lines: [
          { who: "m", name: "Moderator", de: "Frau Dr. Winkler, in vielen Großstädten gilt eine Mietpreisbremse. Hat sie ihr Ziel erreicht?" },
          { who: "f", name: "Dr. Winkler", de: "Nur teilweise. In Gebieten, in denen sie konsequent kontrolliert wird, ist der Anstieg bei Neuvermietungen etwas gebremst worden. Vielerorts wird sie aber umgangen, weil Mieter ihre Rechte nicht kennen oder scheuen, sie einzufordern." },
          { who: "m", name: "Moderator", de: "Kritiker sagen, die Bremse verhindere Neubau." },
          { who: "f", name: "Dr. Winkler", de: "Dieser Zusammenhang ist plausibel, aber schwer zu belegen. Neubauten sind ohnehin von der Regelung ausgenommen, sodass sie die Investitionen nicht unmittelbar betrifft. Das größere Problem sind lange Genehmigungsverfahren und hohe Baukosten." },
          { who: "m", name: "Moderator", de: "Was würden Sie stattdessen empfehlen?" },
          { who: "f", name: "Dr. Winkler", de: "Keine Einzelmaßnahme, sondern ein Bündel: mehr Bauland, schnellere Verfahren, Förderung gemeinnütziger Anbieter und gezielte Unterstützung für Haushalte mit niedrigem Einkommen. Eine Mietbegrenzung kann Zeit verschaffen, ersetzt aber keinen Bau." },
          { who: "m", name: "Moderator", de: "Und wie sieht es mit dem Argument aus, dass Vermieter weniger in die Instandhaltung investieren?" },
          { who: "f", name: "Dr. Winkler", de: "Dieses Risiko besteht, vor allem bei kleinen Eigentümern mit knapper Kalkulation. Deshalb schlagen manche Fachleute vor, Modernisierungen steuerlich zu fördern, solange die Mieten dadurch nicht unverhältnismäßig steigen." },
          { who: "m", name: "Moderator", de: "Ein Kompromiss, der beide Seiten ernst nimmt." },
          { who: "f", name: "Dr. Winkler", de: "So würde ich es nennen. Wohnungspolitik scheitert meist dann, wenn sie nur einer Seite etwas verspricht." },
        ],
        questions: [
          c("¿Cuánto logró el límite a los alquileres según la experta?", ["Solo en parte", "Todo lo que se proponía", "Nada", "Más de lo esperado"], "«Nur teilweise»."),
          c("¿Por qué se lo elude en muchos lugares?", ["Los inquilinos desconocen sus derechos o temen reclamarlos", "Porque es ilegal", "Porque los propietarios lo piden", "Porque no hay propietarios"], "«Rechte nicht kennen oder scheuen»."),
          c("¿Qué dice sobre la relación entre el límite y la construcción?", ["Es plausible pero difícil de demostrar; las obras nuevas están exceptuadas", "Está comprobada", "No existe", "Solo ocurre en el campo"], "«plausibel, aber schwer zu belegen ... ausgenommen»."),
          c("¿Qué problema mayor menciona?", ["Los trámites largos y los altos costos de construcción", "La falta de inquilinos", "El clima", "El precio del suelo en el campo"], "«lange Genehmigungsverfahren und hohe Baukosten»."),
          c("¿Qué recomienda en lugar de una sola medida?", ["Un conjunto de medidas, con más terreno y apoyo focalizado", "Eliminar el límite", "Prohibir alquileres", "Subir los impuestos a todos"], "«ein Bündel»."),
          c("¿Qué propone sobre las modernizaciones?", ["Fomentarlas con impuestos siempre que los alquileres no suban desproporcionadamente", "Prohibirlas", "Que las paguen los inquilinos", "Dejarlas sin regla"], "«steuerlich zu fördern, solange ... unverhältnismäßig»."),
        ],
      },
    ],
    schreiben: {
      prompt: "Escribí un comentario para un sitio de noticias: una ciudad quiere instalar cámaras con reconocimiento facial en el espacio público para mejorar la seguridad. Presentá tu postura, discutí ventajas y riesgos para los derechos de las personas y proponé condiciones para un uso aceptable.",
      focus: ["klare Position in der Einleitung", "Abwägung von Sicherheit und Freiheitsrechten", "Gegenargument mit Entkräftung", "konkrete Bedingungen (Konjunktiv II, Passiv, Nominalstil)"],
      minSentences: 10,
      hint: "Ordená tu argumentación: tesis, razones, objeción con respuesta y propuesta final; buscá variedad de estructuras.",
    },
  },
];
