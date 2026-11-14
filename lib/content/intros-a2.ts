// Explicación previa y puntos para recordar de las lecciones de A2 (unidades 15 a 23).
// Mismo formato que intros.ts: clave «unidad/lección». Las lecturas y prácticas extra usan textos comunes.

export type LessonNotes = { intro: string[]; summary: string[] };

export const READING_TIP = "Esta es una lectura: un texto corto con audio y traducción. Lo importante es entender la idea general, no cada palabra. Primero leé o escuchá el texto, y después respondé las preguntas. Las palabras nuevas que aparecen entran al repaso.";
export const PRACTICE_TIP = "Esta es una práctica extra: no enseña palabras nuevas, repasa lo de la unidad con una escucha, frases para completar, traducciones escritas y frases para decir en voz alta. No bloquea el avance: podés hacerla cuando quieras, y conviene escribir y decir cada frase, no solo reconocerla.";

const reading = (words: string): LessonNotes => ({ intro: [READING_TIP], summary: [`Palabras nuevas de la lectura: ${words}.`] });
const practice = (topic: string): LessonNotes => ({ intro: [PRACTICE_TIP], summary: [`Repasaste lo de la unidad: ${topic}.`] });

export const INTROS_A2: Record<string, LessonNotes> = {
  // ---------- Unidad 15: Contar el pasado
  "vergangenheit/entschuldigung": {
    intro: [
      "Para disculparte y dar razones vas a usar el pasado corto (Präteritum) de cinco verbos: «können» → «konnte», «müssen» → «musste», «wollen» → «wollte», «sein» → «war» y «haben» → «hatte». Con estos verbos no se usa el Perfekt: se dice «Ich konnte nicht kommen», no «Ich habe nicht kommen können».",
      "En los tres modales se pierde la diéresis (ä, ö, ü) y se agrega «-te»: «müssen» → «musste». El otro verbo queda en infinitivo al final: «Ich musste arbeiten».",
      "Para preguntar «¿por qué?» se usa «warum». Y «Es tut mir leid» es la frase fija para decir «lo siento».",
    ],
    summary: [
      "konnte · musste · wollte · war · hatte: el pasado corto que se usa al hablar.",
      "«Ich musste arbeiten» = tuve que trabajar (infinitivo al final).",
      "«Warum…?» = ¿por qué? · «Es tut mir leid» = lo siento.",
    ],
  },
  "vergangenheit/zeitausdruecke": {
    intro: [
      "Para ubicar algo en el pasado hay palabras de tiempo: «früher» (antes), «damals» (en aquel entonces), «als Kind» (de chico) y «vor» + tiempo (hace…): «vor einem Jahr».",
      "Cuidado con «seit»: dice desde cuándo dura algo que todavía sigue, y el verbo va en presente: «Ich lerne seit zwei Monaten Deutsch» (estudio desde hace dos meses, y sigo estudiando). En español usamos el mismo presente.",
      "«vor» y «seit» piden dativo: «vor einem Jahr», «seit einem Monat». Y «zwei Jahre» sin preposición significa «durante dos años».",
    ],
    summary: [
      "«vor einem Jahr» = hace un año (con el pasado).",
      "«seit einem Jahr» = desde hace un año (con el presente, porque sigue).",
      "früher · damals · als Kind: para contar cómo era antes.",
    ],
  },
  "vergangenheit/lebenslauf": {
    intro: [
      "Los años se dicen distinto según la época. Del 1100 al 1999 se dicen en centenas: 1990 es «neunzehnhundert·neunzig» (diecinueve cien noventa). Desde el 2000 se dice «zweitausend» y el resto: 2016 es «zweitausendsechzehn».",
      "Para contar tus estudios se usa el Perfekt: «Ich habe Medizin studiert». Los verbos que terminan en «-ieren» no llevan «ge-» en el participio: «studieren» → «studiert». Y «gehen» forma el Perfekt con «sein»: «Ich bin zur Schule gegangen».",
      "Para preguntar por la duración: «Wie lange hast du studiert?» (¿cuánto tiempo estudiaste?).",
    ],
    summary: [
      "1990 = neunzehnhundertneunzig · 2016 = zweitausendsechzehn.",
      "Verbos en -ieren: participio sin «ge-» (studiert).",
      "«Wie lange…?» = ¿cuánto tiempo?",
    ],
  },
  "vergangenheit/praeteritum-regeln": {
    intro: [
      "Esta lección ordena lo que viste: cuándo se usa el pasado corto y cuándo el Perfekt, y cómo se usan «vor» y «seit». El pasado corto de «sein», «haben» y los modales tiene la misma forma para «ich» y para «er»: «ich konnte / er konnte».",
      "Regla práctica: al hablar, la mayoría de los verbos usa el Perfekt («ich habe gearbeitet»), pero «war», «hatte» y los modales usan su pasado corto.",
    ],
    summary: [
      "«ich» y «er» tienen la misma forma en el pasado corto: konnte, musste, wollte, war, hatte.",
      "Perfekt para casi todo; pasado corto para sein, haben y modales.",
      "«vor» = hace (pasado) · «seit» = desde hace (sigue), los dos con dativo.",
    ],
  },
  "vergangenheit/lesen": reading("Deutschland, kaum, die Geschichte"),
  "vergangenheit/practica": practice("el pasado corto, vor y seit, y los años"),

  // ---------- Unidad 16: Cuerpo y salud
  "gesundheit/koerper": {
    intro: [
      "En alemán «doler» se dice «weh tun» y el que duele es el sujeto: «Mein Kopf tut weh» (literalmente «mi cabeza duele»). Con un plural, el verbo también cambia: «Meine Beine tun weh».",
      "Las partes del cuerpo llevan artículo como cualquier sustantivo. Además de «der Kopf», «der Bauch», «der Rücken» y «der Arm», hay «die Hand» (plural «die Hände», con diéresis) y «das Bein». Para preguntar dónde duele: «Wo tut es weh?».",
    ],
    summary: [
      "«Mein Kopf tut weh» = me duele la cabeza.",
      "Plural: «Meine Beine tun weh».",
      "der Kopf · der Bauch · der Rücken · der Arm · die Hand · das Bein.",
    ],
  },
  "gesundheit/arzt": {
    intro: [
      "Para contarle al médico cómo estás hay dos estructuras: «Ich bin krank» (con «sein») y «Ich habe + algo», sin artículo: «Ich habe Fieber», «Ich habe Husten».",
      "Los dolores se arman con «-schmerzen»: «Kopfschmerzen», «Bauchschmerzen», «Rückenschmerzen». Esa palabra solo existe en plural, así que se dice «Ich habe Kopfschmerzen», nunca «eine Kopfschmerz».",
      "«der Arzt» es el médico y «die Ärztin», la médica. Para desear que alguien se mejore: «Gute Besserung!».",
    ],
    summary: [
      "«Ich habe Fieber / Husten / Kopfschmerzen» (sin artículo).",
      "«krank» = enfermo · «gesund» = sano.",
      "«Gute Besserung!» = ¡Que te mejores!",
    ],
  },
  "gesundheit/reflexiv": {
    intro: [
      "Un verbo reflexivo lleva un pronombre que vuelve sobre el sujeto: «Ich wasche mich» (me lavo). Es como el «me / te / se» del español, y cambia con la persona: ich → mich, du → dich, er/sie/es → sich, wir → uns, ihr → euch, sie/Sie → sich.",
      "Hay verbos que son reflexivos en alemán aunque en español no lo parezcan, como «sich freuen» (alegrarse) y «sich treffen» (encontrarse). Y los separables dejan el prefijo al final: «Ich ziehe mich an».",
      "Para preguntar cómo está alguien: «Wie fühlst du dich?» (¿cómo te sentís?).",
    ],
    summary: [
      "mich · dich · sich · uns · euch · sich: el pronombre reflexivo.",
      "«Ich freue mich» = me alegro · «Wir treffen uns» = nos encontramos.",
      "Separables: «Ich ziehe mich an».",
    ],
  },
  "gesundheit/imperativ": {
    intro: [
      "El imperativo sirve para dar órdenes, pedidos y consejos. Con «du» se saca la terminación del verbo: «kommen» → «Komm!». Con «ihr» queda igual que el presente: «Kommt!». Con «Sie» el verbo va primero y sigue «Sie»: «Kommen Sie!».",
      "Hay dos casos especiales. Algunos verbos que cambian la vocal también la cambian en el imperativo con «du»: «essen» → «Iss!». Y «sein» es irregular: «Sei! / Seid! / Seien Sie!». En los reflexivos, el pronombre va después del verbo: «Beeil dich!». En los separables, el prefijo va al final: «Steh auf!».",
    ],
    summary: [
      "du: «Komm!» · ihr: «Kommt!» · Sie: «Kommen Sie!».",
      "essen → «Iss!» · sein → «Sei!».",
      "«Beeil dich!» · «Steh auf!»: pronombre y prefijo después del verbo.",
    ],
  },
  "gesundheit/lesen": reading("viel, bald, sagen"),
  "gesundheit/practica": practice("el cuerpo, la salud, los reflexivos y el imperativo"),

  // ---------- Unidad 17: Ropa y compras
  "kleidung/kleider": {
    intro: [
      "Los nombres de las prendas tienen su artículo, y no siempre coincide con el español: «die Hose» (el pantalón) es femenino y singular, mientras que «die Schuhe» (los zapatos) es plural. El singular de los zapatos es «der Schuh».",
      "El vendedor te va a preguntar «Kann ich Ihnen helfen?» (¿puedo ayudarlo?). «Ihnen» es el dativo formal de «Sie»: lo vas a ver con más detalle en la unidad 19.",
    ],
    summary: [
      "das T-Shirt · die Hose · die Jacke · der Pullover · das Kleid · die Schuhe · der Rock.",
      "«die Hose» es singular en alemán; «die Schuhe» es plural.",
      "«Kann ich Ihnen helfen?» = ¿puedo ayudarlo?",
    ],
  },
  "kleidung/farben": {
    intro: [
      "Los colores son adjetivos: «rot», «blau», «grün», «gelb», «schwarz», «weiß» y «braun». Después de «ist» no cambian: «Die Jacke ist rot».",
      "Pronunciación: «blau» suena parecido a «blau» en español, la «ü» de «grün» se dice con los labios de «u» y la lengua de «i», y «sch» de «schwarz» suena como «sh».",
      "Para preguntar por el color: «Welche Farbe?» (¿qué color?), de «die Farbe».",
    ],
    summary: [
      "rot · blau · grün · gelb · schwarz · weiß · braun.",
      "«Die Jacke ist rot»: después de «ist» el color no cambia.",
      "«Welche Farbe?» = ¿qué color?",
    ],
  },
  "kleidung/anprobieren": {
    intro: [
      "En una tienda necesitás decir el talle, opinar y probarte algo. «Welche Größe haben Sie?» = ¿qué talle usa? Se contesta «Ich habe Größe 40».",
      "«zu» + adjetivo significa «demasiado»: «zu groß», «zu klein». Para opinar se usa «finden»: «Wie findest du das Kleid?» (¿qué te parece?) y «Ich finde es schön».",
      "«Das passt gut» significa «queda bien» (o «combina»). Y «anprobieren» es separable, pero con un modal queda entero al final: «Kann ich das anprobieren?».",
    ],
    summary: [
      "«zu groß / zu klein» = demasiado grande / chico.",
      "«Wie findest du…?» = ¿qué te parece…? · «Ich finde es schön».",
      "«Kann ich das anprobieren?» = ¿puedo probármelo?",
    ],
  },
  "kleidung/adjektive": {
    intro: [
      "Cuando el adjetivo va después de «ist», no cambia: «Die Jacke ist rot». Pero cuando va delante del sustantivo, lleva una terminación que depende del género y del caso: «eine rote Jacke».",
      "Con «ein / eine», el artículo no muestra el género del masculino ni del neutro, así que lo muestra el adjetivo: «ein roter Pullover» y «ein rotes Kleid». Con «der / die / das», el adjetivo casi siempre termina en «-e» o «-en»: «der rote Pullover», «den roten Pullover», «die roten Schuhe».",
    ],
    summary: [
      "Después de «ist»: sin terminación. Delante del sustantivo: con terminación.",
      "ein roter Pullover · eine rote Jacke · ein rotes Kleid · rote Schuhe.",
      "Con der/die/das: casi siempre «-e», y «-en» en plural y en «den».",
    ],
  },
  "kleidung/lesen": reading("der Winter, die Mütze, der Schal, tragen"),
  "kleidung/practica": practice("la ropa, los colores, los talles y las terminaciones del adjetivo"),

  // ---------- Unidad 18: Razones y opiniones
  "gruende/weil": {
    intro: [
      "Para dar una razón hay tres palabras. «weil» (porque) manda el verbo conjugado al final de su oración: «Ich bleibe zu Hause, weil ich krank bin». Siempre lleva una coma antes.",
      "«denn» también significa «porque», pero no cambia el orden: «Ich bin müde, denn ich arbeite viel». Y «deshalb» (por eso) cuenta como primer elemento, así que el verbo viene enseguida: «Ich bin krank, deshalb bleibe ich zu Hause».",
    ],
    summary: [
      "«weil» + verbo al final · «denn» + orden normal.",
      "«deshalb» = por eso, y después va el verbo: «deshalb bleibe ich…».",
      "Antes de «weil» y «denn» va siempre una coma.",
    ],
  },
  "gruende/dass": {
    intro: [
      "«dass» significa «que» y se usa después de verbos de opinión o saber: «glauben» (creer), «finden», «wissen» (saber un dato), «hoffen» (esperar). Funciona como «weil»: manda el verbo conjugado al final, y lleva coma antes.",
      "«Ich weiß, dass er kommt» = sé que viene. «wissen» es irregular: ich weiß, du weißt, er weiß. También se usa en frases como «Es ist wichtig, dass du Deutsch lernst».",
    ],
    summary: [
      "«dass» = que, con el verbo conjugado al final.",
      "«Ich glaube / finde / weiß / hoffe, dass…».",
      "wissen: ich weiß, du weißt, er weiß.",
    ],
  },
  "gruende/wenn": {
    intro: [
      "«wenn» significa «si» y también «cuando» (cuando es algo habitual): «Wenn ich Zeit habe, koche ich gern». Como «weil» y «dass», manda el verbo al final.",
      "Si la oración con «wenn» va primero, ocupa el primer lugar de la oración, y el verbo de la principal viene justo después de la coma: «Wenn ich müde bin, schlafe ich».",
      "Para decir con qué frecuencia hacés algo: «immer» (siempre), «oft» (a menudo), «manchmal» (a veces), «nie» (nunca). Se pregunta «Wie oft…?».",
    ],
    summary: [
      "«wenn» = si / cuando, con el verbo al final.",
      "Si «wenn» va primero, el verbo de la principal va justo después de la coma.",
      "immer · oft · manchmal · nie · «Wie oft…?».",
    ],
  },
  "gruende/nebensatz": {
    intro: [
      "Esta lección junta la regla central de la unidad: después de «weil», «dass» y «wenn» el verbo conjugado va al final. Si hay un modal o un Perfekt, el verbo conjugado queda último, detrás del infinitivo o del participio: «…, weil ich arbeiten muss».",
      "En cambio, «denn», «aber», «und» y «oder» no cambian el orden del verbo, y «deshalb» cuenta como primer elemento.",
    ],
    summary: [
      "weil / dass / wenn → verbo conjugado al final.",
      "denn / aber / und / oder → el verbo sigue en segundo lugar.",
      "Con un modal: «…, weil ich arbeiten muss».",
    ],
  },
  "gruende/lesen": reading("leicht, schwierig, die Grammatik"),
  "gruende/practica": practice("weil, denn, deshalb, dass y wenn con el verbo en su lugar"),

  // ---------- Unidad 19: Regalos y dativo
  "geschenke/dativ-pronomen": {
    intro: [
      "Hasta ahora usaste el acusativo («mich», «dich»). Ahora aparece el dativo, el caso de «a quién»: ich → mir, du → dir, er/es → ihm, sie → ihr, wir → uns, ihr → euch, sie → ihnen.",
      "Algunos verbos piden siempre dativo: «helfen» («Ich helfe dir») y «gefallen» («Das gefällt mir»). Con «geben» y «schenken» se mezclan dos objetos: la persona va en dativo y la cosa en acusativo: «Ich gebe ihm das Buch».",
    ],
    summary: [
      "mir · dir · ihm · ihr · uns · euch · ihnen: los pronombres en dativo.",
      "helfen y gefallen siempre llevan dativo.",
      "«Ich gebe ihm das Buch»: persona en dativo, cosa en acusativo.",
    ],
  },
  "geschenke/geschenk": {
    intro: [
      "Para regalar se usa «schenken», que funciona como «geben»: la persona va en dativo y lo que regalás, en acusativo: «Ich schenke dir Blumen».",
      "Con un sustantivo, el artículo cambia en dativo: «der Mutter» (femenino) y «dem Bruder» (masculino). Lo mismo pasa con «mein»: «meiner Mutter», «meinem Bruder».",
      "Para preguntar a quién: «Wem schenkst du das Buch?» («wem» = a quién). Y para agradecer un regalo: «Danke für die Blumen!».",
    ],
    summary: [
      "«Ich schenke dir Blumen» = te regalo flores.",
      "Dativo con sustantivos: der Mutter · dem Bruder (meiner / meinem).",
      "«Wem…?» = ¿a quién?",
    ],
  },
  "geschenke/feiern": {
    intro: [
      "Para invitar a alguien se usa el verbo separable «einladen»: «Ich lade dich zur Party ein». El prefijo «ein» va al final, y «zur» es «zu» + «der».",
      "«mitbringen» también es separable. Con un modal queda entero al final: «Kannst du einen Salat mitbringen?». Para felicitar: «Ich gratuliere dir!» (con dativo) y «Alles Gute zum Geburtstag!».",
    ],
    summary: [
      "«einladen» y «mitbringen» son separables.",
      "«gratulieren» lleva dativo: «Ich gratuliere dir!».",
      "«Alles Gute zum Geburtstag!» = ¡feliz cumpleaños!",
    ],
  },
  "geschenke/dativ-regeln": {
    intro: [
      "Esta lección junta lo de la unidad. El objeto directo («qué») va en acusativo y el indirecto («a quién») en dativo. Los pronombres tienen una forma para cada caso: «mich / mir», «dich / dir», «ihn / ihm».",
      "Algunos verbos piden dativo aunque en español parezca un objeto directo: «helfen», «gefallen», «gehören», «schmecken». Hay que aprenderlos de memoria.",
      "Con sustantivos, el artículo cambia en dativo: der/das → dem, die → der, y en plural «den». «mein» cambia igual.",
    ],
    summary: [
      "acusativo: mich · dich · ihn · sie · es · uns · euch — dativo: mir · dir · ihm · ihr · ihm · uns · euch.",
      "Verbos con dativo: helfen, gefallen, gehören, schmecken.",
      "Dativo: dem (der/das) · der (die) · meinem · meiner.",
    ],
  },
  "geschenke/lesen": reading("backen, die Überraschung"),
  "geschenke/practica": practice("los pronombres en dativo, regalar e invitar"),

  // ---------- Unidad 20: Dónde y adónde
  "ort/praepositionen": {
    intro: [
      "Estas preposiciones dicen dónde está algo: «auf» (sobre), «unter» (debajo de), «neben» (al lado de), «vor» (delante de), «hinter» (detrás de), «zwischen» (entre), «an» (junto a) e «in» (en, dentro de).",
      "Para decir dónde está algo, llevan dativo: «auf dem Tisch», «neben der Lampe». Con masculino y neutro, «dem»; con femenino, «der». Y se juntan: «an + dem = am» («am Fenster»), «in + dem = im» («im Schrank»).",
    ],
    summary: [
      "auf · unter · neben · vor · hinter · zwischen · an · in.",
      "Dónde está algo → dativo: dem (der/das) · der (die).",
      "an + dem = am · in + dem = im.",
    ],
  },
  "ort/stellen-legen": {
    intro: [
      "En español «poner» sirve para todo. En alemán hay que elegir cómo queda el objeto: de pie («stellen»), acostado («legen») o colgado («hängen»). Y cada verbo de «estar» tiene el suyo: «stehen» (estar de pie), «liegen» (estar acostado), «hängen» (estar colgado).",
      "Con «stehen / liegen» se pregunta «Wo?» (¿dónde?) y se usa dativo: «Das Buch liegt auf dem Bett». Con «stellen / legen» se pregunta «Wohin?» (¿adónde?), hay movimiento, y se usa acusativo: «Ich lege das Buch auf das Bett».",
    ],
    summary: [
      "stehen ↔ stellen (de pie) · liegen ↔ legen (acostado) · hängen (colgado).",
      "«Wo?» + dativo · «Wohin?» + acusativo.",
      "«Ich stelle die Lampe auf den Tisch.»",
    ],
  },
  "ort/einrichten": {
    intro: [
      "Para describir un cuarto se junta todo lo anterior: el mueble y el lugar con dativo. Para decir qué hay, el alemán suele usar el verbo de posición: «In meinem Zimmer steht ein Regal» (literalmente «en mi cuarto está parado un estante»), no un verbo equivalente a «hay».",
      "Con un plural, el verbo también va en plural: «Auf dem Balkon stehen Pflanzen».",
    ],
    summary: [
      "«In meinem Zimmer steht ein Regal» = en mi cuarto hay un estante.",
      "El verbo concuerda con lo que hay: «stehen» con plural.",
      "der Teppich · das Regal · der Spiegel · die Pflanze · der Fernseher · der Balkon.",
    ],
  },
  "ort/wo-wohin": {
    intro: [
      "Esta lección junta la regla central: nueve preposiciones («in, an, auf, unter, über, vor, hinter, neben, zwischen») pueden llevar dativo o acusativo. Si no hay movimiento y respondés «¿dónde?», va dativo. Si hay movimiento hacia un lugar y respondés «¿adónde?», va acusativo.",
      "Se juntan «in + das = ins» y «an + das = ans». Y cada verbo de «estar» tiene su verbo de «poner»: «stehen» con dativo, «stellen» con acusativo.",
    ],
    summary: [
      "¿Dónde? → dativo · ¿adónde? → acusativo.",
      "in · an · auf · unter · über · vor · hinter · neben · zwischen.",
      "stehen / liegen (dativo) · stellen / legen (acusativo).",
    ],
  },
  "ort/lesen": reading("die Ecke, der Schreibtisch"),
  "ort/practica": practice("las preposiciones de lugar con dativo y acusativo"),

  // ---------- Unidad 21: Comparar y viajar
  "reise/komparativ": {
    intro: [
      "Para decir «más…» se agrega «-er» al adjetivo: «schnell» → «schneller». Los adjetivos cortos con a, o, u suelen llevar diéresis: «groß» → «größer». «teuer» pierde una «e»: «teurer». Y «gut» es irregular: «besser».",
      "Para comparar se usa «als» (que): «Der Zug ist schneller als der Bus». Para decir que dos cosas son iguales: «so… wie» (tan… como). El superlativo es «am» + adjetivo + «-sten»: «am besten». Y «gern → lieber → am liebsten» sirve para decir lo que preferís.",
    ],
    summary: [
      "schnell → schneller · groß → größer · teuer → teurer · gut → besser.",
      "«als» para desigual, «so… wie» para igual.",
      "Superlativo: «am besten», «am liebsten».",
    ],
  },
  "reise/wetter": {
    intro: [
      "Para el clima el alemán usa el sujeto «es» (que no se traduce): «Es regnet» (llueve), «Es schneit» (nieva). Con el sol se dice «Die Sonne scheint» (literalmente «el sol brilla»).",
      "La temperatura se dice «Es sind zehn Grad». Para preguntar cómo está el tiempo: «Wie ist das Wetter?». «warm» es cálido; para mucho calor, «heiß».",
    ],
    summary: [
      "«Es regnet» · «Es schneit» · «Die Sonne scheint».",
      "«Es sind zehn Grad» = hay diez grados.",
      "«Wie ist das Wetter?» = ¿cómo está el tiempo?",
    ],
  },
  "reise/urlaub": {
    intro: [
      "En un hotel necesitás reservar, preguntar el precio y registrarte. «Ich habe ein Zimmer reserviert» es el Perfekt de «reservieren»: como termina en «-ieren», no lleva «ge-».",
      "Para el precio por noche: «Wie viel kostet das Zimmer pro Nacht?» («pro» = por). Y «Ist das Frühstück dabei?» pregunta si el desayuno está incluido.",
    ],
    summary: [
      "das Einzelzimmer = habitación simple · das Doppelzimmer = habitación doble.",
      "«Ich habe ein Zimmer reserviert» = reservé una habitación.",
      "«pro Nacht» = por noche · «dabei» = incluido.",
    ],
  },
  "reise/steigerung": {
    intro: [
      "Esta lección junta la regla de la unidad. Comparativo: adjetivo + «-er» («schneller»). Superlativo: «am» + adjetivo + «-sten» («am schnellsten»). Los irregulares conviene aprenderlos de memoria: «gut → besser → am besten», «gern → lieber → am liebsten», «viel → mehr → am meisten».",
      "Para comparar: «als» (que) con desigualdad y «so… wie» (tan… como) con igualdad.",
    ],
    summary: [
      "groß · größer · am größten.",
      "gut · besser · am besten · gern · lieber · am liebsten.",
      "«als» = que · «so… wie» = tan… como.",
    ],
  },
  "reise/lesen": reading("das Meer, der Strand"),
  "reise/practica": practice("comparar, el clima y el hotel"),

  // ---------- Unidad 22: Trabajo y planes
  "arbeit/berufe": {
    intro: [
      "Para decir tu profesión, el alemán no usa artículo: «Ich bin Lehrer», no «Ich bin ein Lehrer». Para una mujer se agrega «-in»: «Lehrer» → «Lehrerin», «Koch» → «Köchin».",
      "Para preguntar: «Was sind Sie von Beruf?» (formal) o «Was bist du von Beruf?». Y para decir en qué puesto trabajás, se usa «als»: «Ich arbeite als Köchin».",
    ],
    summary: [
      "«Ich bin Lehrer» (sin artículo) · «Ich bin Lehrerin».",
      "Profesión femenina: «-in» (Lehrerin, Köchin, Studentin).",
      "«Ich arbeite als…» = trabajo como…",
    ],
  },
  "arbeit/bewerbung": {
    intro: [
      "Para buscar trabajo vas a necesitar «die Stelle» (el puesto), «die Bewerbung» (la postulación), «der Lebenslauf» (el currículum) y «die Erfahrung» (la experiencia). Se dice «Ich suche eine Stelle» y «Ich habe zwei Jahre Erfahrung».",
      "En una entrevista, la pregunta «Wann können Sie anfangen?» usa «anfangen», que es separable, pero con un modal queda entero al final.",
    ],
    summary: [
      "«Ich suche eine Stelle» = busco trabajo.",
      "«Ich habe zwei Jahre Erfahrung» = tengo dos años de experiencia.",
      "die Bewerbung · der Lebenslauf.",
    ],
  },
  "arbeit/plaene": {
    intro: [
      "El futuro se arma con «werden» conjugado en segundo lugar y el verbo principal en infinitivo al final: «Ich werde Deutsch lernen». Para un futuro cercano también alcanza el presente con una expresión de tiempo: «Morgen fahre ich nach Berlin».",
      "«werden» solo significa «llegar a ser»: «Ich werde Lehrerin». Y para decir lo que te gustaría hacer se usa «ich würde gern» + infinitivo al final: «Ich würde gern nach Wien fahren».",
    ],
    summary: [
      "«Ich werde + infinitivo» = voy a… (futuro).",
      "«Ich würde gern…» = me gustaría…",
      "«nächstes Jahr» · «im Sommer» · «hoffentlich».",
    ],
  },
  "arbeit/modalverben2": {
    intro: [
      "Esta lección junta tres cosas. El futuro: «werden» + infinitivo al final. Los modales «dürfen» (tener permiso) y «sollen» (se supone que / te lo indicaron). Y «würde gern» para lo que te gustaría.",
      "En negativo, «Du darfst nicht arbeiten» significa «no tenés permiso»: está prohibido. «Du sollst im Bett bleiben» es una indicación, por ejemplo del médico.",
    ],
    summary: [
      "werde · wirst · wird · werden · werdet · werden.",
      "«dürfen» = tener permiso · «sollen» = deber (por indicación).",
      "«nicht dürfen» = estar prohibido.",
    ],
  },
  "arbeit/lesen": reading("das Land, eröffnen, genug"),
  "arbeit/practica": practice("las profesiones, buscar trabajo, el futuro y los modales"),

  // ---------- Unidad 23: Preparación para el examen A2
  "pruefung-a2/telefon": {
    intro: [
      "Por teléfono el alemán tiene fórmulas fijas. Para presentarte: «Hier spricht Costa» (literalmente «acá habla Costa»). Para preguntar por alguien: «Ist Herr Weiß da?». Para pedir que esperen: «Einen Moment, bitte».",
      "Si no está: «Er ist leider nicht da». Y para dejar un mensaje: «Kann ich eine Nachricht hinterlassen?». «Ich rufe später noch einmal an» usa «anrufen», un separable.",
    ],
    summary: [
      "«Hier spricht…» = habla… · «Ist Herr Weiß da?» = ¿está el señor Weiß?",
      "«Einen Moment, bitte» · «Er ist leider nicht da».",
      "«anrufen» es separable: «Ich rufe später an».",
    ],
  },
  "pruefung-a2/email": {
    intro: [
      "En un correo formal, el saludo cambia con el género: «Sehr geehrte Frau Costa,» para una mujer y «Sehr geehrter Herr Weiß,» para un hombre. Se cierra con «Mit freundlichen Grüßen». En uno informal: «Liebe Anna,» o «Lieber Tom,», y se cierra con «Viele Grüße».",
      "Para pedir una cita: «Ich möchte einen Termin vereinbaren». «der Termin» es una cita, un turno o una reunión.",
    ],
    summary: [
      "Formal: «Sehr geehrte Frau… / Sehr geehrter Herr…» + «Mit freundlichen Grüßen».",
      "Informal: «Liebe… / Lieber…» + «Viele Grüße».",
      "«Ich möchte einen Termin vereinbaren» = quisiera acordar una cita.",
    ],
  },
  "pruefung-a2/termin": {
    intro: [
      "Para acordar una cita se proponen y se contestan horarios. Para proponer: «Wie wäre es mit Freitag?» o «Passt es dir am Dienstag?». Para aceptar: «Das passt mir gut» o «Einverstanden!». Para rechazar: «Das geht leider nicht».",
      "«passen» lleva dativo («dir», «mir»). «gehen» también significa «funcionar / ser posible». Y si ya tenés un compromiso: «Ich habe schon einen Termin». Para cambiarlo: «verschieben».",
    ],
    summary: [
      "«Wie wäre es mit Freitag?» = ¿qué tal el viernes?",
      "«Das passt mir gut» · «Einverstanden!» · «Das geht leider nicht».",
      "«den Termin verschieben» = posponer la cita.",
    ],
  },
  "pruefung-a2/wiederholung-a2": {
    intro: [
      "Repaso de todo A2: dónde va el verbo y qué caso lleva cada preposición. El verbo conjugado va en segundo lugar en una oración simple, el infinitivo al final con un modal o con «werden», el participio al final en el Perfekt, y el verbo conjugado al final detrás de «weil», «dass» y «wenn».",
      "Con «mit, zu, bei, nach, von, aus, seit» siempre va dativo. Con las nueve preposiciones de lugar, depende del movimiento: dativo para «¿dónde?» y acusativo para «¿adónde?».",
    ],
    summary: [
      "Verbo: 2.º lugar · infinitivo al final · participio al final · verbo conjugado al final (weil, dass, wenn).",
      "Dativo fijo: mit, zu, bei, nach, von, aus, seit.",
      "Nueve preposiciones: ¿dónde? dativo · ¿adónde? acusativo.",
    ],
  },
  "pruefung-a2/lesen": reading("die Antwort"),
  "pruefung-a2/practica": practice("el teléfono, los correos y las citas"),
};
