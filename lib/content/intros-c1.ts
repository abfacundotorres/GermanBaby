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
};
