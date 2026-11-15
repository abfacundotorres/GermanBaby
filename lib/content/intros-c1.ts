// Explicación previa y puntos para recordar de las lecciones de C1 (unidades 44 a 47).
import { READING_TIP, PRACTICE_TIP, type LessonNotes } from "./intros-a2.ts";

const reading = (words: string): LessonNotes => ({ intro: [READING_TIP], summary: [`Palabras nuevas de la lectura: ${words}.`] });
const practice = (topic: string): LessonNotes => ({ intro: [PRACTICE_TIP], summary: [`Repasaste lo de la unidad: ${topic}.`] });

export const INTROS_C1: Record<string, LessonNotes> = {
  // ---------- Unidad 44: Suposiciones
  "vermutung/sicher": {
    intro: [
      "En C1 los modales no solo hablan de obligación o capacidad: también expresan lo que suponés. «Er muss krank sein» no significa «tiene que enfermarse», sino «seguro que está enfermo». Es el uso subjetivo del modal.",
      "«müssen» + infinitivo expresa casi certeza; «können nicht» expresa imposibilidad. Para el pasado se usa el infinitivo perfecto: participio + «sein» o «haben» al final («Er muss gearbeitet haben»).",
    ],
    summary: [
      "«muss» + infinitivo = casi seguro · «kann nicht» = imposible.",
      "Pasado: infinitivo perfecto (gearbeitet haben, angekommen sein).",
    ],
  },
  "vermutung/wohl": {
    intro: [
      "Para suponer con menos seguridad hay varias opciones. «dürfte» + infinitivo (probablemente) es más débil que «muss»; «könnte» (podría) deja abierta la posibilidad. Sin modal: «wohl» (supongo, en el medio de la oración), «wahrscheinlich», «offenbar» (a todas luces) y «anscheinend» (al parecer).",
      "Al principio de la oración, estos adverbios cuentan como primer elemento: el verbo viene enseguida («Möglicherweise kommt er später»).",
    ],
    summary: [
      "dürfte = probable · könnte = posible · wohl = supongo.",
      "offenbar = evidentemente · anscheinend = al parecer.",
    ],
  },
  "vermutung/geruechte": {
    intro: [
      "«sollen» y «wollen» también tienen un uso subjetivo, y se distinguen por quién habla. «Er soll sehr reich sein» = dicen que es muy rico (un rumor). «Er will es nicht gewusst haben» = él afirma que no lo sabía (y quien habla lo duda).",
      "Con los dos se usa el infinitivo perfecto para el pasado: «Sie soll gestern abgereist sein», «Sie will ihn gesehen haben».",
    ],
    summary: [
      "«soll» + infinitivo = dicen que (rumor).",
      "«will» + infinitivo perfecto = afirma que (y se duda).",
    ],
  },
  "vermutung/vermutung-regeln": {
    intro: [
      "Esta lección junta la unidad: los modales para suponer, ordenados por grado de seguridad (muss, dürfte, kann / könnte, kann nicht, soll, will), el infinitivo perfecto para el pasado y los adverbios equivalentes (wohl, wahrscheinlich, offenbar, anscheinend).",
    ],
    summary: [
      "muss (casi seguro) · dürfte (probable) · könnte (posible) · kann nicht (imposible).",
      "soll (dicen) · will (afirma, dudoso).",
      "Pasado: infinitivo perfecto.",
    ],
  },
  "vermutung/lesen": reading("das Gerücht, vermuten"),
  "vermutung/practica": practice("los modales para suponer"),

  // ---------- Unidad 45: Relativos avanzados
  "relativ-plus/dessen-deren": {
    intro: [
      "«cuyo / cuya» se dice «dessen» (masculino y neutro) y «deren» (femenino y plural). Concuerdan con el sustantivo al que se refiere el relativo, no con lo poseído, y el sustantivo que sigue va sin artículo: «der Mann, dessen Auto…», «die Frau, deren Kinder…».",
      "El error más común es usar «deren» porque lo poseído es plural: «die Frau, deren Kinder» es correcto porque «die Frau» es femenino; si fuera «der Mann», sería «dessen Kinder».",
    ],
    summary: [
      "dessen = masculino y neutro · deren = femenino y plural.",
      "Concuerda con el poseedor, no con lo poseído.",
      "El sustantivo siguiente va sin artículo.",
    ],
  },
  "relativ-plus/wer-was-wo": {
    intro: [
      "«wer» + verbo al final significa «quien» (cualquier persona): «Wer das glaubt, irrt sich». «was» se usa después de «alles», «nichts», «etwas», y también para referirse a toda la oración anterior: «Er kam zu spät, was mich ärgerte». «wo» reemplaza a «in dem / in der» con lugares, y «warum» se usa después de «der Grund».",
    ],
    summary: [
      "«wer» = quien (en general) · «was» = lo que, y toda la oración anterior.",
      "«wo» para lugares · «der Grund, warum…».",
    ],
  },
  "relativ-plus/praep-relativ": {
    intro: [
      "Con una preposición, esta va delante del relativo y decide el caso: «die Firma, für die ich arbeite». Con el genitivo, la preposición va antes de «dessen / deren»: «mit deren Hilfe», «in deren Zentrum». Después de «nichts», «alles» o «etwas» se usa «wo(r)-» + preposición: «worüber», «worauf».",
    ],
    summary: [
      "Preposición + relativo: «für die», «über das».",
      "Con genitivo: «mit deren Hilfe», «auf dessen Hilfe».",
      "«worüber», «worauf» después de nichts / alles.",
    ],
  },
  "relativ-plus/relativ-plus-regeln": {
    intro: [
      "Esta lección junta la unidad: dessen / deren (cuyo), wer / was / wo y el relativo con preposición o con genitivo. Lo que importa para elegir es a qué se refiere el relativo (persona, cosa, toda la oración) y qué caso le corresponde en su propia oración.",
    ],
    summary: [
      "dessen / deren: poseedor, sin artículo después.",
      "wer = quien · was = lo que / toda la oración · wo = lugar.",
      "Con preposición: la preposición va primero.",
    ],
  },
  "relativ-plus/lesen": reading("hilfsbereit, die Nachbarschaft"),
  "relativ-plus/practica": practice("los relativos avanzados"),

  // ---------- Unidad 46: Irrealidad
  "irrealis/als-ob": {
    intro: [
      "«als ob» + Konjunktiv II significa «como si» y compara con algo irreal: «Er tut so, als ob er krank wäre» (hace como si estuviera enfermo). El verbo conjugado va al final. Con «als» solo, el verbo va enseguida: «als wäre er krank». Las dos formas significan lo mismo.",
      "Para el pasado se usa «wäre / hätte» + participio: «als ob nichts passiert wäre».",
    ],
    summary: [
      "«als ob» + Konjunktiv II (verbo al final) = como si.",
      "«als» + verbo enseguida: «als wäre er…».",
      "Pasado: «als ob nichts passiert wäre».",
    ],
  },
  "irrealis/wuensche-irreal": {
    intro: [
      "Para un deseo irreal del presente: «Wenn ich nur mehr Zeit hätte!». Para un lamento del pasado, con el verbo primero: «Hätte ich doch früher angefangen!». Con «ich wünschte» se dice lo mismo de forma directa: «Ich wünschte, ich wäre schon dort».",
      "Las palabras «nur» y «doch» refuerzan el deseo. Con verbos sin forma propia, se usa «würde» + infinitivo: «Wenn er nur anrufen würde!».",
    ],
    summary: [
      "«Wenn ich nur… hätte / wäre!» = ¡si tan solo…!",
      "«Hätte ich doch…» = ¡ojalá hubiera…! (pasado).",
      "«Ich wünschte, ich wäre…» = ojalá…",
    ],
  },
  "irrealis/beinahe": {
    intro: [
      "Para lo que casi pasó: «beinahe» o «fast» + «wäre / hätte» + participio: «Ich wäre beinahe gestürzt». «um ein Haar» refuerza la idea («por un pelo»).",
      "«ohne dass» (sin que) y «anstatt dass» (en vez de que) mandan el verbo al final. Si el sujeto es el mismo, se puede usar «ohne… zu» o «anstatt… zu» + infinitivo.",
    ],
    summary: [
      "«beinahe / fast» + wäre / hätte + participio = casi.",
      "«ohne dass» / «anstatt dass» + verbo al final.",
    ],
  },
  "irrealis/irrealis-regeln": {
    intro: [
      "Esta lección junta la unidad: «als ob» y «als» + Konjunktiv II, los deseos irreales con «wenn… nur», «hätte… doch» e «ich wünschte», y los casi y los sin que («beinahe», «ohne dass»). En todos usás el Konjunktiv II, y para el pasado, «wäre / hätte» + participio.",
    ],
    summary: [
      "als ob / als + Konjunktiv II.",
      "Wenn… nur / Hätte… doch / Ich wünschte.",
      "beinahe + wäre / hätte + participio · ohne dass / anstatt dass.",
    ],
  },
  "irrealis/lesen": reading("das Heimweh, einsam"),
  "irrealis/practica": practice("la irrealidad y el Konjunktiv II"),

  // ---------- Unidad 47: Lenguaje académico
  "akademisch/quellen": {
    intro: [
      "Para citar fuentes y referirte a un tema hay preposiciones formales con un caso fijo. «zufolge» (según) va después del sustantivo y pide dativo: «der Studie zufolge». «gemäß» también va con dativo. «anhand» (a partir de), «hinsichtlich» y «bezüglich» (en cuanto a), «anlässlich» (con motivo de) y «mittels» (mediante) van con genitivo.",
    ],
    summary: [
      "zufolge (después) · gemäß + dativo.",
      "anhand · hinsichtlich · bezüglich · anlässlich · mittels + genitivo.",
    ],
  },
  "akademisch/verbindung-c1": {
    intro: [
      "Los conectores formales conectan ideas con más precisión: «demnach» (por lo tanto) y «mithin» (por consiguiente) ocupan el primer lugar, así que el verbo viene enseguida. «insbesondere» (en especial) enfatiza. «beziehungsweise» y «sowie» unen elementos. «insofern… als» (en la medida en que) abre una subordinada, con el verbo al final. «entgegen» (contrariamente a) pide dativo.",
    ],
    summary: [
      "demnach · mithin: verbo enseguida.",
      "insofern… als: verbo al final.",
      "insbesondere · beziehungsweise · sowie · entgegen + dativo.",
    ],
  },
  "akademisch/forschung": {
    intro: [
      "En un texto académico, el verbo dice qué hace el estudio o el autor: «belegen» (demostrar con pruebas), «darlegen» (exponer, separable), «untersuchen» (investigar), «hinweisen auf» (indicar, separable) y «schließen» (concluir). «Es handelt sich um» + acusativo introduce de qué se trata, y «sich ergeben» significa «resultar, derivarse».",
    ],
    summary: [
      "belegen · darlegen · untersuchen · hinweisen auf · schließen.",
      "«Es handelt sich um…» = se trata de…",
      "«Daraus ergibt sich, dass…» = de ahí resulta que…",
    ],
  },
  "akademisch/akademisch-regeln": {
    intro: [
      "Esta lección junta la unidad: las preposiciones formales con su caso, los conectores formales con su efecto sobre el orden del verbo y los verbos para presentar resultados. El estilo académico prefiere estas estructuras a las frases más sencillas.",
    ],
    summary: [
      "zufolge / gemäß + dativo · anhand / hinsichtlich / bezüglich / anlässlich / mittels + genitivo.",
      "demnach / mithin: verbo enseguida · insofern… als: verbo al final.",
      "belegen · darlegen · untersuchen · hinweisen auf.",
    ],
  },
  "akademisch/lesen": reading("die Nutzung, zunehmen"),
  "akademisch/practica": practice("el lenguaje académico"),

  // ---------- Puente a C1
  "bruecke-c1/gesellschaft": {
    intro: [
      "Esta unidad es un puente: no trae estructuras nuevas, sino textos más largos y vocabulario más abstracto con la gramática de B2. Los diálogos tienen 8 líneas y hablan de la sociedad, el trabajo y el clima, como en la radio o en un informe.",
      "En esta lección vas a ver tres cosas que ya conocés de B2 funcionando juntas: la pasiva impersonal («Es wird behauptet…»), el Konjunktiv I para citar una fuente («Laut dem Bericht sei…») y «sich lassen» («Das lässt sich nicht lösen»).",
    ],
    summary: [
      "«Es wird behauptet, dass…» = se afirma que… (pasiva impersonal).",
      "«Laut dem Bericht sei…» = según el informe, … (Konjunktiv I).",
      "«lässt sich» + infinitivo = se puede.",
    ],
  },
  "bruecke-c1/arbeitswelt": {
    intro: [
      "Para hablar del trabajo y la economía en un nivel más alto, el Konjunktiv II sirve para recomendar con fuerza («Die Unternehmen müssten investieren») y para expresar condiciones sin «wenn»: el verbo va primero («Wären die Löhne höher, würden…»).",
      "También vuelven las preposiciones formales de B2: «trotz» y «angesichts» con genitivo.",
    ],
    summary: [
      "«müssten» + infinitivo = tendrían que (recomendación fuerte).",
      "«Wäre / Hätte… , würde…» = condición irreal sin «wenn».",
      "trotz / angesichts + genitivo.",
    ],
  },
  "bruecke-c1/umwelt-c1": {
    intro: [
      "El tema del clima usa estructuras que ya viste: la pasiva con modal («Es muss mehr getan werden»), «sollen» + pasiva («Die Emissionen sollen gesenkt werden»), «wer» como relativo general («Wer sich bewusst ernährt, trägt bei») y el Konjunktiv I («warnen davor, dass… steige»).",
      "Una novedad útil: un infinitivo con «zu» puede ser el sujeto de la oración («Nachhaltig zu leben bedeutet…»).",
    ],
    summary: [
      "Pasiva con modal: «Es muss mehr getan werden».",
      "Infinitivo con «zu» como sujeto: «Nachhaltig zu leben bedeutet…».",
      "«warnen davor, dass… steige» (Konjunktiv I).",
    ],
  },
  "bruecke-c1/bruecke-regeln": {
    intro: [
      "Esta lección junta lo que cambia de B2 a C1. No es una gramática nueva, sino más precisión: el modal que supone en lugar de obligar, el relativo posesivo, las preposiciones más formales y los conectores que enlazan las ideas de un texto largo.",
    ],
    summary: [
      "C1 refina las estructuras de B2: más precisión y más matices.",
      "Conectores que remiten a lo dicho: dadurch, darüber, daher, demnach.",
      "Registro: rasch, behaupten, ergreifen, grundlegend.",
    ],
  },
  "bruecke-c1/lesen": reading("der Arbeitsmarkt, die Zuwanderung"),
  "bruecke-c1/practica": practice("el puente de B2 a C1"),

  // ---------- Concesiones y matices
  "konzessiv/obgleich": {
    intro: [
      "Hasta B2 conocías «obwohl» y «trotzdem». En C1 hay más formas de reconocer algo y sostener tu posición: «obgleich» y «wenngleich» (más formales que «obwohl»), «auch wenn» y «selbst wenn» (hipotético, con Konjunktiv II) y «so sehr… auch» (por mucho que).",
      "Todas abren una subordinada: el verbo conjugado va al final. «Wie dem auch sei» y «Ob er will oder nicht» son fórmulas fijas.",
    ],
    summary: [
      "obgleich / wenngleich = aunque / si bien (verbo al final).",
      "«selbst wenn» + Konjunktiv II = aunque viniera.",
      "«so sehr… auch» = por mucho que.",
    ],
  },
  "konzessiv/gleichwohl": {
    intro: [
      "Los adverbios concesivos ocupan el primer lugar de la oración, así que el verbo viene enseguida: «gleichwohl» y «nichtsdestotrotz» (aun así, no obstante). «zwar… doch / aber» y «mag… aber» reconocen algo antes de contradecirlo, y no cambian el orden.",
    ],
    summary: [
      "gleichwohl / nichtsdestotrotz: verbo enseguida.",
      "«zwar… doch» · «Das mag stimmen, aber…».",
      "«Trotz alledem» = a pesar de todo.",
    ],
  },
  "konzessiv/konzessiv-regeln": {
    intro: [
      "Esta lección junta la unidad: los conectores concesivos que abren una subordinada (verbo al final), los adverbios que ocupan el primer lugar (verbo enseguida) y las fórmulas fijas. Con «selbst wenn» o «auch wenn» hipotéticos, el verbo va en Konjunktiv II.",
    ],
    summary: [
      "obgleich / wenngleich / auch wenn / selbst wenn: verbo al final.",
      "gleichwohl / nichtsdestotrotz / dennoch: verbo enseguida.",
      "Fórmulas: Wie dem auch sei · Ob er will oder nicht.",
    ],
  },
  "konzessiv/lesen": reading("die Skepsis, das Risiko"),
  "konzessiv/practica": practice("las concesiones"),

  // ---------- Formación de palabras
  "wortbildung/substantive": {
    intro: [
      "En alemán se pueden formar muchas palabras nuevas con sufijos, y el sufijo te dice el género. Los sustantivos en «-keit», «-heit», «-ung» y «-schaft» son femeninos («die Freundlichkeit», «die Schönheit», «die Entwicklung», «die Freundschaft»). «-tum» da masculinos («der Reichtum»), y «-nis», neutros o femeninos.",
      "En las palabras compuestas, el género y el plural los da el último elemento («der Arbeitsplatz»), y a veces hay una «s» de unión.",
    ],
    summary: [
      "-keit / -heit / -ung / -schaft = femenino.",
      "-tum = masculino · -nis = neutro o femenino.",
      "En un compuesto manda el último elemento.",
    ],
  },
  "wortbildung/adjektive-c1": {
    intro: [
      "Los adjetivos derivados te permiten deducir el sentido: «-bar» (que se puede: «lösbar»), «-los» (sin: «kostenlos»), «-voll» y «-reich» (lleno de: «gefühlvoll», «erfolgreich») y «-sam» (con tendencia a: «erholsam»). El prefijo «un-» niega.",
      "Los prefijos de verbos no se separan y cambian el sentido: «ver-» (error o cambio), «zer-» (destrucción), «ent-» (separación o comienzo), «miss-» (hacer mal).",
    ],
    summary: [
      "-bar = que se puede · -los = sin · -voll / -reich = lleno de · -sam = tendencia.",
      "ver- (error) · zer- (destrucción) · ent- (separación) · miss- (mal).",
    ],
  },
  "wortbildung/wortbildung-regeln": {
    intro: [
      "Esta lección junta la unidad: los sufijos de sustantivos con su género, los sufijos de adjetivos con su sentido y los prefijos de verbos. Con eso podés deducir el significado y el género de muchas palabras que nunca viste.",
    ],
    summary: [
      "Sufijo → género: -keit / -heit / -ung / -schaft femenino, -tum masculino.",
      "-bar / -los / -voll / -reich / -sam.",
      "ver- / zer- / ent- / miss-.",
    ],
  },
  "wortbildung/lesen": reading("die Gelassenheit, unermüdlich"),
  "wortbildung/practica": practice("la formación de palabras"),

  // ---------- Locuciones verbales
  "funktionsverben/gefuege1": {
    intro: [
      "Una locución verbal (Funktionsverbgefüge) junta un sustantivo, a menudo con preposición, y un verbo casi vacío: el sentido lo lleva el sustantivo. Se usan mucho en el lenguaje formal y escrito, y hay que aprenderlas enteras, con su preposición y su artículo.",
      "Esta lección trae las más frecuentes para discutir y decidir: «in Betracht ziehen», «zur Sprache bringen», «in Kauf nehmen», «Anklang finden», «unter Beweis stellen», «in Frage stellen» y «Rechnung tragen».",
    ],
    summary: [
      "in Betracht ziehen (considerar) · zur Sprache bringen (plantear).",
      "unter Beweis stellen (demostrar) · in Frage stellen (cuestionar).",
      "Se aprenden enteras, con su preposición.",
    ],
  },
  "funktionsverben/gefuege2": {
    intro: [
      "Más locuciones formales, ahora para política, leyes y proyectos: «Stellung beziehen» (tomar posición), «zur Diskussion stehen» (estar en discusión), «Abstand nehmen von» (desistir de), «Ausdruck geben» (expresar), «in Kraft treten» (entrar en vigor), «in Schwierigkeiten geraten» e «in Angriff nehmen».",
    ],
    summary: [
      "Stellung beziehen · zur Diskussion stehen · in Kraft treten.",
      "Abstand nehmen von · Ausdruck geben · in Angriff nehmen.",
    ],
  },
  "funktionsverben/funktionsverben-regeln": {
    intro: [
      "Esta lección junta la unidad: qué son las locuciones verbales, cómo cambia el matiz según el verbo («zur Sprache kommen» / «zur Sprache bringen») y cómo se usan con pasiva y con modales («Das Risiko muss in Betracht gezogen werden»).",
    ],
    summary: [
      "El sustantivo lleva el sentido; el verbo da el matiz.",
      "Funcionan con pasiva y modales.",
      "Se usan sobre todo en el lenguaje formal.",
    ],
  },
  "funktionsverben/lesen": reading("der Beschluss, die Umsetzung"),
  "funktionsverben/practica": practice("las locuciones verbales"),

  // ---------- Expresiones idiomáticas
  "redewendungen-c1/idiome1": {
    intro: [
      "El significado de una expresión idiomática no sale de sus palabras sueltas: «Das ist mir Wurst» no habla de salchichas, sino de que algo da lo mismo. Además, no se puede cambiar ninguna palabra. Hay que aprender la expresión completa.",
      "En esta lección, expresiones con partes del cuerpo y objetos: «auf der Hand liegen», «den Nagel auf den Kopf treffen», «auf die Nerven gehen», «im selben Boot sitzen», «ein dickes Fell haben», «die Nase voll haben».",
    ],
    summary: [
      "auf der Hand liegen = ser obvio · den Nagel auf den Kopf treffen = dar en el clavo.",
      "auf die Nerven gehen = sacar de quicio · die Nase voll haben = estar harto.",
      "No se traducen palabra por palabra.",
    ],
  },
  "redewendungen-c1/idiome2": {
    intro: [
      "Expresiones para situaciones y resultados: «ins Wasser fallen» (arruinarse un plan), «Glück im Unglück haben», «ein Tropfen auf den heißen Stein» (algo insuficiente), «Nägel mit Köpfen machen» (concretar), «Wort halten» (cumplir una promesa), «ein Kinderspiel» (pan comido) y el refrán «Ende gut, alles gut».",
    ],
    summary: [
      "ins Wasser fallen · Glück im Unglück haben · ein Kinderspiel.",
      "Wort halten · Nägel mit Köpfen machen · ein Tropfen auf den heißen Stein.",
    ],
  },
  "redewendungen-c1/idiome-regeln": {
    intro: [
      "Esta lección junta cómo funcionan las expresiones fijas: se aprenden enteras, algunas tienen un equivalente en español con la misma imagen y otras con una distinta, y algunas son coloquiales y no van en un texto formal.",
    ],
    summary: [
      "No cambian ninguna palabra.",
      "Algunas tienen una imagen distinta en español.",
      "Las coloquiales no van en lo formal.",
    ],
  },
  "redewendungen-c1/lesen": reading("die Redewendung, wörtlich"),
  "redewendungen-c1/practica": practice("las expresiones idiomáticas"),
};
