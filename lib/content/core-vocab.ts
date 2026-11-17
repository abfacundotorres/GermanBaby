// Entrenador de vocabulario: palabras muy frecuentes, en orden de aparición, que el currículo no enseña como palabra suelta.
// Formato por línea: alemán | español | ejemplo | traducción del ejemplo. Los sustantivos llevan artículo.
// Se estudian de a 10 (app/words) y entran al repaso espaciado. Una línea «## A1» (o A2, B1, B2) fija el nivel de las que siguen; las tandas se ordenan por nivel.

import type { Vocab } from "../curriculum.ts";

const RAW = `
## A1
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
## A2
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
aufwachen|despertarse|Ich muss morgen früh aufwachen.|Mañana tengo que despertarme temprano.
sich ausruhen|descansar|Wir wollen uns ein bisschen ausruhen.|Queremos descansar un poco.
zumachen|cerrar|Kannst du bitte die Tür zumachen?|¿Podés cerrar la puerta, por favor?
aufmachen|abrir|Darf ich das Fenster aufmachen?|¿Puedo abrir la ventana?
einschalten|prender (un aparato)|Ich möchte den Fernseher einschalten.|Quiero prender el televisor.
ausschalten|apagar (un aparato)|Bitte das Handy ausschalten.|Por favor, apagar el celular.
ausdrucken|imprimir|Ich muss die Karte ausdrucken.|Tengo que imprimir el mapa.
vorlesen|leer en voz alta|Wir wollen den Kindern etwas vorlesen.|Queremos leerles algo a los chicos.
mitkommen|venir con|Willst du mitkommen?|¿Querés venir con nosotros?
mitnehmen|llevar consigo|Wir wollen einen Regenschirm mitnehmen.|Queremos llevar un paraguas.
zurückkommen|volver|Wann wollen wir zurückkommen?|¿Cuándo queremos volver?
weggehen|irse|Ich möchte nicht weggehen.|No quiero irme.
vorbeikommen|pasar por (visitar)|Du kannst gern vorbeikommen.|Podés pasar cuando quieras.
hereinkommen|entrar|Bitte hereinkommen!|¡Pase, por favor!
abbiegen|doblar|Sie müssen links abbiegen.|Tiene que doblar a la izquierda.
parken|estacionar|Hier dürfen wir nicht parken.|Acá no podemos estacionar.
tanken|cargar nafta|Wir müssen noch tanken.|Todavía tenemos que cargar nafta.
losfahren|salir (en vehículo)|Wir wollen früh losfahren.|Queremos salir temprano.
landen|aterrizar|Das Flugzeug soll um acht landen.|El avión tiene que aterrizar a las ocho.
packen|armar la valija|Wir müssen noch die Koffer packen.|Todavía tenemos que armar las valijas.
auspacken|desempacar|Wir wollen die Koffer auspacken.|Queremos desarmar las valijas.
telefonieren|hablar por teléfono|Wir telefonieren jeden Sonntag.|Hablamos por teléfono todos los domingos.
klingeln|tocar el timbre|Jemand klingelt an der Tür.|Alguien toca el timbre.
grüßen|saludar|Bitte grüßen Sie Ihre Familie.|Por favor, salude a su familia.
danken|agradecer|Wir danken Ihnen für alles.|Le agradecemos por todo.
bitten|pedir (rogar)|Wir bitten um Ruhe.|Pedimos silencio.
sich verabschieden|despedirse|Wir wollen uns jetzt verabschieden.|Ahora nos queremos despedir.
sich unterhalten|conversar|Wir unterhalten uns gern mit Leuten.|Nos gusta conversar con la gente.
diskutieren|discutir (un tema)|Wir diskutieren das morgen.|Eso lo discutimos mañana.
berichten|informar / contar|Wir berichten über das Wetter.|Informamos sobre el clima.
mitteilen|comunicar|Wir möchten Ihnen etwas mitteilen.|Queremos comunicarle algo.
gratulieren|felicitar|Wir gratulieren dir zum Geburtstag.|Te felicitamos por tu cumpleaños.
küssen|besar|Die beiden küssen sich.|Los dos se besan.
umarmen|abrazar|Wir umarmen unsere Oma.|Abrazamos a nuestra abuela.
vermissen|extrañar|Wir vermissen dich sehr.|Te extrañamos mucho.
sich verlieben|enamorarse|Sie wollte sich nicht verlieben.|Ella no quería enamorarse.
lächeln|sonreír|Die Kinder lächeln auf dem Foto.|Los chicos sonríen en la foto.
schreien|gritar|Bitte nicht schreien!|¡Por favor, no gritar!
zeichnen|dibujar|Wir zeichnen ein Haus.|Dibujamos una casa.
basteln|hacer manualidades|Wir basteln ein Geschenk.|Hacemos un regalo a mano.
nähen|coser|Meine Oma kann gut nähen.|Mi abuela sabe coser bien.
pflanzen|plantar|Wir pflanzen einen Baum.|Plantamos un árbol.
gießen|regar|Wir gießen die Blumen jeden Tag.|Regamos las flores todos los días.
joggen|hacer jogging|Wir joggen am Morgen.|Hacemos jogging a la mañana.
trainieren|entrenar|Wir trainieren dreimal pro Woche.|Entrenamos tres veces por semana.
klettern|trepar / escalar|Die Kinder klettern auf den Baum.|Los chicos trepan al árbol.
reiten|andar a caballo|Wir wollen am Sonntag reiten.|Queremos andar a caballo el domingo.
angeln|pescar|Mein Opa geht gern angeln.|A mi abuelo le gusta ir a pescar.
der Wecker|el despertador|Der Wecker klingelt um sechs.|El despertador suena a las seis.
der Schlaf|el sueño (dormir)|Ich brauche mehr Schlaf.|Necesito dormir más.
die Zahnbürste|el cepillo de dientes|Meine Zahnbürste ist im Bad.|Mi cepillo de dientes está en el baño.
die Zahnpasta|la pasta dental|Die Zahnpasta ist leer.|Se acabó la pasta dental.
die Seife|el jabón|Die Seife riecht gut.|El jabón huele bien.
das Kissen|la almohada|Das Kissen ist sehr weich.|La almohada es muy blanda.
die Decke|la manta / el techo|Die Decke ist warm.|La manta es abrigada.
die Schublade|el cajón|Die Schlüssel liegen in der Schublade.|Las llaves están en el cajón.
der Vorhang|la cortina|Der Vorhang ist grün.|La cortina es verde.
der Herd|la cocina (artefacto)|Der Herd ist kaputt.|La cocina está rota.
der Ofen|el horno|Der Kuchen ist im Ofen.|La torta está en el horno.
der Topf|la olla|Der Topf ist zu klein.|La olla es demasiado chica.
die Waschmaschine|el lavarropas|Die Waschmaschine ist neu.|El lavarropas es nuevo.
der Staubsauger|la aspiradora|Der Staubsauger ist laut.|La aspiradora es ruidosa.
die Mülltonne|el tacho de basura|Die Mülltonne steht vor dem Haus.|El tacho está frente a la casa.
der Flur|el pasillo / el hall|Im Flur hängt ein Spiegel.|En el pasillo hay un espejo colgado.
die Garage|la cochera|Das Auto steht in der Garage.|El auto está en la cochera.
die Wiese|el prado|Die Kinder spielen auf der Wiese.|Los chicos juegan en el prado.
das Gras|el pasto|Das Gras ist nass.|El pasto está mojado.
das Blatt|la hoja|Das Blatt ist gelb.|La hoja es amarilla.
die Kuh|la vaca|Die Kuh steht auf der Wiese.|La vaca está en el prado.
das Schwein|el cerdo|Das Schwein ist sehr groß.|El cerdo es muy grande.
das Huhn|la gallina|Das Huhn legt ein Ei.|La gallina pone un huevo.
das Schaf|la oveja|Die Schafe sind weiß.|Las ovejas son blancas.
die Ampel|el semáforo|Die Ampel ist rot.|El semáforo está en rojo.
die Kreuzung|el cruce|An der Kreuzung müssen Sie links abbiegen.|En el cruce tiene que doblar a la izquierda.
die Tankstelle|la estación de servicio|Die Tankstelle ist gleich da vorne.|La estación de servicio está ahí adelante.
die Werkstatt|el taller|Das Auto ist in der Werkstatt.|El auto está en el taller.
der Marktplatz|la plaza del mercado|Der Marktplatz ist im Zentrum.|La plaza del mercado está en el centro.
der Briefkasten|el buzón|Der Briefkasten ist leer.|El buzón está vacío.
die Briefmarke|la estampilla|Ich brauche eine Briefmarke.|Necesito una estampilla.
die Bäckerei|la panadería|Die Bäckerei öffnet um sechs.|La panadería abre a las seis.
der Friseur|el peluquero|Ich gehe morgen zum Friseur.|Mañana voy a la peluquería.
die Jugendherberge|el albergue juvenil|Die Jugendherberge ist günstig.|El albergue juvenil es barato.
der Campingplatz|el camping|Der Campingplatz liegt am See.|El camping queda junto al lago.
der Flughafen|el aeropuerto|Der Flughafen ist weit weg.|El aeropuerto queda lejos.
der Hafen|el puerto|Im Hafen liegen viele Schiffe.|En el puerto hay muchos barcos.
die Autobahn|la autopista|Auf der Autobahn ist viel Verkehr.|En la autopista hay mucho tráfico.
der Bäcker|el panadero|Der Bäcker steht um vier auf.|El panadero se levanta a las cuatro.
der Koch|el cocinero|Der Koch ist sehr nett.|El cocinero es muy amable.
der Kellner|el mozo|Der Kellner bringt das Essen.|El mozo trae la comida.
der Polizist|el policía|Der Polizist hilft uns.|El policía nos ayuda.
der Verkäufer|el vendedor|Der Verkäufer ist freundlich.|El vendedor es amable.
der Ingenieur|el ingeniero|Mein Vater ist Ingenieur.|Mi papá es ingeniero.
der Zahnarzt|el dentista|Ich habe einen Termin beim Zahnarzt.|Tengo turno con el dentista.
der Hals|el cuello / la garganta|Mein Hals tut weh.|Me duele la garganta.
der Zahn|el diente|Mein Zahn tut weh.|Me duele una muela.
die Haut|la piel|Die Haut ist trocken.|La piel está seca.
die Haare|el pelo|Meine Haare sind kurz.|Mi pelo es corto.
das Gesicht|la cara|Dein Gesicht ist rot.|Tu cara está roja.
der Finger|el dedo|Mein Finger tut weh.|Me duele el dedo.
das Knie|la rodilla|Mein Knie tut weh.|Me duele la rodilla.
die Schulter|el hombro|Die Schulter ist steif.|El hombro está duro.
der Magen|el estómago|Mein Magen tut weh.|Me duele el estómago.
die Erkältung|el resfrío|Ich habe eine Erkältung.|Tengo un resfrío.
der Schnupfen|el catarro|Ich habe Schnupfen.|Tengo la nariz tapada.
die Grippe|la gripe|Die Grippe dauert eine Woche.|La gripe dura una semana.
die Allergie|la alergia|Ich habe eine Allergie.|Tengo una alergia.
das Pflaster|la curita|Ich brauche ein Pflaster.|Necesito una curita.
die Sekunde|el segundo|Warte bitte eine Sekunde.|Esperá un segundo, por favor.
der Nachmittag|la tarde|Am Nachmittag habe ich frei.|A la tarde estoy libre.
der Mittag|el mediodía|Am Mittag essen wir zusammen.|Al mediodía comemos juntos.
der Kalender|el calendario|Der Termin steht im Kalender.|La cita está en el calendario.
das Hemd|la camisa|Das Hemd ist weiß.|La camisa es blanca.
die Bluse|la blusa|Die Bluse ist sehr schön.|La blusa es muy linda.
der Anzug|el traje|Der Anzug ist neu.|El traje es nuevo.
die Krawatte|la corbata|Die Krawatte ist rot.|La corbata es roja.
die Socke|la media|Eine Socke fehlt.|Falta una media.
der Gürtel|el cinturón|Der Gürtel ist zu eng.|El cinturón es demasiado justo.
der Handschuh|el guante|Die Handschuhe sind warm.|Los guantes son abrigados.
die Sandale|la sandalia|Die Sandalen sind bequem.|Las sandalias son cómodas.
der Stiefel|la bota|Die Stiefel sind nass.|Las botas están mojadas.
die Gurke|el pepino|Die Gurke ist frisch.|El pepino está fresco.
die Karotte|la zanahoria|Die Karotte ist orange.|La zanahoria es naranja.
die Zwiebel|la cebolla|Die Zwiebel macht mich weinen.|La cebolla me hace llorar.
der Knoblauch|el ajo|Ich mag Knoblauch.|Me gusta el ajo.
der Pilz|el hongo|Die Pilze sind lecker.|Los hongos están ricos.
die Erdbeere|la frutilla|Die Erdbeeren sind süß.|Las frutillas son dulces.
die Traube|la uva|Die Trauben sind grün.|Las uvas son verdes.
die Birne|la pera|Die Birne ist reif.|La pera está madura.
die Zitrone|el limón|Die Zitrone ist sauer.|El limón es ácido.
das Mehl|la harina|Wir brauchen Mehl für den Kuchen.|Necesitamos harina para la torta.
die Sahne|la crema|Ich möchte Sahne zum Kaffee.|Quiero crema para el café.
der Schinken|el jamón|Der Schinken ist lecker.|El jamón está rico.
die Pommes|las papas fritas|Die Pommes sind heiß.|Las papas fritas están calientes.
der Keks|la galletita|Der Keks ist süß.|La galletita es dulce.
das Mineralwasser|el agua mineral|Ein Mineralwasser, bitte.|Un agua mineral, por favor.
bunt|colorido|Die Bilder sind sehr bunt.|Los cuadros son muy coloridos.
frisch|fresco|Das Brot ist frisch.|El pan está fresco.
sauer|ácido / agrio|Die Milch ist sauer.|La leche está agria.
bitter|amargo|Der Kaffee ist bitter.|El café es amargo.
ungesund|poco sano|Zu viel Zucker ist ungesund.|Demasiada azúcar no es sano.
vegetarisch|vegetariano|Ich esse vegetarisch.|Como vegetariano.
schmal|angosto|Die Straße ist schmal.|La calle es angosta.
weich|blando|Das Bett ist weich.|La cama es blanda.
hart|duro|Das Brot ist hart.|El pan está duro.
unmöglich|imposible|Das ist unmöglich.|Eso es imposible.
wahr|verdadero|Das ist nicht wahr.|Eso no es verdad.
aufgeregt|nervioso / emocionado|Ich bin sehr aufgeregt.|Estoy muy nervioso.
ärgerlich|molesto|Das ist wirklich ärgerlich.|Eso es realmente molesto.
geradeaus|derecho / todo recto|Gehen Sie geradeaus.|Siga derecho.
nirgendwo|en ningún lugar|Ich finde es nirgendwo.|No lo encuentro en ningún lado.
neulich|el otro día|Neulich war ich im Kino.|El otro día fui al cine.
vorgestern|anteayer|Vorgestern war ich krank.|Anteayer estuve enfermo.
übermorgen|pasado mañana|Übermorgen fahren wir nach Wien.|Pasado mañana viajamos a Viena.
gestern Abend|anoche|Gestern Abend habe ich gekocht.|Anoche cociné.
jeden Tag|todos los días|Ich lerne jeden Tag Deutsch.|Estudio alemán todos los días.
jede Woche|cada semana|Wir telefonieren jede Woche.|Hablamos por teléfono cada semana.
zweimal|dos veces|Ich war zweimal in Wien.|Estuve dos veces en Viena.
nie mehr|nunca más|Das mache ich nie mehr.|Eso no lo hago nunca más.
## B1
sich bewerben|postularse|Ich möchte mich um die Stelle bewerben.|Quiero postularme al puesto.
vorbereiten|preparar|Wir müssen die Reise gut vorbereiten.|Tenemos que preparar bien el viaje.
teilnehmen|participar|Wir wollen am Kurs teilnehmen.|Queremos participar del curso.
sich entschuldigen|disculparse|Ich muss mich bei ihr entschuldigen.|Tengo que disculparme con ella.
sich beschweren|quejarse|Wir wollen uns beim Hotel beschweren.|Queremos quejarnos con el hotel.
sich ärgern|enojarse|Ich ärgere mich oft über den Lärm.|Me enojo seguido por el ruido.
sich kümmern|ocuparse|Wir kümmern uns um die Kinder.|Nos ocupamos de los chicos.
sich erinnern|acordarse|Ich kann mich nicht erinnern.|No me puedo acordar.
verbinden|conectar / unir|Die Brücke verbindet zwei Städte.|El puente une dos ciudades.
vergleichen|comparar|Wir vergleichen die Preise.|Comparamos los precios.
verändern|cambiar (transformar)|Die Reise hat mich verändert.|El viaje me cambió.
verbessern|mejorar|Wir wollen unser Deutsch verbessern.|Queremos mejorar nuestro alemán.
verkaufen|vender|Wir verkaufen das alte Auto.|Vendemos el auto viejo.
vermieten|alquilar (dar en alquiler)|Sie wollen die Wohnung vermieten.|Quieren alquilar el departamento.
mieten|alquilar (tomar en alquiler)|Wir mieten ein Zimmer.|Alquilamos una habitación.
umziehen|mudarse|Wir wollen nächstes Jahr umziehen.|Queremos mudarnos el año que viene.
abgeben|entregar|Man muss die Schlüssel abgeben.|Hay que entregar las llaves.
annehmen|aceptar / suponer|Ich möchte den Vorschlag annehmen.|Quiero aceptar la propuesta.
ablehnen|rechazar|Wir müssen das Angebot ablehnen.|Tenemos que rechazar la oferta.
behaupten|afirmar|Er behauptet, nichts zu wissen.|Afirma no saber nada.
bedeuten|significar|Was bedeutet dieses Wort?|¿Qué significa esta palabra?
beschreiben|describir|Können Sie den Weg beschreiben?|¿Puede describir el camino?
beweisen|demostrar|Wir müssen das beweisen.|Tenemos que demostrar eso.
bemerken|notar|Ich habe den Fehler nicht bemerkt.|No noté el error.
entwickeln|desarrollar|Die Firma will ein neues Gerät entwickeln.|La empresa quiere desarrollar un aparato nuevo.
erfahren|enterarse|Wir erfahren es erst morgen.|Nos enteramos recién mañana.
erfinden|inventar|Wer wollte das Telefon erfinden?|¿Quién quería inventar el teléfono?
ermöglichen|hacer posible|Das Stipendium ermöglicht ihm das Studium.|La beca le hace posible estudiar.
erwarten|esperar (algo)|Wir erwarten viele Gäste.|Esperamos muchos invitados.
erwähnen|mencionar|Er hat das nicht erwähnt.|No mencionó eso.
folgen|seguir|Bitte folgen Sie mir.|Por favor, sígame.
fordern|exigir|Die Leute fordern bessere Preise.|La gente exige mejores precios.
führen|llevar / conducir|Dieser Weg führt zum See.|Este camino lleva al lago.
gehören|pertenecer|Das Haus gehört meinem Onkel.|La casa es de mi tío.
gelingen|salir bien / lograrse|Hoffentlich wird der Kuchen gelingen.|Ojalá la torta salga bien.
genießen|disfrutar|Wir genießen die Ruhe.|Disfrutamos de la tranquilidad.
handeln|actuar / tratar de|Der Film handelt von einer Familie.|La película trata de una familia.
informieren|informar|Wir informieren Sie sofort.|Le informamos enseguida.
kämpfen|luchar|Wir kämpfen für bessere Löhne.|Luchamos por mejores sueldos.
klären|aclarar|Wir müssen das klären.|Tenemos que aclarar eso.
lösen|resolver / soltar|Wir lösen das Problem zusammen.|Resolvemos el problema juntos.
melden|avisar / reportar|Bitte melden Sie sich morgen.|Por favor, avise mañana.
nutzen|aprovechar / usar|Wir nutzen die Zeit gut.|Aprovechamos bien el tiempo.
organisieren|organizar|Wir organisieren ein Fest.|Organizamos una fiesta.
planen|planear|Wir planen eine Reise nach Italien.|Planeamos un viaje a Italia.
protestieren|protestar|Viele Leute protestieren gegen den Plan.|Mucha gente protesta contra el plan.
reichen|alcanzar / ser suficiente|Zehn Euro reichen nicht.|Diez euros no alcanzan.
schaffen|lograr|Wir schaffen das schon.|Eso seguro que lo logramos.
schützen|proteger|Wir schützen die Umwelt.|Protegemos el medio ambiente.
senden|enviar|Wir senden Ihnen die Unterlagen.|Le enviamos la documentación.
sorgen|ocuparse / preocupar|Wir sorgen für das Essen.|Nos ocupamos de la comida.
stören|molestar|Ich möchte Sie nicht stören.|No quiero molestarlo.
streiten|pelear|Wir streiten oft über Geld.|Peleamos seguido por plata.
teilen|compartir / dividir|Wir teilen das Zimmer.|Compartimos el cuarto.
übernehmen|asumir / hacerse cargo|Wir übernehmen die Kosten.|Nos hacemos cargo de los costos.
überprüfen|revisar / verificar|Wir überprüfen die Zahlen.|Verificamos los números.
übersetzen|traducir|Kannst du das bitte übersetzen?|¿Podés traducir esto, por favor?
unterschreiben|firmar|Hier müssen Sie unterschreiben.|Acá tiene que firmar.
unterstützen|apoyar|Wir unterstützen dein Projekt.|Apoyamos tu proyecto.
untersuchen|examinar / investigar|Der Arzt will mich untersuchen.|El médico me quiere examinar.
verbreiten|difundir|Die Nachricht verbreitet sich schnell.|La noticia se difunde rápido.
vereinbaren|acordar|Wir vereinbaren einen Termin.|Acordamos una cita.
verhindern|impedir|Wir wollen den Unfall verhindern.|Queremos evitar el accidente.
verraten|revelar / delatar|Ich verrate dir nichts.|No te revelo nada.
versprechen|prometer|Wir versprechen dir das.|Te prometemos eso.
verstecken|esconder|Wir verstecken das Geschenk.|Escondemos el regalo.
vertrauen|confiar|Wir vertrauen ihm.|Confiamos en él.
verwenden|utilizar|Wir verwenden nur frische Zutaten.|Usamos solo ingredientes frescos.
widersprechen|contradecir|Ich muss dir leider widersprechen.|Lamentablemente te tengo que contradecir.
zugeben|admitir|Ich muss zugeben, dass du recht hast.|Tengo que admitir que tenés razón.
zustimmen|estar de acuerdo|Wir wollen dem Plan zustimmen.|Queremos estar de acuerdo con el plan.
zweifeln|dudar|Ich muss daran zweifeln.|Tengo que dudar de eso.
die Absicht|la intención|Das war nicht meine Absicht.|No fue mi intención.
der Alltag|la vida diaria|Im Alltag habe ich wenig Zeit.|En la vida diaria tengo poco tiempo.
die Angabe|el dato / la indicación|Die Angaben sind nicht richtig.|Los datos no son correctos.
die Anzeige|el aviso / la denuncia|Ich habe die Anzeige gelesen.|Leí el aviso.
der Ausdruck|la expresión|Dieser Ausdruck ist neu für mich.|Esta expresión es nueva para mí.
die Auswahl|la selección / la variedad|Im Geschäft gibt es eine große Auswahl.|En el negocio hay una gran variedad.
der Bereich|el área / el ámbito|In diesem Bereich arbeite ich gern.|En este ámbito trabajo con gusto.
die Bedeutung|el significado / la importancia|Die Bedeutung des Wortes ist klar.|El significado de la palabra es claro.
die Bedingung|la condición|Das ist eine wichtige Bedingung.|Es una condición importante.
die Beziehung|la relación|Unsere Beziehung ist sehr gut.|Nuestra relación es muy buena.
der Beitrag|el aporte / el artículo|Jeder leistet seinen Beitrag.|Cada uno hace su aporte.
die Bewegung|el movimiento|Bewegung ist gesund.|El movimiento es sano.
der Bericht|el informe|Der Bericht ist fertig.|El informe está listo.
die Bildung|la educación|Bildung ist wichtig für alle.|La educación es importante para todos.
der Charakter|el carácter|Er hat einen guten Charakter.|Tiene un buen carácter.
die Ehe|el matrimonio|Ihre Ehe ist sehr glücklich.|Su matrimonio es muy feliz.
die Eigenschaft|la cualidad|Geduld ist eine wichtige Eigenschaft.|La paciencia es una cualidad importante.
das Einkommen|el ingreso|Das Einkommen reicht nicht.|El ingreso no alcanza.
der Eindruck|la impresión|Ich habe einen guten Eindruck.|Tengo una buena impresión.
die Ernährung|la alimentación|Gesunde Ernährung ist wichtig.|La alimentación sana es importante.
die Erwartung|la expectativa|Meine Erwartungen sind hoch.|Mis expectativas son altas.
der Ersatz|el reemplazo|Wir brauchen Ersatz für den Kollegen.|Necesitamos un reemplazo para el colega.
die Fähigkeit|la capacidad|Sie hat viele Fähigkeiten.|Tiene muchas capacidades.
die Folge|la consecuencia|Die Folge war ein großes Problem.|La consecuencia fue un gran problema.
die Freiheit|la libertad|Freiheit ist mir sehr wichtig.|La libertad es muy importante para mí.
die Freizeit|el tiempo libre|In meiner Freizeit lese ich gern.|En mi tiempo libre leo con gusto.
die Gemeinschaft|la comunidad|Die Gemeinschaft hilft sich.|La comunidad se ayuda.
das Gleichgewicht|el equilibrio|Man braucht Gleichgewicht im Leben.|En la vida se necesita equilibrio.
die Grundlage|la base|Das ist die Grundlage für alles.|Esa es la base de todo.
die Haltung|la postura / la actitud|Seine Haltung gefällt mir nicht.|Su actitud no me gusta.
der Hintergrund|el trasfondo / el fondo|Im Hintergrund läuft Musik.|De fondo suena música.
die Hoffnung|la esperanza|Ich habe noch Hoffnung.|Todavía tengo esperanza.
der Inhalt|el contenido|Der Inhalt des Buches ist interessant.|El contenido del libro es interesante.
das Interesse|el interés|Ich habe großes Interesse an Musik.|Tengo mucho interés por la música.
der Kontakt|el contacto|Wir haben guten Kontakt.|Tenemos buen contacto.
die Kultur|la cultura|Ich möchte die Kultur kennenlernen.|Quiero conocer la cultura.
die Lage|la situación / la ubicación|Die Lage der Wohnung ist perfekt.|La ubicación del departamento es perfecta.
die Leistung|el rendimiento / el logro|Das war eine große Leistung.|Fue un gran logro.
die Menge|la cantidad|Eine große Menge Leute war da.|Había una gran cantidad de gente.
das Mittel|el medio / el remedio|Das ist ein gutes Mittel gegen Stress.|Es un buen remedio contra el estrés.
das Modell|el modelo|Das Modell ist neu.|El modelo es nuevo.
die Natur|la naturaleza|Ich liebe die Natur.|Amo la naturaleza.
der Notfall|la emergencia|Im Notfall rufe ich an.|En una emergencia llamo.
die Öffentlichkeit|el público / la opinión pública|Die Öffentlichkeit ist informiert.|El público está informado.
die Ordnung|el orden|In meinem Zimmer ist Ordnung.|En mi cuarto hay orden.
der Raum|el espacio / la sala|Der Raum ist zu klein.|La sala es demasiado chica.
die Reaktion|la reacción|Seine Reaktion war schnell.|Su reacción fue rápida.
die Rolle|el papel|Das spielt keine große Rolle.|Eso no tiene gran importancia.
die Sorge|la preocupación|Ich mache mir Sorgen.|Estoy preocupado.
der Stress|el estrés|Ich habe viel Stress.|Tengo mucho estrés.
der Umgang|el trato|Der Umgang mit Kindern macht Spaß.|El trato con los chicos es divertido.
die Ursache|la causa|Die Ursache ist noch unklar.|La causa todavía no está clara.
der Verlauf|el desarrollo / el transcurso|Im Verlauf des Tages wird es kälter.|Durante el día se pone más frío.
die Vorbereitung|la preparación|Die Vorbereitung dauert lange.|La preparación lleva tiempo.
der Wert|el valor|Der Wert des Hauses steigt.|El valor de la casa sube.
der Widerspruch|la contradicción|Das ist ein Widerspruch.|Eso es una contradicción.
der Zusammenhang|la relación (lógica) / el contexto|Das hat keinen Zusammenhang.|Eso no tiene relación.
der Zweck|el propósito / la finalidad|Was ist der Zweck davon?|¿Cuál es el propósito de eso?
der Zweifel|la duda|Ich habe keinen Zweifel.|No tengo ninguna duda.
der Zufall|la casualidad|Das war reiner Zufall.|Fue pura casualidad.
die Zukunft|el futuro|Die Zukunft ist offen.|El futuro está abierto.
die Gegenwart|el presente|Wir leben in der Gegenwart.|Vivimos en el presente.
die Wahrheit|la verdad|Sag mir die Wahrheit.|Decime la verdad.
die Lüge|la mentira|Das ist eine Lüge.|Eso es una mentira.
die Geduld|la paciencia|Ich habe keine Geduld mehr.|Ya no tengo paciencia.
der Mut|el coraje|Dafür braucht man Mut.|Para eso hace falta coraje.
der Stolz|el orgullo|Er spricht mit Stolz von seiner Familie.|Habla con orgullo de su familia.
die Wut|la rabia|Ich habe eine große Wut.|Tengo mucha rabia.
die Trauer|la tristeza / el duelo|Die Trauer ist groß.|La tristeza es grande.
abhängig|dependiente|Er ist von seinen Eltern abhängig.|Depende de sus padres.
aktuell|actual|Das sind die aktuellen Zahlen.|Esos son los números actuales.
allgemein|general|Das ist allgemein bekannt.|Eso es de conocimiento general.
ausreichend|suficiente|Das Geld ist nicht ausreichend.|La plata no es suficiente.
bereit|listo / dispuesto|Wir sind bereit.|Estamos listos.
dringend|urgente|Das ist dringend.|Eso es urgente.
eindeutig|inequívoco|Die Antwort ist eindeutig.|La respuesta es inequívoca.
einzeln|individual|Wir zahlen einzeln.|Pagamos por separado.
endgültig|definitivo|Das ist meine endgültige Entscheidung.|Esa es mi decisión definitiva.
erfolgreich|exitoso|Sie ist sehr erfolgreich.|Es muy exitosa.
finanziell|financiero|Wir haben finanzielle Probleme.|Tenemos problemas financieros.
gemeinsam|en común / juntos|Wir haben viel gemeinsam.|Tenemos mucho en común.
gerecht|justo|Das ist nicht gerecht.|Eso no es justo.
gewöhnlich|habitual|Gewöhnlich stehe ich um sieben auf.|Habitualmente me levanto a las siete.
grundsätzlich|en principio|Grundsätzlich bin ich einverstanden.|En principio estoy de acuerdo.
hilfreich|útil|Der Tipp war hilfreich.|El consejo fue útil.
insgesamt|en total|Insgesamt waren es zwanzig Leute.|En total eran veinte personas.
kritisch|crítico|Er ist sehr kritisch.|Es muy crítico.
kurzfristig|a corto plazo|Das geht nur kurzfristig.|Eso solo funciona a corto plazo.
langfristig|a largo plazo|Wir planen langfristig.|Planificamos a largo plazo.
lebendig|vivaz / vivo|Die Stadt ist sehr lebendig.|La ciudad es muy vivaz.
mutig|valiente|Das war sehr mutig.|Eso fue muy valiente.
nützlich|útil|Das Wörterbuch ist nützlich.|El diccionario es útil.
offiziell|oficial|Die Nachricht ist offiziell.|La noticia es oficial.
öffentlich|público|Das Schwimmbad ist öffentlich.|La pileta es pública.
persönlich|personal / en persona|Ich möchte persönlich kommen.|Quiero ir en persona.
praktisch|práctico|Die Tasche ist sehr praktisch.|La cartera es muy práctica.
privat|privado|Das ist privat.|Eso es privado.
schädlich|dañino|Rauchen ist schädlich.|Fumar es dañino.
schrecklich|terrible|Das Wetter ist schrecklich.|El clima es terrible.
selbstständig|independiente / autónomo|Sie arbeitet selbstständig.|Trabaja de forma independiente.
sinnvoll|con sentido / útil|Das ist eine sinnvolle Idee.|Es una idea con sentido.
sorgfältig|cuidadoso|Er arbeitet sehr sorgfältig.|Trabaja con mucho cuidado.
spürbar|perceptible|Die Veränderung ist spürbar.|El cambio se nota.
teilweise|en parte|Das stimmt nur teilweise.|Eso es cierto solo en parte.
überrascht|sorprendido|Ich bin überrascht.|Estoy sorprendido.
unabhängig|independiente|Sie will unabhängig sein.|Quiere ser independiente.
verschieden|distinto / diverso|Wir haben verschiedene Meinungen.|Tenemos opiniones distintas.
verständlich|comprensible|Das ist gut verständlich.|Eso es fácil de entender.
vollständig|completo|Die Liste ist vollständig.|La lista está completa.
vorsichtig|cuidadoso / prudente|Sei bitte vorsichtig.|Tené cuidado, por favor.
wertvoll|valioso|Das Bild ist sehr wertvoll.|El cuadro es muy valioso.
wesentlich|esencial|Das ist ein wesentlicher Punkt.|Es un punto esencial.
wirtschaftlich|económico|Die wirtschaftliche Lage ist schwierig.|La situación económica es difícil.
zufrieden|conforme|Wir sind sehr zufrieden.|Estamos muy conformes.
zuverlässig|confiable|Er ist ein zuverlässiger Freund.|Es un amigo confiable.
zunächst|primero / por ahora|Zunächst möchte ich danke sagen.|Primero quiero dar las gracias.
zumindest|al menos|Zumindest hat er es versucht.|Al menos lo intentó.
zwar|si bien|Es ist zwar teuer, aber gut.|Es caro, sí, pero bueno.
jedoch|sin embargo|Ich möchte, jedoch fehlt die Zeit.|Quiero, sin embargo falta tiempo.
dagegen|en contra / en cambio|Ich bin dagegen.|Estoy en contra.
dadurch|por eso / de ese modo|Dadurch spart man viel Geld.|De ese modo se ahorra mucha plata.
deswegen|por eso|Deswegen bin ich hier.|Por eso estoy acá.
darum|por eso|Darum geht es nicht.|No se trata de eso.
gegenüber|frente a / enfrente|Gegenüber vom Bahnhof ist ein Café.|Frente a la estación hay un café.
innerhalb|dentro de|Innerhalb einer Woche ist alles fertig.|Dentro de una semana está todo listo.
außerhalb|fuera de|Außerhalb der Stadt ist es ruhiger.|Fuera de la ciudad hay más tranquilidad.
anstatt|en vez de|Anstatt zu schlafen, lese ich.|En vez de dormir, leo.
bereits|ya (formal)|Ich habe es bereits gelesen.|Ya lo leí.
mindestens|al menos / como mínimo|Es dauert mindestens eine Stunde.|Dura como mínimo una hora.
höchstens|como máximo|Das kostet höchstens zehn Euro.|Eso cuesta como máximo diez euros.
wenigstens|por lo menos|Ruf wenigstens kurz an.|Llamá por lo menos un momento.
beinahe|casi|Ich hätte beinahe geweint.|Casi lloro.
sowieso|de todos modos|Ich komme sowieso vorbei.|Paso de todos modos.
überhaupt|en absoluto / en general|Ich habe überhaupt keine Zeit.|No tengo tiempo en absoluto.
schließlich|al fin / después de todo|Schließlich hat alles geklappt.|Al final todo salió bien.
ziemlich|bastante|Es ist ziemlich kalt.|Hace bastante frío.
gerade|justo ahora|Ich esse gerade.|Estoy comiendo ahora mismo.
immerhin|al menos / algo es algo|Immerhin hat es nicht geregnet.|Al menos no llovió.
allerdings|eso sí|Es ist schön, allerdings teuer.|Es lindo, eso sí, caro.
jedenfalls|en todo caso|Jedenfalls bin ich bereit.|En todo caso, estoy listo.
übrigens|por cierto|Übrigens habe ich gestern angerufen.|Por cierto, ayer llamé.
abschließen|cerrar con llave / concluir|Wir müssen die Tür abschließen.|Tenemos que cerrar la puerta con llave.
abnehmen|bajar de peso / sacar|Ich möchte fünf Kilo abnehmen.|Quiero bajar cinco kilos.
anbieten|ofrecer|Wir können Ihnen einen Kaffee anbieten.|Le podemos ofrecer un café.
ansehen|mirar / ver|Wir wollen uns die Stadt ansehen.|Queremos ver la ciudad.
ausprobieren|probar|Ich möchte das neue Programm ausprobieren.|Quiero probar el programa nuevo.
aufhören|dejar de / terminar|Wir müssen mit dem Rauchen aufhören.|Tenemos que dejar de fumar.
aufgeben|rendirse / abandonar|Wir wollen nicht aufgeben.|No queremos rendirnos.
aufpassen|prestar atención / cuidar|Bitte auf die Kinder aufpassen.|Por favor, cuidar a los chicos.
auffallen|llamar la atención|Der Fehler soll niemandem auffallen.|El error no tiene que llamarle la atención a nadie.
ausdrücken|expresar|Wir können das schwer ausdrücken.|Es difícil expresar eso.
ausgehen|salir (de noche)|Wir wollen am Samstag ausgehen.|Queremos salir el sábado.
beeinflussen|influir|Das Wetter kann unsere Laune beeinflussen.|El clima puede influir en nuestro humor.
befürchten|temer|Wir befürchten das Schlimmste.|Tememos lo peor.
begegnen|encontrarse con|Wir sind uns zufällig begegnet.|Nos encontramos por casualidad.
begrüßen|saludar / dar la bienvenida|Wir begrüßen alle Gäste.|Damos la bienvenida a todos los invitados.
behandeln|tratar|Der Arzt will die Krankheit behandeln.|El médico quiere tratar la enfermedad.
beitragen|contribuir|Alle können dazu beitragen.|Todos pueden contribuir a eso.
bekämpfen|combatir|Wir wollen die Armut bekämpfen.|Queremos combatir la pobreza.
benachrichtigen|avisar|Wir müssen den Chef benachrichtigen.|Tenemos que avisarle al jefe.
berücksichtigen|tener en cuenta|Wir müssen alles berücksichtigen.|Tenemos que tener todo en cuenta.
beraten|asesorar|Wir beraten Sie gern.|Lo asesoramos con gusto.
bereuen|arrepentirse|Wir bereuen nichts.|No nos arrepentimos de nada.
beschließen|decidir (resolver)|Wir beschließen das gemeinsam.|Lo decidimos juntos.
besitzen|poseer|Wir besitzen kein Auto.|No tenemos auto.
bestehen|aprobar / existir|Wir wollen die Prüfung bestehen.|Queremos aprobar el examen.
bestimmen|determinar / decidir|Wir bestimmen den Termin selbst.|Fijamos la fecha nosotros mismos.
betragen|ser (una suma)|Die Kosten betragen zehn Euro.|Los costos son de diez euros.
betreffen|concernir|Das könnte uns alle betreffen.|Eso podría concernirnos a todos.
betreuen|atender / cuidar|Sie betreut die Kinder.|Ella atiende a los chicos.
beurteilen|juzgar / evaluar|Das können wir noch nicht beurteilen.|Eso todavía no lo podemos evaluar.
bewegen|mover|Wir müssen uns mehr bewegen.|Tenemos que movernos más.
bieten|ofrecer / brindar|Die Stadt bietet viel Kultur.|La ciudad ofrece mucha cultura.
bilden|formar|Wir bilden eine Gruppe.|Formamos un grupo.
darstellen|representar / presentar|Wir wollen das Problem darstellen.|Queremos presentar el problema.
durchführen|llevar a cabo|Wir wollen die Umfrage durchführen.|Queremos llevar a cabo la encuesta.
sich einigen|ponerse de acuerdo|Wir müssen uns bald einigen.|Tenemos que ponernos de acuerdo pronto.
einrichten|amoblar / instalar|Wir möchten die Wohnung einrichten.|Queremos amoblar el departamento.
einschätzen|estimar / evaluar|Das lässt sich schwer einschätzen.|Eso es difícil de estimar.
einsetzen|usar / emplear|Wir wollen mehr Personal einsetzen.|Queremos emplear más personal.
entfernen|quitar|Wir müssen den Fleck entfernen.|Tenemos que sacar la mancha.
entsprechen|corresponder|Das kann meiner Erwartung nicht entsprechen.|Eso no puede corresponderse con mi expectativa.
erhalten|recibir / conservar|Wir erhalten die Unterlagen morgen.|Recibimos la documentación mañana.
erkennen|reconocer|Wir erkennen ihn sofort.|Lo reconocemos enseguida.
erleben|vivir (una experiencia)|Wir wollen etwas Neues erleben.|Queremos vivir algo nuevo.
erledigen|resolver / hacer (un trámite)|Wir müssen noch einiges erledigen.|Todavía tenemos que hacer varias cosas.
ersetzen|reemplazar|Wir ersetzen das alte Gerät.|Reemplazamos el aparato viejo.
erstellen|elaborar|Wir erstellen eine Liste.|Elaboramos una lista.
erwerben|adquirir|Wir erwerben neue Kenntnisse.|Adquirimos conocimientos nuevos.
erzeugen|generar|Die Anlage erzeugt Strom.|La planta genera electricidad.
existieren|existir|Das Problem existiert nicht mehr.|El problema ya no existe.
fehlen|faltar|Uns fehlt noch ein Zimmer.|Nos falta una habitación todavía.
feststellen|constatar|Wir müssen einen Fehler feststellen.|Tenemos que constatar un error.
fördern|fomentar / apoyar|Wir wollen Kinder fördern.|Queremos apoyar a los chicos.
gebrauchen|usar / necesitar|Das können wir gut gebrauchen.|Eso nos viene muy bien.
geraten|caer en / salir (bien o mal)|Wir geraten in große Schwierigkeiten.|Caemos en grandes dificultades.
sich gewöhnen|acostumbrarse|Wir müssen uns an das Wetter gewöhnen.|Tenemos que acostumbrarnos al clima.
gründen|fundar|Wir wollen eine Firma gründen.|Queremos fundar una empresa.
herstellen|fabricar|Die Firma will Möbel herstellen.|La empresa quiere fabricar muebles.
hinweisen|señalar|Wir möchten darauf hinweisen.|Queremos señalar eso.
kritisieren|criticar|Wir wollen niemanden kritisieren.|No queremos criticar a nadie.
kürzen|recortar|Wir müssen den Text kürzen.|Tenemos que acortar el texto.
leiten|dirigir|Sie soll das Projekt leiten.|Ella va a dirigir el proyecto.
liefern|entregar / suministrar|Wir liefern am Montag.|Entregamos el lunes.
löschen|borrar / apagar|Wir müssen die Datei löschen.|Tenemos que borrar el archivo.
nachdenken|reflexionar|Wir müssen darüber nachdenken.|Tenemos que reflexionar sobre eso.
nachfragen|consultar|Wir möchten noch einmal nachfragen.|Queremos consultar otra vez.
nennen|nombrar / llamar|Wir nennen ihn Max.|Lo llamamos Max.
notieren|anotar|Wir notieren die Adresse.|Anotamos la dirección.
ordnen|ordenar|Wir ordnen die Papiere.|Ordenamos los papeles.
prüfen|verificar / examinar|Wir prüfen den Vertrag.|Revisamos el contrato.
reduzieren|reducir|Wir wollen die Kosten reduzieren.|Queremos reducir los costos.
regeln|regular / arreglar|Wir regeln das morgen.|Eso lo arreglamos mañana.
riskieren|arriesgar|Wir riskieren nichts.|No arriesgamos nada.
schätzen|apreciar / estimar|Wir schätzen deine Hilfe.|Apreciamos tu ayuda.
scheitern|fracasar|Wir wollen nicht scheitern.|No queremos fracasar.
schildern|describir (un hecho)|Können Sie den Unfall schildern?|¿Puede describir el accidente?
schonen|cuidar / no forzar|Wir müssen die Umwelt schonen.|Tenemos que cuidar el medio ambiente.
schweigen|callarse|Wir wollen nicht schweigen.|No queremos callarnos.
senken|bajar (precios)|Wir wollen die Preise senken.|Queremos bajar los precios.
sichern|asegurar|Wir sichern die Daten.|Resguardamos los datos.
spenden|donar|Wir spenden Geld.|Donamos plata.
stattfinden|tener lugar|Das Fest soll am Samstag stattfinden.|La fiesta va a tener lugar el sábado.
steigern|aumentar|Wir wollen den Umsatz steigern.|Queremos aumentar las ventas.
stimmen|ser correcto / votar|Die Zahlen stimmen nicht.|Los números no son correctos.
tauschen|cambiar (trocar)|Wir tauschen die Plätze.|Cambiamos los lugares.
transportieren|transportar|Wir transportieren die Möbel.|Transportamos los muebles.
trennen|separar|Wir trennen den Müll.|Separamos la basura.
überlegen|pensar / considerar|Wir überlegen noch.|Todavía lo estamos pensando.
übertreiben|exagerar|Wir wollen nicht übertreiben.|No queremos exagerar.
unterbrechen|interrumpir|Wir wollen Sie nicht unterbrechen.|No lo queremos interrumpir.
sich unterscheiden|diferenciarse|Die beiden Städte unterscheiden sich stark.|Las dos ciudades se diferencian mucho.
unternehmen|emprender / hacer (una salida)|Wir wollen etwas unternehmen.|Queremos hacer algo.
unterrichten|enseñar|Sie unterrichtet Deutsch.|Ella enseña alemán.
veranstalten|organizar (un evento)|Wir veranstalten ein Konzert.|Organizamos un concierto.
sich verabreden|quedar con alguien|Wir wollen uns morgen verabreden.|Queremos quedar mañana.
verbringen|pasar (tiempo)|Wir verbringen den Urlaub am Meer.|Pasamos las vacaciones en el mar.
verfolgen|seguir / perseguir|Wir verfolgen die Nachrichten.|Seguimos las noticias.
vergrößern|agrandar|Wir wollen das Haus vergrößern.|Queremos agrandar la casa.
verlängern|prolongar / renovar|Wir müssen den Vertrag verlängern.|Tenemos que renovar el contrato.
verlangen|exigir / pedir|Wir verlangen eine Erklärung.|Exigimos una explicación.
vermeiden|evitar|Wir wollen Streit vermeiden.|Queremos evitar peleas.
verringern|disminuir|Wir wollen die Zahl verringern.|Queremos disminuir la cantidad.
versichern|asegurar / afirmar|Wir versichern Ihnen das.|Se lo aseguramos.
versorgen|abastecer / atender|Wir versorgen die Kranken.|Atendemos a los enfermos.
vertreten|representar|Wir vertreten die Firma.|Representamos a la empresa.
verursachen|causar|Wir wollen keinen Schaden verursachen.|No queremos causar daños.
vorkommen|ocurrir / parecer|Das kann oft vorkommen.|Eso puede ocurrir seguido.
vorhaben|tener planeado|Ich will am Wochenende einfach nichts vorhaben.|El fin de semana no quiero tener ningún plan.
vorziehen|preferir|Wir würden den Zug vorziehen.|Preferiríamos el tren.
wahrnehmen|percibir|Wir können das kaum wahrnehmen.|Casi no lo podemos percibir.
warnen|advertir|Wir warnen vor dem Glatteis.|Advertimos sobre el hielo.
weiterleiten|reenviar|Wir wollen die E-Mail weiterleiten.|Queremos reenviar el mail.
widmen|dedicar|Wir widmen das Buch unseren Eltern.|Le dedicamos el libro a nuestros padres.
wiederholen|repetir|Wir müssen den Test wiederholen.|Tenemos que repetir la prueba.
wirken|parecer / hacer efecto|Die Tabletten wirken schnell.|Las pastillas hacen efecto rápido.
zusammenarbeiten|colaborar|Wir wollen besser zusammenarbeiten.|Queremos colaborar mejor.
zusammenfassen|resumir|Wir wollen den Text kurz zusammenfassen.|Queremos resumir el texto brevemente.
zusammenhängen|estar relacionado|Das könnte damit zusammenhängen.|Eso podría estar relacionado.
das Vorstellungsgespräch|la entrevista de trabajo|Morgen habe ich ein Vorstellungsgespräch.|Mañana tengo una entrevista de trabajo.
der Arbeitsvertrag|el contrato de trabajo|Der Arbeitsvertrag läuft ein Jahr.|El contrato de trabajo dura un año.
die Weiterbildung|la capacitación|Die Firma bezahlt die Weiterbildung.|La empresa paga la capacitación.
der Arbeitsplatz|el lugar de trabajo|Mein Arbeitsplatz ist sehr ruhig.|Mi lugar de trabajo es muy tranquilo.
die Arbeitszeit|el horario de trabajo|Die Arbeitszeit beginnt um acht.|El horario de trabajo empieza a las ocho.
die Krankmeldung|el aviso de enfermedad|Ich brauche eine Krankmeldung.|Necesito un certificado de enfermedad.
der Bürger|el ciudadano|Jeder Bürger hat Rechte.|Cada ciudadano tiene derechos.
die Demokratie|la democracia|Die Demokratie braucht Mitbestimmung.|La democracia necesita participación.
die Armut|la pobreza|Die Armut nimmt zu.|La pobreza aumenta.
der Reichtum|la riqueza|Reichtum macht nicht glücklich.|La riqueza no hace feliz.
die Arbeitslosigkeit|el desempleo|Die Arbeitslosigkeit sinkt.|El desempleo baja.
die Jugend|la juventud|Die Jugend hat viele Fragen.|La juventud tiene muchas preguntas.
das Alter|la edad / la vejez|Im Alter will ich reisen.|De viejo quiero viajar.
das Ehrenamt|el trabajo voluntario|Das Ehrenamt macht viel Freude.|El trabajo voluntario da mucha alegría.
die Spende|la donación|Wir brauchen jede Spende.|Necesitamos cada donación.
die Veranstaltung|el evento|Die Veranstaltung beginnt um acht.|El evento empieza a las ocho.
die Versammlung|la asamblea|Die Versammlung ist am Dienstag.|La asamblea es el martes.
die Bevölkerung|la población|Die Bevölkerung wächst.|La población crece.
der Einwohner|el habitante|Die Stadt hat zehntausend Einwohner.|La ciudad tiene diez mil habitantes.
die Gemeinde|el municipio / la comunidad|Unsere Gemeinde ist klein.|Nuestro municipio es chico.
die Region|la región|Die Region ist sehr schön.|La región es muy linda.
das Ausland|el exterior|Er arbeitet im Ausland.|Trabaja en el exterior.
der Tourist|el turista|Die Touristen fotografieren alles.|Los turistas fotografían todo.
die Nachrichten|las noticias|Ich schaue jeden Abend die Nachrichten.|Miro las noticias todas las noches.
das Fernsehen|la televisión|Im Fernsehen läuft ein Film.|En la televisión pasan una película.
die Sendung|el programa (de TV / radio)|Die Sendung ist sehr beliebt.|El programa es muy popular.
das Netzwerk|la red|Das Netzwerk ist langsam.|La red está lenta.
die Erfindung|el invento|Das Telefon war eine große Erfindung.|El teléfono fue un gran invento.
der Link|el enlace|Ich schicke dir den Link.|Te mando el enlace.
die Behandlung|el tratamiento|Die Behandlung dauert zwei Wochen.|El tratamiento dura dos semanas.
die Untersuchung|el examen (médico) / la investigación|Die Untersuchung war kurz.|El examen fue corto.
der Patient|el paciente|Der Patient wartet.|El paciente espera.
die Diät|la dieta|Ich mache eine Diät.|Estoy a dieta.
das Gewicht|el peso|Mein Gewicht ist gut.|Mi peso está bien.
die Erholung|el descanso / la recuperación|Im Urlaub brauche ich Erholung.|En las vacaciones necesito descansar.
die Entspannung|la relajación|Musik hilft mir bei der Entspannung.|La música me ayuda a relajarme.
der Notarzt|el médico de urgencias|Der Notarzt kommt sofort.|El médico de urgencias llega enseguida.
die Operation|la operación|Die Operation dauert eine Stunde.|La operación dura una hora.
die Pflege|el cuidado|Die Pflege der Kranken ist wichtig.|El cuidado de los enfermos es importante.
das Recycling|el reciclaje|Recycling schützt die Umwelt.|El reciclaje protege el medio ambiente.
die Ressource|el recurso|Wasser ist eine wichtige Ressource.|El agua es un recurso importante.
der Lärm|el ruido|Der Lärm stört mich.|El ruido me molesta.
die Landwirtschaft|la agricultura|Die Landwirtschaft braucht viel Wasser.|La agricultura necesita mucha agua.
der Bauer|el campesino|Der Bauer arbeitet auf dem Feld.|El campesino trabaja en el campo.
das Feld|el campo (cultivo)|Das Feld ist sehr groß.|El campo es muy grande.
die Ernte|la cosecha|Die Ernte war dieses Jahr gut.|La cosecha fue buena este año.
das Klima|el clima (general)|Das Klima ändert sich.|El clima está cambiando.
die Katastrophe|la catástrofe|Die Katastrophe war schrecklich.|La catástrofe fue terrible.
der Unterricht|la clase / la enseñanza|Der Unterricht beginnt um acht.|La clase empieza a las ocho.
die Kenntnisse|los conocimientos|Seine Kenntnisse sind sehr gut.|Sus conocimientos son muy buenos.
der Reisepass|el pasaporte|Mein Reisepass ist abgelaufen.|Mi pasaporte venció.
das Visum|la visa|Ich brauche ein Visum.|Necesito una visa.
die Reservierung|la reserva|Die Reservierung gilt bis acht Uhr.|La reserva vale hasta las ocho.
der Aufenthalt|la estadía|Der Aufenthalt dauert eine Woche.|La estadía dura una semana.
der Fahrplan|el horario (de transporte)|Der Fahrplan hängt am Bahnhof.|El horario está colgado en la estación.
der Bahnsteig|el andén|Der Zug steht auf Bahnsteig drei.|El tren está en el andén tres.
die Hinfahrt|el viaje de ida|Die Hinfahrt dauert drei Stunden.|El viaje de ida dura tres horas.
die Sehenswürdigkeit|la atracción turística|Die Sehenswürdigkeiten sind alle in der Altstadt.|Las atracciones están todas en el casco antiguo.
das Souvenir|el souvenir|Ich kaufe ein Souvenir.|Compro un souvenir.
die Währung|la moneda|Die Währung ist der Euro.|La moneda es el euro.
der Haushalt|el hogar / las tareas del hogar|Im Haushalt gibt es viel zu tun.|En el hogar hay mucho que hacer.
die Hausordnung|el reglamento del edificio|Die Hausordnung hängt im Flur.|El reglamento está en el pasillo.
der Hausmeister|el encargado del edificio|Der Hausmeister repariert die Tür.|El encargado arregla la puerta.
die Reparatur|el arreglo|Die Reparatur kostet fünfzig Euro.|El arreglo cuesta cincuenta euros.
die Bestellung|el pedido|Die Bestellung kommt morgen.|El pedido llega mañana.
der Einkauf|la compra|Der Einkauf dauert eine Stunde.|La compra lleva una hora.
der Einkaufswagen|el carrito de compras|Der Einkaufswagen ist voll.|El carrito está lleno.
die Verpackung|el envase / el embalaje|Die Verpackung ist aus Papier.|El envase es de papel.
der Kassenzettel|el ticket de compra|Den Kassenzettel bitte aufheben.|Por favor, guarde el ticket.
die Quittung|el recibo|Ich brauche eine Quittung.|Necesito un recibo.
die Reklamation|el reclamo (por un producto)|Die Reklamation wurde angenommen.|El reclamo fue aceptado.
der Umtausch|el cambio (de un producto)|Der Umtausch ist kostenlos.|El cambio es gratis.
die Ansicht|la opinión / la vista|Ich bin anderer Ansicht.|Soy de otra opinión.
die Behauptung|la afirmación|Die Behauptung ist falsch.|La afirmación es falsa.
der Beweis|la prueba|Der Beweis fehlt.|Falta la prueba.
die Tatsache|el hecho|Das ist eine Tatsache.|Es un hecho.
die Annahme|la suposición|Die Annahme war falsch.|La suposición era falsa.
der Standpunkt|el punto de vista|Das ist mein Standpunkt.|Ese es mi punto de vista.
der Gegensatz|el contraste|Das ist ein großer Gegensatz.|Es un gran contraste.
die Gemeinsamkeit|el rasgo en común|Wir haben viele Gemeinsamkeiten.|Tenemos muchos rasgos en común.
der Vergleich|la comparación|Im Vergleich ist das billig.|En comparación es barato.
die Voraussetzung|el requisito|Das ist die Voraussetzung.|Ese es el requisito.
das Argument|el argumento|Das ist ein gutes Argument.|Es un buen argumento.
die Strategie|la estrategia|Die Strategie hat funktioniert.|La estrategia funcionó.
die Methode|el método|Diese Methode ist einfach.|Este método es simple.
die Technik|la técnica|Die Technik ist sehr modern.|La técnica es muy moderna.
die Qualität|la calidad|Die Qualität ist sehr gut.|La calidad es muy buena.
die Umfrage|la encuesta|Die Umfrage dauert zehn Minuten.|La encuesta dura diez minutos.
die Statistik|la estadística|Die Statistik zeigt es deutlich.|La estadística lo muestra claramente.
der Durchschnitt|el promedio|Im Durchschnitt kostet das zehn Euro.|En promedio cuesta diez euros.
die Minderheit|la minoría|Die Minderheit ist dagegen.|La minoría está en contra.
der Anteil|la proporción|Der Anteil der Frauen steigt.|La proporción de mujeres sube.
das Verhältnis|la relación / la proporción|Das Verhältnis ist eins zu zwei.|La proporción es uno a dos.
die Entfernung|la distancia|Die Entfernung beträgt zehn Kilometer.|La distancia es de diez kilómetros.
die Geschwindigkeit|la velocidad|Die Geschwindigkeit ist zu hoch.|La velocidad es demasiado alta.
die Richtung|la dirección|In welcher Richtung liegt der Bahnhof?|¿En qué dirección queda la estación?
der Eingang|la entrada|Der Eingang ist links.|La entrada está a la izquierda.
der Ausgang|la salida|Der Ausgang ist rechts.|La salida está a la derecha.
der Notausgang|la salida de emergencia|Der Notausgang muss frei bleiben.|La salida de emergencia tiene que quedar libre.
das Schild|el cartel|Das Schild ist kaputt.|El cartel está roto.
das Verbot|la prohibición|Das Verbot gilt für alle.|La prohibición vale para todos.
die Erlaubnis|el permiso|Ich brauche eine Erlaubnis.|Necesito un permiso.
ausgezeichnet|excelente|Das Essen war ausgezeichnet.|La comida estuvo excelente.
beliebt|popular / querido|Das Café ist sehr beliebt.|El café es muy popular.
eigen|propio|Ich habe ein eigenes Zimmer.|Tengo una habitación propia.
ehemalig|anterior / ex|Mein ehemaliger Chef wohnt hier.|Mi ex jefe vive acá.
einzig|único|Das ist die einzige Lösung.|Esa es la única solución.
entsprechend|correspondiente|Wir brauchen die entsprechenden Unterlagen.|Necesitamos la documentación correspondiente.
erschöpft|agotado|Ich bin völlig erschöpft.|Estoy completamente agotado.
erstaunlich|asombroso|Das ist erstaunlich.|Eso es asombroso.
freiwillig|voluntario|Die Teilnahme ist freiwillig.|La participación es voluntaria.
gemütlich|acogedor|Das Zimmer ist sehr gemütlich.|La habitación es muy acogedora.
geeignet|adecuado|Das Haus ist gut geeignet.|La casa es muy adecuada.
gesamt|total|Die gesamte Familie kommt.|Viene toda la familia.
heutig|de hoy|Die heutige Jugend lebt anders.|La juventud de hoy vive distinto.
jährlich|anual|Das Fest findet jährlich statt.|La fiesta se hace todos los años.
kostbar|valioso|Zeit ist kostbar.|El tiempo es valioso.
künftig|futuro|Wir planen künftige Projekte.|Planeamos proyectos futuros.
lebhaft|animado / vivaz|Die Straße ist sehr lebhaft.|La calle es muy animada.
mäßig|moderado|Er isst nur mäßig.|Come con moderación.
modern|moderno|Das Haus ist sehr modern.|La casa es muy moderna.
nachdenklich|pensativo|Er ist sehr nachdenklich.|Está muy pensativo.
neugierig|curioso|Die Kinder sind neugierig.|Los chicos son curiosos.
ordentlich|ordenado|Sein Zimmer ist ordentlich.|Su cuarto está ordenado.
peinlich|vergonzoso|Das ist mir peinlich.|Eso me da vergüenza.
riesig|enorme|Die Stadt ist riesig.|La ciudad es enorme.
selbstverständlich|por supuesto / obvio|Das ist selbstverständlich.|Eso es obvio.
sparsam|ahorrativo|Sie ist sehr sparsam.|Es muy ahorrativa.
streng|estricto|Der Lehrer ist streng.|El docente es estricto.
übrig|restante|Es ist noch etwas Kuchen übrig.|Todavía queda algo de torta.
unterschiedlich|diferente|Die Meinungen sind unterschiedlich.|Las opiniones son diferentes.
verrückt|loco|Das ist doch verrückt.|Eso es una locura.
verschlossen|cerrado con llave / reservado|Die Tür ist verschlossen.|La puerta está cerrada con llave.
wöchentlich|semanal|Wir treffen uns wöchentlich.|Nos encontramos semanalmente.
zahlreich|numeroso|Zahlreiche Gäste sind gekommen.|Vinieron numerosos invitados.
zufällig|casual|Wir haben uns zufällig getroffen.|Nos encontramos por casualidad.
zusätzlich|adicional|Wir brauchen zusätzliche Zeit.|Necesitamos tiempo adicional.
tatsächlich|en realidad / de hecho|Es hat tatsächlich geklappt.|De hecho, salió bien.
ausgerechnet|justo (con tono de queja)|Ausgerechnet heute regnet es.|Justo hoy llueve.
keineswegs|de ningún modo|Das ist keineswegs einfach.|Eso no es nada fácil.
neuerdings|desde hace poco|Neuerdings fahre ich mit dem Rad.|Desde hace poco ando en bici.
allmählich|poco a poco|Allmählich verstehe ich alles.|De a poco lo entiendo todo.
ständig|constantemente|Er ruft ständig an.|Llama constantemente.
mehrmals|varias veces|Ich habe mehrmals angerufen.|Llamé varias veces.
anschließend|a continuación|Anschließend gehen wir essen.|A continuación vamos a comer.
beispielsweise|por ejemplo|Beispielsweise gibt es hier einen Park.|Por ejemplo, acá hay un parque.
## B2
abwägen|sopesar|Wir müssen Vor- und Nachteile abwägen.|Tenemos que sopesar ventajas y desventajas.
abschaffen|abolir|Die Stadt will die Gebühr abschaffen.|La ciudad quiere abolir la tasa.
abstreiten|negar|Er will alles abstreiten.|Quiere negarlo todo.
anerkennen|reconocer|Wir müssen seine Leistung anerkennen.|Tenemos que reconocer su logro.
anführen|citar / alegar|Er kann viele Gründe anführen.|Puede alegar muchas razones.
angreifen|atacar|Man darf niemanden angreifen.|No se debe atacar a nadie.
ankündigen|anunciar|Die Firma will neue Preise ankündigen.|La empresa quiere anunciar precios nuevos.
anpassen|adaptar|Wir müssen uns den Regeln anpassen.|Tenemos que adaptarnos a las reglas.
anregen|incentivar / sugerir|Das Buch kann viele Diskussionen anregen.|El libro puede generar muchas discusiones.
anstreben|aspirar a|Wir wollen eine Lösung anstreben.|Queremos aspirar a una solución.
ansprechen|dirigirse a / mencionar|Wir möchten das Thema ansprechen.|Queremos plantear el tema.
anwenden|aplicar|Wir können die Regel hier anwenden.|Podemos aplicar la regla acá.
aufbauen|construir / armar|Wir wollen ein Unternehmen aufbauen.|Queremos construir una empresa.
aufdecken|revelar / destapar|Die Zeitung will den Skandal aufdecken.|El diario quiere destapar el escándalo.
aufklären|aclarar / informar|Wir müssen die Bevölkerung aufklären.|Tenemos que informar a la población.
aufweisen|presentar / mostrar|Das Gebäude kann viele Schäden aufweisen.|El edificio puede presentar muchos daños.
ausbauen|ampliar|Man will das Netz ausbauen.|Quieren ampliar la red.
ausgleichen|compensar|Das müssen wir irgendwie ausgleichen.|Eso lo tenemos que compensar de algún modo.
auslösen|desencadenar|Das kann eine Krise auslösen.|Eso puede desencadenar una crisis.
ausnutzen|aprovecharse de|Man darf andere nicht ausnutzen.|No se debe aprovecharse de otros.
ausschließen|excluir|Wir können das nicht ausschließen.|No lo podemos excluir.
ausüben|ejercer|Er will seinen Beruf wieder ausüben.|Quiere volver a ejercer su profesión.
auswerten|evaluar (datos)|Wir müssen die Zahlen auswerten.|Tenemos que evaluar los números.
bedauern|lamentar|Wir bedauern die Verzögerung.|Lamentamos la demora.
bedenken|tener en cuenta / considerar|Man muss auch die Kosten bedenken.|También hay que tener en cuenta los costos.
bedienen|atender / manejar|Wir bedienen unsere Kunden schnell.|Atendemos rápido a nuestros clientes.
beeindrucken|impresionar|Das Ergebnis soll uns beeindrucken.|El resultado nos tiene que impresionar.
sich befassen|ocuparse (de un tema)|Wir befassen uns mit dem Thema.|Nos ocupamos del tema.
befolgen|cumplir (una regla)|Wir müssen die Regeln befolgen.|Tenemos que cumplir las reglas.
befördern|transportar / ascender|Man wollte ihn befördern.|Querían ascenderlo.
begründen|fundamentar|Wir müssen die Entscheidung begründen.|Tenemos que fundamentar la decisión.
begrenzen|limitar|Wir wollen die Kosten begrenzen.|Queremos limitar los costos.
behindern|obstaculizar|Das kann die Arbeit behindern.|Eso puede obstaculizar el trabajo.
beherrschen|dominar|Sie will drei Sprachen beherrschen.|Quiere dominar tres idiomas.
beibehalten|mantener|Wir wollen den Plan beibehalten.|Queremos mantener el plan.
beitreten|afiliarse|Er will dem Verein beitreten.|Quiere afiliarse al club.
belasten|cargar / afectar|Die Kosten können das Budget belasten.|Los costos pueden afectar el presupuesto.
belohnen|recompensar|Wir wollen gute Arbeit belohnen.|Queremos recompensar el buen trabajo.
beobachten|observar|Wir beobachten die Lage genau.|Observamos la situación de cerca.
beschränken|restringir|Man will den Verkehr beschränken.|Quieren restringir el tráfico.
beseitigen|eliminar|Wir wollen die Fehler beseitigen.|Queremos eliminar los errores.
bestreiten|negar / costear|Das kann niemand bestreiten.|Eso no lo puede negar nadie.
sich beteiligen|participar|Alle sollen sich beteiligen.|Todos tienen que participar.
betonen|enfatizar|Wir möchten das noch einmal betonen.|Queremos enfatizar eso otra vez.
betrachten|considerar / observar|Wir betrachten das Problem genauer.|Observamos el problema más de cerca.
beunruhigen|inquietar|Das soll Sie nicht beunruhigen.|Eso no lo tiene que inquietar.
bewirken|lograr / provocar|Wir können damit viel bewirken.|Con eso podemos lograr mucho.
bezeichnen|designar|Man kann das als Erfolg bezeichnen.|Eso se puede calificar de éxito.
bezweifeln|dudar de|Das müssen wir bezweifeln.|De eso tenemos que dudar.
dienen|servir|Das Gebäude kann als Schule dienen.|El edificio puede servir de escuela.
durchsetzen|imponer / hacer valer|Wir wollen unsere Idee durchsetzen.|Queremos imponer nuestra idea.
einhalten|respetar (un plazo)|Wir müssen die Frist einhalten.|Tenemos que respetar el plazo.
einräumen|admitir / conceder|Er musste den Fehler einräumen.|Tuvo que admitir el error.
einsehen|entender / admitir|Er will seinen Fehler einsehen.|Quiere admitir su error.
einwenden|objetar|Wir können nichts einwenden.|No podemos objetar nada.
enthalten|contener|Das Paket kann Fehler enthalten.|El paquete puede contener errores.
entlasten|aliviar|Das Gesetz soll die Familien entlasten.|La ley tiene que aliviar a las familias.
sich entschließen|decidirse|Wir müssen uns bald entschließen.|Tenemos que decidirnos pronto.
erfassen|registrar / captar|Wir wollen alle Daten erfassen.|Queremos registrar todos los datos.
ergreifen|tomar (medidas) / agarrar|Wir müssen Maßnahmen ergreifen.|Tenemos que tomar medidas.
erheben|relevar / elevar|Wir wollen neue Daten erheben.|Queremos relevar datos nuevos.
sich erkundigen|informarse|Ich möchte mich nach dem Preis erkundigen.|Quiero informarme del precio.
erläutern|explicar en detalle|Wir wollen den Plan kurz erläutern.|Queremos explicar el plan brevemente.
ermutigen|alentar|Wir wollen alle ermutigen.|Queremos alentar a todos.
erneuern|renovar|Wir wollen den Vertrag erneuern.|Queremos renovar el contrato.
erörtern|debatir / tratar|Wir wollen das Thema erörtern.|Queremos tratar el tema.
erschweren|dificultar|Das kann die Arbeit erschweren.|Eso puede dificultar el trabajo.
erwägen|considerar / barajar|Wir wollen alle Möglichkeiten erwägen.|Queremos barajar todas las posibilidades.
erweitern|ampliar|Wir wollen unser Angebot erweitern.|Queremos ampliar nuestra oferta.
erzielen|lograr|Wir wollen gute Ergebnisse erzielen.|Queremos lograr buenos resultados.
festhalten|retener / dejar constancia|Wir möchten das schriftlich festhalten.|Queremos dejarlo por escrito.
festlegen|fijar|Wir müssen den Termin festlegen.|Tenemos que fijar la fecha.
fortsetzen|continuar|Wir wollen die Arbeit fortsetzen.|Queremos continuar el trabajo.
gelten|valer / regir|Die Regel soll für alle gelten.|La regla tiene que valer para todos.
gewährleisten|garantizar|Wir können das nicht gewährleisten.|No lo podemos garantizar.
hervorheben|resaltar|Wir möchten einen Punkt hervorheben.|Queremos resaltar un punto.
hinnehmen|aceptar (resignarse)|Das können wir nicht hinnehmen.|Eso no lo podemos aceptar.
hinterfragen|cuestionar|Man sollte alles hinterfragen.|Habría que cuestionarlo todo.
konfrontieren|confrontar|Wir wollen ihn damit konfrontieren.|Lo queremos confrontar con eso.
lindern|aliviar (dolor)|Die Salbe kann den Schmerz lindern.|La pomada puede aliviar el dolor.
mildern|atenuar|Wir wollen die Folgen mildern.|Queremos atenuar las consecuencias.
missbrauchen|abusar|Man darf Macht nicht missbrauchen.|No se debe abusar del poder.
mitwirken|colaborar|Wir wollen daran mitwirken.|Queremos colaborar en eso.
nachgeben|ceder|Wir wollen nicht nachgeben.|No queremos ceder.
nachlassen|disminuir|Der Regen soll bald nachlassen.|La lluvia tiene que aflojar pronto.
nachvollziehen|entender (razonamiento)|Ich kann das gut nachvollziehen.|Lo puedo entender bien.
neigen|tender|Er kann zum Übertreiben neigen.|Puede tender a exagerar.
optimieren|optimizar|Wir wollen den Ablauf optimieren.|Queremos optimizar el proceso.
prägen|marcar / influir|Das Erlebnis kann ihn prägen.|La experiencia lo puede marcar.
preisgeben|revelar|Er will nichts preisgeben.|No quiere revelar nada.
reagieren|reaccionar|Wir müssen schnell reagieren.|Tenemos que reaccionar rápido.
rechtfertigen|justificar|Wir wollen das nicht rechtfertigen.|No lo queremos justificar.
resultieren|resultar|Daraus kann ein Problem resultieren.|De ahí puede resultar un problema.
scheuen|temer / rehuir|Wir scheuen keine Mühe.|No rehuimos el esfuerzo.
schwanken|oscilar / vacilar|Die Preise können schwanken.|Los precios pueden oscilar.
sich sehnen|anhelar|Wir sehnen uns nach Ruhe.|Anhelamos tranquilidad.
sicherstellen|asegurar|Wir müssen das sicherstellen.|Tenemos que asegurar eso.
spiegeln|reflejar|Das Bild kann die Stimmung spiegeln.|La imagen puede reflejar el ánimo.
stärken|fortalecer|Wir wollen das Vertrauen stärken.|Queremos fortalecer la confianza.
thematisieren|abordar (como tema)|Wir wollen das Problem thematisieren.|Queremos abordar el problema.
überschreiten|superar / cruzar|Wir dürfen die Grenze nicht überschreiten.|No podemos cruzar el límite.
übertragen|transmitir / trasladar|Man kann die Ergebnisse übertragen.|Se pueden trasladar los resultados.
überwinden|superar|Wir wollen die Krise überwinden.|Queremos superar la crisis.
umfassen|abarcar|Das Angebot soll alles umfassen.|La oferta tiene que abarcarlo todo.
umsetzen|poner en práctica|Wir wollen den Plan umsetzen.|Queremos poner en práctica el plan.
unterbreiten|presentar (una propuesta)|Wir wollen Ihnen ein Angebot unterbreiten.|Le queremos presentar una oferta.
unterstreichen|subrayar|Wir möchten das noch unterstreichen.|Queremos subrayar eso todavía.
verankern|anclar / consagrar|Das Recht soll im Gesetz verankert sein.|El derecho tiene que estar consagrado en la ley.
veranschaulichen|ilustrar|Ein Beispiel kann das veranschaulichen.|Un ejemplo puede ilustrar eso.
veranlassen|disponer / hacer que|Wir wollen eine Prüfung veranlassen.|Queremos disponer una revisión.
verbergen|ocultar|Er will nichts verbergen.|No quiere ocultar nada.
verdeutlichen|dejar claro|Das soll den Unterschied verdeutlichen.|Eso tiene que dejar claro la diferencia.
vereinfachen|simplificar|Wir wollen das Verfahren vereinfachen.|Queremos simplificar el trámite.
verfügen|disponer de|Die Firma kann über viel Geld verfügen.|La empresa puede disponer de mucha plata.
vergeben|adjudicar / perdonar|Man will die Aufträge vergeben.|Quieren adjudicar los encargos.
verhandeln|negociar|Wir wollen über den Preis verhandeln.|Queremos negociar el precio.
verkörpern|encarnar|Sie kann die Hoffnung verkörpern.|Ella puede encarnar la esperanza.
verleihen|otorgar / prestar|Man will ihm einen Preis verleihen.|Le quieren otorgar un premio.
vermitteln|transmitir / mediar|Wir wollen Wissen vermitteln.|Queremos transmitir conocimiento.
vernachlässigen|descuidar|Man darf die Kinder nicht vernachlässigen.|No se debe descuidar a los chicos.
verpflichten|obligar / comprometer|Wir wollen uns dazu verpflichten.|Nos queremos comprometer a eso.
verschärfen|endurecer / agravar|Man will die Regeln verschärfen.|Quieren endurecer las reglas.
verschweigen|callar / ocultar|Er wollte die Wahrheit verschweigen.|Quería ocultar la verdad.
versöhnen|reconciliar|Wir wollen uns versöhnen.|Queremos reconciliarnos.
verstärken|reforzar|Wir wollen die Kontrollen verstärken.|Queremos reforzar los controles.
vertiefen|profundizar|Wir wollen das Thema vertiefen.|Queremos profundizar el tema.
verweigern|negarse|Er wollte die Aussage verweigern.|Quería negarse a declarar.
verweisen|remitir / aludir|Wir möchten auf die Quelle verweisen.|Queremos remitir a la fuente.
verwirklichen|hacer realidad|Wir wollen unseren Traum verwirklichen.|Queremos hacer realidad nuestro sueño.
verzichten|renunciar|Wir wollen auf das Auto verzichten.|Queremos renunciar al auto.
vorantreiben|impulsar|Wir wollen das Projekt vorantreiben.|Queremos impulsar el proyecto.
voraussetzen|presuponer|Das kann man nicht voraussetzen.|Eso no se puede presuponer.
vorbeugen|prevenir|Man kann Krankheiten vorbeugen.|Se pueden prevenir enfermedades.
vorgehen|proceder|Wir müssen vorsichtig vorgehen.|Tenemos que proceder con cuidado.
widerlegen|refutar|Wir können das leicht widerlegen.|Eso lo podemos refutar fácil.
widerspiegeln|reflejar|Das Ergebnis soll die Meinung widerspiegeln.|El resultado tiene que reflejar la opinión.
zuordnen|asignar|Wir müssen die Aufgaben zuordnen.|Tenemos que asignar las tareas.
zurückführen|atribuir|Man kann das auf einen Fehler zurückführen.|Eso se puede atribuir a un error.
zusichern|asegurar / garantizar|Wir können Ihnen das zusichern.|Se lo podemos asegurar.
zuspitzen|agudizarse|Die Lage kann sich zuspitzen.|La situación se puede agudizar.
die Auswirkung|el efecto / la repercusión|Die Auswirkungen sind noch unklar.|Las repercusiones todavía no están claras.
die Anforderung|el requisito / la exigencia|Die Anforderungen sind hoch.|Las exigencias son altas.
der Anspruch|el derecho / la pretensión|Er hat Anspruch auf Urlaub.|Tiene derecho a vacaciones.
der Aufschwung|el repunte|Die Wirtschaft erlebt einen Aufschwung.|La economía vive un repunte.
der Ausgleich|la compensación|Dafür bekommen wir einen Ausgleich.|Por eso recibimos una compensación.
die Ausnahme|la excepción|Es gibt keine Ausnahme.|No hay excepción.
der Auftrag|el encargo|Der Auftrag kommt von der Stadt.|El encargo viene de la ciudad.
die Bedrohung|la amenaza|Die Bedrohung ist real.|La amenaza es real.
die Behörde|la autoridad / el organismo|Die Behörde prüft den Antrag.|El organismo revisa la solicitud.
die Besorgnis|la preocupación|Das ist ein Grund zur Besorgnis.|Es motivo de preocupación.
die Bestandsaufnahme|el relevamiento|Wir machen eine Bestandsaufnahme.|Hacemos un relevamiento.
die Beteiligung|la participación|Die Beteiligung war hoch.|La participación fue alta.
der Betrieb|la empresa / el funcionamiento|Der Betrieb hat zwanzig Mitarbeiter.|La empresa tiene veinte empleados.
die Bilanz|el balance|Die Bilanz ist positiv.|El balance es positivo.
die Branche|el sector (rubro)|In dieser Branche gibt es viel Konkurrenz.|En este rubro hay mucha competencia.
die Bürokratie|la burocracia|Die Bürokratie kostet viel Zeit.|La burocracia lleva mucho tiempo.
der Einfluss|la influencia|Der Einfluss der Medien ist groß.|La influencia de los medios es grande.
die Einschränkung|la restricción|Es gibt keine Einschränkung.|No hay restricción.
die Einstellung|la actitud / la contratación|Seine Einstellung gefällt mir.|Su actitud me gusta.
die Empfehlung|la recomendación|Wir geben eine Empfehlung ab.|Damos una recomendación.
die Entschädigung|la indemnización / la compensación|Er verlangt eine Entschädigung.|Exige una compensación.
das Erbe|la herencia|Das Erbe ist groß.|La herencia es grande.
die Erhebung|el relevamiento / la encuesta|Die Erhebung läuft bis Mai.|El relevamiento dura hasta mayo.
die Erscheinung|el fenómeno / la apariencia|Das ist eine neue Erscheinung.|Es un fenómeno nuevo.
die Fachkraft|el profesional calificado|Die Firma sucht eine Fachkraft.|La empresa busca un profesional calificado.
die Forderung|la exigencia|Die Forderung ist berechtigt.|La exigencia es justificada.
die Förderung|el apoyo / el subsidio|Die Förderung läuft bis Dezember.|El subsidio dura hasta diciembre.
die Fragestellung|el planteo (de una pregunta)|Die Fragestellung ist komplex.|El planteo es complejo.
die Führung|la dirección / el liderazgo|Die Führung entscheidet.|La dirección decide.
die Gegebenheit|la circunstancia|Wir müssen die Gegebenheiten berücksichtigen.|Tenemos que considerar las circunstancias.
der Gegenstand|el objeto / el tema|Der Gegenstand der Studie ist klar.|El objeto del estudio es claro.
die Geltung|la validez|Die Geltung des Gesetzes ist begrenzt.|La validez de la ley es limitada.
die Haftung|la responsabilidad (legal)|Die Haftung liegt bei der Firma.|La responsabilidad es de la empresa.
die Herausforderung|el desafío|Das ist eine große Herausforderung.|Es un gran desafío.
die Hürde|el obstáculo|Die Hürde ist hoch.|El obstáculo es alto.
die Identität|la identidad|Die Identität ist wichtig.|La identidad es importante.
der Impuls|el impulso|Wir brauchen einen neuen Impuls.|Necesitamos un impulso nuevo.
die Instanz|la instancia|Die Instanz entscheidet.|La instancia decide.
die Kapazität|la capacidad|Die Kapazität ist begrenzt.|La capacidad es limitada.
die Klage|la demanda / la queja|Die Klage wurde abgewiesen.|La demanda fue rechazada.
die Kluft|la brecha|Die Kluft wird größer.|La brecha se agranda.
die Konkurrenz|la competencia|Die Konkurrenz schläft nicht.|La competencia no duerme.
die Konsequenz|la consecuencia|Das hat Konsequenzen.|Eso tiene consecuencias.
die Kontrolle|el control|Die Kontrolle ist streng.|El control es estricto.
die Kritik|la crítica|Die Kritik ist berechtigt.|La crítica es justificada.
die Kündigung|el despido / la renuncia|Die Kündigung kam überraschend.|El despido llegó de sorpresa.
die Lebensqualität|la calidad de vida|Die Lebensqualität ist hoch.|La calidad de vida es alta.
die Leitung|la dirección / la línea|Die Leitung übernimmt Frau Berg.|La dirección la asume la Sra. Berg.
das Missverständnis|el malentendido|Das war ein Missverständnis.|Fue un malentendido.
der Nachweis|la prueba / el comprobante|Der Nachweis fehlt.|Falta el comprobante.
die Neigung|la inclinación|Er hat eine Neigung zum Übertreiben.|Tiene una inclinación a exagerar.
die Norm|la norma|Die Norm gilt für alle.|La norma vale para todos.
die Perspektive|la perspectiva|Aus meiner Perspektive ist das klar.|Desde mi perspectiva eso es claro.
die Position|la posición / el puesto|Seine Position ist stark.|Su posición es fuerte.
der Rahmen|el marco|Im Rahmen des Projekts gibt es drei Kurse.|En el marco del proyecto hay tres cursos.
die Reform|la reforma|Die Reform kommt nächstes Jahr.|La reforma llega el año que viene.
die Regelung|la normativa / el arreglo|Die Regelung ist neu.|La normativa es nueva.
der Schwerpunkt|el foco / el énfasis|Der Schwerpunkt liegt auf der Praxis.|El énfasis está en la práctica.
die Sicht|la vista / el punto de vista|Aus meiner Sicht ist das falsch.|Desde mi punto de vista eso es erróneo.
der Stellenwert|la importancia|Bildung hat einen hohen Stellenwert.|La educación tiene un alto valor.
die Stellungnahme|el posicionamiento|Wir erwarten eine Stellungnahme.|Esperamos un posicionamiento.
der Streitpunkt|el punto de discordia|Das ist ein Streitpunkt.|Es un punto de discordia.
die Tendenz|la tendencia|Die Tendenz ist steigend.|La tendencia es ascendente.
die Teilnahme|la participación|Die Teilnahme ist kostenlos.|La participación es gratis.
die Überzeugung|la convicción|Das ist meine Überzeugung.|Esa es mi convicción.
der Umbruch|el cambio profundo|Wir erleben einen großen Umbruch.|Vivimos un gran cambio.
der Umfang|el alcance / el volumen|Der Umfang des Textes ist groß.|La extensión del texto es grande.
der Ursprung|el origen|Der Ursprung ist unklar.|El origen no está claro.
die Verbesserung|la mejora|Die Verbesserung ist deutlich.|La mejora es clara.
die Vereinbarung|el acuerdo|Die Vereinbarung gilt ein Jahr.|El acuerdo vale un año.
die Verfügung|la disposición|Wir stellen Ihnen alles zur Verfügung.|Ponemos todo a su disposición.
die Verhandlung|la negociación / el juicio|Die Verhandlung dauert lange.|La negociación se alarga.
die Verpflichtung|la obligación|Das ist eine Verpflichtung.|Es una obligación.
der Verstoß|la infracción|Der Verstoß wird bestraft.|La infracción se sanciona.
das Vorbild|el modelo / el ejemplo a seguir|Sie ist ein Vorbild für alle.|Es un ejemplo para todos.
der Wandel|el cambio|Der Wandel ist spürbar.|El cambio se nota.
die Wechselwirkung|la interacción|Es gibt eine Wechselwirkung.|Hay una interacción.
der Wohlstand|el bienestar económico|Der Wohlstand wächst.|El bienestar crece.
die Würde|la dignidad|Die Würde ist unantastbar.|La dignidad es intocable.
der Zusammenhalt|la cohesión|Der Zusammenhalt ist wichtig.|La cohesión es importante.
der Zuschuss|el subsidio|Wir bekommen einen Zuschuss.|Recibimos un subsidio.
die Zuständigkeit|la competencia (responsabilidad)|Das liegt in der Zuständigkeit der Stadt.|Eso es responsabilidad de la ciudad.
der Zwang|la obligación / la coacción|Es gibt keinen Zwang.|No hay obligación.
absichtlich|a propósito|Er hat das absichtlich getan.|Lo hizo a propósito.
akut|agudo|Das Problem ist akut.|El problema es agudo.
angemessen|adecuado / razonable|Der Preis ist angemessen.|El precio es razonable.
anspruchsvoll|exigente|Die Aufgabe ist anspruchsvoll.|La tarea es exigente.
aufwendig|costoso / laborioso|Das Verfahren ist sehr aufwendig.|El trámite es muy laborioso.
ausdrücklich|expresamente|Das ist ausdrücklich verboten.|Eso está expresamente prohibido.
ausführlich|detallado|Wir sprechen ausführlich darüber.|Hablamos en detalle de eso.
ausgeprägt|marcado|Er hat einen ausgeprägten Sinn für Humor.|Tiene un marcado sentido del humor.
ausschließlich|exclusivamente|Das gilt ausschließlich für Mitglieder.|Eso vale exclusivamente para socios.
bedeutend|importante|Das ist ein bedeutender Fortschritt.|Es un avance importante.
bedenklich|preocupante|Die Lage ist bedenklich.|La situación es preocupante.
beträchtlich|considerable|Die Kosten sind beträchtlich.|Los costos son considerables.
bewusst|consciente|Wir müssen uns dessen bewusst sein.|Tenemos que ser conscientes de eso.
dauerhaft|duradero|Wir suchen eine dauerhafte Lösung.|Buscamos una solución duradera.
effektiv|efectivo|Die Methode ist sehr effektiv.|El método es muy efectivo.
ehrgeizig|ambicioso|Der Plan ist sehr ehrgeizig.|El plan es muy ambicioso.
eindrucksvoll|impresionante|Das Konzert war eindrucksvoll.|El concierto fue impresionante.
empfindlich|sensible|Die Haut ist sehr empfindlich.|La piel es muy sensible.
entscheidend|decisivo|Das ist ein entscheidender Punkt.|Es un punto decisivo.
erheblich|considerable|Der Unterschied ist erheblich.|La diferencia es considerable.
fließend|fluido / con fluidez|Sie spricht fließend Deutsch.|Habla alemán con fluidez.
flexibel|flexible|Wir sind sehr flexibel.|Somos muy flexibles.
fragwürdig|cuestionable|Das Ergebnis ist fragwürdig.|El resultado es cuestionable.
gelassen|sereno|Er bleibt immer gelassen.|Siempre se queda sereno.
gerechtfertigt|justificado|Die Kritik ist gerechtfertigt.|La crítica está justificada.
gesetzlich|legal|Das ist gesetzlich geregelt.|Eso está regulado por ley.
gewaltig|enorme / imponente|Der Unterschied ist gewaltig.|La diferencia es enorme.
glaubwürdig|creíble|Der Zeuge ist glaubwürdig.|El testigo es creíble.
grundlegend|fundamental|Das ist eine grundlegende Frage.|Es una pregunta fundamental.
hartnäckig|obstinado / persistente|Er ist sehr hartnäckig.|Es muy obstinado.
kompliziert|complicado|Das Verfahren ist kompliziert.|El trámite es complicado.
komplex|complejo|Das Thema ist sehr komplex.|El tema es muy complejo.
konsequent|consecuente|Sie handelt immer konsequent.|Siempre actúa con coherencia.
kontrovers|controvertido|Das Thema ist sehr kontrovers.|El tema es muy controvertido.
langwierig|largo y trabajoso|Das Verfahren ist langwierig.|El trámite es largo y trabajoso.
maßgeblich|determinante|Er war maßgeblich beteiligt.|Participó de forma determinante.
nahezu|casi|Das ist nahezu unmöglich.|Eso es casi imposible.
notwendig|necesario|Das ist notwendig.|Eso es necesario.
nüchtern|sobrio / objetivo|Der Bericht ist sehr nüchtern.|El informe es muy sobrio.
objektiv|objetivo|Wir wollen objektiv bleiben.|Queremos mantenernos objetivos.
offensichtlich|evidente|Der Fehler ist offensichtlich.|El error es evidente.
optimal|óptimo|Das ist die optimale Lösung.|Esa es la solución óptima.
rasch|rápido|Wir brauchen eine rasche Antwort.|Necesitamos una respuesta rápida.
rechtlich|jurídico|Rechtlich ist das kein Problem.|Jurídicamente no es un problema.
riskant|riesgoso|Der Plan ist riskant.|El plan es riesgoso.
schwerwiegend|grave|Das ist ein schwerwiegender Fehler.|Es un error grave.
subjektiv|subjetivo|Das ist nur subjektiv.|Eso es solo subjetivo.
tiefgreifend|profundo|Die Veränderung ist tiefgreifend.|El cambio es profundo.
überflüssig|innecesario|Das ist überflüssig.|Eso es innecesario.
überzeugend|convincente|Das Argument ist überzeugend.|El argumento es convincente.
umfassend|amplio / completo|Wir brauchen umfassende Informationen.|Necesitamos información completa.
umstritten|polémico|Das Gesetz ist sehr umstritten.|La ley es muy polémica.
unausweichlich|inevitable|Die Folgen sind unausweichlich.|Las consecuencias son inevitables.
unerlässlich|imprescindible|Geduld ist unerlässlich.|La paciencia es imprescindible.
ungewiss|incierto|Die Zukunft ist ungewiss.|El futuro es incierto.
unverzichtbar|indispensable|Das ist unverzichtbar.|Eso es indispensable.
vielfältig|variado|Das Angebot ist sehr vielfältig.|La oferta es muy variada.
vorübergehend|transitorio|Das ist nur vorübergehend.|Eso es solo transitorio.
widersprüchlich|contradictorio|Die Aussagen sind widersprüchlich.|Las declaraciones son contradictorias.
zunehmend|cada vez más|Es wird zunehmend schwierig.|Se vuelve cada vez más difícil.
zwingend|obligatorio / forzoso|Das ist nicht zwingend nötig.|Eso no es forzosamente necesario.
ebenso|igualmente|Das gilt ebenso für dich.|Eso vale igualmente para vos.
demnach|según eso|Demnach ist alles in Ordnung.|Según eso, está todo en orden.
insbesondere|en especial|Insbesondere die Jungen sind betroffen.|En especial están afectados los jóvenes.
hingegen|en cambio|Er ist ruhig, sie hingegen ist laut.|Él es tranquilo; ella, en cambio, es ruidosa.
somit|por lo tanto|Somit ist das Problem gelöst.|Por lo tanto, el problema está resuelto.
nämlich|es que / pues|Ich komme später, ich habe nämlich Termine.|Llego más tarde, es que tengo citas.
ohnehin|de todos modos|Das ist ohnehin klar.|Eso ya está claro de todos modos.
vielmehr|más bien|Es ist nicht teuer, vielmehr günstig.|No es caro, más bien barato.
weitgehend|en gran medida|Das Problem ist weitgehend gelöst.|El problema está resuelto en gran medida.
zudem|además|Zudem ist die Lage ruhig.|Además la zona es tranquila.
zugleich|al mismo tiempo|Er ist Lehrer und zugleich Autor.|Es docente y al mismo tiempo autor.
ausnahmslos|sin excepción|Das gilt ausnahmslos für alle.|Eso vale para todos sin excepción.
größtenteils|en su mayor parte|Das stimmt größtenteils.|Eso es cierto en su mayor parte.
keinesfalls|bajo ningún concepto|Das darf keinesfalls passieren.|Eso no debe pasar bajo ningún concepto.
mittlerweile|mientras tanto / ya|Mittlerweile ist alles fertig.|Ya está todo listo.
überwiegend|en su mayoría|Die Gäste sind überwiegend jung.|Los invitados son en su mayoría jóvenes.
zeitweise|por momentos|Zeitweise regnet es stark.|Por momentos llueve fuerte.
abschätzen|estimar|Wir können die Kosten schwer abschätzen.|Los costos son difíciles de estimar.
sich aneignen|apropiarse / adquirir|Wir wollen uns neues Wissen aneignen.|Queremos adquirir conocimientos nuevos.
sich anschließen|sumarse|Wir wollen uns der Gruppe anschließen.|Queremos sumarnos al grupo.
auffordern|exigir / invitar a|Wir müssen ihn dazu auffordern.|Tenemos que exigirle eso.
aufsuchen|acudir a|Wir sollten einen Arzt aufsuchen.|Deberíamos acudir a un médico.
ausbilden|formar / capacitar|Die Firma will junge Leute ausbilden.|La empresa quiere formar a gente joven.
ausgrenzen|excluir (socialmente)|Wir wollen niemanden ausgrenzen.|No queremos excluir a nadie.
beinhalten|incluir / implicar|Der Vertrag kann viele Punkte beinhalten.|El contrato puede incluir muchos puntos.
sich beziehen|referirse|Wir beziehen uns auf Ihre Anfrage.|Nos referimos a su consulta.
eindämmen|contener|Man will die Kosten eindämmen.|Quieren contener los costos.
einführen|introducir / implementar|Wir wollen ein neues System einführen.|Queremos implementar un sistema nuevo.
eingreifen|intervenir|Die Polizei muss eingreifen.|La policía tiene que intervenir.
einleiten|iniciar / encaminar|Wir wollen Maßnahmen einleiten.|Queremos iniciar medidas.
einreichen|presentar (un documento)|Wir müssen den Antrag einreichen.|Tenemos que presentar la solicitud.
einsparen|ahorrar|Wir wollen Energie einsparen.|Queremos ahorrar energía.
enttäuschen|decepcionar|Wir wollen niemanden enttäuschen.|No queremos decepcionar a nadie.
erfüllen|cumplir / satisfacer|Wir müssen die Bedingungen erfüllen.|Tenemos que cumplir las condiciones.
ergänzen|complementar|Wir möchten kurz ergänzen.|Quisiéramos agregar brevemente.
sich ergeben|resultar|Daraus kann sich etwas ergeben.|De eso puede resultar algo.
erkranken|enfermarse|Viele Menschen können erkranken.|Mucha gente puede enfermarse.
erlassen|dictar / eximir|Man will ein neues Gesetz erlassen.|Quieren dictar una ley nueva.
erlernen|aprender (adquirir)|Man kann eine Sprache erlernen.|Un idioma se puede aprender.
ernennen|nombrar|Man will sie zur Direktorin ernennen.|La quieren nombrar directora.
erstatten|reembolsar|Wir wollen die Kosten erstatten.|Queremos reembolsar los costos.
sich erweisen|resultar / demostrarse|Das kann sich als Fehler erweisen.|Eso puede resultar un error.
feststehen|estar decidido|Der Termin soll bald feststehen.|La fecha tiene que quedar fijada pronto.
folgern|deducir|Wir können daraus nichts folgern.|De eso no podemos deducir nada.
gestatten|permitir|Wir können das nicht gestatten.|Eso no lo podemos permitir.
gliedern|estructurar|Wir wollen den Text gliedern.|Queremos estructurar el texto.
herrschen|reinar / predominar|Hier soll Ruhe herrschen.|Acá tiene que reinar la calma.
hinterlassen|dejar (tras de sí)|Wir wollen keine Spuren hinterlassen.|No queremos dejar huellas.
hinzufügen|agregar|Wir möchten etwas hinzufügen.|Quisiéramos agregar algo.
konkurrieren|competir|Die Firmen konkurrieren miteinander.|Las empresas compiten entre sí.
kontrollieren|controlar|Wir wollen alles kontrollieren.|Queremos controlarlo todo.
nachkommen|cumplir (una obligación)|Wir müssen der Pflicht nachkommen.|Tenemos que cumplir con la obligación.
offenbaren|revelar|Er will seine Gefühle offenbaren.|Quiere revelar sus sentimientos.
pflegen|cuidar / mantener|Wir pflegen die Kontakte.|Mantenemos los contactos.
schlussfolgern|concluir|Man kann daraus schlussfolgern.|De eso se puede concluir.
überfordern|exigir de más / sobrepasar|Wir wollen niemanden überfordern.|No queremos exigirle de más a nadie.
überleben|sobrevivir|Wir wollen die Krise überleben.|Queremos sobrevivir a la crisis.
übersehen|pasar por alto|Man darf das nicht übersehen.|Eso no se puede pasar por alto.
unterlassen|abstenerse|Wir sollten das unterlassen.|Deberíamos abstenernos de eso.
untermauern|respaldar (con pruebas)|Wir können das untermauern.|Lo podemos respaldar con pruebas.
verfassen|redactar|Wir wollen einen Brief verfassen.|Queremos redactar una carta.
verhängen|imponer (una sanción)|Man will eine Strafe verhängen.|Quieren imponer una sanción.
verkünden|anunciar (oficialmente)|Man wird das Ergebnis verkünden.|Se va a anunciar el resultado.
verschlechtern|empeorar|Die Lage kann sich verschlechtern.|La situación puede empeorar.
versäumen|perder (una ocasión) / omitir|Wir wollen nichts versäumen.|No queremos perdernos nada.
vortäuschen|simular|Er wollte Krankheit vortäuschen.|Quería simular una enfermedad.
wahren|preservar|Wir wollen den Frieden wahren.|Queremos preservar la paz.
zulassen|permitir / admitir|Das dürfen wir nicht zulassen.|Eso no lo podemos permitir.
zurücktreten|renunciar (a un cargo)|Der Minister muss zurücktreten.|El ministro tiene que renunciar.
die Rezession|la recesión|Die Rezession dauert schon lange.|La recesión ya dura mucho.
der Export|la exportación|Der Export steigt.|La exportación sube.
der Import|la importación|Der Import wird teurer.|La importación se encarece.
der Handel|el comercio|Der Handel zwischen den Ländern wächst.|El comercio entre los países crece.
die Investition|la inversión|Die Investition lohnt sich.|La inversión vale la pena.
der Investor|el inversor|Der Investor will mehr Gewinn.|El inversor quiere más ganancias.
das Kapital|el capital|Das Kapital ist knapp.|El capital es escaso.
die Abgabe|el tributo / la entrega|Die Abgabe ist am Freitag.|La entrega es el viernes.
die Altersvorsorge|la previsión para la vejez|Die Altersvorsorge wird wichtiger.|La previsión para la vejez se vuelve más importante.
das Defizit|el déficit|Das Defizit wächst.|El déficit crece.
die Subvention|el subsidio|Die Subvention läuft aus.|El subsidio termina.
der Konzern|el grupo empresarial|Der Konzern hat tausend Mitarbeiter.|El grupo empresarial tiene mil empleados.
der Mittelstand|las pymes|Der Mittelstand ist sehr wichtig.|Las pymes son muy importantes.
die Gründung|la fundación|Die Gründung war im Jahr zweitausend.|La fundación fue en el año dos mil.
die Insolvenz|la quiebra|Die Firma meldet Insolvenz an.|La empresa se declara en quiebra.
der Gläubiger|el acreedor|Der Gläubiger will sein Geld.|El acreedor quiere su plata.
der Schuldner|el deudor|Der Schuldner kann nicht zahlen.|El deudor no puede pagar.
die Preissteigerung|el aumento de precios|Die Preissteigerung betrifft alle.|El aumento de precios afecta a todos.
die Produktion|la producción|Die Produktion läuft wieder.|La producción vuelve a funcionar.
der Hersteller|el fabricante|Der Hersteller gibt zwei Jahre Garantie.|El fabricante da dos años de garantía.
der Lieferant|el proveedor|Der Lieferant kommt am Montag.|El proveedor viene el lunes.
die Lohnerhöhung|el aumento de sueldo|Die Lohnerhöhung beträgt drei Prozent.|El aumento de sueldo es del tres por ciento.
der Tarif|la tarifa / el convenio|Der Tarif gilt für alle.|El convenio vale para todos.
der Arbeitnehmer|el empleado|Die Arbeitnehmer fordern mehr Lohn.|Los empleados exigen más sueldo.
der Richter|el juez|Der Richter entscheidet morgen.|El juez decide mañana.
der Staatsanwalt|el fiscal|Der Staatsanwalt prüft den Fall.|El fiscal revisa el caso.
der Prozess|el juicio / el proceso|Der Prozess dauert schon ein Jahr.|El juicio ya dura un año.
das Verfahren|el procedimiento|Das Verfahren ist eingestellt.|El procedimiento fue archivado.
die Verfassung|la constitución|Die Verfassung schützt die Rechte.|La constitución protege los derechos.
das Grundgesetz|la Ley Fundamental|Das Grundgesetz gilt seit neunzehnhundertneunundvierzig.|La Ley Fundamental rige desde 1949.
die Bundesregierung|el gobierno federal|Die Bundesregierung plant eine Reform.|El gobierno federal planea una reforma.
der Minister|el ministro|Der Minister spricht im Fernsehen.|El ministro habla en la televisión.
das Parlament|el parlamento|Das Parlament stimmt morgen ab.|El parlamento vota mañana.
die Verwaltung|la administración|Die Verwaltung ist langsam.|La administración es lenta.
die Gesetzgebung|la legislación|Die Gesetzgebung ändert sich.|La legislación cambia.
die Verordnung|el decreto / la ordenanza|Die Verordnung tritt morgen in Kraft.|El decreto entra en vigor mañana.
die Richtlinie|la directriz|Die Richtlinie ist klar.|La directriz es clara.
das Asyl|el asilo|Er hat Asyl beantragt.|Solicitó asilo.
die Staatsangehörigkeit|la nacionalidad|Meine Staatsangehörigkeit ist argentinisch.|Mi nacionalidad es argentina.
die Außenpolitik|la política exterior|Die Außenpolitik ist wichtig.|La política exterior es importante.
der Konflikt|el conflicto|Der Konflikt dauert schon lange.|El conflicto ya dura mucho.
die Sanktion|la sanción|Die Sanktionen wirken.|Las sanciones surten efecto.
das Bündnis|la alianza|Das Bündnis ist stark.|La alianza es fuerte.
die Europäische Union|la Unión Europea|Die Europäische Union hat viele Mitglieder.|La Unión Europea tiene muchos miembros.
die Entwicklungshilfe|la ayuda al desarrollo|Die Entwicklungshilfe ist umstritten.|La ayuda al desarrollo es polémica.
die Therapie|la terapia|Die Therapie dauert sechs Monate.|La terapia dura seis meses.
die Infektion|la infección|Die Infektion ist nicht gefährlich.|La infección no es peligrosa.
die Epidemie|la epidemia|Die Epidemie breitet sich aus.|La epidemia se extiende.
die Pandemie|la pandemia|Die Pandemie hat alles verändert.|La pandemia cambió todo.
das Immunsystem|el sistema inmune|Das Immunsystem schützt den Körper.|El sistema inmune protege el cuerpo.
die Dosis|la dosis|Die Dosis ist zu hoch.|La dosis es demasiado alta.
die Sucht|la adicción|Die Sucht ist eine Krankheit.|La adicción es una enfermedad.
die Abhängigkeit|la dependencia|Die Abhängigkeit ist groß.|La dependencia es grande.
die Depression|la depresión|Die Depression ist behandelbar.|La depresión se puede tratar.
die Psychotherapie|la psicoterapia|Die Psychotherapie hilft ihm.|La psicoterapia lo ayuda.
das Gesundheitswesen|el sistema de salud|Das Gesundheitswesen ist teuer.|El sistema de salud es caro.
die Wissenschaft|la ciencia|Die Wissenschaft macht Fortschritte.|La ciencia hace progresos.
die Theorie|la teoría|Die Theorie ist interessant.|La teoría es interesante.
die These|la tesis|Die These ist umstritten.|La tesis es polémica.
das Experiment|el experimento|Das Experiment war erfolgreich.|El experimento fue exitoso.
die Auswertung|la evaluación (de datos)|Die Auswertung dauert eine Woche.|La evaluación lleva una semana.
die Stichprobe|la muestra|Die Stichprobe ist zu klein.|La muestra es demasiado chica.
die Innovation|la innovación|Innovation ist wichtig.|La innovación es importante.
das Patent|la patente|Das Patent gehört der Firma.|La patente es de la empresa.
die Automatisierung|la automatización|Die Automatisierung spart Zeit.|La automatización ahorra tiempo.
der Roboter|el robot|Der Roboter arbeitet nachts.|El robot trabaja de noche.
die Plattform|la plataforma|Die Plattform ist kostenlos.|La plataforma es gratis.
die Artenvielfalt|la biodiversidad|Die Artenvielfalt ist bedroht.|La biodiversidad está amenazada.
das Ökosystem|el ecosistema|Das Ökosystem ist empfindlich.|El ecosistema es delicado.
die Abholzung|la tala|Die Abholzung zerstört den Wald.|La tala destruye el bosque.
die Erderwärmung|el calentamiento global|Die Erderwärmung schreitet voran.|El calentamiento global avanza.
der Treibhauseffekt|el efecto invernadero|Der Treibhauseffekt wird stärker.|El efecto invernadero se intensifica.
die Windkraft|la energía eólica|Die Windkraft wird ausgebaut.|La energía eólica se amplía.
die Solarenergie|la energía solar|Die Solarenergie ist sauber.|La energía solar es limpia.
die Kernenergie|la energía nuclear|Die Kernenergie ist umstritten.|La energía nuclear es polémica.
die Kohle|el carbón|Die Kohle verschmutzt die Luft.|El carbón contamina el aire.
das Erdöl|el petróleo|Das Erdöl wird knapp.|El petróleo se vuelve escaso.
der Rohstoff|la materia prima|Der Rohstoff ist teuer.|La materia prima es cara.
der Naturschutz|la protección de la naturaleza|Der Naturschutz ist wichtig.|La protección de la naturaleza es importante.
das Hochwasser|la crecida|Das Hochwasser steigt.|La crecida sube.
der Sturm|la tormenta (viento)|Der Sturm hat Bäume umgeworfen.|La tormenta derribó árboles.
die Hitzewelle|la ola de calor|Die Hitzewelle dauert eine Woche.|La ola de calor dura una semana.
der Gletscher|el glaciar|Der Gletscher schmilzt.|El glaciar se derrite.
die Trockenheit|la sequedad|Die Trockenheit schadet den Feldern.|La sequedad daña los campos.
die Kunst|el arte|Die Kunst ist mein Hobby.|El arte es mi pasatiempo.
das Kunstwerk|la obra de arte|Das Kunstwerk ist sehr wertvoll.|La obra de arte es muy valiosa.
die Skulptur|la escultura|Die Skulptur steht im Park.|La escultura está en el parque.
die Literatur|la literatura|Ich interessiere mich für Literatur.|Me interesa la literatura.
der Autor|el autor|Der Autor liest aus seinem Buch.|El autor lee de su libro.
der Schriftsteller|el escritor|Der Schriftsteller lebt in Wien.|El escritor vive en Viena.
das Gedicht|el poema|Das Gedicht ist sehr kurz.|El poema es muy corto.
die Übersetzung|la traducción|Die Übersetzung ist gut gelungen.|La traducción salió muy bien.
das Publikum|el público|Das Publikum klatscht.|El público aplaude.
der Zuschauer|el espectador|Die Zuschauer sind begeistert.|Los espectadores están entusiasmados.
der Leser|el lector|Der Leser muss mitdenken.|El lector tiene que pensar.
die Rezension|la reseña (crítica)|Die Rezension ist positiv.|La reseña es positiva.
die Zeitschrift|la revista|Die Zeitschrift erscheint monatlich.|La revista sale mensualmente.
die Redaktion|la redacción|Die Redaktion sucht neue Leute.|La redacción busca gente nueva.
der Journalist|el periodista|Der Journalist schreibt über Politik.|El periodista escribe sobre política.
die Reportage|el reportaje|Die Reportage ist sehr spannend.|El reportaje es muy atrapante.
der Kommentar|el comentario|Der Kommentar ist kritisch.|El comentario es crítico.
die Überschrift|el título (de un texto)|Die Überschrift ist zu lang.|El título es demasiado largo.
das Urheberrecht|el derecho de autor|Das Urheberrecht schützt Autoren.|El derecho de autor protege a los autores.
die Persönlichkeit|la personalidad|Sie hat eine starke Persönlichkeit.|Tiene una personalidad fuerte.
das Bedürfnis|la necesidad|Jeder hat andere Bedürfnisse.|Cada uno tiene necesidades distintas.
die Motivation|la motivación|Die Motivation fehlt mir.|Me falta motivación.
das Klischee|el cliché|Das ist ein Klischee.|Eso es un cliché.
die Erziehung|la crianza / la educación|Die Erziehung beginnt zu Hause.|La crianza empieza en casa.
der Erwachsene|el adulto|Die Erwachsenen reden zu viel.|Los adultos hablan demasiado.
die Generation|la generación|Die junge Generation denkt anders.|La generación joven piensa distinto.
die Gleichstellung|la igualdad (de género)|Die Gleichstellung ist ein Ziel.|La igualdad es una meta.
die Diskriminierung|la discriminación|Diskriminierung ist verboten.|La discriminación está prohibida.
die Toleranz|la tolerancia|Toleranz ist wichtig.|La tolerancia es importante.
die Einsamkeit|la soledad|Die Einsamkeit kann krank machen.|La soledad puede enfermar.
die Solidarität|la solidaridad|Wir brauchen mehr Solidarität.|Necesitamos más solidaridad.
die Gerechtigkeit|la justicia|Gerechtigkeit ist schwer zu messen.|La justicia es difícil de medir.
das Selbstvertrauen|la autoconfianza|Sein Selbstvertrauen wächst.|Su autoconfianza crece.
das Gemeinwohl|el bien común|Das Gemeinwohl steht an erster Stelle.|El bien común está primero.
die Armutsgrenze|la línea de pobreza|Viele leben unter der Armutsgrenze.|Muchos viven bajo la línea de pobreza.
die Lebensbedingungen|las condiciones de vida|Die Lebensbedingungen verbessern sich.|Las condiciones de vida mejoran.
der Mangel|la falta / la escasez|Es herrscht Mangel an Fachkräften.|Hay escasez de personal calificado.
der Überfluss|la abundancia|Wir leben im Überfluss.|Vivimos en la abundancia.
der Verzicht|la renuncia|Der Verzicht fällt schwer.|Renunciar cuesta.
der Fortbestand|la continuidad|Der Fortbestand der Firma ist gesichert.|La continuidad de la empresa está asegurada.
die Anschaffung|la adquisición|Die Anschaffung kostet viel.|La adquisición cuesta mucho.
die Ausgabe|el gasto / la edición|Die Ausgaben steigen.|Los gastos suben.
das Budget|el presupuesto|Das Budget ist knapp.|El presupuesto es ajustado.
die Prognose|el pronóstico|Die Prognose ist optimistisch.|El pronóstico es optimista.
die Konjunktur|la coyuntura económica|Die Konjunktur ist schwach.|La coyuntura económica es débil.
der Standort|la ubicación (empresarial)|Der Standort ist günstig.|La ubicación es conveniente.
das Wachstum|el crecimiento|Das Wachstum ist gering.|El crecimiento es bajo.
bereitwillig|dispuesto / de buena gana|Er hilft bereitwillig.|Ayuda de buena gana.
dringlich|apremiante|Das Problem ist dringlich.|El problema es apremiante.
einschlägig|pertinente|Er hat einschlägige Erfahrung.|Tiene experiencia pertinente.
folgerichtig|lógico / coherente|Das ist folgerichtig.|Eso es coherente.
fortschrittlich|progresista / avanzado|Die Stadt ist sehr fortschrittlich.|La ciudad es muy avanzada.
gegenwärtig|actual|Die gegenwärtige Lage ist schwierig.|La situación actual es difícil.
gewissenhaft|escrupuloso|Er arbeitet gewissenhaft.|Trabaja con escrúpulo.
hilflos|indefenso|Er fühlt sich hilflos.|Se siente indefenso.
lückenhaft|con lagunas|Die Liste ist lückenhaft.|La lista tiene lagunas.
mühsam|trabajoso|Der Weg war mühsam.|El camino fue trabajoso.
naheliegend|evidente / lógico|Das ist naheliegend.|Eso es lo más lógico.
sachlich|objetivo / factual|Die Diskussion blieb sachlich.|La discusión se mantuvo objetiva.
selbstkritisch|autocrítico|Sie ist sehr selbstkritisch.|Es muy autocrítica.
stichhaltig|sólido (argumento)|Das Argument ist stichhaltig.|El argumento es sólido.
unbestritten|indiscutido|Das ist unbestritten.|Eso es indiscutido.
unerwartet|inesperado|Das kam völlig unerwartet.|Eso vino totalmente inesperado.
unvermeidlich|inevitable|Das ist unvermeidlich.|Eso es inevitable.
verantwortungsvoll|responsable|Sie handelt verantwortungsvoll.|Actúa con responsabilidad.
vergleichsweise|comparativamente|Das ist vergleichsweise günstig.|Eso es comparativamente barato.
verlässlich|fiable|Er ist ein verlässlicher Partner.|Es un socio fiable.
vollkommen|completo / perfecto|Das ist vollkommen richtig.|Eso es completamente correcto.
wahrnehmbar|perceptible|Der Unterschied ist kaum wahrnehmbar.|La diferencia casi no se percibe.
wegweisend|innovador / pionero|Das Projekt ist wegweisend.|El proyecto es pionero.
zeitgemäß|actual / acorde a la época|Das Konzept ist zeitgemäß.|El concepto es actual.
zielgerichtet|dirigido a un objetivo|Wir arbeiten zielgerichtet.|Trabajamos con objetivos claros.
zukunftsfähig|con futuro|Das Modell ist zukunftsfähig.|El modelo tiene futuro.
zweifellos|sin duda|Das ist zweifellos richtig.|Eso es sin duda correcto.
alsbald|pronto|Wir melden uns alsbald.|Nos comunicamos pronto.
andererseits|por otro lado|Andererseits ist es auch teuer.|Por otro lado también es caro.
anderweitig|de otro modo / en otro lado|Wir müssen anderweitig suchen.|Tenemos que buscar en otro lado.
diesbezüglich|al respecto|Haben Sie diesbezüglich Fragen?|¿Tiene preguntas al respecto?
einerseits|por un lado|Einerseits ist es schön.|Por un lado es lindo.
erstmals|por primera vez|Das passiert erstmals.|Eso pasa por primera vez.
fortan|de ahora en adelante|Fortan gilt die neue Regel.|De ahora en adelante rige la regla nueva.
hierbei|en esto / al hacerlo|Hierbei ist Vorsicht nötig.|Al hacerlo se necesita cuidado.
hinsichtlich|con respecto a|Hinsichtlich der Kosten gibt es keine Probleme.|Con respecto a los costos no hay problemas.
inwiefern|en qué medida|Inwiefern ist das wichtig?|¿En qué medida es importante?
mitunter|a veces|Das kann mitunter schwierig sein.|Eso puede ser difícil a veces.
sodass|de modo que|Es regnet, sodass wir drinnen bleiben.|Llueve, de modo que nos quedamos adentro.
sofern|siempre que|Wir kommen, sofern es nicht regnet.|Vamos, siempre que no llueva.
vielerorts|en muchos lugares|Vielerorts gibt es Probleme.|En muchos lugares hay problemas.
weshalb|por lo cual|Das ist der Grund, weshalb wir kommen.|Esa es la razón por la cual venimos.
wiederum|a su vez|Das hängt wiederum vom Wetter ab.|Eso depende a su vez del clima.
zumeist|en general|Die Gäste sind zumeist jung.|Los invitados son en general jóvenes.
abbauen|desmontar / reducir|Wir wollen die Bürokratie abbauen.|Queremos reducir la burocracia.
abbrechen|interrumpir / cancelar|Wir müssen die Reise abbrechen.|Tenemos que cancelar el viaje.
ablaufen|transcurrir / vencer|Der Pass kann bald ablaufen.|El pasaporte puede vencer pronto.
ablösen|reemplazar (en un puesto)|Man will den Chef ablösen.|Quieren reemplazar al jefe.
absagen|cancelar / rechazar|Wir müssen das Fest absagen.|Tenemos que cancelar la fiesta.
abschreiben|copiar|Man darf nicht abschreiben.|No se debe copiar.
absichern|asegurar|Wir wollen uns absichern.|Queremos asegurarnos.
anbringen|colocar|Wir wollen ein Schild anbringen.|Queremos colocar un cartel.
anfordern|solicitar|Wir müssen Unterlagen anfordern.|Tenemos que solicitar documentación.
anhören|escuchar (con atención)|Wir wollen uns das Konzert anhören.|Queremos escuchar el concierto.
anmerken|notar / comentar|Wir möchten kurz etwas anmerken.|Quisiéramos comentar algo brevemente.
anstoßen|brindar / chocar|Wir wollen auf den Erfolg anstoßen.|Queremos brindar por el éxito.
antreiben|impulsar / motivar|Der Ehrgeiz kann uns antreiben.|La ambición nos puede impulsar.
anvertrauen|confiar (algo)|Wir wollen dir das anvertrauen.|Te lo queremos confiar.
anzeigen|denunciar / mostrar|Man kann den Diebstahl anzeigen.|Se puede denunciar el robo.
aufbewahren|guardar / conservar|Wir müssen die Belege aufbewahren.|Tenemos que guardar los comprobantes.
aufführen|representar / enumerar|Man will das Stück aufführen.|Quieren representar la obra.
aufheben|guardar / levantar|Wir müssen den Beleg aufheben.|Tenemos que guardar el comprobante.
aufnehmen|grabar / admitir|Wir wollen ein Lied aufnehmen.|Queremos grabar una canción.
aufrufen|llamar / convocar|Man will zum Streik aufrufen.|Quieren convocar a una huelga.
aufrechterhalten|mantener|Wir wollen den Kontakt aufrechterhalten.|Queremos mantener el contacto.
aufteilen|repartir|Wir wollen die Kosten aufteilen.|Queremos repartir los costos.
auftreten|aparecer / presentarse|Das Problem kann plötzlich auftreten.|El problema puede aparecer de golpe.
ausarbeiten|elaborar|Wir wollen einen Plan ausarbeiten.|Queremos elaborar un plan.
ausbrechen|estallar / escaparse|Ein Streit kann ausbrechen.|Una pelea puede estallar.
ausfallen|suspenderse / caerse|Das Konzert muss ausfallen.|El concierto se tiene que suspender.
ausführen|ejecutar / llevar a cabo|Wir wollen den Auftrag ausführen.|Queremos ejecutar el encargo.
auskommen|arreglarse / llevarse bien|Wir wollen mit wenig auskommen.|Queremos arreglarnos con poco.
auslassen|omitir|Wir dürfen nichts auslassen.|No podemos omitir nada.
ausrichten|transmitir (un mensaje) / organizar|Können Sie ihm etwas ausrichten?|¿Le puede transmitir algo?
aussprechen|pronunciar / expresar|Wir wollen das Wort richtig aussprechen.|Queremos pronunciar bien la palabra.
austauschen|intercambiar|Wir wollen Erfahrungen austauschen.|Queremos intercambiar experiencias.
ausweisen|identificarse / expulsar|Man muss sich ausweisen.|Hay que identificarse.
auszahlen|pagar (en efectivo)|Man kann das Geld auszahlen.|Se puede pagar el dinero.
bearbeiten|procesar / trabajar|Wir wollen den Antrag bearbeiten.|Queremos procesar la solicitud.
bedrohen|amenazar|Das kann die Umwelt bedrohen.|Eso puede amenazar el medio ambiente.
beenden|terminar|Wir wollen die Sitzung beenden.|Queremos terminar la reunión.
begleiten|acompañar|Wir wollen dich begleiten.|Te queremos acompañar.
beheben|solucionar (una falla)|Wir müssen den Fehler beheben.|Tenemos que solucionar la falla.
beilegen|zanjar / adjuntar|Wir wollen den Streit beilegen.|Queremos zanjar la discusión.
beleidigen|ofender|Wir wollen niemanden beleidigen.|No queremos ofender a nadie.
beliefern|abastecer|Wir können die Läden beliefern.|Podemos abastecer a los negocios.
berechnen|calcular / cobrar|Wir müssen die Kosten berechnen.|Tenemos que calcular los costos.
berichtigen|corregir|Wir müssen den Fehler berichtigen.|Tenemos que corregir el error.
beschäftigen|ocupar / emplear|Die Firma will mehr Leute beschäftigen.|La empresa quiere emplear más gente.
beschleunigen|acelerar|Wir wollen das Verfahren beschleunigen.|Queremos acelerar el trámite.
beschädigen|dañar|Wir wollen nichts beschädigen.|No queremos dañar nada.
besetzen|ocupar / cubrir (un puesto)|Wir müssen die Stelle besetzen.|Tenemos que cubrir el puesto.
besichtigen|visitar / recorrer|Wir wollen das Schloss besichtigen.|Queremos recorrer el castillo.
bestrafen|castigar|Man darf Kinder nicht bestrafen.|No se debe castigar a los chicos.
betätigen|accionar|Man muss den Schalter betätigen.|Hay que accionar el interruptor.
betreiben|operar / dedicarse a|Wir wollen ein Geschäft betreiben.|Queremos manejar un negocio.
betrügen|estafar / engañar|Man darf niemanden betrügen.|No se debe estafar a nadie.
bewilligen|aprobar (un pedido)|Man will den Antrag bewilligen.|Quieren aprobar la solicitud.
bewahren|preservar|Wir wollen die Ruhe bewahren.|Queremos mantener la calma.
blockieren|bloquear|Wir wollen die Straße nicht blockieren.|No queremos bloquear la calle.
darlegen|exponer|Wir wollen unsere Gründe darlegen.|Queremos exponer nuestras razones.
dazugehören|formar parte|Wir wollen dazugehören.|Queremos formar parte.
drohen|amenazar con|Dem Betrieb kann die Pleite drohen.|A la empresa le puede amenazar la quiebra.
durchlaufen|recorrer / pasar por|Wir müssen mehrere Stufen durchlaufen.|Tenemos que pasar por varias etapas.
durchsuchen|registrar|Die Polizei will das Haus durchsuchen.|La policía quiere registrar la casa.
ehren|honrar|Man will ihn ehren.|Lo quieren honrar.
eintragen|anotar / inscribir|Wir müssen uns in die Liste eintragen.|Tenemos que anotarnos en la lista.
einwilligen|consentir|Wir können nicht einwilligen.|No podemos consentir.
empfangen|recibir (a alguien)|Wir wollen die Gäste empfangen.|Queremos recibir a los invitados.
entfalten|desplegar / desarrollar|Er kann sich hier frei entfalten.|Acá se puede desarrollar libremente.
enthüllen|revelar / descubrir|Man will ein Denkmal enthüllen.|Quieren inaugurar un monumento.
entkommen|escapar|Der Täter konnte entkommen.|El autor pudo escapar.
entlohnen|remunerar|Man muss die Arbeit gut entlohnen.|Hay que remunerar bien el trabajo.
ereignen|ocurrir|Ein Unfall kann sich ereignen.|Un accidente puede ocurrir.
ermahnen|exhortar|Wir müssen ihn ermahnen.|Tenemos que exhortarlo.
ernähren|alimentar / mantener|Er muss eine große Familie ernähren.|Tiene que mantener a una familia grande.
erobern|conquistar|Wir wollen den Markt erobern.|Queremos conquistar el mercado.
erraten|adivinar|Wir können das nicht erraten.|Eso no lo podemos adivinar.
erscheinen|aparecer / publicarse|Das Buch soll im Herbst erscheinen.|El libro tiene que salir en otoño.
erschrecken|asustar|Wir wollen niemanden erschrecken.|No queremos asustar a nadie.
ersparen|ahorrar (evitar)|Das kann uns viel Ärger ersparen.|Eso nos puede ahorrar muchos problemas.
erwidern|responder / devolver|Wir wollen darauf erwidern.|Queremos responder a eso.
erwischen|atrapar / pillar|Man kann ihn beim Rauchen erwischen.|Lo pueden atrapar fumando.
fälschen|falsificar|Man darf keine Dokumente fälschen.|No se deben falsificar documentos.
festnehmen|detener|Die Polizei will ihn festnehmen.|La policía lo quiere detener.
forschen|investigar|Wir wollen an dem Thema forschen.|Queremos investigar el tema.
fortfahren|continuar|Wir wollen mit der Arbeit fortfahren.|Queremos continuar con el trabajo.
freisprechen|absolver|Das Gericht kann ihn freisprechen.|El tribunal lo puede absolver.
gestehen|confesar|Er will alles gestehen.|Quiere confesarlo todo.
gewähren|conceder|Man will einen Kredit gewähren.|Quieren conceder un crédito.
grübeln|cavilar|Wir wollen nicht ständig grübeln.|No queremos cavilar todo el tiempo.
haften|responder (legalmente)|Wir können dafür nicht haften.|No podemos responder por eso.
handhaben|manejar / aplicar|Wir wollen das flexibel handhaben.|Lo queremos manejar con flexibilidad.
herbeiführen|provocar|Das kann eine Veränderung herbeiführen.|Eso puede provocar un cambio.
der Führerschein|el carnet de conducir|Ich mache den Führerschein.|Estoy sacando el carnet de conducir.
das Lenkrad|el volante|Das Lenkrad ist sehr alt.|El volante es muy viejo.
die Bremse|el freno|Die Bremse funktioniert nicht.|El freno no funciona.
der Reifen|el neumático|Der Reifen ist kaputt.|El neumático está roto.
der Motor|el motor|Der Motor ist sehr laut.|El motor es muy ruidoso.
die Panne|la avería|Wir hatten eine Panne.|Tuvimos una avería.
der Kofferraum|el baúl|Der Kofferraum ist voll.|El baúl está lleno.
das Kennzeichen|la patente|Das Kennzeichen ist nicht lesbar.|La patente no se puede leer.
der Rucksack|la mochila|Mein Rucksack ist schwer.|Mi mochila es pesada.
das Handgepäck|el equipaje de mano|Das Handgepäck ist begrenzt.|El equipaje de mano es limitado.
der Zwischenstopp|la escala|Wir haben einen Zwischenstopp in Wien.|Tenemos una escala en Viena.
die Passkontrolle|el control de pasaportes|Die Passkontrolle dauert lange.|El control de pasaportes tarda mucho.
die Pauschalreise|el viaje con paquete|Die Pauschalreise ist günstig.|El viaje con paquete es barato.
die Rundreise|el circuito turístico|Wir machen eine Rundreise.|Hacemos un circuito turístico.
die Halbpension|la media pensión|Die Halbpension kostet extra.|La media pensión cuesta extra.
die Hauptsaison|la temporada alta|In der Hauptsaison ist alles teuer.|En temporada alta todo es caro.
der Hammer|el martillo|Der Hammer liegt im Werkzeugkasten.|El martillo está en la caja de herramientas.
der Nagel|el clavo|Der Nagel ist zu kurz.|El clavo es demasiado corto.
die Schraube|el tornillo|Die Schraube ist locker.|El tornillo está flojo.
die Bohrmaschine|el taladro|Die Bohrmaschine ist laut.|El taladro es ruidoso.
die Leiter|la escalera (portátil)|Die Leiter steht an der Wand.|La escalera está apoyada en la pared.
der Pinsel|el pincel|Der Pinsel ist nass.|El pincel está mojado.
die Tapete|el papel pintado|Die Tapete löst sich.|El papel pintado se despega.
die Fliese|la baldosa|Die Fliesen sind im Bad.|Las baldosas están en el baño.
der Wasserschaden|el daño por agua|Der Wasserschaden ist groß.|El daño por agua es grande.
der Heizkörper|el radiador|Der Heizkörper ist kalt.|El radiador está frío.
das Schloss|la cerradura / el castillo|Das Schloss ist kaputt.|La cerradura está rota.
die Tastatur|el teclado|Die Tastatur ist neu.|El teclado es nuevo.
das WLAN|el wifi|Das WLAN funktioniert nicht.|El wifi no funciona.
das Ladegerät|el cargador|Ich habe mein Ladegerät vergessen.|Me olvidé el cargador.
der Speicher|la memoria / el almacenamiento|Der Speicher ist voll.|La memoria está llena.
das Training|el entrenamiento|Das Training beginnt um sechs.|El entrenamiento empieza a las seis.
der Sportler|el deportista|Der Sportler ist verletzt.|El deportista está lesionado.
das Tor|el gol / el portón|Das Tor fiel in der letzten Minute.|El gol cayó en el último minuto.
der Ball|la pelota|Der Ball ist rund.|La pelota es redonda.
die Vorspeise|la entrada (comida)|Als Vorspeise gibt es Suppe.|De entrada hay sopa.
die Hauptspeise|el plato principal|Die Hauptspeise ist Fisch.|El plato principal es pescado.
der Nachtisch|el postre|Der Nachtisch ist lecker.|El postre está rico.
die Soße|la salsa|Die Soße ist scharf.|La salsa es picante.
die Beilage|la guarnición|Als Beilage gibt es Reis.|De guarnición hay arroz.
schneiden|cortar|Wir müssen das Gemüse schneiden.|Tenemos que cortar la verdura.
schälen|pelar|Wir müssen die Kartoffeln schälen.|Tenemos que pelar las papas.
rühren|revolver|Wir müssen die Soße rühren.|Tenemos que revolver la salsa.
mischen|mezclar|Wir wollen alles mischen.|Queremos mezclarlo todo.
würzen|condimentar|Wir müssen die Suppe würzen.|Tenemos que condimentar la sopa.
grillen|hacer a la parrilla|Wir wollen am Sonntag grillen.|Queremos hacer parrilla el domingo.
abschmecken|probar y ajustar el sabor|Wir müssen die Suppe abschmecken.|Tenemos que probar y ajustar la sopa.
die Abweichung|la desviación|Die Abweichung ist klein.|La desviación es chica.
die Annäherung|el acercamiento|Die Annäherung ist schwierig.|El acercamiento es difícil.
die Anpassung|la adaptación|Die Anpassung dauert lange.|La adaptación lleva tiempo.
die Anschauung|la concepción / la visión|Das ist seine Anschauung.|Esa es su visión.
der Ansatz|el enfoque|Der Ansatz ist neu.|El enfoque es nuevo.
die Anspannung|la tensión|Die Anspannung ist groß.|La tensión es grande.
der Aufwand|el esfuerzo / el costo|Der Aufwand ist hoch.|El esfuerzo es alto.
die Ausdauer|la resistencia / la perseverancia|Dafür braucht man Ausdauer.|Para eso se necesita perseverancia.
die Auseinandersetzung|la discusión / el enfrentamiento|Es gab eine heftige Auseinandersetzung.|Hubo un fuerte enfrentamiento.
die Auslegung|la interpretación|Die Auslegung ist umstritten.|La interpretación es polémica.
die Bandbreite|la gama|Die Bandbreite ist groß.|La gama es amplia.
die Beharrlichkeit|la tenacidad|Beharrlichkeit zahlt sich aus.|La tenacidad rinde.
die Berufung|la vocación / la apelación|Er hat Berufung eingelegt.|Presentó una apelación.
das Bewusstsein|la conciencia|Das Bewusstsein wächst.|La conciencia crece.
die Bindung|el vínculo|Die Bindung ist stark.|El vínculo es fuerte.
die Einsicht|el entendimiento / la comprensión|Er zeigt wenig Einsicht.|Muestra poca comprensión.
die Empörung|la indignación|Die Empörung ist groß.|La indignación es grande.
die Enttäuschung|la decepción|Die Enttäuschung war riesig.|La decepción fue enorme.
die Entfaltung|el desarrollo (pleno)|Die Entfaltung braucht Freiheit.|El desarrollo pleno necesita libertad.
der Ernst|la seriedad|Der Ernst der Lage ist klar.|La seriedad de la situación es clara.
die Erleichterung|el alivio|Die Erleichterung war groß.|El alivio fue grande.
die Fehleinschätzung|el error de cálculo|Das war eine Fehleinschätzung.|Fue un error de cálculo.
die Fürsorge|el cuidado / la asistencia|Die Fürsorge ist wichtig.|El cuidado es importante.
das Gewissen|la conciencia (moral)|Er hat ein schlechtes Gewissen.|Tiene cargo de conciencia.
der Grundsatz|el principio|Das ist mein Grundsatz.|Ese es mi principio.
die Hemmung|la inhibición|Er hat keine Hemmungen.|No tiene inhibiciones.
der Hintergedanke|la segunda intención|Er hat keine Hintergedanken.|No tiene segundas intenciones.
die Hingabe|la entrega / la dedicación|Sie arbeitet mit Hingabe.|Trabaja con entrega.
die Kehrseite|la otra cara|Das ist die Kehrseite.|Esa es la otra cara.
das Konzept|el concepto / el plan|Das Konzept überzeugt mich.|El concepto me convence.
die Leidenschaft|la pasión|Er spielt mit Leidenschaft.|Juega con pasión.
die Lebensweise|el estilo de vida|Die Lebensweise ändert sich.|El estilo de vida cambia.
die Macht|el poder|Die Macht liegt bei den Bürgern.|El poder está en los ciudadanos.
die Mentalität|la mentalidad|Die Mentalität ist anders.|La mentalidad es distinta.
der Misserfolg|el fracaso|Der Misserfolg war schmerzhaft.|El fracaso fue doloroso.
die Mühe|el esfuerzo / la molestia|Das war viel Mühe.|Fue mucho esfuerzo.
die Rücksicht|la consideración|Wir nehmen Rücksicht auf die Nachbarn.|Tenemos consideración con los vecinos.
die Schuld|la culpa / la deuda|Die Schuld liegt bei mir.|La culpa es mía.
der Sinn|el sentido|Das hat keinen Sinn.|Eso no tiene sentido.
die Spannung|la tensión / el suspenso|Die Spannung steigt.|La tensión sube.
der Spielraum|el margen|Wir haben wenig Spielraum.|Tenemos poco margen.
die Unabhängigkeit|la independencia|Die Unabhängigkeit ist wichtig.|La independencia es importante.
die Unsicherheit|la inseguridad|Die Unsicherheit wächst.|La inseguridad crece.
die Vernunft|la razón / el sentido común|Seine Vernunft siegt.|Su razón se impone.
das Verständnis|la comprensión|Ich habe volles Verständnis.|Tengo plena comprensión.
die Verwirrung|la confusión|Die Verwirrung ist groß.|La confusión es grande.
die Vorliebe|la preferencia|Sie hat eine Vorliebe für Krimis.|Tiene preferencia por los policiales.
der Vorwurf|el reproche|Der Vorwurf ist unfair.|El reproche es injusto.
die Wertschätzung|el aprecio|Wertschätzung ist wichtig.|El aprecio es importante.
der Wille|la voluntad|Der Wille ist da.|La voluntad está.
die Zielgruppe|el público objetivo|Die Zielgruppe ist jung.|El público objetivo es joven.
das Zugeständnis|la concesión|Wir machen ein Zugeständnis.|Hacemos una concesión.
die Zumutung|el abuso / la exageración|Das ist eine Zumutung.|Eso es un abuso.
die Zuversicht|la confianza (en el futuro)|Ich habe Zuversicht.|Tengo confianza.
abweichend|divergente|Er hat eine abweichende Meinung.|Tiene una opinión divergente.
anschaulich|ilustrativo|Das Beispiel ist anschaulich.|El ejemplo es ilustrativo.
ausgewogen|equilibrado|Die Ernährung ist ausgewogen.|La alimentación es equilibrada.
begehrt|codiciado|Die Stelle ist begehrt.|El puesto es codiciado.
beharrlich|tenaz|Er arbeitet beharrlich.|Trabaja con tenacidad.
beschwerlich|penoso|Der Weg ist beschwerlich.|El camino es penoso.
bodenständig|con los pies en la tierra|Er ist sehr bodenständig.|Es muy terrenal.
dürftig|escaso / pobre|Die Auswahl ist dürftig.|La selección es pobre.
eigenartig|extraño|Das ist eigenartig.|Eso es extraño.
eigenständig|independiente|Sie arbeitet eigenständig.|Trabaja de forma independiente.
eilig|apurado|Ich habe es eilig.|Estoy apurado.
eintönig|monótono|Die Arbeit ist eintönig.|El trabajo es monótono.
empfehlenswert|recomendable|Das Buch ist empfehlenswert.|El libro es recomendable.
enorm|enorme|Der Aufwand ist enorm.|El esfuerzo es enorme.
entspannt|relajado|Ich bin heute sehr entspannt.|Hoy estoy muy relajado.
erfreulich|alentador|Das ist erfreulich.|Eso es alentador.
ernsthaft|serio / en serio|Er denkt ernsthaft darüber nach.|Lo piensa en serio.
fahrlässig|negligente|Das war fahrlässig.|Eso fue negligente.
flüchtig|fugaz / superficial|Ich habe den Text nur flüchtig gelesen.|Leí el texto solo por encima.
förderlich|beneficioso|Das ist der Gesundheit förderlich.|Eso es beneficioso para la salud.
geistig|mental / intelectual|Geistige Arbeit ist anstrengend.|El trabajo intelectual es agotador.
gelungen|logrado|Das Fest war gelungen.|La fiesta salió bien.
geräumig|espacioso|Die Wohnung ist sehr geräumig.|El departamento es muy espacioso.
geschickt|hábil|Er ist sehr geschickt.|Es muy hábil.
gewagt|arriesgado|Das ist ein gewagter Plan.|Es un plan arriesgado.
gründlich|minucioso|Er arbeitet sehr gründlich.|Trabaja con mucha minuciosidad.
hektisch|agitado|Der Tag war hektisch.|El día fue agitado.
hinderlich|que estorba|Das ist hinderlich.|Eso estorba.
intensiv|intenso|Wir lernen intensiv.|Estudiamos de forma intensa.
kostspielig|costoso|Das Hobby ist kostspielig.|El pasatiempo es costoso.
lästig|molesto|Das ist wirklich lästig.|Eso es realmente molesto.
locker|relajado / flojo|Die Stimmung ist locker.|El ambiente es relajado.
lohnenswert|que vale la pena|Der Besuch ist lohnenswert.|La visita vale la pena.
mangelhaft|deficiente|Die Qualität ist mangelhaft.|La calidad es deficiente.
mühelos|sin esfuerzo|Er löst das mühelos.|Lo resuelve sin esfuerzo.
nachlässig|descuidado|Er arbeitet nachlässig.|Trabaja con descuido.
nachteilig|desventajoso|Das ist nachteilig.|Eso es desventajoso.
naiv|ingenuo|Das ist naiv.|Eso es ingenuo.
nebensächlich|secundario|Das ist nebensächlich.|Eso es secundario.
nutzlos|inútil|Das ist nutzlos.|Eso es inútil.
oberflächlich|superficial|Die Diskussion war oberflächlich.|La discusión fue superficial.
plausibel|plausible|Die Erklärung ist plausibel.|La explicación es plausible.
prächtig|espléndido|Das Wetter ist prächtig.|El clima es espléndido.
provisorisch|provisorio|Das ist nur provisorisch.|Eso es solo provisorio.
rücksichtslos|sin consideración|Er fährt rücksichtslos.|Maneja sin consideración.
rücksichtsvoll|considerado|Sie ist sehr rücksichtsvoll.|Es muy considerada.
sachkundig|competente|Sie ist sehr sachkundig.|Es muy competente.
schlagfertig|rápido de respuesta|Er ist sehr schlagfertig.|Tiene respuesta rápida.
schleppend|lento / pesado|Das Verfahren verläuft schleppend.|El trámite avanza con lentitud.
schlicht|sencillo|Das Zimmer ist schlicht.|La habitación es sencilla.
selbstlos|desinteresado|Sie hilft selbstlos.|Ayuda de forma desinteresada.
sinnlos|sin sentido|Das ist sinnlos.|Eso no tiene sentido.
spärlich|escaso|Das Licht ist spärlich.|La luz es escasa.
standhaft|firme|Er bleibt standhaft.|Se mantiene firme.
tadellos|impecable|Seine Arbeit ist tadellos.|Su trabajo es impecable.
tatkräftig|enérgico / activo|Sie hilft tatkräftig.|Ayuda con energía.
träge|perezoso / lento|Das Auto ist träge.|El auto es lento.
trügerisch|engañoso|Der Schein ist trügerisch.|La apariencia es engañosa.
übertrieben|exagerado|Das ist übertrieben.|Eso es exagerado.
umständlich|engorroso|Das Verfahren ist umständlich.|El trámite es engorroso.
unauffällig|discreto|Er ist sehr unauffällig.|Es muy discreto.
unentbehrlich|imprescindible|Das ist unentbehrlich.|Eso es imprescindible.
unerträglich|insoportable|Die Hitze ist unerträglich.|El calor es insoportable.
ungeduldig|impaciente|Er ist sehr ungeduldig.|Es muy impaciente.
unhöflich|descortés|Das war unhöflich.|Eso fue descortés.
unverständlich|incomprensible|Das ist unverständlich.|Eso es incomprensible.
unvorstellbar|inimaginable|Das ist unvorstellbar.|Eso es inimaginable.
verantwortungslos|irresponsable|Das ist verantwortungslos.|Eso es irresponsable.
verblüffend|sorprendente|Das Ergebnis ist verblüffend.|El resultado es sorprendente.
verfügbar|disponible|Das Zimmer ist nicht verfügbar.|La habitación no está disponible.
verheerend|devastador|Die Folgen waren verheerend.|Las consecuencias fueron devastadoras.
verlockend|tentador|Das Angebot ist verlockend.|La oferta es tentadora.
verständnisvoll|comprensivo|Sie ist sehr verständnisvoll.|Es muy comprensiva.
verwandt|emparentado|Wir sind miteinander verwandt.|Somos parientes.
voreingenommen|prejuiciado|Er ist voreingenommen.|Está prejuiciado.
vorsätzlich|premeditado|Das war vorsätzlich.|Eso fue premeditado.
waghalsig|temerario|Das war waghalsig.|Eso fue temerario.
weitreichend|de gran alcance|Die Folgen sind weitreichend.|Las consecuencias son de gran alcance.
wirksam|eficaz|Das Mittel ist wirksam.|El remedio es eficaz.
wohlhabend|adinerado|Die Familie ist wohlhabend.|La familia es adinerada.
zäh|duro / tenaz|Das Fleisch ist zäh.|La carne está dura.
zerstreut|distraído|Er ist heute sehr zerstreut.|Hoy está muy distraído.
zielstrebig|decidido / con rumbo|Sie arbeitet zielstrebig.|Trabaja con determinación.
zügig|rápido|Wir arbeiten zügig.|Trabajamos con rapidez.
zurückhaltend|reservado|Er ist sehr zurückhaltend.|Es muy reservado.
glücklicherweise|por suerte|Glücklicherweise ist nichts passiert.|Por suerte no pasó nada.
abfangen|interceptar / amortiguar|Wir wollen den Brief abfangen.|Queremos interceptar la carta.
abhalten|disuadir / celebrar|Nichts kann mich davon abhalten.|Nada me puede disuadir de eso.
abkürzen|abreviar / acortar|Wir können den Weg abkürzen.|Podemos acortar el camino.
ablegen|dejar / rendir (un examen)|Wir müssen die Prüfung ablegen.|Tenemos que rendir el examen.
abwarten|esperar y ver|Wir sollten erst abwarten.|Primero deberíamos esperar y ver.
abwenden|evitar / apartar|Wir wollen den Schaden abwenden.|Queremos evitar el daño.
anfassen|tocar|Man darf das nicht anfassen.|Eso no se debe tocar.
anfertigen|elaborar / confeccionar|Wir wollen eine Kopie anfertigen.|Queremos hacer una copia.
angehen|concernir / encarar|Das soll uns nichts angehen.|Eso no nos tiene que concernir.
angehören|pertenecer|Wir wollen dem Team angehören.|Queremos pertenecer al equipo.
angleichen|igualar|Man will die Löhne angleichen.|Quieren igualar los sueldos.
ankurbeln|reactivar|Man will die Wirtschaft ankurbeln.|Quieren reactivar la economía.
anlocken|atraer|Das kann viele Touristen anlocken.|Eso puede atraer a muchos turistas.
anordnen|ordenar / disponer|Man will eine Prüfung anordnen.|Quieren disponer una revisión.
anpacken|encarar / agarrar|Wir müssen das Problem anpacken.|Tenemos que encarar el problema.
anrechnen|computar / acreditar|Man kann die Zeit anrechnen.|Se puede computar el tiempo.
ansammeln|acumular|Sich Schulden ansammeln lassen ist riskant.|Dejar acumular deudas es riesgoso.
anschaffen|adquirir|Wir wollen ein neues Auto anschaffen.|Queremos adquirir un auto nuevo.
ansiedeln|radicar|Man will neue Firmen ansiedeln.|Quieren radicar empresas nuevas.
ansteigen|aumentar|Die Preise können weiter ansteigen.|Los precios pueden seguir aumentando.
anstellen|contratar / poner en marcha|Man will mehr Leute anstellen.|Quieren contratar más gente.
sich anstrengen|esforzarse|Wir müssen uns mehr anstrengen.|Tenemos que esforzarnos más.
anzweifeln|poner en duda|Wir wollen das nicht anzweifeln.|No queremos ponerlo en duda.
aufatmen|respirar aliviado|Wir können jetzt aufatmen.|Ahora podemos respirar aliviados.
aufbrechen|partir / abrir a la fuerza|Wir wollen früh aufbrechen.|Queremos partir temprano.
aufgreifen|retomar|Wir wollen die Idee aufgreifen.|Queremos retomar la idea.
aufhalten|detener / demorar|Nichts kann uns aufhalten.|Nada nos puede detener.
auflösen|disolver / resolver|Man will den Verein auflösen.|Quieren disolver el club.
aufschieben|postergar|Wir dürfen das nicht aufschieben.|No lo podemos postergar.
aufspüren|rastrear|Die Polizei will ihn aufspüren.|La policía lo quiere rastrear.
aufsteigen|ascender / subir|Er kann im Beruf aufsteigen.|Puede ascender en su profesión.
aufwerten|revalorizar|Man will die Gegend aufwerten.|Quieren revalorizar la zona.
ausbessern|reparar (un daño menor)|Wir müssen das Dach ausbessern.|Tenemos que reparar el techo.
ausdehnen|extender|Man will die Zeit ausdehnen.|Quieren extender el tiempo.
ausdenken|imaginar / inventar|Wir müssen uns etwas ausdenken.|Tenemos que inventar algo.
sich auskennen|ser experto / conocer bien|Wir wollen uns hier auskennen.|Queremos conocer bien acá.
auslegen|adelantar (dinero) / interpretar|Ich kann das Geld auslegen.|Yo puedo adelantar la plata.
ausleihen|pedir prestado / prestar|Wir wollen ein Buch ausleihen.|Queremos sacar un libro prestado.
ausrechnen|calcular|Wir müssen das genau ausrechnen.|Tenemos que calcularlo con exactitud.
ausrotten|exterminar|Man darf Tiere nicht ausrotten.|No se debe exterminar animales.
aussortieren|descartar / separar|Wir müssen die Kleider aussortieren.|Tenemos que separar la ropa.
ausstellen|exhibir / emitir|Man will ein Zeugnis ausstellen.|Quieren emitir un certificado.
ausstrahlen|irradiar / transmitir|Man will die Sendung ausstrahlen.|Quieren transmitir el programa.
aussuchen|elegir|Wir können uns etwas aussuchen.|Podemos elegir algo.
auswandern|emigrar|Viele wollen ins Ausland auswandern.|Muchos quieren emigrar al exterior.
auswählen|seleccionar|Wir müssen eins auswählen.|Tenemos que seleccionar uno.
sich auswirken|repercutir|Das kann sich auf alle auswirken.|Eso puede repercutir en todos.
befestigen|fijar|Wir müssen das Regal befestigen.|Tenemos que fijar la estantería.
befreien|liberar|Wir wollen uns davon befreien.|Nos queremos liberar de eso.
befriedigen|satisfacer|Das kann uns nicht befriedigen.|Eso no nos puede satisfacer.
begeistern|entusiasmar|Wir wollen die Leute begeistern.|Queremos entusiasmar a la gente.
sich begnügen|conformarse|Wir wollen uns nicht begnügen.|No nos queremos conformar.
behalten|quedarse con|Wir dürfen das Geschenk behalten.|Podemos quedarnos con el regalo.
beharren|insistir|Wir wollen darauf beharren.|Queremos insistir en eso.
bekanntgeben|dar a conocer|Man will das Ergebnis bekanntgeben.|Quieren dar a conocer el resultado.
beklagen|lamentar|Wir müssen den Verlust beklagen.|Tenemos que lamentar la pérdida.
belegen|comprobar / ocupar|Wir können das belegen.|Lo podemos comprobar.
beleuchten|iluminar / analizar|Wir wollen das Thema beleuchten.|Queremos analizar el tema.
sich benehmen|comportarse|Wir müssen uns gut benehmen.|Tenemos que portarnos bien.
beruhigen|calmar|Wir wollen die Leute beruhigen.|Queremos calmar a la gente.
berühren|tocar / conmover|Das kann mich berühren.|Eso me puede conmover.
beschenken|obsequiar|Wir wollen die Kinder beschenken.|Queremos obsequiar a los chicos.
beschuldigen|acusar|Wir wollen niemanden beschuldigen.|No queremos acusar a nadie.
besorgen|conseguir / comprar|Wir müssen noch Brot besorgen.|Todavía tenemos que conseguir pan.
bestärken|reafirmar|Das kann uns bestärken.|Eso nos puede reafirmar.
bevorzugen|favorecer / preferir|Man darf niemanden bevorzugen.|No se debe favorecer a nadie.
bewerten|evaluar / calificar|Wir müssen die Arbeit bewerten.|Tenemos que evaluar el trabajo.
bewundern|admirar|Wir bewundern seinen Mut.|Admiramos su coraje.
bezeugen|atestiguar|Wir können das bezeugen.|Lo podemos atestiguar.
billigen|aprobar / dar el visto bueno|Man will den Plan billigen.|Quieren dar el visto bueno al plan.
brüllen|rugir / gritar|Man muss nicht brüllen.|No hace falta gritar.
dämpfen|amortiguar|Man will den Lärm dämpfen.|Quieren amortiguar el ruido.
drängen|apremiar|Wir wollen niemanden drängen.|No queremos apremiar a nadie.
dulden|tolerar|Wir können das nicht dulden.|No lo podemos tolerar.
durchhalten|aguantar|Wir müssen noch durchhalten.|Tenemos que aguantar todavía.
durchkommen|pasar / salir adelante|Wir wollen gut durchkommen.|Queremos salir bien adelante.
einbeziehen|incluir|Wir wollen alle einbeziehen.|Queremos incluir a todos.
einfallen|ocurrírsele a uno|Mir kann nichts einfallen.|No se me puede ocurrir nada.
einfügen|insertar|Wir wollen einen Satz einfügen.|Queremos insertar una oración.
einholen|alcanzar / recabar|Wir müssen Informationen einholen.|Tenemos que recabar información.
einlösen|canjear / cumplir|Wir können den Gutschein einlösen.|Podemos canjear el vale.
einnehmen|ocupar / tomar (medicamento)|Man muss die Tabletten einnehmen.|Hay que tomar las pastillas.
einordnen|clasificar|Wir wollen das Ergebnis einordnen.|Queremos ubicar el resultado en contexto.
sich einprägen|memorizar|Wir wollen uns das einprägen.|Queremos memorizar eso.
einreisen|ingresar (a un país)|Wir wollen nach Deutschland einreisen.|Queremos ingresar a Alemania.
einschlafen|dormirse|Ich kann nicht einschlafen.|No me puedo dormir.
einstellen|contratar / suspender|Man will neue Leute einstellen.|Quieren contratar gente nueva.
eintreffen|llegar|Der Zug soll um acht eintreffen.|El tren tiene que llegar a las ocho.
eintreten|entrar / ocurrir|Das kann jederzeit eintreten.|Eso puede ocurrir en cualquier momento.
empfinden|sentir|Wir empfinden große Freude.|Sentimos mucha alegría.
enden|terminar|Das Fest soll um zehn enden.|La fiesta tiene que terminar a las diez.
entbehren|prescindir de|Wir wollen nichts entbehren.|No queremos prescindir de nada.
entgegnen|replicar|Wir möchten darauf entgegnen.|Quisiéramos replicar a eso.
entgehen|escaparse / perderse|Wir wollen uns nichts entgehen lassen.|No nos queremos perder nada.
entmutigen|desalentar|Wir wollen niemanden entmutigen.|No queremos desalentar a nadie.
entspannen|relajarse|Wir wollen uns entspannen.|Queremos relajarnos.
entwerfen|diseñar|Wir wollen ein Haus entwerfen.|Queremos diseñar una casa.
entziehen|quitar / sustraer|Man will ihm die Erlaubnis entziehen.|Le quieren quitar el permiso.
erben|heredar|Wir wollen das Haus erben.|Vamos a heredar la casa.
erhoffen|esperar (con ilusión)|Wir erhoffen uns viel davon.|Esperamos mucho de eso.
erkunden|explorar|Wir wollen die Stadt erkunden.|Queremos explorar la ciudad.
erleichtern|facilitar / aliviar|Das kann uns die Arbeit erleichtern.|Eso nos puede facilitar el trabajo.
erleiden|sufrir|Wir wollen keinen Schaden erleiden.|No queremos sufrir daños.
erschaffen|crear|Wir wollen etwas Neues erschaffen.|Queremos crear algo nuevo.
erschöpfen|agotar|Die Arbeit kann uns erschöpfen.|El trabajo nos puede agotar.
erschüttern|conmocionar|Die Nachricht kann uns erschüttern.|La noticia nos puede conmocionar.
ertragen|soportar|Wir können das nicht ertragen.|No lo podemos soportar.
erwachen|despertar|Wir wollen aus dem Traum erwachen.|Queremos despertar del sueño.
erwärmen|calentar|Wir müssen das Essen erwärmen.|Tenemos que calentar la comida.
erziehen|criar / educar|Wir wollen Kinder gut erziehen.|Queremos criar bien a los chicos.
erzwingen|forzar|Man kann nichts erzwingen.|No se puede forzar nada.
fesseln|cautivar / atar|Das Buch kann uns fesseln.|El libro nos puede cautivar.
fortbestehen|seguir existiendo|Die Firma soll fortbestehen.|La empresa tiene que seguir existiendo.
fortschreiten|avanzar|Die Arbeit soll fortschreiten.|El trabajo tiene que avanzar.
füllen|llenar|Wir müssen das Glas füllen.|Tenemos que llenar el vaso.
gedenken|recordar / conmemorar|Wir wollen der Opfer gedenken.|Queremos recordar a las víctimas.
gehorchen|obedecer|Die Kinder müssen gehorchen.|Los chicos tienen que obedecer.
gelangen|llegar / alcanzar|Wir wollen an das Ziel gelangen.|Queremos llegar a la meta.
genehmigen|autorizar|Man muss den Plan genehmigen.|Hay que autorizar el plan.
genügen|bastar|Das muss genügen.|Eso tiene que bastar.
glänzen|brillar|Der Stein kann glänzen.|La piedra puede brillar.
gönnen|conceder / desear algo bueno|Wir wollen dir das gönnen.|Te lo queremos conceder.
greifen|agarrar|Wir müssen schnell greifen.|Tenemos que agarrar rápido.
die Absage|la cancelación / el rechazo|Die Absage kam gestern.|La cancelación llegó ayer.
die Abwechslung|la variedad / el cambio|Wir brauchen Abwechslung.|Necesitamos variedad.
der Abschnitt|el tramo / el apartado|Der Abschnitt ist kurz.|El apartado es corto.
die Altstadt|el casco antiguo|Die Altstadt ist wunderschön.|El casco antiguo es hermosísimo.
die Anlage|la instalación / el complejo|Die Anlage ist sehr groß.|La instalación es muy grande.
die Anmeldung|la inscripción|Die Anmeldung läuft online.|La inscripción es en línea.
die Anreise|la llegada (viaje)|Die Anreise dauert zwei Tage.|El viaje de llegada dura dos días.
die Anstrengung|el esfuerzo|Die Anstrengung hat sich gelohnt.|El esfuerzo valió la pena.
die Anwendung|la aplicación|Die Anwendung ist einfach.|La aplicación es simple.
das Anliegen|la petición|Wir haben ein Anliegen.|Tenemos una petición.
der Apparat|el aparato|Der Apparat ist kaputt.|El aparato está roto.
die Arbeitsbedingungen|las condiciones laborales|Die Arbeitsbedingungen sind gut.|Las condiciones laborales son buenas.
das Arbeitsklima|el clima laboral|Das Arbeitsklima ist angenehm.|El clima laboral es agradable.
die Aufnahme|la grabación / la admisión|Die Aufnahme dauert zwei Stunden.|La grabación dura dos horas.
die Aufsicht|la supervisión|Die Aufsicht übernimmt der Lehrer.|La supervisión la asume el docente.
der Auftritt|la presentación / la actuación|Der Auftritt war großartig.|La actuación fue magnífica.
der Ausblick|la vista / la perspectiva|Der Ausblick ist traumhaft.|La vista es de ensueño.
der Ausgangspunkt|el punto de partida|Das ist der Ausgangspunkt.|Ese es el punto de partida.
die Auskunft|la información (dada)|Die Auskunft war falsch.|La información fue incorrecta.
das Ausmaß|la magnitud|Das Ausmaß ist noch unklar.|La magnitud todavía no está clara.
die Ausrede|la excusa|Das ist nur eine Ausrede.|Eso es solo una excusa.
die Aussicht|la perspectiva / la vista|Die Aussichten sind gut.|Las perspectivas son buenas.
der Austausch|el intercambio|Der Austausch ist wichtig.|El intercambio es importante.
die Bedienung|el servicio / el manejo|Die Bedienung ist freundlich.|El servicio es amable.
die Begegnung|el encuentro|Die Begegnung war kurz.|El encuentro fue corto.
der Beginn|el comienzo|Der Beginn ist um acht.|El comienzo es a las ocho.
die Begleitung|el acompañamiento|Ich komme in Begleitung.|Voy acompañado.
die Begründung|la fundamentación|Die Begründung fehlt.|Falta la fundamentación.
die Beobachtung|la observación|Die Beobachtung ist interessant.|La observación es interesante.
der Berater|el asesor|Der Berater hilft uns.|El asesor nos ayuda.
die Beratung|el asesoramiento|Die Beratung ist kostenlos.|El asesoramiento es gratis.
die Bereitschaft|la disposición|Die Bereitschaft ist da.|La disposición está.
die Berufserfahrung|la experiencia laboral|Er hat viel Berufserfahrung.|Tiene mucha experiencia laboral.
die Beschäftigung|la ocupación|Die Beschäftigung gefällt mir.|La ocupación me gusta.
die Beschreibung|la descripción|Die Beschreibung ist genau.|La descripción es exacta.
der Besitz|la propiedad|Das Haus ist in meinem Besitz.|La casa es de mi propiedad.
der Besitzer|el dueño|Der Besitzer wohnt nebenan.|El dueño vive al lado.
die Besserung|la mejoría|Gute Besserung!|¡Que te mejores!
die Bestätigung|la confirmación|Die Bestätigung kommt per Mail.|La confirmación llega por mail.
die Betreuung|la atención / el cuidado|Die Betreuung ist gut.|La atención es buena.
der Bewerber|el postulante|Der Bewerber ist pünktlich.|El postulante es puntual.
der Bezug|la referencia / la relación|Ich nehme Bezug auf Ihren Brief.|Me remito a su carta.
der Blickwinkel|el ángulo / el punto de vista|Das ist ein neuer Blickwinkel.|Es un ángulo nuevo.
die Broschüre|el folleto|Die Broschüre ist kostenlos.|El folleto es gratis.
der Bruch|la ruptura / la fractura|Der Bruch ist verheilt.|La fractura sanó.
der Dank|el agradecimiento|Vielen Dank für alles.|Muchas gracias por todo.
die Darstellung|la presentación / el relato|Die Darstellung ist klar.|La exposición es clara.
die Dauer|la duración|Die Dauer beträgt zwei Stunden.|La duración es de dos horas.
der Defekt|la falla|Der Defekt ist klein.|La falla es chica.
die Dienstleistung|el servicio (prestación)|Die Dienstleistung ist teuer.|El servicio es caro.
die Disziplin|la disciplina|Dafür braucht man Disziplin.|Para eso se necesita disciplina.
die Dokumentation|la documentación|Die Dokumentation ist vollständig.|La documentación está completa.
das Eigentum|la propiedad (bien)|Das ist mein Eigentum.|Es de mi propiedad.
die Eile|la prisa|Ich habe keine Eile.|No tengo apuro.
die Einführung|la introducción|Die Einführung ist kurz.|La introducción es corta.
die Einheit|la unidad|Die Einheit ist wichtig.|La unidad es importante.
die Einigung|el acuerdo|Die Einigung kam spät.|El acuerdo llegó tarde.
die Einkünfte|los ingresos|Die Einkünfte sind niedrig.|Los ingresos son bajos.
das Einverständnis|el consentimiento|Ich brauche dein Einverständnis.|Necesito tu consentimiento.
die Einzelheit|el detalle|Die Einzelheiten sind noch offen.|Los detalles todavía están abiertos.
der Empfang|la recepción / la bienvenida|Der Empfang war herzlich.|La bienvenida fue cálida.
der Empfänger|el destinatario|Der Empfänger ist unbekannt.|El destinatario es desconocido.
die Enge|la estrechez|Die Enge stört mich.|La estrechez me molesta.
die Entlassung|el despido|Die Entlassung kam plötzlich.|El despido llegó de golpe.
die Entstehung|el surgimiento / el origen|Die Entstehung ist unklar.|El origen no está claro.
die Erfüllung|el cumplimiento|Die Erfüllung ist wichtig.|El cumplimiento es importante.
die Erkrankung|la enfermedad|Die Erkrankung ist selten.|La enfermedad es rara.
die Ermäßigung|el descuento / la tarifa reducida|Es gibt eine Ermäßigung für Studenten.|Hay una tarifa reducida para estudiantes.
die Eröffnung|la inauguración|Die Eröffnung ist am Samstag.|La inauguración es el sábado.
die Erwähnung|la mención|Die Erwähnung war kurz.|La mención fue breve.
die Existenz|la existencia|Seine Existenz ist gesichert.|Su sustento está asegurado.
der Fachbegriff|el término técnico|Der Fachbegriff ist schwer.|El término técnico es difícil.
die Fachrichtung|la especialidad|Meine Fachrichtung ist Physik.|Mi especialidad es la física.
die Fahrerlaubnis|el permiso de conducir|Er hat keine Fahrerlaubnis.|No tiene permiso de conducir.
der Fehlbetrag|el faltante|Der Fehlbetrag ist hoch.|El faltante es alto.
die Festigkeit|la firmeza|Die Festigkeit ist gut.|La firmeza es buena.
die Feststellung|la constatación|Die Feststellung ist wichtig.|La constatación es importante.
die Flexibilität|la flexibilidad|Flexibilität ist gefragt.|Se pide flexibilidad.
die Folgerung|la deducción|Die Folgerung ist logisch.|La deducción es lógica.
die Fortbildung|la capacitación continua|Die Fortbildung dauert drei Tage.|La capacitación dura tres días.
der Fortgang|el progreso|Der Fortgang ist gut.|El progreso es bueno.
die Freigabe|la autorización|Die Freigabe fehlt noch.|Todavía falta la autorización.
die Freundschaft|la amistad|Die Freundschaft ist wichtig.|La amistad es importante.
der Fuhrpark|la flota de vehículos|Der Fuhrpark ist alt.|La flota es vieja.
der Gebrauch|el uso|Der Gebrauch ist einfach.|El uso es simple.
die Gefälligkeit|el favor|Das ist nur eine Gefälligkeit.|Eso es solo un favor.
das Gehör|el oído|Sein Gehör ist sehr gut.|Su oído es muy bueno.
die Genauigkeit|la exactitud|Die Genauigkeit ist wichtig.|La exactitud es importante.
die Gesamtheit|la totalidad|Die Gesamtheit der Mitarbeiter ist da.|Están todos los empleados.
der Gesichtspunkt|el aspecto / el punto de vista|Das ist ein wichtiger Gesichtspunkt.|Es un aspecto importante.
die Gestaltung|el diseño|Die Gestaltung ist modern.|El diseño es moderno.
der Gewinner|el ganador|Der Gewinner bekommt einen Preis.|El ganador recibe un premio.
die Gewissheit|la certeza|Ich habe keine Gewissheit.|No tengo certeza.
der Glaube|la fe / la creencia|Der Glaube gibt ihm Halt.|La fe le da apoyo.
die Gleichgültigkeit|la indiferencia|Die Gleichgültigkeit ärgert mich.|La indiferencia me enoja.
der Großteil|la mayor parte|Der Großteil ist fertig.|La mayor parte está lista.
die Gunst|el favor|Er hat ihre Gunst gewonnen.|Se ganó su favor.
das Gutachten|el dictamen|Das Gutachten ist positiv.|El dictamen es positivo.
anwesend|presente|Alle sind anwesend.|Todos están presentes.
abwesend|ausente|Er ist heute abwesend.|Hoy está ausente.
beständig|constante|Das Wetter ist beständig.|El clima es estable.
beteiligt|involucrado|Wir sind alle beteiligt.|Estamos todos involucrados.
bewundernswert|admirable|Das ist bewundernswert.|Eso es admirable.
bündig|conciso|Die Antwort ist kurz und bündig.|La respuesta es breve y concisa.
dankbar|agradecido|Ich bin Ihnen dankbar.|Le estoy agradecido.
dauernd|constante / siempre|Er ruft dauernd an.|Llama todo el tiempo.
derzeitig|actual|Die derzeitige Lage ist unklar.|La situación actual no está clara.
dünn besiedelt|poco poblado|Die Gegend ist dünn besiedelt.|La zona está poco poblada.
ehrenamtlich|voluntario|Sie arbeitet ehrenamtlich.|Trabaja como voluntaria.
eigenmächtig|por cuenta propia|Er handelt eigenmächtig.|Actúa por cuenta propia.
einheitlich|uniforme|Die Regeln sind einheitlich.|Las reglas son uniformes.
einmalig|único|Das Angebot ist einmalig.|La oferta es única.
einseitig|unilateral / parcial|Die Berichterstattung ist einseitig.|La cobertura es parcial.
einstimmig|por unanimidad|Der Beschluss war einstimmig.|La resolución fue unánime.
empört|indignado|Alle waren empört.|Todos estaban indignados.
entschlossen|decidido|Sie ist entschlossen.|Está decidida.
erforderlich|requerido|Das ist erforderlich.|Eso es requerido.
erschwinglich|accesible (precio)|Der Preis ist erschwinglich.|El precio es accesible.
fälschlicherweise|erróneamente|Er wurde fälschlicherweise beschuldigt.|Fue acusado erróneamente.
fehlerfrei|sin errores|Der Text ist fehlerfrei.|El texto no tiene errores.
folglich|en consecuencia|Folglich müssen wir warten.|En consecuencia tenemos que esperar.
fraglich|dudoso|Das ist fraglich.|Eso es dudoso.
fristgerecht|dentro del plazo|Wir liefern fristgerecht.|Entregamos dentro del plazo.
gebührenfrei|sin cargo|Die Beratung ist gebührenfrei.|El asesoramiento es sin cargo.
gebräuchlich|usual|Das Wort ist gebräuchlich.|La palabra es de uso común.
gefährdet|en peligro|Die Art ist gefährdet.|La especie está en peligro.
gegensätzlich|opuesto|Die Meinungen sind gegensätzlich.|Las opiniones son opuestas.
gegenseitig|mutuo|Wir helfen uns gegenseitig.|Nos ayudamos mutuamente.
geheim|secreto|Das ist geheim.|Eso es secreto.
gelegentlich|ocasional|Er kommt gelegentlich vorbei.|Pasa ocasionalmente.
gemäßigt|moderado|Das Klima ist gemäßigt.|El clima es templado.
genügend|suficiente|Wir haben genügend Zeit.|Tenemos tiempo suficiente.
geringfügig|insignificante|Der Unterschied ist geringfügig.|La diferencia es insignificante.
gesellschaftlich|social|Das ist ein gesellschaftliches Problem.|Es un problema social.
gewaltsam|violento|Der Konflikt wurde gewaltsam beendet.|El conflicto terminó con violencia.
gleichgültig|indiferente|Das ist mir nicht gleichgültig.|Eso no me es indiferente.
gleichzeitig|simultáneo|Wir kommen gleichzeitig an.|Llegamos al mismo tiempo.
`;

export type CoreLevel = "A1" | "A2" | "B1" | "B2";

/** Palabras del entrenador, en orden de estudio. `unitId: "core"` las distingue de las del currículo; `level` es el nivel al que cuentan. */
export const CORE_VOCAB: (Vocab & { unitId: string; level: CoreLevel })[] = (() => {
  let level: CoreLevel = "A1";
  const out: (Vocab & { unitId: string; level: CoreLevel })[] = [];
  for (const line of RAW.trim().split("\n")) {
    if (line.startsWith("## ")) { level = line.slice(3).trim() as CoreLevel; continue; }
    const [de, es, exDe, exEs] = line.split("|").map((x) => x.trim());
    out.push({ de, es, example: { de: exDe, es: exEs }, unitId: "core", level });
  }
  return out;
})();
