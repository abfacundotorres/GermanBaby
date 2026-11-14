// Explicación previa y puntos para recordar de las lecciones de B1 (unidades 24 a 34).
// Mismo formato que intros.ts: clave «unidad/lección».

import { READING_TIP, PRACTICE_TIP, type LessonNotes } from "./intros-a2.ts";

const reading = (words: string): LessonNotes => ({ intro: [READING_TIP], summary: [`Palabras nuevas de la lectura: ${words}.`] });
const practice = (topic: string): LessonNotes => ({ intro: [PRACTICE_TIP], summary: [`Repasaste lo de la unidad: ${topic}.`] });

export const INTROS_B1: Record<string, LessonNotes> = {
  // ---------- Unidad 24: Contar una historia
  "erzaehlen/praet-regelmaessig": {
    intro: [
      "El Präteritum es el pasado de los cuentos, las noticias y los textos escritos. Al hablar se prefiere el Perfekt, pero para leer y entender historias lo vas a necesitar todo el tiempo. Los cuentos empiezan con «Es war einmal…».",
      "En los verbos regulares se agrega «-te» a la raíz: «wohnen» → «ich wohnte», «du wohntest», «wir wohnten». Si la raíz termina en «-t» o «-d», se agrega «-ete» para poder pronunciarlo: «arbeiten» → «arbeitete». Con «ich» y «er» la forma es la misma.",
    ],
    summary: [
      "Präteritum regular: raíz + -te (wohnte, spielte, kaufte, lernte, sagte, fragte).",
      "Raíz en -t / -d: -ete (arbeitete).",
      "«ich» y «er» tienen la misma forma.",
    ],
  },
  "erzaehlen/praet-unregelmaessig": {
    intro: [
      "Los verbos irregulares (o «fuertes») no llevan «-te»: cambian la vocal de la raíz. «gehen» → «ging», «kommen» → «kam», «sehen» → «sah», «essen» → «aß», «trinken» → «trank», «schreiben» → «schrieb», «fahren» → «fuhr», «bleiben» → «blieb».",
      "Con «ich» y «er» no llevan terminación; con «wir» y «sie» agregan «-en»: «wir gingen». No hay regla para predecirlos: se aprenden de a poco, junto con su participio.",
    ],
    summary: [
      "ging · kam · sah · aß · trank · schrieb · fuhr · blieb.",
      "«ich» y «er»: sin terminación · «wir» y «sie»: -en.",
    ],
  },
  "erzaehlen/als-nachdem": {
    intro: [
      "Para ordenar hechos en el tiempo hay cuatro conjunciones, y las cuatro mandan el verbo conjugado al final: «als» (cuando, un hecho único del pasado), «während» (mientras), «bevor» (antes de que) y «nachdem» (después de que).",
      "«nachdem» pide el Plusquamperfekt, el pasado del pasado: «hatte» o «war» + participio: «Nachdem ich gegessen hatte, ging ich schlafen». Y para algo que se repetía («cada vez que») se usa «wenn», no «als».",
    ],
    summary: [
      "als (una vez) · während (mientras) · bevor (antes) · nachdem (después): verbo al final.",
      "«nachdem» + hatte / war + participio.",
      "«wenn» para lo repetido; «als» para un hecho único.",
    ],
  },
  "erzaehlen/praeteritum-regeln": {
    intro: [
      "Esta lección junta la unidad: cómo se forma el Präteritum (regular con «-te», irregular con cambio de vocal) y cuándo conviene usarlo. Al escribir historias, noticias y biografías se usa el Präteritum; al hablar, el Perfekt, salvo con «sein», «haben» y los modales.",
      "Y repasa las cinco conjunciones de tiempo: «als», «wenn», «während», «bevor» y «nachdem».",
    ],
    summary: [
      "Escrito: Präteritum · Hablado: Perfekt (salvo sein, haben y modales).",
      "Irregulares: ging, kam, sah, aß, trank, schrieb, fuhr, blieb, fand.",
      "als / wenn / während / bevor / nachdem: verbo al final.",
    ],
  },
  "erzaehlen/lesen": reading("die Erinnerung, unvergesslich"),
  "erzaehlen/practica": practice("el Präteritum y las conjunciones de tiempo"),

  // ---------- Unidad 25: Deseos y consejos
  "wuensche/haette-waere": {
    intro: [
      "El Konjunktiv II sirve para hablar de cosas que no son reales: deseos, hipótesis y consejos. Tiene pocas formas propias: «hätte» (de «haben»), «wäre» (de «sein») y los modales. Para el resto de los verbos se usa «würde» + infinitivo al final.",
      "«Ich hätte gern einen Kaffee» es una forma muy cortés de pedir. Y la condición irreal se arma así: «Wenn ich viel Geld hätte, würde ich reisen» (si tuviera mucho dinero, viajaría).",
    ],
    summary: [
      "hätte (haben) · wäre (sein) · würde + infinitivo (los demás).",
      "«Wenn ich Geld hätte, würde ich reisen» = si tuviera dinero, viajaría.",
      "«Ich hätte gern…» = quisiera… (pedido cortés).",
    ],
  },
  "wuensche/ratschlaege": {
    intro: [
      "Para aconsejar sin sonar autoritario se usa el Konjunktiv II: «Du solltest mehr schlafen» (deberías dormir más) suena mucho más suave que «Du sollst…». Para sugerir: «Du könntest Sport machen» (podrías hacer deporte).",
      "Y hay una fórmula muy útil: «An deiner Stelle würde ich…» (en tu lugar, yo…). Para pedir un consejo: «Kannst du mir einen Rat geben?».",
    ],
    summary: [
      "«Du solltest…» = deberías… · «Du könntest…» = podrías…",
      "«An deiner Stelle würde ich…» = en tu lugar, yo…",
      "«Kannst du mir einen Rat geben?» = ¿podés darme un consejo?",
    ],
  },
  "wuensche/hoefliche-bitten": {
    intro: [
      "Con el Konjunktiv II los pedidos suenan corteses: «Könnten Sie mir helfen?» es más suave que «Können Sie mir helfen?». Lo mismo con «würden» + infinitivo al final: «Würden Sie bitte das Fenster öffnen?».",
      "Para pedir permiso con mucha cortesía: «Dürfte ich Sie etwas fragen?». Y para decir que algo sería agradable: «Das wäre sehr nett». En situaciones formales o con desconocidos, conviene usar estas formas.",
    ],
    summary: [
      "«Könnten Sie…?» · «Würden Sie bitte…?» · «Hätten Sie…?»: pedidos corteses.",
      "«Dürfte ich…?» = ¿podría…? (permiso).",
      "«Das wäre sehr nett» = sería muy amable.",
    ],
  },
  "wuensche/konjunktiv-regeln": {
    intro: [
      "Esta lección junta lo de la unidad. El Konjunktiv II se forma a partir del Präteritum, con diéresis cuando se puede (ä, ö, ü): «hatte» → «hätte», «war» → «wäre», «konnte» → «könnte», «sollte» → «sollte». Con los demás verbos se usa «würde» + infinitivo.",
      "Regla práctica: si la condición es posible, se usa el indicativo («Wenn ich Zeit habe, gehe ich schwimmen»). Si es hipotética o contraria a la realidad, el Konjunktiv II en las dos partes: «Wenn ich Zeit hätte, würde ich schwimmen».",
    ],
    summary: [
      "hätte · wäre · könnte · sollte · würde: las formas más usadas.",
      "Posible → indicativo · irreal → Konjunktiv II en las dos partes.",
      "«würde» + infinitivo al final para el resto de los verbos.",
    ],
  },
  "wuensche/lesen": reading("die Weltreise, der Traum, sparen, frei"),
  "wuensche/practica": practice("el Konjunktiv II: deseos, consejos y pedidos corteses"),

  // ---------- Unidad 26: Describir con relativos
  "relativ/relativ-nominativ": {
    intro: [
      "Una oración de relativo describe a una persona o cosa: «Das ist der Mann, der hier wohnt» (este es el hombre que vive acá). En español el relativo es «que»; en alemán es «der / die / das», y concuerda con el género del sustantivo al que se refiere.",
      "Se escribe siempre con coma delante y el verbo conjugado va al final: «…, der hier wohnt». Si el relativo es el sujeto, la forma es la misma que el artículo normal: «der» (masculino), «die» (femenino y plural), «das» (neutro).",
    ],
    summary: [
      "Relativo sujeto: der (masc.) · die (fem. y plural) · das (neutro).",
      "Coma delante y verbo conjugado al final.",
      "«Das ist der Mann, der hier wohnt.»",
    ],
  },
  "relativ/relativ-akkusativ": {
    intro: [
      "El relativo toma el género y el número del sustantivo al que se refiere, pero el caso que le corresponde dentro de su propia oración. Si es el objeto directo, el masculino pasa a «den»: «Das ist der Film, den ich gesehen habe». Femenino, neutro y plural no cambian: «die», «das», «die».",
      "En dativo (verbos como «helfen») el relativo es «dem / der / dem / denen»: «Der Freund, dem ich helfe, ist krank». Y con una preposición, esta va delante del relativo y decide el caso: «Der Mann, mit dem ich arbeite».",
    ],
    summary: [
      "Objeto directo: den (masc.) · die · das · die.",
      "Dativo: dem · der · dem · denen.",
      "Con preposición: «der Mann, mit dem ich arbeite» · «die Stadt, in der ich wohne».",
    ],
  },
  "relativ/was-jemand": {
    intro: [
      "Después de «alles», «nichts», «etwas», «das Beste» y «das», el relativo no es «der / die / das», sino «was»: «Das ist alles, was ich weiß» (eso es todo lo que sé). «das, was» significa «lo que».",
      "Para hablar de una persona indefinida se usa «jemand, der…»: «Er ist jemand, der immer hilft». Y si en la subordinada hay un modal, el modal queda al final: «Ich habe nichts, was ich dir geben kann».",
    ],
    summary: [
      "alles / nichts / etwas / das Beste / das + «was».",
      "«jemand, der…» = alguien que…",
      "Con modal: el modal queda al final de la subordinada.",
    ],
  },
  "relativ/relativsatz-regeln": {
    intro: [
      "Esta lección junta la regla: el relativo toma el género y el número del sustantivo, y el caso que le corresponde en su propia oración. Va después de una coma y el verbo conjugado queda al final.",
      "Si el verbo lleva preposición, esta va delante del relativo y decide el caso. Con «alles», «nichts» y «das Beste» se usa «was».",
    ],
    summary: [
      "Género y número: del sustantivo · caso: de su propia oración.",
      "Con preposición: «mit dem», «in der», «über den».",
      "«was» después de alles / nichts / das Beste.",
    ],
  },
  "relativ/lesen": reading("freundlich, lange"),
  "relativ/practica": practice("las oraciones de relativo"),

  // ---------- Unidad 27: La voz pasiva
  "passiv/passiv-praesens": {
    intro: [
      "La voz pasiva se usa cuando importa más la acción que quién la hace: «Hier wird Deutsch gesprochen» (acá se habla alemán). Se forma con «werden» conjugado y el participio al final. Equivale al «se» impersonal o pasivo del español.",
      "Si querés decir quién lo hace, se agrega «von» + dativo: «Das Essen wird von meiner Mutter gekocht». Y los verbos en «-ieren» no llevan «ge-»: «renovieren» → «renoviert».",
    ],
    summary: [
      "Passiv = «werden» + participio al final.",
      "El agente: «von» + dativo.",
      "«Hier wird Deutsch gesprochen» = acá se habla alemán.",
    ],
  },
  "passiv/passiv-vergangenheit": {
    intro: [
      "Para el pasado se cambia «wird» por «wurde» y el participio queda al final: «Das Haus wurde 1920 gebaut». Con un modal, «werden» pasa al final como infinitivo: «Das muss gemacht werden» (eso hay que hacerlo).",
      "Es muy común en carteles y reglas: «Hier darf nicht gegessen werden» (acá no se puede comer). Y «Es wird gesagt, dass…» significa «se dice que…».",
    ],
    summary: [
      "Pasado: «wurde» + participio.",
      "Con modal: modal + participio + «werden» al final.",
      "«Es wird gesagt, dass…» = se dice que…",
    ],
  },
  "passiv/zustand-schilder": {
    intro: [
      "Para decir cómo está algo después de la acción se usa «sein» + participio, no «werden»: «Die Tür wird geöffnet» (se está abriendo), pero «Die Tür ist geöffnet» (ya está abierta). Es el lenguaje de los carteles: «geöffnet», «geschlossen», «verboten».",
      "«man» significa «uno» o «se» (impersonal): «Man darf hier nicht rauchen» (acá no se puede fumar).",
    ],
    summary: [
      "«sein» + participio = estado (resultado).",
      "geöffnet = abierto · geschlossen = cerrado · verboten = prohibido.",
      "«Man darf hier nicht…» = acá no se puede…",
    ],
  },
  "passiv/passiv-regeln": {
    intro: [
      "Esta lección junta la voz pasiva: presente («wird gebaut»), pasado («wurde gebaut»), Perfekt («ist gebaut worden»), con modal («muss gebaut werden») y el estado con «sein» («ist gebaut»).",
      "Solo cambia «werden»; el participio se mantiene al final. Si el agente importa, se agrega «von» + dativo.",
    ],
    summary: [
      "wird gebaut · wurde gebaut · ist gebaut worden · muss gebaut werden.",
      "Acción: «werden» · estado: «sein».",
      "Agente: «von» + dativo.",
    ],
  },
  "passiv/lesen": reading("das Rathaus, montags"),
  "passiv/practica": practice("la voz pasiva y los carteles"),

  // ---------- Unidad 28: Contrastes y metas
  "ziele/obwohl": {
    intro: [
      "Hay dos formas de expresar un contraste, y se comportan distinto. «obwohl» (aunque) manda el verbo conjugado al final: «Ich gehe zur Arbeit, obwohl ich krank bin». «trotzdem» (a pesar de eso) ocupa el primer lugar de su oración, así que el verbo viene enseguida: «Ich bin krank, trotzdem gehe ich zur Arbeit».",
      "Si la oración con «obwohl» va primero, el verbo de la principal va justo después de la coma: «Obwohl ich müde bin, lerne ich Deutsch».",
    ],
    summary: [
      "«obwohl» + verbo al final · «trotzdem» + verbo enseguida.",
      "Con «obwohl» primero: el verbo de la principal va justo después de la coma.",
      "wenig = poco · glücklich = feliz.",
    ],
  },
  "ziele/damit-um-zu": {
    intro: [
      "Para decir «para qué» hacés algo hay dos estructuras. Si el sujeto es el mismo: «um… zu» + infinitivo al final («Ich lerne Deutsch, um in Deutschland zu arbeiten»). Si los sujetos son distintos: «damit» + oración con el verbo al final («Ich rufe dich an, damit du nicht warten musst»).",
      "Para preguntar «¿para qué?» se usa «wozu».",
    ],
    summary: [
      "mismo sujeto: «um… zu» + infinitivo.",
      "sujetos distintos: «damit» + verbo al final.",
      "«Wozu…?» = ¿para qué?",
    ],
  },
  "ziele/infinitiv-zu": {
    intro: [
      "Después de expresiones como «Lust haben», «wichtig sein», «vergessen» y «vorhaben», el segundo verbo va en infinitivo con «zu» al final, después de una coma: «Ich habe keine Lust, zu arbeiten».",
      "Con un verbo separable, «zu» se mete entre el prefijo y la raíz: «aufzustehen», «anzurufen». También hay dos estructuras útiles: «ohne… zu» (sin + verbo) y «statt… zu» (en vez de + verbo).",
    ],
    summary: [
      "Lust haben / wichtig sein / vergessen / vorhaben + «zu» + infinitivo.",
      "Separables: «aufzustehen», «anzurufen».",
      "«ohne… zu» = sin… · «statt… zu» = en vez de…",
    ],
  },
  "ziele/ziele-regeln": {
    intro: [
      "Esta lección junta las tres estructuras de la unidad: contraste («obwohl», «trotzdem»), finalidad («um… zu», «damit») e infinitivo con «zu». Lo importante es el lugar del verbo en cada una.",
    ],
    summary: [
      "obwohl: verbo al final · trotzdem: verbo enseguida.",
      "um… zu: mismo sujeto · damit: sujetos distintos.",
      "«zu» + infinitivo al final; con separables: «aufzustehen».",
    ],
  },
  "ziele/lesen": reading("laufen, fit"),
  "ziele/practica": practice("contraste, finalidad y el infinitivo con «zu»"),

  // ---------- Unidad 29: Posesión y causas
  "genitiv/genitiv-besitz": {
    intro: [
      "El genitivo expresa posesión («de») y responde a «wessen?» (¿de quién?). Con el masculino y el neutro, el artículo es «des» y el sustantivo suma «-s» o «-es»: «das Auto meines Vaters». Con el femenino y el plural, el artículo es «der» y el sustantivo no cambia: «die Tasche meiner Mutter».",
      "En el habla cotidiana se reemplaza muchas veces con «von» + dativo («das Auto von meinem Vater»), pero en textos escritos y en el examen el genitivo es lo esperado.",
    ],
    summary: [
      "masc. y neutro: des / meines + sustantivo con -s o -es.",
      "fem. y plural: der / meiner (el sustantivo no cambia).",
      "«Wessen Buch ist das?» = ¿de quién es este libro?",
    ],
  },
  "genitiv/wegen-trotz": {
    intro: [
      "Algunas preposiciones piden genitivo: «wegen» (por, a causa de), «trotz» (a pesar de), «statt» (en vez de) y «während» (durante). Se usan con un sustantivo: «Wegen des Regens bleibe ich zu Hause».",
      "Fijate que «wegen» y «trotz» hacen lo mismo que «weil» y «obwohl», pero con un sustantivo en lugar de una oración entera. Y «während» puede ser una conjunción (con el verbo al final) o una preposición (con genitivo).",
    ],
    summary: [
      "wegen (por) · trotz (a pesar de) · statt (en vez de) · während (durante) + genitivo.",
      "«wegen des Regens» = por la lluvia (sustantivo, no oración).",
    ],
  },
  "genitiv/adjektive-dativ": {
    intro: [
      "En dativo y en genitivo, el adjetivo termina en «-en» casi siempre: «mit dem alten Auto», «in einer kleinen Wohnung», «das Haus des jungen Mannes». Es más simple que en nominativo y acusativo.",
      "La excepción habitual es el femenino con artículo: «der» (dativo y genitivo) pide «-en» igual: «der netten Frau».",
    ],
    summary: [
      "Dativo y genitivo: adjetivo en «-en» (mit dem alten Auto).",
      "«in einer kleinen Wohnung» · «das Haus des jungen Mannes».",
    ],
  },
  "genitiv/genitiv-regeln": {
    intro: [
      "Esta lección junta lo de la unidad: el genitivo para la posesión, las preposiciones con genitivo y las terminaciones «-en» en dativo y genitivo.",
    ],
    summary: [
      "Genitivo: des / der + sustantivo (con -s o -es en masc. y neutro).",
      "wegen · trotz · statt · während + genitivo.",
      "Adjetivos en dativo y genitivo: «-en».",
    ],
  },
  "genitiv/lesen": reading("das Fundbüro, traurig, verlieren"),
  "genitiv/practica": practice("el genitivo, wegen, trotz y las terminaciones del adjetivo"),

  // ---------- Unidad 30: Opinar y argumentar
  "meinung/meinung-aeussern": {
    intro: [
      "Para dar tu opinión: «Meiner Meinung nach…» (en mi opinión) o «Ich bin der Meinung, dass…». Para reaccionar: «Da hast du recht» (ahí tenés razón), «Ich stimme dir zu» (estoy de acuerdo), «Das sehe ich anders» (yo lo veo distinto).",
      "«dafür» y «dagegen» significan «a favor» y «en contra». «zustimmen» lleva dativo y es separable: «Ich stimme dir zu».",
    ],
    summary: [
      "«Meiner Meinung nach…» = en mi opinión.",
      "«Ich stimme dir zu» · «Da hast du recht» · «Das sehe ich anders».",
      "dafür = a favor · dagegen = en contra.",
    ],
  },
  "meinung/argumente": {
    intro: [
      "Para ordenar argumentos: «einerseits… andererseits» (por un lado… por otro), «zwar… aber» (sí… pero) y «außerdem» (además). Después de «außerdem» el verbo viene enseguida, porque ocupa el primer lugar.",
      "«der Vorteil» y «der Nachteil» son la ventaja y la desventaja. «zum Beispiel» introduce un ejemplo.",
    ],
    summary: [
      "einerseits… andererseits · zwar… aber · außerdem.",
      "der Vorteil · der Nachteil · zum Beispiel.",
    ],
  },
  "meinung/diskussion": {
    intro: [
      "Una pregunta indirecta mete una pregunta dentro de otra oración. Si es de sí o no, se usa «ob» y el verbo va al final: «Ich weiß nicht, ob er kommt». Si lleva palabra interrogativa (wann, wo, warum), se usa esa palabra y el verbo también va al final.",
      "Para expresar dudas: «Ich bin nicht sicher, ob das stimmt». Y para participar de un debate: «Was meinst du?», «Das glaube ich nicht», «Das ist ein gutes Argument».",
    ],
    summary: [
      "«ob» = si (pregunta indirecta), con el verbo al final.",
      "«Ich bin nicht sicher, ob…» = no estoy seguro de que…",
    ],
  },
  "meinung/argumentieren-regeln": {
    intro: [
      "Esta lección junta los conectores para argumentar, agrupados por función (razón, contraste, adición) y por su efecto sobre el verbo. También repasa las preguntas indirectas con «ob» y cómo se arma un texto de opinión: tu opinión, dos o tres argumentos con ejemplos y una conclusión.",
    ],
    summary: [
      "weil / obwohl / ob: verbo al final · trotzdem / außerdem / deshalb: verbo enseguida.",
      "Texto de opinión: opinión, argumentos con ejemplos, conclusión.",
    ],
  },
  "meinung/lesen": reading("das Fahrrad, die Umwelt"),
  "meinung/practica": practice("dar opiniones, argumentar y preguntas indirectas"),

  // ---------- Unidad 31: Preparación para el examen B1
  "pruefung-b1/beschwerde": {
    intro: [
      "Para hacer un reclamo con cortesía: «Ich möchte mich beschweren» (quisiera presentar un reclamo), describí el problema («Das Gerät funktioniert nicht») y pedí una solución («Ich möchte mein Geld zurück»). Usá el Konjunktiv II y «Sie»: suena más amable y se logra más.",
      "«sich beschweren» es reflexivo. Y «kaputt» significa «roto».",
    ],
    summary: [
      "«Ich möchte mich beschweren» = quisiera presentar un reclamo.",
      "«Das Gerät funktioniert nicht» = el aparato no funciona.",
      "«Ich möchte mein Geld zurück» = quisiera que me devuelvan el dinero.",
    ],
  },
  "pruefung-b1/formeller-brief": {
    intro: [
      "Una carta formal tiene partes fijas: saludo («Sehr geehrte Damen und Herren,»), asunto («der Betreff»), motivo («Ich schreibe Ihnen, weil…»), pedido («Bitte schicken Sie mir…») y cierre («Mit freundlichen Grüßen»).",
      "Para cerrar con cortesía: «Ich bedanke mich im Voraus» (le agradezco de antemano) o «Ich warte auf Ihre Antwort».",
    ],
    summary: [
      "Saludo · Betreff · motivo · pedido · cierre.",
      "«Bitte schicken Sie mir…» = por favor, envíeme…",
      "«Ich bedanke mich im Voraus» = le agradezco de antemano.",
    ],
  },
  "pruefung-b1/zusammenfassen": {
    intro: [
      "Para resumir un texto, primero decí de qué trata: «In dem Text geht es um…» (se trata de…) o «Der Text handelt von…». Después nombrá a la persona principal («die Hauptperson»), contá qué pasa al principio y al final, y cerrá con «Zusammenfassend kann man sagen, dass…».",
    ],
    summary: [
      "«es geht um» + acusativo · «handeln von» + dativo = tratar de.",
      "am Anfang · am Ende · zusammenfassend.",
    ],
  },
  "pruefung-b1/wiederholung-b1": {
    intro: [
      "Repaso de las estructuras principales de B1: Präteritum, Konjunktiv II, Passiv, oraciones de relativo, genitivo y conectores. Lo más importante es el lugar del verbo: al final con «weil», «dass», «wenn», «als», «obwohl», «damit», «ob», «nachdem», «bevor» y «während»; en segundo lugar con «denn», «aber», «und» y «oder»; y enseguida con «deshalb», «trotzdem» y «außerdem».",
    ],
    summary: [
      "Präteritum · Konjunktiv II · Passiv · relativo · genitivo.",
      "Verbo al final: weil, dass, wenn, als, obwohl, damit, ob, nachdem, bevor, während.",
      "Verbo enseguida: deshalb, trotzdem, außerdem.",
    ],
  },
  "pruefung-b1/lesen": reading("die Anleitung, ander-"),
  "pruefung-b1/practica": practice("reclamos, cartas formales y resúmenes"),

  // ---------- Unidad 32: Verbos con preposición
  "praeposition-verben/verben-auf": {
    intro: [
      "Muchos verbos en alemán van siempre con una preposición, y esa preposición no siempre coincide con el español: «warten auf» (esperar, sin preposición en español), «denken an» (pensar en), «sprechen über» (hablar de), «sich interessieren für» (interesarse por).",
      "Hay que aprender cada verbo con su preposición y su caso, como una sola unidad. En esta lección, todos llevan acusativo, salvo «Angst haben vor», que lleva dativo. Un detalle: «sich freuen auf» es algo que todavía no pasó, y «sich freuen über», algo que ya tenés o ya pasó.",
    ],
    summary: [
      "warten auf · denken an · sprechen über · sich interessieren für + acusativo.",
      "«sich freuen auf» (futuro) · «sich freuen über» (presente o pasado).",
      "«Angst haben vor» + dativo.",
    ],
  },
  "praeposition-verben/verben-mehr": {
    intro: [
      "Más verbos con preposición: «sich ärgern über» (enojarse por), «sich erinnern an» (acordarse de), «sich kümmern um» (ocuparse de), con acusativo; «träumen von», «teilnehmen an», «abhängen von» y «zufrieden sein mit», con dativo.",
      "«teilnehmen» y «abhängen» son separables: «Ich nehme an dem Kurs teil», «Das hängt vom Wetter ab».",
    ],
    summary: [
      "acusativo: sich ärgern über · sich erinnern an · sich kümmern um.",
      "dativo: träumen von · teilnehmen an · abhängen von · zufrieden sein mit.",
    ],
  },
  "praeposition-verben/da-wo": {
    intro: [
      "Para preguntar por una cosa se usa «wo» + preposición: «Worauf wartest du?». Para responder se usa «da» + preposición: «Ich warte darauf». Si la preposición empieza con vocal, se agrega una «r»: worauf, woran, worüber; darauf, daran, darüber.",
      "Para una persona no se usa eso: la preposición va primero y sigue «wen» (acusativo): «Auf wen wartest du?». Y «darauf» también anticipa una oración: «Ich warte darauf, dass du kommst».",
    ],
    summary: [
      "Cosas: «Worauf…?» / «darauf» · personas: «Auf wen…?» / «auf ihn».",
      "Vocal: se agrega una «r» (worüber, darüber).",
      "«darauf, dass…» o «darauf, … zu…».",
    ],
  },
  "praeposition-verben/praeposition-regeln": {
    intro: [
      "Esta lección junta lo de la unidad: cada verbo con su preposición y su caso, las preguntas con «wo-» y las respuestas con «da-», y «darauf, dass…» para anticipar una oración.",
    ],
    summary: [
      "Verbo + preposición + caso, como una sola unidad.",
      "wo- / da- para cosas · «Auf wen…?» para personas.",
      "«Ich freue mich darauf, dich zu sehen.»",
    ],
  },
  "praeposition-verben/lesen": reading("die Vorfreude, gespannt"),
  "praeposition-verben/practica": practice("los verbos con preposición y wo- / da-"),

  // ---------- Unidad 33: Si hubiera…
  "konjunktiv-vergangenheit/haette-gemacht": {
    intro: [
      "Para hablar de lo que habrías hecho (y no hiciste) se usa «hätte» + participio al final: «Ich hätte das gewusst». Es el condicional del pasado del español («lo habría sabido»).",
      "La condición irreal del pasado lleva Konjunktiv II del pasado en las dos partes: «Wenn ich Zeit gehabt hätte, wäre ich gekommen». Y con el verbo al principio expresa un lamento: «Hättest du mich angerufen!» (¡si me hubieras llamado!).",
    ],
    summary: [
      "«hätte» + participio = habría + participio.",
      "«Wenn ich Zeit gehabt hätte, wäre ich gekommen.»",
      "«Hättest du mich angerufen!» = ¡si me hubieras llamado!",
    ],
  },
  "konjunktiv-vergangenheit/waere-gegangen": {
    intro: [
      "Los verbos que forman el Perfekt con «sein» (gehen, fahren, kommen, bleiben…) usan «wäre» + participio: «Ich wäre gern nach Japan gefahren». Los demás usan «hätte».",
      "Para «sein» y «haben» se usan «wäre gewesen» y «hätte gehabt». Con «doch» y el verbo primero, es un lamento: «Wärst du doch geblieben!».",
    ],
    summary: [
      "Verbos de movimiento y cambio: «wäre» + participio.",
      "sein → «wäre gewesen» · haben → «hätte gehabt».",
    ],
  },
  "konjunktiv-vergangenheit/bedauern": {
    intro: [
      "Para lamentar algo: «Ich bedauere, dass ich nicht angerufen habe» o «Es tut mir leid, dass ich zu spät war». Fijate que acá el verbo está en Perfekt: es un hecho real.",
      "Para reprochar o dar un consejo sobre el pasado: «hätte» + infinitivo + «sollen / müssen / können» al final: «Du hättest mehr lernen sollen» (tendrías que haber estudiado más), «Du hättest mich anrufen können» (podrías haberme llamado).",
    ],
    summary: [
      "«Ich bedauere, dass…» · «Es tut mir leid, dass…» (hechos reales).",
      "«hättest… sollen / können / müssen» = tendrías que / podrías haber…",
      "«Zum Glück ist nichts passiert» = por suerte no pasó nada.",
    ],
  },
  "konjunktiv-vergangenheit/konjunktiv-vergangenheit-regeln": {
    intro: [
      "Esta lección junta la unidad: el Konjunktiv II del pasado se forma con «hätte» o «wäre» + participio al final; en una condición irreal del pasado las dos partes llevan esa forma (sin «würde»); y con un modal se usa «hätte» + infinitivo + modal.",
    ],
    summary: [
      "«hätte / wäre» + participio al final.",
      "Condición irreal del pasado: las dos partes con la misma forma.",
      "«hätte» + infinitivo + sollen / müssen / können.",
    ],
  },
  "konjunktiv-vergangenheit/lesen": reading("die Entscheidung, bereuen"),
  "konjunktiv-vergangenheit/practica": practice("el Konjunktiv II del pasado y los lamentos"),

  // ---------- Unidad 34: Conectores
  "konnektoren/falls-je": {
    intro: [
      "«falls» (en caso de que) manda el verbo al final y sirve para condiciones: «Falls es regnet, bleibe ich zu Hause». «je… desto» compara dos cosas que crecen juntas: «Je mehr ich lerne, desto besser spreche ich». Después de «je» el verbo va al final; después de «desto», enseguida.",
      "«entweder… oder» (o bien… o bien) y «weder… noch» (ni… ni) son conectores dobles: no cambian el orden del verbo.",
    ],
    summary: [
      "«falls» = en caso de que · verbo al final.",
      "«je + comparativo… desto + comparativo» = cuanto más… más…",
      "«entweder… oder» · «weder… noch».",
    ],
  },
  "konnektoren/indem-sodass": {
    intro: [
      "«indem» dice de qué manera hacés algo: «Ich lerne Deutsch, indem ich viel lese» (aprendo alemán leyendo mucho). «sodass» y «so… dass» expresan consecuencia: «Er sprach so schnell, dass ich ihn nicht verstand».",
      "«daher» es «por eso», como «deshalb»: el verbo viene enseguida. «sofort» es «enseguida».",
    ],
    summary: [
      "«indem» = de qué manera (haciendo…) · verbo al final.",
      "«sodass» / «so… dass» = consecuencia.",
      "«daher» = por eso · verbo enseguida.",
    ],
  },
  "konnektoren/doppelte-konnektoren": {
    intro: [
      "«sondern» corrige una negación («no X, sino Y»): «Ich trinke keinen Tee, sondern Kaffee». «aber» solo marca un contraste («X, pero Y»). «sowohl… als auch» (tanto… como) y «nicht nur… sondern auch» (no solo… sino también) suman cosas.",
      "«dagegen» (en cambio) contrasta dos cosas y el verbo viene enseguida.",
    ],
    summary: [
      "«sondern» después de una negación · «aber» para contrastar.",
      "«sowohl… als auch» · «nicht nur… sondern auch».",
      "«dagegen» = en cambio.",
    ],
  },
  "konnektoren/konnektoren-regeln": {
    intro: [
      "Esta lección junta los conectores de la unidad y cómo afectan al verbo: algunos lo mandan al final (falls, indem, sodass, dass, je), otros ocupan el primer lugar y el verbo viene enseguida (daher, deshalb, trotzdem, dagegen, desto), y los dobles no lo cambian.",
    ],
    summary: [
      "Verbo al final: falls, indem, sodass, dass, je.",
      "Verbo enseguida: daher, deshalb, trotzdem, dagegen, desto.",
      "Dobles: no cambian el orden.",
    ],
  },
  "konnektoren/lesen": reading("regelmäßig, die Gewohnheit"),
  "konnektoren/practica": practice("los conectores y el orden del verbo"),
};
