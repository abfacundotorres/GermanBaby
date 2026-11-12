# DankeDonkey: documento de diseño

App web para aprender alemán desde cero (A1), en español rioplatense, con práctica oral corregida fonema por fonema y corrección de gramática y semántica con IA.

## 1. Decisiones tomadas

| Tema | Decisión | Por qué |
|---|---|---|
| Pronunciación | **Azure AI Speech: Pronunciation Assessment** | Puntúa precisión, fluidez, completitud y prosodia, y además cada palabra y fonema. El reconocimiento de voz del navegador solo transcribe. |
| Voz de salida | Azure TTS neural (`de-DE-KatjaNeural`), con la voz del navegador como respaldo | Voz natural; modo lento con SSML (`prosody rate`). |
| Gramática, semántica y conversación | **Claude API** (por defecto `claude-haiku-5-5`, configurable con `CLAUDE_MODEL`) con salida estructurada (Zod) | Explica en español a nivel A1, acepta respuestas alternativas válidas y detecta errores de sentido, no solo de forma. |
| Usuarios | Uno solo; progreso en `localStorage` | Lo más simple para empezar. Migrar a Supabase después no cambia la UI (ver §9). |
| Dónde corre | Vercel, usada desde el celular | Sin PC. La app publicada exige un `ACCESS_CODE` para que nadie más gaste los créditos de Claude y Azure. |
| Stack | Next.js 16 (App Router) + TypeScript, CSS propio | El backend mínimo (rutas API) protege las claves; todo vive en un solo proyecto. |

## 2. Arquitectura

```
Navegador (React)                               Servidor Next.js (rutas API)
───────────────────                             ────────────────────────────
Lección / Repaso / Charla
  │ TTS + micrófono ── SDK Azure Speech ──┐
  │                                       │ token 10 min
  ├─ POST /api/speech-token ──────────────┴──► cambia AZURE_SPEECH_KEY por un token
  ├─ POST /api/correct  {consigna, modelos, respuesta} ──► Claude → {veredicto, errores[], corregida, feedback}
  └─ POST /api/chat     {unidad, historial}             ──► Claude → {corrección, respuesta_de, respuesta_es, sugerencias}
localStorage: XP, racha, lecciones, cajas de repaso, logros
```

- **Las claves nunca llegan al navegador.** Azure entrega un token de corta duración. Claude solo se llama desde el servidor.
- **Sincronización:** el progreso se guarda en Upstash Redis por `/api/sync`, con clave derivada del código de acceso (sin cuentas). El cliente baja y fusiona al abrir (`lib/merge.ts`) y sube 3 s después de cada cambio. Nunca sube antes de bajar ni sube un progreso vacío, y el servidor rechaza con 409 una escritura hecha sobre una versión vieja; el cliente fusiona y reintenta. Lo que solo crece (XP, lecciones, logros, errores) se une; gemas y ajustes los decide la copia más nueva.
- **Acceso:** `proxy.ts` (el antiguo middleware de Next) exige una cookie derivada de `ACCESS_CODE` en todas las páginas y rutas API. Publicada sin ese código, las rutas API responden 503. En local se puede omitir.
- **Camino rápido sin IA:** si la respuesta escrita coincide con una respuesta modelo (sin contar mayúsculas ni puntuación), no se llama a Claude. Dictados, opción múltiple y armado de frases se corrigen localmente.
- **Degradación:** sin Azure, el audio usa la voz del navegador y los ejercicios de hablar se pueden saltear. Sin Claude, la traducción se corrige localmente contra las respuestas modelo.

## 3. Método pedagógico

1. **Input antes que output:** cada palabra entra con una tarjeta (emoji, audio, traducción y una nota de gramática o pronunciación), seguida de reconocimiento (opción múltiple) y después producción (armar, escribir, hablar).
2. **Errores útiles:** un ejercicio fallado vuelve al final de la lección una vez. La precisión cuenta solo el primer intento.
3. **Repaso espaciado (Leitner):** al terminar una lección, su vocabulario entra en la caja 1. Si acertás, sube de caja (intervalos de 1, 3, 7, 16 y 35 días); si fallás, vuelve a la caja 1 y se repasa hoy.
4. **Gramática implícita:** la regla aparece en la tarjeta y en la corrección cuando hace falta (p. ej. `einen` con masculinos en acusativo), no como clase teórica.
5. **Habla desde el día 1:** cada lección tiene 2 o 3 ejercicios orales, con 70/100 como mínimo para aprobar y consejos específicos para hispanohablantes (ü, ö, ch, r, z, w, v…).
6. **Uso real:** cada unidad termina en una charla de rol con un personaje (Lena en Berlín, Max en Múnich, Herr Huber en Viena), que corrige cada turno y sugiere respuestas.

## 4. Tipos de ejercicio

| Tipo | Habilidad | Corrección |
|---|---|---|
| Tarjeta nueva | Input | – |
| Opción múltiple (de↔es) | Reconocimiento | Local |
| ¿Qué escuchaste? | Comprensión auditiva | Local |
| Armar la frase (fichas) | Orden de palabras | Local |
| Dictado | Audio → ortografía | Local, tolerante (ae/oe/ue, 1-2 letras) |
| Traducción libre | Producción escrita | Claude: gramática, artículo/género, orden, vocabulario, ortografía y significado |
| Decilo en voz alta | Pronunciación | Azure: puntaje total y por palabra y fonema, más consejos |
| Charla de rol | Interacción | Claude (gramática y sentido en contexto) + Azure en modo libre |
| Pregunta con explicación | Gramática dirigida | Local (en las lecciones de gramática está escrita a mano; en «Mis errores» la genera Claude) |
| Completar la frase | Gramática en contexto (formas confundibles) | Local |
| Lectura | Comprensión de un texto escrito (con audio y traducción) | Local: opción múltiple, verdadero/falso y dato leído |
| Escucha larga | Comprensión de un diálogo de 4 a 6 líneas con dos voces | Local: opción múltiple, verdadero/falso y dato oído (número, precio, hora) |
| Tarjeta de regla | Gramática explícita | – (se lee y se pasa con «Entendido») |

## 5. Gamificación

Pensada para el celular, con un diseño de juego tipo Duolingo (mecánicas propias, mascota propia). La app se llama **DankeDonkey** (de «danke» y «donkey», burro en inglés).

- **Camino de lecciones:** nodos en zigzag por unidad, con globo «EMPEZAR» en la lección actual, estrellas en las completadas y candados. Tocar un nodo abre una tarjeta con el objetivo, para no entrar por error.
- **Mascota Donki**, un burrito alemán dibujado en SVG con sombrero tirolés y bufanda negro-rojo-dorado: cambia de cara y de orejas según el momento (contento, festejando, triste, pensando, dormido), parpadea y mueve las orejas. Acompaña la lección actual en el camino.
- **Corazones:** 5 por lección. Cada error resta uno. Sin corazones se ofrece reintentar la lección: no se pierden XP ni progreso (sin castigo real).
- **Racha de aciertos:** bonus de XP por combo y cartel de «¡Racha de N!» con sonido que sube de tono.
- **Sonido y vibración:** efectos sintetizados con Web Audio (sin archivos) y `navigator.vibrate`. Se pueden apagar en Perfil.
- **Pantalla final:** estrellas que aparecen una a una, contadores animados (XP, precisión, gemas), confeti, aviso de racha de días y de subida de nivel.
- **XP y nivel:** 10 por acierto más bonus de combo (+2 por acierto seguido, hasta +10), 5 por «casi», +5 por pronunciación de 90 o más, +20 por lección y +10 si fue perfecta. Nivel = `floor(sqrt(XP/25)) + 1`.
- **Gemas 💎:** +10 por lección (+5 si fue perfecta) y por cada misión cobrada.
- **Misiones diarias:** ganar 40 XP, completar 1 lección y acertar 15 ejercicios. Al cobrar las tres se abre un cofre con +20 gemas.
- **Racha de días y congelador 🧊:** el congelador cuesta 50 gemas (máximo 2) y salva la racha si falta un solo día.
- **Meta diaria** configurable (20, 50 o 100 XP), anillo en la barra superior y gráfico de la semana en Perfil.
- **Logros:** primera lección, lección perfecta, racha de 3 y 7 días, pronunciación de 90 o más, primera charla, unidad completa.
- **Retomar a la mitad:** el avance de una lección se guarda en el dispositivo al pasar de ejercicio; al volver ofrece «Retomar donde quedé» o empezar de nuevo (vale 7 días).
- **Frase del día** con audio, camino con puntitos, banners de unidad con progreso, «+XP» flotante y animaciones de entrada.
- **Instalable (PWA):** manifiesto e íconos; se agrega a la pantalla de inicio y abre a pantalla completa.

## 6. Currículo

A1 (14 unidades) y A2 (en curso). A1:

14 unidades de A1 (las 8 primeras con 3 lecciones y charla de rol; de la 9 en adelante, con escucha larga y gramática):

1. **¡Hallo!**: saludos, presentarse (`heißen`, `kommen aus`, du/Sie), «¿cómo andás?».
2. **Números**: 1-10, la edad (`Ich bin … Jahre alt`; en alemán se *es* de una edad).
3. **En el café**: sustantivos con artículo (der/die/das), pedir (`Ich möchte einen/ein/eine`), pagar.
4. **La familia**: vocabulario, `mein/meine`, `haben` con `einen/eine/keine`.
5. **¿Qué hacés?**: presente regular (ich/du/er/wir/ihr), `gern`, `sein` y `haben`.
6. **Días y horas**: días, la hora (`halb vier`), planes y el verbo en segundo lugar.
7. **En el mercado**: 11-100, cantidades, precios.
8. **Mi día**: rutina, verbos separables (`aufstehen`, `einkaufen`), `zuerst/dann/danach`.

9. **La casa**: ambientes, muebles, describir (`groß`, `klein`, `neu`…), buscar departamento y alquiler, y una lección de gramática sobre el plural.

10. **La ciudad**: lugares y «Es gibt», preguntar el camino, transporte y gramática del dativo (mit, zu, in; zum/zur/im).
11. **Comida y gustos**: comidas, gern/mögen/kein, restaurante y gramática de los verbos que cambian la vocal (essen, nehmen, sprechen, fahren…).
12. **Poder, deber, querer**: können, müssen, wollen, frases de supervivencia («Wie bitte?», «langsamer») y gramática de los modales.
13. **El pasado**: Perfekt con haben (regulares e irregulares) y con sein, `war`, y gramática del participio.
14. **Preparación para el examen**: meses, cumpleaños con ordinales, formularios y deletreo (con el nombre de las letras), anuncios de estación y repaso de casos, orden de la oración y negación.

**Rampa de dificultad (suavizado de los saltos).** Se midió por unidad el vocabulario nuevo, las palabras por frase y por diálogo, y la carga de gramática. Los saltos más duros eran: la unidad 9 (primera con escucha larga y gramática, 30 palabras), A1→A2 (unidad 15), la unidad 18 (aparece `weil`) y A2→B1 (unidades 24 y 26). Se suavizaron así:
- **Diálogos cortos (3 a 6 líneas) en las unidades 1 a 8** (`lib/content/a1-dialogues.ts`), con solo lo enseñado hasta cada lección: la escucha larga se introduce de a poco.
- **Lecturas opcionales** (`lib/content/readings.ts`): una lección «bonus» al final de cada unidad desde la 9. Trae un texto con audio y traducción, 2 a 4 palabras nuevas con tarjeta (entran al repaso espaciado), ejercicios de completar y preguntas de comprensión. No bloquea el avance (`Lesson.bonus`, fuera de `LESSON_ORDER`; se abre al terminar la lección anterior de su unidad).
- **Completar la frase**: ejercicio nuevo. Cada lección con «armar la frase» genera hasta 2 automáticamente: se tapa la palabra que más se parece a un distractor (den/dem, ist/wird…), que es el error típico. Las lecturas traen los suyos escritos a mano.
- **Ayudas en la escucha larga**: «💡 Palabras clave» (vocabulario de la lección que aparece en el diálogo), «👁 Ver el texto» (para leer si cuesta), y 🔊 en cada línea al revelar el texto.
- Los diálogos de arranque de A2 (unidad 15) y B1 (unidad 24) se acortaron a 6 líneas.

Cada unidad nueva sigue este formato: 3 a 4 lecciones de vocabulario, **cada una con una escucha larga**, una **lección de gramática** y la charla de rol. Las unidades 1 a 8 todavía no tienen escucha larga ni lección de gramática.

Con esto A1 queda completo: 14 unidades, 51 lecciones y unas 300 palabras.

**A2** (`Unit.level = "A2"`, en `lib/content/a2-part*.ts`): el camino muestra un cartel «Nivel A2» y el kicker de cada unidad dice el nivel. Los diálogos son más largos (hasta 8 líneas) y cada unidad tiene una lección de gramática. Las llamadas a Claude (corrección, charla, práctica) usan el nivel de la unidad (`lib/level.ts`).

15. **Contar el pasado**: disculparse y dar razones (konnte, musste, wollte, war, hatte), vor/seit/früher, años (1990, 2016), estudios; gramática del pasado corto.
16. **Cuerpo y salud**: partes del cuerpo y `weh tun`, el médico, verbos reflexivos; gramática de reflexivos e imperativo (du/ihr/Sie).
17. **Ropa y compras**: ropa, colores, talles y opinión; gramática de la terminación de los adjetivos.

18. **Razones y opiniones**: weil/denn/deshalb, dass, wenn y frecuencia (immer, oft, manchmal, nie); gramática del verbo al final.
19. **Regalos y dativo**: mir/dir/ihm/ihr/uns, helfen/gefallen, regalar con meiner/meinem, fiestas e invitaciones; gramática de los pronombres y verbos con dativo.
20. **Dónde y adónde**: auf, unter, neben, vor, hinter, zwischen, an, in; stehen/stellen, liegen/legen, hängen; gramática de ¿dónde? (dativo) y ¿adónde? (acusativo).
21. **Comparar y viajar**: comparativo y superlativo (als, so… wie, am liebsten), el clima y el hotel.
22. **Trabajo y planes**: profesiones, buscar trabajo, futuro con `werden`, `dürfen`/`sollen` y `würde gern`.
23. **Preparación para el examen A2**: teléfono, correos y cartas, acordar una cita y un repaso general (dónde va el verbo, casos y preposiciones).

**B1** (`Unit.level = "B1"`, en `lib/content/b1-part*.ts`): el cartel de nivel y las llamadas a Claude ya lo reconocen. Estructuras más complejas y diálogos de hasta 8 líneas. En el contenido B1 se cuida la coherencia de las reglas: p. ej. `um… zu` con el mismo sujeto y `damit` con sujetos distintos.

24. **Contar una historia**: Präteritum regular e irregular; als/wenn/während/bevor/nachdem y el Plusquamperfekt.
25. **Deseos y consejos**: Konjunktiv II (hätte, wäre, würde, könnte, solltest), consejos y pedidos corteses.
26. **Describir con relativos**: oraciones de relativo (sujeto, objeto, dativo, con preposición), «was» y «jemand, der».
27. **La voz pasiva**: Passiv de presente y pasado, con modales, y estados con sein + participio (carteles).

28. **Contrastes y metas**: `obwohl`/`trotzdem`, `um… zu` y `damit`, el infinitivo con `zu` (`ohne… zu`, `statt… zu`).
29. **Posesión y causas**: el genitivo y `wessen`, `wegen`/`trotz`/`statt`/`während` + genitivo, y las terminaciones de los adjetivos en dativo y genitivo.
30. **Opinar y argumentar**: dar y defender una opinión, `einerseits… andererseits`, `zwar… aber`, `außerdem`, y preguntas indirectas con `ob`.
31. **Preparación para el examen B1**: reclamos, carta formal, resumir un texto y repaso de B1.

Con esto el currículo tiene 31 unidades (14 de A1, 9 de A2 y 8 de B1), 119 lecciones del camino principal más 23 lecturas opcionales, 96 escuchas largas y unas 790 palabras. Lo que sigue serían B2 (Konjunktiv I y discurso indirecto, Passiv con modales y variantes, participios como adjetivos, nominalización…) o más práctica de B1.

El contenido vive en `lib/curriculum.ts` y `lib/content/`. Agregar una lección es agregar datos, no código.

**Escucha larga** (`Lesson.dialogue`, `components/Dialogue.tsx`): un diálogo de 4 a 6 líneas con dos voces (Katja y Conrad). Cada pregunta es un ejercicio calificado (corazones, XP y registro de errores como «comprensión auditiva»); el texto y la traducción aparecen recién al responder. `speakDialogue` (`lib/speech.ts`) reproduce línea por línea y prepara la siguiente mientras suena la actual, de a una por vez para no saturar el plan gratuito de Azure; cada línea pasa por el caché de audio. **Lección de gramática** (`Lesson.grammar`): tarjetas de regla con tabla y ejemplos con audio, y después ejercicios escritos a mano. Las pruebas de `tests/content.test.ts` validan todo el contenido (opciones, fichas, respuestas, largo de los diálogos).

## 7. Costos (uso personal, 1 hora diaria o menos)

Lo único que se paga es Claude. Azure Speech (en el plan gratuito F0) y Vercel (plan Hobby) deberían costar USD 0. Las cifras de abajo son **estimaciones**, no mediciones con la API real.

| Modelo (`CLAUDE_MODEL`) | Por hora | Por mes |
|---|---|---|
| `claude-haiku-5-5` (por defecto) | ~USD 0,013 | menos de USD 1 |
| `claude-sonnet-5-5` | ~USD 0,25 | ~USD 8 |
| `claude-opus-5-5` | ~USD 0,50 | ~USD 15 (hasta ~USD 35 en el peor caso) |

Supuestos por hora: 3 lecciones, 8 correcciones que requieren IA, 25 turnos de charla y 1 práctica personalizada. La charla es ~75 % del gasto. Lo más incierto es cuántos tokens de razonamiento usa el modelo, porque también se cobran.

**Cómo se controla el gasto:**
1. **Haiku por defecto**, que es unas 40 veces más barato que Opus.
2. **Saldo prepago sin recarga automática** en la consola de Claude: es el único tope que no se puede pasar.
3. **Límite diario de usos de IA** (por defecto 60) y **tope mensual en dólares** (por defecto USD 3), configurables en Perfil. Todas las llamadas pasan por `lib/ai.ts`, que los aplica antes de pedirle nada al servidor. Si se llega a un tope, las traducciones se corrigen sin IA y la charla y la práctica personalizada se pausan.
4. **Contador de gasto** en Perfil: el servidor devuelve los tokens de cada respuesta y `lib/pricing.ts` los convierte a dólares con precios de lista. Es una estimación; la cifra real está en la consola de Claude.

**Desglose por servicio:** Perfil → «¿En qué se gasta?» muestra, para el mes, los usos y el costo de cada función de Claude (corrección, charla, práctica), los caracteres de voz y los minutos de micrófono de Azure contra su cuota gratuita, y que los sonidos y Vercel no cuestan. Lo de Azure fuera de la cuota se estima con precios aproximados que no pude confirmar.

**Azure (plan gratuito F0):** el uso previsto es de 2 a 3 horas de micrófono por mes (el plan incluye 5) y ~105.000 caracteres de voz por mes (incluye 500.000). La evaluación de pronunciación básica se factura como reconocimiento de voz estándar, así que descuenta de las mismas 5 horas gratis (esto surge de la documentación de Microsoft según una búsqueda; no pude abrir la página original). Azure cobra aparte los complementos «enhanced» (prosodia, gramática, vocabulario, tema); la app no los pide. Con el plan F0 no debería haber cargos: al agotarse la cuota, Azure rechaza las llamadas hasta el mes siguiente. Verificalo en la página de precios de Azure.

## 8. Errores y práctica dirigida

Cada error de una lección, del repaso o de una charla se guarda en el navegador (máximo 150) con su categoría: gramática, artículo/género, orden de palabras, vocabulario, ortografía, significado, pronunciación o comprensión auditiva. En «Mis errores» se ven agrupados por categoría y hay dos formas de practicarlos:

- **Repetir lo que fallé:** vuelve a mostrar los ejercicios, sin IA, y acertar uno lo marca como resuelto. Si el error no tiene el ejercicio original guardado (errores de la charla o secundarios), se arma uno con lo registrado: una pregunta «¿cuál es la forma correcta?», un dictado o una frase para decir en voz alta. Cada error también se puede descartar a mano con «✓ Ya lo sé».
- **Práctica personalizada:** `/api/practice` le manda a Claude los errores recientes y el vocabulario ya estudiado. Claude detecta uno o dos patrones y arma 3 ejercicios de cada tipo (armar frase, traducir y pregunta con explicación) con frases nuevas. Si se termina con 80 % o más de acierto, los errores enviados se marcan como resueltos.

Además, cada lección incluye hasta 2 palabras vencidas de lecciones anteriores, y una palabra que fallás vuelve a la caja 1 del repaso espaciado.

## 9. Auditoría y próximos pasos

Última auditoría: revisión del código, pruebas de seguridad con peticiones reales, validación automática del contenido (24 lecciones, 141 palabras, sin duplicados que vuelvan ambiguas las opciones) y capturas en claro y oscuro. Pruebas automáticas con `npm test` (comparación de texto y precios).

**Micrófono:** `lib/speech.ts` pide el permiso dentro del toque (antes de cualquier espera de red) y le da a Azure el audio ya capturado (`fromStreamInput`). **Grabación rápida** (activa por defecto, se apaga en Perfil): `lib/capture.ts` captura el audio con un AudioWorklet, lo pasa a PCM de 16 kHz (`lib/pcm.ts`) y `lib/vad.ts` detecta cuándo dejaste de hablar (700 ms de silencio); en ese momento se le cierra el flujo a Azure, que responde enseguida en vez de esperar su propio silencio. También se puede terminar tocando ✓. Si el navegador no soporta AudioWorklet se usa el modo compatible, con los silencios de Azure reducidos. El tiempo de audio que se mide para la cuota gratuita es exacto en modo rápido (bytes enviados). Perfil → «Probar el micrófono» revisa paso a paso (https, permiso, acceso, nivel de sonido y reconocimiento de Azure) para diagnosticar fallas desde el propio celular.

**Pendiente, por prioridad:**
1. **Probar con claves y un celular real.** Nada de Claude ni de Azure se probó contra los servicios reales. Hay que verificar en particular:
   - Qué devuelve Azure para alemán: no pude confirmar que `de-DE` soporte puntaje por fonema (alfabeto IPA) ni evaluación de prosodia. Si no los soporta, el detalle por sonido queda vacío y los consejos se eligen por las letras de la palabra.
   - Que el audio se reproduzca solo al abrir un ejercicio en iPhone. Safari puede bloquear audio que no nace de un toque.
2. ~~Guardar el progreso fuera del celular.~~ Hecho (ver §2): sincronización con Upstash Redis. Falta probarla con un Upstash real; hasta ahora se probó con un servicio falso. Limitaciones conocidas: «Borrar progreso» en un dispositivo no borra la copia de otro que ya la tiene, y dos dispositivos usados a la vez pueden perder las gemas del que guardó primero.
3. ~~Guardar el audio ya generado.~~ Hecho: `lib/audiocache.ts` guarda en IndexedDB el MP3 de cada frase (voz + velocidad + texto, hasta 400 clips). Una frase repetida no gasta caracteres de Azure ni espera. Cambio de comportamiento: ahora el audio empieza cuando Azure terminó de sintetizar la frase completa (antes se reproducía en streaming); en frases cortas es imperceptible, pero conviene confirmarlo en el celular.
4. ~~Limitar los intentos de `/login`.~~ Hecho (`lib/ratelimit.ts`): 8 fallos cada 15 minutos por IP y 40 por hora en total devuelven 429. Usa Upstash si está conectado; si no, la memoria de cada instancia de Vercel, que no se comparte y se reinicia, así que es un freno parcial hasta activar la nube. El tope global también puede bloquearte a vos durante una hora si alguien insiste. Igual conviene un código largo.
5. **Más lecciones de gramática explícita** (casos, preposiciones, modales) y un test de nivel para no obligar a empezar siempre desde cero.
6. **Ajustar el umbral de pronunciación** (hoy 70/100) con uso real: puede ser demasiado exigente para un principiante.
7. ~~Accesibilidad.~~ Hecho en lo básico: el texto alemán de tarjetas, fichas y ejemplos lleva `lang="de"`, y la corrección se anuncia con `aria-live`. Falta revisar el contraste y el uso con lector de pantalla de punta a punta.
8. ~~Integración continua.~~ `.github/workflows/ci.yml` corre tipos, pruebas y `build` en cada push.
9. **Revisión del alemán por un nativo** (pendiente, ver §10).

## 10. Auditoría del contenido

- **Resolución de punta a punta:** un bot recorre todas las lecciones (142, incluidas las 23 lecturas) por la interfaz con un navegador de tamaño de celular, respondiendo cada ejercicio con la respuesta del currículo (opciones, fichas, dictados, escucha larga con respuestas escritas y «Saltear» en los de hablar). Todas llegan a la pantalla final sin que ninguna respuesta correcta se marque mal. No es parte de `npm test`: usa el navegador y un servidor de desarrollo.
- **Vocabulario enseñado antes de usarse:** `tests/content.test.ts` exige que toda palabra de un diálogo o de un ejercicio escrito (dictado, hablar, armar, traducir) esté enseñada antes (vocabulario, notas con alemán entre «», tablas de gramática), figure en el glosario `lib/gloss.ts` (se muestra al revelar el diálogo) o sea un nombre propio. Los adjetivos con terminación y los números compuestos se aceptan por regla.
- **Órdenes de palabras válidos:** los ejercicios de armar frases admiten los órdenes alternativos más naturales (`alts`), por ejemplo «Gestern habe ich gekocht» e «Ich habe gestern gekocht».
- **Revisión del alemán sin nativo:** se leyó todo el texto alemán de las 27 unidades buscando errores de forma, de caso y de naturalidad; se corrigieron `steht ein Regal und ein Tisch` (→ `stehen`) y un pedido poco natural de la unidad 9. Sigue siendo una lectura de quien escribió el contenido, no una revisión independiente.
- **Límites de esta auditoría:** verifica que el contenido es coherente y resoluble, no que el alemán sea correcto. Eso solo lo confirma una persona nativa.

