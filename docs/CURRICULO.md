# Currículo de DankeDonkey: alcance, criterios y estado

Compromiso de la app: llevarte de cero a **B2** con una ruta ordenada, repaso espaciado y práctica oral y escrita. C1 queda como extensión (14 unidades), no como promesa. Los números de este documento salen de `npm run report`; si cambian el contenido, se vuelve a correr.

## Qué se logra con cada nivel

Descripciones tomadas de la escala global del Marco Común Europeo (CEFR), resumidas y con la pregunta que más importa: qué podés hacer con la lengua afuera de la app.

| Nivel | Podés… | Con un podcast o un noticiero |
|---|---|---|
| **A1** | Presentarte, preguntar y responder datos personales simples, números, hora, precios, pedir algo en un café. Entendés si te hablan despacio, claro y repitiendo. | No entendés nada de corrido. Solo palabras sueltas. |
| **A2** | Intercambios cotidianos y rutinarios, describir tu entorno y tu pasado, compras, indicaciones, mensajes cortos. Entendés frases y avisos claros sobre temas inmediatos. | Podcasts hechos para aprendices, lentos y con vocabulario controlado. Un podcast normal, no. |
| **B1** | Entender lo esencial de habla clara y estándar sobre temas conocidos (trabajo, estudio, tiempo libre), manejarte en casi cualquier situación de viaje, contar experiencias y dar razones. | Podcasts para aprendices avanzados y programas simples sobre temas familiares, con esfuerzo y repitiendo. Un noticiero real, solo los titulares. |
| **B2** | Entender discursos largos y argumentos complejos si el tema te es razonablemente familiar, la mayoría de los noticieros y de las películas en alemán estándar; conversar con fluidez y espontaneidad sin que sea un esfuerzo para ninguno; escribir textos claros y detallados. | **Sí, un podcast en alemán estándar sobre un tema que conozcas.** Siguen costando: habla muy rápida, regionalismos y dialectos, varias voces pisándose, humor y juegos de palabras, temas técnicos que no conozcas. |
| **C1** (extensión) | Entender textos largos y exigentes y sentidos implícitos, expresarte con fluidez casi sin buscar palabras, usar el idioma con flexibilidad en lo social, académico y profesional. | Casi todo, incluso programas de humor o debates rápidos, con algún tropiezo. |

Lo que el nivel **no** garantiza por sí solo: el B2 se mide con un examen, y entender un podcast depende de cuántas horas de audio real escuchaste. La app entrena el camino; el volumen de escucha propio lo pone cada uno.

## Gramática: qué unidad enseña qué

- **A1** (unidades 1–15, más 8 de ampliación: verbos, cuerpo y salud, casa y cocina, comida y compras, gente y naturaleza, cosas e ideas, adjetivos y palabras pequeñas, con las 235 palabras de A1 que antes eran solo tarjetas del entrenador): presente regular e irregular (`sein`, `haben`), artículos y género, acusativo (`einen / eine`), posesivos, verbos separables, verbo en segunda posición, plural, dativo con preposiciones (`mit`, `zu`, `in`), verbos con cambio de vocal, modales, Perfekt, fonética (Aussprache).
- **A2** (16–24): pasado de los modales, `sein` y `haben`; reflexivos e imperativo; terminaciones del adjetivo; `weil`, `denn`, `deshalb`, `dass`, `wenn`; pronombres en dativo; preposiciones de lugar (dativo y acusativo); comparativo y superlativo; futuro con `werden`, `dürfen`, `sollen`, `würde gern`.
- **B1** (25–35): Präteritum, `als / während / bevor / nachdem`, Plusquamperfekt, Konjunktiv II, oraciones de relativo, Passiv, `obwohl / trotzdem`, `um… zu` y `damit`, infinitivo con `zu`, genitivo, argumentar, verbos con preposición, Konjunktiv II del pasado, conectores.
- **B2** (36–43): Konjunktiv I y discurso indirecto, participios como adjetivos, estilo nominal y registro formal, pasiva avanzada, conectores avanzados, texto de opinión, partículas y expresiones, preparación del examen.

## Estado frente a la referencia (`npm run report`)

| Nivel | Palabras acumuladas (con entrenador) | Meta aproximada | Cobertura |
|---|---|---|---|
| A1 | 588 | 650 | 90 % |
| A2 | 1.144 | 1.300 | 88 % |
| B1 | 1.912 | 2.400 | 80 % |
| B2 | 4.239 | 4.000 | 106 % |

Metas: orden de magnitud de las listas de los exámenes del Goethe-Institut (A1, A2, B1); B2 no tiene lista oficial y 4.000 es una cifra de uso común. Por eso se leen como referencia, no como norma. El entrenador (`/words`, 2.121 palabras) fija el nivel de cada tanda con una línea `## A1`, `## A2`, `## B1` o `## B2` en `lib/content/core-vocab.ts`, y las tandas se ordenan por nivel.

## Brechas, en orden de prioridad

1. **Vocabulario.** Cubierto en lo esencial: el entrenador tiene unas 3.640 palabras (522 de ellas de C1, vocabulario de registro culto y escrito) y la cobertura acumulada (`npm run report`) es A1 93 %, A2 99 %, B1 95 % y B2 106 % contra las metas; C1 no tiene meta de referencia. Lo que queda son unas 30–40 palabras por nivel en A1 y A2 y unas 130 en B1; las candidatas comunes ya están casi agotadas, así que conviene un método nuevo (lista de frecuencia real o temas puntuales).
2. **Input.** 41 lecturas de unidad, 212 de la biblioteca (54 de A1, 25 de A2, 52 de B1, 78 de B2 y 3 de C1), 33 escuchas largas de unidad y 47 escuchas libres (12 monólogos y 20 conversaciones de tres voces, de A1 a C1, a velocidad lenta, normal o rápida). Volumen acumulado de lectura (lecciones y biblioteca): A1 1.002, A2 3.068, B1 8.018 y B2 20.120 (medido: lecciones + biblioteca) y C1 1.802 palabras, contra los 1.000, 3.000, 8.000 y 20.000 del criterio; y unos 144 minutos de escucha en total. A1, A2, B1 y B2 ya cumplen el criterio de lectura; B2 tiene escucha larga en todas sus unidades.
3. **Expresión escrita.** Un ejercicio libre por unidad más 24 consignas con rúbrica (A1–C1) (`/schreiben`, cuatro criterios de 0 a 5). Falta sumar consignas.
4. **Expresión oral.** 20 monólogos A1–C1 (`/sprechen`): Azure mide fluidez y precisión y la rúbrica puntúa el contenido. Los simulacros incluyen una cuarta parte oral opcional (consigna del nivel, 70 % contenido y 30 % voz).
5. **Medición.** 14 simulacros (2 de A1 y 3 por nivel de A2 a C1) con lectura, escucha y escritura, y un test de nivel inicial (`/nivel`, hasta 75 preguntas de gramática, vocabulario y escucha (15 por nivel, adaptativo), sin expresión). El test de nivel incluye 3 preguntas de escucha por nivel; no mide expresión.
6. **Habla.** Pronunciación con Azure (la unidad de sonidos básicos de A1 más dos de pronunciación avanzada, en A2 y B1) y charla de rol con Claude; ninguno probado en vivo. Es lo primero que hay que validar con uso real.

## Criterio de «nivel completo» (propuesto)

La app lo mide en `/progreso` («Mi nivel») sobre lo que ofrece en cada nivel; las cifras de abajo son la referencia de contenido, no del alumno.

Un nivel se da por completo cuando cumple todo:

- Vocabulario acumulado ≥ 95 % de la meta (currículo + entrenador).
- Todas las estructuras de la lista de arriba, con lección, ejercicios y práctica extra.
- Volumen de lectura acumulado: A1 1.000, A2 3.000, B1 8.000, B2 20.000 palabras.
- Escucha: diálogos, escuchas largas y, desde B1, monólogos.
- Dos simulacros distintos del nivel resueltos con el 70 % o más (`/exam`).
- Escritura y oral: tres consignas de cada una con 12/20 de promedio o más (las que ofrezca el nivel, si son menos).
- Repaso sostenido: al menos el 60 % de las palabras aprendidas del nivel en la caja 3 o más del repaso espaciado y no más del 15 % vencidas.
- `npm test` y `npm run bot -- --all` en verde.

**Lecciones bonus de B2 de estructura.** Las unidades `satzbau-b2` e `infinitiv-futur` tienen ahora lectura, práctica (con producción libre), escucha larga y vocabulario temático (tránsito y multas; propósitos y proyectos), en `lib/content/b2-extras.ts`. Las palabras de esas lecciones no pueden repetir las del entrenador (`core-vocab.ts`) ni las de otras lecciones.

## Ampliación de A1 (piloto)

Meta: pasar de ~19 h a ~40 h de primera pasada, para que terminar A1 equivalga a saber A1. Restricción descubierta: casi todo el vocabulario temático ya está asignado al entrenador o a lecciones de A2 en adelante, y no puede repetirse. Por eso la ampliación suma práctica e input sobre lo ya enseñado, usa `lib/gloss.ts`, y las lecciones temáticas nuevas se arman solo con palabras libres (`npm run lexicon -- free`).

| Entrega | Horas estimadas | Estado |
|---|---|---|
| Lectura en las 8 unidades iniciales (hallo a alltag) | +1 | hecho |
| Escucha larga en esas 8 unidades | +2 | hecho |
| «Práctica 2» (repaso mezclado) en las 14 unidades base | +3 | hecho (14 de 14) |
| Lectura, práctica y escucha larga (bonus) en las 8 unidades ampliadas (verben2 a woerter; lib/content/a1x-*.ts) | +24 lecciones, ~2,5 h | hecho (8 de 8) |
| A2 ampliado: 5 unidades nuevas (haushalt, verkehr, kueche3, koerper3, natur2; lib/content/a2-part6.ts y a2x-extras.ts) con 133 palabras del entrenador pasadas a lecciones y 45 más en vocabulario temático; más lectura, práctica y escucha larga | A2 pasa de 17,6 a 24,5 h | hecho |
| A2 ampliado (2): 5 unidades más (schule2, freizeit2, charakter, kommunikation, adverbien; lib/content/a2-part7.ts y a2y-extras.ts), 139 palabras del entrenador a lecciones y 45 a vocabulario temático, con lectura, práctica y escucha larga | A2 pasa de 24,5 a 31,7 h | hecho |
| A2 ampliado (3): 3 unidades más (bewegung2, alltag2, eigenschaften2; lib/content/a2-part8.ts y a2z-extras.ts), 76 palabras del entrenador a lecciones y 24 a vocabulario temático, con lectura, práctica y escucha larga. Con esto el entrenador de A2 quedó vacío | A2 pasa de 31,7 a 35,8 h | hecho |
| Producción A2: +8 consignas de escritura (15), +6 orales (12) y +2 simulacros (5; lib/content/exams-a2x.ts) | sin horas contadas en report:time | hecho |
| B1 ampliado (1): 5 unidades (beruf2, argumente, wohlbefinden, gesellschaft2, reisen2; lib/content/b1-part6.ts y b1x-extras.ts), 122 palabras del entrenador a lecciones y 45 a vocabulario temático, con lectura, práctica y escucha larga (quedan 529 en el entrenador de B1) | B1 pasa de 22,8 a 29,7 h | hecho |
| B1 ampliado (2): 5 unidades más (einkauf3, umwelt2, medienwelt, beziehung2, bildung2; lib/content/b1-part7.ts y b1y-extras.ts), 124 palabras del entrenador a lecciones y 45 a vocabulario temático, con lectura, práctica y escucha larga (quedan 360 en el entrenador de B1) | B1 pasa de 29,7 a 36,6 h | hecho |
| B1 ampliado (3): 5 unidades más (freizeit3, regeln2, wirtschaft2, urteil2, gesundheit3; lib/content/b1-part8.ts y b1z-extras.ts), 132 palabras del entrenador a lecciones y 45 a vocabulario temático, con lectura, práctica y escucha larga (quedan 183 en el entrenador de B1) | B1 pasa de 36,6 a 43,5 h | hecho |
| 38 lecturas de biblioteca A1 y 15 escuchas libres | +3,5 | hecho |
| 5 lecciones temáticas con palabras nuevas (pasatiempos, profesiones, clima, cuerpo, mensajes) | +1,5 | hecho |
| 20 consignas de escritura y 20 de oral con rúbrica (A1) | +3 | hecho |
| 2 simulacros más (4 de A1) | +1,5 | hecho; falta el repaso obligatorio con SRS |

## Herramientas para escribir contenido

- `npm run lexicon -- unit <id>`: palabras ya enseñadas hasta esa unidad (más glosario), para escribir dentro de las reglas desde el principio.
- `npm run lexicon -- check <id> "texto"`: palabras de un texto que faltan enseñar o glosar.
- `npm run lexicon -- free "der Hund" ...`: si una palabra de vocabulario nuevo está libre (no repite lecciones ni el entrenador).
- `npm run preflight`: todas las reglas de vocabulario y ortografía en una pasada, con un esqueleto listo para `lib/gloss.ts`. Es lo que conviene correr antes de `npm test`.
- `npm run report:time`: horas estimadas de primera pasada por nivel.
- `tests/spell.test.ts` (en el CI): un corrector hunspell alemán (`nspell` + `dictionary-de`, solo en desarrollo) marca palabras no reconocidas. Las revisadas a mano y correctas (nombres, anglicismos, compuestos raros) viven en `tests/spell-ok.txt`.

**Resultado de la ampliación de A1.** 23 unidades y 85 lecciones base (antes 15 y 55). Primera pasada estimada: ~33 h por `npm run report:time`, más ~4 h de consignas, simulacros y escuchas libres que esa cuenta no incluye. Las 235 palabras de A1 que eran solo tarjetas del entrenador pasaron a lecciones con ejercicios y diálogo; en el entrenador quedó una sola (`das Restaurant`).

