# GermanBaby: documento de diseño

App web para aprender alemán desde cero (A1), en español rioplatense, con práctica oral corregida fonema por fonema y corrección de gramática y semántica con IA.

## 1. Decisiones tomadas

| Tema | Decisión | Por qué |
|---|---|---|
| Pronunciación | **Azure AI Speech: Pronunciation Assessment** | Puntúa precisión, fluidez, completitud y prosodia, y además cada palabra y fonema. El reconocimiento de voz del navegador solo transcribe. |
| Voz de salida | Azure TTS neural (`de-DE-KatjaNeural`), con la voz del navegador como respaldo | Voz natural; modo lento con SSML (`prosody rate`). |
| Gramática, semántica y conversación | **Claude API** (por defecto `claude-opus-5-5`, esfuerzo `low`) con salida estructurada (Zod) | Explica en español a nivel A1, acepta respuestas alternativas válidas y detecta errores de sentido, no solo de forma. |
| Usuarios | Uno solo; progreso en `localStorage` | Lo más simple para empezar. Migrar a Supabase después no cambia la UI (ver §8). |
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

- **XP:** 10 por acierto más bonus de combo (+2 por acierto seguido, hasta +10); 5 por «casi»; +5 por pronunciación de 90 o más; +20 por terminar una lección y +10 si fue perfecta. En la charla, 8 por turno sin errores y 4 con errores.
- **Nivel:** `floor(sqrt(XP/25)) + 1`, una curva suave al principio.
- **Meta diaria:** 50 XP (anillo en la barra superior). **Racha** de días consecutivos con práctica.
- **Estrellas por lección:** 3 con 95 % de precisión o más, 2 con 75 % o más, 1 en otro caso. Las lecciones se desbloquean en orden.
- **Logros:** primera lección, lección perfecta, racha de 3 y 7 días, pronunciación de 90 o más, primera charla, unidad completa.
- **Sin vidas ni castigos.** Fallar no corta la sesión: la app tiene que motivar, no frustrar.

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

## 7. Costos estimados (uso personal)

- **Azure Speech:** el nivel gratuito F0 incluye unas 5 h de reconocimiento por mes (la evaluación de pronunciación cuenta como reconocimiento) y 0,5 M de caracteres de TTS neural. Una persona practicando 20 min por día no debería pasarse. Verificalo en la página de precios de Azure, porque cambia.
- **Claude:** una corrección son ~1-2 k tokens de entrada y ~300 de salida, unos centavos de dólar con Opus 5.5 a esfuerzo bajo. Con `CLAUDE_MODEL=claude-haiku-5-5` el costo baja mucho, a cambio de explicaciones menos finas.

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
