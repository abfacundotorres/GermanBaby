// Frases de ejemplo por palabra. Clave: el texto alemán del vocabulario («der Kaffee»).
// Se asignan a Vocab.example al armar el currículo (lib/curriculum.ts). Cada ejemplo usa solo
// palabras ya enseñadas (o glosadas), así que se lee entero desde el primer momento.
// Las entradas que ya son una oración completa no llevan ejemplo.

type Ex = { de: string; es: string };
export const EXAMPLES: Record<string, Ex> = {};
const ex = (key: string, de: string, es: string) => { EXAMPLES[key] = { de, es }; };

// ---------- Unidad 1: ¡Hallo!
ex("Hallo", "Hallo, Tom!", "¡Hola, Tom!");
ex("Guten Morgen", "Guten Morgen, Lena!", "¡Buenos días, Lena!");
ex("Guten Tag", "Guten Tag, Anna!", "¡Buen día, Anna!");
ex("Guten Abend", "Guten Abend, Max!", "¡Buenas noches, Max!");
ex("Tschüss", "Tschüss, Mia!", "¡Chau, Mia!");
ex("Auf Wiedersehen", "Auf Wiedersehen, Paul!", "¡Adiós, Paul!");
ex("Gut, danke", "Wie geht's? — Gut, danke!", "¿Cómo andás? — ¡Bien, gracias!");
ex("Sehr gut", "Wie geht's? — Sehr gut!", "¿Cómo andás? — ¡Muy bien!");
ex("Nicht so gut", "Wie geht's? — Nicht so gut.", "¿Cómo andás? — No tan bien.");
ex("Danke", "Danke, Lena!", "¡Gracias, Lena!");
ex("Bitte", "Danke! — Bitte!", "¡Gracias! — ¡De nada!");

// ---------- Unidad 2: Números
ex("null", "Null plus eins ist eins.", "Cero más uno es uno.");
ex("eins", "Eins plus eins ist zwei.", "Uno más uno es dos.");
ex("zwei", "Zwei plus drei ist fünf.", "Dos más tres es cinco.");
ex("drei", "Drei plus eins ist vier.", "Tres más uno es cuatro.");
ex("vier", "Vier plus eins ist fünf.", "Cuatro más uno es cinco.");
ex("fünf", "Fünf minus eins ist vier.", "Cinco menos uno es cuatro.");
ex("sechs", "Sechs plus eins ist sieben.", "Seis más uno es siete.");
ex("sieben", "Sieben plus eins ist acht.", "Siete más uno es ocho.");
ex("acht", "Acht plus eins ist neun.", "Ocho más uno es nueve.");
ex("neun", "Neun plus eins ist zehn.", "Nueve más uno es diez.");
ex("zehn", "Zehn minus eins ist neun.", "Diez menos uno es nueve.");
ex("das Jahr", "Zehn Jahre sind viel.", "Diez años son mucho.");
ex("alt", "Max ist acht Jahre alt.", "Max tiene ocho años.");
ex("jung", "Lena ist jung.", "Lena es joven.");

// ---------- Unidad 3: En el café
ex("der Kaffee", "Der Kaffee ist sehr gut.", "El café está muy bueno.");
ex("der Tee", "Der Tee ist nicht so gut.", "El té no está tan bueno.");
ex("das Wasser", "Das Wasser, bitte!", "¡El agua, por favor!");
ex("die Milch", "Die Milch, bitte!", "¡La leche, por favor!");
ex("das Brötchen", "Das Brötchen ist gut.", "El pancito está rico.");
ex("der Kuchen", "Der Kuchen ist sehr gut.", "La torta está muy buena.");
ex("Nein, danke", "Möchten Sie Kaffee? — Nein, danke.", "¿Desea café? — No, gracias.");
ex("Die Rechnung, bitte", "Herr Huber, die Rechnung, bitte!", "Señor Huber, ¡la cuenta, por favor!");
ex("Stimmt so", "Zusammen oder getrennt? — Zusammen. Stimmt so!", "¿Juntos o separado? — Juntos. ¡Quédese con el cambio!");

// ---------- Unidad 4: La familia
ex("die Mutter", "Die Mutter heißt Anna.", "La madre se llama Anna.");
ex("der Vater", "Der Vater heißt Tom.", "El padre se llama Tom.");
ex("die Schwester", "Die Schwester heißt Mia.", "La hermana se llama Mia.");
ex("der Bruder", "Der Bruder ist zehn Jahre alt.", "El hermano tiene diez años.");
ex("die Eltern", "Die Eltern sind jung.", "Los padres son jóvenes.");
ex("das Kind", "Das Kind ist acht Jahre alt.", "El niño tiene ocho años.");
ex("mein Vater", "Mein Vater heißt Paul.", "Mi padre se llama Paul.");
ex("meine Mutter", "Meine Mutter heißt Anna.", "Mi madre se llama Anna.");
ex("dein Bruder", "Dein Bruder ist jung.", "Tu hermano es joven.");
ex("deine Schwester", "Deine Schwester heißt Mia.", "Tu hermana se llama Mia.");
ex("verheiratet", "Meine Mutter ist verheiratet.", "Mi madre está casada.");

// ---------- Unidad 5: ¿Qué hacés?
ex("ich wohne", "Ich wohne in Berlin.", "Vivo en Berlín.");
ex("du wohnst", "Du wohnst in Berlin.", "Vos vivís en Berlín.");
ex("ich arbeite", "Ich arbeite in Berlin.", "Trabajo en Berlín.");
ex("ich bin", "Ich bin Tom.", "Soy Tom.");
ex("du bist", "Du bist jung.", "Vos sos joven.");
ex("er ist", "Er ist acht Jahre alt.", "Él tiene ocho años.");
ex("wir sind", "Wir sind in Berlin.", "Estamos en Berlín.");
ex("du hast", "Du hast einen Bruder.", "Vos tenés un hermano.");
ex("er hat", "Er hat eine Schwester.", "Él tiene una hermana.");

// ---------- Unidad 6: Días y horas
ex("Montag", "Heute ist Montag.", "Hoy es lunes.");
ex("Dienstag", "Morgen ist Dienstag.", "Mañana es martes.");
ex("Mittwoch", "Heute ist Mittwoch.", "Hoy es miércoles.");
ex("Donnerstag", "Morgen ist Donnerstag.", "Mañana es jueves.");
ex("Freitag", "Heute ist Freitag.", "Hoy es viernes.");
ex("Samstag und Sonntag", "Samstag und Sonntag sind super!", "¡Sábado y domingo son geniales!");
ex("um acht Uhr", "Um acht Uhr, bitte!", "¡A las ocho, por favor!");
ex("Viertel nach zwei", "Es ist Viertel nach zwei.", "Son las dos y cuarto.");
ex("Viertel vor zehn", "Es ist Viertel vor zehn.", "Son las diez menos cuarto.");
ex("heute", "Heute ist Montag.", "Hoy es lunes.");
ex("morgen", "Morgen ist Dienstag.", "Mañana es martes.");
ex("am Wochenende", "Am Wochenende arbeite ich nicht.", "El fin de semana no trabajo.");
ex("Leider nicht", "Hast du Zeit? — Leider nicht.", "¿Tenés tiempo? — Lamentablemente no.");

// ---------- Unidad 7: En el mercado
ex("elf", "Zehn plus eins ist elf.", "Diez más uno es once.");
ex("zwölf", "Elf plus eins ist zwölf.", "Once más uno es doce.");
ex("dreizehn", "Zwölf plus eins ist dreizehn.", "Doce más uno es trece.");
ex("vierzehn", "Dreizehn plus eins ist vierzehn.", "Trece más uno es catorce.");
ex("fünfzehn", "Vierzehn plus eins ist fünfzehn.", "Catorce más uno es quince.");
ex("sechzehn", "Fünfzehn plus eins ist sechzehn.", "Quince más uno es dieciséis.");
ex("siebzehn", "Sechzehn plus eins ist siebzehn.", "Dieciséis más uno es diecisiete.");
ex("achtzehn", "Siebzehn plus eins ist achtzehn.", "Diecisiete más uno es dieciocho.");
ex("neunzehn", "Achtzehn plus eins ist neunzehn.", "Dieciocho más uno es diecinueve.");
ex("zwanzig", "Neunzehn plus eins ist zwanzig.", "Diecinueve más uno es veinte.");
ex("einundzwanzig", "Zwanzig plus eins ist einundzwanzig.", "Veinte más uno es veintiuno.");
ex("dreißig", "Zwanzig plus zehn ist dreißig.", "Veinte más diez es treinta.");
ex("vierzig", "Dreißig plus zehn ist vierzig.", "Treinta más diez es cuarenta.");
ex("fünfzig", "Vierzig plus zehn ist fünfzig.", "Cuarenta más diez es cincuenta.");
ex("sechzig", "Fünfzig plus zehn ist sechzig.", "Cincuenta más diez es sesenta.");
ex("siebzig", "Sechzig plus zehn ist siebzig.", "Sesenta más diez es setenta.");
ex("achtzig", "Siebzig plus zehn ist achtzig.", "Setenta más diez es ochenta.");
ex("neunzig", "Achtzig plus zehn ist neunzig.", "Ochenta más diez es noventa.");
ex("fünfundvierzig", "Mein Vater ist fünfundvierzig Jahre alt.", "Mi padre tiene cuarenta y cinco años.");
ex("hundert", "Neunzig plus zehn ist hundert.", "Noventa más diez es cien.");
ex("die Äpfel", "Die Äpfel sind gut.", "Las manzanas están ricas.");
ex("die Tomaten", "Die Tomaten sind billig.", "Los tomates son baratos.");
ex("teuer", "Der Kaffee ist teuer.", "El café es caro.");
ex("billig", "Das Wasser ist billig.", "El agua es barata.");

// ---------- Unidad 8: Mi día
ex("aufstehen", "Ich möchte um sieben Uhr aufstehen.", "Quiero levantarme a las siete.");
ex("frühstücken", "Wir frühstücken um acht Uhr.", "Desayunamos a las ocho.");
ex("duschen", "Ich dusche am Abend.", "Me ducho a la noche.");
ex("morgens", "Morgens lerne ich Deutsch.", "A la mañana estudio alemán.");
ex("abends", "Abends lerne ich Deutsch.", "A la noche estudio alemán.");
ex("zuerst", "Zuerst dusche ich.", "Primero me ducho.");
ex("dann", "Dann frühstücke ich.", "Después desayuno.");
ex("danach", "Danach lerne ich Deutsch.", "Después de eso estudio alemán.");
ex("nach Hause gehen", "Um acht Uhr gehe ich nach Hause.", "A las ocho me voy a casa.");
ex("schlafen gehen", "Ich möchte schlafen gehen.", "Quiero irme a dormir.");

// ---------- Unidad 9: La casa
ex("das Haus", "Das Haus hat ein Wohnzimmer.", "La casa tiene un living.");
ex("die Wohnung", "Die Wohnung hat zwei Zimmer.", "El departamento tiene dos ambientes.");
ex("das Zimmer", "Ich habe ein Zimmer.", "Tengo una habitación.");
ex("die Küche", "Die Küche ist in der Wohnung.", "La cocina está en el departamento.");
ex("das Bad", "Die Wohnung hat ein Bad.", "El departamento tiene un baño.");
ex("das Wohnzimmer", "Das Wohnzimmer ist in der Wohnung.", "El living está en el departamento.");
ex("das Schlafzimmer", "Ich schlafe im Schlafzimmer.", "Duermo en el dormitorio.");
ex("der Tisch", "Ich habe einen Tisch.", "Tengo una mesa.");
ex("der Stuhl", "Der Stuhl ist im Wohnzimmer.", "La silla está en el living.");
ex("das Bett", "Das Bett ist im Schlafzimmer.", "La cama está en el dormitorio.");
ex("der Schrank", "Der Schrank ist im Schlafzimmer.", "El armario está en el dormitorio.");
ex("die Lampe", "Die Lampe ist im Wohnzimmer.", "La lámpara está en el living.");
ex("das Fenster", "Das Wohnzimmer hat ein Fenster.", "El living tiene una ventana.");
ex("die Tür", "Die Küche hat eine Tür.", "La cocina tiene una puerta.");
ex("groß", "Das Wohnzimmer ist groß.", "El living es grande.");
ex("klein", "Das Bad ist klein.", "El baño es chico.");
ex("schön", "Die Wohnung ist schön.", "El departamento es lindo.");
ex("neu", "Die Lampe ist neu.", "La lámpara es nueva.");
ex("hell", "Das Schlafzimmer ist hell.", "El dormitorio es luminoso.");
ex("sehr hell", "Die Küche ist sehr hell.", "La cocina es muy luminosa.");
ex("die Miete", "Die Miete ist teuer.", "El alquiler es caro.");
ex("im Monat", "Die Wohnung kostet sechshundert Euro im Monat.", "El departamento cuesta seiscientos euros por mes.");
ex("sechshundert Euro", "Die Miete ist sechshundert Euro.", "El alquiler es de seiscientos euros.");
ex("günstig", "Die Wohnung ist günstig.", "El departamento es conveniente.");
ex("der Garten", "Das Haus hat einen Garten.", "La casa tiene un jardín.");
ex("ruhig", "Der Garten ist ruhig.", "El jardín es tranquilo.");

// ---------- Unidad 10: La ciudad
ex("die Stadt", "Berlin ist eine Stadt.", "Berlín es una ciudad.");
ex("der Bahnhof", "Der Bahnhof ist in der Stadt.", "La estación está en la ciudad.");
ex("der Supermarkt", "Ich kaufe im Supermarkt ein.", "Hago las compras en el supermercado.");
ex("die Bank", "Die Bank ist neu.", "El banco es nuevo.");
ex("die Apotheke", "Die Apotheke ist klein.", "La farmacia es chica.");
ex("der Park", "Der Park ist schön.", "El parque es lindo.");
ex("die Post", "Die Post ist alt.", "El correo es viejo.");
ex("Entschuldigung", "Entschuldigung, wo ist die Bank?", "Disculpe, ¿dónde está el banco?");
ex("links", "Die Post ist links.", "El correo está a la izquierda.");
ex("rechts", "Der Park ist rechts.", "El parque está a la derecha.");
ex("nicht weit", "Die Apotheke ist nicht weit.", "La farmacia no está lejos.");
ex("Gern geschehen", "Danke! — Gern geschehen!", "¡Gracias! — ¡De nada!");
ex("der Bus", "Der Bus ist billig.", "El colectivo es barato.");
ex("die U-Bahn", "Die U-Bahn ist in der Stadt.", "El subte está en la ciudad.");
ex("der Zug", "Der Zug ist teuer.", "El tren es caro.");
ex("zu Fuß", "Ich gehe zu Fuß.", "Voy a pie.");
ex("die Fahrkarte", "Die Fahrkarte kostet zwei Euro.", "El pasaje cuesta dos euros.");
ex("das Gleis", "Gleis sieben ist links.", "La vía siete está a la izquierda.");
ex("das Zentrum", "Die Kirche ist im Zentrum.", "La iglesia está en el centro.");
ex("die Kirche", "Die Kirche ist alt.", "La iglesia es vieja.");
ex("der Platz", "Der Platz ist im Zentrum.", "La plaza está en el centro.");

// ---------- Unidad 11: Comida y gustos
ex("das Frühstück", "Das Frühstück ist um acht Uhr.", "El desayuno es a las ocho.");
ex("das Mittagessen", "Das Mittagessen ist um zwölf Uhr.", "El almuerzo es a las doce.");
ex("das Abendessen", "Das Abendessen ist um sieben Uhr.", "La cena es a las siete.");
ex("das Brot", "Das Brot ist gut.", "El pan está rico.");
ex("der Käse", "Der Käse ist teuer.", "El queso es caro.");
ex("das Fleisch", "Haben Sie Fleisch?", "¿Tiene carne?");
ex("der Fisch", "Der Fisch ist billig.", "El pescado es barato.");
ex("das Ei", "Ich möchte ein Ei.", "Quisiera un huevo.");
ex("lecker", "Der Kuchen ist lecker.", "La torta está rica.");
ex("Das schmeckt gut", "Der Fisch? Das schmeckt gut!", "¿El pescado? ¡Está rico!");
ex("die Speisekarte", "Die Speisekarte, bitte!", "¡La carta, por favor!");
ex("die Suppe", "Die Suppe ist lecker.", "La sopa está rica.");
ex("der Salat", "Der Salat ist gut.", "La ensalada está buena.");
ex("die Pizza", "Die Pizza ist lecker!", "¡La pizza está rica!");
ex("der Reis", "Ich esse Reis.", "Como arroz.");
ex("die Kartoffel", "Ich esse eine Kartoffel.", "Como una papa.");
ex("das Gemüse", "Das Gemüse ist gut.", "Las verduras están buenas.");

// ---------- Unidad 12: Poder, deber, querer
ex("schwimmen", "Ich kann schwimmen.", "Sé nadar.");
ex("tanzen", "Lena kann tanzen.", "Lena sabe bailar.");
ex("singen", "Mia kann singen.", "Mia sabe cantar.");
ex("Klavier spielen", "Tom kann Klavier spielen.", "Tom sabe tocar el piano.");
ex("ein bisschen", "Ich kann ein bisschen schwimmen.", "Sé nadar un poco.");
ex("Noch einmal, bitte", "Ich verstehe nicht. Noch einmal, bitte!", "No entiendo. ¡Otra vez, por favor!");
ex("die Reise", "Die Reise nach Berlin ist schön.", "El viaje a Berlín es lindo.");
ex("früh", "Ich stehe früh auf.", "Me levanto temprano.");

// ---------- Unidad 13: El pasado
ex("gestern", "Gestern habe ich gekocht.", "Ayer cociné.");
ex("letzte Woche", "Letzte Woche war ich in Berlin.", "La semana pasada estuve en Berlín.");
ex("der Ausflug", "Der Ausflug war schön.", "La excursión estuvo linda.");
ex("das Museum", "Das Museum ist in der Stadt.", "El museo está en la ciudad.");
ex("das Foto", "Ich habe ein Foto gemacht.", "Saqué una foto.");

// ---------- Unidad 14: Preparación para el examen
ex("Januar", "Im Januar lerne ich Deutsch.", "En enero estudio alemán.");
ex("Februar", "Im Februar arbeite ich.", "En febrero trabajo.");
ex("März", "Im März fahre ich nach Berlin.", "En marzo viajo a Berlín.");
ex("April", "Im April habe ich Zeit.", "En abril tengo tiempo.");
ex("Mai", "Im Mai ist die Prüfung.", "En mayo es el examen.");
ex("Juni", "Im Juni lerne ich viel.", "En junio estudio mucho.");
ex("die Prüfung", "Die Prüfung ist im Juni.", "El examen es en junio.");
ex("Juli", "Im Juli habe ich Urlaub.", "En julio tengo vacaciones.");
ex("August", "Im August fahre ich nach Wien.", "En agosto viajo a Viena.");
ex("September", "Im September lerne ich Deutsch.", "En septiembre estudio alemán.");
ex("Oktober", "Im Oktober arbeite ich viel.", "En octubre trabajo mucho.");
ex("November", "Im November fahre ich nach Berlin.", "En noviembre viajo a Berlín.");
ex("Dezember", "Im Dezember habe ich Urlaub.", "En diciembre tengo vacaciones.");
ex("der Urlaub", "Der Urlaub ist schön.", "Las vacaciones son lindas.");
ex("der Geburtstag", "Mein Geburtstag ist im Mai.", "Mi cumpleaños es en mayo.");
ex("am dritten Juni", "Mein Geburtstag ist am dritten Juni.", "Mi cumpleaños es el 3 de junio.");
ex("am zehnten Oktober", "Meine Prüfung ist am zehnten Oktober.", "Mi examen es el 10 de octubre.");
ex("die Party", "Die Party ist am Samstag.", "La fiesta es el sábado.");
ex("das Datum", "Das Datum ist der dritte Juni.", "La fecha es el tres de junio.");
ex("der Vorname", "Mein Vorname ist Anna.", "Mi nombre de pila es Anna.");
ex("der Nachname", "Mein Nachname ist Schulz.", "Mi apellido es Schulz.");
ex("die Adresse", "Meine Adresse ist Berliner Straße zwölf.", "Mi dirección es Berliner Straße doce.");
ex("die Straße", "Ich wohne in der Berliner Straße.", "Vivo en la Berliner Straße.");
ex("die Telefonnummer", "Wie ist deine Telefonnummer?", "¿Cuál es tu número de teléfono?");
ex("das Geburtsdatum", "Mein Geburtsdatum ist der dritte Juni.", "Mi fecha de nacimiento es el tres de junio.");
ex("die Durchsage", "Achtung, eine Durchsage!", "¡Atención, un anuncio!");
ex("die Abfahrt", "Die Abfahrt ist um acht Uhr.", "La salida es a las ocho.");
ex("die Ankunft", "Die Ankunft ist um zehn Uhr.", "La llegada es a las diez.");
ex("die Verspätung", "Der Bus hat Verspätung.", "El colectivo tiene retraso.");
ex("die Minute", "Eine Minute, bitte!", "¡Un minuto, por favor!");
ex("die Stunde", "Eine Stunde hat sechzig Minuten.", "Una hora tiene sesenta minutos.");
ex("das Wort", "Das ist ein neues Wort.", "Esta es una palabra nueva.");
ex("schwer", "Deutsch ist nicht schwer.", "El alemán no es difícil.");
ex("üben", "Ich möchte jeden Tag üben.", "Quiero practicar todos los días.");

// ================= A2 =================

// ---------- Unidad 15: Contar el pasado
ex("früher", "Früher habe ich in Berlin gewohnt.", "Antes viví en Berlín.");
ex("damals", "Damals war ich jung.", "En aquel entonces yo era joven.");
ex("vor einem Jahr", "Vor einem Jahr war ich in Berlin.", "Hace un año estuve en Berlín.");
ex("seit einem Jahr", "Ich wohne seit einem Jahr in Berlin.", "Vivo en Berlín desde hace un año.");
ex("als Kind", "Als Kind habe ich Fußball gespielt.", "De chico jugaba al fútbol.");
ex("tausend", "Das Zimmer kostet tausend Euro im Monat.", "La habitación cuesta mil euros por mes.");
ex("zweitausend", "Im Jahr zweitausend war ich acht Jahre alt.", "En el año dos mil yo tenía ocho años.");
ex("neunzehnhundertneunzig", "Mein Vater ist neunzehnhundertneunzig geboren.", "Mi padre nació en 1990.");
ex("die Schule", "Die Schule ist nicht weit.", "La escuela no queda lejos.");
ex("die Universität", "Die Universität ist groß.", "La universidad es grande.");
ex("Deutschland", "Berlin ist in Deutschland.", "Berlín está en Alemania.");
ex("kaum", "Ich habe kaum Zeit.", "Casi no tengo tiempo.");
ex("die Geschichte", "Das ist eine schöne Geschichte.", "Es una linda historia.");

// ---------- Unidad 16: Cuerpo y salud
ex("der Kopf", "Mein Vater hat einen großen Kopf.", "Mi padre tiene una cabeza grande.");
ex("der Bauch", "Das Kind hat einen kleinen Bauch.", "El niño tiene una panza chiquita.");
ex("der Rücken", "Mein Rücken tut weh.", "Me duele la espalda.");
ex("der Arm", "Mein Arm tut weh.", "Me duele el brazo.");
ex("die Hand", "Meine Hand ist klein.", "Mi mano es chica.");
ex("das Bein", "Das Kind hat zwei Beine.", "El niño tiene dos piernas.");
ex("krank", "Mein Bruder ist krank.", "Mi hermano está enfermo.");
ex("gesund", "Mein Vater ist alt, aber gesund.", "Mi padre es mayor, pero está sano.");
ex("das Fieber", "Das Kind hat Fieber.", "El niño tiene fiebre.");
ex("die Tablette", "Ich nehme eine Tablette.", "Tomo una pastilla.");
ex("der Arzt / die Ärztin", "Meine Mutter ist Ärztin.", "Mi madre es médica.");
ex("viel", "Ich habe viel Zeit.", "Tengo mucho tiempo.");
ex("bald", "Bald habe ich Geburtstag.", "Pronto es mi cumpleaños.");
ex("sagen", "Ich möchte etwas sagen.", "Quiero decir algo.");

// ---------- Unidad 17: Ropa y compras
ex("das T-Shirt", "Das T-Shirt ist billig.", "La remera es barata.");
ex("die Hose", "Die Hose ist sehr günstig.", "El pantalón es muy barato.");
ex("die Jacke", "Die Jacke ist teuer.", "La campera es cara.");
ex("der Pullover", "Der Pullover ist schön.", "El pulóver es lindo.");
ex("das Kleid", "Anna hat ein neues Kleid.", "Anna tiene un vestido nuevo.");
ex("die Schuhe", "Die Schuhe sind sehr günstig.", "Los zapatos son muy baratos.");
ex("der Rock", "Mia hat einen neuen Rock.", "Mia tiene una pollera nueva.");
ex("rot", "Das Kleid ist rot.", "El vestido es rojo.");
ex("blau", "Die Hose ist blau.", "El pantalón es azul.");
ex("grün", "Der Pullover ist grün.", "El pulóver es verde.");
ex("gelb", "Das T-Shirt ist gelb.", "La remera es amarilla.");
ex("schwarz", "Der Rock ist schwarz.", "La pollera es negra.");
ex("weiß", "Die Schuhe sind weiß.", "Los zapatos son blancos.");
ex("braun", "Die Jacke ist braun.", "La campera es marrón.");
ex("die Größe", "Ich habe Größe vierzig.", "Uso talle cuarenta.");
ex("der Winter", "Im Winter bin ich gern zu Hause.", "En invierno me gusta estar en casa.");
ex("die Mütze", "Ich habe eine neue Mütze.", "Tengo un gorro nuevo.");
ex("der Schal", "Der Schal ist sehr schön.", "La bufanda es muy linda.");
ex("tragen", "Im Winter muss ich eine Jacke tragen.", "En invierno tengo que llevar campera.");

// ---------- Unidad 18: Razones y opiniones
ex("weil", "Ich esse Kuchen, weil ich Hunger habe.", "Como torta porque tengo hambre.");
ex("denn", "Ich gehe nach Hause, denn ich bin müde.", "Me voy a casa, porque estoy cansado.");
ex("müde", "Ich bin heute sehr müde.", "Hoy estoy muy cansado.");
ex("deshalb", "Ich habe Hunger, deshalb esse ich Brot.", "Tengo hambre, por eso como pan.");
ex("dass", "Ich weiß, dass du Zeit hast.", "Sé que tenés tiempo.");
ex("wichtig", "Deutsch ist sehr wichtig.", "El alemán es muy importante.");
ex("wenn", "Wenn ich Hunger habe, esse ich Brot.", "Cuando tengo hambre, como pan.");
ex("immer", "Ich trinke immer Kaffee.", "Siempre tomo café.");
ex("oft", "Mein Bruder spielt oft Fußball.", "Mi hermano juega al fútbol a menudo.");
ex("manchmal", "Manchmal esse ich Fisch.", "A veces como pescado.");
ex("nie", "Ich esse nie Fleisch.", "Nunca como carne.");
ex("leicht", "Das Wort ist leicht.", "La palabra es fácil.");
ex("schwierig", "Die Prüfung ist schwierig.", "El examen es difícil.");
ex("die Grammatik", "Die Grammatik ist nicht leicht.", "La gramática no es fácil.");

// ---------- Unidad 19: Regalos y dativo
ex("mir", "Das Haus gefällt mir sehr.", "La casa me gusta mucho.");
ex("dir", "Gefällt dir die Wohnung?", "¿Te gusta el departamento?");
ex("ihm / ihr", "Ich helfe ihm, und er hilft ihr.", "Yo lo ayudo a él, y él la ayuda a ella.");
ex("das Geschenk", "Das Geschenk ist für meine Mutter.", "El regalo es para mi madre.");
ex("die Blumen", "Die Blumen sind schön.", "Las flores son lindas.");
ex("die Schokolade", "Ich esse gern Schokolade.", "Me gusta comer chocolate.");
ex("feiern", "Wir feiern am Samstag eine Party.", "El sábado hacemos una fiesta.");
ex("die Einladung", "Danke für die Einladung!", "¡Gracias por la invitación!");
ex("mitbringen", "Ich möchte Kuchen mitbringen.", "Quiero traer torta.");
ex("der Gast", "Der Gast möchte einen Kaffee.", "El invitado quiere un café.");
ex("backen", "Meine Mutter möchte einen Kuchen backen.", "Mi madre quiere hornear una torta.");
ex("die Überraschung", "Das ist eine Überraschung!", "¡Es una sorpresa!");

// ---------- Unidad 20: Dónde y adónde
ex("auf dem Tisch", "Der Kaffee ist auf dem Tisch.", "El café está sobre la mesa.");
ex("unter dem Bett", "Die Schuhe sind unter dem Bett.", "Los zapatos están debajo de la cama.");
ex("neben der Lampe", "Das Buch ist neben der Lampe.", "El libro está al lado de la lámpara.");
ex("vor dem Haus", "Der Bus ist vor dem Haus.", "El colectivo está delante de la casa.");
ex("hinter der Tür", "Die Jacke ist hinter der Tür.", "La campera está detrás de la puerta.");
ex("zwischen dem Bett und dem Schrank", "Die Lampe ist zwischen dem Bett und dem Schrank.", "La lámpara está entre la cama y el armario.");
ex("am Fenster", "Der Tisch ist am Fenster.", "La mesa está junto a la ventana.");
ex("im Schrank", "Die Hose ist im Schrank.", "El pantalón está en el armario.");
ex("das Bild", "Das Bild ist sehr schön.", "El cuadro es muy lindo.");
ex("der Teppich", "Der Teppich ist neu.", "La alfombra es nueva.");
ex("das Regal", "Das Regal ist neben dem Fenster.", "El estante está al lado de la ventana.");
ex("der Spiegel", "Der Spiegel ist im Bad.", "El espejo está en el baño.");
ex("die Pflanze", "Die Pflanze steht am Fenster.", "La planta está junto a la ventana.");
ex("der Fernseher", "Der Fernseher ist im Wohnzimmer.", "El televisor está en el living.");
ex("der Balkon", "Die Wohnung hat einen Balkon.", "El departamento tiene balcón.");
ex("die Ecke", "Die Lampe steht in der Ecke.", "La lámpara está en el rincón.");
ex("der Schreibtisch", "Mein Schreibtisch ist klein.", "Mi escritorio es chico.");

// ---------- Unidad 21: Comparar y viajar
ex("schnell", "Der Zug ist schnell.", "El tren es rápido.");
ex("größer", "Berlin ist größer als Wien.", "Berlín es más grande que Viena.");
ex("teurer", "Der Kaffee ist teurer als der Tee.", "El café es más caro que el té.");
ex("besser", "Der Salat ist besser als die Suppe.", "La ensalada es mejor que la sopa.");
ex("am besten", "Der Kuchen schmeckt am besten.", "La torta es lo que mejor sabe.");
ex("das Wetter", "Das Wetter ist heute schön.", "Hoy hace lindo tiempo.");
ex("warm", "Das Wasser ist warm.", "El agua está tibia.");
ex("kalt", "Der Tee ist kalt.", "El té está frío.");
ex("das Hotel", "Das Hotel ist in der Stadt.", "El hotel está en la ciudad.");
ex("das Einzelzimmer", "Ich möchte ein Einzelzimmer.", "Quiero una habitación simple.");
ex("das Doppelzimmer", "Wir möchten ein Doppelzimmer.", "Queremos una habitación doble.");
ex("der Schlüssel", "Der Schlüssel ist auf dem Tisch.", "La llave está sobre la mesa.");
ex("der Koffer", "Mein Koffer ist schwer.", "Mi valija es pesada.");
ex("das Meer", "Das Meer ist nicht weit.", "El mar no queda lejos.");
ex("der Strand", "Der Strand ist sehr groß.", "La playa es muy grande.");

// ---------- Unidad 22: Trabajo y planes
ex("der Beruf", "Mein Vater hat einen guten Beruf.", "Mi padre tiene una buena profesión.");
ex("der Lehrer / die Lehrerin", "Meine Schwester ist Lehrerin.", "Mi hermana es docente.");
ex("der Koch / die Köchin", "Mein Bruder ist Koch.", "Mi hermano es cocinero.");
ex("der Ingenieur / die Ingenieurin", "Mein Vater ist Ingenieur.", "Mi padre es ingeniero.");
ex("der Student / die Studentin", "Mia ist Studentin.", "Mia es estudiante.");
ex("die Arbeit", "Meine Arbeit ist sehr interessant.", "Mi trabajo es muy interesante.");
ex("die Stelle", "Die Stelle ist in Berlin.", "El puesto es en Berlín.");
ex("die Bewerbung", "Ich möchte eine Bewerbung schreiben.", "Quiero escribir una postulación.");
ex("der Lebenslauf", "Der Lebenslauf ist wichtig.", "El currículum es importante.");
ex("die Erfahrung", "Ich habe keine Erfahrung.", "No tengo experiencia.");
ex("nächstes Jahr", "Nächstes Jahr fahre ich nach Wien.", "El año que viene viajo a Viena.");
ex("hoffentlich", "Hoffentlich ist das Wetter schön.", "Ojalá haga lindo tiempo.");
ex("im Sommer", "Im Sommer ist es warm.", "En verano hace calor.");
ex("das Land", "Deutschland ist ein großes Land.", "Alemania es un país grande.");
ex("eröffnen", "Anna möchte ein Restaurant eröffnen.", "Anna quiere abrir un restaurante.");
ex("genug", "Ich habe genug Zeit.", "Tengo suficiente tiempo.");

// ---------- Unidad 23: Preparación para el examen A2
ex("das Telefon", "Mein Telefon ist auf dem Tisch.", "Mi teléfono está sobre la mesa.");
ex("später", "Ich rufe dich später an.", "Te llamo más tarde.");
ex("die E-Mail", "Ich habe eine E-Mail für dich.", "Tengo un correo para vos.");
ex("der Termin", "Ich habe heute einen Termin.", "Hoy tengo una cita.");
ex("Einverstanden!", "Am Montag um zehn Uhr? — Einverstanden!", "¿El lunes a las diez? — ¡De acuerdo!");
ex("verschieben", "Ich muss den Termin leider verschieben.", "Lamentablemente tengo que posponer la cita.");
ex("die Antwort", "Ich habe keine Antwort.", "No tengo respuesta.");
