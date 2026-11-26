// Entrenador de vocabulario: palabras muy frecuentes, en orden de aparición, que el currículo no enseña como palabra suelta.
// Formato por línea: alemán | español | ejemplo | traducción del ejemplo. Los sustantivos llevan artículo.
// Se estudian de a 10 (app/words) y entran al repaso espaciado. Una línea «## A1» (o A2, B1, B2, C1) fija el nivel de las que siguen; las tandas se ordenan por nivel.

import type { Vocab } from "../curriculum.ts";

const RAW = `
## A1
das Restaurant|el restaurante|Das Restaurant ist sehr gut.|El restaurante es muy bueno.
## A2
## B1
sich kümmern|ocuparse|Wir kümmern uns um die Kinder.|Nos ocupamos de los chicos.
verbinden|conectar / unir|Die Brücke verbindet zwei Städte.|El puente une dos ciudades.
verändern|cambiar (transformar)|Die Reise hat mich verändert.|El viaje me cambió.
verbessern|mejorar|Wir wollen unser Deutsch verbessern.|Queremos mejorar nuestro alemán.
entwickeln|desarrollar|Die Firma will ein neues Gerät entwickeln.|La empresa quiere desarrollar un aparato nuevo.
ermöglichen|hacer posible|Das Stipendium ermöglicht ihm das Studium.|La beca le hace posible estudiar.
erwarten|esperar (algo)|Wir erwarten viele Gäste.|Esperamos muchos invitados.
folgen|seguir|Bitte folgen Sie mir.|Por favor, sígame.
fordern|exigir|Die Leute fordern bessere Preise.|La gente exige mejores precios.
führen|llevar / conducir|Dieser Weg führt zum See.|Este camino lleva al lago.
gehören|pertenecer|Das Haus gehört meinem Onkel.|La casa es de mi tío.
handeln|actuar / tratar de|Der Film handelt von einer Familie.|La película trata de una familia.
klären|aclarar|Wir müssen das klären.|Tenemos que aclarar eso.
lösen|resolver / soltar|Wir lösen das Problem zusammen.|Resolvemos el problema juntos.
nutzen|aprovechar / usar|Wir nutzen die Zeit gut.|Aprovechamos bien el tiempo.
reichen|alcanzar / ser suficiente|Zehn Euro reichen nicht.|Diez euros no alcanzan.
sorgen|ocuparse / preocupar|Wir sorgen für das Essen.|Nos ocupamos de la comida.
teilen|compartir / dividir|Wir teilen das Zimmer.|Compartimos el cuarto.
verstecken|esconder|Wir verstecken das Geschenk.|Escondemos el regalo.
verwenden|utilizar|Wir verwenden nur frische Zutaten.|Usamos solo ingredientes frescos.
der Bereich|el área / el ámbito|In diesem Bereich arbeite ich gern.|En este ámbito trabajo con gusto.
der Eindruck|la impresión|Ich habe einen guten Eindruck.|Tengo una buena impresión.
der Ersatz|el reemplazo|Wir brauchen Ersatz für den Kollegen.|Necesitamos un reemplazo para el colega.
der Hintergrund|el trasfondo / el fondo|Im Hintergrund läuft Musik.|De fondo suena música.
das Interesse|el interés|Ich habe großes Interesse an Musik.|Tengo mucho interés por la música.
der Kontakt|el contacto|Wir haben guten Kontakt.|Tenemos buen contacto.
das Modell|el modelo|Das Modell ist neu.|El modelo es nuevo.
der Raum|el espacio / la sala|Der Raum ist zu klein.|La sala es demasiado chica.
die Reaktion|la reacción|Seine Reaktion war schnell.|Su reacción fue rápida.
die Rolle|el papel|Das spielt keine große Rolle.|Eso no tiene gran importancia.
der Verlauf|el desarrollo / el transcurso|Im Verlauf des Tages wird es kälter.|Durante el día se pone más frío.
die Vorbereitung|la preparación|Die Vorbereitung dauert lange.|La preparación lleva tiempo.
der Widerspruch|la contradicción|Das ist ein Widerspruch.|Eso es una contradicción.
der Zweck|el propósito / la finalidad|Was ist der Zweck davon?|¿Cuál es el propósito de eso?
der Zufall|la casualidad|Das war reiner Zufall.|Fue pura casualidad.
die Wahrheit|la verdad|Sag mir die Wahrheit.|Decime la verdad.
die Lüge|la mentira|Das ist eine Lüge.|Eso es una mentira.
abhängig|dependiente|Er ist von seinen Eltern abhängig.|Depende de sus padres.
aktuell|actual|Das sind die aktuellen Zahlen.|Esos son los números actuales.
allgemein|general|Das ist allgemein bekannt.|Eso es de conocimiento general.
ausreichend|suficiente|Das Geld ist nicht ausreichend.|La plata no es suficiente.
bereit|listo / dispuesto|Wir sind bereit.|Estamos listos.
dringend|urgente|Das ist dringend.|Eso es urgente.
eindeutig|inequívoco|Die Antwort ist eindeutig.|La respuesta es inequívoca.
einzeln|individual|Wir zahlen einzeln.|Pagamos por separado.
endgültig|definitivo|Das ist meine endgültige Entscheidung.|Esa es mi decisión definitiva.
gemeinsam|en común / juntos|Wir haben viel gemeinsam.|Tenemos mucho en común.
gerecht|justo|Das ist nicht gerecht.|Eso no es justo.
gewöhnlich|habitual|Gewöhnlich stehe ich um sieben auf.|Habitualmente me levanto a las siete.
kritisch|crítico|Er ist sehr kritisch.|Es muy crítico.
kurzfristig|a corto plazo|Das geht nur kurzfristig.|Eso solo funciona a corto plazo.
langfristig|a largo plazo|Wir planen langfristig.|Planificamos a largo plazo.
sorgfältig|cuidadoso|Er arbeitet sehr sorgfältig.|Trabaja con mucho cuidado.
spürbar|perceptible|Die Veränderung ist spürbar.|El cambio se nota.
verschieden|distinto / diverso|Wir haben verschiedene Meinungen.|Tenemos opiniones distintas.
verständlich|comprensible|Das ist gut verständlich.|Eso es fácil de entender.
vollständig|completo|Die Liste ist vollständig.|La lista está completa.
wesentlich|esencial|Das ist ein wesentlicher Punkt.|Es un punto esencial.
zufrieden|conforme|Wir sind sehr zufrieden.|Estamos muy conformes.
außerhalb|fuera de|Außerhalb der Stadt ist es ruhiger.|Fuera de la ciudad hay más tranquilidad.
bereits|ya (formal)|Ich habe es bereits gelesen.|Ya lo leí.
gerade|justo ahora|Ich esse gerade.|Estoy comiendo ahora mismo.
ansehen|mirar / ver|Wir wollen uns die Stadt ansehen.|Queremos ver la ciudad.
ausprobieren|probar|Ich möchte das neue Programm ausprobieren.|Quiero probar el programa nuevo.
aufhören|dejar de / terminar|Wir müssen mit dem Rauchen aufhören.|Tenemos que dejar de fumar.
aufgeben|rendirse / abandonar|Wir wollen nicht aufgeben.|No queremos rendirnos.
auffallen|llamar la atención|Der Fehler soll niemandem auffallen.|El error no tiene que llamarle la atención a nadie.
ausgehen|salir (de noche)|Wir wollen am Samstag ausgehen.|Queremos salir el sábado.
begegnen|encontrarse con|Wir sind uns zufällig begegnet.|Nos encontramos por casualidad.
begrüßen|saludar / dar la bienvenida|Wir begrüßen alle Gäste.|Damos la bienvenida a todos los invitados.
benachrichtigen|avisar|Wir müssen den Chef benachrichtigen.|Tenemos que avisarle al jefe.
beraten|asesorar|Wir beraten Sie gern.|Lo asesoramos con gusto.
besitzen|poseer|Wir besitzen kein Auto.|No tenemos auto.
bewegen|mover|Wir müssen uns mehr bewegen.|Tenemos que movernos más.
bieten|ofrecer / brindar|Die Stadt bietet viel Kultur.|La ciudad ofrece mucha cultura.
bilden|formar|Wir bilden eine Gruppe.|Formamos un grupo.
einrichten|amoblar / instalar|Wir möchten die Wohnung einrichten.|Queremos amoblar el departamento.
einsetzen|usar / emplear|Wir wollen mehr Personal einsetzen.|Queremos emplear más personal.
entfernen|quitar|Wir müssen den Fleck entfernen.|Tenemos que sacar la mancha.
erleben|vivir (una experiencia)|Wir wollen etwas Neues erleben.|Queremos vivir algo nuevo.
erstellen|elaborar|Wir erstellen eine Liste.|Elaboramos una lista.
fördern|fomentar / apoyar|Wir wollen Kinder fördern.|Queremos apoyar a los chicos.
gebrauchen|usar / necesitar|Das können wir gut gebrauchen.|Eso nos viene muy bien.
geraten|caer en / salir (bien o mal)|Wir geraten in große Schwierigkeiten.|Caemos en grandes dificultades.
leiten|dirigir|Sie soll das Projekt leiten.|Ella va a dirigir el proyecto.
prüfen|verificar / examinar|Wir prüfen den Vertrag.|Revisamos el contrato.
schätzen|apreciar / estimar|Wir schätzen deine Hilfe.|Apreciamos tu ayuda.
schweigen|callarse|Wir wollen nicht schweigen.|No queremos callarnos.
sichern|asegurar|Wir sichern die Daten.|Resguardamos los datos.
stimmen|ser correcto / votar|Die Zahlen stimmen nicht.|Los números no son correctos.
tauschen|cambiar (trocar)|Wir tauschen die Plätze.|Cambiamos los lugares.
transportieren|transportar|Wir transportieren die Möbel.|Transportamos los muebles.
trennen|separar|Wir trennen den Müll.|Separamos la basura.
übertreiben|exagerar|Wir wollen nicht übertreiben.|No queremos exagerar.
unterbrechen|interrumpir|Wir wollen Sie nicht unterbrechen.|No lo queremos interrumpir.
sich unterscheiden|diferenciarse|Die beiden Städte unterscheiden sich stark.|Las dos ciudades se diferencian mucho.
verfolgen|seguir / perseguir|Wir verfolgen die Nachrichten.|Seguimos las noticias.
verlängern|prolongar / renovar|Wir müssen den Vertrag verlängern.|Tenemos que renovar el contrato.
versichern|asegurar / afirmar|Wir versichern Ihnen das.|Se lo aseguramos.
vorkommen|ocurrir / parecer|Das kann oft vorkommen.|Eso puede ocurrir seguido.
wiederholen|repetir|Wir müssen den Test wiederholen.|Tenemos que repetir la prueba.
wirken|parecer / hacer efecto|Die Tabletten wirken schnell.|Las pastillas hacen efecto rápido.
zusammenhängen|estar relacionado|Das könnte damit zusammenhängen.|Eso podría estar relacionado.
die Technik|la técnica|Die Technik ist sehr modern.|La técnica es muy moderna.
beliebt|popular / querido|Das Café ist sehr beliebt.|El café es muy popular.
eigen|propio|Ich habe ein eigenes Zimmer.|Tengo una habitación propia.
einzig|único|Das ist die einzige Lösung.|Esa es la única solución.
entsprechend|correspondiente|Wir brauchen die entsprechenden Unterlagen.|Necesitamos la documentación correspondiente.
freiwillig|voluntario|Die Teilnahme ist freiwillig.|La participación es voluntaria.
geeignet|adecuado|Das Haus ist gut geeignet.|La casa es muy adecuada.
gesamt|total|Die gesamte Familie kommt.|Viene toda la familia.
mäßig|moderado|Er isst nur mäßig.|Come con moderación.
modern|moderno|Das Haus ist sehr modern.|La casa es muy moderna.
nachdenklich|pensativo|Er ist sehr nachdenklich.|Está muy pensativo.
riesig|enorme|Die Stadt ist riesig.|La ciudad es enorme.
streng|estricto|Der Lehrer ist streng.|El docente es estricto.
übrig|restante|Es ist noch etwas Kuchen übrig.|Todavía queda algo de torta.
unterschiedlich|diferente|Die Meinungen sind unterschiedlich.|Las opiniones son diferentes.
verschlossen|cerrado con llave / reservado|Die Tür ist verschlossen.|La puerta está cerrada con llave.
zahlreich|numeroso|Zahlreiche Gäste sind gekommen.|Vinieron numerosos invitados.
zufällig|casual|Wir haben uns zufällig getroffen.|Nos encontramos por casualidad.
zusätzlich|adicional|Wir brauchen zusätzliche Zeit.|Necesitamos tiempo adicional.
die Vorstellung|la idea / la función|Ich habe keine Vorstellung davon.|No tengo idea de eso.
die Kenntnis|el conocimiento|Er hat gute Kenntnisse in Mathe.|Tiene buenos conocimientos de matemática.
abhängen|depender|Das kann vom Wetter abhängen.|Eso puede depender del clima.
verantwortlich|responsable|Wer ist dafür verantwortlich?|¿Quién es responsable de eso?
die Einrichtung|el mobiliario / la institución|Die Einrichtung der Wohnung ist modern.|El mobiliario del departamento es moderno.
die Freiwilligkeit|el carácter voluntario|Die Teilnahme beruht auf Freiwilligkeit.|La participación es de carácter voluntario.
der Rentner|el jubilado|Mein Onkel ist seit zwei Jahren Rentner.|Mi tío es jubilado desde hace dos años.
der Schritt|el paso|Das ist ein wichtiger Schritt.|Es un paso importante.
der Tipp|el consejo|Hast du einen Tipp für mich?|¿Tenés un consejo para mí?
der Vorgang|el proceso|Der Vorgang dauert nur wenige Minuten.|El proceso dura solo unos minutos.
das Ende|el final|Am Ende war alles gut.|Al final todo salió bien.
das Lebensmittel|el alimento|Lebensmittel sind teurer geworden.|Los alimentos se encarecieron.
das Umfeld|el entorno|Ein gutes Umfeld hilft beim Lernen.|Un buen entorno ayuda a aprender.
befinden|encontrarse|Das Hotel befindet sich im Zentrum.|El hotel se encuentra en el centro.
eignen|ser apto|Dieses Messer eignet sich nicht für Brot.|Este cuchillo no sirve para el pan.
entstehen|surgir|Hier entsteht ein neues Viertel.|Aquí surge un barrio nuevo.
ermitteln|averiguar|Die Polizei muss den Täter ermitteln.|La policía debe identificar al culpable.
gestalten|diseñar / organizar|Sie gestaltet den Garten selbst.|Ella diseña el jardín ella misma.
lohnen|valer la pena|Der Ausflug lohnt sich.|La excursión vale la pena.
raten|aconsejar|Ich rate dir, früh zu kommen.|Te aconsejo venir temprano.
verwandeln|transformar|Der Regen verwandelt die Straße in einen Fluss.|La lluvia transforma la calle en un río.
vorstellen|presentar / imaginar|Darf ich Ihnen meinen Kollegen vorstellen?|¿Puedo presentarle a mi colega?
zurechtkommen|arreglárselas|Ich will allein gut zurechtkommen.|Quiero arreglármelas bien solo.
arbeitslos|desempleado|Er war ein Jahr lang arbeitslos.|Estuvo desempleado un año.
ausländisch|extranjero|Wir haben ausländische Gäste.|Tenemos invitados extranjeros.
befreundet|amigo|Wir sind seit Jahren befreundet.|Somos amigos desde hace años.
behindert|con discapacidad|Der Eingang ist für behinderte Menschen geeignet.|La entrada es apta para personas con discapacidad.
beschäftigt|ocupado|Ich bin heute sehr beschäftigt.|Hoy estoy muy ocupado.
durchschnittlich|promedio|Die durchschnittliche Miete liegt bei 800 Euro.|El alquiler promedio es de 800 euros.
erlaubt|permitido|Rauchen ist hier nicht erlaubt.|Aquí no está permitido fumar.
gleichberechtigt|con igualdad de derechos|Frauen und Männer sind gleichberechtigt.|Mujeres y hombres tienen los mismos derechos.
heimlich|a escondidas|Sie hat heimlich geweint.|Lloró a escondidas.
rechtzeitig|a tiempo|Wir sind rechtzeitig angekommen.|Llegamos a tiempo.
reif|maduro|Die Äpfel sind schon reif.|Las manzanas ya están maduras.
üblich|habitual|Das ist hier so üblich.|Acá es lo habitual.
unbedingt|sin falta|Du musst unbedingt kommen.|Tenés que venir sin falta.
ungewöhnlich|inusual|Das ist ein ungewöhnlicher Name.|Es un nombre inusual.
unterwegs|en camino|Wir sind noch unterwegs.|Todavía estamos en camino.
vernünftig|sensato|Das ist ein vernünftiger Plan.|Es un plan sensato.
vorbereitet|preparado|Ich bin gut vorbereitet.|Estoy bien preparado.
die Gebrauchsanweisung|el manual de uso|Lies bitte die Gebrauchsanweisung.|Leé por favor el manual de uso.
die Lücke|el hueco / la laguna|In meinem Wissen gibt es noch Lücken.|En mi conocimiento todavía hay lagunas.
die Mischung|la mezcla|Das ist eine gute Mischung aus Sport und Kultur.|Es una buena mezcla de deporte y cultura.
das Kapitel|el capítulo|Das letzte Kapitel ist spannend.|El último capítulo es emocionante.
das Netz|la red|Das Netz ist heute langsam.|La red está lenta hoy.
bemühen|esforzarse|Ich werde mich bemühen, pünktlich zu sein.|Voy a esforzarme por ser puntual.
beneiden|envidiar|Ich beneide dich um deine Ruhe.|Te envidio por tu calma.
drucken|imprimir|Ich muss das Formular drucken.|Tengo que imprimir el formulario.
entfallen|quedar sin efecto|Der Termin kann leider entfallen.|La cita lamentablemente puede quedar sin efecto.
nützen|servir / ser útil|Das kann uns nützen.|Eso nos puede servir.
recherchieren|investigar|Ich muss im Internet recherchieren.|Tengo que investigar en internet.
schalten|cambiar (marcha, canal)|Du musst in den zweiten Gang schalten.|Tenés que cambiar a segunda.
vererben|dejar en herencia|Sie will das Haus ihrer Tochter vererben.|Quiere dejarle la casa en herencia a su hija.
zusagen|aceptar (una invitación)|Ich möchte für den Termin zusagen.|Quiero confirmar mi asistencia a la cita.
blass|pálido|Du siehst heute sehr blass aus.|Hoy te ves muy pálido.
blind|ciego|Er ist auf einem Auge blind.|Es ciego de un ojo.
dicht|denso / hermético|Der Nebel ist sehr dicht.|La niebla es muy densa.
grob|grosero / tosco|Er war sehr grob zu mir.|Fue muy grosero conmigo.
kräftig|fuerte|Er hat kräftige Arme.|Tiene brazos fuertes.
mager|flaco / magro|Das Fleisch ist sehr mager.|La carne es muy magra.
spitz|puntiagudo|Das Messer ist sehr spitz.|El cuchillo es muy puntiagudo.
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
die Berücksichtigung|la consideración|Unter Berücksichtigung aller Faktoren entscheiden wir.|Decidimos tomando en cuenta todos los factores.
die Debatte|el debate|Die Debatte war sehr lebhaft.|El debate fue muy animado.
die Schlussfolgerung|la conclusión|Die Schlussfolgerung ist logisch.|La conclusión es lógica.
die Vermutung|la suposición|Das ist nur eine Vermutung.|Es solo una suposición.
die Sorgfalt|el esmero|Er arbeitet mit großer Sorgfalt.|Trabaja con mucho esmero.
die Befugnis|la facultad|Er hat dazu keine Befugnis.|No tiene facultad para eso.
der Bestandteil|el componente|Das ist ein wichtiger Bestandteil.|Es un componente importante.
der Maßstab|el criterio / la escala|Das ist kein guter Maßstab.|No es un buen criterio.
der Missbrauch|el abuso|Missbrauch muss bestraft werden.|El abuso debe ser castigado.
der Rückgang|el descenso|Der Rückgang ist deutlich.|El descenso es evidente.
der Zeitpunkt|el momento|Der Zeitpunkt ist ungünstig.|El momento es desfavorable.
der Zustand|el estado|Der Zustand des Patienten ist stabil.|El estado del paciente es estable.
das Dilemma|el dilema|Wir stehen vor einem Dilemma.|Estamos ante un dilema.
das Phänomen|el fenómeno|Das ist ein neues Phänomen.|Es un fenómeno nuevo.
das Wesen|la esencia / el ser|Das liegt im Wesen der Sache.|Eso está en la esencia del asunto.
andeuten|insinuar|Er wollte etwas andeuten.|Quería insinuar algo.
beanspruchen|reclamar / requerir|Er will das Recht beanspruchen.|Quiere reclamar el derecho.
beeinträchtigen|perjudicar|Lärm beeinträchtigt den Schlaf.|El ruido perjudica el sueño.
einschränken|limitar|Man muss die Kosten einschränken.|Hay que limitar los costos.
entgegenwirken|contrarrestar|Wir wollen dem Trend entgegenwirken.|Queremos contrarrestar la tendencia.
unterstellen|atribuir / suponer|Man unterstellt ihm böse Absichten.|Se le atribuyen malas intenciones.
zurückgehen|disminuir|Die Zahlen können zurückgehen.|Las cifras pueden disminuir.
auffällig|llamativo|Sein Verhalten ist auffällig.|Su comportamiento es llamativo.
bedeutsam|significativo|Das ist ein bedeutsamer Schritt.|Es un paso significativo.
hinreichend|suficiente|Die Beweise sind nicht hinreichend.|Las pruebas no son suficientes.
nachhaltig|sostenible|Wir suchen eine nachhaltige Lösung.|Buscamos una solución sostenible.
rechtmäßig|legítimo|Das ist ein rechtmäßiger Anspruch.|Es un derecho legítimo.
vergleichbar|comparable|Die Fälle sind nicht vergleichbar.|Los casos no son comparables.
vorrangig|prioritario|Das ist vorrangig zu behandeln.|Eso debe tratarse con prioridad.
zwangsläufig|por fuerza|Das führt zwangsläufig zu Problemen.|Eso lleva por fuerza a problemas.
die Abgrenzung|la delimitación|Die Abgrenzung der beiden Begriffe fällt schwer.|Delimitar los dos conceptos cuesta.
die Abschreckung|la disuasión|Hohe Strafen dienen der Abschreckung.|Las penas altas sirven para disuadir.
die Akzeptanz|la aceptación|Die Akzeptanz neuer Regeln braucht Zeit.|La aceptación de nuevas reglas lleva tiempo.
die Alternative|la alternativa|Es gibt keine echte Alternative.|No hay una alternativa real.
die Analyse|el análisis|Die Analyse zeigt klare Ergebnisse.|El análisis muestra resultados claros.
die Anerkennung|el reconocimiento|Sie bekam viel Anerkennung für ihre Arbeit.|Recibió mucho reconocimiento por su trabajo.
die Argumentation|la argumentación|Seine Argumentation ist logisch aufgebaut.|Su argumentación está construida con lógica.
die Aufklärung|la información / el esclarecimiento|Die Aufklärung über Risiken ist wichtig.|Informar sobre los riesgos es importante.
die Auflage|la condición impuesta|Die Genehmigung kommt mit strengen Auflagen.|La autorización viene con condiciones estrictas.
die Aufmerksamkeit|la atención|Das Thema findet wenig Aufmerksamkeit.|El tema recibe poca atención.
die Ausbeutung|la explotación|Die Ausbeutung von Arbeitern ist verboten.|La explotación de trabajadores está prohibida.
die Ausgrenzung|la exclusión|Ausgrenzung beginnt oft in der Schule.|La exclusión suele empezar en la escuela.
die Barriere|la barrera|Sprache kann eine Barriere sein.|El idioma puede ser una barrera.
die Begrenzung|el límite|Es gibt eine Begrenzung der Teilnehmerzahl.|Hay un límite en la cantidad de participantes.
die Benachteiligung|la desventaja / la discriminación|Niemand darf eine Benachteiligung erfahren.|Nadie debe sufrir discriminación.
die Beschränkung|la restricción|Die Beschränkung gilt nur nachts.|La restricción rige solo de noche.
die Betonung|el énfasis|Die Betonung liegt auf der ersten Silbe.|El acento está en la primera sílaba.
die Beweisführung|la demostración|Die Beweisführung war lückenlos.|La demostración fue impecable.
die Chance|la oportunidad|Jeder verdient eine zweite Chance.|Todos merecen una segunda oportunidad.
die Dringlichkeit|la urgencia|Die Dringlichkeit des Problems ist klar.|La urgencia del problema es evidente.
die Effizienz|la eficiencia|Die Effizienz der Abläufe soll steigen.|La eficiencia de los procesos debe aumentar.
die Eigenverantwortung|la responsabilidad propia|Wir setzen auf Eigenverantwortung.|Apostamos a la responsabilidad individual.
die Einbürgerung|la naturalización|Die Einbürgerung dauert mehrere Monate.|La naturalización lleva varios meses.
die Einmischung|la intromisión|Wir lehnen jede Einmischung ab.|Rechazamos cualquier intromisión.
die Entlastung|el alivio|Die Steuerreform bringt eine Entlastung.|La reforma tributaria trae un alivio.
die Entscheidungsfreiheit|la libertad de decisión|Jeder hat Entscheidungsfreiheit.|Todos tienen libertad de decisión.
die Erwerbstätigkeit|la actividad laboral|Die Erwerbstätigkeit der Frauen nimmt zu.|La actividad laboral de las mujeres aumenta.
die Forschung|la investigación|Die Forschung braucht mehr Geld.|La investigación necesita más dinero.
die Gefährdung|el peligro|Es besteht keine Gefährdung der Gesundheit.|No hay peligro para la salud.
die Gewaltfreiheit|la no violencia|Der Protest setzte auf Gewaltfreiheit.|La protesta apostó por la no violencia.
die Handlungsfähigkeit|la capacidad de acción|Die Handlungsfähigkeit der Regierung ist begrenzt.|La capacidad de acción del gobierno es limitada.
die Hervorhebung|el realce|Die Hervorhebung wichtiger Stellen hilft beim Lernen.|Resaltar pasajes importantes ayuda a aprender.
die Hintergrundinformation|la información de contexto|Der Artikel liefert viel Hintergrundinformation.|El artículo da mucha información de contexto.
die Infrastruktur|la infraestructura|Die Infrastruktur auf dem Land ist schwach.|La infraestructura en el campo es débil.
die Integration|la integración|Sprache ist der Schlüssel zur Integration.|El idioma es la clave de la integración.
die Interpretation|la interpretación|Das Gedicht erlaubt mehrere Interpretationen.|El poema admite varias interpretaciones.
die Kernaussage|el mensaje central|Die Kernaussage des Textes ist einfach.|El mensaje central del texto es simple.
die Klarstellung|la aclaración|Eine Klarstellung ist nötig.|Hace falta una aclaración.
die Kompetenz|la competencia|Soziale Kompetenz ist im Beruf wichtig.|La competencia social es importante en el trabajo.
die Lebensgrundlage|la base de subsistencia|Das Meer ist ihre Lebensgrundlage.|El mar es su base de subsistencia.
die Lehre|la enseñanza / la doctrina|Aus der Krise ziehen wir eine Lehre.|De la crisis sacamos una enseñanza.
die Mehrwertsteuer|el IVA|Die Mehrwertsteuer wurde erhöht.|Se subió el IVA.
die Migration|la migración|Migration prägt die Geschichte Europas.|La migración marca la historia de Europa.
die Mitverantwortung|la corresponsabilidad|Wir tragen Mitverantwortung für das Ergebnis.|Tenemos corresponsabilidad por el resultado.
die Nachfolge|la sucesión|Die Nachfolge in der Firma ist geregelt.|La sucesión en la empresa está resuelta.
die Nachhaltigkeit|la sostenibilidad|Nachhaltigkeit ist ein wichtiges Ziel.|La sostenibilidad es un objetivo importante.
die Normalität|la normalidad|Langsam kehrt Normalität zurück.|De a poco vuelve la normalidad.
die Obergrenze|el tope|Es gibt eine Obergrenze für die Kosten.|Hay un tope para los costos.
die Prävention|la prevención|Prävention ist besser als Behandlung.|La prevención es mejor que el tratamiento.
die Priorität|la prioridad|Sicherheit hat Priorität.|La seguridad tiene prioridad.
die Provokation|la provocación|Das war eine bewusste Provokation.|Fue una provocación deliberada.
die Qualifikation|la calificación|Seine Qualifikation reicht für die Stelle.|Su calificación alcanza para el puesto.
die Realität|la realidad|Die Realität sieht anders aus.|La realidad es distinta.
die Rechtfertigung|la justificación|Dafür gibt es keine Rechtfertigung.|Para eso no hay justificación.
die Reihenfolge|el orden / la secuencia|Die Reihenfolge der Aufgaben ist egal.|El orden de las tareas da igual.
die Relevanz|la relevancia|Die Relevanz des Themas ist unbestritten.|La relevancia del tema es indiscutible.
die Reputation|la reputación|Die Firma hat eine gute Reputation.|La empresa tiene buena reputación.
die Schwelle|el umbral|Die Schwelle zum Einstieg ist niedrig.|El umbral de entrada es bajo.
die Selbstständigkeit|la autonomía / el trabajo independiente|Sie träumt von der Selbstständigkeit.|Sueña con trabajar por su cuenta.
die Spaltung|la división|Die Spaltung der Gesellschaft macht Sorgen.|La división de la sociedad preocupa.
die Steuerung|el control / la dirección|Die Steuerung des Projekts liegt bei ihr.|La conducción del proyecto está a su cargo.
die Struktur|la estructura|Der Text hat eine klare Struktur.|El texto tiene una estructura clara.
die Transparenz|la transparencia|Wir fordern mehr Transparenz.|Pedimos más transparencia.
die Überlastung|la sobrecarga|Die Überlastung der Mitarbeiter ist ein Problem.|La sobrecarga de los empleados es un problema.
die Überprüfung|la verificación|Eine Überprüfung der Zahlen ist nötig.|Hace falta verificar las cifras.
die Überzeugungskraft|el poder de convicción|Ihre Rede hatte große Überzeugungskraft.|Su discurso tuvo gran poder de convicción.
die Umgangsform|los modales|Gute Umgangsformen sind wichtig.|Los buenos modales son importantes.
die Ungleichheit|la desigualdad|Die soziale Ungleichheit wächst.|La desigualdad social crece.
die Verallgemeinerung|la generalización|Das ist eine unzulässige Verallgemeinerung.|Es una generalización inadmisible.
die Verantwortlichkeit|la responsabilidad (competencia)|Die Verantwortlichkeiten sind klar verteilt.|Las responsabilidades están claramente repartidas.
die Verbreitung|la difusión|Die Verbreitung von Falschmeldungen schadet.|La difusión de noticias falsas perjudica.
die Verfügbarkeit|la disponibilidad|Die Verfügbarkeit der Ware ist begrenzt.|La disponibilidad del producto es limitada.
die Vergütung|la remuneración|Die Vergütung richtet sich nach der Erfahrung.|La remuneración depende de la experiencia.
die Verhältnismäßigkeit|la proporcionalidad|Die Verhältnismäßigkeit der Maßnahme ist fraglich.|La proporcionalidad de la medida es dudosa.
die Verknüpfung|la vinculación|Die Verknüpfung der Daten ist problematisch.|La vinculación de los datos es problemática.
die Verlässlichkeit|la fiabilidad|Wir schätzen seine Verlässlichkeit.|Valoramos su fiabilidad.
die Vermittlung|la mediación|Die Vermittlung zwischen beiden Seiten gelang.|La mediación entre ambas partes tuvo éxito.
die Verschärfung|el endurecimiento|Die Verschärfung der Regeln stößt auf Kritik.|El endurecimiento de las reglas recibe críticas.
die Versorgung|el abastecimiento|Die Versorgung mit Wasser ist gesichert.|El abastecimiento de agua está asegurado.
die Verteilung|la distribución|Die Verteilung des Geldes ist ungerecht.|La distribución del dinero es injusta.
die Verweigerung|la negativa|Seine Verweigerung überraschte alle.|Su negativa sorprendió a todos.
die Vorgabe|la pauta|Wir halten uns an die Vorgaben.|Nos atenemos a las pautas.
die Vorreiterrolle|el papel de pionero|Das Land übernimmt die Vorreiterrolle.|El país asume el papel de pionero.
die Wahrscheinlichkeit|la probabilidad|Die Wahrscheinlichkeit für Regen ist hoch.|La probabilidad de lluvia es alta.
die Wettbewerbsfähigkeit|la competitividad|Die Wettbewerbsfähigkeit der Firma sinkt.|La competitividad de la empresa baja.
die Widerlegung|la refutación|Die Widerlegung der These gelang schnell.|La refutación de la tesis fue rápida.
die Wirksamkeit|la eficacia|Die Wirksamkeit des Mittels ist belegt.|La eficacia del remedio está comprobada.
die Zuordnung|la asignación|Die Zuordnung der Daten ist fehlerhaft.|La asignación de los datos es errónea.
die Zusammenfassung|el resumen|Schreib bitte eine kurze Zusammenfassung.|Escribí por favor un resumen corto.
der Anreiz|el incentivo|Steuern setzen einen Anreiz zum Sparen.|Los impuestos crean un incentivo para ahorrar.
der Anstieg|el aumento|Der Anstieg der Preise ist spürbar.|El aumento de los precios se nota.
der Appell|el llamado|Der Appell an die Bürger blieb ohne Wirkung.|El llamado a los ciudadanos no tuvo efecto.
der Aspekt|el aspecto|Das ist ein wichtiger Aspekt.|Es un aspecto importante.
der Begriff|el concepto|Der Begriff ist schwer zu erklären.|El concepto es difícil de explicar.
der Betrag|el monto|Der Betrag wird abgebucht.|El monto se debita.
der Diskurs|el discurso (debate)|Der öffentliche Diskurs hat sich verändert.|El debate público cambió.
der Entwurf|el borrador|Der Entwurf wird noch überarbeitet.|El borrador todavía se está revisando.
der Ertrag|el rendimiento|Der Ertrag der Ernte war gering.|El rendimiento de la cosecha fue bajo.
der Faktor|el factor|Zeit ist ein entscheidender Faktor.|El tiempo es un factor decisivo.
der Fehlschluss|la falacia|Das ist ein logischer Fehlschluss.|Es una falacia lógica.
der Gegenpol|el polo opuesto|Er bildet den Gegenpol zu seinem Bruder.|Es el polo opuesto de su hermano.
der Handlungsbedarf|la necesidad de actuar|Es besteht dringender Handlungsbedarf.|Hay una urgente necesidad de actuar.
der Hinweis|la indicación|Beachten Sie bitte den Hinweis.|Tenga en cuenta la indicación.
der Kontext|el contexto|Im Kontext ergibt der Satz Sinn.|En contexto, la frase tiene sentido.
der Konsens|el consenso|Wir haben einen Konsens erreicht.|Alcanzamos un consenso.
der Kontrast|el contraste|Der Kontrast zwischen beiden ist groß.|El contraste entre ambos es grande.
der Kritiker|el crítico|Die Kritiker sind in der Minderheit.|Los críticos son minoría.
der Lebensstil|el estilo de vida|Ein gesunder Lebensstil schützt vor Krankheiten.|Un estilo de vida sano protege de enfermedades.
der Leitfaden|la guía|Der Leitfaden erklärt jeden Schritt.|La guía explica cada paso.
der Mehrwert|el valor agregado|Das Angebot bietet einen echten Mehrwert.|La oferta da un verdadero valor agregado.
der Mittelpunkt|el centro|Das Kind steht im Mittelpunkt.|El niño está en el centro.
der Rückschritt|el retroceso|Das wäre ein Rückschritt.|Eso sería un retroceso.
der Trend|la tendencia|Der Trend geht zu mehr Homeoffice.|La tendencia va hacia más home office.
der Überblick|la visión de conjunto|Ich verschaffe mir einen Überblick.|Me hago una idea general.
der Urheber|el autor (de una obra)|Der Urheber des Fotos ist unbekannt.|El autor de la foto es desconocido.
der Verdienst|el ingreso|Sein Verdienst reicht für die Miete.|Su ingreso alcanza para el alquiler.
der Vorbehalt|la reserva|Ich habe Vorbehalte gegen den Plan.|Tengo reservas sobre el plan.
der Zeitgeist|el espíritu de la época|Das passt zum Zeitgeist.|Eso encaja con el espíritu de la época.
der Zusammenschluss|la fusión / la asociación|Der Zusammenschluss der Firmen wurde genehmigt.|Se aprobó la fusión de las empresas.
das Fazit|la conclusión|Mein Fazit ist positiv.|Mi conclusión es positiva.
das Grundrecht|el derecho fundamental|Die Meinungsfreiheit ist ein Grundrecht.|La libertad de opinión es un derecho fundamental.
das Kriterium|el criterio|Preis ist nicht das einzige Kriterium.|El precio no es el único criterio.
das Leitbild|la visión rectora|Das Leitbild der Schule betont Respekt.|La visión rectora de la escuela destaca el respeto.
das Merkmal|la característica|Ein typisches Merkmal ist die Farbe.|Una característica típica es el color.
das Motiv|el motivo|Das Motiv der Tat ist unklar.|El motivo del hecho no está claro.
das Paradox|la paradoja|Das ist ein echtes Paradox.|Es una verdadera paradoja.
das Plädoyer|el alegato|Sein Plädoyer überzeugte die Jury.|Su alegato convenció al jurado.
das Potenzial|el potencial|Das Projekt hat großes Potenzial.|El proyecto tiene gran potencial.
das Prinzip|el principio|Das Prinzip ist einfach.|El principio es simple.
das Privileg|el privilegio|Bildung ist kein Privileg.|La educación no es un privilegio.
das Resultat|el resultado|Das Resultat überraschte uns.|El resultado nos sorprendió.
das Selbstbild|la autoimagen|Ihr Selbstbild hat sich verändert.|Su autoimagen cambió.
das Spannungsfeld|el campo de tensión|Er arbeitet im Spannungsfeld von Politik und Wirtschaft.|Trabaja en el campo de tensión entre política y economía.
das Stereotyp|el estereotipo|Das Stereotyp stimmt nicht.|El estereotipo no es cierto.
das Tabu|el tabú|Über Geld zu reden ist ein Tabu.|Hablar de plata es un tabú.
das Umdenken|el cambio de mentalidad|Es braucht ein Umdenken in der Politik.|Hace falta un cambio de mentalidad en la política.
abweichen|desviarse|Die Ergebnisse können stark abweichen.|Los resultados pueden desviarse mucho.
anfechten|impugnar|Sie will das Urteil anfechten.|Quiere impugnar la sentencia.
anknüpfen|retomar|Wir können an das Gespräch anknüpfen.|Podemos retomar la conversación.
anprangern|denunciar públicamente|Die Zeitung will die Missstände anprangern.|El diario quiere denunciar los abusos.
außer Acht lassen|dejar de lado|Man darf diesen Punkt nicht außer Acht lassen.|No se debe dejar de lado este punto.
befragen|consultar / interrogar|Wir wollen hundert Personen befragen.|Queremos encuestar a cien personas.
begünstigen|favorecer|Das Wetter kann die Ernte begünstigen.|El clima puede favorecer la cosecha.
berufen|nombrar / apelar a|Sie wurde in die Kommission berufen.|La nombraron en la comisión.
beziffern|cuantificar|Man kann den Schaden schwer beziffern.|El daño es difícil de cuantificar.
deuten|interpretar|Wie soll man dieses Zeichen deuten?|¿Cómo hay que interpretar esta señal?
durchschauen|ver a través de|Er kann sie leicht durchschauen.|Puede calarla fácilmente.
entkräften|desvirtuar|Das Gutachten kann den Vorwurf entkräften.|El peritaje puede desvirtuar la acusación.
entlarven|desenmascarar|Der Bericht will den Betrug entlarven.|El informe quiere desenmascarar el fraude.
erfordern|requerir|Diese Aufgabe erfordert viel Geduld.|Esta tarea requiere mucha paciencia.
erproben|probar|Wir wollen das Verfahren erproben.|Queremos probar el procedimiento.
gewichten|ponderar|Man muss die Argumente gewichten.|Hay que ponderar los argumentos.
offenlegen|revelar|Die Firma muss ihre Zahlen offenlegen.|La empresa debe revelar sus cifras.
relativieren|relativizar|Man sollte das Ergebnis relativieren.|Habría que relativizar el resultado.
sich stützen|apoyarse|Er will sich auf Studien stützen.|Quiere apoyarse en estudios.
überdenken|reconsiderar|Wir sollten den Plan überdenken.|Deberíamos reconsiderar el plan.
verallgemeinern|generalizar|Man darf nicht verallgemeinern.|No se debe generalizar.
vorwerfen|reprochar|Man kann ihm nichts vorwerfen.|No se le puede reprochar nada.
zugestehen|conceder|Ich muss ihm das zugestehen.|Tengo que concederle eso.
abstrakt|abstracto|Das Thema ist sehr abstrakt.|El tema es muy abstracto.
aktiv|activo|Er ist politisch aktiv.|Es políticamente activo.
alltäglich|cotidiano|Das ist eine alltägliche Situation.|Es una situación cotidiana.
angebracht|apropiado|Vorsicht ist hier angebracht.|Aquí corresponde tener cuidado.
angesehen|respetado|Sie ist eine angesehene Ärztin.|Es una médica respetada.
anhaltend|persistente|Der anhaltende Regen macht Probleme.|La lluvia persistente causa problemas.
anstößig|ofensivo|Der Text enthält anstößige Wörter.|El texto contiene palabras ofensivas.
ausschlaggebend|decisivo|Das war der ausschlaggebende Grund.|Ese fue el motivo decisivo.
bahnbrechend|revolucionario|Das ist eine bahnbrechende Entdeckung.|Es un descubrimiento revolucionario.
bedingt|condicionado|Die Erlaubnis ist bedingt gültig.|El permiso es válido con condiciones.
befangen|parcial|Der Richter galt als befangen.|Se consideró parcial al juez.
beispielhaft|ejemplar|Ihr Einsatz ist beispielhaft.|Su dedicación es ejemplar.
bemerkenswert|notable|Das ist ein bemerkenswertes Ergebnis.|Es un resultado notable.
bestimmend|determinante|Das Thema ist bestimmend für die Debatte.|El tema es determinante para el debate.
eindringlich|enfático|Er warnte eindringlich vor den Folgen.|Advirtió con insistencia sobre las consecuencias.
einschneidend|drástico|Das waren einschneidende Veränderungen.|Fueron cambios drásticos.
engagiert|comprometido|Sie ist eine engagierte Lehrerin.|Es una docente comprometida.
erfahrungsgemäß|según la experiencia|Erfahrungsgemäß dauert das länger.|Según la experiencia, eso tarda más.
folgenreich|de graves consecuencias|Das war ein folgenreicher Fehler.|Fue un error de graves consecuencias.
gravierend|grave|Das ist ein gravierender Unterschied.|Es una diferencia grave.
heikel|delicado|Das ist ein heikles Thema.|Es un tema delicado.
herkömmlich|convencional|Herkömmliche Methoden reichen nicht.|Los métodos convencionales no alcanzan.
nachvollziehbar|comprensible|Seine Entscheidung ist nachvollziehbar.|Su decisión es comprensible.
offenkundig|evidente|Das ist offenkundig falsch.|Es evidentemente falso.
pauschal|generalizado|Man darf nicht pauschal urteilen.|No se debe juzgar de manera generalizada.
ungerecht|injusto|Das Urteil ist ungerecht.|La sentencia es injusta.
unumstritten|indiscutido|Sein Talent ist unumstritten.|Su talento es indiscutido.
verhältnismäßig|relativamente|Die Preise sind verhältnismäßig niedrig.|Los precios son relativamente bajos.
vielschichtig|complejo / multifacético|Das Problem ist vielschichtig.|El problema es multifacético.
zukunftsweisend|que marca el rumbo|Das ist ein zukunftsweisendes Projekt.|Es un proyecto que marca el rumbo.
zweifelhaft|dudoso|Die Quelle ist zweifelhaft.|La fuente es dudosa.
gegebenenfalls|llegado el caso|Gegebenenfalls rufen wir Sie an.|Llegado el caso, lo llamamos.
nichtsdestotrotz|no obstante|Nichtsdestotrotz bleibt der Plan bestehen.|No obstante, el plan se mantiene.
infolgedessen|por consiguiente|Infolgedessen wurde der Termin verschoben.|Por consiguiente, se pospuso la fecha.
umgekehrt|al revés|Es war genau umgekehrt.|Fue exactamente al revés.
ungeachtet|sin tener en cuenta|Ungeachtet der Kritik machte er weiter.|Sin tener en cuenta las críticas, siguió.
die Ablehnung|el rechazo|Die Ablehnung des Antrags war überraschend.|El rechazo de la solicitud fue sorpresivo.
die Abschaffung|la abolición|Die Abschaffung der Gebühr ist beschlossen.|La abolición de la tasa está decidida.
die Abwanderung|la emigración (de población)|Die Abwanderung junger Leute ist ein Problem.|La emigración de los jóvenes es un problema.
die Alterung|el envejecimiento|Die Alterung der Gesellschaft stellt uns vor Fragen.|El envejecimiento de la sociedad nos plantea preguntas.
die Amtszeit|el mandato|Die Amtszeit dauert vier Jahre.|El mandato dura cuatro años.
die Anhörung|la audiencia|Die Anhörung findet im Parlament statt.|La audiencia se realiza en el parlamento.
die Anklage|la acusación|Die Anklage lautet auf Betrug.|La acusación es por fraude.
die Ankündigung|el anuncio|Die Ankündigung kam überraschend.|El anuncio fue sorpresivo.
die Aufwertung|la revalorización|Die Aufwertung des Viertels trieb die Mieten hoch.|La revalorización del barrio subió los alquileres.
die Auswanderung|la emigración|Die Auswanderung nach Übersee war früher häufig.|La emigración a ultramar era antes frecuente.
die Auszeichnung|la distinción|Sie erhielt eine hohe Auszeichnung.|Recibió una alta distinción.
die Beeinträchtigung|el perjuicio|Die Beeinträchtigung des Verkehrs ist gering.|El perjuicio al tránsito es mínimo.
die Befragung|la encuesta / el interrogatorio|Die Befragung dauerte zwei Stunden.|La encuesta duró dos horas.
die Belastbarkeit|la resistencia / capacidad de carga|Die Belastbarkeit der Brücke wird geprüft.|Se controla la capacidad de carga del puente.
die Berichterstattung|la cobertura informativa|Die Berichterstattung war einseitig.|La cobertura informativa fue unilateral.
die Besteuerung|la tributación|Die Besteuerung von Erbschaften ist umstritten.|La tributación de las herencias es controvertida.
die Bewältigung|el manejo / la superación|Die Bewältigung der Krise dauert Jahre.|Superar la crisis lleva años.
die Demonstration|la manifestación|Die Demonstration verlief friedlich.|La manifestación fue pacífica.
die Denkweise|la forma de pensar|Seine Denkweise ist mir fremd.|Su forma de pensar me es ajena.
die Dimension|la dimensión|Das Problem hat eine neue Dimension erreicht.|El problema alcanzó una nueva dimensión.
die Dunkelziffer|la cifra negra|Die Dunkelziffer der Fälle ist hoch.|La cifra negra de casos es alta.
die Eigeninitiative|la iniciativa propia|Wir erwarten Eigeninitiative.|Esperamos iniciativa propia.
die Eindämmung|la contención|Die Eindämmung der Kosten gelingt nicht.|No se logra contener los costos.
die Einordnung|la clasificación|Die Einordnung der Daten ist schwierig.|La clasificación de los datos es difícil.
die Einsparung|el ahorro|Die Einsparung beträgt zehn Prozent.|El ahorro es del diez por ciento.
die Einschätzung|la valoración|Meine Einschätzung der Lage ist vorsichtig.|Mi valoración de la situación es cauta.
die Einstufung|la categorización|Die Einstufung als Gefahr ist umstritten.|La categorización como peligro es controvertida.
die Einwilligung|el consentimiento|Dafür brauchen wir Ihre Einwilligung.|Para eso necesitamos su consentimiento.
die Entfremdung|el distanciamiento|Die Entfremdung zwischen beiden wuchs.|El distanciamiento entre ambos creció.
die Enthüllung|la revelación|Die Enthüllung sorgte für Aufsehen.|La revelación causó revuelo.
die Ergänzung|el complemento|Eine Ergänzung des Textes ist nötig.|Hace falta complementar el texto.
die Erneuerung|la renovación|Die Erneuerung der Brücke kostet Millionen.|La renovación del puente cuesta millones.
die Erpressung|la extorsión|Das ist Erpressung!|¡Eso es extorsión!
die Erschließung|el desarrollo (de una zona)|Die Erschließung des Gebiets beginnt bald.|El desarrollo de la zona empieza pronto.
die Ersparnis|el ahorro (monto)|Die Ersparnis ist beträchtlich.|El ahorro es considerable.
die Errungenschaft|el logro|Das ist eine große Errungenschaft.|Es un gran logro.
die Fahrlässigkeit|la negligencia|Er handelte aus Fahrlässigkeit.|Actuó por negligencia.
die Finanzierung|el financiamiento|Die Finanzierung des Projekts ist gesichert.|El financiamiento del proyecto está asegurado.
die Fluktuation|la rotación|Die Fluktuation im Team ist hoch.|La rotación en el equipo es alta.
die Formulierung|la formulación|Die Formulierung ist missverständlich.|La formulación se presta a malentendidos.
die Gegenmaßnahme|la contramedida|Wir planen eine Gegenmaßnahme.|Planeamos una contramedida.
die Gehaltserhöhung|el aumento de sueldo|Er verlangt eine Gehaltserhöhung.|Pide un aumento de sueldo.
die Gesetzesänderung|el cambio de ley|Die Gesetzesänderung tritt im Januar in Kraft.|El cambio de ley entra en vigor en enero.
die Gewalt|la violencia|Gewalt ist keine Lösung.|La violencia no es una solución.
die Gewinnung|la obtención|Die Gewinnung von Energie belastet die Umwelt.|La obtención de energía daña el ambiente.
die Grundversorgung|el abastecimiento básico|Die Grundversorgung ist gesichert.|El abastecimiento básico está asegurado.
die Handhabung|el manejo|Die Handhabung des Geräts ist einfach.|El manejo del aparato es simple.
die Hemmschwelle|el umbral de inhibición|Die Hemmschwelle ist im Internet niedriger.|El umbral de inhibición es más bajo en internet.
die Hilfestellung|la ayuda|Wir bieten Hilfestellung bei der Suche.|Ofrecemos ayuda en la búsqueda.
die Inflation|la inflación|Die Inflation liegt bei zwei Prozent.|La inflación está en dos por ciento.
die Initiative|la iniciativa|Die Initiative ging von den Bürgern aus.|La iniciativa partió de los ciudadanos.
die Intention|la intención|Seine Intention war gut.|Su intención era buena.
die Intoleranz|la intolerancia|Intoleranz kann gefährlich werden.|La intolerancia puede volverse peligrosa.
die Jugendkriminalität|la delincuencia juvenil|Die Jugendkriminalität ist zurückgegangen.|La delincuencia juvenil disminuyó.
die Kennzeichnung|el etiquetado|Die Kennzeichnung der Produkte ist Pflicht.|El etiquetado de los productos es obligatorio.
die Kontinuität|la continuidad|Wir brauchen Kontinuität in der Politik.|Necesitamos continuidad en la política.
die Korruption|la corrupción|Die Korruption schadet dem Vertrauen.|La corrupción daña la confianza.
die Kürzung|el recorte|Die Kürzung der Mittel trifft Schulen.|El recorte de fondos afecta a las escuelas.
die Lebenserwartung|la esperanza de vida|Die Lebenserwartung steigt.|La esperanza de vida aumenta.
die Legislaturperiode|el período legislativo|Die Legislaturperiode endet im Herbst.|El período legislativo termina en otoño.
die Leistungsgesellschaft|la sociedad del rendimiento|Wir leben in einer Leistungsgesellschaft.|Vivimos en una sociedad del rendimiento.
die Lieferkette|la cadena de suministro|Die Lieferkette ist unterbrochen.|La cadena de suministro está interrumpida.
die Lockerung|la flexibilización|Die Lockerung der Regeln wird diskutiert.|Se discute flexibilizar las reglas.
die Manipulation|la manipulación|Die Manipulation der Daten wurde entdeckt.|Se descubrió la manipulación de los datos.
die Marktwirtschaft|la economía de mercado|Die Marktwirtschaft braucht klare Regeln.|La economía de mercado necesita reglas claras.
die Mehrfachbelastung|la doble carga|Die Mehrfachbelastung von Eltern ist hoch.|La doble carga de los padres es alta.
die Meinungsfreiheit|la libertad de opinión|Die Meinungsfreiheit gilt für alle.|La libertad de opinión rige para todos.
die Missachtung|el desprecio (de normas)|Die Missachtung der Regeln wird bestraft.|El incumplimiento de las reglas se castiga.
die Mitbestimmung|la cogestión|Die Mitbestimmung der Mitarbeiter ist gesetzlich geregelt.|La cogestión de los empleados está regulada por ley.
die Mobilität|la movilidad|Die Mobilität der Zukunft ist elektrisch.|La movilidad del futuro es eléctrica.
die Neuordnung|la reorganización|Die Neuordnung der Abteilungen beginnt im Mai.|La reorganización de los departamentos empieza en mayo.
die Notlage|la situación de emergencia|Er half Menschen in Notlagen.|Ayudaba a personas en situaciones de emergencia.
die Offenheit|la franqueza|Ich schätze ihre Offenheit.|Valoro su franqueza.
die Organisation|la organización|Die Organisation arbeitet ehrenamtlich.|La organización trabaja de forma voluntaria.
die Orientierung|la orientación|Ohne Orientierung fühle ich mich verloren.|Sin orientación me siento perdido.
die Parallelgesellschaft|la sociedad paralela|Der Begriff Parallelgesellschaft ist umstritten.|El concepto de sociedad paralela es controvertido.
die Partizipation|la participación|Die Partizipation der Jugendlichen wird gefördert.|Se fomenta la participación de los jóvenes.
die Pressefreiheit|la libertad de prensa|Die Pressefreiheit ist ein hohes Gut.|La libertad de prensa es un bien preciado.
die Produktivität|la productividad|Die Produktivität stieg um fünf Prozent.|La productividad subió un cinco por ciento.
die Rahmenbedingung|la condición marco|Die Rahmenbedingungen müssen stimmen.|Las condiciones marco tienen que ser adecuadas.
die Rechtsprechung|la jurisprudencia|Die Rechtsprechung hat sich geändert.|La jurisprudencia cambió.
die Rücksichtnahme|la consideración|Rücksichtnahme ist im Zusammenleben wichtig.|La consideración es importante en la convivencia.
die Sachlage|el estado de cosas|Die Sachlage ist eindeutig.|El estado de cosas es claro.
die Sanierung|la rehabilitación|Die Sanierung des Gebäudes dauert ein Jahr.|La rehabilitación del edificio dura un año.
die Schattenseite|el lado oscuro|Der Erfolg hat auch Schattenseiten.|El éxito también tiene su lado oscuro.
die Schlichtung|el arbitraje|Die Schlichtung beendete den Streik.|El arbitraje puso fin a la huelga.
die Schuldenlast|la carga de la deuda|Die Schuldenlast drückt das Land.|La carga de la deuda aplasta al país.
die Selbstverwirklichung|la autorrealización|Viele suchen im Beruf Selbstverwirklichung.|Muchos buscan autorrealización en el trabajo.
die Sicherung|la protección / el respaldo|Die Sicherung der Daten ist wichtig.|El respaldo de los datos es importante.
die Sozialleistung|la prestación social|Sozialleistungen sichern das Existenzminimum.|Las prestaciones sociales aseguran el mínimo vital.
die Spekulation|la especulación|Das sind nur Spekulationen.|Son solo especulaciones.
die Stabilität|la estabilidad|Die Stabilität der Preise ist wichtig.|La estabilidad de los precios es importante.
die Tagung|la jornada / el congreso|Die Tagung findet in Wien statt.|El congreso se realiza en Viena.
die Teilzeitarbeit|el trabajo de jornada parcial|Teilzeitarbeit ist bei Eltern beliebt.|El trabajo de jornada parcial es popular entre los padres.
die Tragweite|el alcance|Die Tragweite der Entscheidung ist enorm.|El alcance de la decisión es enorme.
die Überalterung|el envejecimiento excesivo|Die Überalterung belastet die Rentenkasse.|El envejecimiento excesivo pesa sobre la caja de jubilaciones.
die Übersicht|la visión de conjunto / el resumen|Die Übersicht zeigt alle Kosten.|El resumen muestra todos los costos.
die Umstellung|el cambio / la adaptación|Die Umstellung auf Ökostrom ist teuer.|El cambio a energía ecológica es caro.
die Umverteilung|la redistribución|Viele fordern eine Umverteilung des Reichtums.|Muchos piden redistribuir la riqueza.
die Unterbringung|el alojamiento|Die Unterbringung der Gäste ist organisiert.|El alojamiento de los invitados está organizado.
die Unterdrückung|la opresión|Die Unterdrückung der Opposition wurde kritisiert.|Se criticó la opresión de la oposición.
die Unternehmenskultur|la cultura empresarial|Die Unternehmenskultur ist offen.|La cultura empresarial es abierta.
die Unterscheidung|la distinción|Die Unterscheidung fällt nicht leicht.|La distinción no es fácil.
die Verankerung|el arraigo / la consagración|Die Verankerung im Gesetz ist geplant.|Se planea consagrarlo en la ley.
die Verbindlichkeit|el carácter vinculante|Die Verbindlichkeit der Regeln ist umstritten.|El carácter vinculante de las reglas es discutido.
die Vergeltung|la represalia|Sie fürchten Vergeltung.|Temen represalias.
die Verhandlungsbasis|la base de negociación|Das ist eine gute Verhandlungsbasis.|Es una buena base de negociación.
die Verjährung|la prescripción|Die Verjährung tritt nach zehn Jahren ein.|La prescripción opera a los diez años.
die Verlagerung|el traslado|Die Verlagerung der Produktion spart Kosten.|Trasladar la producción ahorra costos.
die Vernetzung|la interconexión|Die Vernetzung der Forscher ist wichtig.|La interconexión de los investigadores es importante.
die Verschuldung|el endeudamiento|Die Verschuldung des Staates steigt.|El endeudamiento del Estado aumenta.
die Verschwendung|el derroche|Das ist reine Verschwendung.|Eso es puro derroche.
die Verträglichkeit|la tolerancia (a un producto)|Die Verträglichkeit des Medikaments ist gut.|La tolerancia al medicamento es buena.
die Verwendung|el uso|Die Verwendung von Plastik soll sinken.|El uso de plástico debería bajar.
die Verzerrung|la distorsión|Die Umfrage zeigt eine Verzerrung.|La encuesta muestra una distorsión.
die Vielzahl|la multitud|Es gibt eine Vielzahl von Gründen.|Hay multitud de razones.
die Volkswirtschaft|la economía nacional|Die Volkswirtschaft wächst langsam.|La economía nacional crece despacio.
die Vorbildfunktion|el papel de modelo|Eltern haben eine Vorbildfunktion.|Los padres tienen un papel de modelo.
die Vorhersage|el pronóstico|Die Vorhersage war falsch.|El pronóstico fue erróneo.
die Vorschrift|la norma|Die Vorschrift gilt für alle.|La norma rige para todos.
die Wachstumsrate|la tasa de crecimiento|Die Wachstumsrate sinkt.|La tasa de crecimiento baja.
die Weichenstellung|la definición del rumbo|Die Weichenstellung erfolgt jetzt.|El rumbo se define ahora.
die Weitergabe|la transmisión|Die Weitergabe von Daten ist verboten.|La transmisión de datos está prohibida.
die Wertvorstellung|el valor (concepción)|Wertvorstellungen ändern sich.|Las concepciones de valores cambian.
die Wiederverwertung|el reciclaje|Die Wiederverwertung von Glas ist üblich.|El reciclaje de vidrio es habitual.
die Willkür|la arbitrariedad|Das Urteil wirkt wie Willkür.|La sentencia parece arbitraria.
die Wohlfahrt|el bienestar social|Die Wohlfahrt der Bürger steht im Vordergrund.|El bienestar de los ciudadanos está en primer plano.
die Zahlungsfähigkeit|la solvencia|Die Zahlungsfähigkeit der Firma ist gefährdet.|La solvencia de la empresa está en peligro.
die Zensur|la censura|Zensur ist in Demokratien verboten.|La censura está prohibida en las democracias.
die Zerstörung|la destrucción|Die Zerstörung der Umwelt schreitet voran.|La destrucción del ambiente avanza.
die Zivilcourage|el valor cívico|Es braucht Zivilcourage, um einzugreifen.|Hace falta valor cívico para intervenir.
die Zugehörigkeit|la pertenencia|Das Gefühl der Zugehörigkeit ist wichtig.|El sentimiento de pertenencia es importante.
die Zuspitzung|la agudización|Die Zuspitzung des Konflikts macht Sorgen.|La agudización del conflicto preocupa.
die Zuwendung|la atención / el cariño|Kinder brauchen Zuwendung.|Los chicos necesitan atención y cariño.
der Abbau|el desmantelamiento|Der Abbau von Stellen ist geplant.|Se planea suprimir puestos.
der Absatz|las ventas / el párrafo|Der Absatz ist stark gestiegen.|Las ventas subieron mucho.
der Abstieg|el descenso|Der Abstieg der Mannschaft war absehbar.|El descenso del equipo era previsible.
der Anbieter|el proveedor|Der Anbieter hat die Preise erhöht.|El proveedor subió los precios.
der Anlass|la ocasión / el motivo|Der Anlass für das Treffen ist ein Jubiläum.|El motivo de la reunión es un aniversario.
der Anlauf|el impulso / el intento|Beim zweiten Anlauf hat es geklappt.|En el segundo intento salió.
der Anschlag|el atentado|Der Anschlag erschütterte das Land.|El atentado conmocionó al país.
der Antrieb|el impulso / la motivación|Ihm fehlt der Antrieb.|Le falta motivación.
der Ausbau|la expansión|Der Ausbau der Radwege kommt voran.|La expansión de las ciclovías avanza.
der Auslöser|el detonante|Der Auslöser des Streits war eine Kleinigkeit.|El detonante de la pelea fue una pavada.
der Befürworter|el partidario|Die Befürworter des Plans sind in der Mehrheit.|Los partidarios del plan son mayoría.
der Beleg|la prueba / el comprobante|Dafür gibt es keinen Beleg.|Para eso no hay prueba.
der Bestand|el stock / la existencia|Der Bestand an Wohnungen ist knapp.|El stock de viviendas es escaso.
der Beteiligte|el involucrado|Alle Beteiligten wurden informiert.|Se informó a todos los involucrados.
der Brennpunkt|el foco de conflicto|Das Viertel gilt als sozialer Brennpunkt.|El barrio es considerado un foco de problemas sociales.
der Dialog|el diálogo|Wir suchen den Dialog mit den Bürgern.|Buscamos el diálogo con los ciudadanos.
der Eckpfeiler|el pilar|Bildung ist ein Eckpfeiler der Gesellschaft.|La educación es un pilar de la sociedad.
der Einblick|la mirada hacia adentro|Der Film gibt einen Einblick in den Alltag.|La película da una mirada a la vida cotidiana.
der Einstieg|el comienzo / la entrada|Der Einstieg ins Berufsleben ist schwer.|Entrar al mundo laboral es difícil.
der Eklat|el escándalo|Die Sitzung endete mit einem Eklat.|La sesión terminó en escándalo.
der Engpass|el cuello de botella|Es gibt einen Engpass bei den Fachkräften.|Hay escasez de personal calificado.
der Entscheidungsträger|el responsable de decidir|Die Entscheidungsträger müssen handeln.|Quienes deciden tienen que actuar.
der Erfolgsdruck|la presión por el éxito|Der Erfolgsdruck macht krank.|La presión por el éxito enferma.
der Ernstfall|el caso de emergencia|Im Ernstfall rufen Sie die Feuerwehr.|En caso de emergencia llame a los bomberos.
der Fachmann|el especialista|Fragen Sie einen Fachmann.|Consulte a un especialista.
der Freiraum|el margen de libertad|Wir geben den Mitarbeitern Freiraum.|Les damos margen de libertad a los empleados.
der Gesetzgeber|el legislador|Der Gesetzgeber muss reagieren.|El legislador debe reaccionar.
der Gesetzesentwurf|el proyecto de ley|Der Gesetzesentwurf liegt im Parlament.|El proyecto de ley está en el parlamento.
der Grenzfall|el caso límite|Das ist ein klarer Grenzfall.|Es un claro caso límite.
der Grundgedanke|la idea básica|Der Grundgedanke ist einfach.|La idea básica es simple.
der Gründer|el fundador|Der Gründer der Firma ist 80.|El fundador de la empresa tiene 80.
der Gutachter|el perito|Der Gutachter prüft den Schaden.|El perito evalúa el daño.
der Hauptgrund|el motivo principal|Der Hauptgrund war das Geld.|El motivo principal fue el dinero.
der Hebel|la palanca|Hier müssen wir den Hebel ansetzen.|Acá tenemos que aplicar la palanca.
der Höhepunkt|el punto culminante|Das Konzert war der Höhepunkt des Festivals.|El concierto fue el punto culminante del festival.
der Indikator|el indicador|Die Zahl ist ein wichtiger Indikator.|La cifra es un indicador importante.
der Kanon|el canon|Das Werk gehört zum literarischen Kanon.|La obra pertenece al canon literario.
der Kernpunkt|el punto central|Das ist der Kernpunkt der Debatte.|Ese es el punto central del debate.
der Klimawandel|el cambio climático|Der Klimawandel betrifft uns alle.|El cambio climático nos afecta a todos.
der Kompromissvorschlag|la propuesta de compromiso|Der Kompromissvorschlag wurde angenommen.|Se aceptó la propuesta de compromiso.
der Konsument|el consumidor|Der Konsument will Qualität.|El consumidor quiere calidad.
der Kostenfaktor|el factor de costo|Energie ist ein großer Kostenfaktor.|La energía es un gran factor de costo.
der Kreislauf|el ciclo / la circulación|Der Kreislauf des Wassers ist bekannt.|El ciclo del agua es conocido.
der Krisenherd|el foco de crisis|Der Krisenherd liegt im Osten.|El foco de crisis está en el este.
der Kurswechsel|el cambio de rumbo|Der Kurswechsel kam überraschend.|El cambio de rumbo fue sorpresivo.
der Lebensabschnitt|la etapa de la vida|Das Studium ist ein wichtiger Lebensabschnitt.|La carrera es una etapa importante de la vida.
der Lösungsansatz|el planteo de solución|Dieser Lösungsansatz ist neu.|Este planteo de solución es nuevo.
der Machtkampf|la lucha de poder|Der Machtkampf dauerte Jahre.|La lucha de poder duró años.
der Meilenstein|el hito|Das Projekt ist ein Meilenstein.|El proyecto es un hito.
der Missstand|la irregularidad|Dieser Missstand muss aufgedeckt werden.|Esta irregularidad debe ser revelada.
der Nährboden|el caldo de cultivo|Armut ist ein Nährboden für Gewalt.|La pobreza es caldo de cultivo para la violencia.
der Normalfall|el caso normal|Im Normalfall dauert es zwei Tage.|En el caso normal tarda dos días.
der Notstand|el estado de emergencia|Der Notstand wurde ausgerufen.|Se declaró el estado de emergencia.
der Ruf|la reputación|Die Firma hat einen guten Ruf.|La empresa tiene buena reputación.
der Rückhalt|el respaldo|Er hat den Rückhalt der Partei.|Tiene el respaldo del partido.
der Sachverhalt|el hecho (jurídico)|Der Sachverhalt ist noch unklar.|Los hechos todavía no están claros.
der Schadstoff|la sustancia nociva|Der Schadstoff gelangt ins Wasser.|La sustancia nociva llega al agua.
der Schlüsselfaktor|el factor clave|Vertrauen ist ein Schlüsselfaktor.|La confianza es un factor clave.
der Schwellenwert|el valor umbral|Der Schwellenwert wurde überschritten.|Se superó el valor umbral.
der Skeptiker|el escéptico|Die Skeptiker bleiben in der Mehrheit.|Los escépticos siguen siendo mayoría.
der Sozialstaat|el Estado social|Der Sozialstaat sichert die Grundversorgung.|El Estado social asegura el abastecimiento básico.
der Stellenabbau|la supresión de puestos|Der Stellenabbau trifft viele Familien.|La supresión de puestos afecta a muchas familias.
der Steuerzahler|el contribuyente|Der Steuerzahler trägt die Kosten.|El contribuyente carga con los costos.
der Strukturwandel|el cambio estructural|Der Strukturwandel trifft die Region hart.|El cambio estructural golpea duro a la región.
der Tatbestand|el hecho punible|Der Tatbestand ist erfüllt.|Se cumplen los elementos del delito.
der Teufelskreis|el círculo vicioso|Das ist ein Teufelskreis.|Es un círculo vicioso.
der Tiefpunkt|el punto más bajo|Das war der Tiefpunkt meiner Karriere.|Ese fue el punto más bajo de mi carrera.
der Umschwung|el giro|Der Umschwung kam im Herbst.|El giro llegó en otoño.
der Umweltschutz|la protección ambiental|Umweltschutz beginnt im Alltag.|La protección ambiental empieza en lo cotidiano.
der Verbund|la asociación / el conjunto|Die Schulen arbeiten im Verbund.|Las escuelas trabajan en conjunto.
der Verfall|la decadencia|Der Verfall der Gebäude ist sichtbar.|La decadencia de los edificios es visible.
der Vermögenswert|el activo|Immobilien sind ein wichtiger Vermögenswert.|Los inmuebles son un activo importante.
der Vertragspartner|la contraparte|Der Vertragspartner hat nicht gezahlt.|La contraparte no pagó.
der Vertrauensverlust|la pérdida de confianza|Der Skandal führte zu einem Vertrauensverlust.|El escándalo llevó a una pérdida de confianza.
der Verursacher|el causante|Der Verursacher des Schadens zahlt.|El causante del daño paga.
der Vorbote|el presagio|Der Regen war ein Vorbote des Sturms.|La lluvia fue un presagio de la tormenta.
der Vorrang|la prioridad|Sicherheit hat Vorrang.|La seguridad tiene prioridad.
der Vorstoß|la iniciativa (avance)|Der Vorstoß des Ministers scheiterte.|La iniciativa del ministro fracasó.
der Wählerwille|la voluntad de los votantes|Man muss den Wählerwillen respektieren.|Hay que respetar la voluntad de los votantes.
der Wegfall|la supresión|Der Wegfall der Gebühr entlastet viele.|La supresión de la tasa alivia a muchos.
der Wendepunkt|el punto de inflexión|Das Jahr 1989 war ein Wendepunkt.|El año 1989 fue un punto de inflexión.
der Wertewandel|el cambio de valores|Der Wertewandel verändert die Gesellschaft.|El cambio de valores transforma la sociedad.
der Wirtschaftszweig|el sector económico|Der Tourismus ist ein wichtiger Wirtschaftszweig.|El turismo es un sector económico importante.
der Zeitdruck|la presión de tiempo|Unter Zeitdruck mache ich Fehler.|Bajo presión de tiempo cometo errores.
der Zugriff|el acceso (a datos)|Der Zugriff auf die Daten ist beschränkt.|El acceso a los datos es limitado.
der Zusammenbruch|el colapso|Der Zusammenbruch der Firma kam plötzlich.|El colapso de la empresa fue repentino.
der Zwiespalt|el dilema interior|Er steckt in einem Zwiespalt.|Está en un dilema interior.
das Ablaufdatum|la fecha de vencimiento|Das Ablaufdatum steht auf der Packung.|La fecha de vencimiento está en el paquete.
das Abkommen|el acuerdo|Das Abkommen wurde unterzeichnet.|El acuerdo fue firmado.
das Anforderungsprofil|el perfil requerido|Das Anforderungsprofil ist anspruchsvoll.|El perfil requerido es exigente.
das Arbeitsverhältnis|la relación laboral|Das Arbeitsverhältnis endet im März.|La relación laboral termina en marzo.
das Aufgabenfeld|el campo de tareas|Sein Aufgabenfeld ist breit.|Su campo de tareas es amplio.
das Desinteresse|el desinterés|Sein Desinteresse war offensichtlich.|Su desinterés era evidente.
das Einkommensgefälle|la brecha de ingresos|Das Einkommensgefälle zwischen Stadt und Land wächst.|La brecha de ingresos entre ciudad y campo crece.
das Engagement|el compromiso|Wir danken für Ihr Engagement.|Agradecemos su compromiso.
das Ermessen|la discreción|Das liegt in Ihrem Ermessen.|Eso queda a su criterio.
das Fachwissen|el conocimiento especializado|Dafür braucht man Fachwissen.|Para eso se necesita conocimiento especializado.
das Fehlverhalten|la mala conducta|Sein Fehlverhalten wurde bestraft.|Su mala conducta fue sancionada.
das Gedankengut|el pensamiento (ideario)|Solches Gedankengut ist gefährlich.|Ese tipo de ideario es peligroso.
das Gefälle|el desnivel / la brecha|Es gibt ein Gefälle zwischen Nord und Süd.|Hay una brecha entre norte y sur.
das Gefüge|la estructura|Das soziale Gefüge verändert sich.|La estructura social cambia.
das Hindernis|el obstáculo|Das größte Hindernis ist die Sprache.|El mayor obstáculo es el idioma.
das Hilfsangebot|la oferta de ayuda|Das Hilfsangebot wird gut genutzt.|La oferta de ayuda se aprovecha bien.
das Image|la imagen (pública)|Die Stadt hat ein neues Image.|La ciudad tiene una nueva imagen.
das Jahrzehnt|la década|Das letzte Jahrzehnt brachte viele Veränderungen.|La última década trajo muchos cambios.
das Kollektiv|el colectivo|Das Kollektiv trifft Entscheidungen gemeinsam.|El colectivo decide en conjunto.
das Konstrukt|la construcción (abstracta)|Das ist ein theoretisches Konstrukt.|Es una construcción teórica.
das Lebenswerk|la obra de toda una vida|Das Museum ist sein Lebenswerk.|El museo es la obra de su vida.
das Machtgefüge|la estructura de poder|Das Machtgefüge hat sich verschoben.|La estructura de poder se desplazó.
das Missverhältnis|la desproporción|Es gibt ein Missverhältnis zwischen Lohn und Leistung.|Hay una desproporción entre sueldo y rendimiento.
das Mitspracherecht|el derecho a opinar|Die Eltern fordern ein Mitspracherecht.|Los padres exigen derecho a opinar.
das Mittelmaß|la mediocridad|Er gibt sich nicht mit Mittelmaß zufrieden.|No se conforma con la mediocridad.
das Monopol|el monopolio|Die Firma hat ein Monopol.|La empresa tiene un monopolio.
das Nachspiel|las consecuencias|Das wird ein Nachspiel haben.|Esto va a tener consecuencias.
das Naturschutzgebiet|la reserva natural|Das Naturschutzgebiet ist für Besucher gesperrt.|La reserva natural está cerrada a los visitantes.
das Präsidium|la presidencia (órgano)|Das Präsidium tagt morgen.|La presidencia se reúne mañana.
das Reformvorhaben|el proyecto de reforma|Das Reformvorhaben stößt auf Widerstand.|El proyecto de reforma encuentra resistencia.
das Regelwerk|el reglamento|Das Regelwerk ist sehr umfangreich.|El reglamento es muy extenso.
das Risikopotenzial|el potencial de riesgo|Das Risikopotenzial ist hoch.|El potencial de riesgo es alto.
das Sachgebiet|el área temática|Er ist Experte auf diesem Sachgebiet.|Es experto en esta área.
das Schlagwort|la palabra clave|Nachhaltigkeit ist das Schlagwort der Zeit.|La sostenibilidad es la palabra clave de la época.
das Selbstverständnis|la autocomprensión|Das Selbstverständnis der Partei ändert sich.|La autocomprensión del partido cambia.
das Stimmungsbild|el panorama de opinión|Die Umfrage liefert ein Stimmungsbild.|La encuesta da un panorama de opinión.
das Streitthema|el tema de disputa|Geld ist ein häufiges Streitthema.|El dinero es un tema de disputa frecuente.
das Strukturproblem|el problema estructural|Das ist ein Strukturproblem.|Es un problema estructural.
das Symptom|el síntoma|Müdigkeit kann ein Symptom sein.|El cansancio puede ser un síntoma.
das Unrecht|la injusticia|Er will das Unrecht wiedergutmachen.|Quiere reparar la injusticia.
das Unterfangen|la empresa (acción arriesgada)|Das ist ein riskantes Unterfangen.|Es una empresa arriesgada.
das Verbrechen|el crimen|Das Verbrechen wurde nie aufgeklärt.|El crimen nunca se esclareció.
das Versäumnis|la omisión|Das war ein schweres Versäumnis.|Fue una omisión grave.
das Vertrauensverhältnis|la relación de confianza|Das Vertrauensverhältnis ist gestört.|La relación de confianza está dañada.
das Vorzeichen|el signo / el indicio|Die Zahl hat ein negatives Vorzeichen.|El número tiene signo negativo.
das Wahlrecht|el derecho al voto|Das Wahlrecht gilt ab 18.|El derecho al voto rige desde los 18.
das Wirtschaftswachstum|el crecimiento económico|Das Wirtschaftswachstum verlangsamt sich.|El crecimiento económico se desacelera.
das Zeitalter|la era|Wir leben im digitalen Zeitalter.|Vivimos en la era digital.
das Zusammenspiel|la interacción|Das Zusammenspiel aller Faktoren ist entscheidend.|La interacción de todos los factores es decisiva.
absehen|prever|Das Ende lässt sich noch nicht absehen.|El final todavía no se puede prever.
andauern|persistir|Der Streit kann noch lange andauern.|La disputa puede persistir mucho tiempo.
anfallen|surgir (costos, trabajo)|Dafür können zusätzliche Kosten anfallen.|Para eso pueden surgir costos adicionales.
aufarbeiten|procesar / reelaborar|Wir müssen die Vergangenheit aufarbeiten.|Tenemos que procesar el pasado.
auffangen|amortiguar|Der Staat will die Verluste auffangen.|El Estado quiere amortiguar las pérdidas.
aufkommen|surgir|Zweifel können jederzeit aufkommen.|Las dudas pueden surgir en cualquier momento.
aufstocken|aumentar (una cantidad)|Wir wollen das Personal aufstocken.|Queremos aumentar el personal.
auslagern|externalizar|Die Firma will die Produktion auslagern.|La empresa quiere externalizar la producción.
ausschöpfen|agotar (posibilidades)|Wir müssen alle Möglichkeiten ausschöpfen.|Tenemos que agotar todas las posibilidades.
bedingen|condicionar|Das eine kann das andere bedingen.|Una cosa puede condicionar a la otra.
bekräftigen|reafirmar|Der Minister bekräftigte seine Position.|El ministro reafirmó su postura.
bekunden|manifestar|Viele bekundeten ihr Interesse.|Muchos manifestaron su interés.
belaufen|ascender a|Die Kosten belaufen sich auf 5.000 Euro.|Los costos ascienden a 5.000 euros.
bemängeln|objetar|Die Kunden bemängeln die lange Wartezeit.|Los clientes objetan la larga espera.
bereinigen|aclarar / depurar|Wir wollen das Missverständnis bereinigen.|Queremos aclarar el malentendido.
bescheinigen|certificar|Der Arzt bescheinigt die Krankheit.|El médico certifica la enfermedad.
beschwichtigen|apaciguar|Er versuchte, die Menge zu beschwichtigen.|Intentó apaciguar a la multitud.
besiegeln|sellar|Ein Handschlag besiegelte den Vertrag.|Un apretón de manos selló el contrato.
beteuern|asegurar enfáticamente|Er beteuert seine Unschuld.|Asegura enfáticamente su inocencia.
bezwecken|tener por objeto|Was soll das bezwecken?|¿Qué se pretende lograr con eso?
dokumentieren|documentar|Wir müssen alles genau dokumentieren.|Tenemos que documentarlo todo con precisión.
drosseln|reducir (velocidad, consumo)|Die Regierung will den Verbrauch drosseln.|El gobierno quiere reducir el consumo.
durchdringen|penetrar|Der Regen kann durch den Stoff durchdringen.|La lluvia puede penetrar la tela.
einfordern|exigir|Er kann sein Recht einfordern.|Puede exigir su derecho.
eingestehen|admitir|Sie muss ihren Fehler eingestehen.|Ella tiene que admitir su error.
einschreiten|intervenir|Die Polizei musste einschreiten.|La policía tuvo que intervenir.
einstufen|clasificar|Die Behörde will das Risiko hoch einstufen.|La autoridad quiere clasificar el riesgo como alto.
empören|indignar|Das Urteil kann viele empören.|La sentencia puede indignar a muchos.
entgegenkommen|ir al encuentro|Wir wollen den Kunden entgegenkommen.|Queremos ir al encuentro de los clientes.
erarbeiten|elaborar|Wir müssen ein Konzept erarbeiten.|Tenemos que elaborar un concepto.
erbringen|aportar / rendir|Die Firma muss den Nachweis erbringen.|La empresa debe aportar la prueba.
ergründen|indagar|Man will die Ursache ergründen.|Se quiere indagar la causa.
erhärten|confirmar (sospecha)|Neue Beweise können den Verdacht erhärten.|Nuevas pruebas pueden confirmar la sospecha.
erlangen|obtener|Er will die Staatsbürgerschaft erlangen.|Quiere obtener la ciudadanía.
erschließen|abrir / desarrollar|Neue Märkte lassen sich erschließen.|Se pueden abrir nuevos mercados.
erstreben|aspirar a|Wir erstreben eine faire Lösung.|Aspiramos a una solución justa.
erwirken|conseguir (por trámite)|Der Anwalt will eine Entscheidung erwirken.|El abogado quiere conseguir una resolución.
festschreiben|dejar establecido|Man will das Recht im Gesetz festschreiben.|Se quiere dejar el derecho establecido en la ley.
festsetzen|fijar|Das Gericht wird die Strafe festsetzen.|El tribunal va a fijar la pena.
fortführen|continuar|Wir wollen das Projekt fortführen.|Queremos continuar el proyecto.
gedeihen|prosperar|Pflanzen können hier gut gedeihen.|Las plantas pueden prosperar bien acá.
gutheißen|aprobar|Ich kann sein Verhalten nicht gutheißen.|No puedo aprobar su comportamiento.
herabsetzen|rebajar|Man will das Alter herabsetzen.|Se quiere bajar la edad.
herausfordern|desafiar|Das Problem will uns herausfordern.|El problema nos quiere desafiar.
hervorbringen|producir / dar origen a|Das Land kann viele Talente hervorbringen.|El país puede producir muchos talentos.
hervorrufen|provocar|Das kann Ärger hervorrufen.|Eso puede provocar enojo.
hinauslaufen|desembocar|Das wird auf Streit hinauslaufen.|Eso va a terminar en pelea.
hinzuziehen|consultar / sumar|Wir sollten einen Experten hinzuziehen.|Deberíamos sumar a un experto.
inszenieren|escenificar|Der Regisseur will das Stück neu inszenieren.|El director quiere escenificar la obra de nuevo.
kennzeichnen|caracterizar / marcar|Man muss die Produkte kennzeichnen.|Hay que etiquetar los productos.
lahmlegen|paralizar|Der Streik kann den Verkehr lahmlegen.|La huelga puede paralizar el tránsito.
missachten|desobedecer|Man darf die Regeln nicht missachten.|No se deben desobedecer las reglas.
nachholen|recuperar|Ich muss den Unterricht nachholen.|Tengo que recuperar la clase.
nahelegen|sugerir|Das Ergebnis kann einen Wechsel nahelegen.|El resultado puede sugerir un cambio.
protokollieren|levantar acta|Wir müssen die Sitzung protokollieren.|Tenemos que levantar acta de la reunión.
reglementieren|reglamentar|Man will den Verkauf reglementieren.|Se quiere reglamentar la venta.
sanieren|rehabilitar|Die Stadt will das Schulhaus sanieren.|La ciudad quiere rehabilitar la escuela.
schmälern|mermar|Das kann seinen Verdienst schmälern.|Eso puede mermar su mérito.
schüren|atizar|Man darf keine Angst schüren.|No se debe atizar el miedo.
sich bewähren|probar su valor|Die Methode wird sich bewähren.|El método va a probar su valor.
sich etablieren|establecerse|Die Firma konnte sich schnell etablieren.|La empresa pudo establecerse rápido.
sich herausstellen|resultar|Es kann sich herausstellen, dass er recht hat.|Puede resultar que tenga razón.
sich widersetzen|oponerse|Er wollte sich der Anordnung widersetzen.|Quiso oponerse a la orden.
standhalten|resistir|Die Brücke soll dem Sturm standhalten.|El puente debe resistir la tormenta.
umgehen|eludir / tratar con|Man kann die Regel nicht umgehen.|No se puede eludir la regla.
unterbinden|impedir|Wir wollen den Missbrauch unterbinden.|Queremos impedir el abuso.
unterschätzen|subestimar|Man darf den Aufwand nicht unterschätzen.|No se debe subestimar el esfuerzo.
unterwerfen|someter|Er wollte sich den Regeln nicht unterwerfen.|No quiso someterse a las reglas.
verbürgen|garantizar|Die Bank will die Schulden verbürgen.|El banco quiere avalar las deudas.
verfehlen|no alcanzar / errar|Wir wollen das Ziel nicht verfehlen.|No queremos errar el objetivo.
vergegenwärtigen|hacerse presente|Man sollte sich die Folgen vergegenwärtigen.|Habría que tener presentes las consecuencias.
vergüten|remunerar|Die Überstunden werden vergütet.|Las horas extra se remuneran.
verharmlosen|minimizar|Man darf das Risiko nicht verharmlosen.|No se debe minimizar el riesgo.
verheimlichen|ocultar|Er wollte die Wahrheit verheimlichen.|Quiso ocultar la verdad.
verlagern|trasladar|Die Firma will die Produktion verlagern.|La empresa quiere trasladar la producción.
verschleiern|encubrir|Man wollte die Zahlen verschleiern.|Se quiso encubrir las cifras.
versiegen|secarse|Die Quelle kann im Sommer versiegen.|La fuente puede secarse en verano.
verteidigen|defender|Sie will ihre Meinung verteidigen.|Quiere defender su opinión.
vertuschen|tapar (un asunto)|Man wollte den Skandal vertuschen.|Se quiso tapar el escándalo.
verzögern|retrasar|Der Regen kann die Arbeiten verzögern.|La lluvia puede retrasar las obras.
voraussagen|predecir|Niemand kann die Zukunft voraussagen.|Nadie puede predecir el futuro.
vorenthalten|privar / negar|Man darf ihm die Information nicht vorenthalten.|No se le puede negar la información.
vorführen|presentar / exponer|Wir wollen das Gerät vorführen.|Queremos presentar el aparato.
vorgeben|establecer / fingir|Der Staat will die Regeln vorgeben.|El Estado quiere establecer las reglas.
vorherrschen|predominar|Hier kann Unsicherheit vorherrschen.|Acá puede predominar la inseguridad.
vorsehen|prever (planificar)|Das Gesetz will Strafen vorsehen.|La ley quiere prever sanciones.
zugutekommen|beneficiar|Das Geld soll den Kindern zugutekommen.|El dinero debe beneficiar a los chicos.
zurückhalten|retener / contener|Er konnte seine Wut kaum zurückhalten.|Apenas pudo contener su furia.
zuwiderlaufen|ir en contra|Das kann unseren Interessen zuwiderlaufen.|Eso puede ir en contra de nuestros intereses.
abgelegen|apartado|Das Dorf liegt abgelegen.|El pueblo está apartado.
abwertend|despectivo|Er sprach abwertend über sie.|Habló de ella de manera despectiva.
angespannt|tenso|Die Lage ist angespannt.|La situación está tensa.
anmaßend|presuntuoso|Sein Ton war anmaßend.|Su tono fue presuntuoso.
anspruchslos|poco exigente|Er ist ein anspruchsloser Gast.|Es un huésped poco exigente.
arglos|ingenuo / confiado|Das Kind war arglos.|El chico era confiado.
aufgeschlossen|abierto|Sie ist neuen Ideen gegenüber aufgeschlossen.|Está abierta a ideas nuevas.
aufwändig|costoso (en esfuerzo)|Die Reparatur ist aufwändig.|La reparación es muy trabajosa.
ausgeglichen|equilibrado|Er hat einen ausgeglichenen Charakter.|Tiene un carácter equilibrado.
berechtigt|legítimo|Seine Sorge ist berechtigt.|Su preocupación es legítima.
berüchtigt|de mala fama|Das Viertel ist berüchtigt.|El barrio tiene mala fama.
besonnen|ponderado|Sie reagierte besonnen.|Reaccionó con ponderación.
bestürzt|consternado|Wir sind bestürzt über die Nachricht.|Estamos consternados por la noticia.
beunruhigend|inquietante|Die Zahlen sind beunruhigend.|Las cifras son inquietantes.
bewährt|probado|Das ist eine bewährte Methode.|Es un método probado.
diffus|difuso|Das Bild ist noch diffus.|El panorama todavía es difuso.
dubios|dudoso|Er macht dubiose Geschäfte.|Hace negocios dudosos.
einvernehmlich|de común acuerdo|Die Trennung war einvernehmlich.|La separación fue de común acuerdo.
empfindsam|sensible|Sie ist eine empfindsame Person.|Es una persona sensible.
entgegengesetzt|opuesto|Sie haben entgegengesetzte Meinungen.|Tienen opiniones opuestas.
entscheidungsfreudig|decidido|Der Chef ist sehr entscheidungsfreudig.|El jefe es muy decidido.
fadenscheinig|poco convincente|Seine Ausrede war fadenscheinig.|Su excusa era poco convincente.
fundiert|fundado|Das ist eine fundierte Kritik.|Es una crítica fundada.
geläufig|corriente|Der Begriff ist heute geläufig.|El concepto es hoy corriente.
glaubhaft|creíble|Seine Aussage ist glaubhaft.|Su declaración es creíble.
gleichermaßen|por igual|Das gilt für alle gleichermaßen.|Eso rige para todos por igual.
halbherzig|a medias|Sie versuchte es nur halbherzig.|Lo intentó solo a medias.
heftig|fuerte / violento|Es gab eine heftige Diskussion.|Hubo una discusión violenta.
idealistisch|idealista|Er ist ein idealistischer Lehrer.|Es un docente idealista.
ignorant|ignorante (desconsiderado)|Sein ignorantes Verhalten ärgert uns.|Su comportamiento desconsiderado nos enoja.
inakzeptabel|inaceptable|Das ist inakzeptabel.|Eso es inaceptable.
inhaltlich|en cuanto al contenido|Inhaltlich gibt es keine Einwände.|En cuanto al contenido, no hay objeciones.
intakt|intacto|Das Gebäude blieb intakt.|El edificio quedó intacto.
irreführend|engañoso|Die Werbung ist irreführend.|La publicidad es engañosa.
irreversibel|irreversible|Der Schaden ist irreversibel.|El daño es irreversible.
kleinlich|mezquino|Sei bitte nicht so kleinlich.|No seas tan mezquino, por favor.
lebensnah|cercano a la realidad|Der Unterricht ist lebensnah.|La clase está cerca de la vida real.
lückenlos|sin lagunas|Der Bericht ist lückenlos.|El informe no tiene lagunas.
makaber|macabro|Der Witz war makaber.|El chiste era macabro.
problematisch|problemático|Die Lage ist problematisch.|La situación es problemática.
scheinbar|aparente|Das ist ein scheinbarer Widerspruch.|Es una contradicción aparente.
skrupellos|sin escrúpulos|Er ist ein skrupelloser Geschäftsmann.|Es un empresario sin escrúpulos.
stillschweigend|tácitamente|Sie hat stillschweigend zugestimmt.|Aceptó tácitamente.
tragfähig|sostenible (viable)|Wir brauchen eine tragfähige Lösung.|Necesitamos una solución viable.
übermäßig|excesivo|Übermäßiger Lärm schadet der Gesundheit.|El ruido excesivo daña la salud.
überschaubar|manejable|Der Aufwand ist überschaubar.|El esfuerzo es manejable.
unabdingbar|imprescindible|Das ist unabdingbar.|Eso es imprescindible.
unabsehbar|imprevisible|Die Folgen sind unabsehbar.|Las consecuencias son imprevisibles.
unangemessen|inadecuado|Seine Reaktion war unangemessen.|Su reacción fue inadecuada.
unbegründet|infundado|Die Angst ist unbegründet.|El miedo es infundado.
unerheblich|irrelevante|Das ist unerheblich.|Eso es irrelevante.
unfreiwillig|involuntario|Er wurde unfreiwillig Zeuge.|Fue testigo sin querer.
ungehindert|sin obstáculos|Die Autos konnten ungehindert passieren.|Los autos pudieron pasar sin obstáculos.
unlängst|hace poco|Unlängst wurde das Gesetz geändert.|Hace poco se cambió la ley.
unmissverständlich|inequívoco|Sie sagte es unmissverständlich.|Lo dijo de forma inequívoca.
unrealistisch|poco realista|Der Plan ist unrealistisch.|El plan es poco realista.
unscheinbar|discreto|Das Haus ist unscheinbar.|La casa es discreta.
unstrittig|indiscutido|Das ist unstrittig.|Eso es indiscutido.
unverbindlich|sin compromiso|Das Angebot ist unverbindlich.|La oferta es sin compromiso.
unverhältnismäßig|desproporcionado|Die Strafe ist unverhältnismäßig.|La pena es desproporcionada.
unvoreingenommen|imparcial|Er hört unvoreingenommen zu.|Escucha sin prejuicios.
verbindlich|vinculante|Die Zusage ist verbindlich.|La confirmación es vinculante.
verbreitet|difundido|Der Irrtum ist weit verbreitet.|El error está muy difundido.
verdächtig|sospechoso|Das Paket sah verdächtig aus.|El paquete parecía sospechoso.
vereinzelt|aislado|Es gab vereinzelte Proteste.|Hubo protestas aisladas.
vermeintlich|supuesto|Der vermeintliche Täter war unschuldig.|El supuesto culpable era inocente.
verpflichtend|obligatorio|Die Teilnahme ist verpflichtend.|La participación es obligatoria.
verschwenderisch|derrochador|Er führt ein verschwenderisches Leben.|Lleva una vida derrochadora.
versöhnlich|conciliador|Sie schlug einen versöhnlichen Ton an.|Adoptó un tono conciliador.
voreilig|precipitado|Triff keine voreiligen Entscheidungen.|No tomes decisiones precipitadas.
vorläufig|provisorio|Das ist nur eine vorläufige Lösung.|Es solo una solución provisoria.
vorteilhaft|ventajoso|Das Angebot ist vorteilhaft.|La oferta es ventajosa.
wiederholt|reiterado|Er kam wiederholt zu spät.|Llegó tarde reiteradamente.
willkürlich|arbitrario|Die Auswahl war willkürlich.|La selección fue arbitraria.
zusehends|a ojos vistas|Die Lage verbessert sich zusehends.|La situación mejora a ojos vistas.
zweckmäßig|funcional|Die Ausstattung ist zweckmäßig.|El equipamiento es funcional.
## C1
die Abhandlung|el tratado|Er verfasste eine Abhandlung über die Aufklärung.|Redactó un tratado sobre la Ilustración.
die Ablösung|el relevo / la sustitución|Die Ablösung des Chefs kam überraschend.|El relevo del jefe fue sorpresivo.
die Abrechnung|el ajuste de cuentas / la liquidación|Die Rede war eine scharfe Abrechnung mit der Regierung.|El discurso fue un duro ajuste de cuentas con el gobierno.
die Affinität|la afinidad|Sie hat eine Affinität zu klassischer Musik.|Tiene afinidad por la música clásica.
die Ambivalenz|la ambivalencia|Seine Ambivalenz gegenüber dem Plan war spürbar.|Su ambivalencia ante el plan era notoria.
die Anfälligkeit|la propensión / la vulnerabilidad|Die Anfälligkeit für Fehler ist hoch.|La propensión a errores es alta.
die Angemessenheit|la adecuación|Die Angemessenheit der Strafe wurde geprüft.|Se examinó la adecuación de la pena.
die Anmaßung|la presunción|Das ist eine Anmaßung ohnegleichen.|Eso es una presunción sin igual.
die Ansiedlung|el establecimiento (de empresas, población)|Die Ansiedlung neuer Firmen soll gefördert werden.|Se quiere fomentar el establecimiento de nuevas empresas.
die Anspielung|la alusión|Er machte eine Anspielung auf ihre Vergangenheit.|Hizo una alusión a su pasado.
die Anteilnahme|la condolencia / el interés compasivo|Wir danken für Ihre Anteilnahme.|Agradecemos sus condolencias.
die Arroganz|la arrogancia|Seine Arroganz stößt viele ab.|Su arrogancia aleja a muchos.
die Aufarbeitung|la elaboración (de un pasado)|Die Aufarbeitung der Geschichte dauert an.|La elaboración de la historia continúa.
die Auflösung|la disolución / la resolución|Die Auflösung des Vertrags wurde beantragt.|Se solicitó la disolución del contrato.
die Aufrichtigkeit|la sinceridad|Ich schätze seine Aufrichtigkeit.|Valoro su sinceridad.
die Ausgewogenheit|el equilibrio / la imparcialidad|Die Ausgewogenheit der Berichterstattung wurde gelobt.|Se elogió el equilibrio de la cobertura.
die Ausprägung|la manifestación / el grado|Das Phänomen zeigt regional unterschiedliche Ausprägungen.|El fenómeno muestra manifestaciones distintas según la región.
die Ausrichtung|la orientación|Die politische Ausrichtung der Partei hat sich verschoben.|La orientación política del partido se desplazó.
die Autonomie|la autonomía|Die Region fordert mehr Autonomie.|La región exige más autonomía.
die Befangenheit|la parcialidad|Der Richter wurde wegen Befangenheit abgelehnt.|El juez fue recusado por parcialidad.
die Befindlichkeit|el estado de ánimo|Man darf persönliche Befindlichkeiten nicht überbewerten.|No hay que sobrevalorar los estados de ánimo personales.
die Beherrschung|el autocontrol / el dominio|Er verlor die Beherrschung.|Perdió el autocontrol.
die Beliebigkeit|la arbitrariedad|Die Beliebigkeit der Kriterien ist erschreckend.|La arbitrariedad de los criterios es alarmante.
die Bereicherung|el enriquecimiento|Die Vielfalt ist eine Bereicherung für die Stadt.|La diversidad es un enriquecimiento para la ciudad.
die Besinnung|la reflexión / el conocimiento|Nach dem Unfall kam er schnell zur Besinnung.|Tras el accidente recobró pronto el conocimiento.
die Besonnenheit|la ecuanimidad|Sie handelte mit großer Besonnenheit.|Actuó con gran ecuanimidad.
die Betroffenheit|la consternación|Die Nachricht löste große Betroffenheit aus.|La noticia causó gran consternación.
die Beweislast|la carga de la prueba|Die Beweislast liegt beim Kläger.|La carga de la prueba recae en el demandante.
die Bürde|la carga|Er trägt die Bürde der Verantwortung.|Carga con el peso de la responsabilidad.
die Demut|la humildad|Sie sprach mit Demut über ihren Erfolg.|Habló con humildad de su éxito.
die Differenzierung|la diferenciación|Die Debatte braucht mehr Differenzierung.|El debate necesita más matices.
die Disposition|la predisposición|Eine genetische Disposition erhöht das Risiko.|Una predisposición genética aumenta el riesgo.
die Divergenz|la divergencia|Die Divergenz der Meinungen ist groß.|La divergencia de opiniones es grande.
die Dominanz|el predominio|Die Dominanz weniger Konzerne beunruhigt.|El predominio de pocas corporaciones inquieta.
die Doppelmoral|la doble moral|Man warf ihr Doppelmoral vor.|Le reprocharon doble moral.
die Eigendynamik|la dinámica propia|Der Prozess entwickelte eine Eigendynamik.|El proceso desarrolló una dinámica propia.
die Eigenheit|la peculiaridad|Jede Region hat ihre Eigenheiten.|Cada región tiene sus peculiaridades.
die Einbettung|la integración / el encuadre|Die Einbettung der Studie in den Kontext fehlt.|Falta el encuadre del estudio en su contexto.
die Eindeutigkeit|la inequivocidad|Die Eindeutigkeit des Ergebnisses überrascht.|La claridad del resultado sorprende.
die Einseitigkeit|la parcialidad (unilateralidad)|Die Einseitigkeit des Berichts wurde kritisiert.|Se criticó la unilateralidad del informe.
die Elite|la élite|Die Elite des Landes traf sich in Davos.|La élite del país se reunió en Davos.
die Emanzipation|la emancipación|Die Emanzipation der Frauen veränderte die Gesellschaft.|La emancipación de las mujeres cambió la sociedad.
die Entbehrung|la privación|Die Familie litt unter Entbehrungen.|La familia sufría privaciones.
die Entmündigung|la tutela / el paternalismo|Viele empfinden das Gesetz als Entmündigung.|Muchos sienten la ley como paternalismo.
die Entrüstung|la indignación|Die Entrüstung über das Urteil war groß.|La indignación por la sentencia fue grande.
die Erblast|la carga heredada|Die Erblast der Vorgänger belastet die Regierung.|La carga heredada de los predecesores pesa sobre el gobierno.
die Ernüchterung|el desengaño|Auf die Euphorie folgte Ernüchterung.|A la euforia siguió el desengaño.
die Erosion|la erosión|Die Erosion des Vertrauens beschleunigt sich.|La erosión de la confianza se acelera.
die Erschütterung|la conmoción|Die Nachricht löste Erschütterung aus.|La noticia provocó conmoción.
die Essenz|la esencia|Das ist die Essenz seiner Philosophie.|Esa es la esencia de su filosofía.
die Etablierung|el establecimiento|Die Etablierung neuer Standards dauert Jahre.|El establecimiento de nuevos estándares lleva años.
die Evidenz|la evidencia|Die Evidenz spricht für diese These.|La evidencia respalda esta tesis.
die Exklusivität|la exclusividad|Die Exklusivität des Angebots hat ihren Preis.|La exclusividad de la oferta tiene su precio.
die Fehlentwicklung|la evolución errónea|Wir müssen Fehlentwicklungen frühzeitig erkennen.|Debemos detectar a tiempo las evoluciones erróneas.
die Fixierung|la fijación|Seine Fixierung auf Zahlen ist auffällig.|Su fijación con las cifras es llamativa.
die Flüchtigkeit|la fugacidad|Die Flüchtigkeit des Ruhms ist bekannt.|La fugacidad de la fama es conocida.
die Fragilität|la fragilidad|Die Fragilität des Friedens bleibt bestehen.|La fragilidad de la paz persiste.
die Freizügigkeit|la libre circulación|Die Freizügigkeit gilt innerhalb der Union.|La libre circulación rige dentro de la Unión.
die Furcht|el temor|Furcht lähmte die Verhandlungspartner.|El temor paralizó a los negociadores.
die Gebundenheit|la vinculación|Die Gebundenheit an Traditionen schränkt ein.|La vinculación a las tradiciones limita.
die Geringschätzung|el desprecio|Er sprach mit Geringschätzung von seinen Kollegen.|Habló con desprecio de sus colegas.
die Gesinnung|la ideología / el pensamiento|Man beurteilte ihn nach seiner Gesinnung.|Lo juzgaron por su manera de pensar.
die Gewichtung|la ponderación|Die Gewichtung der Kriterien ist umstritten.|La ponderación de los criterios es discutida.
die Glorifizierung|la glorificación|Die Glorifizierung der Vergangenheit ist gefährlich.|La glorificación del pasado es peligrosa.
die Grauzone|la zona gris|Rechtlich bewegt sich das in einer Grauzone.|Jurídicamente esto se mueve en una zona gris.
die Gratwanderung|el equilibrio precario|Die Verhandlung war eine Gratwanderung.|La negociación fue un equilibrio precario.
die Grundhaltung|la actitud básica|Seine Grundhaltung ist skeptisch.|Su actitud básica es escéptica.
die Gültigkeit|la validez|Die Gültigkeit des Vertrags wird bestritten.|Se discute la validez del contrato.
die Hegemonie|la hegemonía|Die Hegemonie der Großmächte schwindet.|La hegemonía de las grandes potencias se debilita.
die Heuchelei|la hipocresía|Das ist reine Heuchelei.|Eso es pura hipocresía.
die Hybris|la soberbia|Seine Hybris wurde ihm zum Verhängnis.|Su soberbia fue su perdición.
die Imitation|la imitación|Das Bild ist nur eine Imitation.|El cuadro es solo una imitación.
die Immunität|la inmunidad|Abgeordnete genießen Immunität.|Los diputados gozan de inmunidad.
die Indifferenz|la indiferencia|Ihre Indifferenz verletzte ihn.|Su indiferencia lo hirió.
die Integrität|la integridad|Seine Integrität steht außer Frage.|Su integridad está fuera de duda.
die Intransparenz|la opacidad|Die Intransparenz des Verfahrens wurde kritisiert.|Se criticó la opacidad del procedimiento.
die Ironie|la ironía|Seine Ironie wurde nicht von allen verstanden.|Su ironía no fue entendida por todos.
die Kapitulation|la capitulación|Die Kapitulation beendete den Krieg.|La capitulación puso fin a la guerra.
die Kausalität|la causalidad|Die Kausalität zwischen beiden Ereignissen ist unklar.|La causalidad entre ambos hechos no está clara.
die Klientel|la clientela|Die Partei bedient vor allem ihre Klientel.|El partido atiende sobre todo a su clientela.
die Koexistenz|la coexistencia|Die Koexistenz beider Systeme ist möglich.|La coexistencia de ambos sistemas es posible.
die Kohärenz|la coherencia|Dem Plan fehlt es an Kohärenz.|Al plan le falta coherencia.
die Konfrontation|la confrontación|Eine direkte Konfrontation wollte er vermeiden.|Quería evitar una confrontación directa.
die Konsolidierung|la consolidación|Die Konsolidierung des Haushalts hat Vorrang.|La consolidación del presupuesto tiene prioridad.
die Konvention|la convención|Er brach mit allen Konventionen.|Rompió con todas las convenciones.
die Kulisse|el decorado|Die Altstadt bildet die Kulisse des Films.|El casco antiguo es el decorado de la película.
die Legitimation|la legitimación|Dem Verfahren fehlt die demokratische Legitimation.|Al procedimiento le falta legitimación democrática.
die Lethargie|la letargia|Eine gewisse Lethargie hatte das Land erfasst.|Cierta letargia se había apoderado del país.
die Linderung|el alivio|Die Salbe brachte Linderung.|La pomada trajo alivio.
die Loyalität|la lealtad|Seine Loyalität zur Firma ist unbestritten.|Su lealtad a la empresa es indiscutible.
die Machbarkeit|la viabilidad|Die Machbarkeit des Projekts wird geprüft.|Se examina la viabilidad del proyecto.
die Marginalisierung|la marginación|Die Marginalisierung ganzer Gruppen ist ein Risiko.|La marginación de grupos enteros es un riesgo.
die Mäßigung|la moderación|Der Präsident rief zur Mäßigung auf.|El presidente llamó a la moderación.
die Metapher|la metáfora|Die Metapher des Hauses taucht immer wieder auf.|La metáfora de la casa aparece una y otra vez.
die Mündigkeit|la mayoría de edad (autonomía)|Die Mündigkeit der Bürger ist die Basis der Demokratie.|La autonomía de los ciudadanos es la base de la democracia.
die Nachlässigkeit|el descuido|Der Unfall geschah aus Nachlässigkeit.|El accidente ocurrió por descuido.
die Nachsicht|la indulgencia|Haben Sie bitte Nachsicht mit mir.|Tenga indulgencia conmigo, por favor.
die Naivität|la ingenuidad|Ihre Naivität ist rührend.|Su ingenuidad es conmovedora.
die Nostalgie|la nostalgia|Mit Nostalgie erinnert er sich an die Kindheit.|Recuerda la infancia con nostalgia.
die Nuance|el matiz|Es kommt auf jede Nuance an.|Cada matiz importa.
die Objektivität|la objetividad|Die Objektivität des Gutachtens wurde angezweifelt.|Se puso en duda la objetividad del peritaje.
die Ohnmacht|la impotencia / el desmayo|Er empfand Ohnmacht angesichts der Lage.|Sintió impotencia ante la situación.
die Polarisierung|la polarización|Die Polarisierung der Gesellschaft nimmt zu.|La polarización de la sociedad aumenta.
die Prämisse|la premisa|Die Prämisse des Arguments ist falsch.|La premisa del argumento es falsa.
die Prekarität|la precariedad|Die Prekarität vieler Arbeitsverhältnisse wächst.|La precariedad de muchas relaciones laborales crece.
die Propaganda|la propaganda|Der Sender verbreitet Propaganda.|La emisora difunde propaganda.
die Quintessenz|la quintaesencia|Die Quintessenz des Vortrags war einfach.|La conclusión esencial de la charla era simple.
die Rationalität|la racionalidad|Er appellierte an die Rationalität der Zuhörer.|Apeló a la racionalidad de los oyentes.
die Redlichkeit|la honradez|Ihre Redlichkeit wird allgemein geschätzt.|Su honradez es apreciada por todos.
die Reibung|la fricción|Zwischen beiden Abteilungen gibt es Reibungen.|Hay fricciones entre ambos departamentos.
die Resignation|la resignación|Resignation machte sich breit.|Se extendió la resignación.
die Resilienz|la resiliencia|Resilienz hilft, Krisen zu bewältigen.|La resiliencia ayuda a superar crisis.
die Restriktion|la restricción|Die Restriktionen wurden gelockert.|Las restricciones se flexibilizaron.
die Rhetorik|la retórica|Seine Rhetorik war überzeugend.|Su retórica era convincente.
die Sachlichkeit|la objetividad (tono objetivo)|Er bat um Sachlichkeit in der Debatte.|Pidió objetividad en el debate.
die Schieflage|el desequilibrio|Der Haushalt gerät in Schieflage.|El presupuesto entra en desequilibrio.
die Schlichtheit|la sencillez|Die Schlichtheit des Raums beeindruckt.|La sencillez de la sala impresiona.
die Schnittmenge|la intersección|Die Schnittmenge beider Programme ist gering.|La intersección de ambos programas es pequeña.
die Selbstkritik|la autocrítica|Es fehlte an Selbstkritik.|Faltó autocrítica.
die Selbstüberschätzung|la sobreestimación de sí mismo|Selbstüberschätzung führte zum Scheitern.|La sobreestimación de sí mismo llevó al fracaso.
die Sensibilität|la sensibilidad|Das Thema erfordert Sensibilität.|El tema exige sensibilidad.
die Souveränität|la soberanía / el aplomo|Sie meisterte die Situation mit Souveränität.|Resolvió la situación con aplomo.
die Spezialisierung|la especialización|Die Spezialisierung auf ein Fach ist üblich.|La especialización en una materia es habitual.
die Standhaftigkeit|la firmeza|Man lobte ihre Standhaftigkeit.|Elogiaron su firmeza.
die Stigmatisierung|la estigmatización|Die Stigmatisierung Betroffener muss enden.|La estigmatización de los afectados debe terminar.
die Suggestion|la sugestión|Die Suggestion wirkte stärker als Fakten.|La sugestión actuó más que los hechos.
die Symbiose|la simbiosis|Beide Branchen leben in Symbiose.|Ambos sectores viven en simbiosis.
die Synthese|la síntesis|Das Werk ist eine Synthese verschiedener Stile.|La obra es una síntesis de diversos estilos.
die Täuschung|el engaño|Die Täuschung flog schnell auf.|El engaño se descubrió pronto.
die Teilhabe|la participación (en la sociedad)|Bildung ermöglicht gesellschaftliche Teilhabe.|La educación permite la participación social.
die Trägheit|la inercia|Die Trägheit der Verwaltung ärgert viele.|La inercia de la administración enoja a muchos.
die Überheblichkeit|la altivez|Seine Überheblichkeit macht ihn unbeliebt.|Su altivez lo vuelve impopular.
die Überlieferung|la tradición transmitida|Nach der Überlieferung gründete er die Stadt.|Según la tradición, él fundó la ciudad.
die Überspitzung|la exageración|Die Überspitzung schadet der Argumentation.|La exageración daña la argumentación.
die Umdeutung|la reinterpretación|Die Umdeutung der Geschichte ist problematisch.|La reinterpretación de la historia es problemática.
die Unbefangenheit|la naturalidad|Er sprach mit kindlicher Unbefangenheit.|Habló con naturalidad infantil.
die Unschärfe|la imprecisión|Die Unschärfe der Begriffe erschwert die Debatte.|La imprecisión de los términos dificulta el debate.
die Unvereinbarkeit|la incompatibilidad|Die Unvereinbarkeit beider Ziele ist offenkundig.|La incompatibilidad de ambos objetivos es evidente.
die Unwägbarkeit|la incertidumbre|Das Projekt birgt viele Unwägbarkeiten.|El proyecto encierra muchas incertidumbres.
die Urteilskraft|el criterio / el juicio|Ihm fehlt die nötige Urteilskraft.|Le falta el criterio necesario.
die Verbundenheit|la vinculación afectiva|Er spürte eine tiefe Verbundenheit mit der Heimat.|Sintió un profundo vínculo con la tierra natal.
die Verdrängung|la represión / el desplazamiento|Die Verdrängung unangenehmer Wahrheiten hilft nicht.|Reprimir verdades incómodas no ayuda.
die Verflechtung|el entrelazamiento|Die Verflechtung von Politik und Wirtschaft ist eng.|El entrelazamiento de política y economía es estrecho.
die Vergänglichkeit|la fugacidad|Das Gedicht handelt von der Vergänglichkeit.|El poema trata de la fugacidad.
die Verklärung|la idealización|Die Verklärung der Kindheit ist weit verbreitet.|La idealización de la infancia está muy difundida.
die Verknappung|la escasez|Die Verknappung des Angebots treibt die Preise.|La escasez de la oferta empuja los precios.
die Verleumdung|la calumnia|Er klagte wegen Verleumdung.|Demandó por calumnia.
die Verlockung|la tentación|Der Verlockung konnte er nicht widerstehen.|No pudo resistir la tentación.
die Vermarktung|la comercialización|Die Vermarktung des Produkts beginnt im Herbst.|La comercialización del producto empieza en otoño.
die Verrohung|el embrutecimiento|Man beklagt die Verrohung der Sprache.|Se lamenta el embrutecimiento del lenguaje.
die Versuchung|la tentación|Die Versuchung, aufzugeben, war groß.|La tentación de rendirse era grande.
die Verwahrlosung|el abandono|Die Verwahrlosung des Viertels schreitet voran.|El abandono del barrio avanza.
die Vorherrschaft|el predominio|Die Vorherrschaft der Konzerne wird kritisiert.|Se critica el predominio de las corporaciones.
die Voreingenommenheit|el prejuicio|Er urteilte ohne Voreingenommenheit.|Juzgó sin prejuicios.
die Weitsicht|la visión de futuro|Dem Plan fehlt es an Weitsicht.|Al plan le falta visión de futuro.
die Widerstandsfähigkeit|la resistencia|Die Widerstandsfähigkeit der Wirtschaft wurde getestet.|Se puso a prueba la resistencia de la economía.
die Wiederherstellung|el restablecimiento|Die Wiederherstellung der Ordnung dauerte Wochen.|El restablecimiento del orden llevó semanas.
die Zäsur|la cesura / el punto de quiebre|Das Jahr 1989 bildet eine Zäsur.|El año 1989 marca un punto de quiebre.
die Zerrissenheit|la escisión interior|Die Zerrissenheit der Partei war offensichtlich.|La división interna del partido era evidente.
die Zersplitterung|la fragmentación|Die Zersplitterung der Opposition nützt der Regierung.|La fragmentación de la oposición beneficia al gobierno.
die Zweckentfremdung|el uso indebido (con otro fin)|Die Zweckentfremdung von Wohnraum ist verboten.|Destinar viviendas a otro fin está prohibido.
der Abgrund|el abismo|Das Land stand am Rand des Abgrunds.|El país estaba al borde del abismo.
der Anachronismus|el anacronismo|Die Regel ist ein Anachronismus.|La regla es un anacronismo.
der Anhaltspunkt|el indicio|Es gibt keine Anhaltspunkte für einen Betrug.|No hay indicios de fraude.
der Ansporn|el estímulo|Das Lob war ihm ein Ansporn.|El elogio fue un estímulo para él.
der Aufruhr|el tumulto|Die Entscheidung löste Aufruhr aus.|La decisión provocó un tumulto.
der Ausweg|la salida|Es gibt keinen einfachen Ausweg.|No hay una salida fácil.
der Beigeschmack|el regusto|Der Sieg hatte einen bitteren Beigeschmack.|La victoria tuvo un regusto amargo.
der Betrachter|el observador|Je nach Betrachter wirkt das Bild anders.|Según el observador, el cuadro se ve distinto.
der Dünkel|la presunción|Sein Dünkel ist unerträglich.|Su presunción es insoportable.
der Egoismus|el egoísmo|Egoismus zerstört das Vertrauen.|El egoísmo destruye la confianza.
der Eifer|el empeño|Mit Eifer ging er ans Werk.|Se puso a trabajar con empeño.
der Einwurf|la objeción (intervención)|Ein Einwurf aus dem Publikum unterbrach ihn.|Una intervención del público lo interrumpió.
der Erfahrungsschatz|el bagaje de experiencia|Ihr Erfahrungsschatz ist unbezahlbar.|Su bagaje de experiencia es invaluable.
der Erklärungsansatz|el planteo explicativo|Dieser Erklärungsansatz überzeugt nicht.|Este planteo explicativo no convence.
der Fatalismus|el fatalismo|Fatalismus lähmt jede Initiative.|El fatalismo paraliza toda iniciativa.
der Fehlgriff|el desacierto|Die Ernennung war ein Fehlgriff.|El nombramiento fue un desacierto.
der Gegenentwurf|la contrapropuesta|Die Opposition legte einen Gegenentwurf vor.|La oposición presentó una contrapropuesta.
der Geltungsdrang|la necesidad de lucirse|Sein Geltungsdrang ist ermüdend.|Su necesidad de lucirse es agotadora.
der Gesinnungswandel|el cambio de convicciones|Sein Gesinnungswandel überraschte alle.|Su cambio de convicciones sorprendió a todos.
der Hochmut|la soberbia|Hochmut kommt vor dem Fall.|La soberbia precede a la caída.
der Idealismus|el idealismo|Ihr Idealismus beeindruckt.|Su idealismo impresiona.
der Impetus|el ímpetu|Mit neuem Impetus ging er ans Werk.|Con nuevo ímpetu se puso manos a la obra.
der Irrglaube|la creencia errónea|Das ist ein weit verbreiteter Irrglaube.|Es una creencia errónea muy difundida.
der Irrweg|el camino equivocado|Das war ein Irrweg.|Fue un camino equivocado.
der Katalysator|el catalizador|Die Krise wirkte als Katalysator.|La crisis actuó como catalizador.
der Kleinmut|la pusilanimidad|Kleinmut verhindert jeden Fortschritt.|La pusilanimidad impide todo progreso.
der Kniff|el truco|Er kennt jeden Kniff.|Conoce todos los trucos.
der Kontrapunkt|el contrapunto|Der Text setzt einen Kontrapunkt zur Debatte.|El texto aporta un contrapunto al debate.
der Lackmustest|la prueba de fuego|Die Wahl wird zum Lackmustest.|La elección será la prueba de fuego.
der Lebensentwurf|el proyecto de vida|Jeder hat einen anderen Lebensentwurf.|Cada uno tiene un proyecto de vida distinto.
der Leitgedanke|la idea rectora|Der Leitgedanke des Programms ist Gerechtigkeit.|La idea rectora del programa es la justicia.
der Makel|la mancha / el defecto|Der Skandal blieb ein Makel.|El escándalo quedó como una mancha.
der Mehrheitswille|la voluntad de la mayoría|Der Mehrheitswille muss respektiert werden.|Hay que respetar la voluntad de la mayoría.
der Missklang|la disonancia|Ein Missklang trübte die Feier.|Una disonancia empañó la fiesta.
der Mitläufer|el seguidor sin convicción|Viele waren nur Mitläufer.|Muchos eran solo seguidores sin convicción.
der Mythos|el mito|Der Mythos hält sich hartnäckig.|El mito persiste tercamente.
der Nimbus|el aura|Der Nimbus des Unfehlbaren schwand.|El aura de infalible se desvaneció.
der Opportunismus|el oportunismo|Man warf ihm Opportunismus vor.|Le reprocharon oportunismo.
der Pragmatismus|el pragmatismo|Pragmatismus kennzeichnet seine Politik.|El pragmatismo caracteriza su política.
der Reiz|el atractivo|Der Reiz des Neuen lässt schnell nach.|El atractivo de lo nuevo decae rápido.
der Rückzug|la retirada|Der Rückzug der Truppen begann im Mai.|La retirada de las tropas empezó en mayo.
der Scheideweg|la encrucijada|Das Land steht am Scheideweg.|El país está en una encrucijada.
der Schleier|el velo|Ein Schleier von Nebel lag über dem Tal.|Un velo de niebla cubría el valle.
der Schlüsselbegriff|el concepto clave|Nachhaltigkeit ist der Schlüsselbegriff.|La sostenibilidad es el concepto clave.
der Schulterschluss|el cierre de filas|Es kam zu einem Schulterschluss der Parteien.|Hubo un cierre de filas de los partidos.
der Seitenhieb|la indirecta|Er verteilte einen Seitenhieb gegen den Kollegen.|Lanzó una indirecta contra el colega.
der Sprengstoff|el material explosivo (fig.)|Das Thema birgt sozialen Sprengstoff.|El tema encierra material explosivo social.
der Stachel|el aguijón|Die Kritik saß wie ein Stachel.|La crítica se clavó como un aguijón.
der Stellvertreter|el suplente|Der Stellvertreter übernahm die Leitung.|El suplente asumió la dirección.
der Stolperstein|el obstáculo|Die Finanzierung wurde zum Stolperstein.|La financiación se volvió un obstáculo.
der Tenor|el tono general|Der Tenor der Berichte ist positiv.|El tono general de los informes es positivo.
der Überdruss|el hartazgo|Ein gewisser Überdruss machte sich breit.|Se extendió cierto hartazgo.
der Umbau|la reestructuración|Der Umbau der Verwaltung ist geplant.|Se planea la reestructuración de la administración.
der Untergang|la caída / el hundimiento|Der Untergang des Reiches kam schleichend.|La caída del imperio fue gradual.
der Unterton|el matiz (tono implícito)|In seiner Stimme lag ein bitterer Unterton.|En su voz había un matiz amargo.
der Vorwand|el pretexto|Er nutzte die Krankheit als Vorwand.|Usó la enfermedad como pretexto.
der Wegbereiter|el precursor|Er gilt als Wegbereiter der Moderne.|Se lo considera precursor de la modernidad.
der Wendehals|el veleta (oportunista)|Man nannte ihn einen Wendehals.|Lo llamaron veleta.
der Wesenszug|el rasgo de carácter|Ehrgeiz ist ihr prägender Wesenszug.|La ambición es su rasgo de carácter más marcado.
der Widerhall|el eco|Die Rede fand großen Widerhall.|El discurso tuvo gran eco.
der Wirkungskreis|el ámbito de acción|Sein Wirkungskreis ist begrenzt.|Su ámbito de acción es limitado.
der Zielkonflikt|el conflicto de objetivos|Es besteht ein Zielkonflikt zwischen Kosten und Qualität.|Hay un conflicto de objetivos entre costo y calidad.
der Zugzwang|la obligación de actuar|Die Regierung geriet in Zugzwang.|El gobierno se vio obligado a actuar.
der Zwischenruf|la interrupción (grito)|Ein Zwischenruf unterbrach die Rede.|Una interrupción cortó el discurso.
das Ansinnen|la pretensión|Sein Ansinnen wurde abgelehnt.|Su pretensión fue rechazada.
das Bekenntnis|la profesión de fe / el compromiso declarado|Die Partei legte ein klares Bekenntnis zur Demokratie ab.|El partido hizo una clara declaración a favor de la democracia.
das Dasein|la existencia|Er führte ein bescheidenes Dasein.|Llevó una existencia modesta.
das Elend|la miseria|Das Elend der Flüchtlinge ist groß.|La miseria de los refugiados es grande.
das Fiasko|el fiasco|Die Veranstaltung endete im Fiasko.|El evento terminó en un fiasco.
das Fundament|el cimiento|Vertrauen ist das Fundament jeder Beziehung.|La confianza es el cimiento de toda relación.
das Gebaren|el comportamiento (ostentoso)|Sein Gebaren war unangemessen.|Su comportamiento fue inapropiado.
das Gedankenspiel|el ejercicio mental|Das ist nur ein Gedankenspiel.|Es solo un ejercicio mental.
das Geltungsbedürfnis|la necesidad de reconocimiento|Sein Geltungsbedürfnis kennt keine Grenzen.|Su necesidad de reconocimiento no tiene límites.
das Gleichnis|la parábola|Er erklärte es in einem Gleichnis.|Lo explicó en una parábola.
das Hirngespinst|la quimera|Das Projekt blieb ein Hirngespinst.|El proyecto quedó en una quimera.
das Idiom|el modismo|Dieses Idiom ist schwer zu übersetzen.|Este modismo es difícil de traducir.
das Kuriosum|la curiosidad|Das Museum zeigt viele Kuriosa.|El museo muestra muchas curiosidades.
das Lippenbekenntnis|la declaración de boquilla|Die Zusagen blieben Lippenbekenntnisse.|Las promesas quedaron en declaraciones de boquilla.
das Machtwort|el golpe de autoridad|Der Chef sprach ein Machtwort.|El jefe puso fin a la discusión con su autoridad.
das Manko|la carencia|Das größte Manko ist die fehlende Erfahrung.|La mayor carencia es la falta de experiencia.
das Narrativ|el relato|Das Narrativ der Regierung wird bezweifelt.|Se duda del relato del gobierno.
das Naturell|el temperamento|Sie hat ein sonniges Naturell.|Tiene un temperamento soleado.
das Pathos|el patetismo|Seine Rede war voller Pathos.|Su discurso estaba lleno de patetismo.
das Refugium|el refugio|Der Garten ist ihr Refugium.|El jardín es su refugio.
das Regulativ|el mecanismo regulador|Der Markt dient als Regulativ.|El mercado actúa como mecanismo regulador.
das Ressentiment|el resentimiento|Sein Ressentiment gegen die Elite ist bekannt.|Su resentimiento contra la élite es conocido.
das Rückgrat|la columna vertebral / el carácter|Er hat Rückgrat bewiesen.|Demostró tener carácter.
das Sammelsurium|el revoltijo|Das Zimmer war ein Sammelsurium alter Möbel.|La habitación era un revoltijo de muebles viejos.
das Signal|la señal|Das Ergebnis sendet ein deutliches Signal.|El resultado envía una señal clara.
das Surrogat|el sucedáneo|Der Ersatz blieb ein Surrogat.|El reemplazo quedó como un sucedáneo.
das Verhängnis|la perdición|Sein Leichtsinn wurde ihm zum Verhängnis.|Su imprudencia fue su perdición.
das Vermächtnis|el legado|Sein Vermächtnis wirkt bis heute nach.|Su legado sigue vigente hasta hoy.
das Wagnis|la osadía|Die Gründung war ein Wagnis.|La fundación fue una osadía.
das Wechselspiel|la interacción|Das Wechselspiel von Angebot und Nachfrage bestimmt den Preis.|La interacción entre oferta y demanda determina el precio.
das Zerrbild|la imagen distorsionada|Der Film zeichnet ein Zerrbild der Realität.|La película pinta una imagen distorsionada de la realidad.
das Zwielicht|la penumbra / ambigüedad|Der Fall steht im Zwielicht.|El caso está en una zona ambigua.
abtun|descartar / quitar importancia|Man darf Kritik nicht einfach abtun.|No se debe descartar la crítica sin más.
abverlangen|exigir|Der Beruf kann einem viel abverlangen.|La profesión puede exigir mucho.
anecken|chocar (con otros)|Er will mit seiner Meinung nicht anecken.|No quiere chocar con su opinión.
anfachen|avivar|Der Vorfall kann die Debatte neu anfachen.|El incidente puede avivar el debate de nuevo.
anmahnen|reclamar / advertir|Die Opposition will mehr Transparenz anmahnen.|La oposición quiere reclamar más transparencia.
anspornen|incentivar|Das Lob soll ihn anspornen.|El elogio debe incentivarlo.
aufbegehren|rebelarse|Die Bürger wollen gegen die Willkür aufbegehren.|Los ciudadanos quieren rebelarse contra la arbitrariedad.
aufbürden|cargar (con algo)|Man darf den Kindern nicht alle Lasten aufbürden.|No se debe cargar a los chicos con todas las cargas.
aufhorchen|prestar atención de golpe|Das ließ die Zuhörer aufhorchen.|Eso hizo que los oyentes prestaran atención de golpe.
aufrütteln|sacudir (conciencias)|Der Bericht soll die Öffentlichkeit aufrütteln.|El informe quiere sacudir a la opinión pública.
aufwiegen|compensar|Der Gewinn kann die Verluste nicht aufwiegen.|La ganancia no puede compensar las pérdidas.
ausblenden|dejar de lado|Man darf die Risiken nicht ausblenden.|No se deben dejar de lado los riesgos.
ausharren|perseverar / aguantar|Sie mussten stundenlang in der Kälte ausharren.|Tuvieron que aguantar horas en el frío.
auskosten|saborear|Wir wollen den Moment voll auskosten.|Queremos saborear el momento por completo.
ausloten|sondear|Wir wollen die Möglichkeiten ausloten.|Queremos sondear las posibilidades.
ausufern|desbordarse|Die Diskussion kann leicht ausufern.|La discusión puede desbordarse fácilmente.
beanstanden|objetar|Der Prüfer will die Rechnung beanstanden.|El auditor quiere objetar la factura.
beargwöhnen|recelar de|Man beargwöhnte jeden seiner Schritte.|Se recelaba de cada uno de sus pasos.
bedrängen|presionar / acosar|Man darf Zeugen nicht bedrängen.|No se debe presionar a los testigos.
beflügeln|dar alas|Der Erfolg kann das ganze Team beflügeln.|El éxito puede dar alas a todo el equipo.
beherzigen|tomar a pecho|Ich werde deinen Rat beherzigen.|Voy a tomar tu consejo a pecho.
beipflichten|asentir|Dem kann ich nur beipflichten.|Solo puedo asentir a eso.
beirren|hacer dudar|Er ließ sich nicht beirren.|No se dejó hacer dudar.
bejahen|afirmar|Die Mehrheit würde die Frage bejahen.|La mayoría respondería afirmativamente a la pregunta.
beschönigen|edulcorar|Man sollte die Lage nicht beschönigen.|No habría que edulcorar la situación.
besinnen|reflexionar|Wir sollten uns auf unsere Stärken besinnen.|Deberíamos recordar nuestras fortalezas.
bevormunden|tratar con paternalismo|Niemand will sich bevormunden lassen.|Nadie quiere que lo traten con paternalismo.
bewerkstelligen|lograr (llevar a cabo)|Wie wollen Sie das bewerkstelligen?|¿Cómo piensa lograrlo?
bezichtigen|acusar|Man wollte ihn der Lüge bezichtigen.|Se lo quería acusar de mentir.
brandmarken|estigmatizar|Man darf Menschen nicht pauschal brandmarken.|No se debe estigmatizar a las personas en bloque.
bündeln|concentrar|Wir sollten unsere Kräfte bündeln.|Deberíamos concentrar nuestras fuerzas.
distanzieren|distanciarse|Er musste sich von der Aussage distanzieren.|Tuvo que distanciarse de la declaración.
durchblicken|dar a entender|Er ließ durchblicken, dass er gehen wolle.|Dio a entender que quería irse.
einbüßen|perder|Das Land kann an Einfluss einbüßen.|El país puede perder influencia.
einebnen|nivelar|Man will Unterschiede nicht einebnen.|No se quiere nivelar las diferencias.
einfließen|incorporarse|Ihre Erfahrungen sollen in den Bericht einfließen.|Sus experiencias deben incorporarse al informe.
einlenken|ceder|Die Regierung musste schließlich einlenken.|El gobierno tuvo que ceder finalmente.
einschleusen|infiltrar|Man wollte Agenten einschleusen.|Se quería infiltrar agentes.
einschüchtern|intimidar|Wir lassen uns nicht einschüchtern.|No nos dejamos intimidar.
einweihen|poner al tanto|Er wollte sie in den Plan einweihen.|Quiso ponerla al tanto del plan.
entfachen|encender / desatar|Der Vorschlag könnte einen Streit entfachen.|La propuesta podría desatar una disputa.
entgleisen|descarrilarse|Die Debatte drohte zu entgleisen.|El debate amenazaba con descarrilarse.
entrüsten|indignar|Das Urteil kann viele entrüsten.|La sentencia puede indignar a muchos.
entschärfen|desactivar / suavizar|Man will den Konflikt entschärfen.|Se quiere desactivar el conflicto.
entwerten|desvalorizar|Die Inflation kann Ersparnisse entwerten.|La inflación puede desvalorizar los ahorros.
erahnen|vislumbrar|Man kann die Folgen nur erahnen.|Las consecuencias solo se pueden vislumbrar.
erdulden|soportar|Er musste viel Leid erdulden.|Tuvo que soportar mucho sufrimiento.
ereifern|acalorarse|Er neigt dazu, sich schnell zu ereifern.|Tiende a acalorarse rápido.
ergattern|conseguir (con suerte)|Wir konnten noch zwei Karten ergattern.|Pudimos conseguir todavía dos entradas.
ergehen|irle a uno|Wie mag es ihr ergehen?|¿Cómo le irá?
erhellen|esclarecer|Die Studie kann den Zusammenhang erhellen.|El estudio puede esclarecer la relación.
erkämpfen|conquistar (luchando)|Sie mussten sich ihre Rechte erkämpfen.|Tuvieron que conquistar sus derechos luchando.
ernüchtern|desilusionar|Das Ergebnis kann ernüchtern.|El resultado puede desilusionar.
erpressen|extorsionar|Man wollte ihn damit erpressen.|Se lo quería extorsionar con eso.
erschleichen|obtener con engaños|Er wollte sich das Vertrauen erschleichen.|Quería obtener la confianza con engaños.
erübrigen|resultar innecesario|Eine Antwort erübrigt sich.|Una respuesta resulta innecesaria.
fehlschlagen|fracasar|Der Versuch kann fehlschlagen.|El intento puede fracasar.
frönen|entregarse a|Er will seinem Hobby frönen.|Quiere entregarse a su pasatiempo.
geißeln|fustigar|Der Autor will die Zustände geißeln.|El autor quiere fustigar la situación.
gebieten|ordenar / exigir|Die Vernunft gebietet Vorsicht.|La razón exige prudencia.
glorifizieren|glorificar|Man darf Gewalt nicht glorifizieren.|No se debe glorificar la violencia.
heraufbeschwören|provocar / invocar|Das könnte eine Krise heraufbeschwören.|Eso podría provocar una crisis.
herabwürdigen|denigrar|Niemand darf andere herabwürdigen.|Nadie debe denigrar a otros.
herleiten|derivar|Man kann das aus dem Gesetz herleiten.|Eso se puede derivar de la ley.
hinwegsetzen|pasar por alto|Man kann sich nicht über Regeln hinwegsetzen.|No se puede pasar por alto las reglas.
hinwegtäuschen|disimular|Der Erfolg kann über die Probleme hinwegtäuschen.|El éxito puede disimular los problemas.
honorieren|reconocer / retribuir|Das Unternehmen will Leistung honorieren.|La empresa quiere reconocer el rendimiento.
instrumentalisieren|instrumentalizar|Man darf das Leid nicht instrumentalisieren.|No se debe instrumentalizar el sufrimiento.
kaschieren|disimular|Er versuchte, seine Unsicherheit zu kaschieren.|Intentó disimular su inseguridad.
kontrastieren|contrastar|Der Film will Arm und Reich kontrastieren.|La película quiere contrastar pobres y ricos.
kultivieren|cultivar (cuidar)|Sie wollte die Freundschaft kultivieren.|Quería cultivar la amistad.
lancieren|lanzar|Die Firma will ein neues Produkt lancieren.|La empresa quiere lanzar un producto nuevo.
legitimieren|legitimar|Eine Wahl kann die Macht legitimieren.|Una elección puede legitimar el poder.
lockern|aflojar / flexibilizar|Man will die Regeln lockern.|Se quiere flexibilizar las reglas.
marginalisieren|marginar|Man darf Minderheiten nicht marginalisieren.|No se debe marginar a las minorías.
monieren|objetar|Der Rechnungshof will die Ausgaben monieren.|El tribunal de cuentas quiere objetar los gastos.
nachempfinden|comprender (sentir con)|Ich kann deine Enttäuschung nachempfinden.|Puedo comprender tu decepción.
niederschlagen|reflejarse|Die Reform wird sich in den Preisen niederschlagen.|La reforma se reflejará en los precios.
polarisieren|polarizar|Das Thema kann die Gesellschaft polarisieren.|El tema puede polarizar a la sociedad.
postulieren|postular|Der Autor will eine neue Theorie postulieren.|El autor quiere postular una nueva teoría.
profilieren|labrar un perfil|Er will sich als Experte profilieren.|Quiere labrarse un perfil de experto.
provozieren|provocar|Er wollte mit der Aussage provozieren.|Quería provocar con la declaración.
schlichten|mediar / zanjar|Ein Vermittler soll den Streit schlichten.|Un mediador debe zanjar la disputa.
sich abzeichnen|perfilarse|Eine Lösung beginnt sich abzuzeichnen.|Una solución empieza a perfilarse.
sich anmaßen|atreverse (presuntuosamente)|Ich will mir kein Urteil anmaßen.|No quiero arrogarme un juicio.
sich auflehnen|sublevarse|Das Volk wollte sich gegen die Obrigkeit auflehnen.|El pueblo quería sublevarse contra la autoridad.
sich ausbreiten|extenderse|Die Krankheit kann sich rasch ausbreiten.|La enfermedad puede extenderse rápido.
sich entfremden|alejarse (distanciarse)|Beide begannen, sich zu entfremden.|Ambos empezaron a alejarse.
sich hervortun|destacarse|Er wollte sich als Redner hervortun.|Quería destacarse como orador.
sich verselbstständigen|cobrar vida propia|Der Prozess kann sich verselbstständigen.|El proceso puede cobrar vida propia.
skizzieren|esbozar|Ich möchte kurz die Lage skizzieren.|Quiero esbozar brevemente la situación.
strapazieren|desgastar|Das kann die Geduld strapazieren.|Eso puede desgastar la paciencia.
sträuben|resistirse|Er wollte sich gegen die Änderung sträuben.|Quería resistirse al cambio.
tarnen|camuflar|Man wollte die Absicht tarnen.|Se quería camuflar la intención.
tilgen|saldar / borrar|Das Land will seine Schulden tilgen.|El país quiere saldar sus deudas.
trüben|enturbiar|Nichts soll die Freude trüben.|Nada debe empañar la alegría.
überhandnehmen|proliferar|Die Bürokratie darf nicht überhandnehmen.|La burocracia no debe proliferar.
überlagern|superponerse|Alte Konflikte können neue überlagern.|Los viejos conflictos pueden superponerse a los nuevos.
überspitzen|exagerar|Man sollte die Aussage nicht überspitzen.|No habría que exagerar la afirmación.
umdeuten|reinterpretar|Man wollte die Ereignisse umdeuten.|Se quería reinterpretar los hechos.
umwälzen|trastocar|Die Erfindung sollte die Wirtschaft umwälzen.|El invento iba a trastocar la economía.
unterminieren|socavar|Das kann das Vertrauen unterminieren.|Eso puede socavar la confianza.
unterwandern|infiltrar (minar)|Man wollte die Organisation unterwandern.|Se quería infiltrar la organización.
verblassen|desvanecerse|Die Erinnerung kann mit der Zeit verblassen.|El recuerdo puede desvanecerse con el tiempo.
verfälschen|falsear|Man darf Daten nicht verfälschen.|No se deben falsear los datos.
verhehlen|ocultar|Er konnte seine Enttäuschung nicht verhehlen.|No pudo ocultar su decepción.
verklären|idealizar|Man neigt dazu, die Vergangenheit zu verklären.|Se tiende a idealizar el pasado.
verkraften|sobrellevar|Sie konnte den Verlust kaum verkraften.|Apenas pudo sobrellevar la pérdida.
verkümmern|atrofiarse|Talente können ohne Förderung verkümmern.|Los talentos pueden atrofiarse sin apoyo.
verleugnen|negar (renegar)|Er wollte seine Herkunft nicht verleugnen.|No quería renegar de su origen.
verlocken|tentar|Das Angebot kann viele verlocken.|La oferta puede tentar a muchos.
verschleppen|dilatar|Man darf das Verfahren nicht verschleppen.|No se debe dilatar el procedimiento.
verschmelzen|fundirse|Beide Kulturen können verschmelzen.|Ambas culturas pueden fundirse.
verstetigen|consolidar (hacer continuo)|Man will die Entwicklung verstetigen.|Se quiere consolidar la evolución.
verüben|cometer|Er wollte das Verbrechen nicht verüben.|No quería cometer el crimen.
verwerfen|descartar|Wir mussten den Plan verwerfen.|Tuvimos que descartar el plan.
verzerren|distorsionar|Das kann das Ergebnis verzerren.|Eso puede distorsionar el resultado.
vorwegnehmen|anticipar|Ich möchte das Ergebnis nicht vorwegnehmen.|No quiero anticipar el resultado.
walten|regir|Hier soll Vernunft walten.|Aquí debe regir la razón.
zementieren|afianzar (cementar)|Das Gesetz könnte die Ungleichheit zementieren.|La ley podría afianzar la desigualdad.
zerfallen|desintegrarse|Das Reich begann zu zerfallen.|El imperio empezó a desintegrarse.
zersetzen|corroer|Misstrauen kann ein Team zersetzen.|La desconfianza puede corroer a un equipo.
zugrunde legen|tomar como base|Wir wollen diese Zahlen zugrunde legen.|Queremos tomar estas cifras como base.
zutage treten|salir a la luz|Der Konflikt begann zutage zu treten.|El conflicto empezó a salir a la luz.
abgeklärt|sereno (con experiencia)|Mit den Jahren wurde er abgeklärt.|Con los años se volvió sereno.
abgestumpft|insensibilizado|Sie wirkte abgestumpft gegenüber dem Leid.|Parecía insensibilizada ante el sufrimiento.
abstrus|descabellado|Seine Theorie klingt abstrus.|Su teoría suena descabellada.
akribisch|minucioso|Sie arbeitet akribisch.|Trabaja con minuciosidad.
allgegenwärtig|omnipresente|Werbung ist heute allgegenwärtig.|La publicidad es hoy omnipresente.
ambivalent|ambivalente|Er hat ein ambivalentes Verhältnis zur Heimat.|Tiene una relación ambivalente con su tierra.
anachronistisch|anacrónico|Die Regel wirkt anachronistisch.|La regla parece anacrónica.
anrüchig|de dudosa reputación|Das Geschäft war anrüchig.|El negocio era de dudosa reputación.
arglistig|malicioso|Er wurde arglistig getäuscht.|Fue engañado con malicia.
aufrichtig|sincero|Ich danke Ihnen aufrichtig.|Le agradezco sinceramente.
ausgedehnt|extenso|Wir machten einen ausgedehnten Spaziergang.|Dimos un largo paseo.
ausschweifend|desmedido|Er führte ein ausschweifendes Leben.|Llevó una vida desmedida.
beachtlich|considerable|Das ist ein beachtlicher Erfolg.|Es un éxito considerable.
befremdlich|extraño (desconcertante)|Sein Verhalten wirkte befremdlich.|Su comportamiento resultó desconcertante.
beklemmend|opresivo|Die Stille war beklemmend.|El silencio era opresivo.
beliebig|cualquiera / arbitrario|Man kann beliebige Beispiele wählen.|Se pueden elegir ejemplos cualesquiera.
bestechend|cautivador|Das Argument ist bestechend einfach.|El argumento es cautivadoramente simple.
beschaulich|apacible|Das Dorf wirkt beschaulich.|El pueblo parece apacible.
betulich|ceremonioso (lento y solícito)|Sie sprach in betulichem Ton.|Habló en un tono ceremonioso.
bigott|fanático (beato)|Er gilt als bigott.|Se lo considera fanático.
brisant|candente|Das Thema ist politisch brisant.|El tema es políticamente candente.
bürokratisch|burocrático|Das Verfahren ist sehr bürokratisch.|El trámite es muy burocrático.
diskret|discreto|Wir behandeln das diskret.|Lo tratamos con discreción.
doktrinär|doctrinario|Seine Haltung ist doktrinär.|Su postura es doctrinaria.
drastisch|drástico|Die Preise stiegen drastisch.|Los precios subieron drásticamente.
eigennützig|interesado|Sein Motiv war eigennützig.|Su motivo era interesado.
eingefleischt|empedernido|Er ist ein eingefleischter Junggeselle.|Es un soltero empedernido.
eingefahren|rutinario / anquilosado|Die Abläufe sind eingefahren.|Los procesos están anquilosados.
elementar|elemental|Das ist eine elementare Voraussetzung.|Es un requisito elemental.
engstirnig|de miras estrechas|Er ist ein engstirniger Mensch.|Es una persona de miras estrechas.
entlegen|remoto|Das Dorf liegt in einer entlegenen Gegend.|El pueblo está en una zona remota.
erbittert|encarnizado|Es gab erbitterten Widerstand.|Hubo una resistencia encarnizada.
ergiebig|fructífero|Die Diskussion war sehr ergiebig.|La discusión fue muy fructífera.
erlesen|selecto|Es gab erlesene Weine.|Había vinos selectos.
ernüchternd|desalentador|Das Ergebnis ist ernüchternd.|El resultado es desalentador.
eigensinnig|terco|Das Kind ist eigensinnig.|El chico es terco.
fahrig|nervioso (distraído)|Er wirkte fahrig und unkonzentriert.|Parecía nervioso y distraído.
fatalistisch|fatalista|Er hat eine fatalistische Einstellung.|Tiene una actitud fatalista.
festgefahren|estancado|Die Verhandlungen sind festgefahren.|Las negociaciones están estancadas.
filigran|delicado (finamente trabajado)|Das Muster ist filigran.|El diseño es delicado y fino.
fragil|frágil|Der Frieden ist fragil.|La paz es frágil.
gediegen|sólido / de calidad|Das Haus ist gediegen eingerichtet.|La casa está amueblada con buen gusto.
geflissentlich|deliberadamente|Er überhörte geflissentlich die Frage.|Ignoró deliberadamente la pregunta.
gehaltvoll|sustancioso|Das war ein gehaltvolles Gespräch.|Fue una conversación sustanciosa.
gemeinnützig|de utilidad pública|Der Verein ist gemeinnützig.|La asociación es de utilidad pública.
genügsam|frugal|Sie ist ein genügsamer Mensch.|Es una persona frugal.
gewieft|astuto|Er ist ein gewiefter Verhandler.|Es un negociador astuto.
grundverschieden|radicalmente distinto|Ihre Ansichten sind grundverschieden.|Sus puntos de vista son radicalmente distintos.
gutgläubig|crédulo|Sie ist leider gutgläubig.|Lamentablemente es crédula.
halsstarrig|obstinado|Er blieb halsstarrig bei seiner Meinung.|Siguió obstinado en su opinión.
hanebüchen|disparatado|Das ist ein hanebüchener Unsinn.|Eso es un disparate total.
hellsichtig|perspicaz|Sie hat hellsichtig vor der Entwicklung gewarnt.|Advirtió con perspicacia sobre la evolución.
hinterhältig|pérfido|Das war ein hinterhältiger Angriff.|Fue un ataque pérfido.
homogen|homogéneo|Die Gruppe ist nicht homogen.|El grupo no es homogéneo.
hochtrabend|grandilocuente|Er sprach in hochtrabenden Worten.|Habló con palabras grandilocuentes.
immens|inmenso|Der Schaden ist immens.|El daño es inmenso.
indifferent|indiferente|Er blieb indifferent.|Se mantuvo indiferente.
inhaltsleer|vacío de contenido|Die Rede war inhaltsleer.|El discurso estaba vacío de contenido.
inkonsequent|inconsecuente|Seine Politik ist inkonsequent.|Su política es inconsecuente.
instabil|inestable|Die Lage bleibt instabil.|La situación sigue inestable.
intrinsisch|intrínseco|Intrinsische Motivation hält länger an.|La motivación intrínseca dura más.
irrational|irracional|Seine Angst ist irrational.|Su miedo es irracional.
kleinkariert|mezquino / de mente estrecha|Das ist doch kleinkariert.|Eso es mezquino.
kompromisslos|intransigente|Sie verfolgt kompromisslos ihr Ziel.|Persigue su meta sin concesiones.
konträr|opuesto|Sie vertreten konträre Positionen.|Defienden posiciones opuestas.
kryptisch|críptico|Seine Antwort war kryptisch.|Su respuesta fue críptica.
kurzlebig|efímero|Der Trend war kurzlebig.|La tendencia fue efímera.
labil|lábil|Seine Gesundheit ist labil.|Su salud es frágil.
lapidar|lapidario|Er antwortete lapidar.|Respondió de manera lapidaria.
latent|latente|Die Gefahr ist latent vorhanden.|El peligro está presente de forma latente.
leichtfertig|ligero (imprudente)|Das war eine leichtfertige Entscheidung.|Fue una decisión imprudente.
lethargisch|letárgico|Er wirkte lethargisch.|Parecía letárgico.
nachdrücklich|enfático|Er forderte nachdrücklich eine Antwort.|Exigió enfáticamente una respuesta.
nebulös|nebuloso|Die Pläne bleiben nebulös.|Los planes siguen siendo nebulosos.
nonchalant|desenfadado|Er antwortete nonchalant.|Respondió con desenfado.
obsolet|obsoleto|Die Technik ist inzwischen obsolet.|La técnica ya es obsoleta.
opportun|oportuno|Das hielt er für opportun.|Lo consideraba oportuno.
pedantisch|pedante|Sie ist geradezu pedantisch.|Es casi pedante.
pikant|picante (atrevido)|Das Detail ist pikant.|El detalle es picante.
plakativ|simplista (llamativo)|Die Darstellung ist plakativ.|La presentación es simplista.
prekär|precario|Die Lage ist prekär.|La situación es precaria.
pragmatisch|pragmático|Wir suchen eine pragmatische Lösung.|Buscamos una solución pragmática.
profund|profundo|Er verfügt über profunde Kenntnisse.|Posee conocimientos profundos.
rudimentär|rudimentario|Seine Kenntnisse sind rudimentär.|Sus conocimientos son rudimentarios.
sakrosankt|sacrosanto|Nichts ist sakrosankt.|Nada es sacrosanto.
salopp|informal (campechano)|Er drückt sich salopp aus.|Se expresa de manera campechana.
schlagkräftig|contundente|Das ist ein schlagkräftiges Argument.|Es un argumento contundente.
schwammig|vago|Die Formulierung ist schwammig.|La formulación es vaga.
selbstgerecht|pagado de sí mismo|Sein Ton ist selbstgerecht.|Su tono es de quien se cree en lo cierto.
sperrig|difícil (voluminoso)|Der Begriff ist sperrig.|El término es engorroso.
spröde|áspero (seco)|Sie wirkt spröde.|Parece áspera.
stringent|estricto (coherente)|Die Argumentation ist stringent.|La argumentación es rigurosa.
subtil|sutil|Die Kritik war subtil.|La crítica fue sutil.
tiefsinnig|profundo (reflexivo)|Das ist ein tiefsinniger Gedanke.|Es un pensamiento profundo.
trivial|trivial|Das ist keine triviale Frage.|No es una pregunta trivial.
überschwänglich|efusivo|Er lobte sie überschwänglich.|La elogió de manera efusiva.
überzogen|exagerado|Die Forderung ist überzogen.|La exigencia es exagerada.
unbeirrt|imperturbable|Sie ging unbeirrt weiter.|Siguió adelante imperturbable.
undurchsichtig|opaco|Das Geschäft ist undurchsichtig.|El negocio es opaco.
unerbittlich|implacable|Der Winter war unerbittlich.|El invierno fue implacable.
unergründlich|insondable|Sein Motiv bleibt unergründlich.|Su motivo sigue siendo insondable.
unwägbar|imprevisible|Die Folgen sind unwägbar.|Las consecuencias son imprevisibles.
verbissen|obstinado (tenaz)|Er kämpfte verbissen.|Luchó con obstinación.
verfänglich|capcioso|Die Frage war verfänglich.|La pregunta era capciosa.
verhängnisvoll|fatal|Das war ein verhängnisvoller Fehler.|Fue un error fatal.
vermessen|presuntuoso|Es wäre vermessen, das zu behaupten.|Sería presuntuoso afirmar eso.
verschwommen|borroso|Das Bild ist verschwommen.|La imagen está borrosa.
verwerflich|reprobable|Das Verhalten ist verwerflich.|El comportamiento es reprobable.
verworren|enmarañado|Die Lage ist verworren.|La situación es enmarañada.
vordergründig|superficial|Das ist nur eine vordergründige Erklärung.|Es solo una explicación superficial.
vorschnell|precipitado|Triff keine vorschnellen Urteile.|No emitas juicios precipitados.
wankelmütig|voluble|Er ist wankelmütig.|Es voluble.
weitsichtig|con visión de futuro|Das war eine weitsichtige Entscheidung.|Fue una decisión con visión de futuro.
widerborstig|reacio|Das Kind ist widerborstig.|El chico es reacio.
wohlwollend|benévolo|Er sprach wohlwollend über das Projekt.|Habló con benevolencia del proyecto.
zaghaft|vacilante|Sie begann zaghaft zu sprechen.|Empezó a hablar con vacilación.
zwiespältig|ambivalente (dividido)|Ich habe zwiespältige Gefühle.|Tengo sentimientos encontrados.
abermals|una vez más|Er scheiterte abermals.|Fracasó una vez más.
allenfalls|a lo sumo|Das reicht allenfalls für einen Tag.|Eso alcanza a lo sumo para un día.
andernorts|en otro lugar|Andernorts sieht es anders aus.|En otros lugares la situación es distinta.
bisweilen|a veces|Bisweilen ist Schweigen klüger.|A veces callar es más sabio.
demzufolge|en consecuencia|Demzufolge muss der Plan geändert werden.|En consecuencia, hay que cambiar el plan.
einstweilen|por ahora|Einstweilen bleibt alles beim Alten.|Por ahora todo sigue igual.
gemeinhin|por lo general|Das gilt gemeinhin als sicher.|Eso se considera por lo general seguro.
gleichwohl|no obstante|Gleichwohl bleibt die Frage offen.|No obstante, la pregunta sigue abierta.
hierzulande|en nuestro país|Hierzulande ist das unüblich.|En nuestro país eso no es habitual.
mithin|por lo tanto|Mithin ist die Behauptung falsch.|Por lo tanto, la afirmación es falsa.
mitnichten|en absoluto|Das ist mitnichten der Fall.|Eso no es en absoluto así.
nunmehr|a partir de ahora|Die Regel gilt nunmehr für alle.|La regla rige a partir de ahora para todos.
partout|a toda costa|Er wollte partout nicht nachgeben.|No quería ceder de ningún modo.
seinerzeit|en su momento|Das wurde seinerzeit heftig diskutiert.|Eso se discutió con intensidad en su momento.
sodann|a continuación|Sodann folgt die Abstimmung.|A continuación sigue la votación.
sonstig|restante / demás|Sonstige Kosten sind nicht enthalten.|Los demás costos no están incluidos.
stellenweise|en algunos puntos|Stellenweise ist das Eis dünn.|En algunos puntos el hielo es fino.
vorderhand|por el momento|Vorderhand besteht kein Grund zur Sorge.|Por el momento no hay motivo de preocupación.
zuallererst|antes que nada|Zuallererst möchte ich danken.|Antes que nada quiero agradecer.
der Gemeinplatz|el lugar común|Das ist nur ein Gemeinplatz.|Eso es solo un lugar común.
das Vakuum|el vacío|Es entstand ein Vakuum an der Spitze.|Surgió un vacío en la cima.
ausklammern|excluir (de la discusión)|Man will das Thema nicht ausklammern.|No se quiere excluir el tema.
hervortreten|destacarse|Sie wird bald hervortreten.|Pronto se va a destacar.
hintergehen|engañar (a espaldas)|Er wollte sie nie hintergehen.|Nunca quiso engañarla a sus espaldas.
`;

export type CoreLevel = "A1" | "A2" | "B1" | "B2" | "C1";

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
