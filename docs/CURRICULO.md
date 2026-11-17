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
| B1 | 1.651 | 2.400 | 69 % |
| B2 | 1.909 | 4.000 | 48 % |

Metas: orden de magnitud de las listas de los exámenes del Goethe-Institut (A1, A2, B1); B2 no tiene lista oficial y 4.000 es una cifra de uso común. Por eso se leen como referencia, no como norma. El entrenador (`/words`, 792 palabras) fija el nivel de cada tanda con una línea `## A1`, `## A2`, `## B1` o `## B2` en `lib/content/core-vocab.ts`, y las tandas se ordenan por nivel.

## Brechas, en orden de prioridad

1. **Vocabulario.** Es lo más lejos de la meta, sobre todo en B2. A1 y A2 ya están cerca; falta sumar a B1 y B2. Camino: más tandas del entrenador (hasta 3.500 palabras acumuladas en A1–B2) y vocabulario temático por unidad.
2. **Input.** Hay 41 lecturas de unidad y 8 de la biblioteca, y unos 127 minutos de diálogos con voz sintética. Camino: más textos largos por nivel (B2 a 300–500 palabras), monólogos, tres voces y distintas velocidades.
3. **Expresión escrita.** Un ejercicio libre por unidad, corregido por IA (sin probar contra el servicio real). Camino: más consignas, con rúbrica por nivel.
4. **Medición.** No hay test de nivel ni simulacro. Camino: simulacros con el formato de los exámenes (comprensión lectora, auditiva, escrita y oral) y un test inicial para ubicar al alumno.
5. **Habla.** Pronunciación con Azure y charla de rol con Claude; ninguno probado en vivo. Es lo primero que hay que validar con uso real.

## Criterio de «nivel completo» (propuesto)

Un nivel se da por completo cuando cumple todo:

- Vocabulario acumulado ≥ 95 % de la meta (currículo + entrenador).
- Todas las estructuras de la lista de arriba, con lección, ejercicios y práctica extra.
- Volumen de lectura acumulado: A1 1.000, A2 3.000, B1 8.000, B2 20.000 palabras.
- Escucha: diálogos, escuchas largas y, desde B1, monólogos.
- Un simulacro del nivel resuelto con el 70 % o más.
- `npm test` y `npm run bot -- --all` en verde.
