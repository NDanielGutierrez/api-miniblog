# MiniBlog API

API REST desarrollada en Node.js + Express conectada a PostgreSQL para gestionar autores y posts.

---

## Descripción

MiniBlog es una API REST que permite crear, leer, actualizar y eliminar autores y publicaciones. Fue desarrollada como backend base para una plataforma de contenidos, con énfasis en simplicidad, validaciones y buenas prácticas.

---

## Requisitos

- Node.js v18+
- PostgreSQL instalado y corriendo

---

## Instalación local

**1. Clona el repositorio:**
```bash
git clone https://github.com/NDanielGutierrez/api-miniblog
cd api-miniblog
```

**2. Instala dependencias:**
```bash
npm install
```

**3. Crea el archivo de variables de entorno:**
```bash
cp .env.example .env
```

**4. Completa las variables en `.env`:**
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog_db
DB_USER=miniblog_user
DB_PASSWORD=tu_password
DATABASE_URL=postgresql://miniblog_user:tu_password@localhost:5432/miniblog_db
```

**5. Crea la base de datos en PostgreSQL:**
```sql
CREATE DATABASE miniblog_db;
```

**6. Crea el usuario de base de datos:**
```sql
CREATE USER miniblog_user WITH PASSWORD 'tu_password';
GRANT ALL PRIVILEGES ON DATABASE miniblog_db TO miniblog_user;
```

**7. Ejecuta el script de setup:**
```bash
psql -U miniblog_user -d miniblog_db -f sql/setup.sql
```

**8. Ejecuta el seed con datos de prueba:**
```bash
psql -U miniblog_user -d miniblog_db -f sql/seed.sql
```

**9. Inicia el servidor:**
```bash
npm run dev
```

---

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/authors | Obtener todos los autores |
| GET | /api/authors/:id | Obtener autor por ID |
| POST | /api/authors | Crear un autor |
| PUT | /api/authors/:id | Actualizar un autor |
| DELETE | /api/authors/:id | Eliminar un autor |
| GET | /api/posts | Obtener todos los posts |
| GET | /api/posts/:id | Obtener post por ID |
| POST | /api/posts | Crear un post |
| PUT | /api/posts/:id | Actualizar un post |
| DELETE | /api/posts/:id | Eliminar un post |

---

## Ejecutar tests

```bash
npm test
```

---

## Documentación OpenAPI

La documentación interactiva está disponible en SwaggerHub:

**https://app.swaggerhub.com/apis/estudianteh/miniblog-api/1.00**

**Pasos para probar los endpoints:**

1. Abre el link de SwaggerHub
2. En la parte superior verás el selector de servidor — cámbialo a:
```
https://api-miniblog-production-9339.up.railway.app/api
```
3. Selecciona cualquier endpoint y haz clic en **Try it out**
4. Completa los parámetros requeridos y haz clic en **Execute**
5. Verás la respuesta real de la API en producción

---

## Diagrama entidad-relación

![Diagrama ER](docs/diagrama-entidades.png)

---

## Deploy en Railway

URL publica https://api-miniblog-production-9339.up.railway.app/


**1.** Crea una cuenta en https://railway.app y conecta tu GitHub

**2.** Nuevo proyecto → **Deploy from GitHub repo** → selecciona `api-miniblog`

**3.** Agrega PostgreSQL → **Add Service → Database → PostgreSQL**

**4.** En tu servicio de Node → **Variables** → agrega:
```
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

**5.** Conéctate a la base de datos de Railway desde SQL Shell y ejecuta:
```bash
psql -h HOST -U USER -d DATABASE -f sql/setup.sql
psql -h HOST -U USER -d DATABASE -f sql/seed.sql
```

**6.** En **Settings → Networking → Public Networking** → haz clic en **Generate Domain**

La API quedará disponible en la URL pública generada por Railway.

**Variables de entorno en Railway:**
```
DATABASE_URL=${{Postgres.DATABASE_URL}}
PORT= (Railway lo asigna automáticamente)
```

---

## Decisiones técnicas

- **Arquitectura en capas** — routes → services → db, sin controllers para mantener la estructura simple.
- **Middleware global de errores** — centraliza el manejo del 500 en vez de repetirlo en cada route.
- **Códigos de error de PostgreSQL** — `23505` (email duplicado → 409) y `23503` (foreign key inválida → 400) manejados en el errorHandler.
- **Validaciones en routes** — campos requeridos devuelven 400 antes de llegar a la base de datos.
- **Usuario de base de datos específico** — `miniblog_user` en vez de `postgres` por seguridad.
- **`author_id` inmutable en posts** — no se puede cambiar el autor de un post una vez creado.
- **`afterEach` en tests** — borra registros creados para evitar conflictos de email duplicado en corridas sucesivas.
- **`afterAll` con `pool.end()`** — cierra la conexión a PostgreSQL limpiamente al terminar los tests.

---

## Uso de IA

Este proyecto fue desarrollado con asistencia de **Claude (Anthropic)** como herramienta de apoyo al aprendizaje. En ningún momento se incorporó código sin antes comprenderlo — cada fragmento fue analizado, cuestionado y verificado antes de continuar.

### Cómo se usó

El flujo de trabajo con la IA fue siempre iterativo y orientado a la comprensión. Se presentaba el contexto del módulo actual, el estado real del código y el problema específico con sus restricciones. Cuando la primera respuesta no cubría todos los casos o generaba un error inesperado, se iteraba con el error real hasta llegar a una solución verificable en Postman o en los tests.

En varios momentos se pausó el desarrollo para pedir explicaciones línea por línea antes de continuar. También se cuestionaron decisiones de diseño — como el nombre de parámetros, si restringir el `author_id` en el PUT, o qué estrategia usar para limpiar datos en los tests — lo que llevó a decisiones más fundamentadas que las sugeridas inicialmente.

La IA funcionó como un par de programación que explica mientras resuelve, no como un generador automático de código.

### Prompts utilizados

| Área | Contexto dado a la IA | Qué aportó la IA | Qué se verificó / adaptó |
|------|----------------------|------------------|--------------------------|
| SQL | Entidades authors y posts con relación FK | Scripts setup.sql y seed.sql | Se ejecutaron y verificaron directamente en SQL Shell antes de continuar |
| Services en memoria | Necesidad de validar lógica HTTP sin DB | Arrays en memoria con CRUD completo | Se cuestionó el nombre del parámetro `data`, se cambió a `body` por precisión |
| Conexión PostgreSQL | Credenciales y uso de `pg` | Pool de conexión con variables de entorno y `DATABASE_URL` para Railway | Se creó usuario específico `miniblog_user` en vez de usar `postgres` por seguridad |
| Manejo de errores | Problema de doble respuesta en catch | Middleware global con códigos de error de PostgreSQL 23505 y 23503 | Se identificó el bug de `next(error)` + `res.status()` simultáneos y se corrigió |
| Tests | Fallo por email duplicado en corridas sucesivas | Estrategia `afterEach` con DELETE del registro creado | Se evaluaron otras opciones (`Date.now()`, base de datos separada) antes de elegir |
| Deploy | Configuración de Railway con PostgreSQL | Conexión mediante `DATABASE_URL` y referencia interna `${{Postgres.DATABASE_URL}}` | Se verificó que la variable conectara correctamente los dos servicios en Railway |

Para mas informacion sobre los prompts usador, respuestas y que se uso se adjunta un link de drive con el word "documentacion promp" con las screen de los mismos , asi como los links a github y swagger https://railway.com/project/d14d740c-e0fb-4514-b36e-e0467de19966
