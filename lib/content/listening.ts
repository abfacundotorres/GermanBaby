// Escuchas libres (/hoeren): monólogos de una voz y conversaciones de tres voces, de A2 a B2.
// Cada una se puede oír lenta, normal o rápida. Para sumar una, agregá una entrada.

import type { Dialogue, DialogueLine, ListenQuestion, Speaker } from "../curriculum.ts";

export type ListenLevel = "A2" | "B1" | "B2" | "C1";
export type ListenKind = "monolog" | "dreier";
export type ListenPiece = { id: string; level: ListenLevel; kind: ListenKind; emoji: string; topic: string; dialogue: Dialogue };

const L = (who: Speaker, name: string, de: string, es: string): DialogueLine => ({ who, name, de, es });
const c = (q: string, options: string[], why: string): ListenQuestion => ({ type: "choice", q, options, answer: options[0], why });
const tf = (q: string, answer: boolean, why: string): ListenQuestion => ({ type: "tf", q, answer, why });
const fi = (q: string, answers: string[], why: string): ListenQuestion => ({ type: "fill", q, answers, hint: "un número", why });

export const LISTENING: ListenPiece[] = [
  {
    id: "bahnhof", level: "A2", kind: "monolog", emoji: "🚉", topic: "Anuncio en la estación",
    dialogue: {
      title: "Durchsage am Bahnhof", setting: "Un anuncio por altoparlante en la estación",
      lines: [
        L("f", "Ansage", "Achtung auf Gleis vier! Der Regionalzug nach Salzburg hat zwanzig Minuten Verspätung.", "¡Atención en la vía cuatro! El tren regional a Salzburgo tiene veinte minutos de retraso."),
        L("f", "Ansage", "Grund dafür ist eine Störung an der Strecke. Wir bitten um Entschuldigung.", "El motivo es una falla en el trayecto. Pedimos disculpas."),
        L("f", "Ansage", "Der Zug fährt nicht um vierzehn Uhr dreißig, sondern erst um vierzehn Uhr fünfzig ab.", "El tren no sale a las 14:30, sino recién a las 14:50."),
        L("f", "Ansage", "Reisende nach Linz nehmen bitte den Zug auf Gleis sieben. Er fährt in fünf Minuten.", "Los pasajeros a Linz, por favor, tomen el tren de la vía siete. Sale en cinco minutos."),
        L("f", "Ansage", "Und noch ein Hinweis: Bitte lassen Sie Ihr Gepäck nicht allein. Vielen Dank!", "Y un aviso más: por favor, no dejen su equipaje solo. ¡Muchas gracias!"),
      ],
      questions: [
        fi("¿Cuántos minutos de retraso tiene el tren a Salzburgo?", ["20", "zwanzig"], "«zwanzig Minuten Verspätung»."),
        c("¿Por qué hay retraso?", ["Por una falla en el trayecto", "Por el clima", "Por una huelga", "Por un accidente de tránsito"], "«eine Störung an der Strecke»."),
        c("¿A qué hora sale ahora el tren a Salzburgo?", ["14:50", "14:30", "14:20", "15:00"], "«erst um vierzehn Uhr fünfzig»."),
        c("¿De qué vía sale el tren a Linz?", ["Vía 7", "Vía 4", "Vía 5", "Vía 1"], "«Gleis sieben»."),
        tf("Piden no dejar el equipaje solo.", true, "«Gepäck nicht allein lassen»."),
      ],
    },
  },
  {
    id: "wetter", level: "B1", kind: "monolog", emoji: "🌦️", topic: "Pronóstico del tiempo",
    dialogue: {
      title: "Der Wetterbericht", setting: "El pronóstico en la radio, a la mañana",
      lines: [
        L("m", "Sprecher", "Guten Morgen, liebe Hörerinnen und Hörer! Hier ist der Wetterbericht für das Wochenende.", "¡Buen día, queridos oyentes! Este es el pronóstico para el fin de semana."),
        L("m", "Sprecher", "Am Samstag ist es im Norden bewölkt, und im Laufe des Tages beginnt es zu regnen. Die Temperaturen liegen bei zwölf bis fünfzehn Grad.", "El sábado estará nublado en el norte, y durante el día empezará a llover. Las temperaturas estarán entre doce y quince grados."),
        L("m", "Sprecher", "Im Süden dagegen scheint die Sonne, und es wird mit bis zu zwanzig Grad deutlich wärmer. Nachmittags sind einzelne Gewitter möglich.", "En el sur, en cambio, brillará el sol y hará bastante más calor, hasta veinte grados. Por la tarde son posibles tormentas aisladas."),
        L("m", "Sprecher", "Am Sonntag zieht der Regen nach Osten, und es wird auch im Norden freundlicher. Der Wind bleibt jedoch stark, besonders an der Küste.", "El domingo la lluvia se desplaza hacia el este y mejora también en el norte. El viento, sin embargo, seguirá fuerte, sobre todo en la costa."),
        L("m", "Sprecher", "Wer eine Wanderung plant, sollte deshalb früh losgehen und eine Regenjacke einpacken. Das war der Wetterbericht. Bleiben Sie trocken!", "Quien planee una caminata debería salir temprano y llevar una campera impermeable. Eso fue el pronóstico. ¡Que no se mojen!"),
      ],
      questions: [
        c("¿Cómo está el sábado en el norte?", ["Nublado, con lluvia durante el día", "Soleado", "Con nieve", "Con niebla"], "«bewölkt ... beginnt es zu regnen»."),
        fi("¿Cuál es la temperatura máxima en el sur el sábado? (grados)", ["20", "zwanzig"], "«bis zu zwanzig Grad»."),
        tf("En el sur el sábado hay lluvia fuerte todo el día.", false, "Allí «scheint die Sonne»; solo hay tormentas aisladas."),
        c("¿Qué pasa el domingo con el viento?", ["Sigue fuerte, sobre todo en la costa", "Se calma", "Cambia al sur", "Trae nieve"], "«Der Wind bleibt jedoch stark»."),
        c("¿Qué recomiendan a quienes caminen?", ["Salir temprano y llevar una impermeable", "No salir", "Llevar abrigo de invierno", "Ir de noche"], "«früh losgehen ... Regenjacke»."),
      ],
    },
  },
  {
    id: "vortrag", level: "B2", kind: "monolog", emoji: "🎓", topic: "Conferencia sobre el sueño",
    dialogue: {
      title: "Warum wir schlafen", setting: "Un fragmento de una conferencia universitaria",
      lines: [
        L("f", "Professorin", "Meine Damen und Herren, wir verbringen etwa ein Drittel unseres Lebens im Schlaf, und trotzdem wissen wir erstaunlich wenig darüber.", "Señoras y señores, pasamos alrededor de un tercio de la vida durmiendo y, aun así, sabemos sorprendentemente poco al respecto."),
        L("f", "Professorin", "Früher nahm man an, das Gehirn ruhe sich im Schlaf einfach aus. Heute wissen wir, dass es in dieser Zeit hochaktiv ist.", "Antes se suponía que el cerebro simplemente descansaba durante el sueño. Hoy sabemos que en ese tiempo está muy activo."),
        L("f", "Professorin", "Besonders wichtig ist die Tiefschlafphase: Dort werden Erinnerungen gefestigt, und das Gehirn räumt gewissermaßen auf.", "Especialmente importante es la fase de sueño profundo: allí se consolidan los recuerdos y el cerebro, en cierto modo, ordena."),
        L("f", "Professorin", "Wer dauerhaft zu wenig schläft, riskiert nicht nur Konzentrationsprobleme, sondern auch ein höheres Risiko für Herzkrankheiten und Depressionen.", "Quien duerme poco de forma constante arriesga no solo problemas de concentración, sino también un mayor riesgo de enfermedades cardíacas y depresión."),
        L("f", "Professorin", "Dennoch ist die Empfehlung von acht Stunden nur ein Richtwert. Entscheidend ist, dass man sich morgens ausgeruht fühlt.", "Aun así, la recomendación de ocho horas es solo una referencia. Lo decisivo es sentirse descansado a la mañana."),
        L("f", "Professorin", "Abschließend möchte ich betonen: Schlaf ist keine verlorene Zeit, sondern eine Voraussetzung für Gesundheit und Leistungsfähigkeit. Vielen Dank für Ihre Aufmerksamkeit.", "Para terminar quiero subrayar: dormir no es tiempo perdido, sino una condición para la salud y el rendimiento. Muchas gracias por su atención."),
      ],
      questions: [
        c("¿Cuánto de la vida pasamos durmiendo?", ["Un tercio", "La mitad", "Un cuarto", "Un quinto"], "«ein Drittel unseres Lebens»."),
        tf("Hoy se piensa que el cerebro simplemente descansa mientras dormimos.", false, "Hoy se sabe que está «hochaktiv»."),
        c("¿Qué pasa en el sueño profundo?", ["Se consolidan recuerdos y el cerebro «ordena»", "Se sueña más", "Baja la temperatura del cuerpo", "El cerebro se apaga"], "«Erinnerungen gefestigt ... räumt auf»."),
        c("¿Qué riesgo menciona por dormir poco?", ["Mayor riesgo de enfermedades cardíacas y depresión", "Perder la voz", "Subir de peso siempre", "Perder el oído"], "«Herzkrankheiten und Depressionen»."),
        c("¿Cómo califica las ocho horas recomendadas?", ["Solo una referencia", "Una obligación", "Un error", "Un mínimo legal"], "«nur ein Richtwert»."),
      ],
    },
  },
  {
    id: "wg-abend", level: "A2", kind: "dreier", emoji: "🍝", topic: "Cena en el departamento compartido",
    dialogue: {
      title: "Wer kocht heute?", setting: "Tres compañeros de departamento organizan la cena",
      lines: [
        L("f", "Lena", "Hallo ihr zwei! Wer kocht heute Abend? Ich habe um sieben Uhr Hunger.", "¡Hola, ustedes dos! ¿Quién cocina esta noche? A las siete ya tengo hambre."),
        L("m", "Tom", "Ich kann nicht, ich muss bis sechs arbeiten. Aber ich kann Brot und Getränke kaufen.", "Yo no puedo, tengo que trabajar hasta las seis. Pero puedo comprar pan y bebidas."),
        L("m2", "Jonas", "Dann koche ich! Ich mache Nudeln mit Tomatensoße. Das ist schnell.", "¡Entonces cocino yo! Hago fideos con salsa de tomate. Es rápido."),
        L("f", "Lena", "Super! Aber wir haben keine Tomaten mehr. Und der Käse ist auch leer.", "¡Genial! Pero ya no tenemos tomates. Y el queso también se terminó."),
        L("m", "Tom", "Kein Problem, ich bringe alles mit. Brauchst du noch etwas, Jonas?", "No hay problema, traigo todo. ¿Necesitás algo más, Jonas?"),
        L("m2", "Jonas", "Ja, bitte eine Zwiebel und ein bisschen Salz.", "Sí, por favor una cebolla y un poco de sal."),
        L("f", "Lena", "Dann decke ich den Tisch. Um halb acht essen wir, okay?", "Entonces pongo la mesa. A las siete y media comemos, ¿sí?"),
        L("m", "Tom", "Perfekt. Bis später!", "Perfecto. ¡Hasta luego!"),
      ],
      questions: [
        c("¿Quién cocina?", ["Jonas", "Lena", "Tom", "Nadie"], "«Dann koche ich!» lo dice Jonas."),
        c("¿Qué va a comprar Tom?", ["Los ingredientes que faltan, pan y bebidas", "Una pizza", "Solo bebidas", "Nada"], "«Brot und Getränke» y «ich bringe alles mit»."),
        tf("Ya hay tomates en el departamento.", false, "«keine Tomaten mehr»."),
        c("¿Qué hace Lena?", ["Pone la mesa", "Cocina", "Compra el queso", "Lava los platos"], "«Dann decke ich den Tisch»."),
        c("¿A qué hora comen?", ["A las 19:30", "A las 19:00", "A las 20:00", "A las 18:30"], "«Um halb acht»."),
      ],
    },
  },
  {
    id: "buero", level: "B1", kind: "dreier", emoji: "🏢", topic: "Reunión de equipo",
    dialogue: {
      title: "Die Teambesprechung", setting: "Una jefa y dos colegas organizan un proyecto",
      lines: [
        L("f", "Frau Keller", "Guten Morgen zusammen. Wir müssen heute klären, wer die Präsentation für den Kunden übernimmt. Sie ist am Donnerstag.", "Buen día a todos. Hoy tenemos que definir quién se encarga de la presentación para el cliente. Es el jueves."),
        L("m", "Herr Brandt", "Ich würde das gern machen, aber ich bin bis Mittwoch auf einer Fortbildung. Es wäre knapp.", "A mí me gustaría hacerlo, pero estoy hasta el miércoles en una capacitación. Sería muy justo."),
        L("m2", "Herr Özdemir", "Ich kann sie vorbereiten, wenn mir jemand die Zahlen aus dem letzten Quartal gibt. Die habe ich noch nicht.", "Yo puedo prepararla, si alguien me da las cifras del último trimestre. Todavía no las tengo."),
        L("f", "Frau Keller", "Die Zahlen schicke ich Ihnen heute noch. Herr Brandt, könnten Sie wenigstens die Folien kontrollieren, wenn Sie zurück sind?", "Las cifras se las mando hoy mismo. Señor Brandt, ¿podría al menos revisar las diapositivas cuando vuelva?"),
        L("m", "Herr Brandt", "Das ist kein Problem. Ich schaue sie mir am Mittwochabend an und schicke meine Kommentare.", "No hay problema. Las miro el miércoles a la noche y mando mis comentarios."),
        L("m2", "Herr Özdemir", "Gut. Dann brauche ich noch einen Termin mit dem Kunden, um Fragen zu klären. Vielleicht Dienstag?", "Bien. Entonces necesito una cita con el cliente para aclarar preguntas. ¿Quizás el martes?"),
        L("f", "Frau Keller", "Ich rufe ihn gleich an. Wenn es am Dienstag nicht klappt, verschieben wir auf Mittwochvormittag. Danke Ihnen beiden.", "Lo llamo enseguida. Si el martes no funciona, lo pasamos al miércoles a la mañana. Gracias a los dos."),
      ],
      questions: [
        c("¿Cuándo es la presentación?", ["El jueves", "El martes", "El miércoles", "El viernes"], "«Sie ist am Donnerstag»."),
        c("¿Por qué no puede Herr Brandt prepararla?", ["Está en una capacitación hasta el miércoles", "Está enfermo", "Está de vacaciones", "No tiene tiempo por otro cliente"], "«bis Mittwoch auf einer Fortbildung»."),
        c("¿Qué necesita Herr Özdemir para prepararla?", ["Las cifras del último trimestre", "Más tiempo", "Un asistente", "Una computadora nueva"], "«die Zahlen aus dem letzten Quartal»."),
        c("¿Qué hará Herr Brandt?", ["Revisar las diapositivas y mandar comentarios", "Dar la presentación", "Llamar al cliente", "Nada"], "«schaue sie mir an und schicke meine Kommentare»."),
        c("¿Qué propone Frau Keller si el martes no funciona?", ["Pasar la cita al miércoles a la mañana", "Cancelar la presentación", "Hacerlo por mail", "Adelantar al lunes"], "«verschieben wir auf Mittwochvormittag»."),
      ],
    },
  },
  {
    id: "radio", level: "B2", kind: "dreier", emoji: "📻", topic: "Debate radial sobre el transporte",
    dialogue: {
      title: "Autofreie Innenstadt?", setting: "Una moderadora conduce un debate entre una concejal y un comerciante",
      lines: [
        L("f", "Moderatorin", "Willkommen zur Diskussion. Heute geht es um die Frage, ob die Innenstadt für Autos gesperrt werden soll. Frau Weber, Sie sind dafür.", "Bienvenidos al debate. Hoy se trata de si el centro debería cerrarse a los autos. Señora Weber, usted está a favor."),
        L("f2", "Frau Weber", "Ja, denn weniger Verkehr bedeutet weniger Lärm und bessere Luft. Städte wie Kopenhagen zeigen, dass das funktioniert, wenn man gleichzeitig den öffentlichen Nahverkehr ausbaut.", "Sí, porque menos tránsito significa menos ruido y mejor aire. Ciudades como Copenhague muestran que funciona, si al mismo tiempo se amplía el transporte público."),
        L("m", "Herr Lang", "Das klingt gut, aber für uns Einzelhändler ist es existenzbedrohend. Viele Kunden kommen mit dem Auto, besonders ältere Menschen. Wenn sie wegbleiben, müssen wir Personal entlassen.", "Suena bien, pero para nosotros, los comerciantes, es una amenaza para la existencia. Muchos clientes vienen en auto, sobre todo los mayores. Si dejan de venir, tendremos que despedir personal."),
        L("f", "Moderatorin", "Frau Weber, was entgegnen Sie auf diesen Einwand?", "Señora Weber, ¿qué responde a esta objeción?"),
        L("f2", "Frau Weber", "Studien zeigen das Gegenteil: Fußgängerzonen erhöhen meist die Umsätze, weil die Leute länger bleiben. Außerdem sollen Menschen mit Behinderung Ausnahmegenehmigungen bekommen.", "Los estudios muestran lo contrario: las zonas peatonales suelen aumentar las ventas, porque la gente se queda más tiempo. Además, las personas con discapacidad deberían recibir permisos especiales."),
        L("m", "Herr Lang", "Studien sind das eine, die Realität das andere. Ich würde einen Versuch von einem Jahr akzeptieren, aber nur, wenn die Parkhäuser am Rand günstiger werden.", "Los estudios son una cosa y la realidad otra. Yo aceptaría una prueba de un año, pero solo si los estacionamientos de las afueras se abaratan."),
        L("f2", "Frau Weber", "Das lässt sich verhandeln. Ein Pilotprojekt wäre ein vernünftiger Kompromiss.", "Eso se puede negociar. Un proyecto piloto sería un compromiso razonable."),
        L("f", "Moderatorin", "Das klingt nach einer ersten Annäherung. Vielen Dank Ihnen beiden.", "Eso suena a un primer acercamiento. Muchas gracias a los dos."),
      ],
      questions: [
        c("¿Qué argumento principal da Frau Weber?", ["Menos ruido y mejor aire", "Ahorro de dinero", "Más turismo", "Menos accidentes"], "«weniger Lärm und bessere Luft»."),
        c("¿Qué teme Herr Lang?", ["Perder clientes y tener que despedir personal", "Que suban los alquileres", "Más ruido", "Menos turistas"], "«Personal entlassen»."),
        c("¿Qué responde Frau Weber sobre las ventas?", ["Que las zonas peatonales suelen aumentarlas", "Que no importan", "Que bajarán poco", "Que el Estado compensará"], "«erhöhen meist die Umsätze»."),
        tf("Herr Lang rechaza cualquier prueba.", false, "Aceptaría «einen Versuch von einem Jahr»."),
        c("¿Con qué condición acepta Herr Lang la prueba?", ["Que los estacionamientos de las afueras sean más baratos", "Que no haya excepciones", "Que dure cinco años", "Que lo pague la ciudad"], "«wenn die Parkhäuser am Rand günstiger werden»."),
        c("¿Cómo termina el debate?", ["Con un posible proyecto piloto", "Sin acuerdo alguno", "Con una votación", "Con la prohibición total"], "«Ein Pilotprojekt wäre ein vernünftiger Kompromiss»."),
      ],
    },
  },
  {
    id: "wissenschaft-vertrauen", level: "C1", kind: "monolog", emoji: "🔬", topic: "Ciencia y confianza pública",
    dialogue: {
      title: "Warum Wissenschaft Vertrauen braucht", setting: "Un fragmento de una conferencia pública sobre comunicación científica",
      lines: [
        L("m", "Professor", "Meine Damen und Herren, wenn wir über das Vertrauen in die Wissenschaft sprechen, müssen wir zunächst ein verbreitetes Missverständnis ausräumen: Wissenschaft liefert keine endgültigen Wahrheiten, sondern die jeweils am besten belegten Erklärungen.", "Señoras y señores, cuando hablamos de la confianza en la ciencia, primero debemos disipar un malentendido muy difundido: la ciencia no entrega verdades definitivas, sino las explicaciones mejor respaldadas en cada momento."),
        L("m", "Professor", "Das ist keine Schwäche, sondern ihr Kernprinzip. Eine Aussage gilt so lange, bis sie widerlegt wird, und gerade diese Bereitschaft zur Selbstkorrektur unterscheidet wissenschaftliches Wissen von bloßer Überzeugung.", "Eso no es una debilidad, sino su principio central. Una afirmación vale hasta que se la refuta, y justamente esa disposición a corregirse distingue el conocimiento científico de la mera convicción."),
        L("m", "Professor", "In der öffentlichen Debatte wirkt dieselbe Eigenschaft jedoch oft verunsichernd. Wenn sich Empfehlungen im Laufe einer Krise ändern, entsteht schnell der Eindruck, die Experten wüssten nicht, wovon sie sprechen.", "En el debate público, sin embargo, esa misma característica suele generar inseguridad. Cuando las recomendaciones cambian en el curso de una crisis, enseguida surge la impresión de que los expertos no saben de qué hablan."),
        L("m", "Professor", "Hier liegt eine Verantwortung der Wissenschaftler selbst. Sie sollten Unsicherheiten nicht verschweigen, aber auch nicht so darstellen, dass ein Rest von Unwissen als völlige Ahnungslosigkeit erscheint.", "Aquí hay una responsabilidad de los propios científicos. No deberían ocultar las incertidumbres, pero tampoco presentarlas de modo que un resto de desconocimiento parezca total ignorancia."),
        L("m", "Professor", "Studien zeigen, dass Vertrauen vor allem dort entsteht, wo Forschende transparent arbeiten, ihre Interessen offenlegen und Fehler eingestehen. Das Gegenteil, nämlich überzogene Gewissheit, zerstört Glaubwürdigkeit nachhaltiger als jeder Irrtum.", "Los estudios muestran que la confianza surge sobre todo donde los investigadores trabajan con transparencia, declaran sus intereses y admiten errores. Lo contrario, es decir, la certeza exagerada, destruye la credibilidad de forma más duradera que cualquier error."),
        L("m", "Professor", "Zugleich darf die Gesellschaft nicht erwarten, dass Wissenschaft ihr politische Entscheidungen abnimmt. Sie kann Folgen abschätzen, aber nicht vorgeben, welche Ziele wir verfolgen sollen. Diese Abwägung bleibt Sache der Demokratie.", "Al mismo tiempo, la sociedad no debe esperar que la ciencia le quite las decisiones políticas. Puede estimar consecuencias, pero no fijar qué objetivos debemos perseguir. Esa ponderación sigue siendo asunto de la democracia."),
        L("m", "Professor", "Ich möchte daher mit einem Appell schließen: Wer Wissenschaft ernst nimmt, sollte sie weder als Orakel verehren noch als Meinung unter vielen abtun. Er sollte sie als einen Prozess verstehen, der Fehler korrigiert und uns deshalb im Laufe der Zeit verlässlich weiterbringt.", "Quiero por eso terminar con un llamado: quien toma en serio la ciencia no debería venerarla como un oráculo ni descartarla como una opinión entre muchas. Debería entenderla como un proceso que corrige errores y que, por eso, con el tiempo nos hace avanzar de manera confiable."),
      ],
      questions: [
        c("¿Qué malentendido quiere disipar el profesor?", ["Que la ciencia entrega verdades definitivas", "Que la ciencia es cara", "Que la ciencia no se corrige", "Que los científicos mienten"], "«keine endgültigen Wahrheiten»."),
        c("¿Qué distingue al conocimiento científico de la convicción?", ["La disposición a corregirse", "El uso de datos", "La edad de las teorías", "El prestigio de los autores"], "«Bereitschaft zur Selbstkorrektur»."),
        c("¿Por qué genera inseguridad que cambien las recomendaciones?", ["Parece que los expertos no saben de qué hablan", "Porque son más caras", "Porque son ilegales", "Porque nadie las lee"], "«wüssten nicht, wovon sie sprechen»."),
        c("¿Qué daña más la credibilidad según los estudios?", ["La certeza exagerada", "Admitir errores", "La transparencia", "Declarar intereses"], "«überzogene Gewissheit»."),
        c("¿Qué no debería esperar la sociedad de la ciencia?", ["Que le quite las decisiones políticas", "Que estime consecuencias", "Que corrija errores", "Que investigue"], "«politische Entscheidungen abnimmt»."),
        c("¿Cómo propone entender la ciencia al final?", ["Como un proceso que corrige errores", "Como un oráculo", "Como una opinión más", "Como un negocio"], "«Prozess, der Fehler korrigiert»."),
      ],
    },
  },
  {
    id: "gentechnik-debatte", level: "C1", kind: "dreier", emoji: "🌾", topic: "Debate sobre biotecnología agrícola",
    dialogue: {
      title: "Gentechnik auf dem Acker?", setting: "Una moderadora conduce un debate entre un genetista y una agricultora orgánica",
      lines: [
        L("f", "Moderatorin", "Guten Abend. Heute diskutieren wir, ob gentechnisch veränderte Pflanzen in der europäischen Landwirtschaft erlaubt werden sollten. Herr Dr. Brandt, Sie plädieren dafür.", "Buenas noches. Hoy discutimos si las plantas modificadas genéticamente deberían permitirse en la agricultura europea. Doctor Brandt, usted está a favor."),
        L("m", "Dr. Brandt", "Ja, weil neue Züchtungstechniken Pflanzen hervorbringen können, die Dürre oder Schädlinge besser überstehen und damit weniger Pestizide benötigen. Das ist angesichts des Klimawandels kein Luxus, sondern eine Chance.", "Sí, porque las nuevas técnicas de cría pueden producir plantas que soportan mejor la sequía o las plagas y por lo tanto necesitan menos pesticidas. Frente al cambio climático eso no es un lujo, sino una oportunidad."),
        L("f2", "Frau Sommer", "Ich halte das für kurzsichtig. Viele dieser Versprechen haben sich in der Praxis nicht erfüllt, und die Patente liegen bei wenigen Konzernen. Wir Landwirte würden uns in eine Abhängigkeit begeben, aus der wir kaum noch herauskämen.", "Yo lo considero cortoplacista. Muchas de esas promesas no se cumplieron en la práctica y las patentes están en manos de pocas corporaciones. Los agricultores nos pondríamos en una dependencia de la que apenas podríamos salir."),
        L("m", "Dr. Brandt", "Das Patentproblem ist real, aber es lässt sich politisch regeln, etwa durch öffentliche Forschung. Die Technik an sich ist nicht das Problem. Die Sicherheit der Pflanzen wird in mehrjährigen Verfahren geprüft.", "El problema de las patentes es real, pero puede regularse políticamente, por ejemplo con investigación pública. La técnica en sí no es el problema. La seguridad de las plantas se verifica en procedimientos de varios años."),
        L("f2", "Frau Sommer", "Geprüft wird, was man vorher zu prüfen weiß. Ich fürchte vor allem langfristige Folgen für die Artenvielfalt. Pollen kennt keine Feldgrenzen, und wer ökologisch wirtschaftet, riskiert, dass seine Ernte verunreinigt wird.", "Se verifica lo que se sabe de antemano que hay que verificar. Lo que más temo son las consecuencias a largo plazo para la biodiversidad. El polen no conoce los límites de los campos, y quien produce de forma orgánica corre el riesgo de que su cosecha se contamine."),
        L("f", "Moderatorin", "Herr Brandt, wie lässt sich das verhindern?", "Doctor Brandt, ¿cómo puede evitarse eso?"),
        L("m", "Dr. Brandt", "Durch Pufferzonen und klare Haftungsregeln: Wer Schaden verursacht, muss ihn ersetzen. Außerdem sollten wir differenzieren. Eine Pflanze, die mit einer präzisen Methode einen Gendefekt repariert, ist etwas anderes als ein Eingriff, der fremde Gene einbaut.", "Con zonas de amortiguación y reglas claras de responsabilidad: quien causa daño debe repararlo. Además deberíamos diferenciar. Una planta a la que se le corrige un defecto genético con un método preciso es algo distinto de una intervención que incorpora genes ajenos."),
        L("f2", "Frau Sommer", "Diese Unterscheidung ist wichtig, da stimme ich zu. Ich würde mir wünschen, dass wir zuerst die Alternativen ausschöpfen: andere Fruchtfolgen, robustere alte Sorten, weniger Verschwendung. Erst danach sollten wir über neue Eingriffe reden.", "Esa distinción es importante, en eso estoy de acuerdo. Me gustaría que primero agotáramos las alternativas: otras rotaciones de cultivos, variedades antiguas más robustas, menos desperdicio. Recién después deberíamos hablar de nuevas intervenciones."),
      ],
      questions: [
        c("¿Qué argumento principal da el genetista a favor?", ["Plantas que resisten mejor sequía y plagas y requieren menos pesticidas", "Plantas más baratas de transportar", "Mayor sabor", "Menos trabajo para los agricultores"], "«Dürre oder Schädlinge ... weniger Pestizide»."),
        c("¿Qué teme la agricultora respecto de los agricultores?", ["Quedar en dependencia de pocas corporaciones con patentes", "Perder los subsidios", "Tener que usar más agua", "No poder exportar"], "«Patente ... wenige Konzerne ... Abhängigkeit»."),
        c("¿Cómo propone el genetista resolver el problema de las patentes?", ["Con regulación política e investigación pública", "Eliminando la técnica", "Con más impuestos", "No lo considera un problema"], "«politisch regeln ... öffentliche Forschung»."),
        c("¿Qué riesgo concreto menciona la agricultora?", ["Que el polen contamine la cosecha orgánica", "Que suba el precio de las semillas", "Que falten trabajadores", "Que caiga la producción"], "«Pollen kennt keine Feldgrenzen»."),
        c("¿Qué distinción introduce el genetista?", ["Entre corregir un defecto genético con precisión y agregar genes ajenos", "Entre campos grandes y chicos", "Entre plantas de verano e invierno", "Entre semillas caras y baratas"], "«Gendefekt repariert ... fremde Gene»."),
        c("¿Qué pide la agricultora antes de recurrir a nuevas intervenciones?", ["Agotar alternativas como otras rotaciones y variedades antiguas", "Más investigación privada", "Prohibir los pesticidas ya", "Importar más alimentos"], "«Alternativen ausschöpfen»."),
      ],
    },
  },
];
