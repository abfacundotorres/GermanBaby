# 🥨 GermanBaby

Aprendé alemán desde cero jugando: lecciones cortas, voz nativa, **corrección de pronunciación fonema por fonema** (Azure) y **corrección de gramática y semántica** (Claude), más charlas de rol con personajes.

El diseño completo está en [docs/DISENO.md](docs/DISENO.md).

## Puesta en marcha

Requisitos: Node 20 o superior.

```bash
npm install
cp .env.example .env.local   # completá las claves
npm run dev                  # http://localhost:3000
```

### Claves

| Variable | Dónde se consigue |
|---|---|
| `ANTHROPIC_API_KEY` | https://platform.claude.com → API Keys |
| `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION` | Portal de Azure → crear recurso **Speech** (el nivel F0 es gratis) → «Keys and Endpoint» |
| `CLAUDE_MODEL` (opcional) | Por defecto `claude-opus-5-5`. `claude-haiku-5-5` es más barato. |

La app funciona sin claves, con menos funciones: el audio usa la voz del navegador, los ejercicios de hablar se pueden saltear y la traducción se corrige comparando con respuestas modelo.

**Micrófono:** el navegador solo lo permite en `localhost` o con HTTPS.

## Estructura

```
app/
  page.tsx                     mapa de unidades, repaso, logros
  lesson/[unitId]/[lessonId]   lección
  review/                      repaso espaciado
  chat/[unitId]                charla de rol
  api/speech-token             clave Azure → token de 10 min
  api/correct                  corrección de traducciones (Claude)
  api/chat                     turno de conversación (Claude)
components/                    ejercicios, reporte de pronunciación, reproductor de lecciones
lib/
  curriculum.ts                contenido (agregar lecciones acá)
  session.ts                   arma la secuencia de ejercicios
  progress.ts                  XP, racha, logros, cajas de Leitner (localStorage)
  speech.ts                    Azure: TTS, reconocimiento, evaluación de pronunciación
  phonemeTips.ts               consejos de pronunciación para hispanohablantes
  claude.ts                    cliente de Claude con salida estructurada
```
