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
        "Für Familien bedeutet das eine Entscheidung im Alltag: Spricht man zu Hause die Herkunftssprache oder die Sprache des Landes? Fachleute raten meist dazu, dass jeder Elternteil konsequent seine eigene Sprache verwendet, damit die Kinder klare Vorbilder haben.",
      ],
      translation: [
        "Más de la mitad de la población mundial crece con al menos dos idiomas. Durante mucho tiempo el plurilingüismo en los chicos se consideró un riesgo: se temía que aprendieran peor los dos idiomas.",
        "Los estudios actuales muestran otro panorama. Los chicos bilingües, al principio, a veces mezclan los idiomas, pero eso es normal y una señal de que procesan los dos sistemas a la vez. Además parecen ser mejores para cambiar de tarea y controlar su atención.",
        "Lo decisivo es que los chicos escuchen los dos idiomas con regularidad y en distintas situaciones. Quien usa un idioma solo muy de vez en cuando lo pierde más fácil.",
        "También a los adultos les conviene aprender otro idioma. Lleva más tiempo, pero hay investigaciones que sugieren que así el cerebro se mantiene en forma por más tiempo.",
        "Para las familias eso significa una decisión cotidiana: ¿se habla en casa el idioma de origen o el del país? Los especialistas suelen aconsejar que cada madre o padre use de manera consecuente su propio idioma, para que los chicos tengan modelos claros.",
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
];
