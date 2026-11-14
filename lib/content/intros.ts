// Explicación previa y puntos para recordar de cada lección.
// Clave: «unidad/lección». Se asignan a Lesson.intro y Lesson.summary al armar el currículo.
// `intro` se muestra antes de practicar; `summary`, en el resumen final de la lección.

import { READING_TIP, INTROS_A2, type LessonNotes } from "./intros-a2.ts";
import { INTROS_B1 } from "./intros-b1.ts";
import { INTROS_B2 } from "./intros-b2.ts";
export type { LessonNotes };

export const INTROS: Record<string, LessonNotes> = {
  // ---------- Unidad 1: ¡Hallo!
  "hallo/gruesse": {
    intro: [
      "Los saludos alemanes cambian según la hora y la confianza. «Guten Morgen» (a la mañana), «Guten Tag» (durante el día) y «Guten Abend» (al llegar a la noche) son formales y sirven con cualquiera.",
      "«Hallo» y «Tschüss» son informales: para amigos y gente de tu edad. Con un jefe, un desconocido o en un negocio, «Guten Tag» y «Auf Wiedersehen» son lo más seguro.",
      "Pronunciación: la «ü» de «Tschüss» se dice con labios de «u» y lengua de «i». La «W» de «Wiedersehen» suena como una «v».",
    ],
    summary: [
      "«Hallo» = hola y «Tschüss» = chau: son informales.",
      "«Guten Morgen / Tag / Abend» = buenos días / buen día / buenas noches (al llegar).",
      "«Auf Wiedersehen» = adiós, en situaciones formales.",
    ],
  },
  "hallo/vorstellen": {
    intro: [
      "Para presentarte usás dos verbos: «heißen» (llamarse) y «kommen» (venir). Se dice «Ich heiße Ana», literalmente «yo me llamo Ana», pero sin el «me».",
      "Para preguntar el nombre: «Wie heißt du?» (a alguien de confianza, «du») o «Wie heißen Sie?» (formal, «Sie»). El verbo cambia con cada pronombre: «heißt» con «du» y «heißen» con «Sie».",
      "Para decir de dónde sos: «Ich komme aus Argentinien», literalmente «vengo de Argentina».",
    ],
    summary: [
      "«Ich heiße…» = me llamo… y «Wie heißt du?» = ¿cómo te llamás?",
      "«du» es informal (vos); «Sie» con mayúscula es formal (usted).",
      "«Ich komme aus…» = soy de… y «Woher kommst du?» = ¿de dónde sos?",
    ],
  },
  "hallo/wie-gehts": {
    intro: [
      "Para preguntar cómo está alguien se dice «Wie geht's?», la forma corta de «Wie geht es dir?». Es una pregunta real: esperan que contestes.",
      "Respuestas habituales: «Sehr gut», «Gut, danke» o «Nicht so gut». Después se devuelve la pregunta con «Und dir?» (¿y a vos?). «dir» es el dativo de «du»; más adelante vas a ver qué es un caso.",
      "«Bitte» tiene dos usos: «por favor» al pedir algo y «de nada» al contestar un «Danke».",
    ],
    summary: [
      "«Wie geht's?» + «Gut, danke. Und dir?» es la conversación mínima.",
      "«Danke» = gracias. «Bitte» = por favor / de nada.",
    ],
  },

  // ---------- Unidad 2: Números
  "zahlen/eins-fuenf": {
    intro: [
      "Los números del 0 al 5. Cuidado con la pronunciación: «ei» suena «ai» (eins), la «z» suena «ts» (zwei = «tsvai») y la «v» de «vier» suena como una «f».",
      "Los números sirven para todo: la edad, los precios, la hora y el teléfono. Aprenderlos de a poco y escucharlos mucho es la mejor forma.",
    ],
    summary: [
      "0 null · 1 eins · 2 zwei · 3 drei · 4 vier · 5 fünf.",
      "«ei» suena «ai», «z» suena «ts» y «v» suena «f».",
    ],
  },
  "zahlen/sechs-zehn": {
    intro: [
      "Del 6 al 10. «sechs» suena «seks»; «sieben» empieza con una «s» zumbada, como una «z» inglesa; «acht» lleva la «ch» raspada de garganta; y «neun» suena «noin», porque «eu» se lee «oi».",
      "Con estos números ya podés hacer cuentas en alemán: «Drei plus vier ist sieben».",
    ],
    summary: [
      "6 sechs · 7 sieben · 8 acht · 9 neun · 10 zehn.",
      "«eu» suena «oi»; la «ch» después de a, o o u es raspada.",
    ],
  },
  "zahlen/alter": {
    intro: [
      "En alemán no se «tiene» una edad: se «es» de una edad. «Ich bin zehn Jahre alt» significa literalmente «soy diez años viejo». Es distinto del español, donde decimos «tengo diez años».",
      "Para preguntar: «Wie alt bist du?». «das Jahr» es neutro y su plural es «die Jahre»: después de un número se usa el plural.",
    ],
    summary: [
      "«Ich bin … Jahre alt» = tengo … años (se usa «sein», no «haben»).",
      "«Wie alt bist du?» = ¿cuántos años tenés?",
    ],
  },

  // ---------- Unidad 3: En el café
  "cafe/getraenke": {
    intro: [
      "Todos los sustantivos alemanes tienen género y se escriben con mayúscula. Hay tres géneros: masculino «der», femenino «die» y neutro «das». El género no siempre coincide con el español: «das Wasser» (el agua) es neutro.",
      "Por eso conviene aprender cada palabra junto con su artículo: «der Kaffee», no solo «Kaffee». En la app el artículo aparece de color: azul para «der», rojo para «die» y verde para «das».",
      "Un atajo útil: todas las palabras que terminan en «-chen» son neutras, como «das Brötchen».",
    ],
    summary: [
      "der = masculino · die = femenino · das = neutro.",
      "Cada palabra se aprende con su artículo: «der Kaffee», «die Milch», «das Wasser».",
      "Las palabras terminadas en «-chen» siempre son neutras.",
    ],
  },
  "cafe/bestellen": {
    intro: [
      "Para pedir con cortesía se usa «Ich möchte…» (quisiera). Después viene lo que querés, con «ein», «eine» o «einen» (un, una).",
      "Ojo: con las palabras masculinas, «ein» pasa a «einen» cuando es lo que pedís (el objeto): «Ich möchte einen Kaffee». Con las neutras («ein Wasser») y las femeninas («eine Limonade») no cambia nada. A este cambio se lo llama acusativo.",
      "El mozo te va a preguntar «Was möchten Sie?» (¿qué desea?) y «Sonst noch etwas?» (¿algo más?).",
    ],
    summary: [
      "«Ich möchte…» = quisiera… (cortés).",
      "Masculino como objeto → «einen»; femenino → «eine»; neutro → «ein».",
      "«Was möchten Sie?» = ¿qué desea? · «Sonst noch etwas?» = ¿algo más?",
    ],
  },
  "cafe/bezahlen": {
    intro: [
      "Para pagar se dice «Die Rechnung, bitte» (la cuenta, por favor). En Alemania es muy común que cada uno pague lo suyo, por eso el mozo pregunta «Zusammen oder getrennt?» (¿juntos o separado?).",
      "Los precios se preguntan con «Was kostet…?» y se contestan con «Das kostet … Euro». Con «Stimmt so» le decís al mozo que se quede con el vuelto.",
    ],
    summary: [
      "«Die Rechnung, bitte» = la cuenta, por favor.",
      "«Was kostet…?» = ¿cuánto cuesta…? · «Das kostet … Euro» = cuesta … euros.",
      "«Zusammen oder getrennt?» = ¿juntos o separado? · «Stimmt so» = quédese con el cambio.",
    ],
  },

  // ---------- Unidad 4: La familia
  "familie/familie": {
    intro: [
      "Los miembros de la familia: «die Mutter», «der Vater», «die Schwester», «der Bruder». Fijate en el género de cada uno: hay que aprenderlos con su artículo.",
      "«die Eltern» (los padres) solo existe en plural, y no significa «parientes». En plural el artículo es siempre «die»: «die Kinder» son los niños o los hijos.",
    ],
    summary: [
      "die Mutter · der Vater · die Schwester · der Bruder · die Eltern · das Kind.",
      "«die Eltern» = los padres (solo plural).",
    ],
  },
  "familie/mein": {
    intro: [
      "«mein» y «dein» (mi y tu) cambian según el género de lo que se posee, no de quién es el dueño: «mein Vater» (masculino), «meine Mutter» (femenino), «mein Kind» (neutro) y «meine Eltern» (plural).",
      "Es igual que «ein/eine»: masculino y neutro sin terminación; femenino y plural con «-e». Lo mismo vale para «dein/deine».",
    ],
    summary: [
      "mein / dein con masculino y neutro; meine / deine con femenino y plural.",
      "«Das ist mein Bruder» = este es mi hermano.",
    ],
  },
  "familie/haben": {
    intro: [
      "«haben» (tener) es irregular: ich habe, du hast, er hat. Después de «haben», un masculino pasa a «einen»: «Ich habe einen Bruder».",
      "Para negar un sustantivo se usa «kein / keine / keinen» (ningún), que se comporta igual que «ein»: «Ich habe keine Geschwister» (no tengo hermanos). «Geschwister» es hermanos y hermanas en conjunto.",
      "Atención: «sie» en minúscula es «ella» o «ellos»; «Sie» con mayúscula es «usted».",
    ],
    summary: [
      "ich habe · du hast · er/sie hat.",
      "«Ich habe einen Bruder / eine Schwester / keine Geschwister».",
      "«kein» niega un sustantivo y cambia como «ein».",
    ],
  },

  // ---------- Unidad 5: ¿Qué hacés?
  "verben/ich-du": {
    intro: [
      "Los verbos alemanes en infinitivo terminan en «-en» (wohnen, lernen). Para conjugarlos se quita el «-en» y se agrega la terminación: con «ich», «-e»; con «du», «-st». «wohnen» → ich wohne, du wohnst.",
      "Si la raíz termina en «t» (arbeiten), se agrega una «e» para poder pronunciarla: «du arbeitest».",
      "A diferencia del español, el pronombre es obligatorio: se dice «Ich wohne», no solo «wohne».",
    ],
    summary: [
      "Raíz + «-e» con ich y raíz + «-st» con du.",
      "Raíz en «-t»: «du arbeitest».",
      "El pronombre es obligatorio.",
    ],
  },
  "verben/er-wir": {
    intro: [
      "Con «er / sie / es» la terminación es «-t» («er spielt»), y con «ihr» también («ihr wohnt»). Con «wir», «sie» (ellos) y «Sie» (usted) el verbo queda igual que el infinitivo: «wir lernen».",
      "Para decir que algo te gusta hacer se pone «gern» después del verbo: «Ich koche gern» (me gusta cocinar).",
    ],
    summary: [
      "er/sie/es y ihr: raíz + «-t». wir, sie y Sie: igual que el infinitivo.",
      "Verbo + «gern» = me gusta hacerlo.",
    ],
  },
  "verben/sein-haben": {
    intro: [
      "«sein» (ser o estar) y «haben» (tener) son irregulares: no siguen la regla y hay que aprenderlos de memoria.",
      "ich bin, du bist, er ist, wir sind · ich habe, du hast, er hat, wir haben. Fijate que «sein» sirve para «ser» y para «estar»: «Ich bin in Berlin».",
    ],
    summary: [
      "sein: ich bin · du bist · er ist · wir sind.",
      "haben: ich habe · du hast · er hat · wir haben.",
    ],
  },

  // ---------- Unidad 6: Días y horas
  "zeit/wochentage": {
    intro: [
      "Los días de la semana son masculinos («der Montag») y se escriben con mayúscula. Para decir «el lunes» se usa «am Montag».",
      "«Mittwoch» significa literalmente «mitad de semana», y es una forma fácil de acordarte de que es el día del medio.",
    ],
    summary: [
      "Montag · Dienstag · Mittwoch · Donnerstag · Freitag · Samstag · Sonntag.",
      "«am Montag» = el lunes.",
    ],
  },
  "zeit/uhrzeit": {
    intro: [
      "La hora se dice «Es ist drei Uhr». «Uhr» es la hora en punto. Para preguntar: «Wie spät ist es?».",
      "Ojo con «halb»: «halb vier» no es «cuatro y media» sino media hora ANTES de las cuatro, o sea tres y media. Para el cuarto: «Viertel nach» (y cuarto) y «Viertel vor» (menos cuarto).",
      "«um» + hora significa «a las…»: «um acht Uhr» (a las ocho).",
    ],
    summary: [
      "«Wie spät ist es?» · «Es ist drei Uhr».",
      "«halb vier» = tres y media (media hora antes de las cuatro).",
      "«Viertel nach / vor» = y cuarto / menos cuarto. «um acht Uhr» = a las ocho.",
    ],
  },
  "zeit/termine": {
    intro: [
      "Esta es la regla de oro del alemán: el verbo conjugado va siempre en SEGUNDO lugar. Si empezás la frase con otra cosa, como «Am Wochenende», el sujeto pasa detrás del verbo: «Am Wochenende habe ich Zeit».",
      "Para proponer algo: «Hast du Zeit?». Para rechazar con cortesía: «Leider nicht».",
    ],
    summary: [
      "El verbo conjugado va en segundo lugar.",
      "«Am Wochenende habe ich Zeit» (el sujeto pasa después del verbo).",
    ],
  },

  // ---------- Unidad 7: En el mercado
  "markt/elf-zwanzig": {
    intro: [
      "Del 13 al 19 los números se arman con la unidad + «zehn»: drei-zehn, vier-zehn, fünf-zehn… Dos pierden letras: «sechs» → «sechzehn» y «sieben» → «siebzehn».",
      "«elf» (11) y «zwölf» (12) son especiales: hay que aprenderlos tal cual. «zwanzig» (20) cierra la serie.",
    ],
    summary: [
      "11 elf · 12 zwölf · 13 dreizehn … 19 neunzehn · 20 zwanzig.",
      "«sechzehn» y «siebzehn» pierden letras.",
    ],
  },
  "markt/bis-hundert": {
    intro: [
      "Los números de dos cifras se dicen AL REVÉS: primero la unidad, luego «und» y después la decena, todo pegado en una palabra. 21 es «einundzwanzig» (literalmente «uno-y-veinte»).",
      "Las decenas terminan en «-zig» (vierzig, fünfzig) salvo «dreißig». «sechzig» y «siebzig» pierden letras. «hundert» es cien.",
    ],
    summary: [
      "21 = einundzwanzig: unidad + und + decena.",
      "30 dreißig · 40 vierzig · 50 fünfzig · 60 sechzig · 70 siebzig · 80 achtzig · 90 neunzig · 100 hundert.",
    ],
  },
  "markt/einkaufen": {
    intro: [
      "Para comprar por cantidad se dice «ein Kilo Tomaten» (un kilo de tomates), sin «de». El plural de «der Apfel» es «die Äpfel»: la «a» pasa a «ä».",
      "Para cobrar se dice «Das macht … Euro». «teuer» es caro y «billig» es barato.",
    ],
    summary: [
      "«ein Kilo Tomaten» = un kilo de tomates (sin «de»).",
      "«Das macht … Euro» = son … euros. «teuer» = caro · «billig» = barato.",
    ],
  },

  // ---------- Unidad 8: Mi día
  "alltag/morgens": {
    intro: [
      "«aufstehen» (levantarse) es un verbo separable: el prefijo «auf» se separa y va al final de la frase. «Ich stehe um sieben Uhr auf».",
      "«morgens» y «abends» (a la mañana, a la noche) con una «s» final indican algo que hacés habitualmente.",
    ],
    summary: [
      "«Ich stehe um sieben Uhr auf»: el prefijo va al final.",
      "morgens = a la mañana (siempre) · abends = a la noche (siempre).",
    ],
  },
  "alltag/trennbar": {
    intro: [
      "Muchos verbos tienen un prefijo que se separa: «einkaufen» → «Ich kaufe ein»; «anrufen» → «Ich rufe dich an»; «fernsehen» → «Ich sehe fern». El verbo conjugado va en segunda posición y el prefijo queda al final.",
      "En una orden también se separa: «Ruf mich an!» (¡llamame!).",
    ],
    summary: [
      "Verbo separable: el verbo va en segundo lugar y el prefijo al final.",
      "einkaufen · anrufen · fernsehen.",
    ],
  },
  "alltag/mein-tag": {
    intro: [
      "Para ordenar lo que hacés durante el día: «zuerst» (primero), «dann» (después) y «danach» (después de eso).",
      "Recordá la regla del verbo en segundo lugar: en «Dann frühstücke ich», «dann» ocupa el primer lugar, así que el verbo viene enseguida y el sujeto va detrás.",
    ],
    summary: [
      "zuerst = primero · dann = después · danach = después de eso.",
      "Después de esas palabras, el verbo va enseguida.",
    ],
  },

  // ---------- Unidad 9: La casa
  "wohnung/zimmer": {
    intro: [
      "Las partes de una vivienda: «das Haus» (la casa), «die Wohnung» (el departamento), «das Zimmer» (el ambiente), «die Küche» y «das Bad». Cuando alguien dice cuántos «Zimmer» tiene, no cuenta la cocina ni el baño.",
      "Muchas palabras alemanas se arman pegando otras: «wohnen» (vivir) + «Zimmer» = «Wohnzimmer» (living); «schlafen» (dormir) + «Zimmer» = «Schlafzimmer» (dormitorio).",
    ],
    summary: [
      "das Haus · die Wohnung · das Zimmer · die Küche · das Bad.",
      "Palabras compuestas: Wohn + zimmer = Wohnzimmer; Schlaf + zimmer = Schlafzimmer.",
    ],
  },
  "wohnung/moebel": {
    intro: [
      "Los muebles: «der Tisch», «der Stuhl», «das Bett», «der Schrank», «die Lampe»… Cuando decís qué querés (acusativo), solo cambia el masculino: «der Tisch» pasa a «den Tisch». «die» y «das» quedan igual: «Ich möchte den Tisch / die Lampe / das Bett».",
    ],
    summary: [
      "Acusativo: der → den; die y das no cambian.",
      "«Ich möchte den Tisch» = quisiera la mesa.",
    ],
  },
  "wohnung/beschreiben": {
    intro: [
      "Después de «ist», el adjetivo no cambia ni lleva terminación: «Die Wohnung ist groß». La «ß» es una «s» fuerte.",
      "«alt» ya lo viste con la edad; con las cosas significa «viejo». «hell» describe un lugar con mucha luz.",
    ],
    summary: [
      "groß · klein · schön · neu · alt · hell.",
      "Después de «ist», el adjetivo no cambia: «Die Küche ist hell».",
    ],
  },
  "wohnung/suchen": {
    intro: [
      "Para buscar departamento: «Ich suche eine Wohnung». El alquiler es «die Miete» y se paga «im Monat» (por mes). «günstig» suena más amable que «billig», que a veces suena a mala calidad.",
      "Los números grandes se pegan en una sola palabra: «sechs» + «hundert» = «sechshundert» (600).",
    ],
    summary: [
      "«Ich suche eine Wohnung» · «die Miete» = el alquiler · «im Monat» = por mes.",
      "sechshundert = 600.",
    ],
  },
  "wohnung/plural": {
    intro: [
      "En plural el artículo es siempre «die», sin importar si el singular era der, die o das. No hay una regla perfecta para formar el plural, pero hay patrones: las femeninas suman «-n» o «-en», muchas masculinas suman «-e» (a veces con umlaut), y las palabras en «-er», «-el» y «-en» no cambian.",
      "Por eso lo mejor es aprender cada sustantivo con su plural.",
    ],
    summary: [
      "Plural: siempre «die».",
      "die Lampe → die Lampen · der Tisch → die Tische · der Stuhl → die Stühle · das Zimmer → die Zimmer.",
      "«Das ist» (uno) → «Das sind» (varios).",
    ],
  },
  "wohnung/lesen": { intro: [READING_TIP], summary: ["Aprendiste palabras nuevas para describir una vivienda: der Garten, ruhig."] },

  // ---------- Unidad 10: La ciudad
  "stadt/orte": {
    intro: [
      "«Es gibt» + acusativo significa «hay»: «Es gibt einen Park» (hay un parque). Como es acusativo, el masculino pasa a «einen». Para negar: «keinen / keine»: «Es gibt keine Bank».",
      "Para preguntar si hay algo se invierte: «Gibt es einen Bahnhof?».",
    ],
    summary: [
      "«Es gibt…» = hay… · «Gibt es…?» = ¿hay…?",
      "«Es gibt einen Park» · «Es gibt keine Bank».",
    ],
  },
  "stadt/weg": {
    intro: [
      "Para preguntar el camino: «Entschuldigung, wo ist…?». Las indicaciones a un desconocido se dan en forma de «Sie»: el verbo va primero. «Gehen Sie geradeaus» (siga derecho).",
      "«zum» y «zur» (al / a la) los vas a entender en la lección de gramática de esta unidad.",
    ],
    summary: [
      "«Wo ist…?» = ¿dónde está…? · «geradeaus» = todo derecho · «links / rechts».",
      "«Gehen Sie…» = vaya… (forma de «Sie»).",
    ],
  },
  "stadt/verkehr": {
    intro: [
      "Para decir con qué viajás se usa «mit» + dativo: «Ich fahre mit dem Bus». «mit» siempre exige dativo, y el dativo cambia el artículo: «der Bus» pasa a «dem Bus» y «die U-Bahn», a «der U-Bahn».",
      "«nach» + ciudad significa «a»: «eine Fahrkarte nach München».",
    ],
    summary: [
      "«mit» + dativo: mit dem Bus · mit der U-Bahn · mit dem Zug.",
      "«nach» + ciudad = a. «zu Fuß» = a pie.",
    ],
  },
  "stadt/dativ": {
    intro: [
      "El dativo es un «caso»: la forma que toma el artículo después de ciertas palabras. Ya lo usaste sin saberlo en «mit dem Bus». Los artículos cambian así: der y das pasan a «dem», die pasa a «der» y el plural pasa a «den».",
      "Hay unas contracciones muy usadas: «zu» + dem = «zum», «zu» + der = «zur» e «in» + dem = «im».",
    ],
    summary: [
      "Dativo: der/das → dem · die → der · plural → den.",
      "Siempre piden dativo: mit, zu, bei, nach, von, aus.",
      "zum = zu + dem · zur = zu + der · im = in + dem.",
    ],
  },
  "stadt/lesen": { intro: [READING_TIP], summary: ["Aprendiste palabras para describir una ciudad: das Zentrum, die Kirche, der Platz."] },

  // ---------- Unidad 11: Comida y gustos
  "essen/mahlzeiten": {
    intro: [
      "Las comidas del día: «das Frühstück», «das Mittagessen», «das Abendessen». Fijate que se arman pegando palabras: «Mittag» (mediodía) + «Essen» (comida).",
      "Para pedir algo sin decir cuánto se usa sin artículo: «Ich möchte Brot» (quisiera pan).",
    ],
    summary: [
      "das Frühstück · das Mittagessen · das Abendessen.",
      "der Käse · der Fisch · das Fleisch · das Brot · das Ei.",
    ],
  },
  "essen/moegen": {
    intro: [
      "Hay dos formas de decir que algo te gusta: «gern» con un verbo («Ich esse gern Käse») y «mögen» con un sustantivo («Ich mag Fisch»). Para negar: «nicht gern» o «kein»: «Ich mag keinen Fisch».",
      "«mögen» es irregular: ich mag, du magst, er mag.",
    ],
    summary: [
      "Verbo + «gern» = me gusta hacerlo · «mögen» + sustantivo = me gusta.",
      "«Ich mag keinen Fisch» = no me gusta el pescado.",
    ],
  },
  "essen/restaurant": {
    intro: [
      "En el restaurante: «die Speisekarte» (la carta), «Ich nehme…» (me quedo con…), «Guten Appetit!». Para la cuenta, «Zahlen, bitte!».",
      "Las mujeres dicen «Ich bin Vegetarierin»: para el femenino se agrega «-in» al final de la palabra.",
    ],
    summary: [
      "«Ich nehme…» = me quedo con… · «Zahlen, bitte!» = la cuenta, por favor.",
      "Femenino de una profesión o condición: + «-in» (Vegetarier → Vegetarierin).",
    ],
  },
  "essen/verben-e-i": {
    intro: [
      "Algunos verbos muy comunes cambian la vocal del medio con «du» y con «er/sie/es»: «essen» → du isst, er isst; «nehmen» → du nimmst, er nimmt; «sprechen» → du sprichst, er spricht (e pasa a i). «fahren» → du fährst, er fährt (a pasa a ä).",
      "Con «ich», «wir», «ihr» y «sie» se conjugan de forma regular.",
    ],
    summary: [
      "e → i: essen, nehmen, sprechen · a → ä: fahren, schlafen.",
      "El cambio es solo con «du» y «er/sie/es».",
    ],
  },
  "essen/lesen": { intro: [READING_TIP], summary: ["Aprendiste nombres de comidas: der Reis, die Kartoffel, das Gemüse."] },

  // ---------- Unidad 12: Poder, deber, querer
  "modal/koennen": {
    intro: [
      "«können» es un verbo modal: se conjuga y va en segunda posición, y el otro verbo queda en infinitivo AL FINAL de la frase: «Ich kann Deutsch sprechen». Significa poder y también saber hacer algo: «Ich kann schwimmen» (sé nadar).",
      "Para negar se agrega «nicht» antes del verbo final: «Ich kann nicht tanzen».",
    ],
    summary: [
      "«können» + infinitivo al final: «Ich kann schwimmen».",
      "«Ich kann nicht tanzen» = no sé bailar.",
    ],
  },
  "modal/wollen-muessen": {
    intro: [
      "Otros dos modales: «wollen» (querer) y «müssen» (tener que). Funcionan igual que «können»: segunda posición más infinitivo al final. «wollen» es directo; para pedir con cortesía se usa «möchten».",
    ],
    summary: [
      "«Ich will…» = quiero… · «Ich muss…» = tengo que…",
      "El otro verbo va al final, en infinitivo.",
    ],
  },
  "modal/hoeflich": {
    intro: [
      "Frases de supervivencia para cuando no entendés: «Wie bitte?», «Noch einmal, bitte», «Ich verstehe nicht», «Können Sie langsamer sprechen?». Son las más útiles al empezar: usalas sin vergüenza, a todos los alemanes les resulta normal.",
    ],
    summary: [
      "«Wie bitte?» = ¿perdón? · «Noch einmal, bitte» = otra vez, por favor.",
      "«Ich verstehe nicht» = no entiendo · «Können Sie langsamer sprechen?» = ¿puede hablar más despacio?",
    ],
  },
  "modal/modalverben": {
    intro: [
      "Esta lección ordena lo que viste: los modales se conjugan en segunda posición y el infinitivo va al final. Con «ich» y con «er/sie/es» no llevan terminación: «ich kann», «er kann».",
    ],
    summary: [
      "ich kann · du kannst · er kann · wir können.",
      "ich muss · du musst · ich will · du willst.",
      "«möchten» es la forma cortés de «wollen».",
    ],
  },
  "modal/lesen": { intro: [READING_TIP], summary: ["Aprendiste palabras para planear un viaje: die Reise, früh."] },

  // ---------- Unidad 13: El pasado
  "perfekt/partizip": {
    intro: [
      "El Perfekt es el pasado que se usa al hablar. Se forma con «haben» conjugado (en segunda posición) y un participio al final: «Ich habe gekocht». El participio regular es ge- + raíz + -t («lernen» → «gelernt»).",
      "Si la raíz termina en t o d, se agrega «-et»: «arbeiten» → «gearbeitet».",
    ],
    summary: [
      "Perfekt = haben + participio al final.",
      "Participio regular: ge- + raíz + -t (gelernt, gekocht, gespielt).",
    ],
  },
  "perfekt/irregulaer": {
    intro: [
      "Los participios irregulares terminan en «-en» y a veces cambian la raíz: «trinken» → «getrunken», «essen» → «gegessen», «sehen» → «gesehen». Hay que aprenderlos de memoria, de a poco.",
      "Los verbos que empiezan con be-, ver-, er- no llevan «ge-»: «bezahlen» → «bezahlt».",
    ],
    summary: [
      "getrunken · gegessen · gesehen · gelesen · geschlafen · gesprochen.",
      "be-, ver-, er-: sin «ge-» (bezahlt).",
    ],
  },
  "perfekt/bewegung": {
    intro: [
      "Los verbos de movimiento o de cambio de lugar forman el Perfekt con «sein» en lugar de «haben»: «Ich bin nach Hause gegangen».",
      "«sein» y «haben» tienen además un pasado corto propio, que se usa al hablar en vez del Perfekt: «Ich war zu Hause».",
    ],
    summary: [
      "gehen, fahren, aufstehen → «sein» + participio.",
      "«war» = estaba/estuve (pasado de «sein»).",
    ],
  },
  "perfekt/perfekt-regeln": {
    intro: [
      "Esta lección junta lo que viste: cómo se forma el participio, cuándo usar «haben» y cuándo «sein», y los pasados cortos «war» y «hatte».",
    ],
    summary: [
      "Casi todos los verbos usan «haben»; los de movimiento usan «sein».",
      "ich war · du warst · wir waren / ich hatte · du hattest · wir hatten.",
    ],
  },
  "perfekt/lesen": { intro: [READING_TIP], summary: ["Aprendiste palabras de viaje: der Ausflug, das Museum, das Foto."] },

  // ---------- Unidad 14: Preparación para el examen
  "pruefung/monate1": {
    intro: [
      "Los meses son masculinos y se escriben con mayúscula: «der Januar». Para decir «en + mes» se usa «im»: «im Januar». Para un período: «von… bis…» (de… a…).",
    ],
    summary: [
      "Januar · Februar · März · April · Mai · Juni.",
      "«im Januar» = en enero · «von März bis Juni» = de marzo a junio.",
    ],
  },
  "pruefung/monate2": {
    intro: [
      "La segunda mitad del año. Ya sabés usar «im» para decir «en + mes». «der Urlaub» (las vacaciones) está en singular en alemán.",
    ],
    summary: [
      "Juli · August · September · Oktober · November · Dezember.",
      "«Ich habe im August Urlaub» = tengo vacaciones en agosto.",
    ],
  },
  "pruefung/geburtstag": {
    intro: [
      "Para las fechas se usan los números ordinales: 1.º es «erste», 2.º «zweite», 3.º «dritte», del 4.º al 19.º se agrega «-te» al número y desde el 20.º se agrega «-ste». Con «am» terminan en «-n»: «am ersten Mai».",
      "Para preguntar: «Wann hast du Geburtstag?», literalmente «¿cuándo tenés cumpleaños?».",
    ],
    summary: [
      "erste · zweite · dritte · vierte… zehnte… zwanzigste.",
      "«am dritten Juni» = el 3 de junio.",
    ],
  },
  "pruefung/formular": {
    intro: [
      "Para llenar un formulario necesitás saber deletrear: las letras alemanas tienen otro nombre que en español. Escuchalas en los ejemplos con 🔊. También hay letras especiales: ä, ö, ü y ß («Eszett»).",
    ],
    summary: [
      "der Vorname · der Nachname · die Adresse · die Telefonnummer.",
      "«Wie schreibt man das?» · «Können Sie das buchstabieren?»",
    ],
  },
  "pruefung/durchsage": {
    intro: [
      "Los anuncios de la estación usan palabras muy repetidas: «Abfahrt» (salida), «Ankunft» (llegada), «Gleis» (vía) y «Verspätung» (retraso). Si las reconocés, entendés casi todo.",
      "«abfahren» es un verbo separable: «Der Zug fährt um zehn Uhr ab».",
    ],
    summary: [
      "die Abfahrt · die Ankunft · das Gleis · die Verspätung.",
      "«Der Zug hat zehn Minuten Verspätung» = el tren tiene diez minutos de retraso.",
    ],
  },
  "pruefung/wiederholung": {
    intro: [
      "Repaso de los tres casos: nominativo (el sujeto), acusativo (el objeto directo) y dativo (después de «mit», «zu», «bei», «nach»…). También repasamos el orden de la oración y la diferencia entre «kein» y «nicht».",
    ],
    summary: [
      "Nominativo der/die/das · acusativo den/die/das · dativo dem/der/dem.",
      "«kein» niega un sustantivo; «nicht» niega todo lo demás.",
      "El verbo conjugado va casi siempre en segundo lugar.",
    ],
  },
  "pruefung/lesen": { intro: [READING_TIP], summary: ["Aprendiste palabras para estudiar: die Stunde, das Wort, schwer, üben."] },
};

Object.assign(INTROS, INTROS_A2, INTROS_B1, INTROS_B2);
