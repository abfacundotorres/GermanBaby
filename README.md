# 🥨 GermanBaby

Aprendé alemán desde cero jugando: lecciones cortas, voz nativa, **corrección de pronunciación fonema por fonema** (Azure) y **corrección de gramática y semántica** (Claude), más charlas de rol con personajes.

El diseño completo está en [docs/DISENO.md](docs/DISENO.md).

## Usarla desde el celular (sin PC)

La app se publica en Vercel, que es gratis para uso personal, y después la abrís desde el navegador del celular o la instalás como app. Todo se puede hacer desde el teléfono.

### 1. Conseguí las claves
- **Claude:** entrá a https://platform.claude.com, creá una cuenta, cargá algo de saldo y generá una clave en *API Keys*. Anotá la clave, que empieza con `sk-ant-`.
- **Azure Speech:** entrá a https://portal.azure.com, creá un recurso **Speech** con el plan gratuito **F0**, y en *Keys and Endpoint* copiá una clave y la región (por ejemplo `brazilsouth`).
- **Código de acceso:** inventá una frase **larga, de 16 caracteres o más**, que solo vos sepas. Evita que otra persona use tus claves si encuentra el link. Tiene que ser larga porque nada limita los intentos por segundo contra `/login`.

### 2. Publicala
1. Entrá a https://vercel.com y registrate con tu cuenta de GitHub.
2. *Add New → Project* y elegí el repositorio `GermanBaby`.
3. Si la rama de trabajo todavía no está en `main`, en *Branch* elegí `ccr-e947750e-x6s4gk`. Más adelante conviene pasarla a `main`.
4. En *Environment Variables* agregá:

| Nombre | Valor |
|---|---|
| `ACCESS_CODE` | tu código de acceso |
| `ANTHROPIC_API_KEY` | la clave de Claude |
| `AZURE_SPEECH_KEY` | la clave de Azure |
| `AZURE_SPEECH_REGION` | la región, por ejemplo `brazilsouth` |
| `CLAUDE_MODEL` | opcional. Por defecto `claude-haiku-5-5` (el más barato). Si las explicaciones te parecen flojas, probá `claude-sonnet-5-5` o `claude-opus-5-5` |

5. *Deploy*. Al terminar te da una dirección tipo `germanbaby-xxxx.vercel.app`.

### 3. Instalala en el celular
- **iPhone (Safari):** abrí la dirección, tocá *Compartir* y después *Agregar a pantalla de inicio*.
- **Android (Chrome):** menú ⋮ y después *Instalar app*.

La primera vez te pide el código de acceso. El micrófono funciona porque Vercel usa HTTPS.

### 4. Guardar el progreso en la nube (recomendado)
Sin esto, tu progreso vive solo en el navegador del celular y Safari puede borrarlo si no abrís la app por una semana.
1. En Vercel, abrí tu proyecto, andá a la pestaña **Storage** y creá una base **Upstash Redis** (el plan gratuito alcanza). Conectala al proyecto: Vercel agrega solo las variables de entorno.
2. Si te pide los nombres, la app lee `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`, o también `KV_REST_API_URL` y `KV_REST_API_TOKEN`. Si Vercel usó otros nombres, creá estas a mano con los valores «REST» de la base.
3. Hacé un nuevo deploy (*Deployments → Redeploy*) para que tome las variables.
4. Abrí la app y mirá *Perfil → Sincronización*: tiene que decir «Guardado en la nube». Desde ahí el avance se guarda solo y se recupera en otro dispositivo (con el mismo código de acceso).

La clave donde se guarda tu progreso se deriva de tu código de acceso. Si lo cambiás, empezás con un progreso nuevo en la nube. Nota: esta función se probó con un servicio falso, no con Upstash real, y los pasos de Vercel están escritos de memoria; si algún nombre no coincide, avisame.

### Importante
- **Sin `ACCESS_CODE`, la publicada rechaza todas las llamadas a Claude y Azure** (devuelve un error 503). Es a propósito, para que nadie gaste tu saldo.
- **Sin la nube del paso 4, el progreso vive solo en el navegador del celular.** Si borrás los datos del sitio o abrís la app desde otro navegador, empezás de cero. En *Perfil → Copia de seguridad* podés copiar tu progreso a tus notas y restaurarlo.
- **Cuidá el gasto de Claude**, que es lo único que cuesta (con Haiku, menos de USD 1 por mes):
  - Cargá saldo prepago y **dejá apagada la recarga automática**: cuando se acaba, la API deja de responder y no te cobra de más.
  - En *Perfil → Uso de IA y gasto* ves cuánto gastaste y elegís un límite diario y un tope mensual. Al llegar a uno, la app sigue funcionando sin IA.
  - Es una estimación con precios de lista: la cifra real está en la consola de Claude.

## Puesta en marcha en una PC

Requisitos: [Node 20 o superior](https://nodejs.org) y Git.

```bash
git clone --branch ccr-e947750e-x6s4gk https://github.com/abfacundotorres/GermanBaby.git
cd GermanBaby
npm install
cp .env.example .env.local   # en Windows (cmd): copy .env.example .env.local
# editá .env.local y pegá tus claves
npm run check                # prueba tus claves reales y te dice qué falla
npm run dev                  # http://localhost:3000
```

`npm run check` hace una llamada mínima a Claude (una fracción de centavo), pide un audio de prueba a Azure y, si la configuraste, prueba la nube. El micrófono funciona en `localhost` sin HTTPS.

### Claves

| Variable | Dónde se consigue |
|---|---|
| `ANTHROPIC_API_KEY` | https://platform.claude.com → API Keys |
| `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION` | Portal de Azure → crear recurso **Speech** (el nivel F0 es gratis) → «Keys and Endpoint» |
| `CLAUDE_MODEL` (opcional) | Por defecto `claude-haiku-5-5` (el más barato). Con `claude-sonnet-5-5` o `claude-opus-5-5` las explicaciones pueden ser mejores, pero cuestan mucho más. |
| `ACCESS_CODE` (recomendado) | Código para entrar. Obligatorio al publicar. En local se puede omitir. |

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
