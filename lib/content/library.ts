// Biblioteca de lecturas: textos graduados, independientes del currículo, con traducción y preguntas.
// Para sumar un texto, agregá una entrada con un id nuevo; la prueba valida el formato.

import type { Reading, ListenQuestion } from "../curriculum.ts";

export type LibraryLevel = "A2" | "B1" | "B2";
export type LibraryText = { id: string; level: LibraryLevel; emoji: string; topic: string; reading: Reading };

const c = (q: string, options: string[], why: string): ListenQuestion => ({ type: "choice", q, options, answer: options[0], why });
const tf = (q: string, answer: boolean, why: string): ListenQuestion => ({ type: "tf", q, answer, why });
const fi = (q: string, answers: string[], why: string): ListenQuestion => ({ type: "fill", q, answers, hint: "un número", why });

export const LIBRARY: LibraryText[] = [
  {
    id: "wien-tag", level: "A2", emoji: "🚆", topic: "Un día en Viena",
    reading: {
      title: "Ein Tag in Wien",
      text: [
        "Am Samstag fahren wir mit dem Zug nach Wien. Die Fahrt dauert zwei Stunden. Am Bahnhof kaufen wir zwei Fahrkarten für die U-Bahn.",
        "Zuerst besuchen wir ein Museum. Es ist sehr groß, und wir bleiben drei Stunden. Danach essen wir in einem kleinen Café. Ich trinke einen Kaffee und esse ein Stück Kuchen.",
        "Am Abend gehen wir durch den Park. Es ist schön, aber ein bisschen kalt. Um zehn Uhr fahren wir müde nach Hause.",
      ],
      translation: [
        "El sábado vamos en tren a Viena. El viaje dura dos horas. En la estación compramos dos pasajes para el subte.",
        "Primero visitamos un museo. Es muy grande y nos quedamos tres horas. Después comemos en un café chico. Yo tomo un café y como un pedazo de torta.",
        "A la noche caminamos por el parque. Es lindo, pero hace un poco de frío. A las diez volvemos cansados a casa.",
      ],
      questions: [
        fi("¿Cuántas horas dura el viaje en tren?", ["2", "zwei"], "«Die Fahrt dauert zwei Stunden»."),
        c("¿Qué hacen primero en Viena?", ["Visitan un museo", "Comen en un café", "Van al parque", "Compran ropa"], "«Zuerst besuchen wir ein Museum»."),
        c("¿Qué come el narrador en el café?", ["Un pedazo de torta", "Una sopa", "Pizza", "Pan con queso"], "«ein Stück Kuchen»."),
        tf("En el parque hace calor.", false, "«ein bisschen kalt»."),
        fi("¿A qué hora vuelven a casa?", ["10", "zehn", "22"], "«Um zehn Uhr»."),
      ],
    },
  },
  {
    id: "neue-wohnung", level: "A2", emoji: "🏠", topic: "Buscar departamento",
    reading: {
      title: "Eine neue Wohnung",
      text: [
        "Anna sucht seit zwei Monaten eine Wohnung. Sie möchte nicht weit von ihrer Arbeit wohnen, aber die Wohnungen im Zentrum sind sehr teuer.",
        "Gestern hat sie eine Anzeige gelesen: zwei Zimmer, Balkon, sechshundert Euro im Monat. Sie hat sofort angerufen, und heute hat sie die Wohnung gesehen.",
        "Die Wohnung ist hell und ruhig. Aber es gibt keinen Aufzug, und sie liegt im vierten Stock. Anna überlegt noch. Morgen sagt sie dem Vermieter, ob sie die Wohnung nimmt.",
      ],
      translation: [
        "Anna busca departamento hace dos meses. No quiere vivir lejos de su trabajo, pero los departamentos del centro son muy caros.",
        "Ayer leyó un aviso: dos ambientes, balcón, seiscientos euros por mes. Llamó enseguida y hoy vio el departamento.",
        "El departamento es luminoso y tranquilo. Pero no hay ascensor y queda en el cuarto piso. Anna todavía lo piensa. Mañana le dice al dueño si se queda con el departamento.",
      ],
      questions: [
        fi("¿Hace cuántos meses busca Anna departamento?", ["2", "zwei"], "«seit zwei Monaten»."),
        fi("¿Cuántos euros por mes cuesta el departamento?", ["600", "sechshundert"], "«sechshundert Euro im Monat»."),
        fi("¿En qué piso queda?", ["4", "vier", "vierten", "vierte"], "«im vierten Stock»."),
        tf("El departamento tiene balcón.", true, "«Balkon»."),
        c("¿Qué es lo que le molesta a Anna?", ["Que no hay ascensor", "Que es muy oscuro", "Que es ruidoso", "Que es caro"], "«es gibt keinen Aufzug»."),
      ],
    },
  },
  {
    id: "pfand", level: "B1", emoji: "♻️", topic: "El sistema de Pfand",
    reading: {
      title: "Pfand in Deutschland",
      text: [
        "In Deutschland kann man viele Flaschen und Dosen zurückgeben und bekommt dafür Geld. Dieses System heißt Pfand. Für die meisten Einweg-Getränkeflaschen sind es fünfundzwanzig Cent, für Mehrwegflaschen oft weniger.",
        "Wer eine Flasche kauft, zahlt das Pfand mit. Im Supermarkt steht dann ein Automat, in den man die leeren Flaschen steckt. Der Automat druckt einen Bon, mit dem man an der Kasse Geld bekommt oder weniger zahlt.",
        "Viele Menschen sammeln auch Flaschen von anderen auf der Straße, um etwas zu verdienen. Darum stellen manche ihre leeren Flaschen neben den Mülleimer, damit andere sie leichter mitnehmen können.",
        "Das System hilft der Umwelt, denn es wird viel mehr recycelt als in anderen Ländern. Touristen sind oft überrascht, dass eine leere Flasche plötzlich Geld wert ist.",
      ],
      translation: [
        "En Alemania se pueden devolver muchas botellas y latas y a cambio se recibe plata. Ese sistema se llama Pfand. Para la mayoría de las botellas descartables son veinticinco centavos; para las retornables, muchas veces menos.",
        "Quien compra una botella paga también el Pfand. En el supermercado hay un aparato en el que se meten las botellas vacías. El aparato imprime un ticket con el que en la caja se recibe plata o se paga menos.",
        "Mucha gente también junta botellas de otros en la calle para ganar algo. Por eso algunos dejan sus botellas vacías al lado del tacho de basura, para que otros se las lleven más fácil.",
        "El sistema ayuda al medio ambiente, porque se recicla mucho más que en otros países. Los turistas muchas veces se sorprenden de que una botella vacía de repente valga plata.",
      ],
      questions: [
        fi("¿Cuántos centavos se pagan por la mayoría de las botellas descartables?", ["25", "fünfundzwanzig"], "«fünfundzwanzig Cent»."),
        c("¿Qué imprime el aparato del supermercado?", ["Un ticket", "Un recibo de compra", "Una etiqueta", "Un cupón de descuento"], "«druckt einen Bon»."),
        c("¿Por qué algunos dejan las botellas al lado del tacho?", ["Para que otros las junten más fácil", "Porque no quieren reciclar", "Porque no tienen plata", "Porque está prohibido llevarlas"], "«damit andere sie leichter mitnehmen können»."),
        tf("Con el Pfand se recicla menos que en otros países.", false, "«viel mehr recycelt»."),
        c("¿Qué sorprende a los turistas?", ["Que una botella vacía vale plata", "Que no hay botellas", "Que todo es caro", "Que se paga por el agua"], "«eine leere Flasche plötzlich Geld wert ist»."),
      ],
    },
  },
  {
    id: "muenster-rad", level: "B1", emoji: "🚲", topic: "Münster, ciudad de bicicletas",
    reading: {
      title: "Fahrradstadt Münster",
      text: [
        "Münster in Nordrhein-Westfalen gilt als die Fahrradhauptstadt Deutschlands. Man sagt, dass es hier mehr Fahrräder als Einwohner gibt, und viele Leute fahren auch bei Regen mit dem Rad zur Arbeit.",
        "Die Stadt hat ein langes Netz aus Radwegen, und an vielen Kreuzungen haben Radfahrer eine eigene Ampel. Auch am Bahnhof gibt es eine große Station, in der man sein Rad sicher abstellen kann.",
        "Autofahrer finden das nicht immer gut. Sie müssen langsam fahren und oft lange einen Parkplatz suchen. Dafür ist die Luft sauberer, und die Straßen sind leiser.",
        "Viele Besucher leihen sich in Münster ein Fahrrad aus. Nach einem Tag auf dem Rad verstehen sie schnell, warum die Menschen hier das Auto nicht vermissen.",
      ],
      translation: [
        "Münster, en Renania del Norte-Westfalia, es considerada la capital de las bicicletas de Alemania. Se dice que acá hay más bicicletas que habitantes, y mucha gente va al trabajo en bici incluso con lluvia.",
        "La ciudad tiene una larga red de ciclovías y en muchos cruces los ciclistas tienen su propio semáforo. En la estación también hay un gran bicicletero donde se puede dejar la bici de forma segura.",
        "A los automovilistas eso no siempre les gusta. Tienen que manejar despacio y muchas veces buscar mucho tiempo un lugar para estacionar. A cambio, el aire es más limpio y las calles son más silenciosas.",
        "Muchos visitantes alquilan una bicicleta en Münster. Después de un día en bici entienden rápido por qué la gente de acá no extraña el auto.",
      ],
      questions: [
        c("¿Cómo se considera a Münster?", ["La capital de las bicicletas", "La ciudad más grande", "La ciudad más antigua", "La ciudad más verde"], "«Fahrradhauptstadt Deutschlands»."),
        c("¿Qué tienen los ciclistas en muchos cruces?", ["Su propio semáforo", "Un carril de colectivo", "Un puente", "Un túnel"], "«eine eigene Ampel»."),
        c("¿Qué desventaja tienen los automovilistas?", ["Tienen que manejar despacio y buscar estacionamiento", "Pagan más impuestos", "No pueden entrar a la ciudad", "No hay nafta"], "«langsam fahren… lange einen Parkplatz suchen»."),
        tf("Las calles de Münster son más ruidosas que en otras ciudades.", false, "«die Straßen sind leiser»."),
        tf("Los visitantes pueden alquilar bicicletas.", true, "«leihen sich… ein Fahrrad aus»."),
      ],
    },
  },
  {
    id: "homeoffice", level: "B1", emoji: "💻", topic: "Home office: pros y contras",
    reading: {
      title: "Homeoffice: Vor- und Nachteile",
      text: [
        "Seit einigen Jahren arbeiten viele Menschen mindestens ein paar Tage in der Woche zu Hause. Für manche ist das ein großer Vorteil, für andere ein Problem.",
        "Wer zu Hause arbeitet, spart den Weg ins Büro und kann sich die Zeit freier einteilen. Außerdem gibt es weniger Lärm, und man kann zwischendurch die Wäsche waschen oder kochen.",
        "Allerdings fehlt der Kontakt zu den Kollegen. Viele merken auch, dass sie abends nicht mehr abschalten können, weil Arbeit und Privatleben im selben Raum stattfinden.",
        "Deshalb entscheiden sich viele Firmen für ein Modell, bei dem man zum Beispiel drei Tage im Büro und zwei Tage zu Hause arbeitet.",
      ],
      translation: [
        "Desde hace algunos años mucha gente trabaja desde casa al menos unos días por semana. Para algunos es una gran ventaja; para otros, un problema.",
        "Quien trabaja en casa se ahorra el viaje a la oficina y puede organizar el tiempo con más libertad. Además hay menos ruido, y de a ratos se puede lavar la ropa o cocinar.",
        "Eso sí, falta el contacto con los colegas. Muchos notan también que a la noche no pueden desconectarse, porque el trabajo y la vida privada ocurren en el mismo lugar.",
        "Por eso muchas empresas eligen un modelo en el que, por ejemplo, se trabaja tres días en la oficina y dos en casa.",
      ],
      questions: [
        c("¿Qué se ahorra quien trabaja en casa?", ["El viaje a la oficina", "El alquiler", "El almuerzo", "El internet"], "«spart den Weg ins Büro»."),
        c("¿Qué falta, según el texto?", ["El contacto con los colegas", "El silencio", "El tiempo libre", "La tecnología"], "«fehlt der Kontakt zu den Kollegen»."),
        fi("¿Cuántos días en casa tiene el modelo mixto del ejemplo?", ["2", "zwei"], "«drei Tage im Büro und zwei Tage zu Hause»."),
        tf("En casa hay más ruido que en la oficina.", false, "«weniger Lärm»."),
        c("¿Por qué a muchos les cuesta desconectarse?", ["Porque el trabajo y la vida privada están en el mismo lugar", "Porque trabajan más horas", "Porque no tienen escritorio", "Porque no tienen internet"], "«Arbeit und Privatleben im selben Raum»."),
      ],
    },
  },
  {
    id: "vier-tage", level: "B2", emoji: "📅", topic: "La semana de cuatro días",
    reading: {
      title: "Die Vier-Tage-Woche",
      text: [
        "Die Idee einer Vier-Tage-Woche ist nicht neu, aber erst in den letzten Jahren wird sie ernsthaft diskutiert. In mehreren Ländern haben Unternehmen getestet, ob sich die Arbeitszeit verkürzen lässt, ohne dass der Lohn sinkt.",
        "Die Befürworter argumentieren, dass Beschäftigte mit einem zusätzlichen freien Tag ausgeruhter und motivierter seien. Dadurch steige die Produktivität, und die Zahl der Krankmeldungen sinke. Außerdem sei das Modell ein Vorteil im Wettbewerb um qualifizierte Fachkräfte.",
        "Kritiker wenden ein, dass sich nicht jede Branche für eine verkürzte Woche eignet. In Krankenhäusern, in der Pflege oder im Handwerk ist Arbeitszeit direkt mit Leistung verbunden. Wer weniger arbeite, könne dort nicht dasselbe leisten – es sei denn, es werden zusätzliche Mitarbeiter eingestellt, was die Kosten erhöht.",
        "Die bisherigen Versuche zeigen ein gemischtes Bild: Viele Teilnehmer wollten nach dem Test nicht mehr zur alten Regelung zurück, doch ob sich die Ergebnisse auf die gesamte Wirtschaft übertragen lassen, bleibt offen.",
        "In Deutschland hat es einen größeren Versuch mit Firmen aus verschiedenen Branchen gegeben. Die Teilnehmer arbeiteten weniger Stunden, behielten aber ihr Gehalt, und Forscher begleiteten das Projekt, um nach einigen Monaten zu vergleichen, wie sich Zufriedenheit und Leistung verändert hatten.",
      ],
      translation: [
        "La idea de una semana de cuatro días no es nueva, pero recién en los últimos años se discute en serio. En varios países, empresas probaron si se puede acortar la jornada sin que baje el sueldo.",
        "Los defensores argumentan que los empleados, con un día libre más, estarían más descansados y motivados. Así subiría la productividad y bajaría la cantidad de licencias por enfermedad. Además, el modelo sería una ventaja en la competencia por personal calificado.",
        "Los críticos objetan que no todos los sectores sirven para una semana más corta. En hospitales, en el cuidado de personas o en los oficios, el tiempo de trabajo está directamente ligado al rendimiento. Quien trabaja menos no podría rendir lo mismo allí, a menos que se contrate más personal, lo que sube los costos.",
        "Las pruebas hechas hasta ahora muestran un panorama mixto: muchos participantes no quisieron volver a la regla anterior después del ensayo, pero si los resultados se pueden trasladar a toda la economía sigue siendo una pregunta abierta.",
        "En Alemania hubo un ensayo más grande con empresas de distintos sectores. Los participantes trabajaron menos horas pero mantuvieron su sueldo, e investigadores acompañaron el proyecto para comparar, después de algunos meses, cómo habían cambiado la satisfacción y el rendimiento.",
      ],
      questions: [
        c("¿Qué probaron las empresas en varios países?", ["Acortar la jornada sin bajar el sueldo", "Subir los sueldos", "Eliminar el home office", "Trabajar los fines de semana"], "«ob sich die Arbeitszeit verkürzen lässt, ohne dass der Lohn sinkt»."),
        c("¿Qué ventaja ven los defensores?", ["Más productividad y menos licencias por enfermedad", "Menos costos para la empresa", "Más horas de atención", "Menos reuniones"], "«steige die Produktivität, … Krankmeldungen sinke»."),
        c("¿Por qué es difícil en hospitales y oficios?", ["El tiempo de trabajo está ligado al rendimiento", "No hay personal capacitado", "Hay demasiados pacientes", "Los sueldos son bajos"], "«Arbeitszeit direkt mit Leistung verbunden»."),
        tf("Los críticos dicen que todos los sectores sirven para la semana corta.", false, "«nicht jede Branche… eignet»."),
        c("¿Cuál es el balance final del texto?", ["Es una pregunta todavía abierta", "Funciona en todos los casos", "Fracasó en todos los países", "Solo sirve para empresas chicas"], "«bleibt offen»."),
      ],
    },
  },
  {
    id: "soziale-medien", level: "B2", emoji: "📰", topic: "Noticias y redes sociales",
    reading: {
      title: "Zeitung oder soziale Medien?",
      text: [
        "Immer mehr Menschen informieren sich nicht mehr über Zeitungen oder Fernsehnachrichten, sondern über soziale Netzwerke. Das hat Folgen für die Art, wie Nachrichten entstehen und gelesen werden.",
        "Auf den Plattformen entscheidet ein Algorithmus, welche Beiträge angezeigt werden. Er bevorzugt Inhalte, auf die Nutzer stark reagieren – also häufig solche, die Emotionen wecken. Seriöse, aber nüchterne Berichte haben es dadurch schwerer, Aufmerksamkeit zu bekommen.",
        "Hinzu kommt, dass Falschmeldungen sich oft schneller verbreiten als Korrekturen. Wer eine Nachricht nur anhand der Überschrift teilt, trägt unbewusst dazu bei.",
        "Experten empfehlen deshalb, die Quelle zu prüfen, mehrere Medien zu vergleichen und eine Nachricht nicht sofort weiterzuleiten. Wer sich bewusst informiert, ist weniger anfällig für Manipulation – ganz auf soziale Netzwerke verzichten muss er dafür nicht.",
        "Auch die klassischen Medien reagieren darauf. Viele Zeitungen veröffentlichen ihre Artikel inzwischen zuerst online und passen Überschriften an, damit sie in den Netzwerken besser funktionieren. Kritiker fürchten, dass dadurch die Genauigkeit leidet; Befürworter halten dagegen, dass man Leser nur erreicht, wenn man dort präsent ist, wo sie sich aufhalten.",
      ],
      translation: [
        "Cada vez más gente ya no se informa por diarios o noticieros de televisión, sino por redes sociales. Eso tiene consecuencias en cómo se producen y se leen las noticias.",
        "En las plataformas, un algoritmo decide qué publicaciones se muestran. Prefiere los contenidos a los que los usuarios reaccionan fuerte, es decir, muchas veces los que despiertan emociones. Los informes serios pero sobrios la tienen así más difícil para conseguir atención.",
        "A eso se suma que las noticias falsas muchas veces se difunden más rápido que las correcciones. Quien comparte una noticia solo por el título contribuye sin querer.",
        "Por eso los expertos recomiendan verificar la fuente, comparar varios medios y no reenviar una noticia enseguida. Quien se informa con conciencia es menos vulnerable a la manipulación; para eso no tiene que renunciar del todo a las redes sociales.",
        "También los medios clásicos reaccionan. Muchos diarios publican hoy sus artículos primero en línea y adaptan los títulos para que funcionen mejor en las redes. Los críticos temen que así sufra la precisión; los defensores replican que a los lectores solo se llega estando presente donde ellos están.",
      ],
      questions: [
        c("¿Qué decide qué se muestra en las plataformas?", ["Un algoritmo", "Los editores", "Los usuarios", "Los anunciantes"], "«entscheidet ein Algorithmus»."),
        c("¿Qué contenidos prefiere el algoritmo?", ["Los que despiertan emociones", "Los más serios", "Los más largos", "Los más viejos"], "«Inhalte, … die Emotionen wecken»."),
        c("¿Qué problema tienen los informes serios pero sobrios?", ["Les cuesta conseguir atención", "Son muy caros", "No existen", "Son demasiado largos"], "«schwerer, Aufmerksamkeit zu bekommen»."),
        tf("Las correcciones se difunden más rápido que las noticias falsas.", false, "«Falschmeldungen … schneller … als Korrekturen»."),
        c("¿Qué recomiendan los expertos?", ["Verificar la fuente y comparar medios", "Dejar las redes por completo", "Compartir rápido", "Leer solo el título"], "«die Quelle zu prüfen, mehrere Medien zu vergleichen»."),
      ],
    },
  },
  {
    id: "mehrsprachigkeit", level: "B2", emoji: "🗣️", topic: "Crecer con dos idiomas",
    reading: {
      title: "Aufwachsen mit zwei Sprachen",
      text: [
        "Mehr als die Hälfte der Weltbevölkerung wächst mit mindestens zwei Sprachen auf. Lange galt Mehrsprachigkeit bei Kindern als Risiko: Man fürchtete, sie würden beide Sprachen schlechter lernen.",
        "Heutige Studien zeichnen ein anderes Bild. Zweisprachige Kinder mischen zwar anfangs manchmal die Sprachen, doch das ist normal und ein Zeichen dafür, dass sie beide Systeme gleichzeitig verarbeiten. Außerdem scheinen sie besser darin zu sein, zwischen Aufgaben zu wechseln und ihre Aufmerksamkeit zu steuern.",
        "Entscheidend ist dabei, dass Kinder beide Sprachen regelmäßig und in verschiedenen Situationen hören. Wer eine Sprache nur selten verwendet, verliert sie leichter wieder.",
        "Auch für Erwachsene lohnt es sich, eine weitere Sprache zu lernen. Es dauert zwar länger, doch Untersuchungen legen nahe, dass das Gehirn dadurch länger leistungsfähig bleibt.",
        "Für Familien bedeutet das eine Entscheidung im Alltag: Spricht man zu Hause die Herkunftssprache oder die Sprache des Landes? Fachleute raten meist dazu, dass jeder Elternteil konsequent seine eigene Sprache verwendet, damit die Kinder klare Vorbilder haben. Wichtig ist außerdem, dass beide Sprachen im Umfeld Ansehen genießen; wenn eine als weniger wertvoll gilt, verlieren Kinder schnell die Lust, sie zu sprechen.",
      ],
      translation: [
        "Más de la mitad de la población mundial crece con al menos dos idiomas. Durante mucho tiempo el plurilingüismo en los chicos se consideró un riesgo: se temía que aprendieran peor los dos idiomas.",
        "Los estudios actuales muestran otro panorama. Los chicos bilingües, al principio, a veces mezclan los idiomas, pero eso es normal y una señal de que procesan los dos sistemas a la vez. Además parecen ser mejores para cambiar de tarea y controlar su atención.",
        "Lo decisivo es que los chicos escuchen los dos idiomas con regularidad y en distintas situaciones. Quien usa un idioma solo muy de vez en cuando lo pierde más fácil.",
        "También a los adultos les conviene aprender otro idioma. Lleva más tiempo, pero hay investigaciones que sugieren que así el cerebro se mantiene en forma por más tiempo.",
        "Para las familias eso significa una decisión cotidiana: ¿se habla en casa el idioma de origen o el del país? Los especialistas suelen aconsejar que cada madre o padre use de manera consecuente su propio idioma, para que los chicos tengan modelos claros. También es importante que los dos idiomas gocen de prestigio en el entorno; si uno se considera menos valioso, los chicos pierden rápido las ganas de hablarlo.",
      ],
      questions: [
        c("¿Qué se temía antes sobre el plurilingüismo en los chicos?", ["Que aprendieran peor los dos idiomas", "Que olvidaran el primero", "Que no hablaran", "Que fueran más lentos en la escuela"], "«schlechter lernen»."),
        c("¿Qué indica que los chicos mezclen los idiomas?", ["Que procesan los dos sistemas a la vez", "Que no entienden ninguno", "Que están confundidos", "Que van a olvidar uno"], "«beide Systeme gleichzeitig verarbeiten»."),
        c("¿Qué es decisivo para que no se pierda un idioma?", ["Oírlo con regularidad y en distintas situaciones", "Estudiar gramática", "Vivir en otro país", "Aprenderlo de grande"], "«regelmäßig und in verschiedenen Situationen»."),
        tf("Para los adultos no vale la pena aprender otro idioma.", false, "«lohnt es sich»."),
        c("¿Qué sugieren algunas investigaciones sobre los adultos?", ["Que el cerebro se mantiene en forma más tiempo", "Que aprenden más rápido que los chicos", "Que olvidan su idioma materno", "Que no mejoran"], "«das Gehirn… länger leistungsfähig»."),
      ],
    },
  },
  {
    id: "praktikum-hamburg", level: "B1", emoji: "⚓", topic: "Una pasantía en Hamburgo",
    reading: {
      title: "Ein Praktikum in Hamburg",
      text: [
        "Letztes Jahr habe ich drei Monate lang ein Praktikum in Hamburg gemacht. Ich habe in einer kleinen Firma gearbeitet, die Software für Reedereien entwickelt. Am Anfang war alles neu für mich: die Sprache, die Kollegen und auch das Wetter. Es hat fast jeden Tag geregnet.",
        "Meine Aufgabe war es, Fehler in einem Programm zu suchen und die Ergebnisse aufzuschreiben. Zuerst habe ich nicht alles verstanden, weil meine Kollegen sehr schnell gesprochen haben. Aber sie waren geduldig und haben mir viel erklärt. Nach vier Wochen konnte ich schon allein arbeiten.",
        "Nach der Arbeit bin ich oft an den Hafen gegangen. Dort habe ich die großen Schiffe beobachtet und Fischbrötchen gegessen. Am Wochenende habe ich mit zwei Kolleginnen eine Radtour gemacht. Ich habe in dieser Zeit nicht nur viel über den Beruf gelernt, sondern auch mein Deutsch deutlich verbessert.",
      ],
      translation: [
        "El año pasado hice una pasantía de tres meses en Hamburgo. Trabajé en una empresa chica que desarrolla software para navieras. Al principio todo era nuevo para mí: el idioma, los colegas y también el clima. Llovió casi todos los días.",
        "Mi tarea era buscar errores en un programa y anotar los resultados. Al principio no entendí todo, porque mis colegas hablaban muy rápido. Pero fueron pacientes y me explicaron mucho. Después de cuatro semanas ya podía trabajar solo.",
        "Después del trabajo iba seguido al puerto. Ahí miraba los barcos grandes y comía sándwiches de pescado. El fin de semana hice un paseo en bicicleta con dos colegas. En ese tiempo no solo aprendí mucho sobre la profesión, sino que también mejoré bastante mi alemán.",
      ],
      questions: [
        fi("¿Cuántos meses duró la pasantía?", ["3", "drei"], "«drei Monate lang»."),
        c("¿Qué hacía la empresa?", ["Software para navieras", "Barcos", "Pescado", "Bicicletas"], "«Software für Reedereien»."),
        c("¿Por qué no entendía todo al principio?", ["Los colegas hablaban muy rápido", "Era muy difícil el programa", "No tenía tiempo", "Había mucho ruido"], "«sehr schnell gesprochen»."),
        fi("¿Después de cuántas semanas pudo trabajar solo?", ["4", "vier"], "«Nach vier Wochen»."),
        tf("Hizo el paseo en bicicleta solo.", false, "Fue «mit zwei Kolleginnen»."),
        c("¿Qué mejoró además de aprender sobre la profesión?", ["Su alemán", "Su inglés", "Su salud", "Su sueldo"], "«mein Deutsch deutlich verbessert»."),
      ],
    },
  },
  {
    id: "schulsystem", level: "B1", emoji: "🎒", topic: "La escuela en Alemania",
    reading: {
      title: "Das deutsche Schulsystem",
      text: [
        "In Deutschland gehen alle Kinder mit sechs Jahren in die Grundschule. Sie dauert in den meisten Bundesländern vier Jahre. Danach müssen die Eltern und die Lehrer entscheiden, welche weiterführende Schule am besten zu dem Kind passt.",
        "Es gibt drei klassische Schultypen: die Hauptschule, die Realschule und das Gymnasium. Nur wer das Gymnasium besucht und das Abitur besteht, kann direkt an einer Universität studieren. Viele Kritiker finden es problematisch, dass die Entscheidung schon so früh fällt.",
        "Deshalb haben einige Länder eine Gesamtschule eingeführt. Dort lernen die Kinder länger zusammen, und der Abschluss wird später gewählt. Außerdem ist die Ausbildung in Deutschland sehr angesehen: Viele Jugendliche machen nach der Schule eine Lehre im Betrieb und gehen gleichzeitig in die Berufsschule.",
      ],
      translation: [
        "En Alemania todos los chicos van a la escuela primaria a los seis años. En la mayoría de los estados dura cuatro años. Después, los padres y los docentes deben decidir qué escuela secundaria es la más adecuada para el chico.",
        "Hay tres tipos clásicos de escuela: la Hauptschule, la Realschule y el Gymnasium. Solo quien asiste al Gymnasium y aprueba el Abitur puede estudiar directamente en una universidad. Muchos críticos consideran problemático que la decisión se tome tan temprano.",
        "Por eso algunos estados introdujeron la escuela integrada. Allí los chicos aprenden juntos por más tiempo y el título se elige más tarde. Además, la formación profesional es muy prestigiosa en Alemania: muchos jóvenes hacen después de la escuela un aprendizaje en una empresa y van al mismo tiempo a la escuela profesional.",
      ],
      questions: [
        fi("¿A qué edad empiezan la primaria?", ["6", "sechs"], "«mit sechs Jahren»."),
        fi("¿Cuántos años dura la primaria en la mayoría de los estados?", ["4", "vier"], "«vier Jahre»."),
        c("¿Quién puede estudiar directamente en la universidad?", ["Quien aprueba el Abitur en el Gymnasium", "Cualquier egresado", "Quien termina la Hauptschule", "Solo quien hizo una Lehre"], "«Gymnasium ... Abitur»."),
        c("¿Qué critican muchos?", ["Que la decisión se tome tan temprano", "Que la escuela es cara", "Que hay pocos docentes", "Que el Abitur es fácil"], "«so früh fällt»."),
        tf("En la escuela integrada se decide el título más tarde.", true, "«der Abschluss wird später gewählt»."),
        tf("La formación profesional casi no se valora.", false, "«sehr angesehen»."),
      ],
    },
  },
  {
    id: "fachkraefte", level: "B2", emoji: "🛠️", topic: "La falta de personal calificado",
    reading: {
      title: "Wer baut unsere Zukunft?",
      text: [
        "In vielen Branchen klagen Unternehmen seit Jahren über einen Mangel an Fachkräften. Ob Pflege, Handwerk oder Informatik: Offene Stellen bleiben monatelang unbesetzt, und ganze Projekte verzögern sich. Besonders betroffen sind kleine Betriebe auf dem Land, die mit den Gehältern und dem Angebot der Großstädte nicht mithalten können.",
        "Die Ursachen sind vielfältig. Einerseits geht die geburtenstarke Generation in den nächsten Jahren in Rente, andererseits entscheiden sich immer mehr junge Menschen für ein Studium statt für eine Ausbildung. Hinzu kommt, dass sich die Anforderungen durch die Digitalisierung rasch verändern und viele Beschäftigte ständig weiterlernen müssen.",
        "Die Politik versucht gegenzusteuern. Sie hat die Anerkennung ausländischer Abschlüsse vereinfacht und wirbt gezielt um Einwanderer. Kritiker bemängeln jedoch, dass die Verfahren weiterhin zu lange dauern und viele Qualifizierte frustriert wieder abreisen. Ohne bessere Arbeitsbedingungen, so ihr Argument, werde sich das Problem nicht lösen.",
        "Einige Unternehmen gehen eigene Wege: Sie bieten flexible Arbeitszeiten, bezahlen Weiterbildungen und kümmern sich sogar um Wohnungen für neue Mitarbeiter. Ob solche Maßnahmen ausreichen, bleibt umstritten. Fest steht jedoch, dass der Wettbewerb um qualifizierte Beschäftigte in den kommenden Jahren eher zunehmen als nachlassen wird.",
      ],
      translation: [
        "En muchas ramas, las empresas se quejan desde hace años de la falta de personal calificado. Sea enfermería, oficios o informática: los puestos vacantes quedan sin cubrir durante meses y proyectos enteros se retrasan. Los más afectados son los negocios chicos del campo, que no pueden competir con los sueldos y la oferta de las grandes ciudades.",
        "Las causas son variadas. Por un lado, la generación del baby boom se jubilará en los próximos años; por otro, cada vez más jóvenes eligen una carrera universitaria en vez de una formación profesional. A eso se suma que los requisitos cambian rápido por la digitalización y que muchos empleados tienen que seguir aprendiendo constantemente.",
        "La política intenta contrarrestarlo. Simplificó el reconocimiento de títulos extranjeros y busca atraer inmigrantes de forma dirigida. Los críticos objetan, sin embargo, que los trámites siguen durando demasiado y que muchos calificados se van frustrados. Sin mejores condiciones laborales, sostienen, el problema no se resolverá.",
        "Algunas empresas siguen su propio camino: ofrecen horarios flexibles, pagan capacitaciones e incluso se ocupan de conseguir viviendas para los nuevos empleados. Si esas medidas alcanzan, es motivo de controversia. Lo que sí es seguro es que la competencia por empleados calificados más bien aumentará que disminuirá en los próximos años.",
      ],
      questions: [
        c("¿Quiénes sufren más la falta de personal?", ["Los negocios chicos del campo", "Las grandes empresas", "Los bancos", "Las escuelas"], "«kleine Betriebe auf dem Land»."),
        c("¿Qué elige cada vez más gente joven?", ["Una carrera universitaria", "Una formación profesional", "Trabajar en el exterior", "Un negocio propio"], "«Studium statt Ausbildung»."),
        tf("La digitalización hace que los requisitos casi no cambien.", false, "«verändern sich rasch»."),
        c("¿Qué critican algunos de los trámites?", ["Que duran demasiado", "Que son caros", "Que son demasiado simples", "Que se hacen solo en línea"], "«zu lange dauern»."),
        c("¿Qué ofrecen algunas empresas?", ["Horarios flexibles y capacitaciones pagas", "Autos de la empresa", "Más vacaciones", "Acciones"], "«flexible Arbeitszeiten ... Weiterbildungen»."),
        tf("Se espera que la competencia por calificados disminuya.", false, "«eher zunehmen als nachlassen»."),
      ],
    },
  },
  {
    id: "ki-alltag", level: "B2", emoji: "🤖", topic: "Inteligencia artificial en la vida diaria",
    reading: {
      title: "Künstliche Intelligenz im Alltag",
      text: [
        "Vor wenigen Jahren klang künstliche Intelligenz noch nach Science-Fiction, heute begegnet sie uns fast überall. Sie schlägt uns Filme vor, übersetzt Texte, sortiert unsere E-Mails und hilft Ärzten dabei, Krankheiten auf Röntgenbildern früher zu erkennen. Viele Menschen nutzen diese Technik, ohne es überhaupt zu bemerken.",
        "Befürworter betonen vor allem die Zeitersparnis. Routineaufgaben, für die man früher Stunden brauchte, erledigt ein Programm in Sekunden. Das könne Beschäftigte entlasten und Raum für kreative Tätigkeiten schaffen. Außerdem eröffne die Technik Menschen mit Behinderungen neue Möglichkeiten, etwa durch automatische Untertitel oder Vorlesefunktionen.",
        "Skeptiker warnen dagegen vor mehreren Risiken. Erstens sind die Ergebnisse nicht immer zuverlässig: Programme erfinden gelegentlich Fakten, die überzeugend klingen. Zweitens lernen sie aus Daten, die Vorurteile enthalten können, und geben diese weiter. Drittens bleibt unklar, wer haftet, wenn eine automatische Entscheidung einen Schaden verursacht.",
        "Experten raten deshalb zu einem bewussten Umgang. Man sollte Ergebnisse stets überprüfen, keine sensiblen Daten preisgeben und wichtige Entscheidungen nicht allein einer Maschine überlassen. Der Gesetzgeber arbeitet bereits an Regeln, die Transparenz und Verantwortung sicherstellen sollen. Ob sie mit dem Tempo der Entwicklung Schritt halten können, ist allerdings offen.",
      ],
      translation: [
        "Hace pocos años, la inteligencia artificial sonaba todavía a ciencia ficción; hoy nos la cruzamos casi en todas partes. Nos sugiere películas, traduce textos, ordena nuestros correos y ayuda a los médicos a detectar enfermedades antes en las radiografías. Mucha gente usa esta tecnología sin siquiera notarlo.",
        "Los defensores destacan sobre todo el ahorro de tiempo. Tareas de rutina que antes llevaban horas las resuelve un programa en segundos. Eso podría aliviar a los empleados y dejar lugar para actividades creativas. Además, la tecnología abriría nuevas posibilidades a personas con discapacidad, por ejemplo con subtítulos automáticos o funciones de lectura en voz alta.",
        "Los escépticos, en cambio, advierten de varios riesgos. Primero, los resultados no siempre son confiables: los programas a veces inventan datos que suenan convincentes. Segundo, aprenden de datos que pueden contener prejuicios y los reproducen. Tercero, no queda claro quién responde cuando una decisión automática causa un daño.",
        "Por eso los expertos aconsejan un uso consciente. Habría que verificar siempre los resultados, no revelar datos sensibles y no dejar las decisiones importantes solo en manos de una máquina. El legislador ya trabaja en reglas que deberían garantizar transparencia y responsabilidad. Si podrán seguir el ritmo del desarrollo, sin embargo, está abierto.",
      ],
      questions: [
        c("¿Cómo ayuda la IA a los médicos?", ["Detecta enfermedades antes en radiografías", "Opera a los pacientes", "Escribe recetas", "Agenda los turnos"], "«auf Röntgenbildern früher zu erkennen»."),
        c("¿Qué destacan los defensores?", ["El ahorro de tiempo", "El bajo costo", "La seguridad total", "La privacidad"], "«Zeitersparnis»."),
        tf("Los programas siempre dan resultados confiables.", false, "«nicht immer zuverlässig»."),
        c("¿Qué problema tiene aprender de datos con prejuicios?", ["Los programas pueden reproducirlos", "Los programas se vuelven lentos", "Los datos desaparecen", "Se necesitan más datos"], "«geben diese weiter»."),
        tf("Los expertos recomiendan dejar las decisiones importantes a la máquina.", false, "«nicht allein einer Maschine überlassen»."),
        c("¿Qué está todavía abierto?", ["Si las reglas seguirán el ritmo de la tecnología", "Si habrá leyes", "Si la IA existirá", "Si los médicos la usan"], "«ob sie mit dem Tempo ... Schritt halten können»."),
      ],
    },
  },
  {
    id: "mieten-stadt", level: "B2", emoji: "🏙️", topic: "Alquilar en la gran ciudad",
    reading: {
      title: "Wohnen in der Großstadt",
      text: [
        "In Städten wie München, Hamburg oder Berlin ist es für viele Menschen zu einer Herausforderung geworden, eine bezahlbare Wohnung zu finden. Die Mieten sind in den letzten zehn Jahren deutlich gestiegen, während die Einkommen kaum mithalten konnten. Zu Besichtigungsterminen kommen oft Dutzende Interessenten, und wer nicht sofort alle Unterlagen vorlegt, hat kaum eine Chance.",
        "Die Politik hat darauf mit verschiedenen Maßnahmen reagiert. In einigen Städten gilt eine Mietpreisbremse, die den Anstieg bei neuen Verträgen begrenzen soll. Kritiker bezweifeln allerdings ihre Wirkung, weil es zahlreiche Ausnahmen gibt und Verstöße selten verfolgt werden. Zudem argumentieren sie, dass Vermieter weniger investieren, wenn die Erträge sinken.",
        "Eine andere Lösung wäre, mehr Wohnungen zu bauen. Doch Bauland ist knapp, Genehmigungen dauern lang, und die Baukosten sind stark gestiegen. Deshalb weichen viele Familien ins Umland aus und nehmen lange Pendelzeiten in Kauf. Das entlastet zwar den Wohnungsmarkt in der Stadt, belastet aber Verkehr und Umwelt.",
        "Manche Menschen suchen alternative Wege, etwa Wohngemeinschaften im Alter oder Genossenschaften, in denen die Bewohner gemeinsam Eigentümer sind. Solche Modelle bieten oft günstigere Mieten und mehr Gemeinschaft. Sie sind allerdings noch die Ausnahme, und es braucht Zeit und Engagement, um sie umzusetzen.",
      ],
      translation: [
        "En ciudades como Múnich, Hamburgo o Berlín, encontrar un departamento accesible se volvió un desafío para mucha gente. Los alquileres subieron claramente en los últimos diez años, mientras que los ingresos apenas pudieron seguirles el ritmo. A las visitas suelen llegar decenas de interesados, y quien no presenta enseguida todos los documentos casi no tiene chances.",
        "La política respondió con distintas medidas. En algunas ciudades rige un freno a los alquileres, que debería limitar el aumento en los contratos nuevos. Los críticos dudan, sin embargo, de su efecto, porque hay numerosas excepciones y las infracciones rara vez se persiguen. Además, argumentan que los propietarios invierten menos cuando las ganancias bajan.",
        "Otra solución sería construir más viviendas. Pero el suelo edificable es escaso, los permisos tardan y los costos de construcción subieron mucho. Por eso muchas familias se mudan a las afueras y aceptan largos tiempos de viaje. Eso alivia el mercado de la ciudad, pero carga el tránsito y el medio ambiente.",
        "Algunas personas buscan caminos alternativos, como las viviendas compartidas en la vejez o las cooperativas, donde los habitantes son propietarios en conjunto. Estos modelos suelen ofrecer alquileres más baratos y más comunidad. Sin embargo, siguen siendo la excepción, y hace falta tiempo y compromiso para llevarlos a cabo.",
      ],
      questions: [
        fi("¿En cuántos años subieron claramente los alquileres?", ["10", "zehn"], "«in den letzten zehn Jahren»."),
        c("¿Qué hace falta para tener chances en una visita?", ["Presentar enseguida todos los documentos", "Llegar tarde", "Ofrecer más dinero", "Venir con un abogado"], "«sofort alle Unterlagen vorlegt»."),
        c("¿Por qué dudan los críticos de la Mietpreisbremse?", ["Hay muchas excepciones y se persiguen poco las infracciones", "Es demasiado cara", "Es ilegal", "Solo rige en el campo"], "«zahlreiche Ausnahmen ... Verstöße selten verfolgt»."),
        c("¿Qué problema tiene construir más?", ["El suelo es escaso y los permisos tardan", "Falta gente que quiera vivir", "Los alquileres bajan", "Las ciudades son chicas"], "«Bauland ist knapp, Genehmigungen dauern lang»."),
        tf("Mudarse a las afueras alivia también el tránsito.", false, "«belastet aber Verkehr und Umwelt»."),
        tf("Las cooperativas son hoy el modelo más común.", false, "«noch die Ausnahme»."),
      ],
    },
  },
  {
    id: "nachhaltig-konsum", level: "B2", emoji: "🌱", topic: "Consumo sostenible",
    reading: {
      title: "Weniger ist mehr?",
      text: [
        "Immer mehr Menschen fragen sich, wie sie ihren Alltag nachhaltiger gestalten können. Sie kaufen regionale Lebensmittel, fahren Rad statt Auto oder reparieren defekte Geräte, statt sie wegzuwerfen. Dahinter steht die Einsicht, dass unsere Ressourcen begrenzt sind und der Klimawandel schon heute spürbar ist.",
        "Allerdings ist nachhaltiger Konsum nicht immer einfach. Oft sind umweltfreundliche Produkte teurer, und nicht jeder kann sich das leisten. Hinzu kommt, dass Siegel und Werbeversprechen schwer zu durchschauen sind: Manche Firmen stellen ihre Produkte als grün dar, obwohl sich an der Herstellung kaum etwas geändert hat. Fachleute sprechen in diesem Fall von Greenwashing.",
        "Umstritten ist auch, wie viel der Einzelne wirklich bewirken kann. Während manche betonen, dass viele kleine Entscheidungen zusammen einen großen Unterschied machen, halten andere dagegen, dass vor allem Industrie und Politik handeln müssten. Der private Verzicht lenke leicht davon ab, dass strukturelle Veränderungen notwendig seien.",
        "Vermutlich liegt die Wahrheit in der Mitte. Wer bewusst einkauft, setzt ein Zeichen und beeinflusst langfristig das Angebot. Zugleich braucht es klare Regeln, die umweltschädliches Verhalten teurer und nachhaltiges Verhalten leichter machen. Nur im Zusammenspiel beider Ebenen lässt sich ein spürbarer Fortschritt erreichen.",
      ],
      translation: [
        "Cada vez más gente se pregunta cómo puede hacer su vida diaria más sostenible. Compran alimentos regionales, andan en bicicleta en vez de auto o reparan aparatos rotos en lugar de tirarlos. Detrás está la idea de que nuestros recursos son limitados y de que el cambio climático ya se nota hoy.",
        "Sin embargo, el consumo sostenible no siempre es fácil. Muchas veces los productos ecológicos son más caros y no todos pueden pagarlos. A eso se suma que los sellos y las promesas publicitarias son difíciles de descifrar: algunas empresas presentan sus productos como verdes, aunque en la fabricación casi no cambió nada. Los expertos hablan en ese caso de greenwashing.",
        "También es controvertido cuánto puede lograr realmente cada persona. Mientras algunos subrayan que muchas pequeñas decisiones juntas marcan una gran diferencia, otros replican que sobre todo la industria y la política deberían actuar. La renuncia privada distraería fácilmente del hecho de que son necesarios cambios estructurales.",
        "Probablemente la verdad esté en el medio. Quien compra con conciencia da una señal e influye a largo plazo en la oferta. Al mismo tiempo, hacen falta reglas claras que encarezcan el comportamiento dañino para el ambiente y faciliten el sostenible. Solo con la combinación de ambos niveles se puede lograr un progreso notable.",
      ],
      questions: [
        c("¿Qué hacen algunos en vez de tirar aparatos rotos?", ["Los reparan", "Los venden", "Los regalan", "Los guardan"], "«reparieren defekte Geräte»."),
        c("¿Qué dificulta el consumo sostenible?", ["Los productos ecológicos suelen ser más caros", "Hay pocas tiendas", "Está prohibido", "Nadie lo quiere"], "«oft ... teurer»."),
        c("¿Qué es el greenwashing?", ["Presentar como verde un producto que casi no cambió", "Lavar con productos ecológicos", "Reciclar plástico", "Plantar árboles"], "«als grün dar, obwohl ... kaum etwas geändert»."),
        c("¿Qué dicen quienes opinan que debe actuar la industria?", ["Que el sacrificio privado distrae de los cambios estructurales", "Que nadie debe comprar nada", "Que el clima no cambia", "Que las reglas sobran"], "«lenke davon ab»."),
        tf("El texto sostiene que solo importa lo que decide cada persona.", false, "Pide actuar en ambos niveles."),
        tf("Según el texto, se necesitan reglas más claras.", true, "«braucht es klare Regeln»."),
      ],
    },
  },
  {
    id: "demografie", level: "B2", emoji: "👥", topic: "Una sociedad que envejece",
    reading: {
      title: "Wenn die Gesellschaft älter wird",
      text: [
        "Deutschland gehört zu den Ländern mit der ältesten Bevölkerung der Welt. Das Durchschnittsalter liegt heute bei über 44 Jahren, und in den kommenden zwei Jahrzehnten wird der Anteil der Menschen über 67 weiter deutlich steigen. Der Grund dafür ist ein Zusammenspiel aus zwei Entwicklungen: Einerseits leben die Menschen dank besserer Medizin immer länger, andererseits bekommen sie weniger Kinder, als nötig wären, um die Bevölkerungszahl stabil zu halten.",
        "Die Folgen zeigen sich schon heute in vielen Bereichen. Die gesetzliche Rentenversicherung beruht auf dem Prinzip, dass die arbeitende Generation die Renten der älteren finanziert. Kamen früher auf einen Rentner mehrere Beitragszahler, so sind es bald nur noch zwei. Damit das System nicht zusammenbricht, muss entweder der Beitrag steigen, das Rentenniveau sinken oder das Eintrittsalter angehoben werden. Jede dieser Optionen ist politisch heikel, weil sie irgendjemanden belastet.",
        "Auch der Arbeitsmarkt verändert sich. In Branchen wie der Pflege, dem Handwerk oder der Gastronomie finden Betriebe kaum noch Nachwuchs, während gleichzeitig mehr ältere Menschen auf Betreuung angewiesen sind. Manche Unternehmen reagieren darauf, indem sie ältere Beschäftigte länger halten, flexible Arbeitszeiten anbieten oder gezielt im Ausland werben. Ob das ausreicht, ist umstritten, denn die Zuwanderung müsste dafür dauerhaft und in großem Umfang stattfinden.",
        "Ökonomen weisen außerdem darauf hin, dass eine alternde Gesellschaft nicht zwangsläufig eine ärmere sein muss. Entscheidend sei die Produktivität: Wenn weniger Menschen mehr leisten, etwa durch Digitalisierung und Automatisierung, könne der Wohlstand erhalten bleiben. Dem halten Kritiker entgegen, dass sich Pflege und viele Dienstleistungen kaum automatisieren lassen und gerade dort der Bedarf am stärksten wächst.",
        "Gesellschaftlich stellt sich schließlich die Frage nach dem Zusammenleben der Generationen. Wenn die Jüngeren die Lasten tragen, die Älteren aber bei Wahlen die Mehrheit stellen, droht ein Konflikt um Prioritäten, etwa bei Bildung, Klima und Renten. Gelingen kann der Ausgleich nur, wenn beide Seiten bereit sind, die Perspektive der anderen ernst zu nehmen und gemeinsam nach tragfähigen Lösungen zu suchen.",
      ],
      translation: [
        "Alemania es uno de los países con la población más envejecida del mundo. La edad promedio supera hoy los 44 años y, en las próximas dos décadas, la proporción de personas mayores de 67 seguirá aumentando de forma notable. La razón es la combinación de dos procesos: por un lado, gracias a una mejor medicina, la gente vive cada vez más; por otro, tiene menos hijos de los necesarios para mantener estable el número de habitantes.",
        "Las consecuencias ya se ven en muchos ámbitos. El seguro de jubilación estatal se basa en el principio de que la generación que trabaja financia las jubilaciones de la mayor. Antes, por cada jubilado había varios aportantes; pronto serán solo dos. Para que el sistema no colapse, hay que subir la cotización, bajar el nivel de las jubilaciones o elevar la edad de retiro. Cada una de estas opciones es políticamente delicada, porque perjudica a alguien.",
        "También el mercado laboral cambia. En ramas como la enfermería, los oficios o la gastronomía, las empresas apenas encuentran jóvenes, mientras que al mismo tiempo más personas mayores necesitan cuidados. Algunas empresas reaccionan reteniendo más tiempo a los empleados mayores, ofreciendo horarios flexibles o buscando personal en el exterior de forma dirigida. Si eso alcanza es discutido, porque para ello la inmigración tendría que ser permanente y de gran escala.",
        "Los economistas señalan además que una sociedad que envejece no tiene por qué ser más pobre. Lo decisivo sería la productividad: si menos personas rinden más, por ejemplo mediante la digitalización y la automatización, el bienestar podría mantenerse. Los críticos replican que los cuidados y muchos servicios casi no se pueden automatizar y que justo allí la demanda crece más.",
        "En lo social, por último, surge la pregunta de la convivencia entre generaciones. Si los jóvenes cargan con los costos pero los mayores son mayoría en las elecciones, amenaza un conflicto por las prioridades, por ejemplo en educación, clima y jubilaciones. El equilibrio solo puede lograrse si ambas partes están dispuestas a tomar en serio la perspectiva de la otra y a buscar juntas soluciones sostenibles.",
      ],
      questions: [
        fi("¿Qué edad promedio tiene hoy la población (más de…)?", ["44", "vierundvierzig"], "«über 44 Jahren»."),
        c("¿Qué dos procesos explican el envejecimiento?", ["Se vive más y nacen menos chicos", "Hay más inmigración y menos trabajo", "Suben los sueldos y bajan los precios", "Baja la natalidad y sube la mortalidad"], "«leben immer länger ... weniger Kinder»."),
        c("¿Cómo funciona el seguro de jubilación estatal?", ["Quienes trabajan financian las jubilaciones actuales", "Cada uno ahorra para sí mismo", "Lo paga solo el Estado con impuestos de empresas", "Lo paga cada empresa por su cuenta"], "«die arbeitende Generation ... finanziert»."),
        fi("¿Cuántos aportantes habrá pronto por cada jubilado?", ["2", "zwei"], "«nur noch zwei»."),
        tf("Las tres opciones para sostener el sistema son políticamente simples.", false, "Son «politisch heikel»."),
        c("¿Qué argumentan los críticos de la automatización como solución?", ["Que cuidados y muchos servicios casi no se pueden automatizar", "Que las máquinas son muy caras", "Que no hay interés de las empresas", "Que baja la productividad"], "«lassen sich kaum automatisieren»."),
        c("¿Qué riesgo social se menciona al final?", ["Un conflicto de prioridades entre jóvenes y mayores", "Una guerra civil", "El cierre de universidades", "El fin de las elecciones"], "«Konflikt um Prioritäten»."),
        tf("El texto afirma que una sociedad que envejece necesariamente será más pobre.", false, "«nicht zwangsläufig eine ärmere»."),
      ],
    },
  },
  {
    id: "desinformation", level: "B2", emoji: "🔍", topic: "Desinformación en internet",
    reading: {
      title: "Wahr oder falsch? Der Umgang mit Desinformation",
      text: [
        "Noch nie war es so einfach, Informationen zu verbreiten, und noch nie war es so schwierig zu beurteilen, ob sie stimmen. Innerhalb weniger Minuten kann eine Behauptung, ein Foto oder ein Video Millionen Menschen erreichen, ohne dass jemand überprüft hat, woher es stammt. Dabei unterscheidet man häufig zwischen Fehlinformation, die aus Versehen entsteht, und Desinformation, die bewusst verbreitet wird, um andere zu täuschen oder zu beeinflussen.",
        "Warum fallen so viele Menschen darauf herein? Die Forschung nennt mehrere Gründe. Erstens neigen wir dazu, Nachrichten zu glauben, die unsere Meinung bestätigen. Zweitens lösen emotionale Inhalte, etwa Empörung oder Angst, mehr Reaktionen aus als nüchterne Fakten, und die Algorithmen der Plattformen belohnen genau das. Drittens wirkt eine Behauptung glaubwürdiger, je häufiger man ihr begegnet, selbst wenn sie falsch ist.",
        "Neue Technologien verschärfen das Problem. Mit Hilfe künstlicher Intelligenz lassen sich heute täuschend echte Bilder, Stimmen und Videos erzeugen, die kaum noch von echten zu unterscheiden sind. Das macht es nicht nur leichter, Lügen zu verbreiten, sondern führt auch dazu, dass echte Beweise angezweifelt werden. Wer Fakten unbequem findet, kann sie einfach als Fälschung abtun.",
        "Was hilft dagegen? Experten empfehlen einfache Gewohnheiten: die Quelle prüfen, mehrere unabhängige Medien vergleichen, bei spektakulären Meldungen skeptisch bleiben und Beiträge nicht sofort weiterleiten. Viele Schulen vermitteln deshalb inzwischen Medienkompetenz als eigenes Thema. Außerdem arbeiten Faktenchecker daran, verbreitete Behauptungen zu widerlegen, auch wenn ihre Korrekturen meist weniger Menschen erreichen als die ursprüngliche Lüge.",
        "Politisch ist die Frage umstritten, wie weit der Staat eingreifen soll. Befürworter strengerer Regeln verlangen, dass Plattformen für die Inhalte auf ihren Seiten stärker haften und Falschmeldungen schneller löschen. Kritiker warnen dagegen vor Zensur, denn wer entscheidet, was wahr ist, hat auch Macht über das, was gesagt werden darf. Eine überzeugende Lösung muss deshalb beides leisten: die Verbreitung gezielter Lügen eindämmen und die Meinungsfreiheit schützen.",
      ],
      translation: [
        "Nunca fue tan fácil difundir información, y nunca fue tan difícil juzgar si es cierta. En pocos minutos, una afirmación, una foto o un video puede llegar a millones de personas sin que nadie haya verificado de dónde viene. Se suele distinguir entre la información errónea, que surge por equivocación, y la desinformación, que se difunde a propósito para engañar o influir en otros.",
        "¿Por qué tanta gente cae en esto? La investigación menciona varias razones. Primero, tendemos a creer noticias que confirman nuestra opinión. Segundo, los contenidos emocionales, como la indignación o el miedo, provocan más reacciones que los hechos sobrios, y los algoritmos de las plataformas premian justamente eso. Tercero, una afirmación resulta más creíble cuanto más a menudo nos topamos con ella, aunque sea falsa.",
        "Las nuevas tecnologías agravan el problema. Con ayuda de la inteligencia artificial hoy se pueden crear imágenes, voces y videos engañosamente reales, casi imposibles de distinguir de los verdaderos. Eso no solo facilita difundir mentiras, sino que además lleva a dudar de las pruebas auténticas. Quien encuentra incómodos los hechos puede descartarlos como falsificación.",
        "¿Qué ayuda? Los expertos recomiendan hábitos simples: verificar la fuente, comparar varios medios independientes, mantener el escepticismo ante noticias espectaculares y no reenviar publicaciones enseguida. Por eso muchas escuelas enseñan hoy la alfabetización mediática como tema propio. Además, los verificadores de datos trabajan para refutar afirmaciones difundidas, aunque sus correcciones suelen llegar a menos gente que la mentira original.",
        "En lo político, es discutido hasta dónde debe intervenir el Estado. Los partidarios de reglas más estrictas piden que las plataformas respondan más por los contenidos de sus sitios y borren más rápido las noticias falsas. Los críticos advierten, en cambio, de la censura, porque quien decide qué es verdad también tiene poder sobre lo que se puede decir. Una solución convincente debe lograr ambas cosas: frenar la difusión de mentiras deliberadas y proteger la libertad de opinión.",
      ],
      questions: [
        c("¿Qué diferencia hay entre información errónea y desinformación?", ["La desinformación se difunde a propósito para engañar", "La errónea es siempre más peligrosa", "La desinformación es siempre verdadera", "No hay ninguna diferencia"], "«bewusst verbreitet»."),
        c("¿Qué hace que los algoritmos premien ciertos contenidos?", ["Los contenidos emocionales provocan más reacciones", "Los contenidos sobrios son más largos", "Los medios los pagan", "Son los más antiguos"], "«emotionale Inhalte ... mehr Reaktionen»."),
        tf("Una afirmación falsa resulta menos creíble si la vemos muchas veces.", false, "Resulta más creíble «je häufiger man ihr begegnet»."),
        c("¿Qué problema adicional trae la IA?", ["Se duda también de las pruebas auténticas", "Los videos son más lentos", "Hay menos noticias", "Se prohíben las imágenes"], "«echte Beweise angezweifelt»."),
        c("¿Qué hábito recomiendan los expertos?", ["Comparar varios medios independientes", "Compartir enseguida lo espectacular", "Confiar en el primer resultado", "Evitar toda noticia"], "«mehrere unabhängige Medien vergleichen»."),
        tf("Las correcciones de los verificadores suelen llegar a más gente que la mentira original.", false, "Llegan a «weniger Menschen»."),
        c("¿Qué temen los críticos de reglas más estrictas?", ["La censura", "Que no haya plataformas", "Que suban los impuestos", "Que se pierdan videos"], "«warnen ... vor Zensur»."),
        c("¿Qué debe lograr una solución convincente?", ["Frenar mentiras deliberadas y proteger la libertad de opinión", "Prohibir internet", "Eliminar todos los medios", "Pagar a los verificadores"], "«beides leisten»."),
      ],
    },
  },
  {
    id: "reparieren", level: "B2", emoji: "🔧", topic: "El derecho a reparar",
    reading: {
      title: "Reparieren statt wegwerfen",
      text: [
        "Die Waschmaschine macht Geräusche, das Handy hat einen Sprung im Display, der Toaster funktioniert nicht mehr: Früher brachte man solche Geräte in die Werkstatt, heute kaufen viele einfach ein neues. Tatsächlich ist eine Reparatur oft teurer als der Neukauf, denn Ersatzteile sind knapp, Arbeitsstunden kosten viel, und manche Geräte sind so gebaut, dass man sie kaum öffnen kann. Die Folge ist ein wachsender Berg an Elektroschrott, der zu den größten Abfallströmen der Welt gehört.",
        "Dagegen formiert sich eine Bewegung, die ein Recht auf Reparatur fordert. Ihre Anhänger verlangen, dass Hersteller Ersatzteile und Anleitungen für einen bestimmten Zeitraum bereitstellen und Geräte so konstruieren, dass einzelne Teile ausgetauscht werden können. In der Europäischen Union gibt es bereits erste Regeln, die Garantiezeiten verlängern, wenn ein Produkt repariert statt ersetzt wird, und die bestimmte Bauteile für unabhängige Werkstätten zugänglich machen.",
        "Parallel dazu wächst eine Kultur des gemeinsamen Reparierens. In sogenannten Repair-Cafés treffen sich Freiwillige, die kaputte Geräte gemeinsam mit den Besitzern untersuchen und häufig wieder in Gang bringen. Diese Treffen sparen nicht nur Geld und Ressourcen, sondern vermitteln auch Wissen, das in einer Wegwerfgesellschaft sonst verloren geht. Für viele Teilnehmer ist es zudem eine Gelegenheit, Nachbarn kennenzulernen.",
        "Die Hersteller sehen das Thema differenzierter. Sie argumentieren, dass Geräte immer komplexer und sicherheitsrelevanter würden und unsachgemäße Reparaturen Risiken wie Brände oder Datenverlust mit sich brächten. Außerdem sei der Preisdruck im Wettbewerb so hoch, dass langlebige, reparierbare Konstruktionen kaum zu bezahlen seien. Verbraucherschützer halten dem entgegen, dass einige Firmen Produkte absichtlich so gestalten, dass sie nach wenigen Jahren ausfallen, was sich nur schwer beweisen lasse.",
        "Unabhängig davon, wer recht hat, zeigt sich ein Trend: Immer mehr Menschen achten beim Kauf darauf, wie lange ein Gerät hält und ob es sich reparieren lässt. Das kann langfristig Einfluss auf das Angebot haben. Ob es gelingt, die Wegwerfmentalität zu überwinden, hängt letztlich davon ab, ob Reparieren günstiger, einfacher und selbstverständlicher wird als Neukaufen.",
      ],
      translation: [
        "La lavadora hace ruidos, el celular tiene una grieta en la pantalla, la tostadora ya no funciona: antes se llevaban esos aparatos al taller; hoy muchos simplemente compran uno nuevo. En efecto, una reparación suele ser más cara que la compra nueva, porque los repuestos escasean, las horas de trabajo cuestan mucho y algunos aparatos están hechos de modo que casi no se pueden abrir. La consecuencia es una montaña creciente de basura electrónica, que es una de las mayores corrientes de residuos del mundo.",
        "Contra esto se forma un movimiento que exige un derecho a reparar. Sus partidarios piden que los fabricantes pongan a disposición repuestos e instrucciones durante cierto tiempo y que construyan los aparatos de modo que se puedan reemplazar piezas sueltas. En la Unión Europea ya hay primeras normas que extienden los plazos de garantía cuando un producto se repara en vez de reemplazarse y que hacen accesibles ciertos componentes a talleres independientes.",
        "En paralelo crece una cultura de reparar en comunidad. En los llamados Repair-Cafés se reúnen voluntarios que examinan aparatos rotos junto con sus dueños y muchas veces los ponen de nuevo en marcha. Estos encuentros no solo ahorran dinero y recursos, sino que transmiten conocimientos que en una sociedad descartable se perderían. Para muchos participantes, además, es una oportunidad para conocer a los vecinos.",
        "Los fabricantes ven el tema con más matices. Argumentan que los aparatos son cada vez más complejos y relevantes para la seguridad, y que las reparaciones inadecuadas traerían riesgos como incendios o pérdida de datos. Además, la presión de precios en la competencia sería tan alta que difícilmente se podrían pagar construcciones duraderas y reparables. Los defensores del consumidor replican que algunas empresas diseñan los productos a propósito para que fallen tras pocos años, algo difícil de probar.",
        "Más allá de quién tenga razón, se ve una tendencia: cada vez más gente se fija al comprar cuánto dura un aparato y si se puede reparar. Eso puede influir a largo plazo en la oferta. Que se logre superar la mentalidad de descarte depende, en última instancia, de que reparar sea más barato, más fácil y más natural que comprar de nuevo.",
      ],
      questions: [
        c("¿Por qué muchos compran uno nuevo en vez de reparar?", ["Repararlo suele ser más caro", "Los aparatos nunca se rompen", "No hay tiendas", "Está prohibido reparar"], "«Reparatur oft teurer als der Neukauf»."),
        c("¿Qué reclama el movimiento del derecho a reparar?", ["Repuestos, instrucciones y diseño reemplazable", "Prohibir los aparatos nuevos", "Bajar los impuestos", "Más talleres estatales"], "«Ersatzteile und Anleitungen ... austauschen»."),
        c("¿Qué hay en la Unión Europea al respecto?", ["Primeras normas que extienden garantías en reparaciones", "Una prohibición total", "Nada todavía", "Un impuesto"], "«erste Regeln ... Garantiezeiten»."),
        c("¿Qué son los Repair-Cafés?", ["Encuentros donde voluntarios ayudan a reparar", "Cafeterías con talleres pagos", "Tiendas de repuestos", "Escuelas de electrónica"], "«Freiwillige ... gemeinsam»."),
        c("¿Qué argumentan los fabricantes?", ["Que las reparaciones inadecuadas traen riesgos", "Que reparar es siempre más barato", "Que nadie quiere reparar", "Que no existen repuestos"], "«unsachgemäße Reparaturen ... Risiken»."),
        tf("Probar que una empresa diseña productos para que fallen es fácil.", false, "Es «nur schwer zu beweisen»."),
        c("¿Qué tendencia observan al final?", ["Más gente mira cuánto dura y si se repara un aparato", "Menos gente compra", "Todos reparan solos", "Los precios bajan"], "«achten ... darauf»."),
        tf("El texto concluye que el cambio depende de que reparar sea más fácil y barato.", true, "«günstiger, einfacher und selbstverständlicher»."),
      ],
    },
  },
  {
    id: "gentrifizierung", level: "B2", emoji: "🏘️", topic: "Cambios en los barrios",
    reading: {
      title: "Gentrifizierung: Aufwertung für wen?",
      text: [
        "Ein heruntergekommenes Viertel, billige Mieten, ein paar Künstler und Studenten, die es günstig und lebendig finden: So beginnt in vielen Großstädten ein Prozess, den Fachleute Gentrifizierung nennen. Mit der Zeit eröffnen Cafés, Galerien und Geschäfte, die Straßen werden sauberer, und das Viertel gilt plötzlich als angesagt. Wohlhabendere Menschen ziehen zu, Immobilien werden saniert und teurer verkauft, und die Mieten steigen.",
        "Für viele Alteingesessene hat das spürbare Folgen. Wer schon lange im Viertel wohnt, aber ein kleines Einkommen hat, kann sich die höhere Miete oft nicht mehr leisten und muss wegziehen. Mit den Bewohnern verschwinden auch vertraute Läden, Kneipen und Nachbarschaftsnetzwerke. Zurück bleibt ein Stadtteil, der zwar hübscher aussieht, aber seinen früheren Charakter verloren hat. Kritiker sprechen deshalb von Verdrängung, nicht von Aufwertung.",
        "Befürworter sehen das anders. Sie weisen darauf hin, dass Investitionen leerstehende Häuser wiederbeleben, die Kriminalität senken und neue Arbeitsplätze schaffen. Ein Viertel, das verfällt, helfe auch den bisherigen Bewohnern nicht. Außerdem lasse sich nicht jede Veränderung verhindern, denn Städte seien lebendige Gebilde, die sich ständig wandeln. Entscheidend sei, den Wandel so zu steuern, dass möglichst viele davon profitieren.",
        "Dafür gibt es verschiedene Instrumente. Manche Städte erlassen Milieuschutzsatzungen, die Luxussanierungen einschränken. Andere schreiben vor, dass bei Neubauten ein bestimmter Anteil der Wohnungen günstig vermietet werden muss, oder unterstützen Genossenschaften, die Häuser dauerhaft vom Markt nehmen. Die Wirkung dieser Maßnahmen ist allerdings begrenzt, solange insgesamt zu wenig gebaut wird und der Druck auf den Wohnungsmarkt steigt.",
        "Letztlich ist Gentrifizierung ein Beispiel dafür, wie Interessen aufeinandertreffen: der Wunsch nach Sicherheit und Stabilität auf der einen, der Wunsch nach Entwicklung und Rendite auf der anderen Seite. Eine Stadt, in der sich nur noch Gutverdiener ein Zuhause leisten können, verliert Vielfalt. Eine Stadt, die jede Veränderung blockiert, verliert Dynamik. Wie sich beides ausbalancieren lässt, bleibt eine der wichtigsten Fragen der Stadtpolitik.",
      ],
      translation: [
        "Un barrio venido a menos, alquileres baratos, unos artistas y estudiantes que lo encuentran económico y animado: así empieza en muchas grandes ciudades un proceso que los especialistas llaman gentrificación. Con el tiempo abren cafés, galerías y comercios, las calles se vuelven más limpias y el barrio pasa de repente a ser de moda. Se mudan personas más acomodadas, los inmuebles se renuevan y se venden más caros, y los alquileres suben.",
        "Para muchos vecinos de siempre, esto tiene consecuencias palpables. Quien vive hace mucho en el barrio pero tiene un ingreso bajo muchas veces ya no puede pagar el alquiler más alto y tiene que irse. Con los habitantes desaparecen también los negocios y bares conocidos y las redes de vecinos. Queda un barrio que se ve más lindo, pero que perdió su carácter anterior. Los críticos hablan por eso de desplazamiento, no de revalorización.",
        "Los partidarios lo ven distinto. Señalan que las inversiones reviven casas vacías, reducen la delincuencia y crean puestos de trabajo. Un barrio que se deteriora tampoco ayuda a los actuales habitantes. Además, no se puede impedir cualquier cambio, porque las ciudades son organismos vivos que cambian constantemente. Lo decisivo sería orientar el cambio para que la mayor cantidad de gente se beneficie.",
        "Para eso hay distintos instrumentos. Algunas ciudades dictan ordenanzas de protección del entorno social que limitan las renovaciones de lujo. Otras establecen que en las obras nuevas una cierta parte de los departamentos debe alquilarse a precios accesibles, o apoyan cooperativas que sacan casas del mercado de forma permanente. El efecto de estas medidas es, sin embargo, limitado mientras en total se construya poco y aumente la presión sobre el mercado de viviendas.",
        "En definitiva, la gentrificación es un ejemplo de cómo chocan los intereses: el deseo de seguridad y estabilidad por un lado, el de desarrollo y rentabilidad por el otro. Una ciudad donde solo quienes ganan bien pueden tener un hogar pierde diversidad. Una ciudad que bloquea todo cambio pierde dinamismo. Cómo equilibrar ambas cosas sigue siendo una de las preguntas más importantes de la política urbana.",
      ],
      questions: [
        c("¿Cómo suele empezar el proceso de gentrificación?", ["Con artistas y estudiantes en un barrio barato", "Con una gran empresa", "Con una ley", "Con un cierre de fábricas"], "«Künstler und Studenten»."),
        c("¿Qué consecuencia sufren los vecinos de bajos ingresos?", ["No pueden pagar el alquiler y deben irse", "Reciben subsidios", "Pasan a ser dueños", "Ganan más"], "«nicht mehr leisten ... wegziehen»."),
        c("¿Qué argumentan los partidarios?", ["Las inversiones reviven casas y reducen la delincuencia", "Los barrios no cambian", "Los alquileres bajan", "Nadie se muda"], "«Investitionen ... Kriminalität senken»."),
        c("¿Qué hacen las ordenanzas de protección del entorno social?", ["Limitan las renovaciones de lujo", "Prohíben las obras", "Suben los alquileres", "Cierran los comercios"], "«Luxussanierungen einschränken»."),
        tf("Según el texto, esas medidas resuelven el problema aunque se construya poco.", false, "«begrenzt, solange insgesamt zu wenig gebaut wird»."),
        c("¿Qué pierde una ciudad donde solo los que ganan bien pueden vivir?", ["Diversidad", "Dinamismo", "Turistas", "Seguridad"], "«verliert Vielfalt»."),
        c("¿Qué pierde una ciudad que bloquea todo cambio?", ["Dinamismo", "Diversidad", "Vecinos", "Impuestos"], "«verliert Dynamik»."),
        tf("El texto toma partido de forma clara por una sola posición.", false, "Presenta ambas posturas y plantea el equilibrio como pregunta abierta."),
      ],
    },
  },
];
