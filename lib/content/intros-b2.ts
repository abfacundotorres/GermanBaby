// Explicación previa y puntos para recordar de las lecciones de B2 (unidades 35 a 42).
// Mismo formato que intros.ts: clave «unidad/lección».

import { READING_TIP, PRACTICE_TIP, type LessonNotes } from "./intros-a2.ts";

const reading = (words: string): LessonNotes => ({ intro: [READING_TIP], summary: [`Palabras nuevas de la lectura: ${words}.`] });
const practice = (topic: string): LessonNotes => ({ intro: [PRACTICE_TIP], summary: [`Repasaste lo de la unidad: ${topic}.`] });

export const INTROS_B2: Record<string, LessonNotes> = {
  // ---------- Unidad 35: Discurso indirecto
  "indirekte-rede/berichten": {
    intro: [
      "El discurso indirecto cuenta lo que dijo otra persona, y en alemán formal usa el Konjunktiv I: «Er sagt, er sei krank». Esa forma marca que lo cuenta otro, sin decir si es verdad. Es la forma típica de la prensa.",
      "El Konjunktiv I se forma con la raíz del infinitivo + «-e»: «kommen» → «er komme», «haben» → «er habe», «wissen» → «er wisse». El único irregular es «sein»: «er sei». Para el pasado se usa «sei» o «habe» + participio: «Er sagte, er habe gestern gearbeitet». Para el futuro, «werde» + infinitivo.",
    ],
    summary: [
      "Konjunktiv I: raíz + -e (komme, habe, wisse, könne) · sein → sei.",
      "Pasado: «sei / habe» + participio · futuro: «werde» + infinitivo.",
      "Sirve para contar lo que dijo otro, sin garantizarlo.",
    ],
  },
  "indirekte-rede/nachrichten": {
    intro: [
      "En las noticias hay verbos y fórmulas fijas para citar: «sagen», «behaupten» (afirmar, con duda), «berichten» (informar), «mitteilen» (comunicar), y expresiones como «laut» (según), «angeblich» (supuestamente) y «es heißt, dass…» (se dice que).",
      "Con «angeblich» o «laut» no hace falta el Konjunktiv I, porque la palabra ya marca la distancia: «Angeblich ist er reich», «Laut dem Bericht ist der Zug zu spät».",
    ],
    summary: [
      "«laut» + dativo = según · «angeblich» = supuestamente · «es heißt, dass…» = se dice que.",
      "Verbos: sagen, behaupten, berichten, mitteilen.",
      "Con «laut» y «angeblich» no hace falta el Konjunktiv I.",
    ],
  },
  "indirekte-rede/fragen-auffordern": {
    intro: [
      "Para pasar una pregunta al discurso indirecto: si es de sí o no, se usa «ob» («Er fragte, ob ich Zeit habe»); si lleva palabra interrogativa, se mantiene esa palabra, sin «ob» («Sie wollte wissen, wann der Zug abfahre»). El verbo conjugado va al final.",
      "Un pedido o una orden se pasan con «solle»: «Er sagte, ich solle warten». Y con «bitten» se usa «zu» + infinitivo, sin Konjunktiv: «Sie bat mich, ihr zu helfen».",
    ],
    summary: [
      "Sí o no: «ob» · con palabra interrogativa: sin «ob».",
      "Pedido o orden: «solle» + infinitivo.",
      "«bitten» + «zu» + infinitivo.",
    ],
  },
  "indirekte-rede/konjunktiv1-regeln": {
    intro: [
      "Esta lección junta la unidad. Las terminaciones del Konjunktiv I son «-e, -est, -e, -en, -et, -en» sobre la raíz del infinitivo; el que más se usa es el de «er / sie / es».",
      "Cuando el Konjunktiv I coincide con el presente (por ejemplo con «sie» en plural: «sie haben»), se usa el Konjunktiv II en su lugar para que se note: «Sie sagten, sie hätten keine Zeit».",
    ],
    summary: [
      "ich sei · du seist · er sei · wir seien · ihr seiet · sie seien.",
      "Si coincide con el presente → Konjunktiv II («sie hätten»).",
      "Preguntas con «ob» · pedidos con «solle».",
    ],
  },
  "indirekte-rede/lesen": reading("die Quelle, bestätigen"),
  "indirekte-rede/practica": practice("el discurso indirecto y el Konjunktiv I"),

  // ---------- Unidad 36: Participios como adjetivos
  "partizipien/partizip-eins": {
    intro: [
      "El Partizip I se forma con el infinitivo + «-d»: «lachen» → «lachend», «schlafen» → «schlafend». Describe algo que ocurre al mismo tiempo y es activo: «das lachende Kind» es el niño que se ríe.",
      "Antes de un sustantivo, el participio lleva las terminaciones del adjetivo: «der schlafende Hund», «die steigenden Preise», «ein überraschendes Ergebnis». Sin terminación, funciona como adverbio: «Das Kind sitzt lachend am Tisch».",
    ],
    summary: [
      "Partizip I = infinitivo + -d (lachend, schlafend, kommend).",
      "Describe una acción simultánea y activa.",
      "Lleva las terminaciones del adjetivo: das lachende Kind · ein überraschendes Ergebnis.",
    ],
  },
  "partizipien/partizip-zwei": {
    intro: [
      "El Partizip II (gekauft, geöffnet, gebrochen) también se usa como adjetivo, y expresa algo ya hecho o pasivo: «das gekaufte Auto» es el auto que fue comprado.",
      "Lleva las terminaciones del adjetivo: «ein gebrochener Arm», «die geschlossenen Fenster». Sin sustantivo no lleva terminación: «Das Auto ist gekauft». Los verbos como «verlieren» no llevan «ge-»: «das verlorene Buch».",
    ],
    summary: [
      "Partizip II con terminación: das gekaufte Auto · ein gebrochener Arm.",
      "Expresa algo ya hecho (casi siempre pasivo).",
      "Sin sustantivo, sin terminación: «Das Auto ist gekauft».",
    ],
  },
  "partizipien/erweiterte-partizipien": {
    intro: [
      "En el alemán escrito, entre el artículo y el participio puede ir todo lo que lo completa: «das von meinem Vater gekaufte Auto». Se lee al revés: primero el participio y el sustantivo, y después lo que va en el medio. El truco para entenderlo es pasarlo a una oración de relativo: «das Auto, das mein Vater gekauft hat».",
      "Vale tanto para el Partizip II («die vor zwei Jahren gebaute Brücke») como para el Partizip I («die in Berlin lebende Frau»).",
    ],
    summary: [
      "artículo + complementos + participio + sustantivo.",
      "Se lee al revés; para entenderlo, pasalo a una oración de relativo.",
      "«die in Berlin lebende Frau» = «die Frau, die in Berlin lebt».",
    ],
  },
  "partizipien/partizipien-regeln": {
    intro: [
      "Esta lección junta lo de la unidad. Partizip I = activo y a la vez; Partizip II = pasivo o ya hecho. Las terminaciones son las del adjetivo: con «der / die / das» casi siempre «-e» o «-en»; con «ein», «-er» en masculino y «-es» en neutro.",
      "Y el participio ampliado, que es más escrito que hablado: se puede reemplazar por una oración de relativo.",
    ],
    summary: [
      "lachend (activo, a la vez) · gekauft (pasivo, ya hecho).",
      "Terminaciones: las del adjetivo.",
      "Participio ampliado ↔ oración de relativo.",
    ],
  },
  "partizipien/lesen": reading("der Weg, der duftende Kaffee"),
  "partizipien/practica": practice("los participios como adjetivos"),

  // ---------- Unidad 37: Lenguaje formal
  "nominalstil/nomen": {
    intro: [
      "El lenguaje formal (informes, noticias, cartas) prefiere los sustantivos a las oraciones con verbo. Muchos verbos forman el sustantivo con «-ung», que es femenino: «entwickeln» → «die Entwicklung», «lösen» → «die Lösung». Otros cambian la raíz: «ankommen» → «die Ankunft».",
      "Cualquier infinitivo puede ser un sustantivo neutro con mayúscula: «das Lesen», «beim Lesen» (mientras leo). Lo que en la oración verbal era el objeto, pasa a genitivo: «die Lösung des Problems».",
    ],
    summary: [
      "-ung (femenino): Entwicklung, Lösung, Verbesserung, Erhöhung.",
      "Infinitivo sustantivado: «beim Lesen» = mientras leo.",
      "El objeto pasa a genitivo: «die Lösung des Problems».",
    ],
  },
  "nominalstil/nomen-verb": {
    intro: [
      "En el lenguaje formal es común una combinación fija de verbo y sustantivo, que hay que aprender entera, porque su sentido no sale de las palabras sueltas: «eine Entscheidung treffen» (tomar una decisión), «Rücksicht nehmen auf» (tener consideración con), «zur Verfügung stehen» (estar a disposición), «eine Rolle spielen» (importar), «in Frage kommen» (ser posible), «Bescheid sagen» (avisar), «Kritik üben an» (criticar).",
    ],
    summary: [
      "eine Entscheidung treffen · Rücksicht nehmen auf · zur Verfügung stehen.",
      "eine Rolle spielen · in Frage kommen · Bescheid sagen · Kritik üben an.",
      "Se aprenden como bloques enteros.",
    ],
  },
  "nominalstil/praepositionen-genitiv": {
    intro: [
      "Las preposiciones formales con genitivo reemplazan a una conjunción: «aufgrund» (por, debido a), «infolge» (a raíz de), «angesichts» (ante, dado), «mithilfe» (con la ayuda de), «im Rahmen» (en el marco de), y «dank» (gracias a), que acepta genitivo o dativo.",
      "«Aufgrund des Regens fällt das Fest aus» es lo mismo que «Weil es regnet, fällt das Fest aus», pero más formal.",
    ],
    summary: [
      "aufgrund · infolge · angesichts · mithilfe · im Rahmen + genitivo.",
      "«dank» = gracias a (genitivo o dativo).",
      "«Aufgrund des Regens…» = «Weil es regnet…» (más formal).",
    ],
  },
  "nominalstil/nominalstil-regeln": {
    intro: [
      "Esta lección junta la unidad. Dos maneras de decir lo mismo: con una subordinada («Weil es regnet, …») o con un sustantivo («Wegen des Regens …»). La conjunción se convierte en preposición, y el verbo, en sustantivo con su complemento en genitivo.",
    ],
    summary: [
      "weil → wegen / aufgrund · obwohl → trotz · wenn → bei · während → während + genitivo.",
      "verbo → sustantivo (-ung, infinitivo sustantivado).",
      "Combinaciones fijas: eine Entscheidung treffen, zur Verfügung stehen.",
    ],
  },
  "nominalstil/lesen": reading("die Maßnahme, die Zusammenarbeit"),
  "nominalstil/practica": practice("el estilo nominal y las preposiciones formales"),

  // ---------- Unidad 38: Pasiva avanzada
  "passiv-plus/passiv-zeiten": {
    intro: [
      "La pasiva siempre se forma con «werden» + participio, y solo cambia «werden»: «wird gebaut» (presente), «wurde gebaut» (Präteritum), «ist gebaut worden» (Perfekt), «war gebaut worden» (Plusquamperfekt), «wird gebaut werden» (futuro).",
      "Atención: en los tiempos compuestos aparece «worden», no «geworden». Y en las subordinadas el verbo conjugado va al final: «…, dass das Haus renoviert worden ist». Con un modal: «Der Brief muss geschrieben werden».",
    ],
    summary: [
      "wird gebaut · wurde gebaut · ist gebaut worden · war gebaut worden · wird gebaut werden.",
      "«worden», no «geworden».",
      "Con modal: modal + participio + «werden».",
    ],
  },
  "passiv-plus/passiv-ohne-subjekt": {
    intro: [
      "Si no hay un sujeto, la pasiva es impersonal: «Heute wird nicht gearbeitet», «Hier wird getanzt». El «es» solo se usa al principio: «Es wird getanzt», pero «Hier wird getanzt».",
      "Los verbos que piden dativo (helfen, schenken, anbieten) mantienen el dativo en la pasiva: «Mir wurde geholfen» (a mí me ayudaron), «Ihm wurde eine Stelle angeboten».",
    ],
    summary: [
      "Impersonal: «Heute wird nicht gearbeitet».",
      "«es» solo al principio de la oración.",
      "El dativo se mantiene: «Mir wurde geholfen».",
    ],
  },
  "passiv-plus/passiv-alternativen": {
    intro: [
      "Para no repetir la pasiva con «werden», el alemán tiene cuatro alternativas con el mismo sentido: «man» + verbo activo («Man spricht hier Deutsch»), «sich lassen» + infinitivo («Das Problem lässt sich lösen»), «sein» + «zu» + infinitivo («Das Problem ist zu lösen») y adjetivos en «-bar» o «-lich» («lesbar», «verständlich»).",
    ],
    summary: [
      "man + activo · sich lassen + infinitivo · sein + zu + infinitivo · -bar / -lich.",
      "«Das Problem lässt sich lösen» = el problema se puede resolver.",
    ],
  },
  "passiv-plus/passiv-plus-regeln": {
    intro: [
      "Esta lección junta la pasiva completa: todos los tiempos con «werden» + participio, la pasiva impersonal y con dativo, y las cuatro alternativas para no repetir «werden».",
    ],
    summary: [
      "Pasiva: «werden» + participio (en tiempos compuestos, «worden»).",
      "Sin sujeto: «Hier wird getanzt» · con dativo: «Mir wurde geholfen».",
      "Alternativas: man, sich lassen, sein + zu, -bar / -lich.",
    ],
  },
  "passiv-plus/lesen": reading("die Baustelle, die Genehmigung"),
  "passiv-plus/practica": practice("la pasiva completa y sus alternativas"),

  // ---------- Unidad 39: Conectores avanzados
  "konnektoren-b2/bedingung": {
    intro: [
      "Para poner condiciones con más precisión hay varias fórmulas. «sofern» (siempre que) y «solange» (mientras) mandan el verbo al final: «Ich komme, sofern ich Zeit habe». «es sei denn» (a menos que) es una fórmula fija y suele ir seguida de una oración con el verbo en segundo lugar: «…, es sei denn, es regnet».",
      "«vorausgesetzt, dass» (siempre y cuando), «je nachdem» (según) y «im Falle» + genitivo (en caso de) son más formales que «falls».",
    ],
    summary: [
      "sofern = siempre que · solange = mientras · es sei denn = a menos que.",
      "vorausgesetzt, dass · je nachdem · im Falle + genitivo.",
    ],
  },
  "konnektoren-b2/grund-folge": {
    intro: [
      "Para dar razones: «da» (como, puesto que; suele ir al principio y da una razón conocida), «zumal» (sobre todo porque) y «nämlich» (es que; va dentro de la oración, no al principio). Para sacar consecuencias: «folglich» (por lo tanto), «somit» (con eso) e «infolgedessen» (en consecuencia).",
      "«da» y «zumal» mandan el verbo al final; «folglich», «somit» e «infolgedessen» ocupan el primer lugar y el verbo viene enseguida.",
    ],
    summary: [
      "Razón: da · zumal · nämlich (dentro de la oración).",
      "Consecuencia: folglich · somit · infolgedessen.",
      "da / zumal: verbo al final · folglich / somit: verbo enseguida.",
    ],
  },
  "konnektoren-b2/gegensatz": {
    intro: [
      "Para contrastar y matizar: «wohingegen» (mientras que) manda el verbo al final; «dennoch» (aun así), «jedoch» (sin embargo), «allerdings» (aunque, matiza lo anterior) y «hingegen» (en cambio) ocupan el primer lugar o van dentro de la oración. «immerhin» significa «al menos».",
      "«jedoch» es más formal que «aber», y «dennoch» es como «trotzdem», pero más formal.",
    ],
    summary: [
      "wohingegen = mientras que (verbo al final).",
      "dennoch · jedoch · allerdings · hingegen · immerhin.",
    ],
  },
  "konnektoren-b2/konnektoren-b2-regeln": {
    intro: [
      "Esta lección ordena los conectores nuevos por lo que hacen con el verbo: algunos abren una subordinada y lo mandan al final (da, zumal, sofern, solange, wohingegen); otros ocupan el primer lugar y el verbo viene enseguida (folglich, somit, dennoch, jedoch, hingegen); y «nämlich» y «allerdings» van dentro de la oración.",
    ],
    summary: [
      "Verbo al final: da, zumal, sofern, solange, wohingegen.",
      "Verbo enseguida: folglich, somit, dennoch, jedoch, hingegen.",
      "Dentro de la oración: nämlich, allerdings.",
    ],
  },
  "konnektoren-b2/lesen": reading("der Umzug, überzeugen"),
  "konnektoren-b2/practica": practice("los conectores avanzados y el orden del verbo"),

  // ---------- Unidad 40: Texto de opinión
  "meinungstext/einleitung": {
    intro: [
      "Un texto de opinión de B2 se abre presentando el tema y tu posición. Hay fórmulas para eso: «Heutzutage…» (hoy en día), «Die Frage ist, ob…» (la pregunta es si…), «In diesem Text geht es um…» (en este texto se trata de…), «Ich vertrete die Meinung, dass…» y «Meiner Ansicht nach…».",
      "«Ich bin davon überzeugt, dass…» expresa mucha certeza: «überzeugt sein von» lleva dativo, y «davon» anticipa la oración con «dass».",
    ],
    summary: [
      "«Heutzutage…» · «Die Frage ist, ob…» · «In diesem Text geht es um…».",
      "«Ich vertrete die Meinung, dass…» · «Meiner Ansicht nach…».",
      "«Ich bin davon überzeugt, dass…».",
    ],
  },
  "meinungstext/argumentation": {
    intro: [
      "Los argumentos se ordenan con conectores: «zunächst» (primero), «darüber hinaus» (además; más formal que «außerdem»). Cada argumento lleva un ejemplo: «Ein Beispiel dafür ist…». Para sacar una conclusión de un dato: «Dies zeigt, dass…».",
      "Para los pros y contras: «Dafür spricht, dass…» (a favor está que…) y «Dagegen spricht, dass…» (en contra está que…). El sujeto de «spricht» es la oración con «dass».",
    ],
    summary: [
      "zunächst · darüber hinaus · ein Beispiel dafür ist · dies zeigt, dass.",
      "«Dafür spricht, dass…» · «Dagegen spricht, dass…».",
    ],
  },
  "meinungstext/schluss": {
    intro: [
      "Una buena opinión admite una objeción antes de cerrar: «Man könnte einwenden, dass…» (se podría objetar que…), «Zwar… aber / doch…» y «Natürlich gibt es Probleme, dennoch…». Con «es lohnt sich» se dice que vale la pena.",
      "Para la conclusión: «Abschließend lässt sich sagen, dass…», «Zusammenfassend bin ich der Meinung, dass…» o «Aus diesem Grund bin ich dafür».",
    ],
    summary: [
      "Objeción: «Man könnte einwenden, dass…» · «Zwar… doch…».",
      "Cierre: «Abschließend…» · «Zusammenfassend…» · «Aus diesem Grund…».",
      "«Es lohnt sich» = vale la pena.",
    ],
  },
  "meinungstext/meinungstext-regeln": {
    intro: [
      "Esta lección junta cómo se arma un texto de opinión en cuatro partes: introducción (tema y posición), argumentos con ejemplos, objeción y conclusión. Cada parte tiene sus fórmulas.",
      "Con los conectores, el verbo viene enseguida después de «zunächst», «darüber hinaus» y «dennoch», y va al final después de «dass» y «ob». Y para no sonar tan tajante se usa el Konjunktiv II: «Man könnte sagen…», «Ich würde sagen, dass…».",
    ],
    summary: [
      "Cuatro partes: introducción · argumentos · objeción · conclusión.",
      "zunächst / darüber hinaus / dennoch: verbo enseguida · dass / ob: verbo al final.",
      "Konjunktiv II para suavizar: «Man könnte sagen…».",
    ],
  },
  "meinungstext/lesen": reading("überwiegen, der Kompromiss"),
  "meinungstext/practica": practice("armar un texto de opinión"),

  // ---------- Unidad 41: Registro y estilo
  "register/formelle-sprache": {
    intro: [
      "Una carta o un correo formal tiene fórmulas fijas: «Hiermit bewerbe ich mich um…» (por la presente me postulo a…), «Anbei finden Sie…» (adjunto encontrará…), «Ich wäre Ihnen dankbar, wenn Sie…» (le agradecería que…), «Für Rückfragen stehe ich Ihnen gern zur Verfügung» (para consultas estoy a su disposición).",
      "«Ich wäre Ihnen dankbar, wenn Sie mir helfen könnten» lleva Konjunktiv II en las dos partes: es un pedido muy cortés. Y «bitten um» y «sich entschuldigen für» llevan acusativo.",
    ],
    summary: [
      "«hiermit» = por la presente · «anbei» = adjunto.",
      "«Ich wäre Ihnen dankbar, wenn…» = le agradecería que…",
      "«bitten um» · «sich entschuldigen für» + acusativo.",
    ],
  },
  "register/modalpartikeln": {
    intro: [
      "Las partículas del habla («doch», «mal», «ja», «halt», «eben», «denn») no cambian el significado de la frase, pero le dan un tono: suavizan un pedido, expresan sorpresa o interés. Se usan sobre todo al hablar y van en el medio de la oración. No se traducen palabra por palabra.",
      "«Komm doch mal vorbei!» es una invitación amable; «Das ist ja toll!» expresa sorpresa; «Das ist halt so» significa «es así, qué se le va a hacer».",
    ],
    summary: [
      "doch (insistir con suavidad) · mal (suavizar un pedido) · ja (sorpresa).",
      "halt / eben = es así, no se puede cambiar · denn = interés en una pregunta.",
      "No se traducen literalmente.",
    ],
  },
  "register/redewendungen": {
    intro: [
      "Las expresiones fijas hay que aprenderlas enteras, porque su sentido no sale de las palabras sueltas: «Ich drücke dir die Daumen» (te deseo suerte), «Das ist mir egal» (me da lo mismo), «Das kommt darauf an» (depende), «Ich habe keine Ahnung» (no tengo idea), «Ich verstehe nur Bahnhof» (no entiendo nada), «Das ist nicht mein Ding» (no es lo mío).",
    ],
    summary: [
      "die Daumen drücken · egal sein · darauf ankommen · keine Ahnung haben.",
      "«Ich verstehe nur Bahnhof» = no entiendo nada.",
    ],
  },
  "register/register-regeln": {
    intro: [
      "Esta lección junta la unidad. El mismo mensaje se dice distinto según la situación: en lo formal se usa «Sie», el Konjunktiv II, sustantivos y fórmulas fijas («Könnten Sie mir bitte helfen?»); en lo informal, «du», frases cortas y partículas («Kannst du mir mal helfen?»).",
    ],
    summary: [
      "Formal: Sie, Konjunktiv II, fórmulas fijas.",
      "Informal: du, frases cortas, partículas (doch, mal, ja).",
      "Las expresiones fijas se aprenden enteras.",
    ],
  },
  "register/lesen": reading("die Einladung zum Vorstellungsgespräch, kurz und bündig"),
  "register/practica": practice("el registro formal e informal y las partículas"),

  // ---------- Unidad 42: Preparación para el examen B2
  "pruefung-b2/vortrag": {
    intro: [
      "Una presentación oral se estructura con fórmulas fijas: «Ich möchte Ihnen heute … vorstellen» (hoy quiero presentarle…), «Zunächst erkläre ich…» (primero explico…), «Danach zeige ich…» (después muestro…), «Abschließend fasse ich alles zusammen» (para terminar, resumo todo) y «Vielen Dank für Ihre Aufmerksamkeit» (muchas gracias por su atención).",
    ],
    summary: [
      "Zunächst → danach → abschließend: el orden de la presentación.",
      "«Vielen Dank für Ihre Aufmerksamkeit.» · «Haben Sie noch Fragen?»",
    ],
  },
  "pruefung-b2/grafik": {
    intro: [
      "Para describir una gráfica: «Die Grafik zeigt, dass…» (la gráfica muestra que…), «Der Anteil beträgt zwanzig Prozent» (la proporción es del 20 %), «steigen» y «sinken» (subir y bajar, con «sein»: «ist gestiegen», «ist gesunken»), «um… Prozent» (en tantos por ciento) y «im Vergleich zu» + dativo (en comparación con).",
      "«sich verdoppeln» significa «duplicarse».",
    ],
    summary: [
      "«Die Grafik zeigt, dass…» · «Der Anteil beträgt…».",
      "steigen → ist gestiegen · sinken → ist gesunken.",
      "«um zehn Prozent» · «im Vergleich zu» + dativo.",
    ],
  },
  "pruefung-b2/leserbrief": {
    intro: [
      "Una carta del lector responde a un artículo. Se abre con «Mit großem Interesse habe ich Ihren Artikel gelesen», se toma posición con «Dazu möchte ich Stellung nehmen» y se expresa un desacuerdo con «Ich bin anderer Meinung» o «Ich teile Ihre Meinung nicht».",
      "Para señalar una omisión: «Leider übersieht der Autor, dass…». Y se cierra con «Ich hoffe, dass Sie meinen Brief veröffentlichen».",
    ],
    summary: [
      "«Mit großem Interesse habe ich… gelesen» · «Dazu möchte ich Stellung nehmen».",
      "«Ich bin anderer Meinung» · «Ich teile Ihre Meinung nicht».",
      "«Leider übersieht der Autor, dass…».",
    ],
  },
  "pruefung-b2/wiederholung-b2": {
    intro: [
      "Repaso de B2: discurso indirecto (Konjunktiv I), participios como adjetivos, estilo nominal, pasiva completa, conectores avanzados y texto de opinión. Lo más importante, otra vez, es el lugar del verbo: al final tras «da», «zumal», «sofern», «solange», «wohingegen», «dass» y «ob»; enseguida tras «folglich», «somit», «dennoch», «jedoch», «hingegen», «zunächst» y «darüber hinaus»; y «nämlich» y «allerdings» van dentro de la oración.",
    ],
    summary: [
      "Konjunktiv I · participios · estilo nominal · pasiva completa · conectores · texto de opinión.",
      "Verbo al final: da, zumal, sofern, solange, wohingegen, dass, ob.",
      "Verbo enseguida: folglich, somit, dennoch, jedoch, hingegen, zunächst.",
    ],
  },
  "pruefung-b2/lesen": reading("der Umsatz, deutlich"),
  "pruefung-b2/practica": practice("presentaciones, gráficas y cartas del lector"),
};
