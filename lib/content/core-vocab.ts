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
bekommen|recibir|Wir bekommen morgen Besuch.|Mañana recibimos visitas.
holen|ir a buscar / traer|Ich hole schnell ein Glas Wasser.|Traigo rápido un vaso de agua.
legen|poner (acostado)|Wir legen die Karte auf den Tisch.|Ponemos el mapa sobre la mesa.
stellen|poner (parado)|Wir stellen die Flasche auf den Boden.|Ponemos la botella en el piso.
setzen|sentar / poner|Wir setzen uns an den Tisch.|Nos sentamos a la mesa.
ziehen|tirar / mudarse|Wir ziehen im Mai um.|Nos mudamos en mayo.
drücken|apretar|Wir drücken auf den Knopf.|Apretamos el botón.
werfen|tirar / arrojar|Wir werfen den Ball.|Tiramos la pelota.
fallen|caer|Die Blätter fallen im Herbst.|Las hojas caen en otoño.
springen|saltar|Die Kinder springen ins Wasser.|Los chicos saltan al agua.
steigen|subir|Die Preise steigen jedes Jahr.|Los precios suben cada año.
schlafen|dormir|Wir schlafen acht Stunden.|Dormimos ocho horas.
träumen|soñar|Wir träumen von einem Haus.|Soñamos con una casa.
aufräumen|ordenar|Ich muss mein Zimmer aufräumen.|Tengo que ordenar mi cuarto.
anziehen|vestirse / ponerse (ropa)|Im Winter muss man sich warm anziehen.|En invierno hay que abrigarse bien.
einladen|invitar|Ich möchte dich zum Essen einladen.|Quiero invitarte a comer.
besuchen|visitar|Wir besuchen morgen unsere Oma.|Mañana visitamos a nuestra abuela.
benutzen|usar|Wir benutzen den Bus.|Usamos el colectivo.
bauen|construir|Wir bauen ein Haus.|Construimos una casa.
zählen|contar (números)|Wir zählen bis zehn.|Contamos hasta diez.
rechnen|calcular / contar con|Wir rechnen mit zehn Gästen.|Contamos con diez invitados.
entscheiden|decidir|Wir entscheiden das morgen.|Eso lo decidimos mañana.
versuchen|intentar|Wir versuchen es noch einmal.|Lo intentamos otra vez.
probieren|probar|Wir probieren den Kuchen.|Probamos la torta.
vorschlagen|proponer|Ich möchte etwas vorschlagen.|Quiero proponer algo.
erlauben|permitir|Wir erlauben das nicht.|No permitimos eso.
verbieten|prohibir|Wir verbieten das Rauchen.|Prohibimos fumar.
erzählen|contar (una historia)|Wir erzählen eine Geschichte.|Contamos una historia.
kennen|conocer (algo o a alguien)|Wir kennen die Stadt gut.|Conocemos bien la ciudad.
kennenlernen|conocer (a alguien nuevo)|Ich möchte dich kennenlernen.|Quiero conocerte.
verlassen|dejar / abandonar|Wir verlassen das Haus um acht.|Salimos de la casa a las ocho.
verpassen|perder (un tren)|Wir verpassen den Zug.|Perdemos el tren.
ankommen|llegar|Wann wollen wir ankommen?|¿Cuándo queremos llegar?
abfahren|salir (un vehículo)|Der Zug soll um acht abfahren.|El tren tiene que salir a las ocho.
einsteigen|subir (a un vehículo)|Bitte nicht einsteigen!|¡Por favor, no subir!
aussteigen|bajar (de un vehículo)|Wir müssen in Köln aussteigen.|Tenemos que bajar en Colonia.
reservieren|reservar|Wir reservieren einen Tisch.|Reservamos una mesa.
bestellen|pedir (encargar)|Wir bestellen zwei Kaffee.|Pedimos dos cafés.
ausgeben|gastar (dinero)|Ich will nicht so viel Geld ausgeben.|No quiero gastar tanta plata.
verdienen|ganar (dinero)|Wir verdienen nicht viel.|No ganamos mucho.
leihen|prestar / pedir prestado|Kannst du mir deinen Stift leihen?|¿Me prestás tu lapicera?
schenken|regalar|Wir schenken ihr ein Buch.|Le regalamos un libro.
gewinnen|ganar (una competencia)|Wir gewinnen das Spiel.|Ganamos el partido.
ändern|cambiar (modificar)|Wir ändern den Plan.|Cambiamos el plan.
wechseln|cambiar (de lugar o de ropa)|Wir wechseln das Hotel.|Cambiamos de hotel.
wachsen|crecer|Die Kinder wachsen schnell.|Los chicos crecen rápido.
sterben|morir|Viele Tiere sterben im Winter.|Muchos animales mueren en invierno.
passieren|pasar / ocurrir|Was ist hier passiert?|¿Qué pasó acá?
scheinen|brillar / parecer|Die Sonne scheint heute.|El sol brilla hoy.
aussehen|verse / parecer|Wie soll das aussehen?|¿Cómo se supone que se vea eso?
klingen|sonar|Das klingt gut.|Eso suena bien.
riechen|oler|Hier riecht es nach Kaffee.|Acá huele a café.
fühlen|sentir|Wir fühlen uns hier wohl.|Nos sentimos bien acá.
wünschen|desear|Wir wünschen dir viel Glück.|Te deseamos mucha suerte.
erreichen|alcanzar / llegar a|Wir erreichen den Bahnhof um neun.|Llegamos a la estación a las nueve.
der Kollege|el colega|Mein Kollege kommt aus Polen.|Mi colega es de Polonia.
der Chef|el jefe|Der Chef ist heute nicht da.|El jefe hoy no está.
die Aufgabe|la tarea / el ejercicio|Die Aufgabe ist nicht schwer.|El ejercicio no es difícil.
das Projekt|el proyecto|Das Projekt dauert ein Jahr.|El proyecto dura un año.
der Lohn|el salario|Der Lohn ist zu niedrig.|El salario es demasiado bajo.
die Klasse|el grado / la clase|Die Klasse hat zwanzig Kinder.|El grado tiene veinte chicos.
die Hausaufgabe|la tarea escolar|Die Hausaufgabe ist für morgen.|La tarea es para mañana.
der Test|la prueba|Der Test war nicht schwer.|La prueba no fue difícil.
das Heft|el cuaderno|Mein Heft liegt auf dem Tisch.|Mi cuaderno está sobre la mesa.
der Stift|la lapicera / el lápiz|Hast du einen Stift?|¿Tenés una lapicera?
die Tafel|el pizarrón|Der Lehrer schreibt an die Tafel.|El docente escribe en el pizarrón.
das Wörterbuch|el diccionario|Ich brauche ein Wörterbuch.|Necesito un diccionario.
das Formular|el formulario|Bitte füllen Sie das Formular aus.|Por favor, complete el formulario.
die Unterschrift|la firma|Hier fehlt Ihre Unterschrift.|Acá falta su firma.
die Kamera|la cámara|Die Kamera ist neu.|La cámara es nueva.
das Radio|la radio|Das Radio läuft den ganzen Tag.|La radio anda todo el día.
das Programm|el programa|Das Programm beginnt um acht.|El programa empieza a las ocho.
das Konzert|el concierto|Das Konzert war wunderbar.|El concierto fue maravilloso.
das Theater|el teatro|Wir gehen ins Theater.|Vamos al teatro.
das Kino|el cine|Das Kino ist um die Ecke.|El cine está a la vuelta.
die Hochzeit|el casamiento|Die Hochzeit ist im Mai.|El casamiento es en mayo.
der Besuch|la visita|Wir haben heute Besuch.|Hoy tenemos visitas.
der Nachbar|el vecino|Mein Nachbar ist sehr freundlich.|Mi vecino es muy amable.
das Gesetz|la ley|Das Gesetz ist neu.|La ley es nueva.
die Politik|la política|Ich interessiere mich für Politik.|Me interesa la política.
die Gegend|la zona|Die Gegend ist sehr ruhig.|La zona es muy tranquila.
der Norden|el norte|Im Norden ist es kälter.|En el norte hace más frío.
der Süden|el sur|Im Süden scheint oft die Sonne.|En el sur muchas veces hay sol.
der Osten|el este|Der Osten ist grün.|El este es verde.
der Westen|el oeste|Im Westen wohnen viele Leute.|En el oeste vive mucha gente.
die Insel|la isla|Die Insel ist sehr klein.|La isla es muy chica.
der Fluss|el río|Der Fluss ist breit.|El río es ancho.
die Brücke|el puente|Die Brücke ist alt.|El puente es viejo.
die Landschaft|el paisaje|Die Landschaft ist wunderschön.|El paisaje es hermosísimo.
der Mond|la luna|Der Mond scheint hell.|La luna brilla fuerte.
der Stern|la estrella|Der Stern ist sehr hell.|La estrella es muy brillante.
der Himmel|el cielo|Der Himmel ist blau.|El cielo es azul.
die Erde|la tierra|Die Erde ist rund.|La tierra es redonda.
das Eis|el hielo / el helado|Ich möchte ein Eis.|Quiero un helado.
die Kälte|el frío|Die Kälte ist heute stark.|El frío es fuerte hoy.
die Hitze|el calor (intenso)|Die Hitze ist kaum auszuhalten.|El calor casi no se aguanta.
die Temperatur|la temperatura|Die Temperatur steigt.|La temperatura sube.
der Grad|el grado|Heute sind es zehn Grad.|Hoy hace diez grados.
die Jahreszeit|la estación del año|Der Herbst ist meine liebste Jahreszeit.|El otoño es mi estación favorita.
der Frühling|la primavera|Im Frühling blüht alles.|En primavera florece todo.
der Sommer|el verano|Im Sommer fahren wir ans Meer.|En verano vamos al mar.
der Herbst|el otoño|Im Herbst regnet es viel.|En otoño llueve mucho.
der Anfang|el comienzo|Am Anfang war alles neu.|Al principio todo era nuevo.
die Mitte|el medio|Der Tisch steht in der Mitte.|La mesa está en el medio.
die Gelegenheit|la oportunidad|Das ist eine gute Gelegenheit.|Es una buena oportunidad.
die Möglichkeit|la posibilidad|Es gibt zwei Möglichkeiten.|Hay dos posibilidades.
die Erklärung|la explicación|Die Erklärung ist klar.|La explicación es clara.
der Unterschied|la diferencia|Was ist der Unterschied?|¿Cuál es la diferencia?
die Situation|la situación|Die Situation ist schwierig.|La situación es difícil.
der Erfolg|el éxito|Wir wünschen dir viel Erfolg.|Te deseamos mucho éxito.
der Fortschritt|el progreso|Du machst große Fortschritte.|Hacés grandes progresos.
die Entwicklung|el desarrollo|Die Entwicklung ist positiv.|El desarrollo es positivo.
die Veränderung|el cambio|Die Veränderung ist groß.|El cambio es grande.
der Vorschlag|la propuesta|Das ist ein guter Vorschlag.|Es una buena propuesta.
der Gedanke|el pensamiento|Der Gedanke gefällt mir.|El pensamiento me gusta.
das Gefühl|el sentimiento / la sensación|Ich habe ein gutes Gefühl.|Tengo un buen presentimiento.
die Stimme|la voz|Deine Stimme klingt müde.|Tu voz suena cansada.
das Gespräch|la conversación|Das Gespräch war kurz.|La conversación fue corta.
die Diskussion|la discusión|Die Diskussion war lang.|La discusión fue larga.
das Interview|la entrevista|Das Interview dauert eine Stunde.|La entrevista dura una hora.
die Rede|el discurso|Die Rede war sehr kurz.|El discurso fue muy corto.
die Regel|la regla|Die Regel ist einfach.|La regla es simple.
die Verantwortung|la responsabilidad|Ich übernehme die Verantwortung.|Asumo la responsabilidad.
die Sicherheit|la seguridad|Die Sicherheit ist wichtig.|La seguridad es importante.
die Gefahr|el peligro|Hier gibt es keine Gefahr.|Acá no hay peligro.
der Schutz|la protección|Der Schutz ist wichtig.|La protección es importante.
die Krankheit|la enfermedad|Die Krankheit ist nicht gefährlich.|La enfermedad no es peligrosa.
der Schmerz|el dolor|Der Schmerz ist stark.|El dolor es fuerte.
die Medizin|la medicina|Sie studiert Medizin.|Ella estudia Medicina.
die Nudel|el fideo|Die Nudeln sind fertig.|Los fideos están listos.
das Salz|la sal|Gib mir bitte das Salz.|Pasame la sal, por favor.
der Pfeffer|la pimienta|Der Pfeffer steht neben dem Salz.|La pimienta está al lado de la sal.
das Öl|el aceite|Wir brauchen Öl zum Kochen.|Necesitamos aceite para cocinar.
der Joghurt|el yogur|Ich esse Joghurt zum Frühstück.|Como yogur en el desayuno.
die Marmelade|la mermelada|Die Marmelade ist selbst gemacht.|La mermelada es casera.
der Honig|la miel|Ich nehme Honig statt Zucker.|Uso miel en vez de azúcar.
der Saft|el jugo|Ein Glas Saft, bitte.|Un vaso de jugo, por favor.
der Wein|el vino|Der Wein ist aus Österreich.|El vino es de Austria.
die Limonade|la gaseosa|Die Kinder trinken Limonade.|Los chicos toman gaseosa.
wach|despierto|Ich bin schon wach.|Ya estoy despierto.
fremd|extraño / ajeno|Die Stadt ist mir fremd.|La ciudad me es extraña.
bekannt|conocido|Er ist sehr bekannt.|Es muy conocido.
berühmt|famoso|Die Sängerin ist berühmt.|La cantante es famosa.
dunkel|oscuro|Im Zimmer ist es dunkel.|En el cuarto está oscuro.
breit|ancho|Die Straße ist sehr breit.|La calle es muy ancha.
eng|estrecho / ajustado|Die Hose ist zu eng.|El pantalón es demasiado ajustado.
tief|profundo|Der See ist sehr tief.|El lago es muy profundo.
flach|plano / bajo|Das Land ist flach.|El país es llano.
steil|empinado|Der Weg ist steil.|El camino es empinado.
rund|redondo|Der Tisch ist rund.|La mesa es redonda.
gefährlich|peligroso|Das ist sehr gefährlich.|Eso es muy peligroso.
höflich|cortés|Er ist immer höflich.|Siempre es cortés.
ehrlich|honesto|Sei bitte ehrlich.|Sé honesto, por favor.
klug|inteligente|Das Kind ist sehr klug.|El chico es muy inteligente.
dumm|tonto|Das war eine dumme Idee.|Fue una idea tonta.
faul|vago|Ich bin heute faul.|Hoy estoy vago.
fleißig|aplicado / trabajador|Sie ist sehr fleißig.|Es muy aplicada.
sportlich|deportista|Er ist sehr sportlich.|Es muy deportista.
nötig|necesario|Das ist nicht nötig.|Eso no es necesario.
anders|distinto|Das ist ganz anders.|Eso es completamente distinto.
ähnlich|parecido|Die Wörter sind ähnlich.|Las palabras son parecidas.
normal|normal|Das ist ganz normal.|Eso es totalmente normal.
typisch|típico|Das ist typisch deutsch.|Eso es típicamente alemán.
bestimmt|seguramente|Er kommt bestimmt.|Seguro que viene.
wahrscheinlich|probablemente|Es regnet wahrscheinlich morgen.|Probablemente llueva mañana.
eigentlich|en realidad|Wie heißt du eigentlich?|¿Cómo te llamás, en realidad?
sogar|incluso|Sogar die Kinder sind müde.|Hasta los chicos están cansados.
fast|casi|Wir sind fast fertig.|Casi terminamos.
ungefähr|aproximadamente|Es dauert ungefähr eine Stunde.|Dura aproximadamente una hora.
genau|exacto|Genau, das meine ich.|Exacto, eso digo.
natürlich|por supuesto|Natürlich komme ich.|Por supuesto que voy.
leider|lamentablemente|Leider habe ich keine Zeit.|Lamentablemente no tengo tiempo.
endlich|por fin|Endlich ist Wochenende!|¡Por fin es fin de semana!
plötzlich|de golpe|Plötzlich war das Licht aus.|De golpe se apagó la luz.
meistens|casi siempre|Ich esse meistens zu Hause.|Casi siempre como en casa.
täglich|todos los días|Wir üben täglich.|Practicamos todos los días.
vorher|antes|Rufst du vorher an?|¿Llamás antes?
nachher|después|Wir sehen uns nachher.|Nos vemos después.
inzwischen|mientras tanto|Inzwischen ist es dunkel geworden.|Mientras tanto se hizo de noche.
bisher|hasta ahora|Bisher ist alles gut gegangen.|Hasta ahora salió todo bien.
ebenfalls|igualmente|Danke, ebenfalls!|¡Gracias, igualmente!
also|entonces / bueno|Also gut, gehen wir.|Bueno, vamos.
doch|sí (contradiciendo)|Doch, ich komme mit.|Sí que voy con vos.
sondern|sino|Nicht heute, sondern morgen.|No hoy, sino mañana.
niemand|nadie|Niemand ist zu Hause.|No hay nadie en casa.
irgendwo|en algún lugar|Ich habe das irgendwo gelesen.|Lo leí en algún lado.
überall|en todos lados|Hier gibt es überall Blumen.|Acá hay flores por todos lados.
nirgends|en ningún lado|Ich finde ihn nirgends.|No lo encuentro en ningún lado.
irgendwann|en algún momento|Wir fahren irgendwann nach Japan.|Algún día vamos a Japón.
jedes Mal|cada vez|Jedes Mal vergesse ich es.|Cada vez me olvido.
vor allem|sobre todo|Ich mag vor allem Pizza.|Me gusta sobre todo la pizza.
auf jeden Fall|sí o sí|Ich komme auf jeden Fall.|Voy sí o sí.
zum Glück|por suerte|Zum Glück ist nichts passiert.|Por suerte no pasó nada.
ein paar|unos pocos|Ich habe ein paar Fragen.|Tengo unas preguntas.
`;

/** Palabras del entrenador, en orden de estudio. `unitId: "core"` las distingue de las del currículo. */
export const CORE_VOCAB: (Vocab & { unitId: string })[] = RAW.trim()
  .split("\n")
  .map((line) => {
    const [de, es, exDe, exEs] = line.split("|").map((s) => s.trim());
    return { de, es, example: { de: exDe, es: exEs }, unitId: "core" };
  });
