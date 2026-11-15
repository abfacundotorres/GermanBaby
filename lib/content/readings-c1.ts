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

  "bruecke-c1": reading(
    "El mercado laboral",
    "Leer un texto de actualidad y sumar dos palabras.",
    [
      { de: "der Arbeitsmarkt", es: "el mercado laboral", emoji: "📈", note: "Plural poco usado: se habla del mercado en general." },
      { de: "die Zuwanderung", es: "la inmigración", emoji: "🛬", note: "«zuwandern» = llegar a un país para vivir." },
    ],
    [
      cz("Die Digitalisierung hat viele Berufe ___ verändert.", "La digitalización cambió muchas profesiones de raíz.", ["grundlegend", "rasch", "leicht", "kaum"], "grundlegend", "«grundlegend» = de forma fundamental."),
      cz("Es muss mehr in Weiterbildung investiert ___.", "Hay que invertir más en capacitación.", ["werden", "sein", "haben", "worden"], "werden", "Pasiva con modal."),
      { kind: "write", es: "el mercado laboral", references: ["der Arbeitsmarkt"] },
    ],
    "Der Arbeitsmarkt",
    ["Der Arbeitsmarkt befindet sich im Wandel. Die Digitalisierung hat viele Berufe grundlegend verändert, und der Fachkräftemangel stellt die Firmen vor neue Herausforderungen. Viele Beschäftigte wünschen sich mehr Selbstbestimmung. Dem Bericht zufolge könne die Zuwanderung die Lücke teilweise schließen. Dennoch muss mehr in Weiterbildung investiert werden."],
    ["El mercado laboral está cambiando. La digitalización cambió muchas profesiones de raíz, y la escasez de personal calificado plantea nuevos desafíos a las empresas. Muchos empleados desean más autonomía. Según el informe, la inmigración podría cubrir parcialmente la brecha. Aun así, hay que invertir más en capacitación."],
    [
      { type: "choice", q: "¿Qué cambió la digitalización?", options: ["Muchas profesiones, de raíz", "Solo los sueldos", "Nada", "El idioma"], answer: "Muchas profesiones, de raíz", why: "«viele Berufe grundlegend verändert»." },
      { type: "tf", q: "Según el informe, la inmigración podría cubrir toda la brecha.", answer: false, why: "«teilweise schließen»: solo en parte." },
      { type: "choice", q: "¿Qué hay que hacer según el texto?", options: ["Invertir más en capacitación", "Bajar sueldos", "Cerrar empresas", "Contratar menos"], answer: "Invertir más en capacitación", why: "«mehr in Weiterbildung investiert werden»." },
    ],
  ),
  konzessiv: reading(
    "Una decisión difícil",
    "Leer un texto con concesiones y sumar dos palabras.",
    [
      { de: "die Skepsis", es: "el escepticismo", emoji: "🧐", note: "«skeptisch» = escéptico." },
      { de: "das Risiko", es: "el riesgo", emoji: "⚠️", note: "Plural: «die Risiken»." },
    ],
    [
      cz("___ der Vorschlag teuer ist, halte ich ihn für richtig.", "Si bien la propuesta es cara, la considero correcta.", ["Obgleich", "Gleichwohl", "Dennoch", "Zumal"], "Obgleich", "«obgleich» abre una subordinada."),
      cz("Zwar gibt es Risiken, ___ sollten wir handeln.", "Es cierto que hay riesgos, aun así deberíamos actuar.", ["dennoch", "obgleich", "weil", "dass"], "dennoch", "«dennoch» ocupa el primer lugar."),
      { kind: "write", es: "el riesgo", references: ["das Risiko"] },
    ],
    "Eine Entscheidung",
    ["Obgleich der Vorschlag teuer ist, halte ich ihn für richtig. Auch wenn meine Kollegen skeptisch bleiben, bin ich überzeugt, dass er sich lohnt. Zwar gibt es Risiken, dennoch sollten wir handeln. Wie dem auch sei: Wir müssen eine Entscheidung treffen."],
    ["Si bien la propuesta es cara, la considero correcta. Aunque mis colegas sigan escépticos, estoy convencido de que vale la pena. Es cierto que hay riesgos, aun así deberíamos actuar. Sea como fuere: tenemos que tomar una decisión."],
    [
      { type: "choice", q: "¿Qué piensa el que habla de la propuesta?", options: ["Que es correcta, aunque cara", "Que es barata", "Que es inútil", "Que es peligrosa"], answer: "Que es correcta, aunque cara", why: "«Obgleich der Vorschlag teuer ist, halte ich ihn für richtig»." },
      { type: "tf", q: "Sus colegas están convencidos.", answer: false, why: "«meine Kollegen skeptisch bleiben»." },
      { type: "choice", q: "¿Qué hay que hacer al final?", options: ["Tomar una decisión", "Esperar", "Renunciar", "Pedir más datos"], answer: "Tomar una decisión", why: "«Wir müssen eine Entscheidung treffen»." },
    ],
  ),
  wortbildung: reading(
    "Una médica",
    "Leer un retrato con palabras derivadas y sumar dos palabras.",
    [
      { de: "die Gelassenheit", es: "la serenidad", emoji: "🧘", note: "«gelassen» + -heit." },
      { de: "unermüdlich", es: "incansable", emoji: "💪", note: "«un-» + «müde» + «-lich»: que no se cansa." },
    ],
    [
      cz("Ihre ___ beeindruckt alle.", "Su amabilidad impresiona a todos.", ["Freundlichkeit", "Freundschaft", "Freund", "freundlich"], "Freundlichkeit", "«freundlich» → «Freundlichkeit»."),
      cz("Die Behandlung ist ___.", "El tratamiento es gratuito.", ["kostenlos", "kostbar", "kostspielig", "kostet"], "kostenlos", "-los = sin."),
      { kind: "write", es: "la serenidad", references: ["die Gelassenheit"] },
    ],
    "Die Ärztin",
    ["Die Ärztin arbeitet unermüdlich. Ihre Freundlichkeit und ihre Gelassenheit beeindrucken alle. Die Patienten sind dankbar, denn die Behandlung ist kostenlos. Die Entwicklung der Klinik verläuft erfolgreich, und die Zusammenarbeit im Team ist vorbildlich."],
    ["La médica trabaja incansablemente. Su amabilidad y su serenidad impresionan a todos. Los pacientes están agradecidos, porque el tratamiento es gratuito. El desarrollo de la clínica transcurre con éxito, y la colaboración en el equipo es ejemplar."],
    [
      { type: "choice", q: "¿Cómo trabaja la médica?", options: ["Incansablemente", "Con lentitud", "Poco", "Con miedo"], answer: "Incansablemente", why: "«unermüdlich»." },
      { type: "tf", q: "El tratamiento cuesta mucho.", answer: false, why: "«kostenlos»." },
      { type: "choice", q: "¿Qué impresiona a todos?", options: ["Su amabilidad y su serenidad", "Su sueldo", "Su juventud", "Su coche"], answer: "Su amabilidad y su serenidad", why: "«Freundlichkeit und Gelassenheit»." },
    ],
  ),
  funktionsverben: reading(
    "Una decisión del concejo",
    "Leer una noticia con locuciones verbales y sumar dos palabras.",
    [
      { de: "der Beschluss", es: "la resolución", emoji: "📜", note: "«beschließen» = resolver, decidir." },
      { de: "die Umsetzung", es: "la puesta en práctica", emoji: "🛠️", note: "«umsetzen» = llevar a la práctica." },
    ],
    [
      cz("Das Gesetz tritt nächsten Monat in ___.", "La ley entra en vigor el mes que viene.", ["Kraft", "Frage", "Kauf", "Betracht"], "Kraft", "«in Kraft treten»."),
      cz("Der Bürgermeister bezog klar ___.", "El intendente tomó una posición clara.", ["Stellung", "Sprache", "Abstand", "Beweis"], "Stellung", "«Stellung beziehen»."),
      { kind: "write", es: "la resolución", references: ["der Beschluss"] },
    ],
    "Der Beschluss",
    ["Der Stadtrat hat einen Beschluss gefasst. Das Thema stand lange zur Diskussion, bis der Bürgermeister klar Stellung bezog. Das neue Gesetz tritt nächsten Monat in Kraft. Die Verwaltung nimmt die Umsetzung in Angriff und trägt den Bedenken der Bürger Rechnung."],
    ["El concejo tomó una resolución. El tema estuvo mucho tiempo en discusión, hasta que el intendente tomó una posición clara. La nueva ley entra en vigor el mes que viene. La administración se pone manos a la obra con la puesta en práctica y tiene en cuenta las dudas de los ciudadanos."],
    [
      { type: "choice", q: "¿Qué tomó el concejo?", options: ["Una resolución", "Una vacación", "Un café", "Un crédito"], answer: "Una resolución", why: "«einen Beschluss gefasst»." },
      { type: "tf", q: "La ley ya entró en vigor.", answer: false, why: "«tritt nächsten Monat in Kraft»: todavía no." },
      { type: "choice", q: "¿Qué hace la administración?", options: ["Se pone manos a la obra y tiene en cuenta las dudas", "Cancela la ley", "Espera", "Pide más dinero"], answer: "Se pone manos a la obra y tiene en cuenta las dudas", why: "«nimmt… in Angriff und trägt… Rechnung»." },
    ],
  ),
  "redewendungen-c1": reading(
    "Palabras que no se traducen",
    "Leer un texto sobre expresiones fijas y sumar dos palabras.",
    [
      { de: "die Redewendung", es: "la expresión idiomática", emoji: "🎭", note: "Plural: «die Redewendungen»." },
      { de: "wörtlich", es: "literalmente", emoji: "📖", note: "«wörtlich übersetzen» = traducir palabra por palabra." },
    ],
    [
      cz("Man kann Redewendungen nicht ___ übersetzen.", "No se pueden traducir las expresiones literalmente.", ["wörtlich", "rasch", "leicht", "kaum"], "wörtlich", "«wörtlich» = palabra por palabra."),
      cz("Das ist ein ___: etwas sehr Einfaches.", "Es pan comido: algo muy sencillo.", ["Kinderspiel", "Tropfen", "Nagel", "Boot"], "Kinderspiel", "«ein Kinderspiel» = pan comido."),
      { kind: "write", es: "la expresión idiomática", references: ["die Redewendung"] },
    ],
    "Redewendungen",
    ["In jeder Sprache gibt es Redewendungen, die man nicht wörtlich übersetzen kann. Wenn jemand sagt, das sei ein Kinderspiel, meint er nicht ein Spiel für Kinder, sondern etwas sehr Einfaches. Wer die Nase voll hat, ist nicht erkältet, sondern genervt. Mit etwas Übung wird auch das ein Kinderspiel. Ende gut, alles gut."],
    ["En todos los idiomas hay expresiones que no se pueden traducir literalmente. Cuando alguien dice que algo es un juego de niños, no se refiere a un juego para chicos, sino a algo muy sencillo. Quien está harto no está resfriado, sino fastidiado. Con algo de práctica, esto también será pan comido. Todo está bien si termina bien."],
    [
      { type: "choice", q: "¿Qué quiere decir «ein Kinderspiel»?", options: ["Algo muy sencillo", "Un juguete", "Un juego para niños", "Algo peligroso"], answer: "Algo muy sencillo", why: "«etwas sehr Einfaches»." },
      { type: "tf", q: "Quien «hat die Nase voll» está resfriado.", answer: false, why: "Está fastidiado: «nicht erkältet, sondern genervt»." },
      { type: "choice", q: "¿Cómo se pueden traducir las expresiones?", options: ["No literalmente", "Palabra por palabra", "Con un diccionario", "Nunca"], answer: "No literalmente", why: "«nicht wörtlich übersetzen»." },
    ],
  ),

  "diskussion-c1": reading(
    "Una mesa redonda",
    "Leer un fragmento de debate y sumar dos palabras.",
    [
      { de: "der Einwand", es: "la objeción", emoji: "✋", note: "Plural: «die Einwände». «einen Einwand erheben» = plantear una objeción." },
      { de: "die Kompromissbereitschaft", es: "la disposición a ceder", emoji: "🤝", note: "«der Kompromiss» + «die Bereitschaft»: estar dispuesto a llegar a un acuerdo." },
    ],
    [
      cz("Dem muss ich entschieden ___.", "A eso tengo que oponerme rotundamente.", ["widersprechen", "zustimmen", "zusagen", "sprechen"], "widersprechen", "«widersprechen» + dativo."),
      cz("Ich stimme dem nur ___ zu.", "Solo estoy de acuerdo en parte.", ["bedingt", "gerne", "sofort", "kaum"], "bedingt", "«bedingt» = en parte."),
      { kind: "write", es: "la objeción", references: ["der Einwand"] },
    ],
    "Eine Diskussion",
    ["Die Debatte wurde sachlich geführt. Frau Berg wies darauf hin, dass die Zahlen nicht stimmen. Herr Klein erhob einen Einwand: Zugegeben, die Zahlen seien nicht neu, aber sie seien trotzdem richtig. Am Ende zeigten beide Kompromissbereitschaft. Im Grunde genommen waren sie sich einig."],
    ["El debate se llevó de forma objetiva. La Sra. Berg señaló que las cifras no son correctas. El Sr. Klein planteó una objeción: es cierto que las cifras no son nuevas, pero igual son correctas. Al final los dos mostraron disposición a ceder. En el fondo estaban de acuerdo."],
    [
      { type: "choice", q: "¿Cómo se llevó el debate?", options: ["De forma objetiva", "De forma agresiva", "De forma aburrida", "De forma desordenada"], answer: "De forma objetiva", why: "«sachlich geführt»." },
      { type: "tf", q: "Herr Klein piensa que las cifras son incorrectas.", answer: false, why: "Dice que «seien trotzdem richtig»." },
      { type: "choice", q: "¿Cómo terminó el debate?", options: ["Con disposición a ceder", "Con una pelea", "Con un voto", "Sin conclusión"], answer: "Con disposición a ceder", why: "«zeigten beide Kompromissbereitschaft»." },
    ],
  ),
  textanalyse: reading(
    "Una reseña breve",
    "Leer una reseña con vocabulario de análisis y sumar dos palabras.",
    [
      { de: "die Aussage", es: "el mensaje, la afirmación", emoji: "💬", note: "La idea principal de un texto." },
      { de: "aufschlussreich", es: "esclarecedor", emoji: "🔦", note: "Algo que da mucha información útil." },
    ],
    [
      cz("Der Autor ___ die These, dass Homeoffice produktiver macht.", "El autor sostiene la tesis de que el home office vuelve más productivo.", ["vertritt", "vertreten", "vertrat", "vertritt sich"], "vertritt", "«eine These vertreten»."),
      cz("Der Text ist in drei Abschnitte ___.", "El texto se divide en tres secciones.", ["gegliedert", "gliedert", "gegliederte", "gliedern"], "gegliedert", "«gegliedert sein»."),
      { kind: "write", es: "el mensaje", references: ["die Aussage"] },
    ],
    "Eine Rezension",
    ["Der Text behandelt die Zukunft der Arbeit. Die zentrale Aussage lautet, dass flexible Arbeitszeiten produktiver machen. Der Autor stützt sich auf mehrere Studien und führt ein Beispiel an. Der Stil ist sachlich, die Argumentation überzeugend, aber einseitig. Insgesamt lässt sich festhalten, dass der Text aufschlussreich ist."],
    ["El texto trata el futuro del trabajo. El mensaje central es que los horarios flexibles vuelven más productivo. El autor se apoya en varios estudios y menciona un ejemplo. El estilo es objetivo, la argumentación convincente, pero unilateral. En conjunto se puede afirmar que el texto es esclarecedor."],
    [
      { type: "choice", q: "¿De qué trata el texto?", options: ["Del futuro del trabajo", "Del clima", "De la política", "Del turismo"], answer: "Del futuro del trabajo", why: "«die Zukunft der Arbeit»." },
      { type: "tf", q: "El estilo del texto es objetivo.", answer: true, why: "«Der Stil ist sachlich»." },
      { type: "choice", q: "¿Cómo es la argumentación?", options: ["Convincente, pero unilateral", "Débil", "Confusa", "Perfecta"], answer: "Convincente, pero unilateral", why: "«überzeugend, aber einseitig»." },
    ],
  ),
  "medien-c1": reading(
    "Cómo informarse",
    "Leer un consejo sobre medios y sumar dos palabras.",
    [
      { de: "die Glaubwürdigkeit", es: "la credibilidad", emoji: "✅", note: "«glaubwürdig» = creíble." },
      { de: "die Reichweite", es: "el alcance", emoji: "📡", note: "Cuántas personas llega a ver algo." },
    ],
    [
      cz("Die ___ einer Quelle ist entscheidend.", "La credibilidad de una fuente es decisiva.", ["Glaubwürdigkeit", "Reichweite", "Meldung", "Schlagzeile"], "Glaubwürdigkeit", "«die Glaubwürdigkeit»."),
      cz("Falschmeldungen haben oft eine große ___.", "Las noticias falsas suelen tener un gran alcance.", ["Reichweite", "Quelle", "Presse", "Nachricht"], "Reichweite", "«die Reichweite»."),
      { kind: "write", es: "la credibilidad", references: ["die Glaubwürdigkeit"] },
    ],
    "Richtig informieren",
    ["Wer sich informieren will, sollte mehrere Quellen vergleichen. Die Glaubwürdigkeit einer Quelle ist entscheidend. Falschmeldungen haben oft eine große Reichweite, weil sie Emotionen wecken. Es besteht die Gefahr, dass man nur noch liest, was man ohnehin glaubt. Eine Pause von den Netzwerken tut deshalb vielen gut."],
    ["Quien quiere informarse debería comparar varias fuentes. La credibilidad de una fuente es decisiva. Las noticias falsas suelen tener un gran alcance, porque despiertan emociones. Existe el riesgo de que uno solo lea lo que ya cree. Un descanso de las redes le hace bien por eso a mucha gente."],
    [
      { type: "choice", q: "¿Qué conviene hacer para informarse?", options: ["Comparar varias fuentes", "Leer un solo diario", "No leer", "Creer los titulares"], answer: "Comparar varias fuentes", why: "«mehrere Quellen vergleichen»." },
      { type: "tf", q: "Las noticias falsas tienen poco alcance.", answer: false, why: "«große Reichweite»." },
      { type: "choice", q: "¿Qué recomienda el texto?", options: ["Un descanso de las redes", "Más redes", "Menos noticias", "Más publicidad"], answer: "Un descanso de las redes", why: "«Eine Pause von den Netzwerken»." },
    ],
  ),
  "technik-c1": reading(
    "Una tecnología prometedora",
    "Leer un texto sobre tecnología y sumar dos palabras.",
    [
      { de: "der Durchbruch", es: "el avance decisivo", emoji: "💡", note: "Algo que cambia las cosas de forma importante." },
      { de: "der Datenschutz", es: "la protección de datos", emoji: "🔒", note: "Las normas para proteger datos personales." },
    ],
    [
      cz("Die Forscher feierten einen ___.", "Los investigadores festejaron un avance decisivo.", ["Durchbruch", "Rückzug", "Streit", "Fehler"], "Durchbruch", "«der Durchbruch»."),
      cz("Es bleibt ___, welche Folgen das hat.", "Habrá que esperar a ver qué consecuencias tiene.", ["abzuwarten", "abwarten", "gewartet", "warten"], "abzuwarten", "«bleiben + zu + infinitivo»."),
      { kind: "write", es: "el avance decisivo", references: ["der Durchbruch"] },
    ],
    "Ein Durchbruch",
    ["Die Forscher haben einen Durchbruch erzielt. Die neue Technik kann Krankheiten früher erkennen. Allerdings dürfen Fragen des Datenschutzes nicht ausgeklammert werden. Ob die Technik uns nützt, hängt davon ab, wie wir sie einsetzen. Es bleibt abzuwarten, welche Folgen das haben wird."],
    ["Los investigadores lograron un avance decisivo. La nueva técnica puede detectar enfermedades antes. Sin embargo, no se pueden dejar de lado las cuestiones de protección de datos. Que la técnica nos sirva depende de cómo la usemos. Habrá que esperar a ver qué consecuencias tendrá."],
    [
      { type: "choice", q: "¿Qué logró la investigación?", options: ["Un avance decisivo", "Un fracaso", "Un premio", "Un acuerdo"], answer: "Un avance decisivo", why: "«einen Durchbruch erzielt»." },
      { type: "tf", q: "La técnica detecta enfermedades más tarde.", answer: false, why: "«Krankheiten früher erkennen»." },
      { type: "choice", q: "¿Qué no se puede dejar de lado?", options: ["La protección de datos", "El precio", "El nombre", "El color"], answer: "La protección de datos", why: "«Fragen des Datenschutzes»." },
    ],
  ),
  "pruefung-c1": reading(
    "Un ensayo breve",
    "Leer un ensayo y sumar dos palabras.",
    [
      { de: "die Abwägung", es: "la ponderación", emoji: "⚖️", note: "«abwägen» = ponderar." },
      { de: "schlüssig", es: "coherente, lógico", emoji: "🧩", note: "Una argumentación sin contradicciones." },
    ],
    [
      cz("Meines ___ überwiegen die Vorteile.", "A mi juicio, las ventajas pesan más.", ["Erachtens", "Erachten", "Erachtets", "erachten"], "Erachtens", "«meines Erachtens» (genitivo)."),
      cz("Für diese Position ___ mehrere Argumente.", "A favor de esta posición hay varios argumentos.", ["sprechen", "spricht", "sprach", "gesprochen"], "sprechen", "El sujeto va después: plural."),
      { kind: "write", es: "la ponderación", references: ["die Abwägung"] },
    ],
    "Ein Essay",
    ["In der heutigen Zeit gewinnt die Frage nach der Arbeitsweise zunehmend an Bedeutung. Für flexible Modelle sprechen mehrere Argumente. Allerdings darf nicht übersehen werden, dass es Nachteile gibt. Nach sorgfältiger Abwägung lässt sich festhalten, dass die Vorteile überwiegen. Die Argumentation ist schlüssig, und meines Erachtens ist das Ergebnis überzeugend."],
    ["En la actualidad la cuestión del modo de trabajo gana cada vez más importancia. A favor de los modelos flexibles hay varios argumentos. Sin embargo, no hay que pasar por alto que hay desventajas. Después de una ponderación cuidadosa se puede afirmar que las ventajas pesan más. La argumentación es coherente, y a mi juicio el resultado es convincente."],
    [
      { type: "choice", q: "¿Qué gana importancia?", options: ["La cuestión del modo de trabajo", "El clima", "El turismo", "La moda"], answer: "La cuestión del modo de trabajo", why: "«die Frage nach der Arbeitsweise»." },
      { type: "tf", q: "El texto ignora las desventajas.", answer: false, why: "«darf nicht übersehen werden, dass es Nachteile gibt»." },
      { type: "choice", q: "¿Qué piensa el autor del resultado?", options: ["Que es convincente", "Que es débil", "Que es injusto", "Que es raro"], answer: "Que es convincente", why: "«meines Erachtens ist das Ergebnis überzeugend»." },
    ],
  ),
};
