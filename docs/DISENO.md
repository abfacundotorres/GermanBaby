# GermanBaby: documento de diseño

App web para aprender alemán desde cero (A1), en español rioplatense, con práctica oral corregida fonema por fonema y corrección de gramática y semántica con IA.

## 1. Decisiones tomadas

| Tema | Decisión | Por qué |
|---|---|---|
| Pronunciación | **Azure AI Speech: Pronunciation Assessment** | Puntúa precisión, fluidez, completitud y prosodia, y además cada palabra y fonema. El reconocimiento de voz del navegador solo transcribe. |
| Voz de salida | Azure TTS neural (`de-DE-KatjaNeural`), con la voz del navegador como respaldo | Voz natural; modo lento con SSML (`prosody rate`). |
| Gramática, semántica y conversación | **Claude API** (por defecto `claude-opus-5-5`, esfuerzo `low`) con salida estructurada (Zod) | Explica en español a nivel A1, acepta respuestas alternativas válidas y detecta errores de sentido, no solo de forma. |
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
| Pregunta con explicación | Gramática dirigida | Local (opciones y explicación generadas por Claude en «Mis errores») |

## 5. Gamificación

Pensada para el celular, con un diseño de juego tipo Duolingo (mecánicas propias, mascota propia).

- **Camino de lecciones:** nodos en zigzag por unidad, con globo «EMPEZAR» en la lección actual, estrellas en las completadas y candados. Tocar un nodo abre una tarjeta con el objetivo, para no entrar por error.
- **Mascota Brezi** (pretzel dibujado en SVG): cambia de cara según el momento (contenta, festejando, triste, pensando) y reacciona a cada respuesta.
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
- **Instalable (PWA):** manifiesto e íconos; se agrega a la pantalla de inicio y abre a pantalla completa.

## 6. Currículo

8 unidades de A1, con 3 lecciones y una charla de rol cada una:

1. **¡Hallo!**: saludos, presentarse (`heißen`, `kommen aus`, du/Sie), «¿cómo andás?».
2. **Números**: 1-10, la edad (`Ich bin … Jahre alt`; en alemán se *es* de una edad).
3. **En el café**: sustantivos con artículo (der/die/das), pedir (`Ich möchte einen/ein/eine`), pagar.
4. **La familia**: vocabulario, `mein/meine`, `haben` con `einen/eine/keine`.
5. **¿Qué hacés?**: presente regular (ich/du/er/wir/ihr), `gern`, `sein` y `haben`.
6. **Días y horas**: días, la hora (`halb vier`), planes y el verbo en segundo lugar.
7. **En el mercado**: 11-100, cantidades, precios.
8. **Mi día**: rutina, verbos separables (`aufstehen`, `einkaufen`), `zuerst/dann/danach`.

Hoja de ruta (próximas unidades): la casa · la ciudad y las preposiciones con dativo · comida y gustos (`mögen`, `essen`) · modales (`können`, `müssen`) · pasado básico (Perfekt) · preparación para el examen A1.

El contenido vive en `lib/curriculum.ts` y `lib/content/`. Agregar una lección es agregar datos, no código.

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

**Azure (plan gratuito F0):** el uso previsto es de 2 a 3 horas de micrófono por mes (el plan incluye 5) y ~105.000 caracteres de voz por mes (incluye 500.000). No pude confirmar si la evaluación de pronunciación cuenta dentro de las horas gratis; en el peor caso serían pocos dólares por mes. Verificalo en la página de precios de Azure.

## 8. Errores y práctica dirigida

Cada error de una lección, del repaso o de una charla se guarda en el navegador (máximo 150) con su categoría: gramática, artículo/género, orden de palabras, vocabulario, ortografía, significado, pronunciación o comprensión auditiva. En «Mis errores» se ven agrupados por categoría y hay dos formas de practicarlos:

- **Repetir lo que fallé:** vuelve a mostrar los mismos ejercicios, sin IA. Acertar uno lo marca como resuelto.
- **Práctica personalizada:** `/api/practice` le manda a Claude los errores recientes y el vocabulario ya estudiado. Claude detecta uno o dos patrones y arma 3 ejercicios de cada tipo (armar frase, traducir y pregunta con explicación) con frases nuevas. Si se termina con 80 % o más de acierto, los errores enviados se marcan como resueltos.

Además, cada lección incluye hasta 2 palabras vencidas de lecciones anteriores, y una palabra que fallás vuelve a la caja 1 del repaso espaciado.

## 9. Próximos pasos

1. **Más contenido A1** (ver hoja de ruta de §6) y un test de nivel opcional.
2. **Pronunciación:** comparar contra pares mínimos (Hölle/Hülle/Helle) y un gráfico de evolución del puntaje.
3. **Multiusuario:** reemplazar `lib/progress.ts` por Supabase (auth + tabla `progress` JSON) y desplegar en Vercel.
4. **PWA** para usarla en el celular sin conexión (excepto voz e IA).
