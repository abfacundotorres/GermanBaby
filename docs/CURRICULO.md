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

- **A1** (unidades 1–15): presente regular e irregular (`sein`, `haben`), artículos y género, acusativo (`einen / eine`), posesivos, verbos separables, verbo en segunda posición, plural, dativo con preposiciones (`mit`, `zu`, `in`), verbos con cambio de vocal, modales, Perfekt, fonética (Aussprache).
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
2. **Input.** 41 lecturas de unidad, 74 de la biblioteca (8 de A1, 10 de A2, 21 de B1, 32 de B2 y 3 de C1; los de B2 y C1 de 300–400 palabras), 17 escuchas largas de unidad y 29 escuchas libres (11 monólogos y 18 conversaciones de tres voces, de A1 a C1, a velocidad lenta, normal o rápida). Volumen acumulado de lectura (lecciones y biblioteca): A1 578, A2 2.011, B1 ≈5.800, B2 ≈12.500 y C1 11.497 palabras, contra los 1.000, 3.000, 8.000 y 20.000 del criterio; y unos 144 minutos de escucha en total. B1 y B2 siguen por debajo del criterio y la brecha más grande es la de B2.
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
- Un simulacro del nivel resuelto con el 70 % o más (`/exam`).
- `npm test` y `npm run bot -- --all` en verde.

**Lecciones bonus de B2 de estructura.** Las unidades `satzbau-b2` e `infinitiv-futur` tienen ahora lectura, práctica (con producción libre), escucha larga y vocabulario temático (tránsito y multas; propósitos y proyectos), en `lib/content/b2-extras.ts`. Las palabras de esas lecciones no pueden repetir las del entrenador (`core-vocab.ts`) ni las de otras lecciones.
