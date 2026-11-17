// Entrenador de vocabulario: palabras muy frecuentes, en orden de aparición, que el currículo no enseña como palabra suelta.
// Formato por línea: alemán | español | ejemplo | traducción del ejemplo. Los sustantivos llevan artículo.
// Se estudian de a 10 (app/words) y entran al repaso espaciado. Para sumar palabras, agregá líneas al final.

import type { Vocab } from "../curriculum.ts";

const RAW = `
gehen|ir / andar|Wir gehen heute ins Kino.|Hoy vamos al cine.
kommen|venir|Sie kommen aus Spanien.|Ellos vienen de España.
machen|hacer|Was machen wir am Sonntag?|¿Qué hacemos el domingo?
sehen|ver|Wir sehen uns morgen.|Nos vemos mañana.
essen|comer|Wir essen zusammen.|Comemos juntos.
trinken|tomar / beber|Sie trinken gern Tee.|Ellos toman té con gusto.
kaufen|comprar|Wir kaufen frisches Brot.|Compramos pan fresco.
lernen|aprender / estudiar|Wir lernen jeden Tag.|Estudiamos todos los días.
lesen|leer|Sie lesen die Zeitung.|Ellos leen el diario.
schreiben|escribir|Wir schreiben eine Karte.|Escribimos una tarjeta.
nehmen|tomar / llevar|Wir nehmen den Bus.|Tomamos el colectivo.
geben|dar|Wir geben dir das Buch.|Te damos el libro.
finden|encontrar|Wir finden den Weg nicht.|No encontramos el camino.
brauchen|necesitar|Wir brauchen mehr Zeit.|Necesitamos más tiempo.
wissen|saber|Wir wissen die Antwort.|Sabemos la respuesta.
denken|pensar|Wir denken an dich.|Pensamos en vos.
glauben|creer|Wir glauben ihm nicht.|No le creemos.
fragen|preguntar|Wir fragen den Lehrer.|Le preguntamos al docente.
antworten|responder|Sie antworten sofort.|Ellos responden enseguida.
warten|esperar|Wir warten auf den Zug.|Esperamos el tren.
helfen|ayudar|Wir helfen unseren Nachbarn.|Ayudamos a nuestros vecinos.
bleiben|quedarse|Wir bleiben zu Hause.|Nos quedamos en casa.
fahren|ir (en vehículo) / manejar|Wir fahren nach Berlin.|Vamos a Berlín.
liegen|estar (acostado)|Das Buch liegt auf dem Tisch.|El libro está sobre la mesa.
sitzen|estar sentado|Wir sitzen im Park.|Estamos sentados en el parque.
öffnen|abrir|Wir öffnen das Fenster.|Abrimos la ventana.
schließen|cerrar|Wir schließen die Tür.|Cerramos la puerta.
anrufen|llamar por teléfono|Ich möchte dich morgen anrufen.|Quiero llamarte mañana.
lieben|amar|Wir lieben diese Stadt.|Amamos esta ciudad.
leben|vivir (estar vivo)|Wir leben gern hier.|Vivimos con gusto acá.
bringen|traer / llevar|Wir bringen den Kuchen mit.|Llevamos la torta.
zeigen|mostrar|Wir zeigen dir die Stadt.|Te mostramos la ciudad.
suchen|buscar|Wir suchen eine Wohnung.|Buscamos un departamento.
treffen|encontrarse con|Wir treffen unsere Freunde.|Nos encontramos con nuestros amigos.
verstehen|entender|Wir verstehen das nicht.|No entendemos eso.
erklären|explicar|Können Sie das bitte erklären?|¿Puede explicar eso, por favor?
bezahlen|pagar|Wir bezahlen mit Karte.|Pagamos con tarjeta.
kosten|costar|Das Buch kostet zehn Euro.|El libro cuesta diez euros.
dauern|durar|Der Film dauert zwei Stunden.|La película dura dos horas.
beginnen|empezar|Wir beginnen um neun.|Empezamos a las nueve.
lachen|reír|Wir lachen viel zusammen.|Nos reímos mucho juntos.
weinen|llorar|Das Kind weint laut.|El chico llora fuerte.
arbeiten|trabajar|Wir arbeiten von zu Hause.|Trabajamos desde casa.
wohnen|vivir (residir)|Wir wohnen im dritten Stock.|Vivimos en el tercer piso.
kochen|cocinar|Wir kochen heute Nudeln.|Hoy cocinamos fideos.
putzen|limpiar|Wir putzen die Wohnung.|Limpiamos el departamento.
waschen|lavar|Wir waschen die Wäsche.|Lavamos la ropa.
fliegen|volar|Wir fliegen morgen nach Wien.|Mañana volamos a Viena.
mögen|gustar / querer|Wir mögen Musik.|Nos gusta la música.
der Tag|el día|Der Tag war lang.|El día fue largo.
die Woche|la semana|Die Woche ist schon vorbei.|La semana ya pasó.
der Monat|el mes|Der Monat hat dreißig Tage.|El mes tiene treinta días.
der Abend|la noche (tarde-noche)|Am Abend sind wir zu Hause.|A la noche estamos en casa.
der Mensch|la persona|Jeder Mensch braucht Freunde.|Cada persona necesita amigos.
der Freund|el amigo|Mein Freund wohnt in Wien.|Mi amigo vive en Viena.
die Freundin|la amiga / la novia|Meine Freundin kommt aus Italien.|Mi amiga es de Italia.
die Familie|la familia|Die Familie isst zusammen.|La familia come junta.
der Junge|el chico|Der Junge spielt im Garten.|El chico juega en el jardín.
der Name|el nombre|Wie ist dein Name?|¿Cómo es tu nombre?
die Sprache|el idioma|Ich lerne eine neue Sprache.|Aprendo un idioma nuevo.
das Dorf|el pueblo|Wir wohnen in einem Dorf.|Vivimos en un pueblo.
das Flugzeug|el avión|Das Flugzeug ist schon da.|El avión ya está acá.
das Schiff|el barco|Das Schiff fährt um acht.|El barco sale a las ocho.
die Firma|la empresa|Die Firma sucht neue Leute.|La empresa busca gente nueva.
der Preis|el precio|Der Preis ist sehr gut.|El precio es muy bueno.
die Zahl|el número (cantidad)|Die Zahl ist zu hoch.|El número es demasiado alto.
die Nummer|el número (de teléfono)|Wie ist deine Nummer?|¿Cuál es tu número?
das Problem|el problema|Das Problem ist einfach.|El problema es fácil.
die Lösung|la solución|Die Lösung ist ganz einfach.|La solución es muy simple.
die Hilfe|la ayuda|Danke für deine Hilfe!|¡Gracias por tu ayuda!
das Beispiel|el ejemplo|Ein Beispiel, bitte.|Un ejemplo, por favor.
die Information|la información|Ich brauche mehr Informationen.|Necesito más información.
der Satz|la oración|Der Satz ist zu lang.|La oración es demasiado larga.
die Musik|la música|Die Musik ist zu laut.|La música es demasiado fuerte.
der Film|la película|Der Film beginnt um acht.|La película empieza a las ocho.
das Spiel|el juego / el partido|Das Spiel dauert neunzig Minuten.|El partido dura noventa minutos.
die Zeitung|el diario|Die Zeitung liegt auf dem Tisch.|El diario está sobre la mesa.
das Handy|el celular|Mein Handy ist kaputt.|Mi celular está roto.
das Internet|internet|Das Internet ist heute langsam.|Internet está lento hoy.
die Nachricht|el mensaje / la noticia|Ich habe eine Nachricht bekommen.|Recibí un mensaje.
das Tier|el animal|Das Tier schläft im Garten.|El animal duerme en el jardín.
der Hund|el perro|Der Hund heißt Max.|El perro se llama Max.
das Pferd|el caballo|Das Pferd läuft schnell.|El caballo corre rápido.
der Baum|el árbol|Der Baum ist sehr alt.|El árbol es muy viejo.
der Schnee|la nieve|Im Winter gibt es viel Schnee.|En invierno hay mucha nieve.
der Wind|el viento|Heute gibt es starken Wind.|Hoy hay mucho viento.
die Luft|el aire|Die Luft ist hier sauber.|El aire acá es limpio.
das Licht|la luz|Mach bitte das Licht an.|Prendé la luz, por favor.
der Hunger|el hambre|Ich habe großen Hunger.|Tengo mucha hambre.
der Durst|la sed|Ich habe Durst.|Tengo sed.
das Obst|la fruta|Frisches Obst ist gesund.|La fruta fresca es sana.
die Banane|la banana|Die Banane ist noch grün.|La banana todavía está verde.
die Orange|la naranja|Ich möchte eine Orange.|Quiero una naranja.
die Wurst|el embutido / la salchicha|Die Wurst schmeckt gut.|La salchicha es rica.
die Butter|la manteca|Die Butter ist im Kühlschrank.|La manteca está en la heladera.
der Kühlschrank|la heladera|Der Kühlschrank ist leer.|La heladera está vacía.
das Glas|el vaso|Ein Glas Wasser, bitte.|Un vaso de agua, por favor.
die Flasche|la botella|Die Flasche ist leer.|La botella está vacía.
die Tasse|la taza|Eine Tasse Tee, bitte.|Una taza de té, por favor.
der Teller|el plato|Der Teller ist sauber.|El plato está limpio.
das Messer|el cuchillo|Das Messer ist scharf.|El cuchillo está afilado.
die Gabel|el tenedor|Die Gabel liegt links.|El tenedor está a la izquierda.
das Dach|el techo|Das Dach ist neu.|El techo es nuevo.
die Wand|la pared|Das Bild hängt an der Wand.|El cuadro cuelga de la pared.
der Boden|el piso (suelo)|Der Boden ist nass.|El piso está mojado.
die Treppe|la escalera|Die Treppe ist steil.|La escalera es empinada.
der Aufzug|el ascensor|Der Aufzug ist kaputt.|El ascensor está roto.
die Toilette|el baño (inodoro)|Wo ist die Toilette?|¿Dónde está el baño?
die Dusche|la ducha|Die Dusche ist im Bad.|La ducha está en el baño.
das Handtuch|la toalla|Das Handtuch ist nass.|La toalla está mojada.
die Karte|la tarjeta / el mapa|Hast du eine Karte?|¿Tenés una tarjeta?
das Paket|el paquete|Das Paket kommt morgen.|El paquete llega mañana.
das Ticket|el pasaje / la entrada|Das Ticket kostet zehn Euro.|El pasaje cuesta diez euros.
die Fahrt|el viaje (trayecto)|Die Fahrt dauert eine Stunde.|El viaje dura una hora.
das Ziel|la meta / el destino|Das Ziel ist nicht mehr weit.|El destino ya no está lejos.
die Gesundheit|la salud|Gesundheit ist wichtig.|La salud es importante.
der Arzt|el médico|Der Arzt ist freundlich.|El médico es amable.
das Krankenhaus|el hospital|Das Krankenhaus ist nah.|El hospital está cerca.
der Fuß|el pie|Mein Fuß tut weh.|Me duele el pie.
das Auge|el ojo|Meine Augen sind müde.|Mis ojos están cansados.
das Ohr|la oreja|Das Ohr tut weh.|Me duele la oreja.
der Mund|la boca|Mach den Mund auf.|Abrí la boca.
die Nase|la nariz|Meine Nase ist rot.|Mi nariz está roja.
das Herz|el corazón|Das Herz schlägt schnell.|El corazón late rápido.
der Körper|el cuerpo|Der Körper braucht Wasser.|El cuerpo necesita agua.
die Liebe|el amor|Die Liebe ist wichtig.|El amor es importante.
die Angst|el miedo|Ich habe keine Angst.|No tengo miedo.
die Freude|la alegría|Das macht mir große Freude.|Eso me da mucha alegría.
der Spaß|la diversión|Das macht Spaß.|Eso es divertido.
der Streit|la pelea|Der Streit war laut.|La pelea fue fuerte.
die Wäsche|la ropa (para lavar)|Die Wäsche ist noch nass.|La ropa todavía está mojada.
die Gruppe|el grupo|Die Gruppe trifft sich am Montag.|El grupo se reúne el lunes.
der Kurs|el curso|Der Kurs beginnt im März.|El curso empieza en marzo.
der Lehrer|el docente|Der Lehrer erklärt alles langsam.|El docente explica todo despacio.
der Student|el estudiante|Der Student lernt viel.|El estudiante estudia mucho.
der Mantel|el abrigo|Der Mantel ist zu warm.|El abrigo es demasiado abrigado.
die Brille|los anteojos|Meine Brille ist kaputt.|Mis anteojos están rotos.
der Markt|el mercado|Der Markt ist am Samstag.|El mercado es el sábado.
die Kasse|la caja|Die Kasse ist dort.|La caja está allá.
der Kunde|el cliente|Der Kunde wartet.|El cliente espera.
das Ding|la cosa (objeto)|Was ist das für ein Ding?|¿Qué cosa es esa?
die Sache|el asunto / la cosa|Das ist eine wichtige Sache.|Es un asunto importante.
das Mal|la vez|Das erste Mal war schwer.|La primera vez fue difícil.
der Teil|la parte|Ein Teil ist kaputt.|Una parte está rota.
die Seite|la página / el lado|Auf Seite zehn steht alles.|En la página diez está todo.
der Grund|el motivo|Was ist der Grund?|¿Cuál es el motivo?
gut|bueno|Das Essen ist gut.|La comida es buena.
schlecht|malo|Das Wetter ist schlecht.|El clima es malo.
hässlich|feo|Die Farbe ist hässlich.|El color es feo.
lang|largo|Der Weg ist lang.|El camino es largo.
kurz|corto|Der Film ist kurz.|La película es corta.
hoch|alto|Der Berg ist hoch.|La montaña es alta.
niedrig|bajo (no alto)|Der Preis ist niedrig.|El precio es bajo.
dick|gordo / grueso|Das Buch ist dick.|El libro es grueso.
dünn|delgado / fino|Die Wand ist dünn.|La pared es fina.
stark|fuerte|Der Wind ist stark.|El viento es fuerte.
schwach|débil|Das Licht ist schwach.|La luz es débil.
laut|ruidoso / fuerte|Die Musik ist laut.|La música está fuerte.
leise|bajo (volumen) / silencioso|Sprich bitte leise.|Hablá bajito, por favor.
voll|lleno|Der Bus ist voll.|El colectivo está lleno.
leer|vacío|Das Glas ist leer.|El vaso está vacío.
offen|abierto|Die Tür ist offen.|La puerta está abierta.
nah|cerca|Der Bahnhof ist nah.|La estación está cerca.
heiß|caliente|Der Tee ist heiß.|El té está caliente.
nass|mojado|Meine Schuhe sind nass.|Mis zapatos están mojados.
trocken|seco|Die Wäsche ist trocken.|La ropa está seca.
sauber|limpio|Das Zimmer ist sauber.|El cuarto está limpio.
schmutzig|sucio|Die Hose ist schmutzig.|El pantalón está sucio.
hungrig|con hambre|Ich bin sehr hungrig.|Tengo mucha hambre.
durstig|con sed|Bist du auch durstig?|¿Vos también tenés sed?
froh|contento|Ich bin froh, dass du da bist.|Me alegra que estés.
böse|enojado / malo|Der Hund ist nicht böse.|El perro no es malo.
nett|amable|Die Nachbarin ist sehr nett.|La vecina es muy amable.
lustig|gracioso|Der Film ist sehr lustig.|La película es muy graciosa.
interessant|interesante|Das Buch ist interessant.|El libro es interesante.
langweilig|aburrido|Die Stunde war langweilig.|La clase fue aburrida.
möglich|posible|Das ist leider nicht möglich.|Eso lamentablemente no es posible.
einfach|fácil / simple|Die Aufgabe ist einfach.|El ejercicio es fácil.
langsam|lento|Der Zug fährt langsam.|El tren va lento.
selten|raro / pocas veces|Wir sehen uns selten.|Nos vemos pocas veces.
schon|ya|Bist du schon fertig?|¿Ya terminaste?
noch|todavía|Ich bin noch müde.|Todavía estoy cansado.
nur|solo|Ich habe nur zehn Euro.|Tengo solo diez euros.
auch|también|Ich komme auch.|Yo también voy.
aber|pero|Ich möchte, aber ich kann nicht.|Quiero, pero no puedo.
oder|o|Tee oder Kaffee?|¿Té o café?
ganz|todo / completamente|Ich habe den ganzen Tag gearbeitet.|Trabajé todo el día.
mehr|más|Ich möchte mehr Wasser.|Quiero más agua.
weniger|menos|Ich esse weniger Fleisch.|Como menos carne.
viele|muchos|Viele Leute sind da.|Hay mucha gente.
alle|todos|Alle sind müde.|Todos están cansados.
kein|ningún|Ich habe kein Auto.|No tengo auto.
jeder|cada uno|Jeder kennt ihn.|Todos lo conocen.
etwas|algo|Ich möchte etwas essen.|Quiero comer algo.
nichts|nada|Ich habe nichts gehört.|No escuché nada.
man|uno / se (impersonal)|Hier darf man nicht rauchen.|Acá no se puede fumar.
mit|con|Ich fahre mit dem Bus.|Voy en colectivo.
ohne|sin|Ich trinke Kaffee ohne Zucker.|Tomo café sin azúcar.
bei|en / en lo de|Ich bin bei meiner Tante.|Estoy en lo de mi tía.
von|de|Das Geschenk ist von meiner Mutter.|El regalo es de mi mamá.
aus|de / desde|Er kommt aus Peru.|Él es de Perú.
nach|a / después de|Nach der Arbeit gehe ich heim.|Después del trabajo me voy a casa.
durch|por / a través de|Wir gehen durch den Park.|Caminamos por el parque.
gegen|contra|Ich habe nichts gegen Hunde.|No tengo nada contra los perros.
hier|acá|Ich wohne seit zwei Jahren hier.|Vivo acá hace dos años.
dort|allá|Dort ist der Bahnhof.|Allá está la estación.
da|ahí / allí|Da ist mein Bus!|¡Ahí está mi colectivo!
oben|arriba|Oben wohnt eine Familie.|Arriba vive una familia.
unten|abajo|Unten ist die Küche.|Abajo está la cocina.
draußen|afuera|Draußen regnet es.|Afuera llueve.
drinnen|adentro|Drinnen ist es warm.|Adentro hace calor.
jetzt|ahora|Ich habe jetzt keine Zeit.|Ahora no tengo tiempo.
sofort|enseguida|Ich komme sofort.|Voy enseguida.
gleich|ya / enseguida|Der Film beginnt gleich.|La película empieza ya.
wieder|de nuevo|Ich rufe dich wieder an.|Te vuelvo a llamar.
fertig|listo / terminado|Wir sind gleich fertig.|Ya terminamos.
besonders|especialmente|Das Essen ist besonders gut.|La comida es especialmente buena.
wirklich|de verdad|Das ist wirklich schön.|Eso es realmente lindo.
zusammen|juntos|Wir lernen zusammen.|Estudiamos juntos.
allein|solo (sin compañía)|Ich wohne allein.|Vivo solo.
zurück|de vuelta|Ich komme bald zurück.|Vuelvo pronto.
mitten|en el medio|Das Hotel liegt mitten in der Stadt.|El hotel queda en pleno centro.
wann|cuándo|Wann kommst du?|¿Cuándo venís?
warum|por qué|Warum bist du traurig?|¿Por qué estás triste?
wie|cómo|Wie geht es dir?|¿Cómo estás?
was|qué|Was ist das?|¿Qué es esto?
wohin|adónde|Wohin gehst du?|¿Adónde vas?
`;

/** Palabras del entrenador, en orden de estudio. `unitId: "core"` las distingue de las del currículo. */
export const CORE_VOCAB: (Vocab & { unitId: string })[] = RAW.trim()
  .split("\n")
  .map((line) => {
    const [de, es, exDe, exEs] = line.split("|").map((s) => s.trim());
    return { de, es, example: { de: exDe, es: exEs }, unitId: "core" };
  });
